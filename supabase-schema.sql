-- Phoebe Museum Supabase 数据库初始化脚本
-- 在 Supabase 控制台的 SQL Editor 中执行此脚本

-- 1. 启用必要的扩展
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. 创建 profiles 表（用户资料）
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  display_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. 创建 timelines 表（时间线）
CREATE TABLE IF NOT EXISTS timelines (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  name_en TEXT,
  name_ja TEXT,
  description TEXT,
  description_en TEXT,
  description_ja TEXT,
  type TEXT DEFAULT 'human' CHECK (type IN ('human', 'community')),
  era TEXT,
  cover_image TEXT,
  creator_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'pending', 'approved', 'featured')),
  artwork_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. 创建 artworks 表（作品）
CREATE TABLE IF NOT EXISTS artworks (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  museum_id TEXT UNIQUE NOT NULL, -- PM-000001 格式
  title TEXT NOT NULL,
  title_en TEXT,
  title_ja TEXT,
  description TEXT,
  description_en TEXT,
  description_ja TEXT,
  creator_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  medium TEXT DEFAULT 'illustration' CHECK (medium IN ('illustration', 'ai_art', 'comic', '3d', 'video', 'sticker')),
  category TEXT,
  timeline_id UUID REFERENCES timelines(id) ON DELETE SET NULL,
  timeline_type TEXT DEFAULT 'human' CHECK (timeline_type IN ('human', 'community')),
  world_line TEXT,
  year TEXT,
  tags TEXT[] DEFAULT '{}',
  image_url TEXT NOT NULL,
  thumbnail_url TEXT,
  source_url TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  collected_at DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. 创建 submissions 表（投稿）
CREATE TABLE IF NOT EXISTS submissions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  artwork_title TEXT NOT NULL,
  artwork_title_en TEXT,
  creator_name TEXT NOT NULL,
  medium TEXT NOT NULL,
  timeline_id UUID REFERENCES timelines(id) ON DELETE SET NULL,
  world_line TEXT,
  description TEXT,
  source_url TEXT,
  image_url TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  admin_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. 创建 favorites 表（收藏）
CREATE TABLE IF NOT EXISTS favorites (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  artwork_id UUID REFERENCES artworks(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, artwork_id)
);

-- 7. 创建索引以提高查询性能
CREATE INDEX IF NOT EXISTS idx_artworks_status ON artworks(status);
CREATE INDEX IF NOT EXISTS idx_artworks_medium ON artworks(medium);
CREATE INDEX IF NOT EXISTS idx_artworks_timeline_id ON artworks(timeline_id);
CREATE INDEX IF NOT EXISTS idx_artworks_creator_id ON artworks(creator_id);
CREATE INDEX IF NOT EXISTS idx_artworks_created_at ON artworks(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_submissions_user_id ON submissions(user_id);
CREATE INDEX IF NOT EXISTS idx_submissions_status ON submissions(status);
CREATE INDEX IF NOT EXISTS idx_favorites_user_id ON favorites(user_id);
CREATE INDEX IF NOT EXISTS idx_favorites_artwork_id ON favorites(artwork_id);
CREATE INDEX IF NOT EXISTS idx_timelines_status ON timelines(status);
CREATE INDEX IF NOT EXISTS idx_timelines_type ON timelines(type);

-- 8. 设置 RLS（行级安全）策略
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE artworks ENABLE ROW LEVEL SECURITY;
ALTER TABLE timelines ENABLE ROW LEVEL SECURITY;
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;

-- profiles 表策略：用户可以查看所有资料，但只能修改自己的
CREATE POLICY "Profiles are viewable by everyone" ON profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- artworks 表策略：所有人可以查看已批准的作品，用户可以创建作品（待审核）
CREATE POLICY "Approved artworks are viewable by everyone" ON artworks
  FOR SELECT USING (status = 'approved' OR auth.uid() = creator_id);

CREATE POLICY "Users can create artworks" ON artworks
  FOR INSERT WITH CHECK (auth.uid() = creator_id);

CREATE POLICY "Users can update own artworks" ON artworks
  FOR UPDATE USING (auth.uid() = creator_id);

-- timelines 表策略：所有人可以查看已批准的时间线，用户可以创建社区时间线
CREATE POLICY "Approved timelines are viewable by everyone" ON timelines
  FOR SELECT USING (status IN ('approved', 'featured') OR auth.uid() = creator_id);

CREATE POLICY "Users can create community timelines" ON timelines
  FOR INSERT WITH CHECK (type = 'community' AND auth.uid() = creator_id);

CREATE POLICY "Users can update own timelines" ON timelines
  FOR UPDATE USING (auth.uid() = creator_id);

-- submissions 表策略：用户可以查看自己的投稿
CREATE POLICY "Users can view own submissions" ON submissions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create submissions" ON submissions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- favorites 表策略：用户可以管理自己的收藏
CREATE POLICY "Users can view own favorites" ON favorites
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create favorites" ON favorites
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own favorites" ON favorites
  FOR DELETE USING (auth.uid() = user_id);

-- 9. 创建自动更新 updated_at 的触发器
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_artworks_updated_at
  BEFORE UPDATE ON artworks
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_timelines_updated_at
  BEFORE UPDATE ON timelines
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_submissions_updated_at
  BEFORE UPDATE ON submissions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 10. 创建自动创建用户资料的触发器
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, username, display_name)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'username', 'user_' || substr(NEW.id::text, 1, 8)),
    COALESCE(NEW.raw_user_meta_data->>'display_name', '')
  );
  RETURN NEW;
END;
$$ language 'plpgsql' security definer;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- 11. 创建存储桶（用于图片上传）
INSERT INTO storage.buckets (id, name, public)
VALUES ('artworks', 'artworks', true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO storage.buckets (id, name, public)
VALUES ('avatars', 'avatars', true)
ON CONFLICT (id) DO NOTHING;

-- 12. 设置存储桶策略
CREATE POLICY "Anyone can view artwork images" ON storage.objects
  FOR SELECT USING (bucket_id = 'artworks');

CREATE POLICY "Authenticated users can upload artwork images" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'artworks' 
    AND auth.role() = 'authenticated'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );

CREATE POLICY "Anyone can view avatars" ON storage.objects
  FOR SELECT USING (bucket_id = 'avatars');

CREATE POLICY "Authenticated users can upload avatars" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'avatars' 
    AND auth.role() = 'authenticated'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );

-- 13. 插入示例数据（可选）
-- 注意：在生产环境中，应该通过应用层插入数据

-- 示例时间线
INSERT INTO timelines (slug, name, name_en, description, type, era, status)
VALUES 
  ('digital-art-renaissance', '数字文艺复兴', 'Digital Art Renaissance', '当经典艺术遇见数字技术', 'human', '2020s', 'approved'),
  ('character-design-golden', '角色设计黄金期', 'Character Design Golden Age', '角色设计艺术的巅峰时期', 'human', '2020s', 'approved'),
  ('ai-art-exploration', 'AI 艺术探索', 'AI Art Exploration', '人工智能与艺术的碰撞', 'human', '2020s', 'approved'),
  ('community-creations', '社区创作', 'Community Creations', '来自社区的精彩创作', 'community', NULL, 'approved')
ON CONFLICT (slug) DO NOTHING;

-- 完成提示
SELECT 'Phoebe Museum 数据库初始化完成！' AS message;