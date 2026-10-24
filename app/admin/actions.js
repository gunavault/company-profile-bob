'use server';

import bcrypt from 'bcryptjs';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { all, one, run, batch } from '@/lib/db';
import { createSession, destroySession, requireAdmin } from '@/lib/auth';
import { cleanHtml } from '@/lib/sanitize';
import { saveImage } from '@/lib/upload';
import { slugify } from '@/lib/utils';
import { SETTING_GROUPS } from '@/lib/settings-schema';

/* ---------- helpers ---------- */
const str = (fd, k, max = 500) => String(fd.get(k) ?? '').trim().slice(0, max);
const bool = (fd, k) => (fd.get(k) ? 1 : 0);
const int = (fd, k) => parseInt(fd.get(k), 10) || 0;
const num = (fd, k) => {
  const v = String(fd.get(k) ?? '').trim().replace(',', '.');
  if (v === '') return null;
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
};

async function imageField(fd, key, folder) {
  const uploaded = await saveImage(fd.get(`${key}_file`), folder);
  if (uploaded) return uploaded;
  return str(fd, key, 1000) || null;
}

async function uniqueSlug(table, wanted, id) {
  const base = slugify(wanted);
  let slug = base;
  for (let i = 2; ; i++) {
    const hit = await one(`SELECT id FROM ${table} WHERE slug = ? AND id != ?`, [slug, id || 0]);
    if (!hit) return slug;
    slug = `${base}-${i}`;
  }
}

function done(path, msg = 'Perubahan tersimpan') {
  revalidatePath('/', 'layout');
  redirect(`${path}${path.includes('?') ? '&' : '?'}ok=${encodeURIComponent(msg)}`);
}

function fail(path, err) {
  redirect(`${path}${path.includes('?') ? '&' : '?'}err=${encodeURIComponent(err?.message || String(err))}`);
}

/* ---------- auth ---------- */
export async function login(prev, fd) {
  const username = str(fd, 'username', 100);
  const password = String(fd.get('password') || '');
  const user = await one('SELECT * FROM users WHERE username = ?', [username]);
  if (!user || !bcrypt.compareSync(password, user.password_hash)) {
    await new Promise((r) => setTimeout(r, 600));
    return { error: 'Username atau password salah.', username };
  }
  await createSession(user);
  redirect('/admin');
}

export async function logout() {
  await destroySession();
  redirect('/admin/login');
}

export async function updateAccount(fd) {
  const me = await requireAdmin();
  const back = '/admin/akun';
  const user = await one('SELECT * FROM users WHERE id = ?', [me.id]);
  const current = String(fd.get('current') || '');
  const username = str(fd, 'username', 100) || user.username;
  const next = String(fd.get('password') || '');
  const confirm = String(fd.get('confirm') || '');
  if (!bcrypt.compareSync(current, user.password_hash)) fail(back, 'Password saat ini salah.');
  if (next && next.length < 6) fail(back, 'Password baru minimal 6 karakter.');
  if (next !== confirm) fail(back, 'Konfirmasi password tidak sama.');
  const hash = next ? bcrypt.hashSync(next, 10) : user.password_hash;
  await run('UPDATE users SET username = ?, password_hash = ? WHERE id = ?', [username, hash, me.id]);
  done(back, 'Akun diperbarui');
}

/* ---------- settings / halaman statis ---------- */
export async function saveSettings(fd) {
  await requireAdmin();
  const group = SETTING_GROUPS.find((g) => g.id === fd.get('_group'));
  if (!group) fail('/admin', 'Grup tidak dikenal');
  const back = `/admin/halaman/${group.id}`;
  const stmts = [];
  try {
    for (const f of group.fields) {
      let value;
      if (f.type === 'image') value = (await imageField(fd, f.key, 'settings')) || '';
      else if (f.type === 'richtext') value = cleanHtml(fd.get(f.key));
      else value = str(fd, f.key, 5000);
      stmts.push({ sql: 'INSERT INTO settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value', args: [f.key, value] });
    }
    await batch(stmts);
  } catch (e) {
    fail(back, e);
  }
  done(back);
}

/* ---------- layanan ---------- */
export async function saveService(fd) {
  await requireAdmin();
  const id = int(fd, 'id');
  const back = id ? `/admin/layanan/${id}` : '/admin/layanan/baru';
  let newId = id;
  try {
    const title = str(fd, 'title', 200);
    if (!title) throw new Error('Judul wajib diisi.');
    const slug = await uniqueSlug('services', str(fd, 'slug', 120) || title, id);
    const image = await imageField(fd, 'image', 'layanan');
    const args = [title, slug, str(fd, 'icon', 60), str(fd, 'excerpt', 600), cleanHtml(fd.get('content')), image, int(fd, 'sort_order'), bool(fd, 'is_published')];
    if (id) {
      await run(`UPDATE services SET title=?, slug=?, icon=?, excerpt=?, content=?, image=?, sort_order=?, is_published=?, updated_at=datetime('now') WHERE id=?`, [...args, id]);
    } else {
      newId = (await run('INSERT INTO services (title, slug, icon, excerpt, content, image, sort_order, is_published) VALUES (?,?,?,?,?,?,?,?)', args)).lastId;
    }
  } catch (e) {
    fail(back, e);
  }
  done(`/admin/layanan/${newId}`);
}

export async function deleteService(fd) {
  await requireAdmin();
  await run('DELETE FROM services WHERE id = ?', [int(fd, 'id')]);
  done('/admin/layanan', 'Layanan dihapus');
}

/* ---------- portofolio ---------- */
export async function savePortfolio(fd) {
  await requireAdmin();
  const id = int(fd, 'id');
  const back = id ? `/admin/portofolio/${id}` : '/admin/portofolio/baru';
  let newId = id;
  try {
    const title = str(fd, 'title', 200);
    if (!title) throw new Error('Judul wajib diisi.');
    const lat = num(fd, 'lat');
    const lng = num(fd, 'lng');
    if ((lat !== null && Math.abs(lat) > 90) || (lng !== null && Math.abs(lng) > 180)) throw new Error('Koordinat peta tidak valid.');
    const slug = await uniqueSlug('portfolios', str(fd, 'slug', 120) || title, id);
    const cover = await imageField(fd, 'cover', 'portofolio');
    const args = [
      title, slug, str(fd, 'category', 80), str(fd, 'client', 160), str(fd, 'location', 200), lat, lng, str(fd, 'year', 10),
      str(fd, 'excerpt', 600), cleanHtml(fd.get('content')), cover, bool(fd, 'is_featured'), bool(fd, 'is_published'), int(fd, 'sort_order'),
    ];
    if (id) {
      await run(
        `UPDATE portfolios SET title=?, slug=?, category=?, client=?, location=?, lat=?, lng=?, year=?, excerpt=?, content=?, cover=?,
         is_featured=?, is_published=?, sort_order=?, updated_at=datetime('now') WHERE id=?`,
        [...args, id]
      );
    } else {
      newId = (await run(
        `INSERT INTO portfolios (title, slug, category, client, location, lat, lng, year, excerpt, content, cover, is_featured, is_published, sort_order)
         VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
        args
      )).lastId;
    }

    // Galeri: update caption/urutan foto lama, hapus yang dicentang, tambah foto baru
    const existing = await all('SELECT id FROM portfolio_images WHERE portfolio_id = ?', [newId]);
    for (const im of existing) {
      if (fd.get(`img_del_${im.id}`)) {
        await run('DELETE FROM portfolio_images WHERE id = ?', [im.id]);
      } else if (fd.has(`img_cap_${im.id}`)) {
        await run('UPDATE portfolio_images SET caption = ?, sort_order = ? WHERE id = ?', [str(fd, `img_cap_${im.id}`, 200), int(fd, `img_ord_${im.id}`), im.id]);
      }
    }
    const files = fd.getAll('gallery_files').filter((f) => f && typeof f !== 'string' && f.size);
    let order = existing.length;
    for (const file of files) {
      const url = await saveImage(file, 'portofolio');
      if (url) await run('INSERT INTO portfolio_images (portfolio_id, path, caption, sort_order) VALUES (?,?,?,?)', [newId, url, '', ++order]);
    }
  } catch (e) {
    fail(newId ? `/admin/portofolio/${newId}` : back, e);
  }
  done(`/admin/portofolio/${newId}`);
}

export async function deletePortfolio(fd) {
  await requireAdmin();
  const id = int(fd, 'id');
  await batch([
    { sql: 'DELETE FROM portfolio_images WHERE portfolio_id = ?', args: [id] },
    { sql: 'DELETE FROM portfolios WHERE id = ?', args: [id] },
  ]);
  done('/admin/portofolio', 'Portofolio dihapus');
}

/* ---------- artikel ---------- */
export async function saveArticle(fd) {
  await requireAdmin();
  const id = int(fd, 'id');
  const back = id ? `/admin/artikel/${id}` : '/admin/artikel/baru';
  let newId = id;
  try {
    const title = str(fd, 'title', 200);
    if (!title) throw new Error('Judul wajib diisi.');
    const slug = await uniqueSlug('articles', str(fd, 'slug', 120) || title, id);
    const cover = await imageField(fd, 'cover', 'artikel');
    const date = str(fd, 'published_at', 20);
    const published = /^\d{4}-\d{2}-\d{2}/.test(date) ? `${date.slice(0, 10)} ${date.slice(11, 16) || '09:00'}:00` : null;
    const args = [title, slug, str(fd, 'category', 80), str(fd, 'excerpt', 600), cleanHtml(fd.get('content')), cover, bool(fd, 'is_published')];
    if (id) {
      await run(
        `UPDATE articles SET title=?, slug=?, category=?, excerpt=?, content=?, cover=?, is_published=?,
         published_at=COALESCE(?, published_at), updated_at=datetime('now') WHERE id=?`,
        [...args, published, id]
      );
    } else {
      newId = (await run(
        `INSERT INTO articles (title, slug, category, excerpt, content, cover, is_published, published_at)
         VALUES (?,?,?,?,?,?,?,COALESCE(?, datetime('now')))`,
        [...args, published]
      )).lastId;
    }
  } catch (e) {
    fail(back, e);
  }
  done(`/admin/artikel/${newId}`);
}

export async function deleteArticle(fd) {
  await requireAdmin();
  await run('DELETE FROM articles WHERE id = ?', [int(fd, 'id')]);
  done('/admin/artikel', 'Artikel dihapus');
}

/* ---------- FAQ & testimoni ---------- */
export async function saveFaq(fd) {
  await requireAdmin();
  const id = int(fd, 'id');
  const q = str(fd, 'question', 300);
  const a = str(fd, 'answer', 2000);
  if (!q || !a) fail('/admin/faq', 'Pertanyaan dan jawaban wajib diisi.');
  if (id) await run('UPDATE faqs SET question=?, answer=?, sort_order=? WHERE id=?', [q, a, int(fd, 'sort_order'), id]);
  else await run('INSERT INTO faqs (question, answer, sort_order) VALUES (?,?,?)', [q, a, int(fd, 'sort_order')]);
  done('/admin/faq');
}

export async function deleteFaq(fd) {
  await requireAdmin();
  await run('DELETE FROM faqs WHERE id = ?', [int(fd, 'id')]);
  done('/admin/faq', 'FAQ dihapus');
}

export async function saveTestimonial(fd) {
  await requireAdmin();
  const id = int(fd, 'id');
  const name = str(fd, 'name', 120);
  const content = str(fd, 'content', 1500);
  if (!name || !content) fail('/admin/testimoni', 'Nama dan isi testimoni wajib diisi.');
  const rating = Math.min(5, Math.max(1, int(fd, 'rating') || 5));
  const args = [name, str(fd, 'role', 160), content, rating, int(fd, 'sort_order')];
  if (id) await run('UPDATE testimonials SET name=?, role=?, content=?, rating=?, sort_order=? WHERE id=?', [...args, id]);
  else await run('INSERT INTO testimonials (name, role, content, rating, sort_order) VALUES (?,?,?,?,?)', args);
  done('/admin/testimoni');
}

export async function deleteTestimonial(fd) {
  await requireAdmin();
  await run('DELETE FROM testimonials WHERE id = ?', [int(fd, 'id')]);
  done('/admin/testimoni', 'Testimoni dihapus');
}

/* ---------- pesan masuk ---------- */
export async function toggleMessage(fd) {
  await requireAdmin();
  await run('UPDATE messages SET is_read = 1 - is_read WHERE id = ?', [int(fd, 'id')]);
  done('/admin/pesan', 'Status pesan diperbarui');
}

export async function deleteMessage(fd) {
  await requireAdmin();
  await run('DELETE FROM messages WHERE id = ?', [int(fd, 'id')]);
  done('/admin/pesan', 'Pesan dihapus');
}
