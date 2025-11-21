import type Keyv from 'keyv';
import { ParsedServerConfig } from '~/mcp/types';
import { BaseRegistryCache } from './BaseRegistryCache';
/**
 * Redis-backed implementation of MCP server configurations cache for distributed deployments.
 * Stores server configs in Redis with namespace isolation by owner (App, User, or specific user ID).
 * Enables data sharing across multiple server instances in a cluster environment.
 * Supports optional leader-only write operations to prevent race conditions during initialization.
 * Data persists across server restarts and is accessible from any instance in the cluster.
 */
export declare class ServerConfigsCacheRedis extends BaseRegistryCache {
    protected readonly cache: Keyv;
    private readonly owner;
    private readonly leaderOnly;
    constructor(owner: string, leaderOnly: boolean);
    add(serverName: string, config: ParsedServerConfig): Promise<void>;
    update(serverName: string, config: ParsedServerConfig): Promise<void>;
    remove(serverName: string): Promise<void>;
    get(serverName: string): Promise<ParsedServerConfig | undefined>;
    getAll(): Promise<Record<string, ParsedServerConfig>>;
}
//# sourceMappingURL=ServerConfigsCacheRedis.d.ts.map