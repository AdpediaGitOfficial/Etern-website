/**
 * Inline SVG icon set.
 *
 * Every icon is a 24×24 stroke drawing (or an explicitly filled path) so the
 * pages carry their own artwork — no icon font, no icon library, no network
 * request. `icon(name)` returns markup ready to drop into a template.
 */

const STROKE = 'fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"';
const FILL = 'fill="currentColor" stroke="none"';

/** name -> [innerMarkup, isFilled] */
const PATHS = {
  "arrow-right": '<path d="M5 12h14"/><path d="M13 6l6 6-6 6"/>',
  "arrow-left": '<path d="M19 12H5"/><path d="M11 18l-6-6 6-6"/>',
  "arrow-up-right": '<path d="M7 17L17 7"/><path d="M8 7h9v9"/>',
  "chevron-down": '<path d="M6 9l6 6 6-6"/>',
  menu: '<path d="M4 6h16"/><path d="M4 12h16"/><path d="M4 18h16"/>',
  x: '<path d="M6 6l12 12"/><path d="M18 6L6 18"/>',
  check: '<path d="M20 6L9 17l-5-5"/>',
  play: ['<path d="M7 4.5v15l12-7.5z"/>', true],
  "play-circle": '<circle cx="12" cy="12" r="9.5"/><path d="M10 8.5l6 3.5-6 3.5z"/>',
  star: ['<path d="M12 2.5l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5-5.8-3-5.8 3 1.1-6.5L2.6 9.3l6.5-.9z"/>', true],
  quote: ['<path d="M4 7h7v6.5A5.5 5.5 0 0 1 5.5 19v-2.4A3 3 0 0 0 8.5 14H4z"/><path d="M13 7h7v6.5a5.5 5.5 0 0 1-5.5 5.5v-2.4a3 3 0 0 0 3-2.6H13z"/>', true],
  "calendar-days": '<rect x="3" y="4.5" width="18" height="17" rx="2.5"/><path d="M8 2.5v4"/><path d="M16 2.5v4"/><path d="M3 10h18"/>',
  "calendar-check": '<rect x="3" y="4.5" width="18" height="17" rx="2.5"/><path d="M8 2.5v4"/><path d="M16 2.5v4"/><path d="M3 10h18"/><path d="M9 15.5l2 2 4-4"/>',
  "calendar-plus": '<rect x="3" y="4.5" width="18" height="17" rx="2.5"/><path d="M8 2.5v4"/><path d="M16 2.5v4"/><path d="M3 10h18"/><path d="M12 13.5v5"/><path d="M9.5 16h5"/>',
  search: '<circle cx="11" cy="11" r="7.5"/><path d="M21 21l-4.4-4.4"/>',
  sliders: '<path d="M4 21v-6"/><path d="M4 11V3"/><path d="M12 21v-9"/><path d="M12 8V3"/><path d="M20 21v-4"/><path d="M20 13V3"/><path d="M1.5 15h5"/><path d="M9.5 8h5"/><path d="M17.5 17h5"/>',
  lightbulb: '<path d="M9 18h6"/><path d="M10 21.5h4"/><path d="M12 2.5a7 7 0 0 0-4 12.8V18h8v-2.7A7 7 0 0 0 12 2.5z"/>',
  users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.9"/><path d="M16 3.1a4 4 0 0 1 0 7.8"/>',
  "shield-check": '<path d="M12 21.5s8-3.8 8-9.5V5.2L12 2.5 4 5.2V12c0 5.7 8 9.5 8 9.5z"/><path d="M9 11.8l2.2 2.2 4-4"/>',
  "bar-chart": '<path d="M12 20V9.5"/><path d="M18 20V4"/><path d="M6 20v-5"/>',
  heart: '<path d="M20.6 5a5.2 5.2 0 0 0-7.4 0L12 6.2 10.8 5A5.2 5.2 0 0 0 3.4 12.4l1.2 1.2L12 21l7.4-7.4 1.2-1.2A5.2 5.2 0 0 0 20.6 5z"/>',
  "target-dot": '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="3.4" fill="currentColor" stroke="none"/>',
  shapes: '<circle cx="7.5" cy="7.5" r="4.4"/><rect x="12.8" y="12.8" width="8.4" height="8.4" rx="2.2"/><path d="M16.6 3.2l3.9 6.6h-7.8z"/>',
  "letter-a": '<path d="M6.5 19.5L12 4.5l5.5 15"/><path d="M8.6 14.4h6.8"/>',
  cards: '<rect x="3" y="7.5" width="8" height="11" rx="2"/><rect x="13" y="7.5" width="8" height="11" rx="2"/><path d="M7 12.2v2.2M5.9 13.3h2.2"/><path d="M15 13.3h4"/>',
  paw: '<ellipse cx="6.4" cy="10.6" rx="2.1" ry="2.6"/><ellipse cx="17.6" cy="10.6" rx="2.1" ry="2.6"/><ellipse cx="9.9" cy="6.6" rx="2" ry="2.5"/><ellipse cx="14.1" cy="6.6" rx="2" ry="2.5"/><path d="M12 13.2c3.1 0 5.3 2 5.3 4.2 0 1.7-1.4 2.8-3.2 2.6-1.4-.2-2.8-.2-4.2 0-1.8.2-3.2-.9-3.2-2.6 0-2.2 2.2-4.2 5.3-4.2z"/>',
  smile: '<circle cx="12" cy="12" r="9"/><path d="M8.4 14.2a4.4 4.4 0 0 0 7.2 0"/><path d="M9 9.6h.01M15 9.6h.01"/>',
  puzzle: '<path d="M9.6 4.5h4.8v2a1.9 1.9 0 1 0 3.8 0v-2h1.3v4.8h-2a1.9 1.9 0 1 0 0 3.8h2v6.4H14v-2a1.9 1.9 0 1 0-3.8 0v2H4.5v-6.4h2a1.9 1.9 0 1 0 0-3.8h-2V4.5h5.1z"/>',
  seedling: '<path d="M12 20.5v-7.2"/><path d="M12 13.3C12 9.8 9.4 7.2 5.9 7.2c0 3.5 2.6 6.1 6.1 6.1z"/><path d="M12 13.3c0-3.9 2.9-6.8 6.8-6.8 0 3.9-2.9 6.8-6.8 6.8z"/>',
  scissors: '<circle cx="6.4" cy="6.4" r="2.6"/><circle cx="6.4" cy="17.6" r="2.6"/><path d="M8.6 8.2L20 18.4"/><path d="M8.6 15.8L20 5.6"/>',
  "message-heart": '<path d="M20.5 12.4c0 4-3.8 7.2-8.5 7.2-1 0-2-.2-2.9-.4l-5.1 1.8 1.7-4.3a6.8 6.8 0 0 1-1.7-4.3c0-4 3.8-7.2 8-7.2s8.5 3.2 8.5 7z"/><path d="M14.5 10.2c-.7-.8-1.9-.8-2.6 0-.7-.8-1.9-.8-2.6 0-.7.9-.4 2 .3 2.7l2.3 2.2 2.3-2.2c.7-.7 1-1.8.3-2.7z"/>',
  "hand-heart": '<path d="M3.5 13.4l3-1.2a3 3 0 0 1 2.5.2l2.3 1.2h2.4a1.6 1.6 0 0 1 0 3.2h-3"/><path d="M3.5 13.4v6.1l3.7 1a4 4 0 0 0 2.6-.2l7.3-3.2a1.9 1.9 0 0 0-.2-3.5"/><path d="M15.9 3.6c-1-1-2.6-1-3.5 0-1-1-2.6-1-3.5 0-1 1.1-.6 2.7.3 3.6l3.2 3.1 3.2-3.1c1-.9 1.3-2.5.3-3.6z"/>',
  palette: '<path d="M12 2.5a9.5 9.5 0 1 0 0 19 1.9 1.9 0 0 0 1.9-1.9c0-.5-.2-1-.5-1.3a1.9 1.9 0 0 1 1.4-3.2h2.2a4.5 4.5 0 0 0 4.5-4.5c0-4.4-4.3-8.1-9.5-8.1z"/><circle cx="7.5" cy="10.5" r="1.1" fill="currentColor" stroke="none"/><circle cx="12" cy="7.5" r="1.1" fill="currentColor" stroke="none"/><circle cx="16.5" cy="10" r="1.1" fill="currentColor" stroke="none"/>',
  "book-open": '<path d="M12 7.5v13"/><path d="M2.5 4.5H8a4 4 0 0 1 4 4v12a3 3 0 0 0-3-3H2.5z"/><path d="M21.5 4.5H16a4 4 0 0 0-4 4v12a3 3 0 0 1 3-3h6.5z"/>',
  "heart-handshake": '<path d="M20.6 5a5.2 5.2 0 0 0-7.4 0L12 6.2 10.8 5A5.2 5.2 0 0 0 3.4 12.4l1.2 1.2L12 21l7.4-7.4 1.2-1.2A5.2 5.2 0 0 0 20.6 5z"/><path d="M9 11.5l2 2 1.4-1.4 2.1 2.1"/>',
  flame: '<path d="M12 21.5c3.9 0 6.8-2.6 6.8-6.3 0-2.9-1.9-4.9-3.4-7.3C14 5.6 13 3.4 12 2.5c-1 1.9-2 3.1-3.4 5.4C7.1 10.3 5.2 12.3 5.2 15.2c0 3.7 2.9 6.3 6.8 6.3z"/><path d="M12 17.8c1.6 0 2.8-1 2.8-2.5 0-1.5-1.4-2.4-2.8-4-1.4 1.6-2.8 2.5-2.8 4 0 1.5 1.2 2.5 2.8 2.5z"/>',
  "trending-up": '<path d="M3 17l6-6 4 4 8-8"/><path d="M15 7h6v6"/>',
  sparkles: '<path d="M12 3l1.7 4.6L18 9.3l-4.3 1.7L12 15.6l-1.7-4.6L6 9.3l4.3-1.7z"/><path d="M18.5 15l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8z"/>',
  hand: '<path d="M18 11.5V6.2a1.5 1.5 0 0 0-3 0"/><path d="M15 10.5V4.2a1.5 1.5 0 0 0-3 0v6.3"/><path d="M12 10.5V5.2a1.5 1.5 0 0 0-3 0v8.6"/><path d="M9 13.8l-1.4-2a1.7 1.7 0 0 0-2.8 1.9l3 5.1A6 6 0 0 0 18 16v-4.5"/>',
  compass: '<circle cx="12" cy="12" r="9.5"/><path d="M16.2 7.8l-2.1 6.3-6.3 2.1 2.1-6.3z"/>',
  clock: '<circle cx="12" cy="12" r="9.5"/><path d="M12 6.5V12l3.5 2"/>',
  eye: '<path d="M2 12s3.6-6.8 10-6.8S22 12 22 12s-3.6 6.8-10 6.8S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
  phone: '<path d="M21.8 16.9v2.8a2 2 0 0 1-2.2 2 19.6 19.6 0 0 1-8.5-3 19.3 19.3 0 0 1-6-6 19.6 19.6 0 0 1-3-8.6 2 2 0 0 1 2-2.2h2.8a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.7a16 16 0 0 0 6.3 6.3l1.2-1.1a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/>',
  mail: '<rect x="2.5" y="4.5" width="19" height="15" rx="2.5"/><path d="M3 7l9 5.5L21 7"/>',
  "map-pin": '<path d="M19.5 10.5c0 5.6-7.5 11-7.5 11s-7.5-5.4-7.5-11a7.5 7.5 0 0 1 15 0z"/><circle cx="12" cy="10.3" r="2.8"/>',
  instagram: '<rect x="2.5" y="2.5" width="19" height="19" rx="5.5"/><circle cx="12" cy="12" r="4"/><circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none"/>',
  facebook: '<path d="M17.5 2.5H15A5 5 0 0 0 10 7.5V10H7v4h3v7.5h4V14h3l1-4h-4V7.5a1 1 0 0 1 1-1h2.5z"/>',
  linkedin: '<path d="M16 8.5a5.5 5.5 0 0 1 5.5 5.5v7h-4v-7a1.5 1.5 0 0 0-3 0v7h-4V9h4v1.4A5.4 5.4 0 0 1 16 8.5z"/><rect x="2.5" y="9" width="4" height="12"/><circle cx="4.5" cy="4.5" r="2"/>',
  youtube: '<path d="M22.3 7.6a3 3 0 0 0-2.1-2.1C18.4 5 12 5 12 5s-6.4 0-8.2.5a3 3 0 0 0-2.1 2.1A30 30 0 0 0 1.2 12a30 30 0 0 0 .5 4.4 3 3 0 0 0 2.1 2.1C5.6 19 12 19 12 19s6.4 0 8.2-.5a3 3 0 0 0 2.1-2.1 30 30 0 0 0 .5-4.4 30 30 0 0 0-.5-4.4z"/><path d="M10.2 15.1V8.9l5.3 3.1z"/>',
  share: '<circle cx="18" cy="5.5" r="2.8"/><circle cx="6" cy="12" r="2.8"/><circle cx="18" cy="18.5" r="2.8"/><path d="M8.5 13.4l7 3.8"/><path d="M15.5 6.8l-7 3.8"/>',
  download: '<path d="M12 3.5v12"/><path d="M7 11l5 5 5-5"/><path d="M4 20.5h16"/>',
  globe: '<circle cx="12" cy="12" r="9.5"/><path d="M2.6 12h18.8"/><path d="M12 2.5a15 15 0 0 1 0 19"/><path d="M12 2.5a15 15 0 0 0 0 19"/>',
  "party-popper": '<path d="M4.5 20.5l3-11 8.5 8.5z"/><path d="M15 3.5l.9 2.1 2.1.9-2.1.9-.9 2.1-.9-2.1-2.1-.9 2.1-.9z"/><path d="M20.5 13.5h.01"/><path d="M19.5 19.5h.01"/><path d="M9.5 3.5h.01"/>',
  puzzle: '<path d="M9.5 3.8a2.2 2.2 0 0 1 4.4 0V5H17a1 1 0 0 1 1 1v3.1h1.2a2.2 2.2 0 0 1 0 4.4H18V17a1 1 0 0 1-1 1h-3.1v1.2a2.2 2.2 0 0 1-4.4 0V18H6a1 1 0 0 1-1-1v-3.5H3.8a2.2 2.2 0 0 1 0-4.4H5V6a1 1 0 0 1 1-1h3.5z"/>',
  blocks: '<rect x="3" y="3" width="7.5" height="7.5" rx="1.5"/><rect x="13.5" y="3" width="7.5" height="7.5" rx="1.5"/><rect x="3" y="13.5" width="7.5" height="7.5" rx="1.5"/><rect x="13.5" y="13.5" width="7.5" height="7.5" rx="1.5"/>',
  music: '<path d="M9 17.5V4.8l12-2v12.7"/><circle cx="6" cy="17.5" r="3"/><circle cx="18" cy="15.5" r="3"/>',
};

/**
 * @param {string} name  key from PATHS
 * @param {{class?: string, size?: number}} [opts]
 */
export function icon(name, opts = {}) {
  const entry = PATHS[name];
  if (!entry) throw new Error(`Unknown icon: ${name}`);
  const [inner, filled] = Array.isArray(entry) ? entry : [entry, false];
  const cls = opts.class ? ` class="${opts.class}"` : "";
  const size = opts.size ?? 24;
  return `<svg${cls} width="${size}" height="${size}" viewBox="0 0 24 24" ${filled ? FILL : STROKE} aria-hidden="true" focusable="false">${inner}</svg>`;
}


/**
 * Multi-colour brand marks.
 *
 * These are not part of the stroke icon set: store badges have to show the
 * platform's own mark, so they keep their own geometry and their own colours
 * rather than inheriting `currentColor`.
 */
const MARKS = {
  apple: `<path fill="currentColor" d="M17.02 12.53c-.02-2.2 1.79-3.26 1.87-3.31-1.02-1.49-2.6-1.7-3.16-1.72-1.35-.14-2.63.79-3.31.79-.68 0-1.74-.77-2.86-.75-1.47.02-2.83.85-3.58 2.16-1.53 2.65-.39 6.57 1.1 8.72.73 1.05 1.6 2.23 2.73 2.19 1.1-.04 1.51-.71 2.83-.71 1.32 0 1.7.71 2.86.69 1.18-.02 1.93-1.07 2.65-2.13.83-1.22 1.18-2.4 1.2-2.46-.03-.01-2.3-.88-2.33-3.47z"/><path fill="currentColor" d="M14.85 5.87c.6-.73 1.01-1.75.9-2.77-.87.04-1.93.58-2.55 1.31-.55.64-1.04 1.68-.91 2.68.97.07 1.96-.5 2.56-1.22z"/>`,
  "google-play": `<path fill="#00a0ff" d="M3.4 1.9 13.6 12 3.4 22.1a1.6 1.6 0 0 1-.4-1.1V3a1.6 1.6 0 0 1 .4-1.1z"/><path fill="#00d95f" d="M3.4 1.9c.3-.3.9-.3 1.4 0l12.1 7.93L13.6 12z"/><path fill="#ff3a44" d="M3.4 22.1 13.6 12l3.3 2.17-12.1 7.93c-.5.3-1.1.3-1.4 0z"/><path fill="#ffbc00" d="m16.9 9.83 3.3 2.17-3.3 2.17L13.6 12z"/>`,
};

/**
 * @param {string} name  key from MARKS
 * @param {{class?: string, size?: number}} [opts]
 */
export function brandMark(name, opts = {}) {
  const inner = MARKS[name];
  if (!inner) throw new Error(`Unknown brand mark: ${name}`);
  const cls = opts.class ? ` class="${opts.class}"` : "";
  const size = opts.size ?? 24;
  return `<svg${cls} width="${size}" height="${size}" viewBox="0 0 24 24" aria-hidden="true" focusable="false">${inner}</svg>`;
}
