import Flash from '@/components/admin/Flash';
import BackLink from '@/components/admin/BackLink';
import ArticleForm from '../ArticleForm';

export default async function NewArticle({ searchParams }) {
  const sp = await searchParams;
  return (
    <>
      <header className="a-head"><div><BackLink href="/admin/artikel" /><h1>Tulis Artikel</h1></div></header>
      <Flash sp={sp} />
      <ArticleForm />
    </>
  );
}
