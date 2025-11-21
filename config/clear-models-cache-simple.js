#!/usr/bin/env node

/**
 * 简单的模型缓存清除脚本
 * 不依赖项目模块，直接操作缓存文件
 */

const path = require('path');
const fs = require('fs');

const projectRoot = path.join(__dirname, '..');
const dataDir = path.join(projectRoot, 'data');

console.log('🧹 清除模型配置缓存...\n');

// 检查 data 目录
if (!fs.existsSync(dataDir)) {
  console.log('   ℹ️  data 目录不存在，可能使用内存缓存');
  console.log('   💡 解决方案: 重启后端服务即可清除内存缓存');
  console.log('      npm run backend:stop');
  console.log('      npm run backend:dev');
  process.exit(0);
}

// 查找可能的缓存文件
const cacheFiles = [
  path.join(dataDir, 'logs.json'),
  path.join(dataDir, 'CONFIG_STORE.json'),
  path.join(dataDir, 'MODELS_CONFIG.json'),
];

let deletedCount = 0;

console.log('   检查缓存文件...\n');

for (const filePath of cacheFiles) {
  try {
    if (fs.existsSync(filePath)) {
      const stats = fs.statSync(filePath);
      console.log(`   📄 找到: ${path.basename(filePath)} (${(stats.size / 1024).toFixed(1)} KB)`);
      
      // 检查是否是模型配置缓存
      if (filePath.includes('MODELS_CONFIG') || filePath.includes('CONFIG_STORE')) {
        try {
          const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
          if (content.MODELS_CONFIG || content.openAI) {
            console.log(`      ⚠️  包含模型配置缓存`);
            fs.unlinkSync(filePath);
            deletedCount++;
            console.log(`      ✅ 已删除`);
          }
        } catch (e) {
          // 不是 JSON 文件，跳过
        }
      } else if (filePath.includes('logs.json')) {
        // logs.json 可能包含缓存数据
        console.log(`      ⚠️  可能包含缓存数据`);
        fs.unlinkSync(filePath);
        deletedCount++;
        console.log(`      ✅ 已删除`);
      }
    }
  } catch (error) {
    console.log(`      ❌ 处理失败: ${error.message}`);
  }
}

console.log('');

if (deletedCount > 0) {
  console.log(`✅ 已清除 ${deletedCount} 个缓存文件`);
} else {
  console.log('ℹ️  未找到可清除的缓存文件');
  console.log('   💡 缓存可能存储在内存中（Redis 或内存缓存）');
}

console.log('\n💡 重要提示:');
console.log('   1. 如果使用 Redis，需要清除 Redis 缓存');
console.log('   2. 内存缓存会在服务重启时自动清除');
console.log('   3. 请重启后端服务以确保缓存清除:');
console.log('      npm run backend:stop');
console.log('      npm run backend:dev');
console.log('');

// 如果使用 Redis，提供提示
const envFile = path.join(projectRoot, '.env');
if (fs.existsSync(envFile)) {
  const envContent = fs.readFileSync(envFile, 'utf8');
  if (envContent.includes('USE_REDIS=true') || envContent.includes('REDIS_URI=')) {
    console.log('⚠️  检测到 Redis 配置');
    console.log('   💡 如果使用 Redis，请运行: npm run flush-cache');
    console.log('   这会清除所有 Redis 缓存（包括用户会话）');
  }
}

console.log('✅ 完成！');

