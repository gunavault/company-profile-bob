import { notFound } from 'next/navigation';
import Flash from '@/components/admin/Flash';
import BackLink from '@/components/admin/BackLink';
import { ConfirmButton } from '@/components/admin/Fields';
import { one } from '@/lib/db';
import { deleteService } from '../../../actions';
import ServiceForm from '../ServiceForm';

export default async function EditService({ params, searchParams }) {
  const [{ id }, sp] = await Promise.all([params, searchParams]);
  const s = await one('SELECT * FROM services WHERE id = ?', [Number(id) || 0]);
  if (!s) notFound();
  return (
    <>
      <header className="a-head">
        <div><BackLink href="/admin/layanan" /><h1>Edit Layanan</h1></div>
        <form action={deleteService}><input type="hidden" name="id" value={s.id} /><ConfirmButton /></form>
      </header>
      <Flash sp={sp} />
      <ServiceForm s={s} />
    </>
  );
}
