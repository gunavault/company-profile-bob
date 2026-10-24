export function slugify(text) {
  return String(text || '')
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80) || 'item';
}

export function waNumber(raw) {
  let n = String(raw || '').replace(/\D/g, '');
  if (n.startsWith('0')) n = '62' + n.slice(1);
  return n;
}

export function waLink(number, message = '') {
  const q = message ? `?text=${encodeURIComponent(message)}` : '';
  return `https://wa.me/${waNumber(number)}${q}`;
}

export function mapEmbed(lat, lng, zoom = 15) {
  if (lat === null || lat === undefined || lat === '' || lng === null || lng === undefined || lng === '') return null;
  return `https://maps.google.com/maps?q=${Number(lat)},${Number(lng)}&z=${zoom}&hl=id&output=embed`;
}

export function mapLink(lat, lng) {
  return `https://www.google.com/maps/search/?api=1&query=${Number(lat)},${Number(lng)}`;
}

export function formatDate(value) {
  if (!value) return '';
  const d = new Date(String(value).replace(' ', 'T') + (String(value).includes('Z') ? '' : 'Z'));
  if (Number.isNaN(d.getTime())) return '';
  return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Asia/Jakarta' });
}

export function lines(text) {
  return String(text || '')
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean);
}

export function siteUrl() {
  return (process.env.SITE_URL || 'https://grccetak.id').replace(/\/$/, '');
}

export function stripTags(html) {
  return String(html || '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}
