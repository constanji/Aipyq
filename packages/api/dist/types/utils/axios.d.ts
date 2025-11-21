import type { AxiosInstance, AxiosError } from 'axios';
/**
 * Logs Axios errors based on the error object and a custom message.
 * @param options - The options object.
 * @param options.message - The custom message to be logged.
 * @param options.error - The Axios error object.
 * @returns The log message.
 */
export declare const logAxiosError: ({ message, error, }: {
    message: string;
    error: AxiosError | Error | unknown;
}) => string;
/**
 * Creates and configures an Axios instance with optional proxy settings.

 * @returns A configured Axios instance
 * @throws If there's an issue creating the Axios instance or parsing the proxy URL
 */
export declare function createAxiosInstance(): AxiosInstance;
//# sourceMappingURL=axios.d.ts.map