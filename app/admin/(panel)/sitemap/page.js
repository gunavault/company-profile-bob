import Link from 'next/link';
import Icon from '@/components/Icon';
import { getArticles, getPortfolios, getServices, getSettings } from '@/lib/data';
import { lines, siteUrl } from '@/lib/utils';

export default async function SitemapAdmin() {
  const [s, services, portfolios, articles] = await Promise.all([getSettings(), getServices(), getPortfolios(), getArticles()]);
  const base = siteUrl();
  const rows = [
    ...lines(s.sitemap_static).map((p) => ['Statis', p]),
    ...services.map((x) => ['Layanan', `/layanan/${x.slug}`]),
    ...portfolios.map((x) => ['Portofolio', `/portofolio/${x.slug}`]),
    ...articles.map((x) => ['Artikel', `/artikel/${x.slug}`]),
  ];
  return (
    <>
      <header className="a-head">
        <div><h1>Sitemap & SEO</h1><p>{rows.length} URL terdaftar di sitemap.xml. Konten yang ditayangkan otomatis masuk.</p></div>
        <div className="a-inline">
          <a href="/sitemap.xml" target="_blank" rel="noopener noreferrer" className="a-btn a-btn-ghost"><Icon name="external-link" /> sitemap.xml</a>
          <Link href="/admin/halaman/seo" className="a-btn a-btn-primary"><Icon name="settings" /> Pengaturan SEO</Link>
        </div>
      </header>
      <div className="a-card a-tip">
        <Icon name="globe" />
        <p>Daftarkan <code>{base}/sitemap.xml</code> di Google Search Console agar seluruh halaman cepat terindeks.</p>
      </div>
      <div className="a-card a-table-wrap">
        <table className="a-table">
          <thead><tr><th>Jenis</th><th>URL</th><th>Frekuensi</th></tr></thead>
          <tbody>
            {rows.map(([type, path]) => (
              <tr key={path}>
                <td><span className="a-status on">{type}</span></td>
                <td><a href={path} target="_blank" rel="noopener noreferrer">{base}{path === '/' ? '' : path}</a></td>
                <td>{s.sitemap_changefreq}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
