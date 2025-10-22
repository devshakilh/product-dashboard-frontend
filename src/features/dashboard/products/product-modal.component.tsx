'use client';

import AddEditProductForm from '@/features/dashboard/products/add-edit-form.component';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/features/ui';

import { Product } from '@/types/product';

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  mode: 'create' | 'edit' | 'status';
}

export default function ProductModal({
  isOpen,
  onClose,
  product,
  mode,
}: ProductModalProps) {
  const titles = {
    create: 'Add New Product',
    edit: 'Edit Product',
    status: 'Change Product Status',
  };

  const descriptions = {
    create: 'Fill in the details to add a new product to your inventory.',
    edit: 'Update the product information below.',
    status: 'Change the status of the product.',
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>{titles[mode]}</DialogTitle>
          <DialogDescription>{descriptions[mode]}</DialogDescription>
        </DialogHeader>
        <AddEditProductForm
          product={product}
          mode={mode}
          onSuccess={onClose}
          onCancel={onClose}
        />
      </DialogContent>
    </Dialog>
  );
}
