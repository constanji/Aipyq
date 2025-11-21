import type { Response as ServerResponse } from 'express';
import type { ServerSentEvent } from '~/types';
/**
 * Sends message data in Server Sent Events format.
 * @param res - The server response.
 * @param event - The message event.
 * @param event.event - The type of event.
 * @param event.data - The message to be sent.
 */
export declare function sendEvent(res: ServerResponse, event: ServerSentEvent): void;
/**
 * Sends error data in Server Sent Events format and ends the response.
 * @param res - The server response.
 * @param message - The error message.
 */
export declare function handleError(res: ServerResponse, message: string): void;
//# sourceMappingURL=events.d.ts.map