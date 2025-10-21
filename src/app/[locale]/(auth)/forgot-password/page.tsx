import { Metadata } from 'next';
import { ForgotPassword as ForgotPasswordComponent } from '@/features/auth/forgot-password';

export const metadata: Metadata = {
  title: 'User | ForgetPassword',
};

const ForgotPassword = () => {
  return <ForgotPasswordComponent />;
};

export default ForgotPassword;
