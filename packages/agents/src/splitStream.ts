import { nanoid } from 'nanoid';
import type * as t from '@/types';
import { ContentTypes, GraphEvents, StepTypes } from '@/common';

export const SEPARATORS = [
  '. ',
  '?',
  '!',
  '۔',
  '- ',
  '。',
  '‥',
  ';',
  '¡',
  '¿',
  '\n',
  '```',
];

export class SplitStreamHandler {
  private inCodeBlock = false;
  private inThinkBlock = false;
  private accumulate: boolean;
  tokens: string[] = [];
  lastToken = '';
  reasoningTokens: string[] = [];
  currentStepId?: string;
  currentMessageId?: string;
  currentType?: ContentTypes.TEXT | ContentTypes.THINK;
  currentLength = 0;
  reasoningKey: 'reasoning_content' | 'reasoning' = 'reasoning_content';
  currentIndex = -1;
  blockThreshold = 4500;
  /** The run ID AKA the Message ID associated with the complete generation */
  runId: string;
  handlers?: t.SplitStreamHandlers;
  constructor({
    runId,
    handlers,
    accumulate,
    reasoningKey,
    blockThreshold,
  }: {
    runId: string;
    accumulate?: boolean;
    handlers: t.SplitStreamHandlers;
    blockThreshold?: number;
    reasoningKey?: 'reasoning_content' | 'reasoning';
  }) {
    this.runId = runId;
    this.handlers = handlers;
    if (reasoningKey) {
      this.reasoningKey = reasoningKey;
    }
    if (blockThreshold != null) {
      this.blockThreshold = blockThreshold;
    }
    this.accumulate = accumulate ?? false;
  }
  getMessageId = (): string | undefined => {
    const messageId = this.currentMessageId;
    if (messageId != null && messageId) {
      return messageId;
    }
    return undefined;
  };
  createMessageStep = (
    type?: ContentTypes.TEXT | ContentTypes.THINK
  ): [string, string] => {
    if (type != null && this.currentType !== type) {
      this.currentType = type;
    }
    this.currentLength = 0;
    this.currentIndex += 1;
    this.currentStepId = `step_${nanoid()}`;
    this.currentMessageId = `msg_${nanoid()}`;
    return [this.currentStepId, this.currentMessageId];
  };
  dispatchRunStep = (stepId: string, stepDetails: t.StepDetails): void => {
    const runStep: t.RunStep = {
      id: stepId,
      runId: this.runId,
      type: stepDetails.type,
      index: this.currentIndex,
      stepDetails,
      // usage: null,
    };
    this.handlers?.[GraphEvents.ON_RUN_STEP]?.({
      event: GraphEvents.ON_RUN_STEP,
      data: runStep,
    });
  };
  dispatchMessageDelta = (stepId: string, delta: t.MessageDelta): void => {
    const messageDelta: t.MessageDeltaEvent = {
      id: stepId,
      delta,
    };
    this.handlers?.[GraphEvents.ON_MESSAGE_DELTA]?.({
      event: GraphEvents.ON_MESSAGE_DELTA,
      data: messageDelta,
    });
  };
  dispatchReasoningDelta = (stepId: string, delta: t.ReasoningDelta): void => {
    const reasoningDelta: t.ReasoningDeltaEvent = {
      id: stepId,
      delta,
    };
    this.handlers?.[GraphEvents.ON_REASONING_DELTA]?.({
      event: GraphEvents.ON_REASONING_DELTA,
      data: reasoningDelta,
    });
  };
  handleContent = (
    content: string,
    _type: ContentTypes.TEXT | ContentTypes.THINK
  ): void => {
    let type = _type;
    if (this.inThinkBlock && type === ContentTypes.TEXT) {
      type = ContentTypes.THINK;
    }
    if (this.accumulate) {
      if (type === ContentTypes.THINK) {
        this.reasoningTokens.push(content);
      } else {
        this.tokens.push(content);
      }
    }

    if (this.currentType !== type) {
      const [newStepId, newMessageId] = this.createMessageStep(type);
      this.dispatchRunStep(newStepId, {
        type: StepTypes.MESSAGE_CREATION,
        message_creation: {
          message_id: newMessageId,
        },
      });
    }

    const stepId = this.currentStepId ?? '';
    if (type === ContentTypes.THINK) {
      this.dispatchReasoningDelta(stepId, {
        content: [
          {
            type: ContentTypes.THINK,
            think: content,
          },
        ],
      });
    } else {
      this.dispatchMessageDelta(stepId, {
        content: [
          {
            type: ContentTypes.TEXT,
            text: content,
          },
        ],
      });
    }

    this.currentLength += content.length;
    if (this.inCodeBlock) {
      return;
    }

    if (
      this.currentLength > this.blockThreshold &&
      SEPARATORS.some((sep) => content.includes(sep))
    ) {
      const [newStepId, newMessageId] = this.createMessageStep(type);
      this.dispatchRunStep(newStepId, {
        type: StepTypes.MESSAGE_CREATION,
        message_creation: {
          message_id: newMessageId,
        },
      });
    }
  };
  getDeltaContent(chunk?: t.CustomChunk): string {
    return (chunk?.choices?.[0]?.delta as t.CustomChunkDelta)?.content ?? '';
  }
  getReasoningDelta(chunk?: t.CustomChunk): string {
    return (
      (chunk?.choices?.[0]?.delta as t.CustomChunkDelta)?.[this.reasoningKey] ??
      ''
    );
  }
  handle(chunk?: t.CustomChunk): void {
    if (!chunk) {
      return;
    }

    const content = this.getDeltaContent(chunk);
    const reasoning_content = this.getReasoningDelta(chunk);
    if (!content.length && !reasoning_content.length) {
      return;
    }

    if (content.includes('```')) {
      this.inCodeBlock = !this.inCodeBlock;
    }

    if (content.includes('<think>') && !this.inCodeBlock) {
      this.inThinkBlock = true;
    } else if (this.lastToken.includes('</think>') && !this.inCodeBlock) {
      this.inThinkBlock = false;
    }

    this.lastToken = content;

    const message_id = this.getMessageId() ?? '';

    if (!message_id) {
      const initialContentType = this.inThinkBlock
        ? ContentTypes.THINK
        : ContentTypes.TEXT;
      const initialType = reasoning_content
        ? ContentTypes.THINK
        : initialContentType;
      const [stepId, message_id] = this.createMessageStep(initialType);
      this.dispatchRunStep(stepId, {
        type: StepTypes.MESSAGE_CREATION,
        message_creation: {
          message_id,
        },
      });
    }

    if (reasoning_content) {
      this.handleContent(reasoning_content, ContentTypes.THINK);
    } else {
      this.handleContent(content, ContentTypes.TEXT);
    }
  }
}
