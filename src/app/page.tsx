"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { t } from "@/lib/i18n";

type Lang = "zh" | "en" | "ja";

const carouselSlides = [
  { src: "/assets/hero-pop.png", title: "一个人就是一支军队", sub: "菲比 COS 全阵容 · 本馆一号馆藏", no: "PM-000001", alt: "菲比 COS 全阵容" },
  { src: "/assets/hero-sea.png", title: "站崖边想心事的菲比", sub: "浪漫主义指定pose，请勿模仿", no: "PM-000039", alt: "站崖边想心事的菲比" },
  { src: "/assets/ukiyoe.png", title: "冲浪的菲比（江户限定）", sub: "浪花是借的，菲比是原装的", no: "PM-000021", alt: "冲浪的菲比" },
  { src: "/assets/neon.png", title: "加班到霓虹灯亮的菲比", sub: "赛博世界线人气 No.1", no: "PM-000036", alt: "加班到霓虹灯亮的菲比" },
  { src: "/assets/store.png", title: "便利店夜班", sub: "她看起来很困，猫也是", no: "PM-000042", alt: "便利店夜班菲比" },
  { src: "/assets/stickers.png", title: "表情包文物合集", sub: "学术价值未知，使用频率极高", no: "PM-0000XX", alt: "菲比表情包全集" },
];

const eras = [
  { n: "01", en: "PREHISTORIC", cn: "史前 · 最早的表情包，刻在墙上删不掉", c: "3 WORKS" },
  { n: "04", en: "RENAISSANCE", cn: "文艺复兴 · 她只是坐了一会儿", c: "5 WORKS" },
  { n: "07", en: "ROMANTICISM", cn: "浪漫主义 · 指定崖边站位", c: "4 WORKS" },
  { n: "09", en: "UKIYO-E", cn: "浮世绘 · 浪花是借的，菲比是原装的", c: "4 WORKS" },
  { n: "10", en: "IMPRESSIONISM", cn: "印象派 · 光很好，书没翻页", c: "6 WORKS" },
  { n: "13", en: "THE UNWRITTEN AGE", cn: "未书写时代 · AI 也开始画她了，拦不住", c: "9 WORKS" },
];

const worlds = [
  { src: "/assets/neon.png", cn: "赛博菲比", title: "CYBER PHOEBE", desc: "霓虹、机械、数据洪流。这条世界线里的菲比天天加班，但发质依然很好。", count: "15 WORKS", author: "@cyberlab", tag: "FEATURED" },
  { src: "/assets/hero-sea.png", cn: "海盗菲比", title: "PIRATE PHOEBE", desc: "暴风、木船、藏宝图。PM-000001 所属世界线，船长从不靠岸。", count: "12 WORKS", author: "@founder", tag: "FEATURED" },
  { src: "/assets/store.png", cn: "便利店菲比", title: "PHOEBE OWNS A STORE", desc: "菲比拥有一家便利店，值夜班，看人来人往，顺便打盹。", count: "06 WORKS", author: "@conveni", tag: "NEW" },
];

const registers = [
  { no: "PM-000042", title: "便利店夜班（她看起来很困）", s: "@conveni · PHOEBE OWNS A STORE", d: "2026.08.24" },
  { no: "PM-000041", title: "幽灵船之风灯", s: "@seamist · GHOST SHIP PHOEBE", d: "2026.08.22" },
  { no: "PM-000040", title: "机甲整备日志 第7回", s: "@mechworks · MECHA PHOEBE", d: "2026.08.19" },
  { no: "PM-000039", title: "站崖边想心事的菲比", s: "@tempest · ROMANTICISM", d: "2026.08.15" },
  { no: "PM-000038", title: "假装看书的菲比", s: "@garden · IMPRESSIONISM", d: "2026.08.11" },
];

const stats = [
  { num: "42", unit: { zh: "件", en: "PCS", ja: "点" }, label: { zh: "正式馆藏", en: "COLLECTED", ja: "正式収蔵品" }, note: { zh: "（还在涨）", en: "(and counting)", ja: "（増加中）" } },
  { num: "13", unit: { zh: "间", en: "ERAS", ja: "室" }, label: { zh: "时代展厅", en: "ERA GALLERIES", ja: "時代展示室" }, note: { zh: "（全部住满）", en: "(fully occupied)", ja: "（全部フィービー）" } },
  { num: "21", unit: { zh: "条", en: "WORLDS", ja: "線" }, label: { zh: "社区世界线", en: "FAN TIMELINES", ja: "世界線" }, note: { zh: "（脑洞无上限）", en: "(no limit)", ja: "（上限なし）" } },
  { num: "18", unit: { zh: "位", en: "NAMES", ja: "名" }, label: { zh: "共犯创作者", en: "ACCOMPLICES", ja: "共犯者" }, note: { zh: "（欢迎加入）", en: "(join us)", ja: "（募集中）" } },
];

export default function Home() {
  const [lang, setLang] = useState<Lang>("zh");
  const [ci, setCi] = useState(0);
  const [lbOpen, setLbOpen] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const saved = (localStorage.getItem("phoebe-lang") || "zh") as Lang;
    setLang(saved);
  }, []);

  const go = useCallback((i: number) => {
    setCi((prev) => {
      const next = (i + carouselSlides.length) % carouselSlides.length;
      return next;
    });
  }, []);

  const restart = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCi((prev) => (prev + 1) % carouselSlides.length);
    }, 4200);
  }, []);

  useEffect(() => {
    restart();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [restart]);

  const onCarouselEnter = () => { if (timerRef.current) clearInterval(timerRef.current); };
  const onCarouselLeave = () => restart();

  const openLightbox = () => {
    setLbOpen(true);
    document.body.style.overflow = "hidden";
    if (timerRef.current) clearInterval(timerRef.current);
  };
  const closeLightbox = () => {
    setLbOpen(false);
    document.body.style.overflow = "";
    restart();
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && lbOpen) closeLightbox();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [lbOpen]);

  const slide = carouselSlides[ci];
  const tt = (zh: string, en: string, ja: string) => t(zh, en, ja, lang);

  return (
    <main>
      {/* ================= HERO ================= */}
      <section className="hero rv page-enter">
        <div className="top">
          <div>
            <div className="kicker">
              <span className="no">EST. 2026</span>
              <span>{tt("一家 100% 严肃的二创博物馆*", "A 100% SERIOUS FAN-ART MUSEUM*", "100% 真面目な博物館*")}</span>
            </div>
            {lang === "en" && <h1>Every <em>Phoebe</em><span className="l2">deserves to be</span><em>remembered.</em></h1>}
            {lang === "zh" && <h1>每一个<em>菲比</em>，<span className="l2">都值得<em>被记住。</em></span></h1>}
            {lang === "ja" && <h1>すべての<em>フィービー</em>が、<span className="l2"><em>記憶される</em>ために。</span></h1>}
            <span className="zh">
              {tt(
                "这里收藏的全是菲比。对，全是。史前洞穴里的菲比、便利店打工的菲比、开高达的菲比——我们都收，而且给编号。",
                "Every single piece here is Phoebe. Yes, all of them. Cave-painting Phoebe, convenience-store Phoebe, mecha-pilot Phoebe — we collect them all, with serial numbers.",
                "ここにあるのは全部フィービー。はい、全部。洞窟壁画フィービーも、コンビニ店員フィービーも、収蔵番号付きで収集します。"
              ).split("对，全是。").map((part, i, arr) =>
                i < arr.length - 1 ? <span key={i}>{part}<b>对，全是。</b></span> : <span key={i}>{part}</span>
              )}
            </span>
            <p>{tt(
              "菲比博物馆郑重声明：本站所有角色均为同一个人。每件通过审核的作品都会获得永久馆藏编号 PM-000001 → ∞，与人类文明共存亡。",
              "Official statement: every character on this site is the same person. Each accepted work gets a permanent accession number, PM-000001 → ∞.",
              "公式声明：このサイトのキャラクターは全員同一人物です。審査を通過した作品には永久収蔵番号が発行されます。"
            )}</p>
            <div className="actions">
              <a className="btn solid" href="/submit">{tt("交出你的菲比", "HAND OVER YOUR PHOEBE", "フィービーを提出")}</a>
              <a className="btn" href="/collection">{tt("看看人类都干了什么", "SEE WHAT HUMANS DID", "人類の所業を見る")}</a>
            </div>
          </div>
          <div className="carousel tape" onMouseEnter={onCarouselEnter} onMouseLeave={onCarouselLeave}>
            <span className="stamp">镇馆之宝（自封）</span>
            <div className="viewport" title={tt("点击放大", "Click to zoom", "クリックで拡大")} onClick={openLightbox} style={{ cursor: "zoom-in" }}>
              {carouselSlides.map((s, i) => (
                <div key={i} className={`slide${i === ci ? " on" : ""}`}>
                  <img src={s.src} alt={s.alt} />
                </div>
              ))}
              <button className="arrow prev" onClick={(e) => { e.stopPropagation(); go(ci - 1); restart(); }} aria-label={tt("上一张", "Previous", "前へ")}>←</button>
              <button className="arrow next" onClick={(e) => { e.stopPropagation(); go(ci + 1); restart(); }} aria-label={tt("下一张", "Next", "次へ")}>→</button>
              <div className="dots">
                {carouselSlides.map((_, i) => (
                  <button key={i} className={i === ci ? "on" : ""} onClick={(e) => { e.stopPropagation(); go(i); restart(); }} aria-label={`第${i + 1}张`} />
                ))}
              </div>
            </div>
            <div className="cap">
              <span className="t">
                {slide.title}
                <span className="sub">{slide.sub}</span>
              </span>
              <span className="m">
                <span className="idx">{ci + 1} / {carouselSlides.length}</span> · <span className="pm-no">{slide.no}</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 灯箱 ================= */}
      {lbOpen && (
        <div className="lightbox open" onClick={closeLightbox} style={{ cursor: "zoom-out" }}>
          <button className="close" onClick={closeLightbox} aria-label={tt("关闭", "Close", "閉じる")}>✕</button>
          <img src={slide.src} alt={slide.alt} />
          <div className="lcap">{slide.title} · {slide.no}</div>
        </div>
      )}

      {/* ================= 跑马灯 ================= */}
      <div className="ticker" style={{ marginTop: 80 }}>
        <div className="track">
          <span>PM-000001 → ∞ {tt("持续收集中", "collecting", "収集中")}</span><i>✦</i>
          <span>{tt("表情包在本馆属于正式文物", "Memes are formal relics here", "スタンプは正式文化財")}</span><i>✦</i>
          <span>{tt("菲比已占领 13 个艺术时代", "Phoebe conquered 13 art eras", "フィービーは13の時代を占領")}</span><i>✦</i>
          <span>{tt("审核员很好说话，真的", "Reviewers are nice, really", "審査員は優しいです、本当に")}</span><i>✦</i>
          <span>{tt("本站所有角色均为同一个人", "All characters are the same person", "全キャラ同一人物")}</span><i>✦</i>
          <span>PM-000001 → ∞ {tt("持续收集中", "collecting", "収集中")}</span><i>✦</i>
          <span>{tt("表情包在本馆属于正式文物", "Memes are formal relics here", "スタンプは正式文化財")}</span><i>✦</i>
          <span>{tt("菲比已占领 13 个艺术时代", "Phoebe conquered 13 art eras", "フィービーは13の時代を占領")}</span><i>✦</i>
          <span>{tt("审核员很好说话，真的", "Reviewers are nice, really", "審査員は優しいです、本当に")}</span><i>✦</i>
          <span>{tt("本站所有角色均为同一个人", "All characters are the same person", "全キャラ同一人物")}</span><i>✦</i>
        </div>
      </div>

      {/* ================= 当前展出 ================= */}
      <section className="sec rv">
        <div className="head">
          <div>
            <div className="kicker"><span className="no">01</span><span>{tt("当前展出", "NOW ON VIEW", "現在展示中")}</span></div>
            <h2>
              <em>{tt("正在被一本正经地收藏", "Being collected, very seriously", "真面目に収蔵されています")}</em>
              <span className="note">{tt("*以下作品均为同一个角色，请勿在展厅内笑场", "*All works below depict the same character. No laughing in the gallery.", "※以下はすべて同一キャラクターです")}</span>
            </h2>
          </div>
          <a className="alink" href="/collection">{tt("全部馆藏", "ALL ARTWORKS", "すべての収蔵品")} <span className="arr">→</span></a>
        </div>
        <div className="onview">
          <a className="frame a wob" href="/artwork">
            <div className="art"><img src="/assets/renaissance.png" alt="坐了一下午的菲比" /></div>
            <div className="cap">
              <span className="t">{tt("坐了一下午的菲比", "Phoebe Sat All Afternoon", "座ったままのフィービー")}<span className="sub">{tt("她当时真的只是坐了一会儿，就被画成了文艺复兴", "She just sat for a moment and became a Renaissance", "ちょっと座っただけでルネサンスに")}</span></span>
              <span className="m"><span className="chip illustration">插画</span> <span className="pm-no">PM-000013</span></span>
            </div>
          </a>
          <div className="b">
            <a className="frame wob r" href="/artwork">
              <div className="art"><img src="/assets/ukiyoe.png" alt="冲浪的菲比" /></div>
              <div className="cap">
                <span className="t">{tt("冲浪的菲比（江户限定）", "Surfing Phoebe (Edo Edition)", "波乗りフィービー")}<span className="sub">{tt("浪花是借的，菲比是原装的", "Waves borrowed, Phoebe original", "波は借り物、フィービーは本物")}</span></span>
                <span className="m"><span className="chip illustration">插画</span> <span className="pm-no">PM-000021</span></span>
              </div>
            </a>
            <a className="frame wob" href="/artwork">
              <div className="art"><img src="/assets/cave.png" alt="史上最早的表情包" /></div>
              <div className="cap">
                <span className="t">{tt("史上最早的表情包", "Earliest Meme in History", "史上最初のスタンプ")}<span className="sub">{tt("距今约一万年，刻在墙上，删不掉", "About 10,000 years old, carved on a wall, undeletable", "約一万年前、壁に刻まれた、消せない")}</span></span>
                <span className="m"><span className="chip illustration">插画</span> <span className="pm-no">PM-000007</span></span>
              </div>
            </a>
          </div>
          <a className="frame c wob" href="/artwork">
            <div className="art"><img src="/assets/garden.png" alt="假装看书的菲比" /></div>
            <div className="cap">
              <span className="t">{tt("假装看书的菲比", "Phoebe Pretending to Read", "読書するふり")}<span className="sub">{tt("十分钟没翻页，光很好", "Hasn't turned a page in 10 min, great lighting", "10分経ってもページめくらない、光が良い")}</span></span>
              <span className="m"><span className="chip illustration">插画</span> <span className="pm-no">PM-000028</span></span>
            </div>
          </a>
          <a className="frame d wob r" href="/artwork">
            <div className="art"><img src="/assets/neon.png" alt="加班到霓虹灯亮的菲比" /></div>
            <div className="cap">
              <span className="t">{tt("加班到霓虹灯亮的菲比", "Phoebe Working Till Neon O'Clock", "ネオンが点くまで残業")}<span className="sub">{tt("赛博世界线人气 No.1", "Most popular in the Cyber timeline", "サイバー世界線人気No.1")}</span></span>
              <span className="m"><span className="chip ai">AI 创作</span> <span className="pm-no">PM-000036</span></span>
            </div>
          </a>
          <a className="frame e wob" href="/artwork">
            <div className="art"><img src="/assets/hero-sea.png" alt="站崖边想心事的菲比" /></div>
            <div className="cap">
              <span className="t">{tt("站崖边想心事的菲比", "Phoebe Pondering on a Cliff", "崖で物思いのフィービー")}<span className="sub">{tt("浪漫主义指定pose，请勿模仿", "Designated Romanticism pose, do not imitate", "ロマン主義指定ポーズ、模倣注意")}</span></span>
              <span className="m"><span className="chip illustration">插画</span> <span className="pm-no">PM-000039</span></span>
            </div>
          </a>
        </div>
      </section>

      {/* ================= 两座展馆 ================= */}
      <section className="sec rv">
        <div className="head">
          <div>
            <div className="kicker"><span className="no">02</span><span>{tt("两座展馆", "TWO WINGS", "二つの展示棟")}</span></div>
            <h2>
              <span>{tt("一个角色，", "One character, ", "一人のキャラ、")}</span>
              <em>{tt("两条不归路", "two rabbit holes.", "二つの沼")}</em>
            </h2>
          </div>
        </div>
        <div className="wings">
          <a className="wing" href="/timeline/human">
            <div className="roman">I.</div>
            <h3>HUMAN TIMELINE<small>{tt("人类艺术史主线 · 官方展厅", "THE OFFICIAL CANON", "人類芸術史の主線")}</small></h3>
            <p>{tt(
              "从洞穴壁画到 AI 绘画，人类画菲比画了整整一万年。十三间时代展厅，每一间都在证明：菲比早就潜伏在艺术史里了。",
              "From cave walls to AI art, humans have been drawing Phoebe for ten thousand years. Thirteen era galleries prove she was there all along.",
              "洞窟壁画からAI絵画まで、人類は一万年もフィービーを描き続けてきました。十三の展示室がその証拠です。"
            )}</p>
            <span className="alink">{tt("看她怎么穿越的", "SEE HER TIME-TRAVEL", "タイムトラベルを見る")} <span className="arr">→</span></span>
          </a>
          <a className="wing" href="/community">
            <div className="roman">II.</div>
            <h3>COMMUNITY MULTIVERSE<small>{tt("社区平行世界 · 脑洞无上限", "INFINITE FAN WORLDS", "コミュニティ多元宇宙")}</small></h3>
            <p>{tt(
              "海盗菲比、赛博菲比、开便利店的菲比……网友的脑洞没有审核上限。你也可以创建一条世界线，让全世界往里投稿。",
              "Pirate Phoebe, Cyber Phoebe, Phoebe who runs a convenience store — there is no review limit on imagination. Found your own timeline and open it to everyone.",
              "海賊フィービー、サイバーフィービー、コンビニフィービー。妄想に審査上限はありません。自分の世界線も作れます。"
            )}</p>
            <span className="alink">{tt("参观网友的脑洞", "TOUR THE BRAINHOLES", "みんなの妄想を見る")} <span className="arr">→</span></span>
          </a>
        </div>
      </section>

      {/* ================= 展厅索引 ================= */}
      <section className="sec rv">
        <div className="head">
          <div>
            <div className="kicker"><span className="no">03</span><span>{tt("展厅索引", "THE CANON", "展示室索引")}</span></div>
            <h2>
              <span>{tt("菲比穿越史", "Phoebe through time", "フィービー穿越史")}</span>
              <em>{tt("（官方认证）", "(certified)", "（公式認定）")}</em>
              <span className="note">{tt("十三个时代展厅，全部住满了菲比", "Thirteen era galleries, all fully occupied by Phoebe", "十三の時代展示室、全部フィービーだらけ")}</span>
            </h2>
          </div>
          <a className="alink" href="/timeline/human">{tt("完整长廊", "FULL TIMELINE", "タイムライン全体")} <span className="arr">→</span></a>
        </div>
        <div className="era-list">
          {eras.map((e) => (
            <a key={e.n} className="era" href="/timeline/era">
              <span className="n">{e.n}</span>
              <span className="en">{e.en}</span>
              <span className="cn">{e.cn}</span>
              <span className="c">{e.c}</span>
              <span className="arr">→</span>
            </a>
          ))}
        </div>
      </section>

      {/* ================= 表情包专区 ================= */}
      <section className="sec rv">
        <div className="meme">
          <span className="stamp r">{tt("本馆最贵重展区（并不）", "Most precious gallery (not really)", "最も貴重な展示室（というわけではない）")}</span>
          <div>
            <div className="kicker"><span className="no">04</span><span>{tt("表情包专区", "STICKER VAULT", "スタンプ特別室")}</span></div>
            <h3>
              <span>{tt("博物馆史上第一次，", "First time in museum history:", "博物館史上初めて、")}</span><br />
              <em>{tt("把表情包当文物", "memes as relics.", "スタンプが文化財に")}</em>
            </h3>
            <p>{tt(
              "哭、笑、震惊、得意——菲比的每一种崩坏表情都被正式归档。学术价值未知，使用频率极高。本区展品允许（并且鼓励）被截图带走。",
              "Every dramatic Phoebe face, formally archived. Academic value unknown, usage frequency extremely high. Screenshotting is allowed and encouraged.",
              "泣き顔も笑い顔も、すべて正式にアーカイブ。学術価値は不明、使用頻度は極めて高し。スクリーンショット推奨。"
            )}</p>
            <a className="btn" href="/collection">{tt("参观表情包文物", "VISIT THE MEME RELICS", "スタンプ文化財へ")}</a>
          </div>
          <div className="art tape"><img src="/assets/stickers.png" alt={tt("菲比表情包全集", "Phoebe sticker collection", "フィービースタンプ全集")} /></div>
        </div>
      </section>

      {/* ================= 平行世界 ================= */}
      <section className="sec rv">
        <div className="head">
          <div>
            <div className="kicker"><span className="no">05</span><span>{tt("社区多元宇宙", "COMMUNITY PICKS", "コミュニティ")}</span></div>
            <h2>
              <em>{tt("网友的脑洞陈列室", "The brainhole gallery", "みんなの妄想陳列室")}</em>
              <span className="note">{tt("温馨提示：以下世界线均为网友自发创建，本馆概不负责", "All timelines below are user-created. The museum takes no responsibility.", "※以下の世界線はすべてユーザー作成です")}</span>
            </h2>
          </div>
          <a className="alink" href="/community">{tt("全部世界线", "ALL TIMELINES", "すべての世界線")} <span className="arr">→</span></a>
        </div>
        <div className="worlds">
          {worlds.map((w, i) => (
            <a key={i} className={`world wob${i === 1 ? " r" : ""}`} href="/timeline/detail">
              <div className="art"><img src={w.src} alt={w.title} /><span className="st">{w.tag}</span></div>
              <div className="bd">
                <div className="cn">{w.cn}</div>
                <h3>{w.title}</h3>
                <p>{w.desc}</p>
                <div className="ft"><span>{w.count}</span><span>{w.author}</span></div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* ================= 登记册 ================= */}
      <section className="sec rv">
        <div className="head">
          <div>
            <div className="kicker"><span className="no">06</span><span>{tt("收录登记册", "ACQUISITIONS REGISTER", "収蔵登録簿")}</span></div>
            <h2>
              <span>{tt("最新", "Fresh ", "最新の")}</span>
              <em>{tt("落网菲比", "Phoebes in custody", "確保されたフィービー")}</em>
            </h2>
          </div>
          <a className="alink" href="/archive">{tt("完整登记册", "FULL REGISTER", "登録簿を見る")} <span className="arr">→</span></a>
        </div>
        <div>
          {registers.map((r) => (
            <a key={r.no} className="reg-row" href="/artwork">
              <span className="pm-no">{r.no}</span>
              <span className="t">{r.title}</span>
              <span className="s">{r.s}</span>
              <span className="d">{r.d}</span>
            </a>
          ))}
        </div>
      </section>

      {/* ================= STATS ================= */}
      <section className="sec rv">
        <div className="stats">
          {stats.map((s, i) => (
            <div key={i} className="stat">
              <b>{s.num}<i>{tt(s.unit.zh, s.unit.en, s.unit.ja)}</i></b>
              <span>{tt(s.label.zh, s.label.en, s.label.ja)}</span>
              <em>{tt(s.note.zh, s.note.en, s.note.ja)}</em>
            </div>
          ))}
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="cta rv">
        <div className="kicker">
          <span className="no">07</span>
          <span>{tt("最后提醒", "FINAL NOTICE", "最後のお知らせ")}</span>
        </div>
        <h2>
          <span>{tt("别让你的菲比", "Don't let your Phoebe", "あなたのフィービーを")}</span><br />
          <em>{tt("流落民间。", "roam the wild.", "野放しにするな。")}</em>
        </h2>
        <p>{tt(
          "上交一件作品，审核通过即可获得永久馆藏编号；或者干脆自立门户，创建一条属于你的世界线，让全世界来投稿。",
          "Hand in a work to receive a permanent accession number — or found your own timeline and let the whole world submit to it.",
          "作品を提出して永久収蔵番号をゲット。または自分の世界線を創って、世界中から投稿を集めよう。"
        )}</p>
        <div className="row">
          <a className="btn solid" href="/submit">{tt("上交菲比（投稿）", "SUBMIT A PHOEBE", "フィービーを提出")}</a>
          <a className="btn" href="/create-timeline">{tt("自立门户（建世界线）", "FOUND A TIMELINE", "世界線を創る")}</a>
        </div>
      </section>
    </main>
  );
}
