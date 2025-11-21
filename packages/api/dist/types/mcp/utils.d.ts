export declare const mcpToolPattern: RegExp;
/**
 * Normalizes a server name to match the pattern ^[a-zA-Z0-9_.-]+$
 * This is required for Azure OpenAI models with Tool Calling
 */
export declare function normalizeServerName(serverName: string): string;
/**
 * Sanitizes a URL by removing query parameters to prevent credential leakage in logs.
 * @param url - The URL to sanitize (string or URL object)
 * @returns The sanitized URL string without query parameters
 */
export declare function sanitizeUrlForLogging(url: string | URL): string;
//# sourceMappingURL=utils.d.ts.map