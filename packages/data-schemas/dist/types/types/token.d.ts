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
import { Document, Types } from 'mongoose';
export interface IToken extends Document {
    userId: Types.ObjectId;
    email?: string;
    type?: string;
    identifier?: string;
    token: string;
    createdAt: Date;
    expiresAt: Date;
    metadata?: Map<string, unknown>;
}
export interface TokenCreateData {
    userId: Types.ObjectId | string;
    email?: string;
    type?: string;
    identifier?: string;
    token: string;
    expiresIn: number;
    metadata?: Map<string, unknown>;
}
export interface TokenQuery {
    userId?: Types.ObjectId | string;
    token?: string;
    email?: string;
    identifier?: string;
}
export interface TokenUpdateData {
    email?: string;
    type?: string;
    identifier?: string;
    token?: string;
    expiresAt?: Date;
    metadata?: Map<string, unknown>;
}
export interface TokenDeleteResult {
    deletedCount?: number;
}
