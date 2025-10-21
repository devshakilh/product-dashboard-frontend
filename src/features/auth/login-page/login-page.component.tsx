'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Input } from '@/features/ui';
import Button from '@/features/ui/atoms/button.component';
import PasswordInput from '@/features/ui/molecules/password-input.component';
import { signIn } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { toast, Toaster } from 'react-hot-toast';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const t = useTranslations('loginPage'); // For loginPage translations
  const tCommon = useTranslations('common'); // For common translations

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if email or password is missing and show specific error messages
    if (!email) {
      toast.error(tCommon('auth.emailRequired'));
      return;
    }

    if (!password) {
      toast.error(tCommon('auth.passwordRequired'));
      return;
    }

    setIsLoading(true);
    toast.dismiss();
    const toastId = toast.loading(t('loggingIn'));
    try {
      // console.log('Attempting to sign in with:', { email });

      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      // console.log('Sign in result:', result);

      if (result?.error) {
        // console.error('Sign in error:', result.error);
        toast.error(result.error, { id: toastId });
        return;
      }

      // Get the session data after successful login
      const response = await fetch('/api/auth/session');
      const session = await response.json();
      // console.log('Session data:', session);

      toast.success(t('loginSuccess'), { id: toastId });
      localStorage.setItem('schoolId', session.user.schoolId);
      router.push('/dashboard');
      router.refresh();
    } catch {
      localStorage.removeItem('schoolId');
      toast.error(t('loggingInError'), { id: toastId });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />
      <main>
        <div className="flex flex-col items-center">
          <Link href="/">
            <Image
              className="mx-auto mb-2 mt-5"
              width={160}
              height={64}
              alt="Pulikidz Logo"
              src="/logos/Pulikidz Logo.png"
            />
          </Link>
          <h1 className="mb-2 text-2xl font-bold text-gray-800">
            {t('title')}
          </h1>
          <p className="text-center text-sm text-gray-600">
            {t('description')}
          </p>
        </div>
        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-6">
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label={tCommon('auth.emailLabel')}
            placeholder={tCommon('auth.emailPlaceholder')}
            className="sm:h-[3.25rem]"
            leftIcon={
              <Image
                src="/icons/email.svg"
                alt="email"
                width={18}
                height={15}
              />
            }
          />

          <PasswordInput
            id="password"
            label={tCommon('auth.passwordLabel')}
            placeholder={tCommon('auth.passwordPlaceholder')}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button variant="primary" type="submit" disabled={isLoading}>
            {isLoading ? t('loggingIn') : t('loginButton')}
          </Button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            {t('forgotPassword')}{' '}
            <Link href="forgot-password" className="text-blue-600">
              {t('resetPasswordLink')}
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
