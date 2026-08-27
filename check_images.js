// 检查每张卡片是否有 base64 图片，统计大小
const fs = require('fs');
const html = fs.readFileSync('D:/dev/Phoebe/phoebe_museum_collection_v1.html', 'utf8');

const cardRe = /<article class="card[^"]*"([^>]*)>([\s\S]*?)<\/article>/g;
let m;
let total = 0;
while ((m = cardRe.exec(html)) !== null) {
  const a = m[1];
  const id = (a.match(/data-id="([^"]+)"/) || [])[1] || '?';
  const body = m[2];
  const img = body.match(/<img[^>]*src="data:image\/([a-z]+);base64,([^"]+)"/);
  if (img) {
    const size = Math.round(img[2].length * 0.75 / 1024);
    total += size;
    console.log(id, '| img', img[1], '| ~' + size + 'KB');
  } else {
    console.log(id, '| NO IMG (placeholder)');
  }
}
console.log('total ~' + Math.round(total / 1024) + 'MB');
