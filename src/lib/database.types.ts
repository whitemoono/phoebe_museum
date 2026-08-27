export interface Profile {
  id: string
  username: string
  display_name: string | null
  avatar_url: string | null
  bio: string | null
  role: 'user' | 'admin'
  created_at: string
  updated_at: string
}

export interface Artwork {
  id: string
  museum_id: string // PM-000001
  title: string
  title_en: string | null
  title_ja: string | null
  description: string | null
  description_en: string | null
  description_ja: string | null
  creator_id: string
  medium: 'illustration' | 'ai_art' | 'comic' | '3d' | 'video' | 'sticker'
  category: string | null
  timeline_id: string | null
  timeline_type: 'human' | 'community'
  world_line: string | null
  year: string | null
  tags: string[]
  image_url: string
  thumbnail_url: string | null
  source_url: string | null
  status: 'pending' | 'approved' | 'rejected'
  collected_at: string | null
  created_at: string
  updated_at: string
}

export interface Timeline {
  id: string
  slug: string
  name: string
  name_en: string | null
  name_ja: string | null
  description: string | null
  description_en: string | null
  description_ja: string | null
  type: 'human' | 'community'
  era: string | null
  cover_image: string | null
  creator_id: string | null
  status: 'draft' | 'pending' | 'approved' | 'featured'
  artwork_count: number
  created_at: string
  updated_at: string
}

export interface Submission {
  id: string
  user_id: string
  artwork_title: string
  artwork_title_en: string | null
  creator_name: string
  medium: string
  timeline_id: string | null
  world_line: string | null
  description: string | null
  source_url: string | null
  image_url: string
  status: 'pending' | 'approved' | 'rejected'
  admin_notes: string | null
  created_at: string
  updated_at: string
}

export interface Favorite {
  id: string
  user_id: string
  artwork_id: string
  created_at: string
}
