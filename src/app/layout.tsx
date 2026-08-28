import type { Metadata } from "next";
import "./globals.css";
import GlobalShell from "@/components/GlobalShell";

export const metadata: Metadata = {
  title: "PHOEBE MUSEUM · 菲比博物馆",
  description:
    "一座收藏二创菲比的数字博物馆。每一件作品都有编号，被认真对待、被长久记住。",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Inter:wght@400;500&family=Noto+Serif+SC:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <GlobalShell>{children}</GlobalShell>
        <footer className="pm-foot">
          <div className="inner">
            <div className="brand">
              PHOEBE MUSEUM
              <small>菲比博物馆 · 大概很严肃</small>
            </div>
            <div className="meta">
              <span>© 2026 PHOEBE MUSEUM</span>
              <span>*本馆的严肃程度以实际情况为准</span>
              <span>PM-000001 → ∞</span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
