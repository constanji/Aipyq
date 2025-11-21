import type { OAuthClientInformation } from '@modelcontextprotocol/sdk/shared/auth.js';
import type { TokenMethods } from '@librechat/data-schemas';
import type { MCPOAuthTokens, OAuthMetadata } from '~/mcp/oauth';
import type { FlowStateManager } from '~/flow/manager';
import type * as t from './types';
import { MCPConnection } from './connection';
/**
 * Factory for creating MCP connections with optional OAuth authentication.
 * Handles OAuth flows, token management, and connection retry logic.
 * NOTE: Much of the OAuth logic was extracted from the old MCPManager class as is.
 */
export declare class MCPConnectionFactory {
    protected readonly serverName: string;
    protected readonly serverConfig: t.MCPOptions;
    protected readonly logPrefix: string;
    protected readonly useOAuth: boolean;
    protected readonly userId?: string;
    protected readonly flowManager?: FlowStateManager<MCPOAuthTokens | null>;
    protected readonly tokenMethods?: TokenMethods;
    protected readonly signal?: AbortSignal;
    protected readonly oauthStart?: (authURL: string) => Promise<void>;
    protected readonly oauthEnd?: () => Promise<void>;
    protected readonly returnOnOAuth?: boolean;
    protected readonly connectionTimeout?: number;
    /** Creates a new MCP connection with optional OAuth support */
    static create(basic: t.BasicConnectionOptions, oauth?: t.OAuthConnectionOptions): Promise<MCPConnection>;
    protected constructor(basic: t.BasicConnectionOptions, oauth?: t.OAuthConnectionOptions);
    /** Creates the base MCP connection with OAuth tokens */
    protected createConnection(): Promise<MCPConnection>;
    /** Retrieves existing OAuth tokens from storage or returns null */
    protected getOAuthTokens(): Promise<MCPOAuthTokens | null>;
    /** Creates a function to refresh OAuth tokens when they expire */
    protected createRefreshTokensFunction(): (refreshToken: string, metadata: {
        userId: string;
        serverName: string;
        identifier: string;
        clientInfo?: OAuthClientInformation;
    }) => Promise<MCPOAuthTokens>;
    /** Sets up OAuth event handlers for the connection */
    protected handleOAuthEvents(connection: MCPConnection): () => void;
    /** Attempts to establish connection with timeout handling */
    protected attemptToConnect(connection: MCPConnection): Promise<void>;
    private connectTo;
    private isOAuthError;
    /** Manages OAuth flow initiation and completion */
    protected handleOAuthRequired(): Promise<{
        tokens: MCPOAuthTokens | null;
        clientInfo?: OAuthClientInformation;
        metadata?: OAuthMetadata;
    } | null>;
}
//# sourceMappingURL=MCPConnectionFactory.d.ts.map