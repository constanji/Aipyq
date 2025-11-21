import { EModelEndpoint } from 'librechat-data-provider';
import type * as t from '~/types';
export declare const knownOpenAIParams: Set<string>;
export declare function getOpenAILLMConfig({ azure, apiKey, baseURL, endpoint, streaming, addParams, dropParams, useOpenRouter, modelOptions: _modelOptions, }: {
    apiKey: string;
    streaming: boolean;
    baseURL?: string | null;
    endpoint?: EModelEndpoint | string | null;
    modelOptions: Partial<t.OpenAIParameters>;
    addParams?: Record<string, unknown>;
    dropParams?: string[];
    useOpenRouter?: boolean;
    azure?: false | t.AzureOptions;
}): Pick<t.LLMConfigResult, 'llmConfig' | 'tools'> & {
    azure?: t.AzureOptions;
};
//# sourceMappingURL=llm.d.ts.map