#!/usr/bin/env node

/**
 * 分析 agent 任务被取消的原因
 * 
 * 使用方法:
 *   node analyze-cancellation.js [选项]
 * 
 * 选项:
 *   --date YYYY-MM-DD    指定要分析的日期 (默认: 今天)
 *   --conversation-id ID 查找特定会话的日志
 *   --yijing-bazi        专门查找 yijing-bazi 相关的取消日志
 *   --last-hours N       查找最近 N 小时的日志
 */

const fs = require('fs');
const path = require('path');
const zlib = require('zlib');
const { promisify } = require('util');
const readFile = promisify(fs.readFile);
const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);

const LOG_DIR = path.join(__dirname, 'api', 'logs');

// 取消相关的关键词
const CANCELLATION_KEYWORDS = [
  'cancelled',
  'cancel',
  'abort',
  'Run cancelled',
  'Request closed',
  'RUN CANCELLED',
  'already cancelled',
  'Request aborted',
  'Unexpected connection close',
  'yijing-bazi',
  'yijing-bazi',
  'bazi',
];

// Agent 相关的日志标识
const AGENT_KEYWORDS = [
  'AgentController',
  '/agents/',
  'AgentClient',
  'AgentRun',
];

// 错误相关的关键词
const ERROR_KEYWORDS = [
  'Error',
  'error',
  'failed',
  'timeout',
  'timed out',
];

/**
 * 读取日志文件（支持 gz 压缩）
 */
async function readLogFile(filePath) {
  try {
    const data = await readFile(filePath);
    
    // 检查是否是 gz 文件
    if (filePath.endsWith('.gz')) {
      return new Promise((resolve, reject) => {
        zlib.gunzip(data, (err, decompressed) => {
          if (err) {
            reject(err);
          } else {
            resolve(decompressed.toString('utf-8'));
          }
        });
      });
    }
    
    return data.toString('utf-8');
  } catch (error) {
    console.error(`读取日志文件失败: ${filePath}`, error.message);
    return null;
  }
}

/**
 * 解析日志行（支持 JSON 格式和普通格式）
 */
function parseLogLine(line) {
  try {
    // 尝试解析为 JSON
    const json = JSON.parse(line);
    return {
      timestamp: json.timestamp || json.time || '',
      level: json.level || '',
      message: json.message || '',
      metadata: json,
      isJson: true,
    };
  } catch {
    // 如果不是 JSON，尝试解析为普通日志格式
    const timestampMatch = line.match(/^\d{4}-\d{2}-\d{2}[T ]\d{2}:\d{2}:\d{2}/);
    const timestamp = timestampMatch ? timestampMatch[0] : '';
    
    const levelMatch = line.match(/\b(debug|info|warn|error)\b/i);
    const level = levelMatch ? levelMatch[0].toLowerCase() : '';
    
    return {
      timestamp,
      level,
      message: line,
      metadata: {},
      isJson: false,
    };
  }
}

/**
 * 检查日志行是否包含取消相关信息
 */
function isCancellationRelated(logEntry, filters = {}) {
  const { conversationId, yijingBaziOnly } = filters;
  const message = logEntry.message.toLowerCase();
  const fullText = JSON.stringify(logEntry.metadata).toLowerCase();
  
  // 如果指定了会话 ID，检查是否匹配
  if (conversationId) {
    const hasConversationId = 
      fullText.includes(conversationId.toLowerCase()) ||
      message.includes(conversationId.toLowerCase());
    if (!hasConversationId) {
      return false;
    }
  }
  
  // 如果只查找 yijing-bazi 相关
  if (yijingBaziOnly) {
    const hasYijingBazi = 
      message.includes('yijing-bazi') ||
      message.includes('yijing_bazi') ||
      message.includes('bazi') ||
      fullText.includes('yijing-bazi') ||
      fullText.includes('yijing_bazi');
    if (!hasYijingBazi) {
      return false;
    }
  }
  
  // 检查是否包含取消关键词
  const hasCancellation = CANCELLATION_KEYWORDS.some(keyword => 
    message.includes(keyword.toLowerCase()) || 
    fullText.includes(keyword.toLowerCase())
  );
  
  // 检查是否是 agent 相关
  const isAgentRelated = AGENT_KEYWORDS.some(keyword =>
    message.includes(keyword.toLowerCase()) ||
    fullText.includes(keyword.toLowerCase())
  );
  
  return hasCancellation && isAgentRelated;
}

/**
 * 查找相关的上下文日志（取消前后的日志）
 */
function findContext(logs, index, contextLines = 10) {
  const start = Math.max(0, index - contextLines);
  const end = Math.min(logs.length, index + contextLines + 1);
  return logs.slice(start, end);
}

/**
 * 分析日志文件
 */
async function analyzeLogFile(filePath, filters = {}) {
  const content = await readLogFile(filePath);
  if (!content) {
    return [];
  }
  
  const lines = content.split('\n').filter(line => line.trim());
  const logEntries = lines.map(parseLogLine).filter(entry => entry.message);
  
  const cancellations = [];
  
  for (let i = 0; i < logEntries.length; i++) {
    const entry = logEntries[i];
    
    if (isCancellationRelated(entry, filters)) {
      const context = findContext(logEntries, i, 10);
      
      cancellations.push({
        file: path.basename(filePath),
        entry,
        context,
        index: i,
      });
    }
  }
  
  return cancellations;
}

/**
 * 获取要分析的日志文件列表
 */
async function getLogFiles(date, lastHours = null) {
  const files = await readdir(LOG_DIR);
  const today = new Date();
  
  let targetFiles = [];
  
  if (lastHours) {
    // 查找最近 N 小时的文件
    const cutoffTime = Date.now() - (lastHours * 60 * 60 * 1000);
    
    for (const file of files) {
      if (file.startsWith('error-') || file.startsWith('debug-')) {
        const filePath = path.join(LOG_DIR, file);
        try {
          const stats = await stat(filePath);
          if (stats.mtime.getTime() >= cutoffTime) {
            targetFiles.push(filePath);
          }
        } catch (error) {
          // 忽略无法访问的文件
        }
      }
    }
  } else {
    // 查找指定日期的文件
    const dateStr = date || today.toISOString().split('T')[0];
    
    targetFiles = files
      .filter(file => 
        (file.startsWith('error-') || file.startsWith('debug-')) &&
        file.includes(dateStr)
      )
      .map(file => path.join(LOG_DIR, file));
    
    // 如果没找到指定日期的文件，也查找最近的文件
    if (targetFiles.length === 0) {
      console.warn(`未找到 ${dateStr} 的日志文件，查找最近的日志文件...`);
      const recentFiles = files
        .filter(file => file.startsWith('error-') || file.startsWith('debug-'))
        .map(file => ({
          name: file,
          path: path.join(LOG_DIR, file),
        }))
        .sort((a, b) => {
          // 按文件名排序（最新的在前）
          return b.name.localeCompare(a.name);
        })
        .slice(0, 5); // 只取最近 5 个文件
      
      targetFiles = recentFiles.map(f => f.path);
    }
  }
  
  return targetFiles;
}

/**
 * 格式化输出结果
 */
function formatOutput(results) {
  if (results.length === 0) {
    console.log('\n❌ 未找到任何取消相关的日志记录。');
    return;
  }
  
  console.log(`\n📋 找到 ${results.length} 条取消相关的日志记录:\n`);
  console.log('='.repeat(80));
  
  results.forEach((result, idx) => {
    console.log(`\n【记录 #${idx + 1}】`);
    console.log(`文件: ${result.file}`);
    console.log(`时间: ${result.entry.timestamp || '未知'}`);
    console.log(`级别: ${result.entry.level.toUpperCase()}`);
    console.log(`\n主要消息:`);
    console.log(result.entry.message);
    
    if (result.entry.isJson && Object.keys(result.entry.metadata).length > 1) {
      console.log(`\n详细信息:`);
      console.log(JSON.stringify(result.entry.metadata, null, 2));
    }
    
    // 显示上下文
    const context = result.context.filter(ctx => 
      ctx.message && 
      (ERROR_KEYWORDS.some(kw => ctx.message.toLowerCase().includes(kw.toLowerCase())) ||
       AGENT_KEYWORDS.some(kw => ctx.message.toLowerCase().includes(kw.toLowerCase())) ||
       CANCELLATION_KEYWORDS.some(kw => ctx.message.toLowerCase().includes(kw.toLowerCase())))
    );
    
    if (context.length > 1) {
      console.log(`\n相关上下文 (${context.length} 条):`);
      context.slice(0, 5).forEach((ctx, i) => {
        if (i === Math.floor(context.length / 2)) {
          console.log('  ── 当前记录 ──');
        }
        const msg = ctx.message.substring(0, 200);
        console.log(`  [${ctx.timestamp || '?'}] ${ctx.level.toUpperCase()}: ${msg}`);
      });
    }
    
    console.log('\n' + '-'.repeat(80));
  });
  
  // 统计摘要
  console.log(`\n📊 统计摘要:`);
  const byLevel = {};
  const byFile = {};
  
  results.forEach(result => {
    byLevel[result.entry.level] = (byLevel[result.entry.level] || 0) + 1;
    byFile[result.file] = (byFile[result.file] || 0) + 1;
  });
  
  console.log('\n按级别分类:');
  Object.entries(byLevel).forEach(([level, count]) => {
    console.log(`  ${level.toUpperCase()}: ${count}`);
  });
  
  console.log('\n按文件分类:');
  Object.entries(byFile).forEach(([file, count]) => {
    console.log(`  ${file}: ${count}`);
  });
}

/**
 * 分析可能的原因
 */
function analyzeCauses(results) {
  console.log(`\n🔍 可能的原因分析:\n`);
  
  const causes = {
    manual: 0,
    connection: 0,
    timeout: 0,
    error: 0,
    unknown: 0,
  };
  
  results.forEach(result => {
    const msg = result.entry.message.toLowerCase();
    const fullText = JSON.stringify(result.entry.metadata).toLowerCase();
    
    if (msg.includes('run cancelled') || msg.includes('cancelled run')) {
      causes.manual++;
    } else if (msg.includes('request closed') || msg.includes('connection close') || msg.includes('aborted on close')) {
      causes.connection++;
    } else if (msg.includes('timeout') || msg.includes('timed out')) {
      causes.timeout++;
    } else if (msg.includes('error') || result.entry.level === 'error') {
      causes.error++;
    } else {
      causes.unknown++;
    }
  });
  
  if (causes.manual > 0) {
    console.log(`  ⚠️  手动取消: ${causes.manual} 次`);
    console.log(`     可能原因: 用户点击了停止按钮，或前端触发了取消操作`);
  }
  
  if (causes.connection > 0) {
    console.log(`  🔌 连接断开: ${causes.connection} 次`);
    console.log(`     可能原因: 网络连接不稳定，或客户端断开了连接`);
  }
  
  if (causes.timeout > 0) {
    console.log(`  ⏱️  超时: ${causes.timeout} 次`);
    console.log(`     可能原因: 工具执行时间过长，或网络请求超时`);
  }
  
  if (causes.error > 0) {
    console.log(`  ❌ 错误导致: ${causes.error} 次`);
    console.log(`     可能原因: MCP 工具调用失败，或服务端错误`);
  }
  
  if (causes.unknown > 0) {
    console.log(`  ❓ 未知原因: ${causes.unknown} 次`);
  }
}

/**
 * 主函数
 */
async function main() {
  const args = process.argv.slice(2);
  
  let date = null;
  let conversationId = null;
  let yijingBaziOnly = false;
  let lastHours = null;
  
  // 解析参数
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--date' && args[i + 1]) {
      date = args[i + 1];
      i++;
    } else if (args[i] === '--conversation-id' && args[i + 1]) {
      conversationId = args[i + 1];
      i++;
    } else if (args[i] === '--yijing-bazi') {
      yijingBaziOnly = true;
    } else if (args[i] === '--last-hours' && args[i + 1]) {
      lastHours = parseInt(args[i + 1], 10);
      i++;
    } else if (args[i] === '--help' || args[i] === '-h') {
      console.log(`
使用方法:
  node analyze-cancellation.js [选项]

选项:
  --date YYYY-MM-DD         指定要分析的日期 (默认: 今天)
  --conversation-id ID      查找特定会话的日志
  --yijing-bazi             专门查找 yijing-bazi 相关的取消日志
  --last-hours N            查找最近 N 小时的日志
  --help, -h                显示帮助信息

示例:
  node analyze-cancellation.js --date 2025-12-07
  node analyze-cancellation.js --yijing-bazi --last-hours 24
  node analyze-cancellation.js --conversation-id abc123
      `);
      process.exit(0);
    }
  }
  
  console.log('🔍 开始分析任务取消日志...\n');
  
  if (date) {
    console.log(`📅 分析日期: ${date}`);
  } else if (lastHours) {
    console.log(`⏰ 分析最近 ${lastHours} 小时的日志`);
  } else {
    console.log(`📅 分析日期: 今天`);
  }
  
  if (conversationId) {
    console.log(`💬 会话 ID: ${conversationId}`);
  }
  
  if (yijingBaziOnly) {
    console.log(`🔮 仅查找 yijing-bazi 相关日志`);
  }
  
  console.log('');
  
  try {
    const logFiles = await getLogFiles(date, lastHours);
    
    if (logFiles.length === 0) {
      console.log('❌ 未找到日志文件。');
      console.log(`   日志目录: ${LOG_DIR}`);
      process.exit(1);
    }
    
    console.log(`📁 找到 ${logFiles.length} 个日志文件:`);
    logFiles.forEach(file => {
      console.log(`   - ${path.basename(file)}`);
    });
    console.log('');
    
    const filters = {
      conversationId,
      yijingBaziOnly,
    };
    
    let allResults = [];
    
    for (const file of logFiles) {
      console.log(`正在分析: ${path.basename(file)}...`);
      const results = await analyzeLogFile(file, filters);
      allResults.push(...results);
    }
    
    // 按时间排序
    allResults.sort((a, b) => {
      const timeA = a.entry.timestamp || '';
      const timeB = b.entry.timestamp || '';
      return timeB.localeCompare(timeA); // 最新的在前
    });
    
    formatOutput(allResults);
    analyzeCauses(allResults);
    
    console.log(`\n✅ 分析完成！\n`);
    
  } catch (error) {
    console.error('❌ 分析过程中出现错误:', error);
    process.exit(1);
  }
}

// 运行主函数
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { analyzeLogFile, isCancellationRelated };

