'use client';

import { useEffect, useRef, useState } from 'react';
import { useFormStatus } from 'react-dom';
import Icon from '@/components/Icon';

export function SubmitButton({ children = 'Simpan', icon = 'save' }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="a-btn a-btn-primary" disabled={pending}>
      <Icon name={icon} /> {pending ? 'Menyimpan…' : children}
    </button>
  );
}

export function ConfirmButton({ children = 'Hapus', message = 'Yakin ingin menghapus data ini?', className = 'a-btn a-btn-danger', icon = 'trash-2' }) {
  return (
    <button
      type="submit"
      className={className}
      onClick={(e) => {
        if (!window.confirm(message)) e.preventDefault();
      }}
    >
      <Icon name={icon} /> {children}
    </button>
  );
}

export function ImageField({ name, label, value, help }) {
  const [preview, setPreview] = useState(value || '');
  const [url, setUrl] = useState(value || '');
  const fileRef = useRef(null);
  return (
    <div className="a-field">
      <span className="a-label">{label}</span>
      <div className="a-image">
        <div className="a-image-preview">
          {preview ? <img src={preview} alt="" /> : <Icon name="image" />}
        </div>
        <div className="a-image-ctrl">
          <label className="a-btn a-btn-ghost a-upload">
            <Icon name="upload" /> Pilih gambar
            <input
              ref={fileRef}
              type="file"
              name={`${name}_file`}
              accept="image/jpeg,image/png,image/webp,image/gif"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) setPreview(URL.createObjectURL(f));
              }}
            />
          </label>
          <input
            className="a-input"
            name={name}
            value={url}
            placeholder="atau tempel URL gambar"
            onChange={(e) => {
              setUrl(e.target.value);
              if (!fileRef.current?.files?.length) setPreview(e.target.value);
            }}
          />
          <small className="a-help">{help || 'JPG/PNG/WEBP, maks 4 MB.'}</small>
        </div>
      </div>
    </div>
  );
}

const TOOLS = [
  ['bold', 'bold', 'Tebal'],
  ['italic', 'italic', 'Miring'],
  ['h2', 'heading-2', 'Judul'],
  ['h3', 'heading-3', 'Subjudul'],
  ['ul', 'list', 'Daftar'],
  ['ol', 'list-ordered', 'Daftar bernomor'],
  ['quote', 'text-quote', 'Kutipan'],
  ['link', 'link', 'Tautan'],
  ['clear', 'undo-2', 'Paragraf biasa'],
];

export function RichText({ name, label, value, help }) {
  const ref = useRef(null);
  const [html, setHtml] = useState(value || '');
  const [source, setSource] = useState(false);

  useEffect(() => {
    if (ref.current && !source) ref.current.innerHTML = html;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [source]);

  const exec = (tool) => {
    ref.current?.focus();
    const map = {
      bold: () => document.execCommand('bold'),
      italic: () => document.execCommand('italic'),
      h2: () => document.execCommand('formatBlock', false, 'h2'),
      h3: () => document.execCommand('formatBlock', false, 'h3'),
      ul: () => document.execCommand('insertUnorderedList'),
      ol: () => document.execCommand('insertOrderedList'),
      quote: () => document.execCommand('formatBlock', false, 'blockquote'),
      clear: () => document.execCommand('formatBlock', false, 'p'),
      link: () => {
        const href = window.prompt('Alamat tautan (https://...)');
        if (href) document.execCommand('createLink', false, href);
      },
    };
    map[tool]?.();
    setHtml(ref.current?.innerHTML || '');
  };

  return (
    <div className="a-field">
      <span className="a-label">{label}</span>
      <div className="rte">
        <div className="rte-bar">
          {TOOLS.map(([t, icon, title]) => (
            <button key={t} type="button" title={title} aria-label={title} disabled={source} onMouseDown={(e) => e.preventDefault()} onClick={() => exec(t)}>
              <Icon name={icon} />
            </button>
          ))}
          <button type="button" className={`rte-src${source ? ' on' : ''}`} onClick={() => setSource((v) => !v)}>
            HTML
          </button>
        </div>
        {source ? (
          <textarea className="rte-code" value={html} onChange={(e) => setHtml(e.target.value)} rows={14} />
        ) : (
          <div
            ref={ref}
            className="rte-area prose-admin"
            contentEditable
            suppressContentEditableWarning
            onInput={(e) => setHtml(e.currentTarget.innerHTML)}
            onBlur={(e) => setHtml(e.currentTarget.innerHTML)}
          />
        )}
      </div>
      <input type="hidden" name={name} value={html} />
      {help ? <small className="a-help">{help}</small> : null}
    </div>
  );
}

function parseCoords(text) {
  const t = String(text || '');
  const pats = [/@(-?\d+\.\d+),(-?\d+\.\d+)/, /[?&]q=(-?\d+\.\d+),\s*(-?\d+\.\d+)/, /!3d(-?\d+\.\d+)!4d(-?\d+\.\d+)/, /^\s*(-?\d+\.\d+)\s*,\s*(-?\d+\.\d+)\s*$/];
  for (const p of pats) {
    const m = t.match(p);
    if (m) return [m[1], m[2]];
  }
  return null;
}

export function MapPicker({ lat: lat0, lng: lng0, latName = 'lat', lngName = 'lng' }) {
  const [lat, setLat] = useState(lat0 ?? '');
  const [lng, setLng] = useState(lng0 ?? '');
  const [paste, setPaste] = useState('');
  const [msg, setMsg] = useState('');
  const valid = lat !== '' && lng !== '' && !Number.isNaN(Number(lat)) && !Number.isNaN(Number(lng));

  return (
    <div className="a-field">
      <span className="a-label">Lokasi Google Maps</span>
      <div className="a-map">
        <div className="a-map-ctrl">
          <label className="a-sub">
            Tempel link Google Maps atau koordinat
            <div className="a-inline">
              <input className="a-input" value={paste} placeholder="https://www.google.com/maps/@-6.42,106.92,15z" onChange={(e) => setPaste(e.target.value)} />
              <button
                type="button"
                className="a-btn a-btn-ghost"
                onClick={() => {
                  const c = parseCoords(paste);
                  if (c) {
                    setLat(c[0]);
                    setLng(c[1]);
                    setMsg('Koordinat berhasil dibaca.');
                  } else setMsg('Koordinat tidak ditemukan. Buka Google Maps, klik kanan lokasi, lalu salin angka koordinatnya.');
                }}
              >
                <Icon name="map-pin" /> Ambil
              </button>
            </div>
          </label>
          {msg ? <small className="a-help">{msg}</small> : null}
          <div className="a-grid2">
            <label className="a-sub">
              Latitude
              <input className="a-input" name={latName} value={lat} onChange={(e) => setLat(e.target.value)} placeholder="-6.4286" />
            </label>
            <label className="a-sub">
              Longitude
              <input className="a-input" name={lngName} value={lng} onChange={(e) => setLng(e.target.value)} placeholder="106.9236" />
            </label>
          </div>
        </div>
        <div className="a-map-preview">
          {valid ? (
            <iframe title="Pratinjau peta" src={`https://maps.google.com/maps?q=${Number(lat)},${Number(lng)}&z=15&output=embed`} loading="lazy" />
          ) : (
            <div className="a-map-empty"><Icon name="map" /> Isi koordinat untuk pratinjau peta</div>
          )}
        </div>
      </div>
    </div>
  );
}

export function IconSelect({ name, label, value, choices }) {
  const [v, setV] = useState(value || choices[0]);
  return (
    <div className="a-field">
      <span className="a-label">{label}</span>
      <div className="a-icons" role="radiogroup" aria-label={label}>
        {choices.map((c) => (
          <label key={c} className={`a-icon-opt${v === c ? ' on' : ''}`} title={c}>
            <input type="radio" name={name} value={c} checked={v === c} onChange={() => setV(c)} />
            <Icon name={c} />
          </label>
        ))}
      </div>
    </div>
  );
}
