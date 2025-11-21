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
import type { QueryOptions } from 'mongoose';
import { IToken, TokenCreateData, TokenQuery, TokenUpdateData, TokenDeleteResult } from '~/types';
export declare function createTokenMethods(mongoose: typeof import('mongoose')): {
    findToken: (query: TokenQuery, options?: QueryOptions) => Promise<IToken | null>;
    createToken: (tokenData: TokenCreateData) => Promise<IToken>;
    updateToken: (query: TokenQuery, updateData: TokenUpdateData) => Promise<IToken | null>;
    deleteTokens: (query: TokenQuery) => Promise<TokenDeleteResult>;
};
export type TokenMethods = ReturnType<typeof createTokenMethods>;
