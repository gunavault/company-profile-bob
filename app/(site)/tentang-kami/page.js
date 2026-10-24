import Icon from '@/components/Icon';
import CtaBanner from '@/components/site/CtaBanner';
import PageHeader from '@/components/site/PageHeader';
import SectionTitle from '@/components/site/SectionTitle';
import { getSettings } from '@/lib/data';
import { cleanHtml } from '@/lib/sanitize';
import { lines, waLink } from '@/lib/utils';

export async function generateMetadata() {
  const s = await getSettings();
  return { title: s.about_title, description: s.about_subtitle, alternates: { canonical: '/tentang-kami' } };
}

export default async function AboutPage() {
  const s = await getSettings();
  const stats = [1, 2, 3, 4].map((n) => ({ v: s[`stat${n}_value`], l: s[`stat${n}_label`] })).filter((x) => x.v);
  const values = [
    ['factory', 'Produksi Sendiri', 'Workshop di Gunung Putri dengan kontrol kualitas di setiap tahap.'],
    ['ruler', 'Presisi Desain', 'Tim drafter mengubah ide Anda menjadi gambar kerja dan cetakan akurat.'],
    ['hard-hat', 'Pemasangan Rapi', 'Tim lapangan berpengalaman, pemasangan cepat, bersih, dan aman.'],
    ['shield-check', 'Bergaransi', 'Setiap pekerjaan dilindungi garansi yang tertulis jelas.'],
  ];
  return (
    <>
      <PageHeader title={s.about_title} subtitle={s.about_subtitle} image={s.about_image} crumbs={[{ label: s.about_title }]} />

      <section className="section container split">
        <div>
          <SectionTitle badge={s.company_name} title={s.about_heading} />
          <div className="prose" dangerouslySetInnerHTML={{ __html: cleanHtml(s.about_content) }} />
        </div>
        <img className="split-img" src={s.about_image2} alt="" loading="lazy" />
      </section>

      {stats.length ? (
        <section className="container stats">
          {stats.map((x) => (
            <div key={x.l} className="stat">
              <strong className="display">{x.v}</strong>
              <span>{x.l}</span>
            </div>
          ))}
        </section>
      ) : null}

      <section className="section container">
        <div className="green-panel vm">
          <div className="vm-card">
            <span className="vm-ic"><Icon name="sparkles" /></span>
            <h3 className="display">Visi</h3>
            <p>{s.about_vision}</p>
          </div>
          <div className="vm-card">
            <span className="vm-ic"><Icon name="badge-check" /></span>
            <h3 className="display">Misi</h3>
            <ul className="check-list">
              {lines(s.about_mission).map((m) => (
                <li key={m}><Icon name="check" /> {m}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section container">
        <SectionTitle badge="Kenapa Kami" title="Nilai yang Kami Pegang" center />
        <div className="value-grid">
          {values.map(([icon, t, d]) => (
            <div key={t} className="value">
              <span className="value-ic"><Icon name={icon} /></span>
              <h3>{t}</h3>
              <p>{d}</p>
            </div>
          ))}
        </div>
      </section>

      <CtaBanner title={s.cta_title} text={s.cta_text} image={s.cta_image} waHref={waLink(s.whatsapp, s.wa_message)} />
    </>
  );
}
