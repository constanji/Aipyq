FROM node:20-alpine

WORKDIR /app

# 复制依赖文件
COPY package*.json ./

# 安装依赖
RUN npm install --production

# 复制源代码
COPY server.js ./

# 暴露端口
EXPOSE 3001

# 启动命令
CMD ["node", "server.js"]

