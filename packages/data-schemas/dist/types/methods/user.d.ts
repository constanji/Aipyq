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
import { FilterQuery } from 'mongoose';
import type { IUser, BalanceConfig, CreateUserRequest, UserDeleteResult } from '~/types';
/** Factory function that takes mongoose instance and returns the methods */
export declare function createUserMethods(mongoose: typeof import('mongoose')): {
    findUser: (searchCriteria: FilterQuery<IUser>, fieldsToSelect?: string | string[] | null) => Promise<IUser | null>;
    countUsers: (filter?: FilterQuery<IUser>) => Promise<number>;
    createUser: (data: CreateUserRequest, balanceConfig?: BalanceConfig, disableTTL?: boolean, returnUser?: boolean) => Promise<mongoose.Types.ObjectId | Partial<IUser>>;
    updateUser: (userId: string, updateData: Partial<IUser>) => Promise<IUser | null>;
    searchUsers: ({ searchPattern, limit, fieldsToSelect, }: {
        searchPattern: string;
        limit?: number | undefined;
        fieldsToSelect?: string | string[] | null | undefined;
    }) => Promise<{
        _id: unknown;
        __v: number;
    }[]>;
    getUserById: (userId: string, fieldsToSelect?: string | string[] | null) => Promise<IUser | null>;
    generateToken: (user: IUser) => Promise<string>;
    deleteUserById: (userId: string) => Promise<UserDeleteResult>;
    toggleUserMemories: (userId: string, memoriesEnabled: boolean) => Promise<IUser | null>;
};
export type UserMethods = ReturnType<typeof createUserMethods>;
