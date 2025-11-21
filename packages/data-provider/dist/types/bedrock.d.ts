import { z } from 'zod';
import * as s from './schemas';
export declare const bedrockInputSchema: z.ZodCatch<z.ZodEffects<z.ZodObject<Pick<{
    conversationId: z.ZodNullable<z.ZodString>;
    endpoint: z.ZodNullable<z.ZodNativeEnum<typeof s.EModelEndpoint>>;
    endpointType: z.ZodOptional<z.ZodNullable<z.ZodNativeEnum<typeof s.EModelEndpoint>>>;
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
    imageDetail: z.ZodOptional<z.ZodNativeEnum<typeof s.ImageDetail>>;
    reasoning_effort: z.ZodNullable<z.ZodOptional<z.ZodNativeEnum<typeof s.ReasoningEffort>>>;
    reasoning_summary: z.ZodNullable<z.ZodOptional<z.ZodNativeEnum<typeof s.ReasoningSummary>>>;
    verbosity: z.ZodNullable<z.ZodOptional<z.ZodNativeEnum<typeof s.Verbosity>>>;
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
        [key: string]: string | number | boolean | any | any | null;
    } | null)[] | {
        [key: string]: string | number | boolean | any | any | null;
    } | null)[] | {
        [key: string]: string | number | boolean | any | any | null;
    } | null)[] | {
        [key: string]: string | number | boolean | any | any | null;
    } | null)[] | {
        [key: string]: string | number | boolean | any | any | null;
    } | null)[] | {
        [key: string]: string | number | boolean | any | any | null;
    } | null)[] | {
        [key: string]: string | number | boolean | any | any | null;
    } | null)[] | {
        [key: string]: string | number | boolean | any | any | null;
    } | null)[] | {
        [key: string]: string | number | boolean | any | any | null;
    } | null)[] | {
        [key: string]: string | number | boolean | any | any | null;
    } | null)[] | {
        [key: string]: string | number | boolean | any | any | null;
    } | null, z.ZodTypeDef, string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | {
        [key: string]: string | number | boolean | any | any | null;
    } | null)[] | {
        [key: string]: string | number | boolean | any | any | null;
    } | null)[] | {
        [key: string]: string | number | boolean | any | any | null;
    } | null)[] | {
        [key: string]: string | number | boolean | any | any | null;
    } | null)[] | {
        [key: string]: string | number | boolean | any | any | null;
    } | null)[] | {
        [key: string]: string | number | boolean | any | any | null;
    } | null)[] | {
        [key: string]: string | number | boolean | any | any | null;
    } | null)[] | {
        [key: string]: string | number | boolean | any | any | null;
    } | null)[] | {
        [key: string]: string | number | boolean | any | any | null;
    } | null)[] | {
        [key: string]: string | number | boolean | any | any | null;
    } | null)[] | {
        [key: string]: string | number | boolean | any | any | null;
    } | null)[] | {
        [key: string]: string | number | boolean | any | any | null;
    } | null>>;
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
        model: string;
        temperature: number;
        agent: string;
        skipCompletion: boolean;
    }, {
        model: string;
        temperature?: number | undefined;
        agent?: string | undefined;
        skipCompletion?: boolean | undefined;
    }>>>;
    chatGptLabel: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, "modelLabel" | "model" | "promptPrefix" | "temperature" | "topP" | "topK" | "maxOutputTokens" | "maxContextTokens" | "system" | "thinking" | "thinkingBudget" | "artifacts" | "resendFiles" | "region" | "maxTokens" | "additionalModelRequestFields" | "stop" | "greeting" | "spec" | "iconURL">, "strip", z.ZodTypeAny, {
    modelLabel?: string | null | undefined;
    model?: string | null | undefined;
    promptPrefix?: string | null | undefined;
    temperature?: number | null | undefined;
    topP?: number | undefined;
    topK?: number | undefined;
    maxOutputTokens?: number | null | undefined;
    maxContextTokens?: number | undefined;
    system?: string | undefined;
    thinking?: boolean | undefined;
    thinkingBudget?: number | undefined;
    artifacts?: string | undefined;
    resendFiles?: boolean | undefined;
    region?: string | undefined;
    maxTokens?: number | undefined;
    additionalModelRequestFields?: (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | {
        [key: string]: string | number | boolean | any | any | null;
    } | null)[] | {
        [key: string]: string | number | boolean | any | any | null;
    } | null)[] | {
        [key: string]: string | number | boolean | any | any | null;
    } | null)[] | {
        [key: string]: string | number | boolean | any | any | null;
    } | null)[] | {
        [key: string]: string | number | boolean | any | any | null;
    } | null)[] | {
        [key: string]: string | number | boolean | any | any | null;
    } | null)[] | {
        [key: string]: string | number | boolean | any | any | null;
    } | null)[] | {
        [key: string]: string | number | boolean | any | any | null;
    } | null)[] | {
        [key: string]: string | number | boolean | any | any | null;
    } | null)[] | {
        [key: string]: string | number | boolean | any | any | null;
    } | null)[] | {
        [key: string]: string | number | boolean | any | any | null;
    } | null)[] | {
        [key: string]: string | number | boolean | any | any | null;
    } | null) | undefined;
    stop?: string[] | undefined;
    greeting?: string | undefined;
    spec?: string | null | undefined;
    iconURL?: string | null | undefined;
}, {
    modelLabel?: string | null | undefined;
    model?: string | null | undefined;
    promptPrefix?: string | null | undefined;
    temperature?: number | null | undefined;
    topP?: number | undefined;
    topK?: number | undefined;
    maxOutputTokens?: string | number | null | undefined;
    maxContextTokens?: string | number | undefined;
    system?: string | undefined;
    thinking?: boolean | undefined;
    thinkingBudget?: string | number | undefined;
    artifacts?: string | undefined;
    resendFiles?: boolean | undefined;
    region?: string | undefined;
    maxTokens?: string | number | undefined;
    additionalModelRequestFields?: (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | {
        [key: string]: string | number | boolean | any | any | null;
    } | null)[] | {
        [key: string]: string | number | boolean | any | any | null;
    } | null)[] | {
        [key: string]: string | number | boolean | any | any | null;
    } | null)[] | {
        [key: string]: string | number | boolean | any | any | null;
    } | null)[] | {
        [key: string]: string | number | boolean | any | any | null;
    } | null)[] | {
        [key: string]: string | number | boolean | any | any | null;
    } | null)[] | {
        [key: string]: string | number | boolean | any | any | null;
    } | null)[] | {
        [key: string]: string | number | boolean | any | any | null;
    } | null)[] | {
        [key: string]: string | number | boolean | any | any | null;
    } | null)[] | {
        [key: string]: string | number | boolean | any | any | null;
    } | null)[] | {
        [key: string]: string | number | boolean | any | any | null;
    } | null)[] | {
        [key: string]: string | number | boolean | any | any | null;
    } | null) | undefined;
    stop?: string[] | undefined;
    greeting?: string | undefined;
    spec?: string | null | undefined;
    iconURL?: string | null | undefined;
}>, Partial<{
    modelLabel?: string | null | undefined;
    model?: string | null | undefined;
    promptPrefix?: string | null | undefined;
    temperature?: number | null | undefined;
    topP?: number | undefined;
    topK?: number | undefined;
    maxOutputTokens?: number | null | undefined;
    maxContextTokens?: number | undefined;
    system?: string | undefined;
    thinking?: boolean | undefined;
    thinkingBudget?: number | undefined;
    artifacts?: string | undefined;
    resendFiles?: boolean | undefined;
    region?: string | undefined;
    maxTokens?: number | undefined;
    additionalModelRequestFields?: (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | {
        [key: string]: string | number | boolean | any | any | null;
    } | null)[] | {
        [key: string]: string | number | boolean | any | any | null;
    } | null)[] | {
        [key: string]: string | number | boolean | any | any | null;
    } | null)[] | {
        [key: string]: string | number | boolean | any | any | null;
    } | null)[] | {
        [key: string]: string | number | boolean | any | any | null;
    } | null)[] | {
        [key: string]: string | number | boolean | any | any | null;
    } | null)[] | {
        [key: string]: string | number | boolean | any | any | null;
    } | null)[] | {
        [key: string]: string | number | boolean | any | any | null;
    } | null)[] | {
        [key: string]: string | number | boolean | any | any | null;
    } | null)[] | {
        [key: string]: string | number | boolean | any | any | null;
    } | null)[] | {
        [key: string]: string | number | boolean | any | any | null;
    } | null)[] | {
        [key: string]: string | number | boolean | any | any | null;
    } | null) | undefined;
    stop?: string[] | undefined;
    greeting?: string | undefined;
    spec?: string | null | undefined;
    iconURL?: string | null | undefined;
}>, {
    modelLabel?: string | null | undefined;
    model?: string | null | undefined;
    promptPrefix?: string | null | undefined;
    temperature?: number | null | undefined;
    topP?: number | undefined;
    topK?: number | undefined;
    maxOutputTokens?: string | number | null | undefined;
    maxContextTokens?: string | number | undefined;
    system?: string | undefined;
    thinking?: boolean | undefined;
    thinkingBudget?: string | number | undefined;
    artifacts?: string | undefined;
    resendFiles?: boolean | undefined;
    region?: string | undefined;
    maxTokens?: string | number | undefined;
    additionalModelRequestFields?: (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | {
        [key: string]: string | number | boolean | any | any | null;
    } | null)[] | {
        [key: string]: string | number | boolean | any | any | null;
    } | null)[] | {
        [key: string]: string | number | boolean | any | any | null;
    } | null)[] | {
        [key: string]: string | number | boolean | any | any | null;
    } | null)[] | {
        [key: string]: string | number | boolean | any | any | null;
    } | null)[] | {
        [key: string]: string | number | boolean | any | any | null;
    } | null)[] | {
        [key: string]: string | number | boolean | any | any | null;
    } | null)[] | {
        [key: string]: string | number | boolean | any | any | null;
    } | null)[] | {
        [key: string]: string | number | boolean | any | any | null;
    } | null)[] | {
        [key: string]: string | number | boolean | any | any | null;
    } | null)[] | {
        [key: string]: string | number | boolean | any | any | null;
    } | null)[] | {
        [key: string]: string | number | boolean | any | any | null;
    } | null) | undefined;
    stop?: string[] | undefined;
    greeting?: string | undefined;
    spec?: string | null | undefined;
    iconURL?: string | null | undefined;
}>>;
export type BedrockConverseInput = z.infer<typeof bedrockInputSchema>;
export declare const bedrockInputParser: z.ZodCatch<z.ZodEffects<z.ZodObject<Pick<{
    conversationId: z.ZodNullable<z.ZodString>;
    endpoint: z.ZodNullable<z.ZodNativeEnum<typeof s.EModelEndpoint>>;
    endpointType: z.ZodOptional<z.ZodNullable<z.ZodNativeEnum<typeof s.EModelEndpoint>>>;
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
    imageDetail: z.ZodOptional<z.ZodNativeEnum<typeof s.ImageDetail>>;
    reasoning_effort: z.ZodNullable<z.ZodOptional<z.ZodNativeEnum<typeof s.ReasoningEffort>>>;
    reasoning_summary: z.ZodNullable<z.ZodOptional<z.ZodNativeEnum<typeof s.ReasoningSummary>>>;
    verbosity: z.ZodNullable<z.ZodOptional<z.ZodNativeEnum<typeof s.Verbosity>>>;
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
        [key: string]: string | number | boolean | any | any | null;
    } | null)[] | {
        [key: string]: string | number | boolean | any | any | null;
    } | null)[] | {
        [key: string]: string | number | boolean | any | any | null;
    } | null)[] | {
        [key: string]: string | number | boolean | any | any | null;
    } | null)[] | {
        [key: string]: string | number | boolean | any | any | null;
    } | null)[] | {
        [key: string]: string | number | boolean | any | any | null;
    } | null)[] | {
        [key: string]: string | number | boolean | any | any | null;
    } | null)[] | {
        [key: string]: string | number | boolean | any | any | null;
    } | null)[] | {
        [key: string]: string | number | boolean | any | any | null;
    } | null)[] | {
        [key: string]: string | number | boolean | any | any | null;
    } | null)[] | {
        [key: string]: string | number | boolean | any | any | null;
    } | null, z.ZodTypeDef, string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | {
        [key: string]: string | number | boolean | any | any | null;
    } | null)[] | {
        [key: string]: string | number | boolean | any | any | null;
    } | null)[] | {
        [key: string]: string | number | boolean | any | any | null;
    } | null)[] | {
        [key: string]: string | number | boolean | any | any | null;
    } | null)[] | {
        [key: string]: string | number | boolean | any | any | null;
    } | null)[] | {
        [key: string]: string | number | boolean | any | any | null;
    } | null)[] | {
        [key: string]: string | number | boolean | any | any | null;
    } | null)[] | {
        [key: string]: string | number | boolean | any | any | null;
    } | null)[] | {
        [key: string]: string | number | boolean | any | any | null;
    } | null)[] | {
        [key: string]: string | number | boolean | any | any | null;
    } | null)[] | {
        [key: string]: string | number | boolean | any | any | null;
    } | null)[] | {
        [key: string]: string | number | boolean | any | any | null;
    } | null>>;
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
        model: string;
        temperature: number;
        agent: string;
        skipCompletion: boolean;
    }, {
        model: string;
        temperature?: number | undefined;
        agent?: string | undefined;
        skipCompletion?: boolean | undefined;
    }>>>;
    chatGptLabel: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, "modelLabel" | "model" | "promptPrefix" | "temperature" | "topP" | "topK" | "maxOutputTokens" | "maxContextTokens" | "thinking" | "thinkingBudget" | "artifacts" | "resendFiles" | "region" | "maxTokens" | "additionalModelRequestFields" | "stop" | "greeting" | "spec" | "iconURL">, "strip", z.ZodAny, z.objectOutputType<Pick<{
    conversationId: z.ZodNullable<z.ZodString>;
    endpoint: z.ZodNullable<z.ZodNativeEnum<typeof s.EModelEndpoint>>;
    endpointType: z.ZodOptional<z.ZodNullable<z.ZodNativeEnum<typeof s.EModelEndpoint>>>;
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
    imageDetail: z.ZodOptional<z.ZodNativeEnum<typeof s.ImageDetail>>;
    reasoning_effort: z.ZodNullable<z.ZodOptional<z.ZodNativeEnum<typeof s.ReasoningEffort>>>;
    reasoning_summary: z.ZodNullable<z.ZodOptional<z.ZodNativeEnum<typeof s.ReasoningSummary>>>;
    verbosity: z.ZodNullable<z.ZodOptional<z.ZodNativeEnum<typeof s.Verbosity>>>;
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
        [key: string]: string | number | boolean | any | any | null;
    } | null)[] | {
        [key: string]: string | number | boolean | any | any | null;
    } | null)[] | {
        [key: string]: string | number | boolean | any | any | null;
    } | null)[] | {
        [key: string]: string | number | boolean | any | any | null;
    } | null)[] | {
        [key: string]: string | number | boolean | any | any | null;
    } | null)[] | {
        [key: string]: string | number | boolean | any | any | null;
    } | null)[] | {
        [key: string]: string | number | boolean | any | any | null;
    } | null)[] | {
        [key: string]: string | number | boolean | any | any | null;
    } | null)[] | {
        [key: string]: string | number | boolean | any | any | null;
    } | null)[] | {
        [key: string]: string | number | boolean | any | any | null;
    } | null)[] | {
        [key: string]: string | number | boolean | any | any | null;
    } | null, z.ZodTypeDef, string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | {
        [key: string]: string | number | boolean | any | any | null;
    } | null)[] | {
        [key: string]: string | number | boolean | any | any | null;
    } | null)[] | {
        [key: string]: string | number | boolean | any | any | null;
    } | null)[] | {
        [key: string]: string | number | boolean | any | any | null;
    } | null)[] | {
        [key: string]: string | number | boolean | any | any | null;
    } | null)[] | {
        [key: string]: string | number | boolean | any | any | null;
    } | null)[] | {
        [key: string]: string | number | boolean | any | any | null;
    } | null)[] | {
        [key: string]: string | number | boolean | any | any | null;
    } | null)[] | {
        [key: string]: string | number | boolean | any | any | null;
    } | null)[] | {
        [key: string]: string | number | boolean | any | any | null;
    } | null)[] | {
        [key: string]: string | number | boolean | any | any | null;
    } | null)[] | {
        [key: string]: string | number | boolean | any | any | null;
    } | null>>;
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
        model: string;
        temperature: number;
        agent: string;
        skipCompletion: boolean;
    }, {
        model: string;
        temperature?: number | undefined;
        agent?: string | undefined;
        skipCompletion?: boolean | undefined;
    }>>>;
    chatGptLabel: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, "modelLabel" | "model" | "promptPrefix" | "temperature" | "topP" | "topK" | "maxOutputTokens" | "maxContextTokens" | "thinking" | "thinkingBudget" | "artifacts" | "resendFiles" | "region" | "maxTokens" | "additionalModelRequestFields" | "stop" | "greeting" | "spec" | "iconURL">, z.ZodAny, "strip">, z.objectInputType<Pick<{
    conversationId: z.ZodNullable<z.ZodString>;
    endpoint: z.ZodNullable<z.ZodNativeEnum<typeof s.EModelEndpoint>>;
    endpointType: z.ZodOptional<z.ZodNullable<z.ZodNativeEnum<typeof s.EModelEndpoint>>>;
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
    imageDetail: z.ZodOptional<z.ZodNativeEnum<typeof s.ImageDetail>>;
    reasoning_effort: z.ZodNullable<z.ZodOptional<z.ZodNativeEnum<typeof s.ReasoningEffort>>>;
    reasoning_summary: z.ZodNullable<z.ZodOptional<z.ZodNativeEnum<typeof s.ReasoningSummary>>>;
    verbosity: z.ZodNullable<z.ZodOptional<z.ZodNativeEnum<typeof s.Verbosity>>>;
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
        [key: string]: string | number | boolean | any | any | null;
    } | null)[] | {
        [key: string]: string | number | boolean | any | any | null;
    } | null)[] | {
        [key: string]: string | number | boolean | any | any | null;
    } | null)[] | {
        [key: string]: string | number | boolean | any | any | null;
    } | null)[] | {
        [key: string]: string | number | boolean | any | any | null;
    } | null)[] | {
        [key: string]: string | number | boolean | any | any | null;
    } | null)[] | {
        [key: string]: string | number | boolean | any | any | null;
    } | null)[] | {
        [key: string]: string | number | boolean | any | any | null;
    } | null)[] | {
        [key: string]: string | number | boolean | any | any | null;
    } | null)[] | {
        [key: string]: string | number | boolean | any | any | null;
    } | null)[] | {
        [key: string]: string | number | boolean | any | any | null;
    } | null, z.ZodTypeDef, string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | {
        [key: string]: string | number | boolean | any | any | null;
    } | null)[] | {
        [key: string]: string | number | boolean | any | any | null;
    } | null)[] | {
        [key: string]: string | number | boolean | any | any | null;
    } | null)[] | {
        [key: string]: string | number | boolean | any | any | null;
    } | null)[] | {
        [key: string]: string | number | boolean | any | any | null;
    } | null)[] | {
        [key: string]: string | number | boolean | any | any | null;
    } | null)[] | {
        [key: string]: string | number | boolean | any | any | null;
    } | null)[] | {
        [key: string]: string | number | boolean | any | any | null;
    } | null)[] | {
        [key: string]: string | number | boolean | any | any | null;
    } | null)[] | {
        [key: string]: string | number | boolean | any | any | null;
    } | null)[] | {
        [key: string]: string | number | boolean | any | any | null;
    } | null)[] | {
        [key: string]: string | number | boolean | any | any | null;
    } | null>>;
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
        model: string;
        temperature: number;
        agent: string;
        skipCompletion: boolean;
    }, {
        model: string;
        temperature?: number | undefined;
        agent?: string | undefined;
        skipCompletion?: boolean | undefined;
    }>>>;
    chatGptLabel: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, "modelLabel" | "model" | "promptPrefix" | "temperature" | "topP" | "topK" | "maxOutputTokens" | "maxContextTokens" | "thinking" | "thinkingBudget" | "artifacts" | "resendFiles" | "region" | "maxTokens" | "additionalModelRequestFields" | "stop" | "greeting" | "spec" | "iconURL">, z.ZodAny, "strip">>, Partial<{
    modelLabel?: string | null | undefined;
    model?: string | null | undefined;
    promptPrefix?: string | null | undefined;
    temperature?: number | null | undefined;
    topP?: number | undefined;
    topK?: number | undefined;
    maxOutputTokens?: number | null | undefined;
    maxContextTokens?: number | undefined;
    system?: string | undefined;
    thinking?: boolean | undefined;
    thinkingBudget?: number | undefined;
    artifacts?: string | undefined;
    resendFiles?: boolean | undefined;
    region?: string | undefined;
    maxTokens?: number | undefined;
    additionalModelRequestFields?: (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | {
        [key: string]: string | number | boolean | any | any | null;
    } | null)[] | {
        [key: string]: string | number | boolean | any | any | null;
    } | null)[] | {
        [key: string]: string | number | boolean | any | any | null;
    } | null)[] | {
        [key: string]: string | number | boolean | any | any | null;
    } | null)[] | {
        [key: string]: string | number | boolean | any | any | null;
    } | null)[] | {
        [key: string]: string | number | boolean | any | any | null;
    } | null)[] | {
        [key: string]: string | number | boolean | any | any | null;
    } | null)[] | {
        [key: string]: string | number | boolean | any | any | null;
    } | null)[] | {
        [key: string]: string | number | boolean | any | any | null;
    } | null)[] | {
        [key: string]: string | number | boolean | any | any | null;
    } | null)[] | {
        [key: string]: string | number | boolean | any | any | null;
    } | null)[] | {
        [key: string]: string | number | boolean | any | any | null;
    } | null) | undefined;
    stop?: string[] | undefined;
    greeting?: string | undefined;
    spec?: string | null | undefined;
    iconURL?: string | null | undefined;
}>, z.objectInputType<Pick<{
    conversationId: z.ZodNullable<z.ZodString>;
    endpoint: z.ZodNullable<z.ZodNativeEnum<typeof s.EModelEndpoint>>;
    endpointType: z.ZodOptional<z.ZodNullable<z.ZodNativeEnum<typeof s.EModelEndpoint>>>;
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
    imageDetail: z.ZodOptional<z.ZodNativeEnum<typeof s.ImageDetail>>;
    reasoning_effort: z.ZodNullable<z.ZodOptional<z.ZodNativeEnum<typeof s.ReasoningEffort>>>;
    reasoning_summary: z.ZodNullable<z.ZodOptional<z.ZodNativeEnum<typeof s.ReasoningSummary>>>;
    verbosity: z.ZodNullable<z.ZodOptional<z.ZodNativeEnum<typeof s.Verbosity>>>;
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
        [key: string]: string | number | boolean | any | any | null;
    } | null)[] | {
        [key: string]: string | number | boolean | any | any | null;
    } | null)[] | {
        [key: string]: string | number | boolean | any | any | null;
    } | null)[] | {
        [key: string]: string | number | boolean | any | any | null;
    } | null)[] | {
        [key: string]: string | number | boolean | any | any | null;
    } | null)[] | {
        [key: string]: string | number | boolean | any | any | null;
    } | null)[] | {
        [key: string]: string | number | boolean | any | any | null;
    } | null)[] | {
        [key: string]: string | number | boolean | any | any | null;
    } | null)[] | {
        [key: string]: string | number | boolean | any | any | null;
    } | null)[] | {
        [key: string]: string | number | boolean | any | any | null;
    } | null)[] | {
        [key: string]: string | number | boolean | any | any | null;
    } | null, z.ZodTypeDef, string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | (string | number | boolean | any | {
        [key: string]: string | number | boolean | any | any | null;
    } | null)[] | {
        [key: string]: string | number | boolean | any | any | null;
    } | null)[] | {
        [key: string]: string | number | boolean | any | any | null;
    } | null)[] | {
        [key: string]: string | number | boolean | any | any | null;
    } | null)[] | {
        [key: string]: string | number | boolean | any | any | null;
    } | null)[] | {
        [key: string]: string | number | boolean | any | any | null;
    } | null)[] | {
        [key: string]: string | number | boolean | any | any | null;
    } | null)[] | {
        [key: string]: string | number | boolean | any | any | null;
    } | null)[] | {
        [key: string]: string | number | boolean | any | any | null;
    } | null)[] | {
        [key: string]: string | number | boolean | any | any | null;
    } | null)[] | {
        [key: string]: string | number | boolean | any | any | null;
    } | null)[] | {
        [key: string]: string | number | boolean | any | any | null;
    } | null>>;
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
        model: string;
        temperature: number;
        agent: string;
        skipCompletion: boolean;
    }, {
        model: string;
        temperature?: number | undefined;
        agent?: string | undefined;
        skipCompletion?: boolean | undefined;
    }>>>;
    chatGptLabel: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, "modelLabel" | "model" | "promptPrefix" | "temperature" | "topP" | "topK" | "maxOutputTokens" | "maxContextTokens" | "thinking" | "thinkingBudget" | "artifacts" | "resendFiles" | "region" | "maxTokens" | "additionalModelRequestFields" | "stop" | "greeting" | "spec" | "iconURL">, z.ZodAny, "strip">>>;
export declare const bedrockOutputParser: (data: Record<string, unknown>) => Record<string, unknown>;
