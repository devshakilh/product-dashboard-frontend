/* eslint-disable @typescript-eslint/no-explicit-any */
import '@testing-library/jest-dom'; //  Ensure jest-dom matchers are available

import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { signIn } from 'next-auth/react';
import { NextIntlClientProvider } from 'next-intl';

import LoginPage from './login.component';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    refresh: jest.fn(),
  }),
}));

// Mock next-auth/react
jest.mock('next-auth/react', () => ({
  signIn: jest.fn(),
}));

// Mock next/image
// jest.mock('next/image', () => ({
//   __esModule: true,
//   default: (props: ImgHTMLAttributes<HTMLImageElement>) => <img {...props} />,
// }));

// Mock lucide-react
jest.mock('lucide-react', () => ({
  Mail: () => <div data-testid="mail-icon" />,
}));

// Mock react-icons/bi
jest.mock('react-icons/bi', () => ({
  BiLock: () => <div data-testid="lock-icon" />,
  BiHide: () => <div data-testid="hide-icon" />,
  BiShow: () => <div data-testid="show-icon" />,
}));

// Mock matchMedia (Fixing ReferenceError)
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});
const translations = {
  loginPage: {
    title: 'Login',
    description: 'Please login to your account',
    loginButton: 'Login',
    loggingIn: 'Logging in...',
    forgotPassword: 'Forgot password?',
    resetPasswordLink: 'Reset it here',
  },
  common: {
    auth: {
      emailLabel: 'Email',
      emailPlaceholder: 'Enter your email',
      passwordLabel: 'Password',
      passwordPlaceholder: 'Enter your password',
      emailRequired: 'Email is required',
      passwordRequired: 'Password is required',
    },
  },
};
describe('LoginPage', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(), // Deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders login form', () => {
    render(
      <NextIntlClientProvider messages={translations} locale="en">
        <LoginPage />
      </NextIntlClientProvider>
    );

    expect(screen.getByPlaceholderText('Enter your email')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('Enter your password')
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  it('handles form submission', async () => {
    (signIn as jest.Mock).mockResolvedValueOnce({ ok: true, error: null });

    render(
      <NextIntlClientProvider messages={translations} locale="en">
        <LoginPage />
      </NextIntlClientProvider>
    );

    fireEvent.change(screen.getByPlaceholderText('Enter your email'), {
      target: { value: 'test@gmail.com' },
    });

    fireEvent.change(screen.getByPlaceholderText('Enter your password'), {
      target: { value: 'aaaaaaaa' },
    });

    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(signIn).toHaveBeenCalledWith('credentials', {
        email: 'test@gmail.com',
        password: 'aaaaaaaa',
        redirect: false,
      });
    });
  });

  it('shows error message on failed login', async () => {
    const errorMessage = 'Invalid credentials';
    (signIn as jest.Mock).mockResolvedValueOnce({
      error: errorMessage,
    });

    render(
      <NextIntlClientProvider messages={translations} locale="en">
        <LoginPage />
      </NextIntlClientProvider>
    );

    fireEvent.change(screen.getByPlaceholderText('Enter your email'), {
      target: { value: 'test@example.com' },
    });

    fireEvent.change(screen.getByPlaceholderText('Enter your password'), {
      target: { value: 'wrongpassword' },
    });

    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });
});
