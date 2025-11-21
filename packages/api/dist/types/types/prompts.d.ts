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
import type { IPromptGroup as IPromptGroup } from '@librechat/data-schemas';
import type { Types } from 'mongoose';
export interface PromptGroupsListResponse {
    promptGroups: IPromptGroup[];
    pageNumber: string;
    pageSize: string;
    pages: string;
    has_more: boolean;
    after: string | null;
}
export interface PromptGroupsAllResponse {
    data: IPromptGroup[];
}
export interface AccessiblePromptGroupsResult {
    object: 'list';
    data: IPromptGroup[];
    first_id: Types.ObjectId | null;
    last_id: Types.ObjectId | null;
    has_more: boolean;
    after: string | null;
}
//# sourceMappingURL=prompts.d.ts.map