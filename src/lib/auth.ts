import { redirect } from 'next/navigation';
import { authOptions } from '@/features/auth/auth.config';
import { Session } from 'next-auth';
import { getServerSession } from 'next-auth/next';

export async function getSession() {
  return (await getServerSession(authOptions)) as Session | null;
}

export async function getCurrentUser() {
  const session = await getSession();
  return session?.user;
}

export async function requireAuth() {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/auth/signin');
  }

  return user;
}

export function checkRole(
  user: { role: string | null },
  allowedRoles: string[]
) {
  return user.role && allowedRoles.includes(user.role);
}
