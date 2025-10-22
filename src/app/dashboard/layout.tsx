import { Metadata } from 'next';
import { Footer } from '@/features/ui/layouts';
import DashboardLayout from '@/features/ui/layouts/dashboard-layouts/dashboard-sidebar.component';

import Providers from '@/lib/providers';

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
    <Providers>
      <html lang="en" className="scroll-smooth" suppressHydrationWarning>
        <body suppressHydrationWarning className="overflow-x-hidden">
          <DashboardLayout>{children}</DashboardLayout>
          <Footer />
        </body>
      </html>
    </Providers>
  );
}
