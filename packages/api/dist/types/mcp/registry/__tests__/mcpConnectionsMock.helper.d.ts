/// <reference types="jest" />
import type { MCPConnection } from '~/mcp/connection';
/**
 * Creates a single mock MCP connection for testing.
 * The connection has a client with mocked methods that return server-specific data.
 * @param serverName - Name of the server to create mock connection for
 * @returns Mocked MCPConnection instance
 */
export declare function createMockConnection(serverName: string): jest.Mocked<MCPConnection>;
/**
 * Creates mock MCP connections for testing.
 * Each connection has a client with mocked methods that return server-specific data.
 * @param serverNames - Array of server names to create mock connections for
 * @returns Map of server names to mocked MCPConnection instances
 */
export declare function createMockConnectionsMap(serverNames: string[]): Map<string, jest.Mocked<MCPConnection>>;
//# sourceMappingURL=mcpConnectionsMock.helper.d.ts.map