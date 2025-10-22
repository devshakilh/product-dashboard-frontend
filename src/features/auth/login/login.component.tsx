'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  BaseForm,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/features/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';
import * as z from 'zod';

import { ApiError } from '@/types/api-response';
import { useLoginMutation } from '@/lib/store/api/authApi';
import { setCredentials } from '@/lib/store/slices/authSlice';

// Validation schema
const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function Login() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const [error, setError] = useState('');

  // Extract query parameters
  const redirect = searchParams.get('redirect') || '/dashboard/products';
  const sessionExpired = searchParams.get('session') === 'expired';

  // Initialize form
  const form = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: 'admin@example.com',
      password: 'admin123',
    },
  });

  // Handle session expiration
  useEffect(() => {
    if (sessionExpired) {
      setError('Your session has expired. Please login again.');
    }
  }, [sessionExpired]);

  // Handle form submission
  const onSubmit = async (data: LoginForm) => {
    try {
      setError('');
      const result = await login(data).unwrap();
      dispatch(setCredentials(result.user));
      toast.success('Login successful!', {
        description: 'You are now signed in.',
        duration: 3000,
      });
      router.push(redirect);
    } catch (err) {
      const apiError = err as ApiError;
      const errorMessage =
        apiError?.data?.message || 'Login failed. Please try again.';
      setError(errorMessage);
    }
  };

  // Define form fields
  const fields = [
    {
      name: 'email' as const,
      label: 'Email',
      type: 'email' as const,
      placeholder: 'admin@example.com',
    },
    {
      name: 'password' as const,
      label: 'Password',
      type: 'password' as const,
      placeholder: '••••••••',
    },
  ];

  // Demo credentials
  const demoCredentials = (
    <>
      <strong>Demo Credentials:</strong>
      <br />
      Email: admin@example.com
      <br />
      Password: admin123
    </>
  );

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="rounded-md bg-white/95 backdrop-blur-sm">
          <CardHeader className="space-y-1 pb-6 text-center">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <CardTitle className="text-3xl font-bold text-gray-900">
                Product Management
              </CardTitle>
              <CardDescription className="text-gray-500">
                Sign in to access your dashboard
              </CardDescription>
            </motion.div>
          </CardHeader>
          <CardContent className="p-6">
            {sessionExpired && (
              <div className="mb-4 flex items-start space-x-2 rounded-md border border-yellow-200 bg-yellow-50 p-3">
                <AlertCircle className="mt-0.5 size-5 text-yellow-600" />
                <div className="text-sm text-yellow-800">
                  Your session has expired. Please login again to continue.
                </div>
              </div>
            )}
            {error && !sessionExpired && (
              <div className="mb-4 flex items-start space-x-2 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-500">
                <AlertCircle className="mt-0.5 size-5" />
                <div>{error}</div>
              </div>
            )}
            <BaseForm
              form={form}
              onSubmit={onSubmit}
              fields={fields}
              submitButtonText="Sign In"
              isLoading={isLoading}
              extraContent={demoCredentials}
            />
          </CardContent>
        </div>
      </motion.div>
    </div>
  );
}
