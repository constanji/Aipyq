import { Tools } from 'aipyq-data-provider';
import type { UIResource } from 'aipyq-data-provider';
import { logger } from '@aipyq/data-schemas';
import type * as t from './types';

const RECOGNIZED_PROVIDERS = new Set([
  'google',
  'anthropic',
  'openai',
  'azureopenai',
  'openrouter',
  'xai',
  'deepseek',
  'ollama',
  'bedrock',
]);
const CONTENT_ARRAY_PROVIDERS = new Set(['google', 'anthropic', 'azureopenai', 'openai']);

const imageFormatters: Record<string, undefined | t.ImageFormatter> = {
  // google: (item) => ({
  //   type: 'image',
  //   inlineData: {
  //     mimeType: item.mimeType,
  //     data: item.data,
  //   },
  // }),
  // anthropic: (item) => ({
  //   type: 'image',
  //   source: {
  //     type: 'base64',
  //     media_type: item.mimeType,
  //     data: item.data,
  //   },
  // }),
  default: (item) => ({
    type: 'image_url',
    image_url: {
      url: item.data.startsWith('http') ? item.data : `data:${item.mimeType};base64,${item.data}`,
    },
  }),
};

function isImageContent(item: t.ToolContentPart): item is t.ImageContent {
  return item.type === 'image';
}

function parseAsString(result: t.MCPToolCallResponse): string {
  const content = result?.content ?? [];
  if (!content.length) {
    return '(No response)';
  }

  const text = content
    .map((item) => {
      if (item.type === 'text') {
        return item.text;
      }
      if (item.type === 'resource') {
        const resourceText = [];
        if (item.resource.text != null && item.resource.text) {
          resourceText.push(item.resource.text);
        }
        if (item.resource.uri) {
          resourceText.push(`Resource URI: ${item.resource.uri}`);
        }
        if (item.resource.name) {
          resourceText.push(`Resource: ${item.resource.name}`);
        }
        if (item.resource.description) {
          resourceText.push(`Description: ${item.resource.description}`);
        }
        if (item.resource.mimeType != null && item.resource.mimeType) {
          resourceText.push(`Type: ${item.resource.mimeType}`);
        }
        return resourceText.join('\n');
      }
      return JSON.stringify(item, null, 2);
    })
    .filter(Boolean)
    .join('\n\n');

  return text;
}

/**
 * Converts MCPToolCallResponse content into recognized content block types
 * First element: string or formatted content (excluding image_url)
 * Second element: Recognized types - "image", "image_url", "text", "json"
 *
 * @param  result - The MCPToolCallResponse object
 * @param provider - The provider name (google, anthropic, openai)
 * @returns Tuple of content and image_urls
 */
export function formatToolContent(
  result: t.MCPToolCallResponse,
  provider: t.Provider,
): t.FormattedContentResult {
  // 正则表达式匹配图片URL（支持常见的图片格式）
  // 匹配完整的URL，包括协议、域名、路径和常见的图片扩展名，以及可选的查询参数
  // 优化：匹配更灵活的URL格式，支持URL末尾可能有换行符或空格的情况
  // 使用非贪婪匹配，确保匹配到完整的URL（直到遇到空白字符、引号或HTML标签）
  // 也匹配可能没有显式扩展名但通过路径可以识别的图片URL
  const imageUrlRegex = /(https?:\/\/[^\s<>"'\n\r()]+\.(?:jpeg|jpg|png|gif|webp|bmp|svg|ico)(?:\?[^\s<>"'\n\r()]*)?)/gi;
  
  // 从文本中提取图片URL的辅助函数
  const extractImageUrlsFromText = (text: string): string[] => {
    if (!text) return [];
    // 先尝试标准匹配
    let matches = text.match(imageUrlRegex);
    if (!matches || matches.length === 0) {
      // 如果没有匹配到，尝试更宽松的模式，匹配包含常见图片路径的URL
      const relaxedRegex = /(https?:\/\/[^\s<>"'\n\r()]+(?:img|image|picture|photo)[^\s<>"'\n\r()]*\.(?:jpeg|jpg|png|gif|webp|bmp|svg|ico)(?:\?[^\s<>"'\n\r()]*)?)/gi;
      matches = text.match(relaxedRegex);
    }
    const uniqueUrls = matches ? [...new Set(matches)] : [];
    return uniqueUrls;
  };

  // 将提取的URL数组转换为FormattedContent数组
  const urlsToFormattedContent = (urls: string[]): t.FormattedContent[] => {
    return urls.map((url) => ({
      type: 'image_url' as const,
      image_url: { url },
    }));
  };

  if (!RECOGNIZED_PROVIDERS.has(provider)) {
    // 对于非识别的provider，也要提取图片URL
    const textContent = parseAsString(result);
    const extractedUrls = extractImageUrlsFromText(textContent);
    
    if (extractedUrls.length > 0) {
      logger.debug(
        `[formatToolContent] Extracted ${extractedUrls.length} image URL(s) from text for unrecognized provider ${provider}:`,
        extractedUrls,
      );
    }
    
    const imageUrls = urlsToFormattedContent(extractedUrls);
    
    const artifacts: t.Artifacts = imageUrls.length
      ? { content: imageUrls }
      : undefined;
    
    return [textContent, artifacts];
  }

  const content = result?.content ?? [];
  if (!content.length) {
    return [[{ type: 'text', text: '(No response)' }], undefined];
  }

  const formattedContent: t.FormattedContent[] = [];
  const imageUrls: t.FormattedContent[] = [];
  let currentTextBlock = '';
  const uiResources: UIResource[] = [];

  type ContentHandler = undefined | ((item: t.ToolContentPart) => void);

  const contentHandlers: {
    text: (item: Extract<t.ToolContentPart, { type: 'text' }>) => void;
    image: (item: t.ToolContentPart) => void;
    resource: (item: Extract<t.ToolContentPart, { type: 'resource' }>) => void;
  } = {
    text: (item) => {
      const textContent = item.text;
      
      // 从文本中提取图片URL
      const extractedUrls = extractImageUrlsFromText(textContent);
      if (extractedUrls.length > 0) {
        logger.debug(
          `[formatToolContent] Extracted ${extractedUrls.length} image URL(s) from text content:`,
          extractedUrls,
        );
      }
      
      extractedUrls.forEach((url) => {
        // 检查是否已经存在相同的URL，避免重复添加
        const urlExists = imageUrls.some(
          (img) => img.type === 'image_url' && img.image_url?.url === url
        );
        
        if (!urlExists) {
          imageUrls.push({
            type: 'image_url',
            image_url: { url },
          });
        }
      });
      
      currentTextBlock += (currentTextBlock ? '\n\n' : '') + textContent;
    },

    image: (item) => {
      if (!isImageContent(item)) {
        return;
      }
      if (CONTENT_ARRAY_PROVIDERS.has(provider) && currentTextBlock) {
        formattedContent.push({ type: 'text', text: currentTextBlock });
        currentTextBlock = '';
      }
      const formatter = imageFormatters.default as t.ImageFormatter;
      const formattedImage = formatter(item);

      if (formattedImage.type === 'image_url') {
        imageUrls.push(formattedImage);
      } else {
        formattedContent.push(formattedImage);
      }
    },

    resource: (item) => {
      if (item.resource.uri.startsWith('ui://')) {
        uiResources.push(item.resource as UIResource);
      }

      const resourceText = [];
      if (item.resource.text != null && item.resource.text) {
        resourceText.push(`Resource Text: ${item.resource.text}`);
      }
      if (item.resource.uri.length) {
        resourceText.push(`Resource URI: ${item.resource.uri}`);
      }
      if (item.resource.name) {
        resourceText.push(`Resource: ${item.resource.name}`);
      }
      if (item.resource.description) {
        resourceText.push(`Resource Description: ${item.resource.description}`);
      }
      if (item.resource.mimeType != null && item.resource.mimeType) {
        resourceText.push(`Resource MIME Type: ${item.resource.mimeType}`);
      }
      currentTextBlock += (currentTextBlock ? '\n\n' : '') + resourceText.join('\n');
    },
  };

  for (const item of content) {
    const handler = contentHandlers[item.type as keyof typeof contentHandlers] as ContentHandler;
    if (handler) {
      handler(item as never);
    } else {
      const stringified = JSON.stringify(item, null, 2);
      currentTextBlock += (currentTextBlock ? '\n\n' : '') + stringified;
    }
  }

  // 在最终文本块中也提取图片URL（处理在循环中可能遗漏的情况）
  if (currentTextBlock) {
    const finalExtractedUrls = extractImageUrlsFromText(currentTextBlock);
    finalExtractedUrls.forEach((url) => {
      const urlExists = imageUrls.some(
        (img) => img.type === 'image_url' && img.image_url?.url === url
      );
      
      if (!urlExists) {
        imageUrls.push({
          type: 'image_url',
          image_url: { url },
        });
      }
    });
  }

  if (CONTENT_ARRAY_PROVIDERS.has(provider) && currentTextBlock) {
    formattedContent.push({ type: 'text', text: currentTextBlock });
  }

  let artifacts: t.Artifacts = undefined;
  if (imageUrls.length || uiResources.length) {
    artifacts = {
      ...(imageUrls.length && { content: imageUrls }),
      ...(uiResources.length && { [Tools.ui_resources]: { data: uiResources } }),
    };
  }

  if (CONTENT_ARRAY_PROVIDERS.has(provider)) {
    return [formattedContent, artifacts];
  }

  return [currentTextBlock, artifacts];
}
