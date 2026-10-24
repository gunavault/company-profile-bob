import { redirect } from 'next/navigation';
import { currentUser } from '@/lib/auth';
import LoginForm from './LoginForm';

export const metadata = { title: 'Masuk Admin' };

export default async function LoginPage() {
  if (await currentUser()) redirect('/admin');
  return (
    <div className="a-login">
      <div className="a-login-card">
        <img src="/images/logo.svg" alt="GRC Cetak" width="72" height="72" />
        <h1>Masuk ke CMS</h1>
        <p>Kelola konten website GRC Cetak.</p>
        <LoginForm />
      </div>
      <div className="a-login-art" style={{ backgroundImage: 'url(/images/stock/fasad-lengkung.jpg)' }} />
    </div>
  );
}
