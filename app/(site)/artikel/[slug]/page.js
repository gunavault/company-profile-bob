import Link from 'next/link';
import { notFound } from 'next/navigation';
import Icon from '@/components/Icon';
import ArrowLink from '@/components/site/ArrowLink';
import PageHeader from '@/components/site/PageHeader';
import { getArticle, getArticles, getSettings } from '@/lib/data';
import { cleanHtml } from '@/lib/sanitize';
import { formatDate, waLink } from '@/lib/utils';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const a = await getArticle(slug);
  if (!a) return {};
  return {
    title: a.title,
    description: a.excerpt,
    alternates: { canonical: `/artikel/${a.slug}` },
    openGraph: { type: 'article', images: a.cover ? [a.cover] : undefined },
  };
}

export default async function ArticleDetail({ params }) {
  const { slug } = await params;
  const [a, s, recent] = await Promise.all([getArticle(slug), getSettings(), getArticles(5)]);
  if (!a) notFound();
  return (
    <>
      <PageHeader title={a.title} image={a.cover} crumbs={[{ label: 'Artikel', href: '/artikel' }, { label: a.title }]} />
      <section className="section container detail">
        <article className="detail-main">
          <div className="ar-meta">
            <span><Icon name="calendar" /> {formatDate(a.published_at)}</span>
            {a.category ? <span><Icon name="tag" /> {a.category}</span> : null}
          </div>
          {a.cover ? <img className="detail-cover" src={a.cover} alt={a.title} /> : null}
          <div className="prose" dangerouslySetInnerHTML={{ __html: cleanHtml(a.content) }} />
        </article>
        <aside className="detail-side">
          <div className="side-card">
            <h3 className="side-title">Artikel Terbaru</h3>
            <ul className="side-posts">
              {recent.filter((r) => r.id !== a.id).slice(0, 4).map((r) => (
                <li key={r.id}>
                  <Link href={`/artikel/${r.slug}`}>
                    <img src={r.cover} alt="" loading="lazy" />
                    <span>
                      <strong>{r.title}</strong>
                      <small>{formatDate(r.published_at)}</small>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="side-card side-green">
            <h3 className="display">Konsultasi Gratis</h3>
            <p>Punya pertanyaan seputar GRC? Tim kami siap membantu.</p>
            <ArrowLink href={waLink(s.whatsapp, s.wa_message)} external>Chat WhatsApp</ArrowLink>
          </div>
        </aside>
      </section>
    </>
  );
}
