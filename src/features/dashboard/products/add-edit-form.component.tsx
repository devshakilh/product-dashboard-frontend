/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { BaseForm, Button } from '@/features/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';

import { Product } from '@/types/product';
import {
  useCreateProductMutation,
  useUpdateProductMutation,
  useUpdateProductStatusMutation,
} from '@/lib/store/api/productsApi';

// Zod schema for validation
const productSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name is too long'),
  category: z.string().min(1, 'Category is required'),
  price: z.preprocess(
    (val) => (typeof val === 'string' ? parseFloat(val) : val),
    z
      .number()
      .min(0, 'Price must be positive')
      .refine((val) => !isNaN(val), {
        message: 'Price must be a valid number',
      })
  ),
  stock: z.preprocess(
    (val) => (typeof val === 'string' ? parseInt(val, 10) : val),
    z
      .number()
      .int()
      .min(0, 'Stock must be non-negative')
      .refine((val) => !isNaN(val), {
        message: 'Stock must be a valid number',
      })
  ),
  status: z.enum(['active', 'inactive', 'out-of-stock']),
  description: z.string().optional(),
});

type ProductFormData = z.infer<typeof productSchema>;

interface ProductFormProps {
  product: Product | null;
  mode: 'create' | 'edit' | 'status';
  onSuccess: () => void;
  onCancel: () => void;
}

export default function AddEditProductForm({
  product,
  mode,
  onSuccess,
  onCancel,
}: ProductFormProps) {
  const router = useRouter();
  const [createProduct, { isLoading: isCreating }] = useCreateProductMutation();
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();
  const [updateStatus, { isLoading: isUpdatingStatus }] =
    useUpdateProductStatusMutation();
  const [error, setError] = useState<string>('');

  const form = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: product?.name || '',
      category: product?.category || '',
      price: product?.price || 0,
      stock: product?.stock || 0,
      status: product?.status || 'active',
      description: product?.description || '',
    },
  });

  const { setValue } = form;

  useEffect(() => {
    if (product) {
      setValue('name', product.name);
      setValue('category', product.category);
      setValue('price', product.price);
      setValue('stock', product.stock);
      setValue('status', product.status);
      setValue('description', product.description || '');
    }
  }, [product, setValue]);

  const onSubmit = async (data: ProductFormData) => {
    let promise;
    if (mode === 'create') {
      promise = createProduct(data);
    } else if (mode === 'edit' && product) {
      promise = updateProduct({ id: product.id, data });
    } else if (mode === 'status' && product) {
      promise = updateStatus({ id: product.id, data: { status: data.status } });
    }

    if (promise) {
      try {
        await toast.promise(promise.unwrap(), {
          loading: 'Saving...',
          success: () => {
            onSuccess();
            return mode === 'create'
              ? 'Product created successfully!'
              : mode === 'edit'
                ? 'Product updated successfully!'
                : `Product status updated to ${data.status}!`;
          },
          error: (err: any) => {
            let errorMessage = 'Failed to save product. Please try again.';
            if (err.status === 401) {
              errorMessage = 'Your session has expired. Please log in again.';
              // Redirect to login with session=expired
              router.push('/login?session=expired');
            } else if (err.data?.message) {
              errorMessage = err.data.message;
            }
            setError(errorMessage);
            return errorMessage;
          },
        });
      } catch {
        // Fallback for unexpected errors
        const errorMessage = 'An unexpected error occurred. Please try again.';
        setError(errorMessage);
        toast.error(errorMessage);
      }
    }
  };

  const isLoading = isCreating || isUpdating || isUpdatingStatus;

  // Define fields
  const fields = [
    ...(mode !== 'status'
      ? [
          {
            name: 'name' as const,
            label: 'Product Name',
            type: 'text' as const,
            placeholder: 'Enter product name',
          },
          {
            name: 'category' as const,
            label: 'Category',
            type: 'text' as const,
            placeholder: 'e.g., Electronics, Clothing, Food',
          },
          {
            name: 'price' as const,
            label: 'Price ($)',
            type: 'number' as const,
            placeholder: '0.00',
          },
          {
            name: 'stock' as const,
            label: 'Stock',
            type: 'number' as const,
            placeholder: '0',
          },
          {
            name: 'description' as const,
            label: 'Description (Optional)',
            type: 'text' as const,
            placeholder: 'Enter product description',
          },
        ]
      : []),
    {
      name: 'status' as const,
      label: 'Status',
      type: 'select' as const,
      placeholder: 'Select status',
      options: [
        { value: 'active', label: 'Active' },
        { value: 'inactive', label: 'Inactive' },
        { value: 'out-of-stock', label: 'Out of Stock' },
      ],
    },
  ];

  // Extra content for Cancel button
  const extraContent = (
    <motion.div className="flex justify-end">
      <Button
        type="button"
        variant="outline"
        onClick={onCancel}
        disabled={isLoading}
      >
        Cancel
      </Button>
    </motion.div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mt-4"
    >
      {error && (
        <div
          role="alert"
          className="mb-4 flex items-start space-x-2 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-500"
        >
          <AlertCircle className="mt-0.5 size-5" />
          <div>{error}</div>
        </div>
      )}
      <BaseForm
        form={form}
        onSubmit={onSubmit}
        fields={fields}
        submitButtonText={
          isLoading
            ? 'Saving...'
            : mode === 'create'
              ? 'Create Product'
              : 'Save Changes'
        }
        isLoading={isLoading}
        extraContent={extraContent}
      />
    </motion.div>
  );
}
