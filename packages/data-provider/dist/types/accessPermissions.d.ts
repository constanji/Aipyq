import { z } from 'zod';
/**
 * Granular Permission System Types for Agent Sharing
 *
 * This file contains TypeScript interfaces and Zod schemas for the enhanced
 * agent permission system that supports sharing with specific users/groups
 * and Entra ID integration.
 */
/**
 * Principal types for permission system
 */
export declare enum PrincipalType {
    USER = "user",
    GROUP = "group",
    PUBLIC = "public",
    ROLE = "role"
}
/**
 * Principal model types for MongoDB references
 */
export declare enum PrincipalModel {
    USER = "User",
    GROUP = "Group",
    ROLE = "Role"
}
/**
 * Source of the principal (local LibreChat or external Entra ID)
 */
export type TPrincipalSource = 'local' | 'entra';
/**
 * Access levels for agents
 */
export type TAccessLevel = 'none' | 'viewer' | 'editor' | 'owner';
/**
 * Resource types for permission system
 */
export declare enum ResourceType {
    AGENT = "agent",
    PROMPTGROUP = "promptGroup"
}
/**
 * Permission bit constants for bitwise operations
 */
export declare enum PermissionBits {
    /** 001 - Can view and use agent */
    VIEW = 1,
    /**  010 - Can modify agent settings */
    EDIT = 2,
    /**  100 - Can delete agent */
    DELETE = 4,
    /**  1000 - Can share agent with others (future) */
    SHARE = 8
}
/**
 * Standard access role IDs
 */
export declare enum AccessRoleIds {
    AGENT_VIEWER = "agent_viewer",
    AGENT_EDITOR = "agent_editor",
    AGENT_OWNER = "agent_owner",
    PROMPTGROUP_VIEWER = "promptGroup_viewer",
    PROMPTGROUP_EDITOR = "promptGroup_editor",
    PROMPTGROUP_OWNER = "promptGroup_owner"
}
/**
 * Principal schema - represents a user, group, role, or public access
 */
export declare const principalSchema: z.ZodObject<{
    type: z.ZodNativeEnum<typeof PrincipalType>;
    id: z.ZodOptional<z.ZodString>;
    name: z.ZodOptional<z.ZodString>;
    email: z.ZodOptional<z.ZodString>;
    source: z.ZodOptional<z.ZodEnum<["local", "entra"]>>;
    avatar: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    idOnTheSource: z.ZodOptional<z.ZodString>;
    accessRoleId: z.ZodOptional<z.ZodNativeEnum<typeof AccessRoleIds>>;
    memberCount: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    type: PrincipalType;
    id?: string | undefined;
    name?: string | undefined;
    email?: string | undefined;
    source?: "local" | "entra" | undefined;
    avatar?: string | undefined;
    description?: string | undefined;
    idOnTheSource?: string | undefined;
    accessRoleId?: AccessRoleIds | undefined;
    memberCount?: number | undefined;
}, {
    type: PrincipalType;
    id?: string | undefined;
    name?: string | undefined;
    email?: string | undefined;
    source?: "local" | "entra" | undefined;
    avatar?: string | undefined;
    description?: string | undefined;
    idOnTheSource?: string | undefined;
    accessRoleId?: AccessRoleIds | undefined;
    memberCount?: number | undefined;
}>;
/**
 * Access role schema - defines named permission sets
 */
export declare const accessRoleSchema: z.ZodObject<{
    accessRoleId: z.ZodNativeEnum<typeof AccessRoleIds>;
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    resourceType: z.ZodDefault<z.ZodNativeEnum<typeof ResourceType>>;
    permBits: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    name: string;
    accessRoleId: AccessRoleIds;
    resourceType: ResourceType;
    permBits: number;
    description?: string | undefined;
}, {
    name: string;
    accessRoleId: AccessRoleIds;
    permBits: number;
    description?: string | undefined;
    resourceType?: ResourceType | undefined;
}>;
/**
 * Permission entry schema - represents a single ACL entry
 */
export declare const permissionEntrySchema: z.ZodObject<{
    id: z.ZodString;
    principalType: z.ZodNativeEnum<typeof PrincipalType>;
    principalId: z.ZodOptional<z.ZodString>;
    principalName: z.ZodOptional<z.ZodString>;
    role: z.ZodObject<{
        accessRoleId: z.ZodNativeEnum<typeof AccessRoleIds>;
        name: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
        resourceType: z.ZodDefault<z.ZodNativeEnum<typeof ResourceType>>;
        permBits: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        name: string;
        accessRoleId: AccessRoleIds;
        resourceType: ResourceType;
        permBits: number;
        description?: string | undefined;
    }, {
        name: string;
        accessRoleId: AccessRoleIds;
        permBits: number;
        description?: string | undefined;
        resourceType?: ResourceType | undefined;
    }>;
    grantedBy: z.ZodString;
    grantedAt: z.ZodString;
    inheritedFrom: z.ZodOptional<z.ZodString>;
    source: z.ZodOptional<z.ZodEnum<["local", "entra"]>>;
}, "strip", z.ZodTypeAny, {
    role: {
        name: string;
        accessRoleId: AccessRoleIds;
        resourceType: ResourceType;
        permBits: number;
        description?: string | undefined;
    };
    id: string;
    principalType: PrincipalType;
    grantedBy: string;
    grantedAt: string;
    source?: "local" | "entra" | undefined;
    principalId?: string | undefined;
    principalName?: string | undefined;
    inheritedFrom?: string | undefined;
}, {
    role: {
        name: string;
        accessRoleId: AccessRoleIds;
        permBits: number;
        description?: string | undefined;
        resourceType?: ResourceType | undefined;
    };
    id: string;
    principalType: PrincipalType;
    grantedBy: string;
    grantedAt: string;
    source?: "local" | "entra" | undefined;
    principalId?: string | undefined;
    principalName?: string | undefined;
    inheritedFrom?: string | undefined;
}>;
/**
 * Resource permissions response schema
 */
export declare const resourcePermissionsResponseSchema: z.ZodObject<{
    resourceType: z.ZodNativeEnum<typeof ResourceType>;
    resourceId: z.ZodString;
    permissions: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        principalType: z.ZodNativeEnum<typeof PrincipalType>;
        principalId: z.ZodOptional<z.ZodString>;
        principalName: z.ZodOptional<z.ZodString>;
        role: z.ZodObject<{
            accessRoleId: z.ZodNativeEnum<typeof AccessRoleIds>;
            name: z.ZodString;
            description: z.ZodOptional<z.ZodString>;
            resourceType: z.ZodDefault<z.ZodNativeEnum<typeof ResourceType>>;
            permBits: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            name: string;
            accessRoleId: AccessRoleIds;
            resourceType: ResourceType;
            permBits: number;
            description?: string | undefined;
        }, {
            name: string;
            accessRoleId: AccessRoleIds;
            permBits: number;
            description?: string | undefined;
            resourceType?: ResourceType | undefined;
        }>;
        grantedBy: z.ZodString;
        grantedAt: z.ZodString;
        inheritedFrom: z.ZodOptional<z.ZodString>;
        source: z.ZodOptional<z.ZodEnum<["local", "entra"]>>;
    }, "strip", z.ZodTypeAny, {
        role: {
            name: string;
            accessRoleId: AccessRoleIds;
            resourceType: ResourceType;
            permBits: number;
            description?: string | undefined;
        };
        id: string;
        principalType: PrincipalType;
        grantedBy: string;
        grantedAt: string;
        source?: "local" | "entra" | undefined;
        principalId?: string | undefined;
        principalName?: string | undefined;
        inheritedFrom?: string | undefined;
    }, {
        role: {
            name: string;
            accessRoleId: AccessRoleIds;
            permBits: number;
            description?: string | undefined;
            resourceType?: ResourceType | undefined;
        };
        id: string;
        principalType: PrincipalType;
        grantedBy: string;
        grantedAt: string;
        source?: "local" | "entra" | undefined;
        principalId?: string | undefined;
        principalName?: string | undefined;
        inheritedFrom?: string | undefined;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    resourceType: ResourceType;
    resourceId: string;
    permissions: {
        role: {
            name: string;
            accessRoleId: AccessRoleIds;
            resourceType: ResourceType;
            permBits: number;
            description?: string | undefined;
        };
        id: string;
        principalType: PrincipalType;
        grantedBy: string;
        grantedAt: string;
        source?: "local" | "entra" | undefined;
        principalId?: string | undefined;
        principalName?: string | undefined;
        inheritedFrom?: string | undefined;
    }[];
}, {
    resourceType: ResourceType;
    resourceId: string;
    permissions: {
        role: {
            name: string;
            accessRoleId: AccessRoleIds;
            permBits: number;
            description?: string | undefined;
            resourceType?: ResourceType | undefined;
        };
        id: string;
        principalType: PrincipalType;
        grantedBy: string;
        grantedAt: string;
        source?: "local" | "entra" | undefined;
        principalId?: string | undefined;
        principalName?: string | undefined;
        inheritedFrom?: string | undefined;
    }[];
}>;
/**
 * Update resource permissions request schema
 * This matches the user's requirement for the frontend DTO structure
 */
export declare const updateResourcePermissionsRequestSchema: z.ZodObject<{
    updated: z.ZodArray<z.ZodObject<{
        type: z.ZodNativeEnum<typeof PrincipalType>;
        id: z.ZodOptional<z.ZodString>;
        name: z.ZodOptional<z.ZodString>;
        email: z.ZodOptional<z.ZodString>;
        source: z.ZodOptional<z.ZodEnum<["local", "entra"]>>;
        avatar: z.ZodOptional<z.ZodString>;
        description: z.ZodOptional<z.ZodString>;
        idOnTheSource: z.ZodOptional<z.ZodString>;
        accessRoleId: z.ZodOptional<z.ZodNativeEnum<typeof AccessRoleIds>>;
        memberCount: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        type: PrincipalType;
        id?: string | undefined;
        name?: string | undefined;
        email?: string | undefined;
        source?: "local" | "entra" | undefined;
        avatar?: string | undefined;
        description?: string | undefined;
        idOnTheSource?: string | undefined;
        accessRoleId?: AccessRoleIds | undefined;
        memberCount?: number | undefined;
    }, {
        type: PrincipalType;
        id?: string | undefined;
        name?: string | undefined;
        email?: string | undefined;
        source?: "local" | "entra" | undefined;
        avatar?: string | undefined;
        description?: string | undefined;
        idOnTheSource?: string | undefined;
        accessRoleId?: AccessRoleIds | undefined;
        memberCount?: number | undefined;
    }>, "many">;
    removed: z.ZodArray<z.ZodObject<{
        type: z.ZodNativeEnum<typeof PrincipalType>;
        id: z.ZodOptional<z.ZodString>;
        name: z.ZodOptional<z.ZodString>;
        email: z.ZodOptional<z.ZodString>;
        source: z.ZodOptional<z.ZodEnum<["local", "entra"]>>;
        avatar: z.ZodOptional<z.ZodString>;
        description: z.ZodOptional<z.ZodString>;
        idOnTheSource: z.ZodOptional<z.ZodString>;
        accessRoleId: z.ZodOptional<z.ZodNativeEnum<typeof AccessRoleIds>>;
        memberCount: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        type: PrincipalType;
        id?: string | undefined;
        name?: string | undefined;
        email?: string | undefined;
        source?: "local" | "entra" | undefined;
        avatar?: string | undefined;
        description?: string | undefined;
        idOnTheSource?: string | undefined;
        accessRoleId?: AccessRoleIds | undefined;
        memberCount?: number | undefined;
    }, {
        type: PrincipalType;
        id?: string | undefined;
        name?: string | undefined;
        email?: string | undefined;
        source?: "local" | "entra" | undefined;
        avatar?: string | undefined;
        description?: string | undefined;
        idOnTheSource?: string | undefined;
        accessRoleId?: AccessRoleIds | undefined;
        memberCount?: number | undefined;
    }>, "many">;
    public: z.ZodBoolean;
    publicAccessRoleId: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    public: boolean;
    updated: {
        type: PrincipalType;
        id?: string | undefined;
        name?: string | undefined;
        email?: string | undefined;
        source?: "local" | "entra" | undefined;
        avatar?: string | undefined;
        description?: string | undefined;
        idOnTheSource?: string | undefined;
        accessRoleId?: AccessRoleIds | undefined;
        memberCount?: number | undefined;
    }[];
    removed: {
        type: PrincipalType;
        id?: string | undefined;
        name?: string | undefined;
        email?: string | undefined;
        source?: "local" | "entra" | undefined;
        avatar?: string | undefined;
        description?: string | undefined;
        idOnTheSource?: string | undefined;
        accessRoleId?: AccessRoleIds | undefined;
        memberCount?: number | undefined;
    }[];
    publicAccessRoleId?: string | undefined;
}, {
    public: boolean;
    updated: {
        type: PrincipalType;
        id?: string | undefined;
        name?: string | undefined;
        email?: string | undefined;
        source?: "local" | "entra" | undefined;
        avatar?: string | undefined;
        description?: string | undefined;
        idOnTheSource?: string | undefined;
        accessRoleId?: AccessRoleIds | undefined;
        memberCount?: number | undefined;
    }[];
    removed: {
        type: PrincipalType;
        id?: string | undefined;
        name?: string | undefined;
        email?: string | undefined;
        source?: "local" | "entra" | undefined;
        avatar?: string | undefined;
        description?: string | undefined;
        idOnTheSource?: string | undefined;
        accessRoleId?: AccessRoleIds | undefined;
        memberCount?: number | undefined;
    }[];
    publicAccessRoleId?: string | undefined;
}>;
/**
 * Update resource permissions response schema
 * Returns the updated permissions with accessRoleId included
 */
export declare const updateResourcePermissionsResponseSchema: z.ZodObject<{
    message: z.ZodString;
    results: z.ZodObject<{
        principals: z.ZodArray<z.ZodObject<{
            type: z.ZodNativeEnum<typeof PrincipalType>;
            id: z.ZodOptional<z.ZodString>;
            name: z.ZodOptional<z.ZodString>;
            email: z.ZodOptional<z.ZodString>;
            source: z.ZodOptional<z.ZodEnum<["local", "entra"]>>;
            avatar: z.ZodOptional<z.ZodString>;
            description: z.ZodOptional<z.ZodString>;
            idOnTheSource: z.ZodOptional<z.ZodString>;
            accessRoleId: z.ZodOptional<z.ZodNativeEnum<typeof AccessRoleIds>>;
            memberCount: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            type: PrincipalType;
            id?: string | undefined;
            name?: string | undefined;
            email?: string | undefined;
            source?: "local" | "entra" | undefined;
            avatar?: string | undefined;
            description?: string | undefined;
            idOnTheSource?: string | undefined;
            accessRoleId?: AccessRoleIds | undefined;
            memberCount?: number | undefined;
        }, {
            type: PrincipalType;
            id?: string | undefined;
            name?: string | undefined;
            email?: string | undefined;
            source?: "local" | "entra" | undefined;
            avatar?: string | undefined;
            description?: string | undefined;
            idOnTheSource?: string | undefined;
            accessRoleId?: AccessRoleIds | undefined;
            memberCount?: number | undefined;
        }>, "many">;
        public: z.ZodBoolean;
        publicAccessRoleId: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        public: boolean;
        principals: {
            type: PrincipalType;
            id?: string | undefined;
            name?: string | undefined;
            email?: string | undefined;
            source?: "local" | "entra" | undefined;
            avatar?: string | undefined;
            description?: string | undefined;
            idOnTheSource?: string | undefined;
            accessRoleId?: AccessRoleIds | undefined;
            memberCount?: number | undefined;
        }[];
        publicAccessRoleId?: string | undefined;
    }, {
        public: boolean;
        principals: {
            type: PrincipalType;
            id?: string | undefined;
            name?: string | undefined;
            email?: string | undefined;
            source?: "local" | "entra" | undefined;
            avatar?: string | undefined;
            description?: string | undefined;
            idOnTheSource?: string | undefined;
            accessRoleId?: AccessRoleIds | undefined;
            memberCount?: number | undefined;
        }[];
        publicAccessRoleId?: string | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    message: string;
    results: {
        public: boolean;
        principals: {
            type: PrincipalType;
            id?: string | undefined;
            name?: string | undefined;
            email?: string | undefined;
            source?: "local" | "entra" | undefined;
            avatar?: string | undefined;
            description?: string | undefined;
            idOnTheSource?: string | undefined;
            accessRoleId?: AccessRoleIds | undefined;
            memberCount?: number | undefined;
        }[];
        publicAccessRoleId?: string | undefined;
    };
}, {
    message: string;
    results: {
        public: boolean;
        principals: {
            type: PrincipalType;
            id?: string | undefined;
            name?: string | undefined;
            email?: string | undefined;
            source?: "local" | "entra" | undefined;
            avatar?: string | undefined;
            description?: string | undefined;
            idOnTheSource?: string | undefined;
            accessRoleId?: AccessRoleIds | undefined;
            memberCount?: number | undefined;
        }[];
        publicAccessRoleId?: string | undefined;
    };
}>;
/**
 * Principal - represents a user, group, or public access
 */
export type TPrincipal = z.infer<typeof principalSchema>;
/**
 * Access role - defines named permission sets
 */
export type TAccessRole = z.infer<typeof accessRoleSchema>;
/**
 * Permission entry - represents a single ACL entry
 */
export type TPermissionEntry = z.infer<typeof permissionEntrySchema>;
/**
 * Resource permissions response
 */
export type TResourcePermissionsResponse = z.infer<typeof resourcePermissionsResponseSchema>;
/**
 * Update resource permissions request
 * This matches the user's requirement for the frontend DTO structure
 */
export type TUpdateResourcePermissionsRequest = z.infer<typeof updateResourcePermissionsRequestSchema>;
/**
 * Update resource permissions response
 * Returns the updated permissions with accessRoleId included
 */
export type TUpdateResourcePermissionsResponse = z.infer<typeof updateResourcePermissionsResponseSchema>;
/**
 * Principal search request parameters
 */
export type TPrincipalSearchParams = {
    q: string;
    limit?: number;
    type?: PrincipalType.USER | PrincipalType.GROUP | PrincipalType.ROLE;
};
/**
 * Principal search result item
 */
export type TPrincipalSearchResult = {
    id?: string | null;
    type: PrincipalType.USER | PrincipalType.GROUP | PrincipalType.ROLE;
    name: string;
    email?: string;
    username?: string;
    avatar?: string;
    provider?: string;
    source: 'local' | 'entra';
    memberCount?: number;
    description?: string;
    idOnTheSource?: string;
};
/**
 * Principal search response
 */
export type TPrincipalSearchResponse = {
    query: string;
    limit: number;
    type?: PrincipalType.USER | PrincipalType.GROUP | PrincipalType.ROLE;
    results: TPrincipalSearchResult[];
    count: number;
    sources: {
        local: number;
        entra: number;
    };
};
/**
 * Available roles response
 */
export type TAvailableRolesResponse = {
    resourceType: ResourceType;
    roles: TAccessRole[];
};
/**
 * Get resource permissions response schema
 * This matches the enhanced aggregation-based endpoint response format
 */
export declare const getResourcePermissionsResponseSchema: z.ZodObject<{
    resourceType: z.ZodNativeEnum<typeof ResourceType>;
    resourceId: z.ZodNativeEnum<typeof AccessRoleIds>;
    principals: z.ZodArray<z.ZodObject<{
        type: z.ZodNativeEnum<typeof PrincipalType>;
        id: z.ZodOptional<z.ZodString>;
        name: z.ZodOptional<z.ZodString>;
        email: z.ZodOptional<z.ZodString>;
        source: z.ZodOptional<z.ZodEnum<["local", "entra"]>>;
        avatar: z.ZodOptional<z.ZodString>;
        description: z.ZodOptional<z.ZodString>;
        idOnTheSource: z.ZodOptional<z.ZodString>;
        accessRoleId: z.ZodOptional<z.ZodNativeEnum<typeof AccessRoleIds>>;
        memberCount: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        type: PrincipalType;
        id?: string | undefined;
        name?: string | undefined;
        email?: string | undefined;
        source?: "local" | "entra" | undefined;
        avatar?: string | undefined;
        description?: string | undefined;
        idOnTheSource?: string | undefined;
        accessRoleId?: AccessRoleIds | undefined;
        memberCount?: number | undefined;
    }, {
        type: PrincipalType;
        id?: string | undefined;
        name?: string | undefined;
        email?: string | undefined;
        source?: "local" | "entra" | undefined;
        avatar?: string | undefined;
        description?: string | undefined;
        idOnTheSource?: string | undefined;
        accessRoleId?: AccessRoleIds | undefined;
        memberCount?: number | undefined;
    }>, "many">;
    public: z.ZodBoolean;
    publicAccessRoleId: z.ZodOptional<z.ZodNativeEnum<typeof AccessRoleIds>>;
}, "strip", z.ZodTypeAny, {
    public: boolean;
    resourceType: ResourceType;
    resourceId: AccessRoleIds;
    principals: {
        type: PrincipalType;
        id?: string | undefined;
        name?: string | undefined;
        email?: string | undefined;
        source?: "local" | "entra" | undefined;
        avatar?: string | undefined;
        description?: string | undefined;
        idOnTheSource?: string | undefined;
        accessRoleId?: AccessRoleIds | undefined;
        memberCount?: number | undefined;
    }[];
    publicAccessRoleId?: AccessRoleIds | undefined;
}, {
    public: boolean;
    resourceType: ResourceType;
    resourceId: AccessRoleIds;
    principals: {
        type: PrincipalType;
        id?: string | undefined;
        name?: string | undefined;
        email?: string | undefined;
        source?: "local" | "entra" | undefined;
        avatar?: string | undefined;
        description?: string | undefined;
        idOnTheSource?: string | undefined;
        accessRoleId?: AccessRoleIds | undefined;
        memberCount?: number | undefined;
    }[];
    publicAccessRoleId?: AccessRoleIds | undefined;
}>;
/**
 * Get resource permissions response type
 * This matches the enhanced aggregation-based endpoint response format
 */
export type TGetResourcePermissionsResponse = z.infer<typeof getResourcePermissionsResponseSchema>;
/**
 * Effective permissions response schema
 * Returns just the permission bitmask for a user on a resource
 */
export declare const effectivePermissionsResponseSchema: z.ZodObject<{
    permissionBits: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    permissionBits: number;
}, {
    permissionBits: number;
}>;
/**
 * Effective permissions response type
 * Returns just the permission bitmask for a user on a resource
 */
export type TEffectivePermissionsResponse = z.infer<typeof effectivePermissionsResponseSchema>;
/**
 * Permission check result
 */
export interface TPermissionCheck {
    canView: boolean;
    canEdit: boolean;
    canDelete: boolean;
    canShare: boolean;
    accessLevel: TAccessLevel;
}
/**
 * Convert permission bits to access level
 */
export declare function permBitsToAccessLevel(permBits: number): TAccessLevel;
/**
 * Convert access role ID to permission bits
 */
export declare function accessRoleToPermBits(accessRoleId: string): number;
/**
 * Check if permission bitmask contains other bitmask
 * @param permissions - The permission bitmask to check
 * @param requiredPermission - The required permission bit(s)
 * @returns {boolean} Whether permissions contains requiredPermission
 */
export declare function hasPermissions(permissions: number, requiredPermission: number): boolean;
