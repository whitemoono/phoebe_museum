import { NextRequest, NextResponse } from 'next/server'
import { hashPassword, generateToken } from '@/lib/auth'
import prisma from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const { email, username, password } = await request.json()

    // 验证输入
    if (!email || !username || !password) {
      return NextResponse.json(
        { error: '邮箱、用户名和密码都是必填项' },
        { status: 400 }
      )
    }

    // 验证邮箱格式
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: '邮箱格式不正确' },
        { status: 400 }
      )
    }

    // 验证用户名长度
    if (username.length < 3 || username.length > 20) {
      return NextResponse.json(
        { error: '用户名长度必须在3-20个字符之间' },
        { status: 400 }
      )
    }

    // 验证密码长度
    if (password.length < 6) {
      return NextResponse.json(
        { error: '密码长度至少为6个字符' },
        { status: 400 }
      )
    }

    // 检查邮箱是否已存在
    const existingEmail = await prisma.user.findUnique({
      where: { email },
    })
    if (existingEmail) {
      return NextResponse.json(
        { error: '该邮箱已被注册' },
        { status: 409 }
      )
    }

    // 检查用户名是否已存在
    const existingUsername = await prisma.user.findUnique({
      where: { username },
    })
    if (existingUsername) {
      return NextResponse.json(
        { error: '该用户名已被使用' },
        { status: 409 }
      )
    }

    // 创建用户
    const hashedPassword = await hashPassword(password)
    const user = await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
        displayName: username,
        role: 'user',
      },
      select: {
        id: true,
        email: true,
        username: true,
        displayName: true,
        role: true,
      },
    })

    // 生成JWT令牌
    const token = generateToken(user)

    // 返回用户信息和令牌
    const response = NextResponse.json({
      user,
      token,
      message: '注册成功',
    })

    // 设置HTTP-only cookie
    response.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60, // 7天
    })

    return response
  } catch (error) {
    console.error('注册失败:', error)
    return NextResponse.json(
      { error: '注册失败，请重试' },
      { status: 500 }
    )
  }
}