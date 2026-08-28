import { NextRequest, NextResponse } from 'next/server'
import { getUserFromRequest } from '@/lib/auth'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { v4 as uuidv4 } from 'uuid'

export async function POST(request: NextRequest) {
  try {
    const user = await getUserFromRequest(request)
    if (!user) {
      return NextResponse.json(
        { error: '请先登录' },
        { status: 401 }
      )
    }

    const formData = await request.formData()
    const file = formData.get('file') as File
    
    if (!file) {
      return NextResponse.json(
        { error: '请选择文件' },
        { status: 400 }
      )
    }

    // 验证文件类型
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: '只支持 JPG、PNG、GIF、WebP 格式的图片' },
        { status: 400 }
      )
    }

    // 验证文件大小（最大10MB）
    const maxSize = 10 * 1024 * 1024
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: '文件大小不能超过10MB' },
        { status: 400 }
      )
    }

    // 生成文件名
    const fileExtension = file.name.split('.').pop()
    const fileName = `${uuidv4()}.${fileExtension}`
    
    // 创建上传目录
    const uploadDir = process.env.UPLOAD_DIR || './public/uploads'
    const artworkDir = join(uploadDir, 'artworks')
    
    try {
      await mkdir(artworkDir, { recursive: true })
    } catch (error) {
      // 目录已存在
    }

    // 保存文件
    const filePath = join(artworkDir, fileName)
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    
    await writeFile(filePath, buffer)

    // 返回文件URL
    const imageUrl = `/uploads/artworks/${fileName}`

    return NextResponse.json({
      imageUrl,
      fileName,
      message: '文件上传成功',
    })
  } catch (error) {
    console.error('文件上传失败:', error)
    return NextResponse.json(
      { error: '文件上传失败' },
      { status: 500 }
    )
  }
}