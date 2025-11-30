
// import { nanoid } from 'nanoid';
import type OpenAITypes from 'openai';
import type * as t from '@/types';
// import { SplitStreamHandler } from '@/splitStream';
// import { GraphEvents } from '@/common';
import { sleep } from '@/utils';

const choiceProps: OpenAITypes.Chat.Completions.ChatCompletionChunk.Choice = { finish_reason: null, index: 0, delta: {} };
const reasoningSplitRegex = /(?<=\s+)|(?=\s+)/;
const contentSplitRegex = /(?<=<\/?think>)|(?=<\/?think>)|(?<=\s+)|(?=\s+)/;
export const createMockStream = (options: {
  text?: string;
  reasoningText?: string;
  streamRate?: number;
  reasoningKey?: 'reasoning' | 'reasoning_content';
} = {}) => {
  const {
    text,
    reasoningText,
    streamRate = 25,
    reasoningKey = 'reasoning_content'
  } = options;

  return async function* mockOpenAIStream(): AsyncGenerator<t.CustomChunk> {
    const content = text ?? `Here's a sample message that includes code:
\`\`\`python
def hello_world():
    print("Hello, World!")
    # This is a long code block
    # That shouldn't be split
    return True
\`\`\`
Now we're back to regular text. This is a very long sentence that should probably be split at some point because it exceeds our threshold and contains multiple natural breaking points. Let's see how it handles this case properly.

Here's another code block:
\`\`\`javascript
console.log("Another test");
// More code here
\`\`\`
And finally some more regular text to test our splitting logic.`;

    if (reasoningText != null && reasoningText) {
      // Split reasoning text into "token-like" chunks
      const reasoningTokens = reasoningText.split(reasoningSplitRegex);
      for (const token of reasoningTokens) {
        yield {
          choices: [{
            ...choiceProps,
            delta: {
              [reasoningKey]: token,
            },
          }]
        };
        await sleep(streamRate);
      }
    }

    // Split main content into "token-like" chunks
    const tokens = content.split(contentSplitRegex);
    for (const token of tokens) {
      yield {
        choices: [{
          ...choiceProps,
          delta: {
            content: token
          }
        }]
      };
      await sleep(streamRate);
    }
  };
};

/**
(async function testStream(): Promise<void> {
  const runId = nanoid();

  const streamHandler = new SplitStreamHandler({
    runId,
    handlers: {
      [GraphEvents.ON_RUN_STEP]: (data): void => {
        console.dir(data, { depth: null });
      },
      [GraphEvents.ON_MESSAGE_DELTA]: (): void => {
        // console.dir(data, { depth: null });
      },
    },
  });
  const stream = createMockStream({
    reasoningText: 'This is a test reasoning text.',
    streamRate: 5,
  })();

  for await (const chunk of stream) {
    streamHandler.handle(chunk);
  }
})();
 */