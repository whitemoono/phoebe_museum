const fs = require('fs');

// Check all HTML files
const files = fs.readdirSync('D:\\dev\\Phoebe').filter(f => f.endsWith('.html'));
process.stdout.write('=== All HTML Files ===\n');
files.forEach(f => process.stdout.write(f + '\n'));

// Check detail page
const detail = fs.readFileSync('D:\\dev\\Phoebe\\phoebe_museum_detail.html', 'utf8');
process.stdout.write('\n=== Detail Page Structure ===\n');
const detailSections = detail.match(/<[^>]*class="[^"]*"[^>]*>/g);
if (detailSections) {
  const unique = [...new Set(detailSections)].slice(0, 20);
  unique.forEach(s => process.stdout.write(s + '\n'));
}

// Check creators page
const creators = fs.readFileSync('D:\\dev\\Phoebe\\phoebe_museum_creators.html', 'utf8');
process.stdout.write('\n=== Creators Page Structure ===\n');
const creatorSections = creators.match(/<[^>]*class="[^"]*"[^>]*>/g);
if (creatorSections) {
  const unique = [...new Set(creatorSections)].slice(0, 20);
  unique.forEach(s => process.stdout.write(s + '\n'));
}
