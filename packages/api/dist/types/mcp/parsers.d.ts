import type * as t from './types';
/**
 * Converts MCPToolCallResponse content into recognized content block types
 * First element: string or formatted content (excluding image_url)
 * Second element: Recognized types - "image", "image_url", "text", "json"
 *
 * @param  result - The MCPToolCallResponse object
 * @param provider - The provider name (google, anthropic, openai)
 * @returns Tuple of content and image_urls
 */
export declare function formatToolContent(result: t.MCPToolCallResponse, provider: t.Provider): t.FormattedContentResult;
//# sourceMappingURL=parsers.d.ts.map