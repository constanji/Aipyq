#!/usr/bin/env node

/**
 * 调试模型加载的脚本
 * 模拟后端加载模型的过程
 */

const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

// 设置环境
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

console.log('🔍 调试模型加载过程...\n');

// 模拟 req 对象
const mockReq = {
  user: { id: 'test-user' },
  config: {}
};

async function debugModels() {
  try {
    // 1. 检查默认模型配置
    console.log('1. 检查默认模型配置:');
    const { defaultModels, EModelEndpoint } = require('librechat-data-provider');
    const defaultOpenAI = defaultModels[EModelEndpoint.openAI];
    console.log(`   - 默认 OpenAI 模型数量: ${defaultOpenAI.length}`);
    const hasDeepSeek = defaultOpenAI.includes('deepseek-ai/DeepSeek-V3.2-Exp');
    console.log(`   - 包含 deepseek: ${hasDeepSeek ? '✅ 是' : '❌ 否'}`);
    if (hasDeepSeek) {
      console.log(`   - DeepSeek 位置: 第 ${defaultOpenAI.indexOf('deepseek-ai/DeepSeek-V3.2-Exp') + 1} 个`);
    }
    console.log(`   - 前5个: ${defaultOpenAI.slice(0, 5).join(', ')}`);
    console.log(`   - 最后5个: ${defaultOpenAI.slice(-5).join(', ')}\n`);

    // 2. 检查环境变量
    console.log('2. 检查环境变量:');
    console.log(`   - OPENAI_API_KEY: ${process.env.OPENAI_API_KEY ? '已设置' : '未设置'}`);
    console.log(`   - OPENAI_REVERSE_PROXY: ${process.env.OPENAI_REVERSE_PROXY || '未设置'}`);
    console.log(`   - OPENAI_MODELS: ${process.env.OPENAI_MODELS || '未设置'}\n`);

    // 3. 测试 getOpenAIModels 函数
    console.log('3. 测试 getOpenAIModels 函数:');
    const { getOpenAIModels } = require('../api/server/services/ModelService');
    
    const models = await getOpenAIModels({ user: mockReq.user.id });
    console.log(`   - 返回的模型数量: ${models.length}`);
    const resultHasDeepSeek = models.includes('deepseek-ai/DeepSeek-V3.2-Exp');
    console.log(`   - 包含 deepseek: ${resultHasDeepSeek ? '✅ 是' : '❌ 否'}`);
    
    if (!resultHasDeepSeek) {
      console.log(`   ⚠️  警告: getOpenAIModels 返回的列表中没有 deepseek！`);
      console.log(`   - 返回的模型列表:`);
      models.slice(0, 10).forEach((m, i) => {
        console.log(`      ${i + 1}. ${m}`);
      });
      if (models.length > 10) {
        console.log(`      ... 还有 ${models.length - 10} 个模型`);
      }
    } else {
      console.log(`   ✅ 成功！模型列表包含 deepseek`);
      const index = models.indexOf('deepseek-ai/DeepSeek-V3.2-Exp');
      console.log(`   - DeepSeek 在返回列表中的位置: 第 ${index + 1} 个`);
    }
    console.log('');

    // 4. 检查缓存
    console.log('4. 检查缓存:');
    const { CacheKeys } = require('librechat-data-provider');
    const getLogStores = require('../api/cache/getLogStores');
    
    const configCache = getLogStores(CacheKeys.CONFIG_STORE);
    const cachedConfig = await configCache.get(CacheKeys.MODELS_CONFIG);
    
    if (cachedConfig) {
      const cachedOpenAI = cachedConfig[EModelEndpoint.openAI] || [];
      console.log(`   - MODELS_CONFIG 缓存存在`);
      console.log(`   - 缓存中的 OpenAI 模型数量: ${cachedOpenAI.length}`);
      const cachedHasDeepSeek = cachedOpenAI.includes('deepseek-ai/DeepSeek-V3.2-Exp');
      console.log(`   - 缓存中包含 deepseek: ${cachedHasDeepSeek ? '✅ 是' : '❌ 否'}`);
      
      if (!cachedHasDeepSeek) {
        console.log(`   ⚠️  问题: 缓存中的模型列表不包含 deepseek！`);
        console.log(`   💡 解决方案: 清除缓存`);
        console.log(`      await configCache.delete(CacheKeys.MODELS_CONFIG);`);
      }
    } else {
      console.log(`   - MODELS_CONFIG 缓存: 不存在`);
    }
    console.log('');

    // 5. 建议
    console.log('5. 诊断结果:');
    if (!resultHasDeepSeek) {
      console.log('   ❌ 问题: getOpenAIModels 返回的模型列表中没有 deepseek');
      console.log('   可能的原因:');
      console.log('   1. 从 API 获取的模型列表覆盖了默认模型');
      console.log('   2. 缓存了旧的模型列表');
      console.log('   3. 环境变量 OPENAI_MODELS 被设置');
      console.log('');
      console.log('   解决方案:');
      console.log('   1. 清除缓存: npm run flush-cache');
      console.log('   2. 删除 MODELS_CONFIG 缓存（如果使用 Redis）');
      console.log('   3. 重启服务');
    } else {
      console.log('   ✅ getOpenAIModels 返回的模型列表包含 deepseek');
      console.log('   如果前端仍然看不到，可能是:');
      console.log('   1. 前端缓存了旧的模型列表');
      console.log('   2. 浏览器缓存问题');
      console.log('   💡 解决方案: 强制刷新浏览器 (Cmd+Shift+R)');
    }

  } catch (error) {
    console.error('❌ 错误:', error.message);
    console.error(error.stack);
  }
}

debugModels().catch(console.error);

