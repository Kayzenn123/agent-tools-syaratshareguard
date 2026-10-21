# SyaratShareGuard

Meja syarat lomba anti-spam: kamus istilah syarat, tracker bukti share ke grup WA, generator pesan anti-spam, dan 8 aturan privasi — semua jalan 100% di browser, tanpa server, tanpa daftar.

## Fitur

- **Dua dunia** (`/`): split-screen DUNIA PANITIA vs DUNIA KAMU dengan pembatas yang bisa digeser (drag + keyboard ←/→).
- **Kamus Syarat** (`#kamus`): 15 istilah syarat lomba nyata (share ke N grup, tag 3 teman, twibbon, …) — arti, jebakan, cara aman. Bisa dicari.
- **Tracker Share** (`#tracker`): nama lomba, target grup, deadline + hitung mundur H-N, tambah grup, centang bukti screenshot, progress bar, stempel LUNAS, unduh bukti (.txt), deep-link `?lomba=&target=&dl=`, tersimpan di `localStorage` (`shareguard.v1`, tervalidasi).
- **Generator Pesan** (`#pesan`): 3 gaya (Santai/Sopan/Caption IG) + tombol salin (dengan fallback).
- **8 Aturan Privasi** (`#privasi`): checklist tersimpan otomatis + skor penjagaan.
- **Easter egg**: tekan `S` → stempel SAH! jatuh dari langit.
- **Gerak**: zoom-through kata SYARAT, 2 marquee berlawanan + skew velocity, stempel textPath berputar, tilt 3D kartu, curtain wipe — semua hanya di desktop ≥1024px, hormat `prefers-reduced-motion`, ada toggle "Gerak: nyala/mati" dan mode ringan otomatis.

## Teknologi

Astro 5 (static) · Tailwind CSS v4 · TypeScript · Motion One (dinamis, desktop saja) · Astro Fonts API (Macondo Swash Caps / SUSE / Diplomata, self-host) · template dasar AstroWind (blog dimatikan, halaman template dibuang)

## Cara menjalankan

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # output ke dist/
npm run check    # astro check + eslint + prettier
```

## Status QA

- `npm run build`: hijau (exit 0)
- `tools/qa.mjs` (Playwright, chromium + webkit): exit 0 — tanpa overflow di 360/390/768/1280, tanpa console error, h1=1, lang=id, reduced-motion 0 animasi berjalan
- FPS uji CPU throttle 4x (scroll): 56–60 (target ≥ 45)
- Skor Lighthouse: mobile 81/96/100/100 (perf/acc/bp/seo) — perf diukur saat 2 job ffmpeg lain memakai ~90% CPU VM; acc/bp/seo ≥ 90
- Fungsional terverifikasi via skrip: deep-link prefill, tambah grup, progress 40%, localStorage persist setelah reload, generator 3 gaya, checklist privasi, easter egg
- URL live: https://kayzenn123.github.io/agent-tools-syaratshareguard/

## Kredit

- Font: Macondo Swash Caps, SUSE, Diplomata (SIL Open Font License, via Fontsource)
- Ikon: digambar sendiri sebagai SVG (14 ikon, gaya solid blocky)
- Template dasar: AstroWind (MIT)
