'use client'

import Link from 'next/link'
import { t } from '@/lib/i18n'
import { useState, useEffect } from 'react'

const allWorks = [
  { id: 'PM-000001', title: '海上菲比', en: 'PHOEBE ON THE WILD SEA', ja: '海のフィービー', medium: 'illustration', gradient: 'linear-gradient(135deg, #edb348, #79211d)' },
  { id: 'PM-000002', title: '荒原航线', en: 'WILDERNESS ROUTE', ja: '荒野航路', medium: 'illustration', gradient: 'linear-gradient(135deg, #221735, #1a0a2e)' },
  { id: 'PM-000003', title: '深海来信', en: 'OCEAN WORLD', ja: '深海からの手紙', medium: 'illustration', gradient: 'linear-gradient(135deg, #0a2e1a, #1a3a2a)' },
  { id: 'PM-000004', title: '霓虹之下', en: 'UNDER NEON', ja: 'ネオンの下で', medium: '3d', gradient: 'linear-gradient(135deg, #0a1a3a, #1a0a2a)' },
  { id: 'PM-000005', title: '校园午后', en: 'SCHOOL AFTERNOON', ja: '学園の午後', medium: 'illustration', gradient: 'linear-gradient(135deg, #3a2a1a, #2a1a0a)' },
  { id: 'PM-000006', title: '未知档案', en: 'UNKNOWN ARCHIVE', ja: '未知のアーカイブ', medium: 'mixed', gradient: 'linear-gradient(135deg, #1a1a2a, #0a0a1a)' },
  { id: 'PM-000007', title: '沙漠旅人', en: 'DESERT TRAVELER', ja: '砂漠の旅人', medium: 'illustration', gradient: 'linear-gradient(135deg, #c4935a, #8b6b3a)' },
  { id: 'PM-000008', title: '月夜狐', en: 'MOON FOX', ja: '月夜の狐', medium: 'illustration', gradient: 'linear-gradient(135deg, #1a1a3a, #2a2a5a)' },
  { id: 'PM-000009', title: '樱花季', en: 'SAKURA SEASON', ja: '桜の季節', medium: 'illustration', gradient: 'linear-gradient(135deg, #e8a0b4, #c47088)' },
  { id: 'PM-000010', title: '机械之心', en: 'MECHANICAL HEART', ja: '機械の心', medium: '3d', gradient: 'linear-gradient(135deg, #4a4a6a, #2a2a4a)' },
  { id: 'PM-000011', title: '水墨丹青', en: 'INK PAINTING', ja: '水墨画', medium: 'illustration', gradient: 'linear-gradient(135deg, #f5f0e8, #d4c8b0)' },
  { id: 'PM-000012', title: '像素世界', en: 'PIXEL WORLD', ja: 'ピクセルワールド', medium: 'illustration', gradient: 'linear-gradient(135deg, #2a4a2a, #1a3a1a)' },
]

export default function DiscoverPage() {
  const [lang, setLang] = useState('zh')
  const [filter, setFilter] = useState('all')
  const [sort, setSort] = useState('random')
  const [works, setWorks] = useState(allWorks)

  useEffect(() => {
    const saved = localStorage.getItem('phoebe-lang')
    if (saved && ['zh', 'en', 'ja'].includes(saved)) setLang(saved)
    const handler = () => {
      const l = localStorage.getItem('phoebe-lang') || 'zh'
      setLang(l)
    }
    window.addEventListener('langChange', handler)
    return () => window.removeEventListener('langChange', handler)
  }, [])

  useEffect(() => {
    let filtered = filter === 'all' ? allWorks : allWorks.filter(w => w.medium === filter)
    if (sort === 'random') {
      filtered = [...filtered].sort(() => Math.random() - 0.5)
    }
    setWorks(filtered)
  }, [filter, sort])

  const mediums = [
    { key: 'all', zh: '全部', en: 'ALL', ja: 'すべて' },
    { key: 'illustration', zh: '插画', en: 'ILLUSTRATION', ja: 'イラスト' },
    { key: '3d', zh: '3D', en: '3D', ja: '3D' },
    { key: 'comic', zh: '漫画', en: 'COMIC', ja: 'コミック' },
    { key: 'ai', zh: 'AI', en: 'AI', ja: 'AI' },
    { key: 'video', zh: '视频', en: 'VIDEO', ja: '動画' },
  ]

  return (
    <main>
      <section style={{ paddingTop: 100, paddingBottom: 20 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 5vw' }}>
          <div className="section-head">
            <div><div className="kicker">{t('发现作品', 'DISCOVER', 'ディスカバー', lang)}</div><h2 className="section-title">{t('探索菲比宇宙', 'Explore the Phoebe Universe', 'フィービーユニバースを探索', lang)}</h2></div>
          </div>
          
          {/* Filters */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
            {mediums.map(m => (
              <button
                key={m.key}
                onClick={() => setFilter(m.key)}
                style={{
                  padding: '8px 16px',
                  background: filter === m.key ? 'var(--gold)' : 'var(--card)',
                  color: filter === m.key ? 'var(--ink)' : 'var(--muted)',
                  border: '1px solid var(--line)',
                  borderRadius: 100,
                  fontSize: 12,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                {t(m.zh, m.en, m.ja, lang)}
              </button>
            ))}
          </div>

          {/* Sort */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
            {[
              { key: 'random', zh: '随机', en: 'RANDOM', ja: 'ランダム' },
              { key: 'new', zh: '最新', en: 'NEW', ja: '最新' },
              { key: 'hot', zh: '热门', en: 'HOT', ja: '人気' },
            ].map(s => (
              <button
                key={s.key}
                onClick={() => setSort(s.key)}
                style={{
                  padding: '6px 12px',
                  background: sort === s.key ? 'rgba(184,134,11,0.1)' : 'transparent',
                  color: sort === s.key ? 'var(--gold)' : 'var(--muted)',
                  border: 'none',
                  borderRadius: 8,
                  fontSize: 11,
                  cursor: 'pointer',
                }}
              >
                {t(s.zh, s.en, s.ja, lang)}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Masonry Grid */}
      <section style={{ padding: '0 5vw 80px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', columns: 'clamp(200px, 25vw, 280px)', columnGap: 16 }}>
          {works.map((work, i) => (
            <Link
              key={work.id}
              href={'/artwork/' + work.id}
              style={{ display: 'block', marginBottom: 16, breakInside: 'avoid', borderRadius: 12, overflow: 'hidden', border: '1px solid var(--line)', background: 'var(--card)' }}
            >
              <div style={{ height: 180 + (i % 3) * 60, background: work.gradient }}></div>
              <div style={{ padding: '12px 16px' }}>
                <div style={{ fontSize: 9, letterSpacing: '0.15em', color: 'var(--gold)', marginBottom: 4 }}>{work.id}</div>
                <div style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: '1.1rem', fontWeight: 600 }}>{t(work.title, work.en, work.ja, lang)}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <footer className="footer">
        <div><strong>PHOEBE MUSEUM</strong>{t('每一个菲比，都值得被记住。', 'EVERY PHOEBE DESERVES TO BE REMEMBERED.', 'すべてのフィービーは記憶に値します。', lang)}</div>
        <div>© 2026 PHOEBE MUSEUM · FAN ART DIGITAL ARCHIVE</div>
      </footer>
    </main>
  )
}
