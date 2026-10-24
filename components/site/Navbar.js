'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Icon from '@/components/Icon';

export default function Navbar({ logo, companyName, services, waHref }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isActive = (href) => (href === '/' ? pathname === '/' : pathname.startsWith(href));
  const links = [
    { href: '/', label: 'Beranda' },
    { href: '/layanan', label: 'Layanan', children: services },
    { href: '/portofolio', label: 'Portofolio' },
    { href: '/artikel', label: 'Artikel' },
    { href: '/tentang-kami', label: 'Tentang' },
    { href: '/kontak', label: 'Kontak' },
  ];

  return (
    <header className={`nav-wrap${scrolled ? ' is-scrolled' : ''}`}>
      <nav className="nav" aria-label="Navigasi utama">
        <Link href="/" className="nav-logo" aria-label={`${companyName} – Beranda`}>
          <img src={logo} alt={companyName} width="52" height="52" />
        </Link>

        <ul className={`nav-links${open ? ' is-open' : ''}`}>
          {links.map((l) => (
            <li key={l.href} className={l.children?.length ? 'has-drop' : undefined}>
              <Link href={l.href} className={isActive(l.href) ? 'active' : undefined}>
                {l.label}
                {l.children?.length ? <Icon name="chevron-down" className="nav-caret" /> : null}
              </Link>
              {l.children?.length ? (
                <div className="nav-drop">
                  {l.children.map((c) => (
                    <Link key={c.slug} href={`/layanan/${c.slug}`}>
                      <Icon name={c.icon || 'layers'} />
                      {c.title}
                    </Link>
                  ))}
                </div>
              ) : null}
            </li>
          ))}
          <li className="nav-mobile-cta">
            <a href={waHref} target="_blank" rel="noopener noreferrer" className="btn btn-dark">
              <span>Hubungi Kami</span>
              <span className="btn-ic">
                <Icon name="arrow-up-right" />
              </span>
            </a>
          </li>
        </ul>

        <a href={waHref} target="_blank" rel="noopener noreferrer" className="btn btn-dark nav-cta">
          <span>Hubungi Kami</span>
          <span className="btn-ic">
            <Icon name="arrow-up-right" />
          </span>
        </a>

        <button
          type="button"
          className="nav-burger"
          aria-label={open ? 'Tutup menu' : 'Buka menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <Icon name={open ? 'x' : 'menu'} />
        </button>
      </nav>
    </header>
  );
}
