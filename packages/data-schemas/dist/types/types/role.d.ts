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
import { PermissionTypes, Permissions } from 'librechat-data-provider';
import type { DeepPartial } from 'librechat-data-provider';
import type { Document } from 'mongoose';
import { CursorPaginationParams } from '~/common';
export interface IRole extends Document {
    name: string;
    permissions: {
        [PermissionTypes.BOOKMARKS]?: {
            [Permissions.USE]?: boolean;
        };
        [PermissionTypes.PROMPTS]?: {
            [Permissions.SHARED_GLOBAL]?: boolean;
            [Permissions.USE]?: boolean;
            [Permissions.CREATE]?: boolean;
        };
        [PermissionTypes.MEMORIES]?: {
            [Permissions.USE]?: boolean;
            [Permissions.CREATE]?: boolean;
            [Permissions.UPDATE]?: boolean;
            [Permissions.READ]?: boolean;
        };
        [PermissionTypes.AGENTS]?: {
            [Permissions.SHARED_GLOBAL]?: boolean;
            [Permissions.USE]?: boolean;
            [Permissions.CREATE]?: boolean;
        };
        [PermissionTypes.MULTI_CONVO]?: {
            [Permissions.USE]?: boolean;
        };
        [PermissionTypes.TEMPORARY_CHAT]?: {
            [Permissions.USE]?: boolean;
        };
        [PermissionTypes.RUN_CODE]?: {
            [Permissions.USE]?: boolean;
        };
        [PermissionTypes.WEB_SEARCH]?: {
            [Permissions.USE]?: boolean;
        };
        [PermissionTypes.PEOPLE_PICKER]?: {
            [Permissions.VIEW_USERS]?: boolean;
            [Permissions.VIEW_GROUPS]?: boolean;
            [Permissions.VIEW_ROLES]?: boolean;
        };
        [PermissionTypes.MARKETPLACE]?: {
            [Permissions.USE]?: boolean;
        };
        [PermissionTypes.FILE_SEARCH]?: {
            [Permissions.USE]?: boolean;
        };
        [PermissionTypes.FILE_CITATIONS]?: {
            [Permissions.USE]?: boolean;
        };
    };
}
export type RolePermissions = IRole['permissions'];
export type RolePermissionsInput = DeepPartial<RolePermissions>;
export interface CreateRoleRequest {
    name: string;
    permissions: RolePermissionsInput;
}
export interface UpdateRoleRequest {
    name?: string;
    permissions?: RolePermissionsInput;
}
export interface RoleFilterOptions extends CursorPaginationParams {
    search?: string;
    hasPermission?: string;
}
