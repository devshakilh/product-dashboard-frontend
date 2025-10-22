'use client';

import { useSelector } from 'react-redux';

import { RootState } from '@/lib/store';
import { useVerifyTokenQuery } from '@/lib/store/api/authApi';

export const useAuth = () => {
  const { user, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );

  const { isLoading, error } = useVerifyTokenQuery(undefined, {
    skip: !isAuthenticated,
  });

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
  };
};
