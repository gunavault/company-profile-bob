# GRC Cetak – Company Profile + CMS

Website company profile **GRC Cetak Gunung Putri** (grccetak.id) beserta CMS untuk mengelola konten.

- **Framework:** Next.js 15 (App Router), siap deploy ke **Vercel**
- **Database:** [Turso](https://turso.tech) (libSQL/SQLite). Lokal otomatis memakai file `data/local.db`
- **Upload gambar:** Vercel Blob (lokal: `public/uploads/`)
- **Desain:** hitam + hijau (#4A7F0E / lime #7CC21E), font Tanker + Poppins, ikon Lucide (SVG, tanpa emoji)

## Halaman Website

| URL | Isi |
| --- | --- |
| `/` | Beranda: hero, keunggulan, layanan, portofolio, FAQ, testimoni, artikel, CTA |
| `/tentang-kami` | Profil, visi & misi |
| `/layanan`, `/layanan/[slug]` | Daftar & detail layanan |
| `/portofolio`, `/portofolio/[slug]` | Proyek + galeri foto (lightbox) + **Google Maps lokasi proyek** |
| `/artikel`, `/artikel/[slug]` | Blog/artikel |
| `/kontak` | Info kontak, formulir pesan, peta workshop |
| `/sitemap` | Sitemap HTML (+ kredit foto) |
| `/sitemap.xml`, `/robots.txt` | Untuk mesin pencari (otomatis) |

Tombol **WhatsApp melayang** tampil di semua halaman (nomor bisa diubah di CMS → Pengaturan).

## CMS (`/admin`)

Login awal: **username `admin` / password `admin`**. Segera ganti di menu **Akun Admin** setelah deploy.

Yang bisa dikelola:
- **Layanan, Portofolio, Artikel**: tambah/edit/hapus, editor teks, upload gambar
- **Portofolio**: galeri multi-foto + lokasi Google Maps (tempel link Google Maps → koordinat terbaca otomatis, ada pratinjau peta)
- **FAQ & Testimoni**
- **Halaman Beranda, Tentang, Kontak**: semua teks & gambar
- **Pengaturan**: nama, logo, nomor WhatsApp, telepon, email, alamat, koordinat workshop, jam operasional, media sosial
- **Sitemap & SEO**: meta title/description, OG image, daftar URL sitemap.xml
- **Pesan Masuk**: pesan dari formulir kontak

## Menjalankan Lokal

```bash
npm install
npm run dev
# buka http://localhost:3000 dan http://localhost:3000/admin
```

Database lokal dibuat otomatis di `data/local.db` beserta konten contoh.

## Deploy ke Vercel

1. **Buat database Turso**
   ```bash
   turso db create grccetak
   turso db show grccetak --url        # -> TURSO_DATABASE_URL
   turso db tokens create grccetak     # -> TURSO_AUTH_TOKEN
   ```
   (atau lewat dashboard turso.tech / integrasi Turso di Vercel Marketplace)
2. **Import repo** ini di Vercel (framework: Next.js, tanpa pengaturan build khusus).
3. **Storage → Create → Blob**, hubungkan ke project (otomatis mengisi `BLOB_READ_WRITE_TOKEN`).
4. **Settings → Environment Variables** (lihat `.env.example`):
   - `TURSO_DATABASE_URL`, `TURSO_AUTH_TOKEN`
   - `AUTH_SECRET` – string acak panjang (`openssl rand -base64 32`)
   - `SITE_URL` – `https://grccetak.id`
5. Deploy, lalu **Settings → Domains** tambahkan `grccetak.id` dan arahkan DNS sesuai instruksi Vercel.

Tabel & konten contoh dibuat otomatis saat website pertama kali diakses.

## Foto

Foto contoh berasal dari Flickr/Wikimedia berlisensi Creative Commons (diambil via Openverse).
Daftar kredit ada di `lib/photo-credits.json` dan ditampilkan di halaman `/sitemap`.
Ganti dengan foto proyek asli lewat CMS sebelum website diluncurkan.
