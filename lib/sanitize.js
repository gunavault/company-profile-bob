import sanitizeHtml from 'sanitize-html';

// Konten rich text dari CMS disaring sebelum disimpan & ditampilkan.
export function cleanHtml(html) {
  return sanitizeHtml(String(html || ''), {
    allowedTags: ['p', 'br', 'strong', 'b', 'em', 'i', 'u', 'h2', 'h3', 'h4', 'ul', 'ol', 'li', 'a', 'blockquote', 'img', 'figure', 'figcaption', 'hr'],
    allowedAttributes: { a: ['href', 'target', 'rel'], img: ['src', 'alt'] },
    allowedSchemes: ['http', 'https', 'mailto', 'tel'],
    allowedSchemesByTag: { img: ['http', 'https'] },
    allowProtocolRelative: false,
    transformTags: {
      a: (tagName, attribs) => ({
        tagName,
        attribs: /^https?:/.test(attribs.href || '') ? { ...attribs, target: '_blank', rel: 'noopener noreferrer' } : attribs,
      }),
    },
  });
}
