# 19 · 开发 README

> PHOEBE MUSEUM · 菲比博物馆
> 这里收藏的全是菲比。对，全是。
> 版本：1.0 · 日期：2026-08-28

---

## 项目简介

菲比博物馆是一个二次元角色「Phoebe（菲比）」的二创作品虚拟博物馆。所有作品中的角色都是同一个菲比，每件作品获得永久馆藏编号（PM-0000XX），与人类文明共存亡。

**核心功能：**
- 上交菲比（投稿作品，审核后获 PM 编号）
- 浏览馆藏（瀑布流 + 多维筛选）
- 时间线（人类历史时代 + 社区平行世界AU）
- 创作者主页
- 共鸣/收藏/关注
- 档案馆全文检索

---

## 快速开始

### 环境要求

| 工具 | 版本 |
|------|------|
| Node.js | ≥ 20 |
| PostgreSQL | ≥ 16 |
| Redis | ≥ 7 |
| npm / pnpm | 最新 |

### 安装

```bash
# 1. 克隆仓库
git clone https://github.com/your-org/phoebe-museum.git
cd phoebe-museum

# 2. 安装依赖
npm install

# 3. 复制环境变量
cp .env.example .env.local
# 编辑 .env.local 填入实际配置

# 4. 启动本地 PostgreSQL + Redis（Docker）
docker-compose up -d

# 5. 生成 Prisma 客户端
npx prisma generate

# 6. 执行数据库迁移
npx prisma migrate dev --name init

# 7. 导入预设数据
npx prisma db seed

# 8. 启动开发服务器
npm run dev
```

访问 `http://localhost:3000`

---

## 环境变量

```bash
# .env.local
DATABASE_URL="postgresql://phoebe:phoebe@localhost:5432/phoebe_dev"
REDIS_URL="redis://localhost:6379"
NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"
NEXTAUTH_URL="http://localhost:3000"

# OSS (可选，开发可用本地文件)
OSS_ACCESS_KEY_ID=""
OSS_ACCESS_KEY_SECRET=""
OSS_BUCKET="phoebe-museum-dev"
OSS_REGION="oss-cn-shanghai"
OSS_CDN_DOMAIN=""

# 社交登录 (可选)
GITHUB_CLIENT_ID=""
GITHUB_CLIENT_SECRET=""

# Sentry (可选)
SENTRY_DSN=""

# 前端
NEXT_PUBLIC_API_URL="http://localhost:3000/api"
NEXT_PUBLIC_OSS_CDN=""
```

---

## 常用命令

```bash
# 开发
npm run dev              # 启动开发服务器
npm run build            # 生产构建
npm start                # 启动生产服务器

# 数据库
npx prisma studio        # Prisma 数据库 GUI
npx prisma migrate dev   # 创建迁移
npx prisma migrate deploy # 部署迁移
npx prisma db seed       # 导入种子数据
npx prisma generate      # 重新生成客户端

# 代码质量
npm run lint             # ESLint
npm run typecheck        # TypeScript 类型检查

# 测试
npx vitest               # 单元测试（watch）
npx vitest run           # 单元测试（单次）
npx vitest run --coverage # 带覆盖率
npx playwright test      # E2E 测试
npx playwright test --ui # E2E 可视化

# 部署
npm run deploy           # 部署到 CloudBase
```

---

## 技术栈

| 层 | 技术 |
|----|------|
| 框架 | Next.js 15 (App Router) |
| 语言 | TypeScript 5 |
| 样式 | Tailwind CSS 4 |
| 数据库 | PostgreSQL 16 + Prisma 6 |
| 缓存 | Redis 7 |
| 认证 | NextAuth.js 5 |
| 状态 | Zustand 5 + SWR 2 |
| i18n | next-intl 3 |
| 校验 | Zod 3 |
| 图片 | Sharp 0.33 |
| 队列 | BullMQ 5 |
| 测试 | Vitest + Playwright |
| 部署 | CloudBase / Vercel |

---

## 项目结构

```
preview/    → HTML 原型 + 设计文档（已完成）
src/app/    → Next.js 页面 + API
src/components/ → React 组件
src/server/ → 后端 Service + 中间件
src/lib/    → 前端工具
src/hooks/  → 自定义 Hooks
src/stores/ → Zustand stores
prisma/     → 数据库模型 + 迁移
```

详细结构见 `18_项目目录结构.md`

---

## 文档索引

| # | 文档 | 说明 |
|---|------|------|
| 01 | 产品需求文档 PRD | 产品定位、功能需求、业务规则 |
| 02 | 产品信息架构 | 导航结构、URL 路由、页面跳转 |
| 03 | 用户流程 | 投稿/浏览/检索/审核流程图 |
| 04 | 完整页面清单 | 18 个页面规格 + 组件清单 |
| 05 | UI 设计规范 | 色彩/排版/布局/图像规范 |
| 06 | Design System | CSS 令牌 + Tailwind 配置 + 组件规格 |
| 07 | 交互设计规范 | 动效/手势/加载/空状态/可访问性 |
| 08 | 数据库设计 | 12 张表 + Redis 结构 + 迁移 SQL |
| 09 | API 接口文档 | 12 模块 40+ 端点完整定义 |
| 10 | 前端技术架构 | 渲染策略/目录/状态/组件/i18n |
| 11 | 后端技术架构 | 分层/Service/认证/缓存/队列 |
| 12 | 权限系统设计 | 4 角色 + 权限矩阵 + 实现 |
| 13 | 后台管理系统 | 审核/用户/内容/看板 |
| 14 | 异常处理规范 | 错误码表 + 前后端处理 |
| 15 | 测试方案 | 单元/集成/E2E/视觉回归 |
| 16 | 部署上线方案 | CI/CD/监控/备份/回滚 |
| 17 | 开发任务拆分 | 6 里程碑 + 60+ 任务 + 排期 |
| 18 | 项目目录结构 | 完整目录树 |
| 19 | 开发 README | 本文件 |

---

## 开发规范

### Git 分支

```
main          生产分支
├── develop   开发分支
├── feature/* 功能分支
├── fix/*     修复分支
└── hotfix/*  紧急修复
```

### 提交格式

```
<type>(<scope>): <subject>

type:  feat / fix / docs / style / refactor / test / chore
scope: artwork / timeline / creator / auth / api / ui / db
```

### 代码风格

- TypeScript strict mode
- ESLint + Prettier
- 组件优先函数式 + Hooks
- API 路由使用 try/catch + handleError
- Service 层不直接接触 req/res
- 数据库操作通过 Prisma
- 缓存通过 Redis（lib/cache.ts）
- 中文注释关键业务逻辑

---

## 设计预览

HTML 原型位于 `preview/` 目录，可直接浏览器打开查看：

```
preview/index.html       → 首页
preview/collection.html  → 馆藏
preview/artwork.html     → 作品详情
preview/timeline-human.html → 人类时间线
preview/community.html   → 社区世界线
preview/creators.html    → 创作者列表
preview/creator.html     → 创作者详情
preview/archive.html     → 档案馆
preview/my.html          → 我的博物馆
preview/submit.html      → 上交菲比
preview/login.html       → 登录
```

---

## FAQ

**Q: 什么是「菲比」？**
A: Phoebe 是一个二次元角色。本馆所有作品中的角色都是同一个菲比——这是本馆的核心共识。

**Q: PM 编号是什么？**
A: 每件通过审核的作品获得一个永久编号（PM-000001 起），不可回收，不可修改，与人类文明共存亡。

**Q: 审核标准是什么？**
A: 作品中的角色是菲比（同一个人物）即可通过。审核员很好说话——真的。

**Q: 如何成为审核员？**
A: 由管理员手动指定，需要有 ≥ 10 件已发布投稿且无违规记录。

**Q: 支持哪些创作媒介？**
A: 插画 / AI / 漫画 / 3D / 视频 / 表情包，共 6 类。

**Q: 世界线是什么？**
A: 社区创建的平行世界设定（AU）。如赛博菲比、海盗菲比等。人类时间线是系统预设的 7 个历史时代。

---

## License

MIT © 2026 PHOEBE MUSEUM

---

*本馆的严肃程度以实际情况为准。从 PM-000001 开始，永远不会结束。*
