import Link from 'next/link';
import Icon from '@/components/Icon';

export default function NotFound() {
  return (
    <main className="nf">
      <span className="badge">404</span>
      <h1 className="display">Halaman Tidak Ditemukan</h1>
      <p>Halaman yang Anda cari mungkin sudah dipindahkan atau tidak tersedia.</p>
      <Link href="/" className="btn btn-light">
        <span>Kembali ke Beranda</span>
        <span className="btn-ic"><Icon name="arrow-up-right" /></span>
      </Link>
    </main>
  );
}
