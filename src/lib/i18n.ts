// Language translations
const translations = {
  nav: {
    zh: {
      home: "首页",
      collection: "馆藏",
      humanTimeline: "人类时间线",
      community: "社区世界线",
      creators: "创作者",
      archive: "档案馆",
      myMuseum: "我的博物馆",
      admin: "管理后台",
      submit: "上交菲比",
    },
    en: {
      home: "HOME",
      collection: "COLLECTION",
      humanTimeline: "HUMAN TIMELINE",
      community: "COMMUNITY",
      creators: "CREATORS",
      archive: "ARCHIVE",
      myMuseum: "MY MUSEUM",
      admin: "ADMIN",
      submit: "SUBMIT",
    },
    ja: {
      home: "ホーム",
      collection: "収蔵品",
      humanTimeline: "人類の時間線",
      community: "コミュニティ",
      creators: "クリエイター",
      archive: "アーカイブ",
      myMuseum: "マイミュージアム",
      admin: "管理画面",
      submit: "投稿する",
    },
  },
};

export type NavKey = keyof typeof translations.nav.zh;
export type Lang = "zh" | "en" | "ja";

export function getNavText(lang: string) {
  return translations.nav[lang as Lang] || translations.nav.zh;
}

export function t(zh: string, en: string, ja: string, lang: string) {
  switch (lang) {
    case "en":
      return en;
    case "ja":
      return ja;
    default:
      return zh;
  }
}
