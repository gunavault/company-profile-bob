import path from 'node:path';
import { readFile } from 'node:fs/promises';

// Hanya untuk mode lokal: file yang di-upload setelah build tidak ikut disajikan `next start`.
// Di Vercel, gambar disimpan di Vercel Blob sehingga route ini tidak dipakai.
const TYPES = { '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png', '.webp': 'image/webp', '.gif': 'image/gif' };

export async function GET(_req, { params }) {
  const { path: parts } = await params;
  const root = path.join(process.cwd(), 'public', 'uploads');
  const file = path.resolve(root, ...parts);
  const type = TYPES[path.extname(file).toLowerCase()];
  if (!file.startsWith(root + path.sep) || !type) return new Response('Not found', { status: 404 });
  try {
    return new Response(await readFile(file), { headers: { 'Content-Type': type, 'Cache-Control': 'public, max-age=31536000, immutable' } });
  } catch {
    return new Response('Not found', { status: 404 });
  }
}
