#!/bin/bash

# Redis Cluster Startup Script
# This script starts and initializes a 3-node Redis cluster with no replicas

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

echo "🚀 正在启动 Redis 集群..."

# Create necessary directories
mkdir -p data/7001 data/7002 data/7003
mkdir -p logs

# Check if Redis is installed
if ! command -v redis-server &> /dev/null; then
    echo "❌ Redis 未安装。请先安装 Redis："
    echo "   macOS: brew install redis"
    echo "   Ubuntu: sudo apt-get install redis-server"
    echo "   CentOS: sudo yum install redis"
    exit 1
fi

# Check if Redis CLI is available
if ! command -v redis-cli &> /dev/null; then
    echo "❌ Redis CLI 不可用。请安装 Redis CLI。"
    exit 1
fi

# Start Redis instances
redis-server redis-7001.conf --daemonize yes
redis-server redis-7002.conf --daemonize yes
redis-server redis-7003.conf --daemonize yes

# Wait for nodes to start
sleep 5

# Check if all nodes are running
NODES_RUNNING=0
for port in 7001 7002 7003; do
    if redis-cli -p $port ping &> /dev/null; then
        NODES_RUNNING=$((NODES_RUNNING + 1))
    else
        echo "❌ 端口 $port 上的节点启动失败"
    fi
done

if [ $NODES_RUNNING -ne 3 ]; then
    echo "❌ 并非所有 Redis 节点都成功启动。"
    exit 1
fi

echo "✅ 所有 Redis 节点已启动"

# Check if cluster is already initialized
if redis-cli -p 7001 cluster info 2>/dev/null | grep -q "cluster_state:ok"; then
    echo "✅ 集群已初始化"
    echo ""
    echo "📋 使用方法："
    echo "  连接: redis-cli -c -p 7001"
    echo "  停止: ./stop-cluster.sh"
    exit 0
fi

# Initialize the cluster
echo "🔧 正在初始化集群..."
echo "yes" | redis-cli --cluster create 127.0.0.1:7001 127.0.0.1:7002 127.0.0.1:7003 --cluster-replicas 0 2>&1 | tee /tmp/cluster-init.log || {
    echo "❌ 集群创建命令失败。输出："
    cat /tmp/cluster-init.log
    exit 1
}

# Wait for cluster to stabilize
sleep 5

# Verify cluster status
if redis-cli -p 7001 cluster info | grep -q "cluster_state:ok"; then
    echo "✅ Redis 集群已就绪！"
    echo ""
    echo "📋 使用方法："
    echo "  连接: redis-cli -c -p 7001"
    echo "  停止: ./stop-cluster.sh"
else
    echo "❌ 集群初始化失败！"
    echo "📊 节点 7001 的集群信息："
    redis-cli -p 7001 cluster info
    echo ""
    echo "📊 节点 7001 的集群节点："
    redis-cli -p 7001 cluster nodes
    exit 1
fi