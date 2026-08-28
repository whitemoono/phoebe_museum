#!/bin/bash

# Phoebe Museum Docker 启动脚本

echo "🎨 Phoebe Museum Docker 启动脚本"
echo "================================"

# 检查Docker是否安装
if ! command -v docker &> /dev/null; then
    echo "❌ 错误: Docker 未安装"
    echo "请先安装 Docker: https://docs.docker.com/get-docker/"
    exit 1
fi

# 检查Docker Compose是否安装
if ! command -v docker-compose &> /dev/null; then
    echo "❌ 错误: Docker Compose 未安装"
    echo "请先安装 Docker Compose: https://docs.docker.com/compose/install/"
    exit 1
fi

# 检查Docker是否运行
if ! docker info &> /dev/null; then
    echo "❌ 错误: Docker 未运行"
    echo "请启动 Docker 服务"
    exit 1
fi

echo "✅ Docker 环境检查通过"

# 停止并删除旧容器（如果存在）
echo "🧹 清理旧容器..."
docker-compose down 2>/dev/null

# 构建镜像
echo "🔨 构建 Docker 镜像..."
docker-compose build

if [ $? -ne 0 ]; then
    echo "❌ 构建失败"
    exit 1
fi

# 启动服务
echo "🚀 启动服务..."
docker-compose up -d

if [ $? -ne 0 ]; then
    echo "❌ 启动失败"
    exit 1
fi

echo ""
echo "✅ Phoebe Museum 启动成功！"
echo ""
echo "🌐 访问地址: http://localhost:3000"
echo ""
echo "👤 管理员账户:"
echo "   邮箱: admin@phoebe-museum.com"
echo "   密码: admin123456"
echo ""
echo "📋 常用命令:"
echo "   查看日志: docker-compose logs -f"
echo "   停止服务: docker-compose down"
echo "   重启服务: docker-compose restart"
echo "   查看状态: docker-compose ps"
echo ""