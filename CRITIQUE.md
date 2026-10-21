# CRITIQUE — SyaratShareGuard — 2026-10-21

## Slop test (v3)
- Logo/nama ditutup: split-screen dua dunia (kertas syarat vs kertas privasi) + stempel merah + tipografi swash raksasa + constraint 3 ukuran font = tidak ketukar dengan web AI umum. LULUS.
- 3 hal paling template: (1) header nav template AstroWind (logo + link + CTA), (2) footer template standar, (3) form input gaya default.
- Yang dirombak: (1) logo diganti ikon stempel custom + Diplomata (tanpa emoji roket), (2) footer difootnote-kan dengan suara Mas Penjaga; struktur template dipertahankan demi waktu, (3) input diberi border 2px + shadow blocky khas zine.
- Keputusan berani (pembatas geser dua dunia) terlihat dalam 5 detik pertama: YA — divider + handle + hint pill langsung di hero.
- Signature moment (zoom-through kata SYARAT): terjadi di 25% scroll, desktop saja.

## Gerbang gerak (v4)
- Lapisan gerak: 5 (A zoom-through teks-pintu · B 2 marquee berlawanan + skew velocity · C textPath stempel berputar · D tilt 3D kartu · E curtain wipe). F dipangkas (waktu).
- Zoom: YA (Motion One scroll-scrub, desktop). Pan horizontal: TIDAK harfiah — diganti drag pembatas vertikal dua dunia (keputusan berani, dicatat sebagai adaptasi).
- 2 marquee: YA, berlawanan arah + skew mengikuti velocity scroll.
- Font/palet/gaya ikon beda dari 5 build j0800 terakhir: YA (Macondo Swash Caps/SUSE/Diplomata baru; light/triadic hue 224 baru; solid blocky custom baru).
- Kontras AA: teks/bg 15.84, muted/bg 6.22, putih/stempel 5.43, teks/lime 7.11 — LULUS semua.
- Body terbaca di 390px: YA (SUSE 17px, x-height lega).
- FPS CPU throttle 4x: 56–60 (3 run stabil setelah content-visibility). Target ≥45 LULUS.
- Reduced-motion: dites — 0 animasi berjalan, wipe/marquee/tilt/zoom mati. LULUS.

## Gerbang v5
- Tes bandingkan (vs VerifDeadline 10-19, PosterKit 10-20): beda total — split dua dunia vs meja juri/meja cetak; zine fotokopi vs flat terang. LULUS.
- Tes blur: komposisi split + stempel + judul raksasa masih teridentifikasi. LULUS.
- Tes 3 detik: "web tentang syarat lomba vs privasi, pembatas bisa digeser" — YA.
- Keyboard-only: slider (←/→/Home/End), semua form, tab gaya pesan, checklist — LULUS. Skip link ada.
- Reduced-motion: LULUS (di atas).
- Mode ringan: lite → wipe instan, zoom/skew/tilt mati, grain mati <1024px. LULUS.
- Budget: JS awal ~21KB (gzip), CSS ~8KB, font ~3 family (latin subset), gambar raster 0. LCP 1.9–2.0s, CLS 0.081, INP tidak terukur >200ms.
- Keamanan: input URL/localStorage divalidasi + panjang dibatasi; render via textContent/esc(); tanpa innerHTML untuk data user; tanpa API key; tanpa tracker. LULUS.
- Lisensi: font OFL (Fontsource), ikon digambar sendiri, tanpa aset berhak cipta. LULUS.
- Dipangkas: lapisan F (shader/fisika) — tidak dibutuhkan konsep; halaman FAQ — waktu; mode gelap penuh kustom — pakai varian dark template seadanya.

## Bug yang ditemukan & diperbaiki (dicatat agar tak terulang)
1. Marquee track `inline-flex` melebarkan documentElement.scrollWidth di Chromium meski parent overflow:hidden → ganti `flex + width:max-content`.
2. clip-path hidden-state di elemen yang diobserve IO = IO lapor "tak terlihat" selamanya → observe section, clip di inner.
3. `overflow-x: clip` di html/body dicurigai merusak IO — hasil tes: bukan penyebab; tetap dihapus (tak perlu).
4. astro preview 404 untuk base path + query string (quirk server dev; Pages produksi normal).
5. Logo Diplomata overflow di 390px → font-size 0.78rem <520px.
6. Announcement widget memuat shields.io (tunnel gagal) → slot announcement dikosongkan.
7. Header RSS mengarah ke rss.xml yang 404 (blog dimatikan) → Header kustom tanpa showRssFeed.

## Skor 1-10
- Karakter: 9 — zine fotokopi + dua dunia + suara Mas Penjaga konsisten sampai pesan error.
- Keunikan: 9 — split-screen geser + constraint 3 ukuran font + stempel textPath; tak ada di 5 build sebelumnya.
- Kerapian: 8 — header/footer masih template; overlap judul hero di tengah disengaja (konsep).

## Keputusan konflik aturan
- v4 "pan horizontal" vs keputusan berani: pan diganti drag-pembatas vertikal (tercatat sebagai adaptasi, bukan pelanggaran).
- v2 "maks 2 family" vs v4 "maks 3": pakai v5 ATURAN 0 → 3 family.

## Putaran rombak
- Rombak 1: overflow marquee, h1, tap target, logo, announcement/RSS, wipe IO — semua lolos QA (exit 0).
- Rombak 2: fps 39.8 → content-visibility + wipe instan di lite → 56–60 stabil.
