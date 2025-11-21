import { z } from 'zod';
/**
 * Enum for System Defined Roles
 */
export declare enum SystemRoles {
    /**
     * The Admin role
     */
    ADMIN = "ADMIN",
    /**
     * The default user role
     */
    USER = "USER"
}
export declare const roleSchema: z.ZodObject<{
    name: z.ZodString;
    permissions: z.ZodObject<{
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
}, "strip", z.ZodTypeAny, {
    name: string;
    permissions: {
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
    };
}, {
    name: string;
    permissions: {
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
    };
}>;
export type TRole = z.infer<typeof roleSchema>;
export declare const roleDefaults: {
    ADMIN: {
        name: SystemRoles.ADMIN;
        permissions: {
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
        };
    };
    USER: {
        name: SystemRoles.USER;
        permissions: {
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
        };
    };
};
