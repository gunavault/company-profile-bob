import { notFound } from 'next/navigation';
import Flash from '@/components/admin/Flash';
import BackLink from '@/components/admin/BackLink';
import { ConfirmButton } from '@/components/admin/Fields';
import { one } from '@/lib/db';
import { deleteArticle } from '../../../actions';
import ArticleForm from '../ArticleForm';

export default async function EditArticle({ params, searchParams }) {
  const [{ id }, sp] = await Promise.all([params, searchParams]);
  const a = await one('SELECT * FROM articles WHERE id = ?', [Number(id) || 0]);
  if (!a) notFound();
  return (
    <>
      <header className="a-head">
        <div><BackLink href="/admin/artikel" /><h1>Edit Artikel</h1></div>
        <form action={deleteArticle}><input type="hidden" name="id" value={a.id} /><ConfirmButton /></form>
      </header>
      <Flash sp={sp} />
      <ArticleForm a={a} />
    </>
  );
}
