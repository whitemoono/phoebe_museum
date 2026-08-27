// ============================================
// PHOEBE MUSEUM - Language System v1.0
// 支持: 中文(zh) / English(en) / 日本語(ja)
// 默认: 中文
// ============================================

const PHOEBE_LANG = {
  current: localStorage.getItem('phoebe-lang') || 'zh',
  
  // 导航栏翻译
  nav: {
    zh: {
      home: '首页',
      collection: '馆藏',
      humanTimeline: '人类时间线',
      community: '社区世界线',
      creators: '创作者',
      myMuseum: '我的博物馆',
      admin: '管理后台',
      submitWork: '投稿作品 ↗'
    },
    en: {
      home: 'HOME',
      collection: 'COLLECTION',
      humanTimeline: 'HUMAN TIMELINE',
      community: 'COMMUNITY',
      creators: 'CREATORS',
      myMuseum: 'MY MUSEUM',
      admin: 'ADMIN',
      submitWork: 'SUBMIT WORK ↗'
    },
    ja: {
      home: 'ホーム',
      collection: 'コレクション',
      humanTimeline: 'ヒューマンタイムライン',
      community: 'コミュニティ',
      creators: 'クリエイター',
      myMuseum: 'マイミュージアム',
      admin: '管理画面',
      submitWork: '作品投稿 ↗'
    }
  },

  // 通用UI文本
  ui: {
    zh: {
      exploreCollection: '探索馆藏',
      viewAll: '查看全部',
      viewMore: '查看更多',
      back: '返回',
      submit: '提交',
      cancel: '取消',
      search: '搜索',
      filter: '筛选',
      loading: '加载中...',
      noResults: '暂无结果',
      language: '语言'
    },
    en: {
      exploreCollection: 'EXPLORE COLLECTION',
      viewAll: 'VIEW ALL',
      viewMore: 'VIEW MORE',
      back: 'BACK',
      submit: 'SUBMIT',
      cancel: 'CANCEL',
      search: 'SEARCH',
      filter: 'FILTER',
      loading: 'Loading...',
      noResults: 'No results',
      language: 'Language'
    },
    ja: {
      exploreCollection: 'コレクションを見る',
      viewAll: 'すべて表示',
      viewMore: 'もっと見る',
      back: '戻る',
      submit: '送信',
      cancel: 'キャンセル',
      search: '検索',
      filter: 'フィルター',
      loading: '読み込み中...',
      noResults: '結果なし',
      language: '言語'
    }
  },

  // 获取翻译
  t: function(key, section) {
    section = section || 'nav';
    const lang = this.current;
    if (this[section] && this[section][lang] && this[section][lang][key]) {
      return this[section][lang][key];
    }
    return key;
  },

  // 切换语言
  setLang: function(lang) {
    if (['zh', 'en', 'ja'].includes(lang)) {
      this.current = lang;
      localStorage.setItem('phoebe-lang', lang);
      document.documentElement.lang = lang === 'zh' ? 'zh-CN' : lang;
      this.updateNav();
      this.updatePageContent();
    }
  },

  // 生成导航栏HTML
  generateNav: function(currentPage) {
    const t = this.nav[this.current];
    const pages = [
      { key: 'home', href: 'phoebe_museum_v1.html', id: 'home' },
      { key: 'collection', href: 'phoebe_museum_collection_v1.html', id: 'collection' },
      { key: 'humanTimeline', href: 'phoebe_museum_timeline_human.html', id: 'human' },
      { key: 'community', href: 'phoebe_museum_timeline_community.html', id: 'community' },
      { key: 'creators', href: 'phoebe_museum_creators.html', id: 'creators' },
      { key: 'myMuseum', href: 'phoebe_museum_my.html', id: 'my' },
      { key: 'admin', href: 'phoebe_museum_admin.html', id: 'admin' }
    ];

    let navLinks = pages.map(p => 
      '<a href="' + p.href + '" class="' + (currentPage === p.id ? 'active' : '') + '">' + t[p.key] + '</a>'
    ).join('');

    navLinks += '<a class="submit-btn" href="phoebe_museum_submit.html">' + t.submitWork + '</a>';

    // 语言切换器
    const langSwitcher = '<div class="lang-switcher">' +
      '<button data-lang="zh" class="' + (this.current === 'zh' ? 'active' : '') + '">中</button>' +
      '<button data-lang="en" class="' + (this.current === 'en' ? 'active' : '') + '">EN</button>' +
      '<button data-lang="ja" class="' + (this.current === 'ja' ? 'active' : '') + '">日</button>' +
      '</div>';

    return '<header class="nav" id="nav">' +
      '<a href="phoebe_museum_v1.html" class="logo">PHOEBE MUSEUM<small>' + 
      (this.current === 'zh' ? '菲比博物馆 · 数字档案' : this.current === 'ja' ? 'フィービー博物館 · デジタルアーカイブ' : 'PHOEBE MUSEUM · DIGITAL ARCHIVE') + 
      '</small></a>' +
      '<nav class="navlinks">' + navLinks + langSwitcher + '</nav>' +
      '<button class="menu" aria-label="菜单">&#9776;</button>' +
      '</header>';
  },

  // 更新导航栏
  updateNav: function() {
    const nav = document.getElementById('nav');
    if (nav) {
      const currentPage = nav.dataset.page || 'home';
      nav.outerHTML = this.generateNav(currentPage);
      this.initMenu();
    }
  },

  // 初始化菜单
  initMenu: function() {
    const menuBtn = document.querySelector('.menu');
    const navLinks = document.querySelector('.navlinks');
    if (menuBtn && navLinks) {
      menuBtn.onclick = function() {
        navLinks.classList.toggle('open');
        menuBtn.textContent = navLinks.classList.contains('open') ? '✕' : '☰';
      };
    }
    // 语言切换
    document.querySelectorAll('.lang-switcher button').forEach(btn => {
      btn.onclick = function() {
        PHOEBE_LANG.setLang(this.dataset.lang);
      };
    });
  },

  // 更新页面内容（由各页面实现）
  updatePageContent: function() {
    // 触发自定义事件，让页面自己处理内容更新
    window.dispatchEvent(new CustomEvent('phoebeLangChange', { detail: { lang: this.current } }));
  },

  // 初始化
  init: function(currentPage) {
    document.documentElement.lang = this.current === 'zh' ? 'zh-CN' : this.current;
    const nav = document.getElementById('nav');
    if (nav) {
      nav.dataset.page = currentPage;
      nav.outerHTML = this.generateNav(currentPage);
      this.initMenu();
    }
  }
};
