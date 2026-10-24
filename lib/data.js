import 'server-only';
import { cache } from 'react';
import { all, one } from './db';
import { SETTING_DEFAULTS } from './settings-schema';

export const getSettings = cache(async () => {
  const rows = await all('SELECT key, value FROM settings');
  const s = { ...SETTING_DEFAULTS };
  for (const r of rows) if (r.key in s) s[r.key] = r.value ?? '';
  return s;
});

export const getServices = cache(async (onlyPublished = true) =>
  all(`SELECT * FROM services ${onlyPublished ? 'WHERE is_published = 1' : ''} ORDER BY sort_order, id`)
);

export const getService = cache(async (slug) =>
  one('SELECT * FROM services WHERE slug = ? AND is_published = 1', [slug])
);

export const getPortfolios = cache(async ({ featured = false, limit = 0 } = {}) =>
  all(
    `SELECT * FROM portfolios WHERE is_published = 1 ${featured ? 'AND is_featured = 1' : ''}
     ORDER BY sort_order, id DESC ${limit ? `LIMIT ${Number(limit)}` : ''}`
  )
);

export const getPortfolio = cache(async (slug) => {
  const p = await one('SELECT * FROM portfolios WHERE slug = ? AND is_published = 1', [slug]);
  if (!p) return null;
  p.images = await all('SELECT * FROM portfolio_images WHERE portfolio_id = ? ORDER BY sort_order, id', [p.id]);
  return p;
});

export const getArticles = cache(async (limit = 0) =>
  all(
    `SELECT id, title, slug, category, excerpt, cover, published_at, updated_at FROM articles
     WHERE is_published = 1 ORDER BY published_at DESC ${limit ? `LIMIT ${Number(limit)}` : ''}`
  )
);

export const getArticle = cache(async (slug) =>
  one('SELECT * FROM articles WHERE slug = ? AND is_published = 1', [slug])
);

export const getFaqs = cache(async () => all('SELECT * FROM faqs ORDER BY sort_order, id'));
export const getTestimonials = cache(async () => all('SELECT * FROM testimonials ORDER BY sort_order, id'));
