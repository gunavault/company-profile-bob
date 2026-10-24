import Icon from '@/components/Icon';
import Flash from '@/components/admin/Flash';
import { SubmitButton } from '@/components/admin/Fields';
import { requireAdmin } from '@/lib/auth';
import { updateAccount } from '../../actions';

export default async function AccountPage({ searchParams }) {
  const [user, sp] = await Promise.all([requireAdmin(), searchParams]);
  return (
    <>
      <header className="a-head"><div><h1>Akun Admin</h1><p>Ganti username dan password login CMS.</p></div></header>
      <Flash sp={sp} />
      <div className="a-card a-tip a-warn-card">
        <Icon name="lock" />
        <p>Akun bawaan memakai <code>admin / admin</code>. Segera ganti password sebelum website dipublikasikan.</p>
      </div>
      <form action={updateAccount} className="a-card a-form a-narrow">
        <label className="a-field"><span className="a-label">Username</span><input className="a-input" name="username" defaultValue={user.username} required /></label>
        <label className="a-field"><span className="a-label">Password Baru</span><input className="a-input" type="password" name="password" autoComplete="new-password" placeholder="Kosongkan bila tidak diganti" /></label>
        <label className="a-field"><span className="a-label">Ulangi Password Baru</span><input className="a-input" type="password" name="confirm" autoComplete="new-password" /></label>
        <label className="a-field"><span className="a-label">Password Saat Ini *</span><input className="a-input" type="password" name="current" autoComplete="current-password" required /></label>
        <div className="a-form-actions"><SubmitButton /></div>
      </form>
    </>
  );
}
