'use client';

import { useEffect } from 'react';
import {
  BaseForm,
  Button,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/features/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';

import { Product, ProductStatus } from '@/types/product';
import {
  useCreateProductMutation,
  useUpdateProductMutation,
  useUpdateProductStatusMutation,
} from '@/lib/store/api/productsApi';

// Zod schema for validation
const productSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name is too long'),
  category: z.string().min(1, 'Category is required'),
  price: z.number().min(0, 'Price must be positive'),
  stock: z.number().int().min(0, 'Stock must be non-negative'),
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
  const [createProduct, { isLoading: isCreating }] = useCreateProductMutation();
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();
  const [updateStatus, { isLoading: isUpdatingStatus }] =
    useUpdateProductStatusMutation();

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

  const { setValue, watch } = form;
  const statusValue = watch('status');

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
        await toast.promise(promise, {
          loading: 'Saving...',
          success: () => {
            onSuccess();
            return mode === 'create'
              ? 'Product created successfully!'
              : mode === 'edit'
                ? 'Product updated successfully!'
                : `Product status updated to ${data.status}!`;
          },
          error: 'Failed to save product. Please try again.',
        });
      } catch {}
    }
  };

  const isLoading = isCreating || isUpdating || isUpdatingStatus;

  // Define fields
  const fields =
    mode !== 'status'
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
      : [];

  // Extra content for status select and buttons
  const extraContent = (
    <div className="space-y-5">
      <div className="space-y-2">
        <label className="text-sm font-medium">Status</label>
        <Select
          value={statusValue}
          onValueChange={(value) => setValue('status', value as ProductStatus)}
          disabled={isLoading}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
            <SelectItem value="out-of-stock">Out of Stock</SelectItem>
          </SelectContent>
        </Select>
        {form.formState.errors.status && (
          <p className="text-sm text-red-500">
            {form.formState.errors.status.message}
          </p>
        )}
      </div>
      <motion.div className="flex justify-end space-x-2">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isLoading}
        >
          Cancel
        </Button>
      </motion.div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mt-4"
    >
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
