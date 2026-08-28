"use client";

import { useState, useMemo, type CSSProperties } from "react";
import { t } from "@/lib/i18n";

type Lang = "zh" | "en" | "ja";

type Artwork = {
  no: string;
  title: { zh: string; en: string; ja: string };
  medium: string;
  method: string;
  author: string;
  world: string;
  src: string;
  style?: string;
  extra?: boolean;
};

const works: Artwork[] = [
  { no: "PM-000039", title: { zh: "站崖边想心事的菲比", en: "Phoebe on the Cliff", ja: "崖の上で物思いにふけるフィービー" }, medium: "illustration", method: "manual", author: "@tempest", world: "romanticism", src: "/assets/hero-sea.png" },
  { no: "PM-000013", title: { zh: "坐了一下午的菲比", en: "Phoebe Sat All Afternoon", ja: "午後ずっと座っていたフィービー" }, medium: "illustration", method: "manual", author: "@oilhand", world: "renaissance", src: "/assets/renaissance.png" },
  { no: "PM-000021", title: { zh: "冲浪的菲比（江户限定）", en: "Surfing Phoebe (Edo Only)", ja: "サーフィンフィービー（江戸限定）" }, medium: "illustration", method: "manual", author: "@wave", world: "ukiyo-e", src: "/assets/ukiyoe.png" },
  { no: "PM-000036", title: { zh: "加班到霓虹灯亮的菲比", en: "Overtime Phoebe", ja: "残業フィービー" }, medium: "ai", method: "ai", author: "@cyberlab", world: "cyber phoebe", src: "/assets/neon.png" },
  { no: "PM-000028", title: { zh: "假装看书的菲比", en: "Phoebe Pretending to Read", ja: "読んだふりフィービー" }, medium: "illustration", method: "manual", author: "@garden", world: "impressionism", src: "/assets/garden.png" },
  { no: "PM-000007", title: { zh: "史上最早的表情包", en: "Earliest Meme Ever", ja: "史上最古のスタンプ" }, medium: "illustration", method: "manual", author: "@cavedigger", world: "prehistoric", src: "/assets/cave.png" },
  { no: "PM-000042", title: { zh: "便利店夜班", en: "Convenience Store Night Shift", ja: "コンビニ夜勤" }, medium: "comic", method: "mixed", author: "@conveni", world: "store", src: "/assets/store.png" },
  { no: "PM-000041", title: { zh: "表情包文物合集", en: "Sticker Archive", ja: "スタンプコレクション" }, medium: "sticker", method: "mixed", author: "@memelord", world: "sticker", src: "/assets/stickers.png" },
  { no: "PM-000001", title: { zh: "一个人就是一支军队", en: "One Phoebe, an Army", ja: "一人で軍隊" }, medium: "illustration", method: "manual", author: "@founder", world: "pirate", src: "/assets/hero-pop.png" },
  { no: "PM-000033", title: { zh: "菲比的一天（影像）", en: "A Day of Phoebe (Video)", ja: "フィービーの一日" }, medium: "video", method: "mixed", author: "@filmclub", world: "unwritten", src: "/assets/hero-sea.png", style: "filter:hue-rotate(24deg) saturate(.8)", extra: true },
  { no: "PM-000030", title: { zh: "黏土菲比（可动）", en: "Clay Phoebe (Movable)", ja: "粘土フィービー" }, medium: "d3", method: "manual", author: "@clayworks", world: "modern", src: "/assets/garden.png", style: "filter:hue-rotate(-30deg) saturate(.85)", extra: true },
  { no: "PM-000025", title: { zh: "赛博菲比 2077", en: "Cyber Phoebe 2077", ja: "サイバーフィービー 2077" }, medium: "ai", method: "ai", author: "@cyberlab", world: "cyber", src: "/assets/neon.png", style: "filter:hue-rotate(40deg)", extra: true },
];

const mediums = [
  { id: "all", zh: "全部", en: "ALL", ja: "すべて", cls: "" },
  { id: "illustration", zh: "插画", en: "ILLUST", ja: "イラスト", cls: "c-illustration" },
  { id: "ai", zh: "AI 创作", en: "AI", ja: "AI", cls: "c-ai" },
  { id: "comic", zh: "漫画", en: "COMIC", ja: "漫画", cls: "c-comic" },
  { id: "d3", zh: "3D", en: "3D", ja: "3D", cls: "c-3d" },
  { id: "video", zh: "视频", en: "VIDEO", ja: "動画", cls: "c-video" },
  { id: "sticker", zh: "表情包", en: "STICKER", ja: "スタンプ", cls: "c-sticker" },
];

const methods = [
  { id: "all", zh: "不限", en: "ALL", ja: "すべて" },
  { id: "manual", zh: "手工", en: "MANUAL", ja: "手描き" },
  { id: "ai", zh: "AI 生成", en: "AI GEN", ja: "AI生成" },
  { id: "mixed", zh: "混合", en: "MIXED", ja: "混合" },
];

const mediumLabel: Record<string, { zh: string; en: string; ja: string }> = {
  illustration: { zh: "插画", en: "Illust", ja: "イラスト" },
  ai: { zh: "AI 创作", en: "AI", ja: "AI" },
  comic: { zh: "漫画", en: "Comic", ja: "漫画" },
  "d3": { zh: "3D", en: "3D", ja: "3D" },
  video: { zh: "视频", en: "Video", ja: "動画" },
  sticker: { zh: "表情包", en: "Sticker", ja: "スタンプ" },
};

export default function CollectionPage() {
  const [lang] = useState<Lang>("zh");
  const [fMedium, setFMedium] = useState("all");
  const [fMethod, setFMethod] = useState("all");
  const [q, setQ] = useState("");
  const [shown, setShown] = useState(9);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return works.filter((w) => {
      if (fMedium !== "all" && w.medium !== fMedium) return false;
      if (fMethod !== "all" && w.method !== fMethod) return false;
      if (query) {
        const key = `${w.no} ${w.title.zh} ${w.title.en} ${w.title.ja} ${w.author} ${w.world}`.toLowerCase();
        if (!key.includes(query)) return false;
      }
      return true;
    });
  }, [fMedium, fMethod, q]);

  const visible = filtered.slice(0, shown);
  const hasMore = filtered.length > shown;
  const allFiltered = fMedium === "all" && fMethod === "all" && !q.trim();
  const showMoreBtn = allFiltered && hasMore;

  return (
    <>
      {/* HERO */}
      <section className="hero rv">
        <div className="kicker">
          <span className="no">COLLECTION</span>
          <span>{t("全部馆藏 · 一件不落", "EVERY PHOEBE, CATALOGUED", "全収蔵品", lang)}</span>
        </div>
        <h1>
          {t("全是菲比，", "All Phoebe,", "全部フィービー、", lang)}
          <br />
          <em>{t("都有编号。", "all numbered.", "全部番号付き。", lang)}</em>
        </h1>
        <p>
          {t(
            "本馆承诺：这里没有一件作品不是菲比。按媒介、世界线、编号慢慢挑，看上了就点进去——每件作品都有自己的展签。",
            "Our promise: nothing here is not Phoebe. Filter by medium, timeline or accession number — every work has its own label.",
            "当館の約束：ここにあるのは全部フィービーです。媒介・世界線・番号で絞り込んで、じっくりご覧ください。",
            lang,
          )}
        </p>
      </section>

      {/* 筛选条 */}
      <div className="filters rv">
        <div className="group">
          <span className="lbl">{t("媒介", "MEDIUM", "媒介", lang)}</span>
          {mediums.map((m) => (
            <button
              key={m.id}
              className={`fchip ${m.cls} ${fMedium === m.id ? "on" : ""}`}
              onClick={() => setFMedium(m.id)}
            >
              {t(m.zh, m.en, m.ja, lang)}
            </button>
          ))}
        </div>
        <div className="group">
          <span className="lbl">{t("方式", "METHOD", "方法", lang)}</span>
          {methods.map((m) => (
            <button
              key={m.id}
              className={`fchip ${fMethod === m.id ? "on" : ""}`}
              onClick={() => setFMethod(m.id)}
            >
              {t(m.zh, m.en, m.ja, lang)}
            </button>
          ))}
        </div>
        <label className="search">
          <span>⌕</span>
          <input
            type="text"
            placeholder={t("编号 / 标题 / 创作者 / 世界线", "No. / Title / Creator / Timeline", "番号・タイトル・作者・世界線", lang)}
            value={q}
            onChange={(e) => { setQ(e.target.value); setShown(9); }}
          />
        </label>
      </div>

      {/* 网格 */}
      <section className="sec collection-sec rv">
        <div className="count">
          {t("共 ", "TOTAL ", "計 ", lang)}<b>{filtered.length}</b>{t(" 件菲比在册", " PHOEBES IN COLLECTION", " 点収蔵", lang)}
        </div>
        <div className="grid collection-grid">
          {visible.map((w, i) => {
            const ml = mediumLabel[w.medium] || mediumLabel.illustration;
            return (
              <a
                key={w.no}
                className={`frame wob ${i % 2 === 1 ? "r" : ""}`}
                href={`/artwork/${w.no.replace("PM-", "").toLowerCase()}`}
                style={{ animationDelay: `${(i % 6) * 0.08}s` }}
              >
                <div className="art">
                  <img src={w.src} alt={t(w.title.zh, w.title.en, w.title.ja, lang)} style={w.style as CSSProperties | undefined} />
                </div>
                <div className="cap">
                  <span className="t">{t(w.title.zh, w.title.en, w.title.ja, lang)}</span>
                  <span className="m">
                    <span className={`chip ${w.medium}`}>{t(ml.zh, ml.en, ml.ja, lang)}</span>{" "}
                    <span className="pm-no">{w.no}</span>
                  </span>
                </div>
              </a>
            );
          })}
        </div>
        {filtered.length === 0 && (
          <div className="empty" style={{ display: "block" }}>
            <b>{t("一件都没有？", "Nothing?", "一つもない？", lang)}</b>
            {t("不可能，这里全是菲比。换个条件试试。", "Impossible — everything here is Phoebe. Try other filters.", "不可能です。条件を変えてみてください。", lang)}
          </div>
        )}
        {showMoreBtn && (
          <div className="more">
            <button className="btn ghost" onClick={() => setShown(99)}>
              {t("再展出 3 件（LOAD MORE）", "LOAD MORE", "さらに3点", lang)}
            </button>
          </div>
        )}
      </section>
    </>
  );
}
