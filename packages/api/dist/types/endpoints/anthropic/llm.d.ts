import type { AnthropicLLMConfigResult, AnthropicConfigOptions } from '~/types/anthropic';
/**
 * Generates configuration options for creating an Anthropic language model (LLM) instance.
 * @param apiKey - The API key for authentication with Anthropic.
 * @param options={} - Additional options for configuring the LLM.
 * @returns Configuration options for creating an Anthropic LLM instance, with null and undefined values removed.
 */
declare function getLLMConfig(apiKey?: string, options?: AnthropicConfigOptions): AnthropicLLMConfigResult;
export { getLLMConfig };
//# sourceMappingURL=llm.d.ts.map