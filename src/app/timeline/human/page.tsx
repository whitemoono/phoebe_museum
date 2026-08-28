"use client";

import { useState } from "react";
import { t } from "@/lib/i18n";

type Lang = "zh" | "en" | "ja";

type Era = {
  n: string;
  en: string;
  cn: { zh: string; en: string; ja: string };
  kws: string[];
  count: number;
  img?: string;
  phTxt?: string;
  unwritten?: boolean;
};

const eras: Era[] = [
  { n: "01", en: "PREHISTORIC", cn: { zh: "史前 · 最早的菲比", en: "The Earliest Phoebe", ja: "先史・最古のフィービー" }, kws: ["CAVE ART", "TOTEM", "OCHRE"], count: 3, img: "/assets/cave.png" },
  { n: "02", en: "CLASSICAL", cn: { zh: "古典时代 · 大理石菲比", en: "Classical · Marble Phoebe", ja: "古典・大理石のフィービー" }, kws: ["GREEK", "MARBLE", "MYTH"], count: 2, phTxt: "\u03A6\u039F\u0399\u0392\u0397" },
  { n: "03", en: "MEDIEVAL", cn: { zh: "中世纪 · 手抄本菲比", en: "Medieval · Manuscript Phoebe", ja: "中世・写本フィービー" }, kws: ["MANUSCRIPT", "GOTHIC", "KNIGHT"], count: 2, phTxt: "\u271D Phoebe \u271D" },
  { n: "04", en: "RENAISSANCE", cn: { zh: "文艺复兴 · 她只是坐了一会儿", en: "Renaissance · She Just Sat", ja: "ルネサンス・ただ座った" }, kws: ["OIL", "PORTRAIT", "HUMANISM"], count: 5, img: "/assets/renaissance.png" },
  { n: "05", en: "BAROQUE", cn: { zh: "巴洛克 · 金光闪闪菲比", en: "Baroque · Golden Phoebe", ja: "バロック・黄金のフィービー" }, kws: ["DRAMA", "GOLD", "THEATRE"], count: 2, phTxt: "\u2726 dramatic \u2726" },
  { n: "06", en: "REALISM", cn: { zh: "现实主义 · 打工菲比", en: "Realism · Working Phoebe", ja: "リアリズム・労働フィービー" }, kws: ["WORK", "CITY", "DOCUMENT"], count: 2, phTxt: "ordinary" },
  { n: "07", en: "ROMANTICISM", cn: { zh: "浪漫主义 · 指定崖边站位", en: "Romanticism · Cliff Position", ja: "ロマン主義・崖の立ち位置" }, kws: ["STORM", "RUINS", "SUBLIME"], count: 4, img: "/assets/hero-sea.png" },
  { n: "08", en: "PRE-RAPHAELITE", cn: { zh: "前拉斐尔派 · 花海长发菲比", en: "Pre-Raphaelite · Flower Phoebe", ja: "ラファエロ前派・花のフィービー" }, kws: ["FLOWERS", "MYTH", "SYMBOL"], count: 3, phTxt: "\u273F flowers \u273F" },
  { n: "09", en: "UKIYO-E", cn: { zh: "浮世绘 · 浪花是借的", en: "Ukiyo-e · Borrowed Waves", ja: "浮世絵・波は借りの" }, kws: ["WOODBLOCK", "WAVES", "EDO"], count: 4, img: "/assets/ukiyoe.png" },
  { n: "10", en: "IMPRESSIONISM", cn: { zh: "印象派 · 光很好，书没翻页", en: "Impressionism · Good Light", ja: "印象派・光が良い" }, kws: ["LIGHT", "GARDEN", "MOMENT"], count: 6, img: "/assets/garden.png" },
  { n: "11", en: "POST-IMPRESSIONISM", cn: { zh: "后印象派 · 颜色开始不对劲", en: "Post-Impressionism · Colors Gone Wild", ja: "後期印象派・色が変" }, kws: ["COLOR", "EMOTION", "GEOMETRY"], count: 2, phTxt: "\u25A0 \u25B2 \u25CF" },
  { n: "12", en: "MODERN", cn: { zh: "现代 · 看不太懂但有菲比", en: "Modern · Confusing but Phoebe", ja: "現代・よくわからないが" }, kws: ["CUBISM", "POP", "ABSTRACT"], count: 7, phTxt: "?! modern" },
  { n: "13", en: "THE UNWRITTEN AGE", cn: { zh: "未书写时代 · AI 也开始画她了", en: "Unwritten Age · AI Draws Her", ja: "未書時代・AIも描く" }, kws: ["AI NATIVE", "FUTURE", "MIXED"], count: 9, phTxt: "to be continued\u2026", unwritten: true },
];

export default function TimelineHumanPage() {
  const [lang] = useState<Lang>("zh");

  return (
    <>
      <section className="hero tl-hero rv">
        <div className="kicker">
          <span className="no">WING I</span>
          <span>{t("人类艺术史主线 · 官方固定展厅", "THE OFFICIAL ART-HISTORY CANON", "人類芸術史の主線", lang)}</span>
        </div>
        <h1>
          {t("菲比穿越", "Phoebe through", "フィービーの", lang)}
          <br />
          <em>{t("一万年。", "human history.", "一万年穿越。", lang)}</em>
        </h1>
        <p>
          {t(
            "如果菲比存在于人类艺术史中，她会以什么样的形式被不同文明与时代创造出来？从洞穴壁画到 AI 绘画，十三间时代展厅住满了菲比。请沿长廊慢慢参观，不要惊动展品——它们已经很老了。",
            "If Phoebe had existed throughout human art history, how would each age have created her? Thirteen era galleries, from cave walls to the unwritten age. Walk slowly, the exhibits are very old.",
            "もしフィービーが人類の芸術史に存在していたら？洞窟壁画からAI絵画まで、十三の展示室をゆっくりご見学ください。",
            lang,
          )}
        </p>
      </section>

      <div className="gallery">
        {eras.map((era, i) => (
          <a key={era.n} className="era rv" href={`/timeline/era/${era.n}`}>
            <span className="dot" />
            <div className="card">
              <div className="n">{era.n}</div>
              <h3>
                {era.en}
                <span className="cn">{t(era.cn.zh, era.cn.en, era.cn.ja, lang)}</span>
              </h3>
              <div className="kw">
                {era.kws.map((kw) => (
                  <span key={kw}>{kw}</span>
                ))}
              </div>
              <span className="cnt">
                <b>{era.count}</b> WORKS
              </span>
              <br />
              <span className="alink go">
                {t("进展厅", "ENTER GALLERY", "入室", lang)} <span className="arr">{"\u2192"}</span>
              </span>
            </div>
            <div className="visual">
              <div className="art">
                {era.img ? (
                  <img src={era.img} alt={`${era.en} gallery`} />
                ) : (
                  <div className={`ph-txt ${era.unwritten ? "" : ""}`}>{era.phTxt}</div>
                )}
              </div>
            </div>
          </a>
        ))}
      </div>
    </>
  );
}
