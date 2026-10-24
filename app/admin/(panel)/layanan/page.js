import Link from 'next/link';
import Icon from '@/components/Icon';
import Flash from '@/components/admin/Flash';
import { all } from '@/lib/db';

export default async function ServicesAdmin({ searchParams }) {
  const sp = await searchParams;
  const rows = await all('SELECT * FROM services ORDER BY sort_order, id');
  return (
    <>
      <header className="a-head">
        <div><h1>Layanan</h1><p>Daftar layanan yang tampil di website.</p></div>
        <Link href="/admin/layanan/baru" className="a-btn a-btn-primary"><Icon name="plus" /> Tambah Layanan</Link>
      </header>
      <Flash sp={sp} />
      <div className="a-card a-table-wrap">
        <table className="a-table">
          <thead><tr><th></th><th>Judul</th><th>Urutan</th><th>Status</th><th></th></tr></thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id}>
                <td className="a-thumb">{r.image ? <img src={r.image} alt="" /> : <Icon name={r.icon || 'layers'} />}</td>
                <td><strong>{r.title}</strong><small>/layanan/{r.slug}</small></td>
                <td>{r.sort_order}</td>
                <td><span className={`a-status ${r.is_published ? 'on' : ''}`}>{r.is_published ? 'Tayang' : 'Draft'}</span></td>
                <td className="a-actions"><Link href={`/admin/layanan/${r.id}`} className="a-btn a-btn-ghost"><Icon name="pencil" /> Edit</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
