import { Providers } from '@librechat/agents';
import type { IMongoFile } from '@librechat/data-schemas';
import type { Request } from 'express';
import type { StrategyFunctions, DocumentResult } from '~/types/files';
/**
 * Processes and encodes document files for various providers
 * @param req - Express request object
 * @param files - Array of file objects to process
 * @param provider - The provider name
 * @param getStrategyFunctions - Function to get strategy functions
 * @returns Promise that resolves to documents and file metadata
 */
export declare function encodeAndFormatDocuments(req: Request, files: IMongoFile[], { provider, useResponsesApi }: {
    provider: Providers;
    useResponsesApi?: boolean;
}, getStrategyFunctions: (source: string) => StrategyFunctions): Promise<DocumentResult>;
//# sourceMappingURL=document.d.ts.map