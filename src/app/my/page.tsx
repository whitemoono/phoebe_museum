"use client";

import { useState } from "react";
import { t } from "@/lib/i18n";

type Lang = "zh" | "en" | "ja";

type Item = {
  no: string; title: { zh: string; en: string; ja: string };
  year: string; medium: string; hearts: number | string; src: string;
  status: "pub" | "rev" | "draft" | "rej";
};

const submitted: Item[] = [
  { no: "PM-000142", title: { zh: "便利店夜班", en: "Night Shift", ja: "コンビニ夜勤" }, year: "2026", medium: { zh: "插画", en: "Illust", ja: "イラスト" } as any, hearts: 124, src: "/assets/store.png", status: "pub" },
  { no: "PM-000156", title: { zh: "海盗船长菲比", en: "Pirate Captain", ja: "海賊船長" }, year: "2026", medium: { zh: "插画", en: "Illust", ja: "イラスト" } as any, hearts: 89, src: "/assets/hero-sea.png", status: "pub" },
  { no: "PM-000178", title: { zh: "机甲驾驶员", en: "Mecha Pilot", ja: "機甲パイロット" }, year: "2026", medium: { zh: "3D", en: "3D", ja: "3D" } as any, hearts: "审核中", src: "/assets/neon.png", status: "rev" },
  { no: "PM-000098", title: { zh: "雨夜霓虹", en: "Neon Rainy Night", ja: "雨夜ネオン" }, year: "2025", medium: { zh: "AI", en: "AI", ja: "AI" } as any, hearts: 312, src: "/assets/neon.png", status: "pub" },
  { no: "PM-待定", title: { zh: "幽灵船菲比", en: "Ghost Ship Phoebe", ja: "幽霊船" }, year: "2026", medium: { zh: "漫画", en: "Comic", ja: "漫画" } as any, hearts: "草稿", src: "/assets/hero-sea.png", status: "draft" },
  { no: "PM-000071", title: { zh: "菲比在画画", en: "Phoebe Painting", ja: "描画中" }, year: "2025", medium: { zh: "插画", en: "Illust", ja: "イラスト" } as any, hearts: 56, src: "/assets/garden.png", status: "pub" },
  { no: "PM-0000XX", title: { zh: "这张不太菲比", en: "Not Quite Phoebe", ja: "フィービーじゃない" }, year: "2026", medium: { zh: "—", en: "—", ja: "—" } as any, hearts: "未通过", src: "/assets/hero-pop.png", status: "rej" },
  { no: "PM-000045", title: { zh: "猫耳菲比", en: "Cat Ear", ja: "猫耳" }, year: "2025", medium: { zh: "插画", en: "Illust", ja: "イラスト" } as any, hearts: 201, src: "/assets/hero-pop.png", status: "pub" },
];

const collected: Item[] = [
  { no: "PM-000003", title: { zh: "初代菲比", en: "First Ever", ja: "初代" }, year: "2024", medium: { zh: "插画", en: "Illust", ja: "イラスト" } as any, hearts: 823, src: "/assets/hero-pop.png", status: "pub" },
  { no: "PM-000017", title: { zh: "蒸汽朋克菲比", en: "Steampunk", ja: "蒸気朋克" }, year: "2025", medium: { zh: "插画", en: "Illust", ja: "イラスト" } as any, hearts: 445, src: "/assets/neon.png", status: "pub" },
  { no: "PM-000029", title: { zh: "武士菲比", en: "Samurai", ja: "侍" }, year: "2025", medium: { zh: "漫画", en: "Comic", ja: "漫画" } as any, hearts: 367, src: "/assets/hero-sea.png", status: "pub" },
  { no: "PM-000033", title: { zh: "魔法少女菲比", en: "Magical Girl", ja: "魔法少女" }, year: "2025", medium: { zh: "插画", en: "Illust", ja: "イラスト" } as any, hearts: 289, src: "/assets/garden.png", status: "pub" },
];

const myTimelines = [
  { nm: "CYBER PHOEBE", cn: { zh: "赛博菲比", en: "Cyber Phoebe", ja: "サイバー" }, desc: { zh: "2077年的夜之城，霓虹灯下的便利店夜班菲比", en: "Night City 2077", ja: "2077年のナイトシティ" }, meta: "12 ARTWORKS · 4 CREATORS · 234\u2665", src: "/assets/neon.png", pub: true },
  { nm: "PIRATE PHOEBE", cn: { zh: "海盗菲比", en: "Pirate Phoebe", ja: "海賊" }, desc: { zh: "黄金时代的加勒比海，船长菲比在幽灵船上寻找宝藏", en: "Golden Age Caribbean", ja: "黄金時代のカリブ海" }, meta: "8 ARTWORKS · 3 CREATORS · 156\u2665", src: "/assets/hero-sea.png", pub: true },
  { nm: "PHOEBE OWNS A STORE", cn: { zh: "便利店菲比", en: "Store Phoebe", ja: "コンビニ" }, desc: { zh: "日常向·菲比在便利店打工的琐碎日常", en: "Slice of life", ja: "日常系" }, meta: "15 ARTWORKS · 2 CREATORS · 412\u2665", src: "/assets/store.png", pub: true },
  { nm: "MECHA PHOEBE", cn: { zh: "机甲菲比", en: "Mecha Phoebe", ja: "機甲" }, desc: { zh: "近未来·菲比驾驶古董机甲在废墟中拾荒", en: "Near future mecha", ja: "近未来機甲" }, meta: "3 ARTWORKS · 1 CREATOR · 0\u2665", src: "/assets/neon.png", pub: false },
];

const stats = [
  { n: "23", l: { zh: "已上交菲比", en: "SUBMITTED", ja: "投稿数" } },
  { n: "47", l: { zh: "收藏菲比", en: "COLLECTED", ja: "収蔵数" } },
  { n: "4", l: { zh: "创建世界线", en: "TIMELINES", ja: "世界線" } },
  { n: "1,024", l: { zh: "获得共鸣", en: "RESONANCE", ja: "共鳴" } },
  { n: "89", l: { zh: "关注创作者", en: "FOLLOWING", ja: "フォロー中" } },
];

const statusMap = {
  pub: { cls: "pub", text: "PUBLISHED" },
  rev: { cls: "rev", text: "IN REVIEW" },
  draft: { cls: "draft", text: "DRAFT" },
  rej: { cls: "rej", text: "REJECTED" },
};

export default function MyPage() {
  const [lang] = useState<Lang>("zh");
  const [tab, setTab] = useState<"submitted" | "collected" | "timelines" | "drafts">("submitted");

  return (
    <>
      {/* HERO */}
      <section className="my-hero rv">
        <div className="banner" />
        <div className="inner">
          <div className="avatar-ring">
            <div className="avatar-placeholder">?</div>
          </div>
          <div className="headtext">
            <div className="kicker" style={{ color: "rgba(244,240,230,.4)", marginBottom: 14 }}>
              <span className="no">MY MUSEUM</span>
              <span>{t("我的博物馆", "MY MUSEUM", "マイミュージアム", lang)}</span>
            </div>
            <h1>@phoebe_collector<em>{"'s wing"}</em></h1>
            <div className="sub">{t("菲比收藏家 · 注册于 2024.03.14 · 编号 PMC-00231", "Phoebe Collector · Joined 2024.03.14 · PMC-00231", "フィービー収集家・2024.03.14登録・PMC-00231", lang)}</div>
            <div className="badge-row">
              <span className="b act">{t("活跃收藏家", "ACTIVE COLLECTOR", "アクティブ", lang)}</span>
              <span className="b">LV.23</span>
              <span className="b">2024 {t("加入", "JOINED", "加入", lang)}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 统计 */}
      <section className="my-stats">
        <div className="inner">
          {stats.map((s) => (
            <div key={s.n} className="stat rv">
              <div className="n">{s.n}</div>
              <div className="l">{t(s.l.zh, s.l.en, s.l.ja, lang)}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 主体 */}
      <section className="my-body">
        <div className="my-tabs">
          <button className={tab === "submitted" ? "active" : ""} onClick={() => setTab("submitted")}>
            {t("我上交的", "SUBMITTED", "投稿した", lang)} <span className="cnt">(23)</span>
          </button>
          <button className={tab === "collected" ? "active" : ""} onClick={() => setTab("collected")}>
            {t("我收藏的", "COLLECTED", "収蔵した", lang)} <span className="cnt">(47)</span>
          </button>
          <button className={tab === "timelines" ? "active" : ""} onClick={() => setTab("timelines")}>
            {t("我的世界线", "MY TIMELINES", "世界線", lang)} <span className="cnt">(4)</span>
          </button>
          <button className={tab === "drafts" ? "active" : ""} onClick={() => setTab("drafts")}>
            {t("草稿箱", "DRAFTS", "下書き", lang)} <span className="cnt">(2)</span>
          </button>
        </div>

        {tab === "submitted" && (
          <div className="my-grid">
            {submitted.map((item, i) => {
              const st = statusMap[item.status];
              const med = item.medium as any;
              return (
                <a key={i} className="item rv" href={item.no.includes("待定") || item.no.includes("XX") ? "/submit" : `/artwork/${item.no.replace("PM-", "").toLowerCase()}`}>
                  <div className={`status ${st.cls}`}>{st.text}</div>
                  <div className="corner-no">{item.no}</div>
                  <div className="img">
                    <img src={item.src} alt="" />
                    <div className="overlay"><div className="heart">{"\u2665"} {item.hearts}</div></div>
                  </div>
                  <div className="info">
                    <div className="no">{item.no}</div>
                    <h4>{t(item.title.zh, item.title.en, item.title.ja, lang)}</h4>
                    <div className="meta">{item.year} · {t(med.zh, med.en, med.ja, lang)} · {typeof item.hearts === "number" ? `${item.hearts}\u2665` : item.hearts}</div>
                  </div>
                </a>
              );
            })}
          </div>
        )}

        {tab === "collected" && (
          <div className="my-grid">
            {collected.map((item, i) => {
              const med = item.medium as any;
              return (
                <a key={i} className="item rv" href={`/artwork/${item.no.replace("PM-", "").toLowerCase()}`}>
                  <div className="corner-no">{item.no}</div>
                  <div className="img">
                    <img src={item.src} alt="" />
                    <div className="overlay"><div className="heart">{"\u2665"} {item.hearts}</div></div>
                  </div>
                  <div className="info">
                    <div className="no">{item.no}</div>
                    <h4>{t(item.title.zh, item.title.en, item.title.ja, lang)}</h4>
                    <div className="meta">{item.year} · {t(med.zh, med.en, med.ja, lang)} · {item.hearts}\u2665</div>
                  </div>
                </a>
              );
            })}
          </div>
        )}

        {tab === "timelines" && (
          <>
            <div className="collection-list">
              {myTimelines.map((tl) => (
                <a key={tl.nm} className="row rv" href="/timeline/detail">
                  <div className="thumb"><img src={tl.src} alt="" /></div>
                  <div className="info">
                    <h4>{tl.nm} · {t(tl.cn.zh, tl.cn.en, tl.cn.ja, lang)}</h4>
                    <p>{t(tl.desc.zh, tl.desc.en, tl.desc.ja, lang)}</p>
                    <div className="meta">
                      <span className={`tag ${tl.pub ? "pub" : "pri"}`}>{tl.pub ? "PUBLIC" : "PRIVATE"}</span>
                      {tl.meta}
                    </div>
                  </div>
                  <div className="act">VIEW {"\u2192"}</div>
                </a>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 24 }}>
              <a className="btn solid" href="/timeline/create">{t("创建新世界线", "NEW TIMELINE", "新規世界線", lang)} +</a>
            </div>
          </>
        )}

        {tab === "drafts" && (
          <div className="empty-state">
            <div className="icon">{"\u270E"}</div>
            <h3>{t("还有 2 份草稿没交", "2 drafts pending", "下書き2件", lang)}</h3>
            <p>{t("别藏着了，审核员在等你", "Don't hide them — reviewers are waiting", "隠さないで。審査員が待っている。", lang)}</p>
            <a className="btn solid" href="/submit">{t("继续编辑", "CONTINUE EDITING", "編集続行", lang)}</a>
          </div>
        )}
      </section>
    </>
  );
}
