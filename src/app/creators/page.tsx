"use client";

import { useState } from "react";
import { t } from "@/lib/i18n";

type Lang = "zh" | "en" | "ja";

const creators = [
  { initial: "F", bg: "#4a6272", nm: "founder", un: "@founder", desc: { zh: "本馆馆长兼一号共犯。建立了海盗菲比世界线，从此一发不可收拾。", en: "Museum director and accomplice #1. Founded the Pirate Phoebe timeline.", ja: "館長兼一号共犯。海賊フィービー世界線創設。" }, works: 8, timelines: 3 },
  { initial: "C", bg: "#7a5a8a", nm: "cyberlab", un: "@cyberlab", desc: { zh: "赛博菲比世界线创始人。坚信霓虹灯是菲比的第二层皮肤。", en: "Founder of Cyber Phoebe. Believes neon is Phoebe's second skin.", ja: "サイバーフィービー創設。ネオンは第二の皮膚。" }, works: 6, timelines: 1 },
  { initial: "W", bg: "#c96f5a", nm: "wave", un: "@wave", desc: { zh: "浮世绘展厅常驻画手。浪花画得比菲比还认真。", en: "Ukiyo-e resident artist. Waves more serious than Phoebe.", ja: "浮世絵常駐画家。波の方が真剣。" }, works: 4, timelines: 0 },
  { initial: "T", bg: "#4fa3b8", nm: "tempest", un: "@tempest", desc: { zh: "浪漫主义指定崖边摄影师（自称）。风越大，产量越高。", en: "Romanticism cliff photographer (self-proclaimed).", ja: "ロマン主義崖撮影者（自称）。" }, works: 4, timelines: 0 },
  { initial: "C", bg: "#d8a447", nm: "conveni", un: "@conveni", desc: { zh: "便利店菲比世界线创始人。现实中真的在便利店打工，这是纪录片。", en: "Store Phoebe founder. Actually works at a convenience store.", ja: "コンビニフィービー創設。実際にコンビニで働いている。" }, works: 5, timelines: 1 },
  { initial: "M", bg: "#d98ba3", nm: "memelord", un: "@memelord", desc: { zh: "表情包专区主要供应商。产量占本馆表情包文物的八成。", en: "Main sticker supplier. 80% of all stickers.", ja: "スタンプ主供給者。8割を担当。" }, works: 9, timelines: 0 },
];

export default function CreatorsPage() {
  const [lang] = useState<Lang>("zh");

  return (
    <>
      <section className="hero rv">
        <div className="kicker">
          <span className="no">CREATORS</span>
          <span>{t("共犯名录", "THE ACCOMPLICES", "共犯者名簿", lang)}</span>
        </div>
        <h1>
          {t("量产菲比的", "The Phoebe", "フィービー量産", lang)}
          <br />
          <em>{t("共犯们。", "accomplices.", "共犯者たち。", lang)}</em>
        </h1>
        <p>
          {t(
            "以下人员对馆内 42 件菲比负有直接责任。他们中有人画画，有人写提示词，有人专门生产表情包——本馆对以上行为表示感谢与默许。",
            "These people are directly responsible for all 42 Phoebes in the collection. Some draw, some prompt, some mass-produce memes — the museum thanks and tolerates them all.",
            "以下の面々は、収蔵された42点のフィービーに直接責任があります。当館は感謝と黙認を表明します。",
            lang,
          )}
        </p>
      </section>

      <section className="sec rv">
        <div className="grid creators-grid">
          {creators.map((c, i) => (
            <a
              key={c.un}
              className="creator"
              href={`/creator/${c.nm}`}
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <div className="top">
                <span className="avatar" style={{ background: c.bg }}>{c.initial}</span>
                <div>
                  <div className="nm">{c.nm}</div>
                  <div className="un">{c.un}</div>
                </div>
              </div>
              <p>{t(c.desc.zh, c.desc.en, c.desc.ja, lang)}</p>
              <div className="ft">
                <span><b>{c.works}</b>WORKS</span>
                <span><b>{c.timelines}</b>{c.timelines === 1 ? "TIMELINE" : "TIMELINES"}</span>
              </div>
            </a>
          ))}
        </div>
      </section>
    </>
  );
}
