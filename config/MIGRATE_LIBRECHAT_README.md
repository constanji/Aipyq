# LibreChat 数据库迁移指南

本指南说明如何将 LibreChat 数据库迁移到 Aipyq 数据库，并删除旧的 LibreChat 数据库。

## 📋 概述

- **源数据库**: `LibreChat`
- **目标数据库**: `Aipyq`
- **功能**: 
  1. 迁移所有集合数据
  2. 复制索引
  3. 删除源数据库（可选）

## 🚀 使用方法

### 方法一：迁移并自动删除源数据库

```bash
# 设置环境变量以自动删除源数据库
DELETE_SOURCE_DB=true node config/migrate-librechat-to-aipyq.js
```

### 方法二：仅迁移数据（保留源数据库）

```bash
# 只迁移数据，不删除源数据库
node config/migrate-librechat-to-aipyq.js
```

### 方法三：单独删除 LibreChat 数据库

如果只需要删除数据库而不迁移数据：

```bash
node config/delete-librechat-db.js
```

## ⚙️ 环境变量配置

脚本会自动从以下位置读取 MongoDB 配置：

1. **环境变量** (`.env` 文件):
   - `MONGO_HOST` - MongoDB 主机地址（默认: `host.docker.internal`）
   - `MONGO_PORT` - MongoDB 端口（默认: `27017`）

2. **docker-compose.yml**:
   - 如果环境变量未设置，会使用 `docker-compose.yml` 中的默认值

## 📝 迁移过程

1. **连接检查**: 检查源数据库是否存在
2. **集合列表**: 列出所有需要迁移的集合
3. **数据迁移**: 批量迁移每个集合的数据（批量大小: 1000）
4. **索引复制**: 复制所有索引到目标数据库
5. **数据验证**: 显示迁移摘要
6. **删除源数据库**: 如果设置了 `DELETE_SOURCE_DB=true`

## ⚠️ 注意事项

1. **备份**: 在执行迁移前，建议先备份数据库
2. **重复数据**: 如果目标集合已存在数据，脚本会尝试合并数据（跳过重复键）
3. **索引冲突**: 如果索引已存在，会跳过创建
4. **不可逆操作**: 删除数据库操作不可逆，请谨慎操作

## 🔍 迁移的集合

脚本会自动迁移以下类型的集合：
- `users` - 用户数据
- `conversations` - 对话数据
- `messages` - 消息数据
- `transactions` - 交易数据
- `files` - 文件数据
- `agents` - Agent 数据
- `prompts` - 提示词数据
- `roles` - 角色数据
- `accessroles` - 访问角色数据
- `aclentries` - ACL 条目数据
- `groups` - 组数据
- `projects` - 项目数据
- 以及其他所有非系统集合

## 📊 迁移输出示例

```
============================================================
开始数据库迁移：LibreChat -> Aipyq
============================================================
正在连接 MongoDB: mongodb://host.docker.internal:27017
正在获取源数据库的所有集合...
找到 12 个集合: users, conversations, messages, transactions, files, agents, prompts, roles, accessroles, aclentries, groups, projects
开始迁移集合 users，共 150 条记录...
已迁移 150/150 条记录...
集合 users 迁移完成，共迁移 150 条记录
...
============================================================
迁移摘要:
============================================================
  users: 成功迁移 150 条记录
  conversations: 成功迁移 320 条记录
  messages: 成功迁移 1250 条记录
  ...
总计迁移: 2500 条记录
```

## 🐛 故障排除

### 问题：连接失败

**解决方案**: 检查 MongoDB 是否运行，以及 `MONGO_HOST` 和 `MONGO_PORT` 是否正确

### 问题：权限错误

**解决方案**: 确保 MongoDB 用户有足够的权限进行读写和删除操作

### 问题：重复键错误

**解决方案**: 这是正常的，脚本会自动跳过重复的记录

## 📞 支持

如果遇到问题，请检查：
1. MongoDB 连接是否正常
2. 数据库名称是否正确
3. 环境变量是否设置正确
4. 日志输出中的错误信息

