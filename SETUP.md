# PHOEBE MUSEUM - 项目设置指南

## 前置要求

### 系统要求
- **操作系统**: Windows 10/11, macOS 10.15+, 或 Linux (Ubuntu 20.04+)
- **Node.js**: v18.17.0 或更高版本 (推荐 v20 LTS)
- **包管理器**: npm (v9.0.0+), yarn (v1.22.0+), 或 pnpm (v8.0.0+)
- **Git**: v2.30.0 或更高版本

### 开发工具推荐
- **代码编辑器**: Visual Studio Code (推荐)
  - 扩展推荐:
    - ESLint
    - Prettier
    - TypeScript Vue Plugin (Volar)
    - Tailwind CSS IntelliSense
    - ES7+ React/Redux/React-Native snippets
- **浏览器**: Chrome, Firefox, 或 Edge (最新版本)
- **数据库管理**: Supabase Dashboard (在线管理)

## 快速开始

### 1. 克隆仓库

`ash
git clone https://github.com/your-username/phoebe-museum.git
cd phoebe-museum
`

### 2. 安装依赖

`ash
# 使用 npm
npm install

# 或使用 yarn
yarn install

# 或使用 pnpm
pnpm install
`

### 3. 环境配置

复制环境变量模板文件：

`ash
cp .env.example .env.local
`

编辑 .env.local 文件，配置以下变量：

`env
# Supabase 配置
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# 应用配置
NEXT_PUBLIC_APP_URL=http://localhost:3000
`

### 4. Supabase 设置

#### 4.1 创建 Supabase 项目

1. 访问 [Supabase](https://supabase.com/)
2. 注册/登录账号
3. 创建新项目
4. 获取项目 URL 和 anon key

#### 4.2 数据库设置

在 Supabase SQL Editor 中运行以下 SQL 创建基础表结构：

`sql
-- 启用 UUID 扩展
CREATE EXTENSION IF NOT EXISTS \"uuid-ossp\";

-- 用户资料表
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  username TEXT UNIQUE,
  display_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 作品表
CREATE TABLE artworks (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  museum_id TEXT UNIQUE NOT NULL, -- PM-000001 格式
  title TEXT NOT NULL,
  description TEXT,
  artist_id UUID REFERENCES profiles(id),
  category TEXT NOT NULL,
  medium TEXT,
  timeline_id UUID,
  image_url TEXT NOT NULL,
  thumbnail_url TEXT,
  width INTEGER,
  height INTEGER,
  status TEXT DEFAULT 'pending', -- pending, approved, rejected
  featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 时间线表
CREATE TABLE timelines (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  creator_id UUID REFERENCES profiles(id),
  type TEXT NOT NULL, -- official, community
  era TEXT,
  status TEXT DEFAULT 'draft', -- draft, pending, approved, rejected
  cover_image_url TEXT,
  parent_id UUID REFERENCES timelines(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 标签表
CREATE TABLE tags (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 作品标签关联表
CREATE TABLE artwork_tags (
  artwork_id UUID REFERENCES artworks(id) ON DELETE CASCADE,
  tag_id UUID REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (artwork_id, tag_id)
);

-- 收藏表
CREATE TABLE favorites (
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  artwork_id UUID REFERENCES artworks(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (user_id, artwork_id)
);

-- 投稿表
CREATE TABLE submissions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id),
  artwork_id UUID REFERENCES artworks(id),
  status TEXT DEFAULT 'pending', -- pending, approved, rejected
  reviewer_id UUID REFERENCES profiles(id),
  review_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
`

#### 4.3 行级安全策略 (RLS)

`sql
-- 启用 RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE artworks ENABLE ROW LEVEL SECURITY;
ALTER TABLE timelines ENABLE ROW LEVEL SECURITY;
ALTER TABLE tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE artwork_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;

-- 用户资料策略
CREATE POLICY \"Public profiles are viewable by everyone\" ON profiles
  FOR SELECT USING (true);

CREATE POLICY \"Users can update own profile\" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- 作品策略
CREATE POLICY \"Approved artworks are viewable by everyone\" ON artworks
  FOR SELECT USING (status = 'approved');

CREATE POLICY \"Artists can view own artworks\" ON artworks
  FOR SELECT USING (auth.uid() = artist_id);

CREATE POLICY \"Artists can insert own artworks\" ON artworks
  FOR INSERT WITH CHECK (auth.uid() = artist_id);

CREATE POLICY \"Artists can update own artworks\" ON artworks
  FOR UPDATE USING (auth.uid() = artist_id);

-- 时间线策略
CREATE POLICY \"Approved timelines are viewable by everyone\" ON timelines
  FOR SELECT USING (status = 'approved' OR status = 'draft');

CREATE POLICY \"Creators can view own timelines\" ON timelines
  FOR SELECT USING (auth.uid() = creator_id);

CREATE POLICY \"Creators can insert own timelines\" ON timelines
  FOR INSERT WITH CHECK (auth.uid() = creator_id);

CREATE POLICY \"Creators can update own timelines\" ON timelines
  FOR UPDATE USING (auth.uid() = creator_id);

-- 标签策略
CREATE POLICY \"Tags are viewable by everyone\" ON tags
  FOR SELECT USING (true);

CREATE POLICY \"Authenticated users can insert tags\" ON tags
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- 作品标签策略
CREATE POLICY \"Artwork tags are viewable by everyone\" ON artwork_tags
  FOR SELECT USING (true);

CREATE POLICY \"Artists can manage own artwork tags\" ON artwork_tags
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM artworks 
      WHERE artworks.id = artwork_tags.artwork_id 
      AND artworks.artist_id = auth.uid()
    )
  );

-- 收藏策略
CREATE POLICY \"Users can view own favorites\" ON favorites
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY \"Users can insert own favorites\" ON favorites
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY \"Users can delete own favorites\" ON favorites
  FOR DELETE USING (auth.uid() = user_id);

-- 投稿策略
CREATE POLICY \"Users can view own submissions\" ON submissions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY \"Users can insert own submissions\" ON submissions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY \"Admins can view all submissions\" ON submissions
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.username = 'admin'
    )
  );

CREATE POLICY \"Admins can update submissions\" ON submissions
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.username = 'admin'
    )
  );
`

### 5. 启动开发服务器

`ash
# 开发模式
npm run dev

# 或
yarn dev

# 或
pnpm dev
`

访问 http://localhost:3000 查看应用。

### 6. 构建生产版本

`ash
npm run build
npm start
`

## 项目结构

`
phoebe-museum/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx         # 根布局
│   │   ├── page.tsx           # 首页
│   │   ├── globals.css        # 全局样式
│   │   ├── community/         # 社区页面
│   │   ├── discover/          # 发现页面
│   │   └── exhibitions/       # 展览页面
│   ├── components/            # 可复用组件
│   │   └── Navbar.tsx         # 导航栏组件
│   └── lib/                   # 工具库
│       ├── supabase.ts        # Supabase 客户端
│       ├── database.types.ts  # 数据库类型定义
│       └── i18n.ts            # 国际化配置
├── public/                    # 静态资源
├── .env.local                 # 环境变量
├── next.config.ts             # Next.js 配置
├── tailwind.config.js         # Tailwind CSS 配置
├── tsconfig.json              # TypeScript 配置
└── package.json               # 项目依赖
`

## 常用命令

`ash
# 开发
npm run dev          # 启动开发服务器
npm run build        # 构建生产版本
npm start            # 启动生产服务器
npm run lint         # 运行 ESLint 检查

# 数据库
npx supabase start   # 启动本地 Supabase (需要 Docker)
npx supabase stop    # 停止本地 Supabase
npx supabase status  # 查看 Supabase 状态

# 类型生成
npx supabase gen types typescript --local > src/lib/database.types.ts
`

## IDE 配置

### VS Code 设置

在项目根目录创建 .vscode/settings.json:

`json
{
  \"typescript.tsdk\": \"node_modules/typescript/lib\",
  \"typescript.enablePromptUseWorkspaceTsdk\": true,
  \"editor.formatOnSave\": true,
  \"editor.defaultFormatter\": \"esbenp.prettier-vscode\",
  \"editor.codeActionsOnSave\": {
    \"source.fixAll.eslint\": true,
    \"source.organizeImports\": true
  },
  \"tailwindCSS.experimental.classRegex\": [
    [\"clsx\\(([^)]*)\\)\", \"(?:'|\”)([^']*)(?:'|\”)\"],
    [\"cn\\(([^)]*)\\)\", \"(?:'|\”)([^']*)(?:'|\”)\"]
  ]
}
`

### ESLint 配置

项目已配置 ESLint，规则在 eslint.config.mjs 中。

### Prettier 配置

创建 .prettierrc 文件：

`json
{
  \"semi\": true,
  \"singleQuote\": true,
  \"tabWidth\": 2,
  \"trailingComma\": \"es5\",
  \"printWidth\": 100,
  \"plugins\": [\"prettier-plugin-tailwindcss\"]
}
`

## 故障排除

### 常见问题

#### 1. 依赖安装失败
`ash
# 清除缓存
npm cache clean --force

# 删除 node_modules 重新安装
rm -rf node_modules package-lock.json
npm install
`

#### 2. Supabase 连接错误
- 检查 .env.local 文件中的 URL 和 Key 是否正确
- 确保 Supabase 项目已启动
- 检查网络连接

#### 3. TypeScript 类型错误
`ash
# 重新生成类型
npx supabase gen types typescript --local > src/lib/database.types.ts
`

#### 4. 样式不生效
- 确保 Tailwind CSS 已正确配置
- 检查 globals.css 是否正确导入
- 重启开发服务器

## 下一步

1. 阅读 [开发环境配置文档](DEVELOPMENT.md)
2. 查看 [代码规范](CONTRIBUTING.md)
3. 了解 [数据库架构](DATABASE.md)
4. 开始开发你的第一个功能

## 获取帮助

- 查看 [故障排除文档](TROUBLESHOOTING.md)
- 提交 [Issue](https://github.com/your-username/phoebe-museum/issues)
- 参与 [讨论](https://github.com/your-username/phoebe-museum/discussions)

---

**PHOEBE MUSEUM** 2026
