// 检查每个 data-id 的上下文，找出 12 个 id 分别出现在什么标签里
const fs = require('fs');
const html = fs.readFileSync('D:/dev/Phoebe/phoebe_museum_collection_v1.html', 'utf8');

const idRe = /data-id="(PM-\d+)"/g;
const seen = new Set();
let m;
while ((m = idRe.exec(html)) !== null) {
  const id = m[1];
  if (seen.has(id)) continue;
  seen.add(id);
  const idx = m.index;
  // 取 id 前后 200 字符看上下文
  const ctx = html.slice(Math.max(0, idx - 150), Math.min(html.length, idx + 200)).replace(/\s+/g, ' ');
  console.log('==== ' + id + ' ====');
  console.log(ctx.slice(0, 350));
  console.log('');
}
