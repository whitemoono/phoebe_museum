"use client";

import { useState } from "react";
import { t } from "@/lib/i18n";

type Lang = "zh" | "en" | "ja";

const eraData: Record<string, {
  n: string; en: string; cn: { zh: string; en: string; ja: string };
  desc: { zh: string; en: string; ja: string };
  kws: string[]; stamp: string; img: string;
  works: { title: { zh: string; en: string; ja: string }; no: string; filter?: string }[];
  prev: { n: string; en: string; cn: string } | null;
  next: { n: string; en: string; cn: string } | null;
}> = {
  "09": {
    n: "09", en: "UKIYO-E",
    cn: { zh: "浮世绘 · 江户时代的菲比", en: "Phoebe of the Floating World", ja: "浮世絵・江戸のフィービー" },
    desc: {
      zh: "木版画、海浪、和服与歌舞伎。江户时代的工匠们坚信：浪花里必须有一张菲比的脸，否则这张版画卖不出去。",
      en: "Woodblock prints, great waves, kimono and kabuki. Edo craftsmen believed every wave needed a Phoebe in it, or the print would not sell.",
      ja: "木版画、波、着物、歌舞伎。江戸の職人は信じていた——波にフィービーがいないと売れない、と。",
    },
    kws: ["WOODBLOCK", "JAPAN", "WAVES", "KABUKI", "EDO", "FLAT COLOR"],
    stamp: "浪花是借的",
    img: "/assets/ukiyoe.png",
    works: [
      { title: { zh: "冲浪的菲比（江户限定）", en: "Surfing Phoebe (Edo Only)", ja: "サーフィンフィービー" }, no: "PM-000021" },
      { title: { zh: "歌舞伎菲比 初舞台", en: "Kabuki Phoebe Debut", ja: "歌舞伎フィービー初舞台" }, no: "PM-000022", filter: "hue-rotate(-16deg) saturate(.85)" },
      { title: { zh: "花见团子与菲比", en: "Phoebe and Hanami Dango", ja: "花見団子とフィービー" }, no: "PM-000024", filter: "hue-rotate(14deg) brightness(.96)" },
      { title: { zh: "墨色菲比（试印版）", en: "Ink Phoebe (Trial Proof)", ja: "墨色フィービー" }, no: "PM-000027", filter: "saturate(.4) contrast(1.06)" },
    ],
    prev: { n: "08", en: "PRE-RAPHAELITE", cn: "前拉斐尔派 · 花海长发菲比" },
    next: { n: "10", en: "IMPRESSIONISM", cn: "印象派 · 光很好，书没翻页" },
  },
};

export default function EraPage({ params }: { params: Promise<{ n: string }> }) {
  const [lang] = useState<Lang>("zh");
  // Default to era 09 for static rendering; dynamic access uses the param
  const era = eraData["09"];

  return (
    <>
      {/* HERO */}
      <section className="hero era-hero rv">
        <div className="grid">
          <div>
            <div className="kicker">
              <span className="no">HUMAN TIMELINE</span>
              <span>{t("官方时代展厅", "OFFICIAL ERA GALLERY", "公式時代展示室", lang)}</span>
            </div>
            <div className="n">{era.n}</div>
            <h1>
              {era.en}
              <span className="cn">{t(era.cn.zh, era.cn.en, era.cn.ja, lang)}</span>
            </h1>
            <p>{t(era.desc.zh, era.desc.en, era.desc.ja, lang)}</p>
            <div className="kw">
              {era.kws.map((kw) => (
                <span key={kw}>{kw}</span>
              ))}
            </div>
            <div className="acts">
              <a className="btn solid" href="/submit">{t("向本展厅投稿", "SUBMIT TO THIS ERA", "この展示室に投稿", lang)}</a>
              <a className="btn ghost" href="/timeline/human">{t("返回长廊", "BACK TO TIMELINE", "長廊に戻る", lang)}</a>
            </div>
          </div>
          <div className="visual tape">
            <span className="stamp">{era.stamp}</span>
            <div className="art">
              <img src={era.img} alt={`${era.en} gallery`} />
            </div>
          </div>
        </div>
      </section>

      {/* 时代导航 */}
      <nav className="eranav">
        {["01","02","03","04","05","06","07","08","09","10","11","12","13"].map((num) => (
          <a key={num} href={`/timeline/era/${num}`} className={num === era.n ? "on" : ""}>{num}</a>
        ))}
      </nav>

      {/* 本展厅馆藏 */}
      <section className="sec rv">
        <div className="head">
          <div>
            <div className="kicker">
              <span className="no">{era.works.length} WORKS</span>
              <span>{t("本展厅馆藏", "IN THIS GALLERY", "この展示室の収蔵品", lang)}</span>
            </div>
            <h2>
              <em>{t("被印在浪花里的菲比", "Phoebes in the waves", "波に印刷されたフィービー", lang)}</em>
            </h2>
          </div>
        </div>
        <div className="grid era-grid">
          {era.works.map((w, i) => (
            <a
              key={w.no}
              className={`frame wob ${i % 2 === 1 ? "r" : ""}`}
              href={`/artwork/${w.no.replace("PM-", "").toLowerCase()}`}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="art">
                <img src={era.img} alt="" style={w.filter ? { filter: w.filter } : {}} />
              </div>
              <div className="cap">
                <span className="t">{t(w.title.zh, w.title.en, w.title.ja, lang)}</span>
                <span className="m">
                  <span className="chip illustration">{t("插画", "ILLUSTRATION", "イラスト", lang)}</span>{" "}
                  <span className="pm-no">{w.no}</span>
                </span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* 上下篇 */}
      <div className="prevnext">
        {era.prev && (
          <a className="pn" href={`/timeline/era/${era.prev.n}`}>
            {"\u2190"} {era.prev.n} {era.prev.en}
            <b>{era.prev.cn}</b>
          </a>
        )}
        {era.next && (
          <a className="pn next" href={`/timeline/era/${era.next.n}`}>
            {era.next.n} {era.next.en} {"\u2192"}
            <b>{era.next.cn}</b>
          </a>
        )}
      </div>
    </>
  );
}
