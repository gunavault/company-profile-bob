import { getArticles, getPortfolios, getServices, getSettings } from '@/lib/data';
import { lines, siteUrl } from '@/lib/utils';

export const dynamic = 'force-dynamic';

const iso = (v) => (v ? new Date(String(v).replace(' ', 'T') + 'Z') : new Date());

export default async function sitemap() {
  const base = siteUrl();
  const [s, services, portfolios, articles] = await Promise.all([getSettings(), getServices(), getPortfolios(), getArticles()]);
  const freq = s.sitemap_changefreq || 'weekly';
  const statics = lines(s.sitemap_static).map((p) => ({
    url: `${base}${p.startsWith('/') ? p : `/${p}`}`.replace(/\/$/, '') || base,
    changeFrequency: freq,
    priority: p === '/' ? 1 : 0.8,
  }));
  return [
    ...statics,
    ...services.map((x) => ({ url: `${base}/layanan/${x.slug}`, lastModified: iso(x.updated_at), changeFrequency: freq, priority: 0.7 })),
    ...portfolios.map((x) => ({ url: `${base}/portofolio/${x.slug}`, lastModified: iso(x.updated_at), changeFrequency: freq, priority: 0.6 })),
    ...articles.map((x) => ({ url: `${base}/artikel/${x.slug}`, lastModified: iso(x.updated_at), changeFrequency: freq, priority: 0.6 })),
  ];
}
