import { Keyv } from 'keyv';
import { RedisStore } from 'rate-limit-redis';
import { MemoryStore } from 'express-session';
import { RedisStore as ConnectRedis } from 'connect-redis';
/**
 * Creates a cache instance using Redis or a fallback store. Suitable for general caching needs.
 * @param namespace - The cache namespace.
 * @param ttl - Time to live for cache entries.
 * @param fallbackStore - Optional fallback store if Redis is not used.
 * @returns Cache instance.
 */
export declare const standardCache: (namespace: string, ttl?: number, fallbackStore?: object) => Keyv;
/**
 * Creates a cache instance for storing violation data.
 * Uses a file-based fallback store if Redis is not enabled.
 * @param namespace - The cache namespace for violations.
 * @param ttl - Time to live for cache entries.
 * @returns Cache instance for violations.
 */
export declare const violationCache: (namespace: string, ttl?: number) => Keyv;
/**
 * Creates a session cache instance using Redis or in-memory store.
 * @param namespace - The session namespace.
 * @param ttl - Time to live for session entries.
 * @returns Session store instance.
 */
export declare const sessionCache: (namespace: string, ttl?: number) => MemoryStore | ConnectRedis;
/**
 * Creates a rate limiter cache using Redis.
 * @param prefix - The key prefix for rate limiting.
 * @returns RedisStore instance or undefined if Redis is not used.
 */
export declare const limiterCache: (prefix: string) => RedisStore | undefined;
//# sourceMappingURL=cacheFactory.d.ts.map