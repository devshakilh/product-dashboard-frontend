'use client';

import { SessionProvider } from 'next-auth/react';

import StoreProvider from '@/lib/providers/StoreProvider';

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <StoreProvider>{children}</StoreProvider>
    </SessionProvider>
  );
};

export default Providers;
