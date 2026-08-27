# PHOEBE MUSEUM - 贡献指南

感谢你对菲比博物馆项目的关注！我们欢迎各种形式的贡献，无论是代码、设计、文档还是创意。

## 如何贡献

### 1. 贡献类型

#### 代码贡献
- **Bug 修复**: 修复已知问题
- **新功能**: 实现新特性
- **性能优化**: 提升应用性能
- **代码重构**: 改进代码质量

#### 非代码贡献
- **文档**: 完善文档内容
- **设计**: UI/UX 改进
- **翻译**: 多语言支持
- **测试**: 测试用例编写
- **反馈**: 问题报告和建议

### 2. 贡献流程

#### 步骤 1: 准备工作

1. **Fork 项目**
   `ash
   # 在 GitHub 上 Fork 项目到你的账号
   `

2. **克隆到本地**
   `ash
   git clone https://github.com/your-username/phoebe-museum.git
   cd phoebe-museum
   `

3. **设置上游仓库**
   `ash
   git remote add upstream https://github.com/original-owner/phoebe-museum.git
   `

4. **安装依赖**
   `ash
   npm install
   `

#### 步骤 2: 创建分支

`ash
# 同步上游代码
git fetch upstream
git checkout main
git merge upstream/main

# 创建功能分支
git checkout -b feature/your-feature-name

# 或修复分支
git checkout -b fix/your-bug-fix
`

分支命名规范：
- eature/功能名称 - 新功能
- ix/问题描述 - Bug 修复
- docs/文档类型 - 文档更新
- efactor/重构内容 - 代码重构
- 	est/测试内容 - 测试相关
- chore/任务描述 - 构建工具或辅助工具

#### 步骤 3: 开发

1. **编写代码**
   - 遵循项目代码规范
   - 添加必要的注释
   - 确保类型安全

2. **运行测试**
   `ash
   npm run test
   `

3. **代码检查**
   `ash
   npm run lint
   npm run type-check
   `

4. **格式化代码**
   `ash
   npm run format
   `

#### 步骤 4: 提交

`ash
# 添加更改
git add .

# 提交（遵循 Conventional Commits）
git commit -m \"feat(artwork): add image upload feature\"

# 推送到你的 Fork
git push origin feature/your-feature-name
`

#### 步骤 5: 创建 Pull Request

1. 在 GitHub 上打开你的 Fork
2. 点击 \"Compare & pull request\"
3. 填写 PR 模板
4. 等待代码审查

### 3. Pull Request 模板

`markdown
## 描述

简要描述这个 PR 的目的和内容。

## 变更类型

- [ ] Bug 修复
- [ ] 新功能
- [ ] 文档更新
- [ ] 代码重构
- [ ] 性能优化
- [ ] 测试相关
- [ ] 其他

## 测试

描述你如何测试这些更改：

- [ ] 单元测试通过
- [ ] 集成测试通过
- [ ] 手动测试通过

## 截图（如果适用）

如果更改了 UI，请提供截图。

## 相关 Issue

Closes #123

## 检查清单

- [ ] 代码遵循项目规范
- [ ] 已添加必要的测试
- [ ] 文档已更新
- [ ] 提交信息符合规范
- [ ] 没有敏感信息泄露
`

## 代码规范

### 1. TypeScript 规范

#### 1.1 类型定义

`	ypescript
// ✅ 好的实践
interface Artwork {
  id: string;
  museumId: string;
  title: string;
  description?: string;
  artist: Profile;
  category: ArtworkCategory;
  createdAt: Date;
}

// ❌ 避免
interface Artwork {
  id: any;
  museumId: string;
  title: string;
  description: string | undefined;
  artist: any;
  category: string;
  createdAt: any;
}
`

#### 1.2 命名约定

`	ypescript
// 接口和类型：PascalCase
interface UserProfile {}
type ArtworkCategory = 'illustration' | 'ai_art' | 'comic';

// 变量和函数：camelCase
const artworkCount = 10;
function getArtworkById(id: string): Artwork {}

// 常量：UPPER_SNAKE_CASE
const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20MB
const API_BASE_URL = process.env.NEXT_PUBLIC_APP_URL;

// 布尔变量：is/has/can 前缀
const isLoading = true;
const hasPermission = false;
const canEdit = true;
`

#### 1.3 函数规范

`	ypescript
// ✅ 好的实践
async function fetchArtwork(id: string): Promise<Artwork> {
  try {
    const response = await fetch(/api/artworks/);
    if (!response.ok) {
      throw new Error('Failed to fetch artwork');
    }
    return await response.json();
  } catch (error) {
    logger.error('Error fetching artwork', error);
    throw error;
  }
}

// ❌ 避免
async function fetchArtwork(id) {
  const response = await fetch('/api/artworks/' + id);
  return response.json();
}
`

### 2. React 规范

#### 2.1 组件结构

`	ypescript
// components/ArtworkCard.tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Artwork } from '@/types/artwork';

interface ArtworkCardProps {
  artwork: Artwork;
  onSelect?: (artwork: Artwork) => void;
}

export default function ArtworkCard({ artwork, onSelect }: ArtworkCardProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setIsLoading(true);
    onSelect?.(artwork);
  };

  return (
    <div className=\"artwork-card\" onClick={handleClick}>
      <Image
        src={artwork.thumbnailUrl}
        alt={artwork.title}
        width={300}
        height={200}
        placeholder=\"blur\"
        blurDataURL=\"/placeholder.jpg\"
      />
      <h3>{artwork.title}</h3>
      <p>{artwork.artist.displayName}</p>
    </div>
  );
}
`

#### 2.2 Hooks 规范

`	ypescript
// hooks/useArtwork.ts
import { useState, useEffect } from 'react';
import { Artwork } from '@/types/artwork';
import { supabase } from '@/lib/supabase';

export function useArtwork(id: string) {
  const [artwork, setArtwork] = useState<Artwork | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchArtwork() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('artworks')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        setArtwork(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }

    fetchArtwork();
  }, [id]);

  return { artwork, loading, error };
}
`

### 3. CSS/Tailwind 规范

#### 3.1 类名顺序

`html
<!-- ✅ 好的实践：按照布局、定位、尺寸、间距、样式、响应式的顺序 -->
<div className=\"flex items-center justify-between p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow\">

<!-- ❌ 避免：无序的类名 -->
<div className=\"bg-white shadow-md p-4 flex rounded-lg items-center hover:shadow-lg justify-between transition-shadow\">
`

#### 3.2 响应式设计

`html
<!-- ✅ 好的实践：移动优先 -->
<div className=\"text-sm md:text-base lg:text-lg xl:text-xl\">

<!-- ✅ 好的实践：使用一致的断点 -->
<div className=\"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4\">
`

#### 3.3 自定义样式

`css
/* ✅ 好的实践：使用 CSS 变量 */
.artwork-card {
  background-color: var(--color-background);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
}

/* ❌ 避免：硬编码值 */
.artwork-card {
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
`

### 4. 文件组织规范

#### 4.1 目录结构

`
src/
├── app/                    # Next.js App Router
│   ├── (routes)/          # 路由组
│   ├── api/               # API 路由
│   ├── layout.tsx         # 根布局
│   └── page.tsx           # 首页
├── components/            # 可复用组件
│   ├── ui/               # 基础 UI 组件
│   ├── forms/            # 表单组件
│   └── layouts/          # 布局组件
├── lib/                   # 工具库
│   ├── supabase.ts       # Supabase 客户端
│   ├── utils.ts          # 工具函数
│   └── constants.ts      # 常量
├── hooks/                 # 自定义 Hooks
├── types/                 # TypeScript 类型
├── styles/               # 全局样式
└── public/               # 静态资源
`

#### 4.2 文件命名

`
# ✅ 好的实践
components/
├── ArtworkCard.tsx        # 组件：PascalCase
├── artwork-card.module.css # 模块样式：kebab-case
├── useArtwork.ts         # Hook：camelCase with 'use' prefix
└── artwork.utils.ts      # 工具文件：kebab-case

# ❌ 避免
components/
├── artworkcard.tsx       # 缺乏可读性
├── Artwork_Card.tsx      # 下划线命名
└── artworkCard.tsx       # 组件应该是 PascalCase
`

### 5. 注释规范

#### 5.1 文件头注释

`	ypescript
/**
 * @fileoverview ArtworkCard 组件
 * @description 用于展示作品卡片的组件，支持点击选择和加载状态
 * @author Your Name
 * @created 2026-08-28
 */
`

#### 5.2 函数注释

`	ypescript
/**
 * 获取作品详情
 * @param id - 作品 ID
 * @returns 作品详情对象
 * @throws {Error} 当作品不存在时抛出错误
 * @example
 * `	ypescript
 * const artwork = await fetchArtwork('PM-000001');
 * console.log(artwork.title); // '海上菲比'
 * `
 */
async function fetchArtwork(id: string): Promise<Artwork> {
  // 实现...
}
`

#### 5.3 复杂逻辑注释

`	ypescript
// 计算作品在瀑布流中的位置
// 使用黄金分割比例确保视觉平衡
function calculateMasonryPosition(
  items: Artwork[],
  containerWidth: number
): Position[] {
  // 1. 计算列数
  const columnCount = Math.floor(containerWidth / 300);
  
  // 2. 初始化列高度数组
  const columnHeights = new Array(columnCount).fill(0);
  
  // 3. 为每个项目分配位置
  return items.map((item, index) => {
    // 找到最短的列
    const shortestColumn = columnHeights.indexOf(
      Math.min(...columnHeights)
    );
    
    // 计算位置
    const position = {
      x: shortestColumn * (containerWidth / columnCount),
      y: columnHeights[shortestColumn],
    };
    
    // 更新列高度
    columnHeights[shortestColumn] += item.height + 16; // 16px 间距
    
    return position;
  });
}
`

## 测试规范

### 1. 测试文件组织

`
src/
├── components/
│   └── __tests__/
│       ├── ArtworkCard.test.tsx
│       └── Navbar.test.tsx
├── hooks/
│   └── __tests__/
│       └── useArtwork.test.ts
└── lib/
    └── __tests__/
        └── utils.test.ts
`

### 2. 测试命名

`	ypescript
// ✅ 好的实践
describe('ArtworkCard', () => {
  describe('when artwork is provided', () => {
    it('should render artwork title', () => {
      // 测试...
    });

    it('should call onSelect when clicked', () => {
      // 测试...
    });
  });

  describe('when loading', () => {
    it('should show loading spinner', () => {
      // 测试...
    });
  });
});

// ❌ 避免
describe('ArtworkCard', () => {
  it('works', () => {
    // 不明确的测试
  });
});
`

### 3. 测试覆盖

- **单元测试**: 测试独立函数和组件
- **集成测试**: 测试组件间交互
- **端到端测试**: 测试完整用户流程

## 提交规范

### 1. Conventional Commits

`
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
`

#### 类型

- **feat**: 新功能
- **fix**: Bug 修复
- **docs**: 文档更新
- **style**: 代码格式（不影响功能）
- **refactor**: 重构
- **perf**: 性能优化
- **test**: 测试相关
- **chore**: 构建工具或辅助工具的变动
- **ci**: CI 配置变更

#### 示例

`ash
# 新功能
git commit -m \"feat(artwork): add image upload with compression\"

# Bug 修复
git commit -m \"fix(auth): resolve login redirect issue\"

# 文档更新
git commit -m \"docs(readme): update installation instructions\"

# 重构
git commit -m \"refactor(api): consolidate artwork endpoints\"

# 性能优化
git commit -m \"perf(images): implement lazy loading\"

# 测试
git commit -m \"test(artwork): add unit tests for upload validation\"

# 构建工具
git commit -m \"chore(deps): update dependencies to latest versions\"
`

### 2. 提交信息格式

`
feat(artwork): add image upload with compression

- Add image compression before upload
- Support multiple image formats (JPEG, PNG, WebP)
- Implement progress indicator
- Add error handling for large files

Closes #123
`

## 问题报告

### 1. Bug 报告模板

`markdown
## Bug 描述

简要描述 bug 是什么。

## 重现步骤

1. 访问 '...'
2. 点击 '...'
3. 滚动到 '...'
4. 看到错误

## 预期行为

描述你期望发生什么。

## 实际行为

描述实际发生了什么。

## 截图

如果适用，添加截图来帮助解释问题。

## 环境信息

- 操作系统: [例如 Windows 11, macOS 13]
- 浏览器: [例如 Chrome 120, Firefox 119]
- Node.js 版本: [例如 20.10.0]
- 项目版本: [例如 2.0.0]

## 附加信息

添加任何其他相关信息。
`

### 2. 功能请求模板

`markdown
## 功能描述

简要描述你想要的功能。

## 问题背景

描述这个功能要解决什么问题。

## 解决方案

描述你希望如何实现这个功能。

## 替代方案

描述你考虑过的其他解决方案。

## 附加信息

添加任何其他相关信息或截图。
`

## 代码审查

### 1. 审查清单

#### 功能性
- [ ] 代码实现了预期功能
- [ ] 边界情况已处理
- [ ] 错误处理完善

#### 代码质量
- [ ] 代码符合项目规范
- [ ] 没有代码重复
- [ ] 命名清晰易懂
- [ ] 注释充分但不过度

#### 性能
- [ ] 没有性能问题
- [ ] 适当使用缓存
- [ ] 避免不必要的渲染

#### 安全性
- [ ] 没有安全漏洞
- [ ] 输入验证完善
- [ ] 敏感信息已保护

#### 测试
- [ ] 测试覆盖充分
- [ ] 测试用例合理
- [ ] 测试通过

### 2. 审查反馈

`markdown
## 总体评价

代码质量良好，功能实现完整。

## 建议改进

1. **性能优化**: 建议使用 useMemo 优化计算
2. **错误处理**: 添加更详细的错误信息
3. **测试**: 增加边界情况测试

## 优点

1. 代码结构清晰
2. 类型定义完善
3. 注释详细

## 需要修改

1. 修复第 45 行的类型错误
2. 添加缺失的单元测试
`

## 社区准则

### 1. 行为准则

- 尊重所有参与者
- 接受建设性批评
- 专注于对社区最有利的事情
- 对他人表示同理心

### 2. 沟通规范

- 使用清晰、简洁的语言
- 避免技术术语（除非必要）
- 提供具体的例子
- 保持专业和友好

## 认可贡献者

我们会在 README 中列出所有贡献者。感谢你的贡献！

## 获取帮助

- 查看 [故障排除文档](TROUBLESHOOTING.md)
- 提交 [Issue](https://github.com/your-username/phoebe-museum/issues)
- 参与 [讨论](https://github.com/your-username/phoebe-museum/discussions)

---

**PHOEBE MUSEUM** 2026
