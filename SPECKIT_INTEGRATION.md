# Speckit 集成指南 - Aipyq 项目

## ✅ 集成状态

所有文件已成功复制并配置到 Aipyq 项目中！

## 📁 已复制的文件

### 1. 核心工具文件
- ✅ `api/app/clients/tools/structured/Speckit.js` - Speckit 工具类
- ✅ `api/server/services/SpeckitService.js` - Speckit 服务类

### 2. Speckit 核心文件
- ✅ `.specify/templates/commands/` - 所有命令模板（8个）
- ✅ `.specify/templates/*.md` - 文档模板（spec, plan, tasks, checklist）
- ✅ `.specify/scripts/bash/` - Bash 脚本（5个）
- ✅ `.specify/scripts/powershell/` - PowerShell 脚本（Windows 支持）
- ✅ `memory/constitution.md` - 项目宪法模板

### 3. 配置文件更新
- ✅ `api/app/clients/tools/index.js` - 添加了 Speckit 导出
- ✅ `api/app/clients/tools/manifest.json` - 添加了 speckit 配置
- ✅ `api/app/clients/tools/util/handleTools.js` - 添加了 Speckit 支持

## 🚀 下一步操作

### 1. 安装依赖（如果需要）

确保已安装所有必要的依赖：

```bash
cd /path/to/LibreChat/Aipyq/Aipyq/api
npm install
```

### 2. 清除工具缓存

**如果使用 Redis**：
```bash
redis-cli DEL tools
```

**如果使用内存缓存**：
直接重启服务即可。

### 3. 重启服务

**PM2 方式**：
```bash
pm2 restart aipyq
```

**直接运行**：
```bash
# 停止当前进程，然后重新启动
npm start
```

### 4. 验证工具显示

1. 登录 Aipyq
2. 进入 **设置** > **工具** 或 **Agent 设置**
3. 在工具列表中查找 **"Speckit"**
4. 如果看到，启用它

## 🔍 验证清单

运行以下命令验证配置：

```bash
cd /path/to/LibreChat/Aipyq/Aipyq

# 1. 检查工具文件
ls -la api/app/clients/tools/structured/Speckit.js

# 2. 检查 manifest 配置
grep -A 5 "speckit" api/app/clients/tools/manifest.json

# 3. 测试工具加载（需要先安装依赖）
cd api
node -e "const S = require('./app/clients/tools/structured/Speckit.js'); const t = new S({override:true}); console.log('工具名称:', t.name);"
```

**预期输出**：
- 文件存在
- manifest.json 包含 speckit 配置
- 工具名称: `speckit`

## 📚 可用命令

Speckit 工具支持以下命令：

| 命令 | 说明 |
|------|------|
| `specify` | 创建功能规格说明 |
| `plan` | 创建实现计划 |
| `tasks` | 生成任务列表 |
| `implement` | 执行实现 |
| `clarify` | 澄清需求 |
| `analyze` | 分析一致性 |
| `checklist` | 生成检查清单 |
| `constitution` | 管理项目宪法 |

## 🎯 使用示例

### 在 Agent 中使用 Speckit

1. **创建功能规格**：
   ```
   使用 speckit 工具，执行 specify 命令，功能描述："添加用户认证功能"
   ```

2. **创建实现计划**：
   ```
   使用 speckit 工具，执行 plan 命令
   ```

3. **生成任务列表**：
   ```
   使用 speckit 工具，执行 tasks 命令
   ```

## ⚠️ 注意事项

1. **脚本权限**：确保 Bash 脚本有执行权限
   ```bash
   chmod +x .specify/scripts/bash/*.sh
   ```

2. **Git 仓库**：某些功能需要 Git 仓库（但支持无 Git 模式）

3. **项目根目录**：工具会自动检测项目根目录（通过查找 `.git` 或 `.specify` 目录）

4. **缓存刷新**：修改工具配置后，必须清除缓存并重启服务

5. **依赖安装**：如果工具加载失败，请确保已安装 `@langchain/core` 依赖：
   ```bash
   cd api
   npm install @langchain/core
   ```

## 🐛 故障排除

### 工具不显示

1. **清除工具缓存**
2. **重启服务**
3. **清除浏览器缓存**
4. **刷新页面**

### 工具加载失败

1. **检查依赖**：
   ```bash
   cd api
   npm list @langchain/core
   ```

2. **重新安装依赖**：
   ```bash
   npm install
   ```

3. **检查文件路径**：
   ```bash
   ls -la api/app/clients/tools/structured/Speckit.js
   ```

### 脚本执行失败

1. **检查脚本权限**：
   ```bash
   chmod +x .specify/scripts/bash/*.sh
   ```

2. **检查项目根目录**：
   确保 `.specify` 目录在项目根目录下

3. **检查 Git 仓库**（如果使用 Git 功能）：
   ```bash
   git status
   ```

## ✅ 完成！

Speckit 已成功集成到 Aipyq 项目中。现在可以在 Agent 中使用 Spec-Driven Development 工作流了！

---

**最后更新**: 2024-12-03

