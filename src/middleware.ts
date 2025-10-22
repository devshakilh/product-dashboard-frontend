import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token');
  const isAuthPage = request.nextUrl.pathname.startsWith('/login');
  const isDashboard =
    request.nextUrl.pathname.startsWith('/products') ||
    request.nextUrl.pathname.startsWith('/analytics');

  // Redirect to login if accessing dashboard without token
  if (isDashboard && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Redirect to products if accessing login with token
  if (isAuthPage && token) {
    return NextResponse.redirect(new URL('/products', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/login', '/products/:path*', '/analytics/:path*'],
};
