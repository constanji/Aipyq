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
export interface IMongoFile extends Omit<Document, 'model'> {
    user: Types.ObjectId;
    conversationId?: string;
    file_id: string;
    temp_file_id?: string;
    bytes: number;
    text?: string;
    filename: string;
    filepath: string;
    object: 'file';
    embedded?: boolean;
    type: string;
    context?: string;
    usage: number;
    source: string;
    model?: string;
    width?: number;
    height?: number;
    metadata?: {
        fileIdentifier?: string;
    };
    expiresAt?: Date;
    createdAt?: Date;
    updatedAt?: Date;
}
