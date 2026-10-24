import Icon from '@/components/Icon';

export default function CtaBanner({ title, text, image, waHref }) {
  return (
    <section className="cta container">
      <div className="cta-card" style={{ '--bg': `url("${image}")` }}>
        <div>
          <span className="badge">Konsultasi Gratis</span>
          <h2 className="display">{title}</h2>
          {text ? <p>{text}</p> : null}
        </div>
        <a className="btn btn-light" href={waHref} target="_blank" rel="noopener noreferrer">
          <span>Hubungi Sekarang</span>
          <span className="btn-ic">
            <Icon name="arrow-up-right" />
          </span>
        </a>
      </div>
    </section>
  );
}
