import Navbar from '@/components/Navbar'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-screen flex items-end px-[5vw] pb-[10vh]">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[rgba(7,19,30,0.3)] to-[rgba(7,19,30,0.85)]" />
        
        <div className="relative z-10 max-w-[680px]">
          <div className="text-[10px] tracking-[0.4em] uppercase text-[var(--gold)] mb-6 flex items-center gap-3">
            CURRENT EXHIBITION · PM-000001
            <span className="flex-1 max-w-[80px] h-[1px] bg-[rgba(216,164,71,0.3)]" />
          </div>
          
          <h1 className="font-serif text-[clamp(2.8rem,6vw,5rem)] font-bold leading-[1.08] mb-7">
            <span className="block">收藏每一个</span>
            <span className="block">世界里的菲比</span>
          </h1>
          
          <p className="text-base text-[var(--muted)] leading-[1.9] mb-10 max-w-[480px]">
            菲比博物馆是一个由创作者与爱好者共同构建的数字艺术档案馆。
            这里记录来自不同创作者、不同想象与不同世界线的菲比。
          </p>
          
          <div className="flex gap-4 flex-wrap">
            <a
              href="#exhibit"
              className="px-5 py-3 bg-[var(--gold)] text-[var(--ink)] text-[10px] tracking-[0.16em] uppercase font-semibold hover:bg-[var(--gold2)] transition-all"
            >
              ENTER THE MUSEUM →
            </a>
            <a
              href="/collection"
              className="px-5 py-3 border border-[var(--gold)] text-[var(--paper)] text-[10px] tracking-[0.16em] uppercase hover:bg-[var(--gold)] hover:text-[var(--ink)] transition-all"
            >
              EXPLORE COLLECTION
            </a>
          </div>
        </div>
        
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[var(--muted)] text-[9px] tracking-[0.3em] uppercase animate-bounce">
          SCROLL
          <div className="w-[1px] h-10 bg-gradient-to-b from-[var(--gold)] to-transparent" />
        </div>
      </section>
      
      {/* Intro Section */}
      <section id="intro" className="py-[120px] px-[5vw]">
        <div className="max-w-[1280px] mx-auto">
          <div className="text-[10px] tracking-[0.35em] uppercase text-[var(--gold)] mb-4 flex items-center gap-3.5">
            <span className="w-8 h-[1px] bg-[var(--gold)]" />
            WELCOME TO THE ARCHIVE
          </div>
          
          <h2 className="font-serif text-[clamp(2rem,4.5vw,3.6rem)] font-semibold leading-[1.15] mb-5">
            每一个世界里的菲比，
            <br />
            <em>都值得被收藏。</em>
          </h2>
          
          <p className="text-[15px] text-[var(--muted)] max-w-[560px] leading-[1.8] font-light">
            菲比博物馆是一个由创作者与爱好者共同构建的数字艺术档案馆。
            我们收藏插画、AI 创作、漫画、3D、视频、表情包，以及所有无法被简单定义的菲比。
          </p>
          
          <div className="grid grid-cols-3 gap-6 mt-10 pt-8 border-t border-[var(--line)]">
            <div className="text-center">
              <div className="font-serif text-4xl font-bold text-[var(--gold2)]">∞</div>
              <div className="text-[10px] tracking-[0.2em] uppercase text-[var(--muted)]">World Lines</div>
            </div>
            <div className="text-center">
              <div className="font-serif text-4xl font-bold text-[var(--gold2)]">6</div>
              <div className="text-[10px] tracking-[0.2em] uppercase text-[var(--muted)]">Mediums</div>
            </div>
            <div className="text-center">
              <div className="font-serif text-4xl font-bold text-[var(--gold2)]">5</div>
              <div className="text-[10px] tracking-[0.2em] uppercase text-[var(--muted)]">Worlds</div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
