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
import type { SearchResponse, SearchParams, Index } from 'meilisearch';
import type { CallbackWithoutResultAndOptionalError, Document, Schema, Model } from 'mongoose';
import type { IConversation, IMessage } from '~/types';
interface MongoMeiliOptions {
    host: string;
    apiKey: string;
    indexName: string;
    primaryKey: string;
    mongoose: typeof import('mongoose');
    syncBatchSize?: number;
    syncDelayMs?: number;
}
interface MeiliIndexable {
    [key: string]: unknown;
    _meiliIndex?: boolean;
}
interface SyncProgress {
    lastSyncedId?: string;
    totalProcessed: number;
    totalDocuments: number;
    isComplete: boolean;
}
interface _DocumentWithMeiliIndex extends Document {
    _meiliIndex?: boolean;
    preprocessObjectForIndex?: () => Record<string, unknown>;
    addObjectToMeili?: (next: CallbackWithoutResultAndOptionalError) => Promise<void>;
    updateObjectToMeili?: (next: CallbackWithoutResultAndOptionalError) => Promise<void>;
    deleteObjectFromMeili?: (next: CallbackWithoutResultAndOptionalError) => Promise<void>;
    postSaveHook?: (next: CallbackWithoutResultAndOptionalError) => void;
    postUpdateHook?: (next: CallbackWithoutResultAndOptionalError) => void;
    postRemoveHook?: (next: CallbackWithoutResultAndOptionalError) => void;
}
export type DocumentWithMeiliIndex = _DocumentWithMeiliIndex & IConversation & Partial<IMessage>;
export interface SchemaWithMeiliMethods extends Model<DocumentWithMeiliIndex> {
    syncWithMeili(options?: {
        resumeFromId?: string;
    }): Promise<void>;
    getSyncProgress(): Promise<SyncProgress>;
    processSyncBatch(index: Index<MeiliIndexable>, documents: Array<Record<string, unknown>>, updateOps: Array<{
        updateOne: {
            filter: Record<string, unknown>;
            update: {
                $set: {
                    _meiliIndex: boolean;
                };
            };
        };
    }>): Promise<void>;
    cleanupMeiliIndex(index: Index<MeiliIndexable>, primaryKey: string, batchSize: number, delayMs: number): Promise<void>;
    setMeiliIndexSettings(settings: Record<string, unknown>): Promise<unknown>;
    meiliSearch(q: string, params?: SearchParams, populate?: boolean): Promise<SearchResponse<MeiliIndexable, Record<string, unknown>>>;
}
/**
 * Mongoose plugin to synchronize MongoDB collections with a MeiliSearch index.
 *
 * This plugin:
 *   - Validates the provided options.
 *   - Adds a `_meiliIndex` field to the schema to track indexing status.
 *   - Sets up a MeiliSearch client and creates an index if it doesn't already exist.
 *   - Loads class methods for syncing, searching, and managing documents in MeiliSearch.
 *   - Registers Mongoose hooks (post-save, post-update, post-remove, etc.) to maintain index consistency.
 *
 * @param schema - The Mongoose schema to which the plugin is applied.
 * @param options - Configuration options.
 * @param options.host - The MeiliSearch host.
 * @param options.apiKey - The MeiliSearch API key.
 * @param options.indexName - The name of the MeiliSearch index.
 * @param options.primaryKey - The primary key field for indexing.
 * @param options.syncBatchSize - Batch size for sync operations.
 * @param options.syncDelayMs - Delay between batches in milliseconds.
 */
export default function mongoMeili(schema: Schema, options: MongoMeiliOptions): void;
export {};
