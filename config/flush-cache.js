#!/usr/bin/env node

/**
 * LibreChat Cache Flush Utility
 *
 * This script flushes the cache store used by LibreChat, whether it's
 * Redis (if configured) or file-based cache.
 *
 * Usage:
 *   npm run flush-cache
 *   node config/flush-cache.js
 *   node config/flush-cache.js --help
 */

const path = require('path');
const fs = require('fs');

// Set up environment
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const {
  USE_REDIS,
  REDIS_URI,
  REDIS_USERNAME,
  REDIS_PASSWORD,
  REDIS_CA,
  REDIS_KEY_PREFIX,
  USE_REDIS_CLUSTER,
  REDIS_USE_ALTERNATIVE_DNS_LOOKUP,
} = process.env;

// Simple utility function
const isEnabled = (value) => value === 'true' || value === true;

// Helper function to read Redis CA certificate
const getRedisCA = () => {
  if (!REDIS_CA) {
    return null;
  }
  try {
    if (fs.existsSync(REDIS_CA)) {
      return fs.readFileSync(REDIS_CA, 'utf8');
    } else {
      console.warn(`⚠️  未找到 Redis CA 证书文件: ${REDIS_CA}`);
      return null;
    }
  } catch (error) {
    console.error(`❌ 读取 Redis CA 证书文件 '${REDIS_CA}' 失败:`, error.message);
    return null;
  }
};

async function showHelp() {
  console.log(`
LibreChat 缓存清理工具

描述:
  清理 LibreChat 使用的缓存存储。自动检测
  是否使用 Redis 或基于文件的缓存，并相应地清理。

用法:
  npm run flush-cache
  node config/flush-cache.js [选项]

选项:
  --help, -h      显示此帮助信息
  --dry-run       显示将要清理的内容，但不实际执行
  --verbose, -v   显示详细输出

缓存类型:
  • Redis 缓存:     清理配置的 Redis 前缀的所有键
  • 文件缓存:        删除 ./data/logs.json 和 ./data/violations.json

将被清理的内容:
  • 用户会话和身份验证令牌
  • 配置缓存
  • 模型查询缓存
  • 速率限制数据
  • 对话标题缓存
  • 文件上传进度
  • SharePoint 令牌
  • 以及更多...

注意: 这将注销所有用户，可能需要他们重新进行身份验证。
`);
}

async function flushRedisCache(dryRun = false, verbose = false) {
  try {
    console.log('🔍 检测到 Redis 缓存');

    if (verbose) {
      console.log(`   URI: ${REDIS_URI ? REDIS_URI.replace(/\/\/.*@/, '//***:***@') : '未设置'}`);
      console.log(`   前缀: ${REDIS_KEY_PREFIX || '无'}`);
    }

    // Create Redis client using same pattern as main app
    const IoRedis = require('ioredis');
    let redis;

    // Parse credentials from URI or use environment variables (same as redisClients.ts)
    const urls = (REDIS_URI || '').split(',').map((uri) => new URL(uri));
    const username = urls[0]?.username || REDIS_USERNAME;
    const password = urls[0]?.password || REDIS_PASSWORD;
    const ca = getRedisCA();

    // Redis options (matching redisClients.ts configuration)
    const redisOptions = {
      username: username,
      password: password,
      tls: ca ? { ca } : undefined,
      connectTimeout: 10000,
      maxRetriesPerRequest: 3,
      enableOfflineQueue: true,
      lazyConnect: false,
    };

    // Handle cluster vs single Redis (same logic as redisClients.ts)
    const useCluster = urls.length > 1 || isEnabled(USE_REDIS_CLUSTER);

    if (useCluster) {
      const clusterOptions = {
        redisOptions,
        enableOfflineQueue: true,
      };

      // Add DNS lookup for AWS ElastiCache if needed (same as redisClients.ts)
      if (isEnabled(REDIS_USE_ALTERNATIVE_DNS_LOOKUP)) {
        clusterOptions.dnsLookup = (address, callback) => callback(null, address);
      }

      redis = new IoRedis.Cluster(
        urls.map((url) => ({ host: url.hostname, port: parseInt(url.port, 10) || 6379 })),
        clusterOptions,
      );
    } else {
      // @ts-ignore - ioredis default export is constructable despite linter warning
      redis = new IoRedis(REDIS_URI, redisOptions);
    }

    // Wait for connection
    await new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new Error('连接超时'));
      }, 10000);

      redis.once('ready', () => {
        clearTimeout(timeout);
        resolve(undefined);
      });

      redis.once('error', (err) => {
        clearTimeout(timeout);
        reject(err);
      });
    });

    if (dryRun) {
      console.log('🔍 [试运行] 将清理 Redis 缓存');
      try {
        const keys = await redis.keys('*');
        console.log(`   将删除 ${keys.length} 个键`);
        if (verbose && keys.length > 0) {
          console.log(
            '   示例键:',
            keys.slice(0, 10).join(', ') + (keys.length > 10 ? '...' : ''),
          );
        }
      } catch (error) {
        console.log('   无法获取键进行预览:', error.message);
      }
      await redis.disconnect();
      return true;
    }

    // Get key count before flushing
    let keyCount = 0;
    try {
      const keys = await redis.keys('*');
      keyCount = keys.length;
    } catch (_error) {
      // Continue with flush even if we can't count keys
    }

    // Flush the Redis cache
    await redis.flushdb();
    console.log('✅ Redis 缓存清理成功');

    if (keyCount > 0) {
      console.log(`   已删除 ${keyCount} 个键`);
    }

    await redis.disconnect();
    return true;
  } catch (error) {
    console.error('❌ 清理 Redis 缓存时出错:', error.message);
    if (verbose) {
      console.error('   完整错误:', error);
    }
    return false;
  }
}

async function flushFileCache(dryRun = false, verbose = false) {
  const dataDir = path.join(__dirname, '..', 'data');
  const filesToClear = [path.join(dataDir, 'logs.json'), path.join(dataDir, 'violations.json')];

  console.log('🔍 正在检查基于文件的缓存');

  if (dryRun) {
    console.log('🔍 [试运行] 将清理文件缓存');
    for (const filePath of filesToClear) {
      if (fs.existsSync(filePath)) {
        const stats = fs.statSync(filePath);
        console.log(
          `   将删除: ${path.basename(filePath)} (${(stats.size / 1024).toFixed(1)} KB)`,
        );
      }
    }
    return true;
  }

  let deletedCount = 0;
  let totalSize = 0;

  for (const filePath of filesToClear) {
    try {
      if (fs.existsSync(filePath)) {
        const stats = fs.statSync(filePath);
        totalSize += stats.size;
        fs.unlinkSync(filePath);
        deletedCount++;
        if (verbose) {
          console.log(
            `   ✅ 已删除 ${path.basename(filePath)} (${(stats.size / 1024).toFixed(1)} KB)`,
          );
        }
      }
    } catch (error) {
      if (verbose) {
        console.log(`   ❌ 删除 ${path.basename(filePath)} 失败: ${error.message}`);
      }
    }
  }

  if (deletedCount > 0) {
    console.log('✅ 文件缓存清理成功');
    console.log(`   已删除 ${deletedCount} 个缓存文件 (${(totalSize / 1024).toFixed(1)} KB)`);
  } else {
    console.log('ℹ️  没有文件缓存需要清理');
  }

  return true;
}

async function restartRecommendation() {
  console.log('\n💡 建议:');
  console.log('   为了完全清理缓存，特别是内存缓存，');
  console.log('   请考虑重启 LibreChat 后端:');
  console.log('');
  console.log('     npm run backend:stop');
  console.log('     npm run backend:dev');
  console.log('');
}

async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run');
  const verbose = args.includes('--verbose') || args.includes('-v');
  const help = args.includes('--help') || args.includes('-h');

  if (help) {
    await showHelp();
    return;
  }

  console.log('🧹 LibreChat 缓存清理工具');
  console.log('================================');

  if (dryRun) {
    console.log('🔍 试运行模式 - 不会进行实际更改\n');
  }

  let success = true;
  const isRedisEnabled = isEnabled(USE_REDIS) || (REDIS_URI != null && REDIS_URI !== '');

  // Flush the appropriate cache type
  if (isRedisEnabled) {
    success = (await flushRedisCache(dryRun, verbose)) && success;
  } else {
    console.log('ℹ️  Redis 未配置，仅使用基于文件的缓存');
  }

  // Always check file cache
  success = (await flushFileCache(dryRun, verbose)) && success;

  console.log('\n' + '='.repeat(50));

  if (success) {
    if (dryRun) {
      console.log('✅ 缓存清理预览完成');
      console.log('   运行时不带 --dry-run 参数以实际清理缓存');
    } else {
      console.log('✅ 缓存清理成功完成');
      console.log('⚠️  注意: 所有用户需要重新进行身份验证');
    }

    if (!isRedisEnabled) {
      await restartRecommendation();
    }
  } else {
    console.log('❌ 缓存清理完成，但有错误');
    console.log('   请查看上面的输出以获取详细信息');
    process.exit(1);
  }
}

// Handle errors gracefully
process.on('unhandledRejection', (error) => {
  console.error('❌ 未处理的错误:', error);
  process.exit(1);
});

process.on('uncaughtException', (error) => {
  console.error('❌ 未捕获的异常:', error);
  process.exit(1);
});

// Run the main function
if (require.main === module) {
  main().catch((error) => {
    console.error('❌ 致命错误:', error);
    process.exit(1);
  });
}

module.exports = { flushRedisCache, flushFileCache };
