import Link from 'next/link';
import Icon from '@/components/Icon';

export default function BackLink({ href, label = 'Kembali' }) {
  return (
    <Link href={href} className="a-back">
      <Icon name="arrow-left" /> {label}
    </Link>
  );
}
