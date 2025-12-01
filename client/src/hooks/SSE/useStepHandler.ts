import { useCallback, useRef } from 'react';
import {
  Constants,
  StepTypes,
  ContentTypes,
  ToolCallTypes,
  getNonEmptyValue,
} from 'aipyq-data-provider';
import type {
  Agents,
  TMessage,
  PartMetadata,
  EventSubmission,
  TMessageContentParts,
} from 'aipyq-data-provider';
import type { SetterOrUpdater } from 'recoil';
import type { AnnounceOptions } from '~/common';
import { MESSAGE_UPDATE_INTERVAL } from '~/common';
import logger from '~/utils/logger';

type TUseStepHandler = {
  announcePolite: (options: AnnounceOptions) => void;
  setMessages: (messages: TMessage[]) => void;
  getMessages: () => TMessage[] | undefined;
  setIsSubmitting: SetterOrUpdater<boolean>;
  lastAnnouncementTimeRef: React.MutableRefObject<number>;
};

type TStepEvent = {
  event: string;
  data:
    | Agents.MessageDeltaEvent
    | Agents.AgentUpdate
    | Agents.RunStep
    | Agents.ToolEndEvent
    | {
        runId?: string;
        message: string;
      };
};

type MessageDeltaUpdate = { type: ContentTypes.TEXT; text: string; tool_call_ids?: string[] };

type ReasoningDeltaUpdate = { type: ContentTypes.THINK; think: string };

type AllContentTypes =
  | ContentTypes.TEXT
  | ContentTypes.THINK
  | ContentTypes.TOOL_CALL
  | ContentTypes.IMAGE_FILE
  | ContentTypes.IMAGE_URL
  | ContentTypes.ERROR;

export default function useStepHandler({
  setMessages,
  getMessages,
  setIsSubmitting,
  announcePolite,
  lastAnnouncementTimeRef,
}: TUseStepHandler) {
  const toolCallIdMap = useRef(new Map<string, string | undefined>());
  const messageMap = useRef(new Map<string, TMessage>());
  const stepMap = useRef(new Map<string, Agents.RunStep>());

  // 辅助函数：确保消息的 content 数组是连续的（无 null/undefined 值）
  const ensureContentIsDense = (message: TMessage): TMessage => {
    if (!message.content || message.content.length === 0) {
      return message;
    }
    const denseContent = message.content.filter((c) => c != null) as TMessageContentParts[];
    if (denseContent.length !== message.content.length) {
      logger.warn(
        'step_handler',
        `Filtered out ${message.content.length - denseContent.length} null/undefined values from content array`,
        {
          messageId: message.messageId,
          originalLength: message.content.length,
          filteredLength: denseContent.length,
        },
      );
    }
    return { ...message, content: denseContent };
  };

  const calculateContentIndex = (
    baseIndex: number,
    initialContent: TMessageContentParts[],
    incomingContentType: string,
    existingContent?: TMessageContentParts[],
  ): number => {
    /** Only apply -1 adjustment for TEXT or THINK types when they match existing content */
    if (
      initialContent.length > 0 &&
      (incomingContentType === ContentTypes.TEXT || incomingContentType === ContentTypes.THINK)
    ) {
      const targetIndex = baseIndex + initialContent.length - 1;
      const existingType = existingContent?.[targetIndex]?.type;
      if (existingType === incomingContentType) {
        return targetIndex;
      }
    }
    return baseIndex + initialContent.length;
  };

  const updateContent = (
    message: TMessage,
    index: number,
    contentPart: Agents.MessageContentComplex,
    finalUpdate = false,
  ) => {
    // 验证 contentPart 的有效性
    if (!contentPart) {
      logger.warn('step_handler', 'Content part is null or undefined', {
        messageId: message.messageId,
        index,
      });
      return message;
    }

    const contentType = contentPart.type ?? '';
    if (!contentType) {
      logger.warn('step_handler', 'No content type found in content part', {
        messageId: message.messageId,
        index,
        contentPart,
      });
      return message;
    }

    // 过滤掉 null/undefined 值，确保数组连续，并且所有元素都有 type 属性
    const filteredContent = (message.content || []).filter(
      (c) => c != null && c.type != null,
    ) as TMessageContentParts[];
    
    // 如果索引超出范围，使用实际的内容长度作为索引，避免创建稀疏数组
    const actualIndex = index >= filteredContent.length ? filteredContent.length : index;
    
    if (index !== actualIndex) {
      logger.warn(
        'step_handler',
        `Index ${index} adjusted to ${actualIndex} to avoid sparse arrays. Content length: ${filteredContent.length}`,
        {
          messageId: message.messageId,
          contentType,
          originalIndex: index,
          adjustedIndex: actualIndex,
        },
      );
    }

    // 如果 actualIndex 等于数组长度，直接 push 新元素；否则更新现有元素
    const updatedContent = [...filteredContent] as Array<
      Partial<TMessageContentParts> | undefined
    >;

    if (actualIndex === updatedContent.length) {
      // 直接 push，避免创建稀疏数组
      updatedContent.push({ type: contentPart.type as AllContentTypes });
    } else if (actualIndex < updatedContent.length) {
      // 更新现有位置
      if (!updatedContent[actualIndex]) {
        updatedContent[actualIndex] = { type: contentPart.type as AllContentTypes };
      }
    } else {
      // 这种情况不应该发生（因为我们已经调整了 actualIndex），但为了安全起见
      logger.warn(
        'step_handler',
        `Unexpected: actualIndex ${actualIndex} > filteredContent.length ${filteredContent.length}. Using filteredContent.length instead.`,
        { messageId: message.messageId, contentType },
      );
      // 直接 push，避免创建稀疏数组
      updatedContent.push({ type: contentPart.type as AllContentTypes });
    }

    if (
      contentType.startsWith(ContentTypes.TEXT) &&
      ContentTypes.TEXT in contentPart &&
      typeof contentPart.text === 'string'
    ) {
      const currentContent = updatedContent[actualIndex] as MessageDeltaUpdate;
      const update: MessageDeltaUpdate = {
        type: ContentTypes.TEXT,
        text: (currentContent.text || '') + contentPart.text,
      };

      if (contentPart.tool_call_ids != null) {
        update.tool_call_ids = contentPart.tool_call_ids;
      }
      updatedContent[actualIndex] = update;
    } else if (
      contentType.startsWith(ContentTypes.AGENT_UPDATE) &&
      ContentTypes.AGENT_UPDATE in contentPart &&
      contentPart.agent_update
    ) {
      const update: Agents.AgentUpdate = {
        type: ContentTypes.AGENT_UPDATE,
        agent_update: contentPart.agent_update,
      };

      updatedContent[actualIndex] = update;
    } else if (
      contentType.startsWith(ContentTypes.THINK) &&
      ContentTypes.THINK in contentPart &&
      typeof contentPart.think === 'string'
    ) {
      const currentContent = updatedContent[actualIndex] as ReasoningDeltaUpdate;
      const update: ReasoningDeltaUpdate = {
        type: ContentTypes.THINK,
        think: (currentContent.think || '') + contentPart.think,
      };

      updatedContent[actualIndex] = update;
    } else if (contentType === ContentTypes.IMAGE_URL && 'image_url' in contentPart) {
      const currentContent = updatedContent[actualIndex] as {
        type: ContentTypes.IMAGE_URL;
        image_url: string;
      };
      updatedContent[actualIndex] = {
        ...currentContent,
      };
    } else if (contentType === ContentTypes.TOOL_CALL && 'tool_call' in contentPart) {
      const existingContent = updatedContent[actualIndex] as Agents.ToolCallContent | undefined;
      const existingToolCall = existingContent?.tool_call;
      const toolCallArgs = (contentPart.tool_call as Agents.ToolCall).args;
      /** When args are a valid object, they are likely already invoked */
      const args =
        finalUpdate ||
        typeof existingToolCall?.args === 'object' ||
        typeof toolCallArgs === 'object'
          ? contentPart.tool_call.args
          : (existingToolCall?.args ?? '') + (toolCallArgs ?? '');

      const id = getNonEmptyValue([contentPart.tool_call.id, existingToolCall?.id]) ?? '';
      const name = getNonEmptyValue([contentPart.tool_call.name, existingToolCall?.name]) ?? '';

      const newToolCall: Agents.ToolCall & PartMetadata = {
        id,
        name,
        args,
        type: ToolCallTypes.TOOL_CALL,
        auth: contentPart.tool_call.auth,
        expires_at: contentPart.tool_call.expires_at,
      };

      if (finalUpdate) {
        newToolCall.progress = 1;
        newToolCall.output = contentPart.tool_call.output;
      }

      updatedContent[actualIndex] = {
        type: ContentTypes.TOOL_CALL,
        tool_call: newToolCall,
      };
    }

    // 过滤掉所有 null/undefined 值，并确保所有元素都有 type 属性
    const finalContent = updatedContent.filter(
      (item) => item != null && item !== null && item.type != null,
    ) as TMessageContentParts[];
    
    // 检查是否还有 null/undefined 值或缺少 type 属性的元素（理论上不应该有了）
    const invalidItems = finalContent
      .map((item, i) => {
        if (item == null || item === null || !item.type) {
          return i;
        }
        return null;
      })
      .filter((i) => i !== null);
    
    if (invalidItems.length > 0) {
      logger.warn(
        'step_handler',
        `Found invalid items (null/undefined or missing type) in final content array after filtering.`,
        {
          messageId: message.messageId,
          invalidIndices: invalidItems,
          contentLength: finalContent.length,
          contentType,
        },
      );
      // 再次过滤以确保清理所有无效项
      const cleanedContent = finalContent.filter(
        (item) => item != null && item !== null && item.type != null,
      ) as TMessageContentParts[];
      return { ...message, content: cleanedContent };
    }

    return { ...message, content: finalContent };
  };

  const stepHandler = useCallback(
    ({ event, data }: TStepEvent, submission: EventSubmission) => {
      const messages = getMessages() || [];
      const { userMessage } = submission;
      setIsSubmitting(true);
      let parentMessageId = userMessage.messageId;

      const currentTime = Date.now();
      if (currentTime - lastAnnouncementTimeRef.current > MESSAGE_UPDATE_INTERVAL) {
        announcePolite({ message: 'composing', isStatus: true });
        lastAnnouncementTimeRef.current = currentTime;
      }

      let initialContent: TMessageContentParts[] = [];
      if (submission?.editedContent != null) {
        initialContent = submission?.initialResponse?.content ?? initialContent;
      }

      if (event === 'on_run_step') {
        const runStep = data as Agents.RunStep;
        let responseMessageId = runStep.runId ?? '';
        if (responseMessageId === Constants.USE_PRELIM_RESPONSE_MESSAGE_ID) {
          responseMessageId = submission?.initialResponse?.messageId ?? '';
          parentMessageId = submission?.initialResponse?.parentMessageId ?? '';
        }
        if (!responseMessageId) {
          console.warn('No message id found in run step event');
          return;
        }

        stepMap.current.set(runStep.id, runStep);
        let response = messageMap.current.get(responseMessageId);

        if (!response) {
          const responseMessage = messages[messages.length - 1] as TMessage;

          response = {
            ...responseMessage,
            parentMessageId,
            conversationId: userMessage.conversationId,
            messageId: responseMessageId,
            content: initialContent,
          };

          const cleanedResponse = ensureContentIsDense(response);
          messageMap.current.set(responseMessageId, cleanedResponse);
          setMessages([...messages.slice(0, -1), cleanedResponse]);
        }

        // Store tool call IDs if present
        if (runStep.stepDetails.type === StepTypes.TOOL_CALLS) {
          let updatedResponse = { ...response };
          
          (runStep.stepDetails.tool_calls as Agents.ToolCall[]).forEach((toolCall, toolCallIndex) => {
            const toolCallId = toolCall.id ?? '';
            if ('id' in toolCall && toolCallId) {
              toolCallIdMap.current.set(runStep.id, toolCallId);
            }

            // 每次循环时重新计算过滤后的内容，检查是否已经存在相同的工具调用
            const currentFilteredContent = (updatedResponse.content || []).filter(
              (c) => c != null,
            ) as TMessageContentParts[];
            
            let existingIndex = -1;
            if (toolCallId) {
              for (let i = 0; i < currentFilteredContent.length; i++) {
                const part = currentFilteredContent[i];
                if (
                  part?.type === ContentTypes.TOOL_CALL &&
                  (part[ContentTypes.TOOL_CALL] as Agents.ToolCall)?.id === toolCallId
                ) {
                  existingIndex = i;
                  break;
                }
              }
            }

            // 如果已存在，跳过添加（由delta事件负责更新）
            if (existingIndex >= 0) {
              return;
            }

            const contentPart: Agents.MessageContentComplex = {
              type: ContentTypes.TOOL_CALL,
              tool_call: {
                name: toolCall.name ?? '',
                args: toolCall.args,
                id: toolCallId,
              },
            };

            // 使用当前内容长度作为索引，添加新的工具调用
            const currentIndex = currentFilteredContent.length;
            updatedResponse = updateContent(updatedResponse, currentIndex, contentPart);
          });

          const cleanedResponse = ensureContentIsDense(updatedResponse);
          messageMap.current.set(responseMessageId, cleanedResponse);
          const updatedMessages = messages.map((msg) =>
            msg.messageId === responseMessageId ? cleanedResponse : ensureContentIsDense(msg),
          );

          setMessages(updatedMessages);
        }
      } else if (event === 'on_agent_update') {
        const { agent_update } = data as Agents.AgentUpdate;
        let responseMessageId = agent_update.runId || '';
        if (responseMessageId === Constants.USE_PRELIM_RESPONSE_MESSAGE_ID) {
          responseMessageId = submission?.initialResponse?.messageId ?? '';
          parentMessageId = submission?.initialResponse?.parentMessageId ?? '';
        }
        if (!responseMessageId) {
          console.warn('No message id found in agent update event');
          return;
        }

        const response = messageMap.current.get(responseMessageId);
        if (response) {
          // Agent updates don't need index adjustment
          const currentIndex = agent_update.index + initialContent.length;
          const updatedResponse = updateContent(response, currentIndex, data);
          const cleanedResponse = ensureContentIsDense(updatedResponse);
          messageMap.current.set(responseMessageId, cleanedResponse);
          const currentMessages = getMessages() || [];
          setMessages([...currentMessages.slice(0, -1).map(ensureContentIsDense), cleanedResponse]);
        }
      } else if (event === 'on_message_delta') {
        const messageDelta = data as Agents.MessageDeltaEvent;
        const runStep = stepMap.current.get(messageDelta.id);
        let responseMessageId = runStep?.runId ?? '';
        if (responseMessageId === Constants.USE_PRELIM_RESPONSE_MESSAGE_ID) {
          responseMessageId = submission?.initialResponse?.messageId ?? '';
          parentMessageId = submission?.initialResponse?.parentMessageId ?? '';
        }

        if (!runStep || !responseMessageId) {
          console.warn('No run step or runId found for message delta event');
          return;
        }

        const response = messageMap.current.get(responseMessageId);
        if (response && messageDelta.delta.content) {
          const contentPart = Array.isArray(messageDelta.delta.content)
            ? messageDelta.delta.content[0]
            : messageDelta.delta.content;

          const currentIndex = calculateContentIndex(
            runStep.index,
            initialContent,
            contentPart.type || '',
            response.content,
          );
          const updatedResponse = updateContent(response, currentIndex, contentPart);

          const cleanedResponse = ensureContentIsDense(updatedResponse);
          messageMap.current.set(responseMessageId, cleanedResponse);
          const currentMessages = getMessages() || [];
          setMessages([...currentMessages.slice(0, -1).map(ensureContentIsDense), cleanedResponse]);
        }
      } else if (event === 'on_reasoning_delta') {
        const reasoningDelta = data as Agents.ReasoningDeltaEvent;
        const runStep = stepMap.current.get(reasoningDelta.id);
        let responseMessageId = runStep?.runId ?? '';
        if (responseMessageId === Constants.USE_PRELIM_RESPONSE_MESSAGE_ID) {
          responseMessageId = submission?.initialResponse?.messageId ?? '';
          parentMessageId = submission?.initialResponse?.parentMessageId ?? '';
        }

        if (!runStep || !responseMessageId) {
          console.warn('No run step or runId found for reasoning delta event');
          return;
        }

        const response = messageMap.current.get(responseMessageId);
        if (response && reasoningDelta.delta.content != null) {
          const contentPart = Array.isArray(reasoningDelta.delta.content)
            ? reasoningDelta.delta.content[0]
            : reasoningDelta.delta.content;

          const currentIndex = calculateContentIndex(
            runStep.index,
            initialContent,
            contentPart.type || '',
            response.content,
          );
          const updatedResponse = updateContent(response, currentIndex, contentPart);

          const cleanedResponse = ensureContentIsDense(updatedResponse);
          messageMap.current.set(responseMessageId, cleanedResponse);
          const currentMessages = getMessages() || [];
          setMessages([...currentMessages.slice(0, -1).map(ensureContentIsDense), cleanedResponse]);
        }
      } else if (event === 'on_run_step_delta') {
        const runStepDelta = data as Agents.RunStepDeltaEvent;
        const runStep = stepMap.current.get(runStepDelta.id);
        let responseMessageId = runStep?.runId ?? '';
        if (responseMessageId === Constants.USE_PRELIM_RESPONSE_MESSAGE_ID) {
          responseMessageId = submission?.initialResponse?.messageId ?? '';
          parentMessageId = submission?.initialResponse?.parentMessageId ?? '';
        }

        if (!runStep || !responseMessageId) {
          console.warn('No run step or runId found for run step delta event');
          return;
        }

        const response = messageMap.current.get(responseMessageId);
        if (
          response &&
          runStepDelta.delta.type === StepTypes.TOOL_CALLS &&
          runStepDelta.delta.tool_calls
        ) {
          let updatedResponse = { ...response };

          runStepDelta.delta.tool_calls.forEach((toolCallDelta, toolCallIndex) => {
            const toolCallId = toolCallIdMap.current.get(runStepDelta.id) ?? '';

            const contentPart: Agents.MessageContentComplex = {
              type: ContentTypes.TOOL_CALL,
              tool_call: {
                name: toolCallDelta.name ?? '',
                args: toolCallDelta.args ?? '',
                id: toolCallId,
              },
            };

            if (runStepDelta.delta.auth != null) {
              contentPart.tool_call.auth = runStepDelta.delta.auth;
              contentPart.tool_call.expires_at = runStepDelta.delta.expires_at;
            }

            // 查找现有工具调用的位置，避免重复添加
            const filteredContent = (updatedResponse.content || []).filter(
              (c) => c != null,
            ) as TMessageContentParts[];
            
            let existingIndex = -1;
            if (toolCallId) {
              // 直接遍历content数组，找到匹配的工具调用ID
              for (let i = 0; i < filteredContent.length; i++) {
                const part = filteredContent[i];
                if (
                  part?.type === ContentTypes.TOOL_CALL &&
                  (part[ContentTypes.TOOL_CALL] as Agents.ToolCall)?.id === toolCallId
                ) {
                  existingIndex = i;
                  break;
                }
              }
            }

            // 如果找到了现有的工具调用，更新它；否则添加到末尾
            const currentIndex =
              existingIndex >= 0
                ? existingIndex
                : filteredContent.length;

            updatedResponse = updateContent(updatedResponse, currentIndex, contentPart);
          });

          const cleanedResponse = ensureContentIsDense(updatedResponse);
          messageMap.current.set(responseMessageId, cleanedResponse);
          const updatedMessages = messages.map((msg) =>
            msg.messageId === responseMessageId ? cleanedResponse : ensureContentIsDense(msg),
          );

          setMessages(updatedMessages);
        }
      } else if (event === 'on_run_step_completed') {
        const { result } = data as unknown as { result: Agents.ToolEndEvent };

        const { id: stepId } = result;

        const runStep = stepMap.current.get(stepId);
        let responseMessageId = runStep?.runId ?? '';
        if (responseMessageId === Constants.USE_PRELIM_RESPONSE_MESSAGE_ID) {
          responseMessageId = submission?.initialResponse?.messageId ?? '';
          parentMessageId = submission?.initialResponse?.parentMessageId ?? '';
        }

        if (!runStep || !responseMessageId) {
          console.warn('No run step or runId found for completed tool call event');
          return;
        }

        const response = messageMap.current.get(responseMessageId);
        if (response) {
          let updatedResponse = { ...response };

          const contentPart: Agents.MessageContentComplex = {
            type: ContentTypes.TOOL_CALL,
            tool_call: result.tool_call,
          };

          /** Use the index from the ToolEndEvent, which is the content index of the tool call */
          const currentIndex = result.index ?? runStep.index + initialContent.length;
          updatedResponse = updateContent(updatedResponse, currentIndex, contentPart, true);

          const cleanedResponse = ensureContentIsDense(updatedResponse);
          messageMap.current.set(responseMessageId, cleanedResponse);
          const updatedMessages = messages.map((msg) =>
            msg.messageId === responseMessageId ? cleanedResponse : ensureContentIsDense(msg),
          );

          setMessages(updatedMessages);
        }
      }

      return () => {
        toolCallIdMap.current.clear();
        messageMap.current.clear();
        stepMap.current.clear();
      };
    },
    [getMessages, setIsSubmitting, lastAnnouncementTimeRef, announcePolite, setMessages],
  );

  const clearStepMaps = useCallback(() => {
    toolCallIdMap.current.clear();
    messageMap.current.clear();
    stepMap.current.clear();
  }, []);
  return { stepHandler, clearStepMaps };
}
