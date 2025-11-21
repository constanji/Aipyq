import type * as t from '~/types';
/**
 * Generates configuration options for creating a language model (LLM) instance.
 * @param apiKey - The API key for authentication.
 * @param options - Additional options for configuring the LLM.
 * @param endpoint - The endpoint name
 * @returns Configuration options for creating an LLM instance.
 */
export declare function getOpenAIConfig(apiKey: string, options?: t.OpenAIConfigOptions, endpoint?: string | null): t.OpenAIConfigResult;
//# sourceMappingURL=config.d.ts.map