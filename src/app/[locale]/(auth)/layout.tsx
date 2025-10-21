import React from 'react';
import AuthFooter from '@/features/ui/layouts/auth-footer.component';
import { Toaster } from 'react-hot-toast';

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <>
      <Toaster position="top-right" />
      <div className="flex min-h-screen flex-col bg-gray-50">
        <div className="flex flex-1 items-center justify-center">
          <main className="w-full max-w-lg rounded-xl border border-gray-100 bg-white p-4 sm:p-10 md:p-12">
            {children}
          </main>
        </div>
        <AuthFooter />
      </div>
    </>
  );
};

export default AuthLayout;
