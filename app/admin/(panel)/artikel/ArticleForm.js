import Link from 'next/link';
import Icon from '@/components/Icon';
import { ImageField, RichText, SubmitButton } from '@/components/admin/Fields';
import { saveArticle } from '../../actions';

export default function ArticleForm({ a = {} }) {
  const date = a.published_at ? String(a.published_at).replace(' ', 'T').slice(0, 16) : '';
  return (
    <form action={saveArticle} className="a-form">
      <input type="hidden" name="id" value={a.id || ''} />
      <div className="a-cols a-cols-main">
        <div className="a-card">
          <label className="a-field"><span className="a-label">Judul *</span><input className="a-input a-input-lg" name="title" defaultValue={a.title} required /></label>
          <label className="a-field"><span className="a-label">Ringkasan</span><textarea className="a-input" name="excerpt" rows={3} defaultValue={a.excerpt} /></label>
          <RichText name="content" label="Isi Artikel" value={a.content} />
        </div>
        <div className="a-card a-sticky">
          <ImageField name="cover" label="Gambar Sampul" value={a.cover} />
          <label className="a-field"><span className="a-label">Kategori</span><input className="a-input" name="category" defaultValue={a.category} placeholder="Tips / Edukasi / Inspirasi" /></label>
          <label className="a-field"><span className="a-label">Tanggal Terbit</span><input className="a-input" type="datetime-local" name="published_at" defaultValue={date} /></label>
          <label className="a-field"><span className="a-label">Slug URL</span><input className="a-input" name="slug" defaultValue={a.slug} placeholder="otomatis dari judul" /></label>
          <label className="a-check"><input type="checkbox" name="is_published" defaultChecked={a.is_published ?? 1} /> Tayangkan di website</label>
          <div className="a-form-actions">
            <SubmitButton />
            {a.slug ? <Link href={`/artikel/${a.slug}`} target="_blank" className="a-btn a-btn-ghost"><Icon name="eye" /> Lihat</Link> : null}
          </div>
        </div>
      </div>
    </form>
  );
}
