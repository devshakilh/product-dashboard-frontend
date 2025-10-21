import { Metadata } from 'next';
import { Noto_Serif, Roboto } from 'next/font/google';
import Script from 'next/script';
import ConnectionMonitor from '@/features/ui/error-pages/connection-monitor.component';

import { plusJakartaSans } from '@/lib/fonts';
import Providers from '@/lib/providers';

import './globals.css';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-roboto',
});

const notoSerif = Noto_Serif({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-noto-serif',
});

export const metadata: Metadata = {
  title: 'Pulisync',
  description: 'School Management System',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${roboto.variable} ${notoSerif.variable} scroll-smooth`}
    >
      <head>
        {/* Google Tag Manager */}
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-PWCWR2NX');
          `}
        </Script>
        {/* End Google Tag Manager */}
      </head>
      <body className="font-plus-jakarta">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-PWCWR2NX"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <Providers>
          <ConnectionMonitor>{children}</ConnectionMonitor>
        </Providers>
      </body>
    </html>
  );
}
