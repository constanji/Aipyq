/**
 * Agent 工具调用验证脚本
 * 用于测试 agent 使用工具时无法返回结果的问题
 */

const { logger } = require('@aipyq/data-schemas');

// 测试工具调用的关键检查点
function checkToolCallFlow() {
  console.log('=== Agent 工具调用验证 ===\n');
  
  const checks = [
    {
      name: '1. 检查 ToolNode 工具执行',
      description: '验证工具是否被正确调用',
      check: () => {
        // 检查点：packages/agents/src/tools/ToolNode.ts:86-102
        console.log('   - 检查工具是否在 toolMap 中');
        console.log('   - 检查 tool.invoke() 是否返回结果');
        console.log('   - 检查返回的是 ToolMessage 还是其他格式');
      }
    },
    {
      name: '2. 检查工具结果格式化',
      description: '验证工具结果是否正确格式化',
      check: () => {
        // 检查点：packages/agents/src/tools/ToolNode.ts:96-101
        console.log('   - 检查 output 是否为 ToolMessage 类型');
        console.log('   - 检查 content 字段是否正确设置');
        console.log('   - 检查 tool_call_id 是否匹配');
      }
    },
    {
      name: '3. 检查错误处理',
      description: '验证工具执行错误是否被正确处理',
      check: () => {
        // 检查点：packages/agents/src/tools/ToolNode.ts:103-150
        console.log('   - 检查错误是否被捕获');
        console.log('   - 检查错误消息是否正确返回');
        console.log('   - 检查 errorHandler 是否被调用');
      }
    },
    {
      name: '4. 检查工具结果传递',
      description: '验证工具结果是否正确传递给 agent',
      check: () => {
        // 检查点：packages/agents/src/tools/handlers.ts
        console.log('   - 检查 ToolMessage 是否添加到消息流');
        console.log('   - 检查工具结果是否触发 TOOL_END 事件');
        console.log('   - 检查 graph 是否正确更新');
      }
    },
    {
      name: '5. 检查日志记录',
      description: '验证关键步骤是否有日志记录',
      check: () => {
        console.log('   - 检查工具调用开始日志');
        console.log('   - 检查工具执行结果日志');
        console.log('   - 检查错误日志');
      }
    }
  ];

  checks.forEach((check, index) => {
    console.log(`${check.name}`);
    console.log(`   描述: ${check.description}`);
    check.check();
    console.log('');
  });
}

// 日志检查函数
function checkLogs() {
  console.log('=== 日志检查指南 ===\n');
  console.log('1. 查看 API 日志 (api/logs/):');
  console.log('   - debug-*.log: 查找工具调用相关日志');
  console.log('   - error-*.log: 查找工具执行错误');
  console.log('');
  console.log('2. 关键日志关键词:');
  console.log('   - "tool_call"');
  console.log('   - "ToolNode"');
  console.log('   - "tool.invoke"');
  console.log('   - "ToolMessage"');
  console.log('   - "TOOL_END"');
  console.log('   - "Error processing tool"');
  console.log('');
  console.log('3. 检查控制台输出:');
  console.log('   - packages/agents/src/tools/ToolNode.ts 中的 console.error');
  console.log('   - packages/agents/src/tools/handlers.ts 中的 console.warn');
  console.log('');
}

// 调试步骤
function debugSteps() {
  console.log('=== 调试步骤 ===\n');
  console.log('1. 启用详细日志:');
  console.log('   - 设置环境变量: DEBUG=* 或 NODE_ENV=development');
  console.log('   - 检查 logger 配置');
  console.log('');
  console.log('2. 添加断点或日志:');
  console.log('   - packages/agents/src/tools/ToolNode.ts:86 (tool.invoke)');
  console.log('   - packages/agents/src/tools/ToolNode.ts:96 (返回 ToolMessage)');
  console.log('   - packages/agents/src/tools/handlers.ts:354 (TOOL_END 事件)');
  console.log('');
  console.log('3. 测试工具调用:');
  console.log('   - 创建一个简单的 agent');
  console.log('   - 配置一个简单的工具（如 Calculator）');
  console.log('   - 发送请求让 agent 调用工具');
  console.log('   - 观察工具结果是否返回');
  console.log('');
  console.log('4. 检查工具结果格式:');
  console.log('   - 工具应返回 ToolMessage 对象');
  console.log('   - ToolMessage 应包含: content, tool_call_id, name');
  console.log('   - 检查 content 是否为字符串或可序列化的对象');
  console.log('');
}

// 常见问题检查
function commonIssues() {
  console.log('=== 常见问题检查 ===\n');
  console.log('1. 工具未找到:');
  console.log('   - 检查 toolMap 中是否包含该工具');
  console.log('   - 检查工具名称是否匹配');
  console.log('');
  console.log('2. 工具返回 null 或 undefined:');
  console.log('   - 检查工具实现是否正确返回结果');
  console.log('   - 检查工具是否抛出异常');
  console.log('');
  console.log('3. ToolMessage 格式错误:');
  console.log('   - 检查 content 字段类型');
  console.log('   - 检查 tool_call_id 是否匹配');
  console.log('   - 检查 name 字段是否正确');
  console.log('');
  console.log('4. 工具结果未传递到 agent:');
  console.log('   - 检查消息流是否正确更新');
  console.log('   - 检查 TOOL_END 事件是否触发');
  console.log('   - 检查 graph 状态是否正确');
  console.log('');
}

// 运行所有检查
function runAllChecks() {
  checkToolCallFlow();
  checkLogs();
  debugSteps();
  commonIssues();
  
  console.log('=== 快速测试命令 ===\n');
  console.log('1. 查看最近的错误日志:');
  console.log('   tail -f api/logs/error-*.log | grep -i tool');
  console.log('');
  console.log('2. 查看工具调用日志:');
  console.log('   tail -f api/logs/debug-*.log | grep -i "tool_call"');
  console.log('');
  console.log('3. 测试工具调用 API:');
  console.log('   curl -X POST http://localhost:3080/api/agents/tools/{toolId}/call \\');
  console.log('     -H "Content-Type: application/json" \\');
  console.log('     -H "Authorization: Bearer YOUR_TOKEN" \\');
  console.log('     -d \'{"args": {...}}\'');
  console.log('');
}

// 执行
if (require.main === module) {
  runAllChecks();
}

module.exports = {
  checkToolCallFlow,
  checkLogs,
  debugSteps,
  commonIssues,
  runAllChecks
};

