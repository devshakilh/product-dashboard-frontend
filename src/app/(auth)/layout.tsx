import React from 'react';
import AuthFooter from '@/features/ui/layouts/auth-footer.component';

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <>
      <div>
        <main>{children}</main>
        <AuthFooter />
      </div>
    </>
  );
};

export default AuthLayout;
