"use client";

import { useState } from "react";
import { t } from "@/lib/i18n";

type Lang = "zh" | "en" | "ja";

const branches = [
  { nm: "EASTERN SEA", cn: { zh: "东海篇", en: "Eastern Sea", ja: "東海編" }, count: 3 },
  { nm: "SKY PIRATES", cn: { zh: "天空海盗篇", en: "Sky Pirates", ja: "天空海賊編" }, count: 2 },
  { nm: "GHOST SHIP", cn: { zh: "幽灵船篇", en: "Ghost Ship", ja: "幽霊船編" }, count: 4 },
  { nm: "DEEP SEA", cn: { zh: "深海篇", en: "Deep Sea", ja: "深海編" }, count: 2 },
  { nm: "GOLDEN FLEET", cn: { zh: "黄金舰队篇", en: "Golden Fleet", ja: "黄金艦隊編" }, count: 1 },
];

const timelineWorks = [
  { src: "/assets/hero-pop.png", title: { zh: "一个人就是一支军队", en: "One Phoebe, an Army", ja: "一人で軍隊" }, no: "PM-000001" },
  { src: "/assets/hero-sea.png", title: { zh: "站崖边想心事的菲比", en: "Phoebe on the Cliff", ja: "崖の上のフィービー" }, no: "PM-000039" },
  { src: "/assets/hero-sea.png", title: { zh: "海图上的菲比", en: "Phoebe on the Chart", ja: "海図のフィービー" }, no: "PM-000011", filter: "saturate(.4) contrast(1.06)" },
];

export default function TimelineDetailPage() {
  const [lang] = useState<Lang>("zh");

  return (
    <>
      {/* HERO 封面 */}
      <section className="hero tl-detail-hero rv">
        <div className="cover">
          <img src="/assets/hero-sea.png" alt="PIRATE PHOEBE" />
          <div className="veil" />
          <span className="st">FEATURED · {t("精选世界线", "FEATURED", "精選", lang)}</span>
          <h1>
            PIRATE PHOEBE
            <small>{t("海盗菲比 · 船长从不靠岸", "THE CAPTAIN NEVER DOCKS", "海賊フィービー", lang)}</small>
          </h1>
        </div>
        <div className="meta">
          <div><b>12</b><span>{t("馆藏作品", "WORKS", "作品", lang)}</span></div>
          <div><b>5</b><span>{t("分支世界线", "BRANCHES", "分岐", lang)}</span></div>
          <div><b className="pm-no">PM-000001</b><span>{t("本线最贵馆藏", "TOP HOLDING", "代表収蔵品", lang)}</span></div>
          <div><b>@founder</b><span>{t("世界线创建者", "FOUNDER", "創設者", lang)}</span></div>
          <div className="acts">
            <a className="btn solid" href="/submit">{t("向本世界线投稿", "SUBMIT HERE", "この世界線に投稿", lang)}</a>
          </div>
        </div>
      </section>

      {/* 设定 + 分支树 */}
      <div className="tl-body rv">
        <div>
          <h4>{t("世界线设定 · LORE", "LORE", "世界観", lang)}</h4>
          <p className="desc">
            {t(
              "暴风、木船、藏宝图与未知海域。在这个世界里，菲比是一名从不靠岸的船长——没人知道她在找什么，包括她自己。船员们早已放弃提问，反正每天的晚饭都有鱼。本世界线为博物馆第一条社区世界线，镇馆一号馆藏 PM-000001 即出于此。",
              "Storms, wooden ships, treasure maps and unknown seas. Here Phoebe is a captain who never docks — nobody knows what she is looking for, including herself. This is the museum's first community timeline, home of PM-000001.",
              "嵐、木造船、宝の地図、未知の海。この世界のフィービーは決して停泊しない船長。何を探しているのかは本人も知らない。当館初のコミュニティ世界線であり、PM-000001 の故郷です。",
              lang,
            )}
          </p>
          <div className="tags">
            <span className="tag">OCEAN</span>
            <span className="tag">ADVENTURE</span>
            <span className="tag">DARK FANTASY</span>
            <span className="tag">{t("不靠岸", "NEVER DOCKS", "接岸せず", lang)}</span>
          </div>
        </div>
        <div className="tree rv">
          <div className="root">
            <span className="dot" />PIRATE PHOEBE
            <span className="cn">{t("主线 · MAIN", "MAIN", "主線", lang)}</span>
          </div>
          {branches.map((b) => (
            <a key={b.nm} className="branch" href="/timeline/detail">
              <span className="nm">{b.nm}</span>
              <span className="cn">{t(b.cn.zh, b.cn.en, b.cn.ja, lang)}</span>
              <span className="c">{b.count} WORKS</span>
            </a>
          ))}
        </div>
      </div>

      {/* 本线馆藏 */}
      <section className="sec rv">
        <div className="head">
          <div>
            <div className="kicker">
              <span className="no">12 WORKS</span>
              <span>{t("本线馆藏", "IN THIS TIMELINE", "この世界線の収蔵品", lang)}</span>
            </div>
            <h2>
              <em>{t("已经在船上的菲比们", "Phoebes aboard", "乗船済みのフィービー", lang)}</em>
            </h2>
          </div>
          <a className="alink" href="/collection">
            {t("在馆藏中筛选本线", "FILTER IN COLLECTION", "収蔵品で絞る", lang)} <span className="arr">{"\u2192"}</span>
          </a>
        </div>
        <div className="grid tl-detail-grid">
          {timelineWorks.map((w, i) => (
            <a
              key={w.no}
              className={`frame wob ${i % 2 === 1 ? "r" : ""}`}
              href={`/artwork/${w.no.replace("PM-", "").toLowerCase()}`}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="art">
                <img src={w.src} alt="" style={w.filter ? { filter: w.filter } : {}} />
              </div>
              <div className="cap">
                <span className="t">{t(w.title.zh, w.title.en, w.title.ja, lang)}</span>
                <span className="m"><span className="pm-no">{w.no}</span></span>
              </div>
            </a>
          ))}
        </div>
      </section>
    </>
  );
}
