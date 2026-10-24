import Icon from '@/components/Icon';
import Flash from '@/components/admin/Flash';
import { ConfirmButton, SubmitButton } from '@/components/admin/Fields';
import { all } from '@/lib/db';
import { deleteFaq, saveFaq } from '../../actions';

export default async function FaqAdmin({ searchParams }) {
  const sp = await searchParams;
  const rows = await all('SELECT * FROM faqs ORDER BY sort_order, id');
  return (
    <>
      <header className="a-head"><div><h1>FAQ</h1><p>Pertanyaan yang sering diajukan, tampil di beranda.</p></div></header>
      <Flash sp={sp} />
      {rows.map((r) => (
        <div key={r.id} className="a-card a-row-card">
          <form action={saveFaq} className="a-form">
            <input type="hidden" name="id" value={r.id} />
            <div className="a-grid-faq">
              <label className="a-field"><span className="a-label">Pertanyaan</span><input className="a-input" name="question" defaultValue={r.question} required /></label>
              <label className="a-field"><span className="a-label">Urutan</span><input className="a-input" type="number" name="sort_order" defaultValue={r.sort_order} /></label>
            </div>
            <label className="a-field"><span className="a-label">Jawaban</span><textarea className="a-input" name="answer" rows={3} defaultValue={r.answer} required /></label>
            <div className="a-form-actions"><SubmitButton /></div>
          </form>
          <form action={deleteFaq} className="a-del-float"><input type="hidden" name="id" value={r.id} /><ConfirmButton>Hapus</ConfirmButton></form>
        </div>
      ))}
      <div className="a-card a-card-new">
        <h2><Icon name="plus" /> Tambah FAQ</h2>
        <form action={saveFaq} className="a-form">
          <div className="a-grid-faq">
            <label className="a-field"><span className="a-label">Pertanyaan</span><input className="a-input" name="question" required /></label>
            <label className="a-field"><span className="a-label">Urutan</span><input className="a-input" type="number" name="sort_order" defaultValue={rows.length + 1} /></label>
          </div>
          <label className="a-field"><span className="a-label">Jawaban</span><textarea className="a-input" name="answer" rows={3} required /></label>
          <div className="a-form-actions"><SubmitButton icon="plus">Tambah</SubmitButton></div>
        </form>
      </div>
    </>
  );
}
