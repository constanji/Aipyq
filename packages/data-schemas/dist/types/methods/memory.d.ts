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
import { Types } from 'mongoose';
import type * as t from '~/types';
export declare function createMemoryMethods(mongoose: typeof import('mongoose')): {
    setMemory: ({ userId, key, value, tokenCount, }: t.SetMemoryParams) => Promise<t.MemoryResult>;
    createMemory: ({ userId, key, value, tokenCount, }: t.SetMemoryParams) => Promise<t.MemoryResult>;
    deleteMemory: ({ userId, key }: t.DeleteMemoryParams) => Promise<t.MemoryResult>;
    getAllUserMemories: (userId: string | Types.ObjectId) => Promise<t.IMemoryEntryLean[]>;
    getFormattedMemories: ({ userId, }: t.GetFormattedMemoriesParams) => Promise<t.FormattedMemoriesResult>;
};
export type MemoryMethods = ReturnType<typeof createMemoryMethods>;
