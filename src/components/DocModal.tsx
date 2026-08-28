"use client";

import { useEffect, useState } from "react";
import { t } from "@/lib/i18n";

type Lang = "zh" | "en" | "ja";

type DocType = "charter" | "pact" | null;

export default function DocModal({ lang }: { lang: Lang }) {
  const [doc, setDoc] = useState<DocType>(null);

  useEffect(() => {
    const openCharter = () => setDoc("charter");
    const openPact = () => setDoc("pact");
    window.addEventListener("open-charter", openCharter);
    window.addEventListener("open-pact", openPact);
    return () => {
      window.removeEventListener("open-charter", openCharter);
      window.removeEventListener("open-pact", openPact);
    };
  }, []);

  useEffect(() => {
    if (doc) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDoc(null);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [doc]);

  if (!doc) return null;

  const articles = doc === "charter" ? charterArticles : pactArticles;

  return (
    <div className="doc-overlay active" onClick={(e) => { if (e.target === e.currentTarget) setDoc(null); }}>
      <div className="doc-modal">
        <button className="doc-close" onClick={() => setDoc(null)}>✕</button>
        <div className="doc-content">
          <h2>
            {doc === "charter"
              ? t("菲比博物馆章程", "Phoebe Museum Charter", "フィービー博物館定款", lang)
              : t("数据公约", "Data Pact", "データ公約", lang)}
          </h2>
          <div className="doc-body">
            <p>
              {doc === "charter"
                ? t("欢迎来到菲比博物馆。本章程规定了博物馆的基本原则和运营规范。", "Welcome to Phoebe Museum. This charter establishes the fundamental principles and operational guidelines of the museum.", "フィービー博物館へようこそ。本定款は、博物館の基本原則と運営規程を定めています。", lang)
                : t("本公约规定了菲比博物馆的数据处理原则和用户隐私保护措施。", "This pact establishes the data processing principles and user privacy protection measures of Phoebe Museum.", "本公約は、フィービー博物館のデータ処理原則とユーザーのプライバシー保護措置を定めています。", lang)}
            </p>
            {articles.map((a, i) => (
              <div key={i}>
                <h3>{a.title[lang]}</h3>
                <p>{a.body[lang]}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const charterArticles = [
  {
    title: {
      zh: "第一条 性质与宗旨",
      en: "Article 1: Nature and Purpose",
      ja: "第一条：性質と目的",
    },
    body: {
      zh: "菲比博物馆是一个专注于幽灵船菲比这一虚构角色的数字艺术博物馆。我们致力于收集、保存和展示与菲比相关的二创作品，构建一个充满想象力的艺术社区。",
      en: "Phoebe Museum is a digital art museum dedicated to the fictional character Ghost Ship Phoebe. We are committed to collecting, preserving, and displaying fan-created works related to Phoebe, building an imaginative art community.",
      ja: "フィービー博物館は、幽霊船フィービーという架空のキャラクターに特化したデジタル美術博物館です。フィービーに関連するファン創作作品の収集、保存、展示に努め、想像力に富んだアートコミュニティを構築します。",
    },
  },
  {
    title: {
      zh: "第二条 创作者权利",
      en: "Article 2: Creator Rights",
      ja: "第二条：クリエイターの権利",
    },
    body: {
      zh: "所有创作者对其提交的作品保留完整的著作权。博物馆仅获得在本平台展示作品的非独占性授权。",
      en: "All creators retain full copyright ownership of their submitted works. The museum only receives a non-exclusive license to display works on this platform.",
      ja: "すべてのクリエイターは、提出した作品の完全な著作権を保持します。博物館は本プラットフォームでの作品展示に関する非独占的ライセンスのみを取得します。",
    },
  },
  {
    title: {
      zh: "第三条 社区准则",
      en: "Article 3: Community Guidelines",
      ja: "第三条：コミュニティガイドライン",
    },
    body: {
      zh: "我们鼓励创意表达和艺术探索，但禁止任何形式的骚扰、歧视或侵权行为。所有成员应相互尊重，共同维护社区的友好氛围。",
      en: "We encourage creative expression and artistic exploration, but prohibit any form of harassment, discrimination, or copyright infringement. All members should respect each other and jointly maintain a friendly community atmosphere.",
      ja: "創造的な表現と芸術的な探求を奨励しますが、いかなる形のハラスメント、差別、著作権侵害も禁止します。すべてのメンバーは相互に尊重し、コミュニティの友好的な雰囲気を共同で維持してください。",
    },
  },
];

const pactArticles = [
  {
    title: {
      zh: "第一条 数据收集",
      en: "Article 1: Data Collection",
      ja: "第一条：データ収集",
    },
    body: {
      zh: "我们仅收集提供服务所必需的最少数据，包括：邮箱地址、创作者代号、密码（加密存储）和您主动提交的作品信息。",
      en: "We collect only the minimum data necessary to provide our services, including: email address, creator code, password (encrypted storage), and artwork information you voluntarily submit.",
      ja: "サービス提供に必要な最小限のデータのみを収集します。これには：メールアドレス、クリエイターコード、パスワード（暗号化保存）、および自主的に提出する作品情報が含まれます。",
    },
  },
  {
    title: {
      zh: "第二条 数据使用",
      en: "Article 2: Data Usage",
      ja: "第二条：データの使用",
    },
    body: {
      zh: "您的数据仅用于：账户管理、作品展示、社区功能和必要的服务通知。我们绝不会将您的个人信息出售给第三方。",
      en: "Your data is used only for: account management, artwork display, community features, and necessary service notifications. We will never sell your personal information to third parties.",
      ja: "お客様のデータは：アカウント管理、作品展示、コミュニティ機能、および必要なサービス通知にのみ使用されます。個人情報を第三者に販売することは一切ありません。",
    },
  },
  {
    title: {
      zh: "第三条 数据安全",
      en: "Article 3: Data Security",
      ja: "第三条：データセキュリティ",
    },
    body: {
      zh: "我们采用行业标准的安全措施保护您的数据，包括加密传输、安全存储和定期安全审计。",
      en: "We employ industry-standard security measures to protect your data, including encrypted transmission, secure storage, and regular security audits.",
      ja: "業界標準のセキュリティ対策を採用してデータを保護します。これには暗号化通信、安全な保管、定期的なセキュリティ監査が含まれます。",
    },
  },
  {
    title: {
      zh: "第四条 用户权利",
      en: "Article 4: User Rights",
      ja: "第四条：ユーザーの権利",
    },
    body: {
      zh: "您有权随时访问、修改或删除您的个人数据。如需行使相关权利，请通过指定渠道联系我们。",
      en: "You have the right to access, modify, or delete your personal data at any time. To exercise these rights, please contact us through the designated channels.",
      ja: "いつでも個人データにアクセス、修正、または削除する権利があります。これらの権利を行使するには、指定されたチャネルからお問い合わせください。",
    },
  },
];
