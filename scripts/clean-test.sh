#!/bin/bash

# 清理测试环境脚本
# 用于完全清理测试部署，包括所有数据

set -e

echo "=========================================="
echo "  清理测试环境"
echo "=========================================="
echo ""

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# 使用 docker compose 或 docker-compose
if command -v docker compose &> /dev/null; then
    DOCKER_COMPOSE="docker compose"
else
    DOCKER_COMPOSE="docker-compose"
fi

# 确认操作
echo -e "${YELLOW}警告: 此操作将删除所有容器和数据！${NC}"
read -p "确认继续？(yes/no): " confirm

if [ "$confirm" != "yes" ]; then
    echo "已取消"
    exit 0
fi

# 停止并删除容器
echo ""
echo "停止并删除容器..."
$DOCKER_COMPOSE down -v 2>/dev/null || true

# 删除数据目录
echo ""
echo "删除数据目录..."
rm -rf data-node meili_data_v1.12 logs uploads 2>/dev/null || true

echo ""
echo -e "${GREEN}✓${NC} 清理完成"
echo ""
echo "注意: .env 文件和配置文件未被删除"
echo "如需重新部署，运行: ./scripts/test-deploy.sh"

