declare const cacheConfig: {
    FORCED_IN_MEMORY_CACHE_NAMESPACES: string[];
    USE_REDIS: boolean;
    REDIS_URI: string | undefined;
    REDIS_USERNAME: string | undefined;
    REDIS_PASSWORD: string | undefined;
    REDIS_CA: string | null;
    REDIS_KEY_PREFIX: string;
    GLOBAL_PREFIX_SEPARATOR: string;
    REDIS_MAX_LISTENERS: number;
    REDIS_PING_INTERVAL: number;
    /** Max delay between reconnection attempts in ms */
    REDIS_RETRY_MAX_DELAY: number;
    /** Max number of reconnection attempts (0 = infinite) */
    REDIS_RETRY_MAX_ATTEMPTS: number;
    /** Connection timeout in ms */
    REDIS_CONNECT_TIMEOUT: number;
    /** Queue commands when disconnected */
    REDIS_ENABLE_OFFLINE_QUEUE: boolean;
    /** flag to modify redis connection by adding dnsLookup this is required when connecting to elasticache for ioredis
     * see "Special Note: Aws Elasticache Clusters with TLS" on this webpage:  https://www.npmjs.com/package/ioredis **/
    REDIS_USE_ALTERNATIVE_DNS_LOOKUP: boolean;
    /** Enable redis cluster without the need of multiple URIs */
    USE_REDIS_CLUSTER: boolean;
    CI: boolean;
    DEBUG_MEMORY_CACHE: boolean;
    BAN_DURATION: number;
};
export { cacheConfig };
//# sourceMappingURL=cacheConfig.d.ts.map