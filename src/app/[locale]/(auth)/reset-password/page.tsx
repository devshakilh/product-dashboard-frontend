import { Suspense } from 'react';
import { Metadata } from 'next';
import { ResetPassword } from '@/features/auth/forgot-password';

export const metadata: Metadata = {
  title: 'PasswordReset Page',
};

const ResetPasswordPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPassword />
    </Suspense>
  );
};

export default ResetPasswordPage;
