import type { AudioProcessingResult, ServerRequest, STTService, FileObject } from '~/types';
/**
 * Processes audio files using Speech-to-Text (STT) service.
 * @returns A promise that resolves to an object containing text and bytes.
 */
export declare function processAudioFile({ req, file, sttService, }: {
    req: ServerRequest;
    file: FileObject;
    sttService: STTService;
}): Promise<AudioProcessingResult>;
//# sourceMappingURL=audio.d.ts.map