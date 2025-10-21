import { Suspense } from 'react';
import { Metadata } from 'next';
import VerifyPage from '@/features/auth/forgot-password/code-verify.component';

export const metadata: Metadata = {
  title: 'Verify | Code',
};

const ForgetPassword = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyPage />
    </Suspense>
  );
};

export default ForgetPassword;
