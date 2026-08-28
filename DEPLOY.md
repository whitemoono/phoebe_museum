# 服务器部署指南

## 前提条件

- 服务器已安装 Docker 和 Docker Compose
- 已有 GitHub 账户和仓库

## 部署步骤

### 1. 克隆代码到服务器

```bash
# 克隆仓库
git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git

# 进入项目目录
cd YOUR_REPO
```

### 2. 使用部署脚本启动

```bash
# 给脚本添加执行权限
chmod +x deploy.sh

# 运行部署脚本
./deploy.sh
```

### 3. 或手动启动

```bash
# 构建并启动
docker-compose up -d --build

# 查看日志
docker-compose logs -f
```

## 访问应用

- **地址**: http://YOUR_SERVER_IP:3000
- **管理员账户**:
  - 邮箱: admin@phoebe-museum.com
  - 密码: admin123456

## 常用命令

```bash
# 查看服务状态
docker-compose ps

# 查看实时日志
docker-compose logs -f

# 停止服务
docker-compose down

# 重启服务
docker-compose restart

# 进入容器
docker exec -it phoebe-museum sh

# 备份数据库
docker cp phoebe-museum:/app/prisma/dev.db ./backup/

# 更新代码并重新部署
git pull
docker-compose up -d --build
```

## 数据持久化

- 数据库文件: `./data/` 目录
- 上传文件: `./uploads/` 目录

这两个目录已配置为 Docker 卷，数据会持久保存。

## 环境变量配置

如需修改配置，可编辑 `docker-compose.yml` 中的环境变量：

```yaml
environment:
  - ADMIN_EMAIL=admin@your-domain.com
  - ADMIN_PASSWORD=your-secure-password
  - ADMIN_USERNAME=admin
```

修改后重启服务：

```bash
docker-compose restart
```

## 反向代理配置（可选）

如需使用 Nginx 反向代理，参考以下配置：

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## 故障排查

### 构建失败

```bash
# 查看详细构建日志
docker-compose build --progress=plain

# 清理缓存重新构建
docker-compose build --no-cache
```

### 服务无法启动

```bash
# 查看容器日志
docker-compose logs

# 检查端口是否被占用
netstat -tulpn | grep 3000
```

### 数据库问题

```bash
# 进入容器
docker exec -it phoebe-museum sh

# 在容器内运行 Prisma 命令
npx prisma studio
npx prisma db push
```

## 生产环境建议

1. **修改默认密码**：部署后立即修改管理员密码
2. **配置 HTTPS**：使用 Let's Encrypt 配置 SSL 证书
3. **定期备份**：备份 `./data/` 和 `./uploads/` 目录
4. **监控日志**：定期检查应用日志
5. **资源限制**：在 `docker-compose.yml` 中配置资源限制

```yaml
services:
  phoebe-museum:
    deploy:
      resources:
        limits:
          cpus: '1.0'
          memory: 512M
        reservations:
          cpus: '0.5'
          memory: 256M
```
