import 'server-only';
import crypto from 'node:crypto';
import path from 'node:path';
import { mkdir, writeFile } from 'node:fs/promises';
import { put } from '@vercel/blob';

const TYPES = { 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp', 'image/gif': 'gif'};
const MAX_BYTES = 4 * 1024 * 1024; // batas body Vercel ~4.5MB

function sniff(buf) {
  if (buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) return 'image/jpeg';
  if (buf.slice(0, 8).toString('hex') === '89504e470d0a1a0a') return 'image/png';
  if (buf.slice(0, 4).toString() === 'RIFF' && buf.slice(8, 12).toString() === 'WEBP') return 'image/webp';
  if (buf.slice(0, 3).toString() === 'GIF') return 'image/gif';
  return null;
}

/** Simpan file gambar dari form. Mengembalikan URL publik, atau null bila tidak ada file. */
export async function saveImage(file, folder = 'umum') {
  if (!file || typeof file === 'string' || !file.size) return null;
  if (file.size > MAX_BYTES) throw new Error('Ukuran gambar maksimal 4 MB.');
  const buf = Buffer.from(await file.arrayBuffer());
  const type = sniff(buf);
  if (!type) throw new Error('Format gambar harus JPG, PNG, WEBP, atau GIF.');
  const name = `${folder}/${Date.now()}-${crypto.randomBytes(6).toString('hex')}.${TYPES[type]}`;

  if (process.env.BLOB_READ_WRITE_TOKEN) {
    const blob = await put(name, buf, { access: 'public', contentType: type });
    return blob.url;
  }
  if (process.env.VERCEL) throw new Error('Vercel Blob belum terhubung (BLOB_READ_WRITE_TOKEN kosong).');
  // Lokal: simpan ke public/uploads
  const dest = path.join(process.cwd(), 'public', 'uploads', name);
  await mkdir(path.dirname(dest), { recursive: true });
  await writeFile(dest, buf);
  return `/uploads/${name}`;
}
