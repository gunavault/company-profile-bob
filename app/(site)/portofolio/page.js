import Link from 'next/link';
import PageHeader from '@/components/site/PageHeader';
import PortfolioCard from '@/components/site/PortfolioCard';
import { getPortfolios, getSettings } from '@/lib/data';

export const metadata = {
  title: 'Portofolio',
  description: 'Portofolio proyek GRC Cetak: masjid, rumah tinggal, ruko, dan gedung komersial di Jabodetabek.',
  alternates: { canonical: '/portofolio' },
};

export default async function PortfolioPage({ searchParams }) {
  const { kategori } = await searchParams;
  const [s, all] = await Promise.all([getSettings(), getPortfolios()]);
  const cats = [...new Set(all.map((p) => p.category).filter(Boolean))];
  const list = kategori ? all.filter((p) => p.category === kategori) : all;
  return (
    <>
      <PageHeader
        title="Portofolio"
        subtitle="Proyek GRC yang telah kami kerjakan, lengkap dengan lokasi dan dokumentasi foto."
        image={s.cta_image}
        crumbs={[{ label: 'Portofolio' }]}
      />
      <section className="section container">
        {cats.length > 1 ? (
          <div className="filters" role="tablist" aria-label="Filter kategori">
            <Link href="/portofolio" className={!kategori ? 'active' : undefined}>Semua</Link>
            {cats.map((c) => (
              <Link key={c} href={`/portofolio?kategori=${encodeURIComponent(c)}`} className={kategori === c ? 'active' : undefined}>
                {c}
              </Link>
            ))}
          </div>
        ) : null}
        {list.length ? (
          <div className="pf-grid">
            {list.map((p) => (
              <PortfolioCard key={p.id} p={p} />
            ))}
          </div>
        ) : (
          <p className="empty">Belum ada proyek pada kategori ini.</p>
        )}
      </section>
    </>
  );
}
