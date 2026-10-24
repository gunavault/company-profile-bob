import Link from 'next/link';
import Icon from '@/components/Icon';
import { ImageField, MapPicker, RichText, SubmitButton } from '@/components/admin/Fields';
import { savePortfolio } from '../../actions';

export default function PortfolioForm({ p = {}, images = [] }) {
  return (
    <form action={savePortfolio} className="a-form">
      <input type="hidden" name="id" value={p.id || ''} />
      <div className="a-cols a-cols-main">
        <div>
          <div className="a-card">
            <label className="a-field"><span className="a-label">Judul Proyek *</span><input className="a-input" name="title" defaultValue={p.title} required /></label>
            <div className="a-grid2">
              <label className="a-field"><span className="a-label">Kategori</span><input className="a-input" name="category" defaultValue={p.category} placeholder="Masjid / Residensial / Komersial" /></label>
              <label className="a-field"><span className="a-label">Tahun</span><input className="a-input" name="year" defaultValue={p.year} /></label>
            </div>
            <div className="a-grid2">
              <label className="a-field"><span className="a-label">Klien</span><input className="a-input" name="client" defaultValue={p.client} /></label>
              <label className="a-field"><span className="a-label">Lokasi (teks)</span><input className="a-input" name="location" defaultValue={p.location} placeholder="Cileungsi, Kabupaten Bogor" /></label>
            </div>
            <label className="a-field"><span className="a-label">Ringkasan</span><textarea className="a-input" name="excerpt" rows={2} defaultValue={p.excerpt} /></label>
            <RichText name="content" label="Deskripsi Proyek" value={p.content} />
          </div>
          <div className="a-card">
            <MapPicker lat={p.lat} lng={p.lng} />
          </div>
          <div className="a-card">
            <span className="a-label">Galeri Foto</span>
            {images.length ? (
              <div className="a-gallery">
                {images.map((im) => (
                  <div key={im.id} className="a-gal-item">
                    <img src={im.path} alt="" />
                    <input className="a-input" name={`img_cap_${im.id}`} defaultValue={im.caption || ''} placeholder="Keterangan" />
                    <div className="a-inline">
                      <input className="a-input a-input-sm" type="number" name={`img_ord_${im.id}`} defaultValue={im.sort_order} title="Urutan" />
                      <label className="a-check a-check-danger"><input type="checkbox" name={`img_del_${im.id}`} /> Hapus</label>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="a-muted">Belum ada foto galeri.</p>
            )}
            <label className="a-btn a-btn-ghost a-upload">
              <Icon name="upload" /> Tambah foto (bisa pilih banyak)
              <input type="file" name="gallery_files" accept="image/jpeg,image/png,image/webp" multiple />
            </label>
            <small className="a-help">Maks 4 MB per foto, total sekali simpan maks ±4 MB. Upload bertahap bila foto banyak.</small>
          </div>
        </div>
        <div className="a-card a-sticky">
          <ImageField name="cover" label="Foto Utama (Cover)" value={p.cover} />
          <label className="a-field"><span className="a-label">Slug URL</span><input className="a-input" name="slug" defaultValue={p.slug} placeholder="otomatis dari judul" /></label>
          <label className="a-field"><span className="a-label">Urutan</span><input className="a-input" type="number" name="sort_order" defaultValue={p.sort_order ?? 0} /></label>
          <label className="a-check"><input type="checkbox" name="is_published" defaultChecked={p.is_published ?? 1} /> Tayangkan di website</label>
          <label className="a-check"><input type="checkbox" name="is_featured" defaultChecked={!!p.is_featured} /> Proyek unggulan</label>
          <div className="a-form-actions">
            <SubmitButton />
            {p.slug ? <Link href={`/portofolio/${p.slug}`} target="_blank" className="a-btn a-btn-ghost"><Icon name="eye" /> Lihat</Link> : null}
          </div>
        </div>
      </div>
    </form>
  );
}
