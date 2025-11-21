<p align="center">
    <img src="client/public/assets/logo.svg" height="256">
  </a>
  <h1 align="center">    
  </h1>
</p>


# ✨ 核心功能

- 🖥️ **界面与体验**：灵感源自 ChatGPT，兼具增强型设计与丰富功能

- 🤖 **AI 模型选择**：
  - Anthropic（Claude）、AWS Bedrock、OpenAI、Azure OpenAI、Google、Vertex AI、OpenAI 响应 API（含 Azure）
  - 自定义端点：无需代理，即可在 LibreChat 中使用任何兼容 OpenAI 的 API
  - 兼容本地及远程 AI 提供商：
    - Ollama、groq、Cohere、Mistral AI、Apple MLX、koboldcpp、together.ai
    - OpenRouter、Perplexity、ShuttleAI、Deepseek、通义千问（Qwen）等更多平台

- 🔧 **代码解释器 API**：
  - 安全沙箱执行环境，支持 Python、Node.js（JS/TS）、Go、C/C++、Java、PHP、Rust 及 Fortran
  - 无缝文件处理：直接上传、处理并下载文件
  - 隐私无忧：执行环境完全隔离，安全可靠

- 🔦 **智能代理与工具集成**：
  - 智能代理：
    - 无代码自定义助手：构建专业的 AI 驱动型辅助工具
    - 代理市场：发现并部署社区构建的智能代理
    - 协作共享：与特定用户及群组共享代理
    - 灵活可扩展：支持 MCP 服务器、各类工具、文件搜索、代码执行等功能
    - 多平台兼容：适配自定义端点、OpenAI、Azure、Anthropic、AWS Bedrock、Google、Vertex AI、响应 API 等
    - 工具支持模型上下文协议（MCP）

- 🔍 **网页搜索**：
  - 联网检索相关信息，增强 AI 上下文理解能力
  - 整合搜索提供商、内容抓取工具及结果重排器，优化搜索效果
  - 可自定义 Jina 重排：配置自定义 Jina API 地址用于重排服务

- 🪄 **生成式界面与代码产物**：
  - 代码产物支持在聊天中直接创建 React、HTML 及 Mermaid 图表

- 🎨 **图像生成与编辑**：
  - 文生图与图生图（支持 GPT-Image-1）
  - 文生图（支持 DALL-E（3/2）、Stable Diffusion 本地部署、Flux 或任何 MCP 服务器）
  - 输入提示词生成精美图像，或通过简单指令优化现有图像

- 💾 **预设与上下文管理**：
  - 创建、保存并共享自定义预设
  - 聊天过程中切换 AI 端点与预设
  - 编辑、重新提交消息，支持对话分支续聊
  - 创建并与特定用户及群组共享提示词
  - 消息与对话分支：高级上下文控制功能

- 💬 **多模态与文件交互**：
  - 上传并分析图像（支持 Claude 3、GPT-4.5、GPT-4o、o1、Llama-Vision 及 Gemini）📸
  - 文件对话（支持自定义端点、OpenAI、Azure、Anthropic、AWS Bedrock 及 Google）🗃️

- 🌎 **多语言界面**：
  - 英语、中文（简体）、中文（繁体）、阿拉伯语、德语、西班牙语、法语、意大利语
  - 波兰语、葡萄牙语（葡萄牙）、葡萄牙语（巴西）、俄语、日语、瑞典语、韩语、越南语
  - 土耳其语、荷兰语、希伯来语、加泰罗尼亚语、捷克语、丹麦语、爱沙尼亚语、波斯语
  - 芬兰语、匈牙利语、亚美尼亚语、印度尼西亚语、格鲁吉亚语、拉脱维亚语、泰语、维吾尔语

- 🧠 **推理界面**：
  - 动态推理界面，适配思维链/推理型 AI 模型（如 DeepSeek-R1）

- 🎨 **可自定义界面**：
  - 可定制下拉菜单与界面布局，适配专业用户与新手用户需求

- 🗣️ **语音与音频功能**：
  - 语音转文字与文字转语音，支持免手动输入聊天
  - 自动发送并播放音频
  - 兼容 OpenAI、Azure OpenAI 及 Elevenlabs

- 📥 **对话导入与导出**：
  - 支持从 ChatGPT、Chatbot UI 导入对话
  - 支持以截图、Markdown、文本、JSON 格式导出对话

- 🔍 **搜索与发现**：
  - 搜索所有消息与对话

- 👥 **多用户与安全访问**：
  - 多用户支持，安全认证（兼容 OAuth2、LDAP 及邮箱登录）
  - 内置内容审核与 Token 消耗管理工具

---

## 🚀 快速开始

### 前置要求

- Docker 和 Docker Compose
- Git
- 至少 4GB 可用磁盘空间

### 快速部署

1. **克隆项目**
   ```bash
   git clone <your-repo-url>
   cd Aipyq
   ```

2. **配置环境变量**
   ```bash
   cp .env.example.min .env
   # 编辑 .env 文件，设置必要的配置（JWT_SECRET、MEILI_MASTER_KEY 等）
   ```

3. **启动服务**
   ```bash
   # 使用测试部署脚本（推荐）
   ./scripts/test-deploy.sh
   
   # 或手动启动
   docker compose up -d
   ```

4. **访问应用**
   - 打开浏览器访问：`http://localhost:3080`

### 测试环境部署

详细说明请参考 [DEPLOY_TEST.md](./DEPLOY_TEST.md)

### 清理测试环境

```bash
./scripts/clean-test.sh
```




---








