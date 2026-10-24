import Link from 'next/link';
import Icon from '@/components/Icon';
import Flash from '@/components/admin/Flash';
import { all } from '@/lib/db';
import { formatDate } from '@/lib/utils';

export default async function ArticlesAdmin({ searchParams }) {
  const sp = await searchParams;
  const rows = await all('SELECT id, title, slug, category, cover, is_published, published_at FROM articles ORDER BY published_at DESC');
  return (
    <>
      <header className="a-head">
        <div><h1>Artikel</h1><p>Tulisan blog, tips, dan berita perusahaan.</p></div>
        <Link href="/admin/artikel/baru" className="a-btn a-btn-primary"><Icon name="plus" /> Tulis Artikel</Link>
      </header>
      <Flash sp={sp} />
      <div className="a-card a-table-wrap">
        <table className="a-table">
          <thead><tr><th></th><th>Judul</th><th>Tanggal</th><th>Status</th><th></th></tr></thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id}>
                <td className="a-thumb">{r.cover ? <img src={r.cover} alt="" /> : <Icon name="file-text" />}</td>
                <td><strong>{r.title}</strong><small>{r.category}</small></td>
                <td>{formatDate(r.published_at)}</td>
                <td><span className={`a-status ${r.is_published ? 'on' : ''}`}>{r.is_published ? 'Tayang' : 'Draft'}</span></td>
                <td className="a-actions"><Link href={`/admin/artikel/${r.id}`} className="a-btn a-btn-ghost"><Icon name="pencil" /> Edit</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
