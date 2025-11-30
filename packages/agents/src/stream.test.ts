import type { AIMessageChunk } from '@langchain/core/messages';
import type { ChatOpenAIReasoningSummary } from '@langchain/openai';
import { getChunkContent } from './stream';
import { Providers } from '@/common';

describe('getChunkContent', () => {
  it('should handle reasoning content for OpenAI/Azure providers', () => {
    const chunk: Partial<AIMessageChunk> = {
      content: 'Regular content',
      additional_kwargs: {
        reasoning: {
          summary: [{ text: 'Reasoning summary text' }],
        } as Partial<ChatOpenAIReasoningSummary>,
      },
    };

    const result = getChunkContent({
      chunk,
      provider: Providers.OPENAI,
      reasoningKey: 'reasoning',
    });

    expect(result).toBe('Reasoning summary text');
  });

  it('should fallback to reasoningKey when no OpenAI reasoning summary', () => {
    const chunk: Partial<AIMessageChunk> = {
      content: 'Regular content',
      additional_kwargs: {
        reasoning_content: 'Reasoning from key',
      },
    };

    const result = getChunkContent({
      chunk,
      reasoningKey: 'reasoning_content',
    });

    expect(result).toBe('Reasoning from key');
  });

  it('should fallback to chunk.content when reasoningKey value is null or undefined', () => {
    const chunk: Partial<AIMessageChunk> = {
      content: 'Fallback content',
      additional_kwargs: {
        reasoning_content: null,
      },
    };

    const result = getChunkContent({
      chunk,
      reasoningKey: 'reasoning_content',
    });

    expect(result).toBe('Fallback content');
  });

  it('should fallback to chunk.content when reasoningKey value is empty string', () => {
    const chunk: Partial<AIMessageChunk> = {
      content: ' can',
      additional_kwargs: {
        reasoning_content: '',
      },
    };

    const result = getChunkContent({
      chunk,
      reasoningKey: 'reasoning_content',
    });

    expect(result).toBe(' can');
  });

  it('should return undefined when no content is available', () => {
    const chunk: Partial<AIMessageChunk> = {
      additional_kwargs: {},
    };

    const result = getChunkContent({
      chunk,
      reasoningKey: 'reasoning',
    });

    expect(result).toBeUndefined();
  });

  it('should handle missing chunk gracefully', () => {
    const result = getChunkContent({
      reasoningKey: 'reasoning',
    });

    expect(result).toBeUndefined();
  });
});
