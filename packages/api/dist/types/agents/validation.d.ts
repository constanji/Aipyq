import { z } from 'zod';
import type { Agent, TModelsConfig } from 'librechat-data-provider';
import type { Request, Response } from 'express';
/** Avatar schema shared between create and update */
export declare const agentAvatarSchema: z.ZodObject<{
    filepath: z.ZodString;
    source: z.ZodString;
}, "strip", z.ZodTypeAny, {
    source: string;
    filepath: string;
}, {
    source: string;
    filepath: string;
}>;
/** Base resource schema for tool resources */
export declare const agentBaseResourceSchema: z.ZodObject<{
    file_ids: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    files: z.ZodOptional<z.ZodArray<z.ZodAny, "many">>;
}, "strip", z.ZodTypeAny, {
    file_ids?: string[] | undefined;
    files?: any[] | undefined;
}, {
    file_ids?: string[] | undefined;
    files?: any[] | undefined;
}>;
/** File resource schema extends base with vector_store_ids */
export declare const agentFileResourceSchema: z.ZodObject<{
    file_ids: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    files: z.ZodOptional<z.ZodArray<z.ZodAny, "many">>;
} & {
    vector_store_ids: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    file_ids?: string[] | undefined;
    files?: any[] | undefined;
    vector_store_ids?: string[] | undefined;
}, {
    file_ids?: string[] | undefined;
    files?: any[] | undefined;
    vector_store_ids?: string[] | undefined;
}>;
/** Tool resources schema matching AgentToolResources interface */
export declare const agentToolResourcesSchema: z.ZodOptional<z.ZodObject<{
    image_edit: z.ZodOptional<z.ZodObject<{
        file_ids: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        files: z.ZodOptional<z.ZodArray<z.ZodAny, "many">>;
    }, "strip", z.ZodTypeAny, {
        file_ids?: string[] | undefined;
        files?: any[] | undefined;
    }, {
        file_ids?: string[] | undefined;
        files?: any[] | undefined;
    }>>;
    execute_code: z.ZodOptional<z.ZodObject<{
        file_ids: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        files: z.ZodOptional<z.ZodArray<z.ZodAny, "many">>;
    }, "strip", z.ZodTypeAny, {
        file_ids?: string[] | undefined;
        files?: any[] | undefined;
    }, {
        file_ids?: string[] | undefined;
        files?: any[] | undefined;
    }>>;
    file_search: z.ZodOptional<z.ZodObject<{
        file_ids: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        files: z.ZodOptional<z.ZodArray<z.ZodAny, "many">>;
    } & {
        vector_store_ids: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        file_ids?: string[] | undefined;
        files?: any[] | undefined;
        vector_store_ids?: string[] | undefined;
    }, {
        file_ids?: string[] | undefined;
        files?: any[] | undefined;
        vector_store_ids?: string[] | undefined;
    }>>;
    context: z.ZodOptional<z.ZodObject<{
        file_ids: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        files: z.ZodOptional<z.ZodArray<z.ZodAny, "many">>;
    }, "strip", z.ZodTypeAny, {
        file_ids?: string[] | undefined;
        files?: any[] | undefined;
    }, {
        file_ids?: string[] | undefined;
        files?: any[] | undefined;
    }>>;
    /** @deprecated Use context instead */
    ocr: z.ZodOptional<z.ZodObject<{
        file_ids: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        files: z.ZodOptional<z.ZodArray<z.ZodAny, "many">>;
    }, "strip", z.ZodTypeAny, {
        file_ids?: string[] | undefined;
        files?: any[] | undefined;
    }, {
        file_ids?: string[] | undefined;
        files?: any[] | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    context?: {
        file_ids?: string[] | undefined;
        files?: any[] | undefined;
    } | undefined;
    ocr?: {
        file_ids?: string[] | undefined;
        files?: any[] | undefined;
    } | undefined;
    image_edit?: {
        file_ids?: string[] | undefined;
        files?: any[] | undefined;
    } | undefined;
    execute_code?: {
        file_ids?: string[] | undefined;
        files?: any[] | undefined;
    } | undefined;
    file_search?: {
        file_ids?: string[] | undefined;
        files?: any[] | undefined;
        vector_store_ids?: string[] | undefined;
    } | undefined;
}, {
    context?: {
        file_ids?: string[] | undefined;
        files?: any[] | undefined;
    } | undefined;
    ocr?: {
        file_ids?: string[] | undefined;
        files?: any[] | undefined;
    } | undefined;
    image_edit?: {
        file_ids?: string[] | undefined;
        files?: any[] | undefined;
    } | undefined;
    execute_code?: {
        file_ids?: string[] | undefined;
        files?: any[] | undefined;
    } | undefined;
    file_search?: {
        file_ids?: string[] | undefined;
        files?: any[] | undefined;
        vector_store_ids?: string[] | undefined;
    } | undefined;
}>>;
/** Support contact schema for agent */
export declare const agentSupportContactSchema: z.ZodOptional<z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    email: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"">, z.ZodString]>>;
}, "strip", z.ZodTypeAny, {
    name?: string | undefined;
    email?: string | undefined;
}, {
    name?: string | undefined;
    email?: string | undefined;
}>>;
/** Graph edge schema for agent handoffs */
export declare const graphEdgeSchema: z.ZodObject<{
    from: z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>;
    to: z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>;
    description: z.ZodOptional<z.ZodString>;
    edgeType: z.ZodOptional<z.ZodEnum<["handoff", "direct"]>>;
    prompt: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodFunction<z.ZodTuple<[], z.ZodUnknown>, z.ZodUnknown>]>>;
    excludeResults: z.ZodOptional<z.ZodBoolean>;
    promptKey: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    from: string | string[];
    to: string | string[];
    description?: string | undefined;
    prompt?: string | ((...args: unknown[]) => unknown) | undefined;
    edgeType?: "direct" | "handoff" | undefined;
    excludeResults?: boolean | undefined;
    promptKey?: string | undefined;
}, {
    from: string | string[];
    to: string | string[];
    description?: string | undefined;
    prompt?: string | ((...args: unknown[]) => unknown) | undefined;
    edgeType?: "direct" | "handoff" | undefined;
    excludeResults?: boolean | undefined;
    promptKey?: string | undefined;
}>;
/** Base agent schema with all common fields */
export declare const agentBaseSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    instructions: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    avatar: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        filepath: z.ZodString;
        source: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        source: string;
        filepath: string;
    }, {
        source: string;
        filepath: string;
    }>>>;
    model_parameters: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    tools: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    /** @deprecated Use edges instead */
    agent_ids: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    edges: z.ZodOptional<z.ZodArray<z.ZodObject<{
        from: z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>;
        to: z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>;
        description: z.ZodOptional<z.ZodString>;
        edgeType: z.ZodOptional<z.ZodEnum<["handoff", "direct"]>>;
        prompt: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodFunction<z.ZodTuple<[], z.ZodUnknown>, z.ZodUnknown>]>>;
        excludeResults: z.ZodOptional<z.ZodBoolean>;
        promptKey: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        from: string | string[];
        to: string | string[];
        description?: string | undefined;
        prompt?: string | ((...args: unknown[]) => unknown) | undefined;
        edgeType?: "direct" | "handoff" | undefined;
        excludeResults?: boolean | undefined;
        promptKey?: string | undefined;
    }, {
        from: string | string[];
        to: string | string[];
        description?: string | undefined;
        prompt?: string | ((...args: unknown[]) => unknown) | undefined;
        edgeType?: "direct" | "handoff" | undefined;
        excludeResults?: boolean | undefined;
        promptKey?: string | undefined;
    }>, "many">>;
    end_after_tools: z.ZodOptional<z.ZodBoolean>;
    hide_sequential_outputs: z.ZodOptional<z.ZodBoolean>;
    artifacts: z.ZodOptional<z.ZodString>;
    recursion_limit: z.ZodOptional<z.ZodNumber>;
    conversation_starters: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    tool_resources: z.ZodOptional<z.ZodObject<{
        image_edit: z.ZodOptional<z.ZodObject<{
            file_ids: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            files: z.ZodOptional<z.ZodArray<z.ZodAny, "many">>;
        }, "strip", z.ZodTypeAny, {
            file_ids?: string[] | undefined;
            files?: any[] | undefined;
        }, {
            file_ids?: string[] | undefined;
            files?: any[] | undefined;
        }>>;
        execute_code: z.ZodOptional<z.ZodObject<{
            file_ids: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            files: z.ZodOptional<z.ZodArray<z.ZodAny, "many">>;
        }, "strip", z.ZodTypeAny, {
            file_ids?: string[] | undefined;
            files?: any[] | undefined;
        }, {
            file_ids?: string[] | undefined;
            files?: any[] | undefined;
        }>>;
        file_search: z.ZodOptional<z.ZodObject<{
            file_ids: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            files: z.ZodOptional<z.ZodArray<z.ZodAny, "many">>;
        } & {
            vector_store_ids: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        }, "strip", z.ZodTypeAny, {
            file_ids?: string[] | undefined;
            files?: any[] | undefined;
            vector_store_ids?: string[] | undefined;
        }, {
            file_ids?: string[] | undefined;
            files?: any[] | undefined;
            vector_store_ids?: string[] | undefined;
        }>>;
        context: z.ZodOptional<z.ZodObject<{
            file_ids: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            files: z.ZodOptional<z.ZodArray<z.ZodAny, "many">>;
        }, "strip", z.ZodTypeAny, {
            file_ids?: string[] | undefined;
            files?: any[] | undefined;
        }, {
            file_ids?: string[] | undefined;
            files?: any[] | undefined;
        }>>;
        /** @deprecated Use context instead */
        ocr: z.ZodOptional<z.ZodObject<{
            file_ids: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            files: z.ZodOptional<z.ZodArray<z.ZodAny, "many">>;
        }, "strip", z.ZodTypeAny, {
            file_ids?: string[] | undefined;
            files?: any[] | undefined;
        }, {
            file_ids?: string[] | undefined;
            files?: any[] | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        context?: {
            file_ids?: string[] | undefined;
            files?: any[] | undefined;
        } | undefined;
        ocr?: {
            file_ids?: string[] | undefined;
            files?: any[] | undefined;
        } | undefined;
        image_edit?: {
            file_ids?: string[] | undefined;
            files?: any[] | undefined;
        } | undefined;
        execute_code?: {
            file_ids?: string[] | undefined;
            files?: any[] | undefined;
        } | undefined;
        file_search?: {
            file_ids?: string[] | undefined;
            files?: any[] | undefined;
            vector_store_ids?: string[] | undefined;
        } | undefined;
    }, {
        context?: {
            file_ids?: string[] | undefined;
            files?: any[] | undefined;
        } | undefined;
        ocr?: {
            file_ids?: string[] | undefined;
            files?: any[] | undefined;
        } | undefined;
        image_edit?: {
            file_ids?: string[] | undefined;
            files?: any[] | undefined;
        } | undefined;
        execute_code?: {
            file_ids?: string[] | undefined;
            files?: any[] | undefined;
        } | undefined;
        file_search?: {
            file_ids?: string[] | undefined;
            files?: any[] | undefined;
            vector_store_ids?: string[] | undefined;
        } | undefined;
    }>>;
    support_contact: z.ZodOptional<z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        email: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"">, z.ZodString]>>;
    }, "strip", z.ZodTypeAny, {
        name?: string | undefined;
        email?: string | undefined;
    }, {
        name?: string | undefined;
        email?: string | undefined;
    }>>;
    category: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    name?: string | null | undefined;
    artifacts?: string | undefined;
    tools?: string[] | undefined;
    instructions?: string | null | undefined;
    avatar?: {
        source: string;
        filepath: string;
    } | null | undefined;
    description?: string | null | undefined;
    model_parameters?: Record<string, unknown> | undefined;
    recursion_limit?: number | undefined;
    hide_sequential_outputs?: boolean | undefined;
    end_after_tools?: boolean | undefined;
    agent_ids?: string[] | undefined;
    edges?: {
        from: string | string[];
        to: string | string[];
        description?: string | undefined;
        prompt?: string | ((...args: unknown[]) => unknown) | undefined;
        edgeType?: "direct" | "handoff" | undefined;
        excludeResults?: boolean | undefined;
        promptKey?: string | undefined;
    }[] | undefined;
    conversation_starters?: string[] | undefined;
    tool_resources?: {
        context?: {
            file_ids?: string[] | undefined;
            files?: any[] | undefined;
        } | undefined;
        ocr?: {
            file_ids?: string[] | undefined;
            files?: any[] | undefined;
        } | undefined;
        image_edit?: {
            file_ids?: string[] | undefined;
            files?: any[] | undefined;
        } | undefined;
        execute_code?: {
            file_ids?: string[] | undefined;
            files?: any[] | undefined;
        } | undefined;
        file_search?: {
            file_ids?: string[] | undefined;
            files?: any[] | undefined;
            vector_store_ids?: string[] | undefined;
        } | undefined;
    } | undefined;
    category?: string | undefined;
    support_contact?: {
        name?: string | undefined;
        email?: string | undefined;
    } | undefined;
}, {
    name?: string | null | undefined;
    artifacts?: string | undefined;
    tools?: string[] | undefined;
    instructions?: string | null | undefined;
    avatar?: {
        source: string;
        filepath: string;
    } | null | undefined;
    description?: string | null | undefined;
    model_parameters?: Record<string, unknown> | undefined;
    recursion_limit?: number | undefined;
    hide_sequential_outputs?: boolean | undefined;
    end_after_tools?: boolean | undefined;
    agent_ids?: string[] | undefined;
    edges?: {
        from: string | string[];
        to: string | string[];
        description?: string | undefined;
        prompt?: string | ((...args: unknown[]) => unknown) | undefined;
        edgeType?: "direct" | "handoff" | undefined;
        excludeResults?: boolean | undefined;
        promptKey?: string | undefined;
    }[] | undefined;
    conversation_starters?: string[] | undefined;
    tool_resources?: {
        context?: {
            file_ids?: string[] | undefined;
            files?: any[] | undefined;
        } | undefined;
        ocr?: {
            file_ids?: string[] | undefined;
            files?: any[] | undefined;
        } | undefined;
        image_edit?: {
            file_ids?: string[] | undefined;
            files?: any[] | undefined;
        } | undefined;
        execute_code?: {
            file_ids?: string[] | undefined;
            files?: any[] | undefined;
        } | undefined;
        file_search?: {
            file_ids?: string[] | undefined;
            files?: any[] | undefined;
            vector_store_ids?: string[] | undefined;
        } | undefined;
    } | undefined;
    category?: string | undefined;
    support_contact?: {
        name?: string | undefined;
        email?: string | undefined;
    } | undefined;
}>;
/** Create schema extends base with required fields for creation */
export declare const agentCreateSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    instructions: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    avatar: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        filepath: z.ZodString;
        source: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        source: string;
        filepath: string;
    }, {
        source: string;
        filepath: string;
    }>>>;
    model_parameters: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    agent_ids: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    edges: z.ZodOptional<z.ZodArray<z.ZodObject<{
        from: z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>;
        to: z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>;
        description: z.ZodOptional<z.ZodString>;
        edgeType: z.ZodOptional<z.ZodEnum<["handoff", "direct"]>>;
        prompt: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodFunction<z.ZodTuple<[], z.ZodUnknown>, z.ZodUnknown>]>>;
        excludeResults: z.ZodOptional<z.ZodBoolean>;
        promptKey: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        from: string | string[];
        to: string | string[];
        description?: string | undefined;
        prompt?: string | ((...args: unknown[]) => unknown) | undefined;
        edgeType?: "direct" | "handoff" | undefined;
        excludeResults?: boolean | undefined;
        promptKey?: string | undefined;
    }, {
        from: string | string[];
        to: string | string[];
        description?: string | undefined;
        prompt?: string | ((...args: unknown[]) => unknown) | undefined;
        edgeType?: "direct" | "handoff" | undefined;
        excludeResults?: boolean | undefined;
        promptKey?: string | undefined;
    }>, "many">>;
    end_after_tools: z.ZodOptional<z.ZodBoolean>;
    hide_sequential_outputs: z.ZodOptional<z.ZodBoolean>;
    artifacts: z.ZodOptional<z.ZodString>;
    recursion_limit: z.ZodOptional<z.ZodNumber>;
    conversation_starters: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    tool_resources: z.ZodOptional<z.ZodObject<{
        image_edit: z.ZodOptional<z.ZodObject<{
            file_ids: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            files: z.ZodOptional<z.ZodArray<z.ZodAny, "many">>;
        }, "strip", z.ZodTypeAny, {
            file_ids?: string[] | undefined;
            files?: any[] | undefined;
        }, {
            file_ids?: string[] | undefined;
            files?: any[] | undefined;
        }>>;
        execute_code: z.ZodOptional<z.ZodObject<{
            file_ids: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            files: z.ZodOptional<z.ZodArray<z.ZodAny, "many">>;
        }, "strip", z.ZodTypeAny, {
            file_ids?: string[] | undefined;
            files?: any[] | undefined;
        }, {
            file_ids?: string[] | undefined;
            files?: any[] | undefined;
        }>>;
        file_search: z.ZodOptional<z.ZodObject<{
            file_ids: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            files: z.ZodOptional<z.ZodArray<z.ZodAny, "many">>;
        } & {
            vector_store_ids: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        }, "strip", z.ZodTypeAny, {
            file_ids?: string[] | undefined;
            files?: any[] | undefined;
            vector_store_ids?: string[] | undefined;
        }, {
            file_ids?: string[] | undefined;
            files?: any[] | undefined;
            vector_store_ids?: string[] | undefined;
        }>>;
        context: z.ZodOptional<z.ZodObject<{
            file_ids: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            files: z.ZodOptional<z.ZodArray<z.ZodAny, "many">>;
        }, "strip", z.ZodTypeAny, {
            file_ids?: string[] | undefined;
            files?: any[] | undefined;
        }, {
            file_ids?: string[] | undefined;
            files?: any[] | undefined;
        }>>;
        /** @deprecated Use context instead */
        ocr: z.ZodOptional<z.ZodObject<{
            file_ids: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            files: z.ZodOptional<z.ZodArray<z.ZodAny, "many">>;
        }, "strip", z.ZodTypeAny, {
            file_ids?: string[] | undefined;
            files?: any[] | undefined;
        }, {
            file_ids?: string[] | undefined;
            files?: any[] | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        context?: {
            file_ids?: string[] | undefined;
            files?: any[] | undefined;
        } | undefined;
        ocr?: {
            file_ids?: string[] | undefined;
            files?: any[] | undefined;
        } | undefined;
        image_edit?: {
            file_ids?: string[] | undefined;
            files?: any[] | undefined;
        } | undefined;
        execute_code?: {
            file_ids?: string[] | undefined;
            files?: any[] | undefined;
        } | undefined;
        file_search?: {
            file_ids?: string[] | undefined;
            files?: any[] | undefined;
            vector_store_ids?: string[] | undefined;
        } | undefined;
    }, {
        context?: {
            file_ids?: string[] | undefined;
            files?: any[] | undefined;
        } | undefined;
        ocr?: {
            file_ids?: string[] | undefined;
            files?: any[] | undefined;
        } | undefined;
        image_edit?: {
            file_ids?: string[] | undefined;
            files?: any[] | undefined;
        } | undefined;
        execute_code?: {
            file_ids?: string[] | undefined;
            files?: any[] | undefined;
        } | undefined;
        file_search?: {
            file_ids?: string[] | undefined;
            files?: any[] | undefined;
            vector_store_ids?: string[] | undefined;
        } | undefined;
    }>>;
    support_contact: z.ZodOptional<z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        email: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"">, z.ZodString]>>;
    }, "strip", z.ZodTypeAny, {
        name?: string | undefined;
        email?: string | undefined;
    }, {
        name?: string | undefined;
        email?: string | undefined;
    }>>;
    category: z.ZodOptional<z.ZodString>;
} & {
    provider: z.ZodString;
    model: z.ZodNullable<z.ZodString>;
    tools: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
}, "strip", z.ZodTypeAny, {
    model: string | null;
    tools: string[];
    provider: string;
    name?: string | null | undefined;
    artifacts?: string | undefined;
    instructions?: string | null | undefined;
    avatar?: {
        source: string;
        filepath: string;
    } | null | undefined;
    description?: string | null | undefined;
    model_parameters?: Record<string, unknown> | undefined;
    recursion_limit?: number | undefined;
    hide_sequential_outputs?: boolean | undefined;
    end_after_tools?: boolean | undefined;
    agent_ids?: string[] | undefined;
    edges?: {
        from: string | string[];
        to: string | string[];
        description?: string | undefined;
        prompt?: string | ((...args: unknown[]) => unknown) | undefined;
        edgeType?: "direct" | "handoff" | undefined;
        excludeResults?: boolean | undefined;
        promptKey?: string | undefined;
    }[] | undefined;
    conversation_starters?: string[] | undefined;
    tool_resources?: {
        context?: {
            file_ids?: string[] | undefined;
            files?: any[] | undefined;
        } | undefined;
        ocr?: {
            file_ids?: string[] | undefined;
            files?: any[] | undefined;
        } | undefined;
        image_edit?: {
            file_ids?: string[] | undefined;
            files?: any[] | undefined;
        } | undefined;
        execute_code?: {
            file_ids?: string[] | undefined;
            files?: any[] | undefined;
        } | undefined;
        file_search?: {
            file_ids?: string[] | undefined;
            files?: any[] | undefined;
            vector_store_ids?: string[] | undefined;
        } | undefined;
    } | undefined;
    category?: string | undefined;
    support_contact?: {
        name?: string | undefined;
        email?: string | undefined;
    } | undefined;
}, {
    model: string | null;
    provider: string;
    name?: string | null | undefined;
    artifacts?: string | undefined;
    tools?: string[] | undefined;
    instructions?: string | null | undefined;
    avatar?: {
        source: string;
        filepath: string;
    } | null | undefined;
    description?: string | null | undefined;
    model_parameters?: Record<string, unknown> | undefined;
    recursion_limit?: number | undefined;
    hide_sequential_outputs?: boolean | undefined;
    end_after_tools?: boolean | undefined;
    agent_ids?: string[] | undefined;
    edges?: {
        from: string | string[];
        to: string | string[];
        description?: string | undefined;
        prompt?: string | ((...args: unknown[]) => unknown) | undefined;
        edgeType?: "direct" | "handoff" | undefined;
        excludeResults?: boolean | undefined;
        promptKey?: string | undefined;
    }[] | undefined;
    conversation_starters?: string[] | undefined;
    tool_resources?: {
        context?: {
            file_ids?: string[] | undefined;
            files?: any[] | undefined;
        } | undefined;
        ocr?: {
            file_ids?: string[] | undefined;
            files?: any[] | undefined;
        } | undefined;
        image_edit?: {
            file_ids?: string[] | undefined;
            files?: any[] | undefined;
        } | undefined;
        execute_code?: {
            file_ids?: string[] | undefined;
            files?: any[] | undefined;
        } | undefined;
        file_search?: {
            file_ids?: string[] | undefined;
            files?: any[] | undefined;
            vector_store_ids?: string[] | undefined;
        } | undefined;
    } | undefined;
    category?: string | undefined;
    support_contact?: {
        name?: string | undefined;
        email?: string | undefined;
    } | undefined;
}>;
/** Update schema extends base with all fields optional and additional update-only fields */
export declare const agentUpdateSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    instructions: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    avatar: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        filepath: z.ZodString;
        source: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        source: string;
        filepath: string;
    }, {
        source: string;
        filepath: string;
    }>>>;
    model_parameters: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    tools: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    /** @deprecated Use edges instead */
    agent_ids: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    edges: z.ZodOptional<z.ZodArray<z.ZodObject<{
        from: z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>;
        to: z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>;
        description: z.ZodOptional<z.ZodString>;
        edgeType: z.ZodOptional<z.ZodEnum<["handoff", "direct"]>>;
        prompt: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodFunction<z.ZodTuple<[], z.ZodUnknown>, z.ZodUnknown>]>>;
        excludeResults: z.ZodOptional<z.ZodBoolean>;
        promptKey: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        from: string | string[];
        to: string | string[];
        description?: string | undefined;
        prompt?: string | ((...args: unknown[]) => unknown) | undefined;
        edgeType?: "direct" | "handoff" | undefined;
        excludeResults?: boolean | undefined;
        promptKey?: string | undefined;
    }, {
        from: string | string[];
        to: string | string[];
        description?: string | undefined;
        prompt?: string | ((...args: unknown[]) => unknown) | undefined;
        edgeType?: "direct" | "handoff" | undefined;
        excludeResults?: boolean | undefined;
        promptKey?: string | undefined;
    }>, "many">>;
    end_after_tools: z.ZodOptional<z.ZodBoolean>;
    hide_sequential_outputs: z.ZodOptional<z.ZodBoolean>;
    artifacts: z.ZodOptional<z.ZodString>;
    recursion_limit: z.ZodOptional<z.ZodNumber>;
    conversation_starters: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    tool_resources: z.ZodOptional<z.ZodObject<{
        image_edit: z.ZodOptional<z.ZodObject<{
            file_ids: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            files: z.ZodOptional<z.ZodArray<z.ZodAny, "many">>;
        }, "strip", z.ZodTypeAny, {
            file_ids?: string[] | undefined;
            files?: any[] | undefined;
        }, {
            file_ids?: string[] | undefined;
            files?: any[] | undefined;
        }>>;
        execute_code: z.ZodOptional<z.ZodObject<{
            file_ids: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            files: z.ZodOptional<z.ZodArray<z.ZodAny, "many">>;
        }, "strip", z.ZodTypeAny, {
            file_ids?: string[] | undefined;
            files?: any[] | undefined;
        }, {
            file_ids?: string[] | undefined;
            files?: any[] | undefined;
        }>>;
        file_search: z.ZodOptional<z.ZodObject<{
            file_ids: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            files: z.ZodOptional<z.ZodArray<z.ZodAny, "many">>;
        } & {
            vector_store_ids: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        }, "strip", z.ZodTypeAny, {
            file_ids?: string[] | undefined;
            files?: any[] | undefined;
            vector_store_ids?: string[] | undefined;
        }, {
            file_ids?: string[] | undefined;
            files?: any[] | undefined;
            vector_store_ids?: string[] | undefined;
        }>>;
        context: z.ZodOptional<z.ZodObject<{
            file_ids: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            files: z.ZodOptional<z.ZodArray<z.ZodAny, "many">>;
        }, "strip", z.ZodTypeAny, {
            file_ids?: string[] | undefined;
            files?: any[] | undefined;
        }, {
            file_ids?: string[] | undefined;
            files?: any[] | undefined;
        }>>;
        /** @deprecated Use context instead */
        ocr: z.ZodOptional<z.ZodObject<{
            file_ids: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            files: z.ZodOptional<z.ZodArray<z.ZodAny, "many">>;
        }, "strip", z.ZodTypeAny, {
            file_ids?: string[] | undefined;
            files?: any[] | undefined;
        }, {
            file_ids?: string[] | undefined;
            files?: any[] | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        context?: {
            file_ids?: string[] | undefined;
            files?: any[] | undefined;
        } | undefined;
        ocr?: {
            file_ids?: string[] | undefined;
            files?: any[] | undefined;
        } | undefined;
        image_edit?: {
            file_ids?: string[] | undefined;
            files?: any[] | undefined;
        } | undefined;
        execute_code?: {
            file_ids?: string[] | undefined;
            files?: any[] | undefined;
        } | undefined;
        file_search?: {
            file_ids?: string[] | undefined;
            files?: any[] | undefined;
            vector_store_ids?: string[] | undefined;
        } | undefined;
    }, {
        context?: {
            file_ids?: string[] | undefined;
            files?: any[] | undefined;
        } | undefined;
        ocr?: {
            file_ids?: string[] | undefined;
            files?: any[] | undefined;
        } | undefined;
        image_edit?: {
            file_ids?: string[] | undefined;
            files?: any[] | undefined;
        } | undefined;
        execute_code?: {
            file_ids?: string[] | undefined;
            files?: any[] | undefined;
        } | undefined;
        file_search?: {
            file_ids?: string[] | undefined;
            files?: any[] | undefined;
            vector_store_ids?: string[] | undefined;
        } | undefined;
    }>>;
    support_contact: z.ZodOptional<z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        email: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"">, z.ZodString]>>;
    }, "strip", z.ZodTypeAny, {
        name?: string | undefined;
        email?: string | undefined;
    }, {
        name?: string | undefined;
        email?: string | undefined;
    }>>;
    category: z.ZodOptional<z.ZodString>;
} & {
    provider: z.ZodOptional<z.ZodString>;
    model: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    projectIds: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    removeProjectIds: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    isCollaborative: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    name?: string | null | undefined;
    model?: string | null | undefined;
    artifacts?: string | undefined;
    tools?: string[] | undefined;
    instructions?: string | null | undefined;
    provider?: string | undefined;
    avatar?: {
        source: string;
        filepath: string;
    } | null | undefined;
    description?: string | null | undefined;
    model_parameters?: Record<string, unknown> | undefined;
    recursion_limit?: number | undefined;
    hide_sequential_outputs?: boolean | undefined;
    end_after_tools?: boolean | undefined;
    agent_ids?: string[] | undefined;
    edges?: {
        from: string | string[];
        to: string | string[];
        description?: string | undefined;
        prompt?: string | ((...args: unknown[]) => unknown) | undefined;
        edgeType?: "direct" | "handoff" | undefined;
        excludeResults?: boolean | undefined;
        promptKey?: string | undefined;
    }[] | undefined;
    isCollaborative?: boolean | undefined;
    conversation_starters?: string[] | undefined;
    tool_resources?: {
        context?: {
            file_ids?: string[] | undefined;
            files?: any[] | undefined;
        } | undefined;
        ocr?: {
            file_ids?: string[] | undefined;
            files?: any[] | undefined;
        } | undefined;
        image_edit?: {
            file_ids?: string[] | undefined;
            files?: any[] | undefined;
        } | undefined;
        execute_code?: {
            file_ids?: string[] | undefined;
            files?: any[] | undefined;
        } | undefined;
        file_search?: {
            file_ids?: string[] | undefined;
            files?: any[] | undefined;
            vector_store_ids?: string[] | undefined;
        } | undefined;
    } | undefined;
    projectIds?: string[] | undefined;
    category?: string | undefined;
    support_contact?: {
        name?: string | undefined;
        email?: string | undefined;
    } | undefined;
    removeProjectIds?: string[] | undefined;
}, {
    name?: string | null | undefined;
    model?: string | null | undefined;
    artifacts?: string | undefined;
    tools?: string[] | undefined;
    instructions?: string | null | undefined;
    provider?: string | undefined;
    avatar?: {
        source: string;
        filepath: string;
    } | null | undefined;
    description?: string | null | undefined;
    model_parameters?: Record<string, unknown> | undefined;
    recursion_limit?: number | undefined;
    hide_sequential_outputs?: boolean | undefined;
    end_after_tools?: boolean | undefined;
    agent_ids?: string[] | undefined;
    edges?: {
        from: string | string[];
        to: string | string[];
        description?: string | undefined;
        prompt?: string | ((...args: unknown[]) => unknown) | undefined;
        edgeType?: "direct" | "handoff" | undefined;
        excludeResults?: boolean | undefined;
        promptKey?: string | undefined;
    }[] | undefined;
    isCollaborative?: boolean | undefined;
    conversation_starters?: string[] | undefined;
    tool_resources?: {
        context?: {
            file_ids?: string[] | undefined;
            files?: any[] | undefined;
        } | undefined;
        ocr?: {
            file_ids?: string[] | undefined;
            files?: any[] | undefined;
        } | undefined;
        image_edit?: {
            file_ids?: string[] | undefined;
            files?: any[] | undefined;
        } | undefined;
        execute_code?: {
            file_ids?: string[] | undefined;
            files?: any[] | undefined;
        } | undefined;
        file_search?: {
            file_ids?: string[] | undefined;
            files?: any[] | undefined;
            vector_store_ids?: string[] | undefined;
        } | undefined;
    } | undefined;
    projectIds?: string[] | undefined;
    category?: string | undefined;
    support_contact?: {
        name?: string | undefined;
        email?: string | undefined;
    } | undefined;
    removeProjectIds?: string[] | undefined;
}>;
interface ValidateAgentModelParams {
    req: Request;
    res: Response;
    agent: Agent;
    modelsConfig: TModelsConfig;
    logViolation: (req: Request, res: Response, type: string, errorMessage: Record<string, unknown>, score?: number | string) => Promise<void>;
}
interface ValidateAgentModelResult {
    isValid: boolean;
    error?: {
        message: string;
    };
}
/**
 * Validates an agent's model against the available models configuration.
 * This is a non-middleware version of validateModel that can be used
 * in service initialization flows.
 *
 * @param params - Validation parameters
 * @returns Object indicating whether the model is valid and any error details
 */
export declare function validateAgentModel(params: ValidateAgentModelParams): Promise<ValidateAgentModelResult>;
export {};
//# sourceMappingURL=validation.d.ts.map