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
import type { AccessRoleMethods, IPromptGroupDocument } from '@librechat/data-schemas';
import type { Model, Mongoose } from 'mongoose';
export interface PromptMigrationCheckDbMethods {
    findRoleByIdentifier: AccessRoleMethods['findRoleByIdentifier'];
    getProjectByName: (projectName: string, fieldsToSelect?: string[] | null) => Promise<{
        promptGroupIds?: string[];
        [key: string]: unknown;
    } | null>;
}
export interface PromptMigrationCheckParams {
    mongoose: Mongoose;
    methods: PromptMigrationCheckDbMethods;
    PromptGroupModel: Model<IPromptGroupDocument>;
}
export interface PromptMigrationCheckResult {
    totalToMigrate: number;
    globalViewAccess: number;
    privateGroups: number;
    details?: {
        globalViewAccess: Array<{
            name: string;
            _id: string;
            category: string;
        }>;
        privateGroups: Array<{
            name: string;
            _id: string;
            category: string;
        }>;
    };
}
/**
 * Check if prompt groups need to be migrated to the new permission system
 * This performs a dry-run check similar to the migration script
 */
export declare function checkPromptPermissionsMigration({ methods, mongoose, PromptGroupModel, }: PromptMigrationCheckParams): Promise<PromptMigrationCheckResult>;
/**
 * Log migration warning to console if prompt groups need migration
 */
export declare function logPromptMigrationWarning(result: PromptMigrationCheckResult): void;
//# sourceMappingURL=migration.d.ts.map