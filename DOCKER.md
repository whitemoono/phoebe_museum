# Phoebe Museum Docker 部署指南

## 🐳 快速开始

### 1. 构建并启动
```bash
# 构建并启动所有服务
docker-compose up -d

# 或者先构建再启动
docker-compose build
docker-compose up -d
```

### 2. 访问应用
- 应用地址: http://localhost:3000
- 管理员账户: 
  - 邮箱: admin@phoebe-museum.com
  - 密码: admin123456

### 3. 查看日志
```bash
# 查看实时日志
docker-compose logs -f

# 查看特定服务日志
docker-compose logs -f phoebe-museum
```

## 📁 数据持久化

### 数据库文件
- 位置: Docker volume `phoebe-data`
- 包含: SQLite 数据库文件

### 上传文件
- 位置: Docker volume `phoebe-uploads`
- 包含: 用户上传的图片

### 日志文件
- 位置: Docker volume `phoebe-logs`
- 包含: 应用日志

## 🔧 配置说明

### 环境变量
在 `docker-compose.yml` 中配置：

```yaml
environment:
  - NODE_ENV=production
  - DATABASE_URL=file:/app/prisma/dev.db
  - JWT_SECRET=your-secret-key  # 修改为强密码
  - ADMIN_EMAIL=admin@example.com
  - ADMIN_PASSWORD=secure-password
```

### 自定义配置
1. 复制 `.env.example` 为 `.env`
2. 修改配置项
3. 重新构建: `docker-compose build`

## 🚀 生产环境部署

### 1. 使用 PostgreSQL（推荐）
取消 `docker-compose.yml` 中 PostgreSQL 服务的注释：

```yaml
postgres:
  image: postgres:15-alpine
  environment:
    - POSTGRES_USER=phoebe
    - POSTGRES_PASSWORD=strong-password
    - POSTGRES_DB=phoebe_museum
  volumes:
    - postgres-data:/var/lib/postgresql/data
```

修改数据库连接：
```yaml
environment:
  - DATABASE_URL=postgresql://phoebe:strong-password@postgres:5432/phoebe_museum
```

### 2. 使用 Nginx 反向代理
取消 `docker-compose.yml` 中 Nginx 服务的注释，并创建 `nginx/nginx.conf`：

```nginx
events {
    worker_connections 1024;
}

http {
    upstream phoebe {
        server phoebe-museum:3000;
    }

    server {
        listen 80;
        server_name your-domain.com;

        location / {
            proxy_pass http://phoebe;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
        }

        location /uploads/ {
            alias /usr/share/nginx/html/uploads/;
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
    }
}
```

### 3. SSL 证书配置
1. 获取 SSL 证书
2. 放置到 `nginx/ssl/` 目录
3. 修改 Nginx 配置添加 SSL

## 📊 监控和维护

### 健康检查
```bash
# 检查容器状态
docker-compose ps

# 检查应用健康
curl http://localhost:3000/api/health
```

### 备份数据
```bash
# 备份数据库
docker cp phoebe-museum:/app/prisma/dev.db ./backup/

# 备份上传文件
docker cp phoebe-museum:/app/public/uploads ./backup/
```

### 恢复数据
```bash
# 恢复数据库
docker cp ./backup/dev.db phoebe-museum:/app/prisma/

# 恢复上传文件
docker cp ./backup/uploads phoebe-museum:/app/public/
```

## 🔍 故障排除

### 常见问题

#### 1. 数据库连接失败
```bash
# 检查数据库文件权限
docker exec -it phoebe-museum ls -la /app/prisma/

# 重新初始化数据库
docker exec -it phoebe-museum npx prisma db push
```

#### 2. 上传文件失败
```bash
# 检查上传目录权限
docker exec -it phoebe-museum ls -la /app/public/uploads/

# 修复权限
docker exec -it phoebe-museum chmod -R 755 /app/public/uploads
```

#### 3. 应用无法启动
```bash
# 查看详细日志
docker-compose logs phoebe-museum

# 进入容器调试
docker exec -it phoebe-museum sh
```

### 重置应用
```bash
# 停止并删除所有数据
docker-compose down -v

# 重新构建并启动
docker-compose build
docker-compose up -d
```

## 🔄 更新应用

### 1. 拉取最新代码
```bash
git pull origin main
```

### 2. 重新构建
```bash
docker-compose build
```

### 3. 重启服务
```bash
docker-compose up -d
```

## 📈 性能优化

### 1. 启用 Gzip 压缩
在 Nginx 配置中添加：
```gzip
gzip on;
gzip_types text/plain text/css application/json application/javascript;
```

### 2. 配置缓存
```nginx
location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

### 3. 限制上传大小
```nginx
client_max_body_size 10M;
```

## 🛡️ 安全建议

1. **修改默认密码**: 立即修改管理员密码
2. **使用强密钥**: 修改 JWT_SECRET
3. **启用 HTTPS**: 配置 SSL 证书
4. **定期备份**: 设置自动备份任务
5. **监控日志**: 定期检查应用日志
6. **限制访问**: 配置防火墙规则

## 📞 获取帮助

如有问题，请查看：
1. 应用日志: `docker-compose logs`
2. 容器状态: `docker-compose ps`
3. 资源使用: `docker stats`