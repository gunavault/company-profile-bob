'use client';

import { useActionState } from 'react';
import Icon from '@/components/Icon';
import { sendMessage } from './actions';

export default function ContactForm({ successText }) {
  const [state, action, pending] = useActionState(sendMessage, null);
  if (state?.ok) {
    return (
      <div className="form-success" role="status">
        <Icon name="badge-check" />
        <p>{successText}</p>
      </div>
    );
  }
  const v = state?.values || {};
  return (
    <form action={action} className="form">
      {state?.error ? <p className="form-error" role="alert">{state.error}</p> : null}
      <div className="form-row">
        <label>
          <span>Nama Lengkap *</span>
          <input name="name" required defaultValue={v.name} autoComplete="name" />
        </label>
        <label>
          <span>No. Telepon / WhatsApp</span>
          <input name="phone" type="tel" defaultValue={v.phone} autoComplete="tel" />
        </label>
      </div>
      <div className="form-row">
        <label>
          <span>Email</span>
          <input name="email" type="email" defaultValue={v.email} autoComplete="email" />
        </label>
        <label>
          <span>Kebutuhan</span>
          <input name="subject" defaultValue={v.subject} placeholder="Contoh: Lisplang GRC rumah 2 lantai" />
        </label>
      </div>
      <label>
        <span>Pesan *</span>
        <textarea name="message" rows={5} required defaultValue={v.message} />
      </label>
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hp" aria-hidden="true" />
      <button type="submit" className="btn btn-dark" disabled={pending}>
        <span>{pending ? 'Mengirim…' : 'Kirim Pesan'}</span>
        <span className="btn-ic"><Icon name="send" /></span>
      </button>
    </form>
  );
}
