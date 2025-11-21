import { z } from 'zod';
import type { ZodError } from 'zod';
import type { TModelsConfig } from './types';
import { EModelEndpoint } from './schemas';
import { TSpecsConfig } from './models';
import { FileSources } from './types/files';
export declare const defaultSocialLogins: string[];
export declare const defaultRetrievalModels: string[];
export declare const excludedKeys: Set<string>;
export declare enum SettingsViews {
    default = "default",
    advanced = "advanced"
}
export declare const fileSourceSchema: z.ZodNativeEnum<typeof FileSources>;
export declare const fileStrategiesSchema: z.ZodOptional<z.ZodObject<{
    default: z.ZodOptional<z.ZodNativeEnum<typeof FileSources>>;
    avatar: z.ZodOptional<z.ZodNativeEnum<typeof FileSources>>;
    image: z.ZodOptional<z.ZodNativeEnum<typeof FileSources>>;
    document: z.ZodOptional<z.ZodNativeEnum<typeof FileSources>>;
}, "strip", z.ZodTypeAny, {
    default?: FileSources | undefined;
    avatar?: FileSources | undefined;
    image?: FileSources | undefined;
    document?: FileSources | undefined;
}, {
    default?: FileSources | undefined;
    avatar?: FileSources | undefined;
    image?: FileSources | undefined;
    document?: FileSources | undefined;
}>>;
type SchemaShape<T> = T extends z.ZodObject<infer U> ? U : never;
type DefaultValue<T> = T extends z.ZodDefault<z.ZodTypeAny> ? ReturnType<T['_def']['defaultValue']> : undefined;
type ExtractDefaults<T> = {
    [P in keyof T]: DefaultValue<T[P]>;
};
export type SchemaDefaults<T> = ExtractDefaults<SchemaShape<T>>;
export type TConfigDefaults = SchemaDefaults<typeof configSchema>;
export declare function getSchemaDefaults<Schema extends z.AnyZodObject>(schema: Schema): ExtractDefaults<SchemaShape<Schema>>;
export declare const modelConfigSchema: z.ZodUnion<[z.ZodObject<{
    deploymentName: z.ZodOptional<z.ZodString>;
    version: z.ZodOptional<z.ZodString>;
    assistants: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    version?: string | undefined;
    deploymentName?: string | undefined;
    assistants?: boolean | undefined;
}, {
    version?: string | undefined;
    deploymentName?: string | undefined;
    assistants?: boolean | undefined;
}>, z.ZodBoolean]>;
export type TAzureModelConfig = z.infer<typeof modelConfigSchema>;
export declare const azureBaseSchema: z.ZodObject<{
    apiKey: z.ZodString;
    serverless: z.ZodOptional<z.ZodBoolean>;
    instanceName: z.ZodOptional<z.ZodString>;
    deploymentName: z.ZodOptional<z.ZodString>;
    assistants: z.ZodOptional<z.ZodBoolean>;
    addParams: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
    dropParams: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    forcePrompt: z.ZodOptional<z.ZodBoolean>;
    version: z.ZodOptional<z.ZodString>;
    baseURL: z.ZodOptional<z.ZodString>;
    additionalHeaders: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
}, "strip", z.ZodTypeAny, {
    apiKey: string;
    version?: string | undefined;
    baseURL?: string | undefined;
    instanceName?: string | undefined;
    deploymentName?: string | undefined;
    assistants?: boolean | undefined;
    serverless?: boolean | undefined;
    addParams?: Record<string, any> | undefined;
    dropParams?: string[] | undefined;
    forcePrompt?: boolean | undefined;
    additionalHeaders?: Record<string, any> | undefined;
}, {
    apiKey: string;
    version?: string | undefined;
    baseURL?: string | undefined;
    instanceName?: string | undefined;
    deploymentName?: string | undefined;
    assistants?: boolean | undefined;
    serverless?: boolean | undefined;
    addParams?: Record<string, any> | undefined;
    dropParams?: string[] | undefined;
    forcePrompt?: boolean | undefined;
    additionalHeaders?: Record<string, any> | undefined;
}>;
export type TAzureBaseSchema = z.infer<typeof azureBaseSchema>;
export declare const azureGroupSchema: z.ZodIntersection<z.ZodObject<{
    group: z.ZodString;
    models: z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodObject<{
        deploymentName: z.ZodOptional<z.ZodString>;
        version: z.ZodOptional<z.ZodString>;
        assistants: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        version?: string | undefined;
        deploymentName?: string | undefined;
        assistants?: boolean | undefined;
    }, {
        version?: string | undefined;
        deploymentName?: string | undefined;
        assistants?: boolean | undefined;
    }>, z.ZodBoolean]>>;
}, "strip", z.ZodTypeAny, {
    group: string;
    models: Record<string, boolean | {
        version?: string | undefined;
        deploymentName?: string | undefined;
        assistants?: boolean | undefined;
    }>;
}, {
    group: string;
    models: Record<string, boolean | {
        version?: string | undefined;
        deploymentName?: string | undefined;
        assistants?: boolean | undefined;
    }>;
}>, z.ZodObject<{
    apiKey: z.ZodString;
    serverless: z.ZodOptional<z.ZodBoolean>;
    instanceName: z.ZodOptional<z.ZodString>;
    deploymentName: z.ZodOptional<z.ZodString>;
    assistants: z.ZodOptional<z.ZodBoolean>;
    addParams: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
    dropParams: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    forcePrompt: z.ZodOptional<z.ZodBoolean>;
    version: z.ZodOptional<z.ZodString>;
    baseURL: z.ZodOptional<z.ZodString>;
    additionalHeaders: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
}, "strip", z.ZodTypeAny, {
    apiKey: string;
    version?: string | undefined;
    baseURL?: string | undefined;
    instanceName?: string | undefined;
    deploymentName?: string | undefined;
    assistants?: boolean | undefined;
    serverless?: boolean | undefined;
    addParams?: Record<string, any> | undefined;
    dropParams?: string[] | undefined;
    forcePrompt?: boolean | undefined;
    additionalHeaders?: Record<string, any> | undefined;
}, {
    apiKey: string;
    version?: string | undefined;
    baseURL?: string | undefined;
    instanceName?: string | undefined;
    deploymentName?: string | undefined;
    assistants?: boolean | undefined;
    serverless?: boolean | undefined;
    addParams?: Record<string, any> | undefined;
    dropParams?: string[] | undefined;
    forcePrompt?: boolean | undefined;
    additionalHeaders?: Record<string, any> | undefined;
}>>;
export declare const azureGroupConfigsSchema: z.ZodArray<z.ZodIntersection<z.ZodObject<{
    group: z.ZodString;
    models: z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodObject<{
        deploymentName: z.ZodOptional<z.ZodString>;
        version: z.ZodOptional<z.ZodString>;
        assistants: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        version?: string | undefined;
        deploymentName?: string | undefined;
        assistants?: boolean | undefined;
    }, {
        version?: string | undefined;
        deploymentName?: string | undefined;
        assistants?: boolean | undefined;
    }>, z.ZodBoolean]>>;
}, "strip", z.ZodTypeAny, {
    group: string;
    models: Record<string, boolean | {
        version?: string | undefined;
        deploymentName?: string | undefined;
        assistants?: boolean | undefined;
    }>;
}, {
    group: string;
    models: Record<string, boolean | {
        version?: string | undefined;
        deploymentName?: string | undefined;
        assistants?: boolean | undefined;
    }>;
}>, z.ZodObject<{
    apiKey: z.ZodString;
    serverless: z.ZodOptional<z.ZodBoolean>;
    instanceName: z.ZodOptional<z.ZodString>;
    deploymentName: z.ZodOptional<z.ZodString>;
    assistants: z.ZodOptional<z.ZodBoolean>;
    addParams: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
    dropParams: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    forcePrompt: z.ZodOptional<z.ZodBoolean>;
    version: z.ZodOptional<z.ZodString>;
    baseURL: z.ZodOptional<z.ZodString>;
    additionalHeaders: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
}, "strip", z.ZodTypeAny, {
    apiKey: string;
    version?: string | undefined;
    baseURL?: string | undefined;
    instanceName?: string | undefined;
    deploymentName?: string | undefined;
    assistants?: boolean | undefined;
    serverless?: boolean | undefined;
    addParams?: Record<string, any> | undefined;
    dropParams?: string[] | undefined;
    forcePrompt?: boolean | undefined;
    additionalHeaders?: Record<string, any> | undefined;
}, {
    apiKey: string;
    version?: string | undefined;
    baseURL?: string | undefined;
    instanceName?: string | undefined;
    deploymentName?: string | undefined;
    assistants?: boolean | undefined;
    serverless?: boolean | undefined;
    addParams?: Record<string, any> | undefined;
    dropParams?: string[] | undefined;
    forcePrompt?: boolean | undefined;
    additionalHeaders?: Record<string, any> | undefined;
}>>, "many">;
export type TAzureGroup = z.infer<typeof azureGroupSchema>;
export type TAzureGroups = z.infer<typeof azureGroupConfigsSchema>;
export type TAzureModelMapSchema = {
    group: string;
};
export type TAzureModelGroupMap = Record<string, TAzureModelMapSchema | undefined>;
export type TAzureGroupMap = Record<string, (TAzureBaseSchema & {
    models: Record<string, TAzureModelConfig | undefined>;
}) | undefined>;
export type TValidatedAzureConfig = {
    modelNames: string[];
    groupMap: TAzureGroupMap;
    assistantModels?: string[];
    assistantGroups?: string[];
    modelGroupMap: TAzureModelGroupMap;
};
export type TAzureConfigValidationResult = TValidatedAzureConfig & {
    isValid: boolean;
    errors: (ZodError | string)[];
};
export declare enum Capabilities {
    code_interpreter = "code_interpreter",
    image_vision = "image_vision",
    retrieval = "retrieval",
    actions = "actions",
    tools = "tools"
}
export declare enum AgentCapabilities {
    hide_sequential_outputs = "hide_sequential_outputs",
    end_after_tools = "end_after_tools",
    execute_code = "execute_code",
    file_search = "file_search",
    web_search = "web_search",
    artifacts = "artifacts",
    actions = "actions",
    context = "context",
    tools = "tools",
    chain = "chain",
    ocr = "ocr"
}
export declare const defaultAssistantsVersion: {
    assistants: number;
    azureAssistants: number;
};
export declare const baseEndpointSchema: z.ZodObject<{
    streamRate: z.ZodOptional<z.ZodNumber>;
    baseURL: z.ZodOptional<z.ZodString>;
    titlePrompt: z.ZodOptional<z.ZodString>;
    titleModel: z.ZodOptional<z.ZodString>;
    titleConvo: z.ZodOptional<z.ZodBoolean>;
    titleMethod: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"completion">, z.ZodLiteral<"functions">, z.ZodLiteral<"structured">]>>;
    titleEndpoint: z.ZodOptional<z.ZodString>;
    titlePromptTemplate: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    baseURL?: string | undefined;
    streamRate?: number | undefined;
    titlePrompt?: string | undefined;
    titleModel?: string | undefined;
    titleConvo?: boolean | undefined;
    titleMethod?: "completion" | "functions" | "structured" | undefined;
    titleEndpoint?: string | undefined;
    titlePromptTemplate?: string | undefined;
}, {
    baseURL?: string | undefined;
    streamRate?: number | undefined;
    titlePrompt?: string | undefined;
    titleModel?: string | undefined;
    titleConvo?: boolean | undefined;
    titleMethod?: "completion" | "functions" | "structured" | undefined;
    titleEndpoint?: string | undefined;
    titlePromptTemplate?: string | undefined;
}>;
export type TBaseEndpoint = z.infer<typeof baseEndpointSchema>;
export declare const bedrockEndpointSchema: z.ZodObject<{
    streamRate: z.ZodOptional<z.ZodNumber>;
    baseURL: z.ZodOptional<z.ZodString>;
    titlePrompt: z.ZodOptional<z.ZodString>;
    titleModel: z.ZodOptional<z.ZodString>;
    titleConvo: z.ZodOptional<z.ZodBoolean>;
    titleMethod: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"completion">, z.ZodLiteral<"functions">, z.ZodLiteral<"structured">]>>;
    titleEndpoint: z.ZodOptional<z.ZodString>;
    titlePromptTemplate: z.ZodOptional<z.ZodString>;
} & {
    availableRegions: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    baseURL?: string | undefined;
    streamRate?: number | undefined;
    titlePrompt?: string | undefined;
    titleModel?: string | undefined;
    titleConvo?: boolean | undefined;
    titleMethod?: "completion" | "functions" | "structured" | undefined;
    titleEndpoint?: string | undefined;
    titlePromptTemplate?: string | undefined;
    availableRegions?: string[] | undefined;
}, {
    baseURL?: string | undefined;
    streamRate?: number | undefined;
    titlePrompt?: string | undefined;
    titleModel?: string | undefined;
    titleConvo?: boolean | undefined;
    titleMethod?: "completion" | "functions" | "structured" | undefined;
    titleEndpoint?: string | undefined;
    titlePromptTemplate?: string | undefined;
    availableRegions?: string[] | undefined;
}>;
export declare const assistantEndpointSchema: z.ZodObject<{
    streamRate: z.ZodOptional<z.ZodNumber>;
    baseURL: z.ZodOptional<z.ZodString>;
    titlePrompt: z.ZodOptional<z.ZodString>;
    titleModel: z.ZodOptional<z.ZodString>;
    titleConvo: z.ZodOptional<z.ZodBoolean>;
    titleMethod: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"completion">, z.ZodLiteral<"functions">, z.ZodLiteral<"structured">]>>;
    titleEndpoint: z.ZodOptional<z.ZodString>;
    titlePromptTemplate: z.ZodOptional<z.ZodString>;
} & {
    disableBuilder: z.ZodOptional<z.ZodBoolean>;
    pollIntervalMs: z.ZodOptional<z.ZodNumber>;
    timeoutMs: z.ZodOptional<z.ZodNumber>;
    version: z.ZodDefault<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
    supportedIds: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    excludedIds: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    privateAssistants: z.ZodOptional<z.ZodBoolean>;
    retrievalModels: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
    capabilities: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodNativeEnum<typeof Capabilities>, "many">>>;
    apiKey: z.ZodOptional<z.ZodString>;
    models: z.ZodOptional<z.ZodObject<{
        default: z.ZodArray<z.ZodUnion<[z.ZodString, z.ZodObject<{
            name: z.ZodString;
            description: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            name: string;
            description?: string | undefined;
        }, {
            name: string;
            description?: string | undefined;
        }>]>, "many">;
        fetch: z.ZodOptional<z.ZodBoolean>;
        userIdQuery: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        default: (string | {
            name: string;
            description?: string | undefined;
        })[];
        fetch?: boolean | undefined;
        userIdQuery?: boolean | undefined;
    }, {
        default: (string | {
            name: string;
            description?: string | undefined;
        })[];
        fetch?: boolean | undefined;
        userIdQuery?: boolean | undefined;
    }>>;
    headers: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
}, "strip", z.ZodTypeAny, {
    version: string | number;
    retrievalModels: string[];
    capabilities: Capabilities[];
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
}, {
    version?: string | number | undefined;
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
    retrievalModels?: string[] | undefined;
    capabilities?: Capabilities[] | undefined;
}>;
export type TAssistantEndpoint = z.infer<typeof assistantEndpointSchema>;
export declare const defaultAgentCapabilities: AgentCapabilities[];
export declare const agentsEndpointSchema: z.ZodDefault<z.ZodObject<{
    streamRate: z.ZodOptional<z.ZodNumber>;
    baseURL: z.ZodOptional<z.ZodString>;
    titlePrompt: z.ZodOptional<z.ZodString>;
    titleModel: z.ZodOptional<z.ZodString>;
    titleConvo: z.ZodOptional<z.ZodBoolean>;
    titleMethod: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"completion">, z.ZodLiteral<"functions">, z.ZodLiteral<"structured">]>>;
    titleEndpoint: z.ZodOptional<z.ZodString>;
    titlePromptTemplate: z.ZodOptional<z.ZodString>;
} & {
    recursionLimit: z.ZodOptional<z.ZodNumber>;
    disableBuilder: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    maxRecursionLimit: z.ZodOptional<z.ZodNumber>;
    maxCitations: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
    maxCitationsPerFile: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
    minRelevanceScore: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
    allowedProviders: z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodString, z.ZodNativeEnum<typeof EModelEndpoint>]>, "many">>;
    capabilities: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodNativeEnum<typeof AgentCapabilities>, "many">>>;
}, "strip", z.ZodTypeAny, {
    disableBuilder: boolean;
    capabilities: AgentCapabilities[];
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
}, {
    baseURL?: string | undefined;
    streamRate?: number | undefined;
    titlePrompt?: string | undefined;
    titleModel?: string | undefined;
    titleConvo?: boolean | undefined;
    titleMethod?: "completion" | "functions" | "structured" | undefined;
    titleEndpoint?: string | undefined;
    titlePromptTemplate?: string | undefined;
    disableBuilder?: boolean | undefined;
    capabilities?: AgentCapabilities[] | undefined;
    recursionLimit?: number | undefined;
    maxRecursionLimit?: number | undefined;
    maxCitations?: number | undefined;
    maxCitationsPerFile?: number | undefined;
    minRelevanceScore?: number | undefined;
    allowedProviders?: string[] | undefined;
}>>;
export type TAgentsEndpoint = z.infer<typeof agentsEndpointSchema>;
export declare const endpointSchema: z.ZodObject<{
    streamRate: z.ZodOptional<z.ZodNumber>;
    titlePrompt: z.ZodOptional<z.ZodString>;
    titleModel: z.ZodOptional<z.ZodString>;
    titleConvo: z.ZodOptional<z.ZodBoolean>;
    titleMethod: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"completion">, z.ZodLiteral<"functions">, z.ZodLiteral<"structured">]>>;
    titleEndpoint: z.ZodOptional<z.ZodString>;
    titlePromptTemplate: z.ZodOptional<z.ZodString>;
} & {
    name: z.ZodEffects<z.ZodString, string, string>;
    apiKey: z.ZodString;
    baseURL: z.ZodString;
    models: z.ZodObject<{
        default: z.ZodArray<z.ZodUnion<[z.ZodString, z.ZodObject<{
            name: z.ZodString;
            description: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            name: string;
            description?: string | undefined;
        }, {
            name: string;
            description?: string | undefined;
        }>]>, "many">;
        fetch: z.ZodOptional<z.ZodBoolean>;
        userIdQuery: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        default: (string | {
            name: string;
            description?: string | undefined;
        })[];
        fetch?: boolean | undefined;
        userIdQuery?: boolean | undefined;
    }, {
        default: (string | {
            name: string;
            description?: string | undefined;
        })[];
        fetch?: boolean | undefined;
        userIdQuery?: boolean | undefined;
    }>;
    summarize: z.ZodOptional<z.ZodBoolean>;
    summaryModel: z.ZodOptional<z.ZodString>;
    iconURL: z.ZodOptional<z.ZodString>;
    forcePrompt: z.ZodOptional<z.ZodBoolean>;
    modelDisplayLabel: z.ZodOptional<z.ZodString>;
    headers: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
    addParams: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
    dropParams: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    customParams: z.ZodObject<{
        defaultParamsEndpoint: z.ZodDefault<z.ZodString>;
        paramDefinitions: z.ZodOptional<z.ZodArray<z.ZodRecord<z.ZodString, z.ZodAny>, "many">>;
    }, "strict", z.ZodTypeAny, {
        defaultParamsEndpoint: string;
        paramDefinitions?: Record<string, any>[] | undefined;
    }, {
        defaultParamsEndpoint?: string | undefined;
        paramDefinitions?: Record<string, any>[] | undefined;
    }>;
    customOrder: z.ZodOptional<z.ZodNumber>;
    directEndpoint: z.ZodOptional<z.ZodBoolean>;
    titleMessageRole: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
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
}, {
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
        defaultParamsEndpoint?: string | undefined;
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
}>;
export type TEndpoint = z.infer<typeof endpointSchema>;
export declare const azureEndpointSchema: z.ZodIntersection<z.ZodObject<{
    groups: z.ZodArray<z.ZodIntersection<z.ZodObject<{
        group: z.ZodString;
        models: z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodObject<{
            deploymentName: z.ZodOptional<z.ZodString>;
            version: z.ZodOptional<z.ZodString>;
            assistants: z.ZodOptional<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            version?: string | undefined;
            deploymentName?: string | undefined;
            assistants?: boolean | undefined;
        }, {
            version?: string | undefined;
            deploymentName?: string | undefined;
            assistants?: boolean | undefined;
        }>, z.ZodBoolean]>>;
    }, "strip", z.ZodTypeAny, {
        group: string;
        models: Record<string, boolean | {
            version?: string | undefined;
            deploymentName?: string | undefined;
            assistants?: boolean | undefined;
        }>;
    }, {
        group: string;
        models: Record<string, boolean | {
            version?: string | undefined;
            deploymentName?: string | undefined;
            assistants?: boolean | undefined;
        }>;
    }>, z.ZodObject<{
        apiKey: z.ZodString;
        serverless: z.ZodOptional<z.ZodBoolean>;
        instanceName: z.ZodOptional<z.ZodString>;
        deploymentName: z.ZodOptional<z.ZodString>;
        assistants: z.ZodOptional<z.ZodBoolean>;
        addParams: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
        dropParams: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        forcePrompt: z.ZodOptional<z.ZodBoolean>;
        version: z.ZodOptional<z.ZodString>;
        baseURL: z.ZodOptional<z.ZodString>;
        additionalHeaders: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
    }, "strip", z.ZodTypeAny, {
        apiKey: string;
        version?: string | undefined;
        baseURL?: string | undefined;
        instanceName?: string | undefined;
        deploymentName?: string | undefined;
        assistants?: boolean | undefined;
        serverless?: boolean | undefined;
        addParams?: Record<string, any> | undefined;
        dropParams?: string[] | undefined;
        forcePrompt?: boolean | undefined;
        additionalHeaders?: Record<string, any> | undefined;
    }, {
        apiKey: string;
        version?: string | undefined;
        baseURL?: string | undefined;
        instanceName?: string | undefined;
        deploymentName?: string | undefined;
        assistants?: boolean | undefined;
        serverless?: boolean | undefined;
        addParams?: Record<string, any> | undefined;
        dropParams?: string[] | undefined;
        forcePrompt?: boolean | undefined;
        additionalHeaders?: Record<string, any> | undefined;
    }>>, "many">;
    plugins: z.ZodOptional<z.ZodBoolean>;
    assistants: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    groups: ({
        group: string;
        models: Record<string, boolean | {
            version?: string | undefined;
            deploymentName?: string | undefined;
            assistants?: boolean | undefined;
        }>;
    } & {
        apiKey: string;
        version?: string | undefined;
        baseURL?: string | undefined;
        instanceName?: string | undefined;
        deploymentName?: string | undefined;
        assistants?: boolean | undefined;
        serverless?: boolean | undefined;
        addParams?: Record<string, any> | undefined;
        dropParams?: string[] | undefined;
        forcePrompt?: boolean | undefined;
        additionalHeaders?: Record<string, any> | undefined;
    })[];
    assistants?: boolean | undefined;
    plugins?: boolean | undefined;
}, {
    groups: ({
        group: string;
        models: Record<string, boolean | {
            version?: string | undefined;
            deploymentName?: string | undefined;
            assistants?: boolean | undefined;
        }>;
    } & {
        apiKey: string;
        version?: string | undefined;
        baseURL?: string | undefined;
        instanceName?: string | undefined;
        deploymentName?: string | undefined;
        assistants?: boolean | undefined;
        serverless?: boolean | undefined;
        addParams?: Record<string, any> | undefined;
        dropParams?: string[] | undefined;
        forcePrompt?: boolean | undefined;
        additionalHeaders?: Record<string, any> | undefined;
    })[];
    assistants?: boolean | undefined;
    plugins?: boolean | undefined;
}>, z.ZodObject<{
    streamRate: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    titlePrompt: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    titleModel: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    titleConvo: z.ZodOptional<z.ZodOptional<z.ZodBoolean>>;
    titleMethod: z.ZodOptional<z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"completion">, z.ZodLiteral<"functions">, z.ZodLiteral<"structured">]>>>;
    titlePromptTemplate: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    summarize: z.ZodOptional<z.ZodOptional<z.ZodBoolean>>;
    summaryModel: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    customOrder: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
}, "strip", z.ZodTypeAny, {
    streamRate?: number | undefined;
    titlePrompt?: string | undefined;
    titleModel?: string | undefined;
    titleConvo?: boolean | undefined;
    titleMethod?: "completion" | "functions" | "structured" | undefined;
    titlePromptTemplate?: string | undefined;
    summarize?: boolean | undefined;
    summaryModel?: string | undefined;
    customOrder?: number | undefined;
}, {
    streamRate?: number | undefined;
    titlePrompt?: string | undefined;
    titleModel?: string | undefined;
    titleConvo?: boolean | undefined;
    titleMethod?: "completion" | "functions" | "structured" | undefined;
    titlePromptTemplate?: string | undefined;
    summarize?: boolean | undefined;
    summaryModel?: string | undefined;
    customOrder?: number | undefined;
}>>;
export type TAzureConfig = Omit<z.infer<typeof azureEndpointSchema>, 'groups'> & TAzureConfigValidationResult;
declare const ttsOpenaiSchema: z.ZodObject<{
    url: z.ZodOptional<z.ZodString>;
    apiKey: z.ZodString;
    model: z.ZodString;
    voices: z.ZodArray<z.ZodString, "many">;
}, "strip", z.ZodTypeAny, {
    model: string;
    apiKey: string;
    voices: string[];
    url?: string | undefined;
}, {
    model: string;
    apiKey: string;
    voices: string[];
    url?: string | undefined;
}>;
declare const ttsElevenLabsSchema: z.ZodObject<{
    url: z.ZodOptional<z.ZodString>;
    websocketUrl: z.ZodOptional<z.ZodString>;
    apiKey: z.ZodString;
    model: z.ZodString;
    voices: z.ZodArray<z.ZodString, "many">;
    voice_settings: z.ZodOptional<z.ZodObject<{
        similarity_boost: z.ZodOptional<z.ZodNumber>;
        stability: z.ZodOptional<z.ZodNumber>;
        style: z.ZodOptional<z.ZodNumber>;
        use_speaker_boost: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        similarity_boost?: number | undefined;
        stability?: number | undefined;
        style?: number | undefined;
        use_speaker_boost?: boolean | undefined;
    }, {
        similarity_boost?: number | undefined;
        stability?: number | undefined;
        style?: number | undefined;
        use_speaker_boost?: boolean | undefined;
    }>>;
    pronunciation_dictionary_locators: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    model: string;
    apiKey: string;
    voices: string[];
    url?: string | undefined;
    websocketUrl?: string | undefined;
    voice_settings?: {
        similarity_boost?: number | undefined;
        stability?: number | undefined;
        style?: number | undefined;
        use_speaker_boost?: boolean | undefined;
    } | undefined;
    pronunciation_dictionary_locators?: string[] | undefined;
}, {
    model: string;
    apiKey: string;
    voices: string[];
    url?: string | undefined;
    websocketUrl?: string | undefined;
    voice_settings?: {
        similarity_boost?: number | undefined;
        stability?: number | undefined;
        style?: number | undefined;
        use_speaker_boost?: boolean | undefined;
    } | undefined;
    pronunciation_dictionary_locators?: string[] | undefined;
}>;
declare const ttsLocalaiSchema: z.ZodObject<{
    url: z.ZodString;
    apiKey: z.ZodOptional<z.ZodString>;
    voices: z.ZodArray<z.ZodString, "many">;
    backend: z.ZodString;
}, "strip", z.ZodTypeAny, {
    url: string;
    voices: string[];
    backend: string;
    apiKey?: string | undefined;
}, {
    url: string;
    voices: string[];
    backend: string;
    apiKey?: string | undefined;
}>;
export declare enum RateLimitPrefix {
    FILE_UPLOAD = "FILE_UPLOAD",
    IMPORT = "IMPORT",
    TTS = "TTS",
    STT = "STT"
}
export declare const rateLimitSchema: z.ZodObject<{
    fileUploads: z.ZodOptional<z.ZodObject<{
        ipMax: z.ZodOptional<z.ZodNumber>;
        ipWindowInMinutes: z.ZodOptional<z.ZodNumber>;
        userMax: z.ZodOptional<z.ZodNumber>;
        userWindowInMinutes: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        ipMax?: number | undefined;
        ipWindowInMinutes?: number | undefined;
        userMax?: number | undefined;
        userWindowInMinutes?: number | undefined;
    }, {
        ipMax?: number | undefined;
        ipWindowInMinutes?: number | undefined;
        userMax?: number | undefined;
        userWindowInMinutes?: number | undefined;
    }>>;
    conversationsImport: z.ZodOptional<z.ZodObject<{
        ipMax: z.ZodOptional<z.ZodNumber>;
        ipWindowInMinutes: z.ZodOptional<z.ZodNumber>;
        userMax: z.ZodOptional<z.ZodNumber>;
        userWindowInMinutes: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        ipMax?: number | undefined;
        ipWindowInMinutes?: number | undefined;
        userMax?: number | undefined;
        userWindowInMinutes?: number | undefined;
    }, {
        ipMax?: number | undefined;
        ipWindowInMinutes?: number | undefined;
        userMax?: number | undefined;
        userWindowInMinutes?: number | undefined;
    }>>;
    tts: z.ZodOptional<z.ZodObject<{
        ipMax: z.ZodOptional<z.ZodNumber>;
        ipWindowInMinutes: z.ZodOptional<z.ZodNumber>;
        userMax: z.ZodOptional<z.ZodNumber>;
        userWindowInMinutes: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        ipMax?: number | undefined;
        ipWindowInMinutes?: number | undefined;
        userMax?: number | undefined;
        userWindowInMinutes?: number | undefined;
    }, {
        ipMax?: number | undefined;
        ipWindowInMinutes?: number | undefined;
        userMax?: number | undefined;
        userWindowInMinutes?: number | undefined;
    }>>;
    stt: z.ZodOptional<z.ZodObject<{
        ipMax: z.ZodOptional<z.ZodNumber>;
        ipWindowInMinutes: z.ZodOptional<z.ZodNumber>;
        userMax: z.ZodOptional<z.ZodNumber>;
        userWindowInMinutes: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        ipMax?: number | undefined;
        ipWindowInMinutes?: number | undefined;
        userMax?: number | undefined;
        userWindowInMinutes?: number | undefined;
    }, {
        ipMax?: number | undefined;
        ipWindowInMinutes?: number | undefined;
        userMax?: number | undefined;
        userWindowInMinutes?: number | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    tts?: {
        ipMax?: number | undefined;
        ipWindowInMinutes?: number | undefined;
        userMax?: number | undefined;
        userWindowInMinutes?: number | undefined;
    } | undefined;
    stt?: {
        ipMax?: number | undefined;
        ipWindowInMinutes?: number | undefined;
        userMax?: number | undefined;
        userWindowInMinutes?: number | undefined;
    } | undefined;
    fileUploads?: {
        ipMax?: number | undefined;
        ipWindowInMinutes?: number | undefined;
        userMax?: number | undefined;
        userWindowInMinutes?: number | undefined;
    } | undefined;
    conversationsImport?: {
        ipMax?: number | undefined;
        ipWindowInMinutes?: number | undefined;
        userMax?: number | undefined;
        userWindowInMinutes?: number | undefined;
    } | undefined;
}, {
    tts?: {
        ipMax?: number | undefined;
        ipWindowInMinutes?: number | undefined;
        userMax?: number | undefined;
        userWindowInMinutes?: number | undefined;
    } | undefined;
    stt?: {
        ipMax?: number | undefined;
        ipWindowInMinutes?: number | undefined;
        userMax?: number | undefined;
        userWindowInMinutes?: number | undefined;
    } | undefined;
    fileUploads?: {
        ipMax?: number | undefined;
        ipWindowInMinutes?: number | undefined;
        userMax?: number | undefined;
        userWindowInMinutes?: number | undefined;
    } | undefined;
    conversationsImport?: {
        ipMax?: number | undefined;
        ipWindowInMinutes?: number | undefined;
        userMax?: number | undefined;
        userWindowInMinutes?: number | undefined;
    } | undefined;
}>;
export declare enum EImageOutputType {
    PNG = "png",
    WEBP = "webp",
    JPEG = "jpeg"
}
declare const termsOfServiceSchema: z.ZodObject<{
    externalUrl: z.ZodOptional<z.ZodString>;
    openNewTab: z.ZodOptional<z.ZodBoolean>;
    modalAcceptance: z.ZodOptional<z.ZodBoolean>;
    modalTitle: z.ZodOptional<z.ZodString>;
    modalContent: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
}, "strip", z.ZodTypeAny, {
    externalUrl?: string | undefined;
    openNewTab?: boolean | undefined;
    modalAcceptance?: boolean | undefined;
    modalTitle?: string | undefined;
    modalContent?: string | string[] | undefined;
}, {
    externalUrl?: string | undefined;
    openNewTab?: boolean | undefined;
    modalAcceptance?: boolean | undefined;
    modalTitle?: string | undefined;
    modalContent?: string | string[] | undefined;
}>;
export type TTermsOfService = z.infer<typeof termsOfServiceSchema>;
declare const mcpServersSchema: z.ZodObject<{
    placeholder: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    placeholder?: string | undefined;
}, {
    placeholder?: string | undefined;
}>;
export type TMcpServersConfig = z.infer<typeof mcpServersSchema>;
export declare const interfaceSchema: z.ZodDefault<z.ZodObject<{
    privacyPolicy: z.ZodOptional<z.ZodObject<{
        externalUrl: z.ZodOptional<z.ZodString>;
        openNewTab: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        externalUrl?: string | undefined;
        openNewTab?: boolean | undefined;
    }, {
        externalUrl?: string | undefined;
        openNewTab?: boolean | undefined;
    }>>;
    termsOfService: z.ZodOptional<z.ZodObject<{
        externalUrl: z.ZodOptional<z.ZodString>;
        openNewTab: z.ZodOptional<z.ZodBoolean>;
        modalAcceptance: z.ZodOptional<z.ZodBoolean>;
        modalTitle: z.ZodOptional<z.ZodString>;
        modalContent: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
    }, "strip", z.ZodTypeAny, {
        externalUrl?: string | undefined;
        openNewTab?: boolean | undefined;
        modalAcceptance?: boolean | undefined;
        modalTitle?: string | undefined;
        modalContent?: string | string[] | undefined;
    }, {
        externalUrl?: string | undefined;
        openNewTab?: boolean | undefined;
        modalAcceptance?: boolean | undefined;
        modalTitle?: string | undefined;
        modalContent?: string | string[] | undefined;
    }>>;
    customWelcome: z.ZodOptional<z.ZodString>;
    mcpServers: z.ZodOptional<z.ZodObject<{
        placeholder: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        placeholder?: string | undefined;
    }, {
        placeholder?: string | undefined;
    }>>;
    endpointsMenu: z.ZodOptional<z.ZodBoolean>;
    modelSelect: z.ZodOptional<z.ZodBoolean>;
    parameters: z.ZodOptional<z.ZodBoolean>;
    sidePanel: z.ZodOptional<z.ZodBoolean>;
    multiConvo: z.ZodOptional<z.ZodBoolean>;
    bookmarks: z.ZodOptional<z.ZodBoolean>;
    memories: z.ZodOptional<z.ZodBoolean>;
    presets: z.ZodOptional<z.ZodBoolean>;
    prompts: z.ZodOptional<z.ZodBoolean>;
    agents: z.ZodOptional<z.ZodBoolean>;
    temporaryChat: z.ZodOptional<z.ZodBoolean>;
    temporaryChatRetention: z.ZodOptional<z.ZodNumber>;
    runCode: z.ZodOptional<z.ZodBoolean>;
    webSearch: z.ZodOptional<z.ZodBoolean>;
    peoplePicker: z.ZodOptional<z.ZodObject<{
        users: z.ZodOptional<z.ZodBoolean>;
        groups: z.ZodOptional<z.ZodBoolean>;
        roles: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        users?: boolean | undefined;
        groups?: boolean | undefined;
        roles?: boolean | undefined;
    }, {
        users?: boolean | undefined;
        groups?: boolean | undefined;
        roles?: boolean | undefined;
    }>>;
    marketplace: z.ZodOptional<z.ZodObject<{
        use: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        use?: boolean | undefined;
    }, {
        use?: boolean | undefined;
    }>>;
    fileSearch: z.ZodOptional<z.ZodBoolean>;
    fileCitations: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    webSearch?: boolean | undefined;
    mcpServers?: {
        placeholder?: string | undefined;
    } | undefined;
    privacyPolicy?: {
        externalUrl?: string | undefined;
        openNewTab?: boolean | undefined;
    } | undefined;
    termsOfService?: {
        externalUrl?: string | undefined;
        openNewTab?: boolean | undefined;
        modalAcceptance?: boolean | undefined;
        modalTitle?: string | undefined;
        modalContent?: string | string[] | undefined;
    } | undefined;
    customWelcome?: string | undefined;
    endpointsMenu?: boolean | undefined;
    modelSelect?: boolean | undefined;
    parameters?: boolean | undefined;
    sidePanel?: boolean | undefined;
    multiConvo?: boolean | undefined;
    bookmarks?: boolean | undefined;
    memories?: boolean | undefined;
    presets?: boolean | undefined;
    prompts?: boolean | undefined;
    agents?: boolean | undefined;
    temporaryChat?: boolean | undefined;
    temporaryChatRetention?: number | undefined;
    runCode?: boolean | undefined;
    peoplePicker?: {
        users?: boolean | undefined;
        groups?: boolean | undefined;
        roles?: boolean | undefined;
    } | undefined;
    marketplace?: {
        use?: boolean | undefined;
    } | undefined;
    fileSearch?: boolean | undefined;
    fileCitations?: boolean | undefined;
}, {
    webSearch?: boolean | undefined;
    mcpServers?: {
        placeholder?: string | undefined;
    } | undefined;
    privacyPolicy?: {
        externalUrl?: string | undefined;
        openNewTab?: boolean | undefined;
    } | undefined;
    termsOfService?: {
        externalUrl?: string | undefined;
        openNewTab?: boolean | undefined;
        modalAcceptance?: boolean | undefined;
        modalTitle?: string | undefined;
        modalContent?: string | string[] | undefined;
    } | undefined;
    customWelcome?: string | undefined;
    endpointsMenu?: boolean | undefined;
    modelSelect?: boolean | undefined;
    parameters?: boolean | undefined;
    sidePanel?: boolean | undefined;
    multiConvo?: boolean | undefined;
    bookmarks?: boolean | undefined;
    memories?: boolean | undefined;
    presets?: boolean | undefined;
    prompts?: boolean | undefined;
    agents?: boolean | undefined;
    temporaryChat?: boolean | undefined;
    temporaryChatRetention?: number | undefined;
    runCode?: boolean | undefined;
    peoplePicker?: {
        users?: boolean | undefined;
        groups?: boolean | undefined;
        roles?: boolean | undefined;
    } | undefined;
    marketplace?: {
        use?: boolean | undefined;
    } | undefined;
    fileSearch?: boolean | undefined;
    fileCitations?: boolean | undefined;
}>>;
export type TInterfaceConfig = z.infer<typeof interfaceSchema>;
export type TBalanceConfig = z.infer<typeof balanceSchema>;
export type TTransactionsConfig = z.infer<typeof transactionsSchema>;
export declare const turnstileOptionsSchema: z.ZodDefault<z.ZodObject<{
    language: z.ZodDefault<z.ZodString>;
    size: z.ZodDefault<z.ZodEnum<["normal", "compact", "flexible", "invisible"]>>;
}, "strip", z.ZodTypeAny, {
    language: string;
    size: "normal" | "compact" | "flexible" | "invisible";
}, {
    language?: string | undefined;
    size?: "normal" | "compact" | "flexible" | "invisible" | undefined;
}>>;
export declare const turnstileSchema: z.ZodObject<{
    siteKey: z.ZodString;
    options: z.ZodOptional<z.ZodDefault<z.ZodObject<{
        language: z.ZodDefault<z.ZodString>;
        size: z.ZodDefault<z.ZodEnum<["normal", "compact", "flexible", "invisible"]>>;
    }, "strip", z.ZodTypeAny, {
        language: string;
        size: "normal" | "compact" | "flexible" | "invisible";
    }, {
        language?: string | undefined;
        size?: "normal" | "compact" | "flexible" | "invisible" | undefined;
    }>>>;
}, "strip", z.ZodTypeAny, {
    siteKey: string;
    options?: {
        language: string;
        size: "normal" | "compact" | "flexible" | "invisible";
    } | undefined;
}, {
    siteKey: string;
    options?: {
        language?: string | undefined;
        size?: "normal" | "compact" | "flexible" | "invisible" | undefined;
    } | undefined;
}>;
export type TTurnstileConfig = z.infer<typeof turnstileSchema>;
export type TStartupConfig = {
    appTitle: string;
    socialLogins?: string[];
    interface?: TInterfaceConfig;
    turnstile?: TTurnstileConfig;
    balance?: TBalanceConfig;
    transactions?: TTransactionsConfig;
    discordLoginEnabled: boolean;
    facebookLoginEnabled: boolean;
    githubLoginEnabled: boolean;
    googleLoginEnabled: boolean;
    openidLoginEnabled: boolean;
    appleLoginEnabled: boolean;
    samlLoginEnabled: boolean;
    openidLabel: string;
    openidImageUrl: string;
    openidAutoRedirect: boolean;
    samlLabel: string;
    samlImageUrl: string;
    /** LDAP Auth Configuration */
    ldap?: {
        /** LDAP enabled */
        enabled: boolean;
        /** Whether LDAP uses username vs. email */
        username?: boolean;
    };
    serverDomain: string;
    emailLoginEnabled: boolean;
    registrationEnabled: boolean;
    socialLoginEnabled: boolean;
    passwordResetEnabled: boolean;
    emailEnabled: boolean;
    showBirthdayIcon: boolean;
    helpAndFaqURL: string;
    customFooter?: string;
    modelSpecs?: TSpecsConfig;
    modelDescriptions?: Record<string, Record<string, string>>;
    sharedLinksEnabled: boolean;
    publicSharedLinksEnabled: boolean;
    analyticsGtmId?: string;
    instanceProjectId: string;
    bundlerURL?: string;
    staticBundlerURL?: string;
    sharePointFilePickerEnabled?: boolean;
    sharePointBaseUrl?: string;
    sharePointPickerGraphScope?: string;
    sharePointPickerSharePointScope?: string;
    openidReuseTokens?: boolean;
    minPasswordLength?: number;
    webSearch?: {
        searchProvider?: SearchProviders;
        scraperProvider?: ScraperProviders;
        rerankerType?: RerankerTypes;
    };
    mcpServers?: Record<string, {
        customUserVars: Record<string, {
            title: string;
            description: string;
        }>;
        chatMenu?: boolean;
        isOAuth?: boolean;
        startup?: boolean;
    }>;
    mcpPlaceholder?: string;
    conversationImportMaxFileSize?: number;
};
export declare enum OCRStrategy {
    MISTRAL_OCR = "mistral_ocr",
    CUSTOM_OCR = "custom_ocr",
    AZURE_MISTRAL_OCR = "azure_mistral_ocr",
    VERTEXAI_MISTRAL_OCR = "vertexai_mistral_ocr"
}
export declare enum SearchCategories {
    PROVIDERS = "providers",
    SCRAPERS = "scrapers",
    RERANKERS = "rerankers"
}
export declare enum SearchProviders {
    SERPER = "serper",
    SEARXNG = "searxng"
}
export declare enum ScraperProviders {
    FIRECRAWL = "firecrawl",
    SERPER = "serper"
}
export declare enum RerankerTypes {
    JINA = "jina",
    COHERE = "cohere"
}
export declare enum SafeSearchTypes {
    OFF = 0,
    MODERATE = 1,
    STRICT = 2
}
export declare const webSearchSchema: z.ZodObject<{
    serperApiKey: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    searxngInstanceUrl: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    searxngApiKey: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    firecrawlApiKey: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    firecrawlApiUrl: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    firecrawlVersion: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    jinaApiKey: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    jinaApiUrl: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    cohereApiKey: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    searchProvider: z.ZodOptional<z.ZodNativeEnum<typeof SearchProviders>>;
    scraperProvider: z.ZodOptional<z.ZodNativeEnum<typeof ScraperProviders>>;
    rerankerType: z.ZodOptional<z.ZodNativeEnum<typeof RerankerTypes>>;
    scraperTimeout: z.ZodOptional<z.ZodNumber>;
    safeSearch: z.ZodDefault<z.ZodNativeEnum<typeof SafeSearchTypes>>;
    firecrawlOptions: z.ZodOptional<z.ZodObject<{
        formats: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        includeTags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        excludeTags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        headers: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        waitFor: z.ZodOptional<z.ZodNumber>;
        timeout: z.ZodOptional<z.ZodNumber>;
        maxAge: z.ZodOptional<z.ZodNumber>;
        mobile: z.ZodOptional<z.ZodBoolean>;
        skipTlsVerification: z.ZodOptional<z.ZodBoolean>;
        blockAds: z.ZodOptional<z.ZodBoolean>;
        removeBase64Images: z.ZodOptional<z.ZodBoolean>;
        parsePDF: z.ZodOptional<z.ZodBoolean>;
        storeInCache: z.ZodOptional<z.ZodBoolean>;
        zeroDataRetention: z.ZodOptional<z.ZodBoolean>;
        location: z.ZodOptional<z.ZodObject<{
            country: z.ZodOptional<z.ZodString>;
            languages: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        }, "strip", z.ZodTypeAny, {
            country?: string | undefined;
            languages?: string[] | undefined;
        }, {
            country?: string | undefined;
            languages?: string[] | undefined;
        }>>;
        onlyMainContent: z.ZodOptional<z.ZodBoolean>;
        changeTrackingOptions: z.ZodOptional<z.ZodObject<{
            modes: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            schema: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            prompt: z.ZodOptional<z.ZodString>;
            tag: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        }, "strip", z.ZodTypeAny, {
            modes?: string[] | undefined;
            schema?: Record<string, unknown> | undefined;
            prompt?: string | undefined;
            tag?: string | null | undefined;
        }, {
            modes?: string[] | undefined;
            schema?: Record<string, unknown> | undefined;
            prompt?: string | undefined;
            tag?: string | null | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        formats?: string[] | undefined;
        includeTags?: string[] | undefined;
        excludeTags?: string[] | undefined;
        headers?: Record<string, string> | undefined;
        waitFor?: number | undefined;
        timeout?: number | undefined;
        maxAge?: number | undefined;
        mobile?: boolean | undefined;
        skipTlsVerification?: boolean | undefined;
        blockAds?: boolean | undefined;
        removeBase64Images?: boolean | undefined;
        parsePDF?: boolean | undefined;
        storeInCache?: boolean | undefined;
        zeroDataRetention?: boolean | undefined;
        location?: {
            country?: string | undefined;
            languages?: string[] | undefined;
        } | undefined;
        onlyMainContent?: boolean | undefined;
        changeTrackingOptions?: {
            modes?: string[] | undefined;
            schema?: Record<string, unknown> | undefined;
            prompt?: string | undefined;
            tag?: string | null | undefined;
        } | undefined;
    }, {
        formats?: string[] | undefined;
        includeTags?: string[] | undefined;
        excludeTags?: string[] | undefined;
        headers?: Record<string, string> | undefined;
        waitFor?: number | undefined;
        timeout?: number | undefined;
        maxAge?: number | undefined;
        mobile?: boolean | undefined;
        skipTlsVerification?: boolean | undefined;
        blockAds?: boolean | undefined;
        removeBase64Images?: boolean | undefined;
        parsePDF?: boolean | undefined;
        storeInCache?: boolean | undefined;
        zeroDataRetention?: boolean | undefined;
        location?: {
            country?: string | undefined;
            languages?: string[] | undefined;
        } | undefined;
        onlyMainContent?: boolean | undefined;
        changeTrackingOptions?: {
            modes?: string[] | undefined;
            schema?: Record<string, unknown> | undefined;
            prompt?: string | undefined;
            tag?: string | null | undefined;
        } | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    serperApiKey: string;
    searxngInstanceUrl: string;
    searxngApiKey: string;
    firecrawlApiKey: string;
    firecrawlApiUrl: string;
    firecrawlVersion: string;
    jinaApiKey: string;
    jinaApiUrl: string;
    cohereApiKey: string;
    safeSearch: SafeSearchTypes;
    searchProvider?: SearchProviders | undefined;
    scraperProvider?: ScraperProviders | undefined;
    rerankerType?: RerankerTypes | undefined;
    scraperTimeout?: number | undefined;
    firecrawlOptions?: {
        formats?: string[] | undefined;
        includeTags?: string[] | undefined;
        excludeTags?: string[] | undefined;
        headers?: Record<string, string> | undefined;
        waitFor?: number | undefined;
        timeout?: number | undefined;
        maxAge?: number | undefined;
        mobile?: boolean | undefined;
        skipTlsVerification?: boolean | undefined;
        blockAds?: boolean | undefined;
        removeBase64Images?: boolean | undefined;
        parsePDF?: boolean | undefined;
        storeInCache?: boolean | undefined;
        zeroDataRetention?: boolean | undefined;
        location?: {
            country?: string | undefined;
            languages?: string[] | undefined;
        } | undefined;
        onlyMainContent?: boolean | undefined;
        changeTrackingOptions?: {
            modes?: string[] | undefined;
            schema?: Record<string, unknown> | undefined;
            prompt?: string | undefined;
            tag?: string | null | undefined;
        } | undefined;
    } | undefined;
}, {
    serperApiKey?: string | undefined;
    searxngInstanceUrl?: string | undefined;
    searxngApiKey?: string | undefined;
    firecrawlApiKey?: string | undefined;
    firecrawlApiUrl?: string | undefined;
    firecrawlVersion?: string | undefined;
    jinaApiKey?: string | undefined;
    jinaApiUrl?: string | undefined;
    cohereApiKey?: string | undefined;
    searchProvider?: SearchProviders | undefined;
    scraperProvider?: ScraperProviders | undefined;
    rerankerType?: RerankerTypes | undefined;
    scraperTimeout?: number | undefined;
    safeSearch?: SafeSearchTypes | undefined;
    firecrawlOptions?: {
        formats?: string[] | undefined;
        includeTags?: string[] | undefined;
        excludeTags?: string[] | undefined;
        headers?: Record<string, string> | undefined;
        waitFor?: number | undefined;
        timeout?: number | undefined;
        maxAge?: number | undefined;
        mobile?: boolean | undefined;
        skipTlsVerification?: boolean | undefined;
        blockAds?: boolean | undefined;
        removeBase64Images?: boolean | undefined;
        parsePDF?: boolean | undefined;
        storeInCache?: boolean | undefined;
        zeroDataRetention?: boolean | undefined;
        location?: {
            country?: string | undefined;
            languages?: string[] | undefined;
        } | undefined;
        onlyMainContent?: boolean | undefined;
        changeTrackingOptions?: {
            modes?: string[] | undefined;
            schema?: Record<string, unknown> | undefined;
            prompt?: string | undefined;
            tag?: string | null | undefined;
        } | undefined;
    } | undefined;
}>;
export type TWebSearchConfig = DeepPartial<z.infer<typeof webSearchSchema>>;
export declare const ocrSchema: z.ZodObject<{
    mistralModel: z.ZodOptional<z.ZodString>;
    apiKey: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    baseURL: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    strategy: z.ZodDefault<z.ZodNativeEnum<typeof OCRStrategy>>;
}, "strip", z.ZodTypeAny, {
    apiKey: string;
    baseURL: string;
    strategy: OCRStrategy;
    mistralModel?: string | undefined;
}, {
    mistralModel?: string | undefined;
    apiKey?: string | undefined;
    baseURL?: string | undefined;
    strategy?: OCRStrategy | undefined;
}>;
export declare const balanceSchema: z.ZodObject<{
    enabled: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    startBalance: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
    autoRefillEnabled: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    refillIntervalValue: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
    refillIntervalUnit: z.ZodDefault<z.ZodOptional<z.ZodEnum<["seconds", "minutes", "hours", "days", "weeks", "months"]>>>;
    refillAmount: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
}, "strip", z.ZodTypeAny, {
    enabled: boolean;
    startBalance: number;
    autoRefillEnabled: boolean;
    refillIntervalValue: number;
    refillIntervalUnit: "seconds" | "minutes" | "hours" | "days" | "weeks" | "months";
    refillAmount: number;
}, {
    enabled?: boolean | undefined;
    startBalance?: number | undefined;
    autoRefillEnabled?: boolean | undefined;
    refillIntervalValue?: number | undefined;
    refillIntervalUnit?: "seconds" | "minutes" | "hours" | "days" | "weeks" | "months" | undefined;
    refillAmount?: number | undefined;
}>;
export declare const transactionsSchema: z.ZodObject<{
    enabled: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
}, "strip", z.ZodTypeAny, {
    enabled: boolean;
}, {
    enabled?: boolean | undefined;
}>;
export declare const memorySchema: z.ZodObject<{
    disabled: z.ZodOptional<z.ZodBoolean>;
    validKeys: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    tokenLimit: z.ZodOptional<z.ZodNumber>;
    charLimit: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
    personalize: z.ZodDefault<z.ZodBoolean>;
    messageWindowSize: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
    agent: z.ZodOptional<z.ZodUnion<[z.ZodObject<{
        id: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
    }, {
        id: string;
    }>, z.ZodObject<{
        provider: z.ZodString;
        model: z.ZodString;
        instructions: z.ZodOptional<z.ZodString>;
        model_parameters: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
    }, "strip", z.ZodTypeAny, {
        model: string;
        provider: string;
        instructions?: string | undefined;
        model_parameters?: Record<string, any> | undefined;
    }, {
        model: string;
        provider: string;
        instructions?: string | undefined;
        model_parameters?: Record<string, any> | undefined;
    }>]>>;
}, "strip", z.ZodTypeAny, {
    charLimit: number;
    personalize: boolean;
    messageWindowSize: number;
    disabled?: boolean | undefined;
    validKeys?: string[] | undefined;
    tokenLimit?: number | undefined;
    agent?: {
        id: string;
    } | {
        model: string;
        provider: string;
        instructions?: string | undefined;
        model_parameters?: Record<string, any> | undefined;
    } | undefined;
}, {
    disabled?: boolean | undefined;
    validKeys?: string[] | undefined;
    tokenLimit?: number | undefined;
    charLimit?: number | undefined;
    personalize?: boolean | undefined;
    messageWindowSize?: number | undefined;
    agent?: {
        id: string;
    } | {
        model: string;
        provider: string;
        instructions?: string | undefined;
        model_parameters?: Record<string, any> | undefined;
    } | undefined;
}>;
export type TMemoryConfig = DeepPartial<z.infer<typeof memorySchema>>;
declare const customEndpointsSchema: z.ZodOptional<z.ZodArray<z.ZodObject<{
    streamRate: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    titlePrompt: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    titleModel: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    titleConvo: z.ZodOptional<z.ZodOptional<z.ZodBoolean>>;
    titleMethod: z.ZodOptional<z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"completion">, z.ZodLiteral<"functions">, z.ZodLiteral<"structured">]>>>;
    titleEndpoint: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    titlePromptTemplate: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    name: z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>;
    apiKey: z.ZodOptional<z.ZodString>;
    baseURL: z.ZodOptional<z.ZodString>;
    models: z.ZodOptional<z.ZodObject<{
        default: z.ZodArray<z.ZodUnion<[z.ZodString, z.ZodObject<{
            name: z.ZodString;
            description: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            name: string;
            description?: string | undefined;
        }, {
            name: string;
            description?: string | undefined;
        }>]>, "many">;
        fetch: z.ZodOptional<z.ZodBoolean>;
        userIdQuery: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        default: (string | {
            name: string;
            description?: string | undefined;
        })[];
        fetch?: boolean | undefined;
        userIdQuery?: boolean | undefined;
    }, {
        default: (string | {
            name: string;
            description?: string | undefined;
        })[];
        fetch?: boolean | undefined;
        userIdQuery?: boolean | undefined;
    }>>;
    summarize: z.ZodOptional<z.ZodOptional<z.ZodBoolean>>;
    summaryModel: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    iconURL: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    forcePrompt: z.ZodOptional<z.ZodOptional<z.ZodBoolean>>;
    modelDisplayLabel: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    headers: z.ZodOptional<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>>;
    addParams: z.ZodOptional<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>>;
    dropParams: z.ZodOptional<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
    customParams: z.ZodOptional<z.ZodObject<{
        defaultParamsEndpoint: z.ZodDefault<z.ZodString>;
        paramDefinitions: z.ZodOptional<z.ZodArray<z.ZodRecord<z.ZodString, z.ZodAny>, "many">>;
    }, "strict", z.ZodTypeAny, {
        defaultParamsEndpoint: string;
        paramDefinitions?: Record<string, any>[] | undefined;
    }, {
        defaultParamsEndpoint?: string | undefined;
        paramDefinitions?: Record<string, any>[] | undefined;
    }>>;
    customOrder: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    directEndpoint: z.ZodOptional<z.ZodOptional<z.ZodBoolean>>;
    titleMessageRole: z.ZodOptional<z.ZodOptional<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
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
}, {
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
        defaultParamsEndpoint?: string | undefined;
        paramDefinitions?: Record<string, any>[] | undefined;
    } | undefined;
    customOrder?: number | undefined;
    directEndpoint?: boolean | undefined;
    titleMessageRole?: string | undefined;
}>, "many">>;
export declare const configSchema: z.ZodObject<{
    version: z.ZodString;
    cache: z.ZodDefault<z.ZodBoolean>;
    ocr: z.ZodOptional<z.ZodObject<{
        mistralModel: z.ZodOptional<z.ZodString>;
        apiKey: z.ZodDefault<z.ZodOptional<z.ZodString>>;
        baseURL: z.ZodDefault<z.ZodOptional<z.ZodString>>;
        strategy: z.ZodDefault<z.ZodNativeEnum<typeof OCRStrategy>>;
    }, "strip", z.ZodTypeAny, {
        apiKey: string;
        baseURL: string;
        strategy: OCRStrategy;
        mistralModel?: string | undefined;
    }, {
        mistralModel?: string | undefined;
        apiKey?: string | undefined;
        baseURL?: string | undefined;
        strategy?: OCRStrategy | undefined;
    }>>;
    webSearch: z.ZodOptional<z.ZodObject<{
        serperApiKey: z.ZodDefault<z.ZodOptional<z.ZodString>>;
        searxngInstanceUrl: z.ZodDefault<z.ZodOptional<z.ZodString>>;
        searxngApiKey: z.ZodDefault<z.ZodOptional<z.ZodString>>;
        firecrawlApiKey: z.ZodDefault<z.ZodOptional<z.ZodString>>;
        firecrawlApiUrl: z.ZodDefault<z.ZodOptional<z.ZodString>>;
        firecrawlVersion: z.ZodDefault<z.ZodOptional<z.ZodString>>;
        jinaApiKey: z.ZodDefault<z.ZodOptional<z.ZodString>>;
        jinaApiUrl: z.ZodDefault<z.ZodOptional<z.ZodString>>;
        cohereApiKey: z.ZodDefault<z.ZodOptional<z.ZodString>>;
        searchProvider: z.ZodOptional<z.ZodNativeEnum<typeof SearchProviders>>;
        scraperProvider: z.ZodOptional<z.ZodNativeEnum<typeof ScraperProviders>>;
        rerankerType: z.ZodOptional<z.ZodNativeEnum<typeof RerankerTypes>>;
        scraperTimeout: z.ZodOptional<z.ZodNumber>;
        safeSearch: z.ZodDefault<z.ZodNativeEnum<typeof SafeSearchTypes>>;
        firecrawlOptions: z.ZodOptional<z.ZodObject<{
            formats: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            includeTags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            excludeTags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            headers: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
            waitFor: z.ZodOptional<z.ZodNumber>;
            timeout: z.ZodOptional<z.ZodNumber>;
            maxAge: z.ZodOptional<z.ZodNumber>;
            mobile: z.ZodOptional<z.ZodBoolean>;
            skipTlsVerification: z.ZodOptional<z.ZodBoolean>;
            blockAds: z.ZodOptional<z.ZodBoolean>;
            removeBase64Images: z.ZodOptional<z.ZodBoolean>;
            parsePDF: z.ZodOptional<z.ZodBoolean>;
            storeInCache: z.ZodOptional<z.ZodBoolean>;
            zeroDataRetention: z.ZodOptional<z.ZodBoolean>;
            location: z.ZodOptional<z.ZodObject<{
                country: z.ZodOptional<z.ZodString>;
                languages: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            }, "strip", z.ZodTypeAny, {
                country?: string | undefined;
                languages?: string[] | undefined;
            }, {
                country?: string | undefined;
                languages?: string[] | undefined;
            }>>;
            onlyMainContent: z.ZodOptional<z.ZodBoolean>;
            changeTrackingOptions: z.ZodOptional<z.ZodObject<{
                modes: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                schema: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
                prompt: z.ZodOptional<z.ZodString>;
                tag: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            }, "strip", z.ZodTypeAny, {
                modes?: string[] | undefined;
                schema?: Record<string, unknown> | undefined;
                prompt?: string | undefined;
                tag?: string | null | undefined;
            }, {
                modes?: string[] | undefined;
                schema?: Record<string, unknown> | undefined;
                prompt?: string | undefined;
                tag?: string | null | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            formats?: string[] | undefined;
            includeTags?: string[] | undefined;
            excludeTags?: string[] | undefined;
            headers?: Record<string, string> | undefined;
            waitFor?: number | undefined;
            timeout?: number | undefined;
            maxAge?: number | undefined;
            mobile?: boolean | undefined;
            skipTlsVerification?: boolean | undefined;
            blockAds?: boolean | undefined;
            removeBase64Images?: boolean | undefined;
            parsePDF?: boolean | undefined;
            storeInCache?: boolean | undefined;
            zeroDataRetention?: boolean | undefined;
            location?: {
                country?: string | undefined;
                languages?: string[] | undefined;
            } | undefined;
            onlyMainContent?: boolean | undefined;
            changeTrackingOptions?: {
                modes?: string[] | undefined;
                schema?: Record<string, unknown> | undefined;
                prompt?: string | undefined;
                tag?: string | null | undefined;
            } | undefined;
        }, {
            formats?: string[] | undefined;
            includeTags?: string[] | undefined;
            excludeTags?: string[] | undefined;
            headers?: Record<string, string> | undefined;
            waitFor?: number | undefined;
            timeout?: number | undefined;
            maxAge?: number | undefined;
            mobile?: boolean | undefined;
            skipTlsVerification?: boolean | undefined;
            blockAds?: boolean | undefined;
            removeBase64Images?: boolean | undefined;
            parsePDF?: boolean | undefined;
            storeInCache?: boolean | undefined;
            zeroDataRetention?: boolean | undefined;
            location?: {
                country?: string | undefined;
                languages?: string[] | undefined;
            } | undefined;
            onlyMainContent?: boolean | undefined;
            changeTrackingOptions?: {
                modes?: string[] | undefined;
                schema?: Record<string, unknown> | undefined;
                prompt?: string | undefined;
                tag?: string | null | undefined;
            } | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        serperApiKey: string;
        searxngInstanceUrl: string;
        searxngApiKey: string;
        firecrawlApiKey: string;
        firecrawlApiUrl: string;
        firecrawlVersion: string;
        jinaApiKey: string;
        jinaApiUrl: string;
        cohereApiKey: string;
        safeSearch: SafeSearchTypes;
        searchProvider?: SearchProviders | undefined;
        scraperProvider?: ScraperProviders | undefined;
        rerankerType?: RerankerTypes | undefined;
        scraperTimeout?: number | undefined;
        firecrawlOptions?: {
            formats?: string[] | undefined;
            includeTags?: string[] | undefined;
            excludeTags?: string[] | undefined;
            headers?: Record<string, string> | undefined;
            waitFor?: number | undefined;
            timeout?: number | undefined;
            maxAge?: number | undefined;
            mobile?: boolean | undefined;
            skipTlsVerification?: boolean | undefined;
            blockAds?: boolean | undefined;
            removeBase64Images?: boolean | undefined;
            parsePDF?: boolean | undefined;
            storeInCache?: boolean | undefined;
            zeroDataRetention?: boolean | undefined;
            location?: {
                country?: string | undefined;
                languages?: string[] | undefined;
            } | undefined;
            onlyMainContent?: boolean | undefined;
            changeTrackingOptions?: {
                modes?: string[] | undefined;
                schema?: Record<string, unknown> | undefined;
                prompt?: string | undefined;
                tag?: string | null | undefined;
            } | undefined;
        } | undefined;
    }, {
        serperApiKey?: string | undefined;
        searxngInstanceUrl?: string | undefined;
        searxngApiKey?: string | undefined;
        firecrawlApiKey?: string | undefined;
        firecrawlApiUrl?: string | undefined;
        firecrawlVersion?: string | undefined;
        jinaApiKey?: string | undefined;
        jinaApiUrl?: string | undefined;
        cohereApiKey?: string | undefined;
        searchProvider?: SearchProviders | undefined;
        scraperProvider?: ScraperProviders | undefined;
        rerankerType?: RerankerTypes | undefined;
        scraperTimeout?: number | undefined;
        safeSearch?: SafeSearchTypes | undefined;
        firecrawlOptions?: {
            formats?: string[] | undefined;
            includeTags?: string[] | undefined;
            excludeTags?: string[] | undefined;
            headers?: Record<string, string> | undefined;
            waitFor?: number | undefined;
            timeout?: number | undefined;
            maxAge?: number | undefined;
            mobile?: boolean | undefined;
            skipTlsVerification?: boolean | undefined;
            blockAds?: boolean | undefined;
            removeBase64Images?: boolean | undefined;
            parsePDF?: boolean | undefined;
            storeInCache?: boolean | undefined;
            zeroDataRetention?: boolean | undefined;
            location?: {
                country?: string | undefined;
                languages?: string[] | undefined;
            } | undefined;
            onlyMainContent?: boolean | undefined;
            changeTrackingOptions?: {
                modes?: string[] | undefined;
                schema?: Record<string, unknown> | undefined;
                prompt?: string | undefined;
                tag?: string | null | undefined;
            } | undefined;
        } | undefined;
    }>>;
    memory: z.ZodOptional<z.ZodObject<{
        disabled: z.ZodOptional<z.ZodBoolean>;
        validKeys: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        tokenLimit: z.ZodOptional<z.ZodNumber>;
        charLimit: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
        personalize: z.ZodDefault<z.ZodBoolean>;
        messageWindowSize: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
        agent: z.ZodOptional<z.ZodUnion<[z.ZodObject<{
            id: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            id: string;
        }, {
            id: string;
        }>, z.ZodObject<{
            provider: z.ZodString;
            model: z.ZodString;
            instructions: z.ZodOptional<z.ZodString>;
            model_parameters: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
        }, "strip", z.ZodTypeAny, {
            model: string;
            provider: string;
            instructions?: string | undefined;
            model_parameters?: Record<string, any> | undefined;
        }, {
            model: string;
            provider: string;
            instructions?: string | undefined;
            model_parameters?: Record<string, any> | undefined;
        }>]>>;
    }, "strip", z.ZodTypeAny, {
        charLimit: number;
        personalize: boolean;
        messageWindowSize: number;
        disabled?: boolean | undefined;
        validKeys?: string[] | undefined;
        tokenLimit?: number | undefined;
        agent?: {
            id: string;
        } | {
            model: string;
            provider: string;
            instructions?: string | undefined;
            model_parameters?: Record<string, any> | undefined;
        } | undefined;
    }, {
        disabled?: boolean | undefined;
        validKeys?: string[] | undefined;
        tokenLimit?: number | undefined;
        charLimit?: number | undefined;
        personalize?: boolean | undefined;
        messageWindowSize?: number | undefined;
        agent?: {
            id: string;
        } | {
            model: string;
            provider: string;
            instructions?: string | undefined;
            model_parameters?: Record<string, any> | undefined;
        } | undefined;
    }>>;
    secureImageLinks: z.ZodOptional<z.ZodBoolean>;
    imageOutputType: z.ZodDefault<z.ZodNativeEnum<typeof EImageOutputType>>;
    includedTools: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    filteredTools: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    mcpServers: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodObject<{
        startup: z.ZodOptional<z.ZodBoolean>;
        iconPath: z.ZodOptional<z.ZodString>;
        timeout: z.ZodOptional<z.ZodNumber>;
        initTimeout: z.ZodOptional<z.ZodNumber>;
        chatMenu: z.ZodOptional<z.ZodBoolean>;
        serverInstructions: z.ZodOptional<z.ZodUnion<[z.ZodBoolean, z.ZodString]>>;
        requiresOAuth: z.ZodOptional<z.ZodBoolean>;
        oauth: z.ZodOptional<z.ZodObject<{
            authorization_url: z.ZodOptional<z.ZodString>;
            token_url: z.ZodOptional<z.ZodString>;
            client_id: z.ZodOptional<z.ZodString>;
            client_secret: z.ZodOptional<z.ZodString>;
            scope: z.ZodOptional<z.ZodString>;
            redirect_uri: z.ZodOptional<z.ZodString>;
            token_exchange_method: z.ZodOptional<z.ZodNativeEnum<typeof import(".").TokenExchangeMethodEnum>>;
            grant_types_supported: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            token_endpoint_auth_methods_supported: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            response_types_supported: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            code_challenge_methods_supported: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            revocation_endpoint: z.ZodOptional<z.ZodString>;
            revocation_endpoint_auth_methods_supported: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        }, "strip", z.ZodTypeAny, {
            authorization_url?: string | undefined;
            token_url?: string | undefined;
            client_id?: string | undefined;
            client_secret?: string | undefined;
            scope?: string | undefined;
            redirect_uri?: string | undefined;
            token_exchange_method?: import(".").TokenExchangeMethodEnum | undefined;
            grant_types_supported?: string[] | undefined;
            token_endpoint_auth_methods_supported?: string[] | undefined;
            response_types_supported?: string[] | undefined;
            code_challenge_methods_supported?: string[] | undefined;
            revocation_endpoint?: string | undefined;
            revocation_endpoint_auth_methods_supported?: string[] | undefined;
        }, {
            authorization_url?: string | undefined;
            token_url?: string | undefined;
            client_id?: string | undefined;
            client_secret?: string | undefined;
            scope?: string | undefined;
            redirect_uri?: string | undefined;
            token_exchange_method?: import(".").TokenExchangeMethodEnum | undefined;
            grant_types_supported?: string[] | undefined;
            token_endpoint_auth_methods_supported?: string[] | undefined;
            response_types_supported?: string[] | undefined;
            code_challenge_methods_supported?: string[] | undefined;
            revocation_endpoint?: string | undefined;
            revocation_endpoint_auth_methods_supported?: string[] | undefined;
        }>>;
        oauth_headers: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        customUserVars: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
            title: z.ZodString;
            description: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            title: string;
            description: string;
        }, {
            title: string;
            description: string;
        }>>>;
    } & {
        type: z.ZodOptional<z.ZodLiteral<"stdio">>;
        command: z.ZodString;
        args: z.ZodArray<z.ZodString, "many">;
        env: z.ZodEffects<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>, Record<string, string> | undefined, Record<string, string> | undefined>;
        stderr: z.ZodOptional<z.ZodAny>;
    }, "strip", z.ZodTypeAny, {
        command: string;
        args: string[];
        type?: "stdio" | undefined;
        timeout?: number | undefined;
        startup?: boolean | undefined;
        iconPath?: string | undefined;
        initTimeout?: number | undefined;
        chatMenu?: boolean | undefined;
        serverInstructions?: string | boolean | undefined;
        requiresOAuth?: boolean | undefined;
        oauth?: {
            authorization_url?: string | undefined;
            token_url?: string | undefined;
            client_id?: string | undefined;
            client_secret?: string | undefined;
            scope?: string | undefined;
            redirect_uri?: string | undefined;
            token_exchange_method?: import(".").TokenExchangeMethodEnum | undefined;
            grant_types_supported?: string[] | undefined;
            token_endpoint_auth_methods_supported?: string[] | undefined;
            response_types_supported?: string[] | undefined;
            code_challenge_methods_supported?: string[] | undefined;
            revocation_endpoint?: string | undefined;
            revocation_endpoint_auth_methods_supported?: string[] | undefined;
        } | undefined;
        oauth_headers?: Record<string, string> | undefined;
        customUserVars?: Record<string, {
            title: string;
            description: string;
        }> | undefined;
        env?: Record<string, string> | undefined;
        stderr?: any;
    }, {
        command: string;
        args: string[];
        type?: "stdio" | undefined;
        timeout?: number | undefined;
        startup?: boolean | undefined;
        iconPath?: string | undefined;
        initTimeout?: number | undefined;
        chatMenu?: boolean | undefined;
        serverInstructions?: string | boolean | undefined;
        requiresOAuth?: boolean | undefined;
        oauth?: {
            authorization_url?: string | undefined;
            token_url?: string | undefined;
            client_id?: string | undefined;
            client_secret?: string | undefined;
            scope?: string | undefined;
            redirect_uri?: string | undefined;
            token_exchange_method?: import(".").TokenExchangeMethodEnum | undefined;
            grant_types_supported?: string[] | undefined;
            token_endpoint_auth_methods_supported?: string[] | undefined;
            response_types_supported?: string[] | undefined;
            code_challenge_methods_supported?: string[] | undefined;
            revocation_endpoint?: string | undefined;
            revocation_endpoint_auth_methods_supported?: string[] | undefined;
        } | undefined;
        oauth_headers?: Record<string, string> | undefined;
        customUserVars?: Record<string, {
            title: string;
            description: string;
        }> | undefined;
        env?: Record<string, string> | undefined;
        stderr?: any;
    }>, z.ZodObject<{
        startup: z.ZodOptional<z.ZodBoolean>;
        iconPath: z.ZodOptional<z.ZodString>;
        timeout: z.ZodOptional<z.ZodNumber>;
        initTimeout: z.ZodOptional<z.ZodNumber>;
        chatMenu: z.ZodOptional<z.ZodBoolean>;
        serverInstructions: z.ZodOptional<z.ZodUnion<[z.ZodBoolean, z.ZodString]>>;
        requiresOAuth: z.ZodOptional<z.ZodBoolean>;
        oauth: z.ZodOptional<z.ZodObject<{
            authorization_url: z.ZodOptional<z.ZodString>;
            token_url: z.ZodOptional<z.ZodString>;
            client_id: z.ZodOptional<z.ZodString>;
            client_secret: z.ZodOptional<z.ZodString>;
            scope: z.ZodOptional<z.ZodString>;
            redirect_uri: z.ZodOptional<z.ZodString>;
            token_exchange_method: z.ZodOptional<z.ZodNativeEnum<typeof import(".").TokenExchangeMethodEnum>>;
            grant_types_supported: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            token_endpoint_auth_methods_supported: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            response_types_supported: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            code_challenge_methods_supported: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            revocation_endpoint: z.ZodOptional<z.ZodString>;
            revocation_endpoint_auth_methods_supported: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        }, "strip", z.ZodTypeAny, {
            authorization_url?: string | undefined;
            token_url?: string | undefined;
            client_id?: string | undefined;
            client_secret?: string | undefined;
            scope?: string | undefined;
            redirect_uri?: string | undefined;
            token_exchange_method?: import(".").TokenExchangeMethodEnum | undefined;
            grant_types_supported?: string[] | undefined;
            token_endpoint_auth_methods_supported?: string[] | undefined;
            response_types_supported?: string[] | undefined;
            code_challenge_methods_supported?: string[] | undefined;
            revocation_endpoint?: string | undefined;
            revocation_endpoint_auth_methods_supported?: string[] | undefined;
        }, {
            authorization_url?: string | undefined;
            token_url?: string | undefined;
            client_id?: string | undefined;
            client_secret?: string | undefined;
            scope?: string | undefined;
            redirect_uri?: string | undefined;
            token_exchange_method?: import(".").TokenExchangeMethodEnum | undefined;
            grant_types_supported?: string[] | undefined;
            token_endpoint_auth_methods_supported?: string[] | undefined;
            response_types_supported?: string[] | undefined;
            code_challenge_methods_supported?: string[] | undefined;
            revocation_endpoint?: string | undefined;
            revocation_endpoint_auth_methods_supported?: string[] | undefined;
        }>>;
        oauth_headers: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        customUserVars: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
            title: z.ZodString;
            description: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            title: string;
            description: string;
        }, {
            title: string;
            description: string;
        }>>>;
    } & {
        type: z.ZodOptional<z.ZodLiteral<"websocket">>;
        url: z.ZodEffects<z.ZodPipeline<z.ZodEffects<z.ZodString, string, string>, z.ZodString>, string, string>;
    }, "strip", z.ZodTypeAny, {
        url: string;
        type?: "websocket" | undefined;
        timeout?: number | undefined;
        startup?: boolean | undefined;
        iconPath?: string | undefined;
        initTimeout?: number | undefined;
        chatMenu?: boolean | undefined;
        serverInstructions?: string | boolean | undefined;
        requiresOAuth?: boolean | undefined;
        oauth?: {
            authorization_url?: string | undefined;
            token_url?: string | undefined;
            client_id?: string | undefined;
            client_secret?: string | undefined;
            scope?: string | undefined;
            redirect_uri?: string | undefined;
            token_exchange_method?: import(".").TokenExchangeMethodEnum | undefined;
            grant_types_supported?: string[] | undefined;
            token_endpoint_auth_methods_supported?: string[] | undefined;
            response_types_supported?: string[] | undefined;
            code_challenge_methods_supported?: string[] | undefined;
            revocation_endpoint?: string | undefined;
            revocation_endpoint_auth_methods_supported?: string[] | undefined;
        } | undefined;
        oauth_headers?: Record<string, string> | undefined;
        customUserVars?: Record<string, {
            title: string;
            description: string;
        }> | undefined;
    }, {
        url: string;
        type?: "websocket" | undefined;
        timeout?: number | undefined;
        startup?: boolean | undefined;
        iconPath?: string | undefined;
        initTimeout?: number | undefined;
        chatMenu?: boolean | undefined;
        serverInstructions?: string | boolean | undefined;
        requiresOAuth?: boolean | undefined;
        oauth?: {
            authorization_url?: string | undefined;
            token_url?: string | undefined;
            client_id?: string | undefined;
            client_secret?: string | undefined;
            scope?: string | undefined;
            redirect_uri?: string | undefined;
            token_exchange_method?: import(".").TokenExchangeMethodEnum | undefined;
            grant_types_supported?: string[] | undefined;
            token_endpoint_auth_methods_supported?: string[] | undefined;
            response_types_supported?: string[] | undefined;
            code_challenge_methods_supported?: string[] | undefined;
            revocation_endpoint?: string | undefined;
            revocation_endpoint_auth_methods_supported?: string[] | undefined;
        } | undefined;
        oauth_headers?: Record<string, string> | undefined;
        customUserVars?: Record<string, {
            title: string;
            description: string;
        }> | undefined;
    }>, z.ZodObject<{
        startup: z.ZodOptional<z.ZodBoolean>;
        iconPath: z.ZodOptional<z.ZodString>;
        timeout: z.ZodOptional<z.ZodNumber>;
        initTimeout: z.ZodOptional<z.ZodNumber>;
        chatMenu: z.ZodOptional<z.ZodBoolean>;
        serverInstructions: z.ZodOptional<z.ZodUnion<[z.ZodBoolean, z.ZodString]>>;
        requiresOAuth: z.ZodOptional<z.ZodBoolean>;
        oauth: z.ZodOptional<z.ZodObject<{
            authorization_url: z.ZodOptional<z.ZodString>;
            token_url: z.ZodOptional<z.ZodString>;
            client_id: z.ZodOptional<z.ZodString>;
            client_secret: z.ZodOptional<z.ZodString>;
            scope: z.ZodOptional<z.ZodString>;
            redirect_uri: z.ZodOptional<z.ZodString>;
            token_exchange_method: z.ZodOptional<z.ZodNativeEnum<typeof import(".").TokenExchangeMethodEnum>>;
            grant_types_supported: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            token_endpoint_auth_methods_supported: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            response_types_supported: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            code_challenge_methods_supported: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            revocation_endpoint: z.ZodOptional<z.ZodString>;
            revocation_endpoint_auth_methods_supported: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        }, "strip", z.ZodTypeAny, {
            authorization_url?: string | undefined;
            token_url?: string | undefined;
            client_id?: string | undefined;
            client_secret?: string | undefined;
            scope?: string | undefined;
            redirect_uri?: string | undefined;
            token_exchange_method?: import(".").TokenExchangeMethodEnum | undefined;
            grant_types_supported?: string[] | undefined;
            token_endpoint_auth_methods_supported?: string[] | undefined;
            response_types_supported?: string[] | undefined;
            code_challenge_methods_supported?: string[] | undefined;
            revocation_endpoint?: string | undefined;
            revocation_endpoint_auth_methods_supported?: string[] | undefined;
        }, {
            authorization_url?: string | undefined;
            token_url?: string | undefined;
            client_id?: string | undefined;
            client_secret?: string | undefined;
            scope?: string | undefined;
            redirect_uri?: string | undefined;
            token_exchange_method?: import(".").TokenExchangeMethodEnum | undefined;
            grant_types_supported?: string[] | undefined;
            token_endpoint_auth_methods_supported?: string[] | undefined;
            response_types_supported?: string[] | undefined;
            code_challenge_methods_supported?: string[] | undefined;
            revocation_endpoint?: string | undefined;
            revocation_endpoint_auth_methods_supported?: string[] | undefined;
        }>>;
        oauth_headers: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        customUserVars: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
            title: z.ZodString;
            description: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            title: string;
            description: string;
        }, {
            title: string;
            description: string;
        }>>>;
    } & {
        type: z.ZodOptional<z.ZodLiteral<"sse">>;
        headers: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        url: z.ZodEffects<z.ZodPipeline<z.ZodEffects<z.ZodString, string, string>, z.ZodString>, string, string>;
    }, "strip", z.ZodTypeAny, {
        url: string;
        type?: "sse" | undefined;
        headers?: Record<string, string> | undefined;
        timeout?: number | undefined;
        startup?: boolean | undefined;
        iconPath?: string | undefined;
        initTimeout?: number | undefined;
        chatMenu?: boolean | undefined;
        serverInstructions?: string | boolean | undefined;
        requiresOAuth?: boolean | undefined;
        oauth?: {
            authorization_url?: string | undefined;
            token_url?: string | undefined;
            client_id?: string | undefined;
            client_secret?: string | undefined;
            scope?: string | undefined;
            redirect_uri?: string | undefined;
            token_exchange_method?: import(".").TokenExchangeMethodEnum | undefined;
            grant_types_supported?: string[] | undefined;
            token_endpoint_auth_methods_supported?: string[] | undefined;
            response_types_supported?: string[] | undefined;
            code_challenge_methods_supported?: string[] | undefined;
            revocation_endpoint?: string | undefined;
            revocation_endpoint_auth_methods_supported?: string[] | undefined;
        } | undefined;
        oauth_headers?: Record<string, string> | undefined;
        customUserVars?: Record<string, {
            title: string;
            description: string;
        }> | undefined;
    }, {
        url: string;
        type?: "sse" | undefined;
        headers?: Record<string, string> | undefined;
        timeout?: number | undefined;
        startup?: boolean | undefined;
        iconPath?: string | undefined;
        initTimeout?: number | undefined;
        chatMenu?: boolean | undefined;
        serverInstructions?: string | boolean | undefined;
        requiresOAuth?: boolean | undefined;
        oauth?: {
            authorization_url?: string | undefined;
            token_url?: string | undefined;
            client_id?: string | undefined;
            client_secret?: string | undefined;
            scope?: string | undefined;
            redirect_uri?: string | undefined;
            token_exchange_method?: import(".").TokenExchangeMethodEnum | undefined;
            grant_types_supported?: string[] | undefined;
            token_endpoint_auth_methods_supported?: string[] | undefined;
            response_types_supported?: string[] | undefined;
            code_challenge_methods_supported?: string[] | undefined;
            revocation_endpoint?: string | undefined;
            revocation_endpoint_auth_methods_supported?: string[] | undefined;
        } | undefined;
        oauth_headers?: Record<string, string> | undefined;
        customUserVars?: Record<string, {
            title: string;
            description: string;
        }> | undefined;
    }>, z.ZodObject<{
        startup: z.ZodOptional<z.ZodBoolean>;
        iconPath: z.ZodOptional<z.ZodString>;
        timeout: z.ZodOptional<z.ZodNumber>;
        initTimeout: z.ZodOptional<z.ZodNumber>;
        chatMenu: z.ZodOptional<z.ZodBoolean>;
        serverInstructions: z.ZodOptional<z.ZodUnion<[z.ZodBoolean, z.ZodString]>>;
        requiresOAuth: z.ZodOptional<z.ZodBoolean>;
        oauth: z.ZodOptional<z.ZodObject<{
            authorization_url: z.ZodOptional<z.ZodString>;
            token_url: z.ZodOptional<z.ZodString>;
            client_id: z.ZodOptional<z.ZodString>;
            client_secret: z.ZodOptional<z.ZodString>;
            scope: z.ZodOptional<z.ZodString>;
            redirect_uri: z.ZodOptional<z.ZodString>;
            token_exchange_method: z.ZodOptional<z.ZodNativeEnum<typeof import(".").TokenExchangeMethodEnum>>;
            grant_types_supported: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            token_endpoint_auth_methods_supported: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            response_types_supported: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            code_challenge_methods_supported: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            revocation_endpoint: z.ZodOptional<z.ZodString>;
            revocation_endpoint_auth_methods_supported: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        }, "strip", z.ZodTypeAny, {
            authorization_url?: string | undefined;
            token_url?: string | undefined;
            client_id?: string | undefined;
            client_secret?: string | undefined;
            scope?: string | undefined;
            redirect_uri?: string | undefined;
            token_exchange_method?: import(".").TokenExchangeMethodEnum | undefined;
            grant_types_supported?: string[] | undefined;
            token_endpoint_auth_methods_supported?: string[] | undefined;
            response_types_supported?: string[] | undefined;
            code_challenge_methods_supported?: string[] | undefined;
            revocation_endpoint?: string | undefined;
            revocation_endpoint_auth_methods_supported?: string[] | undefined;
        }, {
            authorization_url?: string | undefined;
            token_url?: string | undefined;
            client_id?: string | undefined;
            client_secret?: string | undefined;
            scope?: string | undefined;
            redirect_uri?: string | undefined;
            token_exchange_method?: import(".").TokenExchangeMethodEnum | undefined;
            grant_types_supported?: string[] | undefined;
            token_endpoint_auth_methods_supported?: string[] | undefined;
            response_types_supported?: string[] | undefined;
            code_challenge_methods_supported?: string[] | undefined;
            revocation_endpoint?: string | undefined;
            revocation_endpoint_auth_methods_supported?: string[] | undefined;
        }>>;
        oauth_headers: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        customUserVars: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
            title: z.ZodString;
            description: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            title: string;
            description: string;
        }, {
            title: string;
            description: string;
        }>>>;
    } & {
        type: z.ZodUnion<[z.ZodLiteral<"streamable-http">, z.ZodLiteral<"http">]>;
        headers: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        url: z.ZodEffects<z.ZodPipeline<z.ZodEffects<z.ZodString, string, string>, z.ZodString>, string, string>;
    }, "strip", z.ZodTypeAny, {
        type: "streamable-http" | "http";
        url: string;
        headers?: Record<string, string> | undefined;
        timeout?: number | undefined;
        startup?: boolean | undefined;
        iconPath?: string | undefined;
        initTimeout?: number | undefined;
        chatMenu?: boolean | undefined;
        serverInstructions?: string | boolean | undefined;
        requiresOAuth?: boolean | undefined;
        oauth?: {
            authorization_url?: string | undefined;
            token_url?: string | undefined;
            client_id?: string | undefined;
            client_secret?: string | undefined;
            scope?: string | undefined;
            redirect_uri?: string | undefined;
            token_exchange_method?: import(".").TokenExchangeMethodEnum | undefined;
            grant_types_supported?: string[] | undefined;
            token_endpoint_auth_methods_supported?: string[] | undefined;
            response_types_supported?: string[] | undefined;
            code_challenge_methods_supported?: string[] | undefined;
            revocation_endpoint?: string | undefined;
            revocation_endpoint_auth_methods_supported?: string[] | undefined;
        } | undefined;
        oauth_headers?: Record<string, string> | undefined;
        customUserVars?: Record<string, {
            title: string;
            description: string;
        }> | undefined;
    }, {
        type: "streamable-http" | "http";
        url: string;
        headers?: Record<string, string> | undefined;
        timeout?: number | undefined;
        startup?: boolean | undefined;
        iconPath?: string | undefined;
        initTimeout?: number | undefined;
        chatMenu?: boolean | undefined;
        serverInstructions?: string | boolean | undefined;
        requiresOAuth?: boolean | undefined;
        oauth?: {
            authorization_url?: string | undefined;
            token_url?: string | undefined;
            client_id?: string | undefined;
            client_secret?: string | undefined;
            scope?: string | undefined;
            redirect_uri?: string | undefined;
            token_exchange_method?: import(".").TokenExchangeMethodEnum | undefined;
            grant_types_supported?: string[] | undefined;
            token_endpoint_auth_methods_supported?: string[] | undefined;
            response_types_supported?: string[] | undefined;
            code_challenge_methods_supported?: string[] | undefined;
            revocation_endpoint?: string | undefined;
            revocation_endpoint_auth_methods_supported?: string[] | undefined;
        } | undefined;
        oauth_headers?: Record<string, string> | undefined;
        customUserVars?: Record<string, {
            title: string;
            description: string;
        }> | undefined;
    }>]>>>;
    interface: z.ZodDefault<z.ZodObject<{
        privacyPolicy: z.ZodOptional<z.ZodObject<{
            externalUrl: z.ZodOptional<z.ZodString>;
            openNewTab: z.ZodOptional<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            externalUrl?: string | undefined;
            openNewTab?: boolean | undefined;
        }, {
            externalUrl?: string | undefined;
            openNewTab?: boolean | undefined;
        }>>;
        termsOfService: z.ZodOptional<z.ZodObject<{
            externalUrl: z.ZodOptional<z.ZodString>;
            openNewTab: z.ZodOptional<z.ZodBoolean>;
            modalAcceptance: z.ZodOptional<z.ZodBoolean>;
            modalTitle: z.ZodOptional<z.ZodString>;
            modalContent: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        }, "strip", z.ZodTypeAny, {
            externalUrl?: string | undefined;
            openNewTab?: boolean | undefined;
            modalAcceptance?: boolean | undefined;
            modalTitle?: string | undefined;
            modalContent?: string | string[] | undefined;
        }, {
            externalUrl?: string | undefined;
            openNewTab?: boolean | undefined;
            modalAcceptance?: boolean | undefined;
            modalTitle?: string | undefined;
            modalContent?: string | string[] | undefined;
        }>>;
        customWelcome: z.ZodOptional<z.ZodString>;
        mcpServers: z.ZodOptional<z.ZodObject<{
            placeholder: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            placeholder?: string | undefined;
        }, {
            placeholder?: string | undefined;
        }>>;
        endpointsMenu: z.ZodOptional<z.ZodBoolean>;
        modelSelect: z.ZodOptional<z.ZodBoolean>;
        parameters: z.ZodOptional<z.ZodBoolean>;
        sidePanel: z.ZodOptional<z.ZodBoolean>;
        multiConvo: z.ZodOptional<z.ZodBoolean>;
        bookmarks: z.ZodOptional<z.ZodBoolean>;
        memories: z.ZodOptional<z.ZodBoolean>;
        presets: z.ZodOptional<z.ZodBoolean>;
        prompts: z.ZodOptional<z.ZodBoolean>;
        agents: z.ZodOptional<z.ZodBoolean>;
        temporaryChat: z.ZodOptional<z.ZodBoolean>;
        temporaryChatRetention: z.ZodOptional<z.ZodNumber>;
        runCode: z.ZodOptional<z.ZodBoolean>;
        webSearch: z.ZodOptional<z.ZodBoolean>;
        peoplePicker: z.ZodOptional<z.ZodObject<{
            users: z.ZodOptional<z.ZodBoolean>;
            groups: z.ZodOptional<z.ZodBoolean>;
            roles: z.ZodOptional<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            users?: boolean | undefined;
            groups?: boolean | undefined;
            roles?: boolean | undefined;
        }, {
            users?: boolean | undefined;
            groups?: boolean | undefined;
            roles?: boolean | undefined;
        }>>;
        marketplace: z.ZodOptional<z.ZodObject<{
            use: z.ZodOptional<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            use?: boolean | undefined;
        }, {
            use?: boolean | undefined;
        }>>;
        fileSearch: z.ZodOptional<z.ZodBoolean>;
        fileCitations: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        webSearch?: boolean | undefined;
        mcpServers?: {
            placeholder?: string | undefined;
        } | undefined;
        privacyPolicy?: {
            externalUrl?: string | undefined;
            openNewTab?: boolean | undefined;
        } | undefined;
        termsOfService?: {
            externalUrl?: string | undefined;
            openNewTab?: boolean | undefined;
            modalAcceptance?: boolean | undefined;
            modalTitle?: string | undefined;
            modalContent?: string | string[] | undefined;
        } | undefined;
        customWelcome?: string | undefined;
        endpointsMenu?: boolean | undefined;
        modelSelect?: boolean | undefined;
        parameters?: boolean | undefined;
        sidePanel?: boolean | undefined;
        multiConvo?: boolean | undefined;
        bookmarks?: boolean | undefined;
        memories?: boolean | undefined;
        presets?: boolean | undefined;
        prompts?: boolean | undefined;
        agents?: boolean | undefined;
        temporaryChat?: boolean | undefined;
        temporaryChatRetention?: number | undefined;
        runCode?: boolean | undefined;
        peoplePicker?: {
            users?: boolean | undefined;
            groups?: boolean | undefined;
            roles?: boolean | undefined;
        } | undefined;
        marketplace?: {
            use?: boolean | undefined;
        } | undefined;
        fileSearch?: boolean | undefined;
        fileCitations?: boolean | undefined;
    }, {
        webSearch?: boolean | undefined;
        mcpServers?: {
            placeholder?: string | undefined;
        } | undefined;
        privacyPolicy?: {
            externalUrl?: string | undefined;
            openNewTab?: boolean | undefined;
        } | undefined;
        termsOfService?: {
            externalUrl?: string | undefined;
            openNewTab?: boolean | undefined;
            modalAcceptance?: boolean | undefined;
            modalTitle?: string | undefined;
            modalContent?: string | string[] | undefined;
        } | undefined;
        customWelcome?: string | undefined;
        endpointsMenu?: boolean | undefined;
        modelSelect?: boolean | undefined;
        parameters?: boolean | undefined;
        sidePanel?: boolean | undefined;
        multiConvo?: boolean | undefined;
        bookmarks?: boolean | undefined;
        memories?: boolean | undefined;
        presets?: boolean | undefined;
        prompts?: boolean | undefined;
        agents?: boolean | undefined;
        temporaryChat?: boolean | undefined;
        temporaryChatRetention?: number | undefined;
        runCode?: boolean | undefined;
        peoplePicker?: {
            users?: boolean | undefined;
            groups?: boolean | undefined;
            roles?: boolean | undefined;
        } | undefined;
        marketplace?: {
            use?: boolean | undefined;
        } | undefined;
        fileSearch?: boolean | undefined;
        fileCitations?: boolean | undefined;
    }>>;
    turnstile: z.ZodOptional<z.ZodObject<{
        siteKey: z.ZodString;
        options: z.ZodOptional<z.ZodDefault<z.ZodObject<{
            language: z.ZodDefault<z.ZodString>;
            size: z.ZodDefault<z.ZodEnum<["normal", "compact", "flexible", "invisible"]>>;
        }, "strip", z.ZodTypeAny, {
            language: string;
            size: "normal" | "compact" | "flexible" | "invisible";
        }, {
            language?: string | undefined;
            size?: "normal" | "compact" | "flexible" | "invisible" | undefined;
        }>>>;
    }, "strip", z.ZodTypeAny, {
        siteKey: string;
        options?: {
            language: string;
            size: "normal" | "compact" | "flexible" | "invisible";
        } | undefined;
    }, {
        siteKey: string;
        options?: {
            language?: string | undefined;
            size?: "normal" | "compact" | "flexible" | "invisible" | undefined;
        } | undefined;
    }>>;
    fileStrategy: z.ZodDefault<z.ZodNativeEnum<typeof FileSources>>;
    fileStrategies: z.ZodOptional<z.ZodObject<{
        default: z.ZodOptional<z.ZodNativeEnum<typeof FileSources>>;
        avatar: z.ZodOptional<z.ZodNativeEnum<typeof FileSources>>;
        image: z.ZodOptional<z.ZodNativeEnum<typeof FileSources>>;
        document: z.ZodOptional<z.ZodNativeEnum<typeof FileSources>>;
    }, "strip", z.ZodTypeAny, {
        default?: FileSources | undefined;
        avatar?: FileSources | undefined;
        image?: FileSources | undefined;
        document?: FileSources | undefined;
    }, {
        default?: FileSources | undefined;
        avatar?: FileSources | undefined;
        image?: FileSources | undefined;
        document?: FileSources | undefined;
    }>>;
    actions: z.ZodOptional<z.ZodObject<{
        allowedDomains: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        allowedDomains?: string[] | undefined;
    }, {
        allowedDomains?: string[] | undefined;
    }>>;
    registration: z.ZodDefault<z.ZodObject<{
        socialLogins: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        allowedDomains: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        allowedDomains?: string[] | undefined;
        socialLogins?: string[] | undefined;
    }, {
        allowedDomains?: string[] | undefined;
        socialLogins?: string[] | undefined;
    }>>;
    balance: z.ZodOptional<z.ZodObject<{
        enabled: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        startBalance: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
        autoRefillEnabled: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        refillIntervalValue: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
        refillIntervalUnit: z.ZodDefault<z.ZodOptional<z.ZodEnum<["seconds", "minutes", "hours", "days", "weeks", "months"]>>>;
        refillAmount: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
    }, "strip", z.ZodTypeAny, {
        enabled: boolean;
        startBalance: number;
        autoRefillEnabled: boolean;
        refillIntervalValue: number;
        refillIntervalUnit: "seconds" | "minutes" | "hours" | "days" | "weeks" | "months";
        refillAmount: number;
    }, {
        enabled?: boolean | undefined;
        startBalance?: number | undefined;
        autoRefillEnabled?: boolean | undefined;
        refillIntervalValue?: number | undefined;
        refillIntervalUnit?: "seconds" | "minutes" | "hours" | "days" | "weeks" | "months" | undefined;
        refillAmount?: number | undefined;
    }>>;
    transactions: z.ZodOptional<z.ZodObject<{
        enabled: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    }, "strip", z.ZodTypeAny, {
        enabled: boolean;
    }, {
        enabled?: boolean | undefined;
    }>>;
    speech: z.ZodOptional<z.ZodObject<{
        tts: z.ZodOptional<z.ZodObject<{
            openai: z.ZodOptional<z.ZodObject<{
                url: z.ZodOptional<z.ZodString>;
                apiKey: z.ZodString;
                model: z.ZodString;
                voices: z.ZodArray<z.ZodString, "many">;
            }, "strip", z.ZodTypeAny, {
                model: string;
                apiKey: string;
                voices: string[];
                url?: string | undefined;
            }, {
                model: string;
                apiKey: string;
                voices: string[];
                url?: string | undefined;
            }>>;
            azureOpenAI: z.ZodOptional<z.ZodObject<{
                instanceName: z.ZodString;
                apiKey: z.ZodString;
                deploymentName: z.ZodString;
                apiVersion: z.ZodString;
                model: z.ZodString;
                voices: z.ZodArray<z.ZodString, "many">;
            }, "strip", z.ZodTypeAny, {
                model: string;
                apiKey: string;
                voices: string[];
                instanceName: string;
                deploymentName: string;
                apiVersion: string;
            }, {
                model: string;
                apiKey: string;
                voices: string[];
                instanceName: string;
                deploymentName: string;
                apiVersion: string;
            }>>;
            elevenlabs: z.ZodOptional<z.ZodObject<{
                url: z.ZodOptional<z.ZodString>;
                websocketUrl: z.ZodOptional<z.ZodString>;
                apiKey: z.ZodString;
                model: z.ZodString;
                voices: z.ZodArray<z.ZodString, "many">;
                voice_settings: z.ZodOptional<z.ZodObject<{
                    similarity_boost: z.ZodOptional<z.ZodNumber>;
                    stability: z.ZodOptional<z.ZodNumber>;
                    style: z.ZodOptional<z.ZodNumber>;
                    use_speaker_boost: z.ZodOptional<z.ZodBoolean>;
                }, "strip", z.ZodTypeAny, {
                    similarity_boost?: number | undefined;
                    stability?: number | undefined;
                    style?: number | undefined;
                    use_speaker_boost?: boolean | undefined;
                }, {
                    similarity_boost?: number | undefined;
                    stability?: number | undefined;
                    style?: number | undefined;
                    use_speaker_boost?: boolean | undefined;
                }>>;
                pronunciation_dictionary_locators: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            }, "strip", z.ZodTypeAny, {
                model: string;
                apiKey: string;
                voices: string[];
                url?: string | undefined;
                websocketUrl?: string | undefined;
                voice_settings?: {
                    similarity_boost?: number | undefined;
                    stability?: number | undefined;
                    style?: number | undefined;
                    use_speaker_boost?: boolean | undefined;
                } | undefined;
                pronunciation_dictionary_locators?: string[] | undefined;
            }, {
                model: string;
                apiKey: string;
                voices: string[];
                url?: string | undefined;
                websocketUrl?: string | undefined;
                voice_settings?: {
                    similarity_boost?: number | undefined;
                    stability?: number | undefined;
                    style?: number | undefined;
                    use_speaker_boost?: boolean | undefined;
                } | undefined;
                pronunciation_dictionary_locators?: string[] | undefined;
            }>>;
            localai: z.ZodOptional<z.ZodObject<{
                url: z.ZodString;
                apiKey: z.ZodOptional<z.ZodString>;
                voices: z.ZodArray<z.ZodString, "many">;
                backend: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                url: string;
                voices: string[];
                backend: string;
                apiKey?: string | undefined;
            }, {
                url: string;
                voices: string[];
                backend: string;
                apiKey?: string | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            openai?: {
                model: string;
                apiKey: string;
                voices: string[];
                url?: string | undefined;
            } | undefined;
            azureOpenAI?: {
                model: string;
                apiKey: string;
                voices: string[];
                instanceName: string;
                deploymentName: string;
                apiVersion: string;
            } | undefined;
            elevenlabs?: {
                model: string;
                apiKey: string;
                voices: string[];
                url?: string | undefined;
                websocketUrl?: string | undefined;
                voice_settings?: {
                    similarity_boost?: number | undefined;
                    stability?: number | undefined;
                    style?: number | undefined;
                    use_speaker_boost?: boolean | undefined;
                } | undefined;
                pronunciation_dictionary_locators?: string[] | undefined;
            } | undefined;
            localai?: {
                url: string;
                voices: string[];
                backend: string;
                apiKey?: string | undefined;
            } | undefined;
        }, {
            openai?: {
                model: string;
                apiKey: string;
                voices: string[];
                url?: string | undefined;
            } | undefined;
            azureOpenAI?: {
                model: string;
                apiKey: string;
                voices: string[];
                instanceName: string;
                deploymentName: string;
                apiVersion: string;
            } | undefined;
            elevenlabs?: {
                model: string;
                apiKey: string;
                voices: string[];
                url?: string | undefined;
                websocketUrl?: string | undefined;
                voice_settings?: {
                    similarity_boost?: number | undefined;
                    stability?: number | undefined;
                    style?: number | undefined;
                    use_speaker_boost?: boolean | undefined;
                } | undefined;
                pronunciation_dictionary_locators?: string[] | undefined;
            } | undefined;
            localai?: {
                url: string;
                voices: string[];
                backend: string;
                apiKey?: string | undefined;
            } | undefined;
        }>>;
        stt: z.ZodOptional<z.ZodObject<{
            openai: z.ZodOptional<z.ZodObject<{
                url: z.ZodOptional<z.ZodString>;
                apiKey: z.ZodString;
                model: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                model: string;
                apiKey: string;
                url?: string | undefined;
            }, {
                model: string;
                apiKey: string;
                url?: string | undefined;
            }>>;
            azureOpenAI: z.ZodOptional<z.ZodObject<{
                instanceName: z.ZodString;
                apiKey: z.ZodString;
                deploymentName: z.ZodString;
                apiVersion: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                apiKey: string;
                instanceName: string;
                deploymentName: string;
                apiVersion: string;
            }, {
                apiKey: string;
                instanceName: string;
                deploymentName: string;
                apiVersion: string;
            }>>;
        }, "strip", z.ZodTypeAny, {
            openai?: {
                model: string;
                apiKey: string;
                url?: string | undefined;
            } | undefined;
            azureOpenAI?: {
                apiKey: string;
                instanceName: string;
                deploymentName: string;
                apiVersion: string;
            } | undefined;
        }, {
            openai?: {
                model: string;
                apiKey: string;
                url?: string | undefined;
            } | undefined;
            azureOpenAI?: {
                apiKey: string;
                instanceName: string;
                deploymentName: string;
                apiVersion: string;
            } | undefined;
        }>>;
        speechTab: z.ZodOptional<z.ZodOptional<z.ZodObject<{
            conversationMode: z.ZodOptional<z.ZodBoolean>;
            advancedMode: z.ZodOptional<z.ZodBoolean>;
            speechToText: z.ZodOptional<z.ZodUnion<[z.ZodOptional<z.ZodBoolean>, z.ZodObject<{
                engineSTT: z.ZodOptional<z.ZodString>;
                languageSTT: z.ZodOptional<z.ZodString>;
                autoTranscribeAudio: z.ZodOptional<z.ZodBoolean>;
                decibelValue: z.ZodOptional<z.ZodNumber>;
                autoSendText: z.ZodOptional<z.ZodNumber>;
            }, "strip", z.ZodTypeAny, {
                engineSTT?: string | undefined;
                languageSTT?: string | undefined;
                autoTranscribeAudio?: boolean | undefined;
                decibelValue?: number | undefined;
                autoSendText?: number | undefined;
            }, {
                engineSTT?: string | undefined;
                languageSTT?: string | undefined;
                autoTranscribeAudio?: boolean | undefined;
                decibelValue?: number | undefined;
                autoSendText?: number | undefined;
            }>]>>;
            textToSpeech: z.ZodOptional<z.ZodUnion<[z.ZodOptional<z.ZodBoolean>, z.ZodObject<{
                engineTTS: z.ZodOptional<z.ZodString>;
                voice: z.ZodOptional<z.ZodString>;
                languageTTS: z.ZodOptional<z.ZodString>;
                automaticPlayback: z.ZodOptional<z.ZodBoolean>;
                playbackRate: z.ZodOptional<z.ZodNumber>;
                cacheTTS: z.ZodOptional<z.ZodBoolean>;
            }, "strip", z.ZodTypeAny, {
                engineTTS?: string | undefined;
                voice?: string | undefined;
                languageTTS?: string | undefined;
                automaticPlayback?: boolean | undefined;
                playbackRate?: number | undefined;
                cacheTTS?: boolean | undefined;
            }, {
                engineTTS?: string | undefined;
                voice?: string | undefined;
                languageTTS?: string | undefined;
                automaticPlayback?: boolean | undefined;
                playbackRate?: number | undefined;
                cacheTTS?: boolean | undefined;
            }>]>>;
        }, "strip", z.ZodTypeAny, {
            conversationMode?: boolean | undefined;
            advancedMode?: boolean | undefined;
            speechToText?: boolean | {
                engineSTT?: string | undefined;
                languageSTT?: string | undefined;
                autoTranscribeAudio?: boolean | undefined;
                decibelValue?: number | undefined;
                autoSendText?: number | undefined;
            } | undefined;
            textToSpeech?: boolean | {
                engineTTS?: string | undefined;
                voice?: string | undefined;
                languageTTS?: string | undefined;
                automaticPlayback?: boolean | undefined;
                playbackRate?: number | undefined;
                cacheTTS?: boolean | undefined;
            } | undefined;
        }, {
            conversationMode?: boolean | undefined;
            advancedMode?: boolean | undefined;
            speechToText?: boolean | {
                engineSTT?: string | undefined;
                languageSTT?: string | undefined;
                autoTranscribeAudio?: boolean | undefined;
                decibelValue?: number | undefined;
                autoSendText?: number | undefined;
            } | undefined;
            textToSpeech?: boolean | {
                engineTTS?: string | undefined;
                voice?: string | undefined;
                languageTTS?: string | undefined;
                automaticPlayback?: boolean | undefined;
                playbackRate?: number | undefined;
                cacheTTS?: boolean | undefined;
            } | undefined;
        }>>>;
    }, "strip", z.ZodTypeAny, {
        tts?: {
            openai?: {
                model: string;
                apiKey: string;
                voices: string[];
                url?: string | undefined;
            } | undefined;
            azureOpenAI?: {
                model: string;
                apiKey: string;
                voices: string[];
                instanceName: string;
                deploymentName: string;
                apiVersion: string;
            } | undefined;
            elevenlabs?: {
                model: string;
                apiKey: string;
                voices: string[];
                url?: string | undefined;
                websocketUrl?: string | undefined;
                voice_settings?: {
                    similarity_boost?: number | undefined;
                    stability?: number | undefined;
                    style?: number | undefined;
                    use_speaker_boost?: boolean | undefined;
                } | undefined;
                pronunciation_dictionary_locators?: string[] | undefined;
            } | undefined;
            localai?: {
                url: string;
                voices: string[];
                backend: string;
                apiKey?: string | undefined;
            } | undefined;
        } | undefined;
        stt?: {
            openai?: {
                model: string;
                apiKey: string;
                url?: string | undefined;
            } | undefined;
            azureOpenAI?: {
                apiKey: string;
                instanceName: string;
                deploymentName: string;
                apiVersion: string;
            } | undefined;
        } | undefined;
        speechTab?: {
            conversationMode?: boolean | undefined;
            advancedMode?: boolean | undefined;
            speechToText?: boolean | {
                engineSTT?: string | undefined;
                languageSTT?: string | undefined;
                autoTranscribeAudio?: boolean | undefined;
                decibelValue?: number | undefined;
                autoSendText?: number | undefined;
            } | undefined;
            textToSpeech?: boolean | {
                engineTTS?: string | undefined;
                voice?: string | undefined;
                languageTTS?: string | undefined;
                automaticPlayback?: boolean | undefined;
                playbackRate?: number | undefined;
                cacheTTS?: boolean | undefined;
            } | undefined;
        } | undefined;
    }, {
        tts?: {
            openai?: {
                model: string;
                apiKey: string;
                voices: string[];
                url?: string | undefined;
            } | undefined;
            azureOpenAI?: {
                model: string;
                apiKey: string;
                voices: string[];
                instanceName: string;
                deploymentName: string;
                apiVersion: string;
            } | undefined;
            elevenlabs?: {
                model: string;
                apiKey: string;
                voices: string[];
                url?: string | undefined;
                websocketUrl?: string | undefined;
                voice_settings?: {
                    similarity_boost?: number | undefined;
                    stability?: number | undefined;
                    style?: number | undefined;
                    use_speaker_boost?: boolean | undefined;
                } | undefined;
                pronunciation_dictionary_locators?: string[] | undefined;
            } | undefined;
            localai?: {
                url: string;
                voices: string[];
                backend: string;
                apiKey?: string | undefined;
            } | undefined;
        } | undefined;
        stt?: {
            openai?: {
                model: string;
                apiKey: string;
                url?: string | undefined;
            } | undefined;
            azureOpenAI?: {
                apiKey: string;
                instanceName: string;
                deploymentName: string;
                apiVersion: string;
            } | undefined;
        } | undefined;
        speechTab?: {
            conversationMode?: boolean | undefined;
            advancedMode?: boolean | undefined;
            speechToText?: boolean | {
                engineSTT?: string | undefined;
                languageSTT?: string | undefined;
                autoTranscribeAudio?: boolean | undefined;
                decibelValue?: number | undefined;
                autoSendText?: number | undefined;
            } | undefined;
            textToSpeech?: boolean | {
                engineTTS?: string | undefined;
                voice?: string | undefined;
                languageTTS?: string | undefined;
                automaticPlayback?: boolean | undefined;
                playbackRate?: number | undefined;
                cacheTTS?: boolean | undefined;
            } | undefined;
        } | undefined;
    }>>;
    rateLimits: z.ZodOptional<z.ZodObject<{
        fileUploads: z.ZodOptional<z.ZodObject<{
            ipMax: z.ZodOptional<z.ZodNumber>;
            ipWindowInMinutes: z.ZodOptional<z.ZodNumber>;
            userMax: z.ZodOptional<z.ZodNumber>;
            userWindowInMinutes: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            ipMax?: number | undefined;
            ipWindowInMinutes?: number | undefined;
            userMax?: number | undefined;
            userWindowInMinutes?: number | undefined;
        }, {
            ipMax?: number | undefined;
            ipWindowInMinutes?: number | undefined;
            userMax?: number | undefined;
            userWindowInMinutes?: number | undefined;
        }>>;
        conversationsImport: z.ZodOptional<z.ZodObject<{
            ipMax: z.ZodOptional<z.ZodNumber>;
            ipWindowInMinutes: z.ZodOptional<z.ZodNumber>;
            userMax: z.ZodOptional<z.ZodNumber>;
            userWindowInMinutes: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            ipMax?: number | undefined;
            ipWindowInMinutes?: number | undefined;
            userMax?: number | undefined;
            userWindowInMinutes?: number | undefined;
        }, {
            ipMax?: number | undefined;
            ipWindowInMinutes?: number | undefined;
            userMax?: number | undefined;
            userWindowInMinutes?: number | undefined;
        }>>;
        tts: z.ZodOptional<z.ZodObject<{
            ipMax: z.ZodOptional<z.ZodNumber>;
            ipWindowInMinutes: z.ZodOptional<z.ZodNumber>;
            userMax: z.ZodOptional<z.ZodNumber>;
            userWindowInMinutes: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            ipMax?: number | undefined;
            ipWindowInMinutes?: number | undefined;
            userMax?: number | undefined;
            userWindowInMinutes?: number | undefined;
        }, {
            ipMax?: number | undefined;
            ipWindowInMinutes?: number | undefined;
            userMax?: number | undefined;
            userWindowInMinutes?: number | undefined;
        }>>;
        stt: z.ZodOptional<z.ZodObject<{
            ipMax: z.ZodOptional<z.ZodNumber>;
            ipWindowInMinutes: z.ZodOptional<z.ZodNumber>;
            userMax: z.ZodOptional<z.ZodNumber>;
            userWindowInMinutes: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            ipMax?: number | undefined;
            ipWindowInMinutes?: number | undefined;
            userMax?: number | undefined;
            userWindowInMinutes?: number | undefined;
        }, {
            ipMax?: number | undefined;
            ipWindowInMinutes?: number | undefined;
            userMax?: number | undefined;
            userWindowInMinutes?: number | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        tts?: {
            ipMax?: number | undefined;
            ipWindowInMinutes?: number | undefined;
            userMax?: number | undefined;
            userWindowInMinutes?: number | undefined;
        } | undefined;
        stt?: {
            ipMax?: number | undefined;
            ipWindowInMinutes?: number | undefined;
            userMax?: number | undefined;
            userWindowInMinutes?: number | undefined;
        } | undefined;
        fileUploads?: {
            ipMax?: number | undefined;
            ipWindowInMinutes?: number | undefined;
            userMax?: number | undefined;
            userWindowInMinutes?: number | undefined;
        } | undefined;
        conversationsImport?: {
            ipMax?: number | undefined;
            ipWindowInMinutes?: number | undefined;
            userMax?: number | undefined;
            userWindowInMinutes?: number | undefined;
        } | undefined;
    }, {
        tts?: {
            ipMax?: number | undefined;
            ipWindowInMinutes?: number | undefined;
            userMax?: number | undefined;
            userWindowInMinutes?: number | undefined;
        } | undefined;
        stt?: {
            ipMax?: number | undefined;
            ipWindowInMinutes?: number | undefined;
            userMax?: number | undefined;
            userWindowInMinutes?: number | undefined;
        } | undefined;
        fileUploads?: {
            ipMax?: number | undefined;
            ipWindowInMinutes?: number | undefined;
            userMax?: number | undefined;
            userWindowInMinutes?: number | undefined;
        } | undefined;
        conversationsImport?: {
            ipMax?: number | undefined;
            ipWindowInMinutes?: number | undefined;
            userMax?: number | undefined;
            userWindowInMinutes?: number | undefined;
        } | undefined;
    }>>;
    fileConfig: z.ZodOptional<z.ZodObject<{
        endpoints: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
            disabled: z.ZodOptional<z.ZodBoolean>;
            fileLimit: z.ZodOptional<z.ZodNumber>;
            fileSizeLimit: z.ZodOptional<z.ZodNumber>;
            totalSizeLimit: z.ZodOptional<z.ZodNumber>;
            supportedMimeTypes: z.ZodOptional<z.ZodEffects<z.ZodOptional<z.ZodArray<z.ZodAny, "many">>, any[] | undefined, any[] | undefined>>;
        }, "strip", z.ZodTypeAny, {
            disabled?: boolean | undefined;
            fileLimit?: number | undefined;
            fileSizeLimit?: number | undefined;
            totalSizeLimit?: number | undefined;
            supportedMimeTypes?: any[] | undefined;
        }, {
            disabled?: boolean | undefined;
            fileLimit?: number | undefined;
            fileSizeLimit?: number | undefined;
            totalSizeLimit?: number | undefined;
            supportedMimeTypes?: any[] | undefined;
        }>>>;
        serverFileSizeLimit: z.ZodOptional<z.ZodNumber>;
        avatarSizeLimit: z.ZodOptional<z.ZodNumber>;
        fileTokenLimit: z.ZodOptional<z.ZodNumber>;
        imageGeneration: z.ZodOptional<z.ZodObject<{
            percentage: z.ZodOptional<z.ZodNumber>;
            px: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            percentage?: number | undefined;
            px?: number | undefined;
        }, {
            percentage?: number | undefined;
            px?: number | undefined;
        }>>;
        clientImageResize: z.ZodOptional<z.ZodObject<{
            enabled: z.ZodOptional<z.ZodBoolean>;
            maxWidth: z.ZodOptional<z.ZodNumber>;
            maxHeight: z.ZodOptional<z.ZodNumber>;
            quality: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            enabled?: boolean | undefined;
            maxWidth?: number | undefined;
            maxHeight?: number | undefined;
            quality?: number | undefined;
        }, {
            enabled?: boolean | undefined;
            maxWidth?: number | undefined;
            maxHeight?: number | undefined;
            quality?: number | undefined;
        }>>;
        ocr: z.ZodOptional<z.ZodObject<{
            supportedMimeTypes: z.ZodOptional<z.ZodEffects<z.ZodOptional<z.ZodArray<z.ZodAny, "many">>, any[] | undefined, any[] | undefined>>;
        }, "strip", z.ZodTypeAny, {
            supportedMimeTypes?: any[] | undefined;
        }, {
            supportedMimeTypes?: any[] | undefined;
        }>>;
        text: z.ZodOptional<z.ZodObject<{
            supportedMimeTypes: z.ZodOptional<z.ZodEffects<z.ZodOptional<z.ZodArray<z.ZodAny, "many">>, any[] | undefined, any[] | undefined>>;
        }, "strip", z.ZodTypeAny, {
            supportedMimeTypes?: any[] | undefined;
        }, {
            supportedMimeTypes?: any[] | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        text?: {
            supportedMimeTypes?: any[] | undefined;
        } | undefined;
        ocr?: {
            supportedMimeTypes?: any[] | undefined;
        } | undefined;
        endpoints?: Record<string, {
            disabled?: boolean | undefined;
            fileLimit?: number | undefined;
            fileSizeLimit?: number | undefined;
            totalSizeLimit?: number | undefined;
            supportedMimeTypes?: any[] | undefined;
        }> | undefined;
        serverFileSizeLimit?: number | undefined;
        avatarSizeLimit?: number | undefined;
        fileTokenLimit?: number | undefined;
        imageGeneration?: {
            percentage?: number | undefined;
            px?: number | undefined;
        } | undefined;
        clientImageResize?: {
            enabled?: boolean | undefined;
            maxWidth?: number | undefined;
            maxHeight?: number | undefined;
            quality?: number | undefined;
        } | undefined;
    }, {
        text?: {
            supportedMimeTypes?: any[] | undefined;
        } | undefined;
        ocr?: {
            supportedMimeTypes?: any[] | undefined;
        } | undefined;
        endpoints?: Record<string, {
            disabled?: boolean | undefined;
            fileLimit?: number | undefined;
            fileSizeLimit?: number | undefined;
            totalSizeLimit?: number | undefined;
            supportedMimeTypes?: any[] | undefined;
        }> | undefined;
        serverFileSizeLimit?: number | undefined;
        avatarSizeLimit?: number | undefined;
        fileTokenLimit?: number | undefined;
        imageGeneration?: {
            percentage?: number | undefined;
            px?: number | undefined;
        } | undefined;
        clientImageResize?: {
            enabled?: boolean | undefined;
            maxWidth?: number | undefined;
            maxHeight?: number | undefined;
            quality?: number | undefined;
        } | undefined;
    }>>;
    modelSpecs: z.ZodOptional<z.ZodObject<{
        enforce: z.ZodDefault<z.ZodBoolean>;
        prioritize: z.ZodDefault<z.ZodBoolean>;
        list: z.ZodArray<z.ZodObject<{
            name: z.ZodString;
            label: z.ZodString;
            preset: z.ZodObject<{
                iconURL: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                greeting: z.ZodOptional<z.ZodString>;
                endpointType: z.ZodOptional<z.ZodNullable<z.ZodNativeEnum<typeof EModelEndpoint>>>;
                expiredAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                messages: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                isArchived: z.ZodOptional<z.ZodBoolean>;
                tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                user: z.ZodOptional<z.ZodString>;
                tools: z.ZodOptional<z.ZodUnion<[z.ZodArray<z.ZodObject<{
                    name: z.ZodString;
                    pluginKey: z.ZodString;
                    description: z.ZodOptional<z.ZodString>;
                    icon: z.ZodOptional<z.ZodString>;
                    authConfig: z.ZodOptional<z.ZodArray<z.ZodObject<{
                        authField: z.ZodString;
                        label: z.ZodString;
                        description: z.ZodString;
                    }, "strip", z.ZodTypeAny, {
                        description: string;
                        label: string;
                        authField: string;
                    }, {
                        description: string;
                        label: string;
                        authField: string;
                    }>, "many">>;
                    authenticated: z.ZodOptional<z.ZodBoolean>;
                    chatMenu: z.ZodOptional<z.ZodBoolean>;
                    isButton: z.ZodOptional<z.ZodBoolean>;
                    toolkit: z.ZodOptional<z.ZodBoolean>;
                }, "strip", z.ZodTypeAny, {
                    name: string;
                    pluginKey: string;
                    description?: string | undefined;
                    chatMenu?: boolean | undefined;
                    icon?: string | undefined;
                    authConfig?: {
                        description: string;
                        label: string;
                        authField: string;
                    }[] | undefined;
                    authenticated?: boolean | undefined;
                    isButton?: boolean | undefined;
                    toolkit?: boolean | undefined;
                }, {
                    name: string;
                    pluginKey: string;
                    description?: string | undefined;
                    chatMenu?: boolean | undefined;
                    icon?: string | undefined;
                    authConfig?: {
                        description: string;
                        label: string;
                        authField: string;
                    }[] | undefined;
                    authenticated?: boolean | undefined;
                    isButton?: boolean | undefined;
                    toolkit?: boolean | undefined;
                }>, "many">, z.ZodArray<z.ZodString, "many">]>>;
                model: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                spec: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                instructions: z.ZodOptional<z.ZodString>;
                fileTokenLimit: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodNumber, z.ZodString]>, number | undefined, string | number>>;
                modelLabel: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                userLabel: z.ZodOptional<z.ZodString>;
                promptPrefix: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                temperature: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
                topP: z.ZodOptional<z.ZodNumber>;
                topK: z.ZodOptional<z.ZodNumber>;
                top_p: z.ZodOptional<z.ZodNumber>;
                frequency_penalty: z.ZodOptional<z.ZodNumber>;
                presence_penalty: z.ZodOptional<z.ZodNumber>;
                parentMessageId: z.ZodOptional<z.ZodString>;
                maxOutputTokens: z.ZodOptional<z.ZodNullable<z.ZodEffects<z.ZodUnion<[z.ZodNumber, z.ZodString]>, number | undefined, string | number>>>;
                maxContextTokens: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodNumber, z.ZodString]>, number | undefined, string | number>>;
                max_tokens: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodNumber, z.ZodString]>, number | undefined, string | number>>;
                promptCache: z.ZodOptional<z.ZodBoolean>;
                system: z.ZodOptional<z.ZodString>;
                thinking: z.ZodOptional<z.ZodBoolean>;
                thinkingBudget: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodNumber, z.ZodString]>, number | undefined, string | number>>;
                stream: z.ZodOptional<z.ZodBoolean>;
                artifacts: z.ZodOptional<z.ZodString>;
                context: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                examples: z.ZodOptional<z.ZodArray<z.ZodObject<{
                    input: z.ZodObject<{
                        content: z.ZodString;
                    }, "strip", z.ZodTypeAny, {
                        content: string;
                    }, {
                        content: string;
                    }>;
                    output: z.ZodObject<{
                        content: z.ZodString;
                    }, "strip", z.ZodTypeAny, {
                        content: string;
                    }, {
                        content: string;
                    }>;
                }, "strip", z.ZodTypeAny, {
                    input: {
                        content: string;
                    };
                    output: {
                        content: string;
                    };
                }, {
                    input: {
                        content: string;
                    };
                    output: {
                        content: string;
                    };
                }>, "many">>;
                resendFiles: z.ZodOptional<z.ZodBoolean>;
                file_ids: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                imageDetail: z.ZodOptional<z.ZodNativeEnum<typeof import("./schemas").ImageDetail>>;
                reasoning_effort: z.ZodNullable<z.ZodOptional<z.ZodNativeEnum<typeof import("./schemas").ReasoningEffort>>>;
                reasoning_summary: z.ZodNullable<z.ZodOptional<z.ZodNativeEnum<typeof import("./schemas").ReasoningSummary>>>;
                verbosity: z.ZodNullable<z.ZodOptional<z.ZodNativeEnum<typeof import("./schemas").Verbosity>>>;
                useResponsesApi: z.ZodOptional<z.ZodBoolean>;
                web_search: z.ZodOptional<z.ZodBoolean>;
                disableStreaming: z.ZodOptional<z.ZodBoolean>;
                assistant_id: z.ZodOptional<z.ZodString>;
                agent_id: z.ZodOptional<z.ZodString>;
                region: z.ZodOptional<z.ZodString>;
                maxTokens: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodNumber, z.ZodString]>, number | undefined, string | number>>;
                additionalModelRequestFields: z.ZodOptional<z.ZodType<string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | {
                    [key: string]: string | number | boolean | any | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | any | any | null)[] | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
                } | null, z.ZodTypeDef, string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | {
                    [key: string]: string | number | boolean | any | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | any | any | null)[] | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
                } | null>>;
                additional_instructions: z.ZodOptional<z.ZodString>;
                append_current_datetime: z.ZodOptional<z.ZodBoolean>;
                presetOverride: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
                stop: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                resendImages: z.ZodOptional<z.ZodBoolean>;
                agentOptions: z.ZodOptional<z.ZodNullable<z.ZodObject<{
                    agent: z.ZodDefault<z.ZodString>;
                    skipCompletion: z.ZodDefault<z.ZodBoolean>;
                    model: z.ZodString;
                    temperature: z.ZodDefault<z.ZodNumber>;
                }, "strip", z.ZodTypeAny, {
                    model: string;
                    agent: string;
                    temperature: number;
                    skipCompletion: boolean;
                }, {
                    model: string;
                    agent?: string | undefined;
                    temperature?: number | undefined;
                    skipCompletion?: boolean | undefined;
                }>>>;
                chatGptLabel: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            } & {
                conversationId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                presetId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                title: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                defaultPreset: z.ZodOptional<z.ZodBoolean>;
                order: z.ZodOptional<z.ZodNumber>;
                endpoint: z.ZodNullable<z.ZodUnion<[z.ZodNativeEnum<typeof EModelEndpoint>, z.ZodString]>>;
            }, "strip", z.ZodTypeAny, {
                endpoint: string | null;
                conversationId?: string | null | undefined;
                title?: string | null | undefined;
                iconURL?: string | null | undefined;
                greeting?: string | undefined;
                endpointType?: EModelEndpoint | null | undefined;
                expiredAt?: string | null | undefined;
                messages?: string[] | undefined;
                isArchived?: boolean | undefined;
                tags?: string[] | undefined;
                user?: string | undefined;
                tools?: string[] | {
                    name: string;
                    pluginKey: string;
                    description?: string | undefined;
                    chatMenu?: boolean | undefined;
                    icon?: string | undefined;
                    authConfig?: {
                        description: string;
                        label: string;
                        authField: string;
                    }[] | undefined;
                    authenticated?: boolean | undefined;
                    isButton?: boolean | undefined;
                    toolkit?: boolean | undefined;
                }[] | undefined;
                model?: string | null | undefined;
                spec?: string | null | undefined;
                instructions?: string | undefined;
                fileTokenLimit?: number | undefined;
                modelLabel?: string | null | undefined;
                userLabel?: string | undefined;
                promptPrefix?: string | null | undefined;
                temperature?: number | null | undefined;
                topP?: number | undefined;
                topK?: number | undefined;
                top_p?: number | undefined;
                frequency_penalty?: number | undefined;
                presence_penalty?: number | undefined;
                parentMessageId?: string | undefined;
                maxOutputTokens?: number | null | undefined;
                maxContextTokens?: number | undefined;
                max_tokens?: number | undefined;
                promptCache?: boolean | undefined;
                system?: string | undefined;
                thinking?: boolean | undefined;
                thinkingBudget?: number | undefined;
                stream?: boolean | undefined;
                artifacts?: string | undefined;
                context?: string | null | undefined;
                examples?: {
                    input: {
                        content: string;
                    };
                    output: {
                        content: string;
                    };
                }[] | undefined;
                resendFiles?: boolean | undefined;
                file_ids?: string[] | undefined;
                imageDetail?: import("./schemas").ImageDetail | undefined;
                reasoning_effort?: import("./schemas").ReasoningEffort | null | undefined;
                reasoning_summary?: import("./schemas").ReasoningSummary | null | undefined;
                verbosity?: import("./schemas").Verbosity | null | undefined;
                useResponsesApi?: boolean | undefined;
                web_search?: boolean | undefined;
                disableStreaming?: boolean | undefined;
                assistant_id?: string | undefined;
                agent_id?: string | undefined;
                region?: string | undefined;
                maxTokens?: number | undefined;
                additionalModelRequestFields?: (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | {
                    [key: string]: string | number | boolean | any | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | any | any | null)[] | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
                } | null) | undefined;
                additional_instructions?: string | undefined;
                append_current_datetime?: boolean | undefined;
                presetOverride?: Record<string, unknown> | undefined;
                stop?: string[] | undefined;
                resendImages?: boolean | undefined;
                agentOptions?: {
                    model: string;
                    agent: string;
                    temperature: number;
                    skipCompletion: boolean;
                } | null | undefined;
                chatGptLabel?: string | null | undefined;
                presetId?: string | null | undefined;
                defaultPreset?: boolean | undefined;
                order?: number | undefined;
            }, {
                endpoint: string | null;
                conversationId?: string | null | undefined;
                title?: string | null | undefined;
                iconURL?: string | null | undefined;
                greeting?: string | undefined;
                endpointType?: EModelEndpoint | null | undefined;
                expiredAt?: string | null | undefined;
                messages?: string[] | undefined;
                isArchived?: boolean | undefined;
                tags?: string[] | undefined;
                user?: string | undefined;
                tools?: string[] | {
                    name: string;
                    pluginKey: string;
                    description?: string | undefined;
                    chatMenu?: boolean | undefined;
                    icon?: string | undefined;
                    authConfig?: {
                        description: string;
                        label: string;
                        authField: string;
                    }[] | undefined;
                    authenticated?: boolean | undefined;
                    isButton?: boolean | undefined;
                    toolkit?: boolean | undefined;
                }[] | undefined;
                model?: string | null | undefined;
                spec?: string | null | undefined;
                instructions?: string | undefined;
                fileTokenLimit?: string | number | undefined;
                modelLabel?: string | null | undefined;
                userLabel?: string | undefined;
                promptPrefix?: string | null | undefined;
                temperature?: number | null | undefined;
                topP?: number | undefined;
                topK?: number | undefined;
                top_p?: number | undefined;
                frequency_penalty?: number | undefined;
                presence_penalty?: number | undefined;
                parentMessageId?: string | undefined;
                maxOutputTokens?: string | number | null | undefined;
                maxContextTokens?: string | number | undefined;
                max_tokens?: string | number | undefined;
                promptCache?: boolean | undefined;
                system?: string | undefined;
                thinking?: boolean | undefined;
                thinkingBudget?: string | number | undefined;
                stream?: boolean | undefined;
                artifacts?: string | undefined;
                context?: string | null | undefined;
                examples?: {
                    input: {
                        content: string;
                    };
                    output: {
                        content: string;
                    };
                }[] | undefined;
                resendFiles?: boolean | undefined;
                file_ids?: string[] | undefined;
                imageDetail?: import("./schemas").ImageDetail | undefined;
                reasoning_effort?: import("./schemas").ReasoningEffort | null | undefined;
                reasoning_summary?: import("./schemas").ReasoningSummary | null | undefined;
                verbosity?: import("./schemas").Verbosity | null | undefined;
                useResponsesApi?: boolean | undefined;
                web_search?: boolean | undefined;
                disableStreaming?: boolean | undefined;
                assistant_id?: string | undefined;
                agent_id?: string | undefined;
                region?: string | undefined;
                maxTokens?: string | number | undefined;
                additionalModelRequestFields?: (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | {
                    [key: string]: string | number | boolean | any | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | any | any | null)[] | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
                } | null) | undefined;
                additional_instructions?: string | undefined;
                append_current_datetime?: boolean | undefined;
                presetOverride?: Record<string, unknown> | undefined;
                stop?: string[] | undefined;
                resendImages?: boolean | undefined;
                agentOptions?: {
                    model: string;
                    agent?: string | undefined;
                    temperature?: number | undefined;
                    skipCompletion?: boolean | undefined;
                } | null | undefined;
                chatGptLabel?: string | null | undefined;
                presetId?: string | null | undefined;
                defaultPreset?: boolean | undefined;
                order?: number | undefined;
            }>;
            order: z.ZodOptional<z.ZodNumber>;
            default: z.ZodOptional<z.ZodBoolean>;
            description: z.ZodOptional<z.ZodString>;
            group: z.ZodOptional<z.ZodString>;
            showIconInMenu: z.ZodOptional<z.ZodBoolean>;
            showIconInHeader: z.ZodOptional<z.ZodBoolean>;
            iconURL: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNativeEnum<typeof EModelEndpoint>]>>;
            authType: z.ZodOptional<z.ZodNativeEnum<typeof import("./schemas").AuthType>>;
            webSearch: z.ZodOptional<z.ZodBoolean>;
            fileSearch: z.ZodOptional<z.ZodBoolean>;
            executeCode: z.ZodOptional<z.ZodBoolean>;
            mcpServers: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        }, "strip", z.ZodTypeAny, {
            name: string;
            label: string;
            preset: {
                endpoint: string | null;
                conversationId?: string | null | undefined;
                title?: string | null | undefined;
                iconURL?: string | null | undefined;
                greeting?: string | undefined;
                endpointType?: EModelEndpoint | null | undefined;
                expiredAt?: string | null | undefined;
                messages?: string[] | undefined;
                isArchived?: boolean | undefined;
                tags?: string[] | undefined;
                user?: string | undefined;
                tools?: string[] | {
                    name: string;
                    pluginKey: string;
                    description?: string | undefined;
                    chatMenu?: boolean | undefined;
                    icon?: string | undefined;
                    authConfig?: {
                        description: string;
                        label: string;
                        authField: string;
                    }[] | undefined;
                    authenticated?: boolean | undefined;
                    isButton?: boolean | undefined;
                    toolkit?: boolean | undefined;
                }[] | undefined;
                model?: string | null | undefined;
                spec?: string | null | undefined;
                instructions?: string | undefined;
                fileTokenLimit?: number | undefined;
                modelLabel?: string | null | undefined;
                userLabel?: string | undefined;
                promptPrefix?: string | null | undefined;
                temperature?: number | null | undefined;
                topP?: number | undefined;
                topK?: number | undefined;
                top_p?: number | undefined;
                frequency_penalty?: number | undefined;
                presence_penalty?: number | undefined;
                parentMessageId?: string | undefined;
                maxOutputTokens?: number | null | undefined;
                maxContextTokens?: number | undefined;
                max_tokens?: number | undefined;
                promptCache?: boolean | undefined;
                system?: string | undefined;
                thinking?: boolean | undefined;
                thinkingBudget?: number | undefined;
                stream?: boolean | undefined;
                artifacts?: string | undefined;
                context?: string | null | undefined;
                examples?: {
                    input: {
                        content: string;
                    };
                    output: {
                        content: string;
                    };
                }[] | undefined;
                resendFiles?: boolean | undefined;
                file_ids?: string[] | undefined;
                imageDetail?: import("./schemas").ImageDetail | undefined;
                reasoning_effort?: import("./schemas").ReasoningEffort | null | undefined;
                reasoning_summary?: import("./schemas").ReasoningSummary | null | undefined;
                verbosity?: import("./schemas").Verbosity | null | undefined;
                useResponsesApi?: boolean | undefined;
                web_search?: boolean | undefined;
                disableStreaming?: boolean | undefined;
                assistant_id?: string | undefined;
                agent_id?: string | undefined;
                region?: string | undefined;
                maxTokens?: number | undefined;
                additionalModelRequestFields?: (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | {
                    [key: string]: string | number | boolean | any | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | any | any | null)[] | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
                } | null) | undefined;
                additional_instructions?: string | undefined;
                append_current_datetime?: boolean | undefined;
                presetOverride?: Record<string, unknown> | undefined;
                stop?: string[] | undefined;
                resendImages?: boolean | undefined;
                agentOptions?: {
                    model: string;
                    agent: string;
                    temperature: number;
                    skipCompletion: boolean;
                } | null | undefined;
                chatGptLabel?: string | null | undefined;
                presetId?: string | null | undefined;
                defaultPreset?: boolean | undefined;
                order?: number | undefined;
            };
            iconURL?: string | undefined;
            default?: boolean | undefined;
            description?: string | undefined;
            webSearch?: boolean | undefined;
            mcpServers?: string[] | undefined;
            fileSearch?: boolean | undefined;
            order?: number | undefined;
            group?: string | undefined;
            showIconInMenu?: boolean | undefined;
            showIconInHeader?: boolean | undefined;
            authType?: import("./schemas").AuthType | undefined;
            executeCode?: boolean | undefined;
        }, {
            name: string;
            label: string;
            preset: {
                endpoint: string | null;
                conversationId?: string | null | undefined;
                title?: string | null | undefined;
                iconURL?: string | null | undefined;
                greeting?: string | undefined;
                endpointType?: EModelEndpoint | null | undefined;
                expiredAt?: string | null | undefined;
                messages?: string[] | undefined;
                isArchived?: boolean | undefined;
                tags?: string[] | undefined;
                user?: string | undefined;
                tools?: string[] | {
                    name: string;
                    pluginKey: string;
                    description?: string | undefined;
                    chatMenu?: boolean | undefined;
                    icon?: string | undefined;
                    authConfig?: {
                        description: string;
                        label: string;
                        authField: string;
                    }[] | undefined;
                    authenticated?: boolean | undefined;
                    isButton?: boolean | undefined;
                    toolkit?: boolean | undefined;
                }[] | undefined;
                model?: string | null | undefined;
                spec?: string | null | undefined;
                instructions?: string | undefined;
                fileTokenLimit?: string | number | undefined;
                modelLabel?: string | null | undefined;
                userLabel?: string | undefined;
                promptPrefix?: string | null | undefined;
                temperature?: number | null | undefined;
                topP?: number | undefined;
                topK?: number | undefined;
                top_p?: number | undefined;
                frequency_penalty?: number | undefined;
                presence_penalty?: number | undefined;
                parentMessageId?: string | undefined;
                maxOutputTokens?: string | number | null | undefined;
                maxContextTokens?: string | number | undefined;
                max_tokens?: string | number | undefined;
                promptCache?: boolean | undefined;
                system?: string | undefined;
                thinking?: boolean | undefined;
                thinkingBudget?: string | number | undefined;
                stream?: boolean | undefined;
                artifacts?: string | undefined;
                context?: string | null | undefined;
                examples?: {
                    input: {
                        content: string;
                    };
                    output: {
                        content: string;
                    };
                }[] | undefined;
                resendFiles?: boolean | undefined;
                file_ids?: string[] | undefined;
                imageDetail?: import("./schemas").ImageDetail | undefined;
                reasoning_effort?: import("./schemas").ReasoningEffort | null | undefined;
                reasoning_summary?: import("./schemas").ReasoningSummary | null | undefined;
                verbosity?: import("./schemas").Verbosity | null | undefined;
                useResponsesApi?: boolean | undefined;
                web_search?: boolean | undefined;
                disableStreaming?: boolean | undefined;
                assistant_id?: string | undefined;
                agent_id?: string | undefined;
                region?: string | undefined;
                maxTokens?: string | number | undefined;
                additionalModelRequestFields?: (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | {
                    [key: string]: string | number | boolean | any | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | any | any | null)[] | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
                } | null) | undefined;
                additional_instructions?: string | undefined;
                append_current_datetime?: boolean | undefined;
                presetOverride?: Record<string, unknown> | undefined;
                stop?: string[] | undefined;
                resendImages?: boolean | undefined;
                agentOptions?: {
                    model: string;
                    agent?: string | undefined;
                    temperature?: number | undefined;
                    skipCompletion?: boolean | undefined;
                } | null | undefined;
                chatGptLabel?: string | null | undefined;
                presetId?: string | null | undefined;
                defaultPreset?: boolean | undefined;
                order?: number | undefined;
            };
            iconURL?: string | undefined;
            default?: boolean | undefined;
            description?: string | undefined;
            webSearch?: boolean | undefined;
            mcpServers?: string[] | undefined;
            fileSearch?: boolean | undefined;
            order?: number | undefined;
            group?: string | undefined;
            showIconInMenu?: boolean | undefined;
            showIconInHeader?: boolean | undefined;
            authType?: import("./schemas").AuthType | undefined;
            executeCode?: boolean | undefined;
        }>, "many">;
        addedEndpoints: z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodString, z.ZodNativeEnum<typeof EModelEndpoint>]>, "many">>;
    }, "strip", z.ZodTypeAny, {
        enforce: boolean;
        prioritize: boolean;
        list: {
            name: string;
            label: string;
            preset: {
                endpoint: string | null;
                conversationId?: string | null | undefined;
                title?: string | null | undefined;
                iconURL?: string | null | undefined;
                greeting?: string | undefined;
                endpointType?: EModelEndpoint | null | undefined;
                expiredAt?: string | null | undefined;
                messages?: string[] | undefined;
                isArchived?: boolean | undefined;
                tags?: string[] | undefined;
                user?: string | undefined;
                tools?: string[] | {
                    name: string;
                    pluginKey: string;
                    description?: string | undefined;
                    chatMenu?: boolean | undefined;
                    icon?: string | undefined;
                    authConfig?: {
                        description: string;
                        label: string;
                        authField: string;
                    }[] | undefined;
                    authenticated?: boolean | undefined;
                    isButton?: boolean | undefined;
                    toolkit?: boolean | undefined;
                }[] | undefined;
                model?: string | null | undefined;
                spec?: string | null | undefined;
                instructions?: string | undefined;
                fileTokenLimit?: number | undefined;
                modelLabel?: string | null | undefined;
                userLabel?: string | undefined;
                promptPrefix?: string | null | undefined;
                temperature?: number | null | undefined;
                topP?: number | undefined;
                topK?: number | undefined;
                top_p?: number | undefined;
                frequency_penalty?: number | undefined;
                presence_penalty?: number | undefined;
                parentMessageId?: string | undefined;
                maxOutputTokens?: number | null | undefined;
                maxContextTokens?: number | undefined;
                max_tokens?: number | undefined;
                promptCache?: boolean | undefined;
                system?: string | undefined;
                thinking?: boolean | undefined;
                thinkingBudget?: number | undefined;
                stream?: boolean | undefined;
                artifacts?: string | undefined;
                context?: string | null | undefined;
                examples?: {
                    input: {
                        content: string;
                    };
                    output: {
                        content: string;
                    };
                }[] | undefined;
                resendFiles?: boolean | undefined;
                file_ids?: string[] | undefined;
                imageDetail?: import("./schemas").ImageDetail | undefined;
                reasoning_effort?: import("./schemas").ReasoningEffort | null | undefined;
                reasoning_summary?: import("./schemas").ReasoningSummary | null | undefined;
                verbosity?: import("./schemas").Verbosity | null | undefined;
                useResponsesApi?: boolean | undefined;
                web_search?: boolean | undefined;
                disableStreaming?: boolean | undefined;
                assistant_id?: string | undefined;
                agent_id?: string | undefined;
                region?: string | undefined;
                maxTokens?: number | undefined;
                additionalModelRequestFields?: (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | {
                    [key: string]: string | number | boolean | any | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | any | any | null)[] | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
                } | null) | undefined;
                additional_instructions?: string | undefined;
                append_current_datetime?: boolean | undefined;
                presetOverride?: Record<string, unknown> | undefined;
                stop?: string[] | undefined;
                resendImages?: boolean | undefined;
                agentOptions?: {
                    model: string;
                    agent: string;
                    temperature: number;
                    skipCompletion: boolean;
                } | null | undefined;
                chatGptLabel?: string | null | undefined;
                presetId?: string | null | undefined;
                defaultPreset?: boolean | undefined;
                order?: number | undefined;
            };
            iconURL?: string | undefined;
            default?: boolean | undefined;
            description?: string | undefined;
            webSearch?: boolean | undefined;
            mcpServers?: string[] | undefined;
            fileSearch?: boolean | undefined;
            order?: number | undefined;
            group?: string | undefined;
            showIconInMenu?: boolean | undefined;
            showIconInHeader?: boolean | undefined;
            authType?: import("./schemas").AuthType | undefined;
            executeCode?: boolean | undefined;
        }[];
        addedEndpoints?: string[] | undefined;
    }, {
        list: {
            name: string;
            label: string;
            preset: {
                endpoint: string | null;
                conversationId?: string | null | undefined;
                title?: string | null | undefined;
                iconURL?: string | null | undefined;
                greeting?: string | undefined;
                endpointType?: EModelEndpoint | null | undefined;
                expiredAt?: string | null | undefined;
                messages?: string[] | undefined;
                isArchived?: boolean | undefined;
                tags?: string[] | undefined;
                user?: string | undefined;
                tools?: string[] | {
                    name: string;
                    pluginKey: string;
                    description?: string | undefined;
                    chatMenu?: boolean | undefined;
                    icon?: string | undefined;
                    authConfig?: {
                        description: string;
                        label: string;
                        authField: string;
                    }[] | undefined;
                    authenticated?: boolean | undefined;
                    isButton?: boolean | undefined;
                    toolkit?: boolean | undefined;
                }[] | undefined;
                model?: string | null | undefined;
                spec?: string | null | undefined;
                instructions?: string | undefined;
                fileTokenLimit?: string | number | undefined;
                modelLabel?: string | null | undefined;
                userLabel?: string | undefined;
                promptPrefix?: string | null | undefined;
                temperature?: number | null | undefined;
                topP?: number | undefined;
                topK?: number | undefined;
                top_p?: number | undefined;
                frequency_penalty?: number | undefined;
                presence_penalty?: number | undefined;
                parentMessageId?: string | undefined;
                maxOutputTokens?: string | number | null | undefined;
                maxContextTokens?: string | number | undefined;
                max_tokens?: string | number | undefined;
                promptCache?: boolean | undefined;
                system?: string | undefined;
                thinking?: boolean | undefined;
                thinkingBudget?: string | number | undefined;
                stream?: boolean | undefined;
                artifacts?: string | undefined;
                context?: string | null | undefined;
                examples?: {
                    input: {
                        content: string;
                    };
                    output: {
                        content: string;
                    };
                }[] | undefined;
                resendFiles?: boolean | undefined;
                file_ids?: string[] | undefined;
                imageDetail?: import("./schemas").ImageDetail | undefined;
                reasoning_effort?: import("./schemas").ReasoningEffort | null | undefined;
                reasoning_summary?: import("./schemas").ReasoningSummary | null | undefined;
                verbosity?: import("./schemas").Verbosity | null | undefined;
                useResponsesApi?: boolean | undefined;
                web_search?: boolean | undefined;
                disableStreaming?: boolean | undefined;
                assistant_id?: string | undefined;
                agent_id?: string | undefined;
                region?: string | undefined;
                maxTokens?: string | number | undefined;
                additionalModelRequestFields?: (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | {
                    [key: string]: string | number | boolean | any | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | any | any | null)[] | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
                } | null) | undefined;
                additional_instructions?: string | undefined;
                append_current_datetime?: boolean | undefined;
                presetOverride?: Record<string, unknown> | undefined;
                stop?: string[] | undefined;
                resendImages?: boolean | undefined;
                agentOptions?: {
                    model: string;
                    agent?: string | undefined;
                    temperature?: number | undefined;
                    skipCompletion?: boolean | undefined;
                } | null | undefined;
                chatGptLabel?: string | null | undefined;
                presetId?: string | null | undefined;
                defaultPreset?: boolean | undefined;
                order?: number | undefined;
            };
            iconURL?: string | undefined;
            default?: boolean | undefined;
            description?: string | undefined;
            webSearch?: boolean | undefined;
            mcpServers?: string[] | undefined;
            fileSearch?: boolean | undefined;
            order?: number | undefined;
            group?: string | undefined;
            showIconInMenu?: boolean | undefined;
            showIconInHeader?: boolean | undefined;
            authType?: import("./schemas").AuthType | undefined;
            executeCode?: boolean | undefined;
        }[];
        enforce?: boolean | undefined;
        prioritize?: boolean | undefined;
        addedEndpoints?: string[] | undefined;
    }>>;
    endpoints: z.ZodOptional<z.ZodEffects<z.ZodObject<{
        all: z.ZodOptional<z.ZodObject<{
            streamRate: z.ZodOptional<z.ZodNumber>;
            baseURL: z.ZodOptional<z.ZodString>;
            titlePrompt: z.ZodOptional<z.ZodString>;
            titleModel: z.ZodOptional<z.ZodString>;
            titleConvo: z.ZodOptional<z.ZodBoolean>;
            titleMethod: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"completion">, z.ZodLiteral<"functions">, z.ZodLiteral<"structured">]>>;
            titleEndpoint: z.ZodOptional<z.ZodString>;
            titlePromptTemplate: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            baseURL?: string | undefined;
            streamRate?: number | undefined;
            titlePrompt?: string | undefined;
            titleModel?: string | undefined;
            titleConvo?: boolean | undefined;
            titleMethod?: "completion" | "functions" | "structured" | undefined;
            titleEndpoint?: string | undefined;
            titlePromptTemplate?: string | undefined;
        }, {
            baseURL?: string | undefined;
            streamRate?: number | undefined;
            titlePrompt?: string | undefined;
            titleModel?: string | undefined;
            titleConvo?: boolean | undefined;
            titleMethod?: "completion" | "functions" | "structured" | undefined;
            titleEndpoint?: string | undefined;
            titlePromptTemplate?: string | undefined;
        }>>;
        openAI: z.ZodOptional<z.ZodObject<{
            streamRate: z.ZodOptional<z.ZodNumber>;
            baseURL: z.ZodOptional<z.ZodString>;
            titlePrompt: z.ZodOptional<z.ZodString>;
            titleModel: z.ZodOptional<z.ZodString>;
            titleConvo: z.ZodOptional<z.ZodBoolean>;
            titleMethod: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"completion">, z.ZodLiteral<"functions">, z.ZodLiteral<"structured">]>>;
            titleEndpoint: z.ZodOptional<z.ZodString>;
            titlePromptTemplate: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            baseURL?: string | undefined;
            streamRate?: number | undefined;
            titlePrompt?: string | undefined;
            titleModel?: string | undefined;
            titleConvo?: boolean | undefined;
            titleMethod?: "completion" | "functions" | "structured" | undefined;
            titleEndpoint?: string | undefined;
            titlePromptTemplate?: string | undefined;
        }, {
            baseURL?: string | undefined;
            streamRate?: number | undefined;
            titlePrompt?: string | undefined;
            titleModel?: string | undefined;
            titleConvo?: boolean | undefined;
            titleMethod?: "completion" | "functions" | "structured" | undefined;
            titleEndpoint?: string | undefined;
            titlePromptTemplate?: string | undefined;
        }>>;
        google: z.ZodOptional<z.ZodObject<{
            streamRate: z.ZodOptional<z.ZodNumber>;
            baseURL: z.ZodOptional<z.ZodString>;
            titlePrompt: z.ZodOptional<z.ZodString>;
            titleModel: z.ZodOptional<z.ZodString>;
            titleConvo: z.ZodOptional<z.ZodBoolean>;
            titleMethod: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"completion">, z.ZodLiteral<"functions">, z.ZodLiteral<"structured">]>>;
            titleEndpoint: z.ZodOptional<z.ZodString>;
            titlePromptTemplate: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            baseURL?: string | undefined;
            streamRate?: number | undefined;
            titlePrompt?: string | undefined;
            titleModel?: string | undefined;
            titleConvo?: boolean | undefined;
            titleMethod?: "completion" | "functions" | "structured" | undefined;
            titleEndpoint?: string | undefined;
            titlePromptTemplate?: string | undefined;
        }, {
            baseURL?: string | undefined;
            streamRate?: number | undefined;
            titlePrompt?: string | undefined;
            titleModel?: string | undefined;
            titleConvo?: boolean | undefined;
            titleMethod?: "completion" | "functions" | "structured" | undefined;
            titleEndpoint?: string | undefined;
            titlePromptTemplate?: string | undefined;
        }>>;
        anthropic: z.ZodOptional<z.ZodObject<{
            streamRate: z.ZodOptional<z.ZodNumber>;
            baseURL: z.ZodOptional<z.ZodString>;
            titlePrompt: z.ZodOptional<z.ZodString>;
            titleModel: z.ZodOptional<z.ZodString>;
            titleConvo: z.ZodOptional<z.ZodBoolean>;
            titleMethod: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"completion">, z.ZodLiteral<"functions">, z.ZodLiteral<"structured">]>>;
            titleEndpoint: z.ZodOptional<z.ZodString>;
            titlePromptTemplate: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            baseURL?: string | undefined;
            streamRate?: number | undefined;
            titlePrompt?: string | undefined;
            titleModel?: string | undefined;
            titleConvo?: boolean | undefined;
            titleMethod?: "completion" | "functions" | "structured" | undefined;
            titleEndpoint?: string | undefined;
            titlePromptTemplate?: string | undefined;
        }, {
            baseURL?: string | undefined;
            streamRate?: number | undefined;
            titlePrompt?: string | undefined;
            titleModel?: string | undefined;
            titleConvo?: boolean | undefined;
            titleMethod?: "completion" | "functions" | "structured" | undefined;
            titleEndpoint?: string | undefined;
            titlePromptTemplate?: string | undefined;
        }>>;
        gptPlugins: z.ZodOptional<z.ZodObject<{
            streamRate: z.ZodOptional<z.ZodNumber>;
            baseURL: z.ZodOptional<z.ZodString>;
            titlePrompt: z.ZodOptional<z.ZodString>;
            titleModel: z.ZodOptional<z.ZodString>;
            titleConvo: z.ZodOptional<z.ZodBoolean>;
            titleMethod: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"completion">, z.ZodLiteral<"functions">, z.ZodLiteral<"structured">]>>;
            titleEndpoint: z.ZodOptional<z.ZodString>;
            titlePromptTemplate: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            baseURL?: string | undefined;
            streamRate?: number | undefined;
            titlePrompt?: string | undefined;
            titleModel?: string | undefined;
            titleConvo?: boolean | undefined;
            titleMethod?: "completion" | "functions" | "structured" | undefined;
            titleEndpoint?: string | undefined;
            titlePromptTemplate?: string | undefined;
        }, {
            baseURL?: string | undefined;
            streamRate?: number | undefined;
            titlePrompt?: string | undefined;
            titleModel?: string | undefined;
            titleConvo?: boolean | undefined;
            titleMethod?: "completion" | "functions" | "structured" | undefined;
            titleEndpoint?: string | undefined;
            titlePromptTemplate?: string | undefined;
        }>>;
        azureOpenAI: z.ZodOptional<z.ZodIntersection<z.ZodObject<{
            groups: z.ZodArray<z.ZodIntersection<z.ZodObject<{
                group: z.ZodString;
                models: z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodObject<{
                    deploymentName: z.ZodOptional<z.ZodString>;
                    version: z.ZodOptional<z.ZodString>;
                    assistants: z.ZodOptional<z.ZodBoolean>;
                }, "strip", z.ZodTypeAny, {
                    version?: string | undefined;
                    deploymentName?: string | undefined;
                    assistants?: boolean | undefined;
                }, {
                    version?: string | undefined;
                    deploymentName?: string | undefined;
                    assistants?: boolean | undefined;
                }>, z.ZodBoolean]>>;
            }, "strip", z.ZodTypeAny, {
                group: string;
                models: Record<string, boolean | {
                    version?: string | undefined;
                    deploymentName?: string | undefined;
                    assistants?: boolean | undefined;
                }>;
            }, {
                group: string;
                models: Record<string, boolean | {
                    version?: string | undefined;
                    deploymentName?: string | undefined;
                    assistants?: boolean | undefined;
                }>;
            }>, z.ZodObject<{
                apiKey: z.ZodString;
                serverless: z.ZodOptional<z.ZodBoolean>;
                instanceName: z.ZodOptional<z.ZodString>;
                deploymentName: z.ZodOptional<z.ZodString>;
                assistants: z.ZodOptional<z.ZodBoolean>;
                addParams: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
                dropParams: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                forcePrompt: z.ZodOptional<z.ZodBoolean>;
                version: z.ZodOptional<z.ZodString>;
                baseURL: z.ZodOptional<z.ZodString>;
                additionalHeaders: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
            }, "strip", z.ZodTypeAny, {
                apiKey: string;
                version?: string | undefined;
                baseURL?: string | undefined;
                instanceName?: string | undefined;
                deploymentName?: string | undefined;
                assistants?: boolean | undefined;
                serverless?: boolean | undefined;
                addParams?: Record<string, any> | undefined;
                dropParams?: string[] | undefined;
                forcePrompt?: boolean | undefined;
                additionalHeaders?: Record<string, any> | undefined;
            }, {
                apiKey: string;
                version?: string | undefined;
                baseURL?: string | undefined;
                instanceName?: string | undefined;
                deploymentName?: string | undefined;
                assistants?: boolean | undefined;
                serverless?: boolean | undefined;
                addParams?: Record<string, any> | undefined;
                dropParams?: string[] | undefined;
                forcePrompt?: boolean | undefined;
                additionalHeaders?: Record<string, any> | undefined;
            }>>, "many">;
            plugins: z.ZodOptional<z.ZodBoolean>;
            assistants: z.ZodOptional<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            groups: ({
                group: string;
                models: Record<string, boolean | {
                    version?: string | undefined;
                    deploymentName?: string | undefined;
                    assistants?: boolean | undefined;
                }>;
            } & {
                apiKey: string;
                version?: string | undefined;
                baseURL?: string | undefined;
                instanceName?: string | undefined;
                deploymentName?: string | undefined;
                assistants?: boolean | undefined;
                serverless?: boolean | undefined;
                addParams?: Record<string, any> | undefined;
                dropParams?: string[] | undefined;
                forcePrompt?: boolean | undefined;
                additionalHeaders?: Record<string, any> | undefined;
            })[];
            assistants?: boolean | undefined;
            plugins?: boolean | undefined;
        }, {
            groups: ({
                group: string;
                models: Record<string, boolean | {
                    version?: string | undefined;
                    deploymentName?: string | undefined;
                    assistants?: boolean | undefined;
                }>;
            } & {
                apiKey: string;
                version?: string | undefined;
                baseURL?: string | undefined;
                instanceName?: string | undefined;
                deploymentName?: string | undefined;
                assistants?: boolean | undefined;
                serverless?: boolean | undefined;
                addParams?: Record<string, any> | undefined;
                dropParams?: string[] | undefined;
                forcePrompt?: boolean | undefined;
                additionalHeaders?: Record<string, any> | undefined;
            })[];
            assistants?: boolean | undefined;
            plugins?: boolean | undefined;
        }>, z.ZodObject<{
            streamRate: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
            titlePrompt: z.ZodOptional<z.ZodOptional<z.ZodString>>;
            titleModel: z.ZodOptional<z.ZodOptional<z.ZodString>>;
            titleConvo: z.ZodOptional<z.ZodOptional<z.ZodBoolean>>;
            titleMethod: z.ZodOptional<z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"completion">, z.ZodLiteral<"functions">, z.ZodLiteral<"structured">]>>>;
            titlePromptTemplate: z.ZodOptional<z.ZodOptional<z.ZodString>>;
            summarize: z.ZodOptional<z.ZodOptional<z.ZodBoolean>>;
            summaryModel: z.ZodOptional<z.ZodOptional<z.ZodString>>;
            customOrder: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
        }, "strip", z.ZodTypeAny, {
            streamRate?: number | undefined;
            titlePrompt?: string | undefined;
            titleModel?: string | undefined;
            titleConvo?: boolean | undefined;
            titleMethod?: "completion" | "functions" | "structured" | undefined;
            titlePromptTemplate?: string | undefined;
            summarize?: boolean | undefined;
            summaryModel?: string | undefined;
            customOrder?: number | undefined;
        }, {
            streamRate?: number | undefined;
            titlePrompt?: string | undefined;
            titleModel?: string | undefined;
            titleConvo?: boolean | undefined;
            titleMethod?: "completion" | "functions" | "structured" | undefined;
            titlePromptTemplate?: string | undefined;
            summarize?: boolean | undefined;
            summaryModel?: string | undefined;
            customOrder?: number | undefined;
        }>>>;
        azureAssistants: z.ZodOptional<z.ZodObject<{
            streamRate: z.ZodOptional<z.ZodNumber>;
            baseURL: z.ZodOptional<z.ZodString>;
            titlePrompt: z.ZodOptional<z.ZodString>;
            titleModel: z.ZodOptional<z.ZodString>;
            titleConvo: z.ZodOptional<z.ZodBoolean>;
            titleMethod: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"completion">, z.ZodLiteral<"functions">, z.ZodLiteral<"structured">]>>;
            titleEndpoint: z.ZodOptional<z.ZodString>;
            titlePromptTemplate: z.ZodOptional<z.ZodString>;
        } & {
            disableBuilder: z.ZodOptional<z.ZodBoolean>;
            pollIntervalMs: z.ZodOptional<z.ZodNumber>;
            timeoutMs: z.ZodOptional<z.ZodNumber>;
            version: z.ZodDefault<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
            supportedIds: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            excludedIds: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            privateAssistants: z.ZodOptional<z.ZodBoolean>;
            retrievalModels: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
            capabilities: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodNativeEnum<typeof Capabilities>, "many">>>;
            apiKey: z.ZodOptional<z.ZodString>;
            models: z.ZodOptional<z.ZodObject<{
                default: z.ZodArray<z.ZodUnion<[z.ZodString, z.ZodObject<{
                    name: z.ZodString;
                    description: z.ZodOptional<z.ZodString>;
                }, "strip", z.ZodTypeAny, {
                    name: string;
                    description?: string | undefined;
                }, {
                    name: string;
                    description?: string | undefined;
                }>]>, "many">;
                fetch: z.ZodOptional<z.ZodBoolean>;
                userIdQuery: z.ZodOptional<z.ZodBoolean>;
            }, "strip", z.ZodTypeAny, {
                default: (string | {
                    name: string;
                    description?: string | undefined;
                })[];
                fetch?: boolean | undefined;
                userIdQuery?: boolean | undefined;
            }, {
                default: (string | {
                    name: string;
                    description?: string | undefined;
                })[];
                fetch?: boolean | undefined;
                userIdQuery?: boolean | undefined;
            }>>;
            headers: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
        }, "strip", z.ZodTypeAny, {
            version: string | number;
            retrievalModels: string[];
            capabilities: Capabilities[];
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
        }, {
            version?: string | number | undefined;
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
            retrievalModels?: string[] | undefined;
            capabilities?: Capabilities[] | undefined;
        }>>;
        assistants: z.ZodOptional<z.ZodObject<{
            streamRate: z.ZodOptional<z.ZodNumber>;
            baseURL: z.ZodOptional<z.ZodString>;
            titlePrompt: z.ZodOptional<z.ZodString>;
            titleModel: z.ZodOptional<z.ZodString>;
            titleConvo: z.ZodOptional<z.ZodBoolean>;
            titleMethod: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"completion">, z.ZodLiteral<"functions">, z.ZodLiteral<"structured">]>>;
            titleEndpoint: z.ZodOptional<z.ZodString>;
            titlePromptTemplate: z.ZodOptional<z.ZodString>;
        } & {
            disableBuilder: z.ZodOptional<z.ZodBoolean>;
            pollIntervalMs: z.ZodOptional<z.ZodNumber>;
            timeoutMs: z.ZodOptional<z.ZodNumber>;
            version: z.ZodDefault<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
            supportedIds: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            excludedIds: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            privateAssistants: z.ZodOptional<z.ZodBoolean>;
            retrievalModels: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
            capabilities: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodNativeEnum<typeof Capabilities>, "many">>>;
            apiKey: z.ZodOptional<z.ZodString>;
            models: z.ZodOptional<z.ZodObject<{
                default: z.ZodArray<z.ZodUnion<[z.ZodString, z.ZodObject<{
                    name: z.ZodString;
                    description: z.ZodOptional<z.ZodString>;
                }, "strip", z.ZodTypeAny, {
                    name: string;
                    description?: string | undefined;
                }, {
                    name: string;
                    description?: string | undefined;
                }>]>, "many">;
                fetch: z.ZodOptional<z.ZodBoolean>;
                userIdQuery: z.ZodOptional<z.ZodBoolean>;
            }, "strip", z.ZodTypeAny, {
                default: (string | {
                    name: string;
                    description?: string | undefined;
                })[];
                fetch?: boolean | undefined;
                userIdQuery?: boolean | undefined;
            }, {
                default: (string | {
                    name: string;
                    description?: string | undefined;
                })[];
                fetch?: boolean | undefined;
                userIdQuery?: boolean | undefined;
            }>>;
            headers: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
        }, "strip", z.ZodTypeAny, {
            version: string | number;
            retrievalModels: string[];
            capabilities: Capabilities[];
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
        }, {
            version?: string | number | undefined;
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
            retrievalModels?: string[] | undefined;
            capabilities?: Capabilities[] | undefined;
        }>>;
        agents: z.ZodOptional<z.ZodDefault<z.ZodObject<{
            streamRate: z.ZodOptional<z.ZodNumber>;
            baseURL: z.ZodOptional<z.ZodString>;
            titlePrompt: z.ZodOptional<z.ZodString>;
            titleModel: z.ZodOptional<z.ZodString>;
            titleConvo: z.ZodOptional<z.ZodBoolean>;
            titleMethod: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"completion">, z.ZodLiteral<"functions">, z.ZodLiteral<"structured">]>>;
            titleEndpoint: z.ZodOptional<z.ZodString>;
            titlePromptTemplate: z.ZodOptional<z.ZodString>;
        } & {
            recursionLimit: z.ZodOptional<z.ZodNumber>;
            disableBuilder: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
            maxRecursionLimit: z.ZodOptional<z.ZodNumber>;
            maxCitations: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
            maxCitationsPerFile: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
            minRelevanceScore: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
            allowedProviders: z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodString, z.ZodNativeEnum<typeof EModelEndpoint>]>, "many">>;
            capabilities: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodNativeEnum<typeof AgentCapabilities>, "many">>>;
        }, "strip", z.ZodTypeAny, {
            disableBuilder: boolean;
            capabilities: AgentCapabilities[];
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
        }, {
            baseURL?: string | undefined;
            streamRate?: number | undefined;
            titlePrompt?: string | undefined;
            titleModel?: string | undefined;
            titleConvo?: boolean | undefined;
            titleMethod?: "completion" | "functions" | "structured" | undefined;
            titleEndpoint?: string | undefined;
            titlePromptTemplate?: string | undefined;
            disableBuilder?: boolean | undefined;
            capabilities?: AgentCapabilities[] | undefined;
            recursionLimit?: number | undefined;
            maxRecursionLimit?: number | undefined;
            maxCitations?: number | undefined;
            maxCitationsPerFile?: number | undefined;
            minRelevanceScore?: number | undefined;
            allowedProviders?: string[] | undefined;
        }>>>;
        custom: z.ZodOptional<z.ZodOptional<z.ZodArray<z.ZodObject<{
            streamRate: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
            titlePrompt: z.ZodOptional<z.ZodOptional<z.ZodString>>;
            titleModel: z.ZodOptional<z.ZodOptional<z.ZodString>>;
            titleConvo: z.ZodOptional<z.ZodOptional<z.ZodBoolean>>;
            titleMethod: z.ZodOptional<z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"completion">, z.ZodLiteral<"functions">, z.ZodLiteral<"structured">]>>>;
            titleEndpoint: z.ZodOptional<z.ZodOptional<z.ZodString>>;
            titlePromptTemplate: z.ZodOptional<z.ZodOptional<z.ZodString>>;
            name: z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>;
            apiKey: z.ZodOptional<z.ZodString>;
            baseURL: z.ZodOptional<z.ZodString>;
            models: z.ZodOptional<z.ZodObject<{
                default: z.ZodArray<z.ZodUnion<[z.ZodString, z.ZodObject<{
                    name: z.ZodString;
                    description: z.ZodOptional<z.ZodString>;
                }, "strip", z.ZodTypeAny, {
                    name: string;
                    description?: string | undefined;
                }, {
                    name: string;
                    description?: string | undefined;
                }>]>, "many">;
                fetch: z.ZodOptional<z.ZodBoolean>;
                userIdQuery: z.ZodOptional<z.ZodBoolean>;
            }, "strip", z.ZodTypeAny, {
                default: (string | {
                    name: string;
                    description?: string | undefined;
                })[];
                fetch?: boolean | undefined;
                userIdQuery?: boolean | undefined;
            }, {
                default: (string | {
                    name: string;
                    description?: string | undefined;
                })[];
                fetch?: boolean | undefined;
                userIdQuery?: boolean | undefined;
            }>>;
            summarize: z.ZodOptional<z.ZodOptional<z.ZodBoolean>>;
            summaryModel: z.ZodOptional<z.ZodOptional<z.ZodString>>;
            iconURL: z.ZodOptional<z.ZodOptional<z.ZodString>>;
            forcePrompt: z.ZodOptional<z.ZodOptional<z.ZodBoolean>>;
            modelDisplayLabel: z.ZodOptional<z.ZodOptional<z.ZodString>>;
            headers: z.ZodOptional<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>>;
            addParams: z.ZodOptional<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>>;
            dropParams: z.ZodOptional<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
            customParams: z.ZodOptional<z.ZodObject<{
                defaultParamsEndpoint: z.ZodDefault<z.ZodString>;
                paramDefinitions: z.ZodOptional<z.ZodArray<z.ZodRecord<z.ZodString, z.ZodAny>, "many">>;
            }, "strict", z.ZodTypeAny, {
                defaultParamsEndpoint: string;
                paramDefinitions?: Record<string, any>[] | undefined;
            }, {
                defaultParamsEndpoint?: string | undefined;
                paramDefinitions?: Record<string, any>[] | undefined;
            }>>;
            customOrder: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
            directEndpoint: z.ZodOptional<z.ZodOptional<z.ZodBoolean>>;
            titleMessageRole: z.ZodOptional<z.ZodOptional<z.ZodString>>;
        }, "strip", z.ZodTypeAny, {
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
        }, {
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
                defaultParamsEndpoint?: string | undefined;
                paramDefinitions?: Record<string, any>[] | undefined;
            } | undefined;
            customOrder?: number | undefined;
            directEndpoint?: boolean | undefined;
            titleMessageRole?: string | undefined;
        }>, "many">>>;
        bedrock: z.ZodOptional<z.ZodObject<{
            streamRate: z.ZodOptional<z.ZodNumber>;
            baseURL: z.ZodOptional<z.ZodString>;
            titlePrompt: z.ZodOptional<z.ZodString>;
            titleModel: z.ZodOptional<z.ZodString>;
            titleConvo: z.ZodOptional<z.ZodBoolean>;
            titleMethod: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"completion">, z.ZodLiteral<"functions">, z.ZodLiteral<"structured">]>>;
            titleEndpoint: z.ZodOptional<z.ZodString>;
            titlePromptTemplate: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            baseURL?: string | undefined;
            streamRate?: number | undefined;
            titlePrompt?: string | undefined;
            titleModel?: string | undefined;
            titleConvo?: boolean | undefined;
            titleMethod?: "completion" | "functions" | "structured" | undefined;
            titleEndpoint?: string | undefined;
            titlePromptTemplate?: string | undefined;
        }, {
            baseURL?: string | undefined;
            streamRate?: number | undefined;
            titlePrompt?: string | undefined;
            titleModel?: string | undefined;
            titleConvo?: boolean | undefined;
            titleMethod?: "completion" | "functions" | "structured" | undefined;
            titleEndpoint?: string | undefined;
            titlePromptTemplate?: string | undefined;
        }>>;
    }, "strict", z.ZodTypeAny, {
        azureOpenAI?: ({
            groups: ({
                group: string;
                models: Record<string, boolean | {
                    version?: string | undefined;
                    deploymentName?: string | undefined;
                    assistants?: boolean | undefined;
                }>;
            } & {
                apiKey: string;
                version?: string | undefined;
                baseURL?: string | undefined;
                instanceName?: string | undefined;
                deploymentName?: string | undefined;
                assistants?: boolean | undefined;
                serverless?: boolean | undefined;
                addParams?: Record<string, any> | undefined;
                dropParams?: string[] | undefined;
                forcePrompt?: boolean | undefined;
                additionalHeaders?: Record<string, any> | undefined;
            })[];
            assistants?: boolean | undefined;
            plugins?: boolean | undefined;
        } & {
            streamRate?: number | undefined;
            titlePrompt?: string | undefined;
            titleModel?: string | undefined;
            titleConvo?: boolean | undefined;
            titleMethod?: "completion" | "functions" | "structured" | undefined;
            titlePromptTemplate?: string | undefined;
            summarize?: boolean | undefined;
            summaryModel?: string | undefined;
            customOrder?: number | undefined;
        }) | undefined;
        openAI?: {
            baseURL?: string | undefined;
            streamRate?: number | undefined;
            titlePrompt?: string | undefined;
            titleModel?: string | undefined;
            titleConvo?: boolean | undefined;
            titleMethod?: "completion" | "functions" | "structured" | undefined;
            titleEndpoint?: string | undefined;
            titlePromptTemplate?: string | undefined;
        } | undefined;
        google?: {
            baseURL?: string | undefined;
            streamRate?: number | undefined;
            titlePrompt?: string | undefined;
            titleModel?: string | undefined;
            titleConvo?: boolean | undefined;
            titleMethod?: "completion" | "functions" | "structured" | undefined;
            titleEndpoint?: string | undefined;
            titlePromptTemplate?: string | undefined;
        } | undefined;
        anthropic?: {
            baseURL?: string | undefined;
            streamRate?: number | undefined;
            titlePrompt?: string | undefined;
            titleModel?: string | undefined;
            titleConvo?: boolean | undefined;
            titleMethod?: "completion" | "functions" | "structured" | undefined;
            titleEndpoint?: string | undefined;
            titlePromptTemplate?: string | undefined;
        } | undefined;
        assistants?: {
            version: string | number;
            retrievalModels: string[];
            capabilities: Capabilities[];
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
        } | undefined;
        azureAssistants?: {
            version: string | number;
            retrievalModels: string[];
            capabilities: Capabilities[];
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
        } | undefined;
        agents?: {
            disableBuilder: boolean;
            capabilities: AgentCapabilities[];
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
        } | undefined;
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
        bedrock?: {
            baseURL?: string | undefined;
            streamRate?: number | undefined;
            titlePrompt?: string | undefined;
            titleModel?: string | undefined;
            titleConvo?: boolean | undefined;
            titleMethod?: "completion" | "functions" | "structured" | undefined;
            titleEndpoint?: string | undefined;
            titlePromptTemplate?: string | undefined;
        } | undefined;
        gptPlugins?: {
            baseURL?: string | undefined;
            streamRate?: number | undefined;
            titlePrompt?: string | undefined;
            titleModel?: string | undefined;
            titleConvo?: boolean | undefined;
            titleMethod?: "completion" | "functions" | "structured" | undefined;
            titleEndpoint?: string | undefined;
            titlePromptTemplate?: string | undefined;
        } | undefined;
        all?: {
            baseURL?: string | undefined;
            streamRate?: number | undefined;
            titlePrompt?: string | undefined;
            titleModel?: string | undefined;
            titleConvo?: boolean | undefined;
            titleMethod?: "completion" | "functions" | "structured" | undefined;
            titleEndpoint?: string | undefined;
            titlePromptTemplate?: string | undefined;
        } | undefined;
    }, {
        azureOpenAI?: ({
            groups: ({
                group: string;
                models: Record<string, boolean | {
                    version?: string | undefined;
                    deploymentName?: string | undefined;
                    assistants?: boolean | undefined;
                }>;
            } & {
                apiKey: string;
                version?: string | undefined;
                baseURL?: string | undefined;
                instanceName?: string | undefined;
                deploymentName?: string | undefined;
                assistants?: boolean | undefined;
                serverless?: boolean | undefined;
                addParams?: Record<string, any> | undefined;
                dropParams?: string[] | undefined;
                forcePrompt?: boolean | undefined;
                additionalHeaders?: Record<string, any> | undefined;
            })[];
            assistants?: boolean | undefined;
            plugins?: boolean | undefined;
        } & {
            streamRate?: number | undefined;
            titlePrompt?: string | undefined;
            titleModel?: string | undefined;
            titleConvo?: boolean | undefined;
            titleMethod?: "completion" | "functions" | "structured" | undefined;
            titlePromptTemplate?: string | undefined;
            summarize?: boolean | undefined;
            summaryModel?: string | undefined;
            customOrder?: number | undefined;
        }) | undefined;
        openAI?: {
            baseURL?: string | undefined;
            streamRate?: number | undefined;
            titlePrompt?: string | undefined;
            titleModel?: string | undefined;
            titleConvo?: boolean | undefined;
            titleMethod?: "completion" | "functions" | "structured" | undefined;
            titleEndpoint?: string | undefined;
            titlePromptTemplate?: string | undefined;
        } | undefined;
        google?: {
            baseURL?: string | undefined;
            streamRate?: number | undefined;
            titlePrompt?: string | undefined;
            titleModel?: string | undefined;
            titleConvo?: boolean | undefined;
            titleMethod?: "completion" | "functions" | "structured" | undefined;
            titleEndpoint?: string | undefined;
            titlePromptTemplate?: string | undefined;
        } | undefined;
        anthropic?: {
            baseURL?: string | undefined;
            streamRate?: number | undefined;
            titlePrompt?: string | undefined;
            titleModel?: string | undefined;
            titleConvo?: boolean | undefined;
            titleMethod?: "completion" | "functions" | "structured" | undefined;
            titleEndpoint?: string | undefined;
            titlePromptTemplate?: string | undefined;
        } | undefined;
        assistants?: {
            version?: string | number | undefined;
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
            retrievalModels?: string[] | undefined;
            capabilities?: Capabilities[] | undefined;
        } | undefined;
        azureAssistants?: {
            version?: string | number | undefined;
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
            retrievalModels?: string[] | undefined;
            capabilities?: Capabilities[] | undefined;
        } | undefined;
        agents?: {
            baseURL?: string | undefined;
            streamRate?: number | undefined;
            titlePrompt?: string | undefined;
            titleModel?: string | undefined;
            titleConvo?: boolean | undefined;
            titleMethod?: "completion" | "functions" | "structured" | undefined;
            titleEndpoint?: string | undefined;
            titlePromptTemplate?: string | undefined;
            disableBuilder?: boolean | undefined;
            capabilities?: AgentCapabilities[] | undefined;
            recursionLimit?: number | undefined;
            maxRecursionLimit?: number | undefined;
            maxCitations?: number | undefined;
            maxCitationsPerFile?: number | undefined;
            minRelevanceScore?: number | undefined;
            allowedProviders?: string[] | undefined;
        } | undefined;
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
                defaultParamsEndpoint?: string | undefined;
                paramDefinitions?: Record<string, any>[] | undefined;
            } | undefined;
            customOrder?: number | undefined;
            directEndpoint?: boolean | undefined;
            titleMessageRole?: string | undefined;
        }[] | undefined;
        bedrock?: {
            baseURL?: string | undefined;
            streamRate?: number | undefined;
            titlePrompt?: string | undefined;
            titleModel?: string | undefined;
            titleConvo?: boolean | undefined;
            titleMethod?: "completion" | "functions" | "structured" | undefined;
            titleEndpoint?: string | undefined;
            titlePromptTemplate?: string | undefined;
        } | undefined;
        gptPlugins?: {
            baseURL?: string | undefined;
            streamRate?: number | undefined;
            titlePrompt?: string | undefined;
            titleModel?: string | undefined;
            titleConvo?: boolean | undefined;
            titleMethod?: "completion" | "functions" | "structured" | undefined;
            titleEndpoint?: string | undefined;
            titlePromptTemplate?: string | undefined;
        } | undefined;
        all?: {
            baseURL?: string | undefined;
            streamRate?: number | undefined;
            titlePrompt?: string | undefined;
            titleModel?: string | undefined;
            titleConvo?: boolean | undefined;
            titleMethod?: "completion" | "functions" | "structured" | undefined;
            titleEndpoint?: string | undefined;
            titlePromptTemplate?: string | undefined;
        } | undefined;
    }>, {
        azureOpenAI?: ({
            groups: ({
                group: string;
                models: Record<string, boolean | {
                    version?: string | undefined;
                    deploymentName?: string | undefined;
                    assistants?: boolean | undefined;
                }>;
            } & {
                apiKey: string;
                version?: string | undefined;
                baseURL?: string | undefined;
                instanceName?: string | undefined;
                deploymentName?: string | undefined;
                assistants?: boolean | undefined;
                serverless?: boolean | undefined;
                addParams?: Record<string, any> | undefined;
                dropParams?: string[] | undefined;
                forcePrompt?: boolean | undefined;
                additionalHeaders?: Record<string, any> | undefined;
            })[];
            assistants?: boolean | undefined;
            plugins?: boolean | undefined;
        } & {
            streamRate?: number | undefined;
            titlePrompt?: string | undefined;
            titleModel?: string | undefined;
            titleConvo?: boolean | undefined;
            titleMethod?: "completion" | "functions" | "structured" | undefined;
            titlePromptTemplate?: string | undefined;
            summarize?: boolean | undefined;
            summaryModel?: string | undefined;
            customOrder?: number | undefined;
        }) | undefined;
        openAI?: {
            baseURL?: string | undefined;
            streamRate?: number | undefined;
            titlePrompt?: string | undefined;
            titleModel?: string | undefined;
            titleConvo?: boolean | undefined;
            titleMethod?: "completion" | "functions" | "structured" | undefined;
            titleEndpoint?: string | undefined;
            titlePromptTemplate?: string | undefined;
        } | undefined;
        google?: {
            baseURL?: string | undefined;
            streamRate?: number | undefined;
            titlePrompt?: string | undefined;
            titleModel?: string | undefined;
            titleConvo?: boolean | undefined;
            titleMethod?: "completion" | "functions" | "structured" | undefined;
            titleEndpoint?: string | undefined;
            titlePromptTemplate?: string | undefined;
        } | undefined;
        anthropic?: {
            baseURL?: string | undefined;
            streamRate?: number | undefined;
            titlePrompt?: string | undefined;
            titleModel?: string | undefined;
            titleConvo?: boolean | undefined;
            titleMethod?: "completion" | "functions" | "structured" | undefined;
            titleEndpoint?: string | undefined;
            titlePromptTemplate?: string | undefined;
        } | undefined;
        assistants?: {
            version: string | number;
            retrievalModels: string[];
            capabilities: Capabilities[];
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
        } | undefined;
        azureAssistants?: {
            version: string | number;
            retrievalModels: string[];
            capabilities: Capabilities[];
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
        } | undefined;
        agents?: {
            disableBuilder: boolean;
            capabilities: AgentCapabilities[];
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
        } | undefined;
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
        bedrock?: {
            baseURL?: string | undefined;
            streamRate?: number | undefined;
            titlePrompt?: string | undefined;
            titleModel?: string | undefined;
            titleConvo?: boolean | undefined;
            titleMethod?: "completion" | "functions" | "structured" | undefined;
            titleEndpoint?: string | undefined;
            titlePromptTemplate?: string | undefined;
        } | undefined;
        gptPlugins?: {
            baseURL?: string | undefined;
            streamRate?: number | undefined;
            titlePrompt?: string | undefined;
            titleModel?: string | undefined;
            titleConvo?: boolean | undefined;
            titleMethod?: "completion" | "functions" | "structured" | undefined;
            titleEndpoint?: string | undefined;
            titlePromptTemplate?: string | undefined;
        } | undefined;
        all?: {
            baseURL?: string | undefined;
            streamRate?: number | undefined;
            titlePrompt?: string | undefined;
            titleModel?: string | undefined;
            titleConvo?: boolean | undefined;
            titleMethod?: "completion" | "functions" | "structured" | undefined;
            titleEndpoint?: string | undefined;
            titlePromptTemplate?: string | undefined;
        } | undefined;
    }, {
        azureOpenAI?: ({
            groups: ({
                group: string;
                models: Record<string, boolean | {
                    version?: string | undefined;
                    deploymentName?: string | undefined;
                    assistants?: boolean | undefined;
                }>;
            } & {
                apiKey: string;
                version?: string | undefined;
                baseURL?: string | undefined;
                instanceName?: string | undefined;
                deploymentName?: string | undefined;
                assistants?: boolean | undefined;
                serverless?: boolean | undefined;
                addParams?: Record<string, any> | undefined;
                dropParams?: string[] | undefined;
                forcePrompt?: boolean | undefined;
                additionalHeaders?: Record<string, any> | undefined;
            })[];
            assistants?: boolean | undefined;
            plugins?: boolean | undefined;
        } & {
            streamRate?: number | undefined;
            titlePrompt?: string | undefined;
            titleModel?: string | undefined;
            titleConvo?: boolean | undefined;
            titleMethod?: "completion" | "functions" | "structured" | undefined;
            titlePromptTemplate?: string | undefined;
            summarize?: boolean | undefined;
            summaryModel?: string | undefined;
            customOrder?: number | undefined;
        }) | undefined;
        openAI?: {
            baseURL?: string | undefined;
            streamRate?: number | undefined;
            titlePrompt?: string | undefined;
            titleModel?: string | undefined;
            titleConvo?: boolean | undefined;
            titleMethod?: "completion" | "functions" | "structured" | undefined;
            titleEndpoint?: string | undefined;
            titlePromptTemplate?: string | undefined;
        } | undefined;
        google?: {
            baseURL?: string | undefined;
            streamRate?: number | undefined;
            titlePrompt?: string | undefined;
            titleModel?: string | undefined;
            titleConvo?: boolean | undefined;
            titleMethod?: "completion" | "functions" | "structured" | undefined;
            titleEndpoint?: string | undefined;
            titlePromptTemplate?: string | undefined;
        } | undefined;
        anthropic?: {
            baseURL?: string | undefined;
            streamRate?: number | undefined;
            titlePrompt?: string | undefined;
            titleModel?: string | undefined;
            titleConvo?: boolean | undefined;
            titleMethod?: "completion" | "functions" | "structured" | undefined;
            titleEndpoint?: string | undefined;
            titlePromptTemplate?: string | undefined;
        } | undefined;
        assistants?: {
            version?: string | number | undefined;
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
            retrievalModels?: string[] | undefined;
            capabilities?: Capabilities[] | undefined;
        } | undefined;
        azureAssistants?: {
            version?: string | number | undefined;
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
            retrievalModels?: string[] | undefined;
            capabilities?: Capabilities[] | undefined;
        } | undefined;
        agents?: {
            baseURL?: string | undefined;
            streamRate?: number | undefined;
            titlePrompt?: string | undefined;
            titleModel?: string | undefined;
            titleConvo?: boolean | undefined;
            titleMethod?: "completion" | "functions" | "structured" | undefined;
            titleEndpoint?: string | undefined;
            titlePromptTemplate?: string | undefined;
            disableBuilder?: boolean | undefined;
            capabilities?: AgentCapabilities[] | undefined;
            recursionLimit?: number | undefined;
            maxRecursionLimit?: number | undefined;
            maxCitations?: number | undefined;
            maxCitationsPerFile?: number | undefined;
            minRelevanceScore?: number | undefined;
            allowedProviders?: string[] | undefined;
        } | undefined;
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
                defaultParamsEndpoint?: string | undefined;
                paramDefinitions?: Record<string, any>[] | undefined;
            } | undefined;
            customOrder?: number | undefined;
            directEndpoint?: boolean | undefined;
            titleMessageRole?: string | undefined;
        }[] | undefined;
        bedrock?: {
            baseURL?: string | undefined;
            streamRate?: number | undefined;
            titlePrompt?: string | undefined;
            titleModel?: string | undefined;
            titleConvo?: boolean | undefined;
            titleMethod?: "completion" | "functions" | "structured" | undefined;
            titleEndpoint?: string | undefined;
            titlePromptTemplate?: string | undefined;
        } | undefined;
        gptPlugins?: {
            baseURL?: string | undefined;
            streamRate?: number | undefined;
            titlePrompt?: string | undefined;
            titleModel?: string | undefined;
            titleConvo?: boolean | undefined;
            titleMethod?: "completion" | "functions" | "structured" | undefined;
            titleEndpoint?: string | undefined;
            titlePromptTemplate?: string | undefined;
        } | undefined;
        all?: {
            baseURL?: string | undefined;
            streamRate?: number | undefined;
            titlePrompt?: string | undefined;
            titleModel?: string | undefined;
            titleConvo?: boolean | undefined;
            titleMethod?: "completion" | "functions" | "structured" | undefined;
            titleEndpoint?: string | undefined;
            titlePromptTemplate?: string | undefined;
        } | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    version: string;
    cache: boolean;
    imageOutputType: EImageOutputType;
    interface: {
        webSearch?: boolean | undefined;
        mcpServers?: {
            placeholder?: string | undefined;
        } | undefined;
        privacyPolicy?: {
            externalUrl?: string | undefined;
            openNewTab?: boolean | undefined;
        } | undefined;
        termsOfService?: {
            externalUrl?: string | undefined;
            openNewTab?: boolean | undefined;
            modalAcceptance?: boolean | undefined;
            modalTitle?: string | undefined;
            modalContent?: string | string[] | undefined;
        } | undefined;
        customWelcome?: string | undefined;
        endpointsMenu?: boolean | undefined;
        modelSelect?: boolean | undefined;
        parameters?: boolean | undefined;
        sidePanel?: boolean | undefined;
        multiConvo?: boolean | undefined;
        bookmarks?: boolean | undefined;
        memories?: boolean | undefined;
        presets?: boolean | undefined;
        prompts?: boolean | undefined;
        agents?: boolean | undefined;
        temporaryChat?: boolean | undefined;
        temporaryChatRetention?: number | undefined;
        runCode?: boolean | undefined;
        peoplePicker?: {
            users?: boolean | undefined;
            groups?: boolean | undefined;
            roles?: boolean | undefined;
        } | undefined;
        marketplace?: {
            use?: boolean | undefined;
        } | undefined;
        fileSearch?: boolean | undefined;
        fileCitations?: boolean | undefined;
    };
    fileStrategy: FileSources;
    registration: {
        allowedDomains?: string[] | undefined;
        socialLogins?: string[] | undefined;
    };
    ocr?: {
        apiKey: string;
        baseURL: string;
        strategy: OCRStrategy;
        mistralModel?: string | undefined;
    } | undefined;
    webSearch?: {
        serperApiKey: string;
        searxngInstanceUrl: string;
        searxngApiKey: string;
        firecrawlApiKey: string;
        firecrawlApiUrl: string;
        firecrawlVersion: string;
        jinaApiKey: string;
        jinaApiUrl: string;
        cohereApiKey: string;
        safeSearch: SafeSearchTypes;
        searchProvider?: SearchProviders | undefined;
        scraperProvider?: ScraperProviders | undefined;
        rerankerType?: RerankerTypes | undefined;
        scraperTimeout?: number | undefined;
        firecrawlOptions?: {
            formats?: string[] | undefined;
            includeTags?: string[] | undefined;
            excludeTags?: string[] | undefined;
            headers?: Record<string, string> | undefined;
            waitFor?: number | undefined;
            timeout?: number | undefined;
            maxAge?: number | undefined;
            mobile?: boolean | undefined;
            skipTlsVerification?: boolean | undefined;
            blockAds?: boolean | undefined;
            removeBase64Images?: boolean | undefined;
            parsePDF?: boolean | undefined;
            storeInCache?: boolean | undefined;
            zeroDataRetention?: boolean | undefined;
            location?: {
                country?: string | undefined;
                languages?: string[] | undefined;
            } | undefined;
            onlyMainContent?: boolean | undefined;
            changeTrackingOptions?: {
                modes?: string[] | undefined;
                schema?: Record<string, unknown> | undefined;
                prompt?: string | undefined;
                tag?: string | null | undefined;
            } | undefined;
        } | undefined;
    } | undefined;
    memory?: {
        charLimit: number;
        personalize: boolean;
        messageWindowSize: number;
        disabled?: boolean | undefined;
        validKeys?: string[] | undefined;
        tokenLimit?: number | undefined;
        agent?: {
            id: string;
        } | {
            model: string;
            provider: string;
            instructions?: string | undefined;
            model_parameters?: Record<string, any> | undefined;
        } | undefined;
    } | undefined;
    secureImageLinks?: boolean | undefined;
    includedTools?: string[] | undefined;
    filteredTools?: string[] | undefined;
    mcpServers?: Record<string, {
        command: string;
        args: string[];
        type?: "stdio" | undefined;
        timeout?: number | undefined;
        startup?: boolean | undefined;
        iconPath?: string | undefined;
        initTimeout?: number | undefined;
        chatMenu?: boolean | undefined;
        serverInstructions?: string | boolean | undefined;
        requiresOAuth?: boolean | undefined;
        oauth?: {
            authorization_url?: string | undefined;
            token_url?: string | undefined;
            client_id?: string | undefined;
            client_secret?: string | undefined;
            scope?: string | undefined;
            redirect_uri?: string | undefined;
            token_exchange_method?: import(".").TokenExchangeMethodEnum | undefined;
            grant_types_supported?: string[] | undefined;
            token_endpoint_auth_methods_supported?: string[] | undefined;
            response_types_supported?: string[] | undefined;
            code_challenge_methods_supported?: string[] | undefined;
            revocation_endpoint?: string | undefined;
            revocation_endpoint_auth_methods_supported?: string[] | undefined;
        } | undefined;
        oauth_headers?: Record<string, string> | undefined;
        customUserVars?: Record<string, {
            title: string;
            description: string;
        }> | undefined;
        env?: Record<string, string> | undefined;
        stderr?: any;
    } | {
        url: string;
        type?: "websocket" | undefined;
        timeout?: number | undefined;
        startup?: boolean | undefined;
        iconPath?: string | undefined;
        initTimeout?: number | undefined;
        chatMenu?: boolean | undefined;
        serverInstructions?: string | boolean | undefined;
        requiresOAuth?: boolean | undefined;
        oauth?: {
            authorization_url?: string | undefined;
            token_url?: string | undefined;
            client_id?: string | undefined;
            client_secret?: string | undefined;
            scope?: string | undefined;
            redirect_uri?: string | undefined;
            token_exchange_method?: import(".").TokenExchangeMethodEnum | undefined;
            grant_types_supported?: string[] | undefined;
            token_endpoint_auth_methods_supported?: string[] | undefined;
            response_types_supported?: string[] | undefined;
            code_challenge_methods_supported?: string[] | undefined;
            revocation_endpoint?: string | undefined;
            revocation_endpoint_auth_methods_supported?: string[] | undefined;
        } | undefined;
        oauth_headers?: Record<string, string> | undefined;
        customUserVars?: Record<string, {
            title: string;
            description: string;
        }> | undefined;
    } | {
        url: string;
        type?: "sse" | undefined;
        headers?: Record<string, string> | undefined;
        timeout?: number | undefined;
        startup?: boolean | undefined;
        iconPath?: string | undefined;
        initTimeout?: number | undefined;
        chatMenu?: boolean | undefined;
        serverInstructions?: string | boolean | undefined;
        requiresOAuth?: boolean | undefined;
        oauth?: {
            authorization_url?: string | undefined;
            token_url?: string | undefined;
            client_id?: string | undefined;
            client_secret?: string | undefined;
            scope?: string | undefined;
            redirect_uri?: string | undefined;
            token_exchange_method?: import(".").TokenExchangeMethodEnum | undefined;
            grant_types_supported?: string[] | undefined;
            token_endpoint_auth_methods_supported?: string[] | undefined;
            response_types_supported?: string[] | undefined;
            code_challenge_methods_supported?: string[] | undefined;
            revocation_endpoint?: string | undefined;
            revocation_endpoint_auth_methods_supported?: string[] | undefined;
        } | undefined;
        oauth_headers?: Record<string, string> | undefined;
        customUserVars?: Record<string, {
            title: string;
            description: string;
        }> | undefined;
    } | {
        type: "streamable-http" | "http";
        url: string;
        headers?: Record<string, string> | undefined;
        timeout?: number | undefined;
        startup?: boolean | undefined;
        iconPath?: string | undefined;
        initTimeout?: number | undefined;
        chatMenu?: boolean | undefined;
        serverInstructions?: string | boolean | undefined;
        requiresOAuth?: boolean | undefined;
        oauth?: {
            authorization_url?: string | undefined;
            token_url?: string | undefined;
            client_id?: string | undefined;
            client_secret?: string | undefined;
            scope?: string | undefined;
            redirect_uri?: string | undefined;
            token_exchange_method?: import(".").TokenExchangeMethodEnum | undefined;
            grant_types_supported?: string[] | undefined;
            token_endpoint_auth_methods_supported?: string[] | undefined;
            response_types_supported?: string[] | undefined;
            code_challenge_methods_supported?: string[] | undefined;
            revocation_endpoint?: string | undefined;
            revocation_endpoint_auth_methods_supported?: string[] | undefined;
        } | undefined;
        oauth_headers?: Record<string, string> | undefined;
        customUserVars?: Record<string, {
            title: string;
            description: string;
        }> | undefined;
    }> | undefined;
    turnstile?: {
        siteKey: string;
        options?: {
            language: string;
            size: "normal" | "compact" | "flexible" | "invisible";
        } | undefined;
    } | undefined;
    fileStrategies?: {
        default?: FileSources | undefined;
        avatar?: FileSources | undefined;
        image?: FileSources | undefined;
        document?: FileSources | undefined;
    } | undefined;
    actions?: {
        allowedDomains?: string[] | undefined;
    } | undefined;
    balance?: {
        enabled: boolean;
        startBalance: number;
        autoRefillEnabled: boolean;
        refillIntervalValue: number;
        refillIntervalUnit: "seconds" | "minutes" | "hours" | "days" | "weeks" | "months";
        refillAmount: number;
    } | undefined;
    transactions?: {
        enabled: boolean;
    } | undefined;
    speech?: {
        tts?: {
            openai?: {
                model: string;
                apiKey: string;
                voices: string[];
                url?: string | undefined;
            } | undefined;
            azureOpenAI?: {
                model: string;
                apiKey: string;
                voices: string[];
                instanceName: string;
                deploymentName: string;
                apiVersion: string;
            } | undefined;
            elevenlabs?: {
                model: string;
                apiKey: string;
                voices: string[];
                url?: string | undefined;
                websocketUrl?: string | undefined;
                voice_settings?: {
                    similarity_boost?: number | undefined;
                    stability?: number | undefined;
                    style?: number | undefined;
                    use_speaker_boost?: boolean | undefined;
                } | undefined;
                pronunciation_dictionary_locators?: string[] | undefined;
            } | undefined;
            localai?: {
                url: string;
                voices: string[];
                backend: string;
                apiKey?: string | undefined;
            } | undefined;
        } | undefined;
        stt?: {
            openai?: {
                model: string;
                apiKey: string;
                url?: string | undefined;
            } | undefined;
            azureOpenAI?: {
                apiKey: string;
                instanceName: string;
                deploymentName: string;
                apiVersion: string;
            } | undefined;
        } | undefined;
        speechTab?: {
            conversationMode?: boolean | undefined;
            advancedMode?: boolean | undefined;
            speechToText?: boolean | {
                engineSTT?: string | undefined;
                languageSTT?: string | undefined;
                autoTranscribeAudio?: boolean | undefined;
                decibelValue?: number | undefined;
                autoSendText?: number | undefined;
            } | undefined;
            textToSpeech?: boolean | {
                engineTTS?: string | undefined;
                voice?: string | undefined;
                languageTTS?: string | undefined;
                automaticPlayback?: boolean | undefined;
                playbackRate?: number | undefined;
                cacheTTS?: boolean | undefined;
            } | undefined;
        } | undefined;
    } | undefined;
    rateLimits?: {
        tts?: {
            ipMax?: number | undefined;
            ipWindowInMinutes?: number | undefined;
            userMax?: number | undefined;
            userWindowInMinutes?: number | undefined;
        } | undefined;
        stt?: {
            ipMax?: number | undefined;
            ipWindowInMinutes?: number | undefined;
            userMax?: number | undefined;
            userWindowInMinutes?: number | undefined;
        } | undefined;
        fileUploads?: {
            ipMax?: number | undefined;
            ipWindowInMinutes?: number | undefined;
            userMax?: number | undefined;
            userWindowInMinutes?: number | undefined;
        } | undefined;
        conversationsImport?: {
            ipMax?: number | undefined;
            ipWindowInMinutes?: number | undefined;
            userMax?: number | undefined;
            userWindowInMinutes?: number | undefined;
        } | undefined;
    } | undefined;
    endpoints?: {
        azureOpenAI?: ({
            groups: ({
                group: string;
                models: Record<string, boolean | {
                    version?: string | undefined;
                    deploymentName?: string | undefined;
                    assistants?: boolean | undefined;
                }>;
            } & {
                apiKey: string;
                version?: string | undefined;
                baseURL?: string | undefined;
                instanceName?: string | undefined;
                deploymentName?: string | undefined;
                assistants?: boolean | undefined;
                serverless?: boolean | undefined;
                addParams?: Record<string, any> | undefined;
                dropParams?: string[] | undefined;
                forcePrompt?: boolean | undefined;
                additionalHeaders?: Record<string, any> | undefined;
            })[];
            assistants?: boolean | undefined;
            plugins?: boolean | undefined;
        } & {
            streamRate?: number | undefined;
            titlePrompt?: string | undefined;
            titleModel?: string | undefined;
            titleConvo?: boolean | undefined;
            titleMethod?: "completion" | "functions" | "structured" | undefined;
            titlePromptTemplate?: string | undefined;
            summarize?: boolean | undefined;
            summaryModel?: string | undefined;
            customOrder?: number | undefined;
        }) | undefined;
        openAI?: {
            baseURL?: string | undefined;
            streamRate?: number | undefined;
            titlePrompt?: string | undefined;
            titleModel?: string | undefined;
            titleConvo?: boolean | undefined;
            titleMethod?: "completion" | "functions" | "structured" | undefined;
            titleEndpoint?: string | undefined;
            titlePromptTemplate?: string | undefined;
        } | undefined;
        google?: {
            baseURL?: string | undefined;
            streamRate?: number | undefined;
            titlePrompt?: string | undefined;
            titleModel?: string | undefined;
            titleConvo?: boolean | undefined;
            titleMethod?: "completion" | "functions" | "structured" | undefined;
            titleEndpoint?: string | undefined;
            titlePromptTemplate?: string | undefined;
        } | undefined;
        anthropic?: {
            baseURL?: string | undefined;
            streamRate?: number | undefined;
            titlePrompt?: string | undefined;
            titleModel?: string | undefined;
            titleConvo?: boolean | undefined;
            titleMethod?: "completion" | "functions" | "structured" | undefined;
            titleEndpoint?: string | undefined;
            titlePromptTemplate?: string | undefined;
        } | undefined;
        assistants?: {
            version: string | number;
            retrievalModels: string[];
            capabilities: Capabilities[];
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
        } | undefined;
        azureAssistants?: {
            version: string | number;
            retrievalModels: string[];
            capabilities: Capabilities[];
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
        } | undefined;
        agents?: {
            disableBuilder: boolean;
            capabilities: AgentCapabilities[];
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
        } | undefined;
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
        bedrock?: {
            baseURL?: string | undefined;
            streamRate?: number | undefined;
            titlePrompt?: string | undefined;
            titleModel?: string | undefined;
            titleConvo?: boolean | undefined;
            titleMethod?: "completion" | "functions" | "structured" | undefined;
            titleEndpoint?: string | undefined;
            titlePromptTemplate?: string | undefined;
        } | undefined;
        gptPlugins?: {
            baseURL?: string | undefined;
            streamRate?: number | undefined;
            titlePrompt?: string | undefined;
            titleModel?: string | undefined;
            titleConvo?: boolean | undefined;
            titleMethod?: "completion" | "functions" | "structured" | undefined;
            titleEndpoint?: string | undefined;
            titlePromptTemplate?: string | undefined;
        } | undefined;
        all?: {
            baseURL?: string | undefined;
            streamRate?: number | undefined;
            titlePrompt?: string | undefined;
            titleModel?: string | undefined;
            titleConvo?: boolean | undefined;
            titleMethod?: "completion" | "functions" | "structured" | undefined;
            titleEndpoint?: string | undefined;
            titlePromptTemplate?: string | undefined;
        } | undefined;
    } | undefined;
    fileConfig?: {
        text?: {
            supportedMimeTypes?: any[] | undefined;
        } | undefined;
        ocr?: {
            supportedMimeTypes?: any[] | undefined;
        } | undefined;
        endpoints?: Record<string, {
            disabled?: boolean | undefined;
            fileLimit?: number | undefined;
            fileSizeLimit?: number | undefined;
            totalSizeLimit?: number | undefined;
            supportedMimeTypes?: any[] | undefined;
        }> | undefined;
        serverFileSizeLimit?: number | undefined;
        avatarSizeLimit?: number | undefined;
        fileTokenLimit?: number | undefined;
        imageGeneration?: {
            percentage?: number | undefined;
            px?: number | undefined;
        } | undefined;
        clientImageResize?: {
            enabled?: boolean | undefined;
            maxWidth?: number | undefined;
            maxHeight?: number | undefined;
            quality?: number | undefined;
        } | undefined;
    } | undefined;
    modelSpecs?: {
        enforce: boolean;
        prioritize: boolean;
        list: {
            name: string;
            label: string;
            preset: {
                endpoint: string | null;
                conversationId?: string | null | undefined;
                title?: string | null | undefined;
                iconURL?: string | null | undefined;
                greeting?: string | undefined;
                endpointType?: EModelEndpoint | null | undefined;
                expiredAt?: string | null | undefined;
                messages?: string[] | undefined;
                isArchived?: boolean | undefined;
                tags?: string[] | undefined;
                user?: string | undefined;
                tools?: string[] | {
                    name: string;
                    pluginKey: string;
                    description?: string | undefined;
                    chatMenu?: boolean | undefined;
                    icon?: string | undefined;
                    authConfig?: {
                        description: string;
                        label: string;
                        authField: string;
                    }[] | undefined;
                    authenticated?: boolean | undefined;
                    isButton?: boolean | undefined;
                    toolkit?: boolean | undefined;
                }[] | undefined;
                model?: string | null | undefined;
                spec?: string | null | undefined;
                instructions?: string | undefined;
                fileTokenLimit?: number | undefined;
                modelLabel?: string | null | undefined;
                userLabel?: string | undefined;
                promptPrefix?: string | null | undefined;
                temperature?: number | null | undefined;
                topP?: number | undefined;
                topK?: number | undefined;
                top_p?: number | undefined;
                frequency_penalty?: number | undefined;
                presence_penalty?: number | undefined;
                parentMessageId?: string | undefined;
                maxOutputTokens?: number | null | undefined;
                maxContextTokens?: number | undefined;
                max_tokens?: number | undefined;
                promptCache?: boolean | undefined;
                system?: string | undefined;
                thinking?: boolean | undefined;
                thinkingBudget?: number | undefined;
                stream?: boolean | undefined;
                artifacts?: string | undefined;
                context?: string | null | undefined;
                examples?: {
                    input: {
                        content: string;
                    };
                    output: {
                        content: string;
                    };
                }[] | undefined;
                resendFiles?: boolean | undefined;
                file_ids?: string[] | undefined;
                imageDetail?: import("./schemas").ImageDetail | undefined;
                reasoning_effort?: import("./schemas").ReasoningEffort | null | undefined;
                reasoning_summary?: import("./schemas").ReasoningSummary | null | undefined;
                verbosity?: import("./schemas").Verbosity | null | undefined;
                useResponsesApi?: boolean | undefined;
                web_search?: boolean | undefined;
                disableStreaming?: boolean | undefined;
                assistant_id?: string | undefined;
                agent_id?: string | undefined;
                region?: string | undefined;
                maxTokens?: number | undefined;
                additionalModelRequestFields?: (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | {
                    [key: string]: string | number | boolean | any | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | any | any | null)[] | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
                } | null) | undefined;
                additional_instructions?: string | undefined;
                append_current_datetime?: boolean | undefined;
                presetOverride?: Record<string, unknown> | undefined;
                stop?: string[] | undefined;
                resendImages?: boolean | undefined;
                agentOptions?: {
                    model: string;
                    agent: string;
                    temperature: number;
                    skipCompletion: boolean;
                } | null | undefined;
                chatGptLabel?: string | null | undefined;
                presetId?: string | null | undefined;
                defaultPreset?: boolean | undefined;
                order?: number | undefined;
            };
            iconURL?: string | undefined;
            default?: boolean | undefined;
            description?: string | undefined;
            webSearch?: boolean | undefined;
            mcpServers?: string[] | undefined;
            fileSearch?: boolean | undefined;
            order?: number | undefined;
            group?: string | undefined;
            showIconInMenu?: boolean | undefined;
            showIconInHeader?: boolean | undefined;
            authType?: import("./schemas").AuthType | undefined;
            executeCode?: boolean | undefined;
        }[];
        addedEndpoints?: string[] | undefined;
    } | undefined;
}, {
    version: string;
    cache?: boolean | undefined;
    ocr?: {
        mistralModel?: string | undefined;
        apiKey?: string | undefined;
        baseURL?: string | undefined;
        strategy?: OCRStrategy | undefined;
    } | undefined;
    webSearch?: {
        serperApiKey?: string | undefined;
        searxngInstanceUrl?: string | undefined;
        searxngApiKey?: string | undefined;
        firecrawlApiKey?: string | undefined;
        firecrawlApiUrl?: string | undefined;
        firecrawlVersion?: string | undefined;
        jinaApiKey?: string | undefined;
        jinaApiUrl?: string | undefined;
        cohereApiKey?: string | undefined;
        searchProvider?: SearchProviders | undefined;
        scraperProvider?: ScraperProviders | undefined;
        rerankerType?: RerankerTypes | undefined;
        scraperTimeout?: number | undefined;
        safeSearch?: SafeSearchTypes | undefined;
        firecrawlOptions?: {
            formats?: string[] | undefined;
            includeTags?: string[] | undefined;
            excludeTags?: string[] | undefined;
            headers?: Record<string, string> | undefined;
            waitFor?: number | undefined;
            timeout?: number | undefined;
            maxAge?: number | undefined;
            mobile?: boolean | undefined;
            skipTlsVerification?: boolean | undefined;
            blockAds?: boolean | undefined;
            removeBase64Images?: boolean | undefined;
            parsePDF?: boolean | undefined;
            storeInCache?: boolean | undefined;
            zeroDataRetention?: boolean | undefined;
            location?: {
                country?: string | undefined;
                languages?: string[] | undefined;
            } | undefined;
            onlyMainContent?: boolean | undefined;
            changeTrackingOptions?: {
                modes?: string[] | undefined;
                schema?: Record<string, unknown> | undefined;
                prompt?: string | undefined;
                tag?: string | null | undefined;
            } | undefined;
        } | undefined;
    } | undefined;
    memory?: {
        disabled?: boolean | undefined;
        validKeys?: string[] | undefined;
        tokenLimit?: number | undefined;
        charLimit?: number | undefined;
        personalize?: boolean | undefined;
        messageWindowSize?: number | undefined;
        agent?: {
            id: string;
        } | {
            model: string;
            provider: string;
            instructions?: string | undefined;
            model_parameters?: Record<string, any> | undefined;
        } | undefined;
    } | undefined;
    secureImageLinks?: boolean | undefined;
    imageOutputType?: EImageOutputType | undefined;
    includedTools?: string[] | undefined;
    filteredTools?: string[] | undefined;
    mcpServers?: Record<string, {
        command: string;
        args: string[];
        type?: "stdio" | undefined;
        timeout?: number | undefined;
        startup?: boolean | undefined;
        iconPath?: string | undefined;
        initTimeout?: number | undefined;
        chatMenu?: boolean | undefined;
        serverInstructions?: string | boolean | undefined;
        requiresOAuth?: boolean | undefined;
        oauth?: {
            authorization_url?: string | undefined;
            token_url?: string | undefined;
            client_id?: string | undefined;
            client_secret?: string | undefined;
            scope?: string | undefined;
            redirect_uri?: string | undefined;
            token_exchange_method?: import(".").TokenExchangeMethodEnum | undefined;
            grant_types_supported?: string[] | undefined;
            token_endpoint_auth_methods_supported?: string[] | undefined;
            response_types_supported?: string[] | undefined;
            code_challenge_methods_supported?: string[] | undefined;
            revocation_endpoint?: string | undefined;
            revocation_endpoint_auth_methods_supported?: string[] | undefined;
        } | undefined;
        oauth_headers?: Record<string, string> | undefined;
        customUserVars?: Record<string, {
            title: string;
            description: string;
        }> | undefined;
        env?: Record<string, string> | undefined;
        stderr?: any;
    } | {
        url: string;
        type?: "websocket" | undefined;
        timeout?: number | undefined;
        startup?: boolean | undefined;
        iconPath?: string | undefined;
        initTimeout?: number | undefined;
        chatMenu?: boolean | undefined;
        serverInstructions?: string | boolean | undefined;
        requiresOAuth?: boolean | undefined;
        oauth?: {
            authorization_url?: string | undefined;
            token_url?: string | undefined;
            client_id?: string | undefined;
            client_secret?: string | undefined;
            scope?: string | undefined;
            redirect_uri?: string | undefined;
            token_exchange_method?: import(".").TokenExchangeMethodEnum | undefined;
            grant_types_supported?: string[] | undefined;
            token_endpoint_auth_methods_supported?: string[] | undefined;
            response_types_supported?: string[] | undefined;
            code_challenge_methods_supported?: string[] | undefined;
            revocation_endpoint?: string | undefined;
            revocation_endpoint_auth_methods_supported?: string[] | undefined;
        } | undefined;
        oauth_headers?: Record<string, string> | undefined;
        customUserVars?: Record<string, {
            title: string;
            description: string;
        }> | undefined;
    } | {
        url: string;
        type?: "sse" | undefined;
        headers?: Record<string, string> | undefined;
        timeout?: number | undefined;
        startup?: boolean | undefined;
        iconPath?: string | undefined;
        initTimeout?: number | undefined;
        chatMenu?: boolean | undefined;
        serverInstructions?: string | boolean | undefined;
        requiresOAuth?: boolean | undefined;
        oauth?: {
            authorization_url?: string | undefined;
            token_url?: string | undefined;
            client_id?: string | undefined;
            client_secret?: string | undefined;
            scope?: string | undefined;
            redirect_uri?: string | undefined;
            token_exchange_method?: import(".").TokenExchangeMethodEnum | undefined;
            grant_types_supported?: string[] | undefined;
            token_endpoint_auth_methods_supported?: string[] | undefined;
            response_types_supported?: string[] | undefined;
            code_challenge_methods_supported?: string[] | undefined;
            revocation_endpoint?: string | undefined;
            revocation_endpoint_auth_methods_supported?: string[] | undefined;
        } | undefined;
        oauth_headers?: Record<string, string> | undefined;
        customUserVars?: Record<string, {
            title: string;
            description: string;
        }> | undefined;
    } | {
        type: "streamable-http" | "http";
        url: string;
        headers?: Record<string, string> | undefined;
        timeout?: number | undefined;
        startup?: boolean | undefined;
        iconPath?: string | undefined;
        initTimeout?: number | undefined;
        chatMenu?: boolean | undefined;
        serverInstructions?: string | boolean | undefined;
        requiresOAuth?: boolean | undefined;
        oauth?: {
            authorization_url?: string | undefined;
            token_url?: string | undefined;
            client_id?: string | undefined;
            client_secret?: string | undefined;
            scope?: string | undefined;
            redirect_uri?: string | undefined;
            token_exchange_method?: import(".").TokenExchangeMethodEnum | undefined;
            grant_types_supported?: string[] | undefined;
            token_endpoint_auth_methods_supported?: string[] | undefined;
            response_types_supported?: string[] | undefined;
            code_challenge_methods_supported?: string[] | undefined;
            revocation_endpoint?: string | undefined;
            revocation_endpoint_auth_methods_supported?: string[] | undefined;
        } | undefined;
        oauth_headers?: Record<string, string> | undefined;
        customUserVars?: Record<string, {
            title: string;
            description: string;
        }> | undefined;
    }> | undefined;
    interface?: {
        webSearch?: boolean | undefined;
        mcpServers?: {
            placeholder?: string | undefined;
        } | undefined;
        privacyPolicy?: {
            externalUrl?: string | undefined;
            openNewTab?: boolean | undefined;
        } | undefined;
        termsOfService?: {
            externalUrl?: string | undefined;
            openNewTab?: boolean | undefined;
            modalAcceptance?: boolean | undefined;
            modalTitle?: string | undefined;
            modalContent?: string | string[] | undefined;
        } | undefined;
        customWelcome?: string | undefined;
        endpointsMenu?: boolean | undefined;
        modelSelect?: boolean | undefined;
        parameters?: boolean | undefined;
        sidePanel?: boolean | undefined;
        multiConvo?: boolean | undefined;
        bookmarks?: boolean | undefined;
        memories?: boolean | undefined;
        presets?: boolean | undefined;
        prompts?: boolean | undefined;
        agents?: boolean | undefined;
        temporaryChat?: boolean | undefined;
        temporaryChatRetention?: number | undefined;
        runCode?: boolean | undefined;
        peoplePicker?: {
            users?: boolean | undefined;
            groups?: boolean | undefined;
            roles?: boolean | undefined;
        } | undefined;
        marketplace?: {
            use?: boolean | undefined;
        } | undefined;
        fileSearch?: boolean | undefined;
        fileCitations?: boolean | undefined;
    } | undefined;
    turnstile?: {
        siteKey: string;
        options?: {
            language?: string | undefined;
            size?: "normal" | "compact" | "flexible" | "invisible" | undefined;
        } | undefined;
    } | undefined;
    fileStrategy?: FileSources | undefined;
    fileStrategies?: {
        default?: FileSources | undefined;
        avatar?: FileSources | undefined;
        image?: FileSources | undefined;
        document?: FileSources | undefined;
    } | undefined;
    actions?: {
        allowedDomains?: string[] | undefined;
    } | undefined;
    registration?: {
        allowedDomains?: string[] | undefined;
        socialLogins?: string[] | undefined;
    } | undefined;
    balance?: {
        enabled?: boolean | undefined;
        startBalance?: number | undefined;
        autoRefillEnabled?: boolean | undefined;
        refillIntervalValue?: number | undefined;
        refillIntervalUnit?: "seconds" | "minutes" | "hours" | "days" | "weeks" | "months" | undefined;
        refillAmount?: number | undefined;
    } | undefined;
    transactions?: {
        enabled?: boolean | undefined;
    } | undefined;
    speech?: {
        tts?: {
            openai?: {
                model: string;
                apiKey: string;
                voices: string[];
                url?: string | undefined;
            } | undefined;
            azureOpenAI?: {
                model: string;
                apiKey: string;
                voices: string[];
                instanceName: string;
                deploymentName: string;
                apiVersion: string;
            } | undefined;
            elevenlabs?: {
                model: string;
                apiKey: string;
                voices: string[];
                url?: string | undefined;
                websocketUrl?: string | undefined;
                voice_settings?: {
                    similarity_boost?: number | undefined;
                    stability?: number | undefined;
                    style?: number | undefined;
                    use_speaker_boost?: boolean | undefined;
                } | undefined;
                pronunciation_dictionary_locators?: string[] | undefined;
            } | undefined;
            localai?: {
                url: string;
                voices: string[];
                backend: string;
                apiKey?: string | undefined;
            } | undefined;
        } | undefined;
        stt?: {
            openai?: {
                model: string;
                apiKey: string;
                url?: string | undefined;
            } | undefined;
            azureOpenAI?: {
                apiKey: string;
                instanceName: string;
                deploymentName: string;
                apiVersion: string;
            } | undefined;
        } | undefined;
        speechTab?: {
            conversationMode?: boolean | undefined;
            advancedMode?: boolean | undefined;
            speechToText?: boolean | {
                engineSTT?: string | undefined;
                languageSTT?: string | undefined;
                autoTranscribeAudio?: boolean | undefined;
                decibelValue?: number | undefined;
                autoSendText?: number | undefined;
            } | undefined;
            textToSpeech?: boolean | {
                engineTTS?: string | undefined;
                voice?: string | undefined;
                languageTTS?: string | undefined;
                automaticPlayback?: boolean | undefined;
                playbackRate?: number | undefined;
                cacheTTS?: boolean | undefined;
            } | undefined;
        } | undefined;
    } | undefined;
    rateLimits?: {
        tts?: {
            ipMax?: number | undefined;
            ipWindowInMinutes?: number | undefined;
            userMax?: number | undefined;
            userWindowInMinutes?: number | undefined;
        } | undefined;
        stt?: {
            ipMax?: number | undefined;
            ipWindowInMinutes?: number | undefined;
            userMax?: number | undefined;
            userWindowInMinutes?: number | undefined;
        } | undefined;
        fileUploads?: {
            ipMax?: number | undefined;
            ipWindowInMinutes?: number | undefined;
            userMax?: number | undefined;
            userWindowInMinutes?: number | undefined;
        } | undefined;
        conversationsImport?: {
            ipMax?: number | undefined;
            ipWindowInMinutes?: number | undefined;
            userMax?: number | undefined;
            userWindowInMinutes?: number | undefined;
        } | undefined;
    } | undefined;
    endpoints?: {
        azureOpenAI?: ({
            groups: ({
                group: string;
                models: Record<string, boolean | {
                    version?: string | undefined;
                    deploymentName?: string | undefined;
                    assistants?: boolean | undefined;
                }>;
            } & {
                apiKey: string;
                version?: string | undefined;
                baseURL?: string | undefined;
                instanceName?: string | undefined;
                deploymentName?: string | undefined;
                assistants?: boolean | undefined;
                serverless?: boolean | undefined;
                addParams?: Record<string, any> | undefined;
                dropParams?: string[] | undefined;
                forcePrompt?: boolean | undefined;
                additionalHeaders?: Record<string, any> | undefined;
            })[];
            assistants?: boolean | undefined;
            plugins?: boolean | undefined;
        } & {
            streamRate?: number | undefined;
            titlePrompt?: string | undefined;
            titleModel?: string | undefined;
            titleConvo?: boolean | undefined;
            titleMethod?: "completion" | "functions" | "structured" | undefined;
            titlePromptTemplate?: string | undefined;
            summarize?: boolean | undefined;
            summaryModel?: string | undefined;
            customOrder?: number | undefined;
        }) | undefined;
        openAI?: {
            baseURL?: string | undefined;
            streamRate?: number | undefined;
            titlePrompt?: string | undefined;
            titleModel?: string | undefined;
            titleConvo?: boolean | undefined;
            titleMethod?: "completion" | "functions" | "structured" | undefined;
            titleEndpoint?: string | undefined;
            titlePromptTemplate?: string | undefined;
        } | undefined;
        google?: {
            baseURL?: string | undefined;
            streamRate?: number | undefined;
            titlePrompt?: string | undefined;
            titleModel?: string | undefined;
            titleConvo?: boolean | undefined;
            titleMethod?: "completion" | "functions" | "structured" | undefined;
            titleEndpoint?: string | undefined;
            titlePromptTemplate?: string | undefined;
        } | undefined;
        anthropic?: {
            baseURL?: string | undefined;
            streamRate?: number | undefined;
            titlePrompt?: string | undefined;
            titleModel?: string | undefined;
            titleConvo?: boolean | undefined;
            titleMethod?: "completion" | "functions" | "structured" | undefined;
            titleEndpoint?: string | undefined;
            titlePromptTemplate?: string | undefined;
        } | undefined;
        assistants?: {
            version?: string | number | undefined;
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
            retrievalModels?: string[] | undefined;
            capabilities?: Capabilities[] | undefined;
        } | undefined;
        azureAssistants?: {
            version?: string | number | undefined;
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
            retrievalModels?: string[] | undefined;
            capabilities?: Capabilities[] | undefined;
        } | undefined;
        agents?: {
            baseURL?: string | undefined;
            streamRate?: number | undefined;
            titlePrompt?: string | undefined;
            titleModel?: string | undefined;
            titleConvo?: boolean | undefined;
            titleMethod?: "completion" | "functions" | "structured" | undefined;
            titleEndpoint?: string | undefined;
            titlePromptTemplate?: string | undefined;
            disableBuilder?: boolean | undefined;
            capabilities?: AgentCapabilities[] | undefined;
            recursionLimit?: number | undefined;
            maxRecursionLimit?: number | undefined;
            maxCitations?: number | undefined;
            maxCitationsPerFile?: number | undefined;
            minRelevanceScore?: number | undefined;
            allowedProviders?: string[] | undefined;
        } | undefined;
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
                defaultParamsEndpoint?: string | undefined;
                paramDefinitions?: Record<string, any>[] | undefined;
            } | undefined;
            customOrder?: number | undefined;
            directEndpoint?: boolean | undefined;
            titleMessageRole?: string | undefined;
        }[] | undefined;
        bedrock?: {
            baseURL?: string | undefined;
            streamRate?: number | undefined;
            titlePrompt?: string | undefined;
            titleModel?: string | undefined;
            titleConvo?: boolean | undefined;
            titleMethod?: "completion" | "functions" | "structured" | undefined;
            titleEndpoint?: string | undefined;
            titlePromptTemplate?: string | undefined;
        } | undefined;
        gptPlugins?: {
            baseURL?: string | undefined;
            streamRate?: number | undefined;
            titlePrompt?: string | undefined;
            titleModel?: string | undefined;
            titleConvo?: boolean | undefined;
            titleMethod?: "completion" | "functions" | "structured" | undefined;
            titleEndpoint?: string | undefined;
            titlePromptTemplate?: string | undefined;
        } | undefined;
        all?: {
            baseURL?: string | undefined;
            streamRate?: number | undefined;
            titlePrompt?: string | undefined;
            titleModel?: string | undefined;
            titleConvo?: boolean | undefined;
            titleMethod?: "completion" | "functions" | "structured" | undefined;
            titleEndpoint?: string | undefined;
            titlePromptTemplate?: string | undefined;
        } | undefined;
    } | undefined;
    fileConfig?: {
        text?: {
            supportedMimeTypes?: any[] | undefined;
        } | undefined;
        ocr?: {
            supportedMimeTypes?: any[] | undefined;
        } | undefined;
        endpoints?: Record<string, {
            disabled?: boolean | undefined;
            fileLimit?: number | undefined;
            fileSizeLimit?: number | undefined;
            totalSizeLimit?: number | undefined;
            supportedMimeTypes?: any[] | undefined;
        }> | undefined;
        serverFileSizeLimit?: number | undefined;
        avatarSizeLimit?: number | undefined;
        fileTokenLimit?: number | undefined;
        imageGeneration?: {
            percentage?: number | undefined;
            px?: number | undefined;
        } | undefined;
        clientImageResize?: {
            enabled?: boolean | undefined;
            maxWidth?: number | undefined;
            maxHeight?: number | undefined;
            quality?: number | undefined;
        } | undefined;
    } | undefined;
    modelSpecs?: {
        list: {
            name: string;
            label: string;
            preset: {
                endpoint: string | null;
                conversationId?: string | null | undefined;
                title?: string | null | undefined;
                iconURL?: string | null | undefined;
                greeting?: string | undefined;
                endpointType?: EModelEndpoint | null | undefined;
                expiredAt?: string | null | undefined;
                messages?: string[] | undefined;
                isArchived?: boolean | undefined;
                tags?: string[] | undefined;
                user?: string | undefined;
                tools?: string[] | {
                    name: string;
                    pluginKey: string;
                    description?: string | undefined;
                    chatMenu?: boolean | undefined;
                    icon?: string | undefined;
                    authConfig?: {
                        description: string;
                        label: string;
                        authField: string;
                    }[] | undefined;
                    authenticated?: boolean | undefined;
                    isButton?: boolean | undefined;
                    toolkit?: boolean | undefined;
                }[] | undefined;
                model?: string | null | undefined;
                spec?: string | null | undefined;
                instructions?: string | undefined;
                fileTokenLimit?: string | number | undefined;
                modelLabel?: string | null | undefined;
                userLabel?: string | undefined;
                promptPrefix?: string | null | undefined;
                temperature?: number | null | undefined;
                topP?: number | undefined;
                topK?: number | undefined;
                top_p?: number | undefined;
                frequency_penalty?: number | undefined;
                presence_penalty?: number | undefined;
                parentMessageId?: string | undefined;
                maxOutputTokens?: string | number | null | undefined;
                maxContextTokens?: string | number | undefined;
                max_tokens?: string | number | undefined;
                promptCache?: boolean | undefined;
                system?: string | undefined;
                thinking?: boolean | undefined;
                thinkingBudget?: string | number | undefined;
                stream?: boolean | undefined;
                artifacts?: string | undefined;
                context?: string | null | undefined;
                examples?: {
                    input: {
                        content: string;
                    };
                    output: {
                        content: string;
                    };
                }[] | undefined;
                resendFiles?: boolean | undefined;
                file_ids?: string[] | undefined;
                imageDetail?: import("./schemas").ImageDetail | undefined;
                reasoning_effort?: import("./schemas").ReasoningEffort | null | undefined;
                reasoning_summary?: import("./schemas").ReasoningSummary | null | undefined;
                verbosity?: import("./schemas").Verbosity | null | undefined;
                useResponsesApi?: boolean | undefined;
                web_search?: boolean | undefined;
                disableStreaming?: boolean | undefined;
                assistant_id?: string | undefined;
                agent_id?: string | undefined;
                region?: string | undefined;
                maxTokens?: string | number | undefined;
                additionalModelRequestFields?: (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | {
                    [key: string]: string | number | boolean | any | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | any | any | null)[] | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
                } | null) | undefined;
                additional_instructions?: string | undefined;
                append_current_datetime?: boolean | undefined;
                presetOverride?: Record<string, unknown> | undefined;
                stop?: string[] | undefined;
                resendImages?: boolean | undefined;
                agentOptions?: {
                    model: string;
                    agent?: string | undefined;
                    temperature?: number | undefined;
                    skipCompletion?: boolean | undefined;
                } | null | undefined;
                chatGptLabel?: string | null | undefined;
                presetId?: string | null | undefined;
                defaultPreset?: boolean | undefined;
                order?: number | undefined;
            };
            iconURL?: string | undefined;
            default?: boolean | undefined;
            description?: string | undefined;
            webSearch?: boolean | undefined;
            mcpServers?: string[] | undefined;
            fileSearch?: boolean | undefined;
            order?: number | undefined;
            group?: string | undefined;
            showIconInMenu?: boolean | undefined;
            showIconInHeader?: boolean | undefined;
            authType?: import("./schemas").AuthType | undefined;
            executeCode?: boolean | undefined;
        }[];
        enforce?: boolean | undefined;
        prioritize?: boolean | undefined;
        addedEndpoints?: string[] | undefined;
    } | undefined;
}>;
/**
 * Recursively makes all properties of T optional, including nested objects.
 * Handles arrays, primitives, functions, and Date objects correctly.
 */
export type DeepPartial<T> = T extends (infer U)[] ? DeepPartial<U>[] : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends Function ? T : T extends Date ? T : T extends object ? {
    [P in keyof T]?: DeepPartial<T[P]>;
} : T;
export declare const getConfigDefaults: () => ExtractDefaults<{
    version: z.ZodString;
    cache: z.ZodDefault<z.ZodBoolean>;
    ocr: z.ZodOptional<z.ZodObject<{
        mistralModel: z.ZodOptional<z.ZodString>;
        apiKey: z.ZodDefault<z.ZodOptional<z.ZodString>>;
        baseURL: z.ZodDefault<z.ZodOptional<z.ZodString>>;
        strategy: z.ZodDefault<z.ZodNativeEnum<typeof OCRStrategy>>;
    }, "strip", z.ZodTypeAny, {
        apiKey: string;
        baseURL: string;
        strategy: OCRStrategy;
        mistralModel?: string | undefined;
    }, {
        mistralModel?: string | undefined;
        apiKey?: string | undefined;
        baseURL?: string | undefined;
        strategy?: OCRStrategy | undefined;
    }>>;
    webSearch: z.ZodOptional<z.ZodObject<{
        serperApiKey: z.ZodDefault<z.ZodOptional<z.ZodString>>;
        searxngInstanceUrl: z.ZodDefault<z.ZodOptional<z.ZodString>>;
        searxngApiKey: z.ZodDefault<z.ZodOptional<z.ZodString>>;
        firecrawlApiKey: z.ZodDefault<z.ZodOptional<z.ZodString>>;
        firecrawlApiUrl: z.ZodDefault<z.ZodOptional<z.ZodString>>;
        firecrawlVersion: z.ZodDefault<z.ZodOptional<z.ZodString>>;
        jinaApiKey: z.ZodDefault<z.ZodOptional<z.ZodString>>;
        jinaApiUrl: z.ZodDefault<z.ZodOptional<z.ZodString>>;
        cohereApiKey: z.ZodDefault<z.ZodOptional<z.ZodString>>;
        searchProvider: z.ZodOptional<z.ZodNativeEnum<typeof SearchProviders>>;
        scraperProvider: z.ZodOptional<z.ZodNativeEnum<typeof ScraperProviders>>;
        rerankerType: z.ZodOptional<z.ZodNativeEnum<typeof RerankerTypes>>;
        scraperTimeout: z.ZodOptional<z.ZodNumber>;
        safeSearch: z.ZodDefault<z.ZodNativeEnum<typeof SafeSearchTypes>>;
        firecrawlOptions: z.ZodOptional<z.ZodObject<{
            formats: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            includeTags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            excludeTags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            headers: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
            waitFor: z.ZodOptional<z.ZodNumber>;
            timeout: z.ZodOptional<z.ZodNumber>;
            maxAge: z.ZodOptional<z.ZodNumber>;
            mobile: z.ZodOptional<z.ZodBoolean>;
            skipTlsVerification: z.ZodOptional<z.ZodBoolean>;
            blockAds: z.ZodOptional<z.ZodBoolean>;
            removeBase64Images: z.ZodOptional<z.ZodBoolean>;
            parsePDF: z.ZodOptional<z.ZodBoolean>;
            storeInCache: z.ZodOptional<z.ZodBoolean>;
            zeroDataRetention: z.ZodOptional<z.ZodBoolean>;
            location: z.ZodOptional<z.ZodObject<{
                country: z.ZodOptional<z.ZodString>;
                languages: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            }, "strip", z.ZodTypeAny, {
                country?: string | undefined;
                languages?: string[] | undefined;
            }, {
                country?: string | undefined;
                languages?: string[] | undefined;
            }>>;
            onlyMainContent: z.ZodOptional<z.ZodBoolean>;
            changeTrackingOptions: z.ZodOptional<z.ZodObject<{
                modes: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                schema: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
                prompt: z.ZodOptional<z.ZodString>;
                tag: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            }, "strip", z.ZodTypeAny, {
                modes?: string[] | undefined;
                schema?: Record<string, unknown> | undefined;
                prompt?: string | undefined;
                tag?: string | null | undefined;
            }, {
                modes?: string[] | undefined;
                schema?: Record<string, unknown> | undefined;
                prompt?: string | undefined;
                tag?: string | null | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            formats?: string[] | undefined;
            includeTags?: string[] | undefined;
            excludeTags?: string[] | undefined;
            headers?: Record<string, string> | undefined;
            waitFor?: number | undefined;
            timeout?: number | undefined;
            maxAge?: number | undefined;
            mobile?: boolean | undefined;
            skipTlsVerification?: boolean | undefined;
            blockAds?: boolean | undefined;
            removeBase64Images?: boolean | undefined;
            parsePDF?: boolean | undefined;
            storeInCache?: boolean | undefined;
            zeroDataRetention?: boolean | undefined;
            location?: {
                country?: string | undefined;
                languages?: string[] | undefined;
            } | undefined;
            onlyMainContent?: boolean | undefined;
            changeTrackingOptions?: {
                modes?: string[] | undefined;
                schema?: Record<string, unknown> | undefined;
                prompt?: string | undefined;
                tag?: string | null | undefined;
            } | undefined;
        }, {
            formats?: string[] | undefined;
            includeTags?: string[] | undefined;
            excludeTags?: string[] | undefined;
            headers?: Record<string, string> | undefined;
            waitFor?: number | undefined;
            timeout?: number | undefined;
            maxAge?: number | undefined;
            mobile?: boolean | undefined;
            skipTlsVerification?: boolean | undefined;
            blockAds?: boolean | undefined;
            removeBase64Images?: boolean | undefined;
            parsePDF?: boolean | undefined;
            storeInCache?: boolean | undefined;
            zeroDataRetention?: boolean | undefined;
            location?: {
                country?: string | undefined;
                languages?: string[] | undefined;
            } | undefined;
            onlyMainContent?: boolean | undefined;
            changeTrackingOptions?: {
                modes?: string[] | undefined;
                schema?: Record<string, unknown> | undefined;
                prompt?: string | undefined;
                tag?: string | null | undefined;
            } | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        serperApiKey: string;
        searxngInstanceUrl: string;
        searxngApiKey: string;
        firecrawlApiKey: string;
        firecrawlApiUrl: string;
        firecrawlVersion: string;
        jinaApiKey: string;
        jinaApiUrl: string;
        cohereApiKey: string;
        safeSearch: SafeSearchTypes;
        searchProvider?: SearchProviders | undefined;
        scraperProvider?: ScraperProviders | undefined;
        rerankerType?: RerankerTypes | undefined;
        scraperTimeout?: number | undefined;
        firecrawlOptions?: {
            formats?: string[] | undefined;
            includeTags?: string[] | undefined;
            excludeTags?: string[] | undefined;
            headers?: Record<string, string> | undefined;
            waitFor?: number | undefined;
            timeout?: number | undefined;
            maxAge?: number | undefined;
            mobile?: boolean | undefined;
            skipTlsVerification?: boolean | undefined;
            blockAds?: boolean | undefined;
            removeBase64Images?: boolean | undefined;
            parsePDF?: boolean | undefined;
            storeInCache?: boolean | undefined;
            zeroDataRetention?: boolean | undefined;
            location?: {
                country?: string | undefined;
                languages?: string[] | undefined;
            } | undefined;
            onlyMainContent?: boolean | undefined;
            changeTrackingOptions?: {
                modes?: string[] | undefined;
                schema?: Record<string, unknown> | undefined;
                prompt?: string | undefined;
                tag?: string | null | undefined;
            } | undefined;
        } | undefined;
    }, {
        serperApiKey?: string | undefined;
        searxngInstanceUrl?: string | undefined;
        searxngApiKey?: string | undefined;
        firecrawlApiKey?: string | undefined;
        firecrawlApiUrl?: string | undefined;
        firecrawlVersion?: string | undefined;
        jinaApiKey?: string | undefined;
        jinaApiUrl?: string | undefined;
        cohereApiKey?: string | undefined;
        searchProvider?: SearchProviders | undefined;
        scraperProvider?: ScraperProviders | undefined;
        rerankerType?: RerankerTypes | undefined;
        scraperTimeout?: number | undefined;
        safeSearch?: SafeSearchTypes | undefined;
        firecrawlOptions?: {
            formats?: string[] | undefined;
            includeTags?: string[] | undefined;
            excludeTags?: string[] | undefined;
            headers?: Record<string, string> | undefined;
            waitFor?: number | undefined;
            timeout?: number | undefined;
            maxAge?: number | undefined;
            mobile?: boolean | undefined;
            skipTlsVerification?: boolean | undefined;
            blockAds?: boolean | undefined;
            removeBase64Images?: boolean | undefined;
            parsePDF?: boolean | undefined;
            storeInCache?: boolean | undefined;
            zeroDataRetention?: boolean | undefined;
            location?: {
                country?: string | undefined;
                languages?: string[] | undefined;
            } | undefined;
            onlyMainContent?: boolean | undefined;
            changeTrackingOptions?: {
                modes?: string[] | undefined;
                schema?: Record<string, unknown> | undefined;
                prompt?: string | undefined;
                tag?: string | null | undefined;
            } | undefined;
        } | undefined;
    }>>;
    memory: z.ZodOptional<z.ZodObject<{
        disabled: z.ZodOptional<z.ZodBoolean>;
        validKeys: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        tokenLimit: z.ZodOptional<z.ZodNumber>;
        charLimit: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
        personalize: z.ZodDefault<z.ZodBoolean>;
        messageWindowSize: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
        agent: z.ZodOptional<z.ZodUnion<[z.ZodObject<{
            id: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            id: string;
        }, {
            id: string;
        }>, z.ZodObject<{
            provider: z.ZodString;
            model: z.ZodString;
            instructions: z.ZodOptional<z.ZodString>;
            model_parameters: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
        }, "strip", z.ZodTypeAny, {
            model: string;
            provider: string;
            instructions?: string | undefined;
            model_parameters?: Record<string, any> | undefined;
        }, {
            model: string;
            provider: string;
            instructions?: string | undefined;
            model_parameters?: Record<string, any> | undefined;
        }>]>>;
    }, "strip", z.ZodTypeAny, {
        charLimit: number;
        personalize: boolean;
        messageWindowSize: number;
        disabled?: boolean | undefined;
        validKeys?: string[] | undefined;
        tokenLimit?: number | undefined;
        agent?: {
            id: string;
        } | {
            model: string;
            provider: string;
            instructions?: string | undefined;
            model_parameters?: Record<string, any> | undefined;
        } | undefined;
    }, {
        disabled?: boolean | undefined;
        validKeys?: string[] | undefined;
        tokenLimit?: number | undefined;
        charLimit?: number | undefined;
        personalize?: boolean | undefined;
        messageWindowSize?: number | undefined;
        agent?: {
            id: string;
        } | {
            model: string;
            provider: string;
            instructions?: string | undefined;
            model_parameters?: Record<string, any> | undefined;
        } | undefined;
    }>>;
    secureImageLinks: z.ZodOptional<z.ZodBoolean>;
    imageOutputType: z.ZodDefault<z.ZodNativeEnum<typeof EImageOutputType>>;
    includedTools: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    filteredTools: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    mcpServers: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodObject<{
        startup: z.ZodOptional<z.ZodBoolean>;
        iconPath: z.ZodOptional<z.ZodString>;
        timeout: z.ZodOptional<z.ZodNumber>;
        initTimeout: z.ZodOptional<z.ZodNumber>;
        chatMenu: z.ZodOptional<z.ZodBoolean>;
        serverInstructions: z.ZodOptional<z.ZodUnion<[z.ZodBoolean, z.ZodString]>>;
        requiresOAuth: z.ZodOptional<z.ZodBoolean>;
        oauth: z.ZodOptional<z.ZodObject<{
            authorization_url: z.ZodOptional<z.ZodString>;
            token_url: z.ZodOptional<z.ZodString>;
            client_id: z.ZodOptional<z.ZodString>;
            client_secret: z.ZodOptional<z.ZodString>;
            scope: z.ZodOptional<z.ZodString>;
            redirect_uri: z.ZodOptional<z.ZodString>;
            token_exchange_method: z.ZodOptional<z.ZodNativeEnum<typeof import(".").TokenExchangeMethodEnum>>;
            grant_types_supported: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            token_endpoint_auth_methods_supported: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            response_types_supported: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            code_challenge_methods_supported: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            revocation_endpoint: z.ZodOptional<z.ZodString>;
            revocation_endpoint_auth_methods_supported: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        }, "strip", z.ZodTypeAny, {
            authorization_url?: string | undefined;
            token_url?: string | undefined;
            client_id?: string | undefined;
            client_secret?: string | undefined;
            scope?: string | undefined;
            redirect_uri?: string | undefined;
            token_exchange_method?: import(".").TokenExchangeMethodEnum | undefined;
            grant_types_supported?: string[] | undefined;
            token_endpoint_auth_methods_supported?: string[] | undefined;
            response_types_supported?: string[] | undefined;
            code_challenge_methods_supported?: string[] | undefined;
            revocation_endpoint?: string | undefined;
            revocation_endpoint_auth_methods_supported?: string[] | undefined;
        }, {
            authorization_url?: string | undefined;
            token_url?: string | undefined;
            client_id?: string | undefined;
            client_secret?: string | undefined;
            scope?: string | undefined;
            redirect_uri?: string | undefined;
            token_exchange_method?: import(".").TokenExchangeMethodEnum | undefined;
            grant_types_supported?: string[] | undefined;
            token_endpoint_auth_methods_supported?: string[] | undefined;
            response_types_supported?: string[] | undefined;
            code_challenge_methods_supported?: string[] | undefined;
            revocation_endpoint?: string | undefined;
            revocation_endpoint_auth_methods_supported?: string[] | undefined;
        }>>;
        oauth_headers: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        customUserVars: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
            title: z.ZodString;
            description: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            title: string;
            description: string;
        }, {
            title: string;
            description: string;
        }>>>;
    } & {
        type: z.ZodOptional<z.ZodLiteral<"stdio">>;
        command: z.ZodString;
        args: z.ZodArray<z.ZodString, "many">;
        env: z.ZodEffects<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>, Record<string, string> | undefined, Record<string, string> | undefined>;
        stderr: z.ZodOptional<z.ZodAny>;
    }, "strip", z.ZodTypeAny, {
        command: string;
        args: string[];
        type?: "stdio" | undefined;
        timeout?: number | undefined;
        startup?: boolean | undefined;
        iconPath?: string | undefined;
        initTimeout?: number | undefined;
        chatMenu?: boolean | undefined;
        serverInstructions?: string | boolean | undefined;
        requiresOAuth?: boolean | undefined;
        oauth?: {
            authorization_url?: string | undefined;
            token_url?: string | undefined;
            client_id?: string | undefined;
            client_secret?: string | undefined;
            scope?: string | undefined;
            redirect_uri?: string | undefined;
            token_exchange_method?: import(".").TokenExchangeMethodEnum | undefined;
            grant_types_supported?: string[] | undefined;
            token_endpoint_auth_methods_supported?: string[] | undefined;
            response_types_supported?: string[] | undefined;
            code_challenge_methods_supported?: string[] | undefined;
            revocation_endpoint?: string | undefined;
            revocation_endpoint_auth_methods_supported?: string[] | undefined;
        } | undefined;
        oauth_headers?: Record<string, string> | undefined;
        customUserVars?: Record<string, {
            title: string;
            description: string;
        }> | undefined;
        env?: Record<string, string> | undefined;
        stderr?: any;
    }, {
        command: string;
        args: string[];
        type?: "stdio" | undefined;
        timeout?: number | undefined;
        startup?: boolean | undefined;
        iconPath?: string | undefined;
        initTimeout?: number | undefined;
        chatMenu?: boolean | undefined;
        serverInstructions?: string | boolean | undefined;
        requiresOAuth?: boolean | undefined;
        oauth?: {
            authorization_url?: string | undefined;
            token_url?: string | undefined;
            client_id?: string | undefined;
            client_secret?: string | undefined;
            scope?: string | undefined;
            redirect_uri?: string | undefined;
            token_exchange_method?: import(".").TokenExchangeMethodEnum | undefined;
            grant_types_supported?: string[] | undefined;
            token_endpoint_auth_methods_supported?: string[] | undefined;
            response_types_supported?: string[] | undefined;
            code_challenge_methods_supported?: string[] | undefined;
            revocation_endpoint?: string | undefined;
            revocation_endpoint_auth_methods_supported?: string[] | undefined;
        } | undefined;
        oauth_headers?: Record<string, string> | undefined;
        customUserVars?: Record<string, {
            title: string;
            description: string;
        }> | undefined;
        env?: Record<string, string> | undefined;
        stderr?: any;
    }>, z.ZodObject<{
        startup: z.ZodOptional<z.ZodBoolean>;
        iconPath: z.ZodOptional<z.ZodString>;
        timeout: z.ZodOptional<z.ZodNumber>;
        initTimeout: z.ZodOptional<z.ZodNumber>;
        chatMenu: z.ZodOptional<z.ZodBoolean>;
        serverInstructions: z.ZodOptional<z.ZodUnion<[z.ZodBoolean, z.ZodString]>>;
        requiresOAuth: z.ZodOptional<z.ZodBoolean>;
        oauth: z.ZodOptional<z.ZodObject<{
            authorization_url: z.ZodOptional<z.ZodString>;
            token_url: z.ZodOptional<z.ZodString>;
            client_id: z.ZodOptional<z.ZodString>;
            client_secret: z.ZodOptional<z.ZodString>;
            scope: z.ZodOptional<z.ZodString>;
            redirect_uri: z.ZodOptional<z.ZodString>;
            token_exchange_method: z.ZodOptional<z.ZodNativeEnum<typeof import(".").TokenExchangeMethodEnum>>;
            grant_types_supported: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            token_endpoint_auth_methods_supported: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            response_types_supported: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            code_challenge_methods_supported: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            revocation_endpoint: z.ZodOptional<z.ZodString>;
            revocation_endpoint_auth_methods_supported: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        }, "strip", z.ZodTypeAny, {
            authorization_url?: string | undefined;
            token_url?: string | undefined;
            client_id?: string | undefined;
            client_secret?: string | undefined;
            scope?: string | undefined;
            redirect_uri?: string | undefined;
            token_exchange_method?: import(".").TokenExchangeMethodEnum | undefined;
            grant_types_supported?: string[] | undefined;
            token_endpoint_auth_methods_supported?: string[] | undefined;
            response_types_supported?: string[] | undefined;
            code_challenge_methods_supported?: string[] | undefined;
            revocation_endpoint?: string | undefined;
            revocation_endpoint_auth_methods_supported?: string[] | undefined;
        }, {
            authorization_url?: string | undefined;
            token_url?: string | undefined;
            client_id?: string | undefined;
            client_secret?: string | undefined;
            scope?: string | undefined;
            redirect_uri?: string | undefined;
            token_exchange_method?: import(".").TokenExchangeMethodEnum | undefined;
            grant_types_supported?: string[] | undefined;
            token_endpoint_auth_methods_supported?: string[] | undefined;
            response_types_supported?: string[] | undefined;
            code_challenge_methods_supported?: string[] | undefined;
            revocation_endpoint?: string | undefined;
            revocation_endpoint_auth_methods_supported?: string[] | undefined;
        }>>;
        oauth_headers: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        customUserVars: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
            title: z.ZodString;
            description: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            title: string;
            description: string;
        }, {
            title: string;
            description: string;
        }>>>;
    } & {
        type: z.ZodOptional<z.ZodLiteral<"websocket">>;
        url: z.ZodEffects<z.ZodPipeline<z.ZodEffects<z.ZodString, string, string>, z.ZodString>, string, string>;
    }, "strip", z.ZodTypeAny, {
        url: string;
        type?: "websocket" | undefined;
        timeout?: number | undefined;
        startup?: boolean | undefined;
        iconPath?: string | undefined;
        initTimeout?: number | undefined;
        chatMenu?: boolean | undefined;
        serverInstructions?: string | boolean | undefined;
        requiresOAuth?: boolean | undefined;
        oauth?: {
            authorization_url?: string | undefined;
            token_url?: string | undefined;
            client_id?: string | undefined;
            client_secret?: string | undefined;
            scope?: string | undefined;
            redirect_uri?: string | undefined;
            token_exchange_method?: import(".").TokenExchangeMethodEnum | undefined;
            grant_types_supported?: string[] | undefined;
            token_endpoint_auth_methods_supported?: string[] | undefined;
            response_types_supported?: string[] | undefined;
            code_challenge_methods_supported?: string[] | undefined;
            revocation_endpoint?: string | undefined;
            revocation_endpoint_auth_methods_supported?: string[] | undefined;
        } | undefined;
        oauth_headers?: Record<string, string> | undefined;
        customUserVars?: Record<string, {
            title: string;
            description: string;
        }> | undefined;
    }, {
        url: string;
        type?: "websocket" | undefined;
        timeout?: number | undefined;
        startup?: boolean | undefined;
        iconPath?: string | undefined;
        initTimeout?: number | undefined;
        chatMenu?: boolean | undefined;
        serverInstructions?: string | boolean | undefined;
        requiresOAuth?: boolean | undefined;
        oauth?: {
            authorization_url?: string | undefined;
            token_url?: string | undefined;
            client_id?: string | undefined;
            client_secret?: string | undefined;
            scope?: string | undefined;
            redirect_uri?: string | undefined;
            token_exchange_method?: import(".").TokenExchangeMethodEnum | undefined;
            grant_types_supported?: string[] | undefined;
            token_endpoint_auth_methods_supported?: string[] | undefined;
            response_types_supported?: string[] | undefined;
            code_challenge_methods_supported?: string[] | undefined;
            revocation_endpoint?: string | undefined;
            revocation_endpoint_auth_methods_supported?: string[] | undefined;
        } | undefined;
        oauth_headers?: Record<string, string> | undefined;
        customUserVars?: Record<string, {
            title: string;
            description: string;
        }> | undefined;
    }>, z.ZodObject<{
        startup: z.ZodOptional<z.ZodBoolean>;
        iconPath: z.ZodOptional<z.ZodString>;
        timeout: z.ZodOptional<z.ZodNumber>;
        initTimeout: z.ZodOptional<z.ZodNumber>;
        chatMenu: z.ZodOptional<z.ZodBoolean>;
        serverInstructions: z.ZodOptional<z.ZodUnion<[z.ZodBoolean, z.ZodString]>>;
        requiresOAuth: z.ZodOptional<z.ZodBoolean>;
        oauth: z.ZodOptional<z.ZodObject<{
            authorization_url: z.ZodOptional<z.ZodString>;
            token_url: z.ZodOptional<z.ZodString>;
            client_id: z.ZodOptional<z.ZodString>;
            client_secret: z.ZodOptional<z.ZodString>;
            scope: z.ZodOptional<z.ZodString>;
            redirect_uri: z.ZodOptional<z.ZodString>;
            token_exchange_method: z.ZodOptional<z.ZodNativeEnum<typeof import(".").TokenExchangeMethodEnum>>;
            grant_types_supported: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            token_endpoint_auth_methods_supported: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            response_types_supported: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            code_challenge_methods_supported: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            revocation_endpoint: z.ZodOptional<z.ZodString>;
            revocation_endpoint_auth_methods_supported: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        }, "strip", z.ZodTypeAny, {
            authorization_url?: string | undefined;
            token_url?: string | undefined;
            client_id?: string | undefined;
            client_secret?: string | undefined;
            scope?: string | undefined;
            redirect_uri?: string | undefined;
            token_exchange_method?: import(".").TokenExchangeMethodEnum | undefined;
            grant_types_supported?: string[] | undefined;
            token_endpoint_auth_methods_supported?: string[] | undefined;
            response_types_supported?: string[] | undefined;
            code_challenge_methods_supported?: string[] | undefined;
            revocation_endpoint?: string | undefined;
            revocation_endpoint_auth_methods_supported?: string[] | undefined;
        }, {
            authorization_url?: string | undefined;
            token_url?: string | undefined;
            client_id?: string | undefined;
            client_secret?: string | undefined;
            scope?: string | undefined;
            redirect_uri?: string | undefined;
            token_exchange_method?: import(".").TokenExchangeMethodEnum | undefined;
            grant_types_supported?: string[] | undefined;
            token_endpoint_auth_methods_supported?: string[] | undefined;
            response_types_supported?: string[] | undefined;
            code_challenge_methods_supported?: string[] | undefined;
            revocation_endpoint?: string | undefined;
            revocation_endpoint_auth_methods_supported?: string[] | undefined;
        }>>;
        oauth_headers: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        customUserVars: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
            title: z.ZodString;
            description: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            title: string;
            description: string;
        }, {
            title: string;
            description: string;
        }>>>;
    } & {
        type: z.ZodOptional<z.ZodLiteral<"sse">>;
        headers: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        url: z.ZodEffects<z.ZodPipeline<z.ZodEffects<z.ZodString, string, string>, z.ZodString>, string, string>;
    }, "strip", z.ZodTypeAny, {
        url: string;
        type?: "sse" | undefined;
        headers?: Record<string, string> | undefined;
        timeout?: number | undefined;
        startup?: boolean | undefined;
        iconPath?: string | undefined;
        initTimeout?: number | undefined;
        chatMenu?: boolean | undefined;
        serverInstructions?: string | boolean | undefined;
        requiresOAuth?: boolean | undefined;
        oauth?: {
            authorization_url?: string | undefined;
            token_url?: string | undefined;
            client_id?: string | undefined;
            client_secret?: string | undefined;
            scope?: string | undefined;
            redirect_uri?: string | undefined;
            token_exchange_method?: import(".").TokenExchangeMethodEnum | undefined;
            grant_types_supported?: string[] | undefined;
            token_endpoint_auth_methods_supported?: string[] | undefined;
            response_types_supported?: string[] | undefined;
            code_challenge_methods_supported?: string[] | undefined;
            revocation_endpoint?: string | undefined;
            revocation_endpoint_auth_methods_supported?: string[] | undefined;
        } | undefined;
        oauth_headers?: Record<string, string> | undefined;
        customUserVars?: Record<string, {
            title: string;
            description: string;
        }> | undefined;
    }, {
        url: string;
        type?: "sse" | undefined;
        headers?: Record<string, string> | undefined;
        timeout?: number | undefined;
        startup?: boolean | undefined;
        iconPath?: string | undefined;
        initTimeout?: number | undefined;
        chatMenu?: boolean | undefined;
        serverInstructions?: string | boolean | undefined;
        requiresOAuth?: boolean | undefined;
        oauth?: {
            authorization_url?: string | undefined;
            token_url?: string | undefined;
            client_id?: string | undefined;
            client_secret?: string | undefined;
            scope?: string | undefined;
            redirect_uri?: string | undefined;
            token_exchange_method?: import(".").TokenExchangeMethodEnum | undefined;
            grant_types_supported?: string[] | undefined;
            token_endpoint_auth_methods_supported?: string[] | undefined;
            response_types_supported?: string[] | undefined;
            code_challenge_methods_supported?: string[] | undefined;
            revocation_endpoint?: string | undefined;
            revocation_endpoint_auth_methods_supported?: string[] | undefined;
        } | undefined;
        oauth_headers?: Record<string, string> | undefined;
        customUserVars?: Record<string, {
            title: string;
            description: string;
        }> | undefined;
    }>, z.ZodObject<{
        startup: z.ZodOptional<z.ZodBoolean>;
        iconPath: z.ZodOptional<z.ZodString>;
        timeout: z.ZodOptional<z.ZodNumber>;
        initTimeout: z.ZodOptional<z.ZodNumber>;
        chatMenu: z.ZodOptional<z.ZodBoolean>;
        serverInstructions: z.ZodOptional<z.ZodUnion<[z.ZodBoolean, z.ZodString]>>;
        requiresOAuth: z.ZodOptional<z.ZodBoolean>;
        oauth: z.ZodOptional<z.ZodObject<{
            authorization_url: z.ZodOptional<z.ZodString>;
            token_url: z.ZodOptional<z.ZodString>;
            client_id: z.ZodOptional<z.ZodString>;
            client_secret: z.ZodOptional<z.ZodString>;
            scope: z.ZodOptional<z.ZodString>;
            redirect_uri: z.ZodOptional<z.ZodString>;
            token_exchange_method: z.ZodOptional<z.ZodNativeEnum<typeof import(".").TokenExchangeMethodEnum>>;
            grant_types_supported: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            token_endpoint_auth_methods_supported: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            response_types_supported: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            code_challenge_methods_supported: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            revocation_endpoint: z.ZodOptional<z.ZodString>;
            revocation_endpoint_auth_methods_supported: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        }, "strip", z.ZodTypeAny, {
            authorization_url?: string | undefined;
            token_url?: string | undefined;
            client_id?: string | undefined;
            client_secret?: string | undefined;
            scope?: string | undefined;
            redirect_uri?: string | undefined;
            token_exchange_method?: import(".").TokenExchangeMethodEnum | undefined;
            grant_types_supported?: string[] | undefined;
            token_endpoint_auth_methods_supported?: string[] | undefined;
            response_types_supported?: string[] | undefined;
            code_challenge_methods_supported?: string[] | undefined;
            revocation_endpoint?: string | undefined;
            revocation_endpoint_auth_methods_supported?: string[] | undefined;
        }, {
            authorization_url?: string | undefined;
            token_url?: string | undefined;
            client_id?: string | undefined;
            client_secret?: string | undefined;
            scope?: string | undefined;
            redirect_uri?: string | undefined;
            token_exchange_method?: import(".").TokenExchangeMethodEnum | undefined;
            grant_types_supported?: string[] | undefined;
            token_endpoint_auth_methods_supported?: string[] | undefined;
            response_types_supported?: string[] | undefined;
            code_challenge_methods_supported?: string[] | undefined;
            revocation_endpoint?: string | undefined;
            revocation_endpoint_auth_methods_supported?: string[] | undefined;
        }>>;
        oauth_headers: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        customUserVars: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
            title: z.ZodString;
            description: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            title: string;
            description: string;
        }, {
            title: string;
            description: string;
        }>>>;
    } & {
        type: z.ZodUnion<[z.ZodLiteral<"streamable-http">, z.ZodLiteral<"http">]>;
        headers: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        url: z.ZodEffects<z.ZodPipeline<z.ZodEffects<z.ZodString, string, string>, z.ZodString>, string, string>;
    }, "strip", z.ZodTypeAny, {
        type: "streamable-http" | "http";
        url: string;
        headers?: Record<string, string> | undefined;
        timeout?: number | undefined;
        startup?: boolean | undefined;
        iconPath?: string | undefined;
        initTimeout?: number | undefined;
        chatMenu?: boolean | undefined;
        serverInstructions?: string | boolean | undefined;
        requiresOAuth?: boolean | undefined;
        oauth?: {
            authorization_url?: string | undefined;
            token_url?: string | undefined;
            client_id?: string | undefined;
            client_secret?: string | undefined;
            scope?: string | undefined;
            redirect_uri?: string | undefined;
            token_exchange_method?: import(".").TokenExchangeMethodEnum | undefined;
            grant_types_supported?: string[] | undefined;
            token_endpoint_auth_methods_supported?: string[] | undefined;
            response_types_supported?: string[] | undefined;
            code_challenge_methods_supported?: string[] | undefined;
            revocation_endpoint?: string | undefined;
            revocation_endpoint_auth_methods_supported?: string[] | undefined;
        } | undefined;
        oauth_headers?: Record<string, string> | undefined;
        customUserVars?: Record<string, {
            title: string;
            description: string;
        }> | undefined;
    }, {
        type: "streamable-http" | "http";
        url: string;
        headers?: Record<string, string> | undefined;
        timeout?: number | undefined;
        startup?: boolean | undefined;
        iconPath?: string | undefined;
        initTimeout?: number | undefined;
        chatMenu?: boolean | undefined;
        serverInstructions?: string | boolean | undefined;
        requiresOAuth?: boolean | undefined;
        oauth?: {
            authorization_url?: string | undefined;
            token_url?: string | undefined;
            client_id?: string | undefined;
            client_secret?: string | undefined;
            scope?: string | undefined;
            redirect_uri?: string | undefined;
            token_exchange_method?: import(".").TokenExchangeMethodEnum | undefined;
            grant_types_supported?: string[] | undefined;
            token_endpoint_auth_methods_supported?: string[] | undefined;
            response_types_supported?: string[] | undefined;
            code_challenge_methods_supported?: string[] | undefined;
            revocation_endpoint?: string | undefined;
            revocation_endpoint_auth_methods_supported?: string[] | undefined;
        } | undefined;
        oauth_headers?: Record<string, string> | undefined;
        customUserVars?: Record<string, {
            title: string;
            description: string;
        }> | undefined;
    }>]>>>;
    interface: z.ZodDefault<z.ZodObject<{
        privacyPolicy: z.ZodOptional<z.ZodObject<{
            externalUrl: z.ZodOptional<z.ZodString>;
            openNewTab: z.ZodOptional<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            externalUrl?: string | undefined;
            openNewTab?: boolean | undefined;
        }, {
            externalUrl?: string | undefined;
            openNewTab?: boolean | undefined;
        }>>;
        termsOfService: z.ZodOptional<z.ZodObject<{
            externalUrl: z.ZodOptional<z.ZodString>;
            openNewTab: z.ZodOptional<z.ZodBoolean>;
            modalAcceptance: z.ZodOptional<z.ZodBoolean>;
            modalTitle: z.ZodOptional<z.ZodString>;
            modalContent: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        }, "strip", z.ZodTypeAny, {
            externalUrl?: string | undefined;
            openNewTab?: boolean | undefined;
            modalAcceptance?: boolean | undefined;
            modalTitle?: string | undefined;
            modalContent?: string | string[] | undefined;
        }, {
            externalUrl?: string | undefined;
            openNewTab?: boolean | undefined;
            modalAcceptance?: boolean | undefined;
            modalTitle?: string | undefined;
            modalContent?: string | string[] | undefined;
        }>>;
        customWelcome: z.ZodOptional<z.ZodString>;
        mcpServers: z.ZodOptional<z.ZodObject<{
            placeholder: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            placeholder?: string | undefined;
        }, {
            placeholder?: string | undefined;
        }>>;
        endpointsMenu: z.ZodOptional<z.ZodBoolean>;
        modelSelect: z.ZodOptional<z.ZodBoolean>;
        parameters: z.ZodOptional<z.ZodBoolean>;
        sidePanel: z.ZodOptional<z.ZodBoolean>;
        multiConvo: z.ZodOptional<z.ZodBoolean>;
        bookmarks: z.ZodOptional<z.ZodBoolean>;
        memories: z.ZodOptional<z.ZodBoolean>;
        presets: z.ZodOptional<z.ZodBoolean>;
        prompts: z.ZodOptional<z.ZodBoolean>;
        agents: z.ZodOptional<z.ZodBoolean>;
        temporaryChat: z.ZodOptional<z.ZodBoolean>;
        temporaryChatRetention: z.ZodOptional<z.ZodNumber>;
        runCode: z.ZodOptional<z.ZodBoolean>;
        webSearch: z.ZodOptional<z.ZodBoolean>;
        peoplePicker: z.ZodOptional<z.ZodObject<{
            users: z.ZodOptional<z.ZodBoolean>;
            groups: z.ZodOptional<z.ZodBoolean>;
            roles: z.ZodOptional<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            users?: boolean | undefined;
            groups?: boolean | undefined;
            roles?: boolean | undefined;
        }, {
            users?: boolean | undefined;
            groups?: boolean | undefined;
            roles?: boolean | undefined;
        }>>;
        marketplace: z.ZodOptional<z.ZodObject<{
            use: z.ZodOptional<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            use?: boolean | undefined;
        }, {
            use?: boolean | undefined;
        }>>;
        fileSearch: z.ZodOptional<z.ZodBoolean>;
        fileCitations: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        webSearch?: boolean | undefined;
        mcpServers?: {
            placeholder?: string | undefined;
        } | undefined;
        privacyPolicy?: {
            externalUrl?: string | undefined;
            openNewTab?: boolean | undefined;
        } | undefined;
        termsOfService?: {
            externalUrl?: string | undefined;
            openNewTab?: boolean | undefined;
            modalAcceptance?: boolean | undefined;
            modalTitle?: string | undefined;
            modalContent?: string | string[] | undefined;
        } | undefined;
        customWelcome?: string | undefined;
        endpointsMenu?: boolean | undefined;
        modelSelect?: boolean | undefined;
        parameters?: boolean | undefined;
        sidePanel?: boolean | undefined;
        multiConvo?: boolean | undefined;
        bookmarks?: boolean | undefined;
        memories?: boolean | undefined;
        presets?: boolean | undefined;
        prompts?: boolean | undefined;
        agents?: boolean | undefined;
        temporaryChat?: boolean | undefined;
        temporaryChatRetention?: number | undefined;
        runCode?: boolean | undefined;
        peoplePicker?: {
            users?: boolean | undefined;
            groups?: boolean | undefined;
            roles?: boolean | undefined;
        } | undefined;
        marketplace?: {
            use?: boolean | undefined;
        } | undefined;
        fileSearch?: boolean | undefined;
        fileCitations?: boolean | undefined;
    }, {
        webSearch?: boolean | undefined;
        mcpServers?: {
            placeholder?: string | undefined;
        } | undefined;
        privacyPolicy?: {
            externalUrl?: string | undefined;
            openNewTab?: boolean | undefined;
        } | undefined;
        termsOfService?: {
            externalUrl?: string | undefined;
            openNewTab?: boolean | undefined;
            modalAcceptance?: boolean | undefined;
            modalTitle?: string | undefined;
            modalContent?: string | string[] | undefined;
        } | undefined;
        customWelcome?: string | undefined;
        endpointsMenu?: boolean | undefined;
        modelSelect?: boolean | undefined;
        parameters?: boolean | undefined;
        sidePanel?: boolean | undefined;
        multiConvo?: boolean | undefined;
        bookmarks?: boolean | undefined;
        memories?: boolean | undefined;
        presets?: boolean | undefined;
        prompts?: boolean | undefined;
        agents?: boolean | undefined;
        temporaryChat?: boolean | undefined;
        temporaryChatRetention?: number | undefined;
        runCode?: boolean | undefined;
        peoplePicker?: {
            users?: boolean | undefined;
            groups?: boolean | undefined;
            roles?: boolean | undefined;
        } | undefined;
        marketplace?: {
            use?: boolean | undefined;
        } | undefined;
        fileSearch?: boolean | undefined;
        fileCitations?: boolean | undefined;
    }>>;
    turnstile: z.ZodOptional<z.ZodObject<{
        siteKey: z.ZodString;
        options: z.ZodOptional<z.ZodDefault<z.ZodObject<{
            language: z.ZodDefault<z.ZodString>;
            size: z.ZodDefault<z.ZodEnum<["normal", "compact", "flexible", "invisible"]>>;
        }, "strip", z.ZodTypeAny, {
            language: string;
            size: "normal" | "compact" | "flexible" | "invisible";
        }, {
            language?: string | undefined;
            size?: "normal" | "compact" | "flexible" | "invisible" | undefined;
        }>>>;
    }, "strip", z.ZodTypeAny, {
        siteKey: string;
        options?: {
            language: string;
            size: "normal" | "compact" | "flexible" | "invisible";
        } | undefined;
    }, {
        siteKey: string;
        options?: {
            language?: string | undefined;
            size?: "normal" | "compact" | "flexible" | "invisible" | undefined;
        } | undefined;
    }>>;
    fileStrategy: z.ZodDefault<z.ZodNativeEnum<typeof FileSources>>;
    fileStrategies: z.ZodOptional<z.ZodObject<{
        default: z.ZodOptional<z.ZodNativeEnum<typeof FileSources>>;
        avatar: z.ZodOptional<z.ZodNativeEnum<typeof FileSources>>;
        image: z.ZodOptional<z.ZodNativeEnum<typeof FileSources>>;
        document: z.ZodOptional<z.ZodNativeEnum<typeof FileSources>>;
    }, "strip", z.ZodTypeAny, {
        default?: FileSources | undefined;
        avatar?: FileSources | undefined;
        image?: FileSources | undefined;
        document?: FileSources | undefined;
    }, {
        default?: FileSources | undefined;
        avatar?: FileSources | undefined;
        image?: FileSources | undefined;
        document?: FileSources | undefined;
    }>>;
    actions: z.ZodOptional<z.ZodObject<{
        allowedDomains: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        allowedDomains?: string[] | undefined;
    }, {
        allowedDomains?: string[] | undefined;
    }>>;
    registration: z.ZodDefault<z.ZodObject<{
        socialLogins: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        allowedDomains: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        allowedDomains?: string[] | undefined;
        socialLogins?: string[] | undefined;
    }, {
        allowedDomains?: string[] | undefined;
        socialLogins?: string[] | undefined;
    }>>;
    balance: z.ZodOptional<z.ZodObject<{
        enabled: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        startBalance: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
        autoRefillEnabled: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        refillIntervalValue: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
        refillIntervalUnit: z.ZodDefault<z.ZodOptional<z.ZodEnum<["seconds", "minutes", "hours", "days", "weeks", "months"]>>>;
        refillAmount: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
    }, "strip", z.ZodTypeAny, {
        enabled: boolean;
        startBalance: number;
        autoRefillEnabled: boolean;
        refillIntervalValue: number;
        refillIntervalUnit: "seconds" | "minutes" | "hours" | "days" | "weeks" | "months";
        refillAmount: number;
    }, {
        enabled?: boolean | undefined;
        startBalance?: number | undefined;
        autoRefillEnabled?: boolean | undefined;
        refillIntervalValue?: number | undefined;
        refillIntervalUnit?: "seconds" | "minutes" | "hours" | "days" | "weeks" | "months" | undefined;
        refillAmount?: number | undefined;
    }>>;
    transactions: z.ZodOptional<z.ZodObject<{
        enabled: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    }, "strip", z.ZodTypeAny, {
        enabled: boolean;
    }, {
        enabled?: boolean | undefined;
    }>>;
    speech: z.ZodOptional<z.ZodObject<{
        tts: z.ZodOptional<z.ZodObject<{
            openai: z.ZodOptional<z.ZodObject<{
                url: z.ZodOptional<z.ZodString>;
                apiKey: z.ZodString;
                model: z.ZodString;
                voices: z.ZodArray<z.ZodString, "many">;
            }, "strip", z.ZodTypeAny, {
                model: string;
                apiKey: string;
                voices: string[];
                url?: string | undefined;
            }, {
                model: string;
                apiKey: string;
                voices: string[];
                url?: string | undefined;
            }>>;
            azureOpenAI: z.ZodOptional<z.ZodObject<{
                instanceName: z.ZodString;
                apiKey: z.ZodString;
                deploymentName: z.ZodString;
                apiVersion: z.ZodString;
                model: z.ZodString;
                voices: z.ZodArray<z.ZodString, "many">;
            }, "strip", z.ZodTypeAny, {
                model: string;
                apiKey: string;
                voices: string[];
                instanceName: string;
                deploymentName: string;
                apiVersion: string;
            }, {
                model: string;
                apiKey: string;
                voices: string[];
                instanceName: string;
                deploymentName: string;
                apiVersion: string;
            }>>;
            elevenlabs: z.ZodOptional<z.ZodObject<{
                url: z.ZodOptional<z.ZodString>;
                websocketUrl: z.ZodOptional<z.ZodString>;
                apiKey: z.ZodString;
                model: z.ZodString;
                voices: z.ZodArray<z.ZodString, "many">;
                voice_settings: z.ZodOptional<z.ZodObject<{
                    similarity_boost: z.ZodOptional<z.ZodNumber>;
                    stability: z.ZodOptional<z.ZodNumber>;
                    style: z.ZodOptional<z.ZodNumber>;
                    use_speaker_boost: z.ZodOptional<z.ZodBoolean>;
                }, "strip", z.ZodTypeAny, {
                    similarity_boost?: number | undefined;
                    stability?: number | undefined;
                    style?: number | undefined;
                    use_speaker_boost?: boolean | undefined;
                }, {
                    similarity_boost?: number | undefined;
                    stability?: number | undefined;
                    style?: number | undefined;
                    use_speaker_boost?: boolean | undefined;
                }>>;
                pronunciation_dictionary_locators: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            }, "strip", z.ZodTypeAny, {
                model: string;
                apiKey: string;
                voices: string[];
                url?: string | undefined;
                websocketUrl?: string | undefined;
                voice_settings?: {
                    similarity_boost?: number | undefined;
                    stability?: number | undefined;
                    style?: number | undefined;
                    use_speaker_boost?: boolean | undefined;
                } | undefined;
                pronunciation_dictionary_locators?: string[] | undefined;
            }, {
                model: string;
                apiKey: string;
                voices: string[];
                url?: string | undefined;
                websocketUrl?: string | undefined;
                voice_settings?: {
                    similarity_boost?: number | undefined;
                    stability?: number | undefined;
                    style?: number | undefined;
                    use_speaker_boost?: boolean | undefined;
                } | undefined;
                pronunciation_dictionary_locators?: string[] | undefined;
            }>>;
            localai: z.ZodOptional<z.ZodObject<{
                url: z.ZodString;
                apiKey: z.ZodOptional<z.ZodString>;
                voices: z.ZodArray<z.ZodString, "many">;
                backend: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                url: string;
                voices: string[];
                backend: string;
                apiKey?: string | undefined;
            }, {
                url: string;
                voices: string[];
                backend: string;
                apiKey?: string | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            openai?: {
                model: string;
                apiKey: string;
                voices: string[];
                url?: string | undefined;
            } | undefined;
            azureOpenAI?: {
                model: string;
                apiKey: string;
                voices: string[];
                instanceName: string;
                deploymentName: string;
                apiVersion: string;
            } | undefined;
            elevenlabs?: {
                model: string;
                apiKey: string;
                voices: string[];
                url?: string | undefined;
                websocketUrl?: string | undefined;
                voice_settings?: {
                    similarity_boost?: number | undefined;
                    stability?: number | undefined;
                    style?: number | undefined;
                    use_speaker_boost?: boolean | undefined;
                } | undefined;
                pronunciation_dictionary_locators?: string[] | undefined;
            } | undefined;
            localai?: {
                url: string;
                voices: string[];
                backend: string;
                apiKey?: string | undefined;
            } | undefined;
        }, {
            openai?: {
                model: string;
                apiKey: string;
                voices: string[];
                url?: string | undefined;
            } | undefined;
            azureOpenAI?: {
                model: string;
                apiKey: string;
                voices: string[];
                instanceName: string;
                deploymentName: string;
                apiVersion: string;
            } | undefined;
            elevenlabs?: {
                model: string;
                apiKey: string;
                voices: string[];
                url?: string | undefined;
                websocketUrl?: string | undefined;
                voice_settings?: {
                    similarity_boost?: number | undefined;
                    stability?: number | undefined;
                    style?: number | undefined;
                    use_speaker_boost?: boolean | undefined;
                } | undefined;
                pronunciation_dictionary_locators?: string[] | undefined;
            } | undefined;
            localai?: {
                url: string;
                voices: string[];
                backend: string;
                apiKey?: string | undefined;
            } | undefined;
        }>>;
        stt: z.ZodOptional<z.ZodObject<{
            openai: z.ZodOptional<z.ZodObject<{
                url: z.ZodOptional<z.ZodString>;
                apiKey: z.ZodString;
                model: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                model: string;
                apiKey: string;
                url?: string | undefined;
            }, {
                model: string;
                apiKey: string;
                url?: string | undefined;
            }>>;
            azureOpenAI: z.ZodOptional<z.ZodObject<{
                instanceName: z.ZodString;
                apiKey: z.ZodString;
                deploymentName: z.ZodString;
                apiVersion: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                apiKey: string;
                instanceName: string;
                deploymentName: string;
                apiVersion: string;
            }, {
                apiKey: string;
                instanceName: string;
                deploymentName: string;
                apiVersion: string;
            }>>;
        }, "strip", z.ZodTypeAny, {
            openai?: {
                model: string;
                apiKey: string;
                url?: string | undefined;
            } | undefined;
            azureOpenAI?: {
                apiKey: string;
                instanceName: string;
                deploymentName: string;
                apiVersion: string;
            } | undefined;
        }, {
            openai?: {
                model: string;
                apiKey: string;
                url?: string | undefined;
            } | undefined;
            azureOpenAI?: {
                apiKey: string;
                instanceName: string;
                deploymentName: string;
                apiVersion: string;
            } | undefined;
        }>>;
        speechTab: z.ZodOptional<z.ZodOptional<z.ZodObject<{
            conversationMode: z.ZodOptional<z.ZodBoolean>;
            advancedMode: z.ZodOptional<z.ZodBoolean>;
            speechToText: z.ZodOptional<z.ZodUnion<[z.ZodOptional<z.ZodBoolean>, z.ZodObject<{
                engineSTT: z.ZodOptional<z.ZodString>;
                languageSTT: z.ZodOptional<z.ZodString>;
                autoTranscribeAudio: z.ZodOptional<z.ZodBoolean>;
                decibelValue: z.ZodOptional<z.ZodNumber>;
                autoSendText: z.ZodOptional<z.ZodNumber>;
            }, "strip", z.ZodTypeAny, {
                engineSTT?: string | undefined;
                languageSTT?: string | undefined;
                autoTranscribeAudio?: boolean | undefined;
                decibelValue?: number | undefined;
                autoSendText?: number | undefined;
            }, {
                engineSTT?: string | undefined;
                languageSTT?: string | undefined;
                autoTranscribeAudio?: boolean | undefined;
                decibelValue?: number | undefined;
                autoSendText?: number | undefined;
            }>]>>;
            textToSpeech: z.ZodOptional<z.ZodUnion<[z.ZodOptional<z.ZodBoolean>, z.ZodObject<{
                engineTTS: z.ZodOptional<z.ZodString>;
                voice: z.ZodOptional<z.ZodString>;
                languageTTS: z.ZodOptional<z.ZodString>;
                automaticPlayback: z.ZodOptional<z.ZodBoolean>;
                playbackRate: z.ZodOptional<z.ZodNumber>;
                cacheTTS: z.ZodOptional<z.ZodBoolean>;
            }, "strip", z.ZodTypeAny, {
                engineTTS?: string | undefined;
                voice?: string | undefined;
                languageTTS?: string | undefined;
                automaticPlayback?: boolean | undefined;
                playbackRate?: number | undefined;
                cacheTTS?: boolean | undefined;
            }, {
                engineTTS?: string | undefined;
                voice?: string | undefined;
                languageTTS?: string | undefined;
                automaticPlayback?: boolean | undefined;
                playbackRate?: number | undefined;
                cacheTTS?: boolean | undefined;
            }>]>>;
        }, "strip", z.ZodTypeAny, {
            conversationMode?: boolean | undefined;
            advancedMode?: boolean | undefined;
            speechToText?: boolean | {
                engineSTT?: string | undefined;
                languageSTT?: string | undefined;
                autoTranscribeAudio?: boolean | undefined;
                decibelValue?: number | undefined;
                autoSendText?: number | undefined;
            } | undefined;
            textToSpeech?: boolean | {
                engineTTS?: string | undefined;
                voice?: string | undefined;
                languageTTS?: string | undefined;
                automaticPlayback?: boolean | undefined;
                playbackRate?: number | undefined;
                cacheTTS?: boolean | undefined;
            } | undefined;
        }, {
            conversationMode?: boolean | undefined;
            advancedMode?: boolean | undefined;
            speechToText?: boolean | {
                engineSTT?: string | undefined;
                languageSTT?: string | undefined;
                autoTranscribeAudio?: boolean | undefined;
                decibelValue?: number | undefined;
                autoSendText?: number | undefined;
            } | undefined;
            textToSpeech?: boolean | {
                engineTTS?: string | undefined;
                voice?: string | undefined;
                languageTTS?: string | undefined;
                automaticPlayback?: boolean | undefined;
                playbackRate?: number | undefined;
                cacheTTS?: boolean | undefined;
            } | undefined;
        }>>>;
    }, "strip", z.ZodTypeAny, {
        tts?: {
            openai?: {
                model: string;
                apiKey: string;
                voices: string[];
                url?: string | undefined;
            } | undefined;
            azureOpenAI?: {
                model: string;
                apiKey: string;
                voices: string[];
                instanceName: string;
                deploymentName: string;
                apiVersion: string;
            } | undefined;
            elevenlabs?: {
                model: string;
                apiKey: string;
                voices: string[];
                url?: string | undefined;
                websocketUrl?: string | undefined;
                voice_settings?: {
                    similarity_boost?: number | undefined;
                    stability?: number | undefined;
                    style?: number | undefined;
                    use_speaker_boost?: boolean | undefined;
                } | undefined;
                pronunciation_dictionary_locators?: string[] | undefined;
            } | undefined;
            localai?: {
                url: string;
                voices: string[];
                backend: string;
                apiKey?: string | undefined;
            } | undefined;
        } | undefined;
        stt?: {
            openai?: {
                model: string;
                apiKey: string;
                url?: string | undefined;
            } | undefined;
            azureOpenAI?: {
                apiKey: string;
                instanceName: string;
                deploymentName: string;
                apiVersion: string;
            } | undefined;
        } | undefined;
        speechTab?: {
            conversationMode?: boolean | undefined;
            advancedMode?: boolean | undefined;
            speechToText?: boolean | {
                engineSTT?: string | undefined;
                languageSTT?: string | undefined;
                autoTranscribeAudio?: boolean | undefined;
                decibelValue?: number | undefined;
                autoSendText?: number | undefined;
            } | undefined;
            textToSpeech?: boolean | {
                engineTTS?: string | undefined;
                voice?: string | undefined;
                languageTTS?: string | undefined;
                automaticPlayback?: boolean | undefined;
                playbackRate?: number | undefined;
                cacheTTS?: boolean | undefined;
            } | undefined;
        } | undefined;
    }, {
        tts?: {
            openai?: {
                model: string;
                apiKey: string;
                voices: string[];
                url?: string | undefined;
            } | undefined;
            azureOpenAI?: {
                model: string;
                apiKey: string;
                voices: string[];
                instanceName: string;
                deploymentName: string;
                apiVersion: string;
            } | undefined;
            elevenlabs?: {
                model: string;
                apiKey: string;
                voices: string[];
                url?: string | undefined;
                websocketUrl?: string | undefined;
                voice_settings?: {
                    similarity_boost?: number | undefined;
                    stability?: number | undefined;
                    style?: number | undefined;
                    use_speaker_boost?: boolean | undefined;
                } | undefined;
                pronunciation_dictionary_locators?: string[] | undefined;
            } | undefined;
            localai?: {
                url: string;
                voices: string[];
                backend: string;
                apiKey?: string | undefined;
            } | undefined;
        } | undefined;
        stt?: {
            openai?: {
                model: string;
                apiKey: string;
                url?: string | undefined;
            } | undefined;
            azureOpenAI?: {
                apiKey: string;
                instanceName: string;
                deploymentName: string;
                apiVersion: string;
            } | undefined;
        } | undefined;
        speechTab?: {
            conversationMode?: boolean | undefined;
            advancedMode?: boolean | undefined;
            speechToText?: boolean | {
                engineSTT?: string | undefined;
                languageSTT?: string | undefined;
                autoTranscribeAudio?: boolean | undefined;
                decibelValue?: number | undefined;
                autoSendText?: number | undefined;
            } | undefined;
            textToSpeech?: boolean | {
                engineTTS?: string | undefined;
                voice?: string | undefined;
                languageTTS?: string | undefined;
                automaticPlayback?: boolean | undefined;
                playbackRate?: number | undefined;
                cacheTTS?: boolean | undefined;
            } | undefined;
        } | undefined;
    }>>;
    rateLimits: z.ZodOptional<z.ZodObject<{
        fileUploads: z.ZodOptional<z.ZodObject<{
            ipMax: z.ZodOptional<z.ZodNumber>;
            ipWindowInMinutes: z.ZodOptional<z.ZodNumber>;
            userMax: z.ZodOptional<z.ZodNumber>;
            userWindowInMinutes: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            ipMax?: number | undefined;
            ipWindowInMinutes?: number | undefined;
            userMax?: number | undefined;
            userWindowInMinutes?: number | undefined;
        }, {
            ipMax?: number | undefined;
            ipWindowInMinutes?: number | undefined;
            userMax?: number | undefined;
            userWindowInMinutes?: number | undefined;
        }>>;
        conversationsImport: z.ZodOptional<z.ZodObject<{
            ipMax: z.ZodOptional<z.ZodNumber>;
            ipWindowInMinutes: z.ZodOptional<z.ZodNumber>;
            userMax: z.ZodOptional<z.ZodNumber>;
            userWindowInMinutes: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            ipMax?: number | undefined;
            ipWindowInMinutes?: number | undefined;
            userMax?: number | undefined;
            userWindowInMinutes?: number | undefined;
        }, {
            ipMax?: number | undefined;
            ipWindowInMinutes?: number | undefined;
            userMax?: number | undefined;
            userWindowInMinutes?: number | undefined;
        }>>;
        tts: z.ZodOptional<z.ZodObject<{
            ipMax: z.ZodOptional<z.ZodNumber>;
            ipWindowInMinutes: z.ZodOptional<z.ZodNumber>;
            userMax: z.ZodOptional<z.ZodNumber>;
            userWindowInMinutes: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            ipMax?: number | undefined;
            ipWindowInMinutes?: number | undefined;
            userMax?: number | undefined;
            userWindowInMinutes?: number | undefined;
        }, {
            ipMax?: number | undefined;
            ipWindowInMinutes?: number | undefined;
            userMax?: number | undefined;
            userWindowInMinutes?: number | undefined;
        }>>;
        stt: z.ZodOptional<z.ZodObject<{
            ipMax: z.ZodOptional<z.ZodNumber>;
            ipWindowInMinutes: z.ZodOptional<z.ZodNumber>;
            userMax: z.ZodOptional<z.ZodNumber>;
            userWindowInMinutes: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            ipMax?: number | undefined;
            ipWindowInMinutes?: number | undefined;
            userMax?: number | undefined;
            userWindowInMinutes?: number | undefined;
        }, {
            ipMax?: number | undefined;
            ipWindowInMinutes?: number | undefined;
            userMax?: number | undefined;
            userWindowInMinutes?: number | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        tts?: {
            ipMax?: number | undefined;
            ipWindowInMinutes?: number | undefined;
            userMax?: number | undefined;
            userWindowInMinutes?: number | undefined;
        } | undefined;
        stt?: {
            ipMax?: number | undefined;
            ipWindowInMinutes?: number | undefined;
            userMax?: number | undefined;
            userWindowInMinutes?: number | undefined;
        } | undefined;
        fileUploads?: {
            ipMax?: number | undefined;
            ipWindowInMinutes?: number | undefined;
            userMax?: number | undefined;
            userWindowInMinutes?: number | undefined;
        } | undefined;
        conversationsImport?: {
            ipMax?: number | undefined;
            ipWindowInMinutes?: number | undefined;
            userMax?: number | undefined;
            userWindowInMinutes?: number | undefined;
        } | undefined;
    }, {
        tts?: {
            ipMax?: number | undefined;
            ipWindowInMinutes?: number | undefined;
            userMax?: number | undefined;
            userWindowInMinutes?: number | undefined;
        } | undefined;
        stt?: {
            ipMax?: number | undefined;
            ipWindowInMinutes?: number | undefined;
            userMax?: number | undefined;
            userWindowInMinutes?: number | undefined;
        } | undefined;
        fileUploads?: {
            ipMax?: number | undefined;
            ipWindowInMinutes?: number | undefined;
            userMax?: number | undefined;
            userWindowInMinutes?: number | undefined;
        } | undefined;
        conversationsImport?: {
            ipMax?: number | undefined;
            ipWindowInMinutes?: number | undefined;
            userMax?: number | undefined;
            userWindowInMinutes?: number | undefined;
        } | undefined;
    }>>;
    fileConfig: z.ZodOptional<z.ZodObject<{
        endpoints: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
            disabled: z.ZodOptional<z.ZodBoolean>;
            fileLimit: z.ZodOptional<z.ZodNumber>;
            fileSizeLimit: z.ZodOptional<z.ZodNumber>;
            totalSizeLimit: z.ZodOptional<z.ZodNumber>;
            supportedMimeTypes: z.ZodOptional<z.ZodEffects<z.ZodOptional<z.ZodArray<z.ZodAny, "many">>, any[] | undefined, any[] | undefined>>;
        }, "strip", z.ZodTypeAny, {
            disabled?: boolean | undefined;
            fileLimit?: number | undefined;
            fileSizeLimit?: number | undefined;
            totalSizeLimit?: number | undefined;
            supportedMimeTypes?: any[] | undefined;
        }, {
            disabled?: boolean | undefined;
            fileLimit?: number | undefined;
            fileSizeLimit?: number | undefined;
            totalSizeLimit?: number | undefined;
            supportedMimeTypes?: any[] | undefined;
        }>>>;
        serverFileSizeLimit: z.ZodOptional<z.ZodNumber>;
        avatarSizeLimit: z.ZodOptional<z.ZodNumber>;
        fileTokenLimit: z.ZodOptional<z.ZodNumber>;
        imageGeneration: z.ZodOptional<z.ZodObject<{
            percentage: z.ZodOptional<z.ZodNumber>;
            px: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            percentage?: number | undefined;
            px?: number | undefined;
        }, {
            percentage?: number | undefined;
            px?: number | undefined;
        }>>;
        clientImageResize: z.ZodOptional<z.ZodObject<{
            enabled: z.ZodOptional<z.ZodBoolean>;
            maxWidth: z.ZodOptional<z.ZodNumber>;
            maxHeight: z.ZodOptional<z.ZodNumber>;
            quality: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            enabled?: boolean | undefined;
            maxWidth?: number | undefined;
            maxHeight?: number | undefined;
            quality?: number | undefined;
        }, {
            enabled?: boolean | undefined;
            maxWidth?: number | undefined;
            maxHeight?: number | undefined;
            quality?: number | undefined;
        }>>;
        ocr: z.ZodOptional<z.ZodObject<{
            supportedMimeTypes: z.ZodOptional<z.ZodEffects<z.ZodOptional<z.ZodArray<z.ZodAny, "many">>, any[] | undefined, any[] | undefined>>;
        }, "strip", z.ZodTypeAny, {
            supportedMimeTypes?: any[] | undefined;
        }, {
            supportedMimeTypes?: any[] | undefined;
        }>>;
        text: z.ZodOptional<z.ZodObject<{
            supportedMimeTypes: z.ZodOptional<z.ZodEffects<z.ZodOptional<z.ZodArray<z.ZodAny, "many">>, any[] | undefined, any[] | undefined>>;
        }, "strip", z.ZodTypeAny, {
            supportedMimeTypes?: any[] | undefined;
        }, {
            supportedMimeTypes?: any[] | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        text?: {
            supportedMimeTypes?: any[] | undefined;
        } | undefined;
        ocr?: {
            supportedMimeTypes?: any[] | undefined;
        } | undefined;
        endpoints?: Record<string, {
            disabled?: boolean | undefined;
            fileLimit?: number | undefined;
            fileSizeLimit?: number | undefined;
            totalSizeLimit?: number | undefined;
            supportedMimeTypes?: any[] | undefined;
        }> | undefined;
        serverFileSizeLimit?: number | undefined;
        avatarSizeLimit?: number | undefined;
        fileTokenLimit?: number | undefined;
        imageGeneration?: {
            percentage?: number | undefined;
            px?: number | undefined;
        } | undefined;
        clientImageResize?: {
            enabled?: boolean | undefined;
            maxWidth?: number | undefined;
            maxHeight?: number | undefined;
            quality?: number | undefined;
        } | undefined;
    }, {
        text?: {
            supportedMimeTypes?: any[] | undefined;
        } | undefined;
        ocr?: {
            supportedMimeTypes?: any[] | undefined;
        } | undefined;
        endpoints?: Record<string, {
            disabled?: boolean | undefined;
            fileLimit?: number | undefined;
            fileSizeLimit?: number | undefined;
            totalSizeLimit?: number | undefined;
            supportedMimeTypes?: any[] | undefined;
        }> | undefined;
        serverFileSizeLimit?: number | undefined;
        avatarSizeLimit?: number | undefined;
        fileTokenLimit?: number | undefined;
        imageGeneration?: {
            percentage?: number | undefined;
            px?: number | undefined;
        } | undefined;
        clientImageResize?: {
            enabled?: boolean | undefined;
            maxWidth?: number | undefined;
            maxHeight?: number | undefined;
            quality?: number | undefined;
        } | undefined;
    }>>;
    modelSpecs: z.ZodOptional<z.ZodObject<{
        enforce: z.ZodDefault<z.ZodBoolean>;
        prioritize: z.ZodDefault<z.ZodBoolean>;
        list: z.ZodArray<z.ZodObject<{
            name: z.ZodString;
            label: z.ZodString;
            preset: z.ZodObject<{
                iconURL: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                greeting: z.ZodOptional<z.ZodString>;
                endpointType: z.ZodOptional<z.ZodNullable<z.ZodNativeEnum<typeof EModelEndpoint>>>;
                expiredAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                messages: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                isArchived: z.ZodOptional<z.ZodBoolean>;
                tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                user: z.ZodOptional<z.ZodString>;
                tools: z.ZodOptional<z.ZodUnion<[z.ZodArray<z.ZodObject<{
                    name: z.ZodString;
                    pluginKey: z.ZodString;
                    description: z.ZodOptional<z.ZodString>;
                    icon: z.ZodOptional<z.ZodString>;
                    authConfig: z.ZodOptional<z.ZodArray<z.ZodObject<{
                        authField: z.ZodString;
                        label: z.ZodString;
                        description: z.ZodString;
                    }, "strip", z.ZodTypeAny, {
                        description: string;
                        label: string;
                        authField: string;
                    }, {
                        description: string;
                        label: string;
                        authField: string;
                    }>, "many">>;
                    authenticated: z.ZodOptional<z.ZodBoolean>;
                    chatMenu: z.ZodOptional<z.ZodBoolean>;
                    isButton: z.ZodOptional<z.ZodBoolean>;
                    toolkit: z.ZodOptional<z.ZodBoolean>;
                }, "strip", z.ZodTypeAny, {
                    name: string;
                    pluginKey: string;
                    description?: string | undefined;
                    chatMenu?: boolean | undefined;
                    icon?: string | undefined;
                    authConfig?: {
                        description: string;
                        label: string;
                        authField: string;
                    }[] | undefined;
                    authenticated?: boolean | undefined;
                    isButton?: boolean | undefined;
                    toolkit?: boolean | undefined;
                }, {
                    name: string;
                    pluginKey: string;
                    description?: string | undefined;
                    chatMenu?: boolean | undefined;
                    icon?: string | undefined;
                    authConfig?: {
                        description: string;
                        label: string;
                        authField: string;
                    }[] | undefined;
                    authenticated?: boolean | undefined;
                    isButton?: boolean | undefined;
                    toolkit?: boolean | undefined;
                }>, "many">, z.ZodArray<z.ZodString, "many">]>>;
                model: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                spec: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                instructions: z.ZodOptional<z.ZodString>;
                fileTokenLimit: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodNumber, z.ZodString]>, number | undefined, string | number>>;
                modelLabel: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                userLabel: z.ZodOptional<z.ZodString>;
                promptPrefix: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                temperature: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
                topP: z.ZodOptional<z.ZodNumber>;
                topK: z.ZodOptional<z.ZodNumber>;
                top_p: z.ZodOptional<z.ZodNumber>;
                frequency_penalty: z.ZodOptional<z.ZodNumber>;
                presence_penalty: z.ZodOptional<z.ZodNumber>;
                parentMessageId: z.ZodOptional<z.ZodString>;
                maxOutputTokens: z.ZodOptional<z.ZodNullable<z.ZodEffects<z.ZodUnion<[z.ZodNumber, z.ZodString]>, number | undefined, string | number>>>;
                maxContextTokens: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodNumber, z.ZodString]>, number | undefined, string | number>>;
                max_tokens: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodNumber, z.ZodString]>, number | undefined, string | number>>;
                promptCache: z.ZodOptional<z.ZodBoolean>;
                system: z.ZodOptional<z.ZodString>;
                thinking: z.ZodOptional<z.ZodBoolean>;
                thinkingBudget: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodNumber, z.ZodString]>, number | undefined, string | number>>;
                stream: z.ZodOptional<z.ZodBoolean>;
                artifacts: z.ZodOptional<z.ZodString>;
                context: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                examples: z.ZodOptional<z.ZodArray<z.ZodObject<{
                    input: z.ZodObject<{
                        content: z.ZodString;
                    }, "strip", z.ZodTypeAny, {
                        content: string;
                    }, {
                        content: string;
                    }>;
                    output: z.ZodObject<{
                        content: z.ZodString;
                    }, "strip", z.ZodTypeAny, {
                        content: string;
                    }, {
                        content: string;
                    }>;
                }, "strip", z.ZodTypeAny, {
                    input: {
                        content: string;
                    };
                    output: {
                        content: string;
                    };
                }, {
                    input: {
                        content: string;
                    };
                    output: {
                        content: string;
                    };
                }>, "many">>;
                resendFiles: z.ZodOptional<z.ZodBoolean>;
                file_ids: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                imageDetail: z.ZodOptional<z.ZodNativeEnum<typeof import("./schemas").ImageDetail>>;
                reasoning_effort: z.ZodNullable<z.ZodOptional<z.ZodNativeEnum<typeof import("./schemas").ReasoningEffort>>>;
                reasoning_summary: z.ZodNullable<z.ZodOptional<z.ZodNativeEnum<typeof import("./schemas").ReasoningSummary>>>;
                verbosity: z.ZodNullable<z.ZodOptional<z.ZodNativeEnum<typeof import("./schemas").Verbosity>>>;
                useResponsesApi: z.ZodOptional<z.ZodBoolean>;
                web_search: z.ZodOptional<z.ZodBoolean>;
                disableStreaming: z.ZodOptional<z.ZodBoolean>;
                assistant_id: z.ZodOptional<z.ZodString>;
                agent_id: z.ZodOptional<z.ZodString>;
                region: z.ZodOptional<z.ZodString>;
                maxTokens: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodNumber, z.ZodString]>, number | undefined, string | number>>;
                additionalModelRequestFields: z.ZodOptional<z.ZodType<string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | {
                    [key: string]: string | number | boolean | any | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | any | any | null)[] | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
                } | null, z.ZodTypeDef, string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | {
                    [key: string]: string | number | boolean | any | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | any | any | null)[] | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
                } | null>>;
                additional_instructions: z.ZodOptional<z.ZodString>;
                append_current_datetime: z.ZodOptional<z.ZodBoolean>;
                presetOverride: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
                stop: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                resendImages: z.ZodOptional<z.ZodBoolean>;
                agentOptions: z.ZodOptional<z.ZodNullable<z.ZodObject<{
                    agent: z.ZodDefault<z.ZodString>;
                    skipCompletion: z.ZodDefault<z.ZodBoolean>;
                    model: z.ZodString;
                    temperature: z.ZodDefault<z.ZodNumber>;
                }, "strip", z.ZodTypeAny, {
                    model: string;
                    agent: string;
                    temperature: number;
                    skipCompletion: boolean;
                }, {
                    model: string;
                    agent?: string | undefined;
                    temperature?: number | undefined;
                    skipCompletion?: boolean | undefined;
                }>>>;
                chatGptLabel: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            } & {
                conversationId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                presetId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                title: z.ZodOptional<z.ZodNullable<z.ZodString>>;
                defaultPreset: z.ZodOptional<z.ZodBoolean>;
                order: z.ZodOptional<z.ZodNumber>;
                endpoint: z.ZodNullable<z.ZodUnion<[z.ZodNativeEnum<typeof EModelEndpoint>, z.ZodString]>>;
            }, "strip", z.ZodTypeAny, {
                endpoint: string | null;
                conversationId?: string | null | undefined;
                title?: string | null | undefined;
                iconURL?: string | null | undefined;
                greeting?: string | undefined;
                endpointType?: EModelEndpoint | null | undefined;
                expiredAt?: string | null | undefined;
                messages?: string[] | undefined;
                isArchived?: boolean | undefined;
                tags?: string[] | undefined;
                user?: string | undefined;
                tools?: string[] | {
                    name: string;
                    pluginKey: string;
                    description?: string | undefined;
                    chatMenu?: boolean | undefined;
                    icon?: string | undefined;
                    authConfig?: {
                        description: string;
                        label: string;
                        authField: string;
                    }[] | undefined;
                    authenticated?: boolean | undefined;
                    isButton?: boolean | undefined;
                    toolkit?: boolean | undefined;
                }[] | undefined;
                model?: string | null | undefined;
                spec?: string | null | undefined;
                instructions?: string | undefined;
                fileTokenLimit?: number | undefined;
                modelLabel?: string | null | undefined;
                userLabel?: string | undefined;
                promptPrefix?: string | null | undefined;
                temperature?: number | null | undefined;
                topP?: number | undefined;
                topK?: number | undefined;
                top_p?: number | undefined;
                frequency_penalty?: number | undefined;
                presence_penalty?: number | undefined;
                parentMessageId?: string | undefined;
                maxOutputTokens?: number | null | undefined;
                maxContextTokens?: number | undefined;
                max_tokens?: number | undefined;
                promptCache?: boolean | undefined;
                system?: string | undefined;
                thinking?: boolean | undefined;
                thinkingBudget?: number | undefined;
                stream?: boolean | undefined;
                artifacts?: string | undefined;
                context?: string | null | undefined;
                examples?: {
                    input: {
                        content: string;
                    };
                    output: {
                        content: string;
                    };
                }[] | undefined;
                resendFiles?: boolean | undefined;
                file_ids?: string[] | undefined;
                imageDetail?: import("./schemas").ImageDetail | undefined;
                reasoning_effort?: import("./schemas").ReasoningEffort | null | undefined;
                reasoning_summary?: import("./schemas").ReasoningSummary | null | undefined;
                verbosity?: import("./schemas").Verbosity | null | undefined;
                useResponsesApi?: boolean | undefined;
                web_search?: boolean | undefined;
                disableStreaming?: boolean | undefined;
                assistant_id?: string | undefined;
                agent_id?: string | undefined;
                region?: string | undefined;
                maxTokens?: number | undefined;
                additionalModelRequestFields?: (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | {
                    [key: string]: string | number | boolean | any | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | any | any | null)[] | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
                } | null) | undefined;
                additional_instructions?: string | undefined;
                append_current_datetime?: boolean | undefined;
                presetOverride?: Record<string, unknown> | undefined;
                stop?: string[] | undefined;
                resendImages?: boolean | undefined;
                agentOptions?: {
                    model: string;
                    agent: string;
                    temperature: number;
                    skipCompletion: boolean;
                } | null | undefined;
                chatGptLabel?: string | null | undefined;
                presetId?: string | null | undefined;
                defaultPreset?: boolean | undefined;
                order?: number | undefined;
            }, {
                endpoint: string | null;
                conversationId?: string | null | undefined;
                title?: string | null | undefined;
                iconURL?: string | null | undefined;
                greeting?: string | undefined;
                endpointType?: EModelEndpoint | null | undefined;
                expiredAt?: string | null | undefined;
                messages?: string[] | undefined;
                isArchived?: boolean | undefined;
                tags?: string[] | undefined;
                user?: string | undefined;
                tools?: string[] | {
                    name: string;
                    pluginKey: string;
                    description?: string | undefined;
                    chatMenu?: boolean | undefined;
                    icon?: string | undefined;
                    authConfig?: {
                        description: string;
                        label: string;
                        authField: string;
                    }[] | undefined;
                    authenticated?: boolean | undefined;
                    isButton?: boolean | undefined;
                    toolkit?: boolean | undefined;
                }[] | undefined;
                model?: string | null | undefined;
                spec?: string | null | undefined;
                instructions?: string | undefined;
                fileTokenLimit?: string | number | undefined;
                modelLabel?: string | null | undefined;
                userLabel?: string | undefined;
                promptPrefix?: string | null | undefined;
                temperature?: number | null | undefined;
                topP?: number | undefined;
                topK?: number | undefined;
                top_p?: number | undefined;
                frequency_penalty?: number | undefined;
                presence_penalty?: number | undefined;
                parentMessageId?: string | undefined;
                maxOutputTokens?: string | number | null | undefined;
                maxContextTokens?: string | number | undefined;
                max_tokens?: string | number | undefined;
                promptCache?: boolean | undefined;
                system?: string | undefined;
                thinking?: boolean | undefined;
                thinkingBudget?: string | number | undefined;
                stream?: boolean | undefined;
                artifacts?: string | undefined;
                context?: string | null | undefined;
                examples?: {
                    input: {
                        content: string;
                    };
                    output: {
                        content: string;
                    };
                }[] | undefined;
                resendFiles?: boolean | undefined;
                file_ids?: string[] | undefined;
                imageDetail?: import("./schemas").ImageDetail | undefined;
                reasoning_effort?: import("./schemas").ReasoningEffort | null | undefined;
                reasoning_summary?: import("./schemas").ReasoningSummary | null | undefined;
                verbosity?: import("./schemas").Verbosity | null | undefined;
                useResponsesApi?: boolean | undefined;
                web_search?: boolean | undefined;
                disableStreaming?: boolean | undefined;
                assistant_id?: string | undefined;
                agent_id?: string | undefined;
                region?: string | undefined;
                maxTokens?: string | number | undefined;
                additionalModelRequestFields?: (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | {
                    [key: string]: string | number | boolean | any | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | any | any | null)[] | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
                } | null) | undefined;
                additional_instructions?: string | undefined;
                append_current_datetime?: boolean | undefined;
                presetOverride?: Record<string, unknown> | undefined;
                stop?: string[] | undefined;
                resendImages?: boolean | undefined;
                agentOptions?: {
                    model: string;
                    agent?: string | undefined;
                    temperature?: number | undefined;
                    skipCompletion?: boolean | undefined;
                } | null | undefined;
                chatGptLabel?: string | null | undefined;
                presetId?: string | null | undefined;
                defaultPreset?: boolean | undefined;
                order?: number | undefined;
            }>;
            order: z.ZodOptional<z.ZodNumber>;
            default: z.ZodOptional<z.ZodBoolean>;
            description: z.ZodOptional<z.ZodString>;
            group: z.ZodOptional<z.ZodString>;
            showIconInMenu: z.ZodOptional<z.ZodBoolean>;
            showIconInHeader: z.ZodOptional<z.ZodBoolean>;
            iconURL: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNativeEnum<typeof EModelEndpoint>]>>;
            authType: z.ZodOptional<z.ZodNativeEnum<typeof import("./schemas").AuthType>>;
            webSearch: z.ZodOptional<z.ZodBoolean>;
            fileSearch: z.ZodOptional<z.ZodBoolean>;
            executeCode: z.ZodOptional<z.ZodBoolean>;
            mcpServers: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        }, "strip", z.ZodTypeAny, {
            name: string;
            label: string;
            preset: {
                endpoint: string | null;
                conversationId?: string | null | undefined;
                title?: string | null | undefined;
                iconURL?: string | null | undefined;
                greeting?: string | undefined;
                endpointType?: EModelEndpoint | null | undefined;
                expiredAt?: string | null | undefined;
                messages?: string[] | undefined;
                isArchived?: boolean | undefined;
                tags?: string[] | undefined;
                user?: string | undefined;
                tools?: string[] | {
                    name: string;
                    pluginKey: string;
                    description?: string | undefined;
                    chatMenu?: boolean | undefined;
                    icon?: string | undefined;
                    authConfig?: {
                        description: string;
                        label: string;
                        authField: string;
                    }[] | undefined;
                    authenticated?: boolean | undefined;
                    isButton?: boolean | undefined;
                    toolkit?: boolean | undefined;
                }[] | undefined;
                model?: string | null | undefined;
                spec?: string | null | undefined;
                instructions?: string | undefined;
                fileTokenLimit?: number | undefined;
                modelLabel?: string | null | undefined;
                userLabel?: string | undefined;
                promptPrefix?: string | null | undefined;
                temperature?: number | null | undefined;
                topP?: number | undefined;
                topK?: number | undefined;
                top_p?: number | undefined;
                frequency_penalty?: number | undefined;
                presence_penalty?: number | undefined;
                parentMessageId?: string | undefined;
                maxOutputTokens?: number | null | undefined;
                maxContextTokens?: number | undefined;
                max_tokens?: number | undefined;
                promptCache?: boolean | undefined;
                system?: string | undefined;
                thinking?: boolean | undefined;
                thinkingBudget?: number | undefined;
                stream?: boolean | undefined;
                artifacts?: string | undefined;
                context?: string | null | undefined;
                examples?: {
                    input: {
                        content: string;
                    };
                    output: {
                        content: string;
                    };
                }[] | undefined;
                resendFiles?: boolean | undefined;
                file_ids?: string[] | undefined;
                imageDetail?: import("./schemas").ImageDetail | undefined;
                reasoning_effort?: import("./schemas").ReasoningEffort | null | undefined;
                reasoning_summary?: import("./schemas").ReasoningSummary | null | undefined;
                verbosity?: import("./schemas").Verbosity | null | undefined;
                useResponsesApi?: boolean | undefined;
                web_search?: boolean | undefined;
                disableStreaming?: boolean | undefined;
                assistant_id?: string | undefined;
                agent_id?: string | undefined;
                region?: string | undefined;
                maxTokens?: number | undefined;
                additionalModelRequestFields?: (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | {
                    [key: string]: string | number | boolean | any | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | any | any | null)[] | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
                } | null) | undefined;
                additional_instructions?: string | undefined;
                append_current_datetime?: boolean | undefined;
                presetOverride?: Record<string, unknown> | undefined;
                stop?: string[] | undefined;
                resendImages?: boolean | undefined;
                agentOptions?: {
                    model: string;
                    agent: string;
                    temperature: number;
                    skipCompletion: boolean;
                } | null | undefined;
                chatGptLabel?: string | null | undefined;
                presetId?: string | null | undefined;
                defaultPreset?: boolean | undefined;
                order?: number | undefined;
            };
            iconURL?: string | undefined;
            default?: boolean | undefined;
            description?: string | undefined;
            webSearch?: boolean | undefined;
            mcpServers?: string[] | undefined;
            fileSearch?: boolean | undefined;
            order?: number | undefined;
            group?: string | undefined;
            showIconInMenu?: boolean | undefined;
            showIconInHeader?: boolean | undefined;
            authType?: import("./schemas").AuthType | undefined;
            executeCode?: boolean | undefined;
        }, {
            name: string;
            label: string;
            preset: {
                endpoint: string | null;
                conversationId?: string | null | undefined;
                title?: string | null | undefined;
                iconURL?: string | null | undefined;
                greeting?: string | undefined;
                endpointType?: EModelEndpoint | null | undefined;
                expiredAt?: string | null | undefined;
                messages?: string[] | undefined;
                isArchived?: boolean | undefined;
                tags?: string[] | undefined;
                user?: string | undefined;
                tools?: string[] | {
                    name: string;
                    pluginKey: string;
                    description?: string | undefined;
                    chatMenu?: boolean | undefined;
                    icon?: string | undefined;
                    authConfig?: {
                        description: string;
                        label: string;
                        authField: string;
                    }[] | undefined;
                    authenticated?: boolean | undefined;
                    isButton?: boolean | undefined;
                    toolkit?: boolean | undefined;
                }[] | undefined;
                model?: string | null | undefined;
                spec?: string | null | undefined;
                instructions?: string | undefined;
                fileTokenLimit?: string | number | undefined;
                modelLabel?: string | null | undefined;
                userLabel?: string | undefined;
                promptPrefix?: string | null | undefined;
                temperature?: number | null | undefined;
                topP?: number | undefined;
                topK?: number | undefined;
                top_p?: number | undefined;
                frequency_penalty?: number | undefined;
                presence_penalty?: number | undefined;
                parentMessageId?: string | undefined;
                maxOutputTokens?: string | number | null | undefined;
                maxContextTokens?: string | number | undefined;
                max_tokens?: string | number | undefined;
                promptCache?: boolean | undefined;
                system?: string | undefined;
                thinking?: boolean | undefined;
                thinkingBudget?: string | number | undefined;
                stream?: boolean | undefined;
                artifacts?: string | undefined;
                context?: string | null | undefined;
                examples?: {
                    input: {
                        content: string;
                    };
                    output: {
                        content: string;
                    };
                }[] | undefined;
                resendFiles?: boolean | undefined;
                file_ids?: string[] | undefined;
                imageDetail?: import("./schemas").ImageDetail | undefined;
                reasoning_effort?: import("./schemas").ReasoningEffort | null | undefined;
                reasoning_summary?: import("./schemas").ReasoningSummary | null | undefined;
                verbosity?: import("./schemas").Verbosity | null | undefined;
                useResponsesApi?: boolean | undefined;
                web_search?: boolean | undefined;
                disableStreaming?: boolean | undefined;
                assistant_id?: string | undefined;
                agent_id?: string | undefined;
                region?: string | undefined;
                maxTokens?: string | number | undefined;
                additionalModelRequestFields?: (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | {
                    [key: string]: string | number | boolean | any | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | any | any | null)[] | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
                } | null) | undefined;
                additional_instructions?: string | undefined;
                append_current_datetime?: boolean | undefined;
                presetOverride?: Record<string, unknown> | undefined;
                stop?: string[] | undefined;
                resendImages?: boolean | undefined;
                agentOptions?: {
                    model: string;
                    agent?: string | undefined;
                    temperature?: number | undefined;
                    skipCompletion?: boolean | undefined;
                } | null | undefined;
                chatGptLabel?: string | null | undefined;
                presetId?: string | null | undefined;
                defaultPreset?: boolean | undefined;
                order?: number | undefined;
            };
            iconURL?: string | undefined;
            default?: boolean | undefined;
            description?: string | undefined;
            webSearch?: boolean | undefined;
            mcpServers?: string[] | undefined;
            fileSearch?: boolean | undefined;
            order?: number | undefined;
            group?: string | undefined;
            showIconInMenu?: boolean | undefined;
            showIconInHeader?: boolean | undefined;
            authType?: import("./schemas").AuthType | undefined;
            executeCode?: boolean | undefined;
        }>, "many">;
        addedEndpoints: z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodString, z.ZodNativeEnum<typeof EModelEndpoint>]>, "many">>;
    }, "strip", z.ZodTypeAny, {
        enforce: boolean;
        prioritize: boolean;
        list: {
            name: string;
            label: string;
            preset: {
                endpoint: string | null;
                conversationId?: string | null | undefined;
                title?: string | null | undefined;
                iconURL?: string | null | undefined;
                greeting?: string | undefined;
                endpointType?: EModelEndpoint | null | undefined;
                expiredAt?: string | null | undefined;
                messages?: string[] | undefined;
                isArchived?: boolean | undefined;
                tags?: string[] | undefined;
                user?: string | undefined;
                tools?: string[] | {
                    name: string;
                    pluginKey: string;
                    description?: string | undefined;
                    chatMenu?: boolean | undefined;
                    icon?: string | undefined;
                    authConfig?: {
                        description: string;
                        label: string;
                        authField: string;
                    }[] | undefined;
                    authenticated?: boolean | undefined;
                    isButton?: boolean | undefined;
                    toolkit?: boolean | undefined;
                }[] | undefined;
                model?: string | null | undefined;
                spec?: string | null | undefined;
                instructions?: string | undefined;
                fileTokenLimit?: number | undefined;
                modelLabel?: string | null | undefined;
                userLabel?: string | undefined;
                promptPrefix?: string | null | undefined;
                temperature?: number | null | undefined;
                topP?: number | undefined;
                topK?: number | undefined;
                top_p?: number | undefined;
                frequency_penalty?: number | undefined;
                presence_penalty?: number | undefined;
                parentMessageId?: string | undefined;
                maxOutputTokens?: number | null | undefined;
                maxContextTokens?: number | undefined;
                max_tokens?: number | undefined;
                promptCache?: boolean | undefined;
                system?: string | undefined;
                thinking?: boolean | undefined;
                thinkingBudget?: number | undefined;
                stream?: boolean | undefined;
                artifacts?: string | undefined;
                context?: string | null | undefined;
                examples?: {
                    input: {
                        content: string;
                    };
                    output: {
                        content: string;
                    };
                }[] | undefined;
                resendFiles?: boolean | undefined;
                file_ids?: string[] | undefined;
                imageDetail?: import("./schemas").ImageDetail | undefined;
                reasoning_effort?: import("./schemas").ReasoningEffort | null | undefined;
                reasoning_summary?: import("./schemas").ReasoningSummary | null | undefined;
                verbosity?: import("./schemas").Verbosity | null | undefined;
                useResponsesApi?: boolean | undefined;
                web_search?: boolean | undefined;
                disableStreaming?: boolean | undefined;
                assistant_id?: string | undefined;
                agent_id?: string | undefined;
                region?: string | undefined;
                maxTokens?: number | undefined;
                additionalModelRequestFields?: (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | {
                    [key: string]: string | number | boolean | any | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | any | any | null)[] | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
                } | null) | undefined;
                additional_instructions?: string | undefined;
                append_current_datetime?: boolean | undefined;
                presetOverride?: Record<string, unknown> | undefined;
                stop?: string[] | undefined;
                resendImages?: boolean | undefined;
                agentOptions?: {
                    model: string;
                    agent: string;
                    temperature: number;
                    skipCompletion: boolean;
                } | null | undefined;
                chatGptLabel?: string | null | undefined;
                presetId?: string | null | undefined;
                defaultPreset?: boolean | undefined;
                order?: number | undefined;
            };
            iconURL?: string | undefined;
            default?: boolean | undefined;
            description?: string | undefined;
            webSearch?: boolean | undefined;
            mcpServers?: string[] | undefined;
            fileSearch?: boolean | undefined;
            order?: number | undefined;
            group?: string | undefined;
            showIconInMenu?: boolean | undefined;
            showIconInHeader?: boolean | undefined;
            authType?: import("./schemas").AuthType | undefined;
            executeCode?: boolean | undefined;
        }[];
        addedEndpoints?: string[] | undefined;
    }, {
        list: {
            name: string;
            label: string;
            preset: {
                endpoint: string | null;
                conversationId?: string | null | undefined;
                title?: string | null | undefined;
                iconURL?: string | null | undefined;
                greeting?: string | undefined;
                endpointType?: EModelEndpoint | null | undefined;
                expiredAt?: string | null | undefined;
                messages?: string[] | undefined;
                isArchived?: boolean | undefined;
                tags?: string[] | undefined;
                user?: string | undefined;
                tools?: string[] | {
                    name: string;
                    pluginKey: string;
                    description?: string | undefined;
                    chatMenu?: boolean | undefined;
                    icon?: string | undefined;
                    authConfig?: {
                        description: string;
                        label: string;
                        authField: string;
                    }[] | undefined;
                    authenticated?: boolean | undefined;
                    isButton?: boolean | undefined;
                    toolkit?: boolean | undefined;
                }[] | undefined;
                model?: string | null | undefined;
                spec?: string | null | undefined;
                instructions?: string | undefined;
                fileTokenLimit?: string | number | undefined;
                modelLabel?: string | null | undefined;
                userLabel?: string | undefined;
                promptPrefix?: string | null | undefined;
                temperature?: number | null | undefined;
                topP?: number | undefined;
                topK?: number | undefined;
                top_p?: number | undefined;
                frequency_penalty?: number | undefined;
                presence_penalty?: number | undefined;
                parentMessageId?: string | undefined;
                maxOutputTokens?: string | number | null | undefined;
                maxContextTokens?: string | number | undefined;
                max_tokens?: string | number | undefined;
                promptCache?: boolean | undefined;
                system?: string | undefined;
                thinking?: boolean | undefined;
                thinkingBudget?: string | number | undefined;
                stream?: boolean | undefined;
                artifacts?: string | undefined;
                context?: string | null | undefined;
                examples?: {
                    input: {
                        content: string;
                    };
                    output: {
                        content: string;
                    };
                }[] | undefined;
                resendFiles?: boolean | undefined;
                file_ids?: string[] | undefined;
                imageDetail?: import("./schemas").ImageDetail | undefined;
                reasoning_effort?: import("./schemas").ReasoningEffort | null | undefined;
                reasoning_summary?: import("./schemas").ReasoningSummary | null | undefined;
                verbosity?: import("./schemas").Verbosity | null | undefined;
                useResponsesApi?: boolean | undefined;
                web_search?: boolean | undefined;
                disableStreaming?: boolean | undefined;
                assistant_id?: string | undefined;
                agent_id?: string | undefined;
                region?: string | undefined;
                maxTokens?: string | number | undefined;
                additionalModelRequestFields?: (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | {
                    [key: string]: string | number | boolean | any | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | any | any | null)[] | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
                } | null)[] | {
                    [key: string]: string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null)[] | any | null;
                } | null) | undefined;
                additional_instructions?: string | undefined;
                append_current_datetime?: boolean | undefined;
                presetOverride?: Record<string, unknown> | undefined;
                stop?: string[] | undefined;
                resendImages?: boolean | undefined;
                agentOptions?: {
                    model: string;
                    agent?: string | undefined;
                    temperature?: number | undefined;
                    skipCompletion?: boolean | undefined;
                } | null | undefined;
                chatGptLabel?: string | null | undefined;
                presetId?: string | null | undefined;
                defaultPreset?: boolean | undefined;
                order?: number | undefined;
            };
            iconURL?: string | undefined;
            default?: boolean | undefined;
            description?: string | undefined;
            webSearch?: boolean | undefined;
            mcpServers?: string[] | undefined;
            fileSearch?: boolean | undefined;
            order?: number | undefined;
            group?: string | undefined;
            showIconInMenu?: boolean | undefined;
            showIconInHeader?: boolean | undefined;
            authType?: import("./schemas").AuthType | undefined;
            executeCode?: boolean | undefined;
        }[];
        enforce?: boolean | undefined;
        prioritize?: boolean | undefined;
        addedEndpoints?: string[] | undefined;
    }>>;
    endpoints: z.ZodOptional<z.ZodEffects<z.ZodObject<{
        all: z.ZodOptional<z.ZodObject<{
            streamRate: z.ZodOptional<z.ZodNumber>;
            baseURL: z.ZodOptional<z.ZodString>;
            titlePrompt: z.ZodOptional<z.ZodString>;
            titleModel: z.ZodOptional<z.ZodString>;
            titleConvo: z.ZodOptional<z.ZodBoolean>;
            titleMethod: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"completion">, z.ZodLiteral<"functions">, z.ZodLiteral<"structured">]>>;
            titleEndpoint: z.ZodOptional<z.ZodString>;
            titlePromptTemplate: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            baseURL?: string | undefined;
            streamRate?: number | undefined;
            titlePrompt?: string | undefined;
            titleModel?: string | undefined;
            titleConvo?: boolean | undefined;
            titleMethod?: "completion" | "functions" | "structured" | undefined;
            titleEndpoint?: string | undefined;
            titlePromptTemplate?: string | undefined;
        }, {
            baseURL?: string | undefined;
            streamRate?: number | undefined;
            titlePrompt?: string | undefined;
            titleModel?: string | undefined;
            titleConvo?: boolean | undefined;
            titleMethod?: "completion" | "functions" | "structured" | undefined;
            titleEndpoint?: string | undefined;
            titlePromptTemplate?: string | undefined;
        }>>;
        openAI: z.ZodOptional<z.ZodObject<{
            streamRate: z.ZodOptional<z.ZodNumber>;
            baseURL: z.ZodOptional<z.ZodString>;
            titlePrompt: z.ZodOptional<z.ZodString>;
            titleModel: z.ZodOptional<z.ZodString>;
            titleConvo: z.ZodOptional<z.ZodBoolean>;
            titleMethod: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"completion">, z.ZodLiteral<"functions">, z.ZodLiteral<"structured">]>>;
            titleEndpoint: z.ZodOptional<z.ZodString>;
            titlePromptTemplate: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            baseURL?: string | undefined;
            streamRate?: number | undefined;
            titlePrompt?: string | undefined;
            titleModel?: string | undefined;
            titleConvo?: boolean | undefined;
            titleMethod?: "completion" | "functions" | "structured" | undefined;
            titleEndpoint?: string | undefined;
            titlePromptTemplate?: string | undefined;
        }, {
            baseURL?: string | undefined;
            streamRate?: number | undefined;
            titlePrompt?: string | undefined;
            titleModel?: string | undefined;
            titleConvo?: boolean | undefined;
            titleMethod?: "completion" | "functions" | "structured" | undefined;
            titleEndpoint?: string | undefined;
            titlePromptTemplate?: string | undefined;
        }>>;
        google: z.ZodOptional<z.ZodObject<{
            streamRate: z.ZodOptional<z.ZodNumber>;
            baseURL: z.ZodOptional<z.ZodString>;
            titlePrompt: z.ZodOptional<z.ZodString>;
            titleModel: z.ZodOptional<z.ZodString>;
            titleConvo: z.ZodOptional<z.ZodBoolean>;
            titleMethod: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"completion">, z.ZodLiteral<"functions">, z.ZodLiteral<"structured">]>>;
            titleEndpoint: z.ZodOptional<z.ZodString>;
            titlePromptTemplate: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            baseURL?: string | undefined;
            streamRate?: number | undefined;
            titlePrompt?: string | undefined;
            titleModel?: string | undefined;
            titleConvo?: boolean | undefined;
            titleMethod?: "completion" | "functions" | "structured" | undefined;
            titleEndpoint?: string | undefined;
            titlePromptTemplate?: string | undefined;
        }, {
            baseURL?: string | undefined;
            streamRate?: number | undefined;
            titlePrompt?: string | undefined;
            titleModel?: string | undefined;
            titleConvo?: boolean | undefined;
            titleMethod?: "completion" | "functions" | "structured" | undefined;
            titleEndpoint?: string | undefined;
            titlePromptTemplate?: string | undefined;
        }>>;
        anthropic: z.ZodOptional<z.ZodObject<{
            streamRate: z.ZodOptional<z.ZodNumber>;
            baseURL: z.ZodOptional<z.ZodString>;
            titlePrompt: z.ZodOptional<z.ZodString>;
            titleModel: z.ZodOptional<z.ZodString>;
            titleConvo: z.ZodOptional<z.ZodBoolean>;
            titleMethod: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"completion">, z.ZodLiteral<"functions">, z.ZodLiteral<"structured">]>>;
            titleEndpoint: z.ZodOptional<z.ZodString>;
            titlePromptTemplate: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            baseURL?: string | undefined;
            streamRate?: number | undefined;
            titlePrompt?: string | undefined;
            titleModel?: string | undefined;
            titleConvo?: boolean | undefined;
            titleMethod?: "completion" | "functions" | "structured" | undefined;
            titleEndpoint?: string | undefined;
            titlePromptTemplate?: string | undefined;
        }, {
            baseURL?: string | undefined;
            streamRate?: number | undefined;
            titlePrompt?: string | undefined;
            titleModel?: string | undefined;
            titleConvo?: boolean | undefined;
            titleMethod?: "completion" | "functions" | "structured" | undefined;
            titleEndpoint?: string | undefined;
            titlePromptTemplate?: string | undefined;
        }>>;
        gptPlugins: z.ZodOptional<z.ZodObject<{
            streamRate: z.ZodOptional<z.ZodNumber>;
            baseURL: z.ZodOptional<z.ZodString>;
            titlePrompt: z.ZodOptional<z.ZodString>;
            titleModel: z.ZodOptional<z.ZodString>;
            titleConvo: z.ZodOptional<z.ZodBoolean>;
            titleMethod: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"completion">, z.ZodLiteral<"functions">, z.ZodLiteral<"structured">]>>;
            titleEndpoint: z.ZodOptional<z.ZodString>;
            titlePromptTemplate: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            baseURL?: string | undefined;
            streamRate?: number | undefined;
            titlePrompt?: string | undefined;
            titleModel?: string | undefined;
            titleConvo?: boolean | undefined;
            titleMethod?: "completion" | "functions" | "structured" | undefined;
            titleEndpoint?: string | undefined;
            titlePromptTemplate?: string | undefined;
        }, {
            baseURL?: string | undefined;
            streamRate?: number | undefined;
            titlePrompt?: string | undefined;
            titleModel?: string | undefined;
            titleConvo?: boolean | undefined;
            titleMethod?: "completion" | "functions" | "structured" | undefined;
            titleEndpoint?: string | undefined;
            titlePromptTemplate?: string | undefined;
        }>>;
        azureOpenAI: z.ZodOptional<z.ZodIntersection<z.ZodObject<{
            groups: z.ZodArray<z.ZodIntersection<z.ZodObject<{
                group: z.ZodString;
                models: z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodObject<{
                    deploymentName: z.ZodOptional<z.ZodString>;
                    version: z.ZodOptional<z.ZodString>;
                    assistants: z.ZodOptional<z.ZodBoolean>;
                }, "strip", z.ZodTypeAny, {
                    version?: string | undefined;
                    deploymentName?: string | undefined;
                    assistants?: boolean | undefined;
                }, {
                    version?: string | undefined;
                    deploymentName?: string | undefined;
                    assistants?: boolean | undefined;
                }>, z.ZodBoolean]>>;
            }, "strip", z.ZodTypeAny, {
                group: string;
                models: Record<string, boolean | {
                    version?: string | undefined;
                    deploymentName?: string | undefined;
                    assistants?: boolean | undefined;
                }>;
            }, {
                group: string;
                models: Record<string, boolean | {
                    version?: string | undefined;
                    deploymentName?: string | undefined;
                    assistants?: boolean | undefined;
                }>;
            }>, z.ZodObject<{
                apiKey: z.ZodString;
                serverless: z.ZodOptional<z.ZodBoolean>;
                instanceName: z.ZodOptional<z.ZodString>;
                deploymentName: z.ZodOptional<z.ZodString>;
                assistants: z.ZodOptional<z.ZodBoolean>;
                addParams: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
                dropParams: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                forcePrompt: z.ZodOptional<z.ZodBoolean>;
                version: z.ZodOptional<z.ZodString>;
                baseURL: z.ZodOptional<z.ZodString>;
                additionalHeaders: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
            }, "strip", z.ZodTypeAny, {
                apiKey: string;
                version?: string | undefined;
                baseURL?: string | undefined;
                instanceName?: string | undefined;
                deploymentName?: string | undefined;
                assistants?: boolean | undefined;
                serverless?: boolean | undefined;
                addParams?: Record<string, any> | undefined;
                dropParams?: string[] | undefined;
                forcePrompt?: boolean | undefined;
                additionalHeaders?: Record<string, any> | undefined;
            }, {
                apiKey: string;
                version?: string | undefined;
                baseURL?: string | undefined;
                instanceName?: string | undefined;
                deploymentName?: string | undefined;
                assistants?: boolean | undefined;
                serverless?: boolean | undefined;
                addParams?: Record<string, any> | undefined;
                dropParams?: string[] | undefined;
                forcePrompt?: boolean | undefined;
                additionalHeaders?: Record<string, any> | undefined;
            }>>, "many">;
            plugins: z.ZodOptional<z.ZodBoolean>;
            assistants: z.ZodOptional<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            groups: ({
                group: string;
                models: Record<string, boolean | {
                    version?: string | undefined;
                    deploymentName?: string | undefined;
                    assistants?: boolean | undefined;
                }>;
            } & {
                apiKey: string;
                version?: string | undefined;
                baseURL?: string | undefined;
                instanceName?: string | undefined;
                deploymentName?: string | undefined;
                assistants?: boolean | undefined;
                serverless?: boolean | undefined;
                addParams?: Record<string, any> | undefined;
                dropParams?: string[] | undefined;
                forcePrompt?: boolean | undefined;
                additionalHeaders?: Record<string, any> | undefined;
            })[];
            assistants?: boolean | undefined;
            plugins?: boolean | undefined;
        }, {
            groups: ({
                group: string;
                models: Record<string, boolean | {
                    version?: string | undefined;
                    deploymentName?: string | undefined;
                    assistants?: boolean | undefined;
                }>;
            } & {
                apiKey: string;
                version?: string | undefined;
                baseURL?: string | undefined;
                instanceName?: string | undefined;
                deploymentName?: string | undefined;
                assistants?: boolean | undefined;
                serverless?: boolean | undefined;
                addParams?: Record<string, any> | undefined;
                dropParams?: string[] | undefined;
                forcePrompt?: boolean | undefined;
                additionalHeaders?: Record<string, any> | undefined;
            })[];
            assistants?: boolean | undefined;
            plugins?: boolean | undefined;
        }>, z.ZodObject<{
            streamRate: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
            titlePrompt: z.ZodOptional<z.ZodOptional<z.ZodString>>;
            titleModel: z.ZodOptional<z.ZodOptional<z.ZodString>>;
            titleConvo: z.ZodOptional<z.ZodOptional<z.ZodBoolean>>;
            titleMethod: z.ZodOptional<z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"completion">, z.ZodLiteral<"functions">, z.ZodLiteral<"structured">]>>>;
            titlePromptTemplate: z.ZodOptional<z.ZodOptional<z.ZodString>>;
            summarize: z.ZodOptional<z.ZodOptional<z.ZodBoolean>>;
            summaryModel: z.ZodOptional<z.ZodOptional<z.ZodString>>;
            customOrder: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
        }, "strip", z.ZodTypeAny, {
            streamRate?: number | undefined;
            titlePrompt?: string | undefined;
            titleModel?: string | undefined;
            titleConvo?: boolean | undefined;
            titleMethod?: "completion" | "functions" | "structured" | undefined;
            titlePromptTemplate?: string | undefined;
            summarize?: boolean | undefined;
            summaryModel?: string | undefined;
            customOrder?: number | undefined;
        }, {
            streamRate?: number | undefined;
            titlePrompt?: string | undefined;
            titleModel?: string | undefined;
            titleConvo?: boolean | undefined;
            titleMethod?: "completion" | "functions" | "structured" | undefined;
            titlePromptTemplate?: string | undefined;
            summarize?: boolean | undefined;
            summaryModel?: string | undefined;
            customOrder?: number | undefined;
        }>>>;
        azureAssistants: z.ZodOptional<z.ZodObject<{
            streamRate: z.ZodOptional<z.ZodNumber>;
            baseURL: z.ZodOptional<z.ZodString>;
            titlePrompt: z.ZodOptional<z.ZodString>;
            titleModel: z.ZodOptional<z.ZodString>;
            titleConvo: z.ZodOptional<z.ZodBoolean>;
            titleMethod: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"completion">, z.ZodLiteral<"functions">, z.ZodLiteral<"structured">]>>;
            titleEndpoint: z.ZodOptional<z.ZodString>;
            titlePromptTemplate: z.ZodOptional<z.ZodString>;
        } & {
            disableBuilder: z.ZodOptional<z.ZodBoolean>;
            pollIntervalMs: z.ZodOptional<z.ZodNumber>;
            timeoutMs: z.ZodOptional<z.ZodNumber>;
            version: z.ZodDefault<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
            supportedIds: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            excludedIds: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            privateAssistants: z.ZodOptional<z.ZodBoolean>;
            retrievalModels: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
            capabilities: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodNativeEnum<typeof Capabilities>, "many">>>;
            apiKey: z.ZodOptional<z.ZodString>;
            models: z.ZodOptional<z.ZodObject<{
                default: z.ZodArray<z.ZodUnion<[z.ZodString, z.ZodObject<{
                    name: z.ZodString;
                    description: z.ZodOptional<z.ZodString>;
                }, "strip", z.ZodTypeAny, {
                    name: string;
                    description?: string | undefined;
                }, {
                    name: string;
                    description?: string | undefined;
                }>]>, "many">;
                fetch: z.ZodOptional<z.ZodBoolean>;
                userIdQuery: z.ZodOptional<z.ZodBoolean>;
            }, "strip", z.ZodTypeAny, {
                default: (string | {
                    name: string;
                    description?: string | undefined;
                })[];
                fetch?: boolean | undefined;
                userIdQuery?: boolean | undefined;
            }, {
                default: (string | {
                    name: string;
                    description?: string | undefined;
                })[];
                fetch?: boolean | undefined;
                userIdQuery?: boolean | undefined;
            }>>;
            headers: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
        }, "strip", z.ZodTypeAny, {
            version: string | number;
            retrievalModels: string[];
            capabilities: Capabilities[];
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
        }, {
            version?: string | number | undefined;
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
            retrievalModels?: string[] | undefined;
            capabilities?: Capabilities[] | undefined;
        }>>;
        assistants: z.ZodOptional<z.ZodObject<{
            streamRate: z.ZodOptional<z.ZodNumber>;
            baseURL: z.ZodOptional<z.ZodString>;
            titlePrompt: z.ZodOptional<z.ZodString>;
            titleModel: z.ZodOptional<z.ZodString>;
            titleConvo: z.ZodOptional<z.ZodBoolean>;
            titleMethod: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"completion">, z.ZodLiteral<"functions">, z.ZodLiteral<"structured">]>>;
            titleEndpoint: z.ZodOptional<z.ZodString>;
            titlePromptTemplate: z.ZodOptional<z.ZodString>;
        } & {
            disableBuilder: z.ZodOptional<z.ZodBoolean>;
            pollIntervalMs: z.ZodOptional<z.ZodNumber>;
            timeoutMs: z.ZodOptional<z.ZodNumber>;
            version: z.ZodDefault<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
            supportedIds: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            excludedIds: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            privateAssistants: z.ZodOptional<z.ZodBoolean>;
            retrievalModels: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
            capabilities: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodNativeEnum<typeof Capabilities>, "many">>>;
            apiKey: z.ZodOptional<z.ZodString>;
            models: z.ZodOptional<z.ZodObject<{
                default: z.ZodArray<z.ZodUnion<[z.ZodString, z.ZodObject<{
                    name: z.ZodString;
                    description: z.ZodOptional<z.ZodString>;
                }, "strip", z.ZodTypeAny, {
                    name: string;
                    description?: string | undefined;
                }, {
                    name: string;
                    description?: string | undefined;
                }>]>, "many">;
                fetch: z.ZodOptional<z.ZodBoolean>;
                userIdQuery: z.ZodOptional<z.ZodBoolean>;
            }, "strip", z.ZodTypeAny, {
                default: (string | {
                    name: string;
                    description?: string | undefined;
                })[];
                fetch?: boolean | undefined;
                userIdQuery?: boolean | undefined;
            }, {
                default: (string | {
                    name: string;
                    description?: string | undefined;
                })[];
                fetch?: boolean | undefined;
                userIdQuery?: boolean | undefined;
            }>>;
            headers: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
        }, "strip", z.ZodTypeAny, {
            version: string | number;
            retrievalModels: string[];
            capabilities: Capabilities[];
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
        }, {
            version?: string | number | undefined;
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
            retrievalModels?: string[] | undefined;
            capabilities?: Capabilities[] | undefined;
        }>>;
        agents: z.ZodOptional<z.ZodDefault<z.ZodObject<{
            streamRate: z.ZodOptional<z.ZodNumber>;
            baseURL: z.ZodOptional<z.ZodString>;
            titlePrompt: z.ZodOptional<z.ZodString>;
            titleModel: z.ZodOptional<z.ZodString>;
            titleConvo: z.ZodOptional<z.ZodBoolean>;
            titleMethod: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"completion">, z.ZodLiteral<"functions">, z.ZodLiteral<"structured">]>>;
            titleEndpoint: z.ZodOptional<z.ZodString>;
            titlePromptTemplate: z.ZodOptional<z.ZodString>;
        } & {
            recursionLimit: z.ZodOptional<z.ZodNumber>;
            disableBuilder: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
            maxRecursionLimit: z.ZodOptional<z.ZodNumber>;
            maxCitations: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
            maxCitationsPerFile: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
            minRelevanceScore: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
            allowedProviders: z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodString, z.ZodNativeEnum<typeof EModelEndpoint>]>, "many">>;
            capabilities: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodNativeEnum<typeof AgentCapabilities>, "many">>>;
        }, "strip", z.ZodTypeAny, {
            disableBuilder: boolean;
            capabilities: AgentCapabilities[];
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
        }, {
            baseURL?: string | undefined;
            streamRate?: number | undefined;
            titlePrompt?: string | undefined;
            titleModel?: string | undefined;
            titleConvo?: boolean | undefined;
            titleMethod?: "completion" | "functions" | "structured" | undefined;
            titleEndpoint?: string | undefined;
            titlePromptTemplate?: string | undefined;
            disableBuilder?: boolean | undefined;
            capabilities?: AgentCapabilities[] | undefined;
            recursionLimit?: number | undefined;
            maxRecursionLimit?: number | undefined;
            maxCitations?: number | undefined;
            maxCitationsPerFile?: number | undefined;
            minRelevanceScore?: number | undefined;
            allowedProviders?: string[] | undefined;
        }>>>;
        custom: z.ZodOptional<z.ZodOptional<z.ZodArray<z.ZodObject<{
            streamRate: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
            titlePrompt: z.ZodOptional<z.ZodOptional<z.ZodString>>;
            titleModel: z.ZodOptional<z.ZodOptional<z.ZodString>>;
            titleConvo: z.ZodOptional<z.ZodOptional<z.ZodBoolean>>;
            titleMethod: z.ZodOptional<z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"completion">, z.ZodLiteral<"functions">, z.ZodLiteral<"structured">]>>>;
            titleEndpoint: z.ZodOptional<z.ZodOptional<z.ZodString>>;
            titlePromptTemplate: z.ZodOptional<z.ZodOptional<z.ZodString>>;
            name: z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>;
            apiKey: z.ZodOptional<z.ZodString>;
            baseURL: z.ZodOptional<z.ZodString>;
            models: z.ZodOptional<z.ZodObject<{
                default: z.ZodArray<z.ZodUnion<[z.ZodString, z.ZodObject<{
                    name: z.ZodString;
                    description: z.ZodOptional<z.ZodString>;
                }, "strip", z.ZodTypeAny, {
                    name: string;
                    description?: string | undefined;
                }, {
                    name: string;
                    description?: string | undefined;
                }>]>, "many">;
                fetch: z.ZodOptional<z.ZodBoolean>;
                userIdQuery: z.ZodOptional<z.ZodBoolean>;
            }, "strip", z.ZodTypeAny, {
                default: (string | {
                    name: string;
                    description?: string | undefined;
                })[];
                fetch?: boolean | undefined;
                userIdQuery?: boolean | undefined;
            }, {
                default: (string | {
                    name: string;
                    description?: string | undefined;
                })[];
                fetch?: boolean | undefined;
                userIdQuery?: boolean | undefined;
            }>>;
            summarize: z.ZodOptional<z.ZodOptional<z.ZodBoolean>>;
            summaryModel: z.ZodOptional<z.ZodOptional<z.ZodString>>;
            iconURL: z.ZodOptional<z.ZodOptional<z.ZodString>>;
            forcePrompt: z.ZodOptional<z.ZodOptional<z.ZodBoolean>>;
            modelDisplayLabel: z.ZodOptional<z.ZodOptional<z.ZodString>>;
            headers: z.ZodOptional<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>>;
            addParams: z.ZodOptional<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>>;
            dropParams: z.ZodOptional<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
            customParams: z.ZodOptional<z.ZodObject<{
                defaultParamsEndpoint: z.ZodDefault<z.ZodString>;
                paramDefinitions: z.ZodOptional<z.ZodArray<z.ZodRecord<z.ZodString, z.ZodAny>, "many">>;
            }, "strict", z.ZodTypeAny, {
                defaultParamsEndpoint: string;
                paramDefinitions?: Record<string, any>[] | undefined;
            }, {
                defaultParamsEndpoint?: string | undefined;
                paramDefinitions?: Record<string, any>[] | undefined;
            }>>;
            customOrder: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
            directEndpoint: z.ZodOptional<z.ZodOptional<z.ZodBoolean>>;
            titleMessageRole: z.ZodOptional<z.ZodOptional<z.ZodString>>;
        }, "strip", z.ZodTypeAny, {
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
        }, {
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
                defaultParamsEndpoint?: string | undefined;
                paramDefinitions?: Record<string, any>[] | undefined;
            } | undefined;
            customOrder?: number | undefined;
            directEndpoint?: boolean | undefined;
            titleMessageRole?: string | undefined;
        }>, "many">>>;
        bedrock: z.ZodOptional<z.ZodObject<{
            streamRate: z.ZodOptional<z.ZodNumber>;
            baseURL: z.ZodOptional<z.ZodString>;
            titlePrompt: z.ZodOptional<z.ZodString>;
            titleModel: z.ZodOptional<z.ZodString>;
            titleConvo: z.ZodOptional<z.ZodBoolean>;
            titleMethod: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"completion">, z.ZodLiteral<"functions">, z.ZodLiteral<"structured">]>>;
            titleEndpoint: z.ZodOptional<z.ZodString>;
            titlePromptTemplate: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            baseURL?: string | undefined;
            streamRate?: number | undefined;
            titlePrompt?: string | undefined;
            titleModel?: string | undefined;
            titleConvo?: boolean | undefined;
            titleMethod?: "completion" | "functions" | "structured" | undefined;
            titleEndpoint?: string | undefined;
            titlePromptTemplate?: string | undefined;
        }, {
            baseURL?: string | undefined;
            streamRate?: number | undefined;
            titlePrompt?: string | undefined;
            titleModel?: string | undefined;
            titleConvo?: boolean | undefined;
            titleMethod?: "completion" | "functions" | "structured" | undefined;
            titleEndpoint?: string | undefined;
            titlePromptTemplate?: string | undefined;
        }>>;
    }, "strict", z.ZodTypeAny, {
        azureOpenAI?: ({
            groups: ({
                group: string;
                models: Record<string, boolean | {
                    version?: string | undefined;
                    deploymentName?: string | undefined;
                    assistants?: boolean | undefined;
                }>;
            } & {
                apiKey: string;
                version?: string | undefined;
                baseURL?: string | undefined;
                instanceName?: string | undefined;
                deploymentName?: string | undefined;
                assistants?: boolean | undefined;
                serverless?: boolean | undefined;
                addParams?: Record<string, any> | undefined;
                dropParams?: string[] | undefined;
                forcePrompt?: boolean | undefined;
                additionalHeaders?: Record<string, any> | undefined;
            })[];
            assistants?: boolean | undefined;
            plugins?: boolean | undefined;
        } & {
            streamRate?: number | undefined;
            titlePrompt?: string | undefined;
            titleModel?: string | undefined;
            titleConvo?: boolean | undefined;
            titleMethod?: "completion" | "functions" | "structured" | undefined;
            titlePromptTemplate?: string | undefined;
            summarize?: boolean | undefined;
            summaryModel?: string | undefined;
            customOrder?: number | undefined;
        }) | undefined;
        openAI?: {
            baseURL?: string | undefined;
            streamRate?: number | undefined;
            titlePrompt?: string | undefined;
            titleModel?: string | undefined;
            titleConvo?: boolean | undefined;
            titleMethod?: "completion" | "functions" | "structured" | undefined;
            titleEndpoint?: string | undefined;
            titlePromptTemplate?: string | undefined;
        } | undefined;
        google?: {
            baseURL?: string | undefined;
            streamRate?: number | undefined;
            titlePrompt?: string | undefined;
            titleModel?: string | undefined;
            titleConvo?: boolean | undefined;
            titleMethod?: "completion" | "functions" | "structured" | undefined;
            titleEndpoint?: string | undefined;
            titlePromptTemplate?: string | undefined;
        } | undefined;
        anthropic?: {
            baseURL?: string | undefined;
            streamRate?: number | undefined;
            titlePrompt?: string | undefined;
            titleModel?: string | undefined;
            titleConvo?: boolean | undefined;
            titleMethod?: "completion" | "functions" | "structured" | undefined;
            titleEndpoint?: string | undefined;
            titlePromptTemplate?: string | undefined;
        } | undefined;
        assistants?: {
            version: string | number;
            retrievalModels: string[];
            capabilities: Capabilities[];
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
        } | undefined;
        azureAssistants?: {
            version: string | number;
            retrievalModels: string[];
            capabilities: Capabilities[];
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
        } | undefined;
        agents?: {
            disableBuilder: boolean;
            capabilities: AgentCapabilities[];
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
        } | undefined;
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
        bedrock?: {
            baseURL?: string | undefined;
            streamRate?: number | undefined;
            titlePrompt?: string | undefined;
            titleModel?: string | undefined;
            titleConvo?: boolean | undefined;
            titleMethod?: "completion" | "functions" | "structured" | undefined;
            titleEndpoint?: string | undefined;
            titlePromptTemplate?: string | undefined;
        } | undefined;
        gptPlugins?: {
            baseURL?: string | undefined;
            streamRate?: number | undefined;
            titlePrompt?: string | undefined;
            titleModel?: string | undefined;
            titleConvo?: boolean | undefined;
            titleMethod?: "completion" | "functions" | "structured" | undefined;
            titleEndpoint?: string | undefined;
            titlePromptTemplate?: string | undefined;
        } | undefined;
        all?: {
            baseURL?: string | undefined;
            streamRate?: number | undefined;
            titlePrompt?: string | undefined;
            titleModel?: string | undefined;
            titleConvo?: boolean | undefined;
            titleMethod?: "completion" | "functions" | "structured" | undefined;
            titleEndpoint?: string | undefined;
            titlePromptTemplate?: string | undefined;
        } | undefined;
    }, {
        azureOpenAI?: ({
            groups: ({
                group: string;
                models: Record<string, boolean | {
                    version?: string | undefined;
                    deploymentName?: string | undefined;
                    assistants?: boolean | undefined;
                }>;
            } & {
                apiKey: string;
                version?: string | undefined;
                baseURL?: string | undefined;
                instanceName?: string | undefined;
                deploymentName?: string | undefined;
                assistants?: boolean | undefined;
                serverless?: boolean | undefined;
                addParams?: Record<string, any> | undefined;
                dropParams?: string[] | undefined;
                forcePrompt?: boolean | undefined;
                additionalHeaders?: Record<string, any> | undefined;
            })[];
            assistants?: boolean | undefined;
            plugins?: boolean | undefined;
        } & {
            streamRate?: number | undefined;
            titlePrompt?: string | undefined;
            titleModel?: string | undefined;
            titleConvo?: boolean | undefined;
            titleMethod?: "completion" | "functions" | "structured" | undefined;
            titlePromptTemplate?: string | undefined;
            summarize?: boolean | undefined;
            summaryModel?: string | undefined;
            customOrder?: number | undefined;
        }) | undefined;
        openAI?: {
            baseURL?: string | undefined;
            streamRate?: number | undefined;
            titlePrompt?: string | undefined;
            titleModel?: string | undefined;
            titleConvo?: boolean | undefined;
            titleMethod?: "completion" | "functions" | "structured" | undefined;
            titleEndpoint?: string | undefined;
            titlePromptTemplate?: string | undefined;
        } | undefined;
        google?: {
            baseURL?: string | undefined;
            streamRate?: number | undefined;
            titlePrompt?: string | undefined;
            titleModel?: string | undefined;
            titleConvo?: boolean | undefined;
            titleMethod?: "completion" | "functions" | "structured" | undefined;
            titleEndpoint?: string | undefined;
            titlePromptTemplate?: string | undefined;
        } | undefined;
        anthropic?: {
            baseURL?: string | undefined;
            streamRate?: number | undefined;
            titlePrompt?: string | undefined;
            titleModel?: string | undefined;
            titleConvo?: boolean | undefined;
            titleMethod?: "completion" | "functions" | "structured" | undefined;
            titleEndpoint?: string | undefined;
            titlePromptTemplate?: string | undefined;
        } | undefined;
        assistants?: {
            version?: string | number | undefined;
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
            retrievalModels?: string[] | undefined;
            capabilities?: Capabilities[] | undefined;
        } | undefined;
        azureAssistants?: {
            version?: string | number | undefined;
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
            retrievalModels?: string[] | undefined;
            capabilities?: Capabilities[] | undefined;
        } | undefined;
        agents?: {
            baseURL?: string | undefined;
            streamRate?: number | undefined;
            titlePrompt?: string | undefined;
            titleModel?: string | undefined;
            titleConvo?: boolean | undefined;
            titleMethod?: "completion" | "functions" | "structured" | undefined;
            titleEndpoint?: string | undefined;
            titlePromptTemplate?: string | undefined;
            disableBuilder?: boolean | undefined;
            capabilities?: AgentCapabilities[] | undefined;
            recursionLimit?: number | undefined;
            maxRecursionLimit?: number | undefined;
            maxCitations?: number | undefined;
            maxCitationsPerFile?: number | undefined;
            minRelevanceScore?: number | undefined;
            allowedProviders?: string[] | undefined;
        } | undefined;
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
                defaultParamsEndpoint?: string | undefined;
                paramDefinitions?: Record<string, any>[] | undefined;
            } | undefined;
            customOrder?: number | undefined;
            directEndpoint?: boolean | undefined;
            titleMessageRole?: string | undefined;
        }[] | undefined;
        bedrock?: {
            baseURL?: string | undefined;
            streamRate?: number | undefined;
            titlePrompt?: string | undefined;
            titleModel?: string | undefined;
            titleConvo?: boolean | undefined;
            titleMethod?: "completion" | "functions" | "structured" | undefined;
            titleEndpoint?: string | undefined;
            titlePromptTemplate?: string | undefined;
        } | undefined;
        gptPlugins?: {
            baseURL?: string | undefined;
            streamRate?: number | undefined;
            titlePrompt?: string | undefined;
            titleModel?: string | undefined;
            titleConvo?: boolean | undefined;
            titleMethod?: "completion" | "functions" | "structured" | undefined;
            titleEndpoint?: string | undefined;
            titlePromptTemplate?: string | undefined;
        } | undefined;
        all?: {
            baseURL?: string | undefined;
            streamRate?: number | undefined;
            titlePrompt?: string | undefined;
            titleModel?: string | undefined;
            titleConvo?: boolean | undefined;
            titleMethod?: "completion" | "functions" | "structured" | undefined;
            titleEndpoint?: string | undefined;
            titlePromptTemplate?: string | undefined;
        } | undefined;
    }>, {
        azureOpenAI?: ({
            groups: ({
                group: string;
                models: Record<string, boolean | {
                    version?: string | undefined;
                    deploymentName?: string | undefined;
                    assistants?: boolean | undefined;
                }>;
            } & {
                apiKey: string;
                version?: string | undefined;
                baseURL?: string | undefined;
                instanceName?: string | undefined;
                deploymentName?: string | undefined;
                assistants?: boolean | undefined;
                serverless?: boolean | undefined;
                addParams?: Record<string, any> | undefined;
                dropParams?: string[] | undefined;
                forcePrompt?: boolean | undefined;
                additionalHeaders?: Record<string, any> | undefined;
            })[];
            assistants?: boolean | undefined;
            plugins?: boolean | undefined;
        } & {
            streamRate?: number | undefined;
            titlePrompt?: string | undefined;
            titleModel?: string | undefined;
            titleConvo?: boolean | undefined;
            titleMethod?: "completion" | "functions" | "structured" | undefined;
            titlePromptTemplate?: string | undefined;
            summarize?: boolean | undefined;
            summaryModel?: string | undefined;
            customOrder?: number | undefined;
        }) | undefined;
        openAI?: {
            baseURL?: string | undefined;
            streamRate?: number | undefined;
            titlePrompt?: string | undefined;
            titleModel?: string | undefined;
            titleConvo?: boolean | undefined;
            titleMethod?: "completion" | "functions" | "structured" | undefined;
            titleEndpoint?: string | undefined;
            titlePromptTemplate?: string | undefined;
        } | undefined;
        google?: {
            baseURL?: string | undefined;
            streamRate?: number | undefined;
            titlePrompt?: string | undefined;
            titleModel?: string | undefined;
            titleConvo?: boolean | undefined;
            titleMethod?: "completion" | "functions" | "structured" | undefined;
            titleEndpoint?: string | undefined;
            titlePromptTemplate?: string | undefined;
        } | undefined;
        anthropic?: {
            baseURL?: string | undefined;
            streamRate?: number | undefined;
            titlePrompt?: string | undefined;
            titleModel?: string | undefined;
            titleConvo?: boolean | undefined;
            titleMethod?: "completion" | "functions" | "structured" | undefined;
            titleEndpoint?: string | undefined;
            titlePromptTemplate?: string | undefined;
        } | undefined;
        assistants?: {
            version: string | number;
            retrievalModels: string[];
            capabilities: Capabilities[];
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
        } | undefined;
        azureAssistants?: {
            version: string | number;
            retrievalModels: string[];
            capabilities: Capabilities[];
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
        } | undefined;
        agents?: {
            disableBuilder: boolean;
            capabilities: AgentCapabilities[];
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
        } | undefined;
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
        bedrock?: {
            baseURL?: string | undefined;
            streamRate?: number | undefined;
            titlePrompt?: string | undefined;
            titleModel?: string | undefined;
            titleConvo?: boolean | undefined;
            titleMethod?: "completion" | "functions" | "structured" | undefined;
            titleEndpoint?: string | undefined;
            titlePromptTemplate?: string | undefined;
        } | undefined;
        gptPlugins?: {
            baseURL?: string | undefined;
            streamRate?: number | undefined;
            titlePrompt?: string | undefined;
            titleModel?: string | undefined;
            titleConvo?: boolean | undefined;
            titleMethod?: "completion" | "functions" | "structured" | undefined;
            titleEndpoint?: string | undefined;
            titlePromptTemplate?: string | undefined;
        } | undefined;
        all?: {
            baseURL?: string | undefined;
            streamRate?: number | undefined;
            titlePrompt?: string | undefined;
            titleModel?: string | undefined;
            titleConvo?: boolean | undefined;
            titleMethod?: "completion" | "functions" | "structured" | undefined;
            titleEndpoint?: string | undefined;
            titlePromptTemplate?: string | undefined;
        } | undefined;
    }, {
        azureOpenAI?: ({
            groups: ({
                group: string;
                models: Record<string, boolean | {
                    version?: string | undefined;
                    deploymentName?: string | undefined;
                    assistants?: boolean | undefined;
                }>;
            } & {
                apiKey: string;
                version?: string | undefined;
                baseURL?: string | undefined;
                instanceName?: string | undefined;
                deploymentName?: string | undefined;
                assistants?: boolean | undefined;
                serverless?: boolean | undefined;
                addParams?: Record<string, any> | undefined;
                dropParams?: string[] | undefined;
                forcePrompt?: boolean | undefined;
                additionalHeaders?: Record<string, any> | undefined;
            })[];
            assistants?: boolean | undefined;
            plugins?: boolean | undefined;
        } & {
            streamRate?: number | undefined;
            titlePrompt?: string | undefined;
            titleModel?: string | undefined;
            titleConvo?: boolean | undefined;
            titleMethod?: "completion" | "functions" | "structured" | undefined;
            titlePromptTemplate?: string | undefined;
            summarize?: boolean | undefined;
            summaryModel?: string | undefined;
            customOrder?: number | undefined;
        }) | undefined;
        openAI?: {
            baseURL?: string | undefined;
            streamRate?: number | undefined;
            titlePrompt?: string | undefined;
            titleModel?: string | undefined;
            titleConvo?: boolean | undefined;
            titleMethod?: "completion" | "functions" | "structured" | undefined;
            titleEndpoint?: string | undefined;
            titlePromptTemplate?: string | undefined;
        } | undefined;
        google?: {
            baseURL?: string | undefined;
            streamRate?: number | undefined;
            titlePrompt?: string | undefined;
            titleModel?: string | undefined;
            titleConvo?: boolean | undefined;
            titleMethod?: "completion" | "functions" | "structured" | undefined;
            titleEndpoint?: string | undefined;
            titlePromptTemplate?: string | undefined;
        } | undefined;
        anthropic?: {
            baseURL?: string | undefined;
            streamRate?: number | undefined;
            titlePrompt?: string | undefined;
            titleModel?: string | undefined;
            titleConvo?: boolean | undefined;
            titleMethod?: "completion" | "functions" | "structured" | undefined;
            titleEndpoint?: string | undefined;
            titlePromptTemplate?: string | undefined;
        } | undefined;
        assistants?: {
            version?: string | number | undefined;
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
            retrievalModels?: string[] | undefined;
            capabilities?: Capabilities[] | undefined;
        } | undefined;
        azureAssistants?: {
            version?: string | number | undefined;
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
            retrievalModels?: string[] | undefined;
            capabilities?: Capabilities[] | undefined;
        } | undefined;
        agents?: {
            baseURL?: string | undefined;
            streamRate?: number | undefined;
            titlePrompt?: string | undefined;
            titleModel?: string | undefined;
            titleConvo?: boolean | undefined;
            titleMethod?: "completion" | "functions" | "structured" | undefined;
            titleEndpoint?: string | undefined;
            titlePromptTemplate?: string | undefined;
            disableBuilder?: boolean | undefined;
            capabilities?: AgentCapabilities[] | undefined;
            recursionLimit?: number | undefined;
            maxRecursionLimit?: number | undefined;
            maxCitations?: number | undefined;
            maxCitationsPerFile?: number | undefined;
            minRelevanceScore?: number | undefined;
            allowedProviders?: string[] | undefined;
        } | undefined;
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
                defaultParamsEndpoint?: string | undefined;
                paramDefinitions?: Record<string, any>[] | undefined;
            } | undefined;
            customOrder?: number | undefined;
            directEndpoint?: boolean | undefined;
            titleMessageRole?: string | undefined;
        }[] | undefined;
        bedrock?: {
            baseURL?: string | undefined;
            streamRate?: number | undefined;
            titlePrompt?: string | undefined;
            titleModel?: string | undefined;
            titleConvo?: boolean | undefined;
            titleMethod?: "completion" | "functions" | "structured" | undefined;
            titleEndpoint?: string | undefined;
            titlePromptTemplate?: string | undefined;
        } | undefined;
        gptPlugins?: {
            baseURL?: string | undefined;
            streamRate?: number | undefined;
            titlePrompt?: string | undefined;
            titleModel?: string | undefined;
            titleConvo?: boolean | undefined;
            titleMethod?: "completion" | "functions" | "structured" | undefined;
            titleEndpoint?: string | undefined;
            titlePromptTemplate?: string | undefined;
        } | undefined;
        all?: {
            baseURL?: string | undefined;
            streamRate?: number | undefined;
            titlePrompt?: string | undefined;
            titleModel?: string | undefined;
            titleConvo?: boolean | undefined;
            titleMethod?: "completion" | "functions" | "structured" | undefined;
            titleEndpoint?: string | undefined;
            titlePromptTemplate?: string | undefined;
        } | undefined;
    }>>;
}>;
export type TCustomConfig = DeepPartial<z.infer<typeof configSchema>>;
export type TCustomEndpoints = z.infer<typeof customEndpointsSchema>;
export type TProviderSchema = z.infer<typeof ttsOpenaiSchema> | z.infer<typeof ttsElevenLabsSchema> | z.infer<typeof ttsLocalaiSchema> | undefined;
export declare enum KnownEndpoints {
    anyscale = "anyscale",
    apipie = "apipie",
    cohere = "cohere",
    fireworks = "fireworks",
    deepseek = "deepseek",
    groq = "groq",
    huggingface = "huggingface",
    mistral = "mistral",
    mlx = "mlx",
    ollama = "ollama",
    openrouter = "openrouter",
    perplexity = "perplexity",
    shuttleai = "shuttleai",
    'together.ai' = "together.ai",
    unify = "unify",
    vercel = "vercel",
    xai = "xai"
}
export declare enum FetchTokenConfig {
    openrouter = "openrouter"
}
export declare const defaultEndpoints: EModelEndpoint[];
export declare const alternateName: {
    openAI: string;
    assistants: string;
    agents: string;
    azureAssistants: string;
    azureOpenAI: string;
    chatGPTBrowser: string;
    gptPlugins: string;
    google: string;
    anthropic: string;
    custom: string;
    bedrock: string;
    ollama: string;
    deepseek: string;
    xai: string;
    vercel: string;
};
export declare const bedrockModels: string[];
export declare const defaultModels: {
    azureAssistants: string[];
    assistants: string[];
    agents: string[];
    google: string[];
    anthropic: string[];
    openAI: string[];
    bedrock: string[];
};
export declare const initialModelsConfig: TModelsConfig;
export declare const EndpointURLs: {
    readonly assistants: `${string}/api/assistants/v2/chat`;
    readonly azureAssistants: `${string}/api/assistants/v1/chat`;
    readonly agents: `${string}/api/agents/chat`;
};
export declare const modularEndpoints: Set<string>;
export declare const supportsBalanceCheck: {
    custom: boolean;
    openAI: boolean;
    anthropic: boolean;
    gptPlugins: boolean;
    assistants: boolean;
    agents: boolean;
    azureAssistants: boolean;
    azureOpenAI: boolean;
    bedrock: boolean;
};
export declare const visionModels: string[];
export declare enum VisionModes {
    generative = "generative",
    agents = "agents"
}
export declare function validateVisionModel({ model, additionalModels, availableModels, }: {
    model: string;
    additionalModels?: string[];
    availableModels?: string[];
}): boolean;
export declare const imageGenTools: Set<string>;
/**
 * Enum for collections using infinite queries
 */
export declare enum InfiniteCollections {
    /**
     * Collection for Prompt Groups
     */
    PROMPT_GROUPS = "promptGroups",
    /**
     * Collection for Shared Links
     */
    SHARED_LINKS = "sharedLinks"
}
/**
 * Enum for time intervals
 */
export declare enum Time {
    ONE_DAY = 86400000,
    ONE_HOUR = 3600000,
    THIRTY_MINUTES = 1800000,
    TEN_MINUTES = 600000,
    FIVE_MINUTES = 300000,
    THREE_MINUTES = 180000,
    TWO_MINUTES = 120000,
    ONE_MINUTE = 60000,
    THIRTY_SECONDS = 30000
}
/**
 * Enum for cache keys.
 */
export declare enum CacheKeys {
    /**
     * Key for the config store namespace.
     */
    CONFIG_STORE = "CONFIG_STORE",
    /**
     * Key for the roles cache.
     */
    ROLES = "ROLES",
    /**
     * Key for the plugins cache.
     */
    PLUGINS = "PLUGINS",
    /**
     * Key for the title generation cache.
     */
    GEN_TITLE = "GEN_TITLE",
    /**
     * Key for the tools cache.
     */
    TOOLS = "TOOLS",
    /**
     * Key for the model config cache.
     */
    MODELS_CONFIG = "MODELS_CONFIG",
    /**
     * Key for the model queries cache.
     */
    MODEL_QUERIES = "MODEL_QUERIES",
    /**
     * Key for the default startup config cache.
     */
    STARTUP_CONFIG = "STARTUP_CONFIG",
    /**
     * Key for the default endpoint config cache.
     */
    ENDPOINT_CONFIG = "ENDPOINT_CONFIG",
    /**
     * Key for accessing the model token config cache.
     */
    TOKEN_CONFIG = "TOKEN_CONFIG",
    /**
     * Key for the app config namespace.
     */
    APP_CONFIG = "APP_CONFIG",
    /**
     * Key for accessing Abort Keys
     */
    ABORT_KEYS = "ABORT_KEYS",
    /**
     * Key for the bans cache.
     */
    BANS = "BANS",
    /**
     * Key for the encoded domains cache.
     * Used by Azure OpenAI Assistants.
     */
    ENCODED_DOMAINS = "ENCODED_DOMAINS",
    /**
     * Key for the cached audio run Ids.
     */
    AUDIO_RUNS = "AUDIO_RUNS",
    /**
     * Key for in-progress messages.
     */
    MESSAGES = "MESSAGES",
    /**
     * Key for in-progress flow states.
     */
    FLOWS = "FLOWS",
    /**
     * Key for pending chat requests (concurrency check)
     */
    PENDING_REQ = "PENDING_REQ",
    /**
     * Key for s3 check intervals per user
     */
    S3_EXPIRY_INTERVAL = "S3_EXPIRY_INTERVAL",
    /**
     * key for open id exchanged tokens
     */
    OPENID_EXCHANGED_TOKENS = "OPENID_EXCHANGED_TOKENS",
    /**
     * Key for OpenID session.
     */
    OPENID_SESSION = "OPENID_SESSION",
    /**
     * Key for SAML session.
     */
    SAML_SESSION = "SAML_SESSION"
}
/**
 * Enum for violation types, used to identify, log, and cache violations.
 */
export declare enum ViolationTypes {
    /**
     * File Upload Violations (exceeding limit).
     */
    FILE_UPLOAD_LIMIT = "file_upload_limit",
    /**
     * Illegal Model Request (not available).
     */
    ILLEGAL_MODEL_REQUEST = "illegal_model_request",
    /**
     * Token Limit Violation.
     */
    TOKEN_BALANCE = "token_balance",
    /**
     * An issued ban.
     */
    BAN = "ban",
    /**
     * TTS Request Limit Violation.
     */
    TTS_LIMIT = "tts_limit",
    /**
     * STT Request Limit Violation.
     */
    STT_LIMIT = "stt_limit",
    /**
     * Reset Password Limit Violation.
     */
    RESET_PASSWORD_LIMIT = "reset_password_limit",
    /**
     * Verify Email Limit Violation.
     */
    VERIFY_EMAIL_LIMIT = "verify_email_limit",
    /**
     * Verify Conversation Access violation.
     */
    CONVO_ACCESS = "convo_access",
    /**
     * Tool Call Limit Violation.
     */
    TOOL_CALL_LIMIT = "tool_call_limit",
    /**
     * General violation (catch-all).
     */
    GENERAL = "general",
    /**
     * Login attempt violations.
     */
    LOGINS = "logins",
    /**
     * Concurrent request violations.
     */
    CONCURRENT = "concurrent",
    /**
     * Non-browser access violations.
     */
    NON_BROWSER = "non_browser",
    /**
     * Message limit violations.
     */
    MESSAGE_LIMIT = "message_limit",
    /**
     * Registration violations.
     */
    REGISTRATIONS = "registrations"
}
/**
 * Enum for error message types that are not "violations" as above, used to identify client-facing errors.
 */
export declare enum ErrorTypes {
    /**
     * No User-provided Key.
     */
    NO_USER_KEY = "no_user_key",
    /**
     * Expired User-provided Key.
     */
    EXPIRED_USER_KEY = "expired_user_key",
    /**
     * Invalid User-provided Key.
     */
    INVALID_USER_KEY = "invalid_user_key",
    /**
     * No Base URL Provided.
     */
    NO_BASE_URL = "no_base_url",
    /**
     * Moderation error
     */
    MODERATION = "moderation",
    /**
     * Prompt exceeds max length
     */
    INPUT_LENGTH = "INPUT_LENGTH",
    /**
     * Invalid request error, API rejected request
     */
    INVALID_REQUEST = "invalid_request_error",
    /**
     * Invalid action request error, likely not on list of allowed domains
     */
    INVALID_ACTION = "invalid_action_error",
    /**
     * Invalid request error, API rejected request
     */
    NO_SYSTEM_MESSAGES = "no_system_messages",
    /**
     * Google provider returned an error
     */
    GOOGLE_ERROR = "google_error",
    /**
     * Google provider does not allow custom tools with built-in tools
     */
    GOOGLE_TOOL_CONFLICT = "google_tool_conflict",
    /**
     * Invalid Agent Provider (excluded by Admin)
     */
    INVALID_AGENT_PROVIDER = "invalid_agent_provider",
    /**
     * Missing model selection
     */
    MISSING_MODEL = "missing_model",
    /**
     * Models configuration not loaded
     */
    MODELS_NOT_LOADED = "models_not_loaded",
    /**
     * Endpoint models not loaded
     */
    ENDPOINT_MODELS_NOT_LOADED = "endpoint_models_not_loaded",
    /**
     * Generic Authentication failure
     */
    AUTH_FAILED = "auth_failed"
}
/**
 * Enum for authentication keys.
 */
export declare enum AuthKeys {
    /**
     * Key for the Service Account to use Vertex AI.
     */
    GOOGLE_SERVICE_KEY = "GOOGLE_SERVICE_KEY",
    /**
     * API key to use Google Generative AI.
     *
     * Note: this is not for Environment Variables, but to access encrypted object values.
     */
    GOOGLE_API_KEY = "GOOGLE_API_KEY"
}
/**
 * Enum for Image Detail Cost.
 *
 * **Low Res Fixed Cost:** `85`
 *
 * **High Res Calculation:**
 *
 * Number of `512px` Tiles * `170` + `85` (Additional Cost)
 */
export declare enum ImageDetailCost {
    /**
     * Low resolution is a fixed value.
     */
    LOW = 85,
    /**
     * High resolution Cost Per Tile
     */
    HIGH = 170,
    /**
     * Additional Cost added to High Resolution Total Cost
     */
    ADDITIONAL = 85
}
/**
 * Tab values for Settings Dialog
 */
export declare enum SettingsTabValues {
    /**
     * Tab for General Settings
     */
    GENERAL = "general",
    /**
     * Tab for Chat Settings
     */
    CHAT = "chat",
    /**
     * Tab for Speech Settings
     */
    SPEECH = "speech",
    /**
     * Tab for Beta Features
     */
    BETA = "beta",
    /**
     * Tab for Data Controls
     */
    DATA = "data",
    /**
     * Tab for Balance Settings
     */
    BALANCE = "balance",
    /**
     * Tab for Account Settings
     */
    ACCOUNT = "account",
    /**
     * Chat input commands
     */
    COMMANDS = "commands",
    /**
     * Tab for Personalization Settings
     */
    PERSONALIZATION = "personalization"
}
export declare enum STTProviders {
    /**
     * Provider for OpenAI STT
     */
    OPENAI = "openai",
    /**
     * Provider for Microsoft Azure STT
     */
    AZURE_OPENAI = "azureOpenAI"
}
export declare enum TTSProviders {
    /**
     * Provider for OpenAI TTS
     */
    OPENAI = "openai",
    /**
     * Provider for Microsoft Azure OpenAI TTS
     */
    AZURE_OPENAI = "azureOpenAI",
    /**
     * Provider for ElevenLabs TTS
     */
    ELEVENLABS = "elevenlabs",
    /**
     * Provider for LocalAI TTS
     */
    LOCALAI = "localai"
}
/** Enum for app-wide constants */
export declare enum Constants {
    /** Key for the app's version. */
    VERSION = "v0.8.1-rc1",
    /** Key for the Custom Config's version (librechat.yaml). */
    CONFIG_VERSION = "1.3.1",
    /** Standard value for the first message's `parentMessageId` value, to indicate no parent exists. */
    NO_PARENT = "00000000-0000-0000-0000-000000000000",
    /** Standard value to use whatever the submission prelim. `responseMessageId` is */
    USE_PRELIM_RESPONSE_MESSAGE_ID = "USE_PRELIM_RESPONSE_MESSAGE_ID",
    /** Standard value for the initial conversationId before a request is sent */
    NEW_CONVO = "new",
    /** Standard value for the temporary conversationId after a request is sent and before the server responds */
    PENDING_CONVO = "PENDING",
    /** Standard value for the conversationId used for search queries */
    SEARCH = "search",
    /** Fixed, encoded domain length for Azure OpenAI Assistants Function name parsing. */
    ENCODED_DOMAIN_LENGTH = 10,
    /** Identifier for using current_model in multi-model requests. */
    CURRENT_MODEL = "current_model",
    /** Common divider for text values */
    COMMON_DIVIDER = "__",
    /** Max length for commands */
    COMMANDS_MAX_LENGTH = 56,
    /** Default Stream Rate (ms) */
    DEFAULT_STREAM_RATE = 1,
    /** Saved Tag */
    SAVED_TAG = "Saved",
    /** Max number of Conversation starters for Agents/Assistants */
    MAX_CONVO_STARTERS = 4,
    /** Global/instance Project Name */
    GLOBAL_PROJECT_NAME = "instance",
    /** Delimiter for MCP tools */
    mcp_delimiter = "_mcp_",
    /** Prefix for MCP plugins */
    mcp_prefix = "mcp_",
    /** Unique value to indicate all MCP servers. For backend use only. */
    mcp_all = "sys__all__sys",
    /** Unique value to indicate clearing MCP servers from UI state. For frontend use only. */
    mcp_clear = "sys__clear__sys",
    /**
     * Unique value to indicate the MCP tool was added to an agent.
     * This helps inform the UI if the mcp server was previously added.
     * */
    mcp_server = "sys__server__sys",
    /**
     * Handoff Tool Name Prefix
     */
    LC_TRANSFER_TO_ = "lc_transfer_to_",
    /** Placeholder Agent ID for Ephemeral Agents */
    EPHEMERAL_AGENT_ID = "ephemeral"
}
export declare enum LocalStorageKeys {
    /** Key for the admin defined App Title */
    APP_TITLE = "appTitle",
    /** Key for the last conversation setup. */
    LAST_CONVO_SETUP = "lastConversationSetup",
    /** Key for the last selected model. */
    LAST_MODEL = "lastSelectedModel",
    /** Key for the last selected tools. */
    LAST_TOOLS = "lastSelectedTools",
    /** Key for the last selected spec by name*/
    LAST_SPEC = "lastSelectedSpec",
    /** Key for temporary files to delete */
    FILES_TO_DELETE = "filesToDelete",
    /** Prefix key for the last selected assistant ID by index */
    ASST_ID_PREFIX = "assistant_id__",
    /** Prefix key for the last selected agent ID by index */
    AGENT_ID_PREFIX = "agent_id__",
    /** Key for the last selected fork setting */
    FORK_SETTING = "forkSetting",
    /** Key for remembering the last selected option, instead of manually selecting */
    REMEMBER_FORK_OPTION = "rememberDefaultFork",
    /** Key for remembering the split at target fork option modifier */
    FORK_SPLIT_AT_TARGET = "splitAtTarget",
    /** Key for saving text drafts */
    TEXT_DRAFT = "textDraft_",
    /** Key for saving file drafts */
    FILES_DRAFT = "filesDraft_",
    /** Key for last Selected Prompt Category */
    LAST_PROMPT_CATEGORY = "lastPromptCategory",
    /** Key for rendering User Messages as Markdown */
    ENABLE_USER_MSG_MARKDOWN = "enableUserMsgMarkdown",
    /** Key for displaying analysis tool code input */
    SHOW_ANALYSIS_CODE = "showAnalysisCode",
    /** Last selected MCP values per conversation ID */
    LAST_MCP_ = "LAST_MCP_",
    /** Last checked toggle for Code Interpreter API per conversation ID */
    LAST_CODE_TOGGLE_ = "LAST_CODE_TOGGLE_",
    /** Last checked toggle for Web Search per conversation ID */
    LAST_WEB_SEARCH_TOGGLE_ = "LAST_WEB_SEARCH_TOGGLE_",
    /** Last checked toggle for File Search per conversation ID */
    LAST_FILE_SEARCH_TOGGLE_ = "LAST_FILE_SEARCH_TOGGLE_",
    /** Last checked toggle for Artifacts per conversation ID */
    LAST_ARTIFACTS_TOGGLE_ = "LAST_ARTIFACTS_TOGGLE_",
    /** Key for the last selected agent provider */
    LAST_AGENT_PROVIDER = "lastAgentProvider",
    /** Key for the last selected agent model */
    LAST_AGENT_MODEL = "lastAgentModel",
    /** Pin state for MCP tools per conversation ID */
    PIN_MCP_ = "PIN_MCP_",
    /** Pin state for Web Search per conversation ID */
    PIN_WEB_SEARCH_ = "PIN_WEB_SEARCH_",
    /** Pin state for Code Interpreter per conversation ID */
    PIN_CODE_INTERPRETER_ = "PIN_CODE_INTERPRETER_"
}
export declare enum ForkOptions {
    /** Key for direct path option */
    DIRECT_PATH = "directPath",
    /** Key for including branches */
    INCLUDE_BRANCHES = "includeBranches",
    /** Key for target level fork (default) */
    TARGET_LEVEL = "targetLevel",
    /** Default option */
    DEFAULT = "default"
}
/**
 * Enum for Cohere related constants
 */
export declare enum CohereConstants {
    /**
     * Cohere API Endpoint, for special handling
     */
    API_URL = "https://api.cohere.ai/v1",
    /**
     * Role for "USER" messages
     */
    ROLE_USER = "USER",
    /**
     * Role for "SYSTEM" messages
     */
    ROLE_SYSTEM = "SYSTEM",
    /**
     * Role for "CHATBOT" messages
     */
    ROLE_CHATBOT = "CHATBOT",
    /**
     * Title message as required by Cohere
     */
    TITLE_MESSAGE = "TITLE:"
}
export declare enum SystemCategories {
    ALL = "sys__all__sys",
    MY_PROMPTS = "sys__my__prompts__sys",
    NO_CATEGORY = "sys__no__category__sys",
    SHARED_PROMPTS = "sys__shared__prompts__sys"
}
export declare const providerEndpointMap: {
    openAI: EModelEndpoint;
    bedrock: EModelEndpoint;
    anthropic: EModelEndpoint;
    azureOpenAI: EModelEndpoint;
};
export declare const specialVariables: {
    current_date: boolean;
    current_user: boolean;
    iso_datetime: boolean;
    current_datetime: boolean;
};
export type TSpecialVarLabel = `com_ui_special_var_${keyof typeof specialVariables}`;
export {};
