export interface OAuthDetectionResult {
    requiresOAuth: boolean;
    method: 'protected-resource-metadata' | '401-challenge-metadata' | 'no-metadata-found';
    metadata?: Record<string, unknown> | null;
}
/**
 * Detects if an MCP server requires OAuth authentication using proactive discovery methods.
 *
 * This function implements a comprehensive OAuth detection strategy:
 * 1. Standard Protected Resource Metadata (RFC 9728) - checks /.well-known/oauth-protected-resource
 * 2. 401 Challenge Method - checks WWW-Authenticate header for resource_metadata URL
 * 3. Optional fallback: treat any 401/403 response as OAuth requirement (if MCP_OAUTH_ON_AUTH_ERROR=true)
 *
 * @param serverUrl - The MCP server URL to check for OAuth requirements
 * @returns Promise<OAuthDetectionResult> - OAuth requirement details
 */
export declare function detectOAuthRequirement(serverUrl: string): Promise<OAuthDetectionResult>;
//# sourceMappingURL=detectOAuth.d.ts.map