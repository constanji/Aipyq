#!/usr/bin/env node

/**
 * 检查模型配置脚本
 * 用于诊断为什么 deepseek 模型不在列表中
 */

const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const { defaultModels, EModelEndpoint } = require('librechat-data-provider');
const { CacheKeys } = require('librechat-data-provider');
const getLogStores = require('../api/cache/getLogStores');

async function checkModels() {
  console.log('🔍 检查模型配置...\n');
  
  // 1. 检查默认模型配置
  console.log('1. 检查默认模型配置:');
  const openAIModels = defaultModels[EModelEndpoint.openAI];
  const hasDeepSeek = openAIModels.includes('deepseek-ai/DeepSeek-V3.2-Exp');
  console.log(`   - OpenAI 默认模型数量: ${openAIModels.length}`);
  console.log(`   - 包含 deepseek-ai/DeepSeek-V3.2-Exp: ${hasDeepSeek ? '✅ 是' : '❌ 否'}`);
  if (hasDeepSeek) {
    console.log(`   - 模型位置: 第 ${openAIModels.indexOf('deepseek-ai/DeepSeek-V3.2-Exp') + 1} 个`);
  }
  console.log(`   - 前5个模型: ${openAIModels.slice(0, 5).join(', ')}`);
  console.log(`   - 最后5个模型: ${openAIModels.slice(-5).join(', ')}\n`);
  
  // 2. 检查环境变量
  console.log('2. 检查环境变量:');
  console.log(`   - OPENAI_API_KEY: ${process.env.OPENAI_API_KEY ? '已设置' : '未设置'}`);
  console.log(`   - OPENAI_REVERSE_PROXY: ${process.env.OPENAI_REVERSE_PROXY || '未设置'}`);
  console.log(`   - OPENAI_MODELS: ${process.env.OPENAI_MODELS || '未设置'}`);
  if (process.env.OPENAI_MODELS) {
    const envModels = process.env.OPENAI_MODELS.split(',').map(m => m.trim());
    console.log(`   - 环境变量中的模型: ${envModels.join(', ')}`);
    console.log(`   - 包含 deepseek: ${envModels.includes('deepseek-ai/DeepSeek-V3.2-Exp') ? '✅ 是' : '❌ 否'}`);
  }
  console.log('');
  
  // 3. 检查缓存
  console.log('3. 检查缓存:');
  try {
    const configCache = getLogStores(CacheKeys.CONFIG_STORE);
    const modelsCache = getLogStores(CacheKeys.MODEL_QUERIES);
    
    const cachedModelsConfig = await configCache.get(CacheKeys.MODELS_CONFIG);
    if (cachedModelsConfig) {
      const cachedOpenAI = cachedModelsConfig[EModelEndpoint.openAI] || [];
      console.log(`   - MODELS_CONFIG 缓存存在: ✅`);
      console.log(`   - 缓存中的 OpenAI 模型数量: ${cachedOpenAI.length}`);
      const cachedHasDeepSeek = cachedOpenAI.includes('deepseek-ai/DeepSeek-V3.2-Exp');
      console.log(`   - 缓存中包含 deepseek: ${cachedHasDeepSeek ? '✅ 是' : '❌ 否'}`);
      if (!cachedHasDeepSeek) {
        console.log(`   ⚠️  警告: 缓存中的模型列表不包含 deepseek，需要清除缓存！`);
      }
    } else {
      console.log(`   - MODELS_CONFIG 缓存: ❌ 不存在`);
    }
    
    // 检查 MODEL_QUERIES 缓存
    const reverseProxyUrl = process.env.OPENAI_REVERSE_PROXY;
    if (reverseProxyUrl) {
      // 简单的 URL 提取逻辑
      const extractBaseURL = (url) => {
        try {
          const urlObj = new URL(url);
          return `${urlObj.protocol}//${urlObj.host}${urlObj.pathname.replace(/\/$/, '')}`;
        } catch {
          return url.split('/v1')[0] || url;
        }
      };
      const baseURL = extractBaseURL(reverseProxyUrl);
      const cachedQueries = await modelsCache.get(baseURL);
      if (cachedQueries) {
        console.log(`   - MODEL_QUERIES 缓存存在 (${baseURL}): ✅`);
        console.log(`   - 缓存中的模型数量: ${cachedQueries.length}`);
        const queriesHasDeepSeek = cachedQueries.includes('deepseek-ai/DeepSeek-V3.2-Exp');
        console.log(`   - 缓存中包含 deepseek: ${queriesHasDeepSeek ? '✅ 是' : '❌ 否'}`);
      } else {
        console.log(`   - MODEL_QUERIES 缓存: ❌ 不存在`);
      }
    }
  } catch (error) {
    console.log(`   - 检查缓存时出错: ${error.message}`);
  }
  console.log('');
  
  // 4. 建议
  console.log('4. 建议操作:');
  if (!hasDeepSeek) {
    console.log('   ❌ 默认模型配置中没有 deepseek，请检查 packages/data-provider/src/config.ts');
  } else if (process.env.OPENAI_MODELS && !process.env.OPENAI_MODELS.includes('deepseek')) {
    console.log('   ⚠️  OPENAI_MODELS 环境变量覆盖了默认模型，需要添加 deepseek');
    console.log(`   建议: OPENAI_MODELS=${process.env.OPENAI_MODELS},deepseek-ai/DeepSeek-V3.2-Exp`);
  } else {
    console.log('   ✅ 默认配置正确，但缓存可能过期');
    console.log('   建议执行: npm run flush-cache');
    console.log('   然后重启服务');
  }
}

checkModels().catch(console.error);

