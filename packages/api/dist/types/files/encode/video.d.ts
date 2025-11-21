import { Providers } from '@librechat/agents';
import type { IMongoFile } from '@librechat/data-schemas';
import type { Request } from 'express';
import type { StrategyFunctions, VideoResult } from '~/types/files';
/**
 * Encodes and formats video files for different providers
 * @param req - The request object
 * @param files - Array of video files
 * @param provider - The provider to format for
 * @param getStrategyFunctions - Function to get strategy functions
 * @returns Promise that resolves to videos and file metadata
 */
export declare function encodeAndFormatVideos(req: Request, files: IMongoFile[], provider: Providers, getStrategyFunctions: (source: string) => StrategyFunctions): Promise<VideoResult>;
//# sourceMappingURL=video.d.ts.map