import type * as t from '~/mcp/types';
import { type ServerConfigsCache } from './cache/ServerConfigsCacheFactory';
/**
 * Central registry for managing MCP server configurations across different scopes and users.
 * Maintains three categories of server configurations:
 * - Shared App Servers: Auto-started servers available to all users (initialized at startup)
 * - Shared User Servers: User-scope servers that require OAuth or on-demand startup
 * - Private User Servers: Per-user configurations dynamically added during runtime
 *
 * Provides a unified interface for retrieving server configs with proper fallback hierarchy:
 * checks shared app servers first, then shared user servers, then private user servers.
 * Handles server lifecycle operations including adding, removing, and querying configurations.
 */
declare class MCPServersRegistry {
    readonly sharedAppServers: ServerConfigsCache;
    readonly sharedUserServers: ServerConfigsCache;
    private readonly privateUserServers;
    addPrivateUserServer(userId: string, serverName: string, config: t.ParsedServerConfig): Promise<void>;
    updatePrivateUserServer(userId: string, serverName: string, config: t.ParsedServerConfig): Promise<void>;
    removePrivateUserServer(userId: string, serverName: string): Promise<void>;
    getServerConfig(serverName: string, userId?: string): Promise<t.ParsedServerConfig | undefined>;
    getAllServerConfigs(userId?: string): Promise<Record<string, t.ParsedServerConfig>>;
    getOAuthServers(userId?: string): Promise<Set<string>>;
    reset(): Promise<void>;
}
export declare const mcpServersRegistry: MCPServersRegistry;
export {};
//# sourceMappingURL=MCPServersRegistry.d.ts.map