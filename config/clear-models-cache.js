#!/usr/bin/env node

/**
 * 清除模型配置缓存的脚本
 */

const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const { CacheKeys } = require('librechat-data-provider');
const getLogStores = require('../api/cache/getLogStores');

async function clearModelsCache() {
  try {
    console.log('🧹 清除模型配置缓存...\n');
    
    const configCache = getLogStores(CacheKeys.CONFIG_STORE);
    const modelsCache = getLogStores(CacheKeys.MODEL_QUERIES);
    
    // 清除 MODELS_CONFIG 缓存
    const cachedConfig = await configCache.get(CacheKeys.MODELS_CONFIG);
    if (cachedConfig) {
      await configCache.delete(CacheKeys.MODELS_CONFIG);
      console.log('✅ 已清除 MODELS_CONFIG 缓存');
    } else {
      console.log('ℹ️  MODELS_CONFIG 缓存不存在');
    }
    
    // 清除 MODEL_QUERIES 缓存（如果设置了 OPENAI_REVERSE_PROXY）
    if (process.env.OPENAI_REVERSE_PROXY) {
      const extractBaseURL = (url) => {
        try {
          const urlObj = new URL(url);
          return `${urlObj.protocol}//${urlObj.host}${urlObj.pathname.replace(/\/$/, '')}`;
        } catch {
          return url.split('/v1')[0] || url;
        }
      };
      const baseURL = extractBaseURL(process.env.OPENAI_REVERSE_PROXY);
      const cachedQueries = await modelsCache.get(baseURL);
      if (cachedQueries) {
        await modelsCache.delete(baseURL);
        console.log(`✅ 已清除 MODEL_QUERIES 缓存 (${baseURL})`);
      } else {
        console.log(`ℹ️  MODEL_QUERIES 缓存不存在 (${baseURL})`);
      }
    }
    
    console.log('\n✅ 缓存清除完成！');
    console.log('💡 现在请重启后端服务: npm run backend:stop && npm run backend:dev');
    
  } catch (error) {
    console.error('❌ 错误:', error.message);
    console.error(error.stack);
  }
}

clearModelsCache().catch(console.error);

