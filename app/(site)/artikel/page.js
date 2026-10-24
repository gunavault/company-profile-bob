import Link from 'next/link';
import Icon from '@/components/Icon';
import ArticleCard from '@/components/site/ArticleCard';
import PageHeader from '@/components/site/PageHeader';
import { getArticles, getSettings } from '@/lib/data';

export const metadata = {
  title: 'Artikel',
  description: 'Artikel, tips, dan inspirasi seputar GRC: lisplang, krawangan, ornamen masjid, dan fasad bangunan.',
  alternates: { canonical: '/artikel' },
};

const PER_PAGE = 9;

export default async function ArticlesPage({ searchParams }) {
  const { page } = await searchParams;
  const [s, all] = await Promise.all([getSettings(), getArticles()]);
  const pages = Math.max(1, Math.ceil(all.length / PER_PAGE));
  const cur = Math.min(Math.max(1, parseInt(page, 10) || 1), pages);
  const list = all.slice((cur - 1) * PER_PAGE, cur * PER_PAGE);
  return (
    <>
      <PageHeader title="Artikel" subtitle="Wawasan, tips, dan inspirasi seputar GRC dari tim kami." image={s.intro_image3} crumbs={[{ label: 'Artikel' }]} />
      <section className="section container">
        {list.length ? (
          <div className="ar-grid">
            {list.map((a) => (
              <ArticleCard key={a.id} a={a} />
            ))}
          </div>
        ) : (
          <p className="empty">Belum ada artikel.</p>
        )}
        {pages > 1 ? (
          <nav className="pager" aria-label="Halaman">
            {cur > 1 ? <Link href={`/artikel?page=${cur - 1}`} aria-label="Sebelumnya"><Icon name="arrow-left" /></Link> : null}
            {Array.from({ length: pages }).map((_, i) => (
              <Link key={i} href={`/artikel?page=${i + 1}`} className={cur === i + 1 ? 'active' : undefined}>{i + 1}</Link>
            ))}
            {cur < pages ? <Link href={`/artikel?page=${cur + 1}`} aria-label="Berikutnya"><Icon name="arrow-right" /></Link> : null}
          </nav>
        ) : null}
      </section>
    </>
  );
}
