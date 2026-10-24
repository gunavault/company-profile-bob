import { Poppins } from 'next/font/google';
import localFont from 'next/font/local';
import { getSettings } from '@/lib/data';
import { SETTING_DEFAULTS } from '@/lib/settings-schema';
import { siteUrl } from '@/lib/utils';
import './globals.css';

const poppins = Poppins({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'], variable: '--font-body', display: 'swap' });
const tanker = localFont({ src: '../public/fonts/tanker.woff2', variable: '--font-display', display: 'swap' });

export async function generateMetadata() {
  const s = await getSettings().catch(() => SETTING_DEFAULTS);
  return {
    metadataBase: new URL(siteUrl()),
    title: { default: s.seo_title, template: `%s | ${s.company_name}` },
    description: s.seo_description,
    keywords: s.seo_keywords,
    openGraph: { type: 'website', locale: 'id_ID', siteName: s.company_name, images: [s.og_image] },
    icons: { icon: '/images/logo.svg' },
  };
}

export const viewport = { themeColor: '#000000' };

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={`${poppins.variable} ${tanker.variable}`}>
      <body>{children}</body>
    </html>
  );
}
