import Link from 'next/link';
import Icon from '@/components/Icon';
import { all, one } from '@/lib/db';
import { formatDate } from '@/lib/utils';

export default async function Dashboard() {
  const c = await one(`SELECT
    (SELECT COUNT(*) FROM services) AS services,
    (SELECT COUNT(*) FROM portfolios) AS portfolios,
    (SELECT COUNT(*) FROM articles) AS articles,
    (SELECT COUNT(*) FROM messages WHERE is_read = 0) AS unread`);
  const msgs = await all('SELECT * FROM messages ORDER BY created_at DESC LIMIT 5');
  const cards = [
    ['/admin/layanan', 'layers', 'Layanan', c.services],
    ['/admin/portofolio', 'briefcase', 'Portofolio', c.portfolios],
    ['/admin/artikel', 'file-text', 'Artikel', c.articles],
    ['/admin/pesan', 'inbox', 'Pesan Belum Dibaca', c.unread],
  ];
  const quick = [
    ['/admin/portofolio/baru', 'plus', 'Tambah Portofolio'],
    ['/admin/artikel/baru', 'pencil', 'Tulis Artikel'],
    ['/admin/halaman/beranda', 'house', 'Edit Beranda'],
    ['/admin/halaman/umum', 'settings', 'Nomor WhatsApp & Kontak'],
  ];
  return (
    <>
      <header className="a-head">
        <div>
          <h1>Dashboard</h1>
          <p>Selamat datang di CMS GRC Cetak.</p>
        </div>
      </header>
      <div className="a-stats">
        {cards.map(([href, icon, label, n]) => (
          <Link key={href} href={href} className="a-stat">
            <span className="a-stat-ic"><Icon name={icon} /></span>
            <strong>{Number(n)}</strong>
            <small>{label}</small>
          </Link>
        ))}
      </div>
      <div className="a-cols">
        <section className="a-card">
          <h2>Pesan Terbaru</h2>
          {msgs.length ? (
            <ul className="a-msgs">
              {msgs.map((m) => (
                <li key={m.id} className={m.is_read ? '' : 'unread'}>
                  <strong>{m.name}</strong>
                  <span>{m.subject || m.message.slice(0, 60)}</span>
                  <small>{formatDate(m.created_at)}</small>
                </li>
              ))}
            </ul>
          ) : (
            <p className="a-muted">Belum ada pesan masuk.</p>
          )}
          <Link href="/admin/pesan" className="a-link">Lihat semua pesan <Icon name="arrow-right" /></Link>
        </section>
        <section className="a-card">
          <h2>Aksi Cepat</h2>
          <div className="a-quick">
            {quick.map(([href, icon, label]) => (
              <Link key={href} href={href}><Icon name={icon} /> {label}</Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
