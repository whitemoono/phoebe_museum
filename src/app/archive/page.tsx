"use client";

import { useState, useMemo } from "react";
import { t } from "@/lib/i18n";

type Lang = "zh" | "en" | "ja";

type Row = {
  pm: string; title: { zh: string; en: string; ja: string }; en: string;
  creator: string; medium: string; year: number; timeline: string;
};

const rows: Row[] = [
  { pm: "PM-000178", title: { zh: "机甲驾驶员", en: "Mecha Pilot", ja: "機甲パイロット" }, en: "MECHA PILOT PHOEBE", creator: "@phoebe_collector", medium: "d3", year: 2026, timeline: "MECHA PHOEBE" },
  { pm: "PM-000156", title: { zh: "海盗船长菲比", en: "Pirate Captain", ja: "海賊船長" }, en: "PIRATE CAPTAIN PHOEBE", creator: "@phoebe_collector", medium: "illustration", year: 2026, timeline: "PIRATE PHOEBE" },
  { pm: "PM-000142", title: { zh: "便利店夜班", en: "Night Shift", ja: "コンビニ夜勤" }, en: "CONVENIENCE STORE NIGHT SHIFT", creator: "@phoebe_collector", medium: "illustration", year: 2026, timeline: "STORE PHOEBE" },
  { pm: "PM-000098", title: { zh: "雨夜霓虹", en: "Neon Rainy Night", ja: "雨夜ネオン" }, en: "NEON RAINY NIGHT", creator: "@phoebe_collector", medium: "ai", year: 2025, timeline: "CYBER PHOEBE" },
  { pm: "PM-000071", title: { zh: "菲比在画画", en: "Phoebe Painting", ja: "フィービー描画中" }, en: "PHOEBE PAINTING", creator: "@phoebe_collector", medium: "illustration", year: 2025, timeline: "散件" },
  { pm: "PM-000045", title: { zh: "猫耳菲比", en: "Cat Ear", ja: "猫耳" }, en: "CAT EAR PHOEBE", creator: "@phoebe_collector", medium: "illustration", year: 2025, timeline: "散件" },
  { pm: "PM-000033", title: { zh: "魔法少女菲比", en: "Magical Girl", ja: "魔法少女" }, en: "MAGICAL GIRL PHOEBE", creator: "@magical_art", medium: "illustration", year: 2025, timeline: "散件" },
  { pm: "PM-000029", title: { zh: "武士菲比", en: "Samurai", ja: "侍" }, en: "SAMURAI PHOEBE", creator: "@samurai_art", medium: "comic", year: 2025, timeline: "散件" },
  { pm: "PM-000017", title: { zh: "蒸汽朋克菲比", en: "Steampunk", ja: "蒸気朋克" }, en: "STEAMPUNK PHOEBE", creator: "@steampunk", medium: "illustration", year: 2025, timeline: "散件" },
  { pm: "PM-000003", title: { zh: "初代菲比", en: "First Ever", ja: "初代" }, en: "FIRST EVER PHOEBE", creator: "@creator_01", medium: "illustration", year: 2024, timeline: "散件" },
  { pm: "PM-000001", title: { zh: "菲比·原型", en: "Prototype", ja: "プロトタイプ" }, en: "PHOEBE · PROTOTYPE", creator: "@museum_founder", medium: "illustration", year: 2024, timeline: "散件" },
];

const mediumMap: Record<string, { zh: string; en: string; ja: string }> = {
  illustration: { zh: "插画", en: "Illust", ja: "イラスト" },
  ai: { zh: "AI", en: "AI", ja: "AI" },
  comic: { zh: "漫画", en: "Comic", ja: "漫画" },
  d3: { zh: "3D", en: "3D", ja: "3D" },
  video: { zh: "视频", en: "Video", ja: "動画" },
  sticker: { zh: "表情包", en: "Sticker", ja: "スタンプ" },
};

export default function ArchivePage() {
  const [lang] = useState<Lang>("zh");
  const [q, setQ] = useState("");
  const [medium, setMedium] = useState("all");
  const [year, setYear] = useState("");
  const [timeline, setTimeline] = useState("");
  const [sort, setSort] = useState("newest");

  const filtered = useMemo(() => {
    const query = q.toLowerCase();
    let result = rows.filter((r) => {
      if (query) {
        const hay = `${r.pm} ${r.title.zh} ${r.title.en} ${r.title.ja} ${r.en} ${r.creator}`.toLowerCase();
        if (!hay.includes(query)) return false;
      }
      if (medium !== "all" && r.medium !== medium) return false;
      if (year) {
        if (year === "earlier") { if (r.year >= 2024) return false; }
        else if (r.year !== parseInt(year)) return false;
      }
      if (timeline && !r.timeline.includes(timeline)) return false;
      return true;
    });
    result = [...result];
    if (sort === "newest") result.sort((a, b) => b.year - a.year || b.pm.localeCompare(a.pm));
    else if (sort === "oldest") result.sort((a, b) => a.year - b.year || a.pm.localeCompare(b.pm));
    else if (sort === "pm") result.sort((a, b) => a.pm.localeCompare(b.pm));
    return result;
  }, [q, medium, year, timeline, sort]);

  const sortNames: Record<string, { zh: string; en: string; ja: string }> = {
    newest: { zh: "按编号降序", en: "Newest first", ja: "新着順" },
    oldest: { zh: "按编号升序", en: "Oldest first", ja: "古い順" },
    hottest: { zh: "按热度", en: "Hottest", ja: "人気順" },
    pm: { zh: "按编号", en: "By number", ja: "番号順" },
  };

  return (
    <>
      <section className="archive-hero rv">
        <div className="kicker">
          <span className="no">ARCHIVE</span>
          <span>{t("档案馆", "ARCHIVE", "アーカイブ", lang)}</span>
        </div>
        <h1>
          {t("所有菲比，", "Every Phoebe,", "全てのフィービー、", lang)}
          <br />
          <em>{t("都在这里。", "ever made.", "ここに。", lang)}</em>
        </h1>
        <p className="lead">
          {t(
            "本馆全部馆藏的完整索引，从 PM-000001 到最新上交的菲比。可按编号、年份、媒介、世界线、创作者检索。这是菲比的全息索引。",
            "The complete index of every Phoebe, from PM-000001 to the latest. Search by number, year, medium, timeline or creator. This is the holographic index of Phoebe.",
            "全収蔵品の完全索引。PM-000001から最新まで。番号・年・媒介・世界線・作者で検索可能。",
            lang,
          )}
        </p>
      </section>

      {/* 检索工具 */}
      <section className="archive-tools rv">
        <div className="search-bar">
          <input
            type="text"
            placeholder={t("搜索编号 PM-0000XX、标题、创作者……", "Search PM No., title, creator...", "PM番号・タイトル・作者を検索...", lang)}
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <button>{t("检索", "SEARCH", "検索", lang)}</button>
        </div>
        <div className="archive-filters">
          <span className="lbl">{t("媒介", "MEDIUM", "媒介", lang)}</span>
          {["all", "illustration", "ai", "comic", "d3", "video", "sticker"].map((m) => (
            <span
              key={m}
              className={`tag ${medium === m ? "active" : ""}`}
              onClick={() => setMedium(m)}
            >
              {m === "all" ? "ALL" : t(mediumMap[m].zh, mediumMap[m].en, mediumMap[m].ja, lang)}
            </span>
          ))}
        </div>
        <div className="archive-filters" style={{ marginTop: 12 }}>
          <span className="lbl">{t("年份", "YEAR", "年", lang)}</span>
          <select value={year} onChange={(e) => setYear(e.target.value)}>
            <option value="">{t("全部年份", "All years", "全年度", lang)}</option>
            <option value="2026">2026</option>
            <option value="2025">2025</option>
            <option value="2024">2024</option>
            <option value="earlier">{t("更早", "Earlier", "以前", lang)}</option>
          </select>
          <span className="lbl" style={{ marginLeft: 16 }}>{t("世界线", "TIMELINE", "世界線", lang)}</span>
          <select value={timeline} onChange={(e) => setTimeline(e.target.value)}>
            <option value="">{t("所有世界线", "All timelines", "全世界線", lang)}</option>
            <option value="CYBER">CYBER PHOEBE</option>
            <option value="PIRATE">PIRATE PHOEBE</option>
            <option value="STORE">STORE PHOEBE</option>
            <option value="MECHA">MECHA PHOEBE</option>
          </select>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="newest">{t("排序：最新", "Sort: Newest", "並び：新着", lang)}</option>
            <option value="oldest">{t("排序：最旧", "Sort: Oldest", "並び：古い", lang)}</option>
            <option value="hottest">{t("排序：最热", "Sort: Hottest", "並び：人気", lang)}</option>
            <option value="pm">{t("排序：编号", "Sort: Number", "並び：番号", lang)}</option>
          </select>
        </div>
      </section>

      {/* 档案主体 */}
      <section className="archive-body">
        <aside className="archive-side">
          <h4>{t("快速跳转", "QUICK JUMP", "クイック", lang)}</h4>
          <ul>
            <li><a onClick={() => { setYear("2026"); }}>2026 {t("年", "", "年", lang)} <span className="cnt">1,247</span></a></li>
            <li><a onClick={() => { setYear("2025"); }}>2025 {t("年", "", "年", lang)} <span className="cnt">892</span></a></li>
            <li><a onClick={() => { setYear("2024"); }}>2024 {t("年", "", "年", lang)} <span className="cnt">431</span></a></li>
            <li><a onClick={() => { setYear("earlier"); }}>{t("更早", "Earlier", "以前", lang)} <span className="cnt">23</span></a></li>
          </ul>
          <h4>{t("热门世界线", "TOP TIMELINES", "人気世界線", lang)}</h4>
          <ul>
            <li><a onClick={() => setTimeline("CYBER")}>CYBER PHOEBE <span className="cnt">234</span></a></li>
            <li><a onClick={() => setTimeline("PIRATE")}>PIRATE PHOEBE <span className="cnt">156</span></a></li>
            <li><a onClick={() => setTimeline("STORE")}>STORE PHOEBE <span className="cnt">412</span></a></li>
            <li><a onClick={() => setTimeline("MECHA")}>MECHA PHOEBE <span className="cnt">89</span></a></li>
          </ul>
          <h4>{t("热门标签", "TOP TAGS", "人気タグ", lang)}</h4>
          <ul>
            <li><a onClick={() => setQ("赛博朋克")}>#赛博朋克 <span className="cnt">423</span></a></li>
            <li><a onClick={() => setQ("日常")}>#日常 <span className="cnt">312</span></a></li>
            <li><a onClick={() => setQ("猫")}>#猫 <span className="cnt">289</span></a></li>
            <li><a onClick={() => setQ("霓虹")}>#霓虹 <span className="cnt">201</span></a></li>
          </ul>
        </aside>

        <div className="archive-results">
          <div className="result-head">
            <h3>{t("全部馆藏", "FULL CATALOG", "全目録", lang)}</h3>
            <span className="sort">{t("共 ", "TOTAL ", "計 ", lang)}{filtered.length}{t(" 件 · ", " items · ", " 件・", lang)}{t(sortNames[sort].zh, sortNames[sort].en, sortNames[sort].ja, lang)}</span>
          </div>
          <div className="table-scroll">
            <table className="archive-table">
              <thead>
                <tr>
                  <th>PM NO.</th>
                  <th>{t("标题", "TITLE", "タイトル", lang)}</th>
                  <th>{t("创作者", "CREATOR", "作者", lang)}</th>
                  <th>{t("媒介", "MEDIUM", "媒介", lang)}</th>
                  <th>YEAR</th>
                  <th>{t("世界线", "TIMELINE", "世界線", lang)}</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((r) => (
                  <tr key={r.pm} onClick={() => { window.location.href = `/artwork/${r.pm.replace("PM-", "").toLowerCase()}`; }}>
                    <td className="pm-no">{r.pm}</td>
                    <td className="title">{t(r.title.zh, r.title.en, r.title.ja, lang)}<small>{r.en}</small></td>
                    <td className="creator">{r.creator}</td>
                    <td><span className={`chip ${r.medium}`}>{t(mediumMap[r.medium].zh, mediumMap[r.medium].en, mediumMap[r.medium].ja, lang)}</span></td>
                    <td className="year">{r.year}</td>
                    <td>{r.timeline}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="pagination">
            <button>{"\u2190"}</button>
            <button className="active">1</button>
            <button>2</button>
            <button>3</button>
            <button>4</button>
            <button>{"\u2026"}</button>
            <button>237</button>
            <button>{"\u2192"}</button>
          </div>
        </div>
      </section>
    </>
  );
}
