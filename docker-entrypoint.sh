#!/bin/sh
set -e

echo "🚀 启动 Phoebe Museum..."

# 等待数据库文件目录可用
echo "📁 检查数据库目录..."
mkdir -p /app/prisma

# 运行数据库迁移
echo "🗄️ 初始化数据库..."
node ./node_modules/prisma/build/index.js db push --accept-data-loss

# 运行数据库种子（仅在数据库为空时）
echo "🌱 检查是否需要初始化数据..."
if [ ! -f /app/prisma/dev.db ] || [ ! -s /app/prisma/dev.db ]; then
    echo "📝 初始化示例数据..."
    node prisma/seed.js
fi

# 确保上传目录存在
echo "📂 检查上传目录..."
mkdir -p /app/public/uploads/artworks
mkdir -p /app/public/uploads/avatars
mkdir -p /app/public/uploads/temp

# 设置目录权限
chmod -R 755 /app/public/uploads

echo "✅ 初始化完成，启动应用..."

# 执行传入的命令
exec "$@"