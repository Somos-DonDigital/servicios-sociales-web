import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
(window as any).__gsapReady = true;

const root = document.documentElement;
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- Cabecera ---------- */
const header = document.querySelector<HTMLElement>('[data-header]');
const onScroll = () => header?.classList.toggle('is-scrolled', window.scrollY > 40);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

/* ---------- Submenús (teclado / táctil) ---------- */
document.querySelectorAll<HTMLButtonElement>('[data-sub-toggle]').forEach((btn) => {
  const li = btn.parentElement!;
  btn.addEventListener('click', () => {
    const open = !li.classList.contains('is-open');
    document.querySelectorAll('.has-sub.is-open').forEach((o) => {
      o.classList.remove('is-open');
      o.querySelector('[data-sub-toggle]')?.setAttribute('aria-expanded', 'false');
    });
    li.classList.toggle('is-open', open);
    btn.setAttribute('aria-expanded', String(open));
  });
});
document.addEventListener('click', (e) => {
  if (!(e.target as HTMLElement).closest('.has-sub')) {
    document.querySelectorAll('.has-sub.is-open').forEach((o) => {
      o.classList.remove('is-open');
      o.querySelector('[data-sub-toggle]')?.setAttribute('aria-expanded', 'false');
    });
  }
});

/* ---------- Menú móvil ---------- */
const burger = document.querySelector<HTMLButtonElement>('[data-burger]');
const mnav = document.querySelector<HTMLElement>('[data-mnav]');
if (burger && mnav) {
  const items = mnav.querySelectorAll('[data-mnav-item]');
  const close = () => {
    burger.setAttribute('aria-expanded', 'false');
    gsap.to(mnav, {
      clipPath: 'circle(0% at calc(100% - 44px) 44px)', duration: reduce ? 0 : 0.55, ease: 'power3.inOut',
      onComplete: () => { mnav.hidden = true; document.body.classList.remove('menu-open'); },
    });
  };
  const open = () => {
    mnav.hidden = false;
    document.body.classList.add('menu-open');
    burger.setAttribute('aria-expanded', 'true');
    gsap.fromTo(mnav, { clipPath: 'circle(0% at calc(100% - 44px) 44px)' }, { clipPath: 'circle(150% at calc(100% - 44px) 44px)', duration: reduce ? 0 : 0.75, ease: 'power3.inOut' });
    if (!reduce) gsap.fromTo(items, { y: 30, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.05, duration: 0.6, delay: 0.25, ease: 'power3.out' });
  };
  burger.addEventListener('click', () => (burger.getAttribute('aria-expanded') === 'true' ? close() : open()));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !mnav.hidden) { close(); burger.focus(); } });
  window.matchMedia('(min-width: 1081px)').addEventListener('change', (m) => { if (m.matches && !mnav.hidden) close(); });
}

/* ---------- Titulares por palabras ---------- */
function splitWords(el: HTMLElement) {
  if (el.dataset.splitDone) return [];
  el.dataset.splitDone = '1';
  el.setAttribute('aria-label', el.textContent?.trim() ?? '');
  const words = (el.textContent ?? '').trim().split(/\s+/);
  el.innerHTML = words.map((w) => `<span class="w" aria-hidden="true"><span class="wi">${w}</span></span>`).join(' ');
  return Array.from(el.querySelectorAll<HTMLElement>('.wi'));
}

const mm = gsap.matchMedia();
mm.add({ motion: '(prefers-reduced-motion: no-preference)' }, () => {
  // Titulares
  document.querySelectorAll<HTMLElement>('[data-split]').forEach((el) => {
    const inner = splitWords(el);
    gsap.from(inner, {
      yPercent: 110, rotate: 3, duration: 1.05, ease: 'power4.out', stagger: 0.045,
      scrollTrigger: { trigger: el, start: 'top 90%', once: true },
    });
  });

  // Apariciones
  ScrollTrigger.batch('[data-reveal]', {
    start: 'top 88%', once: true,
    onEnter: (els) => gsap.to(els, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.08, overwrite: true }),
  });

  // Grupos escalonados
  document.querySelectorAll<HTMLElement>('[data-stagger]').forEach((g) => {
    gsap.from(g.children, {
      y: 36, opacity: 0, duration: 0.85, ease: 'power3.out', stagger: 0.09,
      scrollTrigger: { trigger: g, start: 'top 86%', once: true },
    });
  });

  // Imágenes con cortinilla
  document.querySelectorAll<HTMLElement>('[data-reveal-img]').forEach((el) => {
    gsap.to(el, {
      clipPath: 'inset(0 0 0% 0)', duration: 1.3, ease: 'power4.inOut',
      scrollTrigger: { trigger: el, start: 'top 88%', once: true },
    });
    const inner = el.querySelector('img');
    if (inner) gsap.from(inner, { scale: 1.18, duration: 1.8, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 88%', once: true } });
  });

  // Parallax suave
  document.querySelectorAll<HTMLElement>('[data-parallax]').forEach((el) => {
    gsap.fromTo(el, { yPercent: -5 }, {
      yPercent: 5, ease: 'none',
      scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true },
    });
  });

  // Portada
  const hero = document.querySelector<HTMLElement>('[data-hero]');
  if (hero) {
    const bg = hero.querySelector('[data-hero-bg]');
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
    tl.from(bg, { scale: 1.2, duration: 2.2, ease: 'power2.out' }, 0)
      .from(hero.querySelectorAll('[data-hero-in]'), { y: 40, opacity: 0, duration: 1, stagger: 0.12 }, 0.5);
    gsap.to(bg, { yPercent: 14, ease: 'none', scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true } });
  }

  // Contadores
  document.querySelectorAll<HTMLElement>('[data-count]').forEach((el) => {
    const end = Number(el.dataset.count);
    const o = { v: 0 };
    gsap.to(o, {
      v: end, duration: 1.6, ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 90%', once: true },
      onUpdate: () => (el.textContent = Math.round(o.v).toLocaleString('es-ES')),
    });
  });

  return () => {};
});

mm.add({ reduce: '(prefers-reduced-motion: reduce)' }, () => {
  gsap.set('[data-reveal]', { opacity: 1, y: 0 });
  gsap.set('[data-reveal-img]', { clipPath: 'none' });
});

window.addEventListener('load', () => ScrollTrigger.refresh());

/* ---------- Galería con visor ---------- */
const dialog = document.querySelector<HTMLDialogElement>('[data-lightbox]');
if (dialog) {
  const imgEl = dialog.querySelector<HTMLImageElement>('img')!;
  const counter = dialog.querySelector<HTMLElement>('[data-lb-count]')!;
  let list: HTMLAnchorElement[] = [];
  let idx = 0;
  const show = (i: number) => {
    idx = (i + list.length) % list.length;
    const a = list[idx];
    imgEl.src = a.href;
    imgEl.alt = a.querySelector('img')?.alt ?? '';
    counter.textContent = `${idx + 1} / ${list.length}`;
    if (!reduce) gsap.fromTo(imgEl, { opacity: 0, scale: 0.97 }, { opacity: 1, scale: 1, duration: 0.45, ease: 'power3.out' });
  };
  document.querySelectorAll<HTMLElement>('[data-gallery]').forEach((g) => {
    const links = Array.from(g.querySelectorAll<HTMLAnchorElement>('a'));
    links.forEach((a, i) => a.addEventListener('click', (e) => {
      e.preventDefault(); list = links; dialog.showModal(); show(i);
    }));
  });
  dialog.querySelector('[data-lb-prev]')?.addEventListener('click', () => show(idx - 1));
  dialog.querySelector('[data-lb-next]')?.addEventListener('click', () => show(idx + 1));
  dialog.querySelector('[data-lb-close]')?.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (e) => { if (e.target === dialog) dialog.close(); });
  dialog.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') show(idx + 1);
    if (e.key === 'ArrowLeft') show(idx - 1);
  });
}

/* ---------- Vídeo de YouTube bajo demanda ---------- */
document.querySelectorAll<HTMLButtonElement>('[data-yt]').forEach((b) => {
  b.addEventListener('click', () => {
    const id = b.dataset.yt;
    const f = document.createElement('iframe');
    f.src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`;
    f.title = b.getAttribute('aria-label') ?? 'Vídeo';
    f.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
    f.allowFullscreen = true;
    b.replaceWith(f);
  });
});

root.classList.add('is-ready');
