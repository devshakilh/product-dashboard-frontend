'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useDispatch } from 'react-redux';

import { useVerifyTokenQuery } from '@/lib/store/api/authApi';
import { logout, setCredentials } from '@/lib/store/slices/authSlice';

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const [isChecking, setIsChecking] = useState(true);

  const isProtectedRoute =
    pathname.startsWith('/dashboard/products') ||
    pathname.startsWith('/dashboard/analytics');
  const isAuthPage = pathname.startsWith('/login');

  const { data, error, isLoading, isError } = useVerifyTokenQuery(undefined, {
    skip: isAuthPage || pathname === '/',
  });

  useEffect(() => {
    if (isAuthPage || pathname === '/') {
      setIsChecking(false);
      return;
    }

    if (isLoading) {
      return;
    }

    if (isError || error) {
      dispatch(logout());
      setIsChecking(false);
      return;
    }

    if (data?.user) {
      dispatch(setCredentials(data.user));
      setIsChecking(false);
      return;
    }

    setIsChecking(false);
  }, [
    data,
    error,
    isError,
    isLoading,
    dispatch,
    isProtectedRoute,
    isAuthPage,
    pathname,
  ]);

  if (isChecking && isProtectedRoute) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="mx-auto size-12 animate-spin rounded-full border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Verifying authentication...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
