#!/bin/bash

# 仅构建脚本
# 用于在部署前单独构建前端

set -e

echo "=========================================="
echo "  构建前端"
echo "=========================================="
echo ""

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# 检查 Node.js
if ! command -v node &> /dev/null; then
    echo -e "${RED}错误: Node.js 未安装${NC}"
    echo "请先安装 Node.js: https://nodejs.org/"
    exit 1
fi

# 检查 npm
if ! command -v npm &> /dev/null; then
    echo -e "${RED}错误: npm 未安装${NC}"
    exit 1
fi

echo -e "${GREEN}✓${NC} Node.js 版本: $(node --version)"
echo -e "${GREEN}✓${NC} npm 版本: $(npm --version)"
echo ""

# 检查依赖
if [ ! -d "node_modules" ]; then
    echo "安装依赖..."
    npm ci --no-audit || npm install --no-audit
    echo -e "${GREEN}✓${NC} 依赖安装完成"
else
    echo -e "${GREEN}✓${NC} 依赖已存在"
fi

echo ""
echo "开始构建前端..."
echo "这可能需要几分钟时间..."
echo ""

# 构建前端
npm run frontend

if [ $? -eq 0 ]; then
    echo ""
    echo "=========================================="
    echo -e "${GREEN}构建完成！${NC}"
    echo "=========================================="
    echo ""
    echo "构建产物位于: client/dist/"
    echo ""
    echo "现在可以运行部署脚本:"
    echo "  ./scripts/test-deploy.sh"
    echo ""
else
    echo ""
    echo -e "${RED}构建失败！${NC}"
    echo "请检查错误信息"
    exit 1
fi

