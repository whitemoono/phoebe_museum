import { NextRequest } from 'next/server'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import prisma from './prisma'

const JWT_SECRET = process.env.JWT_SECRET || 'your-jwt-secret-key-change-in-production'

export interface AuthUser {
  id: string
  email: string
  username: string
  role: string
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12)
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword)
}

export function generateToken(user: AuthUser): string {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
      role: user.role,
    },
    JWT_SECRET,
    { expiresIn: '7d' }
  )
}

export function verifyToken(token: string): AuthUser | null {
  try {
    return jwt.verify(token, JWT_SECRET) as AuthUser
  } catch {
    return null
  }
}

export async function getUserFromRequest(request: NextRequest): Promise<AuthUser | null> {
  const token = request.headers.get('authorization')?.replace('Bearer ', '') ||
                request.cookies.get('auth-token')?.value

  if (!token) return null

  const user = verifyToken(token)
  if (!user) return null

  // 验证用户是否存在
  const dbUser = await prisma.user.findUnique({
    where: { id: user.id },
    select: { id: true, email: true, username: true, role: true },
  })

  return dbUser
}

export async function requireAuth(request: NextRequest): Promise<AuthUser> {
  const user = await getUserFromRequest(request)
  if (!user) {
    throw new Error('Unauthorized')
  }
  return user
}

export async function requireAdmin(request: NextRequest): Promise<AuthUser> {
  const user = await requireAuth(request)
  if (user.role !== 'admin') {
    throw new Error('Forbidden')
  }
  return user
}