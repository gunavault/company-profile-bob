import Link from 'next/link';
import Icon from '@/components/Icon';
import Accordion from '@/components/site/Accordion';
import ArrowLink from '@/components/site/ArrowLink';
import ArticleCard from '@/components/site/ArticleCard';
import CtaBanner from '@/components/site/CtaBanner';
import PortfolioCard from '@/components/site/PortfolioCard';
import SectionTitle from '@/components/site/SectionTitle';
import { getArticles, getFaqs, getPortfolios, getServices, getSettings, getTestimonials } from '@/lib/data';
import { waLink } from '@/lib/utils';

export default async function HomePage() {
  const [s, services, portfolios, faqs, testimonials, articles] = await Promise.all([
    getSettings(),
    getServices(),
    getPortfolios({ limit: 7 }),
    getFaqs(),
    getTestimonials(),
    getArticles(3),
  ]);
  const wa = waLink(s.whatsapp, s.wa_message);
  const features = [1, 2, 3, 4].map((n) => ({ icon: s[`feature${n}_icon`], text: s[`feature${n}_text`] })).filter((f) => f.text);
  const stats = [1, 2, 3, 4].map((n) => ({ v: s[`stat${n}_value`], l: s[`stat${n}_label`] })).filter((x) => x.v);

  return (
    <>
      {/* HERO */}
      <section className="hero container">
        <div className="hero-card" style={{ '--bg': `url("${s.hero_image}")` }}>
          <div className="hero-content">
            {s.hero_badge ? <span className="badge">{s.hero_badge}</span> : null}
            <h1 className="display">{s.hero_title}</h1>
            <p>{s.hero_subtitle}</p>
            <div className="hero-actions">
              <ArrowLink href={wa} external>Konsultasi Gratis</ArrowLink>
              <Link href="/portofolio" className="btn btn-ghost">
                Lihat Portofolio
              </Link>
            </div>
          </div>
        </div>
        {features.length ? (
          <ul className="feature-bar">
            {features.map((f) => (
              <li key={f.text}>
                <Icon name={f.icon} />
                <span>{f.text}</span>
              </li>
            ))}
          </ul>
        ) : null}
      </section>

      {/* INTRO */}
      <section className="section container intro">
        <div className="intro-a">
          <img src={s.intro_image1} alt="" loading="lazy" />
          <div className="intro-title">
            <span className="badge">{s.intro_badge}</span>
            <h2 className="display">{s.intro_title}</h2>
          </div>
        </div>
        <div className="intro-b">
          <img src={s.intro_image2} alt="" loading="lazy" />
        </div>
        <div className="intro-c">
          <img src={s.intro_image3} alt="" loading="lazy" />
          <p>{s.intro_text}</p>
          <ArrowLink href="/tentang-kami">Selengkapnya</ArrowLink>
        </div>
      </section>

      {stats.length ? (
        <section className="container stats">
          {stats.map((x) => (
            <div key={x.l} className="stat">
              <strong className="display">{x.v}</strong>
              <span>{x.l}</span>
            </div>
          ))}
        </section>
      ) : null}

      {/* LAYANAN */}
      {services.length ? (
        <section className="section container">
          <div className="green-panel">
            <div className="panel-head">
              <SectionTitle badge="Layanan Kami" title="Solusi GRC untuk Setiap Proyek" />
              <ArrowLink href="/layanan" variant="dark">Semua Layanan</ArrowLink>
            </div>
            <Accordion
              variant="services"
              numbered
              items={services.map((sv) => ({
                key: sv.slug,
                title: sv.title,
                content: (
                  <div className="svc-open">
                    {sv.image ? <img src={sv.image} alt={sv.title} loading="lazy" /> : null}
                    <div>
                      <p>{sv.excerpt}</p>
                      <Link href={`/layanan/${sv.slug}`} className="text-link">
                        Detail layanan <Icon name="arrow-right" />
                      </Link>
                    </div>
                  </div>
                ),
              }))}
            />
          </div>
        </section>
      ) : null}

      {/* PORTOFOLIO */}
      {portfolios.length ? (
        <section className="section container">
          <SectionTitle badge="Portofolio" title="Karya Terbaik Kami" center />
          <div className="pf-mosaic">
            {portfolios.map((p, i) => (
              <PortfolioCard key={p.id} p={p} className={`m${i}`} />
            ))}
          </div>
          <div className="center-row">
            <ArrowLink href="/portofolio">Lihat Semua Proyek</ArrowLink>
          </div>
        </section>
      ) : null}

      {/* FAQ */}
      {faqs.length ? (
        <section className="section container">
          <div className="green-panel faq-panel">
            <div>
              <SectionTitle badge="Tanya Jawab" title="Pertanyaan yang Sering Diajukan" />
              <Accordion
                variant="faq"
                items={faqs.map((f) => ({ key: f.id, title: f.question, content: <p>{f.answer}</p> }))}
              />
            </div>
            <img className="faq-img" src={s.faq_image} alt="" loading="lazy" />
          </div>
        </section>
      ) : null}

      {/* TESTIMONI */}
      {testimonials.length ? (
        <section className="section container">
          <SectionTitle badge="Testimoni" title="Apa Kata Mereka" center>
            <p className="rating-line">
              {[0, 1, 2, 3, 4].map((i) => (
                <Icon key={i} name="star-solid" className="star" />
              ))}
              <span>Dipercaya ratusan klien di Jabodetabek</span>
            </p>
          </SectionTitle>
          <div className="testi-grid">
            {testimonials.map((t) => (
              <figure key={t.id} className="testi">
                <Icon name="quote" className="testi-q" />
                <blockquote>{t.content}</blockquote>
                <figcaption>
                  <span className="testi-avatar">{t.name.replace(/^(H\.|Ir\.|Dr\.)\s*/, '').charAt(0)}</span>
                  <span>
                    <strong>{t.name}</strong>
                    <small>{t.role}</small>
                  </span>
                </figcaption>
                <div className="testi-stars" aria-label={`${t.rating} dari 5 bintang`}>
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Icon key={i} name="star-solid" className="star" />
                  ))}
                </div>
              </figure>
            ))}
          </div>
        </section>
      ) : null}

      {/* ARTIKEL */}
      {articles.length ? (
        <section className="section container">
          <div className="panel-head">
            <SectionTitle badge="Artikel" title="Wawasan & Inspirasi GRC" />
            <ArrowLink href="/artikel">Semua Artikel</ArrowLink>
          </div>
          <div className="ar-grid">
            {articles.map((a) => (
              <ArticleCard key={a.id} a={a} />
            ))}
          </div>
        </section>
      ) : null}

      <CtaBanner title={s.cta_title} text={s.cta_text} image={s.cta_image} waHref={wa} />
    </>
  );
}
