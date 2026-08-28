"use client";

import { useState, useRef } from "react";
import { t } from "@/lib/i18n";

type Lang = "zh" | "en" | "ja";

type PreviewItem = { url: string; type: "image" | "video" };

const mediums = [
  { id: "illustration", label: "ILLUSTRATION", desc: { zh: "手绘 / 数绘", en: "Hand / Digital drawing", ja: "手描き・デジタル" }, chip: "illustration", zh: "插画" },
  { id: "ai", label: "AI CREATION", desc: { zh: "AI 生成 / 辅助", en: "AI generated / assisted", ja: "AI生成・補助" }, chip: "ai", zh: "AI" },
  { id: "comic", label: "COMIC", desc: { zh: "条漫 / 分镜", en: "Strip / Storyboard", ja: "マンガ・コマ割り" }, chip: "comic", zh: "漫画" },
  { id: "d3", label: "3D / MODEL", desc: { zh: "3D 建模 / 渲染", en: "3D modeling / render", ja: "3D・モデル" }, chip: "d3", zh: "3D" },
  { id: "video", label: "VIDEO", desc: { zh: "动画 / 短片", en: "Animation / Short film", ja: "アニメ・短編" }, chip: "video", zh: "视频" },
  { id: "sticker", label: "STICKER", desc: { zh: "表情 / 贴纸", en: "Emoji / Sticker", ja: "スタンプ・シール" }, chip: "sticker", zh: "表情包" },
];

const timelines = [
  "CYBER PHOEBE · 赛博菲比",
  "PIRATE PHOEBE · 海盗菲比",
  "PHOEBE OWNS A STORE · 便利店菲比",
  "MECHA PHOEBE · 机甲菲比",
  "GHOST SHIP PHOEBE · 幽灵船菲比",
];

export default function SubmitPage() {
  const [lang] = useState<Lang>("zh");
  const [medium, setMedium] = useState("illustration");
  const [previews, setPreviews] = useState<PreviewItem[]>([]);
  const [dragover, setDragover] = useState(false);
  const fileInput = useRef<HTMLInputElement>(null);

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    const arr = Array.from(files).filter((f) => f.type.match(/image|video/));
    if (arr.length === 0) return;
    const items = arr.map((f) => ({
      url: URL.createObjectURL(f),
      type: f.type.match("image") ? "image" as const : "video" as const,
    }));
    setPreviews((prev) => [...prev, ...items].slice(0, 8));
  };

  const removePreview = (idx: number) => {
    setPreviews((prev) => prev.filter((_, i) => i !== idx));
  };

  return (
    <section className="submit-wrap rv">
      <div className="head">
        <div className="kicker">
          <span className="no">SUBMIT</span>
          <span>{t("上交菲比", "HAND IN A PHOEBE", "フィービーを提出", lang)}</span>
        </div>
        <h1>
          {t("把你的菲比", "Hand over", "あなたのフィービーを", lang)}
          <br />
          <em>{t("交上来。", "your Phoebe.", "提出しよう。", lang)}</em>
        </h1>
        <p className="lead">
          {t(
            "审核通过后，你将获得永久馆藏编号（PM-0000XX），与人类文明共存亡。审核员很好说话——真的。只要你画的/做的/拍的/生成的确实是菲比，就收。",
            "Once approved, your work receives a permanent accession number. Our reviewers are easy — as long as it's recognizably Phoebe, it's in.",
            "審査通過後、永久収蔵番号が付与されます。審査員は甘めです——フィービーと分かれば何でもOK。",
            lang,
          )}
        </p>
      </div>

      <div className="steps">
        {[
          { n: "I.", h: { zh: "上传作品", en: "Upload", ja: "作品アップ" }, p: { zh: "图片、漫画、视频均可", en: "Image, comic, or video", ja: "画像・漫画・動画OK" } },
          { n: "II.", h: { zh: "填写信息", en: "Fill info", ja: "情報入力" }, p: { zh: "标题、描述、创作工具", en: "Title, description, tools", ja: "タイトル・説明・道具" } },
          { n: "III.", h: { zh: "选择归属", en: "Assign", ja: "帰属選択" }, p: { zh: "放入已有世界线或自创新线", en: "Pick or create a timeline", ja: "世界線を選択or作成" } },
          { n: "IV.", h: { zh: "等待编号", en: "Get number", ja: "番号待ち" }, p: { zh: "审核通过即获 PM 编号", en: "Receive a PM accession number", ja: "PM番号を取得" } },
        ].map((s, i) => (
          <div key={s.n} className="step" style={{ animationDelay: `${i * 0.1}s` }}>
            <div className="n">{s.n}</div>
            <h4>{t(s.h.zh, s.h.en, s.h.ja, lang)}</h4>
            <p>{t(s.p.zh, s.p.en, s.p.ja, lang)}</p>
          </div>
        ))}
      </div>

      <form className="form" onSubmit={(e) => e.preventDefault()}>
        {/* 上传区 */}
        <div className="field">
          <label>{t("作品文件", "FILE", "ファイル", lang)} <span className="req">*</span></label>
          <div
            className={`upload-zone ${dragover ? "dragover" : ""}`}
            onClick={() => fileInput.current?.click()}
            onDragOver={(e) => { e.preventDefault(); setDragover(true); }}
            onDragLeave={() => setDragover(false)}
            onDrop={(e) => { e.preventDefault(); setDragover(false); handleFiles(e.dataTransfer.files); }}
          >
            <div className="icon">{"\u2B06"}</div>
            <h4>{t("拖拽文件到这里，或点击选择", "Drag files here or click to select", "ドラッグまたはクリック", lang)}</h4>
            <p>JPG / PNG / WEBP / MP4 · {"\u226450MB"} · max 8</p>
            <input
              ref={fileInput}
              type="file"
              accept="image/*,video/*"
              multiple
              style={{ position: "absolute", inset: 0, opacity: 0, cursor: "pointer" }}
              onChange={(e) => handleFiles(e.target.files)}
            />
          </div>
          {previews.length > 0 && (
            <div className="upload-preview">
              {previews.map((p, i) => (
                <div key={i} className="item">
                  {p.type === "image" ? (
                    <img src={p.url} alt="" />
                  ) : (
                    <video src={p.url} controls style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  )}
                  <button className="rm" type="button" onClick={() => removePreview(i)}>{"\u2715"}</button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 标题 */}
        <div className="field">
          <label>{t("作品标题", "TITLE", "タイトル", lang)} <span className="req">*</span></label>
          <input type="text" maxLength={60} placeholder={t("例：便利店夜班（她看起来很困）", "e.g. Night Shift (She looks sleepy)", "例：コンビニ夜勤", lang)} />
          <div className="hint">{t("60字以内，好的标题有助于审核员笑场", "60 chars max. A good title helps.", "60字以内", lang)}</div>
        </div>

        {/* 描述 */}
        <div className="field">
          <label>{t("作品描述 / 创作说明", "DESCRIPTION", "説明", lang)}</label>
          <textarea
            maxLength={500}
            placeholder={t("讲讲这个菲比在干什么？灵感来源？创作过程？", "What is this Phoebe doing? Inspiration?", "このフィービーは何してる？", lang)}
          />
          <div className="hint">500 {t("字以内", "chars max", "字以内", lang)}</div>
        </div>

        {/* 媒介 */}
        <div className="field">
          <label>{t("创作媒介", "MEDIUM", "媒介", lang)} <span className="req">*</span></label>
          <div className="medium-grid">
            {mediums.map((m) => (
              <label key={m.id} className={medium === m.id ? "checked" : ""}>
                <input type="radio" name="medium" value={m.id} checked={medium === m.id} onChange={() => setMedium(m.id)} />
                <span className={`chip ${m.chip}`} style={{ marginBottom: 8, display: "inline-block" }}>{m.zh}</span>
                <span className="t" style={{ color: medium === m.id ? "var(--seal)" : "" }}>{m.label}</span>
                <span className="d">{t(m.desc.zh, m.desc.en, m.desc.ja, lang)}</span>
              </label>
            ))}
          </div>
        </div>

        {/* 世界线 */}
        <div className="field">
          <label>{t("归属世界线", "TIMELINE", "世界線", lang)}</label>
          <div className="timeline-select">
            <select defaultValue="">
              <option value="">{t("— 选择一条已有世界线 —", "— Select a timeline —", "— 世界線を選択 —", lang)}</option>
              {timelines.map((tl) => (
                <option key={tl} value={tl}>{tl}</option>
              ))}
            </select>
            <span className="or">{t("— 或 —", "— or —", "— または —", lang)}</span>
            <a className="btn ghost" href="/timeline/create" style={{ padding: "12px 20px" }}>
              {t("创建新世界线", "NEW TIMELINE", "新規世界線", lang)}
            </a>
          </div>
          <div className="hint">{t("不选也可以——系统会自动归入「散件菲比」暂存区", "Optional — defaults to loose storage", "未選択でもOK", lang)}</div>
        </div>

        {/* 标签 */}
        <div className="field">
          <label>{t("标签", "TAGS", "タグ", lang)}</label>
          <input type="text" placeholder={t("用逗号分隔，例：赛博朋克, 夜班, 猫, 霓虹", "Comma separated, e.g. Cyberpunk, Night, Cat, Neon", "カンマ区切り", lang)} />
        </div>

        {/* 署名 + 年份 */}
        <div className="field-row">
          <div className="field">
            <label>{t("创作者署名", "CREATOR", "作者名", lang)} <span className="req">*</span></label>
            <input type="text" placeholder="@yourname" value="@" readOnly />
          </div>
          <div className="field">
            <label>{t("创作年份", "YEAR", "制作年", lang)}</label>
            <input type="text" defaultValue="2026" />
          </div>
        </div>

        {/* 同意 */}
        <div className="field">
          <label className="agree">
            <input type="checkbox" required />
            <span>
              {t(
                "我确认此作品中的角色是菲比（同一个人），且我有权提交此作品。提交后作品归菲比博物馆永久馆藏，不可撤回——就像真正的博物馆一样。",
                "I confirm the character depicted is Phoebe, and I have the rights to submit. Once accepted, it becomes a permanent holding — irretrievable, like a real museum.",
                "この作品のキャラクターはフィービーであり、提出する権利があることを確認します。受理後は永久収蔵となり撤回できません。",
                lang,
              )}
            </span>
          </label>
        </div>

        {/* 提交 */}
        <div className="actions">
          <a className="btn ghost" href="/">{t("算了不交了", "NEVER MIND", "やめる", lang)}</a>
          <button className="btn solid" type="submit">
            {t("上交菲比", "SUBMIT PHOEBE", "提出する", lang)} {"\u2192"}
          </button>
        </div>
      </form>
    </section>
  );
}
