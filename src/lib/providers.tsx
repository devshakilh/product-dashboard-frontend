'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';

import { useVerifyTokenQuery } from '@/lib/store/api/authApi';
import { logout, setCredentials } from '@/lib/store/slices/authSlice';

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();
  const [isChecking, setIsChecking] = useState(true);

  const isProtectedRoute =
    pathname.startsWith('/dashboard/products') ||
    pathname.startsWith('/dashboard/analytics');
  const isAuthPage = pathname.startsWith('/login');

  const { data, error, isLoading } = useVerifyTokenQuery(undefined, {
    skip: isAuthPage,
  });

  useEffect(() => {
    if (isAuthPage) {
      setIsChecking(false);
      return;
    }

    if (isLoading) {
      return;
    }

    if (error) {
      // Token is invalid or expired
      dispatch(logout());
      if (isProtectedRoute) {
        router.push('/login');
      }
      setIsChecking(false);
      return;
    }

    if (data) {
      // Token is valid
      dispatch(setCredentials(data.user));
      setIsChecking(false);
    }
  }, [data, error, isLoading, dispatch, router, isProtectedRoute, isAuthPage]);

  // Show loading screen while checking auth
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
