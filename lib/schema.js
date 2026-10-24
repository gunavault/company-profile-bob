import bcrypt from 'bcryptjs';
import { seedData } from './seed';

const TABLES = [
  `CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  )`,
  `CREATE TABLE IF NOT EXISTS settings (
    key TEXT PRIMARY KEY,
    value TEXT
  )`,
  `CREATE TABLE IF NOT EXISTS services (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    icon TEXT,
    excerpt TEXT,
    content TEXT,
    image TEXT,
    sort_order INTEGER NOT NULL DEFAULT 0,
    is_published INTEGER NOT NULL DEFAULT 1,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at TEXT NOT NULL DEFAULT (datetime('now'))
  )`,
  `CREATE TABLE IF NOT EXISTS portfolios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    category TEXT,
    client TEXT,
    location TEXT,
    lat REAL,
    lng REAL,
    year TEXT,
    excerpt TEXT,
    content TEXT,
    cover TEXT,
    is_featured INTEGER NOT NULL DEFAULT 0,
    is_published INTEGER NOT NULL DEFAULT 1,
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at TEXT NOT NULL DEFAULT (datetime('now'))
  )`,
  `CREATE TABLE IF NOT EXISTS portfolio_images (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    portfolio_id INTEGER NOT NULL REFERENCES portfolios(id) ON DELETE CASCADE,
    path TEXT NOT NULL,
    caption TEXT,
    sort_order INTEGER NOT NULL DEFAULT 0
  )`,
  `CREATE TABLE IF NOT EXISTS articles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    category TEXT,
    excerpt TEXT,
    content TEXT,
    cover TEXT,
    is_published INTEGER NOT NULL DEFAULT 1,
    published_at TEXT NOT NULL DEFAULT (datetime('now')),
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at TEXT NOT NULL DEFAULT (datetime('now'))
  )`,
  `CREATE TABLE IF NOT EXISTS faqs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    sort_order INTEGER NOT NULL DEFAULT 0
  )`,
  `CREATE TABLE IF NOT EXISTS testimonials (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    role TEXT,
    content TEXT NOT NULL,
    rating INTEGER NOT NULL DEFAULT 5,
    sort_order INTEGER NOT NULL DEFAULT 0
  )`,
  `CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    phone TEXT,
    email TEXT,
    subject TEXT,
    message TEXT NOT NULL,
    is_read INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  )`,
  `CREATE INDEX IF NOT EXISTS idx_pimg_portfolio ON portfolio_images(portfolio_id)`,
];

export async function migrate(db) {
  await db.batch(TABLES, 'write');
  const rs = await db.execute('SELECT COUNT(*) AS n FROM users');
  if (Number(rs.rows[0].n) > 0) return;

  // Database baru: buat akun admin default + konten contoh
  const stmts = [
    {
      sql: 'INSERT INTO users (username, password_hash) VALUES (?, ?)',
      args: ['admin', bcrypt.hashSync('admin', 10)],
    },
  ];
  seedData.services.forEach((s, i) =>
    stmts.push({
      sql: 'INSERT INTO services (title, slug, icon, excerpt, content, image, sort_order) VALUES (?,?,?,?,?,?,?)',
      args: [s.title, s.slug, s.icon, s.excerpt, s.content, s.image, i + 1],
    })
  );
  seedData.portfolios.forEach((p, i) => {
    stmts.push({
      sql: `INSERT INTO portfolios (title, slug, category, client, location, lat, lng, year, excerpt, content, cover, is_featured, sort_order)
            VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      args: [p.title, p.slug, p.category, p.client, p.location, p.lat, p.lng, p.year, p.excerpt, p.content, p.cover, p.featured ? 1 : 0, i + 1],
    });
    p.gallery.forEach((g, j) =>
      stmts.push({
        sql: 'INSERT INTO portfolio_images (portfolio_id, path, caption, sort_order) VALUES ((SELECT id FROM portfolios WHERE slug = ?), ?, ?, ?)',
        args: [p.slug, g[0], g[1], j + 1],
      })
    );
  });
  seedData.articles.forEach((a) =>
    stmts.push({
      sql: 'INSERT INTO articles (title, slug, category, excerpt, content, cover, published_at) VALUES (?,?,?,?,?,?,?)',
      args: [a.title, a.slug, a.category, a.excerpt, a.content, a.cover, a.date],
    })
  );
  seedData.faqs.forEach((f, i) =>
    stmts.push({ sql: 'INSERT INTO faqs (question, answer, sort_order) VALUES (?,?,?)', args: [f[0], f[1], i + 1] })
  );
  seedData.testimonials.forEach((t, i) =>
    stmts.push({
      sql: 'INSERT INTO testimonials (name, role, content, rating, sort_order) VALUES (?,?,?,?,?)',
      args: [t.name, t.role, t.content, t.rating, i + 1],
    })
  );
  try {
    await db.batch(stmts, 'write');
  } catch (err) {
    // Instance lain sudah melakukan seed lebih dulu (cold start bersamaan)
    if (!String(err?.message).includes('UNIQUE')) throw err;
  }
}
