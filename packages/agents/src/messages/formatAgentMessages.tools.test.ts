import { HumanMessage, AIMessage, ToolMessage } from '@langchain/core/messages';
import type { TPayload } from '@/types';
import { formatAgentMessages } from './format';
import { ContentTypes } from '@/common';

describe('formatAgentMessages with tools parameter', () => {
  it('should process messages normally when tools is not provided', () => {
    const payload: TPayload = [
      { role: 'user', content: 'Hello' },
      {
        role: 'assistant',
        content: [
          {
            type: ContentTypes.TEXT,
            [ContentTypes.TEXT]: 'Let me check that for you.',
            tool_call_ids: ['123'],
          },
          {
            type: ContentTypes.TOOL_CALL,
            tool_call: {
              id: '123',
              name: 'search',
              args: '{"query":"weather"}',
              output: 'The weather is sunny.',
            },
          },
        ],
      },
    ];

    const result = formatAgentMessages(payload);

    expect(result.messages).toHaveLength(3);
    expect(result.messages[0]).toBeInstanceOf(HumanMessage);
    expect(result.messages[1]).toBeInstanceOf(AIMessage);
    expect(result.messages[2]).toBeInstanceOf(ToolMessage);
    expect((result.messages[1] as AIMessage).tool_calls).toHaveLength(1);
    expect((result.messages[2] as ToolMessage).tool_call_id).toBe('123');
  });

  it('should treat an empty tools set the same as disallowing all tools', () => {
    const payload: TPayload = [
      { role: 'user', content: 'What\'s the weather?' },
      {
        role: 'assistant',
        content: [
          {
            type: ContentTypes.TEXT,
            [ContentTypes.TEXT]: 'Let me check the weather for you.',
            tool_call_ids: ['weather_1'],
          },
          {
            type: ContentTypes.TOOL_CALL,
            tool_call: {
              id: 'weather_1',
              name: 'check_weather',
              args: '{"location":"New York"}',
              output: 'Sunny, 75°F',
            },
          },
        ],
      },
    ];

    // Provide an empty set of allowed tools
    const allowedTools = new Set<string>();

    const result = formatAgentMessages(payload, undefined, allowedTools);

    // Should convert to a single AIMessage with string content
    expect(result.messages).toHaveLength(2);
    expect(result.messages[0]).toBeInstanceOf(HumanMessage);
    expect(result.messages[1]).toBeInstanceOf(AIMessage);

    // The content should be a string representation of both messages
    expect(typeof result.messages[1].content).toBe('string');
    expect(result.messages[1].content).toEqual(
      'AI: Let me check the weather for you.\nTool: check_weather, Sunny, 75°F'
    );
  });

  it('should convert tool messages to string when tool is not in the allowed set', () => {
    const payload: TPayload = [
      { role: 'user', content: 'What\'s the weather?' },
      {
        role: 'assistant',
        content: [
          {
            type: ContentTypes.TEXT,
            [ContentTypes.TEXT]: 'Let me check the weather for you.',
            tool_call_ids: ['weather_1'],
          },
          {
            type: ContentTypes.TOOL_CALL,
            tool_call: {
              id: 'weather_1',
              name: 'check_weather',
              args: '{"location":"New York"}',
              output: 'Sunny, 75°F',
            },
          },
        ],
      },
    ];

    // Provide a set of allowed tools that doesn't include 'check_weather'
    const allowedTools = new Set(['search', 'calculator']);

    const result = formatAgentMessages(payload, undefined, allowedTools);

    // Should convert to a single AIMessage with string content
    expect(result.messages).toHaveLength(2);
    expect(result.messages[0]).toBeInstanceOf(HumanMessage);
    expect(result.messages[1]).toBeInstanceOf(AIMessage);

    // The content should be a string representation of both messages
    expect(typeof result.messages[1].content).toBe('string');
    expect(result.messages[1].content).toEqual(
      'AI: Let me check the weather for you.\nTool: check_weather, Sunny, 75°F'
    );
  });

  it('should not convert tool messages when tool is in the allowed set', () => {
    const payload: TPayload = [
      { role: 'user', content: 'What\'s the weather?' },
      {
        role: 'assistant',
        content: [
          {
            type: ContentTypes.TEXT,
            [ContentTypes.TEXT]: 'Let me check the weather for you.',
            tool_call_ids: ['weather_1'],
          },
          {
            type: ContentTypes.TOOL_CALL,
            tool_call: {
              id: 'weather_1',
              name: 'check_weather',
              args: '{"location":"New York"}',
              output: 'Sunny, 75°F',
            },
          },
        ],
      },
    ];

    // Provide a set of allowed tools that includes 'check_weather'
    const allowedTools = new Set(['check_weather', 'search']);

    const result = formatAgentMessages(payload, undefined, allowedTools);

    // Should keep the original structure
    expect(result.messages).toHaveLength(3);
    expect(result.messages[0]).toBeInstanceOf(HumanMessage);
    expect(result.messages[1]).toBeInstanceOf(AIMessage);
    expect(result.messages[2]).toBeInstanceOf(ToolMessage);
  });

  it('should handle multiple tool calls with mixed allowed/disallowed tools', () => {
    const payload: TPayload = [
      {
        role: 'user',
        content: 'Tell me about the weather and calculate something',
      },
      {
        role: 'assistant',
        content: [
          {
            type: ContentTypes.TEXT,
            [ContentTypes.TEXT]: 'Let me check the weather first.',
            tool_call_ids: ['weather_1'],
          },
          {
            type: ContentTypes.TOOL_CALL,
            tool_call: {
              id: 'weather_1',
              name: 'check_weather',
              args: '{"location":"New York"}',
              output: 'Sunny, 75°F',
            },
          },
          {
            type: ContentTypes.TEXT,
            [ContentTypes.TEXT]: 'Now let me calculate something for you.',
            tool_call_ids: ['calc_1'],
          },
          {
            type: ContentTypes.TOOL_CALL,
            tool_call: {
              id: 'calc_1',
              name: 'calculator',
              args: '{"expression":"1+1"}',
              output: '2',
            },
          },
        ],
      },
    ];

    // Allow calculator but not check_weather
    const allowedTools = new Set(['calculator', 'search']);

    const result = formatAgentMessages(payload, undefined, allowedTools);

    // Should convert the entire sequence to a single AIMessage
    expect(result.messages).toHaveLength(2);
    expect(result.messages[0]).toBeInstanceOf(HumanMessage);
    expect(result.messages[1]).toBeInstanceOf(AIMessage);

    // The content should include all parts
    expect(typeof result.messages[1].content).toBe('string');
    expect(result.messages[1].content).toContain(
      'Let me check the weather first.'
    );
    expect(result.messages[1].content).toContain('Sunny, 75°F');
    expect(result.messages[1].content).toContain(
      'Now let me calculate something for you.'
    );
    expect(result.messages[1].content).toContain('2');
  });

  it('should update indexTokenCountMap correctly when converting tool messages', () => {
    const payload: TPayload = [
      { role: 'user', content: 'What\'s the weather?' },
      {
        role: 'assistant',
        content: [
          {
            type: ContentTypes.TEXT,
            [ContentTypes.TEXT]: 'Let me check the weather for you.',
            tool_call_ids: ['weather_1'],
          },
          {
            type: ContentTypes.TOOL_CALL,
            tool_call: {
              id: 'weather_1',
              name: 'check_weather',
              args: '{"location":"New York"}',
              output: 'Sunny, 75°F',
            },
          },
        ],
      },
    ];

    const indexTokenCountMap = {
      0: 10, // 10 tokens for user message
      1: 40, // 40 tokens for assistant message with tool call
    };

    // Provide a set of allowed tools that doesn't include 'check_weather'
    const allowedTools = new Set(['search', 'calculator']);

    const result = formatAgentMessages(
      payload,
      indexTokenCountMap,
      allowedTools
    );

    // Should have 2 messages and 2 entries in the token count map
    expect(result.messages).toHaveLength(2);
    expect(Object.keys(result.indexTokenCountMap || {}).length).toBe(2);

    // User message token count should be unchanged
    expect(result.indexTokenCountMap?.[0]).toBe(10);

    // All assistant message tokens should be assigned to the single AIMessage
    expect(result.indexTokenCountMap?.[1]).toBe(40);
  });

  it('should heal invalid tool call structure when converting to string', () => {
    const payload: TPayload = [
      {
        role: 'assistant',
        content: [
          {
            type: ContentTypes.TOOL_CALL,
            tool_call: {
              id: 'tool_1',
              name: 'check_weather',
              args: '{"location":"New York"}',
              output: 'Sunny, 75°F',
            },
          },
        ],
      },
    ];

    // Provide a set of allowed tools that doesn't include 'check_weather'
    const allowedTools = new Set(['search', 'calculator']);

    const result = formatAgentMessages(payload, undefined, allowedTools);

    // Should convert to a single AIMessage with string content
    expect(result.messages).toHaveLength(1);
    expect(result.messages[0]).toBeInstanceOf(AIMessage);

    // The content should be a string representation of the tool message
    expect(typeof result.messages[0].content).toBe('string');
    expect(result.messages[0].content).toContain('check_weather');
    expect(result.messages[0].content).toContain('Sunny, 75°F');
  });

  it('should handle complex sequences with multiple tool calls', () => {
    const payload: TPayload = [
      { role: 'user', content: 'Help me with a complex task' },
      {
        role: 'assistant',
        content: [
          {
            type: ContentTypes.TEXT,
            [ContentTypes.TEXT]: 'I\'ll search for information first.',
            tool_call_ids: ['search_1'],
          },
          {
            type: ContentTypes.TOOL_CALL,
            tool_call: {
              id: 'search_1',
              name: 'search',
              args: '{"query":"complex task"}',
              output: 'Found information about complex tasks.',
            },
          },
        ],
      },
      {
        role: 'assistant',
        content: [
          {
            type: ContentTypes.TEXT,
            [ContentTypes.TEXT]: 'Now I\'ll check the weather.',
            tool_call_ids: ['weather_1'],
          },
          {
            type: ContentTypes.TOOL_CALL,
            tool_call: {
              id: 'weather_1',
              name: 'check_weather',
              args: '{"location":"New York"}',
              output: 'Sunny, 75°F',
            },
          },
        ],
      },
      {
        role: 'assistant',
        content: [
          {
            type: ContentTypes.TEXT,
            [ContentTypes.TEXT]: 'Finally, I\'ll calculate something.',
            tool_call_ids: ['calc_1'],
          },
          {
            type: ContentTypes.TOOL_CALL,
            tool_call: {
              id: 'calc_1',
              name: 'calculator',
              args: '{"expression":"1+1"}',
              output: '2',
            },
          },
        ],
      },
      {
        role: 'assistant',
        content: 'Here\'s your answer based on all that information.',
      },
    ];

    // Allow search and calculator but not check_weather
    const allowedTools = new Set(['search', 'calculator']);

    const result = formatAgentMessages(payload, undefined, allowedTools);

    // Should have the user message, search tool sequence (2 messages),
    // a combined message for weather and calculator (since one has an invalid tool),
    // and final message
    expect(result.messages).toHaveLength(5);

    // Check the types of messages
    expect(result.messages[0]).toBeInstanceOf(HumanMessage);
    expect(result.messages[1]).toBeInstanceOf(AIMessage); // Search message
    expect(result.messages[2]).toBeInstanceOf(ToolMessage); // Search tool response
    expect(result.messages[3]).toBeInstanceOf(AIMessage); // Converted weather+calculator message
    expect(result.messages[4]).toBeInstanceOf(AIMessage); // Final message

    // Check that the combined message was converted to a string
    expect(typeof result.messages[3].content).toBe('string');

    // The format might vary based on the getBufferString implementation
    // but we should check that all the key information is present
    const content = result.messages[3].content as string;
    expect(content).toContain('Now I\'ll check the weather');
    expect(content).toContain('Sunny');
    expect(content).toContain('75');
    expect(content).toContain('Finally');
    expect(content).toContain('calculate');
    expect(content).toContain('2');
  });
});
