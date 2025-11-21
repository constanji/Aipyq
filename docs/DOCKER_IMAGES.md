# AIPYQ Docker 镜像构建和推送指南

本文档说明如何构建和推送自定义 AIPYQ Docker 镜像。

## 镜像配置

### 环境变量配置

在 `.env` 文件中添加以下配置：

```bash
# Docker 镜像仓库配置
DOCKER_REGISTRY=ghcr.io                    # 镜像仓库地址（ghcr.io, docker.io, 或私有仓库）
DOCKER_REGISTRY_USER=your-username          # 镜像仓库用户名
IMAGE_PREFIX=aipyq                         # 镜像名称前缀
IMAGE_TAG=latest                           # 镜像标签（默认: latest）
```

### 镜像名称格式

- **API 镜像**: `${DOCKER_REGISTRY}/${DOCKER_REGISTRY_USER}/${IMAGE_PREFIX}:${IMAGE_TAG}`
- **RAG API 镜像**: `${DOCKER_REGISTRY}/${DOCKER_REGISTRY_USER}/${IMAGE_PREFIX}-rag-api:${IMAGE_TAG}`

**示例**:
- `ghcr.io/your-username/aipyq:latest`
- `docker.io/your-username/aipyq:v1.0.0`
- `registry.example.com/aipyq:latest`

## 构建镜像

### 方式 1：使用构建脚本（推荐）

```bash
# 设置环境变量
export DOCKER_REGISTRY=ghcr.io
export DOCKER_REGISTRY_USER=your-username
export IMAGE_PREFIX=aipyq

# 构建镜像
./scripts/docker-build.sh

# 构建并推送
./scripts/docker-build.sh --push

# 构建指定标签并推送
./scripts/docker-build.sh --tag v1.0.0 --push
```

### 方式 2：直接使用 Docker 命令

```bash
# 设置镜像名称
IMAGE_NAME="ghcr.io/your-username/aipyq:latest"

# 构建镜像
docker build -t "${IMAGE_NAME}" -f Dockerfile .

# 推送镜像
docker push "${IMAGE_NAME}"
```

## 推送镜像

### 使用推送脚本

```bash
# 设置环境变量
export DOCKER_REGISTRY=ghcr.io
export DOCKER_REGISTRY_USER=your-username
export IMAGE_PREFIX=aipyq

# 推送镜像
./scripts/docker-push.sh
```

### 手动推送

```bash
docker push ghcr.io/your-username/aipyq:latest
```

## 镜像仓库认证

### GitHub Container Registry (GHCR)

1. **创建 Personal Access Token**:
   - 访问: https://github.com/settings/tokens
   - 创建 token，权限: `write:packages`

2. **登录**:
   ```bash
   echo $GITHUB_TOKEN | docker login ghcr.io -u USERNAME --password-stdin
   ```

### Docker Hub

```bash
docker login docker.io -u your-username
```

### 私有仓库

```bash
docker login registry.example.com -u your-username
```

## 使用自定义镜像

### 更新 docker-compose.yml

镜像名称已配置为使用环境变量，只需在 `.env` 文件中设置：

```bash
DOCKER_REGISTRY=ghcr.io
DOCKER_REGISTRY_USER=your-username
IMAGE_PREFIX=aipyq
IMAGE_TAG=latest
```

然后启动容器：

```bash
docker compose up -d
```

### 临时覆盖镜像

```bash
DOCKER_REGISTRY=ghcr.io \
DOCKER_REGISTRY_USER=your-username \
IMAGE_PREFIX=aipyq \
docker compose up -d
```

## 构建选项

### 构建脚本选项

```bash
./scripts/docker-build.sh [选项]

选项:
  --api-only        只构建 API 镜像
  --rag-only        只构建 RAG API 镜像（暂不支持）
  --push            构建后推送到镜像仓库
  --tag TAG         指定镜像标签（默认: latest）
  --registry REG    指定镜像仓库地址
  --user USER       指定镜像仓库用户名
  --help            显示帮助信息
```

### 示例

```bash
# 只构建 API 镜像
./scripts/docker-build.sh --api-only

# 构建并推送 v1.0.0 标签
./scripts/docker-build.sh --tag v1.0.0 --push

# 使用自定义仓库
./scripts/docker-build.sh --registry docker.io --user myuser --push
```

## CI/CD 集成

### GitHub Actions 示例

```yaml
name: Build and Push Docker Image

on:
  push:
    tags:
      - 'v*'

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Login to GHCR
        uses: docker/login-action@v2
        with:
          registry: ghcr.io
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}
      
      - name: Build and push
        run: |
          export DOCKER_REGISTRY=ghcr.io
          export DOCKER_REGISTRY_USER=${{ github.actor }}
          export IMAGE_PREFIX=aipyq
          export IMAGE_TAG=${GITHUB_REF#refs/tags/}
          ./scripts/docker-build.sh --push
```

## 故障排除

### 认证失败

```bash
# 检查登录状态
docker login ghcr.io

# 重新登录
docker logout ghcr.io
docker login ghcr.io -u your-username
```

### 推送权限不足

确保你的 token 或账户有推送权限：
- GHCR: token 需要 `write:packages` 权限
- Docker Hub: 账户需要有推送权限

### 镜像不存在

确保先构建镜像：
```bash
./scripts/docker-build.sh
```

## 最佳实践

1. **使用版本标签**: 不要只使用 `latest`，使用语义化版本号
2. **多架构支持**: 考虑构建多架构镜像（amd64, arm64）
3. **安全扫描**: 推送前扫描镜像漏洞
4. **自动化**: 使用 CI/CD 自动构建和推送

## 相关文件

- `Dockerfile` - API 镜像构建文件
- `docker-compose.yml` - Docker Compose 配置
- `scripts/docker-build.sh` - 构建脚本
- `scripts/docker-push.sh` - 推送脚本

