import { z } from 'zod';
import { Tools } from './types/assistants';
import type { TMessageContentParts, FunctionTool, FunctionToolCall } from './types/assistants';
import { TFeedback } from './feedback';
import type { SearchResultData } from './types/web';
import type { TFile } from './types/files';
export declare const isUUID: z.ZodString;
export declare enum AuthType {
    OVERRIDE_AUTH = "override_auth",
    USER_PROVIDED = "user_provided",
    SYSTEM_DEFINED = "system_defined"
}
export declare const authTypeSchema: z.ZodNativeEnum<typeof AuthType>;
export declare enum EModelEndpoint {
    azureOpenAI = "azureOpenAI",
    openAI = "openAI",
    google = "google",
    anthropic = "anthropic",
    assistants = "assistants",
    azureAssistants = "azureAssistants",
    agents = "agents",
    custom = "custom",
    bedrock = "bedrock",
    /** @deprecated */
    chatGPTBrowser = "chatGPTBrowser",
    /** @deprecated */
    gptPlugins = "gptPlugins"
}
/** Mirrors `@librechat/agents` providers */
export declare enum Providers {
    OPENAI = "openAI",
    ANTHROPIC = "anthropic",
    AZURE = "azureOpenAI",
    GOOGLE = "google",
    VERTEXAI = "vertexai",
    BEDROCK = "bedrock",
    MISTRALAI = "mistralai",
    MISTRAL = "mistral",
    OLLAMA = "ollama",
    DEEPSEEK = "deepseek",
    OPENROUTER = "openrouter",
    XAI = "xai"
}
/**
 * Endpoints that support direct PDF processing in the agent system
 */
export declare const documentSupportedProviders: Set<string>;
export declare const isOpenAILikeProvider: (provider?: string | null) => boolean;
export declare const isDocumentSupportedProvider: (provider?: string | null) => boolean;
export declare const paramEndpoints: Set<string>;
export declare enum BedrockProviders {
    AI21 = "ai21",
    Amazon = "amazon",
    Anthropic = "anthropic",
    Cohere = "cohere",
    Meta = "meta",
    MistralAI = "mistral",
    StabilityAI = "stability",
    DeepSeek = "deepseek"
}
export declare const getModelKey: (endpoint: EModelEndpoint | string, model: string) => string;
export declare const getSettingsKeys: (endpoint: EModelEndpoint | string, model: string) => string[];
export type AssistantsEndpoint = EModelEndpoint.assistants | EModelEndpoint.azureAssistants;
export declare const isAssistantsEndpoint: (_endpoint?: AssistantsEndpoint | null | string) => boolean;
export type AgentProvider = Exclude<keyof typeof EModelEndpoint, EModelEndpoint.agents> | string;
export declare const isAgentsEndpoint: (_endpoint?: EModelEndpoint.agents | null | string) => boolean;
export declare const isParamEndpoint: (endpoint: EModelEndpoint | string, endpointType?: EModelEndpoint | string) => boolean;
export declare enum ImageDetail {
    low = "low",
    auto = "auto",
    high = "high"
}
export declare enum ReasoningEffort {
    none = "",
    minimal = "minimal",
    low = "low",
    medium = "medium",
    high = "high"
}
export declare enum ReasoningSummary {
    none = "",
    auto = "auto",
    concise = "concise",
    detailed = "detailed"
}
export declare enum Verbosity {
    none = "",
    low = "low",
    medium = "medium",
    high = "high"
}
export declare const imageDetailNumeric: {
    low: number;
    auto: number;
    high: number;
};
export declare const imageDetailValue: {
    0: ImageDetail;
    1: ImageDetail;
    2: ImageDetail;
};
export declare const eImageDetailSchema: z.ZodNativeEnum<typeof ImageDetail>;
export declare const eReasoningEffortSchema: z.ZodNativeEnum<typeof ReasoningEffort>;
export declare const eReasoningSummarySchema: z.ZodNativeEnum<typeof ReasoningSummary>;
export declare const eVerbositySchema: z.ZodNativeEnum<typeof Verbosity>;
export declare const defaultAssistantFormValues: {
    assistant: string;
    id: string;
    name: string;
    description: string;
    instructions: string;
    conversation_starters: never[];
    model: string;
    functions: never[];
    code_interpreter: boolean;
    image_vision: boolean;
    retrieval: boolean;
    append_current_datetime: boolean;
};
export declare const defaultAgentFormValues: {
    agent: {};
    id: string;
    name: string;
    description: string;
    instructions: string;
    model: string;
    model_parameters: {};
    tools: never[];
    provider: {};
    projectIds: never[];
    edges: never[];
    artifacts: string;
    /** @deprecated Use ACL permissions instead */
    isCollaborative: boolean;
    recursion_limit: undefined;
    execute_code: boolean;
    file_search: boolean;
    web_search: boolean;
    category: string;
    support_contact: {
        name: string;
        email: string;
    };
};
export declare const ImageVisionTool: FunctionTool;
export declare const isImageVisionTool: (tool: FunctionTool | FunctionToolCall) => boolean;
export declare const openAISettings: {
    model: {
        default: "gpt-4o-mini";
    };
    temperature: {
        min: 0;
        max: 2;
        step: 0.01;
        default: 1;
    };
    top_p: {
        min: 0;
        max: 1;
        step: 0.01;
        default: 1;
    };
    presence_penalty: {
        min: -2;
        max: 2;
        step: 0.01;
        default: 0;
    };
    frequency_penalty: {
        min: -2;
        max: 2;
        step: 0.01;
        default: 0;
    };
    resendFiles: {
        default: true;
    };
    maxContextTokens: {
        default: undefined;
    };
    max_tokens: {
        default: undefined;
    };
    imageDetail: {
        default: ImageDetail.auto;
        min: 0;
        max: 2;
        step: 1;
    };
};
export declare const googleSettings: {
    model: {
        default: "gemini-1.5-flash-latest";
    };
    maxOutputTokens: {
        min: 1;
        max: 64000;
        step: 1;
        default: 8192;
    };
    temperature: {
        min: 0;
        max: 2;
        step: 0.01;
        default: 1;
    };
    topP: {
        min: 0;
        max: 1;
        step: 0.01;
        default: 0.95;
    };
    topK: {
        min: 1;
        max: 40;
        step: 1;
        default: 40;
    };
    thinking: {
        default: true;
    };
    thinkingBudget: {
        min: -1;
        max: 32000;
        step: 1;
        /** `-1` = Dynamic Thinking, meaning the model will adjust
         * the budget based on the complexity of the request.
         */
        default: -1;
    };
};
export declare const anthropicSettings: {
    model: {
        default: "claude-3-5-sonnet-latest";
    };
    temperature: {
        min: 0;
        max: 1;
        step: 0.01;
        default: 1;
    };
    promptCache: {
        default: true;
    };
    thinking: {
        default: true;
    };
    thinkingBudget: {
        min: 1024;
        step: 100;
        max: 200000;
        default: 2000;
    };
    maxOutputTokens: {
        min: 1;
        max: 128000;
        step: 1;
        default: 8192;
        reset: (modelName: string) => 64000 | 8192 | 32000;
        set: (value: number, modelName: string) => number;
    };
    topP: {
        min: 0;
        max: 1;
        step: 0.01;
        default: 0.7;
    };
    topK: {
        min: 1;
        max: 40;
        step: 1;
        default: 5;
    };
    resendFiles: {
        default: true;
    };
    maxContextTokens: {
        default: undefined;
    };
    legacy: {
        maxOutputTokens: {
            min: 1;
            max: 4096;
            step: 1;
            default: 4096;
        };
    };
    web_search: {
        default: false;
    };
};
export declare const agentsSettings: {
    model: {
        default: "gpt-3.5-turbo-test";
    };
    temperature: {
        min: 0;
        max: 1;
        step: 0.01;
        default: 1;
    };
    top_p: {
        min: 0;
        max: 1;
        step: 0.01;
        default: 1;
    };
    presence_penalty: {
        min: -2;
        max: 2;
        step: 0.01;
        default: 0;
    };
    frequency_penalty: {
        min: -2;
        max: 2;
        step: 0.01;
        default: 0;
    };
    resendFiles: {
        default: true;
    };
    maxContextTokens: {
        default: undefined;
    };
    max_tokens: {
        default: undefined;
    };
    imageDetail: {
        default: ImageDetail.auto;
    };
};
export declare const endpointSettings: {
    openAI: {
        model: {
            default: "gpt-4o-mini";
        };
        temperature: {
            min: 0;
            max: 2;
            step: 0.01;
            default: 1;
        };
        top_p: {
            min: 0;
            max: 1;
            step: 0.01;
            default: 1;
        };
        presence_penalty: {
            min: -2;
            max: 2;
            step: 0.01;
            default: 0;
        };
        frequency_penalty: {
            min: -2;
            max: 2;
            step: 0.01;
            default: 0;
        };
        resendFiles: {
            default: true;
        };
        maxContextTokens: {
            default: undefined;
        };
        max_tokens: {
            default: undefined;
        };
        imageDetail: {
            default: ImageDetail.auto;
            min: 0;
            max: 2;
            step: 1;
        };
    };
    google: {
        model: {
            default: "gemini-1.5-flash-latest";
        };
        maxOutputTokens: {
            min: 1;
            max: 64000;
            step: 1;
            default: 8192;
        };
        temperature: {
            min: 0;
            max: 2;
            step: 0.01;
            default: 1;
        };
        topP: {
            min: 0;
            max: 1;
            step: 0.01;
            default: 0.95;
        };
        topK: {
            min: 1;
            max: 40;
            step: 1;
            default: 40;
        };
        thinking: {
            default: true;
        };
        thinkingBudget: {
            min: -1;
            max: 32000;
            step: 1;
            /** `-1` = Dynamic Thinking, meaning the model will adjust
             * the budget based on the complexity of the request.
             */
            default: -1;
        };
    };
    anthropic: {
        model: {
            default: "claude-3-5-sonnet-latest";
        };
        temperature: {
            min: 0;
            max: 1;
            step: 0.01;
            default: 1;
        };
        promptCache: {
            default: true;
        };
        thinking: {
            default: true;
        };
        thinkingBudget: {
            min: 1024;
            step: 100;
            max: 200000;
            default: 2000;
        };
        maxOutputTokens: {
            min: 1;
            max: 128000;
            step: 1;
            default: 8192;
            reset: (modelName: string) => 64000 | 8192 | 32000;
            set: (value: number, modelName: string) => number;
        };
        topP: {
            min: 0;
            max: 1;
            step: 0.01;
            default: 0.7;
        };
        topK: {
            min: 1;
            max: 40;
            step: 1;
            default: 5;
        };
        resendFiles: {
            default: true;
        };
        maxContextTokens: {
            default: undefined;
        };
        legacy: {
            maxOutputTokens: {
                min: 1;
                max: 4096;
                step: 1;
                default: 4096;
            };
        };
        web_search: {
            default: false;
        };
    };
    agents: {
        model: {
            default: "gpt-3.5-turbo-test";
        };
        temperature: {
            min: 0;
            max: 1;
            step: 0.01;
            default: 1;
        };
        top_p: {
            min: 0;
            max: 1;
            step: 0.01;
            default: 1;
        };
        presence_penalty: {
            min: -2;
            max: 2;
            step: 0.01;
            default: 0;
        };
        frequency_penalty: {
            min: -2;
            max: 2;
            step: 0.01;
            default: 0;
        };
        resendFiles: {
            default: true;
        };
        maxContextTokens: {
            default: undefined;
        };
        max_tokens: {
            default: undefined;
        };
        imageDetail: {
            default: ImageDetail.auto;
        };
    };
    bedrock: {
        model: {
            default: "gpt-3.5-turbo-test";
        };
        temperature: {
            min: 0;
            max: 1;
            step: 0.01;
            default: 1;
        };
        top_p: {
            min: 0;
            max: 1;
            step: 0.01;
            default: 1;
        };
        presence_penalty: {
            min: -2;
            max: 2;
            step: 0.01;
            default: 0;
        };
        frequency_penalty: {
            min: -2;
            max: 2;
            step: 0.01;
            default: 0;
        };
        resendFiles: {
            default: true;
        };
        maxContextTokens: {
            default: undefined;
        };
        max_tokens: {
            default: undefined;
        };
        imageDetail: {
            default: ImageDetail.auto;
        };
    };
};
export declare const eModelEndpointSchema: z.ZodNativeEnum<typeof EModelEndpoint>;
export declare const extendedModelEndpointSchema: z.ZodUnion<[z.ZodNativeEnum<typeof EModelEndpoint>, z.ZodString]>;
export declare const tPluginAuthConfigSchema: z.ZodObject<{
    authField: z.ZodString;
    label: z.ZodString;
    description: z.ZodString;
}, "strip", z.ZodTypeAny, {
    description: string;
    authField: string;
    label: string;
}, {
    description: string;
    authField: string;
    label: string;
}>;
export type TPluginAuthConfig = z.infer<typeof tPluginAuthConfigSchema>;
export declare const tPluginSchema: z.ZodObject<{
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
        authField: string;
        label: string;
    }, {
        description: string;
        authField: string;
        label: string;
    }>, "many">>;
    authenticated: z.ZodOptional<z.ZodBoolean>;
    chatMenu: z.ZodOptional<z.ZodBoolean>;
    isButton: z.ZodOptional<z.ZodBoolean>;
    toolkit: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    name: string;
    pluginKey: string;
    description?: string | undefined;
    icon?: string | undefined;
    authConfig?: {
        description: string;
        authField: string;
        label: string;
    }[] | undefined;
    authenticated?: boolean | undefined;
    chatMenu?: boolean | undefined;
    isButton?: boolean | undefined;
    toolkit?: boolean | undefined;
}, {
    name: string;
    pluginKey: string;
    description?: string | undefined;
    icon?: string | undefined;
    authConfig?: {
        description: string;
        authField: string;
        label: string;
    }[] | undefined;
    authenticated?: boolean | undefined;
    chatMenu?: boolean | undefined;
    isButton?: boolean | undefined;
    toolkit?: boolean | undefined;
}>;
export type TPlugin = z.infer<typeof tPluginSchema>;
export type TInput = {
    inputStr: string;
};
export type TResPlugin = {
    plugin: string;
    input: string;
    thought: string;
    loading?: boolean;
    outputs?: string;
    latest?: string;
    inputs?: TInput[];
};
export declare const tExampleSchema: z.ZodObject<{
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
}>;
export type TExample = z.infer<typeof tExampleSchema>;
export declare enum EAgent {
    functions = "functions",
    classic = "classic"
}
export declare const agentOptionSettings: {
    model: {
        default: string;
    };
    temperature: {
        min: number;
        max: number;
        step: number;
        default: number;
    };
    agent: {
        default: EAgent;
        options: EAgent[];
    };
    skipCompletion: {
        default: boolean;
    };
};
export declare const eAgentOptionsSchema: z.ZodNativeEnum<typeof EAgent>;
export declare const tAgentOptionsSchema: z.ZodObject<{
    agent: z.ZodDefault<z.ZodString>;
    skipCompletion: z.ZodDefault<z.ZodBoolean>;
    model: z.ZodString;
    temperature: z.ZodDefault<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    agent: string;
    skipCompletion: boolean;
    model: string;
    temperature: number;
}, {
    model: string;
    agent?: string | undefined;
    skipCompletion?: boolean | undefined;
    temperature?: number | undefined;
}>;
export declare const tMessageSchema: z.ZodObject<{
    messageId: z.ZodString;
    endpoint: z.ZodOptional<z.ZodString>;
    clientId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    conversationId: z.ZodNullable<z.ZodString>;
    parentMessageId: z.ZodNullable<z.ZodString>;
    responseMessageId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    overrideParentMessageId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    bg: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    model: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    title: z.ZodDefault<z.ZodUnion<[z.ZodNullable<z.ZodString>, z.ZodLiteral<"New Chat">]>>;
    sender: z.ZodOptional<z.ZodString>;
    text: z.ZodString;
    /** @deprecated */
    generation: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    isCreatedByUser: z.ZodBoolean;
    error: z.ZodOptional<z.ZodBoolean>;
    clientTimestamp: z.ZodOptional<z.ZodString>;
    createdAt: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    updatedAt: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    current: z.ZodOptional<z.ZodBoolean>;
    unfinished: z.ZodOptional<z.ZodBoolean>;
    searchResult: z.ZodOptional<z.ZodBoolean>;
    finish_reason: z.ZodOptional<z.ZodString>;
    thread_id: z.ZodOptional<z.ZodString>;
    iconURL: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    feedback: z.ZodOptional<z.ZodObject<{
        rating: z.ZodEnum<["thumbsUp", "thumbsDown"]>;
        tag: z.ZodEnum<["not_matched", "inaccurate", "bad_style", "missing_image", "unjustified_refusal", "not_helpful", "other", "accurate_reliable", "creative_solution", "clear_well_written", "attention_to_detail"]>;
        text: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        rating: "thumbsUp" | "thumbsDown";
        tag: "not_matched" | "inaccurate" | "bad_style" | "missing_image" | "unjustified_refusal" | "not_helpful" | "other" | "accurate_reliable" | "creative_solution" | "clear_well_written" | "attention_to_detail";
        text?: string | undefined;
    }, {
        rating: "thumbsUp" | "thumbsDown";
        tag: "not_matched" | "inaccurate" | "bad_style" | "missing_image" | "unjustified_refusal" | "not_helpful" | "other" | "accurate_reliable" | "creative_solution" | "clear_well_written" | "attention_to_detail";
        text?: string | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    messageId: string;
    conversationId: string | null;
    parentMessageId: string | null;
    title: string | null;
    text: string;
    isCreatedByUser: boolean;
    createdAt: string;
    updatedAt: string;
    model?: string | null | undefined;
    endpoint?: string | undefined;
    clientId?: string | null | undefined;
    responseMessageId?: string | null | undefined;
    overrideParentMessageId?: string | null | undefined;
    bg?: string | null | undefined;
    sender?: string | undefined;
    generation?: string | null | undefined;
    error?: boolean | undefined;
    clientTimestamp?: string | undefined;
    current?: boolean | undefined;
    unfinished?: boolean | undefined;
    searchResult?: boolean | undefined;
    finish_reason?: string | undefined;
    thread_id?: string | undefined;
    iconURL?: string | null | undefined;
    feedback?: {
        rating: "thumbsUp" | "thumbsDown";
        tag: "not_matched" | "inaccurate" | "bad_style" | "missing_image" | "unjustified_refusal" | "not_helpful" | "other" | "accurate_reliable" | "creative_solution" | "clear_well_written" | "attention_to_detail";
        text?: string | undefined;
    } | undefined;
}, {
    messageId: string;
    conversationId: string | null;
    parentMessageId: string | null;
    text: string;
    isCreatedByUser: boolean;
    model?: string | null | undefined;
    endpoint?: string | undefined;
    clientId?: string | null | undefined;
    responseMessageId?: string | null | undefined;
    overrideParentMessageId?: string | null | undefined;
    bg?: string | null | undefined;
    title?: string | null | undefined;
    sender?: string | undefined;
    generation?: string | null | undefined;
    error?: boolean | undefined;
    clientTimestamp?: string | undefined;
    createdAt?: string | undefined;
    updatedAt?: string | undefined;
    current?: boolean | undefined;
    unfinished?: boolean | undefined;
    searchResult?: boolean | undefined;
    finish_reason?: string | undefined;
    thread_id?: string | undefined;
    iconURL?: string | null | undefined;
    feedback?: {
        rating: "thumbsUp" | "thumbsDown";
        tag: "not_matched" | "inaccurate" | "bad_style" | "missing_image" | "unjustified_refusal" | "not_helpful" | "other" | "accurate_reliable" | "creative_solution" | "clear_well_written" | "attention_to_detail";
        text?: string | undefined;
    } | undefined;
}>;
export type MemoryArtifact = {
    key: string;
    value?: string;
    tokenCount?: number;
    type: 'update' | 'delete' | 'error';
};
export type UIResource = {
    type?: string;
    data?: unknown;
    uri?: string;
    mimeType?: string;
    text?: string;
    [key: string]: unknown;
};
export type TAttachmentMetadata = {
    type?: Tools;
    messageId: string;
    toolCallId: string;
    [Tools.memory]?: MemoryArtifact;
    [Tools.ui_resources]?: UIResource[];
    [Tools.web_search]?: SearchResultData;
    [Tools.file_search]?: SearchResultData;
};
export type TAttachment = (TFile & TAttachmentMetadata) | (Pick<TFile, 'filename' | 'filepath' | 'conversationId'> & {
    expiresAt: number;
} & TAttachmentMetadata) | (Partial<Pick<TFile, 'filename' | 'filepath'>> & Pick<TFile, 'conversationId'> & TAttachmentMetadata);
export type TMessage = z.input<typeof tMessageSchema> & {
    children?: TMessage[];
    plugin?: TResPlugin | null;
    plugins?: TResPlugin[];
    content?: TMessageContentParts[];
    files?: Partial<TFile>[];
    depth?: number;
    siblingIndex?: number;
    attachments?: TAttachment[];
    clientTimestamp?: string;
    feedback?: TFeedback;
};
export declare const coerceNumber: z.ZodEffects<z.ZodUnion<[z.ZodNumber, z.ZodString]>, number | undefined, string | number>;
type DocumentTypeValue = null | boolean | number | string | DocumentTypeValue[] | {
    [key: string]: DocumentTypeValue;
};
export declare const tConversationSchema: z.ZodObject<{
    conversationId: z.ZodNullable<z.ZodString>;
    endpoint: z.ZodNullable<z.ZodNativeEnum<typeof EModelEndpoint>>;
    endpointType: z.ZodOptional<z.ZodNullable<z.ZodNativeEnum<typeof EModelEndpoint>>>;
    isArchived: z.ZodOptional<z.ZodBoolean>;
    title: z.ZodDefault<z.ZodUnion<[z.ZodNullable<z.ZodString>, z.ZodLiteral<"New Chat">]>>;
    user: z.ZodOptional<z.ZodString>;
    messages: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
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
            authField: string;
            label: string;
        }, {
            description: string;
            authField: string;
            label: string;
        }>, "many">>;
        authenticated: z.ZodOptional<z.ZodBoolean>;
        chatMenu: z.ZodOptional<z.ZodBoolean>;
        isButton: z.ZodOptional<z.ZodBoolean>;
        toolkit: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        pluginKey: string;
        description?: string | undefined;
        icon?: string | undefined;
        authConfig?: {
            description: string;
            authField: string;
            label: string;
        }[] | undefined;
        authenticated?: boolean | undefined;
        chatMenu?: boolean | undefined;
        isButton?: boolean | undefined;
        toolkit?: boolean | undefined;
    }, {
        name: string;
        pluginKey: string;
        description?: string | undefined;
        icon?: string | undefined;
        authConfig?: {
            description: string;
            authField: string;
            label: string;
        }[] | undefined;
        authenticated?: boolean | undefined;
        chatMenu?: boolean | undefined;
        isButton?: boolean | undefined;
        toolkit?: boolean | undefined;
    }>, "many">, z.ZodArray<z.ZodString, "many">]>>;
    modelLabel: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    userLabel: z.ZodOptional<z.ZodString>;
    model: z.ZodOptional<z.ZodNullable<z.ZodString>>;
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
    tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
    resendFiles: z.ZodOptional<z.ZodBoolean>;
    file_ids: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    imageDetail: z.ZodOptional<z.ZodNativeEnum<typeof ImageDetail>>;
    reasoning_effort: z.ZodNullable<z.ZodOptional<z.ZodNativeEnum<typeof ReasoningEffort>>>;
    reasoning_summary: z.ZodNullable<z.ZodOptional<z.ZodNativeEnum<typeof ReasoningSummary>>>;
    verbosity: z.ZodNullable<z.ZodOptional<z.ZodNativeEnum<typeof Verbosity>>>;
    useResponsesApi: z.ZodOptional<z.ZodBoolean>;
    web_search: z.ZodOptional<z.ZodBoolean>;
    disableStreaming: z.ZodOptional<z.ZodBoolean>;
    assistant_id: z.ZodOptional<z.ZodString>;
    agent_id: z.ZodOptional<z.ZodString>;
    region: z.ZodOptional<z.ZodString>;
    maxTokens: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodNumber, z.ZodString]>, number | undefined, string | number>>;
    additionalModelRequestFields: z.ZodOptional<z.ZodType<DocumentTypeValue, z.ZodTypeDef, DocumentTypeValue>>;
    instructions: z.ZodOptional<z.ZodString>;
    additional_instructions: z.ZodOptional<z.ZodString>;
    append_current_datetime: z.ZodOptional<z.ZodBoolean>;
    /** Used to overwrite active conversation settings when saving a Preset */
    presetOverride: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    stop: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    greeting: z.ZodOptional<z.ZodString>;
    spec: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    iconURL: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    expiredAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    fileTokenLimit: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodNumber, z.ZodString]>, number | undefined, string | number>>;
    /** @deprecated */
    resendImages: z.ZodOptional<z.ZodBoolean>;
    /** @deprecated */
    agentOptions: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        agent: z.ZodDefault<z.ZodString>;
        skipCompletion: z.ZodDefault<z.ZodBoolean>;
        model: z.ZodString;
        temperature: z.ZodDefault<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        agent: string;
        skipCompletion: boolean;
        model: string;
        temperature: number;
    }, {
        model: string;
        agent?: string | undefined;
        skipCompletion?: boolean | undefined;
        temperature?: number | undefined;
    }>>>;
    /** @deprecated Prefer `modelLabel` over `chatGptLabel` */
    chatGptLabel: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    endpoint: EModelEndpoint | null;
    conversationId: string | null;
    title: string | null;
    createdAt: string;
    updatedAt: string;
    model?: string | null | undefined;
    temperature?: number | null | undefined;
    parentMessageId?: string | undefined;
    iconURL?: string | null | undefined;
    user?: string | undefined;
    context?: string | null | undefined;
    endpointType?: EModelEndpoint | null | undefined;
    isArchived?: boolean | undefined;
    messages?: string[] | undefined;
    tools?: string[] | {
        name: string;
        pluginKey: string;
        description?: string | undefined;
        icon?: string | undefined;
        authConfig?: {
            description: string;
            authField: string;
            label: string;
        }[] | undefined;
        authenticated?: boolean | undefined;
        chatMenu?: boolean | undefined;
        isButton?: boolean | undefined;
        toolkit?: boolean | undefined;
    }[] | undefined;
    modelLabel?: string | null | undefined;
    userLabel?: string | undefined;
    promptPrefix?: string | null | undefined;
    topP?: number | undefined;
    topK?: number | undefined;
    top_p?: number | undefined;
    frequency_penalty?: number | undefined;
    presence_penalty?: number | undefined;
    maxOutputTokens?: number | null | undefined;
    maxContextTokens?: number | undefined;
    max_tokens?: number | undefined;
    promptCache?: boolean | undefined;
    system?: string | undefined;
    thinking?: boolean | undefined;
    thinkingBudget?: number | undefined;
    stream?: boolean | undefined;
    artifacts?: string | undefined;
    examples?: {
        input: {
            content: string;
        };
        output: {
            content: string;
        };
    }[] | undefined;
    tags?: string[] | undefined;
    resendFiles?: boolean | undefined;
    file_ids?: string[] | undefined;
    imageDetail?: ImageDetail | undefined;
    reasoning_effort?: ReasoningEffort | null | undefined;
    reasoning_summary?: ReasoningSummary | null | undefined;
    verbosity?: Verbosity | null | undefined;
    useResponsesApi?: boolean | undefined;
    web_search?: boolean | undefined;
    disableStreaming?: boolean | undefined;
    assistant_id?: string | undefined;
    agent_id?: string | undefined;
    region?: string | undefined;
    maxTokens?: number | undefined;
    additionalModelRequestFields?: DocumentTypeValue | undefined;
    instructions?: string | undefined;
    additional_instructions?: string | undefined;
    append_current_datetime?: boolean | undefined;
    presetOverride?: Record<string, unknown> | undefined;
    stop?: string[] | undefined;
    greeting?: string | undefined;
    spec?: string | null | undefined;
    expiredAt?: string | null | undefined;
    fileTokenLimit?: number | undefined;
    resendImages?: boolean | undefined;
    agentOptions?: {
        agent: string;
        skipCompletion: boolean;
        model: string;
        temperature: number;
    } | null | undefined;
    chatGptLabel?: string | null | undefined;
}, {
    endpoint: EModelEndpoint | null;
    conversationId: string | null;
    createdAt: string;
    updatedAt: string;
    model?: string | null | undefined;
    temperature?: number | null | undefined;
    parentMessageId?: string | undefined;
    title?: string | null | undefined;
    iconURL?: string | null | undefined;
    user?: string | undefined;
    context?: string | null | undefined;
    endpointType?: EModelEndpoint | null | undefined;
    isArchived?: boolean | undefined;
    messages?: string[] | undefined;
    tools?: string[] | {
        name: string;
        pluginKey: string;
        description?: string | undefined;
        icon?: string | undefined;
        authConfig?: {
            description: string;
            authField: string;
            label: string;
        }[] | undefined;
        authenticated?: boolean | undefined;
        chatMenu?: boolean | undefined;
        isButton?: boolean | undefined;
        toolkit?: boolean | undefined;
    }[] | undefined;
    modelLabel?: string | null | undefined;
    userLabel?: string | undefined;
    promptPrefix?: string | null | undefined;
    topP?: number | undefined;
    topK?: number | undefined;
    top_p?: number | undefined;
    frequency_penalty?: number | undefined;
    presence_penalty?: number | undefined;
    maxOutputTokens?: string | number | null | undefined;
    maxContextTokens?: string | number | undefined;
    max_tokens?: string | number | undefined;
    promptCache?: boolean | undefined;
    system?: string | undefined;
    thinking?: boolean | undefined;
    thinkingBudget?: string | number | undefined;
    stream?: boolean | undefined;
    artifacts?: string | undefined;
    examples?: {
        input: {
            content: string;
        };
        output: {
            content: string;
        };
    }[] | undefined;
    tags?: string[] | undefined;
    resendFiles?: boolean | undefined;
    file_ids?: string[] | undefined;
    imageDetail?: ImageDetail | undefined;
    reasoning_effort?: ReasoningEffort | null | undefined;
    reasoning_summary?: ReasoningSummary | null | undefined;
    verbosity?: Verbosity | null | undefined;
    useResponsesApi?: boolean | undefined;
    web_search?: boolean | undefined;
    disableStreaming?: boolean | undefined;
    assistant_id?: string | undefined;
    agent_id?: string | undefined;
    region?: string | undefined;
    maxTokens?: string | number | undefined;
    additionalModelRequestFields?: DocumentTypeValue | undefined;
    instructions?: string | undefined;
    additional_instructions?: string | undefined;
    append_current_datetime?: boolean | undefined;
    presetOverride?: Record<string, unknown> | undefined;
    stop?: string[] | undefined;
    greeting?: string | undefined;
    spec?: string | null | undefined;
    expiredAt?: string | null | undefined;
    fileTokenLimit?: string | number | undefined;
    resendImages?: boolean | undefined;
    agentOptions?: {
        model: string;
        agent?: string | undefined;
        skipCompletion?: boolean | undefined;
        temperature?: number | undefined;
    } | null | undefined;
    chatGptLabel?: string | null | undefined;
}>;
export declare const tPresetSchema: z.ZodObject<{
    model: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    temperature: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    parentMessageId: z.ZodOptional<z.ZodString>;
    iconURL: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    user: z.ZodOptional<z.ZodString>;
    context: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    endpointType: z.ZodOptional<z.ZodNullable<z.ZodNativeEnum<typeof EModelEndpoint>>>;
    isArchived: z.ZodOptional<z.ZodBoolean>;
    messages: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
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
            authField: string;
            label: string;
        }, {
            description: string;
            authField: string;
            label: string;
        }>, "many">>;
        authenticated: z.ZodOptional<z.ZodBoolean>;
        chatMenu: z.ZodOptional<z.ZodBoolean>;
        isButton: z.ZodOptional<z.ZodBoolean>;
        toolkit: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        pluginKey: string;
        description?: string | undefined;
        icon?: string | undefined;
        authConfig?: {
            description: string;
            authField: string;
            label: string;
        }[] | undefined;
        authenticated?: boolean | undefined;
        chatMenu?: boolean | undefined;
        isButton?: boolean | undefined;
        toolkit?: boolean | undefined;
    }, {
        name: string;
        pluginKey: string;
        description?: string | undefined;
        icon?: string | undefined;
        authConfig?: {
            description: string;
            authField: string;
            label: string;
        }[] | undefined;
        authenticated?: boolean | undefined;
        chatMenu?: boolean | undefined;
        isButton?: boolean | undefined;
        toolkit?: boolean | undefined;
    }>, "many">, z.ZodArray<z.ZodString, "many">]>>;
    modelLabel: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    userLabel: z.ZodOptional<z.ZodString>;
    promptPrefix: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    topP: z.ZodOptional<z.ZodNumber>;
    topK: z.ZodOptional<z.ZodNumber>;
    top_p: z.ZodOptional<z.ZodNumber>;
    frequency_penalty: z.ZodOptional<z.ZodNumber>;
    presence_penalty: z.ZodOptional<z.ZodNumber>;
    maxOutputTokens: z.ZodOptional<z.ZodNullable<z.ZodEffects<z.ZodUnion<[z.ZodNumber, z.ZodString]>, number | undefined, string | number>>>;
    maxContextTokens: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodNumber, z.ZodString]>, number | undefined, string | number>>;
    max_tokens: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodNumber, z.ZodString]>, number | undefined, string | number>>;
    promptCache: z.ZodOptional<z.ZodBoolean>;
    system: z.ZodOptional<z.ZodString>;
    thinking: z.ZodOptional<z.ZodBoolean>;
    thinkingBudget: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodNumber, z.ZodString]>, number | undefined, string | number>>;
    stream: z.ZodOptional<z.ZodBoolean>;
    artifacts: z.ZodOptional<z.ZodString>;
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
    tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    resendFiles: z.ZodOptional<z.ZodBoolean>;
    file_ids: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    imageDetail: z.ZodOptional<z.ZodNativeEnum<typeof ImageDetail>>;
    reasoning_effort: z.ZodNullable<z.ZodOptional<z.ZodNativeEnum<typeof ReasoningEffort>>>;
    reasoning_summary: z.ZodNullable<z.ZodOptional<z.ZodNativeEnum<typeof ReasoningSummary>>>;
    verbosity: z.ZodNullable<z.ZodOptional<z.ZodNativeEnum<typeof Verbosity>>>;
    useResponsesApi: z.ZodOptional<z.ZodBoolean>;
    web_search: z.ZodOptional<z.ZodBoolean>;
    disableStreaming: z.ZodOptional<z.ZodBoolean>;
    assistant_id: z.ZodOptional<z.ZodString>;
    agent_id: z.ZodOptional<z.ZodString>;
    region: z.ZodOptional<z.ZodString>;
    maxTokens: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodNumber, z.ZodString]>, number | undefined, string | number>>;
    additionalModelRequestFields: z.ZodOptional<z.ZodType<DocumentTypeValue, z.ZodTypeDef, DocumentTypeValue>>;
    instructions: z.ZodOptional<z.ZodString>;
    additional_instructions: z.ZodOptional<z.ZodString>;
    append_current_datetime: z.ZodOptional<z.ZodBoolean>;
    presetOverride: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    stop: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    greeting: z.ZodOptional<z.ZodString>;
    spec: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    expiredAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    fileTokenLimit: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodNumber, z.ZodString]>, number | undefined, string | number>>;
    resendImages: z.ZodOptional<z.ZodBoolean>;
    agentOptions: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        agent: z.ZodDefault<z.ZodString>;
        skipCompletion: z.ZodDefault<z.ZodBoolean>;
        model: z.ZodString;
        temperature: z.ZodDefault<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        agent: string;
        skipCompletion: boolean;
        model: string;
        temperature: number;
    }, {
        model: string;
        agent?: string | undefined;
        skipCompletion?: boolean | undefined;
        temperature?: number | undefined;
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
    model?: string | null | undefined;
    temperature?: number | null | undefined;
    conversationId?: string | null | undefined;
    parentMessageId?: string | undefined;
    title?: string | null | undefined;
    iconURL?: string | null | undefined;
    user?: string | undefined;
    context?: string | null | undefined;
    endpointType?: EModelEndpoint | null | undefined;
    isArchived?: boolean | undefined;
    messages?: string[] | undefined;
    tools?: string[] | {
        name: string;
        pluginKey: string;
        description?: string | undefined;
        icon?: string | undefined;
        authConfig?: {
            description: string;
            authField: string;
            label: string;
        }[] | undefined;
        authenticated?: boolean | undefined;
        chatMenu?: boolean | undefined;
        isButton?: boolean | undefined;
        toolkit?: boolean | undefined;
    }[] | undefined;
    modelLabel?: string | null | undefined;
    userLabel?: string | undefined;
    promptPrefix?: string | null | undefined;
    topP?: number | undefined;
    topK?: number | undefined;
    top_p?: number | undefined;
    frequency_penalty?: number | undefined;
    presence_penalty?: number | undefined;
    maxOutputTokens?: number | null | undefined;
    maxContextTokens?: number | undefined;
    max_tokens?: number | undefined;
    promptCache?: boolean | undefined;
    system?: string | undefined;
    thinking?: boolean | undefined;
    thinkingBudget?: number | undefined;
    stream?: boolean | undefined;
    artifacts?: string | undefined;
    examples?: {
        input: {
            content: string;
        };
        output: {
            content: string;
        };
    }[] | undefined;
    tags?: string[] | undefined;
    resendFiles?: boolean | undefined;
    file_ids?: string[] | undefined;
    imageDetail?: ImageDetail | undefined;
    reasoning_effort?: ReasoningEffort | null | undefined;
    reasoning_summary?: ReasoningSummary | null | undefined;
    verbosity?: Verbosity | null | undefined;
    useResponsesApi?: boolean | undefined;
    web_search?: boolean | undefined;
    disableStreaming?: boolean | undefined;
    assistant_id?: string | undefined;
    agent_id?: string | undefined;
    region?: string | undefined;
    maxTokens?: number | undefined;
    additionalModelRequestFields?: DocumentTypeValue | undefined;
    instructions?: string | undefined;
    additional_instructions?: string | undefined;
    append_current_datetime?: boolean | undefined;
    presetOverride?: Record<string, unknown> | undefined;
    stop?: string[] | undefined;
    greeting?: string | undefined;
    spec?: string | null | undefined;
    expiredAt?: string | null | undefined;
    fileTokenLimit?: number | undefined;
    resendImages?: boolean | undefined;
    agentOptions?: {
        agent: string;
        skipCompletion: boolean;
        model: string;
        temperature: number;
    } | null | undefined;
    chatGptLabel?: string | null | undefined;
    presetId?: string | null | undefined;
    defaultPreset?: boolean | undefined;
    order?: number | undefined;
}, {
    endpoint: string | null;
    model?: string | null | undefined;
    temperature?: number | null | undefined;
    conversationId?: string | null | undefined;
    parentMessageId?: string | undefined;
    title?: string | null | undefined;
    iconURL?: string | null | undefined;
    user?: string | undefined;
    context?: string | null | undefined;
    endpointType?: EModelEndpoint | null | undefined;
    isArchived?: boolean | undefined;
    messages?: string[] | undefined;
    tools?: string[] | {
        name: string;
        pluginKey: string;
        description?: string | undefined;
        icon?: string | undefined;
        authConfig?: {
            description: string;
            authField: string;
            label: string;
        }[] | undefined;
        authenticated?: boolean | undefined;
        chatMenu?: boolean | undefined;
        isButton?: boolean | undefined;
        toolkit?: boolean | undefined;
    }[] | undefined;
    modelLabel?: string | null | undefined;
    userLabel?: string | undefined;
    promptPrefix?: string | null | undefined;
    topP?: number | undefined;
    topK?: number | undefined;
    top_p?: number | undefined;
    frequency_penalty?: number | undefined;
    presence_penalty?: number | undefined;
    maxOutputTokens?: string | number | null | undefined;
    maxContextTokens?: string | number | undefined;
    max_tokens?: string | number | undefined;
    promptCache?: boolean | undefined;
    system?: string | undefined;
    thinking?: boolean | undefined;
    thinkingBudget?: string | number | undefined;
    stream?: boolean | undefined;
    artifacts?: string | undefined;
    examples?: {
        input: {
            content: string;
        };
        output: {
            content: string;
        };
    }[] | undefined;
    tags?: string[] | undefined;
    resendFiles?: boolean | undefined;
    file_ids?: string[] | undefined;
    imageDetail?: ImageDetail | undefined;
    reasoning_effort?: ReasoningEffort | null | undefined;
    reasoning_summary?: ReasoningSummary | null | undefined;
    verbosity?: Verbosity | null | undefined;
    useResponsesApi?: boolean | undefined;
    web_search?: boolean | undefined;
    disableStreaming?: boolean | undefined;
    assistant_id?: string | undefined;
    agent_id?: string | undefined;
    region?: string | undefined;
    maxTokens?: string | number | undefined;
    additionalModelRequestFields?: DocumentTypeValue | undefined;
    instructions?: string | undefined;
    additional_instructions?: string | undefined;
    append_current_datetime?: boolean | undefined;
    presetOverride?: Record<string, unknown> | undefined;
    stop?: string[] | undefined;
    greeting?: string | undefined;
    spec?: string | null | undefined;
    expiredAt?: string | null | undefined;
    fileTokenLimit?: string | number | undefined;
    resendImages?: boolean | undefined;
    agentOptions?: {
        model: string;
        agent?: string | undefined;
        skipCompletion?: boolean | undefined;
        temperature?: number | undefined;
    } | null | undefined;
    chatGptLabel?: string | null | undefined;
    presetId?: string | null | undefined;
    defaultPreset?: boolean | undefined;
    order?: number | undefined;
}>;
export declare const tConvoUpdateSchema: z.ZodObject<{
    conversationId: z.ZodNullable<z.ZodString>;
    endpointType: z.ZodOptional<z.ZodNullable<z.ZodNativeEnum<typeof EModelEndpoint>>>;
    isArchived: z.ZodOptional<z.ZodBoolean>;
    title: z.ZodDefault<z.ZodUnion<[z.ZodNullable<z.ZodString>, z.ZodLiteral<"New Chat">]>>;
    user: z.ZodOptional<z.ZodString>;
    messages: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
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
            authField: string;
            label: string;
        }, {
            description: string;
            authField: string;
            label: string;
        }>, "many">>;
        authenticated: z.ZodOptional<z.ZodBoolean>;
        chatMenu: z.ZodOptional<z.ZodBoolean>;
        isButton: z.ZodOptional<z.ZodBoolean>;
        toolkit: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        pluginKey: string;
        description?: string | undefined;
        icon?: string | undefined;
        authConfig?: {
            description: string;
            authField: string;
            label: string;
        }[] | undefined;
        authenticated?: boolean | undefined;
        chatMenu?: boolean | undefined;
        isButton?: boolean | undefined;
        toolkit?: boolean | undefined;
    }, {
        name: string;
        pluginKey: string;
        description?: string | undefined;
        icon?: string | undefined;
        authConfig?: {
            description: string;
            authField: string;
            label: string;
        }[] | undefined;
        authenticated?: boolean | undefined;
        chatMenu?: boolean | undefined;
        isButton?: boolean | undefined;
        toolkit?: boolean | undefined;
    }>, "many">, z.ZodArray<z.ZodString, "many">]>>;
    modelLabel: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    userLabel: z.ZodOptional<z.ZodString>;
    model: z.ZodOptional<z.ZodNullable<z.ZodString>>;
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
    tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    resendFiles: z.ZodOptional<z.ZodBoolean>;
    file_ids: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    imageDetail: z.ZodOptional<z.ZodNativeEnum<typeof ImageDetail>>;
    reasoning_effort: z.ZodNullable<z.ZodOptional<z.ZodNativeEnum<typeof ReasoningEffort>>>;
    reasoning_summary: z.ZodNullable<z.ZodOptional<z.ZodNativeEnum<typeof ReasoningSummary>>>;
    verbosity: z.ZodNullable<z.ZodOptional<z.ZodNativeEnum<typeof Verbosity>>>;
    useResponsesApi: z.ZodOptional<z.ZodBoolean>;
    web_search: z.ZodOptional<z.ZodBoolean>;
    disableStreaming: z.ZodOptional<z.ZodBoolean>;
    assistant_id: z.ZodOptional<z.ZodString>;
    agent_id: z.ZodOptional<z.ZodString>;
    region: z.ZodOptional<z.ZodString>;
    maxTokens: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodNumber, z.ZodString]>, number | undefined, string | number>>;
    additionalModelRequestFields: z.ZodOptional<z.ZodType<DocumentTypeValue, z.ZodTypeDef, DocumentTypeValue>>;
    instructions: z.ZodOptional<z.ZodString>;
    additional_instructions: z.ZodOptional<z.ZodString>;
    append_current_datetime: z.ZodOptional<z.ZodBoolean>;
    presetOverride: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    stop: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    greeting: z.ZodOptional<z.ZodString>;
    spec: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    iconURL: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    expiredAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    fileTokenLimit: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodNumber, z.ZodString]>, number | undefined, string | number>>;
    resendImages: z.ZodOptional<z.ZodBoolean>;
    agentOptions: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        agent: z.ZodDefault<z.ZodString>;
        skipCompletion: z.ZodDefault<z.ZodBoolean>;
        model: z.ZodString;
        temperature: z.ZodDefault<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        agent: string;
        skipCompletion: boolean;
        model: string;
        temperature: number;
    }, {
        model: string;
        agent?: string | undefined;
        skipCompletion?: boolean | undefined;
        temperature?: number | undefined;
    }>>>;
    chatGptLabel: z.ZodOptional<z.ZodNullable<z.ZodString>>;
} & {
    endpoint: z.ZodNullable<z.ZodUnion<[z.ZodNativeEnum<typeof EModelEndpoint>, z.ZodString]>>;
    createdAt: z.ZodOptional<z.ZodString>;
    updatedAt: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    endpoint: string | null;
    conversationId: string | null;
    title: string | null;
    model?: string | null | undefined;
    temperature?: number | null | undefined;
    parentMessageId?: string | undefined;
    createdAt?: string | undefined;
    updatedAt?: string | undefined;
    iconURL?: string | null | undefined;
    user?: string | undefined;
    context?: string | null | undefined;
    endpointType?: EModelEndpoint | null | undefined;
    isArchived?: boolean | undefined;
    messages?: string[] | undefined;
    tools?: string[] | {
        name: string;
        pluginKey: string;
        description?: string | undefined;
        icon?: string | undefined;
        authConfig?: {
            description: string;
            authField: string;
            label: string;
        }[] | undefined;
        authenticated?: boolean | undefined;
        chatMenu?: boolean | undefined;
        isButton?: boolean | undefined;
        toolkit?: boolean | undefined;
    }[] | undefined;
    modelLabel?: string | null | undefined;
    userLabel?: string | undefined;
    promptPrefix?: string | null | undefined;
    topP?: number | undefined;
    topK?: number | undefined;
    top_p?: number | undefined;
    frequency_penalty?: number | undefined;
    presence_penalty?: number | undefined;
    maxOutputTokens?: number | null | undefined;
    maxContextTokens?: number | undefined;
    max_tokens?: number | undefined;
    promptCache?: boolean | undefined;
    system?: string | undefined;
    thinking?: boolean | undefined;
    thinkingBudget?: number | undefined;
    stream?: boolean | undefined;
    artifacts?: string | undefined;
    examples?: {
        input: {
            content: string;
        };
        output: {
            content: string;
        };
    }[] | undefined;
    tags?: string[] | undefined;
    resendFiles?: boolean | undefined;
    file_ids?: string[] | undefined;
    imageDetail?: ImageDetail | undefined;
    reasoning_effort?: ReasoningEffort | null | undefined;
    reasoning_summary?: ReasoningSummary | null | undefined;
    verbosity?: Verbosity | null | undefined;
    useResponsesApi?: boolean | undefined;
    web_search?: boolean | undefined;
    disableStreaming?: boolean | undefined;
    assistant_id?: string | undefined;
    agent_id?: string | undefined;
    region?: string | undefined;
    maxTokens?: number | undefined;
    additionalModelRequestFields?: DocumentTypeValue | undefined;
    instructions?: string | undefined;
    additional_instructions?: string | undefined;
    append_current_datetime?: boolean | undefined;
    presetOverride?: Record<string, unknown> | undefined;
    stop?: string[] | undefined;
    greeting?: string | undefined;
    spec?: string | null | undefined;
    expiredAt?: string | null | undefined;
    fileTokenLimit?: number | undefined;
    resendImages?: boolean | undefined;
    agentOptions?: {
        agent: string;
        skipCompletion: boolean;
        model: string;
        temperature: number;
    } | null | undefined;
    chatGptLabel?: string | null | undefined;
}, {
    endpoint: string | null;
    conversationId: string | null;
    model?: string | null | undefined;
    temperature?: number | null | undefined;
    parentMessageId?: string | undefined;
    title?: string | null | undefined;
    createdAt?: string | undefined;
    updatedAt?: string | undefined;
    iconURL?: string | null | undefined;
    user?: string | undefined;
    context?: string | null | undefined;
    endpointType?: EModelEndpoint | null | undefined;
    isArchived?: boolean | undefined;
    messages?: string[] | undefined;
    tools?: string[] | {
        name: string;
        pluginKey: string;
        description?: string | undefined;
        icon?: string | undefined;
        authConfig?: {
            description: string;
            authField: string;
            label: string;
        }[] | undefined;
        authenticated?: boolean | undefined;
        chatMenu?: boolean | undefined;
        isButton?: boolean | undefined;
        toolkit?: boolean | undefined;
    }[] | undefined;
    modelLabel?: string | null | undefined;
    userLabel?: string | undefined;
    promptPrefix?: string | null | undefined;
    topP?: number | undefined;
    topK?: number | undefined;
    top_p?: number | undefined;
    frequency_penalty?: number | undefined;
    presence_penalty?: number | undefined;
    maxOutputTokens?: string | number | null | undefined;
    maxContextTokens?: string | number | undefined;
    max_tokens?: string | number | undefined;
    promptCache?: boolean | undefined;
    system?: string | undefined;
    thinking?: boolean | undefined;
    thinkingBudget?: string | number | undefined;
    stream?: boolean | undefined;
    artifacts?: string | undefined;
    examples?: {
        input: {
            content: string;
        };
        output: {
            content: string;
        };
    }[] | undefined;
    tags?: string[] | undefined;
    resendFiles?: boolean | undefined;
    file_ids?: string[] | undefined;
    imageDetail?: ImageDetail | undefined;
    reasoning_effort?: ReasoningEffort | null | undefined;
    reasoning_summary?: ReasoningSummary | null | undefined;
    verbosity?: Verbosity | null | undefined;
    useResponsesApi?: boolean | undefined;
    web_search?: boolean | undefined;
    disableStreaming?: boolean | undefined;
    assistant_id?: string | undefined;
    agent_id?: string | undefined;
    region?: string | undefined;
    maxTokens?: string | number | undefined;
    additionalModelRequestFields?: DocumentTypeValue | undefined;
    instructions?: string | undefined;
    additional_instructions?: string | undefined;
    append_current_datetime?: boolean | undefined;
    presetOverride?: Record<string, unknown> | undefined;
    stop?: string[] | undefined;
    greeting?: string | undefined;
    spec?: string | null | undefined;
    expiredAt?: string | null | undefined;
    fileTokenLimit?: string | number | undefined;
    resendImages?: boolean | undefined;
    agentOptions?: {
        model: string;
        agent?: string | undefined;
        skipCompletion?: boolean | undefined;
        temperature?: number | undefined;
    } | null | undefined;
    chatGptLabel?: string | null | undefined;
}>;
export declare const tQueryParamsSchema: z.ZodObject<Pick<{
    conversationId: z.ZodNullable<z.ZodString>;
    endpoint: z.ZodNullable<z.ZodNativeEnum<typeof EModelEndpoint>>;
    endpointType: z.ZodOptional<z.ZodNullable<z.ZodNativeEnum<typeof EModelEndpoint>>>;
    isArchived: z.ZodOptional<z.ZodBoolean>;
    title: z.ZodDefault<z.ZodUnion<[z.ZodNullable<z.ZodString>, z.ZodLiteral<"New Chat">]>>;
    user: z.ZodOptional<z.ZodString>;
    messages: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
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
            authField: string;
            label: string;
        }, {
            description: string;
            authField: string;
            label: string;
        }>, "many">>;
        authenticated: z.ZodOptional<z.ZodBoolean>;
        chatMenu: z.ZodOptional<z.ZodBoolean>;
        isButton: z.ZodOptional<z.ZodBoolean>;
        toolkit: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        pluginKey: string;
        description?: string | undefined;
        icon?: string | undefined;
        authConfig?: {
            description: string;
            authField: string;
            label: string;
        }[] | undefined;
        authenticated?: boolean | undefined;
        chatMenu?: boolean | undefined;
        isButton?: boolean | undefined;
        toolkit?: boolean | undefined;
    }, {
        name: string;
        pluginKey: string;
        description?: string | undefined;
        icon?: string | undefined;
        authConfig?: {
            description: string;
            authField: string;
            label: string;
        }[] | undefined;
        authenticated?: boolean | undefined;
        chatMenu?: boolean | undefined;
        isButton?: boolean | undefined;
        toolkit?: boolean | undefined;
    }>, "many">, z.ZodArray<z.ZodString, "many">]>>;
    modelLabel: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    userLabel: z.ZodOptional<z.ZodString>;
    model: z.ZodOptional<z.ZodNullable<z.ZodString>>;
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
    tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
    resendFiles: z.ZodOptional<z.ZodBoolean>;
    file_ids: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    imageDetail: z.ZodOptional<z.ZodNativeEnum<typeof ImageDetail>>;
    reasoning_effort: z.ZodNullable<z.ZodOptional<z.ZodNativeEnum<typeof ReasoningEffort>>>;
    reasoning_summary: z.ZodNullable<z.ZodOptional<z.ZodNativeEnum<typeof ReasoningSummary>>>;
    verbosity: z.ZodNullable<z.ZodOptional<z.ZodNativeEnum<typeof Verbosity>>>;
    useResponsesApi: z.ZodOptional<z.ZodBoolean>;
    web_search: z.ZodOptional<z.ZodBoolean>;
    disableStreaming: z.ZodOptional<z.ZodBoolean>;
    assistant_id: z.ZodOptional<z.ZodString>;
    agent_id: z.ZodOptional<z.ZodString>;
    region: z.ZodOptional<z.ZodString>;
    maxTokens: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodNumber, z.ZodString]>, number | undefined, string | number>>;
    additionalModelRequestFields: z.ZodOptional<z.ZodType<DocumentTypeValue, z.ZodTypeDef, DocumentTypeValue>>;
    instructions: z.ZodOptional<z.ZodString>;
    additional_instructions: z.ZodOptional<z.ZodString>;
    append_current_datetime: z.ZodOptional<z.ZodBoolean>;
    /** Used to overwrite active conversation settings when saving a Preset */
    presetOverride: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    stop: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    greeting: z.ZodOptional<z.ZodString>;
    spec: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    iconURL: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    expiredAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    fileTokenLimit: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodNumber, z.ZodString]>, number | undefined, string | number>>;
    /** @deprecated */
    resendImages: z.ZodOptional<z.ZodBoolean>;
    /** @deprecated */
    agentOptions: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        agent: z.ZodDefault<z.ZodString>;
        skipCompletion: z.ZodDefault<z.ZodBoolean>;
        model: z.ZodString;
        temperature: z.ZodDefault<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        agent: string;
        skipCompletion: boolean;
        model: string;
        temperature: number;
    }, {
        model: string;
        agent?: string | undefined;
        skipCompletion?: boolean | undefined;
        temperature?: number | undefined;
    }>>>;
    /** @deprecated Prefer `modelLabel` over `chatGptLabel` */
    chatGptLabel: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, "model" | "temperature" | "promptPrefix" | "topP" | "topK" | "top_p" | "frequency_penalty" | "presence_penalty" | "maxOutputTokens" | "maxContextTokens" | "max_tokens" | "promptCache" | "thinking" | "thinkingBudget" | "resendFiles" | "imageDetail" | "reasoning_effort" | "reasoning_summary" | "verbosity" | "useResponsesApi" | "web_search" | "disableStreaming" | "assistant_id" | "agent_id" | "region" | "maxTokens" | "instructions" | "append_current_datetime" | "stop" | "spec" | "fileTokenLimit"> & {
    /** @endpoints openAI, custom, azureOpenAI, google, anthropic, assistants, azureAssistants, bedrock, agents */
    endpoint: z.ZodNullable<z.ZodUnion<[z.ZodNativeEnum<typeof EModelEndpoint>, z.ZodString]>>;
}, "strip", z.ZodTypeAny, {
    endpoint: string | null;
    model?: string | null | undefined;
    temperature?: number | null | undefined;
    promptPrefix?: string | null | undefined;
    topP?: number | undefined;
    topK?: number | undefined;
    top_p?: number | undefined;
    frequency_penalty?: number | undefined;
    presence_penalty?: number | undefined;
    maxOutputTokens?: number | null | undefined;
    maxContextTokens?: number | undefined;
    max_tokens?: number | undefined;
    promptCache?: boolean | undefined;
    thinking?: boolean | undefined;
    thinkingBudget?: number | undefined;
    resendFiles?: boolean | undefined;
    imageDetail?: ImageDetail | undefined;
    reasoning_effort?: ReasoningEffort | null | undefined;
    reasoning_summary?: ReasoningSummary | null | undefined;
    verbosity?: Verbosity | null | undefined;
    useResponsesApi?: boolean | undefined;
    web_search?: boolean | undefined;
    disableStreaming?: boolean | undefined;
    assistant_id?: string | undefined;
    agent_id?: string | undefined;
    region?: string | undefined;
    maxTokens?: number | undefined;
    instructions?: string | undefined;
    append_current_datetime?: boolean | undefined;
    stop?: string[] | undefined;
    spec?: string | null | undefined;
    fileTokenLimit?: number | undefined;
}, {
    endpoint: string | null;
    model?: string | null | undefined;
    temperature?: number | null | undefined;
    promptPrefix?: string | null | undefined;
    topP?: number | undefined;
    topK?: number | undefined;
    top_p?: number | undefined;
    frequency_penalty?: number | undefined;
    presence_penalty?: number | undefined;
    maxOutputTokens?: string | number | null | undefined;
    maxContextTokens?: string | number | undefined;
    max_tokens?: string | number | undefined;
    promptCache?: boolean | undefined;
    thinking?: boolean | undefined;
    thinkingBudget?: string | number | undefined;
    resendFiles?: boolean | undefined;
    imageDetail?: ImageDetail | undefined;
    reasoning_effort?: ReasoningEffort | null | undefined;
    reasoning_summary?: ReasoningSummary | null | undefined;
    verbosity?: Verbosity | null | undefined;
    useResponsesApi?: boolean | undefined;
    web_search?: boolean | undefined;
    disableStreaming?: boolean | undefined;
    assistant_id?: string | undefined;
    agent_id?: string | undefined;
    region?: string | undefined;
    maxTokens?: string | number | undefined;
    instructions?: string | undefined;
    append_current_datetime?: boolean | undefined;
    stop?: string[] | undefined;
    spec?: string | null | undefined;
    fileTokenLimit?: string | number | undefined;
}>;
export type TPreset = z.infer<typeof tPresetSchema>;
export type TSetOption = (param: number | string) => (newValue: number | string | boolean | string[] | Partial<TPreset>) => void;
export type TConversation = z.infer<typeof tConversationSchema> & {
    presetOverride?: Partial<TPreset>;
    disableParams?: boolean;
};
export declare const tSharedLinkSchema: z.ZodObject<{
    conversationId: z.ZodString;
    shareId: z.ZodString;
    messages: z.ZodArray<z.ZodString, "many">;
    isPublic: z.ZodBoolean;
    title: z.ZodString;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    conversationId: string;
    title: string;
    createdAt: string;
    updatedAt: string;
    messages: string[];
    shareId: string;
    isPublic: boolean;
}, {
    conversationId: string;
    title: string;
    createdAt: string;
    updatedAt: string;
    messages: string[];
    shareId: string;
    isPublic: boolean;
}>;
export type TSharedLink = z.infer<typeof tSharedLinkSchema>;
export declare const tConversationTagSchema: z.ZodObject<{
    _id: z.ZodString;
    user: z.ZodString;
    tag: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
    count: z.ZodNumber;
    position: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    createdAt: string;
    updatedAt: string;
    tag: string;
    _id: string;
    user: string;
    count: number;
    position: number;
    description?: string | undefined;
}, {
    createdAt: string;
    updatedAt: string;
    tag: string;
    _id: string;
    user: string;
    count: number;
    position: number;
    description?: string | undefined;
}>;
export type TConversationTag = z.infer<typeof tConversationTagSchema>;
export declare const googleBaseSchema: z.ZodObject<Pick<{
    conversationId: z.ZodNullable<z.ZodString>;
    endpoint: z.ZodNullable<z.ZodNativeEnum<typeof EModelEndpoint>>;
    endpointType: z.ZodOptional<z.ZodNullable<z.ZodNativeEnum<typeof EModelEndpoint>>>;
    isArchived: z.ZodOptional<z.ZodBoolean>;
    title: z.ZodDefault<z.ZodUnion<[z.ZodNullable<z.ZodString>, z.ZodLiteral<"New Chat">]>>;
    user: z.ZodOptional<z.ZodString>;
    messages: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
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
            authField: string;
            label: string;
        }, {
            description: string;
            authField: string;
            label: string;
        }>, "many">>;
        authenticated: z.ZodOptional<z.ZodBoolean>;
        chatMenu: z.ZodOptional<z.ZodBoolean>;
        isButton: z.ZodOptional<z.ZodBoolean>;
        toolkit: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        pluginKey: string;
        description?: string | undefined;
        icon?: string | undefined;
        authConfig?: {
            description: string;
            authField: string;
            label: string;
        }[] | undefined;
        authenticated?: boolean | undefined;
        chatMenu?: boolean | undefined;
        isButton?: boolean | undefined;
        toolkit?: boolean | undefined;
    }, {
        name: string;
        pluginKey: string;
        description?: string | undefined;
        icon?: string | undefined;
        authConfig?: {
            description: string;
            authField: string;
            label: string;
        }[] | undefined;
        authenticated?: boolean | undefined;
        chatMenu?: boolean | undefined;
        isButton?: boolean | undefined;
        toolkit?: boolean | undefined;
    }>, "many">, z.ZodArray<z.ZodString, "many">]>>;
    modelLabel: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    userLabel: z.ZodOptional<z.ZodString>;
    model: z.ZodOptional<z.ZodNullable<z.ZodString>>;
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
    tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
    resendFiles: z.ZodOptional<z.ZodBoolean>;
    file_ids: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    imageDetail: z.ZodOptional<z.ZodNativeEnum<typeof ImageDetail>>;
    reasoning_effort: z.ZodNullable<z.ZodOptional<z.ZodNativeEnum<typeof ReasoningEffort>>>;
    reasoning_summary: z.ZodNullable<z.ZodOptional<z.ZodNativeEnum<typeof ReasoningSummary>>>;
    verbosity: z.ZodNullable<z.ZodOptional<z.ZodNativeEnum<typeof Verbosity>>>;
    useResponsesApi: z.ZodOptional<z.ZodBoolean>;
    web_search: z.ZodOptional<z.ZodBoolean>;
    disableStreaming: z.ZodOptional<z.ZodBoolean>;
    assistant_id: z.ZodOptional<z.ZodString>;
    agent_id: z.ZodOptional<z.ZodString>;
    region: z.ZodOptional<z.ZodString>;
    maxTokens: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodNumber, z.ZodString]>, number | undefined, string | number>>;
    additionalModelRequestFields: z.ZodOptional<z.ZodType<DocumentTypeValue, z.ZodTypeDef, DocumentTypeValue>>;
    instructions: z.ZodOptional<z.ZodString>;
    additional_instructions: z.ZodOptional<z.ZodString>;
    append_current_datetime: z.ZodOptional<z.ZodBoolean>;
    /** Used to overwrite active conversation settings when saving a Preset */
    presetOverride: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    stop: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    greeting: z.ZodOptional<z.ZodString>;
    spec: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    iconURL: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    expiredAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    fileTokenLimit: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodNumber, z.ZodString]>, number | undefined, string | number>>;
    /** @deprecated */
    resendImages: z.ZodOptional<z.ZodBoolean>;
    /** @deprecated */
    agentOptions: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        agent: z.ZodDefault<z.ZodString>;
        skipCompletion: z.ZodDefault<z.ZodBoolean>;
        model: z.ZodString;
        temperature: z.ZodDefault<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        agent: string;
        skipCompletion: boolean;
        model: string;
        temperature: number;
    }, {
        model: string;
        agent?: string | undefined;
        skipCompletion?: boolean | undefined;
        temperature?: number | undefined;
    }>>>;
    /** @deprecated Prefer `modelLabel` over `chatGptLabel` */
    chatGptLabel: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, "model" | "temperature" | "iconURL" | "modelLabel" | "promptPrefix" | "topP" | "topK" | "maxOutputTokens" | "maxContextTokens" | "thinking" | "thinkingBudget" | "artifacts" | "examples" | "web_search" | "greeting" | "spec" | "fileTokenLimit">, "strip", z.ZodTypeAny, {
    model?: string | null | undefined;
    temperature?: number | null | undefined;
    iconURL?: string | null | undefined;
    modelLabel?: string | null | undefined;
    promptPrefix?: string | null | undefined;
    topP?: number | undefined;
    topK?: number | undefined;
    maxOutputTokens?: number | null | undefined;
    maxContextTokens?: number | undefined;
    thinking?: boolean | undefined;
    thinkingBudget?: number | undefined;
    artifacts?: string | undefined;
    examples?: {
        input: {
            content: string;
        };
        output: {
            content: string;
        };
    }[] | undefined;
    web_search?: boolean | undefined;
    greeting?: string | undefined;
    spec?: string | null | undefined;
    fileTokenLimit?: number | undefined;
}, {
    model?: string | null | undefined;
    temperature?: number | null | undefined;
    iconURL?: string | null | undefined;
    modelLabel?: string | null | undefined;
    promptPrefix?: string | null | undefined;
    topP?: number | undefined;
    topK?: number | undefined;
    maxOutputTokens?: string | number | null | undefined;
    maxContextTokens?: string | number | undefined;
    thinking?: boolean | undefined;
    thinkingBudget?: string | number | undefined;
    artifacts?: string | undefined;
    examples?: {
        input: {
            content: string;
        };
        output: {
            content: string;
        };
    }[] | undefined;
    web_search?: boolean | undefined;
    greeting?: string | undefined;
    spec?: string | null | undefined;
    fileTokenLimit?: string | number | undefined;
}>;
export declare const googleSchema: z.ZodCatch<z.ZodEffects<z.ZodObject<Pick<{
    conversationId: z.ZodNullable<z.ZodString>;
    endpoint: z.ZodNullable<z.ZodNativeEnum<typeof EModelEndpoint>>;
    endpointType: z.ZodOptional<z.ZodNullable<z.ZodNativeEnum<typeof EModelEndpoint>>>;
    isArchived: z.ZodOptional<z.ZodBoolean>;
    title: z.ZodDefault<z.ZodUnion<[z.ZodNullable<z.ZodString>, z.ZodLiteral<"New Chat">]>>;
    user: z.ZodOptional<z.ZodString>;
    messages: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
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
            authField: string;
            label: string;
        }, {
            description: string;
            authField: string;
            label: string;
        }>, "many">>;
        authenticated: z.ZodOptional<z.ZodBoolean>;
        chatMenu: z.ZodOptional<z.ZodBoolean>;
        isButton: z.ZodOptional<z.ZodBoolean>;
        toolkit: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        pluginKey: string;
        description?: string | undefined;
        icon?: string | undefined;
        authConfig?: {
            description: string;
            authField: string;
            label: string;
        }[] | undefined;
        authenticated?: boolean | undefined;
        chatMenu?: boolean | undefined;
        isButton?: boolean | undefined;
        toolkit?: boolean | undefined;
    }, {
        name: string;
        pluginKey: string;
        description?: string | undefined;
        icon?: string | undefined;
        authConfig?: {
            description: string;
            authField: string;
            label: string;
        }[] | undefined;
        authenticated?: boolean | undefined;
        chatMenu?: boolean | undefined;
        isButton?: boolean | undefined;
        toolkit?: boolean | undefined;
    }>, "many">, z.ZodArray<z.ZodString, "many">]>>;
    modelLabel: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    userLabel: z.ZodOptional<z.ZodString>;
    model: z.ZodOptional<z.ZodNullable<z.ZodString>>;
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
    tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
    resendFiles: z.ZodOptional<z.ZodBoolean>;
    file_ids: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    imageDetail: z.ZodOptional<z.ZodNativeEnum<typeof ImageDetail>>;
    reasoning_effort: z.ZodNullable<z.ZodOptional<z.ZodNativeEnum<typeof ReasoningEffort>>>;
    reasoning_summary: z.ZodNullable<z.ZodOptional<z.ZodNativeEnum<typeof ReasoningSummary>>>;
    verbosity: z.ZodNullable<z.ZodOptional<z.ZodNativeEnum<typeof Verbosity>>>;
    useResponsesApi: z.ZodOptional<z.ZodBoolean>;
    web_search: z.ZodOptional<z.ZodBoolean>;
    disableStreaming: z.ZodOptional<z.ZodBoolean>;
    assistant_id: z.ZodOptional<z.ZodString>;
    agent_id: z.ZodOptional<z.ZodString>;
    region: z.ZodOptional<z.ZodString>;
    maxTokens: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodNumber, z.ZodString]>, number | undefined, string | number>>;
    additionalModelRequestFields: z.ZodOptional<z.ZodType<DocumentTypeValue, z.ZodTypeDef, DocumentTypeValue>>;
    instructions: z.ZodOptional<z.ZodString>;
    additional_instructions: z.ZodOptional<z.ZodString>;
    append_current_datetime: z.ZodOptional<z.ZodBoolean>;
    /** Used to overwrite active conversation settings when saving a Preset */
    presetOverride: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    stop: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    greeting: z.ZodOptional<z.ZodString>;
    spec: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    iconURL: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    expiredAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    fileTokenLimit: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodNumber, z.ZodString]>, number | undefined, string | number>>;
    /** @deprecated */
    resendImages: z.ZodOptional<z.ZodBoolean>;
    /** @deprecated */
    agentOptions: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        agent: z.ZodDefault<z.ZodString>;
        skipCompletion: z.ZodDefault<z.ZodBoolean>;
        model: z.ZodString;
        temperature: z.ZodDefault<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        agent: string;
        skipCompletion: boolean;
        model: string;
        temperature: number;
    }, {
        model: string;
        agent?: string | undefined;
        skipCompletion?: boolean | undefined;
        temperature?: number | undefined;
    }>>>;
    /** @deprecated Prefer `modelLabel` over `chatGptLabel` */
    chatGptLabel: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, "model" | "temperature" | "iconURL" | "modelLabel" | "promptPrefix" | "topP" | "topK" | "maxOutputTokens" | "maxContextTokens" | "thinking" | "thinkingBudget" | "artifacts" | "examples" | "web_search" | "greeting" | "spec" | "fileTokenLimit">, "strip", z.ZodTypeAny, {
    model?: string | null | undefined;
    temperature?: number | null | undefined;
    iconURL?: string | null | undefined;
    modelLabel?: string | null | undefined;
    promptPrefix?: string | null | undefined;
    topP?: number | undefined;
    topK?: number | undefined;
    maxOutputTokens?: number | null | undefined;
    maxContextTokens?: number | undefined;
    thinking?: boolean | undefined;
    thinkingBudget?: number | undefined;
    artifacts?: string | undefined;
    examples?: {
        input: {
            content: string;
        };
        output: {
            content: string;
        };
    }[] | undefined;
    web_search?: boolean | undefined;
    greeting?: string | undefined;
    spec?: string | null | undefined;
    fileTokenLimit?: number | undefined;
}, {
    model?: string | null | undefined;
    temperature?: number | null | undefined;
    iconURL?: string | null | undefined;
    modelLabel?: string | null | undefined;
    promptPrefix?: string | null | undefined;
    topP?: number | undefined;
    topK?: number | undefined;
    maxOutputTokens?: string | number | null | undefined;
    maxContextTokens?: string | number | undefined;
    thinking?: boolean | undefined;
    thinkingBudget?: string | number | undefined;
    artifacts?: string | undefined;
    examples?: {
        input: {
            content: string;
        };
        output: {
            content: string;
        };
    }[] | undefined;
    web_search?: boolean | undefined;
    greeting?: string | undefined;
    spec?: string | null | undefined;
    fileTokenLimit?: string | number | undefined;
}>, Partial<Partial<TConversation>>, {
    model?: string | null | undefined;
    temperature?: number | null | undefined;
    iconURL?: string | null | undefined;
    modelLabel?: string | null | undefined;
    promptPrefix?: string | null | undefined;
    topP?: number | undefined;
    topK?: number | undefined;
    maxOutputTokens?: string | number | null | undefined;
    maxContextTokens?: string | number | undefined;
    thinking?: boolean | undefined;
    thinkingBudget?: string | number | undefined;
    artifacts?: string | undefined;
    examples?: {
        input: {
            content: string;
        };
        output: {
            content: string;
        };
    }[] | undefined;
    web_search?: boolean | undefined;
    greeting?: string | undefined;
    spec?: string | null | undefined;
    fileTokenLimit?: string | number | undefined;
}>>;
/**
   * TODO: Map the following fields:
  - presence_penalty -> presencePenalty
  - frequency_penalty -> frequencyPenalty
  - stop -> stopSequences
   */
export declare const googleGenConfigSchema: z.ZodOptional<z.ZodObject<{
    maxOutputTokens: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodNumber, z.ZodString]>, number | undefined, string | number>>;
    temperature: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodNumber, z.ZodString]>, number | undefined, string | number>>;
    topP: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodNumber, z.ZodString]>, number | undefined, string | number>>;
    topK: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodNumber, z.ZodString]>, number | undefined, string | number>>;
    presencePenalty: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodNumber, z.ZodString]>, number | undefined, string | number>>;
    frequencyPenalty: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodNumber, z.ZodString]>, number | undefined, string | number>>;
    stopSequences: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    thinkingConfig: z.ZodOptional<z.ZodObject<{
        includeThoughts: z.ZodOptional<z.ZodBoolean>;
        thinkingBudget: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodNumber, z.ZodString]>, number | undefined, string | number>>;
    }, "strip", z.ZodTypeAny, {
        thinkingBudget?: number | undefined;
        includeThoughts?: boolean | undefined;
    }, {
        thinkingBudget?: string | number | undefined;
        includeThoughts?: boolean | undefined;
    }>>;
    web_search: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    temperature?: number | undefined;
    topP?: number | undefined;
    topK?: number | undefined;
    maxOutputTokens?: number | undefined;
    web_search?: boolean | undefined;
    presencePenalty?: number | undefined;
    frequencyPenalty?: number | undefined;
    stopSequences?: string[] | undefined;
    thinkingConfig?: {
        thinkingBudget?: number | undefined;
        includeThoughts?: boolean | undefined;
    } | undefined;
}, {
    temperature?: string | number | undefined;
    topP?: string | number | undefined;
    topK?: string | number | undefined;
    maxOutputTokens?: string | number | undefined;
    web_search?: boolean | undefined;
    presencePenalty?: string | number | undefined;
    frequencyPenalty?: string | number | undefined;
    stopSequences?: string[] | undefined;
    thinkingConfig?: {
        thinkingBudget?: string | number | undefined;
        includeThoughts?: boolean | undefined;
    } | undefined;
}>>;
export declare const gptPluginsSchema: z.ZodCatch<z.ZodEffects<z.ZodObject<Pick<{
    conversationId: z.ZodNullable<z.ZodString>;
    endpoint: z.ZodNullable<z.ZodNativeEnum<typeof EModelEndpoint>>;
    endpointType: z.ZodOptional<z.ZodNullable<z.ZodNativeEnum<typeof EModelEndpoint>>>;
    isArchived: z.ZodOptional<z.ZodBoolean>;
    title: z.ZodDefault<z.ZodUnion<[z.ZodNullable<z.ZodString>, z.ZodLiteral<"New Chat">]>>;
    user: z.ZodOptional<z.ZodString>;
    messages: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
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
            authField: string;
            label: string;
        }, {
            description: string;
            authField: string;
            label: string;
        }>, "many">>;
        authenticated: z.ZodOptional<z.ZodBoolean>;
        chatMenu: z.ZodOptional<z.ZodBoolean>;
        isButton: z.ZodOptional<z.ZodBoolean>;
        toolkit: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        pluginKey: string;
        description?: string | undefined;
        icon?: string | undefined;
        authConfig?: {
            description: string;
            authField: string;
            label: string;
        }[] | undefined;
        authenticated?: boolean | undefined;
        chatMenu?: boolean | undefined;
        isButton?: boolean | undefined;
        toolkit?: boolean | undefined;
    }, {
        name: string;
        pluginKey: string;
        description?: string | undefined;
        icon?: string | undefined;
        authConfig?: {
            description: string;
            authField: string;
            label: string;
        }[] | undefined;
        authenticated?: boolean | undefined;
        chatMenu?: boolean | undefined;
        isButton?: boolean | undefined;
        toolkit?: boolean | undefined;
    }>, "many">, z.ZodArray<z.ZodString, "many">]>>;
    modelLabel: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    userLabel: z.ZodOptional<z.ZodString>;
    model: z.ZodOptional<z.ZodNullable<z.ZodString>>;
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
    tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
    resendFiles: z.ZodOptional<z.ZodBoolean>;
    file_ids: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    imageDetail: z.ZodOptional<z.ZodNativeEnum<typeof ImageDetail>>;
    reasoning_effort: z.ZodNullable<z.ZodOptional<z.ZodNativeEnum<typeof ReasoningEffort>>>;
    reasoning_summary: z.ZodNullable<z.ZodOptional<z.ZodNativeEnum<typeof ReasoningSummary>>>;
    verbosity: z.ZodNullable<z.ZodOptional<z.ZodNativeEnum<typeof Verbosity>>>;
    useResponsesApi: z.ZodOptional<z.ZodBoolean>;
    web_search: z.ZodOptional<z.ZodBoolean>;
    disableStreaming: z.ZodOptional<z.ZodBoolean>;
    assistant_id: z.ZodOptional<z.ZodString>;
    agent_id: z.ZodOptional<z.ZodString>;
    region: z.ZodOptional<z.ZodString>;
    maxTokens: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodNumber, z.ZodString]>, number | undefined, string | number>>;
    additionalModelRequestFields: z.ZodOptional<z.ZodType<DocumentTypeValue, z.ZodTypeDef, DocumentTypeValue>>;
    instructions: z.ZodOptional<z.ZodString>;
    additional_instructions: z.ZodOptional<z.ZodString>;
    append_current_datetime: z.ZodOptional<z.ZodBoolean>;
    /** Used to overwrite active conversation settings when saving a Preset */
    presetOverride: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    stop: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    greeting: z.ZodOptional<z.ZodString>;
    spec: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    iconURL: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    expiredAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    fileTokenLimit: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodNumber, z.ZodString]>, number | undefined, string | number>>;
    /** @deprecated */
    resendImages: z.ZodOptional<z.ZodBoolean>;
    /** @deprecated */
    agentOptions: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        agent: z.ZodDefault<z.ZodString>;
        skipCompletion: z.ZodDefault<z.ZodBoolean>;
        model: z.ZodString;
        temperature: z.ZodDefault<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        agent: string;
        skipCompletion: boolean;
        model: string;
        temperature: number;
    }, {
        model: string;
        agent?: string | undefined;
        skipCompletion?: boolean | undefined;
        temperature?: number | undefined;
    }>>>;
    /** @deprecated Prefer `modelLabel` over `chatGptLabel` */
    chatGptLabel: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, "model" | "temperature" | "iconURL" | "tools" | "modelLabel" | "promptPrefix" | "top_p" | "frequency_penalty" | "presence_penalty" | "maxContextTokens" | "artifacts" | "greeting" | "spec" | "agentOptions" | "chatGptLabel">, "strip", z.ZodTypeAny, {
    model?: string | null | undefined;
    temperature?: number | null | undefined;
    iconURL?: string | null | undefined;
    tools?: string[] | {
        name: string;
        pluginKey: string;
        description?: string | undefined;
        icon?: string | undefined;
        authConfig?: {
            description: string;
            authField: string;
            label: string;
        }[] | undefined;
        authenticated?: boolean | undefined;
        chatMenu?: boolean | undefined;
        isButton?: boolean | undefined;
        toolkit?: boolean | undefined;
    }[] | undefined;
    modelLabel?: string | null | undefined;
    promptPrefix?: string | null | undefined;
    top_p?: number | undefined;
    frequency_penalty?: number | undefined;
    presence_penalty?: number | undefined;
    maxContextTokens?: number | undefined;
    artifacts?: string | undefined;
    greeting?: string | undefined;
    spec?: string | null | undefined;
    agentOptions?: {
        agent: string;
        skipCompletion: boolean;
        model: string;
        temperature: number;
    } | null | undefined;
    chatGptLabel?: string | null | undefined;
}, {
    model?: string | null | undefined;
    temperature?: number | null | undefined;
    iconURL?: string | null | undefined;
    tools?: string[] | {
        name: string;
        pluginKey: string;
        description?: string | undefined;
        icon?: string | undefined;
        authConfig?: {
            description: string;
            authField: string;
            label: string;
        }[] | undefined;
        authenticated?: boolean | undefined;
        chatMenu?: boolean | undefined;
        isButton?: boolean | undefined;
        toolkit?: boolean | undefined;
    }[] | undefined;
    modelLabel?: string | null | undefined;
    promptPrefix?: string | null | undefined;
    top_p?: number | undefined;
    frequency_penalty?: number | undefined;
    presence_penalty?: number | undefined;
    maxContextTokens?: string | number | undefined;
    artifacts?: string | undefined;
    greeting?: string | undefined;
    spec?: string | null | undefined;
    agentOptions?: {
        model: string;
        agent?: string | undefined;
        skipCompletion?: boolean | undefined;
        temperature?: number | undefined;
    } | null | undefined;
    chatGptLabel?: string | null | undefined;
}>, {
    model: string;
    chatGptLabel: string | null;
    promptPrefix: string | null;
    temperature: number;
    top_p: number;
    presence_penalty: number;
    frequency_penalty: number;
    tools: string[] | {
        name: string;
        pluginKey: string;
        description?: string | undefined;
        icon?: string | undefined;
        authConfig?: {
            description: string;
            authField: string;
            label: string;
        }[] | undefined;
        authenticated?: boolean | undefined;
        chatMenu?: boolean | undefined;
        isButton?: boolean | undefined;
        toolkit?: boolean | undefined;
    }[];
    agentOptions: {
        agent: string;
        skipCompletion: boolean;
        model: string;
        temperature: number;
    };
    iconURL: string | undefined;
    greeting: string | undefined;
    spec: string | undefined;
    maxContextTokens: number | undefined;
    modelLabel?: string | null | undefined;
    artifacts?: string | undefined;
}, {
    model?: string | null | undefined;
    temperature?: number | null | undefined;
    iconURL?: string | null | undefined;
    tools?: string[] | {
        name: string;
        pluginKey: string;
        description?: string | undefined;
        icon?: string | undefined;
        authConfig?: {
            description: string;
            authField: string;
            label: string;
        }[] | undefined;
        authenticated?: boolean | undefined;
        chatMenu?: boolean | undefined;
        isButton?: boolean | undefined;
        toolkit?: boolean | undefined;
    }[] | undefined;
    modelLabel?: string | null | undefined;
    promptPrefix?: string | null | undefined;
    top_p?: number | undefined;
    frequency_penalty?: number | undefined;
    presence_penalty?: number | undefined;
    maxContextTokens?: string | number | undefined;
    artifacts?: string | undefined;
    greeting?: string | undefined;
    spec?: string | null | undefined;
    agentOptions?: {
        model: string;
        agent?: string | undefined;
        skipCompletion?: boolean | undefined;
        temperature?: number | undefined;
    } | null | undefined;
    chatGptLabel?: string | null | undefined;
}>>;
export declare function removeNullishValues<T extends Record<string, unknown>>(obj: T, removeEmptyStrings?: boolean): Partial<T>;
export declare const assistantSchema: z.ZodCatch<z.ZodEffects<z.ZodObject<Pick<{
    conversationId: z.ZodNullable<z.ZodString>;
    endpoint: z.ZodNullable<z.ZodNativeEnum<typeof EModelEndpoint>>;
    endpointType: z.ZodOptional<z.ZodNullable<z.ZodNativeEnum<typeof EModelEndpoint>>>;
    isArchived: z.ZodOptional<z.ZodBoolean>;
    title: z.ZodDefault<z.ZodUnion<[z.ZodNullable<z.ZodString>, z.ZodLiteral<"New Chat">]>>;
    user: z.ZodOptional<z.ZodString>;
    messages: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
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
            authField: string;
            label: string;
        }, {
            description: string;
            authField: string;
            label: string;
        }>, "many">>;
        authenticated: z.ZodOptional<z.ZodBoolean>;
        chatMenu: z.ZodOptional<z.ZodBoolean>;
        isButton: z.ZodOptional<z.ZodBoolean>;
        toolkit: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        pluginKey: string;
        description?: string | undefined;
        icon?: string | undefined;
        authConfig?: {
            description: string;
            authField: string;
            label: string;
        }[] | undefined;
        authenticated?: boolean | undefined;
        chatMenu?: boolean | undefined;
        isButton?: boolean | undefined;
        toolkit?: boolean | undefined;
    }, {
        name: string;
        pluginKey: string;
        description?: string | undefined;
        icon?: string | undefined;
        authConfig?: {
            description: string;
            authField: string;
            label: string;
        }[] | undefined;
        authenticated?: boolean | undefined;
        chatMenu?: boolean | undefined;
        isButton?: boolean | undefined;
        toolkit?: boolean | undefined;
    }>, "many">, z.ZodArray<z.ZodString, "many">]>>;
    modelLabel: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    userLabel: z.ZodOptional<z.ZodString>;
    model: z.ZodOptional<z.ZodNullable<z.ZodString>>;
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
    tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
    resendFiles: z.ZodOptional<z.ZodBoolean>;
    file_ids: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    imageDetail: z.ZodOptional<z.ZodNativeEnum<typeof ImageDetail>>;
    reasoning_effort: z.ZodNullable<z.ZodOptional<z.ZodNativeEnum<typeof ReasoningEffort>>>;
    reasoning_summary: z.ZodNullable<z.ZodOptional<z.ZodNativeEnum<typeof ReasoningSummary>>>;
    verbosity: z.ZodNullable<z.ZodOptional<z.ZodNativeEnum<typeof Verbosity>>>;
    useResponsesApi: z.ZodOptional<z.ZodBoolean>;
    web_search: z.ZodOptional<z.ZodBoolean>;
    disableStreaming: z.ZodOptional<z.ZodBoolean>;
    assistant_id: z.ZodOptional<z.ZodString>;
    agent_id: z.ZodOptional<z.ZodString>;
    region: z.ZodOptional<z.ZodString>;
    maxTokens: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodNumber, z.ZodString]>, number | undefined, string | number>>;
    additionalModelRequestFields: z.ZodOptional<z.ZodType<DocumentTypeValue, z.ZodTypeDef, DocumentTypeValue>>;
    instructions: z.ZodOptional<z.ZodString>;
    additional_instructions: z.ZodOptional<z.ZodString>;
    append_current_datetime: z.ZodOptional<z.ZodBoolean>;
    /** Used to overwrite active conversation settings when saving a Preset */
    presetOverride: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    stop: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    greeting: z.ZodOptional<z.ZodString>;
    spec: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    iconURL: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    expiredAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    fileTokenLimit: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodNumber, z.ZodString]>, number | undefined, string | number>>;
    /** @deprecated */
    resendImages: z.ZodOptional<z.ZodBoolean>;
    /** @deprecated */
    agentOptions: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        agent: z.ZodDefault<z.ZodString>;
        skipCompletion: z.ZodDefault<z.ZodBoolean>;
        model: z.ZodString;
        temperature: z.ZodDefault<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        agent: string;
        skipCompletion: boolean;
        model: string;
        temperature: number;
    }, {
        model: string;
        agent?: string | undefined;
        skipCompletion?: boolean | undefined;
        temperature?: number | undefined;
    }>>>;
    /** @deprecated Prefer `modelLabel` over `chatGptLabel` */
    chatGptLabel: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, "model" | "iconURL" | "promptPrefix" | "artifacts" | "assistant_id" | "instructions" | "append_current_datetime" | "greeting" | "spec">, "strip", z.ZodTypeAny, {
    model?: string | null | undefined;
    iconURL?: string | null | undefined;
    promptPrefix?: string | null | undefined;
    artifacts?: string | undefined;
    assistant_id?: string | undefined;
    instructions?: string | undefined;
    append_current_datetime?: boolean | undefined;
    greeting?: string | undefined;
    spec?: string | null | undefined;
}, {
    model?: string | null | undefined;
    iconURL?: string | null | undefined;
    promptPrefix?: string | null | undefined;
    artifacts?: string | undefined;
    assistant_id?: string | undefined;
    instructions?: string | undefined;
    append_current_datetime?: boolean | undefined;
    greeting?: string | undefined;
    spec?: string | null | undefined;
}>, {
    model: string;
    assistant_id: string | undefined;
    instructions: string | undefined;
    promptPrefix: string | null;
    iconURL: string | undefined;
    greeting: string | undefined;
    spec: string | undefined;
    append_current_datetime: boolean;
    artifacts?: string | undefined;
}, {
    model?: string | null | undefined;
    iconURL?: string | null | undefined;
    promptPrefix?: string | null | undefined;
    artifacts?: string | undefined;
    assistant_id?: string | undefined;
    instructions?: string | undefined;
    append_current_datetime?: boolean | undefined;
    greeting?: string | undefined;
    spec?: string | null | undefined;
}>>;
export declare const compactAssistantSchema: z.ZodCatch<z.ZodEffects<z.ZodObject<Pick<{
    conversationId: z.ZodNullable<z.ZodString>;
    endpoint: z.ZodNullable<z.ZodNativeEnum<typeof EModelEndpoint>>;
    endpointType: z.ZodOptional<z.ZodNullable<z.ZodNativeEnum<typeof EModelEndpoint>>>;
    isArchived: z.ZodOptional<z.ZodBoolean>;
    title: z.ZodDefault<z.ZodUnion<[z.ZodNullable<z.ZodString>, z.ZodLiteral<"New Chat">]>>;
    user: z.ZodOptional<z.ZodString>;
    messages: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
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
            authField: string;
            label: string;
        }, {
            description: string;
            authField: string;
            label: string;
        }>, "many">>;
        authenticated: z.ZodOptional<z.ZodBoolean>;
        chatMenu: z.ZodOptional<z.ZodBoolean>;
        isButton: z.ZodOptional<z.ZodBoolean>;
        toolkit: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        pluginKey: string;
        description?: string | undefined;
        icon?: string | undefined;
        authConfig?: {
            description: string;
            authField: string;
            label: string;
        }[] | undefined;
        authenticated?: boolean | undefined;
        chatMenu?: boolean | undefined;
        isButton?: boolean | undefined;
        toolkit?: boolean | undefined;
    }, {
        name: string;
        pluginKey: string;
        description?: string | undefined;
        icon?: string | undefined;
        authConfig?: {
            description: string;
            authField: string;
            label: string;
        }[] | undefined;
        authenticated?: boolean | undefined;
        chatMenu?: boolean | undefined;
        isButton?: boolean | undefined;
        toolkit?: boolean | undefined;
    }>, "many">, z.ZodArray<z.ZodString, "many">]>>;
    modelLabel: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    userLabel: z.ZodOptional<z.ZodString>;
    model: z.ZodOptional<z.ZodNullable<z.ZodString>>;
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
    tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
    resendFiles: z.ZodOptional<z.ZodBoolean>;
    file_ids: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    imageDetail: z.ZodOptional<z.ZodNativeEnum<typeof ImageDetail>>;
    reasoning_effort: z.ZodNullable<z.ZodOptional<z.ZodNativeEnum<typeof ReasoningEffort>>>;
    reasoning_summary: z.ZodNullable<z.ZodOptional<z.ZodNativeEnum<typeof ReasoningSummary>>>;
    verbosity: z.ZodNullable<z.ZodOptional<z.ZodNativeEnum<typeof Verbosity>>>;
    useResponsesApi: z.ZodOptional<z.ZodBoolean>;
    web_search: z.ZodOptional<z.ZodBoolean>;
    disableStreaming: z.ZodOptional<z.ZodBoolean>;
    assistant_id: z.ZodOptional<z.ZodString>;
    agent_id: z.ZodOptional<z.ZodString>;
    region: z.ZodOptional<z.ZodString>;
    maxTokens: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodNumber, z.ZodString]>, number | undefined, string | number>>;
    additionalModelRequestFields: z.ZodOptional<z.ZodType<DocumentTypeValue, z.ZodTypeDef, DocumentTypeValue>>;
    instructions: z.ZodOptional<z.ZodString>;
    additional_instructions: z.ZodOptional<z.ZodString>;
    append_current_datetime: z.ZodOptional<z.ZodBoolean>;
    /** Used to overwrite active conversation settings when saving a Preset */
    presetOverride: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    stop: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    greeting: z.ZodOptional<z.ZodString>;
    spec: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    iconURL: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    expiredAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    fileTokenLimit: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodNumber, z.ZodString]>, number | undefined, string | number>>;
    /** @deprecated */
    resendImages: z.ZodOptional<z.ZodBoolean>;
    /** @deprecated */
    agentOptions: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        agent: z.ZodDefault<z.ZodString>;
        skipCompletion: z.ZodDefault<z.ZodBoolean>;
        model: z.ZodString;
        temperature: z.ZodDefault<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        agent: string;
        skipCompletion: boolean;
        model: string;
        temperature: number;
    }, {
        model: string;
        agent?: string | undefined;
        skipCompletion?: boolean | undefined;
        temperature?: number | undefined;
    }>>>;
    /** @deprecated Prefer `modelLabel` over `chatGptLabel` */
    chatGptLabel: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, "model" | "iconURL" | "promptPrefix" | "artifacts" | "assistant_id" | "instructions" | "greeting" | "spec">, "strip", z.ZodTypeAny, {
    model?: string | null | undefined;
    iconURL?: string | null | undefined;
    promptPrefix?: string | null | undefined;
    artifacts?: string | undefined;
    assistant_id?: string | undefined;
    instructions?: string | undefined;
    greeting?: string | undefined;
    spec?: string | null | undefined;
}, {
    model?: string | null | undefined;
    iconURL?: string | null | undefined;
    promptPrefix?: string | null | undefined;
    artifacts?: string | undefined;
    assistant_id?: string | undefined;
    instructions?: string | undefined;
    greeting?: string | undefined;
    spec?: string | null | undefined;
}>, Partial<{
    model?: string | null | undefined;
    iconURL?: string | null | undefined;
    promptPrefix?: string | null | undefined;
    artifacts?: string | undefined;
    assistant_id?: string | undefined;
    instructions?: string | undefined;
    greeting?: string | undefined;
    spec?: string | null | undefined;
}>, {
    model?: string | null | undefined;
    iconURL?: string | null | undefined;
    promptPrefix?: string | null | undefined;
    artifacts?: string | undefined;
    assistant_id?: string | undefined;
    instructions?: string | undefined;
    greeting?: string | undefined;
    spec?: string | null | undefined;
}>>;
export declare const agentsBaseSchema: z.ZodObject<Pick<{
    conversationId: z.ZodNullable<z.ZodString>;
    endpoint: z.ZodNullable<z.ZodNativeEnum<typeof EModelEndpoint>>;
    endpointType: z.ZodOptional<z.ZodNullable<z.ZodNativeEnum<typeof EModelEndpoint>>>;
    isArchived: z.ZodOptional<z.ZodBoolean>;
    title: z.ZodDefault<z.ZodUnion<[z.ZodNullable<z.ZodString>, z.ZodLiteral<"New Chat">]>>;
    user: z.ZodOptional<z.ZodString>;
    messages: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
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
            authField: string;
            label: string;
        }, {
            description: string;
            authField: string;
            label: string;
        }>, "many">>;
        authenticated: z.ZodOptional<z.ZodBoolean>;
        chatMenu: z.ZodOptional<z.ZodBoolean>;
        isButton: z.ZodOptional<z.ZodBoolean>;
        toolkit: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        pluginKey: string;
        description?: string | undefined;
        icon?: string | undefined;
        authConfig?: {
            description: string;
            authField: string;
            label: string;
        }[] | undefined;
        authenticated?: boolean | undefined;
        chatMenu?: boolean | undefined;
        isButton?: boolean | undefined;
        toolkit?: boolean | undefined;
    }, {
        name: string;
        pluginKey: string;
        description?: string | undefined;
        icon?: string | undefined;
        authConfig?: {
            description: string;
            authField: string;
            label: string;
        }[] | undefined;
        authenticated?: boolean | undefined;
        chatMenu?: boolean | undefined;
        isButton?: boolean | undefined;
        toolkit?: boolean | undefined;
    }>, "many">, z.ZodArray<z.ZodString, "many">]>>;
    modelLabel: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    userLabel: z.ZodOptional<z.ZodString>;
    model: z.ZodOptional<z.ZodNullable<z.ZodString>>;
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
    tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
    resendFiles: z.ZodOptional<z.ZodBoolean>;
    file_ids: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    imageDetail: z.ZodOptional<z.ZodNativeEnum<typeof ImageDetail>>;
    reasoning_effort: z.ZodNullable<z.ZodOptional<z.ZodNativeEnum<typeof ReasoningEffort>>>;
    reasoning_summary: z.ZodNullable<z.ZodOptional<z.ZodNativeEnum<typeof ReasoningSummary>>>;
    verbosity: z.ZodNullable<z.ZodOptional<z.ZodNativeEnum<typeof Verbosity>>>;
    useResponsesApi: z.ZodOptional<z.ZodBoolean>;
    web_search: z.ZodOptional<z.ZodBoolean>;
    disableStreaming: z.ZodOptional<z.ZodBoolean>;
    assistant_id: z.ZodOptional<z.ZodString>;
    agent_id: z.ZodOptional<z.ZodString>;
    region: z.ZodOptional<z.ZodString>;
    maxTokens: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodNumber, z.ZodString]>, number | undefined, string | number>>;
    additionalModelRequestFields: z.ZodOptional<z.ZodType<DocumentTypeValue, z.ZodTypeDef, DocumentTypeValue>>;
    instructions: z.ZodOptional<z.ZodString>;
    additional_instructions: z.ZodOptional<z.ZodString>;
    append_current_datetime: z.ZodOptional<z.ZodBoolean>;
    /** Used to overwrite active conversation settings when saving a Preset */
    presetOverride: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    stop: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    greeting: z.ZodOptional<z.ZodString>;
    spec: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    iconURL: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    expiredAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    fileTokenLimit: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodNumber, z.ZodString]>, number | undefined, string | number>>;
    /** @deprecated */
    resendImages: z.ZodOptional<z.ZodBoolean>;
    /** @deprecated */
    agentOptions: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        agent: z.ZodDefault<z.ZodString>;
        skipCompletion: z.ZodDefault<z.ZodBoolean>;
        model: z.ZodString;
        temperature: z.ZodDefault<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        agent: string;
        skipCompletion: boolean;
        model: string;
        temperature: number;
    }, {
        model: string;
        agent?: string | undefined;
        skipCompletion?: boolean | undefined;
        temperature?: number | undefined;
    }>>>;
    /** @deprecated Prefer `modelLabel` over `chatGptLabel` */
    chatGptLabel: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, "model" | "temperature" | "iconURL" | "modelLabel" | "promptPrefix" | "top_p" | "frequency_penalty" | "presence_penalty" | "maxContextTokens" | "resendFiles" | "imageDetail" | "agent_id" | "instructions" | "greeting">, "strip", z.ZodTypeAny, {
    model?: string | null | undefined;
    temperature?: number | null | undefined;
    iconURL?: string | null | undefined;
    modelLabel?: string | null | undefined;
    promptPrefix?: string | null | undefined;
    top_p?: number | undefined;
    frequency_penalty?: number | undefined;
    presence_penalty?: number | undefined;
    maxContextTokens?: number | undefined;
    resendFiles?: boolean | undefined;
    imageDetail?: ImageDetail | undefined;
    agent_id?: string | undefined;
    instructions?: string | undefined;
    greeting?: string | undefined;
}, {
    model?: string | null | undefined;
    temperature?: number | null | undefined;
    iconURL?: string | null | undefined;
    modelLabel?: string | null | undefined;
    promptPrefix?: string | null | undefined;
    top_p?: number | undefined;
    frequency_penalty?: number | undefined;
    presence_penalty?: number | undefined;
    maxContextTokens?: string | number | undefined;
    resendFiles?: boolean | undefined;
    imageDetail?: ImageDetail | undefined;
    agent_id?: string | undefined;
    instructions?: string | undefined;
    greeting?: string | undefined;
}>;
export declare const agentsSchema: z.ZodCatch<z.ZodEffects<z.ZodObject<Pick<{
    conversationId: z.ZodNullable<z.ZodString>;
    endpoint: z.ZodNullable<z.ZodNativeEnum<typeof EModelEndpoint>>;
    endpointType: z.ZodOptional<z.ZodNullable<z.ZodNativeEnum<typeof EModelEndpoint>>>;
    isArchived: z.ZodOptional<z.ZodBoolean>;
    title: z.ZodDefault<z.ZodUnion<[z.ZodNullable<z.ZodString>, z.ZodLiteral<"New Chat">]>>;
    user: z.ZodOptional<z.ZodString>;
    messages: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
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
            authField: string;
            label: string;
        }, {
            description: string;
            authField: string;
            label: string;
        }>, "many">>;
        authenticated: z.ZodOptional<z.ZodBoolean>;
        chatMenu: z.ZodOptional<z.ZodBoolean>;
        isButton: z.ZodOptional<z.ZodBoolean>;
        toolkit: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        pluginKey: string;
        description?: string | undefined;
        icon?: string | undefined;
        authConfig?: {
            description: string;
            authField: string;
            label: string;
        }[] | undefined;
        authenticated?: boolean | undefined;
        chatMenu?: boolean | undefined;
        isButton?: boolean | undefined;
        toolkit?: boolean | undefined;
    }, {
        name: string;
        pluginKey: string;
        description?: string | undefined;
        icon?: string | undefined;
        authConfig?: {
            description: string;
            authField: string;
            label: string;
        }[] | undefined;
        authenticated?: boolean | undefined;
        chatMenu?: boolean | undefined;
        isButton?: boolean | undefined;
        toolkit?: boolean | undefined;
    }>, "many">, z.ZodArray<z.ZodString, "many">]>>;
    modelLabel: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    userLabel: z.ZodOptional<z.ZodString>;
    model: z.ZodOptional<z.ZodNullable<z.ZodString>>;
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
    tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
    resendFiles: z.ZodOptional<z.ZodBoolean>;
    file_ids: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    imageDetail: z.ZodOptional<z.ZodNativeEnum<typeof ImageDetail>>;
    reasoning_effort: z.ZodNullable<z.ZodOptional<z.ZodNativeEnum<typeof ReasoningEffort>>>;
    reasoning_summary: z.ZodNullable<z.ZodOptional<z.ZodNativeEnum<typeof ReasoningSummary>>>;
    verbosity: z.ZodNullable<z.ZodOptional<z.ZodNativeEnum<typeof Verbosity>>>;
    useResponsesApi: z.ZodOptional<z.ZodBoolean>;
    web_search: z.ZodOptional<z.ZodBoolean>;
    disableStreaming: z.ZodOptional<z.ZodBoolean>;
    assistant_id: z.ZodOptional<z.ZodString>;
    agent_id: z.ZodOptional<z.ZodString>;
    region: z.ZodOptional<z.ZodString>;
    maxTokens: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodNumber, z.ZodString]>, number | undefined, string | number>>;
    additionalModelRequestFields: z.ZodOptional<z.ZodType<DocumentTypeValue, z.ZodTypeDef, DocumentTypeValue>>;
    instructions: z.ZodOptional<z.ZodString>;
    additional_instructions: z.ZodOptional<z.ZodString>;
    append_current_datetime: z.ZodOptional<z.ZodBoolean>;
    /** Used to overwrite active conversation settings when saving a Preset */
    presetOverride: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    stop: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    greeting: z.ZodOptional<z.ZodString>;
    spec: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    iconURL: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    expiredAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    fileTokenLimit: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodNumber, z.ZodString]>, number | undefined, string | number>>;
    /** @deprecated */
    resendImages: z.ZodOptional<z.ZodBoolean>;
    /** @deprecated */
    agentOptions: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        agent: z.ZodDefault<z.ZodString>;
        skipCompletion: z.ZodDefault<z.ZodBoolean>;
        model: z.ZodString;
        temperature: z.ZodDefault<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        agent: string;
        skipCompletion: boolean;
        model: string;
        temperature: number;
    }, {
        model: string;
        agent?: string | undefined;
        skipCompletion?: boolean | undefined;
        temperature?: number | undefined;
    }>>>;
    /** @deprecated Prefer `modelLabel` over `chatGptLabel` */
    chatGptLabel: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, "model" | "temperature" | "iconURL" | "modelLabel" | "promptPrefix" | "top_p" | "frequency_penalty" | "presence_penalty" | "maxContextTokens" | "resendFiles" | "imageDetail" | "agent_id" | "instructions" | "greeting">, "strip", z.ZodTypeAny, {
    model?: string | null | undefined;
    temperature?: number | null | undefined;
    iconURL?: string | null | undefined;
    modelLabel?: string | null | undefined;
    promptPrefix?: string | null | undefined;
    top_p?: number | undefined;
    frequency_penalty?: number | undefined;
    presence_penalty?: number | undefined;
    maxContextTokens?: number | undefined;
    resendFiles?: boolean | undefined;
    imageDetail?: ImageDetail | undefined;
    agent_id?: string | undefined;
    instructions?: string | undefined;
    greeting?: string | undefined;
}, {
    model?: string | null | undefined;
    temperature?: number | null | undefined;
    iconURL?: string | null | undefined;
    modelLabel?: string | null | undefined;
    promptPrefix?: string | null | undefined;
    top_p?: number | undefined;
    frequency_penalty?: number | undefined;
    presence_penalty?: number | undefined;
    maxContextTokens?: string | number | undefined;
    resendFiles?: boolean | undefined;
    imageDetail?: ImageDetail | undefined;
    agent_id?: string | undefined;
    instructions?: string | undefined;
    greeting?: string | undefined;
}>, {
    model: string;
    modelLabel: string | null;
    temperature: number;
    top_p: number;
    presence_penalty: number;
    frequency_penalty: number;
    resendFiles: boolean;
    imageDetail: ImageDetail;
    agent_id: string | undefined;
    instructions: string | undefined;
    promptPrefix: string | null;
    iconURL: string | undefined;
    greeting: string | undefined;
    maxContextTokens: number | undefined;
}, {
    model?: string | null | undefined;
    temperature?: number | null | undefined;
    iconURL?: string | null | undefined;
    modelLabel?: string | null | undefined;
    promptPrefix?: string | null | undefined;
    top_p?: number | undefined;
    frequency_penalty?: number | undefined;
    presence_penalty?: number | undefined;
    maxContextTokens?: string | number | undefined;
    resendFiles?: boolean | undefined;
    imageDetail?: ImageDetail | undefined;
    agent_id?: string | undefined;
    instructions?: string | undefined;
    greeting?: string | undefined;
}>>;
export declare const openAIBaseSchema: z.ZodObject<Pick<{
    conversationId: z.ZodNullable<z.ZodString>;
    endpoint: z.ZodNullable<z.ZodNativeEnum<typeof EModelEndpoint>>;
    endpointType: z.ZodOptional<z.ZodNullable<z.ZodNativeEnum<typeof EModelEndpoint>>>;
    isArchived: z.ZodOptional<z.ZodBoolean>;
    title: z.ZodDefault<z.ZodUnion<[z.ZodNullable<z.ZodString>, z.ZodLiteral<"New Chat">]>>;
    user: z.ZodOptional<z.ZodString>;
    messages: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
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
            authField: string;
            label: string;
        }, {
            description: string;
            authField: string;
            label: string;
        }>, "many">>;
        authenticated: z.ZodOptional<z.ZodBoolean>;
        chatMenu: z.ZodOptional<z.ZodBoolean>;
        isButton: z.ZodOptional<z.ZodBoolean>;
        toolkit: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        pluginKey: string;
        description?: string | undefined;
        icon?: string | undefined;
        authConfig?: {
            description: string;
            authField: string;
            label: string;
        }[] | undefined;
        authenticated?: boolean | undefined;
        chatMenu?: boolean | undefined;
        isButton?: boolean | undefined;
        toolkit?: boolean | undefined;
    }, {
        name: string;
        pluginKey: string;
        description?: string | undefined;
        icon?: string | undefined;
        authConfig?: {
            description: string;
            authField: string;
            label: string;
        }[] | undefined;
        authenticated?: boolean | undefined;
        chatMenu?: boolean | undefined;
        isButton?: boolean | undefined;
        toolkit?: boolean | undefined;
    }>, "many">, z.ZodArray<z.ZodString, "many">]>>;
    modelLabel: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    userLabel: z.ZodOptional<z.ZodString>;
    model: z.ZodOptional<z.ZodNullable<z.ZodString>>;
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
    tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
    resendFiles: z.ZodOptional<z.ZodBoolean>;
    file_ids: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    imageDetail: z.ZodOptional<z.ZodNativeEnum<typeof ImageDetail>>;
    reasoning_effort: z.ZodNullable<z.ZodOptional<z.ZodNativeEnum<typeof ReasoningEffort>>>;
    reasoning_summary: z.ZodNullable<z.ZodOptional<z.ZodNativeEnum<typeof ReasoningSummary>>>;
    verbosity: z.ZodNullable<z.ZodOptional<z.ZodNativeEnum<typeof Verbosity>>>;
    useResponsesApi: z.ZodOptional<z.ZodBoolean>;
    web_search: z.ZodOptional<z.ZodBoolean>;
    disableStreaming: z.ZodOptional<z.ZodBoolean>;
    assistant_id: z.ZodOptional<z.ZodString>;
    agent_id: z.ZodOptional<z.ZodString>;
    region: z.ZodOptional<z.ZodString>;
    maxTokens: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodNumber, z.ZodString]>, number | undefined, string | number>>;
    additionalModelRequestFields: z.ZodOptional<z.ZodType<DocumentTypeValue, z.ZodTypeDef, DocumentTypeValue>>;
    instructions: z.ZodOptional<z.ZodString>;
    additional_instructions: z.ZodOptional<z.ZodString>;
    append_current_datetime: z.ZodOptional<z.ZodBoolean>;
    /** Used to overwrite active conversation settings when saving a Preset */
    presetOverride: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    stop: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    greeting: z.ZodOptional<z.ZodString>;
    spec: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    iconURL: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    expiredAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    fileTokenLimit: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodNumber, z.ZodString]>, number | undefined, string | number>>;
    /** @deprecated */
    resendImages: z.ZodOptional<z.ZodBoolean>;
    /** @deprecated */
    agentOptions: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        agent: z.ZodDefault<z.ZodString>;
        skipCompletion: z.ZodDefault<z.ZodBoolean>;
        model: z.ZodString;
        temperature: z.ZodDefault<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        agent: string;
        skipCompletion: boolean;
        model: string;
        temperature: number;
    }, {
        model: string;
        agent?: string | undefined;
        skipCompletion?: boolean | undefined;
        temperature?: number | undefined;
    }>>>;
    /** @deprecated Prefer `modelLabel` over `chatGptLabel` */
    chatGptLabel: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, "model" | "temperature" | "iconURL" | "modelLabel" | "promptPrefix" | "top_p" | "frequency_penalty" | "presence_penalty" | "maxContextTokens" | "max_tokens" | "artifacts" | "resendFiles" | "imageDetail" | "reasoning_effort" | "reasoning_summary" | "verbosity" | "useResponsesApi" | "web_search" | "disableStreaming" | "stop" | "greeting" | "spec" | "fileTokenLimit" | "chatGptLabel">, "strip", z.ZodTypeAny, {
    model?: string | null | undefined;
    temperature?: number | null | undefined;
    iconURL?: string | null | undefined;
    modelLabel?: string | null | undefined;
    promptPrefix?: string | null | undefined;
    top_p?: number | undefined;
    frequency_penalty?: number | undefined;
    presence_penalty?: number | undefined;
    maxContextTokens?: number | undefined;
    max_tokens?: number | undefined;
    artifacts?: string | undefined;
    resendFiles?: boolean | undefined;
    imageDetail?: ImageDetail | undefined;
    reasoning_effort?: ReasoningEffort | null | undefined;
    reasoning_summary?: ReasoningSummary | null | undefined;
    verbosity?: Verbosity | null | undefined;
    useResponsesApi?: boolean | undefined;
    web_search?: boolean | undefined;
    disableStreaming?: boolean | undefined;
    stop?: string[] | undefined;
    greeting?: string | undefined;
    spec?: string | null | undefined;
    fileTokenLimit?: number | undefined;
    chatGptLabel?: string | null | undefined;
}, {
    model?: string | null | undefined;
    temperature?: number | null | undefined;
    iconURL?: string | null | undefined;
    modelLabel?: string | null | undefined;
    promptPrefix?: string | null | undefined;
    top_p?: number | undefined;
    frequency_penalty?: number | undefined;
    presence_penalty?: number | undefined;
    maxContextTokens?: string | number | undefined;
    max_tokens?: string | number | undefined;
    artifacts?: string | undefined;
    resendFiles?: boolean | undefined;
    imageDetail?: ImageDetail | undefined;
    reasoning_effort?: ReasoningEffort | null | undefined;
    reasoning_summary?: ReasoningSummary | null | undefined;
    verbosity?: Verbosity | null | undefined;
    useResponsesApi?: boolean | undefined;
    web_search?: boolean | undefined;
    disableStreaming?: boolean | undefined;
    stop?: string[] | undefined;
    greeting?: string | undefined;
    spec?: string | null | undefined;
    fileTokenLimit?: string | number | undefined;
    chatGptLabel?: string | null | undefined;
}>;
export declare const openAISchema: z.ZodCatch<z.ZodEffects<z.ZodObject<Pick<{
    conversationId: z.ZodNullable<z.ZodString>;
    endpoint: z.ZodNullable<z.ZodNativeEnum<typeof EModelEndpoint>>;
    endpointType: z.ZodOptional<z.ZodNullable<z.ZodNativeEnum<typeof EModelEndpoint>>>;
    isArchived: z.ZodOptional<z.ZodBoolean>;
    title: z.ZodDefault<z.ZodUnion<[z.ZodNullable<z.ZodString>, z.ZodLiteral<"New Chat">]>>;
    user: z.ZodOptional<z.ZodString>;
    messages: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
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
            authField: string;
            label: string;
        }, {
            description: string;
            authField: string;
            label: string;
        }>, "many">>;
        authenticated: z.ZodOptional<z.ZodBoolean>;
        chatMenu: z.ZodOptional<z.ZodBoolean>;
        isButton: z.ZodOptional<z.ZodBoolean>;
        toolkit: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        pluginKey: string;
        description?: string | undefined;
        icon?: string | undefined;
        authConfig?: {
            description: string;
            authField: string;
            label: string;
        }[] | undefined;
        authenticated?: boolean | undefined;
        chatMenu?: boolean | undefined;
        isButton?: boolean | undefined;
        toolkit?: boolean | undefined;
    }, {
        name: string;
        pluginKey: string;
        description?: string | undefined;
        icon?: string | undefined;
        authConfig?: {
            description: string;
            authField: string;
            label: string;
        }[] | undefined;
        authenticated?: boolean | undefined;
        chatMenu?: boolean | undefined;
        isButton?: boolean | undefined;
        toolkit?: boolean | undefined;
    }>, "many">, z.ZodArray<z.ZodString, "many">]>>;
    modelLabel: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    userLabel: z.ZodOptional<z.ZodString>;
    model: z.ZodOptional<z.ZodNullable<z.ZodString>>;
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
    tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
    resendFiles: z.ZodOptional<z.ZodBoolean>;
    file_ids: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    imageDetail: z.ZodOptional<z.ZodNativeEnum<typeof ImageDetail>>;
    reasoning_effort: z.ZodNullable<z.ZodOptional<z.ZodNativeEnum<typeof ReasoningEffort>>>;
    reasoning_summary: z.ZodNullable<z.ZodOptional<z.ZodNativeEnum<typeof ReasoningSummary>>>;
    verbosity: z.ZodNullable<z.ZodOptional<z.ZodNativeEnum<typeof Verbosity>>>;
    useResponsesApi: z.ZodOptional<z.ZodBoolean>;
    web_search: z.ZodOptional<z.ZodBoolean>;
    disableStreaming: z.ZodOptional<z.ZodBoolean>;
    assistant_id: z.ZodOptional<z.ZodString>;
    agent_id: z.ZodOptional<z.ZodString>;
    region: z.ZodOptional<z.ZodString>;
    maxTokens: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodNumber, z.ZodString]>, number | undefined, string | number>>;
    additionalModelRequestFields: z.ZodOptional<z.ZodType<DocumentTypeValue, z.ZodTypeDef, DocumentTypeValue>>;
    instructions: z.ZodOptional<z.ZodString>;
    additional_instructions: z.ZodOptional<z.ZodString>;
    append_current_datetime: z.ZodOptional<z.ZodBoolean>;
    /** Used to overwrite active conversation settings when saving a Preset */
    presetOverride: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    stop: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    greeting: z.ZodOptional<z.ZodString>;
    spec: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    iconURL: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    expiredAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    fileTokenLimit: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodNumber, z.ZodString]>, number | undefined, string | number>>;
    /** @deprecated */
    resendImages: z.ZodOptional<z.ZodBoolean>;
    /** @deprecated */
    agentOptions: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        agent: z.ZodDefault<z.ZodString>;
        skipCompletion: z.ZodDefault<z.ZodBoolean>;
        model: z.ZodString;
        temperature: z.ZodDefault<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        agent: string;
        skipCompletion: boolean;
        model: string;
        temperature: number;
    }, {
        model: string;
        agent?: string | undefined;
        skipCompletion?: boolean | undefined;
        temperature?: number | undefined;
    }>>>;
    /** @deprecated Prefer `modelLabel` over `chatGptLabel` */
    chatGptLabel: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, "model" | "temperature" | "iconURL" | "modelLabel" | "promptPrefix" | "top_p" | "frequency_penalty" | "presence_penalty" | "maxContextTokens" | "max_tokens" | "artifacts" | "resendFiles" | "imageDetail" | "reasoning_effort" | "reasoning_summary" | "verbosity" | "useResponsesApi" | "web_search" | "disableStreaming" | "stop" | "greeting" | "spec" | "fileTokenLimit" | "chatGptLabel">, "strip", z.ZodTypeAny, {
    model?: string | null | undefined;
    temperature?: number | null | undefined;
    iconURL?: string | null | undefined;
    modelLabel?: string | null | undefined;
    promptPrefix?: string | null | undefined;
    top_p?: number | undefined;
    frequency_penalty?: number | undefined;
    presence_penalty?: number | undefined;
    maxContextTokens?: number | undefined;
    max_tokens?: number | undefined;
    artifacts?: string | undefined;
    resendFiles?: boolean | undefined;
    imageDetail?: ImageDetail | undefined;
    reasoning_effort?: ReasoningEffort | null | undefined;
    reasoning_summary?: ReasoningSummary | null | undefined;
    verbosity?: Verbosity | null | undefined;
    useResponsesApi?: boolean | undefined;
    web_search?: boolean | undefined;
    disableStreaming?: boolean | undefined;
    stop?: string[] | undefined;
    greeting?: string | undefined;
    spec?: string | null | undefined;
    fileTokenLimit?: number | undefined;
    chatGptLabel?: string | null | undefined;
}, {
    model?: string | null | undefined;
    temperature?: number | null | undefined;
    iconURL?: string | null | undefined;
    modelLabel?: string | null | undefined;
    promptPrefix?: string | null | undefined;
    top_p?: number | undefined;
    frequency_penalty?: number | undefined;
    presence_penalty?: number | undefined;
    maxContextTokens?: string | number | undefined;
    max_tokens?: string | number | undefined;
    artifacts?: string | undefined;
    resendFiles?: boolean | undefined;
    imageDetail?: ImageDetail | undefined;
    reasoning_effort?: ReasoningEffort | null | undefined;
    reasoning_summary?: ReasoningSummary | null | undefined;
    verbosity?: Verbosity | null | undefined;
    useResponsesApi?: boolean | undefined;
    web_search?: boolean | undefined;
    disableStreaming?: boolean | undefined;
    stop?: string[] | undefined;
    greeting?: string | undefined;
    spec?: string | null | undefined;
    fileTokenLimit?: string | number | undefined;
    chatGptLabel?: string | null | undefined;
}>, Partial<Partial<TConversation>>, {
    model?: string | null | undefined;
    temperature?: number | null | undefined;
    iconURL?: string | null | undefined;
    modelLabel?: string | null | undefined;
    promptPrefix?: string | null | undefined;
    top_p?: number | undefined;
    frequency_penalty?: number | undefined;
    presence_penalty?: number | undefined;
    maxContextTokens?: string | number | undefined;
    max_tokens?: string | number | undefined;
    artifacts?: string | undefined;
    resendFiles?: boolean | undefined;
    imageDetail?: ImageDetail | undefined;
    reasoning_effort?: ReasoningEffort | null | undefined;
    reasoning_summary?: ReasoningSummary | null | undefined;
    verbosity?: Verbosity | null | undefined;
    useResponsesApi?: boolean | undefined;
    web_search?: boolean | undefined;
    disableStreaming?: boolean | undefined;
    stop?: string[] | undefined;
    greeting?: string | undefined;
    spec?: string | null | undefined;
    fileTokenLimit?: string | number | undefined;
    chatGptLabel?: string | null | undefined;
}>>;
export declare const compactGoogleSchema: z.ZodCatch<z.ZodEffects<z.ZodObject<Pick<{
    conversationId: z.ZodNullable<z.ZodString>;
    endpoint: z.ZodNullable<z.ZodNativeEnum<typeof EModelEndpoint>>;
    endpointType: z.ZodOptional<z.ZodNullable<z.ZodNativeEnum<typeof EModelEndpoint>>>;
    isArchived: z.ZodOptional<z.ZodBoolean>;
    title: z.ZodDefault<z.ZodUnion<[z.ZodNullable<z.ZodString>, z.ZodLiteral<"New Chat">]>>;
    user: z.ZodOptional<z.ZodString>;
    messages: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
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
            authField: string;
            label: string;
        }, {
            description: string;
            authField: string;
            label: string;
        }>, "many">>;
        authenticated: z.ZodOptional<z.ZodBoolean>;
        chatMenu: z.ZodOptional<z.ZodBoolean>;
        isButton: z.ZodOptional<z.ZodBoolean>;
        toolkit: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        pluginKey: string;
        description?: string | undefined;
        icon?: string | undefined;
        authConfig?: {
            description: string;
            authField: string;
            label: string;
        }[] | undefined;
        authenticated?: boolean | undefined;
        chatMenu?: boolean | undefined;
        isButton?: boolean | undefined;
        toolkit?: boolean | undefined;
    }, {
        name: string;
        pluginKey: string;
        description?: string | undefined;
        icon?: string | undefined;
        authConfig?: {
            description: string;
            authField: string;
            label: string;
        }[] | undefined;
        authenticated?: boolean | undefined;
        chatMenu?: boolean | undefined;
        isButton?: boolean | undefined;
        toolkit?: boolean | undefined;
    }>, "many">, z.ZodArray<z.ZodString, "many">]>>;
    modelLabel: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    userLabel: z.ZodOptional<z.ZodString>;
    model: z.ZodOptional<z.ZodNullable<z.ZodString>>;
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
    tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
    resendFiles: z.ZodOptional<z.ZodBoolean>;
    file_ids: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    imageDetail: z.ZodOptional<z.ZodNativeEnum<typeof ImageDetail>>;
    reasoning_effort: z.ZodNullable<z.ZodOptional<z.ZodNativeEnum<typeof ReasoningEffort>>>;
    reasoning_summary: z.ZodNullable<z.ZodOptional<z.ZodNativeEnum<typeof ReasoningSummary>>>;
    verbosity: z.ZodNullable<z.ZodOptional<z.ZodNativeEnum<typeof Verbosity>>>;
    useResponsesApi: z.ZodOptional<z.ZodBoolean>;
    web_search: z.ZodOptional<z.ZodBoolean>;
    disableStreaming: z.ZodOptional<z.ZodBoolean>;
    assistant_id: z.ZodOptional<z.ZodString>;
    agent_id: z.ZodOptional<z.ZodString>;
    region: z.ZodOptional<z.ZodString>;
    maxTokens: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodNumber, z.ZodString]>, number | undefined, string | number>>;
    additionalModelRequestFields: z.ZodOptional<z.ZodType<DocumentTypeValue, z.ZodTypeDef, DocumentTypeValue>>;
    instructions: z.ZodOptional<z.ZodString>;
    additional_instructions: z.ZodOptional<z.ZodString>;
    append_current_datetime: z.ZodOptional<z.ZodBoolean>;
    /** Used to overwrite active conversation settings when saving a Preset */
    presetOverride: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    stop: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    greeting: z.ZodOptional<z.ZodString>;
    spec: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    iconURL: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    expiredAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    fileTokenLimit: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodNumber, z.ZodString]>, number | undefined, string | number>>;
    /** @deprecated */
    resendImages: z.ZodOptional<z.ZodBoolean>;
    /** @deprecated */
    agentOptions: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        agent: z.ZodDefault<z.ZodString>;
        skipCompletion: z.ZodDefault<z.ZodBoolean>;
        model: z.ZodString;
        temperature: z.ZodDefault<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        agent: string;
        skipCompletion: boolean;
        model: string;
        temperature: number;
    }, {
        model: string;
        agent?: string | undefined;
        skipCompletion?: boolean | undefined;
        temperature?: number | undefined;
    }>>>;
    /** @deprecated Prefer `modelLabel` over `chatGptLabel` */
    chatGptLabel: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, "model" | "temperature" | "iconURL" | "modelLabel" | "promptPrefix" | "topP" | "topK" | "maxOutputTokens" | "maxContextTokens" | "thinking" | "thinkingBudget" | "artifacts" | "examples" | "web_search" | "greeting" | "spec" | "fileTokenLimit">, "strip", z.ZodTypeAny, {
    model?: string | null | undefined;
    temperature?: number | null | undefined;
    iconURL?: string | null | undefined;
    modelLabel?: string | null | undefined;
    promptPrefix?: string | null | undefined;
    topP?: number | undefined;
    topK?: number | undefined;
    maxOutputTokens?: number | null | undefined;
    maxContextTokens?: number | undefined;
    thinking?: boolean | undefined;
    thinkingBudget?: number | undefined;
    artifacts?: string | undefined;
    examples?: {
        input: {
            content: string;
        };
        output: {
            content: string;
        };
    }[] | undefined;
    web_search?: boolean | undefined;
    greeting?: string | undefined;
    spec?: string | null | undefined;
    fileTokenLimit?: number | undefined;
}, {
    model?: string | null | undefined;
    temperature?: number | null | undefined;
    iconURL?: string | null | undefined;
    modelLabel?: string | null | undefined;
    promptPrefix?: string | null | undefined;
    topP?: number | undefined;
    topK?: number | undefined;
    maxOutputTokens?: string | number | null | undefined;
    maxContextTokens?: string | number | undefined;
    thinking?: boolean | undefined;
    thinkingBudget?: string | number | undefined;
    artifacts?: string | undefined;
    examples?: {
        input: {
            content: string;
        };
        output: {
            content: string;
        };
    }[] | undefined;
    web_search?: boolean | undefined;
    greeting?: string | undefined;
    spec?: string | null | undefined;
    fileTokenLimit?: string | number | undefined;
}>, Partial<Partial<TConversation>>, {
    model?: string | null | undefined;
    temperature?: number | null | undefined;
    iconURL?: string | null | undefined;
    modelLabel?: string | null | undefined;
    promptPrefix?: string | null | undefined;
    topP?: number | undefined;
    topK?: number | undefined;
    maxOutputTokens?: string | number | null | undefined;
    maxContextTokens?: string | number | undefined;
    thinking?: boolean | undefined;
    thinkingBudget?: string | number | undefined;
    artifacts?: string | undefined;
    examples?: {
        input: {
            content: string;
        };
        output: {
            content: string;
        };
    }[] | undefined;
    web_search?: boolean | undefined;
    greeting?: string | undefined;
    spec?: string | null | undefined;
    fileTokenLimit?: string | number | undefined;
}>>;
export declare const anthropicBaseSchema: z.ZodObject<Pick<{
    conversationId: z.ZodNullable<z.ZodString>;
    endpoint: z.ZodNullable<z.ZodNativeEnum<typeof EModelEndpoint>>;
    endpointType: z.ZodOptional<z.ZodNullable<z.ZodNativeEnum<typeof EModelEndpoint>>>;
    isArchived: z.ZodOptional<z.ZodBoolean>;
    title: z.ZodDefault<z.ZodUnion<[z.ZodNullable<z.ZodString>, z.ZodLiteral<"New Chat">]>>;
    user: z.ZodOptional<z.ZodString>;
    messages: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
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
            authField: string;
            label: string;
        }, {
            description: string;
            authField: string;
            label: string;
        }>, "many">>;
        authenticated: z.ZodOptional<z.ZodBoolean>;
        chatMenu: z.ZodOptional<z.ZodBoolean>;
        isButton: z.ZodOptional<z.ZodBoolean>;
        toolkit: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        pluginKey: string;
        description?: string | undefined;
        icon?: string | undefined;
        authConfig?: {
            description: string;
            authField: string;
            label: string;
        }[] | undefined;
        authenticated?: boolean | undefined;
        chatMenu?: boolean | undefined;
        isButton?: boolean | undefined;
        toolkit?: boolean | undefined;
    }, {
        name: string;
        pluginKey: string;
        description?: string | undefined;
        icon?: string | undefined;
        authConfig?: {
            description: string;
            authField: string;
            label: string;
        }[] | undefined;
        authenticated?: boolean | undefined;
        chatMenu?: boolean | undefined;
        isButton?: boolean | undefined;
        toolkit?: boolean | undefined;
    }>, "many">, z.ZodArray<z.ZodString, "many">]>>;
    modelLabel: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    userLabel: z.ZodOptional<z.ZodString>;
    model: z.ZodOptional<z.ZodNullable<z.ZodString>>;
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
    tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
    resendFiles: z.ZodOptional<z.ZodBoolean>;
    file_ids: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    imageDetail: z.ZodOptional<z.ZodNativeEnum<typeof ImageDetail>>;
    reasoning_effort: z.ZodNullable<z.ZodOptional<z.ZodNativeEnum<typeof ReasoningEffort>>>;
    reasoning_summary: z.ZodNullable<z.ZodOptional<z.ZodNativeEnum<typeof ReasoningSummary>>>;
    verbosity: z.ZodNullable<z.ZodOptional<z.ZodNativeEnum<typeof Verbosity>>>;
    useResponsesApi: z.ZodOptional<z.ZodBoolean>;
    web_search: z.ZodOptional<z.ZodBoolean>;
    disableStreaming: z.ZodOptional<z.ZodBoolean>;
    assistant_id: z.ZodOptional<z.ZodString>;
    agent_id: z.ZodOptional<z.ZodString>;
    region: z.ZodOptional<z.ZodString>;
    maxTokens: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodNumber, z.ZodString]>, number | undefined, string | number>>;
    additionalModelRequestFields: z.ZodOptional<z.ZodType<DocumentTypeValue, z.ZodTypeDef, DocumentTypeValue>>;
    instructions: z.ZodOptional<z.ZodString>;
    additional_instructions: z.ZodOptional<z.ZodString>;
    append_current_datetime: z.ZodOptional<z.ZodBoolean>;
    /** Used to overwrite active conversation settings when saving a Preset */
    presetOverride: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    stop: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    greeting: z.ZodOptional<z.ZodString>;
    spec: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    iconURL: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    expiredAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    fileTokenLimit: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodNumber, z.ZodString]>, number | undefined, string | number>>;
    /** @deprecated */
    resendImages: z.ZodOptional<z.ZodBoolean>;
    /** @deprecated */
    agentOptions: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        agent: z.ZodDefault<z.ZodString>;
        skipCompletion: z.ZodDefault<z.ZodBoolean>;
        model: z.ZodString;
        temperature: z.ZodDefault<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        agent: string;
        skipCompletion: boolean;
        model: string;
        temperature: number;
    }, {
        model: string;
        agent?: string | undefined;
        skipCompletion?: boolean | undefined;
        temperature?: number | undefined;
    }>>>;
    /** @deprecated Prefer `modelLabel` over `chatGptLabel` */
    chatGptLabel: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, "model" | "temperature" | "iconURL" | "modelLabel" | "promptPrefix" | "topP" | "topK" | "maxOutputTokens" | "maxContextTokens" | "promptCache" | "thinking" | "thinkingBudget" | "stream" | "artifacts" | "resendFiles" | "web_search" | "stop" | "greeting" | "spec" | "fileTokenLimit">, "strip", z.ZodTypeAny, {
    model?: string | null | undefined;
    temperature?: number | null | undefined;
    iconURL?: string | null | undefined;
    modelLabel?: string | null | undefined;
    promptPrefix?: string | null | undefined;
    topP?: number | undefined;
    topK?: number | undefined;
    maxOutputTokens?: number | null | undefined;
    maxContextTokens?: number | undefined;
    promptCache?: boolean | undefined;
    thinking?: boolean | undefined;
    thinkingBudget?: number | undefined;
    stream?: boolean | undefined;
    artifacts?: string | undefined;
    resendFiles?: boolean | undefined;
    web_search?: boolean | undefined;
    stop?: string[] | undefined;
    greeting?: string | undefined;
    spec?: string | null | undefined;
    fileTokenLimit?: number | undefined;
}, {
    model?: string | null | undefined;
    temperature?: number | null | undefined;
    iconURL?: string | null | undefined;
    modelLabel?: string | null | undefined;
    promptPrefix?: string | null | undefined;
    topP?: number | undefined;
    topK?: number | undefined;
    maxOutputTokens?: string | number | null | undefined;
    maxContextTokens?: string | number | undefined;
    promptCache?: boolean | undefined;
    thinking?: boolean | undefined;
    thinkingBudget?: string | number | undefined;
    stream?: boolean | undefined;
    artifacts?: string | undefined;
    resendFiles?: boolean | undefined;
    web_search?: boolean | undefined;
    stop?: string[] | undefined;
    greeting?: string | undefined;
    spec?: string | null | undefined;
    fileTokenLimit?: string | number | undefined;
}>;
export declare const anthropicSchema: z.ZodCatch<z.ZodEffects<z.ZodObject<Pick<{
    conversationId: z.ZodNullable<z.ZodString>;
    endpoint: z.ZodNullable<z.ZodNativeEnum<typeof EModelEndpoint>>;
    endpointType: z.ZodOptional<z.ZodNullable<z.ZodNativeEnum<typeof EModelEndpoint>>>;
    isArchived: z.ZodOptional<z.ZodBoolean>;
    title: z.ZodDefault<z.ZodUnion<[z.ZodNullable<z.ZodString>, z.ZodLiteral<"New Chat">]>>;
    user: z.ZodOptional<z.ZodString>;
    messages: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
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
            authField: string;
            label: string;
        }, {
            description: string;
            authField: string;
            label: string;
        }>, "many">>;
        authenticated: z.ZodOptional<z.ZodBoolean>;
        chatMenu: z.ZodOptional<z.ZodBoolean>;
        isButton: z.ZodOptional<z.ZodBoolean>;
        toolkit: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        pluginKey: string;
        description?: string | undefined;
        icon?: string | undefined;
        authConfig?: {
            description: string;
            authField: string;
            label: string;
        }[] | undefined;
        authenticated?: boolean | undefined;
        chatMenu?: boolean | undefined;
        isButton?: boolean | undefined;
        toolkit?: boolean | undefined;
    }, {
        name: string;
        pluginKey: string;
        description?: string | undefined;
        icon?: string | undefined;
        authConfig?: {
            description: string;
            authField: string;
            label: string;
        }[] | undefined;
        authenticated?: boolean | undefined;
        chatMenu?: boolean | undefined;
        isButton?: boolean | undefined;
        toolkit?: boolean | undefined;
    }>, "many">, z.ZodArray<z.ZodString, "many">]>>;
    modelLabel: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    userLabel: z.ZodOptional<z.ZodString>;
    model: z.ZodOptional<z.ZodNullable<z.ZodString>>;
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
    tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
    resendFiles: z.ZodOptional<z.ZodBoolean>;
    file_ids: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    imageDetail: z.ZodOptional<z.ZodNativeEnum<typeof ImageDetail>>;
    reasoning_effort: z.ZodNullable<z.ZodOptional<z.ZodNativeEnum<typeof ReasoningEffort>>>;
    reasoning_summary: z.ZodNullable<z.ZodOptional<z.ZodNativeEnum<typeof ReasoningSummary>>>;
    verbosity: z.ZodNullable<z.ZodOptional<z.ZodNativeEnum<typeof Verbosity>>>;
    useResponsesApi: z.ZodOptional<z.ZodBoolean>;
    web_search: z.ZodOptional<z.ZodBoolean>;
    disableStreaming: z.ZodOptional<z.ZodBoolean>;
    assistant_id: z.ZodOptional<z.ZodString>;
    agent_id: z.ZodOptional<z.ZodString>;
    region: z.ZodOptional<z.ZodString>;
    maxTokens: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodNumber, z.ZodString]>, number | undefined, string | number>>;
    additionalModelRequestFields: z.ZodOptional<z.ZodType<DocumentTypeValue, z.ZodTypeDef, DocumentTypeValue>>;
    instructions: z.ZodOptional<z.ZodString>;
    additional_instructions: z.ZodOptional<z.ZodString>;
    append_current_datetime: z.ZodOptional<z.ZodBoolean>;
    /** Used to overwrite active conversation settings when saving a Preset */
    presetOverride: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    stop: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    greeting: z.ZodOptional<z.ZodString>;
    spec: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    iconURL: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    expiredAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    fileTokenLimit: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodNumber, z.ZodString]>, number | undefined, string | number>>;
    /** @deprecated */
    resendImages: z.ZodOptional<z.ZodBoolean>;
    /** @deprecated */
    agentOptions: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        agent: z.ZodDefault<z.ZodString>;
        skipCompletion: z.ZodDefault<z.ZodBoolean>;
        model: z.ZodString;
        temperature: z.ZodDefault<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        agent: string;
        skipCompletion: boolean;
        model: string;
        temperature: number;
    }, {
        model: string;
        agent?: string | undefined;
        skipCompletion?: boolean | undefined;
        temperature?: number | undefined;
    }>>>;
    /** @deprecated Prefer `modelLabel` over `chatGptLabel` */
    chatGptLabel: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, "model" | "temperature" | "iconURL" | "modelLabel" | "promptPrefix" | "topP" | "topK" | "maxOutputTokens" | "maxContextTokens" | "promptCache" | "thinking" | "thinkingBudget" | "stream" | "artifacts" | "resendFiles" | "web_search" | "stop" | "greeting" | "spec" | "fileTokenLimit">, "strip", z.ZodTypeAny, {
    model?: string | null | undefined;
    temperature?: number | null | undefined;
    iconURL?: string | null | undefined;
    modelLabel?: string | null | undefined;
    promptPrefix?: string | null | undefined;
    topP?: number | undefined;
    topK?: number | undefined;
    maxOutputTokens?: number | null | undefined;
    maxContextTokens?: number | undefined;
    promptCache?: boolean | undefined;
    thinking?: boolean | undefined;
    thinkingBudget?: number | undefined;
    stream?: boolean | undefined;
    artifacts?: string | undefined;
    resendFiles?: boolean | undefined;
    web_search?: boolean | undefined;
    stop?: string[] | undefined;
    greeting?: string | undefined;
    spec?: string | null | undefined;
    fileTokenLimit?: number | undefined;
}, {
    model?: string | null | undefined;
    temperature?: number | null | undefined;
    iconURL?: string | null | undefined;
    modelLabel?: string | null | undefined;
    promptPrefix?: string | null | undefined;
    topP?: number | undefined;
    topK?: number | undefined;
    maxOutputTokens?: string | number | null | undefined;
    maxContextTokens?: string | number | undefined;
    promptCache?: boolean | undefined;
    thinking?: boolean | undefined;
    thinkingBudget?: string | number | undefined;
    stream?: boolean | undefined;
    artifacts?: string | undefined;
    resendFiles?: boolean | undefined;
    web_search?: boolean | undefined;
    stop?: string[] | undefined;
    greeting?: string | undefined;
    spec?: string | null | undefined;
    fileTokenLimit?: string | number | undefined;
}>, Partial<{
    model?: string | null | undefined;
    temperature?: number | null | undefined;
    iconURL?: string | null | undefined;
    modelLabel?: string | null | undefined;
    promptPrefix?: string | null | undefined;
    topP?: number | undefined;
    topK?: number | undefined;
    maxOutputTokens?: number | null | undefined;
    maxContextTokens?: number | undefined;
    promptCache?: boolean | undefined;
    thinking?: boolean | undefined;
    thinkingBudget?: number | undefined;
    stream?: boolean | undefined;
    artifacts?: string | undefined;
    resendFiles?: boolean | undefined;
    web_search?: boolean | undefined;
    stop?: string[] | undefined;
    greeting?: string | undefined;
    spec?: string | null | undefined;
    fileTokenLimit?: number | undefined;
}>, {
    model?: string | null | undefined;
    temperature?: number | null | undefined;
    iconURL?: string | null | undefined;
    modelLabel?: string | null | undefined;
    promptPrefix?: string | null | undefined;
    topP?: number | undefined;
    topK?: number | undefined;
    maxOutputTokens?: string | number | null | undefined;
    maxContextTokens?: string | number | undefined;
    promptCache?: boolean | undefined;
    thinking?: boolean | undefined;
    thinkingBudget?: string | number | undefined;
    stream?: boolean | undefined;
    artifacts?: string | undefined;
    resendFiles?: boolean | undefined;
    web_search?: boolean | undefined;
    stop?: string[] | undefined;
    greeting?: string | undefined;
    spec?: string | null | undefined;
    fileTokenLimit?: string | number | undefined;
}>>;
export declare const compactPluginsSchema: z.ZodCatch<z.ZodEffects<z.ZodObject<Pick<{
    conversationId: z.ZodNullable<z.ZodString>;
    endpoint: z.ZodNullable<z.ZodNativeEnum<typeof EModelEndpoint>>;
    endpointType: z.ZodOptional<z.ZodNullable<z.ZodNativeEnum<typeof EModelEndpoint>>>;
    isArchived: z.ZodOptional<z.ZodBoolean>;
    title: z.ZodDefault<z.ZodUnion<[z.ZodNullable<z.ZodString>, z.ZodLiteral<"New Chat">]>>;
    user: z.ZodOptional<z.ZodString>;
    messages: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
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
            authField: string;
            label: string;
        }, {
            description: string;
            authField: string;
            label: string;
        }>, "many">>;
        authenticated: z.ZodOptional<z.ZodBoolean>;
        chatMenu: z.ZodOptional<z.ZodBoolean>;
        isButton: z.ZodOptional<z.ZodBoolean>;
        toolkit: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        pluginKey: string;
        description?: string | undefined;
        icon?: string | undefined;
        authConfig?: {
            description: string;
            authField: string;
            label: string;
        }[] | undefined;
        authenticated?: boolean | undefined;
        chatMenu?: boolean | undefined;
        isButton?: boolean | undefined;
        toolkit?: boolean | undefined;
    }, {
        name: string;
        pluginKey: string;
        description?: string | undefined;
        icon?: string | undefined;
        authConfig?: {
            description: string;
            authField: string;
            label: string;
        }[] | undefined;
        authenticated?: boolean | undefined;
        chatMenu?: boolean | undefined;
        isButton?: boolean | undefined;
        toolkit?: boolean | undefined;
    }>, "many">, z.ZodArray<z.ZodString, "many">]>>;
    modelLabel: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    userLabel: z.ZodOptional<z.ZodString>;
    model: z.ZodOptional<z.ZodNullable<z.ZodString>>;
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
    tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
    resendFiles: z.ZodOptional<z.ZodBoolean>;
    file_ids: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    imageDetail: z.ZodOptional<z.ZodNativeEnum<typeof ImageDetail>>;
    reasoning_effort: z.ZodNullable<z.ZodOptional<z.ZodNativeEnum<typeof ReasoningEffort>>>;
    reasoning_summary: z.ZodNullable<z.ZodOptional<z.ZodNativeEnum<typeof ReasoningSummary>>>;
    verbosity: z.ZodNullable<z.ZodOptional<z.ZodNativeEnum<typeof Verbosity>>>;
    useResponsesApi: z.ZodOptional<z.ZodBoolean>;
    web_search: z.ZodOptional<z.ZodBoolean>;
    disableStreaming: z.ZodOptional<z.ZodBoolean>;
    assistant_id: z.ZodOptional<z.ZodString>;
    agent_id: z.ZodOptional<z.ZodString>;
    region: z.ZodOptional<z.ZodString>;
    maxTokens: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodNumber, z.ZodString]>, number | undefined, string | number>>;
    additionalModelRequestFields: z.ZodOptional<z.ZodType<DocumentTypeValue, z.ZodTypeDef, DocumentTypeValue>>;
    instructions: z.ZodOptional<z.ZodString>;
    additional_instructions: z.ZodOptional<z.ZodString>;
    append_current_datetime: z.ZodOptional<z.ZodBoolean>;
    /** Used to overwrite active conversation settings when saving a Preset */
    presetOverride: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    stop: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    greeting: z.ZodOptional<z.ZodString>;
    spec: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    iconURL: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    expiredAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    fileTokenLimit: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodNumber, z.ZodString]>, number | undefined, string | number>>;
    /** @deprecated */
    resendImages: z.ZodOptional<z.ZodBoolean>;
    /** @deprecated */
    agentOptions: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        agent: z.ZodDefault<z.ZodString>;
        skipCompletion: z.ZodDefault<z.ZodBoolean>;
        model: z.ZodString;
        temperature: z.ZodDefault<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        agent: string;
        skipCompletion: boolean;
        model: string;
        temperature: number;
    }, {
        model: string;
        agent?: string | undefined;
        skipCompletion?: boolean | undefined;
        temperature?: number | undefined;
    }>>>;
    /** @deprecated Prefer `modelLabel` over `chatGptLabel` */
    chatGptLabel: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, "model" | "temperature" | "iconURL" | "tools" | "modelLabel" | "promptPrefix" | "top_p" | "frequency_penalty" | "presence_penalty" | "maxContextTokens" | "artifacts" | "greeting" | "spec" | "agentOptions" | "chatGptLabel">, "strip", z.ZodTypeAny, {
    model?: string | null | undefined;
    temperature?: number | null | undefined;
    iconURL?: string | null | undefined;
    tools?: string[] | {
        name: string;
        pluginKey: string;
        description?: string | undefined;
        icon?: string | undefined;
        authConfig?: {
            description: string;
            authField: string;
            label: string;
        }[] | undefined;
        authenticated?: boolean | undefined;
        chatMenu?: boolean | undefined;
        isButton?: boolean | undefined;
        toolkit?: boolean | undefined;
    }[] | undefined;
    modelLabel?: string | null | undefined;
    promptPrefix?: string | null | undefined;
    top_p?: number | undefined;
    frequency_penalty?: number | undefined;
    presence_penalty?: number | undefined;
    maxContextTokens?: number | undefined;
    artifacts?: string | undefined;
    greeting?: string | undefined;
    spec?: string | null | undefined;
    agentOptions?: {
        agent: string;
        skipCompletion: boolean;
        model: string;
        temperature: number;
    } | null | undefined;
    chatGptLabel?: string | null | undefined;
}, {
    model?: string | null | undefined;
    temperature?: number | null | undefined;
    iconURL?: string | null | undefined;
    tools?: string[] | {
        name: string;
        pluginKey: string;
        description?: string | undefined;
        icon?: string | undefined;
        authConfig?: {
            description: string;
            authField: string;
            label: string;
        }[] | undefined;
        authenticated?: boolean | undefined;
        chatMenu?: boolean | undefined;
        isButton?: boolean | undefined;
        toolkit?: boolean | undefined;
    }[] | undefined;
    modelLabel?: string | null | undefined;
    promptPrefix?: string | null | undefined;
    top_p?: number | undefined;
    frequency_penalty?: number | undefined;
    presence_penalty?: number | undefined;
    maxContextTokens?: string | number | undefined;
    artifacts?: string | undefined;
    greeting?: string | undefined;
    spec?: string | null | undefined;
    agentOptions?: {
        model: string;
        agent?: string | undefined;
        skipCompletion?: boolean | undefined;
        temperature?: number | undefined;
    } | null | undefined;
    chatGptLabel?: string | null | undefined;
}>, Partial<Partial<TConversation>>, {
    model?: string | null | undefined;
    temperature?: number | null | undefined;
    iconURL?: string | null | undefined;
    tools?: string[] | {
        name: string;
        pluginKey: string;
        description?: string | undefined;
        icon?: string | undefined;
        authConfig?: {
            description: string;
            authField: string;
            label: string;
        }[] | undefined;
        authenticated?: boolean | undefined;
        chatMenu?: boolean | undefined;
        isButton?: boolean | undefined;
        toolkit?: boolean | undefined;
    }[] | undefined;
    modelLabel?: string | null | undefined;
    promptPrefix?: string | null | undefined;
    top_p?: number | undefined;
    frequency_penalty?: number | undefined;
    presence_penalty?: number | undefined;
    maxContextTokens?: string | number | undefined;
    artifacts?: string | undefined;
    greeting?: string | undefined;
    spec?: string | null | undefined;
    agentOptions?: {
        model: string;
        agent?: string | undefined;
        skipCompletion?: boolean | undefined;
        temperature?: number | undefined;
    } | null | undefined;
    chatGptLabel?: string | null | undefined;
}>>;
export declare const tBannerSchema: z.ZodObject<{
    bannerId: z.ZodString;
    message: z.ZodString;
    displayFrom: z.ZodString;
    displayTo: z.ZodString;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
    isPublic: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    message: string;
    createdAt: string;
    updatedAt: string;
    isPublic: boolean;
    bannerId: string;
    displayFrom: string;
    displayTo: string;
}, {
    message: string;
    createdAt: string;
    updatedAt: string;
    isPublic: boolean;
    bannerId: string;
    displayFrom: string;
    displayTo: string;
}>;
export type TBanner = z.infer<typeof tBannerSchema>;
export declare const compactAgentsBaseSchema: z.ZodObject<Pick<{
    conversationId: z.ZodNullable<z.ZodString>;
    endpoint: z.ZodNullable<z.ZodNativeEnum<typeof EModelEndpoint>>;
    endpointType: z.ZodOptional<z.ZodNullable<z.ZodNativeEnum<typeof EModelEndpoint>>>;
    isArchived: z.ZodOptional<z.ZodBoolean>;
    title: z.ZodDefault<z.ZodUnion<[z.ZodNullable<z.ZodString>, z.ZodLiteral<"New Chat">]>>;
    user: z.ZodOptional<z.ZodString>;
    messages: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
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
            authField: string;
            label: string;
        }, {
            description: string;
            authField: string;
            label: string;
        }>, "many">>;
        authenticated: z.ZodOptional<z.ZodBoolean>;
        chatMenu: z.ZodOptional<z.ZodBoolean>;
        isButton: z.ZodOptional<z.ZodBoolean>;
        toolkit: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        pluginKey: string;
        description?: string | undefined;
        icon?: string | undefined;
        authConfig?: {
            description: string;
            authField: string;
            label: string;
        }[] | undefined;
        authenticated?: boolean | undefined;
        chatMenu?: boolean | undefined;
        isButton?: boolean | undefined;
        toolkit?: boolean | undefined;
    }, {
        name: string;
        pluginKey: string;
        description?: string | undefined;
        icon?: string | undefined;
        authConfig?: {
            description: string;
            authField: string;
            label: string;
        }[] | undefined;
        authenticated?: boolean | undefined;
        chatMenu?: boolean | undefined;
        isButton?: boolean | undefined;
        toolkit?: boolean | undefined;
    }>, "many">, z.ZodArray<z.ZodString, "many">]>>;
    modelLabel: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    userLabel: z.ZodOptional<z.ZodString>;
    model: z.ZodOptional<z.ZodNullable<z.ZodString>>;
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
    tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
    resendFiles: z.ZodOptional<z.ZodBoolean>;
    file_ids: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    imageDetail: z.ZodOptional<z.ZodNativeEnum<typeof ImageDetail>>;
    reasoning_effort: z.ZodNullable<z.ZodOptional<z.ZodNativeEnum<typeof ReasoningEffort>>>;
    reasoning_summary: z.ZodNullable<z.ZodOptional<z.ZodNativeEnum<typeof ReasoningSummary>>>;
    verbosity: z.ZodNullable<z.ZodOptional<z.ZodNativeEnum<typeof Verbosity>>>;
    useResponsesApi: z.ZodOptional<z.ZodBoolean>;
    web_search: z.ZodOptional<z.ZodBoolean>;
    disableStreaming: z.ZodOptional<z.ZodBoolean>;
    assistant_id: z.ZodOptional<z.ZodString>;
    agent_id: z.ZodOptional<z.ZodString>;
    region: z.ZodOptional<z.ZodString>;
    maxTokens: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodNumber, z.ZodString]>, number | undefined, string | number>>;
    additionalModelRequestFields: z.ZodOptional<z.ZodType<DocumentTypeValue, z.ZodTypeDef, DocumentTypeValue>>;
    instructions: z.ZodOptional<z.ZodString>;
    additional_instructions: z.ZodOptional<z.ZodString>;
    append_current_datetime: z.ZodOptional<z.ZodBoolean>;
    /** Used to overwrite active conversation settings when saving a Preset */
    presetOverride: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    stop: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    greeting: z.ZodOptional<z.ZodString>;
    spec: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    iconURL: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    expiredAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    fileTokenLimit: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodNumber, z.ZodString]>, number | undefined, string | number>>;
    /** @deprecated */
    resendImages: z.ZodOptional<z.ZodBoolean>;
    /** @deprecated */
    agentOptions: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        agent: z.ZodDefault<z.ZodString>;
        skipCompletion: z.ZodDefault<z.ZodBoolean>;
        model: z.ZodString;
        temperature: z.ZodDefault<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        agent: string;
        skipCompletion: boolean;
        model: string;
        temperature: number;
    }, {
        model: string;
        agent?: string | undefined;
        skipCompletion?: boolean | undefined;
        temperature?: number | undefined;
    }>>>;
    /** @deprecated Prefer `modelLabel` over `chatGptLabel` */
    chatGptLabel: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, "iconURL" | "agent_id" | "instructions" | "additional_instructions" | "greeting" | "spec">, "strip", z.ZodTypeAny, {
    iconURL?: string | null | undefined;
    agent_id?: string | undefined;
    instructions?: string | undefined;
    additional_instructions?: string | undefined;
    greeting?: string | undefined;
    spec?: string | null | undefined;
}, {
    iconURL?: string | null | undefined;
    agent_id?: string | undefined;
    instructions?: string | undefined;
    additional_instructions?: string | undefined;
    greeting?: string | undefined;
    spec?: string | null | undefined;
}>;
export declare const compactAgentsSchema: z.ZodCatch<z.ZodEffects<z.ZodObject<Pick<{
    conversationId: z.ZodNullable<z.ZodString>;
    endpoint: z.ZodNullable<z.ZodNativeEnum<typeof EModelEndpoint>>;
    endpointType: z.ZodOptional<z.ZodNullable<z.ZodNativeEnum<typeof EModelEndpoint>>>;
    isArchived: z.ZodOptional<z.ZodBoolean>;
    title: z.ZodDefault<z.ZodUnion<[z.ZodNullable<z.ZodString>, z.ZodLiteral<"New Chat">]>>;
    user: z.ZodOptional<z.ZodString>;
    messages: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
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
            authField: string;
            label: string;
        }, {
            description: string;
            authField: string;
            label: string;
        }>, "many">>;
        authenticated: z.ZodOptional<z.ZodBoolean>;
        chatMenu: z.ZodOptional<z.ZodBoolean>;
        isButton: z.ZodOptional<z.ZodBoolean>;
        toolkit: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        pluginKey: string;
        description?: string | undefined;
        icon?: string | undefined;
        authConfig?: {
            description: string;
            authField: string;
            label: string;
        }[] | undefined;
        authenticated?: boolean | undefined;
        chatMenu?: boolean | undefined;
        isButton?: boolean | undefined;
        toolkit?: boolean | undefined;
    }, {
        name: string;
        pluginKey: string;
        description?: string | undefined;
        icon?: string | undefined;
        authConfig?: {
            description: string;
            authField: string;
            label: string;
        }[] | undefined;
        authenticated?: boolean | undefined;
        chatMenu?: boolean | undefined;
        isButton?: boolean | undefined;
        toolkit?: boolean | undefined;
    }>, "many">, z.ZodArray<z.ZodString, "many">]>>;
    modelLabel: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    userLabel: z.ZodOptional<z.ZodString>;
    model: z.ZodOptional<z.ZodNullable<z.ZodString>>;
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
    tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
    resendFiles: z.ZodOptional<z.ZodBoolean>;
    file_ids: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    imageDetail: z.ZodOptional<z.ZodNativeEnum<typeof ImageDetail>>;
    reasoning_effort: z.ZodNullable<z.ZodOptional<z.ZodNativeEnum<typeof ReasoningEffort>>>;
    reasoning_summary: z.ZodNullable<z.ZodOptional<z.ZodNativeEnum<typeof ReasoningSummary>>>;
    verbosity: z.ZodNullable<z.ZodOptional<z.ZodNativeEnum<typeof Verbosity>>>;
    useResponsesApi: z.ZodOptional<z.ZodBoolean>;
    web_search: z.ZodOptional<z.ZodBoolean>;
    disableStreaming: z.ZodOptional<z.ZodBoolean>;
    assistant_id: z.ZodOptional<z.ZodString>;
    agent_id: z.ZodOptional<z.ZodString>;
    region: z.ZodOptional<z.ZodString>;
    maxTokens: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodNumber, z.ZodString]>, number | undefined, string | number>>;
    additionalModelRequestFields: z.ZodOptional<z.ZodType<DocumentTypeValue, z.ZodTypeDef, DocumentTypeValue>>;
    instructions: z.ZodOptional<z.ZodString>;
    additional_instructions: z.ZodOptional<z.ZodString>;
    append_current_datetime: z.ZodOptional<z.ZodBoolean>;
    /** Used to overwrite active conversation settings when saving a Preset */
    presetOverride: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    stop: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    greeting: z.ZodOptional<z.ZodString>;
    spec: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    iconURL: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    expiredAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    fileTokenLimit: z.ZodOptional<z.ZodEffects<z.ZodUnion<[z.ZodNumber, z.ZodString]>, number | undefined, string | number>>;
    /** @deprecated */
    resendImages: z.ZodOptional<z.ZodBoolean>;
    /** @deprecated */
    agentOptions: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        agent: z.ZodDefault<z.ZodString>;
        skipCompletion: z.ZodDefault<z.ZodBoolean>;
        model: z.ZodString;
        temperature: z.ZodDefault<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        agent: string;
        skipCompletion: boolean;
        model: string;
        temperature: number;
    }, {
        model: string;
        agent?: string | undefined;
        skipCompletion?: boolean | undefined;
        temperature?: number | undefined;
    }>>>;
    /** @deprecated Prefer `modelLabel` over `chatGptLabel` */
    chatGptLabel: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, "iconURL" | "agent_id" | "instructions" | "additional_instructions" | "greeting" | "spec">, "strip", z.ZodTypeAny, {
    iconURL?: string | null | undefined;
    agent_id?: string | undefined;
    instructions?: string | undefined;
    additional_instructions?: string | undefined;
    greeting?: string | undefined;
    spec?: string | null | undefined;
}, {
    iconURL?: string | null | undefined;
    agent_id?: string | undefined;
    instructions?: string | undefined;
    additional_instructions?: string | undefined;
    greeting?: string | undefined;
    spec?: string | null | undefined;
}>, Partial<{
    iconURL?: string | null | undefined;
    agent_id?: string | undefined;
    instructions?: string | undefined;
    additional_instructions?: string | undefined;
    greeting?: string | undefined;
    spec?: string | null | undefined;
}>, {
    iconURL?: string | null | undefined;
    agent_id?: string | undefined;
    instructions?: string | undefined;
    additional_instructions?: string | undefined;
    greeting?: string | undefined;
    spec?: string | null | undefined;
}>>;
export {};
