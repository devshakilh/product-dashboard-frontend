'use client';

import { useSearchParams } from 'next/navigation';
import AccountSetupVerifyOtp from '@/features/account-setup/components/account-setup-verify-otp.component';

export default function Verify() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';

  return <AccountSetupVerifyOtp email={email} />;
}
