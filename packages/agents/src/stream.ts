// src/stream.ts
import type { ChatOpenAIReasoningSummary } from '@langchain/openai';
import type { AIMessageChunk } from '@langchain/core/messages';
import type { ToolCall } from '@langchain/core/messages/tool';
import type { AgentContext } from '@/agents/AgentContext';
import type { StandardGraph } from '@/graphs';
import type * as t from '@/types';
import {
  ToolCallTypes,
  ContentTypes,
  GraphEvents,
  StepTypes,
  Providers,
} from '@/common';
import {
  handleServerToolResult,
  handleToolCallChunks,
  handleToolCalls,
} from '@/tools/handlers';
import { getMessageId } from '@/messages';

/**
 * Parses content to extract thinking sections enclosed in <think> tags using string operations
 * @param content The content to parse
 * @returns An object with separated text and thinking content
 */
function parseThinkingContent(content: string): {
  text: string;
  thinking: string;
} {
  // If no think tags, return the original content as text
  if (!content.includes('<think>')) {
    return { text: content, thinking: '' };
  }

  let textResult = '';
  const thinkingResult: string[] = [];
  let position = 0;

  while (position < content.length) {
    const thinkStart = content.indexOf('<think>', position);

    if (thinkStart === -1) {
      // No more think tags, add the rest and break
      textResult += content.slice(position);
      break;
    }

    // Add text before the think tag
    textResult += content.slice(position, thinkStart);

    const thinkEnd = content.indexOf('</think>', thinkStart);
    if (thinkEnd === -1) {
      // Malformed input, no closing tag
      textResult += content.slice(thinkStart);
      break;
    }

    // Add the thinking content
    const thinkContent = content.slice(thinkStart + 7, thinkEnd);
    thinkingResult.push(thinkContent);

    // Move position to after the think tag
    position = thinkEnd + 8; // 8 is the length of '</think>'
  }

  return {
    text: textResult.trim(),
    thinking: thinkingResult.join('\n').trim(),
  };
}

function getNonEmptyValue(possibleValues: string[]): string | undefined {
  for (const value of possibleValues) {
    if (value && value.trim() !== '') {
      return value;
    }
  }
  return undefined;
}

export function getChunkContent({
  chunk,
  provider,
  reasoningKey,
}: {
  chunk?: Partial<AIMessageChunk>;
  provider?: Providers;
  reasoningKey: 'reasoning_content' | 'reasoning';
}): string | t.MessageContentComplex[] | undefined {
  if (
    (provider === Providers.OPENAI || provider === Providers.AZURE) &&
    (
      chunk?.additional_kwargs?.reasoning as
        | Partial<ChatOpenAIReasoningSummary>
        | undefined
    )?.summary?.[0]?.text != null &&
    ((
      chunk?.additional_kwargs?.reasoning as
        | Partial<ChatOpenAIReasoningSummary>
        | undefined
    )?.summary?.[0]?.text?.length ?? 0) > 0
  ) {
    return (
      chunk?.additional_kwargs?.reasoning as
        | Partial<ChatOpenAIReasoningSummary>
        | undefined
    )?.summary?.[0]?.text;
  }
  return (
    ((chunk?.additional_kwargs?.[reasoningKey] as string | undefined) ?? '') ||
    chunk?.content
  );
}

export class ChatModelStreamHandler implements t.EventHandler {
  async handle(
    event: string,
    data: t.StreamEventData,
    metadata?: Record<string, unknown>,
    graph?: StandardGraph
  ): Promise<void> {
    if (!graph) {
      throw new Error('Graph not found');
    }
    if (!graph.config) {
      throw new Error('Config not found in graph');
    }
    if (!data.chunk) {
      console.warn(`No chunk found in ${event} event`);
      return;
    }

    const agentContext = graph.getAgentContext(metadata);

    const chunk = data.chunk as Partial<AIMessageChunk>;
    const content = getChunkContent({
      chunk,
      reasoningKey: agentContext.reasoningKey,
      provider: agentContext.provider,
    });
    const skipHandling = await handleServerToolResult({
      graph,
      content,
      metadata,
      agentContext,
    });
    if (skipHandling) {
      return;
    }
    this.handleReasoning(chunk, agentContext);
    let hasToolCalls = false;
    if (
      chunk.tool_calls &&
      chunk.tool_calls.length > 0 &&
      chunk.tool_calls.every(
        (tc) =>
          tc.id != null &&
          tc.id !== '' &&
          (tc as Partial<ToolCall>).name != null &&
          tc.name !== ''
      )
    ) {
      hasToolCalls = true;
      await handleToolCalls(chunk.tool_calls, metadata, graph);
    }

    const hasToolCallChunks =
      (chunk.tool_call_chunks && chunk.tool_call_chunks.length > 0) ?? false;
    const isEmptyContent =
      typeof content === 'undefined' ||
      !content.length ||
      (typeof content === 'string' && !content);

    /** Set a preliminary message ID if found in empty chunk */
    const isEmptyChunk = isEmptyContent && !hasToolCallChunks;
    if (
      isEmptyChunk &&
      (chunk.id ?? '') !== '' &&
      !graph.prelimMessageIdsByStepKey.has(chunk.id ?? '')
    ) {
      const stepKey = graph.getStepKey(metadata);
      graph.prelimMessageIdsByStepKey.set(stepKey, chunk.id ?? '');
    } else if (isEmptyChunk) {
      return;
    }

    const stepKey = graph.getStepKey(metadata);

    if (
      hasToolCallChunks &&
      chunk.tool_call_chunks &&
      chunk.tool_call_chunks.length &&
      typeof chunk.tool_call_chunks[0]?.index === 'number'
    ) {
      await handleToolCallChunks({
        graph,
        stepKey,
        toolCallChunks: chunk.tool_call_chunks,
        metadata,
      });
    }

    if (isEmptyContent) {
      return;
    }

    const message_id = getMessageId(stepKey, graph) ?? '';
    if (message_id) {
      await graph.dispatchRunStep(
        stepKey,
        {
          type: StepTypes.MESSAGE_CREATION,
          message_creation: {
            message_id,
          },
        },
        metadata
      );
    }

    const stepId = graph.getStepIdByKey(stepKey);
    const runStep = graph.getRunStep(stepId);
    if (!runStep) {
      console.warn(`\n
==============================================================


Run step for ${stepId} does not exist, cannot dispatch delta event.

event: ${event}
stepId: ${stepId}
stepKey: ${stepKey}
message_id: ${message_id}
hasToolCalls: ${hasToolCalls}
hasToolCallChunks: ${hasToolCallChunks}

==============================================================
\n`);
      return;
    }

    /* Note: tool call chunks may have non-empty content that matches the current tool chunk generation */
    if (typeof content === 'string' && runStep.type === StepTypes.TOOL_CALLS) {
      return;
    } else if (
      hasToolCallChunks &&
      (chunk.tool_call_chunks?.some((tc) => tc.args === content) ?? false)
    ) {
      return;
    } else if (typeof content === 'string') {
      if (agentContext.currentTokenType === ContentTypes.TEXT) {
        await graph.dispatchMessageDelta(stepId, {
          content: [
            {
              type: ContentTypes.TEXT,
              text: content,
            },
          ],
        });
      } else if (agentContext.currentTokenType === 'think_and_text') {
        const { text, thinking } = parseThinkingContent(content);
        if (thinking) {
          await graph.dispatchReasoningDelta(stepId, {
            content: [
              {
                type: ContentTypes.THINK,
                think: thinking,
              },
            ],
          });
        }
        if (text) {
          agentContext.currentTokenType = ContentTypes.TEXT;
          agentContext.tokenTypeSwitch = 'content';
          const newStepKey = graph.getStepKey(metadata);
          const message_id = getMessageId(newStepKey, graph) ?? '';
          await graph.dispatchRunStep(
            newStepKey,
            {
              type: StepTypes.MESSAGE_CREATION,
              message_creation: {
                message_id,
              },
            },
            metadata
          );

          const newStepId = graph.getStepIdByKey(newStepKey);
          await graph.dispatchMessageDelta(newStepId, {
            content: [
              {
                type: ContentTypes.TEXT,
                text: text,
              },
            ],
          });
        }
      } else {
        await graph.dispatchReasoningDelta(stepId, {
          content: [
            {
              type: ContentTypes.THINK,
              think: content,
            },
          ],
        });
      }
    } else if (
      content.every((c) => c.type?.startsWith(ContentTypes.TEXT) ?? false)
    ) {
      await graph.dispatchMessageDelta(stepId, {
        content,
      });
    } else if (
      content.every(
        (c) =>
          (c.type?.startsWith(ContentTypes.THINKING) ?? false) ||
          (c.type?.startsWith(ContentTypes.REASONING) ?? false) ||
          (c.type?.startsWith(ContentTypes.REASONING_CONTENT) ?? false)
      )
    ) {
      await graph.dispatchReasoningDelta(stepId, {
        content: content.map((c) => ({
          type: ContentTypes.THINK,
          think:
            (c as t.ThinkingContentText).thinking ??
            (c as Partial<t.GoogleReasoningContentText>).reasoning ??
            (c as Partial<t.BedrockReasoningContentText>).reasoningText?.text ??
            '',
        })),
      });
    }
  }
  handleReasoning(
    chunk: Partial<AIMessageChunk>,
    agentContext: AgentContext
  ): void {
    let reasoning_content = chunk.additional_kwargs?.[
      agentContext.reasoningKey
    ] as string | Partial<ChatOpenAIReasoningSummary> | undefined;
    if (
      Array.isArray(chunk.content) &&
      (chunk.content[0]?.type === ContentTypes.THINKING ||
        chunk.content[0]?.type === ContentTypes.REASONING ||
        chunk.content[0]?.type === ContentTypes.REASONING_CONTENT)
    ) {
      reasoning_content = 'valid';
    } else if (
      (agentContext.provider === Providers.OPENAI ||
        agentContext.provider === Providers.AZURE) &&
      reasoning_content != null &&
      typeof reasoning_content !== 'string' &&
      reasoning_content.summary?.[0]?.text != null &&
      reasoning_content.summary[0].text
    ) {
      reasoning_content = 'valid';
    }
    if (
      reasoning_content != null &&
      reasoning_content !== '' &&
      (chunk.content == null ||
        chunk.content === '' ||
        reasoning_content === 'valid')
    ) {
      agentContext.currentTokenType = ContentTypes.THINK;
      agentContext.tokenTypeSwitch = 'reasoning';
      return;
    } else if (
      agentContext.tokenTypeSwitch === 'reasoning' &&
      agentContext.currentTokenType !== ContentTypes.TEXT &&
      ((chunk.content != null && chunk.content !== '') ||
        (chunk.tool_calls?.length ?? 0) > 0 ||
        (chunk.tool_call_chunks?.length ?? 0) > 0)
    ) {
      agentContext.currentTokenType = ContentTypes.TEXT;
      agentContext.tokenTypeSwitch = 'content';
    } else if (
      chunk.content != null &&
      typeof chunk.content === 'string' &&
      chunk.content.includes('<think>') &&
      chunk.content.includes('</think>')
    ) {
      agentContext.currentTokenType = 'think_and_text';
      agentContext.tokenTypeSwitch = 'content';
    } else if (
      chunk.content != null &&
      typeof chunk.content === 'string' &&
      chunk.content.includes('<think>')
    ) {
      agentContext.currentTokenType = ContentTypes.THINK;
      agentContext.tokenTypeSwitch = 'content';
    } else if (
      agentContext.lastToken != null &&
      agentContext.lastToken.includes('</think>')
    ) {
      agentContext.currentTokenType = ContentTypes.TEXT;
      agentContext.tokenTypeSwitch = 'content';
    }
    if (typeof chunk.content !== 'string') {
      return;
    }
    agentContext.lastToken = chunk.content;
  }
}

export function createContentAggregator(): t.ContentAggregatorResult {
  const contentParts: Array<t.MessageContentComplex | undefined> = [];
  const stepMap = new Map<string, t.RunStep>();
  const toolCallIdMap = new Map<string, string>();

  const updateContent = (
    index: number,
    contentPart?: t.MessageContentComplex,
    finalUpdate = false
  ): void => {
    if (!contentPart) {
      console.warn('No content part found in \'updateContent\'');
      return;
    }
    const partType = contentPart.type ?? '';
    if (!partType) {
      console.warn('No content type found in content part');
      return;
    }

    if (!contentParts[index]) {
      contentParts[index] = { type: partType };
    }

    if (!partType.startsWith(contentParts[index]?.type ?? '')) {
      console.warn('Content type mismatch');
      return;
    }

    if (
      partType.startsWith(ContentTypes.TEXT) &&
      ContentTypes.TEXT in contentPart &&
      typeof contentPart.text === 'string'
    ) {
      // TODO: update this!!
      const currentContent = contentParts[index] as t.MessageDeltaUpdate;
      const update: t.MessageDeltaUpdate = {
        type: ContentTypes.TEXT,
        text: (currentContent.text || '') + contentPart.text,
      };

      if (contentPart.tool_call_ids) {
        update.tool_call_ids = contentPart.tool_call_ids;
      }
      contentParts[index] = update;
    } else if (
      partType.startsWith(ContentTypes.THINK) &&
      ContentTypes.THINK in contentPart &&
      typeof contentPart.think === 'string'
    ) {
      const currentContent = contentParts[index] as t.ReasoningDeltaUpdate;
      const update: t.ReasoningDeltaUpdate = {
        type: ContentTypes.THINK,
        think: (currentContent.think || '') + contentPart.think,
      };
      contentParts[index] = update;
    } else if (
      partType.startsWith(ContentTypes.AGENT_UPDATE) &&
      ContentTypes.AGENT_UPDATE in contentPart &&
      contentPart.agent_update != null
    ) {
      const update: t.AgentUpdate = {
        type: ContentTypes.AGENT_UPDATE,
        agent_update: contentPart.agent_update,
      };

      contentParts[index] = update;
    } else if (
      partType === ContentTypes.IMAGE_URL &&
      'image_url' in contentPart
    ) {
      const currentContent = contentParts[index] as {
        type: 'image_url';
        image_url: string;
      };
      contentParts[index] = {
        ...currentContent,
      };
    } else if (
      partType === ContentTypes.TOOL_CALL &&
      'tool_call' in contentPart
    ) {
      const incomingName = contentPart.tool_call.name;
      const incomingId = contentPart.tool_call.id;
      const toolCallArgs = (contentPart.tool_call as t.ToolCallPart).args;

      // When we receive a tool call with a name, it's the complete tool call
      // Consolidate with any previously accumulated args from chunks
      const hasValidName = incomingName != null && incomingName !== '';
      // hasArgs: args is not null/undefined (empty string '' is valid for replacing empty object {})
      const hasArgs = toolCallArgs != null;

      // Process if:
      // 1. Incoming has a valid name (complete tool call)
      // 2. Incoming has args to accumulate (tool_call_chunk with args, including empty string)
      // 3. We're doing a final update with complete data
      // This allows us to accumulate args from tool_call_chunk events even without a name
      if (!hasValidName && !hasArgs && !finalUpdate) {
        return;
      }

      const existingContent = contentParts[index] as
        | (Omit<t.ToolCallContent, 'tool_call'> & {
            tool_call?: t.ToolCallPart;
          })
        | undefined;

      /** When args are a valid object, they are likely already invoked */
      let args: string | Record<string, any>;
      if (finalUpdate || typeof toolCallArgs === 'object') {
        // 如果是最终更新或 args 是对象，直接使用
        args = contentPart.tool_call.args;
      } else if (typeof existingContent?.tool_call?.args === 'object') {
        // 如果现有 args 是对象，但新的是字符串，需要特殊处理
        // 检查是否为空对象，如果是空对象，应该视为空字符串以便累积
        const isEmptyObject = Object.keys(existingContent.tool_call.args).length === 0;
        if (isEmptyObject) {
          // 空对象视为空字符串，累积新的字符串
          if (toolCallArgs == null) {
            args = '';
          } else {
            args = '' + toolCallArgs;
          }
        } else {
          // 非空对象，转换为字符串后累积
          if (toolCallArgs == null) {
            args = existingContent.tool_call.args;
          } else {
            args = JSON.stringify(existingContent.tool_call.args) + toolCallArgs;
          }
        }
      } else {
        // 字符串累积逻辑
        if (toolCallArgs == null) {
          // 如果新的 args 是 null/undefined，保留已累积的值
          args = existingContent?.tool_call?.args ?? '';
        } else if (typeof existingContent?.tool_call?.args === 'string' && typeof toolCallArgs === 'string') {
          // 如果两者都是字符串，检查 toolCallArgs 是否已经包含了 existingContent.tool_call.args
          // 如果包含，说明 toolCallArgs 已经是累积后的值，直接使用
          // 否则，进行累积
          if (existingContent.tool_call.args && 
              toolCallArgs.length >= existingContent.tool_call.args.length && 
              toolCallArgs.startsWith(existingContent.tool_call.args)) {
            // toolCallArgs 已经包含了 existingContent.tool_call.args，说明已经累积过了，直接使用
            args = toolCallArgs;
          } else if (existingContent.tool_call.args === '') {
            // 如果现有值是空字符串，toolCallArgs 应该已经是累积后的值，直接使用
            args = toolCallArgs;
          } else {
            // 需要累积
            args = (existingContent?.tool_call?.args ?? '') + toolCallArgs;
          }
        } else {
          // 累积字符串
          args = (existingContent?.tool_call?.args ?? '') + toolCallArgs;
        }
      }
      
      if (
        finalUpdate &&
        args == null &&
        existingContent?.tool_call?.args != null
      ) {
        args = existingContent.tool_call.args;
      }

      const id =
        getNonEmptyValue([incomingId, existingContent?.tool_call?.id]) ?? '';
      const name =
        getNonEmptyValue([incomingName, existingContent?.tool_call?.name]) ??
        '';

      const newToolCall: ToolCall & t.PartMetadata = {
        id,
        name,
        args,
        type: ToolCallTypes.TOOL_CALL,
      };

      if (finalUpdate) {
        newToolCall.progress = 1;
        newToolCall.output = contentPart.tool_call.output;
      }

      contentParts[index] = {
        type: ContentTypes.TOOL_CALL,
        tool_call: newToolCall,
      };
    }
  };

  const aggregateContent = ({
    event,
    data,
  }: {
    event: GraphEvents;
    data:
      | t.RunStep
      | t.AgentUpdate
      | t.MessageDeltaEvent
      | t.RunStepDeltaEvent
      | { result: t.ToolEndEvent };
  }): void => {
    if (event === GraphEvents.ON_RUN_STEP) {
      const runStep = data as t.RunStep;
      
      // 验证 runStep 的有效性
      if (!runStep || !runStep.id || !runStep.stepDetails) {
        console.warn('Invalid runStep in ON_RUN_STEP event', { runStep, event });
        return;
      }
      
      stepMap.set(runStep.id, runStep);

      // Store tool call IDs if present
      if (
        runStep.stepDetails.type === StepTypes.TOOL_CALLS &&
        runStep.stepDetails.tool_calls &&
        Array.isArray(runStep.stepDetails.tool_calls)
      ) {
        (runStep.stepDetails.tool_calls as ToolCall[]).forEach((toolCall) => {
          // 验证 toolCall 的有效性
          if (!toolCall || typeof toolCall !== 'object' || toolCall === null) {
            console.warn('Invalid toolCall in tool_calls array', { toolCall });
            return;
          }
          const toolCallId = toolCall.id ?? '';
          if ('id' in toolCall && toolCallId) {
            toolCallIdMap.set(runStep.id, toolCallId);
          }
          const contentPart: t.MessageContentComplex = {
            type: ContentTypes.TOOL_CALL,
            tool_call: {
              args: toolCall.args,
              name: toolCall.name,
              id: toolCallId,
            },
          };

          updateContent(runStep.index, contentPart);
        });
      }
    } else if (event === GraphEvents.ON_MESSAGE_DELTA) {
      const messageDelta = data as t.MessageDeltaEvent;
      
      // 验证 messageDelta 的有效性
      if (!messageDelta || !messageDelta.id || !messageDelta.delta) {
        console.warn('Invalid messageDelta in ON_MESSAGE_DELTA event', { messageDelta, event });
        return;
      }
      
      const runStep = stepMap.get(messageDelta.id);
      if (!runStep) {
        console.warn('No run step or runId found for message delta event');
        return;
      }

      if (messageDelta.delta.content) {
        const contentPart = Array.isArray(messageDelta.delta.content)
          ? messageDelta.delta.content[0]
          : messageDelta.delta.content;

        // 验证 contentPart 的有效性
        if (!contentPart || typeof contentPart !== 'object' || contentPart === null) {
          console.warn('Invalid contentPart in ON_MESSAGE_DELTA', { contentPart });
          return;
        }

        updateContent(runStep.index, contentPart);
      }
    } else if (
      event === GraphEvents.ON_AGENT_UPDATE &&
      (data as t.AgentUpdate | undefined)?.agent_update
    ) {
      const contentPart = data as t.AgentUpdate | undefined;
      if (!contentPart || !contentPart.agent_update) {
        return;
      }
      // 验证 agent_update 的有效性
      if (typeof contentPart.agent_update.index !== 'number') {
        console.warn('Invalid agent_update.index in ON_AGENT_UPDATE', { contentPart });
        return;
      }
      updateContent(contentPart.agent_update.index, contentPart);
    } else if (event === GraphEvents.ON_REASONING_DELTA) {
      const reasoningDelta = data as t.ReasoningDeltaEvent;
      
      // 验证 reasoningDelta 的有效性
      if (!reasoningDelta || !reasoningDelta.id || !reasoningDelta.delta) {
        console.warn('Invalid reasoningDelta in ON_REASONING_DELTA event', { reasoningDelta, event });
        return;
      }
      
      const runStep = stepMap.get(reasoningDelta.id);
      if (!runStep) {
        console.warn('No run step or runId found for reasoning delta event');
        return;
      }

      if (reasoningDelta.delta.content) {
        const contentPart = Array.isArray(reasoningDelta.delta.content)
          ? reasoningDelta.delta.content[0]
          : reasoningDelta.delta.content;

        // 验证 contentPart 的有效性
        if (!contentPart || typeof contentPart !== 'object' || contentPart === null) {
          console.warn('Invalid contentPart in ON_REASONING_DELTA', { contentPart });
          return;
        }

        updateContent(runStep.index, contentPart);
      }
    } else if (event === GraphEvents.ON_RUN_STEP_DELTA) {
      const runStepDelta = data as t.RunStepDeltaEvent;
      
      // 验证 runStepDelta 的有效性
      if (!runStepDelta || !runStepDelta.id || !runStepDelta.delta) {
        console.warn('Invalid runStepDelta in ON_RUN_STEP_DELTA event', { runStepDelta, event });
        return;
      }
      
      const runStep = stepMap.get(runStepDelta.id);
      if (!runStep) {
        console.warn('No run step or runId found for run step delta event');
        return;
      }

      if (
        runStepDelta.delta.type === StepTypes.TOOL_CALLS &&
        runStepDelta.delta.tool_calls &&
        Array.isArray(runStepDelta.delta.tool_calls)
      ) {
        runStepDelta.delta.tool_calls.forEach((toolCallDelta) => {
          // 验证 toolCallDelta 的有效性
          if (!toolCallDelta || typeof toolCallDelta !== 'object' || toolCallDelta === null) {
            console.warn('Invalid toolCallDelta in tool_calls array', { toolCallDelta });
            return;
          }
          // Skip chunks with null args (these are typically final chunks indicating completion)
          // The accumulated args should be preserved in the existing content
          if (toolCallDelta.args === null || toolCallDelta.args === undefined) {
            return;
          }

          const toolCallId = toolCallIdMap.get(runStepDelta.id);

          const contentPart: t.MessageContentComplex = {
            type: ContentTypes.TOOL_CALL,
            tool_call: {
              args: toolCallDelta.args,
              name: toolCallDelta.name,
              id: toolCallId,
            },
          };

          updateContent(runStep.index, contentPart);
        });
      }
    } else if (event === GraphEvents.ON_RUN_STEP_COMPLETED) {
      const { result } = data as unknown as { result: t.ToolEndEvent };

      // 验证 result 的有效性
      if (!result || typeof result !== 'object' || result === null) {
        console.warn('Invalid result in ON_RUN_STEP_COMPLETED event', { result, event });
        return;
      }

      const { id: stepId } = result;

      if (!stepId) {
        console.warn('Missing stepId in ON_RUN_STEP_COMPLETED result', { result });
        return;
      }

      const runStep = stepMap.get(stepId);
      if (!runStep) {
        console.warn(
          'No run step or runId found for completed tool call event'
        );
        return;
      }

      // 验证 tool_call 的有效性
      if (!result.tool_call || typeof result.tool_call !== 'object' || result.tool_call === null) {
        console.warn('Invalid tool_call in ON_RUN_STEP_COMPLETED result', { result });
        return;
      }

      const contentPart: t.MessageContentComplex = {
        type: ContentTypes.TOOL_CALL,
        tool_call: result.tool_call,
      };

      updateContent(runStep.index, contentPart, true);
    }
  };

  return { contentParts, aggregateContent, stepMap };
}
