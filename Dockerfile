# 使用官方 Node.js 镜像作为基础镜像
# 可以根据需要选择版本，例如 node:16、node:18 等
FROM node:18-alpine

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json 到工作目录
COPY * ./

# 安装项目依赖
RUN npm install

# 复制项目文件到工作目录
COPY . .

# 暴露端口（假设你的应用运行在 3000 端口）
EXPOSE 10086

# 启动应用
CMD ["node", "server.js"]