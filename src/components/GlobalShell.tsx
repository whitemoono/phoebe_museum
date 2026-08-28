"use client";

import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import AuthModal from "./AuthModal";
import DocModal from "./DocModal";
import { ToastProvider } from "./Toast";

type Lang = "zh" | "en" | "ja";

export default function GlobalShell({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("zh");
  const [authOpen, setAuthOpen] = useState(false);

  useEffect(() => {
    const stored = (localStorage.getItem("phoebe-lang") || "zh") as Lang;
    setLang(stored);
    document.documentElement.lang = stored === "zh" ? "zh-CN" : stored;
  }, []);

  useEffect(() => {
    const onOpenAuth = () => setAuthOpen(true);
    window.addEventListener("open-auth", onOpenAuth);
    return () => window.removeEventListener("open-auth", onOpenAuth);
  }, []);

  // 滚动动画 + 回到顶部
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.06, rootMargin: "0px 0px -40px 0px" }
    );
    document.querySelectorAll(".rv").forEach((el) => observer.observe(el));

    // 创建回到顶部按钮
    const topBtn = document.createElement("button");
    topBtn.type = "button";
    topBtn.className = "to-top";
    topBtn.setAttribute("aria-label", "back to top");
    topBtn.textContent = "↑";
    document.body.appendChild(topBtn);
    topBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
    window.addEventListener("scroll", () => {
      topBtn.classList.toggle("show", window.scrollY > 600);
    }, { passive: true });

    return () => {
      observer.disconnect();
      topBtn.remove();
    };
  }, []);

  return (
    <ToastProvider>
      <Navbar lang={lang} />
      <AuthModal lang={lang} open={authOpen} onClose={() => setAuthOpen(false)} />
      <DocModal lang={lang} />
      {children}
    </ToastProvider>
  );
}
