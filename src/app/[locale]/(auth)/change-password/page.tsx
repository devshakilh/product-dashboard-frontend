import { Suspense } from 'react';
import { Metadata } from 'next';
import { ChangeCurrentPassword } from '@/features/auth/change-current-password';

export const metadata: Metadata = {
  title: 'Change Password',
};

const ChangePassword = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ChangeCurrentPassword />
    </Suspense>
  );
};

export default ChangePassword;
