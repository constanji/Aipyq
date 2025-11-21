/// <reference types="mongoose/types/models" />
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
import type { AccessRoleMethods, IAgent } from '@librechat/data-schemas';
import type { Model, Mongoose } from 'mongoose';
export interface MigrationCheckDbMethods {
    findRoleByIdentifier: AccessRoleMethods['findRoleByIdentifier'];
    getProjectByName: (projectName: string, fieldsToSelect?: string[] | null) => Promise<{
        agentIds?: string[];
        [key: string]: unknown;
    } | null>;
}
export interface MigrationCheckParams {
    mongoose: Mongoose;
    methods: MigrationCheckDbMethods;
    AgentModel: Model<IAgent>;
}
export interface MigrationCheckResult {
    totalToMigrate: number;
    globalEditAccess: number;
    globalViewAccess: number;
    privateAgents: number;
    details?: {
        globalEditAccess: Array<{
            name: string;
            id: string;
        }>;
        globalViewAccess: Array<{
            name: string;
            id: string;
        }>;
        privateAgents: Array<{
            name: string;
            id: string;
        }>;
    };
}
/**
 * Check if agents need to be migrated to the new permission system
 * This performs a dry-run check similar to the migration script
 */
export declare function checkAgentPermissionsMigration({ methods, mongoose, AgentModel, }: MigrationCheckParams): Promise<MigrationCheckResult>;
/**
 * Log migration warning to console if agents need migration
 */
export declare function logAgentMigrationWarning(result: MigrationCheckResult): void;
//# sourceMappingURL=migration.d.ts.map