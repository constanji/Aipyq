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
import type { mongo } from 'mongoose';
/**
 * Ensures that a collection exists in the database.
 * For DocumentDB compatibility, it tries multiple approaches.
 * @param db - The MongoDB database instance
 * @param collectionName - The name of the collection to ensure exists
 */
export declare function ensureCollectionExists(db: mongo.Db, collectionName: string): Promise<void>;
/**
 * Ensures that all required collections exist for the permission system.
 * This includes aclentries, groups, accessroles, and any other collections
 * needed for migrations and permission checks.
 * @param db - The MongoDB database instance
 */
export declare function ensureRequiredCollectionsExist(db: mongo.Db): Promise<void>;
//# sourceMappingURL=utils.d.ts.map