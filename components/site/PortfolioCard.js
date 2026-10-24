import Link from 'next/link';
import Icon from '@/components/Icon';

export default function PortfolioCard({ p, className = '' }) {
  return (
    <Link href={`/portofolio/${p.slug}`} className={`pf-card ${className}`}>
      <img src={p.cover} alt={p.title} loading="lazy" />
      <div className="pf-overlay">
        {p.category ? <span className="badge">{p.category}</span> : null}
        <h3>{p.title}</h3>
        {p.location ? (
          <span className="pf-loc">
            <Icon name="map-pin" /> {p.location}
          </span>
        ) : null}
      </div>
      <span className="pf-arrow">
        <Icon name="arrow-up-right" />
      </span>
    </Link>
  );
}
