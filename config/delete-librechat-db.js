require('dotenv').config();
const mongoose = require('mongoose');
const { logger } = require('@librechat/data-schemas');

/**
 * 删除 LibreChat 数据库脚本
 * 
 * 使用方法：
 * node config/delete-librechat-db.js
 */

const DB_TO_DELETE = 'LibreChat';

// 从环境变量或 docker-compose.yml 中获取 MongoDB URI
const MONGO_HOST = process.env.MONGO_HOST || 'host.docker.internal';
const MONGO_PORT = process.env.MONGO_PORT || '27017';
const MONGO_BASE_URI = `mongodb://${MONGO_HOST}:${MONGO_PORT}`;

async function deleteDatabase() {
  let client = null;

  try {
    logger.info('='.repeat(60));
    logger.info(`准备删除数据库: ${DB_TO_DELETE}`);
    logger.info('='.repeat(60));

    // 连接 MongoDB
    logger.info(`正在连接 MongoDB: ${MONGO_BASE_URI}`);
    client = await mongoose.createConnection(MONGO_BASE_URI).asPromise();

    // 检查数据库是否存在
    const adminDb = client.db.admin();
    const databases = await adminDb.listDatabases();
    const dbExists = databases.databases.some(db => db.name === DB_TO_DELETE);

    if (!dbExists) {
      logger.info(`数据库 ${DB_TO_DELETE} 不存在，无需删除`);
      return;
    }

    // 获取数据库实例
    const db = client.useDb(DB_TO_DELETE).db;

    // 列出所有集合
    const collections = await db.listCollections().toArray();
    const collectionNames = collections.map(col => col.name);
    
    logger.info(`数据库 ${DB_TO_DELETE} 包含以下集合: ${collectionNames.join(', ')}`);
    logger.info(`共 ${collections.length} 个集合`);

    // 删除数据库
    logger.warn('⚠️  警告：此操作将永久删除数据库及其所有数据！');
    logger.info('正在删除数据库...');
    
    await db.dropDatabase();
    
    logger.info(`✅ 数据库 ${DB_TO_DELETE} 已成功删除`);

  } catch (error) {
    logger.error('删除数据库时发生错误:', error);
    throw error;
  } finally {
    if (client) {
      await client.close();
      logger.info('已关闭数据库连接');
    }
  }
}

// 执行删除
if (require.main === module) {
  deleteDatabase()
    .then(() => {
      logger.info('删除脚本执行完成');
      process.exit(0);
    })
    .catch((error) => {
      logger.error('删除脚本执行失败:', error);
      process.exit(1);
    });
}

module.exports = { deleteDatabase };

