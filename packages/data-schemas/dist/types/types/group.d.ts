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
import { CursorPaginationParams } from '~/common';
export interface IGroup extends Document {
    _id: Types.ObjectId;
    name: string;
    description?: string;
    email?: string;
    avatar?: string;
    /** Array of member IDs (stores idOnTheSource values, not ObjectIds) */
    memberIds?: string[];
    source: 'local' | 'entra';
    /** External ID (e.g., Entra ID) - required for non-local sources */
    idOnTheSource?: string;
    createdAt?: Date;
    updatedAt?: Date;
}
export interface CreateGroupRequest {
    name: string;
    description?: string;
    email?: string;
    avatar?: string;
    memberIds?: string[];
    source: 'local' | 'entra';
    idOnTheSource?: string;
}
export interface UpdateGroupRequest {
    name?: string;
    description?: string;
    email?: string;
    avatar?: string;
    memberIds?: string[];
    source?: 'local' | 'entra' | 'ldap';
    idOnTheSource?: string;
}
export interface GroupFilterOptions extends CursorPaginationParams {
    search?: string;
    source?: 'local' | 'entra' | 'ldap';
    hasMember?: string;
}
