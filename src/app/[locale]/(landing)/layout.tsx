import type { Metadata } from 'next';
import { Footer, Navbar } from '@/features/ui/layouts';
import { Toaster } from 'react-hot-toast';

import Providers from '@/lib/providers';

export const metadata: Metadata = {
  title: 'PuliSync',
  description: 'Role-based dashboard system',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <html lang="en" className="scroll-smooth" suppressHydrationWarning>
        <head>
          <link
            rel="icon"
            href="https://i.ibb.co.com/zxmB260/pulisync-fav-64.png"
          />
          {/* You can also add other icons for different devices */}
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/logos/pulisync_fav-16.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/logos/pulisync_fav-32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/logos/pulisync_fav-16.png"
          />
          {/* <link rel="manifest" href="/site.webmanifest" /> */}
        </head>

        <body suppressHydrationWarning className="overflow-x-hidden">
          <Toaster position="top-right" />
          <Navbar />

          {children}
          <Footer />
        </body>
      </html>
    </Providers>
  );
}
