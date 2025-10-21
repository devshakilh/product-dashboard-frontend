'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import ConnectionLost from '@/features/ui/error-pages/connection-lost.component';

interface ConnectionMonitorProps {
  children: React.ReactNode;
}

const ConnectionMonitor: React.FC<ConnectionMonitorProps> = ({ children }) => {
  const [isOnline, setIsOnline] = useState<boolean>(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsOnline(navigator.onLine); // Set initial online status

      const handleOnline = () => setIsOnline(true);
      const handleOffline = () => setIsOnline(false);

      window.addEventListener('online', handleOnline);
      window.addEventListener('offline', handleOffline);

      return () => {
        window.removeEventListener('online', handleOnline);
        window.removeEventListener('offline', handleOffline);
      };
    }
  }, []);

  const pathname = usePathname();

  // Define the routes where the "Connection Lost" page should be shown
  const protectedRoutes = ['/login', '/dashboard'];
  const basePath = `/${pathname.split('/').slice(2).join('/')}` || '/';

  // Show the "Connection Lost" page only if the user is on a protected route and offline
  if (!isOnline && protectedRoutes.includes(basePath)) {
    return <ConnectionLost />;
  }

  return <>{children}</>;
};

export default ConnectionMonitor;
