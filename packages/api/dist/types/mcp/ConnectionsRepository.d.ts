import { MCPConnection } from './connection';
import type * as t from './types';
/**
 * Manages MCP connections with lazy loading and reconnection.
 * Maintains a pool of connections and handles connection lifecycle management.
 */
export declare class ConnectionsRepository {
    protected readonly serverConfigs: Record<string, t.MCPOptions>;
    protected connections: Map<string, MCPConnection>;
    protected oauthOpts: t.OAuthConnectionOptions | undefined;
    constructor(serverConfigs: t.MCPServers, oauthOpts?: t.OAuthConnectionOptions);
    /** Checks whether this repository can connect to a specific server */
    has(serverName: string): boolean;
    /** Gets or creates a connection for the specified server with lazy loading */
    get(serverName: string): Promise<MCPConnection>;
    /** Gets or creates connections for multiple servers concurrently */
    getMany(serverNames: string[]): Promise<Map<string, MCPConnection>>;
    /** Returns all currently loaded connections without creating new ones */
    getLoaded(): Promise<Map<string, MCPConnection>>;
    /** Gets or creates connections for all configured servers */
    getAll(): Promise<Map<string, MCPConnection>>;
    /** Disconnects and removes a specific server connection from the pool */
    disconnect(serverName: string): Promise<void>;
    /** Disconnects all active connections and returns array of disconnect promises */
    disconnectAll(): Promise<void>[];
    protected getServerConfig(serverName: string): t.MCPOptions;
    protected prefix(serverName: string): string;
}
//# sourceMappingURL=ConnectionsRepository.d.ts.map