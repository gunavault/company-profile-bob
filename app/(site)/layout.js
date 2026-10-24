import Navbar from '@/components/site/Navbar';
import Footer from '@/components/site/Footer';
import WhatsAppFloat from '@/components/site/WhatsAppFloat';
import { getServices, getSettings } from '@/lib/data';
import { waLink } from '@/lib/utils';

export const dynamic = 'force-dynamic';

export default async function SiteLayout({ children }) {
  const [s, services] = await Promise.all([getSettings(), getServices()]);
  const wa = waLink(s.whatsapp, s.wa_message);
  const nav = services.map(({ slug, title, icon }) => ({ slug, title, icon }));
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    name: s.company_name,
    description: s.seo_description,
    telephone: s.phone,
    email: s.email,
    address: { '@type': 'PostalAddress', streetAddress: s.address, addressLocality: 'Gunung Putri', addressRegion: 'Jawa Barat', addressCountry: 'ID' },
    geo: { '@type': 'GeoCoordinates', latitude: s.office_lat, longitude: s.office_lng },
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld).replace(/</g, '\\u003c') }} />
      <Navbar logo={s.logo} companyName={s.company_name} services={nav} waHref={wa} />
      <main>{children}</main>
      <Footer s={s} services={nav} />
      <WhatsAppFloat href={wa} />
    </>
  );
}
