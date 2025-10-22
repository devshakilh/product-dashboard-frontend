'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from '@/features/ui';
import { BarChart3, LogOut, Package, User } from 'lucide-react';
import { useDispatch } from 'react-redux';

import { useAuth } from '@/lib/hooks/useAuth';
import { useLogoutMutation } from '@/lib/store/api/authApi';
import { logout as logoutAction } from '@/lib/store/slices/authSlice';
import { cn } from '@/lib/utils';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const dispatch = useDispatch();
  const pathname = usePathname();
  const { user } = useAuth();
  const [logout, { isLoading }] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      dispatch(logoutAction());
      router.push('/login');
    } catch {
      // Force logout even if API call fails
      dispatch(logoutAction());
      router.push('/login');
    }
  };

  const navItems = [
    {
      href: '/dashboard/products',
      label: 'Products',
      icon: Package,
    },
    {
      href: '/dashboard/analytics',
      label: 'Analytics',
      icon: BarChart3,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-50 border-b bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-8">
              <h1 className="text-xl font-bold text-gray-900">
                Product Dashboard
              </h1>
              <nav className="hidden space-x-4 md:flex">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        'flex items-center space-x-2 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                        pathname === item.href
                          ? 'bg-blue-50 text-blue-700'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      )}
                    >
                      <Icon className="size-4" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div className="flex items-center space-x-4">
              {user && (
                <div className="hidden items-center space-x-2 text-sm text-gray-600 md:flex">
                  <User className="size-4" />
                  <span>{user.email}</span>
                </div>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                disabled={isLoading}
                className="flex items-center space-x-2 text-red-600 hover:bg-red-50 hover:text-red-700"
              >
                <LogOut className="size-4" />
                <span>{isLoading ? 'Logging out...' : 'Logout'}</span>
              </Button>
            </div>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}
