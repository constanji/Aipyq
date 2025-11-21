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
import { Schema, Document } from 'mongoose';
export interface IPreset extends Document {
    presetId: string;
    title: string;
    user: string | null;
    defaultPreset?: boolean;
    order?: number;
    endpoint?: string;
    endpointType?: string;
    model?: string;
    region?: string;
    chatGptLabel?: string;
    examples?: unknown[];
    modelLabel?: string;
    promptPrefix?: string;
    temperature?: number;
    top_p?: number;
    topP?: number;
    topK?: number;
    maxOutputTokens?: number;
    maxTokens?: number;
    presence_penalty?: number;
    frequency_penalty?: number;
    file_ids?: string[];
    resendImages?: boolean;
    promptCache?: boolean;
    thinking?: boolean;
    thinkingBudget?: number;
    system?: string;
    resendFiles?: boolean;
    imageDetail?: string;
    agent_id?: string;
    assistant_id?: string;
    instructions?: string;
    stop?: string[];
    isArchived?: boolean;
    iconURL?: string;
    greeting?: string;
    spec?: string;
    tags?: string[];
    tools?: string[];
    maxContextTokens?: number;
    max_tokens?: number;
    reasoning_effort?: string;
    reasoning_summary?: string;
    verbosity?: string;
    useResponsesApi?: boolean;
    web_search?: boolean;
    disableStreaming?: boolean;
    fileTokenLimit?: number;
    agentOptions?: unknown;
}
declare const presetSchema: Schema<IPreset>;
export default presetSchema;
