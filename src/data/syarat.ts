export interface Istilah {
  istilah: string;
  maksud: string;
  jebakan: string;
  caraAman: string;
}

export const KAMUS: Istilah[] = [
  {
    istilah: 'Share ke N grup WA',
    maksud: 'Kirim pamflet/info lomba ke sejumlah grup WhatsApp, biasanya 3–5 grup.',
    jebakan: 'Asal kirim ke grup keluarga atau grup yang sepi biar cepat — panitia bisa minta screenshot nama grupnya.',
    caraAman: 'Pilih grup yang relevan (angkatan, komunitas, kelas). Minta izin admin dulu, kirim sekali, simpan screenshot.',
  },
  {
    istilah: 'Tag 3 teman',
    maksud: 'Menandai tiga akun teman di kolom komentar postingan lomba.',
    jebakan: 'Ngetag akun bodong atau orang yang sama terus-terusan — dianggap spam oleh Instagram.',
    caraAman: 'Tag teman yang memang mungkin ikut. Beda postingan, beda teman.',
  },
  {
    istilah: 'Follow + screenshot',
    maksud: 'Follow akun penyelenggara lalu kirim bukti tangkapan layar.',
    jebakan: 'Follow-unfollow setelah lolos verifikasi — panitia cek ulang saat pengumuman.',
    caraAman: 'Follow beneran sampai lomba selesai. Screenshot yang jelas: nama akun + tombol Following terlihat.',
  },
  {
    istilah: 'Upload twibbon',
    maksud: 'Pasang bingkai foto resmi lomba di foto profil atau feed.',
    jebakan: 'Twibbon menutupi wajah sampai tak dikenali, atau dihapus sejam kemudian.',
    caraAman: 'Pakai twibbon resmi dari link panitia, biarkan terpasang minimal sampai batas yang ditentukan.',
  },
  {
    istilah: 'Kirim bukti ke CP',
    maksud: 'Kirim semua bukti syarat ke Contact Person via chat pribadi.',
    jebakan: 'Kirim jam 2 pagi, tanpa nama, tanpa keterangan lomba — CP bingung, berkasmu tenggelam.',
    caraAman: 'Kirim jam kerja, satu pesan rapi: nama, asal sekolah/kampus, daftar bukti bernomor.',
  },
  {
    istilah: 'Repost story 24 jam',
    maksud: 'Bagikan ulang postingan lomba ke Instagram Story dan biarkan 24 jam penuh.',
    jebakan: 'Dihapus setelah 2 jam atau disembunyikan dari daftar close friends saja.',
    caraAman: 'Biarkan 24 jam penuh untuk publik. Screenshot di jam ke-25 sebagai bukti.',
  },
  {
    istilah: 'Join grup Telegram',
    maksud: 'Masuk ke grup/kanal Telegram resmi untuk info teknis lomba.',
    jebakan: 'Join lalu mute total sampai pengumuman penting kelewat.',
    caraAman: 'Nyalakan pin untuk pesan penting. Grup info = sumber soal revisi jadwal.',
  },
  {
    istilah: 'Subscribe YouTube',
    maksud: 'Subscribe kanal YouTube penyelenggara sebagai syarat.',
    jebakan: 'Subscribe pakai akun kosong yang dibuat 5 menit lalu — YouTube bisa menganggapnya spam.',
    caraAman: 'Pakai akun utama. Tonton satu video sampai habis sekalian, biar natural.',
  },
  {
    istilah: 'Isi GForm pendaftaran',
    maksud: 'Mengisi formulir Google Form data diri dan karya.',
    jebakan: 'Asal isi, email typo, nomor HP kurang satu digit — panitia tidak bisa menghubungimu.',
    caraAman: 'Cek ulang email dan nomor HP sebelum submit. Screenshot halaman konfirmasi.',
  },
  {
    istilah: 'Kirim karya via email',
    maksud: 'Mengirim file karya ke email panitia dengan subjek tertentu.',
    jebakan: 'Subjek asal, file >25MB mental, nama file "final-fix-beneran-2.pdf".',
    caraAman: 'Ikuti format subjek persis. Nama file: NamaLengkap_JudulKarya.pdf. Di bawah 10MB.',
  },
  {
    istilah: 'Biaya pendaftaran',
    maksud: 'Transfer sejumlah rupiah ke rekening/e-wallet panitia.',
    jebakan: 'Transfer tanpa berita, atau ke nomor yang dikirim akun palsu.',
    caraAman: 'Cek nomor rekening HANYA dari pamflet/website resmi. Tulis berita: Nama + Lomba. Simpan bukti transfer.',
  },
  {
    istilah: 'Lampirkan KTM / KTP / kartu pelajar',
    maksud: 'Bukti status pelajar/mahasiswa untuk kategori peserta.',
    jebakan: 'Kirim foto KTP full tanpa sensor ke grup umum.',
    caraAman: 'Sensor NIK dan alamat sebelum kirim. Kirim via jalur pribadi ke CP, bukan grup.',
  },
  {
    istilah: 'Pakai hashtag resmi',
    maksud: 'Sertakan hashtag yang ditentukan di caption postingan.',
    jebakan: 'Typo satu huruf — postinganmu tidak terindeks saat panitia mencari.',
    caraAman: 'Copy-paste hashtag dari pamflet, jangan ketik manual.',
  },
  {
    istilah: 'Mention akun penyelenggara',
    maksud: 'Menandai akun resmi di postingan atau story.',
    jebakan: 'Mention akun fanbase atau akun lama yang sudah tidak aktif.',
    caraAman: 'Klik mention dari daftar saran (akun terverifikasi), bukan ketik hafalan.',
  },
  {
    istilah: 'Screenshot bukti share',
    maksud: 'Tangkapan layar sebagai bukti kamu sudah memenuhi syarat share.',
    jebakan: 'Screenshot kepotong, nama grup tidak terlihat, atau tanggal tidak jelas.',
    caraAman: 'Screenshot utuh: nama grup + pesanmu + jam kirim terlihat. Satu syarat, satu screenshot.',
  },
];

export interface AturanPrivasi {
  judul: string;
  detail: string;
}

export const PRIVASI: AturanPrivasi[] = [
  { judul: 'Nomor HP tidak ikut difotokopi', detail: 'Sensor nomor HP dan foto profil orang lain sebelum screenshot bukti disebar.' },
  { judul: 'Grup keluarga zona terlarang', detail: 'Jangan kirim pamflet lomba ke grup keluarga. Sekali dicap tukang spam, susah pulih.' },
  { judul: 'Izin admin dulu', detail: 'Chat admin grup: "Min, izin share info lomba ya." Tunggu jawaban sebelum kirim.' },
  { judul: 'Maksimal sekali sehari per grup', detail: 'Satu grup, satu kiriman. Kirim ulang = spam, tidak peduli alasannya.' },
  { judul: 'Jam sopan: 07.00–21.00', detail: 'Jangan kirim syarat lomba tengah malam. Notifikasi orang bukan mainan.' },
  { judul: 'Waspada link palsu', detail: 'Link pendaftaran hanya dari pamflet/website resmi. Link mirip-mirip = phising.' },
  { judul: 'Data pribadi disamarkan', detail: 'NIK, alamat, dan tanggal lahir di KTP/KTM disensor sebelum dikirim ke siapa pun.' },
  { judul: 'Bukti disimpan 30 hari', detail: 'Semua screenshot dan bukti transfer disimpan sampai pengumuman + 30 hari.' },
];

export interface TemplatePesan {
  id: string;
  nama: string;
  untuk: string;
  template: (lomba: string, link: string, nama: string) => string;
}

export const TEMPLATE_PESAN: TemplatePesan[] = [
  {
    id: 'santai',
    nama: 'Santai',
    untuk: 'ke teman / grup angkatan',
    template: (lomba, link, nama) =>
      `Halo semuanya!\n\nIzin share info lomba ya — aku lagi ikut ${lomba || '[Nama Lomba]'}, salah satu syaratnya share info ini.\n\n${link || '[Link info lomba]'}\n\nSiapa tahu ada yang minat ikut juga. Makasih banyak! — ${nama || '[Namamu]'}`,
  },
  {
    id: 'sopan',
    nama: 'Sopan',
    untuk: 'grup umum / komunitas',
    template: (lomba, link, nama) =>
      `Assalamualaikum / selamat pagi, izin share info.\n\nSaya ${nama || '[Nama]'}, peserta ${lomba || '[Nama Lomba]'}. Mohon izin membagikan informasi lomba berikut sebagai bagian dari syarat kepesertaan:\n\n${link || '[Link info lomba]'}\n\nTerima kasih atas perhatiannya. Mohon maaf apabila mengganggu.`,
  },
  {
    id: 'caption',
    nama: 'Caption IG',
    untuk: 'postingan feed / story',
    template: (lomba, link, nama) =>
      `Ikut ${lomba || '[Nama Lomba]'}!\n\nSyaratnya harus share info lomba ini, jadi sekalian ngajak: siapa yang mau ikut bareng? Info lengkapnya di sini:\n\n${link || '[Link info lomba]'}\n\n#lomba #infolomba — ${nama || '[Namamu]'}`,
  },
];

export const MARQUEE_A = ['JANGAN SPAM', 'MINTA IZIN DULU', 'SENSOR DATA PRIBADI', 'SATU GRUP SATU KIRIMAN', 'JAM SOPAN 07–21'];
export const MARQUEE_B = ['SYARAT', 'BUKTI', 'SCREENSHOT', 'LUNAS', 'SAH'];
