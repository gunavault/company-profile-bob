import Link from 'next/link';
import Icon from '@/components/Icon';
import { formatDate } from '@/lib/utils';

export default function ArticleCard({ a }) {
  return (
    <Link href={`/artikel/${a.slug}`} className="ar-card">
      <div className="ar-img">
        <img src={a.cover} alt={a.title} loading="lazy" />
        {a.category ? <span className="badge">{a.category}</span> : null}
      </div>
      <div className="ar-body">
        <span className="ar-date">
          <Icon name="calendar" /> {formatDate(a.published_at)}
        </span>
        <h3>{a.title}</h3>
        <p>{a.excerpt}</p>
        <span className="ar-more">
          Baca selengkapnya <Icon name="arrow-right" />
        </span>
      </div>
    </Link>
  );
}
