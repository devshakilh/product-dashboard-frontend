'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from '@/features/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { AnimatePresence, motion } from 'framer-motion';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
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
  password: z.string().min(8, 'Password must be at least 8 characters long'),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function Login() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const [showPassword, setShowPassword] = useState(false);

  // Initialize form with react-hook-form and zod
  const form = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: 'admin@example.com',
      password: 'admin123',
    },
  });

  // Handle form submission
  const onSubmit = async (data: LoginForm) => {
    try {
      const result = await login(data).unwrap();
      dispatch(setCredentials(result.user));
      toast.success('Login successful!', {
        description: 'You are now signed in.',
      });
      router.push('/products');
    } catch (err) {
      const apiError = err as ApiError;
      toast.error('Login failed', {
        description:
          apiError?.data?.message ||
          'Please check your credentials and try again.',
      });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="w-full max-w-md"
      >
        <Card className="border-0 bg-white/95 shadow-lg backdrop-blur-sm">
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
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-5"
              >
                {/* Email Field */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <motion.div
                          whileFocus={{ scale: 1.01 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Input
                            type="email"
                            placeholder="admin@example.com"
                            className={`h-10 ${
                              form.formState.errors.email
                                ? 'border-red-500 focus-visible:ring-red-500'
                                : 'border-gray-200 focus-visible:ring-blue-500'
                            } transition-all duration-200`}
                            disabled={isLoading}
                            {...field}
                          />
                        </motion.div>
                      </FormControl>
                      <AnimatePresence>
                        {form.formState.errors.email && (
                          <motion.div
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -5 }}
                          >
                            <FormMessage />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </FormItem>
                  )}
                />

                {/* Password Field */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <motion.div
                            whileFocus={{ scale: 1.01 }}
                            transition={{ duration: 0.2 }}
                          >
                            <Input
                              type={showPassword ? 'text' : 'password'}
                              placeholder="••••••••"
                              className={`h-10 pr-10 ${
                                form.formState.errors.password
                                  ? 'border-red-500 focus-visible:ring-red-500'
                                  : 'border-gray-200 focus-visible:ring-blue-500'
                              } transition-all duration-200`}
                              disabled={isLoading}
                              {...field}
                            />
                          </motion.div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-1 top-1/2 size-8 -translate-y-1/2"
                            onClick={() => setShowPassword(!showPassword)}
                            disabled={isLoading}
                          >
                            {showPassword ? (
                              <EyeOff className="size-4" />
                            ) : (
                              <Eye className="size-4" />
                            )}
                          </Button>
                        </div>
                      </FormControl>
                      <AnimatePresence>
                        {form.formState.errors.password && (
                          <motion.div
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -5 }}
                          >
                            <FormMessage />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </FormItem>
                  )}
                />

                {/* Submit Button */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                >
                  <Button
                    type="submit"
                    className="h-10 w-full bg-blue-600 text-white hover:bg-blue-700"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="flex items-center">
                        <Loader2 className="mr-2 size-4 animate-spin" />
                        Signing in...
                      </span>
                    ) : (
                      'Sign In'
                    )}
                  </Button>
                </motion.div>

                {/* Demo Credentials */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.3 }}
                  className="rounded-md bg-gray-50 p-3 text-center text-sm text-gray-600"
                >
                  <strong>Demo Credentials:</strong>
                  <br />
                  Email: admin@example.com
                  <br />
                  Password: admin123
                </motion.div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
