#!/bin/bash

# Phoebe Museum 服务器部署脚本

set -e

echo "🎨 Phoebe Museum 服务器部署"
echo "================================"

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 检查Docker是否安装
if ! command -v docker &> /dev/null; then
    echo -e "${RED}❌ 错误: Docker 未安装${NC}"
    echo "请先安装 Docker: https://docs.docker.com/get-docker/"
    exit 1
fi

# 检查Docker Compose是否安装
if ! command -v docker-compose &> /dev/null; then
    echo -e "${RED}❌ 错误: Docker Compose 未安装${NC}"
    echo "请先安装 Docker Compose: https://docs.docker.com/compose/install/"
    exit 1
fi

# 检查Docker是否运行
if ! docker info &> /dev/null; then
    echo -e "${RED}❌ 错误: Docker 未运行${NC}"
    echo "请启动 Docker 服务"
    exit 1
fi

echo -e "${GREEN}✅ Docker 环境检查通过${NC}"

# 创建必要的目录
echo "📁 创建数据目录..."
mkdir -p data
mkdir -p uploads/artworks
mkdir -p uploads/avatars
mkdir -p uploads/temp

# 设置目录权限
chmod -R 755 data uploads

# 停止并删除旧容器（如果存在）
echo "🧹 清理旧容器..."
docker-compose down 2>/dev/null || true

# 构建镜像
echo "🔨 构建 Docker 镜像（这可能需要几分钟）..."
docker-compose build --no-cache

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ 构建失败${NC}"
    echo "请查看上方错误信息"
    exit 1
fi

# 启动服务
echo "🚀 启动服务..."
docker-compose up -d

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ 启动失败${NC}"
    exit 1
fi

# 等待服务启动
echo "⏳ 等待服务启动..."
sleep 5

# 检查服务状态
echo "🔍 检查服务状态..."
docker-compose ps

# 检查健康状态
echo ""
echo "🏥 检查健康状态..."
sleep 10
if curl -f http://localhost:3000 > /dev/null 2>&1; then
    echo -e "${GREEN}✅ 服务运行正常${NC}"
else
    echo -e "${YELLOW}⚠️  服务可能还在启动中，请稍等片刻${NC}"
fi

echo ""
echo "================================"
echo -e "${GREEN}✅ 部署完成！${NC}"
echo ""
echo "🌐 访问地址: http://$(hostname -I | awk '{print $1}'):3000"
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
echo "📖 详细文档: cat DEPLOY.md"
echo ""