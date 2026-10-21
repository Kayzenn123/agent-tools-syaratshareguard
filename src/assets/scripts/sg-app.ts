import { KAMUS, PRIVASI, TEMPLATE_PESAN } from '../../data/syarat';

const $ = <T extends HTMLElement = HTMLElement>(sel: string, root: ParentNode = document): T | null =>
  root.querySelector(sel);
const $$ = <T extends HTMLElement = HTMLElement>(sel: string, root: ParentNode = document): T[] =>
  Array.from(root.querySelectorAll(sel));

const esc = (s: string): string =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!));

/* ---------- Toast ---------- */
function toast(msg: string): void {
  let t = $('#sg-toast');
  if (!t) {
    t = document.createElement('div');
    t.id = 'sg-toast';
    t.setAttribute('role', 'status');
    t.setAttribute('aria-live', 'polite');
    t.className = 'sg-xs';
    t.style.cssText =
      'position:fixed;bottom:18px;left:50%;transform:translateX(-50%);z-index:130;background:var(--sg-ink);color:var(--aw-color-bg-page);padding:.7rem 1.1rem;border-radius:2px;max-width:92vw;text-align:center;';
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.style.opacity = '1';
  window.clearTimeout((t as unknown as { _h?: number })._h);
  (t as unknown as { _h: number })._h = window.setTimeout(() => (t!.style.opacity = '0'), 2600);
}

/* ---------- Split dua dunia ---------- */
function initSplit(): void {
  const split = $('#sg-split');
  const divider = $('#sg-divider');
  const worldB = $('#sg-world-b');
  const innerB = $('#sg-world-b-inner');
  if (!split || !divider || !worldB || !innerB) return;
  let pos = 50; // persen dari kiri untuk DUNIA PANITIA
  const set = (p: number) => {
    pos = Math.max(8, Math.min(92, p));
    (worldB as HTMLElement).style.clipPath = `inset(0 0 0 ${pos}%)`;
    (divider as HTMLElement).style.left = `${pos}%`;
    divider.setAttribute('aria-valuenow', String(Math.round(pos)));
    // innerB harus selebar split penuh agar konten kanan tidak gepeng
    const w = split.clientWidth;
    innerB.style.width = `${w}px`;
  };
  const fromEvent = (clientX: number) => {
    const r = split.getBoundingClientRect();
    set(((clientX - r.left) / r.width) * 100);
  };
  let dragging = false;
  divider.addEventListener('pointerdown', (e) => {
    dragging = true;
    divider.setPointerCapture(e.pointerId);
  });
  divider.addEventListener('pointermove', (e) => dragging && fromEvent(e.clientX));
  divider.addEventListener('pointerup', () => (dragging = false));
  divider.addEventListener('pointercancel', () => (dragging = false));
  divider.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') { set(pos - 4); e.preventDefault(); }
    if (e.key === 'ArrowRight') { set(pos + 4); e.preventDefault(); }
    if (e.key === 'Home') { set(8); e.preventDefault(); }
    if (e.key === 'End') { set(92); e.preventDefault(); }
  });
  new ResizeObserver(() => set(pos)).observe(split);
  set(50);
}

/* ---------- Kamus ---------- */
function initKamus(): void {
  const grid = $('#sg-kamus-grid');
  const input = $('#sg-kamus-cari') as HTMLInputElement | null;
  const count = $('#sg-kamus-count');
  if (!grid) return;
  const render = (q: string) => {
    const query = q.trim().toLowerCase();
    const list = KAMUS.filter(
      (k) =>
        !query ||
        k.istilah.toLowerCase().includes(query) ||
        k.maksud.toLowerCase().includes(query),
    );
    grid.innerHTML = list
      .map(
        (k) => `
      <article class="sg-card tilt p-5" data-tilt>
        <div class="flex items-start justify-between gap-3">
          <h3 class="sg-body font-extrabold">${esc(k.istilah)}</h3>
          <span class="sg-stamp sg-xs tilt-r" style="font-size:var(--fs-xs)">istilah</span>
        </div>
        <p class="sg-body mt-3"><strong>Artinya:</strong> ${esc(k.maksud)}</p>
        <p class="sg-body mt-2"><strong>Jebakannya:</strong> ${esc(k.jebakan)}</p>
        <p class="sg-body mt-2"><strong>Cara aman:</strong> ${esc(k.caraAman)}</p>
      </article>`,
      )
      .join('');
    if (count) count.textContent = list.length ? `${list.length} istilah ketemu.` : 'Nggak ketemu, Dek. Coba kata lain.';
    if (!list.length) {
      grid.innerHTML = `<div class="sg-card p-8 text-center"><p class="sg-display" style="font-size:2.4rem">kosong.</p><p class="sg-body mt-2">Istilah itu belum masuk kamus. Coba kata lain, atau usul ke Mas Penjaga.</p></div>`;
    }
    initTilt(grid);
  };
  input?.addEventListener('input', () => render(input.value));
  render('');
}

/* ---------- Tilt 3D (pointer: fine saja) ---------- */
function initTilt(root: ParentNode = document): void {
  if (!window.matchMedia('(pointer: fine)').matches) return;
  if (document.documentElement.dataset.motion === 'off') return;
  $$('[data-tilt]', root).forEach((el) => {
    if ((el as unknown as { _tilt?: boolean })._tilt) return;
    (el as unknown as { _tilt: boolean })._tilt = true;
    el.addEventListener('pointermove', (e: PointerEvent) => {
      const r = (el as HTMLElement).getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      (el as HTMLElement).style.transform = `perspective(700px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) translateZ(6px)`;
    });
    el.addEventListener('pointerleave', () => {
      (el as HTMLElement).style.transform = '';
    });
  });
}

/* ---------- Tracker ---------- */
interface Grup { nama: string; bukti: boolean; tgl: string }
interface State { v: number; lomba: string; target: number; deadline: string; grups: Grup[]; privasi: boolean[] }
const KEY = 'shareguard.v1';
const DEFAULT_STATE: State = { v: 1, lomba: '', target: 3, deadline: '', grups: [], privasi: PRIVASI.map(() => false) };

function loadState(): State {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return structuredClone(DEFAULT_STATE);
    const s = JSON.parse(raw) as Partial<State>;
    if (typeof s !== 'object' || s === null || s.v !== 1) return structuredClone(DEFAULT_STATE);
    return {
      v: 1,
      lomba: typeof s.lomba === 'string' ? s.lomba.slice(0, 120) : '',
      target: Math.max(1, Math.min(50, Number(s.target) || 3)),
      deadline: typeof s.deadline === 'string' ? s.deadline.slice(0, 10) : '',
      grups: Array.isArray(s.grups)
        ? s.grups.slice(0, 50).map((g) => ({ nama: String(g.nama || '').slice(0, 80), bukti: !!g.bukti, tgl: String(g.tgl || '').slice(0, 10) }))
        : [],
      privasi: Array.isArray(s.privasi) ? PRIVASI.map((_, i) => !!s.privasi![i]) : PRIVASI.map(() => false),
    };
  } catch {
    return structuredClone(DEFAULT_STATE);
  }
}
function saveState(s: State): void {
  try { localStorage.setItem(KEY, JSON.stringify(s)); } catch { /* storage penuh / privat: diam */ }
}

function initTracker(): void {
  const form = $('#sg-tracker-form');
  if (!form) return;
  form.addEventListener('submit', (e) => e.preventDefault());
  const state = loadState();

  // Deep-link: ?lomba=&target=&dl= (hanya prefill, tidak menimpa data tersimpan)
  const params = new URLSearchParams(location.search);
  const qLomba = (params.get('lomba') || '').slice(0, 120);
  const qTarget = Math.max(1, Math.min(50, parseInt(params.get('target') || '', 10) || 0));
  const qDl = (params.get('dl') || '').slice(0, 10);
  if (qLomba && !state.lomba) state.lomba = qLomba;
  if (qTarget && state.target === 3) state.target = qTarget;
  if (qDl && !state.deadline && /^\d{4}-\d{2}-\d{2}$/.test(qDl)) state.deadline = qDl;

  const lombaI = $('#sg-lomba') as HTMLInputElement;
  const targetI = $('#sg-target') as HTMLInputElement;
  const dlI = $('#sg-deadline') as HTMLInputElement;
  const grupI = $('#sg-grup-nama') as HTMLInputElement;
  const list = $('#sg-grup-list');
  const bar = $('#sg-progress-bar');
  const barLabel = $('#sg-progress-label');
  const countNum = $('#sg-count-num');
  const lunas = $('#sg-lunas');
  const countdown = $('#sg-countdown');
  const errLomba = $('#sg-err-lomba');

  lombaI.value = state.lomba;
  targetI.value = String(state.target);
  dlI.value = state.deadline;

  const done = () => state.grups.length;
  const render = () => {
    const t = state.target;
    const d = done();
    const pct = Math.min(100, Math.round((d / t) * 100));
    if (bar) bar.style.width = `${pct}%`;
    if (barLabel) barLabel.textContent = `${d} dari ${t} grup — ${pct}%`;
    if (countNum) countNum.textContent = String(d);
    if (lunas) lunas.style.display = d >= t && t > 0 ? 'inline-block' : 'none';
    if (list) {
      list.innerHTML = state.grups
        .map(
          (g, i) => `
        <li class="sg-check ${g.bukti ? 'done' : ''}" data-i="${i}">
          <input type="checkbox" ${g.bukti ? 'checked' : ''} aria-label="Bukti screenshot untuk ${esc(g.nama)}" data-bukti="${i}">
          <div class="flex-1">
            <p class="sg-body font-bold sg-check-title">${esc(g.nama) || '(tanpa nama)'}</p>
            <p class="sg-xs opacity-70">${g.tgl ? 'Dikirim ' + esc(g.tgl) : 'Tanggal belum diisi'} · ${g.bukti ? 'screenshot ditempel' : 'screenshot BELUM ditempel'}</p>
          </div>
          <button type="button" class="sg-xs underline" data-hapus="${i}" aria-label="Hapus ${esc(g.nama)}">hapus</button>
        </li>`,
        )
        .join('');
      if (!state.grups.length) {
        list.innerHTML = `<li class="sg-card p-6 text-center"><p class="sg-body">Belum ada grup. Tambah grup pertama di bawah — Mas Penjaga tunggu buktinya.</p></li>`;
      }
    }
    renderCountdown();
    saveState(state);
  };

  const renderCountdown = () => {
    if (!countdown) return;
    if (!state.deadline) { countdown.textContent = 'Isi tanggal deadline biar Mas Penjaga ingatkan.'; return; }
    const now = new Date(); now.setHours(0, 0, 0, 0);
    const dl = new Date(state.deadline + 'T00:00:00');
    const diff = Math.round((dl.getTime() - now.getTime()) / 86400000);
    if (isNaN(diff)) { countdown.textContent = 'Tanggalnya aneh, Dek. Cek lagi.'; return; }
    if (diff < 0) countdown.textContent = `Deadline sudah lewat ${-diff} hari. Semoga sudah kekirim semua.`;
    else if (diff === 0) countdown.textContent = 'HARI INI deadline. Gas sekarang.';
    else if (diff <= 3) countdown.textContent = `Tinggal H-${diff}. Jangan ditunda, Dek.`;
    else countdown.textContent = `Masih H-${diff}. Santai tapi jangan lupa.`;
  };

  lombaI.addEventListener('input', () => { state.lomba = lombaI.value.slice(0, 120); saveState(state); });
  targetI.addEventListener('input', () => {
    const v = Math.max(1, Math.min(50, parseInt(targetI.value, 10) || 1));
    state.target = v; render();
  });
  dlI.addEventListener('change', () => { state.deadline = dlI.value; render(); });

  $('#sg-grup-tambah')?.addEventListener('click', () => {
    const nama = grupI.value.trim().slice(0, 80);
    if (!nama) {
      toast('Nama grupnya diisi dulu, Dek. Mas Penjaga nggak bisa nebak.');
      grupI.focus();
      return;
    }
    if (state.grups.some((g) => g.nama.toLowerCase() === nama.toLowerCase())) {
      toast('Grup itu sudah ada di daftar. Jangan dobel.');
      return;
    }
    const today = new Date().toISOString().slice(0, 10);
    state.grups.push({ nama, bukti: false, tgl: today });
    grupI.value = '';
    render();
    toast(`"${nama}" masuk daftar. Jangan lupa screenshot-nya.`);
  });
  grupI.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') { e.preventDefault(); $('#sg-grup-tambah')?.dispatchEvent(new Event('click')); }
  });

  list?.addEventListener('change', (e) => {
    const t = e.target as HTMLElement;
    const i = t.getAttribute('data-bukti');
    if (i !== null) {
      state.grups[Number(i)].bukti = (t as HTMLInputElement).checked;
      render();
      if ((t as HTMLInputElement).checked) toast('Bukti ditempel. Bagus.');
    }
  });
  list?.addEventListener('click', (e) => {
    const t = (e.target as HTMLElement).closest('[data-hapus]');
    if (t) {
      const i = Number(t.getAttribute('data-hapus'));
      const nama = state.grups[i]?.nama;
      state.grups.splice(i, 1);
      render();
      toast(`"${nama}" dihapus dari daftar.`);
    }
  });

  $('#sg-export')?.addEventListener('click', () => {
    if (!state.lomba.trim()) {
      if (errLomba) errLomba.textContent = 'Isi nama lombanya dulu, Dek — bukti tanpa nama lomba itu surat tanpa alamat.';
      lombaI.focus();
      return;
    }
    if (errLomba) errLomba.textContent = '';
    const lines = [
      'SYARAT SHARE — BUKTI PENGIRIMAN',
      `Lomba: ${state.lomba}`,
      `Target: ${state.target} grup | Terkirim: ${state.grups.length}`,
      `Deadline: ${state.deadline || '-'}`,
      '',
      ...state.grups.map((g, i) => `${i + 1}. ${g.nama} — ${g.tgl} — ${g.bukti ? 'ADA screenshot' : 'BELUM ADA screenshot'}`),
      '',
      'Dicatat oleh SyaratShareGuard. Jangan spam, Dek.',
    ];
    const blob = new Blob([lines.join('\n')], { type: 'text/plain;charset=utf-8' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `bukti-share-${state.lomba.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 40) || 'lomba'}.txt`;
    a.click();
    URL.revokeObjectURL(a.href);
    toast('Bukti diunduh. Simpan baik-baik.');
  });

  $('#sg-reset')?.addEventListener('click', () => {
    if (state.grups.length === 0 && !state.lomba) { toast('Nggak ada yang perlu dihapus.'); return; }
    state.grups = []; state.lomba = ''; state.target = 3; state.deadline = '';
    lombaI.value = ''; targetI.value = '3'; dlI.value = '';
    render();
    toast('Tracker dikosongkan. Mulai dari nol lagi.');
  });

  render();
}

/* ---------- Generator pesan ---------- */
function initPesan(): void {
  const root = $('#sg-pesan');
  if (!root) return;
  let gaya = 'santai';
  const namaI = $('#sg-pesan-nama') as HTMLInputElement;
  const lombaI = $('#sg-pesan-lomba') as HTMLInputElement;
  const linkI = $('#sg-pesan-link') as HTMLInputElement;
  const out = $('#sg-pesan-out') as HTMLTextAreaElement;
  const count = $('#sg-pesan-count');

  const render = () => {
    const tpl = TEMPLATE_PESAN.find((t) => t.id === gaya) || TEMPLATE_PESAN[0];
    const text = tpl.template(lombaI.value.trim().slice(0, 120), linkI.value.trim().slice(0, 300), namaI.value.trim().slice(0, 60));
    out.value = text;
    if (count) count.textContent = `${text.length} karakter`;
  };
  $$('[data-gaya]', root).forEach((b) =>
    b.addEventListener('click', () => {
      gaya = b.getAttribute('data-gaya') || 'santai';
      $$('[data-gaya]', root).forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
      render();
    }),
  );
  [namaI, lombaI, linkI].forEach((i) => i.addEventListener('input', render));

  $('#sg-pesan-salin')?.addEventListener('click', async () => {
    const text = out.value;
    try {
      await navigator.clipboard.writeText(text);
      toast('Pesan disalin. Tempel dengan sopan.');
    } catch {
      out.select();
      try {
        document.execCommand('copy');
        toast('Pesan disalin (cara darurat).');
      } catch {
        toast('Gagal menyalin otomatis — blokir pesannya manual, Dek.');
      }
    }
  });
  render();
}

/* ---------- Privasi checklist ---------- */
function initPrivasi(): void {
  const list = $('#sg-privasi-list');
  if (!list) return;
  const state = loadState();
  const bar = $('#sg-privasi-bar');
  const label = $('#sg-privasi-label');
  const render = () => {
    const n = state.privasi.filter(Boolean).length;
    if (bar) bar.style.width = `${Math.round((n / PRIVASI.length) * 100)}%`;
    if (label) label.textContent = n === PRIVASI.length ? 'Semua dijaga. Kamu aman, Dek.' : `${n} dari ${PRIVASI.length} aturan dijaga.`;
    list.innerHTML = PRIVASI.map(
      (p, i) => `
      <li><label class="sg-check ${state.privasi[i] ? 'done' : ''}">
        <input type="checkbox" data-privasi="${i}" ${state.privasi[i] ? 'checked' : ''}>
        <span><span class="sg-body font-bold sg-check-title">${esc(p.judul)}</span><br><span class="sg-xs opacity-80">${esc(p.detail)}</span></span>
      </label></li>`,
    ).join('');
    saveState(state);
  };
  list.addEventListener('change', (e) => {
    const t = e.target as HTMLElement;
    const i = t.getAttribute('data-privasi');
    if (i !== null) {
      state.privasi[Number(i)] = (t as HTMLInputElement).checked;
      render();
    }
  });
  render();
}

/* ---------- Easter egg: tekan S ---------- */
function initEasterEgg(): void {
  document.addEventListener('keydown', (e) => {
    const tag = (e.target as HTMLElement).tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
    if (e.key.toLowerCase() !== 's' || e.metaKey || e.ctrlKey || e.altKey) return;
    const s = document.createElement('div');
    s.className = 'sg-stamp sg-stamp-drop';
    s.style.cssText = `left:${10 + Math.random() * 70}vw;top:32vh;font-size:var(--fs-xl);`;
    s.textContent = 'SAH!';
    document.body.appendChild(s);
    window.setTimeout(() => s.remove(), 1600);
    toast('Stempel SAH jatuh dari langit.');
  });
}

/* ---------- Toggle gerak ---------- */
function initMotionToggle(): void {
  const btn = $('#sg-motion-toggle');
  if (!btn) return;
  const apply = (on: boolean) => {
    document.documentElement.dataset.motion = on ? 'on' : 'off';
    btn.setAttribute('aria-pressed', String(on));
    btn.textContent = on ? 'Gerak: nyala' : 'Gerak: mati';
    try { localStorage.setItem('shareguard.motion', on ? 'on' : 'off'); } catch { /* diam */ }
  };
  let on = true;
  try { on = localStorage.getItem('shareguard.motion') !== 'off'; } catch { /* diam */ }
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) on = false;
  apply(on);
  btn.addEventListener('click', () => apply(document.documentElement.dataset.motion !== 'on'));
}

export function initApp(): void {
  initSplit();
  initKamus();
  initTracker();
  initPesan();
  initPrivasi();
  initEasterEgg();
  initMotionToggle();
  initTilt(document);
}
