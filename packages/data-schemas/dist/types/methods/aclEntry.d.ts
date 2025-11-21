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
import { Types } from 'mongoose';
import type { DeleteResult, ClientSession } from 'mongoose';
import type { IAclEntry } from '~/types';
export declare function createAclEntryMethods(mongoose: typeof import('mongoose')): {
    findEntriesByPrincipal: (principalType: string, principalId: string | Types.ObjectId, resourceType?: string) => Promise<IAclEntry[]>;
    findEntriesByResource: (resourceType: string, resourceId: string | Types.ObjectId) => Promise<IAclEntry[]>;
    findEntriesByPrincipalsAndResource: (principalsList: Array<{
        principalType: string;
        principalId?: string | Types.ObjectId;
    }>, resourceType: string, resourceId: string | Types.ObjectId) => Promise<IAclEntry[]>;
    hasPermission: (principalsList: Array<{
        principalType: string;
        principalId?: string | Types.ObjectId;
    }>, resourceType: string, resourceId: string | Types.ObjectId, permissionBit: number) => Promise<boolean>;
    getEffectivePermissions: (principalsList: Array<{
        principalType: string;
        principalId?: string | Types.ObjectId;
    }>, resourceType: string, resourceId: string | Types.ObjectId) => Promise<number>;
    grantPermission: (principalType: string, principalId: string | Types.ObjectId | null, resourceType: string, resourceId: string | Types.ObjectId, permBits: number, grantedBy: string | Types.ObjectId, session?: ClientSession, roleId?: string | Types.ObjectId) => Promise<IAclEntry | null>;
    revokePermission: (principalType: string, principalId: string | Types.ObjectId | null, resourceType: string, resourceId: string | Types.ObjectId, session?: ClientSession) => Promise<DeleteResult>;
    modifyPermissionBits: (principalType: string, principalId: string | Types.ObjectId | null, resourceType: string, resourceId: string | Types.ObjectId, addBits?: number | null, removeBits?: number | null, session?: ClientSession) => Promise<IAclEntry | null>;
    findAccessibleResources: (principalsList: Array<{
        principalType: string;
        principalId?: string | Types.ObjectId;
    }>, resourceType: string, requiredPermBit: number) => Promise<Types.ObjectId[]>;
};
export type AclEntryMethods = ReturnType<typeof createAclEntryMethods>;
