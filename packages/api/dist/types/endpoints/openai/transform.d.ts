import type { ClientOptions } from '@librechat/agents';
import type * as t from '~/types';
/**
 * Transforms a Non-OpenAI LLM config to an OpenAI-conformant config.
 * Non-OpenAI parameters are moved to modelKwargs.
 * Also extracts configuration options that belong in configOptions.
 * Handles addParams and dropParams for parameter customization.
 */
export declare function transformToOpenAIConfig({ addParams, dropParams, llmConfig, fromEndpoint, }: {
    addParams?: Record<string, unknown>;
    dropParams?: string[];
    llmConfig: ClientOptions;
    fromEndpoint: string;
}): {
    llmConfig: t.OAIClientOptions;
    configOptions: Partial<t.OpenAIConfiguration>;
};
//# sourceMappingURL=transform.d.ts.map