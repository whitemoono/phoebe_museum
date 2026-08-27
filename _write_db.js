const fs = require('fs');
const content = import Database from 'better-sqlite3';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'data', 'phoebe.db');

let db: Database.Database;

export function getDb() {
  if (!db) {
    db = new Database(DB_PATH);
    db.pragma('journal_mode = WAL');
    db.pragma('foreign_keys = ON');
    initDb(db);
  }
  return db;
}

function initDb(db: Database.Database) {
  db.exec(\
    CREATE TABLE IF NOT EXISTS creators (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      display_name TEXT,
      avatar TEXT,
      bio TEXT,
      role TEXT DEFAULT 'creator',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS artworks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      museum_id TEXT UNIQUE NOT NULL,
      title TEXT NOT NULL,
      title_en TEXT,
      title_ja TEXT,
      description TEXT,
      creator_id INTEGER REFERENCES creators(id),
      medium TEXT,
      image_url TEXT,
      world_line TEXT,
      year TEXT DEFAULT '2026',
      tags TEXT,
      status TEXT DEFAULT 'approved',
      featured INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS timelines (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slug TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      name_en TEXT,
      name_ja TEXT,
      description TEXT,
      type TEXT,
      cover_image TEXT,
      creator_id INTEGER REFERENCES creators(id),
      status TEXT DEFAULT 'approved',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS submissions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      artwork_title TEXT NOT NULL,
      creator_name TEXT NOT NULL,
      medium TEXT,
      image_path TEXT,
      description TEXT,
      source_link TEXT,
      world_line TEXT,
      status TEXT DEFAULT 'pending',
      admin_notes TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS favorites (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      session_id TEXT NOT NULL,
      artwork_id INTEGER REFERENCES artworks(id),
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(session_id, artwork_id)
    );
  \);

  const count = db.prepare('SELECT COUNT(*) as count FROM creators').get() as { count: number };
  if (count.count === 0) {
    insertDefaultData(db);
  }
}

function insertDefaultData(db: Database.Database) {
  const insertCreator = db.prepare('INSERT INTO creators (username, display_name, bio, role) VALUES (?, ?, ?, ?)');
  insertCreator.run('museum', 'Museum Official', '菲比博物馆官方', 'admin');
  insertCreator.run('artist01', 'Demo Artist 01', '专注于数字插画创作', 'creator');
  insertCreator.run('artist02', 'Demo Artist 02', '擅长传统绘画风格', 'creator');
  insertCreator.run('artist03', 'Demo Artist 03', '3D建模与渲染专家', 'creator');

  const insertArtwork = db.prepare('INSERT INTO artworks (museum_id, title, title_en, title_ja, description, creator_id, medium, image_url, world_line, year, tags, featured) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
  insertArtwork.run('PM-000001', '海上菲比', 'PHOEBE ON THE WILD SEA', '海のフィービー', '暴风来临前，菲比站在破旧的小船上，继续向未知海域前进。', 1, 'illustration', '/uploads/artworks/pm-000001.jpg', 'PIRATE PHOEBE', '2026', 'pirate,ocean,adventure', 1);
  insertArtwork.run('PM-000002', '荒原航线', 'WILDERNESS ROUTE', '荒野航路', '在荒芜的原野上，菲比找到了一条被遗忘的航线。', 2, 'illustration', '/uploads/artworks/pm-000002.jpg', 'PIRATE PHOEBE', '2026', 'adventure,wilderness', 0);
  insertArtwork.run('PM-000003', '深海来信', 'OCEAN WORLD', '深海からの手紙', '来自深海的一封信，承载着菲比的思念。', 3, 'illustration', '/uploads/artworks/pm-000003.jpg', 'OCEAN WORLD', '2026', 'ocean,letter', 0);
  insertArtwork.run('PM-000004', '霓虹之下', 'UNDER NEON', 'ネオンの下で', '在霓虹灯闪烁的未来都市中，菲比寻找着自己的位置。', 4, '3d', '/uploads/artworks/pm-000004.jpg', 'CYBER PHOEBE', '2026', 'cyber,neon,future', 0);
  insertArtwork.run('PM-000005', '校园午后', 'SCHOOL AFTERNOON', '学園の午後', '放学后的黄昏，校园里只剩下菲比一个人。', 2, 'illustration', '/uploads/artworks/pm-000005.jpg', 'SCHOOL PHOEBE', '2026', 'school,afternoon', 0);
  insertArtwork.run('PM-000006', '未知档案', 'UNKNOWN ARCHIVE', '未知のアーカイブ', '一些无法解释的菲比。我们依然决定收藏她们。', 1, 'mixed', '/uploads/artworks/pm-000006.jpg', 'THE STRANGE ARCHIVE', '2026', 'strange,mystery', 0);

  const insertTimeline = db.prepare('INSERT INTO timelines (slug, name, name_en, name_ja, description, type) VALUES (?, ?, ?, ?, ?, ?)');
  insertTimeline.run('pirate', '海盗菲比', 'PIRATE PHOEBE', '海賊フィービー', '暴风、木船、藏宝图与未知海域', 'community');
  insertTimeline.run('school', '校园菲比', 'SCHOOL PHOEBE', '学園フィービー', '制服、校园、转学生、放学后的黄昏', 'community');
  insertTimeline.run('cyber', '赛博菲比', 'CYBER PHOEBE', 'サイバーフィービー', '霓虹、机械、数据洪流与未来都市', 'community');
  insertTimeline.run('fantasy', '幻想菲比', 'FANTASY PHOEBE', '幻想フィービー', '天使、堕天使、魔女、骑士与幻想王国', 'community');
  insertTimeline.run('strange', '奇异档案', 'THE STRANGE ARCHIVE', '奇妙なアーカイブ', '一些无法解释的菲比', 'community');
}
;

fs.writeFileSync('D:\\\\dev\\\\Phoebe\\\\phoebe-museum\\\\src\\\\lib\\\\db\\\\index.ts', content, 'utf8');
console.log('Database init script written');
