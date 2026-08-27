# 06 · Design System

> PHOEBE MUSEUM · Design System v3.1
> 基于 `pm.css` 的完整设计令牌与组件库
> 版本：1.0 · 日期：2026-08-28

---

## 1. Design Tokens

### 1.1 色彩令牌

```css
:root {
  /* 背景层 */
  --bg: #faf9f5;        /* 页面背景，暖白 */
  --bg-soft: #f3f1ea;   /* 分区/卡片背景 */

  /* 文字层 */
  --ink: #16150f;       /* 主文字，近黑 */
  --ink-2: #77746a;     /* 次要文字 */
  --ink-3: #aba79a;     /* 辅助文字/placeholder */

  /* 线条层 */
  --line: #e7e4da;       /* 细分割线 */
  --line-dark: #d3cfc2;  /* 粗分割线/边框 */

  /* 强调色 */
  --seal: #b3402a;       /* 印章红，唯一主强调色 */
  --seal-d: #9a3623;     /* 印章红深色 */
  --gold: #d8a447;       /* 金色，次要强调 */

  /* 特殊 */
  --glass: rgba(250,249,245,.75);  /* 导航玻璃态 */
}
```

### 1.2 媒介色

```css
--c-illustration: #d8a447;  /* 金 */
--c-ai: #9b7ede;             /* 紫 */
--c-comic: #c96f5a;           /* 赤 */
--c-d3: #4fa3b8;              /* 青 */
--c-video: #e08a3c;           /* 橙 */
--c-sticker: #d98ba3;         /* 粉 */
```

### 1.3 字体令牌

```css
--serif: "Cormorant Garamond", "Noto Serif SC", serif;
--sans: Inter, "Noto Sans SC", sans-serif;
```

### 1.4 动效令牌

```css
--ease: cubic-bezier(0.22, 0.61, 0.21, 1);  /* 主缓动曲线 */
```

| 令牌 | 值 | 用途 |
|------|-----|------|
| `--ease` | `cubic-bezier(0.22,0.61,0.21,1)` | 通用缓动 |
| transition 默认 | `0.3s var(--ease)` | hover/focus |
| transition 慢 | `0.5s-0.8s var(--ease)` | 图片缩放/页面过渡 |
| 导航 | `0.4s var(--ease)` | 滚动玻璃态切换 |

---

## 2. Tailwind 配置映射

```ts
// tailwind.config.ts
import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: { DEFAULT: 'var(--bg)', soft: 'var(--bg-soft)' },
        ink: {
          DEFAULT: 'var(--ink)',
          2: 'var(--ink-2)',
          3: 'var(--ink-3)',
        },
        line: { DEFAULT: 'var(--line)', dark: 'var(--line-dark)' },
        seal: { DEFAULT: 'var(--seal)', d: 'var(--seal-d)' },
        gold: 'var(--gold)',
        medium: {
          illustration: '#d8a447',
          ai: '#9b7ede',
          comic: '#c96f5a',
          d3: '#4fa3b8',
          video: '#e08a3c',
          sticker: '#d98ba3',
        },
      },
      fontFamily: {
        serif: ['var(--serif)'],
        sans: ['var(--sans)'],
      },
      transitionTimingFunction: {
        pm: 'var(--ease)',
      },
      maxWidth: {
        page: '1560px',
        content: '1400px',
      },
    },
  },
} satisfies Config;
```

---

## 3. CSS 类库

### 3.1 布局类

| 类 | 说明 | 定义 |
|----|------|------|
| `.pm-nav` | 固定顶部导航 | `position:fixed; top:0; z-index:100` |
| `.pm-nav.scrolled` | 滚动后玻璃态 | `background:var(--glass); backdrop-filter:blur(20px)` |
| `.pm-drawer` | 移动端抽屉 | `position:fixed; transform:translateX(100%)` |
| `.pm-drawer.open` | 抽屉打开 | `transform:translateX(0)` |
| `.pm-foot` | 页脚 | 底部全宽，`padding:80px 5vw` |
| `.rv` | 滚动渐入初始态 | `opacity:0; transform:translateY(40px)` |
| `.rv.in` | 滚动渐入激活态 | `opacity:1; transform:none; transition:.9s var(--ease)` |
| `.to-top` | 回到顶部按钮 | `position:fixed; bottom:24px; right:24px` |
| `.to-top.show` | 显示态 | `opacity:1; pointer-events:auto` |

### 3.2 组件类

| 类 | 用途 |
|----|------|
| `.btn.solid` | 主按钮（印章红底白字） |
| `.btn.ghost` | 次按钮（透明底墨线框） |
| `.submit-btn` | 导航投稿按钮 |
| `.logo` | Logo 容器（三语轮播副标题） |
| `.lang` | 语言切换器 |
| `.chip` | 媒介标签 |
| `.chip.illustration` / `.ai` / `.comic` / `.d3` / `.video` / `.sticker` | 各媒介色 |
| `.kicker` | 引题（全大写+字间距+编号前缀） |
| `.stamp` | 印章装饰（红框斜体旋转） |
| `.tag` | 圆角标签 |
| `.fav-btn` | 共鸣/收藏按钮 |
| `.fav-btn.on` | 已激活态（红底白字） |

### 3.3 排版类

| 类 | 用途 |
|----|------|
| `.serif` | `font-family: var(--serif)` |
| `.no` / `.pm-no` | PM编号样式（斜体红色） |
| `.en` | 英文副标题（斜体灰色） |
| `.cn` | 中文标记（无衬线小字+字间距） |

### 3.4 滚动渐入

```css
.rv {
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.9s var(--ease), transform 0.9s var(--ease);
}
.rv.in {
  opacity: 1;
  transform: none;
}
```

```ts
// 触发逻辑
new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.06, rootMargin: '0px 0px -40px 0px' });
```

---

## 4. 组件规格

### 4.1 ArtworkCard

```
┌─────────────────┐
│                 │
│   (image 3:4)   │  ← aspect-ratio: 3/4; overflow: hidden
│                 │     hover: scale(1.06) + brightness(1.05)
│            [chip]│  ← 媒介标签，绝对定位左上
│                 │
├─────────────────┤
│ PM-000XXX       │  ← 9px, 0.14em, ink-3
│ 作品标题         │  ← Serif, 15px, 500
│ 2026 · 124♥    │  ← 10px, ink-2
└─────────────────┘
```

### 4.2 FilterBar

```
[ALL] [插画] [AI] [漫画] [3D] [视频] [表情包]   [年份▾] [世界线▾] [排序▾]   [搜索]
```

- tag: `padding: 6px 14px; border: 1px solid var(--line-dark); border-radius: 20px`
- tag.active: `border-color: var(--seal); color: var(--seal)`
- select: 自定义箭头，`appearance: none`

### 4.3 StatBar

```
  47          3       3,421        892        2024
 已上交     世界线    总共鸣      被关注      入馆
```

- 数字: `font-serif italic 42px seal`
- 标签: `9px 0.2em uppercase ink-2`

### 4.4 TabSwitcher

```
[作品 (47)]  [世界线 (3)]  [关于]
─────────────
(内容区)
```

- button: `padding: 16px 24px; 12px 0.14em ink-2; border-bottom: 2px solid transparent`
- button.active: `color: seal; border-bottom-color: seal`

### 4.5 UploadZone

```
┌───────────────────────────┐
│                           │
│       ⬆ (icon 36px)       │
│                           │
│  拖拽文件到这里，或点击选择  │  ← Serif 22px
│  JPG/PNG/WEBP/MP4 ≤50MB  │  ← 11px ink-3
│                           │
│  (隐藏 file input 覆盖)   │
└───────────────────────────┘
  border: 2px dashed line-dark; border-radius: 12px
  hover/dragover: border-color seal; bg-soft
```

### 4.6 ArchiveTable

```
PM NO.     │ TITLE              │ CREATOR      │ MEDIUM │ YEAR │ TIMELINE
───────────┼────────────────────┼──────────────┼─────────┼──────┼──────────
PM-000178  │ 机甲驾驶员          │ @neon_pen    │ [3D]   │ 2026 │ MECHA
           │ MECHA PILOT PHOEBE │              │         │      │
───────────┼────────────────────┼──────────────┼─────────┼──────┼──────────
```

- th: `9px 0.2em uppercase ink-3; border-bottom: 1px solid line-dark`
- td: `12px; border-bottom: 1px solid line; padding: 14px 8px`
- tr:hover: `background: bg-soft`
- pm-no: `font-serif italic seal`

---

## 5. 字体加载策略

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?
  family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400
  &family=Inter:wght@400;500
  &family=Noto+Serif+SC:wght@300;400;500
  &display=swap" rel="stylesheet">
```

| 字体 | Weight | 用途 |
|------|--------|------|
| Cormorant Garamond | 300, 400, 500 + italic 300, 400 | 标题/编号/引文 |
| Inter | 400, 500 | 正文/标签/UI |
| Noto Serif SC | 300, 400, 500 | 中文衬线 fallback |

---

## 6. 暗色模式（预留）

当前设计为单一亮色模式。暗色模式预留方案：

```css
@media (prefers-color-scheme: dark) {
  :root {
    --bg: #16150f;
    --bg-soft: #1f1d17;
    --ink: #f4f0e6;
    --ink-2: #9a978c;
    --ink-3: #6b685e;
    --line: #2a2820;
    --line-dark: #3a382e;
    --glass: rgba(22,21,15,.75);
  }
}
```

---

*文档版本：1.0 · Design System v3.1 · 最后更新：2026-08-28*
