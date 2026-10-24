'use client';

import { useState } from 'react';
import Icon from '@/components/Icon';

export default function Accordion({ items, defaultOpen = 0, variant = 'plain', numbered = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className={`acc acc-${variant}`}>
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <div key={it.key ?? i} className={`acc-item${isOpen ? ' is-open' : ''}`}>
            <button
              type="button"
              className="acc-head"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? -1 : i)}
            >
              <span className="acc-title">
                {numbered ? <span className="acc-num">{String(i + 1).padStart(2, '0')}.</span> : null}
                {it.title}
              </span>
              <span className="acc-ic">
                <Icon name={isOpen ? 'minus' : 'plus'} />
              </span>
            </button>
            <div className="acc-body" hidden={!isOpen}>
              {it.content}
            </div>
          </div>
        );
      })}
    </div>
  );
}
