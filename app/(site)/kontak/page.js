import Icon from '@/components/Icon';
import MapEmbed from '@/components/site/MapEmbed';
import PageHeader from '@/components/site/PageHeader';
import { getSettings } from '@/lib/data';
import { lines, waLink } from '@/lib/utils';
import ContactForm from './ContactForm';

export async function generateMetadata() {
  const s = await getSettings();
  return { title: s.contact_title, description: s.contact_subtitle, alternates: { canonical: '/kontak' } };
}

export default async function ContactPage() {
  const s = await getSettings();
  const cards = [
    ['whatsapp', 'WhatsApp', s.whatsapp, waLink(s.whatsapp, s.wa_message)],
    ['phone', 'Telepon', s.phone, `tel:${s.phone}`],
    ['mail', 'Email', s.email, `mailto:${s.email}`],
    ['map-pin', 'Workshop', s.address, null],
  ];
  return (
    <>
      <PageHeader title={s.contact_title} subtitle={s.contact_subtitle} image={s.cta_image} crumbs={[{ label: s.contact_title }]} />
      <section className="section container">
        <div className="contact-cards">
          {cards.map(([icon, label, value, href]) => (
            <div key={label} className="contact-card">
              <span className="contact-ic"><Icon name={icon} /></span>
              <small>{label}</small>
              {href ? (
                <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">{value}</a>
              ) : (
                <span>{value}</span>
              )}
            </div>
          ))}
        </div>
      </section>
      <section className="section container contact-grid">
        <div className="green-panel">
          <h2 className="display">{s.contact_form_title}</h2>
          <ContactForm successText={s.contact_success} />
        </div>
        <div className="contact-side">
          <MapEmbed lat={s.office_lat} lng={s.office_lng} title={s.company_name} zoom={14} />
          <div className="side-card">
            <h3 className="side-title">Jam Operasional</h3>
            <ul className="hours">
              {lines(s.hours).map((l) => (
                <li key={l}><Icon name="clock" /> {l}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
