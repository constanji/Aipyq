import { z } from 'zod';
/**
 * Enum for Permission Types
 */
export declare enum PermissionTypes {
    /**
     * Type for Prompt Permissions
     */
    PROMPTS = "PROMPTS",
    /**
     * Type for Bookmark Permissions
     */
    BOOKMARKS = "BOOKMARKS",
    /**
     * Type for Agent Permissions
     */
    AGENTS = "AGENTS",
    /**
     * Type for Memory Permissions
     */
    MEMORIES = "MEMORIES",
    /**
     * Type for Multi-Conversation Permissions
     */
    MULTI_CONVO = "MULTI_CONVO",
    /**
     * Type for Temporary Chat
     */
    TEMPORARY_CHAT = "TEMPORARY_CHAT",
    /**
     * Type for using the "Run Code" LC Code Interpreter API feature
     */
    RUN_CODE = "RUN_CODE",
    /**
     * Type for using the "Web Search" feature
     */
    WEB_SEARCH = "WEB_SEARCH",
    /**
     * Type for People Picker Permissions
     */
    PEOPLE_PICKER = "PEOPLE_PICKER",
    /**
     * Type for Marketplace Permissions
     */
    MARKETPLACE = "MARKETPLACE",
    /**
     * Type for using the "File Search" feature
     */
    FILE_SEARCH = "FILE_SEARCH",
    /**
     * Type for using the "File Citations" feature in agents
     */
    FILE_CITATIONS = "FILE_CITATIONS"
}
/**
 * Enum for Role-Based Access Control Constants
 */
export declare enum Permissions {
    SHARED_GLOBAL = "SHARED_GLOBAL",
    USE = "USE",
    CREATE = "CREATE",
    UPDATE = "UPDATE",
    READ = "READ",
    READ_AUTHOR = "READ_AUTHOR",
    SHARE = "SHARE",
    /** Can disable if desired */
    OPT_OUT = "OPT_OUT",
    VIEW_USERS = "VIEW_USERS",
    VIEW_GROUPS = "VIEW_GROUPS",
    VIEW_ROLES = "VIEW_ROLES"
}
export declare const promptPermissionsSchema: z.ZodObject<{
    SHARED_GLOBAL: z.ZodDefault<z.ZodBoolean>;
    USE: z.ZodDefault<z.ZodBoolean>;
    CREATE: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    SHARED_GLOBAL: boolean;
    USE: boolean;
    CREATE: boolean;
}, {
    SHARED_GLOBAL?: boolean | undefined;
    USE?: boolean | undefined;
    CREATE?: boolean | undefined;
}>;
export type TPromptPermissions = z.infer<typeof promptPermissionsSchema>;
export declare const bookmarkPermissionsSchema: z.ZodObject<{
    USE: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    USE: boolean;
}, {
    USE?: boolean | undefined;
}>;
export type TBookmarkPermissions = z.infer<typeof bookmarkPermissionsSchema>;
export declare const memoryPermissionsSchema: z.ZodObject<{
    USE: z.ZodDefault<z.ZodBoolean>;
    CREATE: z.ZodDefault<z.ZodBoolean>;
    UPDATE: z.ZodDefault<z.ZodBoolean>;
    READ: z.ZodDefault<z.ZodBoolean>;
    OPT_OUT: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    USE: boolean;
    CREATE: boolean;
    UPDATE: boolean;
    READ: boolean;
    OPT_OUT: boolean;
}, {
    USE?: boolean | undefined;
    CREATE?: boolean | undefined;
    UPDATE?: boolean | undefined;
    READ?: boolean | undefined;
    OPT_OUT?: boolean | undefined;
}>;
export type TMemoryPermissions = z.infer<typeof memoryPermissionsSchema>;
export declare const agentPermissionsSchema: z.ZodObject<{
    SHARED_GLOBAL: z.ZodDefault<z.ZodBoolean>;
    USE: z.ZodDefault<z.ZodBoolean>;
    CREATE: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    SHARED_GLOBAL: boolean;
    USE: boolean;
    CREATE: boolean;
}, {
    SHARED_GLOBAL?: boolean | undefined;
    USE?: boolean | undefined;
    CREATE?: boolean | undefined;
}>;
export type TAgentPermissions = z.infer<typeof agentPermissionsSchema>;
export declare const multiConvoPermissionsSchema: z.ZodObject<{
    USE: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    USE: boolean;
}, {
    USE?: boolean | undefined;
}>;
export type TMultiConvoPermissions = z.infer<typeof multiConvoPermissionsSchema>;
export declare const temporaryChatPermissionsSchema: z.ZodObject<{
    USE: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    USE: boolean;
}, {
    USE?: boolean | undefined;
}>;
export type TTemporaryChatPermissions = z.infer<typeof temporaryChatPermissionsSchema>;
export declare const runCodePermissionsSchema: z.ZodObject<{
    USE: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    USE: boolean;
}, {
    USE?: boolean | undefined;
}>;
export type TRunCodePermissions = z.infer<typeof runCodePermissionsSchema>;
export declare const webSearchPermissionsSchema: z.ZodObject<{
    USE: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    USE: boolean;
}, {
    USE?: boolean | undefined;
}>;
export type TWebSearchPermissions = z.infer<typeof webSearchPermissionsSchema>;
export declare const peoplePickerPermissionsSchema: z.ZodObject<{
    VIEW_USERS: z.ZodDefault<z.ZodBoolean>;
    VIEW_GROUPS: z.ZodDefault<z.ZodBoolean>;
    VIEW_ROLES: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    VIEW_USERS: boolean;
    VIEW_GROUPS: boolean;
    VIEW_ROLES: boolean;
}, {
    VIEW_USERS?: boolean | undefined;
    VIEW_GROUPS?: boolean | undefined;
    VIEW_ROLES?: boolean | undefined;
}>;
export type TPeoplePickerPermissions = z.infer<typeof peoplePickerPermissionsSchema>;
export declare const marketplacePermissionsSchema: z.ZodObject<{
    USE: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    USE: boolean;
}, {
    USE?: boolean | undefined;
}>;
export type TMarketplacePermissions = z.infer<typeof marketplacePermissionsSchema>;
export declare const fileSearchPermissionsSchema: z.ZodObject<{
    USE: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    USE: boolean;
}, {
    USE?: boolean | undefined;
}>;
export type TFileSearchPermissions = z.infer<typeof fileSearchPermissionsSchema>;
export declare const fileCitationsPermissionsSchema: z.ZodObject<{
    USE: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    USE: boolean;
}, {
    USE?: boolean | undefined;
}>;
export type TFileCitationsPermissions = z.infer<typeof fileCitationsPermissionsSchema>;
export declare const permissionsSchema: z.ZodObject<{
    PROMPTS: z.ZodObject<{
        SHARED_GLOBAL: z.ZodDefault<z.ZodBoolean>;
        USE: z.ZodDefault<z.ZodBoolean>;
        CREATE: z.ZodDefault<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        SHARED_GLOBAL: boolean;
        USE: boolean;
        CREATE: boolean;
    }, {
        SHARED_GLOBAL?: boolean | undefined;
        USE?: boolean | undefined;
        CREATE?: boolean | undefined;
    }>;
    BOOKMARKS: z.ZodObject<{
        USE: z.ZodDefault<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        USE: boolean;
    }, {
        USE?: boolean | undefined;
    }>;
    MEMORIES: z.ZodObject<{
        USE: z.ZodDefault<z.ZodBoolean>;
        CREATE: z.ZodDefault<z.ZodBoolean>;
        UPDATE: z.ZodDefault<z.ZodBoolean>;
        READ: z.ZodDefault<z.ZodBoolean>;
        OPT_OUT: z.ZodDefault<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        USE: boolean;
        CREATE: boolean;
        UPDATE: boolean;
        READ: boolean;
        OPT_OUT: boolean;
    }, {
        USE?: boolean | undefined;
        CREATE?: boolean | undefined;
        UPDATE?: boolean | undefined;
        READ?: boolean | undefined;
        OPT_OUT?: boolean | undefined;
    }>;
    AGENTS: z.ZodObject<{
        SHARED_GLOBAL: z.ZodDefault<z.ZodBoolean>;
        USE: z.ZodDefault<z.ZodBoolean>;
        CREATE: z.ZodDefault<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        SHARED_GLOBAL: boolean;
        USE: boolean;
        CREATE: boolean;
    }, {
        SHARED_GLOBAL?: boolean | undefined;
        USE?: boolean | undefined;
        CREATE?: boolean | undefined;
    }>;
    MULTI_CONVO: z.ZodObject<{
        USE: z.ZodDefault<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        USE: boolean;
    }, {
        USE?: boolean | undefined;
    }>;
    TEMPORARY_CHAT: z.ZodObject<{
        USE: z.ZodDefault<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        USE: boolean;
    }, {
        USE?: boolean | undefined;
    }>;
    RUN_CODE: z.ZodObject<{
        USE: z.ZodDefault<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        USE: boolean;
    }, {
        USE?: boolean | undefined;
    }>;
    WEB_SEARCH: z.ZodObject<{
        USE: z.ZodDefault<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        USE: boolean;
    }, {
        USE?: boolean | undefined;
    }>;
    PEOPLE_PICKER: z.ZodObject<{
        VIEW_USERS: z.ZodDefault<z.ZodBoolean>;
        VIEW_GROUPS: z.ZodDefault<z.ZodBoolean>;
        VIEW_ROLES: z.ZodDefault<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        VIEW_USERS: boolean;
        VIEW_GROUPS: boolean;
        VIEW_ROLES: boolean;
    }, {
        VIEW_USERS?: boolean | undefined;
        VIEW_GROUPS?: boolean | undefined;
        VIEW_ROLES?: boolean | undefined;
    }>;
    MARKETPLACE: z.ZodObject<{
        USE: z.ZodDefault<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        USE: boolean;
    }, {
        USE?: boolean | undefined;
    }>;
    FILE_SEARCH: z.ZodObject<{
        USE: z.ZodDefault<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        USE: boolean;
    }, {
        USE?: boolean | undefined;
    }>;
    FILE_CITATIONS: z.ZodObject<{
        USE: z.ZodDefault<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        USE: boolean;
    }, {
        USE?: boolean | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    PROMPTS: {
        SHARED_GLOBAL: boolean;
        USE: boolean;
        CREATE: boolean;
    };
    BOOKMARKS: {
        USE: boolean;
    };
    AGENTS: {
        SHARED_GLOBAL: boolean;
        USE: boolean;
        CREATE: boolean;
    };
    MEMORIES: {
        USE: boolean;
        CREATE: boolean;
        UPDATE: boolean;
        READ: boolean;
        OPT_OUT: boolean;
    };
    MULTI_CONVO: {
        USE: boolean;
    };
    TEMPORARY_CHAT: {
        USE: boolean;
    };
    RUN_CODE: {
        USE: boolean;
    };
    WEB_SEARCH: {
        USE: boolean;
    };
    PEOPLE_PICKER: {
        VIEW_USERS: boolean;
        VIEW_GROUPS: boolean;
        VIEW_ROLES: boolean;
    };
    MARKETPLACE: {
        USE: boolean;
    };
    FILE_SEARCH: {
        USE: boolean;
    };
    FILE_CITATIONS: {
        USE: boolean;
    };
}, {
    PROMPTS: {
        SHARED_GLOBAL?: boolean | undefined;
        USE?: boolean | undefined;
        CREATE?: boolean | undefined;
    };
    BOOKMARKS: {
        USE?: boolean | undefined;
    };
    AGENTS: {
        SHARED_GLOBAL?: boolean | undefined;
        USE?: boolean | undefined;
        CREATE?: boolean | undefined;
    };
    MEMORIES: {
        USE?: boolean | undefined;
        CREATE?: boolean | undefined;
        UPDATE?: boolean | undefined;
        READ?: boolean | undefined;
        OPT_OUT?: boolean | undefined;
    };
    MULTI_CONVO: {
        USE?: boolean | undefined;
    };
    TEMPORARY_CHAT: {
        USE?: boolean | undefined;
    };
    RUN_CODE: {
        USE?: boolean | undefined;
    };
    WEB_SEARCH: {
        USE?: boolean | undefined;
    };
    PEOPLE_PICKER: {
        VIEW_USERS?: boolean | undefined;
        VIEW_GROUPS?: boolean | undefined;
        VIEW_ROLES?: boolean | undefined;
    };
    MARKETPLACE: {
        USE?: boolean | undefined;
    };
    FILE_SEARCH: {
        USE?: boolean | undefined;
    };
    FILE_CITATIONS: {
        USE?: boolean | undefined;
    };
}>;
