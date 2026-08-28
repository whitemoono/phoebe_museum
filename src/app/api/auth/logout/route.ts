import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const response = NextResponse.json({
      message: '登出成功',
    })

    // 清除auth-token cookie
    response.cookies.set('auth-token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 0, // 立即过期
    })

    return response
  } catch (error) {
    console.error('登出失败:', error)
    return NextResponse.json(
      { error: '登出失败' },
      { status: 500 }
    )
  }
}