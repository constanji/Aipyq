/// <reference types="node" />
import { Providers } from '@librechat/agents';
export interface PDFValidationResult {
    isValid: boolean;
    error?: string;
}
export interface VideoValidationResult {
    isValid: boolean;
    error?: string;
}
export interface AudioValidationResult {
    isValid: boolean;
    error?: string;
}
export declare function validatePdf(pdfBuffer: Buffer, fileSize: number, provider: Providers): Promise<PDFValidationResult>;
/**
 * Validates video files for different providers
 * @param videoBuffer - The video file as a buffer
 * @param fileSize - The file size in bytes
 * @param provider - The provider to validate for
 * @returns Promise that resolves to validation result
 */
export declare function validateVideo(videoBuffer: Buffer, fileSize: number, provider: Providers): Promise<VideoValidationResult>;
/**
 * Validates audio files for different providers
 * @param audioBuffer - The audio file as a buffer
 * @param fileSize - The file size in bytes
 * @param provider - The provider to validate for
 * @returns Promise that resolves to validation result
 */
export declare function validateAudio(audioBuffer: Buffer, fileSize: number, provider: Providers): Promise<AudioValidationResult>;
//# sourceMappingURL=validation.d.ts.map