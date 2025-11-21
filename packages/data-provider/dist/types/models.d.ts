import { z } from 'zod';
import type { TPreset } from './schemas';
import { EModelEndpoint, AuthType } from './schemas';
export type TModelSpec = {
    name: string;
    label: string;
    preset: TPreset;
    order?: number;
    default?: boolean;
    description?: string;
    /**
     * Optional group name for organizing specs in the UI selector.
     * - If it matches an endpoint name (e.g., "openAI", "groq"), the spec appears nested under that endpoint
     * - If it's a custom name (doesn't match any endpoint), it creates a separate collapsible group
     * - If omitted, the spec appears as a standalone item at the top level
     */
    group?: string;
    showIconInMenu?: boolean;
    showIconInHeader?: boolean;
    iconURL?: string | EModelEndpoint;
    authType?: AuthType;
    webSearch?: boolean;
    fileSearch?: boolean;
    executeCode?: boolean;
    mcpServers?: string[];
};
export declare const tModelSpecSchema: z.ZodObject<{
    name: z.ZodString;
    label: z.ZodString;
    preset: z.ZodObject<{
        endpointType: z.ZodOptional<z.ZodNullable<z.ZodNativeEnum<typeof EModelEndpoint>>>;
        isArchived: z.ZodOptional<z.ZodBoolean>;
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
        endpointType?: EModelEndpoint | null | undefined;
        isArchived?: boolean | undefined;
        title?: string | null | undefined;
        user?: string | undefined;
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
        model?: string | null | undefined;
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
        tags?: string[] | undefined;
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
        instructions?: string | undefined;
        additional_instructions?: string | undefined;
        append_current_datetime?: boolean | undefined;
        presetOverride?: Record<string, unknown> | undefined;
        stop?: string[] | undefined;
        greeting?: string | undefined;
        spec?: string | null | undefined;
        iconURL?: string | null | undefined;
        expiredAt?: string | null | undefined;
        fileTokenLimit?: number | undefined;
        resendImages?: boolean | undefined;
        agentOptions?: {
            model: string;
            temperature: number;
            agent: string;
            skipCompletion: boolean;
        } | null | undefined;
        chatGptLabel?: string | null | undefined;
        presetId?: string | null | undefined;
        defaultPreset?: boolean | undefined;
        order?: number | undefined;
    }, {
        endpoint: string | null;
        conversationId?: string | null | undefined;
        endpointType?: EModelEndpoint | null | undefined;
        isArchived?: boolean | undefined;
        title?: string | null | undefined;
        user?: string | undefined;
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
        model?: string | null | undefined;
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
        tags?: string[] | undefined;
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
        instructions?: string | undefined;
        additional_instructions?: string | undefined;
        append_current_datetime?: boolean | undefined;
        presetOverride?: Record<string, unknown> | undefined;
        stop?: string[] | undefined;
        greeting?: string | undefined;
        spec?: string | null | undefined;
        iconURL?: string | null | undefined;
        expiredAt?: string | null | undefined;
        fileTokenLimit?: string | number | undefined;
        resendImages?: boolean | undefined;
        agentOptions?: {
            model: string;
            temperature?: number | undefined;
            agent?: string | undefined;
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
    authType: z.ZodOptional<z.ZodNativeEnum<typeof AuthType>>;
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
        endpointType?: EModelEndpoint | null | undefined;
        isArchived?: boolean | undefined;
        title?: string | null | undefined;
        user?: string | undefined;
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
        model?: string | null | undefined;
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
        tags?: string[] | undefined;
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
        instructions?: string | undefined;
        additional_instructions?: string | undefined;
        append_current_datetime?: boolean | undefined;
        presetOverride?: Record<string, unknown> | undefined;
        stop?: string[] | undefined;
        greeting?: string | undefined;
        spec?: string | null | undefined;
        iconURL?: string | null | undefined;
        expiredAt?: string | null | undefined;
        fileTokenLimit?: number | undefined;
        resendImages?: boolean | undefined;
        agentOptions?: {
            model: string;
            temperature: number;
            agent: string;
            skipCompletion: boolean;
        } | null | undefined;
        chatGptLabel?: string | null | undefined;
        presetId?: string | null | undefined;
        defaultPreset?: boolean | undefined;
        order?: number | undefined;
    };
    description?: string | undefined;
    iconURL?: string | undefined;
    order?: number | undefined;
    default?: boolean | undefined;
    group?: string | undefined;
    showIconInMenu?: boolean | undefined;
    showIconInHeader?: boolean | undefined;
    authType?: AuthType | undefined;
    webSearch?: boolean | undefined;
    fileSearch?: boolean | undefined;
    executeCode?: boolean | undefined;
    mcpServers?: string[] | undefined;
}, {
    name: string;
    label: string;
    preset: {
        endpoint: string | null;
        conversationId?: string | null | undefined;
        endpointType?: EModelEndpoint | null | undefined;
        isArchived?: boolean | undefined;
        title?: string | null | undefined;
        user?: string | undefined;
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
        model?: string | null | undefined;
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
        tags?: string[] | undefined;
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
        instructions?: string | undefined;
        additional_instructions?: string | undefined;
        append_current_datetime?: boolean | undefined;
        presetOverride?: Record<string, unknown> | undefined;
        stop?: string[] | undefined;
        greeting?: string | undefined;
        spec?: string | null | undefined;
        iconURL?: string | null | undefined;
        expiredAt?: string | null | undefined;
        fileTokenLimit?: string | number | undefined;
        resendImages?: boolean | undefined;
        agentOptions?: {
            model: string;
            temperature?: number | undefined;
            agent?: string | undefined;
            skipCompletion?: boolean | undefined;
        } | null | undefined;
        chatGptLabel?: string | null | undefined;
        presetId?: string | null | undefined;
        defaultPreset?: boolean | undefined;
        order?: number | undefined;
    };
    description?: string | undefined;
    iconURL?: string | undefined;
    order?: number | undefined;
    default?: boolean | undefined;
    group?: string | undefined;
    showIconInMenu?: boolean | undefined;
    showIconInHeader?: boolean | undefined;
    authType?: AuthType | undefined;
    webSearch?: boolean | undefined;
    fileSearch?: boolean | undefined;
    executeCode?: boolean | undefined;
    mcpServers?: string[] | undefined;
}>;
export declare const specsConfigSchema: z.ZodObject<{
    enforce: z.ZodDefault<z.ZodBoolean>;
    prioritize: z.ZodDefault<z.ZodBoolean>;
    list: z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        label: z.ZodString;
        preset: z.ZodObject<{
            endpointType: z.ZodOptional<z.ZodNullable<z.ZodNativeEnum<typeof EModelEndpoint>>>;
            isArchived: z.ZodOptional<z.ZodBoolean>;
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
            endpointType?: EModelEndpoint | null | undefined;
            isArchived?: boolean | undefined;
            title?: string | null | undefined;
            user?: string | undefined;
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
            model?: string | null | undefined;
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
            tags?: string[] | undefined;
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
            instructions?: string | undefined;
            additional_instructions?: string | undefined;
            append_current_datetime?: boolean | undefined;
            presetOverride?: Record<string, unknown> | undefined;
            stop?: string[] | undefined;
            greeting?: string | undefined;
            spec?: string | null | undefined;
            iconURL?: string | null | undefined;
            expiredAt?: string | null | undefined;
            fileTokenLimit?: number | undefined;
            resendImages?: boolean | undefined;
            agentOptions?: {
                model: string;
                temperature: number;
                agent: string;
                skipCompletion: boolean;
            } | null | undefined;
            chatGptLabel?: string | null | undefined;
            presetId?: string | null | undefined;
            defaultPreset?: boolean | undefined;
            order?: number | undefined;
        }, {
            endpoint: string | null;
            conversationId?: string | null | undefined;
            endpointType?: EModelEndpoint | null | undefined;
            isArchived?: boolean | undefined;
            title?: string | null | undefined;
            user?: string | undefined;
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
            model?: string | null | undefined;
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
            tags?: string[] | undefined;
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
            instructions?: string | undefined;
            additional_instructions?: string | undefined;
            append_current_datetime?: boolean | undefined;
            presetOverride?: Record<string, unknown> | undefined;
            stop?: string[] | undefined;
            greeting?: string | undefined;
            spec?: string | null | undefined;
            iconURL?: string | null | undefined;
            expiredAt?: string | null | undefined;
            fileTokenLimit?: string | number | undefined;
            resendImages?: boolean | undefined;
            agentOptions?: {
                model: string;
                temperature?: number | undefined;
                agent?: string | undefined;
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
        authType: z.ZodOptional<z.ZodNativeEnum<typeof AuthType>>;
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
            endpointType?: EModelEndpoint | null | undefined;
            isArchived?: boolean | undefined;
            title?: string | null | undefined;
            user?: string | undefined;
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
            model?: string | null | undefined;
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
            tags?: string[] | undefined;
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
            instructions?: string | undefined;
            additional_instructions?: string | undefined;
            append_current_datetime?: boolean | undefined;
            presetOverride?: Record<string, unknown> | undefined;
            stop?: string[] | undefined;
            greeting?: string | undefined;
            spec?: string | null | undefined;
            iconURL?: string | null | undefined;
            expiredAt?: string | null | undefined;
            fileTokenLimit?: number | undefined;
            resendImages?: boolean | undefined;
            agentOptions?: {
                model: string;
                temperature: number;
                agent: string;
                skipCompletion: boolean;
            } | null | undefined;
            chatGptLabel?: string | null | undefined;
            presetId?: string | null | undefined;
            defaultPreset?: boolean | undefined;
            order?: number | undefined;
        };
        description?: string | undefined;
        iconURL?: string | undefined;
        order?: number | undefined;
        default?: boolean | undefined;
        group?: string | undefined;
        showIconInMenu?: boolean | undefined;
        showIconInHeader?: boolean | undefined;
        authType?: AuthType | undefined;
        webSearch?: boolean | undefined;
        fileSearch?: boolean | undefined;
        executeCode?: boolean | undefined;
        mcpServers?: string[] | undefined;
    }, {
        name: string;
        label: string;
        preset: {
            endpoint: string | null;
            conversationId?: string | null | undefined;
            endpointType?: EModelEndpoint | null | undefined;
            isArchived?: boolean | undefined;
            title?: string | null | undefined;
            user?: string | undefined;
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
            model?: string | null | undefined;
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
            tags?: string[] | undefined;
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
            instructions?: string | undefined;
            additional_instructions?: string | undefined;
            append_current_datetime?: boolean | undefined;
            presetOverride?: Record<string, unknown> | undefined;
            stop?: string[] | undefined;
            greeting?: string | undefined;
            spec?: string | null | undefined;
            iconURL?: string | null | undefined;
            expiredAt?: string | null | undefined;
            fileTokenLimit?: string | number | undefined;
            resendImages?: boolean | undefined;
            agentOptions?: {
                model: string;
                temperature?: number | undefined;
                agent?: string | undefined;
                skipCompletion?: boolean | undefined;
            } | null | undefined;
            chatGptLabel?: string | null | undefined;
            presetId?: string | null | undefined;
            defaultPreset?: boolean | undefined;
            order?: number | undefined;
        };
        description?: string | undefined;
        iconURL?: string | undefined;
        order?: number | undefined;
        default?: boolean | undefined;
        group?: string | undefined;
        showIconInMenu?: boolean | undefined;
        showIconInHeader?: boolean | undefined;
        authType?: AuthType | undefined;
        webSearch?: boolean | undefined;
        fileSearch?: boolean | undefined;
        executeCode?: boolean | undefined;
        mcpServers?: string[] | undefined;
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
            endpointType?: EModelEndpoint | null | undefined;
            isArchived?: boolean | undefined;
            title?: string | null | undefined;
            user?: string | undefined;
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
            model?: string | null | undefined;
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
            tags?: string[] | undefined;
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
            instructions?: string | undefined;
            additional_instructions?: string | undefined;
            append_current_datetime?: boolean | undefined;
            presetOverride?: Record<string, unknown> | undefined;
            stop?: string[] | undefined;
            greeting?: string | undefined;
            spec?: string | null | undefined;
            iconURL?: string | null | undefined;
            expiredAt?: string | null | undefined;
            fileTokenLimit?: number | undefined;
            resendImages?: boolean | undefined;
            agentOptions?: {
                model: string;
                temperature: number;
                agent: string;
                skipCompletion: boolean;
            } | null | undefined;
            chatGptLabel?: string | null | undefined;
            presetId?: string | null | undefined;
            defaultPreset?: boolean | undefined;
            order?: number | undefined;
        };
        description?: string | undefined;
        iconURL?: string | undefined;
        order?: number | undefined;
        default?: boolean | undefined;
        group?: string | undefined;
        showIconInMenu?: boolean | undefined;
        showIconInHeader?: boolean | undefined;
        authType?: AuthType | undefined;
        webSearch?: boolean | undefined;
        fileSearch?: boolean | undefined;
        executeCode?: boolean | undefined;
        mcpServers?: string[] | undefined;
    }[];
    addedEndpoints?: string[] | undefined;
}, {
    list: {
        name: string;
        label: string;
        preset: {
            endpoint: string | null;
            conversationId?: string | null | undefined;
            endpointType?: EModelEndpoint | null | undefined;
            isArchived?: boolean | undefined;
            title?: string | null | undefined;
            user?: string | undefined;
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
            model?: string | null | undefined;
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
            tags?: string[] | undefined;
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
            instructions?: string | undefined;
            additional_instructions?: string | undefined;
            append_current_datetime?: boolean | undefined;
            presetOverride?: Record<string, unknown> | undefined;
            stop?: string[] | undefined;
            greeting?: string | undefined;
            spec?: string | null | undefined;
            iconURL?: string | null | undefined;
            expiredAt?: string | null | undefined;
            fileTokenLimit?: string | number | undefined;
            resendImages?: boolean | undefined;
            agentOptions?: {
                model: string;
                temperature?: number | undefined;
                agent?: string | undefined;
                skipCompletion?: boolean | undefined;
            } | null | undefined;
            chatGptLabel?: string | null | undefined;
            presetId?: string | null | undefined;
            defaultPreset?: boolean | undefined;
            order?: number | undefined;
        };
        description?: string | undefined;
        iconURL?: string | undefined;
        order?: number | undefined;
        default?: boolean | undefined;
        group?: string | undefined;
        showIconInMenu?: boolean | undefined;
        showIconInHeader?: boolean | undefined;
        authType?: AuthType | undefined;
        webSearch?: boolean | undefined;
        fileSearch?: boolean | undefined;
        executeCode?: boolean | undefined;
        mcpServers?: string[] | undefined;
    }[];
    enforce?: boolean | undefined;
    prioritize?: boolean | undefined;
    addedEndpoints?: string[] | undefined;
}>;
export type TSpecsConfig = z.infer<typeof specsConfigSchema>;
