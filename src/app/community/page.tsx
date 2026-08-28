"use client";

import { useState } from "react";
import { t } from "@/lib/i18n";

type Lang = "zh" | "en" | "ja";

type World = {
  cn: { zh: string; en: string; ja: string };
  en: string;
  desc: { zh: string; en: string; ja: string };
  count: number;
  author: string;
  src?: string;
  phWorld?: string;
  c1?: string;
  c2?: string;
  status: string;
};

const featured: World[] = [
  { cn: { zh: "海盗菲比", en: "Pirate Phoebe", ja: "海賊フィービー" }, en: "PIRATE PHOEBE", desc: { zh: "暴风、木船、藏宝图。PM-000001 所属世界线，船长从不靠岸。", en: "Storms, wooden ships, treasure maps. The captain never docks.", ja: "嵐・木船・宝の地図。船長は寄港しない。" }, count: 12, author: "@founder", src: "/assets/hero-sea.png", status: "FEATURED" },
  { cn: { zh: "赛博菲比", en: "Cyber Phoebe", ja: "サイバーフィービー" }, en: "CYBER PHOEBE", desc: { zh: "霓虹、机械、数据洪流。这里的菲比天天加班，发质依然很好。", en: "Neon, chrome, data floods. Always overtime, great hair.", ja: "ネオン・機械・データの濁流。残業だらけでも髪は綺麗。" }, count: 15, author: "@cyberlab", src: "/assets/neon.png", status: "FEATURED" },
  { cn: { zh: "哥特菲比", en: "Gothic Phoebe", ja: "ゴシックフィービー" }, en: "GOTHIC PHOEBE", desc: { zh: "教堂、夜色与黑色蕾丝。菲比说她没有在装酷，她天生就这样。", en: "Cathedrals, night, black lace. She's not trying to be cool.", ja: "教会・夜・黒いレース。天生クール。" }, count: 9, author: "@nightarch", phWorld: "goth?", c1: "#e9dfe4", c2: "#c9b3c0", status: "FEATURED" },
];

const fresh: World[] = [
  { cn: { zh: "便利店菲比", en: "Phoebe Owns a Store", ja: "コンビニフィービー" }, en: "PHOEBE OWNS A STORE", desc: { zh: "菲比拥有一家便利店，值夜班，看人来人往，顺便打盹。", en: "Phoebe owns a convenience store. Night shifts, people-watching, naps.", ja: "コンビニを経営するフィービー。夜勤・通行人・居眠り。" }, count: 6, author: "@conveni", src: "/assets/store.png", status: "NEW" },
  { cn: { zh: "90 年代东京菲比", en: "1990s Tokyo", ja: "1990s東京" }, en: "1990s TOKYO", desc: { zh: "CRT 电视、唱片店与泡沫时代之后的东京。菲比在打公用电话。", en: "CRT TVs, record shops, post-bubble Tokyo. Phoebe is on a payphone.", ja: "ブラウン管・レコード屋・ポストバブルの東京。" }, count: 0, author: "@retro", phWorld: "1990s", c1: "#e4e9ef", c2: "#bccbd8", status: "NEW" },
];

const randomPool = [
  { en: "GHOST SHIP PHOEBE", cn: { zh: "幽灵船菲比", en: "Ghost Ship Phoebe", ja: "幽霊船フィービー" }, desc: { zh: "在这个世界里，所有菲比都生活在一艘永远无法靠岸的幽灵船上。海雾、风灯与无人知晓的航线。", en: "All Phoebes live on a ship that can never dock. Sea fog, lanterns, unknown routes.", ja: "永遠に寄港できない幽霊船の上のフィービーたち。" } },
  { en: "MECHA PHOEBE", cn: { zh: "机甲菲比", en: "Mecha Phoebe", ja: "機甲フィービー" }, desc: { zh: "巨型机甲、驾驶员与钢铁的浪漫。菲比的同步率今天也是 400%。", en: "Giant mechas, pilots, steel romance. Sync rate: 400% today.", ja: "巨大機甲・パイロット・鋼鉄のロマンス。同期率400%。" } },
  { en: "FOOD PHOEBE", cn: { zh: "美食菲比", en: "Food Phoebe", ja: "美食フィービー" }, desc: { zh: "面包店、深夜食堂与温暖的日常。这条世界线里没有人饿着。", en: "Bakeries, late-night diners, warm everyday life. No one goes hungry.", ja: "パン屋・深夜食堂・暖かな日常。" } },
  { en: "APOCALYPSE PHOEBE", cn: { zh: "末日菲比", en: "Apocalypse Phoebe", ja: "終末フィービー" }, desc: { zh: "废土、幸存与文明终结之后。菲比依然坚持给植物浇水。", en: "Wasteland, survival, after the end. Phoebe still waters her plants.", ja: "廃土・生き残り・文明の終わり後。植物には水をやる。" } },
  { en: "SCHOOL PHOEBE", cn: { zh: "校园菲比", en: "School Phoebe", ja: "学園フィービー" }, desc: { zh: "制服、天台、放学后的黄昏。转学生菲比坐在靠窗倒数第二排。", en: "Uniforms, rooftop, after-school sunset. Transfer student, window seat, second from back.", ja: "制服・屋上・放課後の夕焼け。転校生フィービー。" } },
];

export default function CommunityPage() {
  const [lang] = useState<Lang>("zh");
  const [rtIdx, setRtIdx] = useState(0);
  const rt = randomPool[rtIdx];

  const roll = () => setRtIdx((prev) => (prev + 1 + Math.floor(Math.random() * (randomPool.length - 1))) % randomPool.length);

  return (
    <>
      {/* HERO */}
      <section className="hero rv">
        <div className="kicker">
          <span className="no">WING II</span>
          <span>{t("社区平行世界 · 脑洞无上限", "INFINITE FAN WORLDS", "コミュニティ多元宇宙", lang)}</span>
        </div>
        <h1>
          {t("一千种菲比，", "Thousands of", "千のフィービー、", lang)}
          <br />
          <em>{t("一种比一种离谱。", "possible Phoebes.", "全部あり。", lang)}</em>
        </h1>
        <p>
          {t(
            "这里允许每一个人创造属于自己的菲比世界——海盗、赛博、太空、哥特，甚至「菲比拥有一家便利店」。每一条世界线都是一间由你亲手创建的展厅，创建后全世界都能往里投稿。",
            "Anyone can found a Phoebe world here — pirates, cyber, space, gothic, even \"Phoebe owns a convenience store\". Every timeline is a gallery you build and the whole world submits to.",
            "誰でも自分のフィービー世界を創れます。海賊・サイバー・宇宙・ゴス、そして「コンビニ店主フィービー」。世界線はあなたの展示室です。",
            lang,
          )}
        </p>
        <div className="actions">
          <a className="btn solid" href="/timeline/create">
            {"+ "}{t("创建我的世界线", "CREATE A TIMELINE", "世界線を創る", lang)}
          </a>
        </div>
      </section>

      {/* 精选世界线 */}
      <section className="sec rv">
        <div className="head">
          <div>
            <div className="kicker">
              <span className="no">01</span>
              <span>{t("精选世界线", "FEATURED", "精選", lang)}</span>
            </div>
            <h2>
              <em>{t("官方盖戳的脑洞", "Certified brainholes", "公式認定の妄想", lang)}</em>
              <span className="note">{t("由审核员含泪精选", "Hand-picked by our tearful moderators", "モデレーター厳選", lang)}</span>
            </h2>
          </div>
        </div>
        <div className="worlds">
          {featured.map((w, i) => (
            <a key={w.en} className={`world wob ${i === 1 ? "r" : ""}`} href="/timeline/detail">
              <div className="art">
                {w.src ? (
                  <img src={w.src} alt={w.en} />
                ) : (
                  <div className="ph-world" style={{ "--c1": w.c1, "--c2": w.c2 } as React.CSSProperties}>{w.phWorld}</div>
                )}
                <span className="st">{w.status}</span>
              </div>
              <div className="bd">
                <div className="cn">{t(w.cn.zh, w.cn.en, w.cn.ja, lang)}</div>
                <h3>{w.en}</h3>
                <p>{t(w.desc.zh, w.desc.en, w.desc.ja, lang)}</p>
                <div className="ft">
                  <span>{w.count} WORKS</span>
                  <span>{w.author}</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* 新开世界线 */}
      <section className="sec rv">
        <div className="head">
          <div>
            <div className="kicker">
              <span className="no">02</span>
              <span>{t("新开世界线", "NEW TIMELINES", "新着", lang)}</span>
            </div>
            <h2>
              <em>{t("刚出炉的平行世界", "Fresh out of the oven", "できたての並行世界", lang)}</em>
            </h2>
          </div>
        </div>
        <div className="worlds c2">
          {fresh.map((w, i) => (
            <a key={w.en} className={`world wob ${i === 1 ? "r" : ""}`} href="/timeline/detail">
              <div className="art">
                {w.src ? (
                  <img src={w.src} alt={w.en} />
                ) : (
                  <div className="ph-world" style={{ "--c1": w.c1, "--c2": w.c2 } as React.CSSProperties}>{w.phWorld}</div>
                )}
                <span className="st">{w.status}</span>
              </div>
              <div className="bd">
                <div className="cn">{t(w.cn.zh, w.cn.en, w.cn.ja, lang)}</div>
                <h3>{w.en}</h3>
                <p>{t(w.desc.zh, w.desc.en, w.desc.ja, lang)}</p>
                <div className="ft">
                  <span>{w.count} WORKS</span>
                  <span>{w.author}</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* 今日盲盒 */}
      <section className="sec rv">
        <div className="head">
          <div>
            <div className="kicker">
              <span className="no">03</span>
              <span>{t("今日盲盒", "RANDOM TIMELINE", "ランダム", lang)}</span>
            </div>
            <h2>
              <em>{t("抽一条没见过的世界线", "Roll a random world", "ランダムで世界線を引く", lang)}</em>
            </h2>
          </div>
        </div>
        <div className="random rv">
          <div className="art">
            <div className="t">{rt.en.split(" ").slice(0, -1).join(" ")}<br />{rt.en.split(" ").slice(-1)[0]}</div>
          </div>
          <div className="rb">
            <div className="k">{t("TODAY'S RANDOM WORLD · 今日盲盒", "TODAY'S RANDOM WORLD", "今日のランダムワールド", lang)}</div>
            <h3>{t(rt.cn.zh, rt.cn.en, rt.cn.ja, lang)}</h3>
            <p>{t(rt.desc.zh, rt.desc.en, rt.desc.ja, lang)}</p>
            <div className="row">
              <a className="btn" href="/timeline/detail">
                {t("进入这条世界线", "ENTER THIS WORLD", "この世界線へ", lang)} {"\u2192"}
              </a>
              <button className="btn ghost" onClick={roll}>
                {t("换一条", "REROLL", "もう一度", lang)} {"\u27F3"}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="sec cta rv">
        <div className="kicker">
          <span className="no">04</span>
          <span>{t("轮到你了", "YOUR TURN", "あなたの番", lang)}</span>
        </div>
        <h2>
          <em>{t("你的脑洞，也值得一条世界线。", "Your brainhole deserves a timeline.", "あなたの妄想にも世界線を。", lang)}</em>
        </h2>
        <p>
          {t(
            "可以是一场冒险、一个时代，或者只是「菲比开了一家便利店」这样的小小世界。审核通过后，全世界都能来投稿。",
            "Could be an adventure, an era, or just \"Phoebe runs a store\". Once approved, the world can submit to it.",
            "冒険でも時代でも、ただの「コンビニ」でも。審査通過後、世界中が投稿できます。",
            lang,
          )}
        </p>
        <div className="row">
          <a className="btn solid" href="/timeline/create">
            {"+ "}{t("创建世界线", "CREATE A TIMELINE", "世界線を創る", lang)}
          </a>
        </div>
      </section>
    </>
  );
}
