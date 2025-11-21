#!/bin/bash

# 测试环境部署脚本
# 用于在新环境中测试项目部署

set -e  # 遇到错误立即退出

echo "=========================================="
echo "  AI朋友圈 - 测试环境部署脚本"
echo "=========================================="
echo ""

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 检查 Docker
if ! command -v docker &> /dev/null; then
    echo -e "${RED}错误: Docker 未安装${NC}"
    echo "请先安装 Docker: https://docs.docker.com/get-docker/"
    exit 1
fi

# 检查 Docker Compose
if ! command -v docker compose &> /dev/null && ! command -v docker-compose &> /dev/null; then
    echo -e "${RED}错误: Docker Compose 未安装${NC}"
    exit 1
fi

# 使用 docker compose 或 docker-compose
if command -v docker compose &> /dev/null; then
    DOCKER_COMPOSE="docker compose"
else
    DOCKER_COMPOSE="docker-compose"
fi

echo -e "${GREEN}✓${NC} Docker 环境检查通过"
echo ""

# 检查 .env 文件
if [ ! -f .env ]; then
    echo -e "${YELLOW}警告: .env 文件不存在${NC}"
    if [ -f .env.example.min ]; then
        echo "正在从 .env.example.min 创建 .env 文件..."
        cp .env.example.min .env
        echo -e "${GREEN}✓${NC} 已创建 .env 文件"
        echo -e "${YELLOW}请编辑 .env 文件，设置必要的配置（JWT_SECRET、MEILI_MASTER_KEY 等）${NC}"
        echo ""
        read -p "按 Enter 继续（确保已配置 .env 文件）..."
    else
        echo -e "${RED}错误: .env.example.min 文件不存在${NC}"
        exit 1
    fi
else
    echo -e "${GREEN}✓${NC} .env 文件存在"
fi

# 检查必要的环境变量
echo ""
echo "检查必要的环境变量..."
REQUIRED_VARS=("JWT_SECRET" "MEILI_MASTER_KEY")
MISSING_VARS=()

for var in "${REQUIRED_VARS[@]}"; do
    if ! grep -q "^${var}=" .env 2>/dev/null; then
        MISSING_VARS+=("$var")
    fi
done

if [ ${#MISSING_VARS[@]} -gt 0 ]; then
    echo -e "${YELLOW}警告: 以下环境变量未设置:${NC}"
    for var in "${MISSING_VARS[@]}"; do
        echo "  - $var"
    done
    echo ""
    echo "请编辑 .env 文件设置这些变量"
    read -p "按 Enter 继续（可能会部署失败）..."
fi

# 询问是否需要构建前端
echo ""
echo "=========================================="
echo "  构建选项"
echo "=========================================="
echo ""
echo "Docker 镜像中已包含预构建的前端文件"
echo "  - 镜像: ${DOCKER_REGISTRY:-ghcr.io}/${DOCKER_REGISTRY_USER:-your-username}/${IMAGE_PREFIX:-aipyq}:${IMAGE_TAG:-latest}"
echo "  - 预构建文件位置: /app/client/dist"
echo ""
echo "选择："
echo "  [N] 跳过构建 - 使用镜像中的预构建文件（推荐，快速）"
echo "  [y] 本地构建 - 构建前端并覆盖镜像中的文件（需要 Node.js）"
echo ""
read -p "是否构建前端？(y/N): " BUILD_FRONTEND

if [[ "$BUILD_FRONTEND" =~ ^[Yy]$ ]]; then
    # 检查 Node.js 和 npm
    if ! command -v node &> /dev/null; then
        echo -e "${YELLOW}警告: Node.js 未安装，跳过构建${NC}"
        echo "将使用 Docker 镜像中的预构建文件"
        BUILD_FRONTEND=""
    elif ! command -v npm &> /dev/null; then
        echo -e "${YELLOW}警告: npm 未安装，跳过构建${NC}"
        echo "将使用 Docker 镜像中的预构建文件"
        BUILD_FRONTEND=""
    else
        echo ""
        echo "开始构建前端..."
        echo "这可能需要几分钟时间..."
        
        # 检查是否已安装依赖
        if [ ! -d "node_modules" ]; then
            echo "安装依赖..."
            npm ci --no-audit || npm install --no-audit
        fi
        
        # 构建前端
        npm run frontend
        
        if [ $? -eq 0 ]; then
            echo -e "${GREEN}✓${NC} 前端构建完成"
        else
            echo -e "${RED}✗${NC} 前端构建失败"
            echo -e "${YELLOW}将继续使用 Docker 镜像中的预构建文件${NC}"
        fi
    fi
else
    echo "跳过构建，将使用 Docker 镜像中的预构建文件"
fi

# 停止现有容器（如果存在）
echo ""
echo "停止现有容器..."
$DOCKER_COMPOSE down 2>/dev/null || true

# 创建必要的目录
echo ""
echo "创建必要的目录..."
mkdir -p data-node meili_data_v1.12 logs uploads images

# 如果未构建，确保 dist 目录存在（避免挂载错误）
if [ ! -d "client/dist" ]; then
    echo "创建 client/dist 目录（将使用镜像中的文件）..."
    mkdir -p client/dist
fi

# 启动容器
echo ""
echo "启动 Docker 容器..."
$DOCKER_COMPOSE up -d

# 等待服务启动
echo ""
echo "等待服务启动（30秒）..."
sleep 30

# 检查容器状态
echo ""
echo "检查容器状态..."
$DOCKER_COMPOSE ps

# 检查服务健康状态
echo ""
echo "检查服务健康状态..."

# 检查 API
if curl -s http://localhost:${API_PORT:-3080}/health > /dev/null 2>&1; then
    echo -e "${GREEN}✓${NC} API 服务正常"
else
    echo -e "${YELLOW}⚠${NC} API 服务可能未就绪，请检查日志: docker compose logs api"
fi

# 检查 MongoDB
if docker exec PYQ-MongoDB mongosh --eval "db.adminCommand('ping')" > /dev/null 2>&1; then
    echo -e "${GREEN}✓${NC} MongoDB 正常"
else
    echo -e "${YELLOW}⚠${NC} MongoDB 可能未就绪"
fi

# 检查 Meilisearch
if curl -s http://localhost:${MEILI_PORT:-7700}/health > /dev/null 2>&1; then
    echo -e "${GREEN}✓${NC} Meilisearch 正常"
else
    echo -e "${YELLOW}⚠${NC} Meilisearch 可能未就绪"
fi

echo ""
echo "=========================================="
echo -e "${GREEN}部署完成！${NC}"
echo "=========================================="
echo ""
echo "访问地址: http://localhost:${API_PORT:-3080}"
echo ""
echo "查看日志:"
echo "  docker compose logs -f api"
echo ""
echo "停止服务:"
echo "  docker compose down"
echo ""
echo "完全清理（包括数据）:"
echo "  docker compose down -v"
echo "  rm -rf data-node meili_data_v1.12 logs uploads"
echo ""

