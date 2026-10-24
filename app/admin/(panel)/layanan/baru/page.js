import Flash from '@/components/admin/Flash';
import BackLink from '@/components/admin/BackLink';
import ServiceForm from '../ServiceForm';

export default async function NewService({ searchParams }) {
  const sp = await searchParams;
  return (
    <>
      <header className="a-head"><div><BackLink href="/admin/layanan" /><h1>Tambah Layanan</h1></div></header>
      <Flash sp={sp} />
      <ServiceForm />
    </>
  );
}
