'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { User, Session } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'
import type { Profile } from '@/lib/database.types'

interface AuthContextType {
  user: User | null
  profile: Profile | null
  session: Session | null
  loading: boolean
  signUp: (email: string, password: string, username: string) => Promise<{ error: any }>
  signIn: (email: string, password: string) => Promise<{ error: any }>
  signOut: () => Promise<void>
  updateProfile: (updates: Partial<Profile>) => Promise<{ error: any }>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 获取初始会话
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setUser(session?.user ?? null)
      if (session?.user) {
        fetchProfile(session.user.id)
      } else {
        setLoading(false)
      }
    })

    // 监听认证状态变化
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session)
        setUser(session?.user ?? null)
        
        if (session?.user) {
          await fetchProfile(session.user.id)
        } else {
          setProfile(null)
          setLoading(false)
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  async function fetchProfile(userId: string) {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()

      if (error) {
        console.error('Error fetching profile:', error)
        // 如果没有找到资料，创建一个默认的
        if (error.code === 'PGRST116') {
          await createDefaultProfile(userId)
        }
      } else {
        setProfile(data)
      }
    } catch (error) {
      console.error('Error fetching profile:', error)
    } finally {
      setLoading(false)
    }
  }

  async function createDefaultProfile(userId: string) {
    try {
      const { data: userData } = await supabase.auth.getUser()
      const email = userData.user?.email || ''
      const username = email.split('@')[0] || `user_${userId.slice(0, 8)}`
      
      const { data, error } = await supabase
        .from('profiles')
        .insert({
          id: userId,
          username: username,
          display_name: username,
          role: 'user'
        })
        .select()
        .single()

      if (error) {
        console.error('Error creating profile:', error)
      } else {
        setProfile(data)
      }
    } catch (error) {
      console.error('Error creating default profile:', error)
    }
  }

  async function signUp(email: string, password: string, username: string) {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username: username,
            display_name: username,
          }
        }
      })

      if (error) {
        return { error }
      }

      // 如果注册成功但需要邮箱验证
      if (data.user && !data.session) {
        return { error: null } // 需要邮箱验证
      }

      return { error: null }
    } catch (error) {
      return { error }
    }
  }

  async function signIn(email: string, password: string) {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      return { error }
    } catch (error) {
      return { error }
    }
  }

  async function signOut() {
    try {
      await supabase.auth.signOut()
      setProfile(null)
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  async function updateProfile(updates: Partial<Profile>) {
    try {
      if (!user) {
        return { error: new Error('用户未登录') }
      }

      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id)

      if (error) {
        return { error }
      }

      // 刷新资料
      await fetchProfile(user.id)
      return { error: null }
    } catch (error) {
      return { error }
    }
  }

  const value = {
    user,
    profile,
    session,
    loading,
    signUp,
    signIn,
    signOut,
    updateProfile,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}