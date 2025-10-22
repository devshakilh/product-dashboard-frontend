// 'use client';

// import { useState } from 'react';
// import { Button } from '@/features/ui';
// import ProductModal from '@/features/ui/atoms/modals/product-modal.component';
// import ProductTable from '@/features/ui/atoms/modals/tables';
// import { Plus } from 'lucide-react';

// import { Product } from '@/types/product';
// import { useFirestoreRealtime } from '@/lib/hooks/useFirestoreRealtime';

// export default function ProductsPage() {
//   const { products, loading } = useFirestoreRealtime();
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
//   const [modalMode, setModalMode] = useState<'create' | 'edit' | 'status'>(
//     'create'
//   );

//   const handleCreate = () => {
//     setSelectedProduct(null);
//     setModalMode('create');
//     setIsModalOpen(true);
//   };

//   const handleEdit = (product: Product) => {
//     setSelectedProduct(product);
//     setModalMode('edit');
//     setIsModalOpen(true);
//   };

//   const handleStatusChange = (product: Product) => {
//     setSelectedProduct(product);
//     setModalMode('status');
//     setIsModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//     setSelectedProduct(null);
//   };

//   if (loading) {
//     return (
//       <div className="flex h-64 items-center justify-center">
//         <div className="text-center">
//           <div className="mx-auto h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600"></div>
//           <p className="mt-4 text-gray-600">Loading products...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <div>
//           <h2 className="text-3xl font-bold text-gray-900">Products</h2>
//           <p className="mt-1 text-gray-600">
//             Manage your product inventory in real-time
//           </p>
//         </div>
//         <Button onClick={handleCreate} className="flex items-center space-x-2">
//           <Plus className="h-4 w-4" />
//           <span>Add Product</span>
//         </Button>
//       </div>

//       <ProductTable
//         products={products}
//         onEdit={handleEdit}
//         onStatusChange={handleStatusChange}
//       />

//       <ProductModal
//         isOpen={isModalOpen}
//         onClose={handleCloseModal}
//         product={selectedProduct}
//         mode={modalMode}
//       />
//     </div>
//   );
// }
