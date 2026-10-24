import Link from 'next/link';
import Icon from '@/components/Icon';
import Flash from '@/components/admin/Flash';
import { all } from '@/lib/db';

export default async function PortfolioAdmin({ searchParams }) {
  const sp = await searchParams;
  const rows = await all(`SELECT p.*, (SELECT COUNT(*) FROM portfolio_images i WHERE i.portfolio_id = p.id) AS n_img
    FROM portfolios p ORDER BY sort_order, id DESC`);
  return (
    <>
      <header className="a-head">
        <div><h1>Portofolio</h1><p>Proyek beserta galeri foto dan lokasi Google Maps.</p></div>
        <Link href="/admin/portofolio/baru" className="a-btn a-btn-primary"><Icon name="plus" /> Tambah Proyek</Link>
      </header>
      <Flash sp={sp} />
      <div className="a-card a-table-wrap">
        <table className="a-table">
          <thead><tr><th></th><th>Proyek</th><th>Lokasi</th><th>Foto</th><th>Status</th><th></th></tr></thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id}>
                <td className="a-thumb">{r.cover ? <img src={r.cover} alt="" /> : <Icon name="image" />}</td>
                <td><strong>{r.title}</strong><small>{r.category} · {r.year}</small></td>
                <td>
                  {r.location}
                  {r.lat != null ? <small><Icon name="map-pin" /> {Number(r.lat).toFixed(4)}, {Number(r.lng).toFixed(4)}</small> : <small className="a-warn">Belum ada koordinat</small>}
                </td>
                <td>{Number(r.n_img) + (r.cover ? 1 : 0)}</td>
                <td>
                  <span className={`a-status ${r.is_published ? 'on' : ''}`}>{r.is_published ? 'Tayang' : 'Draft'}</span>
                  {r.is_featured ? <span className="a-status feat">Unggulan</span> : null}
                </td>
                <td className="a-actions"><Link href={`/admin/portofolio/${r.id}`} className="a-btn a-btn-ghost"><Icon name="pencil" /> Edit</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
