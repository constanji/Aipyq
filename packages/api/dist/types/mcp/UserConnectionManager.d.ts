import { MCPConnection } from './connection';
import type * as t from './types';
import { ConnectionsRepository } from '~/mcp/ConnectionsRepository';
/**
 * Abstract base class for managing user-specific MCP connections with lifecycle management.
 * Only meant to be extended by MCPManager.
 * Much of the logic was move here from the old MCPManager to make it more manageable.
 * User connections will soon be ephemeral and not cached anymore:
 * https://github.com/danny-avila/LibreChat/discussions/8790
 */
export declare abstract class UserConnectionManager {
    appConnections: ConnectionsRepository | null;
    protected userConnections: Map<string, Map<string, MCPConnection>>;
    /** Last activity timestamp for users (not per server) */
    protected userLastActivity: Map<string, number>;
    protected readonly USER_CONNECTION_IDLE_TIMEOUT: number;
    /** Updates the last activity timestamp for a user */
    protected updateUserLastActivity(userId: string): void;
    /** Gets or creates a connection for a specific user */
    getUserConnection({ serverName, forceNew, user, flowManager, customUserVars, requestBody, tokenMethods, oauthStart, oauthEnd, signal, returnOnOAuth, connectionTimeout, }: {
        serverName: string;
        forceNew?: boolean;
    } & Omit<t.OAuthConnectionOptions, 'useOAuth'>): Promise<MCPConnection>;
    /** Returns all connections for a specific user */
    getUserConnections(userId: string): Map<string, MCPConnection> | undefined;
    /** Removes a specific user connection entry */
    protected removeUserConnection(userId: string, serverName: string): void;
    /** Disconnects and removes a specific user connection */
    disconnectUserConnection(userId: string, serverName: string): Promise<void>;
    /** Disconnects and removes all connections for a specific user */
    disconnectUserConnections(userId: string): Promise<void>;
    /** Check for and disconnect idle connections */
    protected checkIdleConnections(currentUserId?: string): void;
}
//# sourceMappingURL=UserConnectionManager.d.ts.map