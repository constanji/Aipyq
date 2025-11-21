import type * as t from '~/mcp/types';
/**
 * Handles initialization of MCP servers at application startup with distributed coordination.
 * In cluster environments, ensures only the leader node performs initialization while followers wait.
 * Connects to each configured MCP server, inspects capabilities and tools, then caches the results.
 * Categorizes servers as either shared app servers (auto-started) or shared user servers (OAuth/on-demand).
 * Uses a timeout mechanism to prevent hanging on unresponsive servers during initialization.
 */
export declare class MCPServersInitializer {
    /**
     * Initializes MCP servers with distributed leader-follower coordination.
     *
     * Design rationale:
     * - Handles leader crash scenarios: If the leader crashes during initialization, all followers
     *   will independently attempt initialization after a 3-second delay. The first to become leader
     *   will complete the initialization.
     * - Only the leader performs the actual initialization work (reset caches, inspect servers).
     *   When complete, the leader signals completion via `statusCache`, allowing followers to proceed.
     * - Followers wait and poll `statusCache` until the leader finishes, ensuring only one node
     *   performs the expensive initialization operations.
     */
    static initialize(rawConfigs: t.MCPServers): Promise<void>;
    /** Initializes a single server with all its metadata and adds it to appropriate collections */
    private static initializeServer;
    private static logParsedConfig;
    private static prefix;
}
//# sourceMappingURL=MCPServersInitializer.d.ts.map