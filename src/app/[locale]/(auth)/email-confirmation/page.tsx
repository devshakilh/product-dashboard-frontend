import { Metadata } from 'next';
import EmailConfirmation from '@/features/auth/email-confirmation.component';

export const metadata: Metadata = {
  title: 'User | Email Confirmation',
};

const ForgetPassword = () => {
  return <EmailConfirmation />;
};

export default ForgetPassword;
