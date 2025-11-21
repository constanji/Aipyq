import type { MCPOptions } from 'librechat-data-provider';
import type { FlowStateManager } from '~/flow/manager';
import type { OAuthClientInformation, MCPOAuthFlowMetadata, MCPOAuthTokens } from './types';
export declare class MCPOAuthHandler {
    private static readonly FLOW_TYPE;
    private static readonly FLOW_TTL;
    /**
     * Creates a fetch function with custom headers injected
     */
    private static createOAuthFetch;
    /**
     * Discovers OAuth metadata from the server
     */
    private static discoverMetadata;
    /**
     * Registers an OAuth client dynamically
     */
    private static registerOAuthClient;
    /**
     * Initiates the OAuth flow for an MCP server
     */
    static initiateOAuthFlow(serverName: string, serverUrl: string, userId: string, oauthHeaders: Record<string, string>, config?: MCPOptions['oauth']): Promise<{
        authorizationUrl: string;
        flowId: string;
        flowMetadata: MCPOAuthFlowMetadata;
    }>;
    /**
     * Completes the OAuth flow by exchanging the authorization code for tokens
     */
    static completeOAuthFlow(flowId: string, authorizationCode: string, flowManager: FlowStateManager<MCPOAuthTokens>, oauthHeaders: Record<string, string>): Promise<MCPOAuthTokens>;
    /**
     * Gets the OAuth flow metadata
     */
    static getFlowState(flowId: string, flowManager: FlowStateManager<MCPOAuthTokens>): Promise<MCPOAuthFlowMetadata | null>;
    /**
     * Generates a flow ID for the OAuth flow
     * @returns Consistent ID so concurrent requests share the same flow
     */
    static generateFlowId(userId: string, serverName: string): string;
    /**
     * Generates a secure state parameter
     */
    private static generateState;
    /**
     * Gets the default redirect URI for a server
     */
    private static getDefaultRedirectUri;
    /**
     * Refreshes OAuth tokens using a refresh token
     */
    static refreshOAuthTokens(refreshToken: string, metadata: {
        serverName: string;
        serverUrl?: string;
        clientInfo?: OAuthClientInformation;
    }, oauthHeaders: Record<string, string>, config?: MCPOptions['oauth']): Promise<MCPOAuthTokens>;
    /**
     * Revokes OAuth tokens at the authorization server (RFC 7009)
     */
    static revokeOAuthToken(serverName: string, token: string, tokenType: 'refresh' | 'access', metadata: {
        serverUrl: string;
        clientId: string;
        clientSecret: string;
        revocationEndpoint?: string;
        revocationEndpointAuthMethodsSupported?: string[];
    }, oauthHeaders?: Record<string, string>): Promise<void>;
}
//# sourceMappingURL=handler.d.ts.map