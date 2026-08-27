# PHOEBE MUSEUM

> Every Phoebe deserves to be remembered.
> 每一个菲比，都值得被记住。

## 项目简介

菲比博物馆是一个开源的在线数字艺术档案馆，专注于收集、整理、归档和展览「菲比」的二创作品。

这里不是普通的图片站，也不是简单的作品展示平台。

菲比博物馆的定位是：一个以「菲比」为唯一核心角色，不断收集、整理、归档、展览和扩展菲比二创作品的线上数字博物馆。

整个网站由两条大型结构共同组成：

`
                     PHOEBE MUSEUM
                           |
            +--------------+--------------+
            |                             |
            v                             v
      HUMAN TIMELINE              COMMUNITY MULTIVERSE
            |                             |
     人类艺术史主线                   社区平行世界
            |                             |
            v                             v
       官方固定展厅                    用户创建展厅
`

## 核心理念

菲比博物馆的核心不是：

- 点赞
- 热度
- 排行榜
- 流量

而是：

**作品 -> 收录 -> 编号 -> 归档 -> 展览 -> 世界线 -> 历史**

每一件被正式收录的作品都获得一个永久数字馆藏编号：

`
PM-000001
PM-000002
PM-000003
...
`

PM 代表 PHOEBE MUSEUM。作品一旦审核通过，即成为菲比博物馆的一件数字馆藏。

## 人类时间线

这是整个菲比博物馆的官方主线。它代表：如果菲比存在于人类艺术史中，她会以什么样的形式被不同文明和时代创造出来？

### 史前 PREHISTORIC

关键词：洞穴壁画、石头、赭石、仪式、图腾、原始

作品方向：洞穴壁画菲比、原始岩画、石器时代雕塑、女神图腾、原始部落菲比

### 古典时代 CLASSICAL

关键词：希腊、罗马、大理石、神话、神庙、雕塑

作品方向：希腊神话菲比、罗马壁画、大理石雕像、古典神庙、神话人物

### 中世纪 MEDIEVAL

关键词：手抄本、圣像、骑士、城堡、哥特、宗教艺术

作品方向：手抄本插画、中世纪肖像、骑士菲比、哥特教堂、彩色玻璃

### 文艺复兴 RENAISSANCE

关键词：油画、肖像、佛罗伦萨、古典、人文主义

作品方向：油画肖像、宫廷菲比、壁画、宗教画构图、文艺复兴建筑

### 巴洛克 BAROQUE

关键词：戏剧、金色、阴影、华丽、装饰

作品方向：强烈明暗对比、戏剧性构图、金色宫廷、巴洛克肖像、华丽服饰

### 现实主义 REALISM

关键词：日常生活、劳动、城市、乡村、纪录片

作品方向：普通生活中的菲比、工业时代菲比、农村菲比、城市生活、社会现实

### 浪漫主义 ROMANTICISM

关键词：自然、风暴、废墟、情感、崇高

作品方向：暴风雨、荒野、废墟、月亮、强烈情绪、英雄式人物

### 前拉斐尔派 PRE-RAPHAELITE

关键词：花朵、中世纪、神话、美丽、自然

作品方向：花卉菲比、拉斐尔前派风格、神话场景、唯美主义

### 浮世绘 UKIYO-E

关键词：日本、木版画、歌舞伎、风景、美人画

作品方向：和服菲比、浮世绘风格、江户时代、日本传统美学

### 印象派 IMPRESSIONISM

关键词：光线、色彩、瞬间、户外、巴黎

作品方向：莫奈式菲比、光影变化、户外场景、色彩实验

### 后印象派 POST-IMPRESSIONISM

关键词：情感、形式、色彩、表现、个人风格

作品方向：梵高式菲比、高更式菲比、塞尚式菲比、情感表达

### 现代 MODERN

关键词：抽象、实验、多元、自由、创新

作品方向：立体主义菲比、超现实主义菲比、波普艺术菲比、极简主义菲比

### 未书写的年代 THE UNWRITTEN AGE

关键词：未来、想象、无限、未知

作品方向：这是留给未来的空间，由创作者定义

## 社区平行世界

除了官方的人类时间线，创作者还可以创建自己的平行世界线：

- **PIRATE PHOEBE** - 海盗菲比：暴风、木船、藏宝图与未知海域
- **SCHOOL PHOEBE** - 校园菲比：制服、校园、转学生、放学后的黄昏
- **CYBER PHOEBE** - 赛博菲比：霓虹、机械、数据洪流与未来都市
- **FANTASY PHOEBE** - 幻想菲比：天使、堕天使、魔女、骑士与幻想王国
- **THE STRANGE ARCHIVE** - 奇异档案：一些无法解释的菲比

每条世界线都可以不断扩展，由创作者共同构建。

## 馆藏分类

作品按创作媒介分为六类：

- **插画 ILLUSTRATION** - 传统或数字插画
- **AI 创作 AI ART** - AI 辅助生成的艺术作品
- **漫画 COMIC** - 漫画、条漫、四格漫画
- **3D ART** - 3D 建模、渲染、雕塑
- **视频 VIDEO** - 动画、短视频、动态作品
- **表情包 STICKERS** - 表情包、贴纸、小图标

## 项目结构

`
phoebe-museum/
├── phoebe_museum_v1.html                    # 首页
├── phoebe_museum_collection_v1.html         # 馆藏列表
├── phoebe_museum_detail.html                # 作品详情
├── phoebe_museum_timeline_human.html        # 人类时间线主页
├── phoebe_museum_timeline_human_era.html    # 时代详情
├── phoebe_museum_timeline_community.html    # 社区世界线主页
├── phoebe_museum_timeline_community_detail.html  # 世界线详情
├── phoebe_museum_creators.html              # 创作者列表
├── phoebe_museum_creator_detail.html        # 创作者详情
├── phoebe_museum_submit.html                # 投稿页面
├── phoebe_museum_my.html                    # 我的博物馆
├── phoebe_museum_admin.html                 # 管理后台
├── phoebe_museum_create_timeline.html       # 创建世界线
├── phoebe_nav.css                           # 导航栏样式
├── phoebe_lang.js                           # 语言系统
└── README.md
`

## 技术实现

- 纯前端实现，无需后端依赖
- HTML5 + CSS3 + Vanilla JavaScript
- CSS 变量主题系统
- Intersection Observer 滚动动画
- 三语切换系统（中文/English/日本語）
- 液态玻璃悬浮导航栏
- 响应式设计，适配各种设备

## 参与贡献

这个项目需要各种人才：

### 前端开发者

- 完善功能实现
- 优化用户体验
- 修复 Bug
- 代码重构

### 设计师

- 改进视觉设计
- UI/UX 优化
- 图标设计
- 动效设计

### 创作者

- 提交菲比二创作品
- 创建新的世界线
- 丰富馆藏内容

### 任何人

- 提 Issue 反馈问题
- 提出建议和想法
- 完善文档
- 翻译

## 如何贡献

1. Fork 本仓库
2. 创建你的分支 (git checkout -b feature/your-feature)
3. 提交你的改动 (git commit -m 'Add some feature')
4. 推送到分支 (git push origin feature/your-feature)
5. 创建 Pull Request

## 未来规划

- [ ] 接入 Supabase 数据库
- [ ] 用户注册登录系统
- [ ] 真实投稿审核流程
- [ ] 自动 PM 编号系统
- [ ] 作品搜索和筛选
- [ ] 创作者个人主页
- [ ] 社区世界线创建和管理
- [ ] 移动端 App

## 关于菲比

菲比是一个角色。

不同创作者用不同方式诠释她，她就存在于无数个世界里。

这个博物馆，就是为了记录这一切。

从 PM-000001 开始，永远不会结束。

## License

MIT

---

**PHOEBE MUSEUM** 2026
