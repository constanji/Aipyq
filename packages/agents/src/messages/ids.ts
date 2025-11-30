// src/stream.ts
import { nanoid } from 'nanoid';
import type { Graph } from '@/graphs';
import type * as t from '@/types';

export const getMessageId = (
  stepKey: string,
  graph: Graph<t.BaseGraphState>,
  returnExistingId = false
): string | undefined => {
  const messageId = graph.messageIdsByStepKey.get(stepKey);
  if (messageId != null && messageId) {
    return returnExistingId ? messageId : undefined;
  }

  const prelimMessageId = graph.prelimMessageIdsByStepKey.get(stepKey);
  if (prelimMessageId != null && prelimMessageId) {
    graph.prelimMessageIdsByStepKey.delete(stepKey);
    graph.messageIdsByStepKey.set(stepKey, prelimMessageId);
    return prelimMessageId;
  }

  const message_id = `msg_${nanoid()}`;
  graph.messageIdsByStepKey.set(stepKey, message_id);
  return message_id;
};
