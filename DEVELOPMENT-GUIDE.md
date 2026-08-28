# Phoebe Museum 开发指南

## 项目现状分析

### ✅ 已完成
- 完整的前端页面结构（首页、时间线、社区、收藏、投稿等）
- 响应式设计，支持桌面和移动端
- 模拟的认证系统（使用localStorage）
- 静态数据展示
- 完整的数据库类型定义

### ❌ 待开发
- Supabase数据库表创建和配置
- 用户认证系统对接
- 投稿功能对接数据库
- 动态数据展示
- 管理员功能

## 开发步骤

### 第一步：Supabase数据库配置（优先级最高）

#### 1.1 执行数据库初始化脚本
我已经创建了 `supabase-schema.sql` 文件，包含：
- 所有必要的数据库表（profiles, artworks, timelines, submissions, favorites）
- 索引优化- RLS（行级安全）策略
- 触发器（自动更新时间戳、自动创建用户资料）
- 存储桶配置

**执行步骤：**
1. 登录 Supabase 控制台
2. 进入 SQL Editor
3. 执行 `supabase-schema.sql` 中的内容

#### 1.2 配置环境变量
确保 `.env.local` 文件包含正确的 Supabase 配置：
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 第二步：用户认证系统对接

#### 2.1 创建认证上下文
我已经创建了 `src/contexts/AuthContext.tsx`，提供了：
- `useAuth()` hook
- 用户状态管理
- 登录、注册、登出功能
- 用户资料管理

#### 2.2 修改 layout.tsx
在根布局中添加 AuthProvider：

```tsx
import { AuthProvider } from '@/contexts/AuthContext'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body className="...">
        <AuthProvider>
          <GlobalShell>
            {children}
          </GlobalShell>
        </AuthProvider>
      </body>
    </html>
  )
}
```

#### 2.3 修改 AuthModal.tsx
将模拟的认证改为真正的 Supabase Auth：

```tsx
import { useAuth } from '@/contexts/AuthContext'

export function AuthModal({ open, onClose, view, setView }: AuthModalProps) {
  const { signUp, signIn } = useAuth()
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    const { error } = await signIn(loginEmail, loginPassword)
    
    if (error) {
      setError(error.message || '登录失败，请重试')
    } else {
      onClose()
    }
  }
  
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    const { error } = await signUp(regEmail, regPassword, regUsername)
    
    if (error) {
      setError(error.message || '注册失败，请重试')
    } else {
      setSuccess(true)
    }
  }
}
```

### 第三步：投稿功能对接数据库

#### 3.1 修改 submit/page.tsx
实现真正的投稿提交：

```tsx
import { useAuth } from '@/contexts/AuthContext'
import { supabase } from '@/lib/supabase'

export default function SubmitPage() {
  const { user } = useAuth()
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!user) {
      alert('请先登录')
      return
    }
    
    setLoading(true)
    
    try {
      // 1. 上传图片
      const imageUrl = await uploadImage(file)
      
      // 2. 插入投稿记录
      const { data, error } = await supabase
        .from('submissions')
        .insert({
          user_id: user.id,
          artwork_title: title,
          creator_name: creator,
          medium: medium,
          image_url: imageUrl,
          status: 'pending'
        })
        .select()
        .single()
      
      if (error) throw error
      
      // 3. 显示成功提示
      alert('投稿成功！请等待审核。')
    } catch (error) {
      console.error('投稿失败:', error)
      alert('投稿失败，请重试')
    } finally {
      setLoading(false)
    }
  }
}
```

#### 3.2 实现图片上传
创建图片上传函数：

```tsx
async function uploadImage(file: File): Promise<string> {
  const fileExt = file.name.split('.').pop()
  const fileName = `${user.id}/${Date.now()}.${fileExt}`
  
  const { data, error } = await supabase.storage
    .from('artworks')
    .upload(fileName, file)
  
  if (error) throw error
  
  const { data: { publicUrl } } = supabase.storage
    .from('artworks')
    .getPublicUrl(fileName)
  
  return publicUrl
}
```

### 第四步：动态数据展示

#### 4.1 修改 collection/page.tsx
从数据库获取作品：

```tsx
import { supabase } from '@/lib/supabase'

export default function CollectionPage() {
  const [artworks, setArtworks] = useState([])
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    fetchArtworks()
  }, [])
  
  async function fetchArtworks() {
    try {
      const { data, error } = await supabase
        .from('artworks')
        .select('*')
        .eq('status', 'approved')
        .order('created_at', { ascending: false })
        .limit(20)
      
      if (error) throw error
      
      setArtworks(data || [])
    } catch (error) {
      console.error('获取作品失败:', error)
    } finally {
      setLoading(false)
    }
  }
  
  // 实现搜索和筛选
  async function searchArtworks(query: string) {
    const { data, error } = await supabase
      .from('artworks')
      .select('*')
      .eq('status', 'approved')
      .or(`title.ilike.%${query}%,description.ilike.%${query}%`)
      .limit(20)
    
    if (!error) setArtworks(data || [])
  }
}
```

#### 4.2 实现分页加载
```tsx
const [page, setPage] = useState(1)
const [hasMore, setHasMore] = useState(true)

async function loadMore() {
  const { data, error } = await supabase
    .from('artworks')
    .select('*')
    .eq('status', 'approved')
    .order('created_at', { ascending: false })
    .range((page - 1) * 20, page * 20 - 1)
  
  if (!error && data) {
    setArtworks([...artworks, ...data])
    setPage(page + 1)
    if (data.length < 20) setHasMore(false)
  }
}
```

### 第五步：管理员功能

#### 5.1 创建管理员审核界面
创建 `src/app/admin/page.tsx`：

```tsx
export default function AdminPage() {
  const [submissions, setSubmissions] = useState([])
  
  useEffect(() => {
    fetchPendingSubmissions()
  }, [])
  
  async function fetchPendingSubmissions() {
    const { data } = await supabase
      .from('submissions')
      .select('*')
      .eq('status', 'pending')
      .order('created_at', { ascending: false })
    
    setSubmissions(data || [])
  }
  
  async function approveSubmission(id: string) {
    // 1. 更新投稿状态
    await supabase
      .from('submissions')
      .update({ status: 'approved' })
      .eq('id', id)
    
    // 2. 创建正式作品记录
    const submission = submissions.find(s => s.id === id)
    if (submission) {
      await supabase
        .from('artworks')
        .insert({
          museum_id: generateMuseumId(), // 自动生成PM编号
          title: submission.artwork_title,
          creator_name: submission.creator_name,
          medium: submission.medium,
          image_url: submission.image_url,
          status: 'approved',
          creator_id: submission.user_id
        })
    }
    
    // 3. 刷新列表
    fetchPendingSubmissions()
  }
  
  async function rejectSubmission(id: string, reason: string) {
    await supabase
      .from('submissions')
      .update({ status: 'rejected', admin_notes: reason })
      .eq('id', id)
    
    fetchPendingSubmissions()
  }
}
```

## 完整的代码修改清单

### 需要修改的文件：

1. **src/app/layout.tsx** - 添加 AuthProvider
2. **src/components/AuthModal.tsx** - 对接 Supabase Auth
3. **src/app/submit/page.tsx** - 实现真正的投稿功能
4. **src/app/collection/page.tsx** - 从数据库获取数据
5. **src/app/timeline/page.tsx** - 从数据库获取时间线
6. **src/app/community/page.tsx** - 从数据库获取社区内容
7. **src/app/my/page.tsx** - 显示用户相关内容

### 新增的文件：

1. **src/contexts/AuthContext.tsx** - 认证上下文（已创建）
2. **supabase-schema.sql** - 数据库初始化脚本（已创建）
3. **src/app/admin/page.tsx** - 管理员界面（待创建）

## 开发优先级建议

1. **第一阶段（1-2天）**：Supabase数据库配置和认证系统
2. **第二阶段（2-3天）**：投稿功能和动态数据展示
3. **第三阶段（3-4天）**：管理员功能和高级特性
4. **第四阶段（持续）**：优化和扩展

## 注意事项

1. **安全性**：确保所有RLS策略正确配置
2. **性能**：使用索引优化查询性能
3. **用户体验**：添加加载状态和错误处理
4. **测试**：每个功能完成后进行测试
5. **文档**：记录API和数据库结构

## 下一步行动

1. 执行 `supabase-schema.sql` 初始化数据库
2. 配置环境变量
3. 修改 `layout.tsx` 添加 AuthProvider
4. 修改 `AuthModal.tsx` 对接 Supabase Auth
5. 测试认证流程