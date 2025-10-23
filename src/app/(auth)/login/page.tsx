import { Suspense } from 'react';
import { Metadata } from 'next';
import { Login } from '@/features/auth/login';
import ConnectionMonitor from '@/features/ui/error-pages/connection-monitor.component';

export const metadata: Metadata = {
  title: 'User | Login',
};

const LoginPage = () => {
  return (
    <Suspense fallback={<div className="h-screen">Loading...</div>}>
      <ConnectionMonitor>
        <Login />
      </ConnectionMonitor>
    </Suspense>
  );
};

export default LoginPage;
