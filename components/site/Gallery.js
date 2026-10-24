'use client';

import { useCallback, useEffect, useState } from 'react';
import Icon from '@/components/Icon';

export default function Gallery({ images }) {
  const [idx, setIdx] = useState(-1);
  const close = useCallback(() => setIdx(-1), []);
  const step = useCallback((d) => setIdx((i) => (i + d + images.length) % images.length), [images.length]);

  useEffect(() => {
    if (idx < 0) return;
    const onKey = (e) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [idx, close, step]);

  if (!images.length) return null;
  const cur = images[idx];

  return (
    <>
      <div className="gallery">
        {images.map((im, i) => (
          <button key={im.src + i} type="button" className="gallery-item" onClick={() => setIdx(i)}>
            <img src={im.src} alt={im.caption || ''} loading="lazy" />
            {im.caption ? <span className="gallery-cap">{im.caption}</span> : null}
            <span className="gallery-zoom">
              <Icon name="search" />
            </span>
          </button>
        ))}
      </div>
      {cur ? (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label="Galeri foto" onClick={close}>
          <button type="button" className="lb-btn lb-close" aria-label="Tutup" onClick={close}>
            <Icon name="x" />
          </button>
          {images.length > 1 ? (
            <>
              <button type="button" className="lb-btn lb-prev" aria-label="Sebelumnya" onClick={(e) => { e.stopPropagation(); step(-1); }}>
                <Icon name="arrow-left" />
              </button>
              <button type="button" className="lb-btn lb-next" aria-label="Berikutnya" onClick={(e) => { e.stopPropagation(); step(1); }}>
                <Icon name="arrow-right" />
              </button>
            </>
          ) : null}
          <figure onClick={(e) => e.stopPropagation()}>
            <img src={cur.src} alt={cur.caption || ''} />
            <figcaption>
              {cur.caption} <span>{idx + 1} / {images.length}</span>
            </figcaption>
          </figure>
        </div>
      ) : null}
    </>
  );
}
