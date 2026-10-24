import { notFound } from 'next/navigation';
import Flash from '@/components/admin/Flash';
import BackLink from '@/components/admin/BackLink';
import { ConfirmButton } from '@/components/admin/Fields';
import { all, one } from '@/lib/db';
import { deletePortfolio } from '../../../actions';
import PortfolioForm from '../PortfolioForm';

export default async function EditPortfolio({ params, searchParams }) {
  const [{ id }, sp] = await Promise.all([params, searchParams]);
  const p = await one('SELECT * FROM portfolios WHERE id = ?', [Number(id) || 0]);
  if (!p) notFound();
  const images = await all('SELECT * FROM portfolio_images WHERE portfolio_id = ? ORDER BY sort_order, id', [p.id]);
  return (
    <>
      <header className="a-head">
        <div><BackLink href="/admin/portofolio" /><h1>Edit Proyek</h1></div>
        <form action={deletePortfolio}><input type="hidden" name="id" value={p.id} /><ConfirmButton /></form>
      </header>
      <Flash sp={sp} />
      <PortfolioForm p={p} images={images} />
    </>
  );
}
