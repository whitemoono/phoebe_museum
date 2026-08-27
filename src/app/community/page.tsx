'use client'

import Link from 'next/link'
import { t } from '@/lib/i18n'
import { useState, useEffect } from 'react'

export default function CommunityPage() {
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

  const discussions = [
    { user: 'PhoebeFan01', content: { zh: '最近画的赛博菲比，大家觉得怎么样？', en: 'My latest Cyber Phoebe, what do you think?', ja: '最近描いたサイバーフィービー、どう思う？' }, likes: 24, replies: 8, time: '2h' },
    { user: 'ArtistK', content: { zh: '有没有人想一起合作画一组菲比表情包？', en: 'Anyone want to collaborate on Phoebe stickers?', ja: '一緒にフィービースタンプを作らない？' }, likes: 15, replies: 12, time: '5h' },
    { user: 'MuseumFan', content: { zh: '建议增加一个「随机漫游」功能，每次刷新看到不同的作品', en: 'Suggestion: add a random browsing feature', ja: '提案：ランダム閲覧機能を追加してほしい' }, likes: 42, replies: 23, time: '1d' },
    { user: 'DigitalArt', content: { zh: '分享一下我用AI生成的古风菲比系列', en: 'Sharing my AI-generated traditional Phoebe series', ja: 'AIで作った伝統的なフィービーシェア' }, likes: 31, replies: 15, time: '3h' },
  ]

  return (
    <main>
      <section style={{ paddingTop: 100, paddingBottom: 40 }}>
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 5vw' }}>
          <div className="section-head">
            <div><div className="kicker">{t('社区', 'COMMUNITY', 'コミュニティ', lang)}</div><h2 className="section-title">{t('菲比社区', 'Phoebe Community', 'フィービーコミュニティ', lang)}</h2></div>
            <p>{t('讨论、分享、发现更多菲比', 'Discuss, share, discover more Phoebe', '議論、共有、もっとフィービーを発見', lang)}</p>
          </div>
        </div>
      </section>

      {/* Discussions */}
      <section style={{ paddingBottom: 80 }}>
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 5vw' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {discussions.map((d, i) => (
              <div key={i} style={{ padding: 24, background: 'var(--card)', border: '1px solid var(--line)', borderRadius: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--bg3)', display: 'grid', placeItems: 'center', fontSize: 14, color: 'var(--gold)' }}>{d.user[0]}</div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--paper)' }}>{d.user}</div>
                      <div style={{ fontSize: 11, color: 'var(--muted)' }}>{d.time}</div>
                    </div>
                  </div>
                </div>
                <p style={{ fontSize: 14, color: 'var(--paper)', lineHeight: 1.6, marginBottom: 16 }}>{t(d.content.zh, d.content.en, d.content.ja, lang)}</p>
                <div style={{ display: 'flex', gap: 16 }}>
                  <button style={{ background: 'transparent', border: 'none', color: 'var(--muted)', fontSize: 12, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}>♥ {d.likes}</button>
                  <button style={{ background: 'transparent', border: 'none', color: 'var(--muted)', fontSize: 12, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}>↩ {d.replies}</button>
                </div>
              </div>
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
