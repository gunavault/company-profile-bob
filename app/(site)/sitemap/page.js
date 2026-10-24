import Link from 'next/link';
import Icon from '@/components/Icon';
import PageHeader from '@/components/site/PageHeader';
import { getArticles, getPortfolios, getServices, getSettings } from '@/lib/data';
import credits from '@/lib/photo-credits.json';

export const metadata = { title: 'Sitemap', description: 'Peta situs GRC Cetak.', alternates: { canonical: '/sitemap' } };

export default async function SitemapPage() {
  const [s, services, portfolios, articles] = await Promise.all([getSettings(), getServices(), getPortfolios(), getArticles()]);
  const groups = [
    {
      icon: 'house',
      title: 'Halaman Utama',
      items: [
        ['/', 'Beranda'],
        ['/tentang-kami', 'Tentang Kami'],
        ['/layanan', 'Layanan'],
        ['/portofolio', 'Portofolio'],
        ['/artikel', 'Artikel'],
        ['/kontak', 'Kontak'],
      ],
    },
    { icon: 'layers', title: 'Layanan', items: services.map((x) => [`/layanan/${x.slug}`, x.title]) },
    { icon: 'briefcase', title: 'Portofolio', items: portfolios.map((x) => [`/portofolio/${x.slug}`, x.title]) },
    { icon: 'file-text', title: 'Artikel', items: articles.map((x) => [`/artikel/${x.slug}`, x.title]) },
  ];
  
  return (
    <>
      <PageHeader title="Sitemap" subtitle={`Seluruh halaman di situs ${s.company_name}.`} image={s.hero_image} crumbs={[{ label: 'Sitemap' }]} />
      <section className="section container sitemap-grid">
        {groups.map((g) => (
          <div key={g.title} className="side-card">
            <h2 className="side-title"><Icon name={g.icon} /> {g.title}</h2>
            <ul className="side-list">
              {g.items.map(([href, label]) => (
                <li key={href}>
                  <Link href={href}>
                    {label}
                    <Icon name="chevron-right" className="side-chev" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>
      <section className="section container">
        <p className="muted">
          Versi XML untuk mesin pencari: <a href="/sitemap.xml" className="text-link">/sitemap.xml</a>
        </p>
        <details className="credits">
          <summary>Kredit foto (lisensi Creative Commons)</summary>
          <ul>
            {credits.map((c) => (
              <li key={c.file}>
                “{c.title}” oleh {c.author || 'tidak diketahui'} — {c.license} —{' '}
                <a href={c.source} target="_blank" rel="noopener noreferrer">sumber</a>
              </li>
            ))}
          </ul>
        </details>
      </section>
    </>
  );
}
