import Link from 'next/link';
import Icon from '@/components/Icon';

export default function ArrowLink({ href, children, variant = 'light', external = false, className = '' }) {
  const cls = `btn btn-${variant} ${className}`;
  const inner = (
    <>
      <span>{children}</span>
      <span className="btn-ic">
        <Icon name="arrow-up-right" />
      </span>
    </>
  );
  if (external) {
    return (
      <a className={cls} href={href} target="_blank" rel="noopener noreferrer">
        {inner}
      </a>
    );
  }
  return (
    <Link className={cls} href={href}>
      {inner}
    </Link>
  );
}
