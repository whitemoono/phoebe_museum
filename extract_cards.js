// 从 collection 页提取全部作品卡片数据，输出 JSON（兼容 card / card hidden-card）
const fs = require('fs');
const html = fs.readFileSync('D:/dev/Phoebe/phoebe_museum_collection_v1.html', 'utf8');

const cardRe = /<article class="card[^"]*"([^>]*)>/g;
const attr = (s, name) => {
  const m = s.match(new RegExp(name + '="([^"]*)"'));
  return m ? m[1] : '';
};

const cards = [];
let m;
while ((m = cardRe.exec(html)) !== null) {
  const a = m[1];
  const tags = attr(a, 'data-tags').split(/\s+/).filter(Boolean);
  const medium = tags[0] || 'illustration';
  cards.push({
    museum_id: attr(a, 'data-id'),
    title: attr(a, 'data-title'),
    title_en: attr(a, 'data-en'),
    creator: attr(a, 'data-creator'),
    world: attr(a, 'data-world'),
    year: attr(a, 'data-year'),
    description: attr(a, 'data-desc'),
    medium,
    tags: tags.slice(1),
  });
}

fs.writeFileSync('D:/dev/Phoebe/cards_seed.json', JSON.stringify(cards, null, 2), 'utf8');
console.log('extracted:', cards.length);
// 输出到 UTF-8 文件避免控制台乱码
const summary = cards.map(c => `${c.museum_id}|${c.medium}|${c.world}|${c.creator}|${c.year}|${c.tags.join(',')}`).join('\n');
fs.writeFileSync('D:/dev/Phoebe/cards_summary.txt', summary, 'utf8');
console.log('summary written');
