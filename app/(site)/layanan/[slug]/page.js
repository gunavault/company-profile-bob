import Link from 'next/link';
import { notFound } from 'next/navigation';
import Icon from '@/components/Icon';
import ArrowLink from '@/components/site/ArrowLink';
import PageHeader from '@/components/site/PageHeader';
import PortfolioCard from '@/components/site/PortfolioCard';
import SectionTitle from '@/components/site/SectionTitle';
import { getPortfolios, getService, getServices, getSettings } from '@/lib/data';
import { cleanHtml } from '@/lib/sanitize';
import { waLink } from '@/lib/utils';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const sv = await getService(slug);
  if (!sv) return {};
  return {
    title: sv.title,
    description: sv.excerpt,
    alternates: { canonical: `/layanan/${sv.slug}` },
    openGraph: { images: sv.image ? [sv.image] : undefined },
  };
}

export default async function ServiceDetail({ params }) {
  const { slug } = await params;
  const [sv, s, services, portfolios] = await Promise.all([getService(slug), getSettings(), getServices(), getPortfolios({ limit: 3 })]);
  if (!sv) notFound();
  const wa = waLink(s.whatsapp, `Halo ${s.company_name}, saya tertarik dengan layanan ${sv.title}.`);

  return (
    <>
      <PageHeader title={sv.title} subtitle={sv.excerpt} image={sv.image} crumbs={[{ label: 'Layanan', href: '/layanan' }, { label: sv.title }]} />
      <section className="section container detail">
        <article className="detail-main">
          {sv.image ? <img className="detail-cover" src={sv.image} alt={sv.title} /> : null}
          <div className="prose" dangerouslySetInnerHTML={{ __html: cleanHtml(sv.content) }} />
        </article>
        <aside className="detail-side">
          <div className="side-card side-green">
            <Icon name="messages-square" className="side-big-ic" />
            <h3 className="display">Butuh Penawaran?</h3>
            <p>Kirim gambar atau ukuran proyek Anda, kami hitungkan estimasi biayanya gratis.</p>
            <ArrowLink href={wa} external>Chat WhatsApp</ArrowLink>
          </div>
          <div className="side-card">
            <h3 className="side-title">Layanan Lainnya</h3>
            <ul className="side-list">
              {services.map((o) => (
                <li key={o.id}>
                  <Link href={`/layanan/${o.slug}`} className={o.slug === sv.slug ? 'active' : undefined}>
                    <Icon name={o.icon || 'layers'} /> {o.title}
                    <Icon name="chevron-right" className="side-chev" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </section>
      {portfolios.length ? (
        <section className="section container">
          <SectionTitle badge="Portofolio" title="Proyek Terkait" />
          <div className="pf-grid">
            {portfolios.map((p) => (
              <PortfolioCard key={p.id} p={p} />
            ))}
          </div>
        </section>
      ) : null}
    </>
  );
}
