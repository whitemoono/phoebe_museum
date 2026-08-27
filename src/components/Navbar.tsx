'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const navItems = [
  { href: '/', label: '首页', labelEn: 'HOME', labelJa: 'ホーム' },
  { href: '/collection', label: '馆藏', labelEn: 'COLLECTION', labelJa: 'コレクション' },
  { href: '/timeline/human', label: '人类时间线', labelEn: 'HUMAN TIMELINE', labelJa: 'ヒューマンタイムライン' },
  { href: '/timeline/community', label: '社区世界线', labelEn: 'COMMUNITY', labelJa: 'コミュニティ' },
  { href: '/creators', label: '创作者', labelEn: 'CREATORS', labelJa: 'クリエイター' },
  { href: '/my', label: '我的博物馆', labelEn: 'MY MUSEUM', labelJa: 'マイミュージアム' },
  { href: '/admin', label: '管理后台', labelEn: 'ADMIN', labelJa: '管理画面' },
]

export default function Navbar() {
  const [lang, setLang] = useState<'zh' | 'en' | 'ja'>('zh')
  const [isScrolled, setIsScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('phoebe-lang') as 'zh' | 'en' | 'ja' | null
    if (saved) setLang(saved)
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60)
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLangChange = (newLang: 'zh' | 'en' | 'ja') => {
    setLang(newLang)
    localStorage.setItem('phoebe-lang', newLang)
    document.documentElement.lang = newLang === 'zh' ? 'zh-CN' : newLang
  }

  const getLabel = (item: typeof navItems[0]) => {
    switch (lang) {
      case 'en': return item.labelEn
      case 'ja': return item.labelJa
      default: return item.label
    }
  }

  return (
    <header
      className={ixed top-4 left-1/2 -translate-x-1/2 w-[calc(100%-48px)] max-w-[1400px] h-16 rounded-[20px] flex items-center px-7 z-[1000] transition-all duration-400 }
      style={{
        backdropFilter: 'blur(30px) saturate(150%)',
        WebkitBackdropFilter: 'blur(30px) saturate(150%)',
        border: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      {/* Logo */}
      <Link href="/" className="font-serif text-xl font-bold tracking-[0.15em] text-[rgba(255,255,255,0.95)] w-[200px] flex items-center gap-3 shrink-0">
        PHOEBE MUSEUM
        <span className="inline font-['Noto_Serif_SC',serif] text-[10px] tracking-[0.25em] text-[rgba(255,255,255,0.6)] font-normal">
          {lang === 'zh' ? '菲比博物馆' : lang === 'ja' ? 'フィービー博物館' : ''}
        </span>
      </Link>

      {/* Nav Links */}
      <nav className={lex gap-1 items-center justify-center flex-1 }>
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="text-[11px] font-medium tracking-[0.06em] text-[rgba(255,255,255,0.65)] px-3 py-2 rounded-[10px] hover:text-[rgba(255,255,255,0.95)] hover:bg-[rgba(255,255,255,0.08)] transition-all whitespace-nowrap"
            onClick={() => setIsOpen(false)}
          >
            {getLabel(item)}
          </Link>
        ))}
      </nav>

      {/* Right Side */}
      <div className="flex items-center gap-3 w-[200px] justify-end shrink-0">
        <Link
          href="/submit"
          className="px-4 py-2 bg-gradient-to-r from-[rgba(216,164,71,0.6)] to-[rgba(242,191,88,0.7)] text-[rgba(255,255,255,0.95)] text-[10px] font-semibold tracking-[0.08em] rounded-[10px] border border-[rgba(216,164,71,0.3)] hover:from-[rgba(242,191,88,0.8)] hover:to-[rgba(216,164,71,0.9)] transition-all shadow-[0_2px_8px_rgba(216,164,71,0.15)]"
        >
          {lang === 'zh' ? '投稿作品 ↗' : lang === 'ja' ? '投稿 ↗' : 'SUBMIT ↗'}
        </Link>

        {/* Language Switcher */}
        <div className="flex gap-0.5 bg-[rgba(255,255,255,0.04)] rounded-lg p-[3px] border border-[rgba(255,255,255,0.06)]">
          {(['zh', 'en', 'ja'] as const).map((l) => (
            <button
              key={l}
              onClick={() => handleLangChange(l)}
              className={px-2 py-1 text-[10px] font-medium rounded-md transition-all }
            >
              {l === 'zh' ? '中' : l === 'en' ? 'EN' : '日'}
            </button>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden w-10 h-10 bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.08)] text-[rgba(255,255,255,0.8)] text-lg rounded-[10px] flex items-center justify-center"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? '✕' : '☰'}
        </button>
      </div>
    </header>
  )
}
