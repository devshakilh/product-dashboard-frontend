import { Metadata } from 'next';
import { LoginPage } from '@/features/auth/login-page';
import ConnectionMonitor from '@/features/ui/error-pages/connection-monitor.component';

export const metadata: Metadata = {
  title: 'User | Login',
};

const Login = () => {
  return (
    <ConnectionMonitor>
      <LoginPage />
    </ConnectionMonitor>
  );
};

export default Login;
