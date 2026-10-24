import Icon from '@/components/Icon';

export default function Flash({ sp }) {
  if (sp?.ok) return <div className="a-flash a-flash-ok"><Icon name="check" /> {sp.ok}</div>;
  if (sp?.err) return <div className="a-flash a-flash-err"><Icon name="x" /> {sp.err}</div>;
  return null;
}
