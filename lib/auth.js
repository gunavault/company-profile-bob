import 'server-only';
import crypto from 'node:crypto';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { one } from './db';

const COOKIE = 'grc_admin';
const MAX_AGE = 60 * 60 * 12; // 12 jam

function secret() {
  const s = process.env.AUTH_SECRET;
  if (s) return s;
  if (process.env.VERCEL) throw new Error('AUTH_SECRET belum diset di Environment Variables Vercel.');
  return 'dev-secret-ganti-di-production';
}

function sign(payload) {
  const body = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const mac = crypto.createHmac('sha256', secret()).update(body).digest('base64url');
  return `${body}.${mac}`;
}

function verify(token) {
  if (!token || !token.includes('.')) return null;
  const [body, mac] = token.split('.');
  const expected = crypto.createHmac('sha256', secret()).update(body).digest('base64url');
  const a = Buffer.from(mac);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;
  try {
    const data = JSON.parse(Buffer.from(body, 'base64url').toString());
    if (!data.exp || data.exp < Date.now() / 1000) return null;
    return data;
  } catch {
    return null;
  }
}

export async function createSession(user) {
  const store = await cookies();
  store.set(COOKIE, sign({ uid: user.id, u: user.username, exp: Math.floor(Date.now() / 1000) + MAX_AGE }), {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: MAX_AGE,
  });
}

export async function destroySession() {
  const store = await cookies();
  store.delete(COOKIE);
}

export async function currentUser() {
  const store = await cookies();
  const data = verify(store.get(COOKIE)?.value);
  if (!data) return null;
  return one('SELECT id, username FROM users WHERE id = ?', [data.uid]);
}

export async function requireAdmin() {
  const user = await currentUser();
  if (!user) redirect('/admin/login');
  return user;
}
