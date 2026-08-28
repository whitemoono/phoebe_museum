"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { t } from "@/lib/i18n";

type Lang = "zh" | "en" | "ja";

const thumbs = [
  { src: "/assets/hero-sea.png", filter: "" },
  { src: "/assets/hero-sea.png", filter: "hue-rotate(18deg) saturate(1.1)" },
  { src: "/assets/hero-sea.png", filter: "saturate(.3) contrast(1.05)" },
];

const related = [
  { src: "/assets/ukiyoe.png", title: { zh: "冲浪的菲比（江户限定）", en: "Surfing Phoebe (Edo Only)", ja: "サーフィンフィービー" }, no: "PM-000021" },
  { src: "/assets/renaissance.png", title: { zh: "坐了一下午的菲比", en: "Phoebe Sat All Afternoon", ja: "午後ずっと座っていた" }, no: "PM-000013" },
  { src: "/assets/garden.png", title: { zh: "假装看书的菲比", en: "Phoebe Pretending to Read", ja: "読んだふり" }, no: "PM-000028" },
];

const metaRows: { k: { zh: string; en: string; ja: string }; v: string | { zh: string; en: string; ja: string }; href?: string }[] = [
  { k: { zh: "创作者", en: "CREATOR", ja: "作者" }, v: "@tempest", href: "/creator/tempest" },
  { k: { zh: "世界线类型", en: "TYPE", ja: "種別" }, v: { zh: "官方 · 人类艺术史主线", en: "OFFICIAL · HUMAN TIMELINE", ja: "公式・人類時間線" } },
  { k: { zh: "所属展厅", en: "TIMELINE", ja: "展示室" }, v: "07 ROMANTICISM 浪漫主义", href: "/timeline/era/07" },
  { k: { zh: "创作年份", en: "YEAR", ja: "年" }, v: "2026" },
  { k: { zh: "收录日期", en: "COLLECTED", ja: "収蔵日" }, v: "2026.08.15" },
  { k: { zh: "原始出处", en: "SOURCE", ja: "出典" }, v: "artist-site.example/phoebe-cliff", href: "#" },
];

const tags = ["SEA", "STORM", "CLIFF", "指定POSE", "ROMANTICISM"];

export default function ArtworkPage() {
  const [lang] = useState<Lang>("zh");
  const [thumbIdx, setThumbIdx] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const [fav, setFav] = useState(false);

  useEffect(() => {
    if (lightbox) {
      document.body.style.overflow = "hidden";
      const onEsc = (e: KeyboardEvent) => { if (e.key === "Escape") setLightbox(false); };
      document.addEventListener("keydown", onEsc);
      return () => { document.body.style.overflow = ""; document.removeEventListener("keydown", onEsc); };
    }
    document.body.style.overflow = "";
  }, [lightbox]);

  const currentThumb = thumbs[thumbIdx];

  return (
    <>
      {/* 面包屑 */}
      <div className="crumb rv">
        <a href="/">HOME</a> / <a href="/collection">COLLECTION</a> / <span className="pm-no">PM-000039</span>
      </div>

      {/* 主作品区 */}
      <section className="work rv">
        <div className="visual">
          <span className="stamp">{t("浪漫主义指定pose", "Romanticism pose", "ロマン主義ポーズ", lang)}</span>
          <div className="art tape" onClick={() => setLightbox(true)} style={{ cursor: "zoom-in" }}>
            <img src={currentThumb.src} alt={t("站崖边想心事的菲比", "Phoebe on the Cliff", "崖の上のフィービー", lang)} style={{ filter: currentThumb.filter }} />
          </div>
          <div className="thumbs">
            {thumbs.map((th, i) => (
              <button
                key={i}
                className={thumbIdx === i ? "on" : ""}
                onClick={() => setThumbIdx(i)}
                style={th.filter ? { filter: th.filter } : {}}
              >
                <img src={th.src} alt="" style={th.filter ? { filter: th.filter } : {}} />
              </button>
            ))}
          </div>
        </div>

        <div className="panel">
          <div className="no">PM-000039</div>
          <h1>
            {t("站崖边想心事的菲比", "Phoebe on the Cliff, Thinking", "崖の上で物思いにふけるフィービー", lang)}
            <span className="en">PHOEBE ON THE CLIFF, THINKING</span>
          </h1>
          <div className="chips">
            <span className="chip illustration">{t("插画", "ILLUSTRATION", "イラスト", lang)}</span>
            <span className="chip" style={{ background: "var(--ink-3)" }}>{t("手工创作", "MANUAL", "手描き", lang)}</span>
          </div>

          <div className="meta">
            {metaRows.map((row, i) => (
              <div key={i} className="row">
                <span className="k">{t(row.k.zh, row.k.en, row.k.ja, lang)}</span>
                <span className="v">
                  {row.href ? (
                    <a href={row.href}>{typeof row.v === "string" ? row.v : t(row.v.zh, row.v.en, row.v.ja, lang)}</a>
                  ) : typeof row.v === "string" ? (
                    row.v
                  ) : (
                    t(row.v.zh, row.v.en, row.v.ja, lang)
                  )}
                </span>
              </div>
            ))}
          </div>

          <div className="about">
            <h4>{t("展签 · ABOUT THIS WORK", "ABOUT THIS WORK", "この作品について", lang)}</h4>
            <p>
              {t(
                "她已经在崖边站了三个小时。风很大，心事很小，但浪漫主义不管这些——只要站到崖边，你就是一幅画。本馆提醒：此 pose 已由浪漫主义展厅注册，其他时代展厅引用请注明出处。",
                "She has been standing on this cliff for three hours. The wind is strong, her worries are small, but Romanticism does not care — stand on a cliff and you become a painting.",
                "彼女は崖の上で3時間立っている。風は強く、悩みは小さい。でもロマン主義は気にしない。崖に立てば、それはもう絵画である。",
                lang,
              )}
            </p>
          </div>

          <div className="tags">
            {tags.map((tag) => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>

          <div className="favs">
            <button className={`btn fav-btn ${fav ? "on" : ""}`} onClick={() => setFav(!fav)}>
              {fav ? "\u2665" : "\u2661"} {t("收入我的博物馆", "ADD TO MY MUSEUM", "お気に入り", lang)}
            </button>
            <a className="btn ghost" href="/submit">{t("我也画了一张", "I MADE ONE TOO", "私も描いた", lang)}</a>
          </div>
        </div>
      </section>

      {/* 相关馆藏 */}
      <section className="sec rv">
        <div className="head">
          <div>
            <div className="kicker">
              <span className="no">RELATED</span>
              <span>{t("相关馆藏", "RELATED WORKS", "関連作品", lang)}</span>
            </div>
            <h2>
              {t("同一个作者的", "More ", "同じ作者の", lang)}
              <em>{t("菲比", "Phoebes", "フィービー", lang)}</em>
            </h2>
          </div>
          <a className="alink" href="/collection">
            {t("全部馆藏", "ALL ARTWORKS", "すべて", lang)} <span className="arr">{"\u2192"}</span>
          </a>
        </div>
        <div className="grid3">
          {related.map((r, i) => (
            <a
              key={r.no}
              className={`frame wob ${i === 1 ? "r" : ""}`}
              href={`/artwork/${r.no.replace("PM-", "").toLowerCase()}`}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="art">
                <img src={r.src} alt="" />
              </div>
              <div className="cap">
                <span className="t">{t(r.title.zh, r.title.en, r.title.ja, lang)}</span>
                <span className="m"><span className="pm-no">{r.no}</span></span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* 上下篇 */}
      <div className="prevnext">
        <a className="pn" href="/artwork/38">
          {"\u2190"} <span className="pm-no">PM-000038</span>
          <b>{t("假装看书的菲比", "Phoebe Pretending to Read", "読んだふり", lang)}</b>
        </a>
        <a className="pn next" href="/artwork/40">
          <span className="pm-no">PM-000040</span> {"\u2192"}
          <b>{t("机甲整备日志 第7回", "Mecha Maintenance Log #7", "機甲整備日誌 第7回", lang)}</b>
        </a>
      </div>

      {/* 灯箱 */}
      {lightbox && (
        <div className="lightbox open" onClick={() => setLightbox(false)}>
          <img src={currentThumb.src} alt="" style={{ filter: currentThumb.filter }} />
          <button className="close" onClick={(e) => { e.stopPropagation(); setLightbox(false); }}>{"\u2715"}</button>
          <div className="lcap">{t("点击任意位置关闭", "Click anywhere to close", "クリックで閉じる", lang)}</div>
        </div>
      )}
    </>
  );
}
