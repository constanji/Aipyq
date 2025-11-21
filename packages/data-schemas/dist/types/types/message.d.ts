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
import type { Document } from 'mongoose';
import type { TFeedbackRating, TFeedbackTag } from 'librechat-data-provider';
export interface IMessage extends Document {
    messageId: string;
    conversationId: string;
    user: string;
    model?: string;
    endpoint?: string;
    conversationSignature?: string;
    clientId?: string;
    invocationId?: number;
    parentMessageId?: string;
    tokenCount?: number;
    summaryTokenCount?: number;
    sender?: string;
    text?: string;
    summary?: string;
    isCreatedByUser: boolean;
    unfinished?: boolean;
    error?: boolean;
    finish_reason?: string;
    feedback?: {
        rating: TFeedbackRating;
        tag: TFeedbackTag | undefined;
        text?: string;
    };
    _meiliIndex?: boolean;
    files?: unknown[];
    plugin?: {
        latest?: string;
        inputs?: unknown[];
        outputs?: string;
    };
    plugins?: unknown[];
    content?: unknown[];
    thread_id?: string;
    iconURL?: string;
    attachments?: unknown[];
    expiredAt?: Date;
    createdAt?: Date;
    updatedAt?: Date;
}
