// Konten contoh untuk database baru. Semua bisa diubah lewat CMS (/admin).
const img = (n) => `/images/stock/${n}.jpg`;

export const seedData = {
  services: [
    {
      title: 'Lisplang & List Profil GRC',
      slug: 'lisplang-list-profil-grc',
      icon: 'ruler',
      image: img('lisplang-gedung'),
      excerpt: 'Lisplang dan list profil GRC cetak yang tahan cuaca, tidak lapuk, dan bebas rayap untuk tampilan atap yang rapi dan elegan.',
      content:
        '<p>Lisplang GRC adalah solusi modern pengganti lisplang kayu. Dicetak dari campuran semen, pasir silika, dan serat kaca (glassfibre) sehingga kuat, ringan, dan tahan terhadap panas maupun hujan.</p><h2>Keunggulan</h2><ul><li>Tidak lapuk, tidak dimakan rayap</li><li>Motif profil bisa disesuaikan dengan desain bangunan</li><li>Mudah dicat ulang dengan cat tembok biasa</li><li>Pemasangan cepat dengan rangka hollow</li></ul><p>Kami menyediakan berbagai motif standar dan juga bisa membuat cetakan khusus sesuai gambar kerja Anda.</p>',
    },
    {
      title: 'Roster & Krawangan GRC',
      slug: 'roster-krawangan-grc',
      icon: 'grid-3x3',
      image: img('roster-krawangan'),
      excerpt: 'Krawangan GRC motif geometris dan islami untuk fasad, pagar, dan partisi, menghadirkan sirkulasi udara dan permainan cahaya.',
      content:
        '<p>Krawangan (roster) GRC menjadi elemen fasad yang populer untuk rumah, masjid, dan gedung. Selain mempercantik tampilan, krawangan membantu sirkulasi udara dan mengurangi panas matahari langsung.</p><h2>Pilihan Motif</h2><ul><li>Motif geometris modern</li><li>Motif islami dan kaligrafi</li><li>Motif daun dan bunga</li><li>Desain custom sesuai permintaan</li></ul><p>Ukuran panel fleksibel, mulai dari modul kecil hingga panel besar satu bentang.</p>',
    },
    {
      title: 'Ornamen Kubah & Masjid',
      slug: 'ornamen-kubah-masjid',
      icon: 'landmark',
      image: img('kubah-istiqlal'),
      excerpt: 'Kubah, mahkota, kaligrafi, dan ornamen masjid dari GRC yang presisi, ringan, dan tahan lama untuk rumah ibadah Anda.',
      content:
        '<p>Kami berpengalaman mengerjakan ornamen masjid mulai dari kubah, mahkota kubah, kaligrafi, mihrab, hingga krawangan jendela. GRC jauh lebih ringan dibanding beton cor biasa sehingga aman untuk struktur atap.</p><h2>Lingkup Pekerjaan</h2><ul><li>Kubah GRC dan mahkota kubah</li><li>Mihrab dan ornamen interior</li><li>Kaligrafi timbul</li><li>Krawangan jendela dan pagar masjid</li></ul>',
    },
    {
      title: 'Pilar & Kolom GRC',
      slug: 'pilar-kolom-grc',
      icon: 'columns-3',
      image: img('pilar-kolom'),
      excerpt: 'Pilar klasik, kepala kolom, dan pelapis kolom GRC dengan detail ukiran presisi untuk rumah, villa, dan gedung.',
      content:
        '<p>Pilar dan kolom GRC memberikan kesan megah tanpa beban struktur berlebih. Tersedia gaya klasik Romawi (Doric, Ionic, Corinthian) maupun gaya modern minimalis.</p><ul><li>Kepala dan kaki kolom</li><li>Pelapis kolom bulat dan kotak</li><li>Balustrade dan railing</li></ul>',
    },
    {
      title: 'Panel Fasad GRC',
      slug: 'panel-fasad-grc',
      icon: 'panels-top-left',
      image: img('panel-fasad'),
      excerpt: 'Panel fasad GRC untuk gedung, ruko, dan kantor dengan bentuk 3D, lengkung, maupun motif custom.',
      content:
        '<p>Panel fasad GRC memberi kebebasan desain bagi arsitek: bentuk lengkung, tekstur, hingga motif 3D dapat dicetak dengan presisi. Material ringan mempercepat pemasangan dan menghemat biaya struktur.</p><ul><li>Panel 3D dan tekstur</li><li>Secondary skin gedung</li><li>Sun shading dan sirip fasad</li></ul>',
    },
    {
      title: 'Cetak Custom & Pemasangan',
      slug: 'cetak-custom-pemasangan',
      icon: 'hard-hat',
      image: img('produksi-panel'),
      excerpt: 'Punya desain sendiri? Kami buatkan cetakan khusus dan tim kami siap memasang langsung di lokasi proyek.',
      content:
        '<p>Kirimkan gambar atau referensi desain Anda, tim drafter kami akan membuat gambar kerja, cetakan, hingga produksi dan pemasangan di lokasi. Satu pintu, tanpa repot.</p><h2>Alur Kerja</h2><ol><li>Konsultasi dan survei lokasi</li><li>Gambar kerja dan penawaran harga</li><li>Pembuatan cetakan dan produksi di workshop</li><li>Pengiriman dan pemasangan</li></ol>',
    },
  ],

  portfolios: [
    {
      title: 'Ornamen Fasad Masjid Al-Ikhlas',
      slug: 'ornamen-fasad-masjid-al-ikhlas',
      category: 'Masjid',
      client: 'DKM Masjid Al-Ikhlas',
      location: 'Cileungsi, Kabupaten Bogor',
      lat: -6.3963,
      lng: 106.9592,
      year: '2025',
      featured: true,
      cover: img('masjid-ornamen'),
      excerpt: 'Pekerjaan krawangan, list profil, dan ornamen kubah GRC untuk fasad utama masjid.',
      content:
        '<p>Proyek renovasi fasad masjid dengan ornamen GRC custom: krawangan jendela motif islami, list profil lengkung, serta mahkota kubah. Seluruh produk dicetak di workshop kami di Gunung Putri dan dipasang dalam waktu 6 minggu.</p>',
      gallery: [
        [img('interior-masjid'), 'Ornamen interior'],
        [img('kubah-interior'), 'Detail plafon kubah'],
        [img('ornamen-klasik'), 'Detail ornamen fasad'],
      ],
    },
    {
      title: 'Kubah & Ornamen Masjid Raya',
      slug: 'kubah-ornamen-masjid-raya',
      category: 'Masjid',
      client: 'Yayasan Masjid Raya',
      location: 'Cibubur, Jakarta Timur',
      lat: -6.37,
      lng: 106.893,
      year: '2024',
      featured: true,
      cover: img('kubah-istiqlal'),
      excerpt: 'Produksi dan pemasangan kubah GRC beserta ornamen plafon dan lampu gantung.',
      content:
        '<p>Kubah GRC diameter 8 meter dengan rangka baja ringan, dilengkapi ornamen plafon bermotif geometris. Material GRC membuat beban struktur jauh lebih ringan dibanding kubah beton konvensional.</p>',
      gallery: [
        [img('plafon-kubah'), 'Plafon kubah'],
        [img('masjid-kubah-emas'), 'Tampak malam'],
      ],
    },
    {
      title: 'Krawangan Roster Rumah Tinggal',
      slug: 'krawangan-roster-rumah-tinggal',
      category: 'Residensial',
      client: 'Bapak Hendra',
      location: 'Kota Wisata, Gunung Putri',
      lat: -6.3906,
      lng: 106.9389,
      year: '2025',
      featured: true,
      cover: img('roster-krawangan'),
      excerpt: 'Secondary skin krawangan GRC motif geometris untuk fasad rumah dua lantai.',
      content:
        '<p>Fasad rumah tinggal dengan krawangan GRC sebagai secondary skin. Motif geometris dipilih untuk menghadirkan bayangan dinamis di dalam rumah sekaligus menjaga privasi.</p>',
      gallery: [
        [img('fasad-roster'), 'Tampak fasad'],
        [img('panel-3d'), 'Detail panel'],
      ],
    },
    {
      title: 'Panel Fasad Gedung Kantor',
      slug: 'panel-fasad-gedung-kantor',
      category: 'Komersial',
      client: 'PT Mitra Bangun Sejahtera',
      location: 'Bekasi, Jawa Barat',
      lat: -6.2383,
      lng: 106.9756,
      year: '2024',
      featured: true,
      cover: img('panel-fasad'),
      excerpt: 'Panel GRC lengkung untuk fasad dan kanopi gedung kantor empat lantai.',
      content:
        '<p>Pekerjaan panel fasad GRC lengkung dengan finishing cat eksterior. Panel dipasang menggunakan sistem angkur baja galvanis sehingga kokoh dan mudah dirawat.</p>',
      gallery: [
        [img('proyek-fasad-modern'), 'Tampak samping gedung'],
        [img('proyek-gedung'), 'Proses konstruksi'],
      ],
    },
    {
      title: 'Lisplang & List Profil Ruko',
      slug: 'lisplang-list-profil-ruko',
      category: 'Komersial',
      client: 'Ruko Pajajaran',
      location: 'Kota Bogor, Jawa Barat',
      lat: -6.595,
      lng: 106.8166,
      year: '2023',
      featured: false,
      cover: img('lisplang-gedung'),
      excerpt: 'List profil, lisplang, dan ornamen gable GRC untuk deretan ruko bergaya klasik.',
      content:
        '<p>Deretan 12 unit ruko dengan lisplang dan list profil GRC. Ornamen gable dicetak khusus mengikuti gambar arsitek.</p>',
      gallery: [
        [img('ornamen-gable'), 'Ornamen gable'],
        [img('ornamen-fasad'), 'Detail ornamen'],
      ],
    },
    {
      title: 'Pilar Klasik Villa Sentul',
      slug: 'pilar-klasik-villa-sentul',
      category: 'Residensial',
      client: 'Villa Bukit Sentul',
      location: 'Sentul, Kabupaten Bogor',
      lat: -6.5642,
      lng: 106.877,
      year: '2024',
      featured: true,
      cover: img('pilar-kolom'),
      excerpt: 'Pilar gaya Corinthian lengkap dengan kepala kolom dan balustrade GRC.',
      content:
        '<p>Delapan pilar klasik gaya Corinthian setinggi 6 meter untuk teras villa. Kepala kolom dicetak dengan detail daun akantus yang presisi.</p>',
      gallery: [[img('ornamen-klasik'), 'Ornamen pendukung']],
    },
    {
      title: 'Fasad Lengkung Gedung Serbaguna',
      slug: 'fasad-lengkung-gedung-serbaguna',
      category: 'Komersial',
      client: 'Gedung Serbaguna Jatinegara',
      location: 'Jakarta Timur, DKI Jakarta',
      lat: -6.225,
      lng: 106.9004,
      year: '2023',
      featured: false,
      cover: img('fasad-lengkung'),
      excerpt: 'Fasad lengkung bermotif krawangan islami untuk gedung serbaguna.',
      content:
        '<p>Panel lengkung GRC dengan motif krawangan islami pada bagian atas, memberi identitas kuat pada bangunan sekaligus berfungsi sebagai sun shading.</p>',
      gallery: [
        [img('fasad-geometris'), 'Detail geometris'],
        [img('proyek-atrium'), 'Area atrium'],
      ],
    },
    {
      title: 'Panel 3D Lobby Apartemen',
      slug: 'panel-3d-lobby-apartemen',
      category: 'Komersial',
      client: 'Apartemen Margonda',
      location: 'Depok, Jawa Barat',
      lat: -6.4025,
      lng: 106.7942,
      year: '2025',
      featured: false,
      cover: img('panel-3d'),
      excerpt: 'Dinding feature panel 3D GRC untuk area lobby dan drop-off.',
      content:
        '<p>Panel 3D GRC dengan pola gelombang untuk dinding lobby. Finishing cat putih doff menonjolkan permainan bayangan dari pencahayaan.</p>',
      gallery: [[img('proyek-kompleks'), 'Kompleks apartemen']],
    },
  ],

  articles: [
    {
      title: 'Apa Itu GRC? Mengenal Glassfibre Reinforced Concrete',
      slug: 'apa-itu-grc',
      category: 'Edukasi',
      date: '2026-09-02 09:00:00',
      cover: img('produksi-panel'),
      excerpt: 'GRC adalah beton yang diperkuat serat kaca. Ringan, kuat, dan mudah dibentuk sehingga cocok untuk ornamen bangunan.',
      content:
        '<p><strong>GRC (Glassfibre Reinforced Concrete)</strong> adalah material komposit yang terdiri dari semen, pasir silika, air, dan serat kaca tahan alkali. Serat kaca berfungsi sebagai tulangan sehingga GRC bisa dibuat tipis namun tetap kuat.</p><h2>Kenapa GRC Populer?</h2><ul><li><strong>Ringan</strong> – sekitar 1/4 berat beton pracetak biasa.</li><li><strong>Fleksibel</strong> – bisa dicetak menjadi bentuk apa pun.</li><li><strong>Tahan cuaca</strong> – tidak lapuk, tidak berkarat, tidak dimakan rayap.</li><li><strong>Tahan api</strong> – tidak mudah terbakar.</li></ul><h2>Penggunaan GRC</h2><p>GRC banyak dipakai untuk lisplang, krawangan, kubah masjid, pilar, hingga panel fasad gedung bertingkat.</p>',
    },
    {
      title: 'Keunggulan Lisplang GRC Dibanding Lisplang Kayu',
      slug: 'keunggulan-lisplang-grc',
      category: 'Tips',
      date: '2026-09-18 09:00:00',
      cover: img('lisplang-gedung'),
      excerpt: 'Lisplang kayu mudah lapuk dan dimakan rayap. Simak alasan lisplang GRC menjadi pilihan yang lebih awet.',
      content:
        '<p>Lisplang adalah papan penutup ujung atap. Selama bertahun-tahun, kayu menjadi pilihan utama. Namun kini banyak pemilik rumah beralih ke lisplang GRC.</p><h2>1. Lebih Awet</h2><p>GRC tidak lapuk oleh air hujan dan tidak dimakan rayap, sehingga umur pakainya jauh lebih panjang.</p><h2>2. Motif Lebih Beragam</h2><p>Karena dicetak, lisplang GRC bisa memiliki profil dan ornamen yang sulit dibuat dari kayu.</p><h2>3. Perawatan Mudah</h2><p>Cukup dicat ulang dengan cat tembok eksterior setiap beberapa tahun.</p>',
    },
    {
      title: 'Tips Memilih Motif Krawangan untuk Fasad Rumah',
      slug: 'tips-memilih-motif-krawangan',
      category: 'Inspirasi',
      date: '2026-10-05 09:00:00',
      cover: img('roster-krawangan'),
      excerpt: 'Krawangan bukan sekadar hiasan. Pilih motif yang tepat agar fasad cantik sekaligus sirkulasi udara optimal.',
      content:
        '<p>Krawangan GRC dapat menjadi titik fokus fasad rumah. Berikut tips memilih motif yang tepat:</p><ol><li><strong>Sesuaikan dengan gaya rumah.</strong> Rumah modern cocok dengan motif geometris sederhana, sedangkan rumah klasik cocok dengan motif floral.</li><li><strong>Perhatikan rasio lubang.</strong> Semakin besar lubang, semakin banyak cahaya dan udara yang masuk.</li><li><strong>Pertimbangkan bayangan.</strong> Motif akan menghasilkan pola bayangan di dalam ruangan.</li><li><strong>Pilih warna finishing.</strong> Warna terang memberi kesan bersih, warna gelap memberi kesan tegas.</li></ol>',
    },
    {
      title: 'Proses Produksi GRC di Workshop Kami',
      slug: 'proses-produksi-grc',
      category: 'Behind the Scene',
      date: '2026-10-15 09:00:00',
      cover: img('cetakan-beton'),
      excerpt: 'Dari cetakan hingga siap pasang: begini proses produksi GRC cetak di workshop kami di Gunung Putri.',
      content:
        '<p>Setiap produk GRC kami melewati beberapa tahap produksi yang terkontrol.</p><h2>1. Pembuatan Master & Cetakan</h2><p>Desain dibuat master-nya, lalu dibuatkan cetakan dari karet silikon atau fiberglass.</p><h2>2. Pencampuran Material</h2><p>Semen, pasir silika, aditif, dan serat kaca dicampur dengan takaran yang konsisten.</p><h2>3. Pencetakan & Curing</h2><p>Adonan dituang atau disemprot ke cetakan, lalu dirawat (curing) agar mencapai kekuatan optimal.</p><h2>4. Finishing & Quality Control</h2><p>Produk dirapikan, diperiksa, kemudian siap dikirim dan dipasang.</p>',
    },
  ],

  faqs: [
    ['Bagaimana cara memesan produk GRC?', 'Hubungi kami melalui WhatsApp atau formulir kontak. Kirimkan gambar atau referensi desain, ukuran, dan lokasi proyek. Tim kami akan memberikan penawaran harga.'],
    ['Apakah bisa survei lokasi gratis?', 'Ya, kami melayani survei lokasi gratis untuk area Gunung Putri, Cileungsi, Cibubur, Bogor, Bekasi, Depok, dan Jakarta.'],
    ['Berapa lama waktu produksi?', 'Tergantung jumlah dan tingkat kesulitan. Produk standar 1–2 minggu, desain custom dengan cetakan baru sekitar 2–4 minggu.'],
    ['Apakah harga sudah termasuk pemasangan?', 'Kami menyediakan pilihan harga material saja atau sudah termasuk pemasangan. Semua dijelaskan secara transparan di penawaran.'],
    ['Apakah ada garansi?', 'Ya, setiap pekerjaan pemasangan kami bergaransi. Detail garansi tercantum pada surat penawaran.'],
  ],

  testimonials: [
    { name: 'H. Ahmad Fauzi', role: 'Ketua DKM Masjid Al-Ikhlas', rating: 5, content: 'Ornamen masjid dikerjakan sangat rapi dan tepat waktu. Tim GRC Cetak komunikatif dari awal hingga selesai.' },
    { name: 'Hendra Wijaya', role: 'Pemilik Rumah, Kota Wisata', rating: 5, content: 'Krawangan fasad rumah saya jadi pusat perhatian. Detail motifnya presisi dan pemasangannya bersih.' },
    { name: 'Ir. Rina Kartika', role: 'Arsitek', rating: 5, content: 'Partner andal untuk custom panel GRC. Bisa mengikuti gambar kerja dengan detail yang sulit sekalipun.' },
    { name: 'Budi Santoso', role: 'Kontraktor', rating: 5, content: 'Harga bersaing, kualitas konsisten, dan pengiriman selalu sesuai jadwal proyek.' },
  ],
};
