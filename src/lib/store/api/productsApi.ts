import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import {
  CreateProductDTO,
  Product,
  UpdateProductDTO,
  UpdateProductStatusDTO,
} from '@/types/product';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}/products`,
    credentials: 'include',
  }),
  tagTypes: ['Products'],
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      query: () => '/',
      transformResponse: (response: { success: boolean; data: Product[] }) =>
        response.data,
      providesTags: ['Products'],
    }),
    createProduct: builder.mutation<Product, CreateProductDTO>({
      query: (product) => ({
        url: '/',
        method: 'POST',
        body: product,
      }),
      transformResponse: (response: { success: boolean; data: Product }) =>
        response.data,
      invalidatesTags: ['Products'],
    }),
    updateProduct: builder.mutation<
      Product,
      { id: string; data: UpdateProductDTO }
    >({
      query: ({ id, data }) => ({
        url: `/${id}`,
        method: 'PUT',
        body: data,
      }),
      transformResponse: (response: { success: boolean; data: Product }) =>
        response.data,
      invalidatesTags: ['Products'],
    }),
    updateProductStatus: builder.mutation<
      Product,
      { id: string; data: UpdateProductStatusDTO }
    >({
      query: ({ id, data }) => ({
        url: `/${id}/status`,
        method: 'PATCH',
        body: data,
      }),
      transformResponse: (response: { success: boolean; data: Product }) =>
        response.data,
      invalidatesTags: ['Products'],
    }),
    deleteProduct: builder.mutation<void, string>({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Products'],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useUpdateProductStatusMutation,
  useDeleteProductMutation,
} = productsApi;
