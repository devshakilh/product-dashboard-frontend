'use client';

import { useState } from 'react';
import ProductModal from '@/features/dashboard/products/product-modal.component';
import ProductTableSkeleton from '@/features/dashboard/products/product-table.skeleton';
import ProductTable from '@/features/dashboard/products/products-tables.component';
import { Button } from '@/features/ui';
import { Plus } from 'lucide-react';

import { Product } from '@/types/product';
import { useFirestoreRealtime } from '@/lib/hooks/useFirestoreRealtime';

export default function ProductList() {
  const { products, loading } = useFirestoreRealtime();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [modalMode, setModalMode] = useState<'create' | 'edit' | 'status'>(
    'create'
  );

  const handleCreate = () => {
    setSelectedProduct(null);
    setModalMode('create');
    setIsModalOpen(true);
  };

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setModalMode('edit');
    setIsModalOpen(true);
  };

  const handleStatusChange = (product: Product) => {
    setSelectedProduct(product);
    setModalMode('status');
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  if (loading) {
    return <ProductTableSkeleton />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Products</h2>
          <p className="mt-1 text-gray-600">
            Manage your product inventory in real-time
          </p>
        </div>
        <Button onClick={handleCreate} className="flex items-center space-x-2">
          <Plus className="size-4" />
          <span>Add Product</span>
        </Button>
      </div>

      <ProductTable
        products={products}
        onEdit={handleEdit}
        onStatusChange={handleStatusChange}
      />

      <ProductModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        product={selectedProduct}
        mode={modalMode}
      />
    </div>
  );
}
