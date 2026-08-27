# 09 · API 接口文档

> PHOEBE MUSEUM · API Interface Specification
> Base URL: `https://api.phoebemuseum.art/v1`
> 版本：1.0 · 日期：2026-08-28

---

## 1. 通用约定

### 1.1 响应格式

```json
{ "code": 0, "message": "ok", "data": { ... } }
{ "code": 0, "data": { "list": [...], "total": 100, "page": 1, "pageSize": 20, "totalPages": 5 } }
{ "code": 40001, "message": "作品标题不能为空", "data": null }
```

### 1.2 认证

```
Authorization: Bearer {jwt_token}
```

### 1.3 错误码

| 范围 | 说明 |
|------|------|
| 0 | 成功 |
| 40001-40099 | 参数校验 |
| 40100-40199 | 认证/授权 |
| 40400-40499 | 资源不存在 |
| 40900-40999 | 冲突 |
| 42900 | 频率限制 |
| 50000+ | 服务器错误 |

### 1.4 分页参数

| 参数 | 类型 | 默认 | 说明 |
|------|------|------|------|
| `page` | int | 1 | 页码 |
| `pageSize` | int | 20 | 每页(max 100) |
| `sort` | string | `latest` | latest/oldest/hot/pm_no |

---

## 2. 认证接口

### POST /auth/register
```json
// req
{ "username": "neon_pen", "email": "neon@phoebemuseum.art", "password": "••••••" }
// res 201
{ "code": 0, "data": { "userId": 231, "token": "eyJ...", "expiresIn": 604800 } }
```

### POST /auth/login
```json
// req
{ "account": "neon@phoebemuseum.art", "password": "••••••", "remember": true }
// res 200
{ "code": 0, "data": { "userId": 231, "username": "neon_pen", "role": "creator", "token": "eyJ...", "expiresIn": 604800 } }
```

### POST /auth/social
```json
// req
{ "provider": "wechat", "code": "oauth_code" }
// res: 同 login
```

### GET /auth/me
```json
// res 200
{ "code": 0, "data": {
  "userId": 231, "username": "neon_pen", "displayName": "霓虹笔",
  "avatarUrl": "...", "bio": "...", "role": "creator",
  "stats": { "submittedCount": 23, "collectedCount": 47, "timelineCount": 4, "resonanceReceived": 1024, "followingCount": 89 }
}}
```

---

## 3. 作品接口

### GET /artworks
| Query | 说明 |
|-------|------|
| `medium` | illustration/ai/comic/d3/video/sticker |
| `timelineId` | 世界线ID |
| `year` | 年份 |
| `tag` | 标签 |
| `creatorId` | 创作者ID |
| `sort` | latest/oldest/hot/pm_no |
| `page` / `pageSize` | 分页 |

```json
// res 200
{ "code": 0, "data": { "list": [
  { "id": 178, "pmNo": "PM-000178", "title": "机甲驾驶员", "titleEn": "MECHA PILOT PHOEBE",
    "medium": "d3", "creatorId": 231, "creatorName": "neon_pen",
    "timelineId": 4, "timelineName": "MECHA PHOEBE", "year": 2026,
    "thumbUrl": "...", "resonanceCount": 124, "collectCount": 18,
    "publishedAt": "2026-08-20T14:00:00Z" }
], "total": 2593, "page": 1, "pageSize": 20, "totalPages": 130 }}
```

### GET /artworks/:pmNo
```json
// res 200
{ "code": 0, "data": {
  "id": 178, "pmNo": "PM-000178", "title": "...", "titleEn": "...",
  "description": "...", "medium": "d3", "status": "published",
  "creator": { "userId": 231, "username": "neon_pen", "displayName": "霓虹笔", "avatarUrl": "..." },
  "timeline": { "id": 4, "name": "MECHA PHOEBE", "slug": "mecha-phoebe" },
  "year": 2026, "tags": ["赛博朋克", "机甲"],
  "media": [ { "id": 301, "url": "...", "thumbUrl": "...", "type": "image", "width": 2048, "height": 2730 } ],
  "resonanceCount": 124, "collectCount": 18, "viewCount": 892,
  "hasResonanced": false, "hasCollected": true,
  "publishedAt": "2026-08-20T14:00:00Z"
}}
```

### POST /artworks/submit
`Content-Type: multipart/form-data` | `Authorization: Bearer`
| Field | Required | 说明 |
|-------|----------|------|
| `title` | ✓ | 标题 |
| `description` | | 说明 |
| `medium` | ✓ | 媒介 |
| `timelineId` | | 世界线 |
| `year` | | 年份 |
| `tags` | | 标签逗号分隔 |
| `files` | ✓ | 文件1-8个 |

```json
// res 201
{ "code": 0, "data": { "artworkId": 179, "status": "pending", "message": "作品已提交，等待审核。" }}
```

### POST /artworks/draft — 保存草稿（同 submit，status=draft）
### PUT /artworks/:id — 编辑（仅 draft/rejected 状态，仅本人）
### DELETE /artworks/:id — 删除（非已发布本人 或 管理员）

### POST /artworks/:id/resonance — 共鸣
```json
{ "code": 0, "data": { "hasResonanced": true, "resonanceCount": 125 } }
```
### DELETE /artworks/:id/resonance — 取消共鸣

### POST /artworks/:id/collect — 收藏
### DELETE /artworks/:id/collect — 取消收藏

---

## 4. 世界线接口

### GET /timelines
| Query | 说明 |
|-------|------|
| `type` | human/community |
| `sort` | latest/hot/artwork_count |

```json
{ "code": 0, "data": { "list": [
  { "id": 1, "type": "community", "name": "CYBER PHOEBE", "nameEn": "CYBER PHOEBE",
    "slug": "cyber-phoebe", "description": "...", "coverUrl": "...",
    "creatorId": 231, "creatorName": "neon_pen", "visibility": "public",
    "artworkCount": 234, "resonanceCount": 1234 }
], "total": 156 }}
```

### GET /timelines/:slug — 详情
### GET /timelines/:slug/artworks — 作品列表（分页同 /artworks）

### POST /timelines — 创建世界线
`multipart/form-data` | `Authorization: Bearer`
| Field | Required | 说明 |
|-------|----------|------|
| `name` | ✓ | 名称 |
| `nameEn` | | 英文名 |
| `description` | ✓ | 设定 |
| `cover` | ✓ | 封面图 |
| `era` | | 时代 |
| `visibility` | | public/private |

### POST /timelines/:id/resonance — 世界线共鸣

---

## 5. 人类时间线接口

### GET /timeline/human
```json
{ "code": 0, "data": { "eras": [
  { "id": 1, "slug": "prehistoric", "name": "史前菲比", "nameEn": "PREHISTORIC PHOEBE",
    "eraStart": "史前", "artworkCount": 12, "coverUrl": "...", "sortOrder": 1 }
]}}
```

### GET /timeline/era/:slug — 时代详情及作品列表

---

## 6. 创作者接口

### GET /creators
| Query | sort: resonance/artwork_count/latest |

### GET /creators/:username
```json
{ "code": 0, "data": {
  "userId": 231, "username": "neon_pen", "displayName": "霓虹笔",
  "avatarUrl": "...", "bio": "...", "website": "...",
  "signupAt": "2024-03-14T10:00:00Z",
  "stats": { "submittedCount": 47, "timelineCount": 3, "resonanceReceived": 3421, "followerCount": 892 },
  "tags": ["ILLUSTRATION", "AI CREATION", "COMIC"],
  "hasFollowed": false
}}
```

### GET /creators/:username/artworks
### GET /creators/:username/timelines
### POST /creators/:id/follow — 关注
### DELETE /creators/:id/follow — 取消关注

---

## 7. 我的博物馆接口

### GET /my/artworks?status=published|pending|rejected|draft
### GET /my/collections
### GET /my/timelines
### GET /my/drafts

（均需 `Authorization: Bearer`）

---

## 8. 档案馆接口

### GET /archive/search
| Query | 说明 |
|-------|------|
| `q` | 全文搜索(PM编号/标题/创作者) |
| `medium` | 媒介 |
| `year` | 年份 |
| `timelineId` | 世界线 |
| `tag` | 标签 |
| `sort` | pm_no_desc/pm_no_asc/hot |
| `page` / `pageSize` | 分页 |

返回表格化结果，字段同 /artworks 但无瀑布流图片。

---

## 9. 审核接口（reviewer/admin）

### GET /admin/reviews/pending
### POST /admin/reviews/:artworkId/approve
```json
{ "code": 0, "data": { "artworkId": 179, "pmNo": "PM-000179", "status": "published" } }
```
### POST /admin/reviews/:artworkId/reject
```json
// req
{ "reason": "这张不太菲比——你再看看？" }
```

---

## 10. 文件上传接口

### POST /upload/token
`Authorization: Bearer`
```json
// req
{ "filename": "phoebe.png", "contentType": "image/png", "fileSize": 4234567 }
// res 200
{ "code": 0, "data": {
  "uploadUrl": "https://oss.../artworks/2026/08/uuid.png",
  "cdnUrl": "https://cdn.phoebemuseum.art/artworks/2026/08/uuid.png",
  "expiresIn": 900
}}
```
客户端 PUT 文件到 `uploadUrl`，完成后用 `cdnUrl` 提交作品。

---

## 11. 通知接口

### GET /notifications?page=1&pageSize=20
### PUT /notifications/:id/read
### PUT /notifications/read-all

---

## 12. 首页聚合接口

### GET /home
```json
{ "code": 0, "data": {
  "stats": { "totalArtworks": 2593, "todayNew": 12, "activeCreators": 89, "timelineCount": 156 },
  "carousel": [ { "pmNo": "PM-000178", "title": "...", "thumbUrl": "...", "creatorName": "..." } ],
  "latest": [ ... ],
  "hotTimelines": [ ... ],
  "hotCreators": [ ... ]
}}
```

---

## 13. 管理接口（admin）

### GET /admin/users — 用户列表
### PUT /admin/users/:id — 修改用户（封禁/角色）
### GET /admin/artworks — 全部作品管理
### DELETE /admin/artworks/:id — 删除作品

---

## 14. 速率限制

| 接口 | 限制 |
|------|------|
| POST /auth/login | 5 次/分钟/IP |
| POST /auth/register | 3 次/小时/IP |
| POST /artworks/submit | 5 次/小时/用户 |
| POST /artworks/:id/resonance | 30 次/分钟/用户 |
| GET /artworks (列表) | 60 次/分钟/IP |
| GET /archive/search | 30 次/分钟/IP |

超限返回 `429` + `Retry-After` header。

---

*文档版本：1.0 · 最后更新：2026-08-28*
