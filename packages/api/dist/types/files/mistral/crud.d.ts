/// <reference types="multer" />
import type { MistralFileUploadResponse, MistralSignedUrlResponse, MistralOCRUploadResult, ServerRequest, OCRResult } from '~/types';
/** Helper type for OCR request context */
interface OCRContext {
    req: ServerRequest;
    file: Express.Multer.File;
    loadAuthValues: (params: {
        userId: string;
        authFields: string[];
        optional?: Set<string>;
    }) => Promise<Record<string, string | undefined>>;
}
/**
 * Uploads a document to Mistral API using file streaming to avoid loading the entire file into memory
 * @param params Upload parameters
 * @param params.filePath The path to the file on disk
 * @param params.fileName Optional filename to use (defaults to the name from filePath)
 * @param params.apiKey Mistral API key
 * @param params.baseURL Mistral API base URL
 * @returns The response from Mistral API
 */
export declare function uploadDocumentToMistral({ apiKey, filePath, baseURL, fileName, }: {
    apiKey: string;
    filePath: string;
    baseURL?: string;
    fileName?: string;
}): Promise<MistralFileUploadResponse>;
export declare function getSignedUrl({ apiKey, fileId, expiry, baseURL, }: {
    apiKey: string;
    fileId: string;
    expiry?: number;
    baseURL?: string;
}): Promise<MistralSignedUrlResponse>;
/**
 * @param {Object} params
 * @param {string} params.apiKey
 * @param {string} params.url - The document or image URL
 * @param {string} [params.documentType='document_url'] - 'document_url' or 'image_url'
 * @param {string} [params.model]
 * @param {string} [params.baseURL]
 * @returns {Promise<OCRResult>}
 */
export declare function performOCR({ url, apiKey, model, baseURL, documentType, }: {
    url: string;
    apiKey: string;
    model?: string;
    baseURL?: string;
    documentType?: 'document_url' | 'image_url';
}): Promise<OCRResult>;
/**
 * Deletes a file from Mistral API
 * @param params Delete parameters
 * @param params.fileId The file ID to delete
 * @param params.apiKey Mistral API key
 * @param params.baseURL Mistral API base URL
 * @returns Promise that resolves when the file is deleted
 */
export declare function deleteMistralFile({ fileId, apiKey, baseURL, }: {
    fileId: string;
    apiKey: string;
    baseURL?: string;
}): Promise<void>;
/**
 * Uploads a file to the Mistral OCR API and processes the OCR result.
 *
 * @param params - The params object.
 * @param params.req - The request object from Express. It should have a `user` property with an `id`
 *                       representing the user
 * @param params.file - The file object, which is part of the request. The file object should
 *                                     have a `mimetype` property that tells us the file type
 * @param params.loadAuthValues - Function to load authentication values
 * @returns - The result object containing the processed `text` and `images` (not currently used),
 *                       along with the `filename` and `bytes` properties.
 */
export declare const uploadMistralOCR: (context: OCRContext) => Promise<MistralOCRUploadResult>;
/**
 * Use Azure Mistral OCR API to processe the OCR result.
 *
 * @param params - The params object.
 * @param params.req - The request object from Express. It should have a `user` property with an `id`
 *                       representing the user
 * @param params.appConfig - Application configuration object
 * @param params.file - The file object, which is part of the request. The file object should
 *                                     have a `mimetype` property that tells us the file type
 * @param params.loadAuthValues - Function to load authentication values
 * @returns - The result object containing the processed `text` and `images` (not currently used),
 *                       along with the `filename` and `bytes` properties.
 */
export declare const uploadAzureMistralOCR: (context: OCRContext) => Promise<MistralOCRUploadResult>;
/**
 * Use Google Vertex AI Mistral OCR API to process the OCR result.
 *
 * @param params - The params object.
 * @param params.req - The request object from Express. It should have a `user` property with an `id`
 *                       representing the user
 * @param params.appConfig - Application configuration object
 * @param params.file - The file object, which is part of the request. The file object should
 *                                     have a `mimetype` property that tells us the file type
 * @param params.loadAuthValues - Function to load authentication values
 * @returns - The result object containing the processed `text` and `images` (not currently used),
 *                       along with the `filename` and `bytes` properties.
 */
export declare const uploadGoogleVertexMistralOCR: (context: OCRContext) => Promise<MistralOCRUploadResult>;
export {};
//# sourceMappingURL=crud.d.ts.map