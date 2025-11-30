# v0.8.1-rc1

# 基础 Node.js 镜像
FROM node:20-alpine AS node

# 安装 jemalloc（内存分配器，提升性能）
RUN apk add --no-cache jemalloc
RUN apk add --no-cache python3 py3-pip uv

# 设置环境变量以使用 jemalloc
ENV LD_PRELOAD=/usr/lib/libjemalloc.so.2

# 添加 `uv` 工具以支持扩展的 MCP 功能
COPY --from=ghcr.io/astral-sh/uv:0.6.13 /uv /uvx /bin/
RUN uv --version

RUN mkdir -p /app && chown node:node /app
WORKDIR /app

USER node

COPY --chown=node:node package.json package-lock.json ./
COPY --chown=node:node api/package.json ./api/package.json
COPY --chown=node:node client/package.json ./client/package.json
COPY --chown=node:node packages/data-provider/package.json ./packages/data-provider/package.json
COPY --chown=node:node packages/data-schemas/package.json ./packages/data-schemas/package.json
COPY --chown=node:node packages/api/package.json ./packages/api/package.json
COPY --chown=node:node packages/agents/package.json ./packages/agents/package.json
COPY --chown=node:node packages/client/package.json ./packages/client/package.json

# 复制预编译的包
COPY --chown=node:node packages/agents/dist ./packages/agents/dist
COPY --chown=node:node packages/data-provider/dist ./packages/data-provider/dist
COPY --chown=node:node packages/data-schemas/dist ./packages/data-schemas/dist
COPY --chown=node:node packages/api/dist ./packages/api/dist
COPY --chown=node:node packages/client/dist ./packages/client/dist
COPY --chown=node:node client/dist ./client/dist

RUN \
    # 创建 .env 文件，允许挂载（如果没有默认值）
    touch .env ; \
    # 创建目录以便卷挂载时继承正确的权限
    mkdir -p /app/client/public/images /app/api/logs /app/uploads ; \
    npm config set fetch-retry-maxtimeout 600000 ; \
    npm config set fetch-retries 5 ; \
    npm config set fetch-retry-mintimeout 15000 ; \
    npm ci --no-audit ; \
    # 强制重新安装 sharp 以获取正确的平台二进制文件
    cd api && npm uninstall sharp && npm install sharp --os=linux --libc=musl --cpu=arm64 && cd ..

COPY --chown=node:node . .

# 重新编译 agents 包（如果源代码有更新）
RUN cd packages/agents && NODE_OPTIONS="--max-old-space-size=4096" npx tsc -p tsconfig.build.json --skipLibCheck 2>&1 || echo "TypeScript编译失败，使用预编译的dist"

RUN npm cache clean --force

# Node.js API 配置
EXPOSE 3080
ENV HOST=0.0.0.0
CMD ["npm", "run", "backend"]

# 可选：用于 Nginx 路由的前端客户端
# FROM nginx:stable-alpine AS nginx-client
# WORKDIR /usr/share/nginx/html
# COPY --from=node /app/client/dist /usr/share/nginx/html
# COPY client/nginx.conf /etc/nginx/conf.d/default.conf
# ENTRYPOINT ["nginx", "-g", "daemon off;"]
