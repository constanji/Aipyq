/**
 * Helper function to safely log sensitive data when debug mode is enabled
 * @param obj - Object to stringify
 * @param maxLength - Maximum length of the stringified output
 * @returns Stringified object with sensitive data masked
 */
export declare function safeStringify(obj: unknown, maxLength?: number): string;
/**
 * Helper to log headers without revealing sensitive information
 * @param headers - Headers object to log
 * @returns Stringified headers with sensitive data masked
 */
export declare function logHeaders(headers: Headers | undefined | null): string;
//# sourceMappingURL=openid.d.ts.map