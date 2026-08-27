# PHOEBE MUSEUM - 开发环境配置指南

## 概述

本文档详细说明了菲比博物馆项目的开发环境配置，包括本地开发、调试工具、代码质量和开发流程。

## 开发环境架构

`
┌─────────────────────────────────────────────────────┐
│                   开发环境架构                        │
├─────────────────────────────────────────────────────┤
│  前端 (Next.js)  ←→  Supabase (后端即服务)           │
│       ↓                    ↓                        │
│  本地开发服务器      本地/远程数据库                   │
│       ↓                    ↓                        │
│  浏览器调试          Supabase Dashboard              │
└─────────────────────────────────────────────────────┘
`

## 本地开发配置

### 1. 环境变量配置

#### 1.1 开发环境变量

创建 .env.development.local 文件：

`env
# Supabase 本地开发配置
NEXT_PUBLIC_SUPABASE_URL=http://localhost:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_local_anon_key

# 应用配置
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development

# 调试配置
DEBUG=phoebe:*
`

#### 1.2 测试环境变量

创建 .env.test.local 文件：

`env
# 测试环境 Supabase
NEXT_PUBLIC_SUPABASE_URL=your_test_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_test_anon_key

# 测试配置
NEXT_PUBLIC_APP_URL=http://localhost:3001
NODE_ENV=test
`

### 2. Supabase 本地开发

#### 2.1 安装 Supabase CLI

`ash
# 使用 npm
npm install -g supabase

# 使用 Homebrew (macOS)
brew install supabase/tap/supabase

# 使用 Scoop (Windows)
scoop bucket add supabase https://github.com/supabase/scoop-supabase.git
scoop install supabase
`

#### 2.2 初始化本地 Supabase

`ash
# 初始化 Supabase 项目
supabase init

# 启动本地 Supabase 服务
supabase start
`

这将启动以下服务：
- **PostgreSQL**: localhost:54322
- **Supabase Studio**: localhost:54323
- **Inbucket (邮件测试)**: localhost:54324
- **Supabase API**: localhost:54321

#### 2.3 数据库迁移

`ash
# 创建新的迁移文件
supabase migration new create_artworks_table

# 应用迁移到本地数据库
supabase db push

# 重置数据库
supabase db reset

# 生成 TypeScript 类型
supabase gen types typescript --local > src/lib/database.types.ts
`

### 3. 开发服务器配置

#### 3.1 Next.js 开发服务器

`ash
# 启动开发服务器
npm run dev

# 带调试信息的开发服务器
DEBUG=* npm run dev

# 指定端口
npm run dev -- -p 3001
`

#### 3.2 开发服务器配置

在 
ext.config.ts 中添加开发配置：

`	ypescript
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // 开发环境配置
  reactStrictMode: true,
  
  // 图片域名配置
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
  
  // 实验性功能
  experimental: {
    // 启用 Server Actions
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
  
  // 环境变量
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
};

export default nextConfig;
`

## 调试工具配置

### 1. 浏览器调试

#### 1.1 Chrome DevTools

1. 打开 Chrome 浏览器
2. 访问 http://localhost:3000
3. 按 F12 打开开发者工具
4. 使用以下标签：
   - **Elements**: 检查和修改 DOM
   - **Console**: 查看日志和错误
   - **Network**: 监控网络请求
   - **Sources**: 调试 JavaScript
   - **Performance**: 性能分析

#### 1.2 React Developer Tools

安装 Chrome 扩展：[React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)

功能：
- 检查 React 组件树
- 查看组件 props 和 state
- 分析组件渲染性能

### 2. VS Code 调试配置

在 .vscode/launch.json 中添加配置：

`json
{
  \"version\": \"0.2.0\",
  \"configurations\": [
    {
      \"name\": \"Next.js: debug server-side\",
      \"type\": \"node\",
      \"request\": \"attach\",
      \"port\": 9229,
      \"skipFiles\": [\"<node_internals>/**\"],
      \"serverReadyAction\": {
        \"pattern\": \"- Local:.+(https?://.+)\",
        \"uriFormat\": \"%s\",
        \"action\": \"debugWithChrome\"
      }
    },
    {
      \"name\": \"Next.js: debug client-side\",
      \"type\": \"chrome\",
      \"request\": \"launch\",
      \"url\": \"http://localhost:3000\"
    },
    {
      \"name\": \"Next.js: debug full stack\",
      \"type\": \"node\",
      \"request\": \"attach\",
      \"port\": 9229,
      \"skipFiles\": [\"<node_internals>/**\"],
      \"serverReadyAction\": {
        \"pattern\": \"- Local:.+(https?://.+)\",
        \"uriFormat\": \"%s\",
        \"action\": \"debugWithChrome\"
      }
    }
  ]
}
`

#### 启动调试

1. 在 VS Code 中按 F5 或点击调试图标
2. 选择调试配置
3. 设置断点
4. 访问 http://localhost:3000

### 3. 日志配置

#### 3.1 结构化日志

在 src/lib/logger.ts 中创建日志工具：

`	ypescript
type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  data?: unknown;
  error?: Error;
}

class Logger {
  private static instance: Logger;
  private isDevelopment = process.env.NODE_ENV === 'development';

  static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  private log(level: LogLevel, message: string, data?: unknown, error?: Error): void {
    const entry: LogEntry = {
      level,
      message,
      timestamp: new Date().toISOString(),
      data,
      error,
    };

    if (this.isDevelopment) {
      console[level](JSON.stringify(entry, null, 2));
    }
  }

  debug(message: string, data?: unknown): void {
    this.log('debug', message, data);
  }

  info(message: string, data?: unknown): void {
    this.log('info', message, data);
  }

  warn(message: string, data?: unknown): void {
    this.log('warn', message, data);
  }

  error(message: string, error?: Error, data?: unknown): void {
    this.log('error', message, data, error);
  }
}

export const logger = Logger.getInstance();
`

#### 3.2 使用日志

`	ypescript
import { logger } from '@/lib/logger';

// 调试信息
logger.debug('用户登录', { userId: '123' });

// 信息日志
logger.info('作品上传成功', { artworkId: 'PM-000001' });

// 警告
logger.warn('API 响应缓慢', { responseTime: 1500 });

// 错误
logger.error('数据库连接失败', new Error('Connection refused'));
`

## 代码质量工具

### 1. ESLint 配置

项目已配置 ESLint，规则在 eslint.config.mjs 中：

`javascript
// eslint.config.mjs
import { dirname } from \"path\";
import { fileURLToPath } from \"url\";
import { FlatCompat } from \"@eslint/eslintrc\";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends(\"next/core-web-vitals\", \"next/typescript\"),
  {
    rules: {
      // 自定义规则
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'no-console': ['warn', { allow: ['warn', 'error'] }],
    },
  },
];

export default eslintConfig;
`

### 2. Prettier 配置

创建 .prettierrc 文件：

`json
{
  \"semi\": true,
  \"singleQuote\": true,
  \"tabWidth\": 2,
  \"trailingComma\": \"es5\",
  \"printWidth\": 100,
  \"bracketSpacing\": true,
  \"jsxSingleQuote\": false,
  \"arrowParens\": \"avoid\",
  \"plugins\": [\"prettier-plugin-tailwindcss\"]
}
`

### 3. TypeScript 配置

	sconfig.json 配置：

`json
{
  \"compilerOptions\": {
    \"target\": \"ES2017\",
    \"lib\": [\"dom\", \"dom.iterable\", \"esnext\"],
    \"allowJs\": true,
    \"skipLibCheck\": true,
    \"strict\": true,
    \"noEmit\": true,
    \"esModuleInterop\": true,
    \"module\": \"esnext\",
    \"moduleResolution\": \"bundler\",
    \"resolveJsonModule\": true,
    \"isolatedModules\": true,
    \"jsx\": \"preserve\",
    \"incremental\": true,
    \"plugins\": [
      {
        \"name\": \"next\"
      }
    ],
    \"paths\": {
      \"@/*\": [\"./src/*\"]
    }
  },
  \"include\": [\"next-env.d.ts\", \"**/*.ts\", \"**/*.tsx\", \".next/types/**/*.ts\"],
  \"exclude\": [\"node_modules\"]
}
`

### 4. Git Hooks

使用 Husky 和 lint-staged：

`ash
# 安装
npm install -D husky lint-staged

# 初始化 husky
npx husky init

# 添加 pre-commit hook
echo \"npx lint-staged\" > .husky/pre-commit
`

在 package.json 中添加：

`json
{
  \"lint-staged\": {
    \"*.{js,jsx,ts,tsx}\": [
      \"eslint --fix\",
      \"prettier --write\"
    ],
    \"*.{css,scss}\": [
      \"prettier --write\"
    ],
    \"*.{json,md}\": [
      \"prettier --write\"
    ]
  }
}
`

## 开发流程

### 1. 功能开发流程

`ash
# 1. 创建功能分支
git checkout -b feature/artwork-upload

# 2. 开发功能
# ... 编写代码 ...

# 3. 运行测试
npm run test

# 4. 代码检查
npm run lint

# 5. 提交代码
git add .
git commit -m \"feat: add artwork upload functionality\"

# 6. 推送分支
git push origin feature/artwork-upload

# 7. 创建 Pull Request
`

### 2. Git 提交规范

使用 Conventional Commits 规范：

`
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
`

类型：
- eat: 新功能
- ix: 修复 bug
- docs: 文档更新
- style: 代码格式（不影响功能）
- efactor: 重构
- perf: 性能优化
- 	est: 测试相关
- chore: 构建工具或辅助工具的变动
- ci: CI 配置变更

示例：
`ash
git commit -m \"feat(artwork): add image upload with compression\"
git commit -m \"fix(auth): resolve login redirect issue\"
git commit -m \"docs(readme): update installation instructions\"
`

### 3. 代码审查清单

提交 PR 前检查：

- [ ] 代码符合 ESLint 规则
- [ ] 代码已格式化 (Prettier)
- [ ] TypeScript 类型正确
- [ ] 新功能有测试覆盖
- [ ] 文档已更新
- [ ] 提交信息符合规范
- [ ] 没有敏感信息泄露

## 性能优化

### 1. 开发环境性能

#### 1.1 快速刷新

Next.js 支持快速刷新，修改代码后自动更新页面。

#### 1.2 缓存配置

`	ypescript
// next.config.ts
const nextConfig: NextConfig = {
  // 缓存配置
  experimental: {
    optimizeCss: true,
  },
};
`

### 2. 生产环境优化

#### 2.1 代码分割

`	ypescript
// 动态导入
const HeavyComponent = dynamic(() => import('@/components/HeavyComponent'), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});
`

#### 2.2 图片优化

`	ypescript
import Image from 'next/image';

<Image
  src=\"/artwork.jpg\"
  alt=\"Artwork\"
  width={800}
  height={600}
  placeholder=\"blur\"
  blurDataURL=\"/artwork-placeholder.jpg\"
/>
`

## 环境特定配置

### 1. 开发环境

`	ypescript
// src/lib/config.ts
const config = {
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
  apiUrl: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  supabase: {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  },
};

export default config;
`

### 2. 功能标志

`	ypescript
// src/lib/feature-flags.ts
export const featureFlags = {
  enableCommunityTimelines: process.env.NEXT_PUBLIC_ENABLE_COMMUNITY === 'true',
  enableArtworkUpload: process.env.NEXT_PUBLIC_ENABLE_UPLOAD === 'true',
  enableExperimentalFeatures: process.env.NEXT_PUBLIC_ENABLE_EXPERIMENTAL === 'true',
};
`

## 故障排除

### 常见开发问题

#### 1. 热更新不工作

`ash
# 清除 Next.js 缓存
rm -rf .next
npm run dev
`

#### 2. TypeScript 类型错误

`ash
# 重新生成类型
npm run type-check

# 或手动运行
npx tsc --noEmit
`

#### 3. Supabase 连接问题

`ash
# 检查 Supabase 状态
supabase status

# 重启 Supabase
supabase stop
supabase start
`

#### 4. 依赖冲突

`ash
# 检查依赖树
npm ls

# 清理并重新安装
rm -rf node_modules package-lock.json
npm install
`

## 下一步

1. 阅读 [代码规范](CONTRIBUTING.md)
2. 了解 [组件库](COMPONENTS.md)
3. 查看 [API 文档](API.md)
4. 学习 [数据库架构](DATABASE.md)

---

**PHOEBE MUSEUM** 2026
