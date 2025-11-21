#!/usr/bin/env node

/**
 * 清除模型配置缓存的专用脚本
 * 只清除 MODELS_CONFIG 缓存，不影响其他功能
 */

const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const { CacheKeys } = require('librechat-data-provider');
const getLogStores = require('../api/cache/getLogStores');

async function clearModelsCache() {
  try {
    console.log('🧹 清除模型配置缓存...\n');
    
    const configCache = getLogStores(CacheKeys.CONFIG_STORE);
    
    // 检查缓存是否存在
    const cachedConfig = await configCache.get(CacheKeys.MODELS_CONFIG);
    if (cachedConfig) {
      console.log('   📦 找到缓存的模型配置');
      const openAIModels = cachedConfig[require('librechat-data-provider').EModelEndpoint.openAI] || [];
      console.log(`   📋 缓存中的 OpenAI 模型数量: ${openAIModels.length}`);
      const hasDeepSeek = openAIModels.includes('deepseek-ai/DeepSeek-V3.2-Exp');
      console.log(`   ${hasDeepSeek ? '✅' : '❌'} 缓存中包含 deepseek: ${hasDeepSeek ? '是' : '否'}`);
      
      // 清除缓存
      await configCache.delete(CacheKeys.MODELS_CONFIG);
      console.log('\n   ✅ 已清除 MODELS_CONFIG 缓存');
    } else {
      console.log('   ℹ️  MODELS_CONFIG 缓存不存在（可能已经清除）');
    }
    
    // 也清除 MODEL_QUERIES 缓存（如果设置了 OPENAI_REVERSE_PROXY）
    if (process.env.OPENAI_REVERSE_PROXY) {
      const modelsCache = getLogStores(CacheKeys.MODEL_QUERIES);
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
        console.log(`   ✅ 已清除 MODEL_QUERIES 缓存 (${baseURL})`);
      }
    }
    
    console.log('\n✅ 缓存清除完成！');
    console.log('💡 现在请重启后端服务以重新加载模型配置');
    console.log('   npm run backend:stop');
    console.log('   npm run backend:dev');
    
  } catch (error) {
    console.error('❌ 错误:', error.message);
    if (error.code === 'MODULE_NOT_FOUND') {
      console.error('   💡 提示: 请确保已安装依赖: npm install');
    } else {
      console.error(error.stack);
    }
    process.exit(1);
  }
}

clearModelsCache().catch(console.error);

