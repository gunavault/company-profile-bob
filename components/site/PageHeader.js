import Link from 'next/link';
import Icon from '@/components/Icon';

export default function PageHeader({ title, subtitle, image, crumbs = [] }) {
  return (
    <section className="page-head container">
      <div className="page-head-card" style={image ? { '--bg': `url("${image}")` } : undefined}>
        <nav className="crumbs" aria-label="Breadcrumb">
          <Link href="/">Beranda</Link>
          {crumbs.map((c) => (
            <span key={c.label}>
              <Icon name="chevron-right" />
              {c.href ? <Link href={c.href}>{c.label}</Link> : <span aria-current="page">{c.label}</span>}
            </span>
          ))}
        </nav>
        <h1 className="display">{title}</h1>
        {subtitle ? <p>{subtitle}</p> : null}
      </div>
    </section>
  );
}
