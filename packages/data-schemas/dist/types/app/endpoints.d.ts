import type { TCustomConfig, TAgentsEndpoint } from 'librechat-data-provider';
/**
 * Loads custom config endpoints
 * @param [config]
 * @param [agentsDefaults]
 */
export declare const loadEndpoints: (config: Partial<TCustomConfig>, agentsDefaults?: Partial<TAgentsEndpoint>) => {
    openAI?: Partial<{
        apiKey: string;
        baseURL: string;
        name: string;
        models: {
            default: (string | {
                name: string;
                description?: string | undefined;
            })[];
            fetch?: boolean | undefined;
            userIdQuery?: boolean | undefined;
        };
        customParams: {
            defaultParamsEndpoint: string;
            paramDefinitions?: Record<string, any>[] | undefined;
        };
        iconURL?: string | undefined;
        headers?: Record<string, any> | undefined;
        streamRate?: number | undefined;
        titlePrompt?: string | undefined;
        titleModel?: string | undefined;
        titleConvo?: boolean | undefined;
        titleMethod?: "completion" | "functions" | "structured" | undefined;
        titleEndpoint?: string | undefined;
        titlePromptTemplate?: string | undefined;
        addParams?: Record<string, any> | undefined;
        dropParams?: string[] | undefined;
        forcePrompt?: boolean | undefined;
        summarize?: boolean | undefined;
        summaryModel?: string | undefined;
        modelDisplayLabel?: string | undefined;
        customOrder?: number | undefined;
        directEndpoint?: boolean | undefined;
        titleMessageRole?: string | undefined;
    }> | undefined;
    google?: Partial<{
        apiKey: string;
        baseURL: string;
        name: string;
        models: {
            default: (string | {
                name: string;
                description?: string | undefined;
            })[];
            fetch?: boolean | undefined;
            userIdQuery?: boolean | undefined;
        };
        customParams: {
            defaultParamsEndpoint: string;
            paramDefinitions?: Record<string, any>[] | undefined;
        };
        iconURL?: string | undefined;
        headers?: Record<string, any> | undefined;
        streamRate?: number | undefined;
        titlePrompt?: string | undefined;
        titleModel?: string | undefined;
        titleConvo?: boolean | undefined;
        titleMethod?: "completion" | "functions" | "structured" | undefined;
        titleEndpoint?: string | undefined;
        titlePromptTemplate?: string | undefined;
        addParams?: Record<string, any> | undefined;
        dropParams?: string[] | undefined;
        forcePrompt?: boolean | undefined;
        summarize?: boolean | undefined;
        summaryModel?: string | undefined;
        modelDisplayLabel?: string | undefined;
        customOrder?: number | undefined;
        directEndpoint?: boolean | undefined;
        titleMessageRole?: string | undefined;
    }> | undefined;
    bedrock?: Partial<{
        apiKey: string;
        baseURL: string;
        name: string;
        models: {
            default: (string | {
                name: string;
                description?: string | undefined;
            })[];
            fetch?: boolean | undefined;
            userIdQuery?: boolean | undefined;
        };
        customParams: {
            defaultParamsEndpoint: string;
            paramDefinitions?: Record<string, any>[] | undefined;
        };
        iconURL?: string | undefined;
        headers?: Record<string, any> | undefined;
        streamRate?: number | undefined;
        titlePrompt?: string | undefined;
        titleModel?: string | undefined;
        titleConvo?: boolean | undefined;
        titleMethod?: "completion" | "functions" | "structured" | undefined;
        titleEndpoint?: string | undefined;
        titlePromptTemplate?: string | undefined;
        addParams?: Record<string, any> | undefined;
        dropParams?: string[] | undefined;
        forcePrompt?: boolean | undefined;
        summarize?: boolean | undefined;
        summaryModel?: string | undefined;
        modelDisplayLabel?: string | undefined;
        customOrder?: number | undefined;
        directEndpoint?: boolean | undefined;
        titleMessageRole?: string | undefined;
    }> | undefined;
    anthropic?: Partial<{
        apiKey: string;
        baseURL: string;
        name: string;
        models: {
            default: (string | {
                name: string;
                description?: string | undefined;
            })[];
            fetch?: boolean | undefined;
            userIdQuery?: boolean | undefined;
        };
        customParams: {
            defaultParamsEndpoint: string;
            paramDefinitions?: Record<string, any>[] | undefined;
        };
        iconURL?: string | undefined;
        headers?: Record<string, any> | undefined;
        streamRate?: number | undefined;
        titlePrompt?: string | undefined;
        titleModel?: string | undefined;
        titleConvo?: boolean | undefined;
        titleMethod?: "completion" | "functions" | "structured" | undefined;
        titleEndpoint?: string | undefined;
        titlePromptTemplate?: string | undefined;
        addParams?: Record<string, any> | undefined;
        dropParams?: string[] | undefined;
        forcePrompt?: boolean | undefined;
        summarize?: boolean | undefined;
        summaryModel?: string | undefined;
        modelDisplayLabel?: string | undefined;
        customOrder?: number | undefined;
        directEndpoint?: boolean | undefined;
        titleMessageRole?: string | undefined;
    }> | undefined;
    gptPlugins?: Partial<{
        apiKey: string;
        baseURL: string;
        name: string;
        models: {
            default: (string | {
                name: string;
                description?: string | undefined;
            })[];
            fetch?: boolean | undefined;
            userIdQuery?: boolean | undefined;
        };
        customParams: {
            defaultParamsEndpoint: string;
            paramDefinitions?: Record<string, any>[] | undefined;
        };
        iconURL?: string | undefined;
        headers?: Record<string, any> | undefined;
        streamRate?: number | undefined;
        titlePrompt?: string | undefined;
        titleModel?: string | undefined;
        titleConvo?: boolean | undefined;
        titleMethod?: "completion" | "functions" | "structured" | undefined;
        titleEndpoint?: string | undefined;
        titlePromptTemplate?: string | undefined;
        addParams?: Record<string, any> | undefined;
        dropParams?: string[] | undefined;
        forcePrompt?: boolean | undefined;
        summarize?: boolean | undefined;
        summaryModel?: string | undefined;
        modelDisplayLabel?: string | undefined;
        customOrder?: number | undefined;
        directEndpoint?: boolean | undefined;
        titleMessageRole?: string | undefined;
    }> | undefined;
    azureOpenAI?: import("librechat-data-provider").TAzureConfig | undefined;
    assistants?: Partial<{
        version: string | number;
        retrievalModels: string[];
        capabilities: import("librechat-data-provider").Capabilities[];
        apiKey?: string | undefined;
        baseURL?: string | undefined;
        headers?: Record<string, any> | undefined;
        streamRate?: number | undefined;
        titlePrompt?: string | undefined;
        titleModel?: string | undefined;
        titleConvo?: boolean | undefined;
        titleMethod?: "completion" | "functions" | "structured" | undefined;
        titleEndpoint?: string | undefined;
        titlePromptTemplate?: string | undefined;
        models?: {
            default: (string | {
                name: string;
                description?: string | undefined;
            })[];
            fetch?: boolean | undefined;
            userIdQuery?: boolean | undefined;
        } | undefined;
        disableBuilder?: boolean | undefined;
        pollIntervalMs?: number | undefined;
        timeoutMs?: number | undefined;
        supportedIds?: string[] | undefined;
        excludedIds?: string[] | undefined;
        privateAssistants?: boolean | undefined;
    }> | undefined;
    azureAssistants?: Partial<{
        version: string | number;
        retrievalModels: string[];
        capabilities: import("librechat-data-provider").Capabilities[];
        apiKey?: string | undefined;
        baseURL?: string | undefined;
        headers?: Record<string, any> | undefined;
        streamRate?: number | undefined;
        titlePrompt?: string | undefined;
        titleModel?: string | undefined;
        titleConvo?: boolean | undefined;
        titleMethod?: "completion" | "functions" | "structured" | undefined;
        titleEndpoint?: string | undefined;
        titlePromptTemplate?: string | undefined;
        models?: {
            default: (string | {
                name: string;
                description?: string | undefined;
            })[];
            fetch?: boolean | undefined;
            userIdQuery?: boolean | undefined;
        } | undefined;
        disableBuilder?: boolean | undefined;
        pollIntervalMs?: number | undefined;
        timeoutMs?: number | undefined;
        supportedIds?: string[] | undefined;
        excludedIds?: string[] | undefined;
        privateAssistants?: boolean | undefined;
    }> | undefined;
    all?: Partial<{
        apiKey: string;
        baseURL: string;
        name: string;
        models: {
            default: (string | {
                name: string;
                description?: string | undefined;
            })[];
            fetch?: boolean | undefined;
            userIdQuery?: boolean | undefined;
        };
        customParams: {
            defaultParamsEndpoint: string;
            paramDefinitions?: Record<string, any>[] | undefined;
        };
        iconURL?: string | undefined;
        headers?: Record<string, any> | undefined;
        streamRate?: number | undefined;
        titlePrompt?: string | undefined;
        titleModel?: string | undefined;
        titleConvo?: boolean | undefined;
        titleMethod?: "completion" | "functions" | "structured" | undefined;
        titleEndpoint?: string | undefined;
        titlePromptTemplate?: string | undefined;
        addParams?: Record<string, any> | undefined;
        dropParams?: string[] | undefined;
        forcePrompt?: boolean | undefined;
        summarize?: boolean | undefined;
        summaryModel?: string | undefined;
        modelDisplayLabel?: string | undefined;
        customOrder?: number | undefined;
        directEndpoint?: boolean | undefined;
        titleMessageRole?: string | undefined;
    }> | undefined;
    agents?: Partial<{
        disableBuilder: boolean;
        capabilities: import("librechat-data-provider").AgentCapabilities[];
        maxCitations: number;
        maxCitationsPerFile: number;
        minRelevanceScore: number;
        baseURL?: string | undefined;
        streamRate?: number | undefined;
        titlePrompt?: string | undefined;
        titleModel?: string | undefined;
        titleConvo?: boolean | undefined;
        titleMethod?: "completion" | "functions" | "structured" | undefined;
        titleEndpoint?: string | undefined;
        titlePromptTemplate?: string | undefined;
        recursionLimit?: number | undefined;
        maxRecursionLimit?: number | undefined;
        allowedProviders?: string[] | undefined;
    }> | undefined;
    custom?: {
        iconURL?: string | undefined;
        apiKey?: string | undefined;
        baseURL?: string | undefined;
        headers?: Record<string, any> | undefined;
        name?: string | undefined;
        streamRate?: number | undefined;
        titlePrompt?: string | undefined;
        titleModel?: string | undefined;
        titleConvo?: boolean | undefined;
        titleMethod?: "completion" | "functions" | "structured" | undefined;
        titleEndpoint?: string | undefined;
        titlePromptTemplate?: string | undefined;
        models?: {
            default: (string | {
                name: string;
                description?: string | undefined;
            })[];
            fetch?: boolean | undefined;
            userIdQuery?: boolean | undefined;
        } | undefined;
        addParams?: Record<string, any> | undefined;
        dropParams?: string[] | undefined;
        forcePrompt?: boolean | undefined;
        summarize?: boolean | undefined;
        summaryModel?: string | undefined;
        modelDisplayLabel?: string | undefined;
        customParams?: {
            defaultParamsEndpoint: string;
            paramDefinitions?: Record<string, any>[] | undefined;
        } | undefined;
        customOrder?: number | undefined;
        directEndpoint?: boolean | undefined;
        titleMessageRole?: string | undefined;
    }[] | undefined;
};
