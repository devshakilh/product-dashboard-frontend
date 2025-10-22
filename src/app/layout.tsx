import { Metadata } from 'next';
import { Noto_Serif, Roboto } from 'next/font/google';
import { Toaster } from '@/features/ui';

import { plusJakartaSans } from '@/lib/fonts';
import StoreProvider from '@/lib/providers/StoreProvider';

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
  title: 'Product Management Dashboard',

  description: 'Real-time product management system',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${plusJakartaSans.variable} ${roboto.variable} ${notoSerif.variable} scroll-smooth`}
      >
        <StoreProvider>
          {children} <Toaster />
        </StoreProvider>
      </body>
    </html>
  );
}
