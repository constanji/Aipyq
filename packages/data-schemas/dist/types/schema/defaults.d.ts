/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
/// <reference types="mongoose/types/inferrawdoctype" />
import { Schema } from 'mongoose';
export declare const conversationPreset: {
    endpoint: {
        type: StringConstructor;
        default: null;
        required: boolean;
    };
    endpointType: {
        type: StringConstructor;
    };
    model: {
        type: StringConstructor;
        required: boolean;
    };
    region: {
        type: StringConstructor;
        required: boolean;
    };
    chatGptLabel: {
        type: StringConstructor;
        required: boolean;
    };
    examples: {
        type: {
            type: typeof Schema.Types.Mixed;
        }[];
        default: undefined;
    };
    modelLabel: {
        type: StringConstructor;
        required: boolean;
    };
    promptPrefix: {
        type: StringConstructor;
        required: boolean;
    };
    temperature: {
        type: NumberConstructor;
        required: boolean;
    };
    top_p: {
        type: NumberConstructor;
        required: boolean;
    };
    topP: {
        type: NumberConstructor;
        required: boolean;
    };
    topK: {
        type: NumberConstructor;
        required: boolean;
    };
    maxOutputTokens: {
        type: NumberConstructor;
        required: boolean;
    };
    maxTokens: {
        type: NumberConstructor;
        required: boolean;
    };
    presence_penalty: {
        type: NumberConstructor;
        required: boolean;
    };
    frequency_penalty: {
        type: NumberConstructor;
        required: boolean;
    };
    file_ids: {
        type: {
            type: StringConstructor;
        }[];
        default: undefined;
    };
    resendImages: {
        type: BooleanConstructor;
    };
    promptCache: {
        type: BooleanConstructor;
    };
    thinking: {
        type: BooleanConstructor;
    };
    thinkingBudget: {
        type: NumberConstructor;
    };
    system: {
        type: StringConstructor;
    };
    resendFiles: {
        type: BooleanConstructor;
    };
    imageDetail: {
        type: StringConstructor;
    };
    agent_id: {
        type: StringConstructor;
    };
    assistant_id: {
        type: StringConstructor;
    };
    instructions: {
        type: StringConstructor;
    };
    stop: {
        type: {
            type: StringConstructor;
        }[];
        default: undefined;
    };
    isArchived: {
        type: BooleanConstructor;
        default: boolean;
    };
    iconURL: {
        type: StringConstructor;
    };
    greeting: {
        type: StringConstructor;
    };
    spec: {
        type: StringConstructor;
    };
    tags: {
        type: StringConstructor[];
        default: never[];
    };
    tools: {
        type: {
            type: StringConstructor;
        }[];
        default: undefined;
    };
    maxContextTokens: {
        type: NumberConstructor;
    };
    max_tokens: {
        type: NumberConstructor;
    };
    useResponsesApi: {
        type: BooleanConstructor;
    };
    /** OpenAI Responses API / Anthropic API / Google API */
    web_search: {
        type: BooleanConstructor;
    };
    disableStreaming: {
        type: BooleanConstructor;
    };
    fileTokenLimit: {
        type: NumberConstructor;
    };
    /** Reasoning models only */
    reasoning_effort: {
        type: StringConstructor;
    };
    reasoning_summary: {
        type: StringConstructor;
    };
    /** Verbosity control */
    verbosity: {
        type: StringConstructor;
    };
};
