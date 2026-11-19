import raw from '../data/posts.json';

export type Block =
  | { t: 'p' | 'h2' | 'h3' | 'h4'; text: string; bold?: boolean }
  | { t: 'img'; src: string }
  | { t: 'gallery'; images: string[] }
  | { t: 'ul'; items: string[] };

export type Post = {
  slug: string;
  title: string;
  date: string;
  image: string | null;
  video: string | null;
  description: string;
  blocks: Block[];
};

export const FALLBACK_IMAGE = 'e7733fcd26d248e48e4560db7c5e957a.jpeg';

export const posts = (raw as Post[]).slice().sort((a, b) => +new Date(b.date) - +new Date(a.date));

export const postUrl = (p: Post) => `/post/${p.slug}`;

export const fmtDate = (iso: string, opts: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' }) =>
  new Intl.DateTimeFormat('es-ES', { ...opts, timeZone: 'Europe/Madrid' }).format(new Date(iso));

export const readingTime = (p: Post) => {
  const words = p.blocks.reduce((n, b) => n + ('text' in b ? b.text.split(/\s+/).length : 'items' in b ? b.items.join(' ').split(/\s+/).length : 0), 0);
  return Math.max(1, Math.round(words / 200));
};
