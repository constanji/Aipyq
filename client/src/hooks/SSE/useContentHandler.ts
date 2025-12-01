import { useCallback, useMemo } from 'react';
import { ContentTypes } from 'aipyq-data-provider';
import { useQueryClient } from '@tanstack/react-query';

import type {
  Text,
  TMessage,
  ImageFile,
  ContentPart,
  PartMetadata,
  TContentData,
  EventSubmission,
  TMessageContentParts,
} from 'aipyq-data-provider';
import { addFileToCache } from '~/utils';
import logger from '~/utils/logger';

type TUseContentHandler = {
  setMessages: (messages: TMessage[]) => void;
  getMessages: () => TMessage[] | undefined;
};

type TContentHandler = {
  data: TContentData;
  submission: EventSubmission;
};

export default function useContentHandler({ setMessages, getMessages }: TUseContentHandler) {
  const queryClient = useQueryClient();
  const messageMap = useMemo(() => new Map<string, TMessage>(), []);
  return useCallback(
    ({ data, submission }: TContentHandler) => {
      const { type, messageId, thread_id, conversationId, index } = data;

      const _messages = getMessages();
      const messages =
        _messages
          ?.filter((m) => m.messageId !== messageId)
          .map((msg) => ({ ...msg, thread_id })) ?? [];
      const userMessage = messages[messages.length - 1] as TMessage | undefined;

      const { initialResponse } = submission;

      let response = messageMap.get(messageId);
      if (!response) {
        response = {
          ...(initialResponse as TMessage),
          parentMessageId: userMessage?.messageId ?? '',
          conversationId,
          messageId,
          thread_id,
        };
        messageMap.set(messageId, response);
      }

      // TODO: handle streaming for non-text
      const textPart: Text | string | undefined = data[ContentTypes.TEXT];
      const part: ContentPart =
        textPart != null && typeof textPart === 'string' ? { value: textPart } : data[type];

      // 验证 type 和 part 的有效性，防止添加无效的 content part
      if (!type) {
        logger.warn('content_handler', 'Missing content type in data', { messageId, data });
        return;
      }

      if (!part) {
        logger.warn('content_handler', 'Missing content part in data', { messageId, type });
        return;
      }

      if (type === ContentTypes.IMAGE_FILE) {
        addFileToCache(queryClient, part as ImageFile & PartMetadata);
      }

      /* spreading the content array to avoid mutation */
      // 过滤掉 null/undefined 值，确保数组连续
      const filteredContent = (response.content ?? []).filter((c) => c != null) as TMessageContentParts[];
      
      // 如果索引超出范围，使用实际的内容长度作为索引，避免创建稀疏数组
      const actualIndex = index >= filteredContent.length ? filteredContent.length : index;
      
      if (index !== actualIndex) {
        logger.warn(
          'content_handler',
          `Index ${index} adjusted to ${actualIndex} to avoid sparse arrays. Content length: ${filteredContent.length}`,
          {
            messageId,
            type,
            originalIndex: index,
            adjustedIndex: actualIndex,
            currentLength: filteredContent.length,
          },
        );
      }

      // 创建新的 content part，确保它不为 null
      const newContentPart: TMessageContentParts = { type, [type]: part } as TMessageContentParts;
      
      // 如果 actualIndex 等于数组长度，直接 push；否则更新现有位置
      if (actualIndex === filteredContent.length) {
        filteredContent.push(newContentPart);
      } else if (actualIndex < filteredContent.length) {
        filteredContent[actualIndex] = newContentPart;
      } else {
        // 这种情况不应该发生（因为我们已经调整了 actualIndex），但为了安全起见，直接 push
        logger.warn(
          'content_handler',
          `Unexpected: actualIndex ${actualIndex} > filteredContent.length ${filteredContent.length}. Pushing instead.`,
          { messageId, type },
        );
        filteredContent.push(newContentPart);
      }

      response.content = filteredContent;

      // 在添加 initialResponse.content 之前，确保它不为 null
      if (
        type !== ContentTypes.TEXT &&
        initialResponse.content &&
        initialResponse.content[0] != null &&
        initialResponse.content[0].type && // 确保有 type 属性
        ((response.content[response.content.length - 1]?.type === ContentTypes.TOOL_CALL &&
          response.content[response.content.length - 1][ContentTypes.TOOL_CALL]?.progress === 1) ||
          response.content[response.content.length - 1]?.type === ContentTypes.IMAGE_FILE)
      ) {
        response.content.push(initialResponse.content[0]);
      }

      // 最后再次过滤，确保没有 null/undefined 值，并且所有元素都有 type 属性
      response.content = response.content.filter(
        (c) => c != null && c.type != null
      ) as TMessageContentParts[];

      setMessages([...messages, response]);
    },
    [queryClient, getMessages, messageMap, setMessages],
  );
}
