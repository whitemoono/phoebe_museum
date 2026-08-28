import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 开始初始化数据库...')

  // 创建管理员用户
  const adminPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'admin123456', 12)
  const admin = await prisma.user.upsert({
    where: { email: process.env.ADMIN_EMAIL || 'admin@phoebe-museum.com' },
    update: {},
    create: {
      email: process.env.ADMIN_EMAIL || 'admin@phoebe-museum.com',
      username: process.env.ADMIN_USERNAME || 'admin',
      password: adminPassword,
      displayName: '管理员',
      role: 'admin',
    },
  })
  console.log(`✅ 管理员用户创建成功: ${admin.email}`)

  // 创建示例时间线
  const timelines = await Promise.all([
    prisma.timeline.upsert({
      where: { slug: 'digital-art-renaissance' },
      update: {},
      create: {
        slug: 'digital-art-renaissance',
        name: '数字文艺复兴',
        nameEn: 'Digital Art Renaissance',
        description: '当经典艺术遇见数字技术，创造出前所未有的视觉体验。',
        type: 'human',
        era: '2020s',
        status: 'approved',
      },
    }),
    prisma.timeline.upsert({
      where: { slug: 'character-design-golden' },
      update: {},
      create: {
        slug: 'character-design-golden',
        name: '角色设计黄金期',
        nameEn: 'Character Design Golden Age',
        description: '角色设计艺术的巅峰时期，无数经典角色诞生。',
        type: 'human',
        era: '2020s',
        status: 'approved',
      },
    }),
    prisma.timeline.upsert({
      where: { slug: 'ai-art-exploration' },
      update: {},
      create: {
        slug: 'ai-art-exploration',
        name: 'AI 艺术探索',
        nameEn: 'AI Art Exploration',
        description: '人工智能与艺术的碰撞，探索创作的无限可能。',
        type: 'human',
        era: '2020s',
        status: 'approved',
      },
    }),
    prisma.timeline.upsert({
      where: { slug: 'community-creations' },
      update: {},
      create: {
        slug: 'community-creations',
        name: '社区创作',
        nameEn: 'Community Creations',
        description: '来自社区的精彩创作，展现无限创意。',
        type: 'community',
        status: 'approved',
      },
    }),
  ])
  console.log(`✅ 时间线创建成功: ${timelines.length} 个`)

  // 创建示例作品
  const artworks = await Promise.all([
    prisma.artwork.upsert({
      where: { museumId: 'PM-000001' },
      update: {},
      create: {
        museumId: 'PM-000001',
        title: '数字星夜',
        titleEn: 'Digital Starry Night',
        description: '致敬梵高的数字艺术作品',
        creatorId: admin.id,
        medium: 'illustration',
        category: '数字绘画',
        timelineId: timelines[0].id,
        timelineType: 'human',
        tags: '["致敬", "星空", "数字艺术"]',
        imageUrl: '/uploads/artworks/PM-000001.jpg',
        status: 'approved',
        collectedAt: new Date('2024-01-15'),
      },
    }),
    prisma.artwork.upsert({
      where: { museumId: 'PM-000002' },
      update: {},
      create: {
        museumId: 'PM-000002',
        title: '赛博朋克少女',
        titleEn: 'Cyberpunk Girl',
        description: '未来世界的少女形象',
        creatorId: admin.id,
        medium: 'illustration',
        category: '角色设计',
        timelineId: timelines[1].id,
        timelineType: 'human',
        tags: '["赛博朋克", "角色设计", "未来"]',
        imageUrl: '/uploads/artworks/PM-000002.jpg',
        status: 'approved',
        collectedAt: new Date('2024-02-20'),
      },
    }),
    prisma.artwork.upsert({
      where: { museumId: 'PM-000003' },
      update: {},
      create: {
        museumId: 'PM-000003',
        title: '梦境守护者',
        titleEn: 'Dream Guardian',
        description: '守护梦境的神秘存在',
        creatorId: admin.id,
        medium: 'illustration',
        category: '插画',
        timelineId: timelines[1].id,
        timelineType: 'human',
        tags: '["梦境", "守护者", "奇幻"]',
        imageUrl: '/uploads/artworks/PM-000003.jpg',
        status: 'approved',
        collectedAt: new Date('2024-03-10'),
      },
    }),
  ])
  console.log(`✅ 示例作品创建成功: ${artworks.length} 个`)

  // 创建上传目录
  const fs = require('fs')
  const uploadDir = process.env.UPLOAD_DIR || './public/uploads'
  const dirs = [
    uploadDir,
    `${uploadDir}/artworks`,
    `${uploadDir}/avatars`,
    `${uploadDir}/temp`,
  ]
  
  dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
      console.log(`📁 创建目录: ${dir}`)
    }
  })

  console.log('🎉 数据库初始化完成！')
}

main()
  .catch((e) => {
    console.error('❌ 数据库初始化失败:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })