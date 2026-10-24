import Flash from '@/components/admin/Flash';
import BackLink from '@/components/admin/BackLink';
import PortfolioForm from '../PortfolioForm';

export default async function NewPortfolio({ searchParams }) {
  const sp = await searchParams;
  return (
    <>
      <header className="a-head"><div><BackLink href="/admin/portofolio" /><h1>Tambah Proyek</h1></div></header>
      <Flash sp={sp} />
      <PortfolioForm />
    </>
  );
}
