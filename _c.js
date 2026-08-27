const fs = require('fs');
const h = fs.readFileSync('D:\\dev\\Phoebe\\phoebe_museum_v1.html', 'utf8');

// Extract more sections
const collectionMatch = h.match(/<section class="collection"[\s\S]*?<\/section>/);
const worldsMatch = h.match(/<section class="worlds"[\s\S]*?<\/section>/);
const creatorsMatch = h.match(/<section class="creators"[\s\S]*?<\/section>/);
const archiveMatch = h.match(/<section class="archive"[\s\S]*?<\/section>/);
const footerMatch = h.match(/<footer[\s\S]*?<\/footer>/);

process.stdout.write('=== COLLECTION ===\n');
if (collectionMatch) process.stdout.write(collectionMatch[0].substring(0, 1500) + '\n\n');

process.stdout.write('=== WORLDS ===\n');
if (worldsMatch) process.stdout.write(worldsMatch[0].substring(0, 1500) + '\n\n');

process.stdout.write('=== CREATORS ===\n');
if (creatorsMatch) process.stdout.write(creatorsMatch[0].substring(0, 1500) + '\n\n');

process.stdout.write('=== ARCHIVE ===\n');
if (archiveMatch) process.stdout.write(archiveMatch[0].substring(0, 1500) + '\n\n');

process.stdout.write('=== FOOTER ===\n');
if (footerMatch) process.stdout.write(footerMatch[0].substring(0, 1000) + '\n\n');
