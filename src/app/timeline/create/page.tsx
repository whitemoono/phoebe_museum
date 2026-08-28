"use client";

import { useState, useRef } from "react";
import { t } from "@/lib/i18n";

type Lang = "zh" | "en" | "ja";

const tagOptions = ["OCEAN", "GHOST", "DARK FANTASY", "CYBERPUNK", "SLICE OF LIFE", "COZY", "MECHA", "RETRO"];

const lifeSteps = [
  { n: "1", b: "DRAFT", desc: { zh: "只有你自己看得见，随便改。", en: "Only visible to you.", ja: "自分だけが見られる。" } },
  { n: "2", b: "PENDING", desc: { zh: "审核员逐字阅读你的设定，一般 48 小时内。", en: "Moderators read every word, usually within 48h.", ja: "モデレーターが審査。" } },
  { n: "3", b: "COMMUNITY", desc: { zh: "全世界都能来投稿，脑洞开始增殖。", en: "Open for submissions from everyone.", ja: "全世界から投稿可能に。" } },
  { n: "4", b: "FEATURED", desc: { zh: "足够有趣的世界线会被挂上首页。", en: "Great ones get featured on the homepage.", ja: "優れた世界線はトップに。" } },
  { n: "5", b: "OFFICIAL", desc: { zh: "成为博物馆官方认可的世界线，载入史册。", en: "Becomes an officially canonized world.", ja: "公式認定の世界線へ。" } },
];

export default function CreateTimelinePage() {
  const [lang] = useState<Lang>("zh");
  const [tags, setTags] = useState<string[]>([]);
  const [uploaded, setUploaded] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const toggleTag = (tag: string) => {
    setTags((prev) => prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]);
  };

  return (
    <div className="tl-create-wrap rv">
      <div className="form-side">
        <div className="kicker">
          <span className="no">NEW TIMELINE</span>
          <span>{t("自立门户申请", "FOUND YOUR OWN WORLD", "世界線創設申請", lang)}</span>
        </div>
        <h1>
          {t("创建一条", "Found your own", "新しい世界線を", lang)}
          <br />
          <em>{t("你的世界线。", "timeline.", "創る。", lang)}</em>
        </h1>
        <p className="lead">
          {t(
            "可以是一场冒险、一个时代，或者只是「菲比拥有一家便利店」这样的小小世界。想清楚再填——世界线一旦公开，就会有陌生人往里面投菲比。",
            "An adventure, an era, or just \"Phoebe owns a convenience store\". Choose wisely — once public, strangers will start submitting Phoebes into your world.",
            "冒険でも、時代でも、「コンビニ店主フィービー」でも。公開すれば、見知らぬ人があなたの世界にフィービーを投稿し始めます。",
            lang,
          )}
        </p>

        <form onSubmit={(e) => e.preventDefault()}>
          <div className="field">
            <label>TIMELINE NAME · {t("英文名", "NAME", "英名", lang)} <span className="req">*</span></label>
            <input type="text" placeholder="GHOST SHIP PHOEBE" required />
            <div className="hint">{t("大写更有气势。将作为世界线永久网址：/timeline/community/ghost-ship-phoebe", "Uppercase looks better. URL: /timeline/community/ghost-ship-phoebe", "大文字が良い。URL: /timeline/community/ghost-ship-phoebe", lang)}</div>
          </div>

          <div className="field">
            <label>{t("中文名称", "DISPLAY NAME", "表示名", lang)} <span className="req">*</span></label>
            <input type="text" placeholder={t("幽灵船菲比", "Ghost Ship Phoebe", "幽霊船フィービー", lang)} required />
          </div>

          <div className="field">
            <label>DESCRIPTION · {t("世界线设定", "LORE", "世界観", lang)} <span className="req">*</span></label>
            <textarea
              placeholder={t(
                "在这个世界里，所有菲比都生活在一艘永远无法靠岸的幽灵船上……",
                "In this world, all Phoebes live on a ghost ship that can never dock...",
                "この世界では、全てのフィービーは永遠に接岸できない幽霊船に暮らしています……",
                lang,
              )}
              required
            />
            <div className="hint">{t("写得越离谱越要想清楚逻辑——审核员会逐字阅读（并且点评）。", "The wilder the lore, the more logic you need — moderators read every word.", "設定は奇抜でも論理が必要。審査員が熟読します。", lang)}</div>
          </div>

          <div className="field">
            <label>COVER ART · {t("封面", "COVER", "表紙", lang)} <span className="req">*</span></label>
            <div
              className={`upload ${uploaded ? "done" : ""}`}
              onClick={() => fileRef.current?.click()}
            >
              {uploaded ? (
                <>
                  <b>{"\u2713"}</b>cover-ghost-ship.png{t("（假装已上传）", " (mock upload)", "（仮）", lang)}
                </>
              ) : (
                <>
                  <b>+</b>{t("拖一张封面图进来，或点击选择", "Drag a cover image or click to select", "ドラッグまたはクリック", lang)}
                  <br />
                  <span style={{ fontSize: "9px" }}>16:9 {t("最佳", "best", "推奨", lang)} · JPG/PNG/WEBP · {"\u226420MB"}</span>
                </>
              )}
            </div>
            <input ref={fileRef} type="file" accept="image/*" style={{ display: "none" }} onChange={() => setUploaded(true)} />
          </div>

          <div className="field">
            <label>TAGS · {t("标签（选几个气质相符的）", "Tags", "タグ", lang)}</label>
            <div className="taginput">
              {tagOptions.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  className={`tagpick ${tags.includes(tag) ? "on" : ""}`}
                  onClick={() => toggleTag(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          <div className="row">
            <button type="button" className="btn ghost" onClick={() => alert(t("已存为草稿（原型演示）", "Draft saved (prototype)", "下書き保存（プロトタイプ）", lang))}>
              {t("存为草稿", "SAVE DRAFT", "下書き保存", lang)}
            </button>
            <button type="submit" className="btn solid" onClick={() => alert(t("已提交审核！审核员表示很期待（原型演示）", "Submitted for review! (prototype)", "審査に提出しました（プロトタイプ）", lang))}>
              {t("提交审核，公开我的世界", "SUBMIT FOR REVIEW", "審査に提出", lang)} {"\u2192"}
            </button>
          </div>
        </form>
      </div>

      <aside className="side">
        <div className="card">
          <h4>{t("世界线的一生", "Life of a timeline", "世界線の一生", lang)}</h4>
          <div className="steps">
            {lifeSteps.map((s, i) => (
              <div key={s.n} className="step" style={{ animationDelay: `${i * 0.08}s` }}>
                <span className="n">{s.n}</span>
                <div>
                  <b>{s.b}</b>
                  <span>{t(s.desc.zh, s.desc.en, s.desc.ja, lang)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <p className="warn">
          <b>{t("注意：", "Note: ", "注意：", lang)}</b>
          {t(
            "世界线网址（slug）全网唯一，「PIRATE PHOEBE」已经有人抢了。近似名称可能被管理员合并，取名请趁早。",
            "Slugs are unique — \"PIRATE PHOEBE\" is taken. Similar names may be merged by admins.",
            "スラッグは一意です。「PIRATE PHOEBE」は取得済み。類似名は統合されることがあります。",
            lang,
          )}
        </p>
      </aside>
    </div>
  );
}
