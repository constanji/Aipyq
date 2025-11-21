# ModelScope DeepSeek-V3.2-Exp 模型配置指南
本指南说明如何在 LibreChat 中配置和使用 ModelScope 的 DeepSeek-V3.2-Exp 模型。
## 方法一：使用 OpenAI 端点（推荐）
由于 ModelScope API 兼容 OpenAI API 格式，您可以直接使用 OpenAI 端点，通过环境变量配置 ModelScope 的 API 地址和密钥。
### 1. 设置环境变量
在您的 `.env` 文件或环境变量中设置以下内容：
```bash
# ModelScope API 配置
OPENAI_REVERSE_PROXY=https://api-inference.modelscope.cn/v1
OPENAI_API_KEY=ms-75288e74-19de-40ad-ac83-2290a6344461
```
**注意**：请将 `OPENAI_API_KEY` 替换为您自己的 ModelScope Token。
### 2. 使用模型
1. 启动 LibreChat 服务
2. 在聊天界面中选择 **OpenAI** 端点
3. 在模型选择器中选择 `deepseek-ai/DeepSeek-V3.2-Exp` 模型
4. 开始对话
### 3. 功能支持

- ✅ 流式响应（Streaming）
- ✅ 推理内容显示（Reasoning Content）- 模型会显示思考过程
- ✅ 标准聊天功能

## 方法二：使用自定义端点

您也可以在 `librechat.yaml` 配置文件中添加 ModelScope 作为自定义端点：

```yaml
endpoints:
  custom:
    - name: 'modelscope'
      apiKey: '${MODELSCOPE_API_KEY}'
      baseURL: 'https://api-inference.modelscope.cn/v1/'
      models:
        default:
          - 'deepseek-ai/DeepSeek-V3.2-Exp'
        fetch: false
      titleConvo: true
      titleModel: 'deepseek-ai/DeepSeek-V3.2-Exp'
      modelDisplayLabel: 'ModelScope'
```

然后在环境变量中设置：

```bash
MODELSCOPE_API_KEY=ms-75288e74-19de-40ad-ac83-2290a6344461
```

## 技术说明

### Reasoning Content 支持

LibreChat 已经内置了对 `reasoning_content` 字段的支持。当使用 ModelScope 的 DeepSeek-V3.2-Exp 模型时：

- 模型的推理过程会通过 `reasoning_content` 字段流式传输
- 推理内容会在聊天界面中以特殊格式显示（思考过程）
- 最终答案会在推理完成后显示

代码实现位置：
- 后端处理：`api/app/clients/OpenAIClient.js` (第994-1012行)
- 使用 `SplitStreamHandler` 处理流式响应中的 `reasoning_content` 字段

### 模型列表

模型 `deepseek-ai/DeepSeek-V3.2-Exp` 已添加到默认模型列表中：
- 文件位置：`packages/data-provider/src/config.ts`
- 在 OpenAI 端点下可用

## 故障排除

### 问题：无法连接到 ModelScope API

**解决方案**：
1. 检查网络连接，确保可以访问 `https://api-inference.modelscope.cn`
2. 验证 API Key 是否正确
3. 检查环境变量是否正确设置

### 问题：模型不在列表中

**诊断步骤**：

首先运行诊断脚本检查配置：

```bash
node config/check-models.js
```

这个脚本会检查：
- 默认模型配置是否正确
- 环境变量设置
- 缓存状态

**解决方案**：

1. **清除模型配置缓存**（最重要！）：
   
   LibreChat 会缓存模型配置。如果修改了模型配置，需要清除缓存：
   
   ```bash
   # 方法1：使用简单的缓存清除脚本（推荐，不依赖项目模块）
   node config/clear-models-cache-simple.js
   
   # 方法2：清除所有缓存（会清除所有缓存，包括用户会话）
   npm run flush-cache
   
   # 方法3：如果依赖已安装，可以使用完整版本
   # node config/clear-models-cache-only.js
   ```
   
   **注意**：如果使用 `npm run flush-cache`，所有用户需要重新登录。

2. **检查环境变量**：
   
   如果设置了 `OPENAI_MODELS` 环境变量，它会**完全覆盖**默认模型列表：
   
   ```bash
   # 检查是否设置了 OPENAI_MODELS
   echo $OPENAI_MODELS
   ```
   
   如果设置了但没有包含 deepseek，需要：
   - 删除该环境变量（推荐），或
   - 在环境变量中添加 deepseek：
     ```bash
     OPENAI_MODELS=gpt-4o,gpt-4o-mini,deepseek-ai/DeepSeek-V3.2-Exp
     ```

3. **重启服务**：
   
   修改配置后必须重启 LibreChat 服务：
   ```bash
   npm run backend:stop
   npm run backend:dev
   ```

4. **验证代码修改**：
   
   确保以下文件已正确修改：
   - `packages/data-provider/src/config.ts` (第1078行) - 包含 `deepseek-ai/DeepSeek-V3.2-Exp`
   - `api/server/services/ModelService.js` - 合并逻辑已更新

5. **强制刷新浏览器**：
   
   清除浏览器缓存或使用硬刷新（Ctrl+Shift+R 或 Cmd+Shift+R）

6. **如果仍然不行**：
   
   使用环境变量强制指定模型列表（这会覆盖所有其他配置）：
   ```bash
   OPENAI_MODELS=gpt-4o,gpt-4o-mini,deepseek-ai/DeepSeek-V3.2-Exp
   ```
   然后清除缓存并重启服务。

### 问题：推理内容不显示

**解决方案**：
1. 确认使用的是 DeepSeek-V3.2-Exp 模型
2. 检查浏览器控制台是否有错误
3. 验证流式响应是否正常工作

## 参考链接

- [ModelScope 官方文档](https://modelscope.cn)
- [LibreChat 配置文档](https://www.librechat.ai/docs/configuration/librechat_yaml)
- [OpenAI API 兼容性说明](https://www.librechat.ai/docs/quick_start/custom_endpoints)

