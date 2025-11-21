/// <reference types="mongoose/types/query" />
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
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
/// <reference types="mongoose/types/inferrawdoctype" />
import type { AgentToolResources, TFile } from 'librechat-data-provider';
import type { IMongoFile, AppConfig, IUser } from '@librechat/data-schemas';
import type { FilterQuery, QueryOptions, ProjectionType } from 'mongoose';
import type { Request as ServerRequest } from 'express';
/**
 * Function type for retrieving files from the database
 * @param filter - MongoDB filter query for files
 * @param _sortOptions - Sorting options (currently unused)
 * @param selectFields - Field selection options
 * @param options - Additional options including userId and agentId for access control
 * @returns Promise resolving to array of files
 */
export type TGetFiles = (filter: FilterQuery<IMongoFile>, _sortOptions: ProjectionType<IMongoFile> | null | undefined, selectFields: QueryOptions<IMongoFile> | null | undefined, options?: {
    userId?: string;
    agentId?: string;
}) => Promise<Array<TFile>>;
/**
 * Primes resources for agent execution by processing attachments and tool resources
 * This function:
 * 1. Fetches OCR files if OCR is enabled
 * 2. Processes attachment files
 * 3. Categorizes files into appropriate tool resources
 * 4. Prevents duplicate files across all sources
 *
 * @param params - Parameters object
 * @param params.req - Express request object
 * @param params.appConfig - Application configuration object
 * @param params.getFiles - Function to retrieve files from database
 * @param params.requestFileSet - Set of file IDs from the current request
 * @param params.attachments - Promise resolving to array of attachment files
 * @param params.tool_resources - Existing tool resources for the agent
 * @returns Promise resolving to processed attachments and updated tool resources
 */
export declare const primeResources: ({ req, appConfig, getFiles, requestFileSet, attachments: _attachments, tool_resources: _tool_resources, agentId, }: {
    req: ServerRequest & {
        user?: IUser;
    };
    appConfig: AppConfig;
    requestFileSet: Set<string>;
    attachments: Promise<Array<TFile | null>> | undefined;
    tool_resources: AgentToolResources | undefined;
    getFiles: TGetFiles;
    agentId?: string | undefined;
}) => Promise<{
    attachments: Array<TFile | undefined> | undefined;
    tool_resources: AgentToolResources | undefined;
}>;
//# sourceMappingURL=resources.d.ts.map