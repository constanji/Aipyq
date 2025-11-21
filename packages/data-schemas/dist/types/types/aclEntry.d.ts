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
import { PrincipalType, PrincipalModel, ResourceType } from 'librechat-data-provider';
export type AclEntry = {
    /** The type of principal (PrincipalType.USER, PrincipalType.GROUP, PrincipalType.PUBLIC) */
    principalType: PrincipalType;
    /** The ID of the principal (null for PrincipalType.PUBLIC, string for PrincipalType.ROLE) */
    principalId?: Types.ObjectId | string;
    /** The model name for the principal (`PrincipalModel`) */
    principalModel?: PrincipalModel;
    /** The type of resource (`ResourceType`) */
    resourceType: ResourceType;
    /** The ID of the resource */
    resourceId: Types.ObjectId;
    /** Permission bits for this entry */
    permBits: number;
    /** Optional role ID for predefined roles */
    roleId?: Types.ObjectId;
    /** ID of the resource this permission is inherited from */
    inheritedFrom?: Types.ObjectId;
    /** ID of the user who granted this permission */
    grantedBy?: Types.ObjectId;
    /** When this permission was granted */
    grantedAt?: Date;
};
export type IAclEntry = AclEntry & Document & {
    _id: Types.ObjectId;
};
