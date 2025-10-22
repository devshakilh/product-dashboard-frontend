import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { LoginCredentials, User } from '@/types/auth';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}/auth`,
    credentials: 'include',
  }),
  endpoints: (builder) => ({
    login: builder.mutation<{ user: User }, LoginCredentials>({
      query: (credentials) => ({
        url: '/login',
        method: 'POST',
        body: credentials,
      }),
      transformResponse: (response: {
        success: boolean;
        data: { user: User };
      }) => response.data,
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: '/logout',
        method: 'POST',
      }),
    }),
    verifyToken: builder.query<{ user: User }, void>({
      query: () => '/verify',
      transformResponse: (response: {
        success: boolean;
        data: { user: User };
      }) => response.data,
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation, useVerifyTokenQuery } =
  authApi;
