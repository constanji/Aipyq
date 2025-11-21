#!/usr/bin/env node

/**
 * 测试模型 API 的脚本
 * 直接检查后端代码中的模型配置
 */

const path = require('path');
const fs = require('fs');

const projectRoot = path.join(__dirname, '..');

console.log('🔍 检查模型配置和 API 状态...\n');

// 1. 检查服务是否运行
console.log('1. 检查服务状态:');
const axios = require('axios').default || require('axios');

async function checkService() {
  try {
    const response = await axios.get('http://localhost:3080/health', { 
      timeout: 2000 
    });
    console.log('   ✅ 服务正在运行');
    return true;
  } catch (error) {
    if (error.code === 'ECONNREFUSED') {
      console.log('   ❌ 服务未运行，请先启动: npm run backend:dev');
    } else {
      console.log(`   ⚠️  无法连接到服务: ${error.message}`);
    }
    return false;
  }
}

// 2. 检查默认模型配置
console.log('2. 检查默认模型配置:');
const configFile = path.join(projectRoot, 'packages/data-provider/src/config.ts');
if (fs.existsSync(configFile)) {
  const content = fs.readFileSync(configFile, 'utf8');
  
  // 查找 defaultModels[EModelEndpoint.openAI] 部分
  const openAIModelsMatch = content.match(/\[EModelEndpoint\.openAI\]:\s*\[([\s\S]*?)\],/);
  if (openAIModelsMatch) {
    const modelsSection = openAIModelsMatch[1];
    const models = modelsSection
      .split(',')
      .map(m => m.trim().replace(/['"]/g, '').replace(/\/\/.*$/, '').trim())
      .filter(m => m && !m.startsWith('//'));
    
    console.log(`   ✅ 找到 ${models.length} 个默认模型`);
    const hasDeepSeek = models.some(m => m.includes('deepseek'));
    console.log(`   ${hasDeepSeek ? '✅' : '❌'} 包含 deepseek: ${hasDeepSeek ? '是' : '否'}`);
    
    if (hasDeepSeek) {
      const deepSeekModel = models.find(m => m.includes('deepseek'));
      console.log(`   📍 DeepSeek 模型: ${deepSeekModel}`);
    }
    
    console.log(`   📋 模型列表:`);
    models.slice(0, 10).forEach((model, i) => {
      const marker = model.includes('deepseek') ? '⭐' : '  ';
      console.log(`      ${marker} ${i + 1}. ${model}`);
    });
    if (models.length > 10) {
      console.log(`      ... 还有 ${models.length - 10} 个模型`);
    }
  }
}
console.log('');

// 3. 检查 ModelService 合并逻辑
console.log('3. 检查 ModelService 合并逻辑:');
const modelServiceFile = path.join(projectRoot, 'api/server/services/ModelService.js');
if (fs.existsSync(modelServiceFile)) {
  const content = fs.readFileSync(modelServiceFile, 'utf8');
  
  const hasMerge = content.includes('combinedModels') || 
                   content.includes('[..._models, ...fetchedModels]');
  const hasCacheMerge = content.includes('cachedModels') && 
                        content.includes('fetchedModels = cachedModels');
  
  console.log(`   ${hasMerge ? '✅' : '❌'} 包含模型合并逻辑: ${hasMerge ? '是' : '否'}`);
  console.log(`   ${hasCacheMerge ? '✅' : '❌'} 缓存合并逻辑: ${hasCacheMerge ? '是' : '否'}`);
}
console.log('');

// 4. 尝试访问 API（不需要认证的端点）
console.log('4. 检查 API 端点:');
checkService().then(isRunning => {
  if (isRunning) {
    console.log('   💡 提示: 模型 API 需要认证 token');
    console.log('   💡 建议: 在前端界面中检查模型列表');
    console.log('   💡 或者: 查看浏览器开发者工具的 Network 标签');
  }
  console.log('');
  
  console.log('5. 建议操作:');
  console.log('   1. 确保服务已完全启动（等待 10-30 秒）');
  console.log('   2. 打开浏览器访问 LibreChat');
  console.log('   3. 登录后，打开模型选择器');
  console.log('   4. 选择 OpenAI 端点');
  console.log('   5. 查找 deepseek-ai/DeepSeek-V3.2-Exp');
  console.log('   6. 如果看不到，按 Cmd+Shift+R (Mac) 或 Ctrl+Shift+R (Windows) 强制刷新');
  console.log('');
  console.log('✅ 检查完成！');
});

