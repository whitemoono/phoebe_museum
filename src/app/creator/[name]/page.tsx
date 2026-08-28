"use client";

import { useState } from "react";
import { t } from "@/lib/i18n";

type Lang = "zh" | "en" | "ja";

const works = [
  { no: "PM-000142", title: { zh: "便利店夜班", en: "Night Shift", ja: "コンビニ夜勤" }, chip: "illustration", chipLabel: { zh: "插画", en: "Illust", ja: "イラスト" }, year: "2026", hearts: 124, src: "/assets/store.png" },
  { no: "PM-000098", title: { zh: "雨夜霓虹", en: "Neon Rainy Night", ja: "雨夜ネオン" }, chip: "ai", chipLabel: { zh: "AI", en: "AI", ja: "AI" }, year: "2025", hearts: 312, src: "/assets/neon.png" },
  { no: "PM-000071", title: { zh: "菲比在画画", en: "Phoebe Painting", ja: "フィービー描画中" }, chip: "illustration", chipLabel: { zh: "插画", en: "Illust", ja: "イラスト" }, year: "2025", hearts: 56, src: "/assets/garden.png" },
  { no: "PM-000045", title: { zh: "猫耳菲比", en: "Cat Ear Phoebe", ja: "猫耳フィービー" }, chip: "comic", chipLabel: { zh: "漫画", en: "Comic", ja: "漫画" }, year: "2025", hearts: 201, src: "/assets/hero-pop.png" },
  { no: "PM-000038", title: { zh: "蒸汽波菲比", en: "Vaporwave Phoebe", ja: "蒸気波フィービー" }, chip: "ai", chipLabel: { zh: "AI", en: "AI", ja: "AI" }, year: "2025", hearts: 178, src: "/assets/neon.png", filter: "hue-rotate(30deg)" },
  { no: "PM-000022", title: { zh: "雨中奔跑", en: "Running in Rain", ja: "雨の中を走る" }, chip: "illustration", chipLabel: { zh: "插画", en: "Illust", ja: "イラスト" }, year: "2024", hearts: 89, src: "/assets/hero-sea.png" },
  { no: "PM-000015", title: { zh: "机甲驾驶舱", en: "Mecha Cockpit", ja: "機甲コックピット" }, chip: "d3", chipLabel: { zh: "3D", en: "3D", ja: "3D" }, year: "2024", hearts: 145, src: "/assets/neon.png", filter: "hue-rotate(-20deg) saturate(.8)" },
  { no: "PM-000005", title: { zh: "最早的一张菲比", en: "First Phoebe", ja: "最初のフィービー" }, chip: "illustration", chipLabel: { zh: "插画", en: "Illust", ja: "イラスト" }, year: "2024", hearts: 423, src: "/assets/hero-pop.png" },
];

const timelines = [
  { nm: "CYBER PHOEBE", cn: { zh: "赛博菲比", en: "Cyber Phoebe", ja: "サイバーフィービー" }, desc: { zh: "2077年的夜之城，霓虹灯下的便利店夜班菲比。赛博朋克美学，蒸汽波，霓虹。", en: "Night City 2077. Cyberpunk, vaporwave, neon.", ja: "2077年のナイトシティ。サイバーパンク。" }, meta: "PUBLIC · 234 ARTWORKS · 47 CREATORS · 1.2K\u2665", src: "/assets/neon.png" },
  { nm: "PHOEBE OWNS A STORE", cn: { zh: "便利店菲比", en: "Store Phoebe", ja: "コンビニフィービー" }, desc: { zh: "日常向·菲比在便利店打工的琐碎日常。治愈系。", en: "Slice of life. Healing.", ja: "日常系・癒やし。" }, meta: "PUBLIC · 412 ARTWORKS · 89 CREATORS · 2.3K\u2665", src: "/assets/store.png" },
  { nm: "MECHA PHOEBE", cn: { zh: "机甲菲比", en: "Mecha Phoebe", ja: "機甲フィービー" }, desc: { zh: "近未来·菲比驾驶古董机甲在废墟中拾荒。机械控。", en: "Near future. Mecha scavenging.", ja: "近未来・機甲拾荒。" }, meta: "PUBLIC · 89 ARTWORKS · 12 CREATORS · 456\u2665", src: "/assets/neon.png", filter: "hue-rotate(-20deg)" },
];

const stats = [
  { n: "47", l: { zh: "已上交", en: "SUBMITTED", ja: "投稿数" } },
  { n: "3", l: { zh: "世界线", en: "TIMELINES", ja: "世界線" } },
  { n: "3,421", l: { zh: "总共鸣", en: "RESONANCE", ja: "共鳴" } },
  { n: "892", l: { zh: "被关注", en: "FOLLOWERS", ja: "フォロワー" } },
  { n: "2024", l: { zh: "入馆", en: "JOINED", ja: "入館" } },
];

export default function CreatorPage() {
  const [lang] = useState<Lang>("zh");
  const [tab, setTab] = useState<"works" | "timelines" | "about">("works");

  return (
    <>
      {/* HERO */}
      <section className="cr-hero rv">
        <div className="banner" />
        <div className="inner">
          <div className="avatar"><img src="/assets/hero-pop.png" alt="" /></div>
          <h1>
            @neon_pen
            <small>NEON_PEN · {t("霓虹笔", "Neon Pen", "ネオンペン", lang)}</small>
          </h1>
          <p className="bio">
            {t(
              "画菲比的。主要画赛博菲比和便利店菲比。偶尔也画画机甲菲比。画画的时候听蒸汽波。不接商稿（除非你也是画菲比的）。",
              "Draws Phoebe. Mostly cyber and convenience-store Phoebe. Occasionally mecha. Listens to vaporwave while drawing. No commercial work (unless you also draw Phoebe).",
              "フィービーを描く人。主にサイバーとコンビニ。たまに機甲。描く時に蒸気波を聴く。商用NG（あなたもフィービーを描くなら別）。",
              lang,
            )}
          </p>
          <div className="tags">
            <span>ILLUSTRATION</span><span>AI CREATION</span><span>COMIC</span><span>CYBER PHOEBE</span><span>STORE PHOEBE</span>
          </div>
        </div>
      </section>

      {/* 统计 + 操作 */}
      <section className="cr-actions rv">
        <div className="cr-stats">
          {stats.map((s) => (
            <div key={s.n} className="s">
              <div className="n">{s.n}</div>
              <div className="l">{t(s.l.zh, s.l.en, s.l.ja, lang)}</div>
            </div>
          ))}
        </div>
        <div className="btns">
          <button className="btn ghost" style={{ padding: "10px 20px" }}>+ {t("关注", "FOLLOW", "フォロー", lang)}</button>
          <a className="btn solid" href="/submit" style={{ padding: "10px 20px" }}>{t("送她一张菲比", "SEND A PHOEBE", "フィービーを送る", lang)}</a>
        </div>
      </section>

      {/* Tabs */}
      <div className="cr-tabs">
        <button className={tab === "works" ? "active" : ""} onClick={() => setTab("works")}>
          {t("作品", "WORKS", "作品", lang)} <span className="cnt">(47)</span>
        </button>
        <button className={tab === "timelines" ? "active" : ""} onClick={() => setTab("timelines")}>
          {t("世界线", "TIMELINES", "世界線", lang)} <span className="cnt">(3)</span>
        </button>
        <button className={tab === "about" ? "active" : ""} onClick={() => setTab("about")}>
          {t("关于", "ABOUT", "について", lang)}
        </button>
      </div>

      {/* 作品 */}
      {tab === "works" && (
        <section className="cr-body">
          <div className="cr-grid">
            {works.map((w, i) => (
              <a key={w.no} className="item rv" href={`/artwork/${w.no.replace("PM-", "").toLowerCase()}`} style={{ animationDelay: `${i * 0.06}s` }}>
                <span className={`chip ${w.chip}`}>{t(w.chipLabel.zh, w.chipLabel.en, w.chipLabel.ja, lang)}</span>
                <div className="img"><img src={w.src} alt="" style={w.filter ? { filter: w.filter } : {}} /></div>
                <div className="info">
                  <div className="no">{w.no}</div>
                  <h4>{t(w.title.zh, w.title.en, w.title.ja, lang)}</h4>
                  <div className="meta">{w.year} · {w.hearts}\u2665</div>
                </div>
              </a>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 24 }}>
            <button className="btn ghost" style={{ padding: "12px 28px" }}>{t("加载更多", "LOAD MORE", "もっと見る", lang)}</button>
          </div>
        </section>
      )}

      {/* 世界线 */}
      {tab === "timelines" && (
        <section className="cr-body">
          <div className="cr-section">
            <h3>{t("创建的世界线", "CREATED TIMELINES", "作成した世界線", lang)} <small>(3)</small></h3>
            <div className="cr-timelines">
              {timelines.map((tl) => (
                <a key={tl.nm} className="row rv" href="/timeline/detail">
                  <div className="thumb"><img src={tl.src} alt="" style={tl.filter ? { filter: tl.filter } : {}} /></div>
                  <div className="info">
                    <h4>{tl.nm} · {t(tl.cn.zh, tl.cn.en, tl.cn.ja, lang)}</h4>
                    <p>{t(tl.desc.zh, tl.desc.en, tl.desc.ja, lang)}</p>
                    <div className="meta">{tl.meta}</div>
                  </div>
                  <div className="act">VIEW {"\u2192"}</div>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 关于 */}
      {tab === "about" && (
        <section className="cr-body">
          <div className="cr-section">
            <h3>{t("关于创作者", "ABOUT", "について", lang)}</h3>
            <div className="cr-about">
              <div className="bio-text">
                <p>{t("霓虹笔（@neon_pen）是菲比博物馆的早期入馆创作者之一，自 2024 年起开始上交菲比。她主要创作赛博朋克和日常风格的菲比作品，偶尔也做 AI 辅助创作和条漫。", "Neon Pen (@neon_pen) is an early-bird creator, submitting since 2024. Mostly cyberpunk and slice-of-life, with occasional AI-assisted work.", "ネオンペン（@neon_pen）はフィービー博物館の初期クリエイター。2024年から投稿。サイバーパンクと日常系が主流。", lang)}</p>
                <p>{t("她的画风以蒸汽波色调和大面积留白为特色，笔下的菲比常常带着一种「很困但很认真」的表情。她创造了三条世界线：赛博菲比、便利店菲比和机甲菲比，其中便利店菲比已成为本馆最热门的世界线之一。", "Her style features vaporwave palettes and large negative space. Her Phoebes always look \"sleepy but earnest\". She founded three timelines, of which Store Phoebe is now the most popular.", "蒸気波の色調と余白が特徴。筆下のフィービーはいつも「眠いけど真面目」な顔。3つの世界線を創設。", lang)}</p>
                <p>{t("不接商稿（除非你也是画菲比的）。画画的时候听蒸汽波。最近在学 3D 建模。", "No commercial work (unless you also draw Phoebe). Listens to vaporwave while drawing. Recently learning 3D.", "商用NG（フィービーを描く人なら別）。蒸気波を聴きながら描く。最近3Dを勉強中。", lang)}</p>
              </div>
              <div className="side">
                <h4>{t("档案", "PROFILE", "プロフィール", lang)}</h4>
                <dl>
                  <dt>{t("署名", "HANDLE", "ハンドル", lang)}</dt><dd>@neon_pen</dd>
                  <dt>{t("昵称", "NAME", "名前", lang)}</dt><dd>{t("霓虹笔", "Neon Pen", "ネオンペン", lang)}</dd>
                  <dt>{t("入馆时间", "JOINED", "入館日", lang)}</dt><dd>2024.03.14</dd>
                  <dt>{t("创作媒介", "MEDIUMS", "媒介", lang)}</dt><dd>{t("插画 / AI / 漫画", "Illust / AI / Comic", "イラスト・AI・漫画", lang)}</dd>
                  <dt>{t("擅长风格", "STYLES", "スタイル", lang)}</dt><dd>{t("赛博朋克 / 日常 / 蒸汽波", "Cyberpunk / Slice / Vaporwave", "サイバーパンク・日常・蒸気波", lang)}</dd>
                  <dt>{t("主页", "SITE", "サイト", lang)}</dt><dd>neon-pen.art</dd>
                </dl>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
