import { Suspense } from 'react';
import { Metadata } from 'next';
import VerifyCode from '@/features/auth/forgot-password/code-verify.component';

export const metadata: Metadata = {
  title: 'User | Verification',
};

const Verification = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyCode />
    </Suspense>
  );
};

export default Verification;
