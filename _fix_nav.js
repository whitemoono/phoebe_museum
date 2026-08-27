const fs = require("fs");

const content = `'use client'

import { useState, useEffect } from "react"
import Link from "next/link"
import { getNavText, t } from "@/lib/i18n"

const navItems = [
  { href: "/", key: "home" },
  { href: "/collection", key: "collection" },
  { href: "/timeline/human", key: "humanTimeline" },
  { href: "/timeline/community", key: "community" },
  { href: "/creators", key: "creators" },
  { href: "/my", key: "myMuseum" },
  { href: "/admin", key: "admin" },
]

export default function Navbar() {
  const [lang, setLang] = useState("zh")
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem("phoebe-lang")
    if (saved && ["zh", "en", "ja"].includes(saved)) {
      setLang(saved)
    }
  }, [])

  const handleLangChange = (newLang: string) => {
    setLang(newLang)
    localStorage.setItem("phoebe-lang", newLang)
    window.dispatchEvent(new Event("langChange"))
  }

  const navText = getNavText(lang)
  const logoText = t("菲比博物馆", "PHOEBE MUSEUM", "フィービー博物館", lang)

  return (
    <header className="nav">
      <Link href="/" className="logo">
        {logoText}
      </Link>
      <nav className="navlinks">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href}>
            {navText[item.key as keyof typeof navText]}
          </Link>
        ))}
      </nav>
      <div className="nav-right">
        <a href="/submit" style={{ background: "rgba(184, 134, 11, 0.85)", color: "#fff", padding: "7px 14px", fontSize: 10, letterSpacing: "0.06em", borderRadius: 20, fontWeight: 600, backdropFilter: "blur(10px)", whiteSpace: "nowrap" }}>
          {navText.submit}
        </a>
        <div style={{ display: "flex", gap: 1, background: "rgba(255,255,255,0.2)", borderRadius: 20, padding: 2, border: "1px solid rgba(255,255,255,0.3)" }}>
          {["zh", "en", "ja"].map((l) => (
            <button
              key={l}
              onClick={() => handleLangChange(l)}
              style={{
                background: lang === l ? "rgba(0,0,0,0.08)" : "transparent",
                color: lang === l ? "#2c2c2c" : "#94a2aa",
                border: "none",
                padding: "4px 8px",
                fontSize: 10,
                cursor: "pointer",
                borderRadius: 18,
                fontWeight: lang === l ? 600 : 400,
              }}
            >
              {l === "zh" ? "中" : l === "en" ? "EN" : "日"}
            </button>
          ))}
        </div>
      </div>
      <button className="menu" onClick={() => setIsOpen(!isOpen)} style={{ display: "none", background: "rgba(255,255,255,0.6)", border: "1px solid rgba(0,0,0,0.1)", color: "#2c2c2c", fontSize: 18, width: 40, height: 40, borderRadius: 10 }}>
        {isOpen ? "\u2715" : "\u2630"}
      </button>
    </header>
  )
}`;

fs.writeFileSync("D:\\dev\\Phoebe\\phoebe-museum\\src\\components\\Navbar.tsx", content, "utf8");
console.log("Navbar fixed");