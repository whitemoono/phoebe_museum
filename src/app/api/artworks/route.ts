import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { getUserFromRequest } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const medium = searchParams.get('medium')
    const timeline = searchParams.get('timeline')
    const search = searchParams.get('search')
    const status = searchParams.get('status') || 'approved'

    const skip = (page - 1) * limit

    // 构建查询条件
    const where: any = {
      status: status,
    }

    if (medium) {
      where.medium = medium
    }

    if (timeline) {
      where.timelineId = timeline
    }

    if (search) {
      where.OR = [
        { title: { contains: search } },
        { description: { contains: search } },
        { tags: { contains: search } },
      ]
    }

    // 获取作品列表
    const [artworks, total] = await Promise.all([
      prisma.artwork.findMany({
        where,
        include: {
          creator: {
            select: {
              id: true,
              username: true,
              displayName: true,
              avatarUrl: true,
            },
          },
          timeline: {
            select: {
              id: true,
              name: true,
              slug: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.artwork.count({ where }),
    ])

    // 处理tags字段（从JSON字符串转换为数组）
    const processedArtworks = artworks.map(artwork => ({
      ...artwork,
      tags: JSON.parse(artwork.tags || '[]'),
    }))

    return NextResponse.json({
      artworks: processedArtworks,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('获取作品列表失败:', error)
    return NextResponse.json(
      { error: '获取作品列表失败' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getUserFromRequest(request)
    if (!user) {
      return NextResponse.json(
        { error: '请先登录' },
        { status: 401 }
      )
    }

    const data = await request.json()
    
    // 生成博物馆ID
    const lastArtwork = await prisma.artwork.findFirst({
      orderBy: { museumId: 'desc' },
    })
    
    let nextNumber = 1
    if (lastArtwork) {
      const lastNumber = parseInt(lastArtwork.museumId.replace('PM-', ''))
      nextNumber = lastNumber + 1
    }
    
    const museumId = `PM-${nextNumber.toString().padStart(6, '0')}`

    // 创建作品
    const artwork = await prisma.artwork.create({
      data: {
        museumId,
        title: data.title,
        titleEn: data.titleEn,
        titleJa: data.titleJa,
        description: data.description,
        descriptionEn: data.descriptionEn,
        descriptionJa: data.descriptionJa,
        creatorId: user.id,
        medium: data.medium || 'illustration',
        category: data.category,
        timelineId: data.timelineId,
        timelineType: data.timelineType || 'human',
        worldLine: data.worldLine,
        year: data.year,
        tags: JSON.stringify(data.tags || []),
        imageUrl: data.imageUrl,
        thumbnailUrl: data.thumbnailUrl,
        sourceUrl: data.sourceUrl,
        status: 'pending',
        collectedAt: data.collectedAt ? new Date(data.collectedAt) : null,
      },
      include: {
        creator: {
          select: {
            id: true,
            username: true,
            displayName: true,
            avatarUrl: true,
          },
        },
        timeline: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
      },
    })

    return NextResponse.json({
      artwork,
      message: '作品创建成功，等待审核',
    }, { status: 201 })
  } catch (error) {
    console.error('创建作品失败:', error)
    return NextResponse.json(
      { error: '创建作品失败' },
      { status: 500 }
    )
  }
}