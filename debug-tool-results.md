# Agent 工具结果返回问题调试指南

## 问题描述
Agent 使用工具时无法返回结果

## 关键检查点

### 1. ToolNode.ts - 工具执行 (第 86-102 行)

**位置**: `packages/agents/src/tools/ToolNode.ts`

**关键代码**:
```typescript
const output = await tool.invoke(
  { ...call, args, type: 'tool_call', stepId, turn },
  config
);
```

**调试步骤**:
1. 在 `tool.invoke()` 调用前后添加日志：
```typescript
console.log('[ToolNode] 调用工具:', {
  toolName: call.name,
  toolId: call.id,
  args: call.args,
  stepId,
  turn
});

const output = await tool.invoke(...);

console.log('[ToolNode] 工具返回结果:', {
  toolName: call.name,
  outputType: typeof output,
  isToolMessage: isBaseMessage(output) && output._getType() === 'tool',
  output: output instanceof ToolMessage ? {
    content: output.content,
    tool_call_id: output.tool_call_id,
    name: output.name
  } : output
});
```

2. 检查 `output` 的值：
   - 如果为 `null` 或 `undefined`：工具实现可能有问题
   - 如果为 `ToolMessage`：检查其内容是否正确
   - 如果为其他类型：会被转换为 `ToolMessage`

### 2. ToolNode.ts - ToolMessage 创建 (第 96-101 行)

**关键代码**:
```typescript
return new ToolMessage({
  status: 'success',
  name: tool.name,
  content: typeof output === 'string' ? output : JSON.stringify(output),
  tool_call_id: call.id!,
});
```

**调试步骤**:
添加日志检查 ToolMessage 的内容：
```typescript
const toolMessage = new ToolMessage({
  status: 'success',
  name: tool.name,
  content: typeof output === 'string' ? output : JSON.stringify(output),
  tool_call_id: call.id!,
});

console.log('[ToolNode] 创建 ToolMessage:', {
  name: toolMessage.name,
  tool_call_id: toolMessage.tool_call_id,
  contentLength: toolMessage.content?.length,
  contentPreview: typeof toolMessage.content === 'string' 
    ? toolMessage.content.substring(0, 100) 
    : '非字符串类型'
});

return toolMessage;
```

### 3. handlers.ts - TOOL_END 事件 (第 354 行)

**位置**: `packages/agents/src/tools/handlers.ts`

**关键代码**:
```typescript
await graph.handlerRegistry
  ?.getHandler(GraphEvents.TOOL_END)
  ?.handle(GraphEvents.TOOL_END, toolEndData, metadata, graph);
```

**调试步骤**:
添加日志检查事件是否触发：
```typescript
console.log('[handlers] 触发 TOOL_END 事件:', {
  toolName: toolCall.name,
  toolCallId: toolCall.id,
  outputContent: formattedOutput?.substring(0, 100),
  hasHandler: !!graph.handlerRegistry?.getHandler(GraphEvents.TOOL_END)
});

await graph.handlerRegistry
  ?.getHandler(GraphEvents.TOOL_END)
  ?.handle(GraphEvents.TOOL_END, toolEndData, metadata, graph);

console.log('[handlers] TOOL_END 事件处理完成');
```

### 4. callbacks.js - createToolEndCallback (第 245 行)

**位置**: `api/server/controllers/agents/callbacks.js`

**关键代码**:
```javascript
return async (data, metadata) => {
  const output = data?.output;
  if (!output) {
    return;
  }
```

**调试步骤**:
添加日志检查回调是否被调用：
```javascript
return async (data, metadata) => {
  console.log('[callbacks] ToolEnd 回调被调用:', {
    hasOutput: !!data?.output,
    outputType: data?.output?.constructor?.name,
    toolCallId: data?.output?.tool_call_id,
    hasArtifact: !!data?.output?.artifact
  });

  const output = data?.output;
  if (!output) {
    console.warn('[callbacks] ToolEnd 回调: output 为空');
    return;
  }
  // ... 其余代码
```

## 实际测试步骤

### 步骤 1: 启用调试日志

在启动应用时设置环境变量：
```bash
DEBUG=* NODE_ENV=development npm run backend:dev
```

### 步骤 2: 查看实时日志

打开终端监控日志：
```bash
# 监控错误日志
tail -f api/logs/error-*.log

# 监控调试日志
tail -f api/logs/debug-*.log | grep -E "(ToolNode|tool_call|TOOL_END)"
```

### 步骤 3: 测试简单工具

1. 创建一个测试 agent，配置 `Calculator` 工具
2. 发送消息："计算 2 + 2"
3. 观察日志输出，检查：
   - 工具是否被调用
   - 工具是否返回结果
   - ToolMessage 是否创建
   - TOOL_END 事件是否触发
   - 回调是否执行

### 步骤 4: 检查工具实现

如果工具返回 `null` 或 `undefined`，检查工具的实现：

```javascript
// 检查 api/app/clients/tools/util/handleTools.js
// 确保工具正确实现 _call 方法并返回结果
```

## 常见问题排查

### 问题 1: 工具未找到
**症状**: `Tool "${call.name}" not found.`
**解决**: 检查 `toolMap` 是否包含该工具，工具名称是否匹配

### 问题 2: 工具返回 null
**症状**: `output` 为 `null` 或 `undefined`
**解决**: 检查工具实现的 `_call` 方法是否正确返回结果

### 问题 3: ToolMessage 内容为空
**症状**: `content` 字段为空字符串
**解决**: 检查工具返回的结果格式，确保可以序列化为字符串

### 问题 4: TOOL_END 事件未触发
**症状**: 回调函数未被调用
**解决**: 检查 `handlerRegistry` 是否正确注册了 `TOOL_END` 处理器

### 问题 5: 工具结果未传递到 agent
**症状**: Agent 没有收到工具结果
**解决**: 检查消息流是否正确更新，graph 状态是否正确

## 快速验证命令

```bash
# 1. 查看最近的工具相关错误
grep -i "tool" api/logs/error-*.log | tail -20

# 2. 查看工具调用日志
grep -E "(ToolNode|tool\.invoke)" api/logs/debug-*.log | tail -20

# 3. 查看 TOOL_END 事件
grep -i "TOOL_END" api/logs/debug-*.log | tail -20

# 4. 运行验证脚本
node test-agent-tools.js
```

## 下一步

如果问题仍然存在，请：
1. 收集上述所有日志输出
2. 记录具体的工具名称和调用参数
3. 检查工具实现的源代码
4. 查看是否有异常被捕获但未正确传播

