import { notFound } from 'next/navigation';
import Icon from '@/components/Icon';
import ArrowLink from '@/components/site/ArrowLink';
import Gallery from '@/components/site/Gallery';
import MapEmbed from '@/components/site/MapEmbed';
import PageHeader from '@/components/site/PageHeader';
import PortfolioCard from '@/components/site/PortfolioCard';
import SectionTitle from '@/components/site/SectionTitle';
import { getPortfolio, getPortfolios, getSettings } from '@/lib/data';
import { cleanHtml } from '@/lib/sanitize';
import { waLink } from '@/lib/utils';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const p = await getPortfolio(slug);
  if (!p) return {};
  return {
    title: p.title,
    description: p.excerpt,
    alternates: { canonical: `/portofolio/${p.slug}` },
    openGraph: { images: p.cover ? [p.cover] : undefined },
  };
}

export default async function PortfolioDetail({ params }) {
  const { slug } = await params;
  const [p, s, others] = await Promise.all([getPortfolio(slug), getSettings(), getPortfolios({ limit: 4 })]);
  if (!p) notFound();
  const images = [{ src: p.cover, caption: p.title }, ...p.images.map((im) => ({ src: im.path, caption: im.caption }))].filter((x) => x.src);
  const meta = [
    ['tag', 'Kategori', p.category],
    ['user', 'Klien', p.client],
    ['map-pin', 'Lokasi', p.location],
    ['calendar', 'Tahun', p.year],
  ].filter(([, , v]) => v);
  const wa = waLink(s.whatsapp, `Halo ${s.company_name}, saya melihat proyek "${p.title}" dan ingin membuat yang serupa.`);

  return (
    <>
      <PageHeader title={p.title} subtitle={p.excerpt} image={p.cover} crumbs={[{ label: 'Portofolio', href: '/portofolio' }, { label: p.title }]} />
      <section className="section container detail">
        <article className="detail-main">
          <h2 className="display h-sm">Galeri Proyek</h2>
          <Gallery images={images} />
          <div className="prose" dangerouslySetInnerHTML={{ __html: cleanHtml(p.content) }} />
        </article>
        <aside className="detail-side">
          <div className="side-card">
            <h3 className="side-title">Detail Proyek</h3>
            <dl className="meta-list">
              {meta.map(([icon, k, v]) => (
                <div key={k}>
                  <dt><Icon name={icon} /> {k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
          </div>
          {p.lat != null && p.lng != null ? (
            <div className="side-card">
              <h3 className="side-title">Lokasi Proyek</h3>
              <MapEmbed lat={p.lat} lng={p.lng} title={p.title} />
            </div>
          ) : null}
          <div className="side-card side-green">
            <h3 className="display">Ingin Proyek Serupa?</h3>
            <p>Konsultasikan kebutuhan Anda, gratis survei lokasi.</p>
            <ArrowLink href={wa} external>Chat WhatsApp</ArrowLink>
          </div>
        </aside>
      </section>
      <section className="section container">
        <SectionTitle badge="Portofolio" title="Proyek Lainnya" />
        <div className="pf-grid">
          {others.filter((o) => o.id !== p.id).slice(0, 3).map((o) => (
            <PortfolioCard key={o.id} p={o} />
          ))}
        </div>
      </section>
    </>
  );
}
