/* SyaratShareGuard — lapisan gerak (dimuat dinamis, desktop saja).
   A: zoom-through kata raksasa jadi pintu · B: marquee skew by velocity ·
   E: curtain wipe via IntersectionObserver. C (textPath) & D (tilt) di CSS/sg-app.
   Toolkit: Motion One (`motion`), sudah termasuk di template. */

function detectLite(): boolean {
  const nav = navigator as Navigator & { deviceMemory?: number };
  if (typeof nav.hardwareConcurrency === 'number' && nav.hardwareConcurrency <= 4) return true;
  if (typeof nav.deviceMemory === 'number' && nav.deviceMemory <= 4) return true;
  if ((navigator as unknown as { connection?: { saveData?: boolean } }).connection?.saveData) return true;
  return false;
}

async function fpsLow(): Promise<boolean> {
  return new Promise((resolve) => {
    let frames = 0;
    const t0 = performance.now();
    const loop = () => {
      frames++;
      if (performance.now() - t0 < 2000) requestAnimationFrame(loop);
      else resolve(frames / 2 < 40);
    };
    requestAnimationFrame(loop);
  });
}

export async function initMotion(): Promise<void> {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (!window.matchMedia('(min-width: 1024px)').matches) return;
  if (document.documentElement.dataset.motion === 'off') return;

  /* E: curtain wipe — ringan, jalan di semua mode.
     PENTING: JANGAN taruh clip-path di elemen yang diobserve IO —
     clip-path membuat IO melaporkannya "tak terlihat" selamanya.
     Yang diobserve = section (tanpa clip); yang di-clip = inner [data-wipe]. */
  const wipeEls = Array.from(document.querySelectorAll<HTMLElement>('[data-wipe]'));
  // Tandai lite secepatnya (sync) agar reveal bisa instan
  if (detectLite()) document.documentElement.dataset.lite = 'on';
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          en.target.querySelectorAll<HTMLElement>('[data-wipe]').forEach((w) => {
            w.classList.add('sg-wipe-in');
            if (document.documentElement.dataset.lite === 'on') w.classList.add('sg-wipe-instant');
          });
          io.unobserve(en.target);
        }
      });
    },
    { threshold: 0.08 },
  );
  const seen = new Set<Element>();
  wipeEls.forEach((el) => {
    el.classList.add('sg-wipe-hidden');
    const section = el.closest('section') || el.parentElement;
    if (section && !seen.has(section)) {
      seen.add(section);
      io.observe(section);
    }
  });

  const lite = document.documentElement.dataset.lite === 'on' || (await fpsLow());
  if (lite) {
    document.documentElement.dataset.lite = 'on';
    return; // MODE RINGAN: A & skew dimatikan, wipe sudah instan
  }

  try {
    const { animate, scroll } = await import('motion');

    /* A: zoom-through — kata SYARAT jadi pintu (scrub, pin via CSS sticky tak perlu) */
    const gate = document.querySelector<HTMLElement>('#sg-gate');
    const word = document.querySelector<HTMLElement>('#sg-gate-word');
    if (gate && word) {
      const controls = animate(word, { scale: [1, 9], opacity: [1, 0.9] }, { ease: 'easeIn' });
      scroll(controls, { target: gate, offset: ['start start', 'end end'] });
    }

    /* B: marquee skew mengikuti scroll velocity (di parent, bukan track) */
    const marquees = Array.from(document.querySelectorAll<HTMLElement>('.sg-marquee'));
    let skew = 0;
    let raf = 0;
    const decay = () => {
      skew *= 0.9;
      if (Math.abs(skew) < 0.05) { skew = 0; raf = 0; }
      else raf = requestAnimationFrame(decay);
      marquees.forEach((m) => (m.style.transform = `skewX(${skew.toFixed(2)}deg)`));
    };
    scroll((info) => {
      const target = Math.max(-12, Math.min(12, info.y.velocity / -400));
      if (Math.abs(target) > Math.abs(skew)) {
        skew = target;
        marquees.forEach((m) => (m.style.transform = `skewX(${skew.toFixed(2)}deg)`));
        if (!raf) raf = requestAnimationFrame(decay);
      }
    });
  } catch {
    /* Motion gagal dimuat — halaman tetap utuh. Diam. */
  }
}
