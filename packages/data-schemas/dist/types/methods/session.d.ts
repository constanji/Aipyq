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
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
/// <reference types="mongoose/types/inferrawdoctype" />
import type * as t from '~/types/session';
export declare class SessionError extends Error {
    code: string;
    constructor(message: string, code?: string);
}
export declare function createSessionMethods(mongoose: typeof import('mongoose')): {
    findSession: (params: t.SessionSearchParams, options?: t.SessionQueryOptions) => Promise<t.ISession | null>;
    SessionError: typeof SessionError;
    deleteSession: (params: t.DeleteSessionParams) => Promise<{
        deletedCount?: number;
    }>;
    createSession: (userId: string, options?: t.CreateSessionOptions) => Promise<t.SessionResult>;
    updateExpiration: (session: t.ISession | string, newExpiration?: Date) => Promise<t.ISession>;
    countActiveSessions: (userId: string) => Promise<number>;
    generateRefreshToken: (session: t.ISession) => Promise<string>;
    deleteAllUserSessions: (userId: string | {
        userId: string;
    }, options?: t.DeleteAllSessionsOptions) => Promise<{
        deletedCount?: number;
    }>;
};
export type SessionMethods = ReturnType<typeof createSessionMethods>;
