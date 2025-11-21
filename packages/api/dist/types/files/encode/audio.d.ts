import { Providers } from '@librechat/agents';
import type { IMongoFile } from '@librechat/data-schemas';
import type { Request } from 'express';
import type { StrategyFunctions, AudioResult } from '~/types/files';
/**
 * Encodes and formats audio files for different providers
 * @param req - The request object
 * @param files - Array of audio files
 * @param provider - The provider to format for (currently only google is supported)
 * @param getStrategyFunctions - Function to get strategy functions
 * @returns Promise that resolves to audio and file metadata
 */
export declare function encodeAndFormatAudios(req: Request, files: IMongoFile[], provider: Providers, getStrategyFunctions: (source: string) => StrategyFunctions): Promise<AudioResult>;
//# sourceMappingURL=audio.d.ts.map