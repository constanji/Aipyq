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
import { Schema, Document, Types } from 'mongoose';
export interface ITransaction extends Document {
    user: Types.ObjectId;
    conversationId?: string;
    tokenType: 'prompt' | 'completion' | 'credits';
    model?: string;
    context?: string;
    valueKey?: string;
    rate?: number;
    rawAmount?: number;
    tokenValue?: number;
    inputTokens?: number;
    writeTokens?: number;
    readTokens?: number;
    createdAt?: Date;
    updatedAt?: Date;
}
declare const transactionSchema: Schema<ITransaction>;
export default transactionSchema;
