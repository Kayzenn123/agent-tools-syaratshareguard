# BRIEF — SyaratShareGuard — 2026-10-21

## Masalah/usecase (1 kalimat + siapa yang kena)
Peserta lomba Indonesia sering gagal lolos verifikasi (atau dicap tukang spam) karena syarat "share ke N grup WA" dikerjakan asal-asalan; SyaratShareGuard memberi mereka kamus istilah syarat, tracker bukti share, generator pesan anti-spam, dan pengingat privasi — semua jalan 100% di browser.

## Konsep visual (1 kalimat)
Zine fotokopi hitam-putih + stempel merah, halaman terbelah jadi DUA DUNIA yang bertolak — DUNIA PANITIA (syarat yang harus dipenuhi) vs DUNIA KAMU (privasi yang harus dijaga) — dengan pembatas yang bisa digeser.

## Hasil seed (tools/pick-seed.js, base 2026-10-21)
- domain: kamus bahasa daerah → diadaptasi jadi **KAMUS SYARAT** (glosarium istilah syarat lomba)
- layout: **split screen dua dunia** yang saling bereaksi
- referensi: **zine fotokopi** (grain, tepi sobek, teks miring, stempel)
- constraint: **hanya 3 ukuran font** (kecil / biasa / raksasa)
- motion: A zoom-through teks jadi pintu · B 2 marquee band berlawanan + skew velocity · C teks di path melengkung · D tilt 3D pointer · E curtain wipe antar section · (F dipangkas: waktu)
- ikon: **solid blocky**, custom hand-built SVG (min 12, 3+ custom)
- font: display **Macondo Swash Caps** · body **SUSE** · aksen **Diplomata** (stempel)
- palet: light / triadic / hue 224 → bg kertas oklch(0.96 0.042 224), surface oklch(0.90 0.040 224), text tinta oklch(0.20 0.040 224), muted oklch(0.45 0.030 224), accent stempel-merah oklch(0.72 0.169 344), accent2 lime oklch(0.75 0.230 104), pop oranye oklch(0.85 0.212 36)

## 3 arah desain (2 kalimat masing-masing) + arah terpilih
1. **Papan pengumuman RT**: kertas ditempel paku payung, stempel basah, pengunjung menempel "bukti share" seperti menempel pengumuman. Hangat tapi terlalu mirip Loakan (papan pengumuman, 2026-10-18).
2. **Ruang sidang syarat**: dark, lampu sorot, peserta "diadili" syaratnya satu per satu. Dramatis tapi dark mode + neon sudah dipakai berkali-kali.
3. **Zine fotokopi punk + split dua dunia** ← TERPILIH: paling jauh dari 5 build j0800 terakhir (VerifDeadline=meja juri terang, PosterKit=meja cetak, InfografisCepat=sampul kaset, EsaiCepat & BidCepat=form tool). Zine = tinta hitam di kertas, grain, sobek, miring — anti-SaaS total.

## Keputusan berani
Satu halaman, DUA DUNIA yang bertolak: pembatas vertikal bisa DIGESER (drag) — geser kanan = DUNIA PANITIA membesar (syarat makin menuntut), geser kiri = DUNIA KAMU membesar (privasi makin dijaga). Ditambah constraint hanya 3 ukuran font di seluruh situs.

## Persona/suara
**Mas Penjaga** — petugas loket syarat lomba yang galak tapi sayang. Bahasa santai-tegas: "Jangan spam, Dek.", "Bukti mana? Screenshot-nya tempel sini.", "Grup keluarga JANGAN disentuh." Error state dimarahi dengan sayang, empty state diajak mulai.

## Palet (harmoni, kenapa, psikologi, token, kontras AA)
- Harmoni triadic hue 224 (biru kertas → merah stempel 344 → lime 104) + pop oranye 36 untuk kejutan.
- Psikologi: kertas fotokopi (tenang, netral, "dokumen resmi") vs stempel merah (tegang, otoritas, "SAH/TOLAK") — persis ketegangan share-vs-privasi.
- Token: --bg #f2f3f7 · --surface #e6e8f0 · --text #23262e (tinta) · --muted #5b6070 · --accent #d43a6e (stempel) · --accent-2 #a8c256 (lime) · --pop #e07b2a (oranye).
- Kontras AA: text/bg = 13.2:1 ✓ · muted/bg = 5.9:1 ✓ · putih/accent = 4.6:1 ✓ (teks kecil di atas stempel hanya putih bold) · text/accent2 = 8.1:1 ✓. accent/accent2/pop TIDAK dipakai untuk teks kecil di atas kertas.

## Font (display/body/aksen, alasan, Fontsource id, variable?)
- Display: **Macondo Swash Caps** (fontsource id: `macondo-swash-caps`) — swash dekoratif seperti judul zine fotokopi; hanya untuk kata raksasa.
- Body: **SUSE** (id: `suse`, variable 100–800) — grotesk tegas, x-height lega, terbaca di 390px.
- Aksen: **Diplomata** (id: `diplomata`) — huruf ukiran stempel; hanya untuk cap "SAH"/"TOLAK"/angka.
- Constraint: TIGA ukuran saja — `--fs-xs: 12px` (label/keterangan), `--fs-md: 17px` (body), `--fs-xl: clamp(3rem, 14vw, 9rem)` (raksasa). Tidak ada ukuran lain.

## Ikon (gaya, sumber, 12+ ikon, 3+ custom)
- Gaya: solid blocky, custom hand-built SVG (tanpa pustaka ikon).
- Daftar: stempel-sah, stempel-tolak, amplop, grup-chat (3 balon), perisai, mata-tertutup, gembok, jam-pasir, ceklis, salin, unduh, lonceng, panah-geser, sobek-kertas (divider), coret-spam, link.
- Custom (digambar sendiri): (1) stempel bulat "SAH • SYARAT TERPENUHI •" (textPath), (2) divider tepi sobek kertas, (3) ikon "grup keluarga dilarang" (balon chat + garis coret + rumah).

## Gerak (kategori A–F, narasi penyatu, MODE RINGAN)
- Narasi: **"masuk ke mesin fotokopi"** — scroll = kertas berjalan lewat mesin: zoom menembus kata raksasa (pintu), marquee = rol mesin berputar, curtain wipe = tirai mesin, tilt = kertas dipegang.
- A kamera: kata raksasa "SYARAT" di-zoom-through (scale 1→9, pinned) jadi pintu ke section tracker.
- B marquee: 2 band berlawanan — band 1: "JANGAN SPAM • MINTA IZIN • ..." · band 2: "SYARAT • BUKTI • ..." — skew mengikuti scroll velocity.
- C teks: badge stempel melingkar (textPath) berputar lambat di hero + di kartu "LUNAS".
- D input: kartu kamus & kartu syarat tilt 3D mengikuti pointer (desktop, pointer:fine saja).
- E reveal: curtain wipe merah-stempel antar section (clip-path inset animasi saat section masuk viewport).
- MODE RINGAN (auto: hardwareConcurrency≤4 / deviceMemory≤4 / Save-Data / fps<40 2dtk): matikan A, D, dan skew marquee; marquee jadi statis; toggle "Gerak: nyala/mati" di footer + hormati prefers-reduced-motion.

## Storyboard hero moment
| Scroll | Yang terlihat | Kamera (zoom/pan) | Marquee | Teks | Interaksi |
|---|---|---|---|---|---|
| 0% | Split dua dunia: kiri DUNIA PANITIA (kertas syarat), kanan DUNIA KAMU (kertas privasi), pembatas bisa digeser | — | band 1+2 jalan berlawanan | judul raksasa "SYARAT / SHARE / AMAN" | drag pembatas, tilt kartu |
| 25% | Kata "SYARAT" raksasa memenuhi layar | zoom-through 1→9, kata jadi pintu | band mempercepat + skew | kata pecah jadi partikel huruf | scroll |
| 50% | Kamus Syarat: 15 kartu istilah, bisa dicari | — | — | kartu tilt 3D | ketik cari, klik kartu = definisi |
| 75% | Tracker: progress share + stempel LUNAS | curtain wipe merah masuk section | — | angka odometer 0→N | tambah grup, checklist bukti |
| 100% | Generator pesan + Privasi + ekspor | — | band 2 melambat | stempel "SAH" jatuh (tekan S) | salin pesan, unduh bukti |

Pertunjukan utama di 25%: zoom menembus kata SYARAT. 5 detik pertama: split dua dunia + pembatas yang jelas bisa digeser + stempel merah.

## Konten (15+ item nyata, easter egg)
- Kamus Syarat (15 istilah nyata lomba Indonesia): share ke N grup WA · tag 3 teman · follow + screenshot · upload twibbon · kirim bukti ke CP · repost story 24 jam · join grup Telegram · subscribe YouTube · isi GForm · kirim karya via email · biaya pendaftaran · lampirkan KTM/KTP · pakai hashtag resmi · mention akun penyelenggara · screenshot bukti share.
- 8 Aturan Privasi (checklist): jangan sebar nomor HP · jangan share ke grup keluarga · minta izin admin dulu · jangan spam >1x/hari/grup · jangan share tengah malam (21.00–07.00) · samarkan data pribadi di screenshot · waspada link phising · simpan bukti 30 hari.
- 3 template pesan: Santai (ke teman), Sopan (grup umum), Caption IG.
- Easter egg: tekan `S` di mana saja → stempel "SAH!" jatuh dari atas layar.

## Teknik visual orisinal (2+)
1. Grain fotokopi: SVG feTurbulence overlay di seluruh halaman (opacity rendah, pointer-events none).
2. Divider tepi sobek kertas: SVG path custom antar section.
3. Stempel putar: textPath melingkar "SYARAT TERPENUHI • JANGAN SPAM •" (CSS rotate lambat).

## Suara
Tidak (tool fokus; bunyi tidak menambah nilai).
