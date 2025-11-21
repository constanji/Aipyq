# 测试环境部署指南

本文档说明如何在一个全新的环境中测试项目部署。

## 前置要求

- Docker 和 Docker Compose 已安装
- Git 已安装
- 至少 4GB 可用磁盘空间

## 快速测试部署

### 方法 1：使用测试脚本（推荐）

```bash
# 克隆项目（如果还没有）
git clone <your-repo-url>
cd Aipyq

# 运行测试部署脚本
chmod +x scripts/test-deploy.sh
./scripts/test-deploy.sh
```

### 方法 2：手动部署

#### 步骤 1：准备环境变量

```bash
# 复制最小化配置示例
cp .env.example.min .env

# 编辑 .env 文件，设置必要的配置
# 至少需要设置：
# - JWT_SECRET（随机字符串）
# - JWT_REFRESH_SECRET（随机字符串）
# - MEILI_MASTER_KEY（随机字符串）
# - APP_TITLE（应用名称）
# - 至少一个 AI API 密钥（如 OPENAI_API_KEY 或 ANTHROPIC_API_KEY）
```

#### 步骤 2：启动 Docker 容器

```bash
# 启动所有服务
docker compose up -d

# 查看容器状态
docker compose ps

# 查看日志
docker compose logs -f api
```

#### 步骤 3：验证部署

1. 访问应用：`http://localhost:3080`（或你配置的端口）
2. 检查服务状态：
   ```bash
   # 检查 API 服务
   curl http://localhost:3080/health
   
   # 检查 MongoDB
   docker exec PYQ-MongoDB mongosh --eval "db.adminCommand('ping')"
   
   # 检查 Meilisearch
   curl http://localhost:7700/health
   ```

## 测试环境清理

```bash
# 停止并删除所有容器和数据
docker compose down -v

# 删除数据目录（可选，会清除所有数据）
rm -rf data-node meili_data_v1.12 logs uploads
```

## 常见问题

### 端口冲突

如果端口被占用，修改 `.env` 文件中的端口配置：
```bash
API_PORT=3081
MONGO_PORT=27018
MEILI_PORT=7701
```

### 权限问题

如果遇到权限问题，设置正确的 UID/GID：
```bash
# 在 .env 文件中设置
UID=$(id -u)
GID=$(id -g)
```

### 数据库连接失败

确保 MongoDB 容器已启动：
```bash
docker compose ps mongodb
docker compose logs mongodb
```

## 验证清单

- [ ] Docker 容器全部运行正常
- [ ] 可以访问 Web 界面
- [ ] 可以注册/登录用户
- [ ] MongoDB 数据正常存储
- [ ] Meilisearch 搜索功能正常
- [ ] AI 聊天功能可以正常使用

## 生产环境部署

测试通过后，可以参考以下步骤部署到生产环境：

1. 修改 `.env` 文件中的配置（使用更强的密钥）
2. 配置反向代理（如 Nginx）
3. 设置 SSL 证书
4. 配置备份策略
5. 设置监控和日志收集

