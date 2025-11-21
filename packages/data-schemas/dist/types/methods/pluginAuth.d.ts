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
import type { DeleteResult } from 'mongoose';
import type { FindPluginAuthsByKeysParams, UpdatePluginAuthParams, DeletePluginAuthParams, FindPluginAuthParams, IPluginAuth } from '~/types';
export declare function createPluginAuthMethods(mongoose: typeof import('mongoose')): {
    findOnePluginAuth: ({ userId, authField, pluginKey, }: FindPluginAuthParams) => Promise<IPluginAuth | null>;
    findPluginAuthsByKeys: ({ userId, pluginKeys, }: FindPluginAuthsByKeysParams) => Promise<IPluginAuth[]>;
    updatePluginAuth: ({ userId, authField, pluginKey, value, }: UpdatePluginAuthParams) => Promise<IPluginAuth>;
    deletePluginAuth: ({ userId, authField, pluginKey, all, }: DeletePluginAuthParams) => Promise<DeleteResult>;
    deleteAllUserPluginAuths: (userId: string) => Promise<DeleteResult>;
};
export type PluginAuthMethods = ReturnType<typeof createPluginAuthMethods>;
