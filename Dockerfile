# Phoebe Museum Dockerfile
# 多阶段构建，优化镜像大小

# 阶段1：安装依赖
FROM node:20-alpine AS deps
WORKDIR /app

# 安装依赖管理工具
RUN apk add --no-cache libc6-compat

# 复制依赖文件
COPY package.json package-lock.json ./
COPY prisma ./prisma/

# 安装所有依赖（包括devDependencies）
RUN npm ci

# 生成Prisma客户端
RUN npx prisma generate

# 阶段2：构建应用
FROM node:20-alpine AS builder
WORKDIR /app

# 复制依赖
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# 复制环境变量文件
COPY .env.production .env

# 设置环境变量
ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_ENV production
ENV DATABASE_URL file:/app/prisma/dev.db
ENV JWT_SECRET phoebe-museum-jwt-secret-2026
ENV NEXT_PUBLIC_APP_URL http://localhost:3000
ENV NEXT_PUBLIC_APP_NAME "Phoebe Museum"

# 构建应用
RUN npm run build

# 阶段3：生产环境
FROM node:20-alpine AS runner
WORKDIR /app

# 安装必要的包
RUN apk add --no-cache \
    curl \
    sqlite \
    && rm -rf /var/cache/apk/*

# 设置环境变量
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# 创建非root用户
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# 创建必要的目录
RUN mkdir -p /app/public/uploads/artworks \
    && mkdir -p /app/public/uploads/avatars \
    && mkdir -p /app/public/uploads/temp \
    && mkdir -p /app/prisma \
    && chown -R nextjs:nodejs /app

# 复制构建产物
COPY --from=builder /app/next.config.ts ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma

# 复制环境变量文件
COPY --from=builder /app/.env ./.env

# 启动脚本（在切换用户前复制和设置权限）
COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

# 复制 Prisma CLI（用于 db push 和 db seed）
COPY --from=deps /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=deps /app/node_modules/prisma ./node_modules/prisma
COPY --from=deps /app/node_modules/@prisma ./node_modules/@prisma

# 设置权限
RUN chown -R nextjs:nodejs /app

# 切换到非root用户
USER nextjs

# 暴露端口
EXPOSE 3000

# 设置环境变量
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

# 健康检查
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:3000/ || exit 1

ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["node", "server.js"]