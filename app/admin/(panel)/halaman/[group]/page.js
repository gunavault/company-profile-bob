import Link from 'next/link';
import { notFound } from 'next/navigation';
import Icon from '@/components/Icon';
import Flash from '@/components/admin/Flash';
import { IconSelect, ImageField, RichText, SubmitButton } from '@/components/admin/Fields';
import { getSettings } from '@/lib/data';
import { ICON_CHOICES, SETTING_GROUPS } from '@/lib/settings-schema';
import { saveSettings } from '../../../actions';

const PREVIEW = { beranda: '/', tentang: '/tentang-kami', kontak: '/kontak', seo: '/sitemap.xml', umum: '/' };

export default async function SettingsPage({ params, searchParams }) {
  const [{ group: gid }, sp] = await Promise.all([params, searchParams]);
  const group = SETTING_GROUPS.find((g) => g.id === gid);
  if (!group) notFound();
  const s = await getSettings();

  return (
    <>
      <header className="a-head">
        <div><h1>{group.title}</h1><p>{group.description}</p></div>
        <Link href={PREVIEW[group.id]} target="_blank" className="a-btn a-btn-ghost"><Icon name="eye" /> Lihat Halaman</Link>
      </header>
      <Flash sp={sp} />
      <form action={saveSettings} className="a-form">
        <input type="hidden" name="_group" value={group.id} />
        <div className="a-card a-settings">
          {group.fields.map((f) => {
            const v = s[f.key];
            if (f.type === 'image') return <ImageField key={f.key} name={f.key} label={f.label} value={v} help={f.help} />;
            if (f.type === 'richtext') return <div key={f.key} className="a-span2"><RichText name={f.key} label={f.label} value={v} help={f.help} /></div>;
            if (f.type === 'icon') return <IconSelect key={f.key} name={f.key} label={f.label} value={v} choices={ICON_CHOICES} />;
            if (f.type === 'select') {
              return (
                <label key={f.key} className="a-field"><span className="a-label">{f.label}</span>
                  <select className="a-input" name={f.key} defaultValue={v}>{f.options.map((o) => <option key={o}>{o}</option>)}</select>
                </label>
              );
            }
            return (
              <label key={f.key} className={`a-field${f.type === 'textarea' ? ' a-span2' : ''}`}>
                <span className="a-label">{f.label}</span>
                {f.type === 'textarea' ? <textarea className="a-input" name={f.key} rows={4} defaultValue={v} /> : <input className="a-input" name={f.key} defaultValue={v} />}
                {f.help ? <small className="a-help">{f.help}</small> : null}
              </label>
            );
          })}
        </div>
        <div className="a-savebar"><SubmitButton>Simpan Perubahan</SubmitButton></div>
      </form>
    </>
  );
}
