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
import { type SessionMethods } from './session';
import { type TokenMethods } from './token';
import { type RoleMethods } from './role';
import { type UserMethods } from './user';
import { type MemoryMethods } from './memory';
import { type AgentCategoryMethods } from './agentCategory';
import { type PluginAuthMethods } from './pluginAuth';
import { type AccessRoleMethods } from './accessRole';
import { type UserGroupMethods } from './userGroup';
import { type AclEntryMethods } from './aclEntry';
import { type ShareMethods } from './share';
export type AllMethods = UserMethods & SessionMethods & TokenMethods & RoleMethods & MemoryMethods & AgentCategoryMethods & UserGroupMethods & AclEntryMethods & ShareMethods & AccessRoleMethods & PluginAuthMethods;
/**
 * Creates all database methods for all collections
 */
export declare function createMethods(mongoose: typeof import('mongoose')): AllMethods;
export type { UserMethods, SessionMethods, TokenMethods, RoleMethods, MemoryMethods, AgentCategoryMethods, UserGroupMethods, AclEntryMethods, ShareMethods, AccessRoleMethods, PluginAuthMethods, };
