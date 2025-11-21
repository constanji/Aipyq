import fetch from 'node-fetch';
import type { Response as ServerResponse } from 'express';
import type { ServerSentEvent } from '~/types';
/**
 * Makes a function to make HTTP request and logs the process.
 * @param params
 * @param params.directEndpoint - Whether to use a direct endpoint.
 * @param params.reverseProxyUrl - The reverse proxy URL to use for the request.
 * @returns A promise that resolves to the response of the fetch request.
 */
export declare function createFetch({ directEndpoint, reverseProxyUrl, }: {
    directEndpoint?: boolean;
    reverseProxyUrl?: string;
}): (_url: fetch.RequestInfo, init: fetch.RequestInit) => Promise<fetch.Response>;
/**
 * Creates event handlers for stream events that don't capture client references
 * @param res - The response object to send events to
 * @returns Object containing handler functions
 */
export declare function createStreamEventHandlers(res: ServerResponse): {
    on_run_step: (event: ServerSentEvent) => void;
    on_message_delta: (event: ServerSentEvent) => void;
    on_reasoning_delta: (event: ServerSentEvent) => void;
};
export declare function createHandleLLMNewToken(streamRate: number): () => Promise<void>;
//# sourceMappingURL=generators.d.ts.map