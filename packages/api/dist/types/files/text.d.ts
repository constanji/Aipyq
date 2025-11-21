/// <reference types="multer" />
import type { Request as ServerRequest } from 'express';
/**
 * Attempts to parse text using RAG API, falls back to native text parsing
 * @param params - The parameters object
 * @param params.req - The Express request object
 * @param params.file - The uploaded file
 * @param params.file_id - The file ID
 * @returns
 */
export declare function parseText({ req, file, file_id, }: {
    req: Pick<ServerRequest, 'user'> & {
        user?: {
            id: string;
        };
    };
    file: Express.Multer.File;
    file_id: string;
}): Promise<{
    text: string;
    bytes: number;
    source: string;
}>;
/**
 * Native JavaScript text parsing fallback
 * Simple text file reading - complex formats handled by RAG API
 * @param file - The uploaded file
 * @returns
 */
export declare function parseTextNative(file: Express.Multer.File): Promise<{
    text: string;
    bytes: number;
    source: string;
}>;
//# sourceMappingURL=text.d.ts.map