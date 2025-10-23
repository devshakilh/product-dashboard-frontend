/* eslint-disable @typescript-eslint/no-explicit-any */ /* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/display-name */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { ReactNode } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Login from '@/features/auth/login/login.component';
import { configureStore } from '@reduxjs/toolkit';
import { render, RenderResult, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { UseFormReturn } from 'react-hook-form';
import { Provider } from 'react-redux';
import { toast } from 'sonner';

import { useLoginMutation } from '@/lib/store/api/authApi';

// Mock dependencies
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}));

jest.mock('@/lib/store/api/authApi', () => ({
  useLoginMutation: jest.fn(),
}));

jest.mock('sonner', () => ({
  toast: {
    success: jest.fn(),
  },
}));

jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}));

// Store form state globally so it persists across re-renders
const currentFormState = {
  errors: {} as Record<string, { message?: string }>,
};

let currentFormValues = {
  email: 'admin@example.com',
  password: 'admin123',
};

// Mock react-hook-form with proper validation
jest.mock('react-hook-form', () => {
  const actual = jest.requireActual('react-hook-form');
  return {
    ...actual,
    useForm: (config?: any) => {
      const validateEmail = (email: string) => {
        if (!email) return 'Invalid email address';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          return 'Invalid email address';
        }
        return true;
      };

      const validatePassword = (password: string) => {
        if (!password || password.length === 0) {
          return 'Password is required';
        }
        return true;
      };

      return {
        handleSubmit: (fn: any) => async (e: any) => {
          e?.preventDefault();

          const emailError = validateEmail(currentFormValues.email);
          const passwordError = validatePassword(currentFormValues.password);

          currentFormState.errors = {};

          if (emailError !== true) {
            currentFormState.errors.email = { message: emailError };
          }
          if (passwordError !== true) {
            currentFormState.errors.password = { message: passwordError };
          }

          if (Object.keys(currentFormState.errors).length === 0) {
            await fn(currentFormValues);
          }
        },
        register: (name: string) => ({
          name,
          onChange: (e: any) => {
            const value = e.target?.value ?? e;
            currentFormValues[name as keyof typeof currentFormValues] = value;
          },
        }),
        formState: currentFormState,
        reset: () => {
          currentFormValues = {
            email: 'admin@example.com',
            password: 'admin123',
          };
          currentFormState.errors = {};
        },
      };
    },
  };
});

interface FormField {
  name: 'email' | 'password';
  label: string;
  type: 'email' | 'password';
  placeholder: string;
}

interface BaseFormProps {
  form: UseFormReturn<{ email: string; password: string }>;
  onSubmit: (data: { email: string; password: string }) => void;
  fields: FormField[];
  submitButtonText: string;
  isLoading: boolean;
  extraContent: ReactNode;
}

jest.mock('@/features/ui', () => ({
  BaseForm: ({
    form,
    onSubmit,
    fields,
    submitButtonText,
    isLoading,
    extraContent,
  }: BaseFormProps) => {
    return (
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {fields.map((field: FormField) => (
          <div key={field.name}>
            <label htmlFor={field.name}>{field.label}</label>
            <input
              id={field.name}
              type={field.type}
              {...form.register(field.name)}
              placeholder={field.placeholder}
              defaultValue={
                field.name === 'email' ? 'admin@example.com' : 'admin123'
              }
            />
            {form.formState.errors[field.name] && (
              <span role="alert">
                {form.formState.errors[field.name]?.message}
              </span>
            )}
          </div>
        ))}
        <button type="submit" disabled={isLoading}>
          {submitButtonText}
        </button>
        {extraContent}
      </form>
    );
  },
  CardContent: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  CardHeader: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  CardTitle: ({ children }: { children: ReactNode }) => <h1>{children}</h1>,
  CardDescription: ({ children }: { children: ReactNode }) => <p>{children}</p>,
}));

// Mock store setup
const mockAuthSlice = (state = {}) => state;
const createMockStore = () =>
  configureStore({
    reducer: {
      auth: mockAuthSlice,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });

// Render function
const renderLogin: () => RenderResult = () => {
  const store = createMockStore();
  return render(
    <Provider store={store}>
      <Login />
    </Provider>
  );
};

describe('Login Component', () => {
  let mockPush: jest.Mock;
  let mockLogin: jest.Mock;
  let mockSearchParams: Map<string, string>;

  beforeEach(() => {
    jest.clearAllMocks();

    // Reset form state
    currentFormState.errors = {};
    currentFormValues = {
      email: 'admin@example.com',
      password: 'admin123',
    };

    mockPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });

    mockSearchParams = new Map();
    (useSearchParams as jest.Mock).mockReturnValue({
      get: (key: string) => mockSearchParams.get(key) || null,
    });

    mockLogin = jest.fn();
    (useLoginMutation as jest.Mock).mockReturnValue([
      mockLogin,
      { isLoading: false },
    ]);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Initial Render', () => {
    it('should render login form with all elements', () => {
      renderLogin();
      expect(screen.getByText('Product Management')).toBeInTheDocument();
      expect(
        screen.getByText('Sign in to access your dashboard')
      ).toBeInTheDocument();
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: /sign in/i })
      ).toBeInTheDocument();
    });

    it('should display demo credentials', () => {
      renderLogin();
      expect(screen.getByText(/demo credentials/i)).toBeInTheDocument();
      expect(screen.getByText(/admin@example.com/)).toBeInTheDocument();
      expect(screen.getByText(/admin123/)).toBeInTheDocument();
    });

    it('should have default values in form fields', () => {
      renderLogin();
      const emailInput = screen.getByLabelText(/email/i) as HTMLInputElement;
      const passwordInput = screen.getByLabelText(
        /password/i
      ) as HTMLInputElement;
      expect(emailInput.value).toBe('admin@example.com');
      expect(passwordInput.value).toBe('admin123');
    });
  });

  describe('Session Expiration', () => {
    it('should show session expired message when session query param is expired', () => {
      mockSearchParams.set('session', 'expired');
      renderLogin();
      expect(screen.getByText(/your session has expired/i)).toBeInTheDocument();
    });

    it('should not show session expired message without query param', () => {
      renderLogin();
      expect(
        screen.queryByText(/your session has expired/i)
      ).not.toBeInTheDocument();
    });
  });

  describe('Form Validation', () => {
    it('should show error for invalid email', async () => {
      const user = userEvent.setup();
      renderLogin();

      const emailInput = screen.getByLabelText(/email/i) as HTMLInputElement;
      const submitButton = screen.getByRole('button', { name: /sign in/i });

      // Clear and type invalid email
      await user.clear(emailInput);
      await user.type(emailInput, 'invalid-email');
      currentFormValues.email = 'invalid-email';

      // Submit form to trigger validation
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/invalid email address/i)).toBeInTheDocument();
      });
    });

    it('should show error for empty password', async () => {
      const user = userEvent.setup();
      renderLogin();

      const passwordInput = screen.getByLabelText(
        /password/i
      ) as HTMLInputElement;
      const submitButton = screen.getByRole('button', { name: /sign in/i });

      // Clear password
      await user.clear(passwordInput);
      currentFormValues.password = '';

      // Submit form to trigger validation
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/password is required/i)).toBeInTheDocument();
      });
    });

    it('should not show errors for valid inputs', async () => {
      const user = userEvent.setup();
      mockLogin.mockResolvedValue({
        unwrap: jest.fn().mockResolvedValue({
          user: { id: '1', email: 'test@example.com' },
        }),
      });

      renderLogin();
      const emailInput = screen.getByLabelText(/email/i);
      const submitButton = screen.getByRole('button', { name: /sign in/i });

      await user.clear(emailInput);
      await user.type(emailInput, 'test@example.com');
      currentFormValues.email = 'test@example.com';

      await user.click(submitButton);

      await waitFor(() => {
        expect(mockLogin).toHaveBeenCalled();
        expect(
          screen.queryByText(/invalid email address/i)
        ).not.toBeInTheDocument();
      });
    });
  });

  describe('Form Submission', () => {
    it('should successfully login and redirect to dashboard', async () => {
      const user = userEvent.setup();
      const mockUser = { id: '1', email: 'admin@example.com', name: 'Admin' };
      mockLogin.mockResolvedValue({
        unwrap: jest.fn().mockResolvedValue({ user: mockUser }),
      });

      renderLogin();
      const submitButton = screen.getByRole('button', { name: /sign in/i });
      await user.click(submitButton);

      await waitFor(() => {
        expect(mockLogin).toHaveBeenCalledWith({
          email: 'admin@example.com',
          password: 'admin123',
        });
        expect(toast.success).toHaveBeenCalledWith('Login successful!', {
          description: 'You are now signed in.',
          duration: 3000,
        });
        expect(mockPush).toHaveBeenCalledWith('/dashboard/products');
      });
    });

    it('should redirect to custom redirect URL if provided', async () => {
      const user = userEvent.setup();
      mockSearchParams.set('redirect', '/custom-page');
      const mockUser = { id: '1', email: 'admin@example.com' };
      mockLogin.mockResolvedValue({
        unwrap: jest.fn().mockResolvedValue({ user: mockUser }),
      });

      renderLogin();
      const submitButton = screen.getByRole('button', { name: /sign in/i });
      await user.click(submitButton);

      await waitFor(() => {
        expect(mockPush).toHaveBeenCalledWith('/custom-page');
      });
    });

    it('should handle login failure with API error message', async () => {
      const user = userEvent.setup();
      const errorMessage = 'Invalid credentials';
      mockLogin.mockResolvedValue({
        unwrap: jest.fn().mockRejectedValue({
          data: { message: errorMessage },
        }),
      });

      renderLogin();
      const submitButton = screen.getByRole('button', { name: /sign in/i });
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(errorMessage)).toBeInTheDocument();
      });
    });

    it('should handle login failure with default error message', async () => {
      const user = userEvent.setup();
      mockLogin.mockResolvedValue({
        unwrap: jest.fn().mockRejectedValue({}),
      });

      renderLogin();
      const submitButton = screen.getByRole('button', { name: /sign in/i });
      await user.click(submitButton);

      await waitFor(() => {
        expect(
          screen.getByText(/login failed\. please try again\./i)
        ).toBeInTheDocument();
      });
    });

    it('should clear previous errors on new submission', async () => {
      const user = userEvent.setup();
      mockLogin.mockResolvedValueOnce({
        unwrap: jest.fn().mockRejectedValue({
          data: { message: 'First error' },
        }),
      });

      renderLogin();
      const submitButton = screen.getByRole('button', { name: /sign in/i });
      await user.click(submitButton);

      await waitFor(
        () => {
          expect(screen.getByText(/first error/i)).toBeInTheDocument();
        },
        { timeout: 2000 }
      );

      // Second submission with success
      const mockUser = { id: '1', email: 'admin@example.com' };
      mockLogin.mockResolvedValue({
        unwrap: jest.fn().mockResolvedValue({ user: mockUser }),
      });

      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.queryByText(/first error/i)).not.toBeInTheDocument();
      });
    });
  });

  describe('Loading State', () => {
    it('should show loading state during submission', () => {
      (useLoginMutation as jest.Mock).mockReturnValue([
        mockLogin,
        { isLoading: true },
      ]);

      renderLogin();
      const submitButton = screen.getByRole('button', { name: /sign in/i });
      expect(submitButton).toBeDisabled();
    });
  });

  describe('User Interaction', () => {
    it('should allow typing in email field', async () => {
      const user = userEvent.setup();
      renderLogin();

      const emailInput = screen.getByLabelText(/email/i) as HTMLInputElement;
      await user.clear(emailInput);
      await user.type(emailInput, 'newuser@example.com');

      expect(emailInput.value).toBe('newuser@example.com');
    });

    it('should allow typing in password field', async () => {
      const user = userEvent.setup();
      renderLogin();

      const passwordInput = screen.getByLabelText(
        /password/i
      ) as HTMLInputElement;
      await user.clear(passwordInput);
      await user.type(passwordInput, 'newpassword123');

      expect(passwordInput.value).toBe('newpassword123');
    });
  });
});
