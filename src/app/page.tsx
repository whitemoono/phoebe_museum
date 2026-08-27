'use client'

import Link from 'next/link'
import { t } from '@/lib/i18n'
import { useState, useEffect } from 'react'

export default function Home() {
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

  return (
    <main>
      {/* Hero Section */}
      <section className="hero" id="home">
        <div className="hero-image"></div>
        <div className="scroll-cue">{t('向下滚动探索', 'SCROLL TO EXPLORE', 'スクロールして探索', lang)} ↓</div>
        <div className="hero-content">
          <div className="eyebrow">{t('当前展览', 'CURRENT EXHIBITION', '現在の展示', lang)} · PM-000001</div>
          <h1>{t('菲比', 'PHOEBE', 'フィービー', lang)}<span>{t('博物馆', 'MUSEUM', '博物館', lang)}</span></h1>
          <p>{t('收藏每一个世界里的菲比。这里记录来自不同创作者、不同想象与不同世界线的菲比。', 'Collecting every Phoebe from every world. Here we document Phoebe from different creators, imaginations, and world lines.', 'あらゆる世界のフィービーを収集します。異なるクリエイター、想像力、世界線からのフィービーを記録しています。', lang)}</p>
          <div className="hero-actions">
            <a className="museum-btn" href="#intro">{t('进入博物馆', 'ENTER THE MUSEUM', '博物館に入る', lang)} →</a>
            <a className="text-link" href="#collection">{t('探索馆藏', 'EXPLORE COLLECTION', 'コレクションを見る', lang)}</a>
          </div>
        </div>
        <div className="current-exhibit">
          <div className="exhibit-label">{t('当前展览', 'CURRENT EXHIBIT', '現在の展示', lang)}</div>
          <div className="exhibit-title">{t('《海上菲比》', '《PHOEBE ON THE WILD SEA》', '《海のフィービー》', lang)}</div>
          <div className="exhibit-en">PHOEBE ON THE WILD SEA</div>
          <div className="exhibit-meta">
            <span>PM-000001</span>
            <span>2026</span>
            <span>DIGITAL ART</span>
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="intro" id="intro">
        <div>
          <div className="kicker">{t('欢迎来到档案馆', 'WELCOME TO THE ARCHIVE', 'アーカイブへようこそ', lang)}</div>
          <h2>{t('每一个世界里的菲比，', 'Every Phoebe in every world,', 'あらゆる世界のフィービーは、', lang)}<br /><em>{t('都值得被收藏。', 'deserves to be collected.', '収集に値します。', lang)}</em></h2>
          <p><strong className="museum-name">{t('菲比博物馆', 'PHOEBE MUSEUM', 'フィービー博物館', lang)}</strong>{t('是一个由创作者与爱好者共同构建的数字艺术档案馆。', ' is a digital art archive built by creators.', 'はクリエイターが構築したデジタルアートアーカイブです。', lang)}</p>
        </div>
      </section>

      {/* Mediums Section */}
      <section className="mediums" id="mediums">
        <div className="section-head">
          <div><div className="kicker">{t('探索媒介', 'EXPLORE MEDIUMS', 'メディアを探索', lang)}</div><h2 className="section-title">{t('探索媒介', 'EXPLORE MEDIUMS', 'メディアを探索', lang)}</h2></div>
          <p>{t('馆藏按创作媒介分为六类，从插画到表情包。', 'The collection is divided into six categories by medium.', 'コレクションはメディア別に6カテゴリに分かれます。', lang)}</p>
        </div>
        <div className="medium-grid">
          {[
            { zh: '插画', en: 'ILLUSTRATION', ja: 'イラスト', color: '#d8a447' },
            { zh: 'AI 创作', en: 'AI ART', ja: 'AIアート', color: '#9b7ede' },
            { zh: '漫画', en: 'COMIC', ja: 'コミック', color: '#c96f5a' },
            { zh: '3D', en: '3D ART', ja: '3D', color: '#5a9ec9' },
            { zh: '视频', en: 'VIDEO', ja: '動画', color: '#e08a3c' },
            { zh: '表情包', en: 'STICKERS', ja: 'スタンプ', color: '#8b5cf6' },
          ].map((item, i) => (
            <Link key={i} href="/collection" className="medium-card" style={{ '--mc': item.color } as React.CSSProperties}>
              <div style={{ width: 32, height: 32, borderRadius: '50%', background: item.color, opacity: 0.7 }}></div>
              <span className="m-name">{t(item.zh, item.en, item.ja, lang)}</span>
              <span className="m-en">{item.en}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Collection Section */}
      <section className="collection" id="collection">
        <div className="section-head">
          <div><div className="kicker">THE COLLECTION</div><h2 className="section-title">{t('馆藏精选', 'Featured Collection', 'コレクション', lang)}</h2></div>
        </div>
        <div className="collection-grid">
          {[
            { id: 'PM-000001', zh: '海上菲比', en: 'PHOEBE ON THE WILD SEA', ja: '海のフィービー', gradient: 'linear-gradient(135deg, #edb348, #79211d)', big: true },
            { id: 'PM-000002', zh: '荒原航线', en: 'WILDERNESS ROUTE', ja: '荒野航路', gradient: 'linear-gradient(135deg, #221735, #1a0a2e)' },
            { id: 'PM-000003', zh: '深海来信', en: 'OCEAN WORLD', ja: '深海からの手紙', gradient: 'linear-gradient(135deg, #0a2e1a, #1a3a2a)' },
          ].map((art) => (
            <Link key={art.id} href={'/artwork/' + art.id} className={'art-card' + (art.big ? ' big' : '')}>
              <div className="art-bg" style={{ background: art.gradient }}></div>
              <div className="art-label"><div className="art-id">{art.id}</div><div className="art-name">{t(art.zh, art.en, art.ja, lang)}</div></div>
            </Link>
          ))}
        </div>
      </section>

      {/* Worlds Section */}
      <section className="worlds" id="worlds">
        <div className="section-head">
          <div><div className="kicker">EXPLORE THE WORLDS</div><h2 className="section-title">{t('菲比存在于无数个世界。', 'Phoebe exists in countless worlds.', 'フィービーは無数の世界に存在します。', lang)}</h2></div>
        </div>
        <div className="world-list">
          {[
            { no: '01', zh: '海盗菲比', en: 'PIRATE PHOEBE', ja: '海賊フィービー', descZh: '暴风、木船、藏宝图与未知海域。', descEn: 'Storms, wooden ships, treasure maps.', descJa: '嵐、木造船、宝の地図。' },
            { no: '02', zh: '校园菲比', en: 'SCHOOL PHOEBE', ja: '学園フィービー', descZh: '制服、校园、转学生。', descEn: 'Uniforms, campus, transfer students.', descJa: '制服、キャンパス、転校生。' },
            { no: '03', zh: '赛博菲比', en: 'CYBER PHOEBE', ja: 'サイバーフィービー', descZh: '霓虹、机械、数据洪流与未来都市。', descEn: 'Neon, machinery, data streams.', descJa: 'ネオン、機械、データの奔流。' },
          ].map((world) => (
            <Link key={world.no} href="/timeline/community" className="world">
              <div className="world-no">{world.no}</div>
              <div><h3>{t(world.zh, world.en, world.ja, lang)}</h3><p>{t(world.descZh, world.descEn, world.descJa, lang)}</p></div>
              <div className="world-arrow">↗</div>
            </Link>
          ))}
        </div>
      </section>

      {/* Creators Section */}
      <section className="creators" id="creators">
        <div className="section-head">
          <div><div className="kicker">THE PEOPLE BEHIND THE MUSEUM</div><h2 className="section-title">{t('创作者档案', 'Creator Archive', 'クリエイターアーカイブ', lang)}</h2></div>
        </div>
        <div className="creator-grid">
          {[
            { avatar: '01', name: 'Featured Artist', zh: '档案馆创作者', en: 'PM ARCHIVE CREATOR', ja: 'PMアーカイブクリエイター' },
            { avatar: '02', name: 'Open Archive', zh: '你的名字也可以在这里', en: 'YOUR NAME COULD BE HERE', ja: 'あなたの名前もここに' },
          ].map((creator, i) => (
            <div key={i} className="creator">
              <div><div className="avatar">{creator.avatar}</div><h3>{creator.name}</h3><p>{t(creator.zh, creator.en, creator.ja, lang)}</p></div>
              <Link href={'/creator/' + i} className="submit-form-btn" style={{ display: 'block', textAlign: 'center', fontSize: 10, padding: '10px' }}>{t('查看档案', 'VIEW ARCHIVE', 'アーカイブを見る', lang)} →</Link>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline Section */}
      <section className="archive" id="archive">
        <div className="section-head">
          <div><div className="kicker">THE PHOEBE ARCHIVE</div><h2 className="section-title">{t('二创，也是一种记录。', 'Fan creation is also a record.', '二次創作也是一种記録です。', lang)}</h2></div>
        </div>
        <div className="timeline">
          {[
            { year: { zh: '起源', en: 'ORIGIN', ja: '起源' }, title: { zh: '角色出现', en: 'Character Appears', ja: 'キャラクター登場' }, desc: { zh: '从原始角色形象开始，菲比进入创作者的想象空间。', en: 'Phoebe enters the imagination of creators.', ja: 'フィービーはクリエイターの想像力に入ります。' } },
            { year: { zh: '档案', en: 'ARCHIVE', ja: 'アーカイブ' }, title: { zh: '二创不断生长', en: 'Fan works keep growing', ja: '二次作品は成長し続ける' }, desc: { zh: '不同媒介开始形成属于菲比的平行宇宙。', en: 'Different media begin to form a parallel universe.', ja: '異なるメディアがパラレルユニバーを形成し始めます。' } },
            { year: { zh: '现在', en: 'NOW', ja: '今' }, title: { zh: 'PHOEBE MUSEUM', en: 'PHOEBE MUSEUM', ja: 'PHOEBE MUSEUM' }, desc: { zh: '建立一个持续增长的公共数字馆藏。', en: 'Building a continuously growing public digital collection.', ja: '持続的に成長する公共デジタルコレクションを構築。' } },
          ].map((item, i) => (
            <div key={i} className="timeline-item">
              <div className="year">{t(item.year.zh, item.year.en, item.year.ja, lang)}</div>
              <div className="timeline-copy"><h4>{t(item.title.zh, item.title.en, item.title.ja, lang)}</h4><p>{t(item.desc.zh, item.desc.en, item.desc.ja, lang)}</p></div>
            </div>
          ))}
        </div>
      </section>

      {/* Submit Section */}
      <section className="submit" id="submit">
        <div className="section-head">
          <div><div className="kicker">SUBMIT TO THE MUSEUM</div><h2 className="section-title">{t('添加你的', 'ADD YOUR', 'あなたのを追加', lang)}<br />PHOEBE.</h2></div>
          <p>{t('每一件菲比作品都来自某个人的想象力。', "Every Phoebe comes from someone's imagination.", 'すべてのフィービーは誰かの想像力から来ます。', lang)}</p>
          <Link href="/submit" className="submit-form-btn">{t('投稿你的作品', 'SUBMIT YOUR WORK', '作品を投稿する', lang)} →</Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div><strong>PHOEBE MUSEUM</strong>{t('每一个菲比，都值得被记住。', 'EVERY PHOEBE DESERVES TO BE REMEMBERED.', 'すべてのフィービーは記憶に値します。', lang)}</div>
        <div>© 2026 PHOEBE MUSEUM · FAN ART DIGITAL ARCHIVE</div>
      </footer>
    </main>
  )
}
