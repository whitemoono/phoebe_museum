"use client";

import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import { getNavText, t } from "@/lib/i18n";

type Lang = "zh" | "en" | "ja";

const navItems = [
  { key: "home", href: "/" },
  { key: "collection", href: "/collection" },
  { key: "humanTimeline", href: "/timeline/human" },
  { key: "community", href: "/community" },
  { key: "creators", href: "/creators" },
  { key: "myMuseum", href: "/my" },
] as const;

export default function Navbar({ lang }: { lang: Lang }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const userbarRef = useRef<HTMLDivElement>(null);

  const nav = getNavText(lang);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("phoebe-auth") === "true");
  }, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (drawerOpen && navRef.current && !navRef.current.contains(e.target as Node)) {
        setDrawerOpen(false);
      }
      if (userMenuOpen && userbarRef.current && !userbarRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [drawerOpen, userMenuOpen, userbarRef]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const toggleDrawer = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDrawerOpen((v) => !v);
  };

  const logout = () => {
    localStorage.removeItem("phoebe-auth");
    localStorage.removeItem("phoebe-user");
    setIsLoggedIn(false);
    setUserMenuOpen(false);
  };

  // 双击登录pill模拟登录（preview中的开发者快捷方式）
  const devLogin = (e: React.MouseEvent) => {
    if (e.detail === 2) {
      e.preventDefault();
      setIsLoggedIn(true);
    }
  };

  return (
    <>
      <header ref={navRef} className={`pm-nav${scrolled ? " scrolled" : ""}`}>
        <a className="logo" href="/">
          PHOEBE MUSEUM
          <small>{t("菲比博物馆", "VERY SERIOUS MUSEUM*", "フィービー博物館", lang)}</small>
        </a>

        <nav className="links">
          {navItems.map(({ key, href }) => (
            <a
              key={key}
              href={href}
              className={isActive(href) ? "active" : ""}
            >
              {(nav as Record<string, string>)[key]}
            </a>
          ))}
        </nav>

        <div className="right">
          <div className="lang">
            {(["zh", "en", "ja"] as const).map((l) => (
              <button
                key={l}
                className={lang === l ? "active" : ""}
                onClick={() => {
                  localStorage.setItem("phoebe-lang", l);
                  window.location.reload();
                }}
              >
                {l === "zh" ? "中" : l === "en" ? "EN" : "日"}
              </button>
            ))}
          </div>
          <a className="submit-btn" href="/submit">
            {t("上交菲比", "SUBMIT", "投稿する", lang)}
          </a>
          <button className="menu-btn" onClick={toggleDrawer} aria-label="菜单">
            {drawerOpen ? "✕" : "☰"}
          </button>
        </div>
      </header>

      {/* 用户区域 */}
      <div
        className={`pm-userbar${userMenuOpen ? " open" : ""}`}
        data-login={isLoggedIn ? "true" : "false"}
        ref={userbarRef}
      >
        {!isLoggedIn && (
          <a
            className="login-pill"
            href="/login"
            onClick={(e) => {
              e.preventDefault();
              devLogin(e);
              // 正常流程打开登录弹窗
              window.dispatchEvent(new CustomEvent("open-auth"));
            }}
          >
            <span className="dot" />
            <span>{t("登录 / 注册", "LOGIN / SIGN UP", "ログイン", lang)}</span>
          </a>
        )}
        {isLoggedIn && (
          <div className="user-trigger" onClick={(e) => { e.stopPropagation(); setUserMenuOpen((v) => !v); }}>
            <div className="avatar">
              <img src="/assets/avatar-user.png" alt="" />
            </div>
            <span className="uname">{t("霓虹笔", "neon_pen", "霓虹筆", lang)}</span>
            <span className="chevron">▾</span>
          </div>
        )}
        <div className="user-menu">
          <div className="u-head">
            <div className="avatar">
              <img src="/assets/avatar-user.png" alt="" />
            </div>
            <div className="u-info">
              <div className="name">{t("霓虹笔", "neon_pen", "霓虹筆", lang)}</div>
              <div className="handle">@neon_pen</div>
            </div>
          </div>
          <a href="/my"><span className="icon">◆</span>{t("我的博物馆", "MY MUSEUM", "マイミュージアム", lang)}</a>
          <a href="/submit"><span className="icon">↑</span>{t("上交菲比", "SUBMIT", "投稿する", lang)}</a>
          <a href="/my"><span className="icon">♥</span>{t("我的收藏", "COLLECTIONS", "コレクション", lang)}</a>
          <div className="u-sep" />
          <button className="u-logout" onClick={logout}>
            <span className="icon">⏻</span>
            {t("退出登录", "SIGN OUT", "ログアウト", lang)}
          </button>
        </div>
      </div>

      {/* 移动端抽屉 */}
      <nav className={`pm-drawer${drawerOpen ? " open" : ""}`}>
        {navItems.map(({ key, href }) => (
          <a
            key={key}
            href={href}
            className={isActive(href) ? "active" : ""}
            onClick={() => setDrawerOpen(false)}
          >
            {`${(nav as Record<string, string>)[key]} · ${getNavText("en")[key as keyof typeof nav]}`}
          </a>
        ))}
      </nav>
    </>
  );
}
