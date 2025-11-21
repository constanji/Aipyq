/// <reference types="react" />
import { z } from 'zod';
import { googleSettings as google } from './schemas';
import type { TConversation, TSetOption, TPreset } from './schemas';
export type GoogleSettings = Partial<typeof google>;
export type OpenAISettings = Partial<typeof google>;
export type ComponentType = 'input' | 'textarea' | 'slider' | 'checkbox' | 'switch' | 'dropdown' | 'combobox' | 'tags';
export type OptionType = 'conversation' | 'model' | 'custom';
export type Option = Record<string, unknown> & {
    label?: string;
    value: string | number | null;
};
export type OptionWithIcon = Option & {
    icon?: React.ReactNode;
};
export declare enum ComponentTypes {
    Input = "input",
    Textarea = "textarea",
    Slider = "slider",
    Checkbox = "checkbox",
    Switch = "switch",
    Dropdown = "dropdown",
    Combobox = "combobox",
    Tags = "tags"
}
export declare enum SettingTypes {
    Number = "number",
    Boolean = "boolean",
    String = "string",
    Enum = "enum",
    Array = "array"
}
export declare enum OptionTypes {
    Conversation = "conversation",
    Model = "model",
    Custom = "custom"
}
export interface SettingDefinition {
    key: string;
    description?: string;
    type: 'number' | 'boolean' | 'string' | 'enum' | 'array';
    default?: number | boolean | string | string[];
    showLabel?: boolean;
    showDefault?: boolean;
    options?: string[];
    range?: SettingRange;
    enumMappings?: Record<string, number | boolean | string>;
    component: ComponentType;
    optionType?: OptionType;
    columnSpan?: number;
    columns?: number;
    label?: string;
    placeholder?: string;
    labelCode?: boolean;
    placeholderCode?: boolean;
    descriptionCode?: boolean;
    minText?: number;
    maxText?: number;
    minTags?: number;
    maxTags?: number;
    includeInput?: boolean;
    descriptionSide?: 'top' | 'right' | 'bottom' | 'left';
    items?: OptionWithIcon[];
    searchPlaceholder?: string;
    selectPlaceholder?: string;
    searchPlaceholderCode?: boolean;
    selectPlaceholderCode?: boolean;
}
export type DynamicSettingProps = Partial<SettingDefinition> & {
    readonly?: boolean;
    settingKey: string;
    setOption: TSetOption;
    conversation: Partial<TConversation> | Partial<TPreset> | null;
    defaultValue?: number | boolean | string | string[];
    className?: string;
    inputClassName?: string;
};
export interface SettingRange {
    min: number;
    max: number;
    step?: number;
}
export type SettingsConfiguration = SettingDefinition[];
export declare function generateDynamicSchema(settings: SettingsConfiguration): z.ZodObject<{
    [key: string]: z.ZodTypeAny;
}, "strip", z.ZodTypeAny, {
    [x: string]: any;
}, {
    [x: string]: any;
}>;
/**
 * Validates the provided setting using the constraints unique to each component type.
 * @throws {ZodError} Throws a ZodError if any validation fails.
 */
export declare function validateSettingDefinitions(settings: SettingsConfiguration): void;
export declare const generateOpenAISchema: (customOpenAI: OpenAISettings) => z.ZodCatch<z.ZodEffects<z.ZodObject<Pick<{
    conversationId: z.ZodNullable<z.ZodString>;
    endpoint: z.ZodNullable<z.ZodNativeEnum<typeof import("./schemas").EModelEndpoint>>;
    endpointType: z.ZodOptional<z.ZodNullable<z.ZodNativeEnum<typeof import("./schemas").EModelEndpoint>>>;
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
}, "model" | "promptPrefix" | "temperature" | "top_p" | "frequency_penalty" | "presence_penalty" | "maxContextTokens" | "resendFiles" | "imageDetail" | "chatGptLabel">, "strip", z.ZodTypeAny, {
    model?: string | null | undefined;
    promptPrefix?: string | null | undefined;
    temperature?: number | null | undefined;
    top_p?: number | undefined;
    frequency_penalty?: number | undefined;
    presence_penalty?: number | undefined;
    maxContextTokens?: number | undefined;
    resendFiles?: boolean | undefined;
    imageDetail?: import("./schemas").ImageDetail | undefined;
    chatGptLabel?: string | null | undefined;
}, {
    model?: string | null | undefined;
    promptPrefix?: string | null | undefined;
    temperature?: number | null | undefined;
    top_p?: number | undefined;
    frequency_penalty?: number | undefined;
    presence_penalty?: number | undefined;
    maxContextTokens?: string | number | undefined;
    resendFiles?: boolean | undefined;
    imageDetail?: import("./schemas").ImageDetail | undefined;
    chatGptLabel?: string | null | undefined;
}>, {
    model: string;
    chatGptLabel: string | null;
    promptPrefix: string | null;
    temperature: number;
    top_p: number;
    presence_penalty: number;
    frequency_penalty: number;
    resendFiles: boolean;
    imageDetail: import("./schemas").ImageDetail;
    maxContextTokens: number | undefined;
}, {
    model?: string | null | undefined;
    promptPrefix?: string | null | undefined;
    temperature?: number | null | undefined;
    top_p?: number | undefined;
    frequency_penalty?: number | undefined;
    presence_penalty?: number | undefined;
    maxContextTokens?: string | number | undefined;
    resendFiles?: boolean | undefined;
    imageDetail?: import("./schemas").ImageDetail | undefined;
    chatGptLabel?: string | null | undefined;
}>>;
export declare const generateGoogleSchema: (customGoogle: GoogleSettings) => z.ZodCatch<z.ZodEffects<z.ZodObject<Pick<{
    conversationId: z.ZodNullable<z.ZodString>;
    endpoint: z.ZodNullable<z.ZodNativeEnum<typeof import("./schemas").EModelEndpoint>>;
    endpointType: z.ZodOptional<z.ZodNullable<z.ZodNativeEnum<typeof import("./schemas").EModelEndpoint>>>;
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
}, "model" | "modelLabel" | "promptPrefix" | "temperature" | "topP" | "topK" | "maxOutputTokens" | "maxContextTokens" | "examples">, "strip", z.ZodTypeAny, {
    model?: string | null | undefined;
    modelLabel?: string | null | undefined;
    promptPrefix?: string | null | undefined;
    temperature?: number | null | undefined;
    topP?: number | undefined;
    topK?: number | undefined;
    maxOutputTokens?: number | null | undefined;
    maxContextTokens?: number | undefined;
    examples?: {
        input: {
            content: string;
        };
        output: {
            content: string;
        };
    }[] | undefined;
}, {
    model?: string | null | undefined;
    modelLabel?: string | null | undefined;
    promptPrefix?: string | null | undefined;
    temperature?: number | null | undefined;
    topP?: number | undefined;
    topK?: number | undefined;
    maxOutputTokens?: string | number | null | undefined;
    maxContextTokens?: string | number | undefined;
    examples?: {
        input: {
            content: string;
        };
        output: {
            content: string;
        };
    }[] | undefined;
}>, {
    model: string;
    modelLabel: string | null;
    promptPrefix: string | null;
    examples: {
        input: {
            content: string;
        };
        output: {
            content: string;
        };
    }[];
    temperature: number;
    maxOutputTokens: number;
    topP: number;
    topK: number;
    maxContextTokens: number | undefined;
}, {
    model?: string | null | undefined;
    modelLabel?: string | null | undefined;
    promptPrefix?: string | null | undefined;
    temperature?: number | null | undefined;
    topP?: number | undefined;
    topK?: number | undefined;
    maxOutputTokens?: string | number | null | undefined;
    maxContextTokens?: string | number | undefined;
    examples?: {
        input: {
            content: string;
        };
        output: {
            content: string;
        };
    }[] | undefined;
}>>;
