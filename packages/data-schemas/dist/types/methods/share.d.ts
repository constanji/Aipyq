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
import type * as t from '~/types';
/** Factory function that takes mongoose instance and returns the methods */
export declare function createShareMethods(mongoose: typeof import('mongoose')): {
    getSharedLink: (user: string, conversationId: string) => Promise<t.GetShareLinkResult>;
    getSharedLinks: (user: string, pageParam?: Date, pageSize?: number, isPublic?: boolean, sortBy?: string, sortDirection?: string, search?: string) => Promise<t.SharedLinksResult>;
    createSharedLink: (user: string, conversationId: string, targetMessageId?: string) => Promise<t.CreateShareResult>;
    updateSharedLink: (user: string, shareId: string) => Promise<t.UpdateShareResult>;
    deleteSharedLink: (user: string, shareId: string) => Promise<t.DeleteShareResult | null>;
    getSharedMessages: (shareId: string) => Promise<t.SharedMessagesResult | null>;
    deleteAllSharedLinks: (user: string) => Promise<t.DeleteAllSharesResult>;
    deleteConvoSharedLink: (user: string, conversationId: string) => Promise<t.DeleteAllSharesResult>;
};
export type ShareMethods = ReturnType<typeof createShareMethods>;
