import Link from 'next/link';
import Icon from '@/components/Icon';
import { lines } from '@/lib/utils';

export default function Footer({ s, services }) {
  const year = new Date().getFullYear();
  const socials = [
    ['instagram', s.instagram, 'Instagram'],
    ['facebook', s.facebook, 'Facebook'],
    ['youtube', s.youtube, 'YouTube'],
  ].filter(([, url]) => url);

  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <img src={s.logo} alt={s.company_name} width="72" height="72" />
          <p>{s.footer_text}</p>
          <ul className="footer-contact">
            <li><Icon name="map-pin" /> {s.address}</li>
            <li><Icon name="phone" /> <a href={`tel:${s.phone}`}>{s.phone}</a></li>
            <li><Icon name="mail" /> <a href={`mailto:${s.email}`}>{s.email}</a></li>
          </ul>
        </div>
        <div>
          <h4>Perusahaan</h4>
          <ul>
            <li><Link href="/">Beranda</Link></li>
            <li><Link href="/tentang-kami">Tentang Kami</Link></li>
            <li><Link href="/portofolio">Portofolio</Link></li>
            <li><Link href="/artikel">Artikel</Link></li>
            <li><Link href="/kontak">Kontak</Link></li>
            <li><Link href="/sitemap">Sitemap</Link></li>
          </ul>
        </div>
        <div>
          <h4>Layanan</h4>
          <ul>
            {services.map((sv) => (
              <li key={sv.slug}><Link href={`/layanan/${sv.slug}`}>{sv.title}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h4>Jam Operasional</h4>
          <ul className="footer-hours">
            {lines(s.hours).map((l) => (
              <li key={l}><Icon name="clock" /> {l}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {year} {s.company_name}. Hak cipta dilindungi.</span>
        <div className="footer-social">
          {socials.map(([icon, url, label]) => (
            <a key={icon} href={url} target="_blank" rel="noopener noreferrer" aria-label={label}>
              <Icon name={icon} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
