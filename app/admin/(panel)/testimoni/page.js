import Icon from '@/components/Icon';
import Flash from '@/components/admin/Flash';
import { ConfirmButton, SubmitButton } from '@/components/admin/Fields';
import { all } from '@/lib/db';
import { deleteTestimonial, saveTestimonial } from '../../actions';

function Fields({ t = {} }) {
  return (
    <>
      <div className="a-grid4">
        <label className="a-field"><span className="a-label">Nama</span><input className="a-input" name="name" defaultValue={t.name} required /></label>
        <label className="a-field"><span className="a-label">Jabatan / Keterangan</span><input className="a-input" name="role" defaultValue={t.role} /></label>
        <label className="a-field"><span className="a-label">Rating</span>
          <select className="a-input" name="rating" defaultValue={t.rating ?? 5}>{[5, 4, 3, 2, 1].map((n) => <option key={n} value={n}>{n} bintang</option>)}</select>
        </label>
        <label className="a-field"><span className="a-label">Urutan</span><input className="a-input" type="number" name="sort_order" defaultValue={t.sort_order ?? 0} /></label>
      </div>
      <label className="a-field"><span className="a-label">Isi Testimoni</span><textarea className="a-input" name="content" rows={3} defaultValue={t.content} required /></label>
    </>
  );
}

export default async function TestimonialAdmin({ searchParams }) {
  const sp = await searchParams;
  const rows = await all('SELECT * FROM testimonials ORDER BY sort_order, id');
  return (
    <>
      <header className="a-head"><div><h1>Testimoni</h1><p>Ulasan klien yang tampil di beranda.</p></div></header>
      <Flash sp={sp} />
      {rows.map((t) => (
        <div key={t.id} className="a-card a-row-card">
          <form action={saveTestimonial} className="a-form">
            <input type="hidden" name="id" value={t.id} />
            <Fields t={t} />
            <div className="a-form-actions"><SubmitButton /></div>
          </form>
          <form action={deleteTestimonial} className="a-del-float"><input type="hidden" name="id" value={t.id} /><ConfirmButton>Hapus</ConfirmButton></form>
        </div>
      ))}
      <div className="a-card a-card-new">
        <h2><Icon name="plus" /> Tambah Testimoni</h2>
        <form action={saveTestimonial} className="a-form">
          <Fields t={{ sort_order: rows.length + 1 }} />
          <div className="a-form-actions"><SubmitButton icon="plus">Tambah</SubmitButton></div>
        </form>
      </div>
    </>
  );
}
