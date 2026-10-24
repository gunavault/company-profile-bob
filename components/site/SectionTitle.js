export default function SectionTitle({ badge, title, center = false, children }) {
  return (
    <div className={`sec-title${center ? ' is-center' : ''}`}>
      {badge ? <span className="badge">{badge}</span> : null}
      <h2 className="display">{title}</h2>
      {children}
    </div>
  );
}
