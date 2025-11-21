import type { Redis, Cluster } from 'ioredis';
import type { RedisClientType, RedisClusterType } from '@redis/client';
declare let ioredisClient: Redis | Cluster | null;
declare let keyvRedisClient: RedisClientType | RedisClusterType | null;
export { ioredisClient, keyvRedisClient };
//# sourceMappingURL=redisClients.d.ts.map