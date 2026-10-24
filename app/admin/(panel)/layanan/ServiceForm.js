import Link from 'next/link';
import Icon from '@/components/Icon';
import { IconSelect, ImageField, RichText, SubmitButton } from '@/components/admin/Fields';
import { ICON_CHOICES } from '@/lib/settings-schema';
import { saveService } from '../../actions';

export default function ServiceForm({ s = {} }) {
  return (
    <form action={saveService} className="a-form">
      <input type="hidden" name="id" value={s.id || ''} />
      <div className="a-cols a-cols-main">
        <div className="a-card">
          <label className="a-field"><span className="a-label">Judul *</span><input className="a-input" name="title" defaultValue={s.title} required /></label>
          <label className="a-field"><span className="a-label">Slug URL</span><input className="a-input" name="slug" defaultValue={s.slug} placeholder="otomatis dari judul" /></label>
          <label className="a-field"><span className="a-label">Ringkasan</span><textarea className="a-input" name="excerpt" rows={3} defaultValue={s.excerpt} /></label>
          <RichText name="content" label="Deskripsi Lengkap" value={s.content} />
        </div>
        <div className="a-card">
          <ImageField name="image" label="Gambar" value={s.image} />
          <IconSelect name="icon" label="Ikon" value={s.icon} choices={ICON_CHOICES} />
          <label className="a-field"><span className="a-label">Urutan</span><input className="a-input" type="number" name="sort_order" defaultValue={s.sort_order ?? 0} /></label>
          <label className="a-check"><input type="checkbox" name="is_published" defaultChecked={s.is_published ?? 1} /> Tayangkan di website</label>
          <div className="a-form-actions">
            <SubmitButton />
            {s.slug ? <Link href={`/layanan/${s.slug}`} target="_blank" className="a-btn a-btn-ghost"><Icon name="eye" /> Lihat</Link> : null}
          </div>
        </div>
      </div>
    </form>
  );
}
