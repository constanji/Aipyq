import type { IMongoFile } from '@librechat/data-schemas';
import type { Request } from 'express';
import type { StrategyFunctions, ProcessedFile } from '~/types/files';
/**
 * Processes a file by downloading and encoding it to base64
 * @param req - Express request object
 * @param file - File object to process
 * @param encodingMethods - Cache of encoding methods by source
 * @param getStrategyFunctions - Function to get strategy functions for a source
 * @returns Processed file with content and metadata, or null if filepath missing
 */
export declare function getFileStream(req: Request, file: IMongoFile, encodingMethods: Record<string, StrategyFunctions>, getStrategyFunctions: (source: string) => StrategyFunctions): Promise<ProcessedFile | null>;
//# sourceMappingURL=utils.d.ts.map