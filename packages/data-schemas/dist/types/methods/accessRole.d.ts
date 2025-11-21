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
import { PermissionBits } from 'librechat-data-provider';
import type { Types, DeleteResult } from 'mongoose';
import type { IAccessRole } from '~/types';
import { RoleBits } from '~/common';
export declare function createAccessRoleMethods(mongoose: typeof import('mongoose')): {
    createRole: (roleData: Partial<IAccessRole>) => Promise<IAccessRole>;
    updateRole: (accessRoleId: string | Types.ObjectId, updateData: Partial<IAccessRole>) => Promise<IAccessRole | null>;
    deleteRole: (accessRoleId: string | Types.ObjectId) => Promise<DeleteResult>;
    getAllRoles: () => Promise<IAccessRole[]>;
    findRoleById: (roleId: string | Types.ObjectId) => Promise<IAccessRole | null>;
    seedDefaultRoles: () => Promise<Record<string, IAccessRole>>;
    findRoleByIdentifier: (accessRoleId: string | Types.ObjectId) => Promise<IAccessRole | null>;
    getRoleForPermissions: (resourceType: string, permBits: PermissionBits | RoleBits) => Promise<IAccessRole | null>;
    findRoleByPermissions: (resourceType: string, permBits: PermissionBits | RoleBits) => Promise<IAccessRole | null>;
    findRolesByResourceType: (resourceType: string) => Promise<IAccessRole[]>;
};
export type AccessRoleMethods = ReturnType<typeof createAccessRoleMethods>;
