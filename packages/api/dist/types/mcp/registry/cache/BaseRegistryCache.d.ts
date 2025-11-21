import type Keyv from 'keyv';
/**
 * Base class for MCP registry caches that require distributed leader coordination.
 * Provides helper methods for leader-only operations and success validation.
 * All concrete implementations must provide their own Keyv cache instance.
 */
export declare abstract class BaseRegistryCache {
    protected readonly PREFIX = "MCP::ServersRegistry";
    protected abstract readonly cache: Keyv;
    protected leaderCheck(action: string): Promise<void>;
    protected successCheck(action: string, success: boolean): true;
    reset(): Promise<void>;
}
//# sourceMappingURL=BaseRegistryCache.d.ts.map