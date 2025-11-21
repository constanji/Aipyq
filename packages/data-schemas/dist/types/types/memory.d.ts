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
import type { Types, Document } from 'mongoose';
export interface IMemoryEntry extends Document {
    userId: Types.ObjectId;
    key: string;
    value: string;
    tokenCount?: number;
    updated_at?: Date;
}
export interface IMemoryEntryLean {
    _id: Types.ObjectId;
    userId: Types.ObjectId;
    key: string;
    value: string;
    tokenCount?: number;
    updated_at?: Date;
    __v?: number;
}
export interface SetMemoryParams {
    userId: string | Types.ObjectId;
    key: string;
    value: string;
    tokenCount?: number;
}
export interface DeleteMemoryParams {
    userId: string | Types.ObjectId;
    key: string;
}
export interface GetFormattedMemoriesParams {
    userId: string | Types.ObjectId;
}
export interface MemoryResult {
    ok: boolean;
}
export interface FormattedMemoriesResult {
    withKeys: string;
    withoutKeys: string;
    totalTokens?: number;
}
