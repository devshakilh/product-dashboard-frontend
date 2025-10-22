// 'use client';

// import { useEffect } from 'react';
// import {
//   Button,
//   Input,
//   Label,
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '@/features/ui';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { useForm } from 'react-hook-form';
// import * as z from 'zod';

// import { Product, ProductStatus } from '@/types/product';
// import {
//   useCreateProductMutation,
//   useUpdateProductMutation,
//   useUpdateProductStatusMutation,
// } from '@/lib/store/api/productsApi';

// const productSchema = z.object({
//   name: z.string().min(1, 'Name is required').max(100, 'Name is too long'),
//   category: z.string().min(1, 'Category is required'),
//   price: z.number().min(0, 'Price must be positive'),
//   stock: z.number().int().min(0, 'Stock must be non-negative'),
//   status: z.enum(['active', 'inactive', 'out-of-stock']),
//   description: z.string().optional(),
// });

// type ProductFormData = z.infer<typeof productSchema>;

// interface ProductFormProps {
//   product: Product | null;
//   mode: 'create' | 'edit' | 'status';
//   onSuccess: () => void;
//   onCancel: () => void;
// }

// export default function ProductForm({
//   product,
//   mode,
//   onSuccess,
//   onCancel,
// }: ProductFormProps) {
//   const [createProduct, { isLoading: isCreating }] = useCreateProductMutation();
//   const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();
//   const [updateStatus, { isLoading: isUpdatingStatus }] =
//     useUpdateProductStatusMutation();

//   const {
//     register,
//     handleSubmit,
//     setValue,
//     watch,
//     formState: { errors },
//   } = useForm<ProductFormData>({
//     resolver: zodResolver(productSchema),
//     defaultValues: {
//       name: product?.name || '',
//       category: product?.category || '',
//       price: product?.price || 0,
//       stock: product?.stock || 0,
//       status: product?.status || 'active',
//       description: product?.description || '',
//     },
//   });

//   const statusValue = watch('status');

//   useEffect(() => {
//     if (product) {
//       setValue('name', product.name);
//       setValue('category', product.category);
//       setValue('price', product.price);
//       setValue('stock', product.stock);
//       setValue('status', product.status);
//       setValue('description', product.description || '');
//     }
//   }, [product, setValue]);

//   const onSubmit = async (data: ProductFormData) => {
//     try {
//       if (mode === 'create') {
//         await createProduct(data).unwrap();
//       } else if (mode === 'edit' && product) {
//         await updateProduct({
//           id: product.id,
//           data,
//         }).unwrap();
//       } else if (mode === 'status' && product) {
//         await updateStatus({
//           id: product.id,
//           data: { status: data.status },
//         }).unwrap();
//       }
//       onSuccess();
//     } catch (error) {
//       console.error('Failed to save product:', error);
//     }
//   };

//   const isLoading = isCreating || isUpdating || isUpdatingStatus;

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
//       {mode !== 'status' && (
//         <>
//           <div className="space-y-2">
//             <Label htmlFor="name">Product Name</Label>
//             <Input
//               id="name"
//               {...register('name')}
//               placeholder="Enter product name"
//             />
//             {errors.name && (
//               <p className="text-sm text-red-500">{errors.name.message}</p>
//             )}
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="category">Category</Label>
//             <Input
//               id="category"
//               {...register('category')}
//               placeholder="e.g., Electronics, Clothing, Food"
//             />
//             {errors.category && (
//               <p className="text-sm text-red-500">{errors.category.message}</p>
//             )}
//           </div>

//           <div className="grid grid-cols-2 gap-4">
//             <div className="space-y-2">
//               <Label htmlFor="price">Price ($)</Label>
//               <Input
//                 id="price"
//                 type="number"
//                 step="0.01"
//                 {...register('price', { valueAsNumber: true })}
//                 placeholder="0.00"
//               />
//               {errors.price && (
//                 <p className="text-sm text-red-500">{errors.price.message}</p>
//               )}
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="stock">Stock</Label>
//               <Input
//                 id="stock"
//                 type="number"
//                 {...register('stock', { valueAsNumber: true })}
//                 placeholder="0"
//               />
//               {errors.stock && (
//                 <p className="text-sm text-red-500">{errors.stock.message}</p>
//               )}
//             </div>
//           </div>
//         </>
//       )}

//       <div className="space-y-2">
//         <Label htmlFor="status">Status</Label>
//         <Select
//           value={statusValue}
//           onValueChange={(value) => setValue('status', value as ProductStatus)}
//         >
//           <SelectTrigger>
//             <SelectValue placeholder="Select status" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="active">Active</SelectItem>
//             <SelectItem value="inactive">Inactive</SelectItem>
//             <SelectItem value="out-of-stock">Out of Stock</SelectItem>
//           </SelectContent>
//         </Select>
//         {errors.status && (
//           <p className="text-sm text-red-500">{errors.status.message}</p>
//         )}
//       </div>

//       {mode !== 'status' && (
//         <div className="space-y-2">
//           <Label htmlFor="description">Description (Optional)</Label>
//           <Input
//             id="description"
//             {...register('description')}
//             placeholder="Enter product description"
//           />
//         </div>
//       )}

//       <div className="flex justify-end space-x-2 pt-4">
//         <Button type="button" variant="outline" onClick={onCancel}>
//           Cancel
//         </Button>
//         <Button type="submit" disabled={isLoading}>
//           {isLoading
//             ? 'Saving...'
//             : mode === 'create'
//               ? 'Create Product'
//               : 'Save Changes'}
//         </Button>
//       </div>
//     </form>
//   );
// }
