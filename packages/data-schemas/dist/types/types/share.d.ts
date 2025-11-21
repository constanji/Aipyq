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
import type { Types } from 'mongoose';
import type { IMessage } from './message';
export interface ISharedLink {
    _id?: Types.ObjectId;
    conversationId: string;
    title?: string;
    user?: string;
    messages?: Types.ObjectId[];
    shareId?: string;
    targetMessageId?: string;
    isPublic: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}
export interface ShareServiceError extends Error {
    code: string;
}
export interface SharedLinksResult {
    links: Array<{
        shareId: string;
        title: string;
        isPublic: boolean;
        createdAt: Date;
        conversationId: string;
    }>;
    nextCursor?: Date;
    hasNextPage: boolean;
}
export interface SharedMessagesResult {
    conversationId: string;
    messages: Array<IMessage>;
    shareId: string;
    title?: string;
    isPublic: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}
export interface CreateShareResult {
    shareId: string;
    conversationId: string;
}
export interface UpdateShareResult {
    shareId: string;
    conversationId: string;
}
export interface DeleteShareResult {
    success: boolean;
    shareId: string;
    message: string;
}
export interface GetShareLinkResult {
    shareId: string | null;
    success: boolean;
}
export interface DeleteAllSharesResult {
    message: string;
    deletedCount: number;
}
