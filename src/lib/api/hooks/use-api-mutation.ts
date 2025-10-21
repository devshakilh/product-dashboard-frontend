import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'react-hot-toast';

import { ApiResponse } from '../types';

interface ErrorResponse {
  message: string;
}

interface MutationConfig<TData, TVariables> {
  mutationFn: (variables: TVariables) => Promise<TData>;
  options?: Omit<
    UseMutationOptions<TData, AxiosError<ErrorResponse>, TVariables>,
    'mutationFn'
  >;
  successMessage?: string;
}

export function useApiMutation<TData, TVariables>({
  mutationFn,
  options,
  successMessage,
}: MutationConfig<TData, TVariables>) {
  return useMutation({
    mutationFn,
    onSuccess: async (data, variables, context) => {
      toast.success(successMessage || 'Operation successful');
      options?.onSuccess?.(data, variables, context);
    },
    onError: async (
      error: AxiosError<ApiResponse<ErrorResponse>>,
      variables,
      context
    ) => {
      toast.error(error.response?.data?.message || 'An error occurred');
      options?.onError?.(error, variables, context);
    },
    ...options,
  });
}
