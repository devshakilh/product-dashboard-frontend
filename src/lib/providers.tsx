'use client';

import store from '@/redux/store';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { SessionProvider } from 'next-auth/react';
import { Provider } from 'react-redux';

import QueryProvider from '@/lib/providers/query-provider';

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <QueryProvider>
        <Provider store={store}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            {children}
          </LocalizationProvider>
        </Provider>
      </QueryProvider>
    </SessionProvider>
  );
};

export default Providers;
