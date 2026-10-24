// Definisi semua pengaturan & konten halaman statis yang bisa diedit dari CMS.
// Nilai default dipakai selama belum diubah di admin.
const img = (n) => `/images/stock/${n}.jpg`;

export const ICON_CHOICES = [
  'shield-check', 'award', 'users', 'hard-hat', 'factory', 'truck', 'badge-check', 'handshake', 'clock',
  'ruler', 'grid-3x3', 'landmark', 'columns-3', 'panels-top-left', 'paintbrush', 'hammer', 'wrench',
  'layers', 'building-2', 'house', 'sparkles', 'crown', 'frame', 'fence', 'church', 'box', 'star',
];

export const SETTING_GROUPS = [
  {
    id: 'umum',
    title: 'Pengaturan Umum',
    icon: 'settings',
    description: 'Identitas perusahaan, kontak, WhatsApp, dan media sosial.',
    fields: [
      { key: 'company_name', label: 'Nama Perusahaan', default: 'GRC Cetak' },
      { key: 'tagline', label: 'Tagline', default: 'Spesialis GRC Cetak Gunung Putri' },
      { key: 'logo', label: 'Logo', type: 'image', default: '/images/logo.svg' },
      { key: 'whatsapp', label: 'Nomor WhatsApp', default: '0998218637989', help: 'Format 08xx atau 62xx. Dipakai untuk tombol WhatsApp melayang.' },
      { key: 'wa_message', label: 'Pesan Awal WhatsApp', default: 'Halo GRC Cetak, saya ingin konsultasi mengenai produk GRC.' },
      { key: 'phone', label: 'Telepon', default: '0998218637989' },
      { key: 'email', label: 'Email', default: 'info@grccetak.id' },
      { key: 'address', label: 'Alamat', type: 'textarea', default: 'Jl. Raya Gunung Putri, Kec. Gunung Putri, Kabupaten Bogor, Jawa Barat 16961' },
      { key: 'office_lat', label: 'Latitude Workshop', default: '-6.4286', help: 'Untuk peta Google Maps di halaman kontak.' },
      { key: 'office_lng', label: 'Longitude Workshop', default: '106.9236' },
      { key: 'hours', label: 'Jam Operasional', type: 'textarea', default: 'Senin – Jumat: 08.00 – 17.00\nSabtu: 08.00 – 15.00\nMinggu: Tutup', help: 'Satu baris per hari.' },
      { key: 'instagram', label: 'URL Instagram', default: 'https://instagram.com/grccetak' },
      { key: 'facebook', label: 'URL Facebook', default: 'https://facebook.com/grccetak' },
      { key: 'youtube', label: 'URL YouTube', default: '' },
      { key: 'footer_text', label: 'Deskripsi Footer', type: 'textarea', default: 'Produsen dan kontraktor GRC cetak di Gunung Putri, Bogor. Melayani lisplang, krawangan, ornamen masjid, pilar, dan panel fasad.' },
    ],
  },
  {
    id: 'beranda',
    title: 'Halaman Beranda',
    icon: 'house',
    description: 'Hero, keunggulan, statistik, dan ajakan (CTA) di beranda.',
    fields: [
      { key: 'hero_badge', label: 'Badge Hero', default: '15+ Tahun Pengalaman' },
      { key: 'hero_title', label: 'Judul Hero', default: 'GRC Cetak Gunung Putri' },
      { key: 'hero_subtitle', label: 'Subjudul Hero', type: 'textarea', default: 'Produsen & kontraktor GRC terpercaya di Gunung Putri, Bogor. Spesialis lisplang, krawangan, ornamen masjid, pilar, dan panel fasad custom.' },
      { key: 'hero_image', label: 'Gambar Hero', type: 'image', default: img('fasad-lengkung') },
      { key: 'feature1_icon', label: 'Keunggulan 1 – Ikon', type: 'icon', default: 'factory' },
      { key: 'feature1_text', label: 'Keunggulan 1 – Teks', default: 'Workshop Sendiri' },
      { key: 'feature2_icon', label: 'Keunggulan 2 – Ikon', type: 'icon', default: 'award' },
      { key: 'feature2_text', label: 'Keunggulan 2 – Teks', default: '15 Tahun Berpengalaman' },
      { key: 'feature3_icon', label: 'Keunggulan 3 – Ikon', type: 'icon', default: 'shield-check' },
      { key: 'feature3_text', label: 'Keunggulan 3 – Teks', default: 'Bergaransi' },
      { key: 'feature4_icon', label: 'Keunggulan 4 – Ikon', type: 'icon', default: 'hard-hat' },
      { key: 'feature4_text', label: 'Keunggulan 4 – Teks', default: 'Tim Profesional' },
      { key: 'intro_badge', label: 'Intro – Badge', default: 'Tentang GRC Cetak' },
      { key: 'intro_title', label: 'Intro – Judul', default: 'GRC Berkualitas dari Workshop Sendiri' },
      { key: 'intro_text', label: 'Intro – Teks', type: 'textarea', default: 'GRC Cetak memproduksi dan memasang produk GRC untuk hunian, rumah ibadah, dan gedung komersial. Seluruh produk dicetak di workshop kami sendiri di Gunung Putri sehingga kualitas, harga, dan jadwal pengerjaan selalu terkontrol.' },
      { key: 'intro_image1', label: 'Intro – Gambar 1', type: 'image', default: img('cetakan-beton') },
      { key: 'intro_image2', label: 'Intro – Gambar 2', type: 'image', default: img('roster-krawangan') },
      { key: 'intro_image3', label: 'Intro – Gambar 3', type: 'image', default: img('produksi-panel') },
      { key: 'stat1_value', label: 'Statistik 1 – Angka', default: '15+' },
      { key: 'stat1_label', label: 'Statistik 1 – Label', default: 'Tahun Pengalaman' },
      { key: 'stat2_value', label: 'Statistik 2 – Angka', default: '850+' },
      { key: 'stat2_label', label: 'Statistik 2 – Label', default: 'Proyek Selesai' },
      { key: 'stat3_value', label: 'Statistik 3 – Angka', default: '300+' },
      { key: 'stat3_label', label: 'Statistik 3 – Label', default: 'Motif Cetakan' },
      { key: 'stat4_value', label: 'Statistik 4 – Angka', default: '40+' },
      { key: 'stat4_label', label: 'Statistik 4 – Label', default: 'Tenaga Ahli' },
      { key: 'faq_image', label: 'Gambar Bagian FAQ', type: 'image', default: img('produksi-panel') },
      { key: 'cta_title', label: 'CTA – Judul', default: 'Siap Memulai Proyek GRC Anda?' },
      { key: 'cta_text', label: 'CTA – Teks', type: 'textarea', default: 'Konsultasi dan survei lokasi gratis untuk area Bogor, Bekasi, Depok, dan Jakarta.' },
      { key: 'cta_image', label: 'CTA – Gambar', type: 'image', default: img('fasad-roster') },
    ],
  },
  {
    id: 'tentang',
    title: 'Halaman Tentang',
    icon: 'building-2',
    description: 'Isi halaman Tentang Kami: profil, visi, misi.',
    fields: [
      { key: 'about_title', label: 'Judul Halaman', default: 'Tentang Kami' },
      { key: 'about_subtitle', label: 'Subjudul', type: 'textarea', default: 'Mengenal lebih dekat GRC Cetak, produsen GRC dari Gunung Putri, Bogor.' },
      { key: 'about_image', label: 'Gambar Utama', type: 'image', default: img('produksi-panel') },
      { key: 'about_heading', label: 'Judul Profil', default: 'Membangun Detail yang Bertahan Puluhan Tahun' },
      {
        key: 'about_content',
        label: 'Profil Perusahaan',
        type: 'richtext',
        default:
          '<p>GRC Cetak berawal dari sebuah workshop kecil di Gunung Putri, Kabupaten Bogor. Berbekal keahlian mencetak ornamen beton, kami terus berkembang menjadi produsen sekaligus kontraktor GRC yang dipercaya ratusan klien di Jabodetabek.</p><p>Kami mengerjakan proyek hunian, rumah ibadah, hingga gedung komersial. Dengan workshop produksi sendiri, tim drafter, dan tim pemasangan berpengalaman, kami memastikan setiap detail dikerjakan sesuai gambar dan jadwal.</p>',
      },
      { key: 'about_vision', label: 'Visi', type: 'textarea', default: 'Menjadi produsen GRC pilihan utama di Indonesia yang dikenal karena kualitas, ketepatan waktu, dan inovasi desain.' },
      { key: 'about_mission', label: 'Misi', type: 'textarea', default: 'Menghasilkan produk GRC berkualitas dengan material terbaik\nMemberikan pelayanan yang jujur dan transparan\nMenyelesaikan setiap proyek tepat waktu\nTerus berinovasi dalam desain dan teknologi produksi', help: 'Satu misi per baris.' },
      { key: 'about_image2', label: 'Gambar Pendukung', type: 'image', default: img('cetakan-beton') },
    ],
  },
  {
    id: 'kontak',
    title: 'Halaman Kontak',
    icon: 'phone',
    description: 'Teks halaman kontak. Alamat, telepon, dan peta diambil dari Pengaturan Umum.',
    fields: [
      { key: 'contact_title', label: 'Judul Halaman', default: 'Hubungi Kami' },
      { key: 'contact_subtitle', label: 'Subjudul', type: 'textarea', default: 'Konsultasikan kebutuhan GRC Anda. Kami siap membantu dari desain hingga pemasangan.' },
      { key: 'contact_form_title', label: 'Judul Formulir', default: 'Kirim Pesan' },
      { key: 'contact_success', label: 'Pesan Sukses Formulir', default: 'Terima kasih! Pesan Anda sudah kami terima. Tim kami akan segera menghubungi Anda.' },
    ],
  },
  {
    id: 'seo',
    title: 'SEO & Sitemap',
    icon: 'network',
    description: 'Meta tag pencarian dan pengaturan sitemap.xml.',
    fields: [
      { key: 'seo_title', label: 'Judul SEO Beranda', default: 'GRC Cetak Gunung Putri – Lisplang, Krawangan, Ornamen Masjid & Fasad GRC' },
      { key: 'seo_description', label: 'Deskripsi SEO', type: 'textarea', default: 'GRC Cetak adalah produsen & kontraktor GRC di Gunung Putri, Bogor. Melayani lisplang GRC, krawangan, ornamen kubah masjid, pilar, dan panel fasad custom se-Jabodetabek.' },
      { key: 'seo_keywords', label: 'Kata Kunci', default: 'grc gunung putri, grc cetak, lisplang grc, krawangan grc, ornamen masjid grc, grc bogor' },
      { key: 'og_image', label: 'Gambar Share (OG Image)', type: 'image', default: img('fasad-lengkung') },
      { key: 'sitemap_changefreq', label: 'Frekuensi Update Sitemap', type: 'select', options: ['daily', 'weekly', 'monthly', 'yearly'], default: 'weekly' },
      { key: 'sitemap_static', label: 'Halaman Statis di Sitemap', type: 'textarea', default: '/\n/tentang-kami\n/layanan\n/portofolio\n/artikel\n/kontak\n/sitemap', help: 'Satu path per baris. Layanan, portofolio, dan artikel yang dipublikasikan otomatis masuk sitemap.' },
    ],
  },
];

export const SETTING_DEFAULTS = Object.fromEntries(
  SETTING_GROUPS.flatMap((g) => g.fields.map((f) => [f.key, f.default ?? '']))
);
