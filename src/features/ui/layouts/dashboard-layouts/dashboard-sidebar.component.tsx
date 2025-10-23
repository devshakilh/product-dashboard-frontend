'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from '@/features/ui/atoms';
import { BarChart3, LogOut, Menu, Package, User, X } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';

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
  const [logout, { isLoading: isLoggingOut }] = useLogoutMutation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    toast.loading('Logging out...', { id: 'logout-toast' });
    try {
      await logout().unwrap();
      toast.success('Logged out successfully', { id: 'logout-toast' });
    } catch {
      toast.error('Failed to log out. Please try again.', {
        id: 'logout-toast',
      });
    } finally {
      dispatch(logoutAction());
      router.push('/login');
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navItems = [
    { href: '/dashboard/products', label: 'Products', icon: Package },
    { href: '/dashboard/analytics', label: 'Analytics', icon: BarChart3 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-50 border-b bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-bold text-gray-900">
                Product Dashboard
              </h1>
              <button
                className="p-2 md:hidden"
                onClick={toggleMobileMenu}
                aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              >
                {isMobileMenuOpen ? (
                  <X className="size-6" />
                ) : (
                  <Menu className="size-6" />
                )}
              </button>
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
                <div className="hidden items-center space-x-2 rounded-md bg-gray-50 px-3 py-1.5 text-sm text-gray-600 lg:flex">
                  <User className="size-4" />
                  <span className="max-w-[150px] truncate">{user.email}</span>
                </div>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="flex items-center space-x-2 text-red-600 hover:bg-red-50 hover:text-red-700"
                aria-label="Logout"
              >
                {isLoggingOut ? (
                  <>
                    <div className="size-4 animate-spin rounded-full border-b-2 border-red-600"></div>
                    <span>Logging out...</span>
                  </>
                ) : (
                  <>
                    <LogOut className="size-4" />
                    <span>Logout</span>
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <nav className="border-b bg-white md:hidden">
            <div className="mx-auto max-w-7xl p-4 sm:px-6 lg:px-8">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
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
            </div>
          </nav>
        )}
      </header>
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}
