// Language translations
const translations = {
  nav: {
    zh: { home: '首页', collection: '馆藏', humanTimeline: '人类时间线', community: '社区世界线', creators: '创作者', myMuseum: '我的博物馆', admin: '管理后台', submit: '投稿作品 ↗' },
    en: { home: 'HOME', collection: 'COLLECTION', humanTimeline: 'HUMAN TIMELINE', community: 'COMMUNITY', creators: 'CREATORS', myMuseum: 'MY MUSEUM', admin: 'ADMIN', submit: 'SUBMIT WORK ↗' },
    ja: { home: 'ホーム', collection: 'コレクション', humanTimeline: 'ヒューマンタイムライン', community: 'コミュニティ', creators: 'クリエイター', myMuseum: 'マイミュージアム', admin: '管理画面', submit: '作品投稿 ↗' }
  }
};

export function getNavText(lang: string) {
  return translations.nav[lang as keyof typeof translations.nav] || translations.nav.zh;
}

export function t(zh: string, en: string, ja: string, lang: string) {
  switch (lang) {
    case 'en': return en;
    case 'ja': return ja;
    default: return zh;
  }
}
