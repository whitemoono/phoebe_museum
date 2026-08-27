'use client'

import Link from 'next/link'
import { t } from '@/lib/i18n'
import { useState, useEffect } from 'react'

export default function ExhibitionsPage() {
  const [lang, setLang] = useState('zh')

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

  const officialExhibitions = [
    { title: { zh: '人类时间线', en: 'Human Timeline', ja: 'ヒューマンタイムライン' }, count: 130, desc: { zh: '从史前洞穴壁画到现代数字艺术，菲比穿越人类艺术史的旅程', en: 'Phoebe through the history of art', ja: '芸術史を巡るフィービーの旅' }, gradient: 'linear-gradient(135deg, #1a2a3a, #0a1a2a)' },
    { title: { zh: '中国文明主题展', en: 'Chinese Civilization', ja: '中国文明展' }, count: 57, desc: { zh: '新石器到明清，东方美学的菲比', en: 'Eastern aesthetics of Phoebe', ja: '東洋美学のフィービー' }, gradient: 'linear-gradient(135deg, #3a2a1a, #2a1a0a)' },
    { title: { zh: '日本风情展', en: 'Japanese Style', ja: '日本风情展' }, count: 42, desc: { zh: '浮世绘到现代动漫，和风菲比', en: 'Japanese style Phoebe', ja: '和風フィービー' }, gradient: 'linear-gradient(135deg, #c47088, #8b4060)' },
  ]

  const communityExhibitions = [
    { title: { zh: '帽子主题', en: 'Hat Theme', ja: '帽子テーマ' }, count: 24, creator: 'Community' },
    { title: { zh: '金发菲比', en: 'Blonde Phoebe', ja: '金髪フィービー' }, count: 18, creator: 'Community' },
    { title: { zh: '海洋主题', en: 'Ocean Theme', ja: '海テーマ' }, count: 31, creator: 'Community' },
    { title: { zh: '废土风格', en: 'Wasteland Style', ja: '廃土スタイル' }, count: 15, creator: 'Community' },
  ]

  return (
    <main>
      <section style={{ paddingTop: 100, paddingBottom: 40 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 5vw' }}>
          <div className="section-head">
            <div><div className="kicker">{t('专题展览', 'EXHIBITIONS', '展覧会', lang)}</div><h2 className="section-title">{t('正在展出', 'NOW EXHIBITING', '展示中', lang)}</h2></div>
            <p>{t('官方策展与社区精选，每一场都值得探索', 'Official and community curated, each worth exploring', '公式キュレーションとコミュニティセレクト、それぞれが探る価値あり', lang)}</p>
          </div>
        </div>
      </section>

      {/* Official Exhibitions */}
      <section style={{ paddingBottom: 60 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 5vw' }}>
          <h3 style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: '1.3rem', marginBottom: 24, color: 'var(--gold)' }}>{t('官方展览', 'Official Exhibitions', '公式展', lang)}</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
            {officialExhibitions.map((exh, i) => (
              <Link key={i} href="/exhibitions" style={{ display: 'block', borderRadius: 16, overflow: 'hidden', border: '1px solid var(--line)', background: 'var(--card)', transition: 'all 0.3s' }}>
                <div style={{ height: 200, background: exh.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: '2rem', fontWeight: 700, color: 'rgba(255,255,255,0.2)' }}>{exh.count}</div>
                </div>
                <div style={{ padding: 24 }}>
                  <div style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: '1.3rem', fontWeight: 600, marginBottom: 8 }}>{t(exh.title.zh, exh.title.en, exh.title.ja, lang)}</div>
                  <div style={{ fontSize: 13, color: 'var(--muted)' }}>{t(exh.desc.zh, exh.desc.en, exh.desc.ja, lang)}</div>
                  <div style={{ fontSize: 12, color: 'var(--gold)', marginTop: 12 }}>{exh.count} {t('件作品', 'works', '作品', lang)}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Community Exhibitions */}
      <section style={{ paddingBottom: 80, background: 'var(--bg2)', padding: '60px 0' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 5vw' }}>
          <h3 style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: '1.3rem', marginBottom: 24, color: 'var(--gold)' }}>{t('社区策展', 'Community Curated', 'コミュニティキュレーション', lang)}</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 16 }}>
            {communityExhibitions.map((exh, i) => (
              <Link key={i} href="/exhibitions" style={{ padding: 24, background: 'var(--card)', border: '1px solid var(--line)', borderRadius: 12, transition: 'all 0.3s' }}>
                <div style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: '1.1rem', fontWeight: 600, marginBottom: 8 }}>{t(exh.title.zh, exh.title.en, exh.title.ja, lang)}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 12, color: 'var(--muted)' }}>{exh.creator}</span>
                  <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--gold)' }}>{exh.count}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <footer className="footer">
        <div><strong>PHOEBE MUSEUM</strong>{t('每一个菲比，都值得被记住。', 'EVERY PHOEBE DESERVES TO BE REMEMBERED.', 'すべてのフィービーは記憶に値します。', lang)}</div>
        <div>© 2026 PHOEBE MUSEUM · FAN ART DIGITAL ARCHIVE</div>
      </footer>
    </main>
  )
}
