/// <reference types="mongoose/types/types" />
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
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
/// <reference types="mongoose/types/inferrawdoctype" />
import type { IPromptGroupDocument as IPromptGroup } from '@librechat/data-schemas';
import type { Types } from 'mongoose';
import type { PromptGroupsListResponse } from '~/types';
/**
 * Formats prompt groups for the paginated /groups endpoint response
 */
export declare function formatPromptGroupsResponse({ promptGroups, pageNumber, pageSize, actualLimit, hasMore, after, }: {
    promptGroups: IPromptGroup[];
    pageNumber?: string;
    pageSize?: string;
    actualLimit?: string | number;
    hasMore?: boolean;
    after?: string | null;
}): PromptGroupsListResponse;
/**
 * Creates an empty response for the paginated /groups endpoint
 */
export declare function createEmptyPromptGroupsResponse({ pageNumber, pageSize, actualLimit, }: {
    pageNumber?: string;
    pageSize?: string;
    actualLimit?: string | number;
}): PromptGroupsListResponse;
/**
 * Marks prompt groups as public based on the publicly accessible IDs
 */
export declare function markPublicPromptGroups(promptGroups: IPromptGroup[], publiclyAccessibleIds: Types.ObjectId[]): IPromptGroup[];
/**
 * Builds filter object for prompt group queries
 */
export declare function buildPromptGroupFilter({ name, category, ...otherFilters }: {
    name?: string;
    category?: string;
    [key: string]: string | number | boolean | RegExp | undefined;
}): {
    filter: Record<string, string | number | boolean | RegExp | undefined>;
    searchShared: boolean;
    searchSharedOnly: boolean;
};
/**
 * Filters accessible IDs based on shared/public prompts logic
 */
export declare function filterAccessibleIdsBySharedLogic({ accessibleIds, searchShared, searchSharedOnly, publicPromptGroupIds, }: {
    accessibleIds: Types.ObjectId[];
    searchShared: boolean;
    searchSharedOnly: boolean;
    publicPromptGroupIds?: Types.ObjectId[];
}): Promise<Types.ObjectId[]>;
//# sourceMappingURL=format.d.ts.map