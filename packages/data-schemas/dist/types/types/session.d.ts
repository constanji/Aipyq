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
import type { Document, Types } from 'mongoose';
export interface ISession extends Document {
    refreshTokenHash: string;
    expiration: Date;
    user: Types.ObjectId;
}
export interface CreateSessionOptions {
    expiration?: Date;
}
export interface SessionSearchParams {
    refreshToken?: string;
    userId?: string;
    sessionId?: string | {
        sessionId: string;
    };
}
export interface SessionQueryOptions {
    lean?: boolean;
}
export interface DeleteSessionParams {
    refreshToken?: string;
    sessionId?: string;
}
export interface DeleteAllSessionsOptions {
    excludeCurrentSession?: boolean;
    currentSessionId?: string;
}
export interface SessionResult {
    session: Partial<ISession>;
    refreshToken: string;
}
export interface SignPayloadParams {
    payload: Record<string, unknown>;
    secret?: string;
    expirationTime: number;
}
