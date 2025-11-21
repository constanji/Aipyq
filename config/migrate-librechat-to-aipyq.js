require('dotenv').config();
const mongoose = require('mongoose');
const { logger } = require('@librechat/data-schemas');

/**
 * 数据库迁移脚本：将 LibreChat 数据库迁移到 Aipyq 数据库
 * 
 * 功能：
 * 1. 连接 MongoDB
 * 2. 列出 LibreChat 数据库的所有集合
 * 3. 将每个集合的数据迁移到 Aipyq 数据库
 * 4. 删除 LibreChat 数据库
 * 
 * 使用方法：
 * node config/migrate-librechat-to-aipyq.js
 */

const SOURCE_DB = 'LibreChat';
const TARGET_DB = 'Aipyq';

// 从环境变量或 docker-compose.yml 中获取 MongoDB URI
const MONGO_HOST = process.env.MONGO_HOST || 'host.docker.internal';
const MONGO_PORT = process.env.MONGO_PORT || '27017';
const MONGO_BASE_URI = `mongodb://${MONGO_HOST}:${MONGO_PORT}`;

// 源数据库和目标数据库的 URI
const SOURCE_URI = `${MONGO_BASE_URI}/${SOURCE_DB}`;
const TARGET_URI = `${MONGO_BASE_URI}/${TARGET_DB}`;

// 需要跳过的系统集合
const SYSTEM_COLLECTIONS = ['system.indexes', 'system.profile', 'system.users', 'system.version'];

/**
 * 获取数据库的所有集合名称
 */
async function getCollections(db) {
  const collections = await db.listCollections().toArray();
  return collections
    .map(col => col.name)
    .filter(name => !SYSTEM_COLLECTIONS.includes(name));
}

/**
 * 迁移单个集合的数据
 */
async function migrateCollection(sourceDb, targetDb, collectionName) {
  const sourceCollection = sourceDb.collection(collectionName);
  const targetCollection = targetDb.collection(collectionName);

  // 检查源集合是否存在且有数据
  const sourceCount = await sourceCollection.countDocuments();
  if (sourceCount === 0) {
    logger.info(`集合 ${collectionName} 为空，跳过迁移`);
    return { migrated: 0, skipped: true };
  }

  logger.info(`开始迁移集合 ${collectionName}，共 ${sourceCount} 条记录...`);

  // 获取目标集合的现有记录数
  const targetCount = await targetCollection.countDocuments();

  if (targetCount > 0) {
    logger.warn(`目标集合 ${collectionName} 已存在 ${targetCount} 条记录，将合并数据`);
  }

  // 批量迁移数据
  const batchSize = 1000;
  let migrated = 0;
  let cursor = sourceCollection.find({});
  let batch = [];

  while (await cursor.hasNext()) {
    const doc = await cursor.next();
    batch.push(doc);

    if (batch.length >= batchSize) {
      try {
        // 使用 insertMany 插入数据，ordered: false 允许部分失败
        const result = await targetCollection.insertMany(batch, {
          ordered: false,
          writeConcern: { w: 1 }
        });
        migrated += result.insertedCount;
        logger.info(`已迁移 ${migrated}/${sourceCount} 条记录...`);
      } catch (error) {
        // 处理重复键错误（E11000）
        if (error.code === 11000) {
          logger.warn(`跳过重复记录: ${error.message}`);
          // 尝试逐个插入，跳过重复的
          for (const doc of batch) {
            try {
              await targetCollection.insertOne(doc);
              migrated++;
            } catch (err) {
              if (err.code !== 11000) {
                logger.error(`插入记录失败: ${err.message}`);
              }
            }
          }
        } else {
          logger.error(`批量插入失败: ${error.message}`);
          throw error;
        }
      }
      batch = [];
    }
  }

  // 处理剩余的文档
  if (batch.length > 0) {
    try {
      const result = await targetCollection.insertMany(batch, {
        ordered: false,
        writeConcern: { w: 1 }
      });
      migrated += result.insertedCount;
    } catch (error) {
      if (error.code === 11000) {
        for (const doc of batch) {
          try {
            await targetCollection.insertOne(doc);
            migrated++;
          } catch (err) {
            if (err.code !== 11000) {
              logger.error(`插入记录失败: ${err.message}`);
            }
          }
        }
      } else {
        logger.error(`批量插入失败: ${error.message}`);
        throw error;
      }
    }
  }

  logger.info(`集合 ${collectionName} 迁移完成，共迁移 ${migrated} 条记录`);
  return { migrated, skipped: false };
}

/**
 * 复制集合索引
 */
async function copyIndexes(sourceDb, targetDb, collectionName) {
  try {
    const sourceCollection = sourceDb.collection(collectionName);
    const targetCollection = targetDb.collection(collectionName);

    // 获取源集合的索引
    const indexes = await sourceCollection.indexes();

    // 复制索引（跳过 _id_ 索引，因为它是默认的）
    for (const index of indexes) {
      if (index.name === '_id_') continue;

      try {
        // 构建索引定义
        const indexSpec = {};
        for (const [key, value] of Object.entries(index.key)) {
          indexSpec[key] = value;
        }

        const indexOptions = {
          name: index.name,
          unique: index.unique || false,
          sparse: index.sparse || false,
          background: true
        };

        await targetCollection.createIndex(indexSpec, indexOptions);
        logger.info(`已复制索引 ${index.name} 到集合 ${collectionName}`);
      } catch (error) {
        if (error.code === 85) {
          // 索引已存在
          logger.debug(`索引 ${index.name} 已存在，跳过`);
        } else {
          logger.warn(`复制索引 ${index.name} 失败: ${error.message}`);
        }
      }
    }
  } catch (error) {
    logger.warn(`复制集合 ${collectionName} 的索引时出错: ${error.message}`);
  }
}

/**
 * 主迁移函数
 */
async function migrateDatabase() {
  let sourceClient = null;
  let targetClient = null;

  try {
    logger.info('='.repeat(60));
    logger.info('开始数据库迁移：LibreChat -> Aipyq');
    logger.info('='.repeat(60));

    // 连接 MongoDB（使用基础 URI）
    logger.info(`正在连接 MongoDB: ${MONGO_BASE_URI}`);
    const baseClient = await mongoose.createConnection(MONGO_BASE_URI).asPromise();
    
    // 检查源数据库是否存在
    const adminDb = baseClient.db.admin();
    const databases = await adminDb.listDatabases();
    const sourceDbExists = databases.databases.some(db => db.name === SOURCE_DB);

    if (!sourceDbExists) {
      logger.warn(`源数据库 ${SOURCE_DB} 不存在，无需迁移`);
      await baseClient.close();
      return;
    }

    // 获取源数据库和目标数据库实例
    const sourceDb = baseClient.useDb(SOURCE_DB).db;
    const targetDb = baseClient.useDb(TARGET_DB).db;
    
    sourceClient = baseClient;
    targetClient = baseClient;

    // 获取所有集合
    logger.info('正在获取源数据库的所有集合...');
    const collections = await getCollections(sourceDb);

    if (collections.length === 0) {
      logger.warn(`源数据库 ${SOURCE_DB} 没有任何集合，无需迁移`);
      return;
    }

    logger.info(`找到 ${collections.length} 个集合: ${collections.join(', ')}`);

    // 迁移每个集合
    const migrationResults = {};
    for (const collectionName of collections) {
      try {
        const result = await migrateCollection(sourceDb, targetDb, collectionName);
        migrationResults[collectionName] = result;

        // 复制索引
        if (!result.skipped) {
          await copyIndexes(sourceDb, targetDb, collectionName);
        }
      } catch (error) {
        logger.error(`迁移集合 ${collectionName} 时出错: ${error.message}`);
        migrationResults[collectionName] = { error: error.message };
      }
    }

    // 显示迁移摘要
    logger.info('='.repeat(60));
    logger.info('迁移摘要:');
    logger.info('='.repeat(60));
    let totalMigrated = 0;
    for (const [collectionName, result] of Object.entries(migrationResults)) {
      if (result.error) {
        logger.error(`  ${collectionName}: 失败 - ${result.error}`);
      } else if (result.skipped) {
        logger.info(`  ${collectionName}: 跳过（空集合）`);
      } else {
        logger.info(`  ${collectionName}: 成功迁移 ${result.migrated} 条记录`);
        totalMigrated += result.migrated;
      }
    }
    logger.info(`总计迁移: ${totalMigrated} 条记录`);

    // 删除源数据库（可选，通过环境变量控制）
    const DELETE_SOURCE = process.env.DELETE_SOURCE_DB === 'true';
    
    if (DELETE_SOURCE) {
      logger.info('='.repeat(60));
      logger.info(`正在删除源数据库 ${SOURCE_DB}...`);
      logger.info('='.repeat(60));
      
      try {
        await sourceDb.dropDatabase();
        logger.info(`✅ 源数据库 ${SOURCE_DB} 已成功删除`);
      } catch (error) {
        logger.error(`❌ 删除源数据库失败: ${error.message}`);
        throw error;
      }
    } else {
      logger.info('='.repeat(60));
      logger.info(`迁移完成！`);
      logger.info('='.repeat(60));
      logger.info(`⚠️  源数据库 ${SOURCE_DB} 仍然存在。`);
      logger.info('如果要删除源数据库，请设置环境变量：');
      logger.info('  DELETE_SOURCE_DB=true node config/migrate-librechat-to-aipyq.js');
      logger.info('或者手动执行以下命令：');
      logger.info(`  db.getSiblingDB('${SOURCE_DB}').dropDatabase()`);
    }

  } catch (error) {
    logger.error('迁移过程中发生错误:', error);
    throw error;
  } finally {
    // 关闭连接
    if (sourceClient && sourceClient !== targetClient) {
      await sourceClient.close();
      logger.info('已关闭源数据库连接');
    }
    if (targetClient) {
      await targetClient.close();
      logger.info('已关闭数据库连接');
    }
  }
}

// 执行迁移
if (require.main === module) {
  migrateDatabase()
    .then(() => {
      logger.info('迁移脚本执行完成');
      process.exit(0);
    })
    .catch((error) => {
      logger.error('迁移脚本执行失败:', error);
      process.exit(1);
    });
}

module.exports = { migrateDatabase };

