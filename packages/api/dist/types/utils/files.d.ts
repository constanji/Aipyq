/// <reference types="node" />
/**
 * Sanitize a filename by removing any directory components, replacing non-alphanumeric characters
 * @param inputName
 */
export declare function sanitizeFilename(inputName: string): string;
/**
 * Options for reading files
 */
export interface ReadFileOptions {
    encoding?: BufferEncoding;
    /** Size threshold in bytes. Files larger than this will be streamed. Default: 10MB */
    streamThreshold?: number;
    /** Size of chunks when streaming. Default: 64KB */
    highWaterMark?: number;
    /** File size in bytes if known (e.g. from multer). Avoids extra stat() call. */
    fileSize?: number;
}
/**
 * Result from reading a file
 */
export interface ReadFileResult<T> {
    content: T;
    bytes: number;
}
/**
 * Reads a file asynchronously. Uses streaming for large files to avoid memory issues.
 *
 * @param filePath - Path to the file to read
 * @param options - Options for reading the file
 * @returns Promise resolving to the file contents and size
 * @throws Error if the file cannot be read
 */
export declare function readFileAsString(filePath: string, options?: ReadFileOptions): Promise<ReadFileResult<string>>;
/**
 * Reads a file as a Buffer asynchronously. Uses streaming for large files.
 *
 * @param filePath - Path to the file to read
 * @param options - Options for reading the file
 * @returns Promise resolving to the file contents and size
 * @throws Error if the file cannot be read
 */
export declare function readFileAsBuffer(filePath: string, options?: Omit<ReadFileOptions, 'encoding'>): Promise<ReadFileResult<Buffer>>;
/**
 * Reads a JSON file asynchronously
 *
 * @param filePath - Path to the JSON file to read
 * @param options - Options for reading the file
 * @returns Promise resolving to the parsed JSON object
 * @throws Error if the file cannot be read or parsed
 */
export declare function readJsonFile<T = unknown>(filePath: string, options?: Omit<ReadFileOptions, 'encoding'>): Promise<T>;
//# sourceMappingURL=files.d.ts.map