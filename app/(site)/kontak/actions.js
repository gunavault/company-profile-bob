'use server';

import { run, one } from '@/lib/db';

export async function sendMessage(prev, formData) {
  // Honeypot anti-spam
  if (formData.get('website')) return { ok: true };
  const f = (k, max) => String(formData.get(k) || '').trim().slice(0, max);
  const data = { name: f('name', 120), phone: f('phone', 40), email: f('email', 160), subject: f('subject', 160), message: f('message', 4000) };
  if (!data.name || !data.message || (!data.phone && !data.email)) {
    return { ok: false, error: 'Mohon isi nama, pesan, dan minimal nomor telepon atau email.', values: data };
  }
  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    return { ok: false, error: 'Format email tidak valid.', values: data };
  }
  // Batasi pengiriman beruntun: maks 5 pesan / 10 menit dengan nama+kontak yang sama
  const recent = await one(
    "SELECT COUNT(*) AS n FROM messages WHERE created_at > datetime('now', '-10 minutes') AND (phone = ? OR email = ?)",
    [data.phone || '-', data.email || '-']
  );
  if (Number(recent?.n) >= 5) return { ok: false, error: 'Terlalu banyak pesan. Silakan coba lagi nanti.', values: data };
  await run('INSERT INTO messages (name, phone, email, subject, message) VALUES (?,?,?,?,?)', [
    data.name, data.phone, data.email, data.subject, data.message,
  ]);
  return { ok: true };
}
