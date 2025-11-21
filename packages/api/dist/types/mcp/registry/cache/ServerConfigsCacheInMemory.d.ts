import { ParsedServerConfig } from '~/mcp/types';
/**
 * In-memory implementation of MCP server configurations cache for single-instance deployments.
 * Uses a native JavaScript Map for fast, local storage without Redis dependencies.
 * Suitable for development environments or single-server production deployments.
 * Does not require leader checks or distributed coordination since data is instance-local.
 * Data is lost on server restart and not shared across multiple server instances.
 */
export declare class ServerConfigsCacheInMemory {
    private readonly cache;
    add(serverName: string, config: ParsedServerConfig): Promise<void>;
    update(serverName: string, config: ParsedServerConfig): Promise<void>;
    remove(serverName: string): Promise<void>;
    get(serverName: string): Promise<ParsedServerConfig | undefined>;
    getAll(): Promise<Record<string, ParsedServerConfig>>;
    reset(): Promise<void>;
}
//# sourceMappingURL=ServerConfigsCacheInMemory.d.ts.map