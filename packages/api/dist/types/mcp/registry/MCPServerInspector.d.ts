import type { MCPConnection } from '~/mcp/connection';
import type * as t from '~/mcp/types';
/**
 * Inspects MCP servers to discover their metadata, capabilities, and tools.
 * Connects to servers and populates configuration with OAuth requirements,
 * server instructions, capabilities, and available tools.
 */
export declare class MCPServerInspector {
    private readonly serverName;
    private readonly config;
    private connection;
    private constructor();
    /**
     * Inspects a server and returns an enriched configuration with metadata.
     * Detects OAuth requirements and fetches server capabilities.
     * @param serverName - The name of the server (used for tool function naming)
     * @param rawConfig - The raw server configuration
     * @param connection - The MCP connection
     * @returns A fully processed and enriched configuration with server metadata
     */
    static inspect(serverName: string, rawConfig: t.MCPOptions, connection?: MCPConnection): Promise<t.ParsedServerConfig>;
    private inspectServer;
    private detectOAuth;
    private fetchServerInstructions;
    private fetchServerCapabilities;
    private fetchToolFunctions;
    /**
     * Converts server tools to LibreChat-compatible tool functions format.
     * @param serverName - The name of the server
     * @param connection - The MCP connection
     * @returns Tool functions formatted for LibreChat
     */
    static getToolFunctions(serverName: string, connection: MCPConnection): Promise<t.LCAvailableTools>;
}
//# sourceMappingURL=MCPServerInspector.d.ts.map