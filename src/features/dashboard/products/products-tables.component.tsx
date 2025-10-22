import ProductTableSkeleton from '@/features/dashboard/products/product-table.skeleton';
import { Badge, ReusableTable } from '@/features/ui';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';

import { Product, ProductStatus } from '@/types/product';
import { useDeleteProductMutation } from '@/lib/store/api/productsApi';

interface ProductTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onStatusChange: (product: Product) => void;
  isLoading?: boolean;
}

const statusColors: Record<ProductStatus, string> = {
  active: 'bg-green-100 text-green-800 border-green-200',
  inactive: 'bg-gray-100 text-gray-800 border-gray-200',
  'out-of-stock': 'bg-red-100 text-red-800 border-red-200',
};

export default function ProductTable({
  products,
  onEdit,
  onStatusChange,
  isLoading = false,
}: ProductTableProps) {
  const [deleteProduct] = useDeleteProductMutation();

  const columns: ColumnDef<Product>[] = [
    {
      id: 'serial',
      header: '#',
      cell: ({ row }) => <div className="text-gray-900">{row.index + 1}</div>,
    },
    {
      accessorKey: 'name',
      header: 'Name',
      cell: ({ row }) => (
        <div className="font-medium text-gray-900">{row.original.name}</div>
      ),
    },
    {
      accessorKey: 'category',
      header: 'Category',
      cell: ({ row }) => (
        <div className="text-gray-600">{row.original.category}</div>
      ),
    },
    {
      accessorKey: 'price',
      header: 'Price',
      cell: ({ row }) => (
        <div className="font-medium text-green-600">
          ${row.original.price.toFixed(2)}
        </div>
      ),
    },
    {
      accessorKey: 'stock',
      header: 'Stock',
      cell: ({ row }) => {
        const stock = row.original.stock;
        return (
          <div
            className={
              stock < 10 ? 'font-medium text-red-600' : 'text-gray-900'
            }
          >
            {stock} units
          </div>
        );
      },
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const status = row.original.status;
        return (
          <Badge className={statusColors[status]} variant="secondary">
            {status.replace('-', ' ').toUpperCase()}
          </Badge>
        );
      },
    },
    {
      accessorKey: 'createdAt',
      header: 'Created',
      cell: ({ row }) => {
        const date = row.original.createdAt;
        return (
          <div className="text-sm text-gray-600">
            {format(new Date(date), 'MMM dd, yyyy')}
          </div>
        );
      },
    },
  ];

  return (
    <ReusableTable
      data={products}
      columns={columns}
      isLoading={isLoading}
      skeletonComponent={ProductTableSkeleton}
      onEdit={onEdit}
      onStatusChange={onStatusChange}
      onDelete={async (id: string) => await deleteProduct(id).unwrap()}
      statusColors={statusColors}
      searchPlaceholder="Search products..."
      pageSize={10}
    />
  );
}
