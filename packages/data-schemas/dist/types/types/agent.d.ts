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
import { Document, Types } from 'mongoose';
import type { GraphEdge } from 'librechat-data-provider';
export interface ISupportContact {
    name?: string;
    email?: string;
}
export interface IAgent extends Omit<Document, 'model'> {
    id: string;
    name?: string;
    description?: string;
    instructions?: string;
    avatar?: {
        filepath: string;
        source: string;
    };
    provider: string;
    model: string;
    model_parameters?: Record<string, unknown>;
    artifacts?: string;
    access_level?: number;
    recursion_limit?: number;
    tools?: string[];
    tool_kwargs?: Array<unknown>;
    actions?: string[];
    author: Types.ObjectId;
    authorName?: string;
    hide_sequential_outputs?: boolean;
    end_after_tools?: boolean;
    /** @deprecated Use edges instead */
    agent_ids?: string[];
    edges?: GraphEdge[];
    /** @deprecated Use ACL permissions instead */
    isCollaborative?: boolean;
    conversation_starters?: string[];
    tool_resources?: unknown;
    projectIds?: Types.ObjectId[];
    versions?: Omit<IAgent, 'versions'>[];
    category: string;
    support_contact?: ISupportContact;
    is_promoted?: boolean;
}
