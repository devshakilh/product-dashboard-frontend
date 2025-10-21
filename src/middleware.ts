import { NextResponse } from 'next/server';
import { withAuth } from 'next-auth/middleware';
import createIntlMiddleware from 'next-intl/middleware';

import { UserRole } from '@/types/user-role';

// Create i18n middleware
const intlMiddleware = createIntlMiddleware({
  locales: ['en', 'fr'],
  defaultLocale: 'en',
  localePrefix: 'always',
});

// Role-based route configuration
const roleRoutes = {
  [UserRole.SCHOOL_ADMIN]: [
    '/dashboard',
    '/dashboard/parents',
    '/dashboard/students',
    '/dashboard/teachers',
    '/dashboard/events',
    '/dashboard/payments',
    '/dashboard/settings',
    '/dashboard/support',
  ],
  [UserRole.TEACHER]: ['/dashboard', '/dashboard/parents'],
  [UserRole.PARENT]: ['/dashboard', '/dashboard/parents'],
};

// Combine auth and i18n middleware
export default withAuth(
  async function middleware(req) {
    const path = req.nextUrl.pathname;
    const locale = path.split('/')[1] || 'en';
    const publicPaths = ['/', '/login', '/register', '/account-setup'];

    // Check if it's a public path
    if (publicPaths.some((p) => path.includes(p))) {
      return intlMiddleware(req);
    }

    // Handle protected paths
    if (path.includes('/dashboard')) {
      const token = req.nextauth?.token;

      // No token means not authenticated
      if (!token) {
        return NextResponse.redirect(new URL(`/${locale}/login`, req.url));
      }

      // Check role-based access
      const userRole = token.role || 'guest';

      // Find which role route patterns match the current path
      const hasAccess = Object.entries(roleRoutes).some(([role, routes]) => {
        // If user has this role, check if they can access this path
        if (userRole === role) {
          // Allow access to general dashboard routes
          if (path === `/${locale}/dashboard`) return true;

          // Check specific role-based routes
          return routes.some((route) => path.includes(route));
        }
        return false;
      });

      // If no access, redirect to the main dashboard or unauthorized page
      if (!hasAccess) {
        return NextResponse.redirect(new URL(`/${locale}/dashboard`, req.url));
      }

      return intlMiddleware(req);
    }

    return intlMiddleware(req);
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        const path = req.nextUrl.pathname;
        const publicPaths = ['/', '/login', '/register', '/account-setup'];

        if (publicPaths.some((p) => path.includes(p))) {
          return true;
        }

        return !!token; // Require authentication for non-public routes
      },
    },
  }
);

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*$).*)'],
};
