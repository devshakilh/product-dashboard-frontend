import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const { pathname } = request.nextUrl;

  const isProtectedRoute =
    pathname.startsWith('/dashboard/products') ||
    pathname.startsWith('/dashboard/analytics');
  const isAuthPage = pathname.startsWith('/login');

  if (isProtectedRoute && !token) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isProtectedRoute && token) {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/verify`,
        {
          headers: { Cookie: `token=${token}` },
          credentials: 'include',
        }
      );
      if (!response.ok) {
        const loginUrl = new URL('/login', request.url);
        loginUrl.searchParams.set('session', 'expired');
        loginUrl.searchParams.set('redirect', pathname);
        return NextResponse.redirect(loginUrl);
      }
    } catch {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('session', 'expired');
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  if (isAuthPage && token) {
    return NextResponse.redirect(new URL('/dashboard/products', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/products/:path*',
    '/dashboard/analytics/:path*',
    '/login',
  ],
};
