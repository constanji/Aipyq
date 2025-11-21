#!/usr/bin/env node

/**
 * 简单的模型配置检查脚本
 * 不依赖项目模块，直接检查文件内容
 */

const path = require('path');
const fs = require('fs');

const projectRoot = path.join(__dirname, '..');
const configFile = path.join(projectRoot, 'packages/data-provider/src/config.ts');
const modelServiceFile = path.join(projectRoot, 'api/server/services/ModelService.js');
const envFile = path.join(projectRoot, '.env');

console.log('🔍 检查模型配置...\n');

// 1. 检查配置文件
console.log('1. 检查配置文件:');
if (fs.existsSync(configFile)) {
  const content = fs.readFileSync(configFile, 'utf8');
  const hasDeepSeek = content.includes("'deepseek-ai/DeepSeek-V3.2-Exp'") || 
                      content.includes('"deepseek-ai/DeepSeek-V3.2-Exp"');
  console.log(`   ✅ config.ts 文件存在`);
  console.log(`   ${hasDeepSeek ? '✅' : '❌'} 包含 deepseek-ai/DeepSeek-V3.2-Exp: ${hasDeepSeek ? '是' : '否'}`);
  
  if (hasDeepSeek) {
    // 查找模型所在位置
    const lines = content.split('\n');
    const lineIndex = lines.findIndex(line => 
      line.includes('deepseek-ai/DeepSeek-V3.2-Exp')
    );
    if (lineIndex >= 0) {
      console.log(`   📍 模型在第 ${lineIndex + 1} 行`);
      console.log(`   📄 上下文: ${lines[lineIndex].trim()}`);
    }
  } else {
    console.log(`   ⚠️  警告: 配置文件中没有找到 deepseek 模型！`);
    console.log(`   💡 需要在 packages/data-provider/src/config.ts 的 defaultModels[EModelEndpoint.openAI] 中添加`);
  }
} else {
  console.log(`   ❌ config.ts 文件不存在: ${configFile}`);
}
console.log('');

// 2. 检查 ModelService.js
console.log('2. 检查 ModelService.js:');
if (fs.existsSync(modelServiceFile)) {
  const content = fs.readFileSync(modelServiceFile, 'utf8');
  const hasMergeLogic = content.includes('combinedModels') || 
                        content.includes('[..._models, ...fetchedModels]');
  console.log(`   ✅ ModelService.js 文件存在`);
  console.log(`   ${hasMergeLogic ? '✅' : '❌'} 包含模型合并逻辑: ${hasMergeLogic ? '是' : '否'}`);
  
  if (!hasMergeLogic) {
    console.log(`   ⚠️  警告: ModelService.js 中可能缺少模型合并逻辑！`);
  }
} else {
  console.log(`   ❌ ModelService.js 文件不存在: ${modelServiceFile}`);
}
console.log('');

// 3. 检查环境变量
console.log('3. 检查环境变量:');
if (fs.existsSync(envFile)) {
  const envContent = fs.readFileSync(envFile, 'utf8');
  const hasOpenAIModels = envContent.includes('OPENAI_MODELS=');
  const hasReverseProxy = envContent.includes('OPENAI_REVERSE_PROXY=');
  const hasApiKey = envContent.includes('OPENAI_API_KEY=');
  
  console.log(`   ✅ .env 文件存在`);
  console.log(`   ${hasApiKey ? '✅' : '⚠️ '} OPENAI_API_KEY: ${hasApiKey ? '已设置' : '未设置'}`);
  console.log(`   ${hasReverseProxy ? '✅' : '⚠️ '} OPENAI_REVERSE_PROXY: ${hasReverseProxy ? '已设置' : '未设置'}`);
  
  // 检查未注释的 OPENAI_MODELS
  const lines = envContent.split('\n');
  const openAIModelsLine = lines.find(line => 
    line.trim().startsWith('OPENAI_MODELS=') && !line.trim().startsWith('#')
  );
  
  if (openAIModelsLine) {
    const match = openAIModelsLine.match(/OPENAI_MODELS=(.+)/);
    if (match) {
      const models = match[1].split(',').map(m => m.trim().replace(/#.*$/, '')).filter(Boolean);
      console.log(`   ⚠️  OPENAI_MODELS 已设置（未注释）: ${models.join(', ')}`);
      const hasDeepSeekInEnv = models.some(m => m.includes('deepseek'));
      console.log(`   ${hasDeepSeekInEnv ? '✅' : '❌'} 环境变量中包含 deepseek: ${hasDeepSeekInEnv ? '是' : '否'}`);
      
      if (!hasDeepSeekInEnv) {
        console.log(`   ⚠️  警告: OPENAI_MODELS 会覆盖默认模型列表！`);
        console.log(`   💡 解决方案1: 在 OPENAI_MODELS 中添加 deepseek-ai/DeepSeek-V3.2-Exp`);
        console.log(`   💡 解决方案2: 注释掉或删除 OPENAI_MODELS 行，使用默认配置（推荐）`);
      }
    }
  } else {
    // 检查是否有注释掉的 OPENAI_MODELS
    const commentedLine = lines.find(line => 
      line.trim().startsWith('#OPENAI_MODELS=')
    );
    if (commentedLine) {
      console.log(`   ✅ OPENAI_MODELS: 已注释（使用默认配置）`);
    } else {
      console.log(`   ✅ OPENAI_MODELS: 未设置（使用默认配置）`);
    }
  }
} else {
  console.log(`   ⚠️  .env 文件不存在: ${envFile}`);
  console.log(`   💡 环境变量可能在其他地方设置`);
}
console.log('');

// 4. 建议操作
console.log('4. 建议操作:');
console.log('   1. 清除缓存: npm run flush-cache');
console.log('   2. 重启服务: npm run backend:stop && npm run backend:dev');
console.log('   3. 强制刷新浏览器: Ctrl+Shift+R (Windows) 或 Cmd+Shift+R (Mac)');
console.log('');

console.log('✅ 检查完成！');

