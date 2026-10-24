import Link from 'next/link';
import Icon from '@/components/Icon';
import CtaBanner from '@/components/site/CtaBanner';
import PageHeader from '@/components/site/PageHeader';
import { getServices, getSettings } from '@/lib/data';
import { waLink } from '@/lib/utils';

export const metadata = {
  title: 'Layanan',
  description: 'Layanan GRC Cetak: lisplang, krawangan, ornamen masjid, pilar, panel fasad, cetak custom & pemasangan.',
  alternates: { canonical: '/layanan' },
};

export default async function ServicesPage() {
  const [s, services] = await Promise.all([getSettings(), getServices()]);
  return (
    <>
      <PageHeader
        title="Layanan Kami"
        subtitle="Dari produksi hingga pemasangan, kami menangani seluruh kebutuhan GRC proyek Anda."
        image={services[0]?.image || s.hero_image}
        crumbs={[{ label: 'Layanan' }]}
      />
      <section className="section container">
        <div className="svc-grid">
          {services.map((sv, i) => (
            <Link key={sv.id} href={`/layanan/${sv.slug}`} className="svc-card">
              <div className="svc-img">
                {sv.image ? <img src={sv.image} alt={sv.title} loading="lazy" /> : null}
                <span className="svc-num display">{String(i + 1).padStart(2, '0')}</span>
              </div>
              <div className="svc-body">
                <span className="svc-ic"><Icon name={sv.icon || 'layers'} /></span>
                <h2>{sv.title}</h2>
                <p>{sv.excerpt}</p>
                <span className="text-link">
                  Selengkapnya <Icon name="arrow-right" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <CtaBanner title={s.cta_title} text={s.cta_text} image={s.cta_image} waHref={waLink(s.whatsapp, s.wa_message)} />
    </>
  );
}
