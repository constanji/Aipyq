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
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
/// <reference types="mongoose/types/inferrawdoctype" />
/**
 * Creates all database models for all collections
 */
export declare function createModels(mongoose: typeof import('mongoose')): {
    User: import("mongoose").Model<any, {}, {}, {}, any, any>;
    Token: import("mongoose").Model<any, {}, {}, {}, any, any>;
    Session: import("mongoose").Model<any, {}, {}, {}, any, any>;
    Balance: import("mongoose").Model<any, {}, {}, {}, any, any>;
    Conversation: import("mongoose").Model<any, {}, {}, {}, any, any>;
    Message: import("mongoose").Model<any, {}, {}, {}, any, any>;
    Agent: import("mongoose").Model<any, {}, {}, {}, any, any>;
    AgentCategory: import("mongoose").Model<any, {}, {}, {}, any, any>;
    Role: import("mongoose").Model<any, {}, {}, {}, any, any>;
    Action: import("mongoose").Model<any, {}, {}, {}, any, any>;
    Assistant: import("mongoose").Model<any, {}, {}, {}, any, any>;
    File: import("mongoose").Model<any, {}, {}, {}, any, any>;
    Banner: import("mongoose").Model<any, {}, {}, {}, any, any>;
    Project: import("mongoose").Model<any, {}, {}, {}, any, any>;
    Key: import("mongoose").Model<any, {}, {}, {}, any, any>;
    PluginAuth: import("mongoose").Model<any, {}, {}, {}, any, any>;
    Transaction: import("mongoose").Model<any, {}, {}, {}, any, any>;
    Preset: import("mongoose").Model<any, {}, {}, {}, any, any>;
    Prompt: import("mongoose").Model<any, {}, {}, {}, any, any>;
    PromptGroup: import("mongoose").Model<any, {}, {}, {}, any, any>;
    ConversationTag: import("mongoose").Model<any, {}, {}, {}, any, any>;
    SharedLink: import("mongoose").Model<any, {}, {}, {}, any, any>;
    ToolCall: import("mongoose").Model<any, {}, {}, {}, any, any>;
    MemoryEntry: import("mongoose").Model<any, {}, {}, {}, any, any>;
    AccessRole: import("mongoose").Model<any, {}, {}, {}, any, any>;
    AclEntry: import("mongoose").Model<any, {}, {}, {}, any, any>;
    Group: import("mongoose").Model<any, {}, {}, {}, any, any>;
};
