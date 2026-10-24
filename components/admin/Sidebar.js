'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import Icon from '@/components/Icon';

const MENU = [
  ['Utama', [['/admin', 'layout-dashboard', 'Dashboard'], ['/admin/pesan', 'inbox', 'Pesan Masuk']]],
  ['Konten', [
    ['/admin/layanan', 'layers', 'Layanan'],
    ['/admin/portofolio', 'briefcase', 'Portofolio'],
    ['/admin/artikel', 'file-text', 'Artikel'],
    ['/admin/faq', 'circle-help', 'FAQ'],
    ['/admin/testimoni', 'quote', 'Testimoni'],
  ]],
  ['Halaman', [
    ['/admin/halaman/beranda', 'house', 'Beranda'],
    ['/admin/halaman/tentang', 'building-2', 'Tentang'],
    ['/admin/halaman/kontak', 'phone', 'Kontak'],
    ['/admin/sitemap', 'network', 'Sitemap & SEO'],
  ]],
  ['Sistem', [['/admin/halaman/umum', 'settings', 'Pengaturan'], ['/admin/akun', 'user', 'Akun Admin']]],
];

export default function Sidebar({ username, unread, logoutAction }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const active = (href) => (href === '/admin' ? pathname === '/admin' : pathname.startsWith(href));
  return (
    <>
      <div className="a-topbar">
        <button type="button" className="a-burger" aria-label="Menu" onClick={() => setOpen((v) => !v)}>
          <Icon name={open ? 'x' : 'menu'} />
        </button>
        <span className="a-brand-sm">GRC Cetak CMS</span>
      </div>
      <aside className={`a-side${open ? ' is-open' : ''}`}>
        <div className="a-brand">
          <img src="/images/logo.svg" alt="" width="40" height="40" />
          <div>
            <strong>GRC Cetak</strong>
            <small>Content Manager</small>
          </div>
        </div>
        <nav>
          {MENU.map(([group, items]) => (
            <div key={group} className="a-nav-group">
              <span>{group}</span>
              {items.map(([href, icon, label]) => (
                <Link key={href} href={href} className={active(href) ? 'active' : undefined} onClick={() => setOpen(false)}>
                  <Icon name={icon} /> {label}
                  {href === '/admin/pesan' && unread ? <em className="a-pill">{unread}</em> : null}
                </Link>
              ))}
            </div>
          ))}
        </nav>
        <div className="a-side-foot">
          <a href="/" target="_blank" rel="noopener noreferrer"><Icon name="external-link" /> Lihat Website</a>
          <form action={logoutAction}>
            <button type="submit"><Icon name="log-out" /> Keluar ({username})</button>
          </form>
        </div>
      </aside>
    </>
  );
}
