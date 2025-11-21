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
import type { IAgentCategory } from '~/types';
export declare function createAgentCategoryMethods(mongoose: typeof import('mongoose')): {
    getActiveCategories: () => Promise<IAgentCategory[]>;
    getCategoriesWithCounts: () => Promise<(IAgentCategory & {
        agentCount: number;
    })[]>;
    getValidCategoryValues: () => Promise<string[]>;
    seedCategories: (categories: Array<{
        value: string;
        label?: string;
        description?: string;
        order?: number;
        custom?: boolean;
    }>) => Promise<import('mongoose').mongo.BulkWriteResult>;
    findCategoryByValue: (value: string) => Promise<IAgentCategory | null>;
    createCategory: (categoryData: Partial<IAgentCategory>) => Promise<IAgentCategory>;
    updateCategory: (value: string, updateData: Partial<IAgentCategory>) => Promise<IAgentCategory | null>;
    deleteCategory: (value: string) => Promise<boolean>;
    findCategoryById: (id: string | Types.ObjectId) => Promise<IAgentCategory | null>;
    getAllCategories: () => Promise<IAgentCategory[]>;
    ensureDefaultCategories: () => Promise<boolean>;
};
export type AgentCategoryMethods = ReturnType<typeof createAgentCategoryMethods>;
