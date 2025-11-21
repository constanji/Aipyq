/**
 * Normalizes an error-like object into an HTTP status and message.
 * Ensures we always respond with a valid numeric status to avoid UI hangs.
 */
export declare function normalizeHttpError(err: Error | {
    status?: number;
    message?: string;
} | unknown, fallbackStatus?: number): {
    status: number;
    message: string;
};
//# sourceMappingURL=http.d.ts.map