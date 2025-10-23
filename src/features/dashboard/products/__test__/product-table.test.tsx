/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/display-name */
/* eslint-disable @typescript-eslint/no-unused-vars */

import ProductTable from '@/features/dashboard/products/products-tables.component';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { format } from 'date-fns';

import { Product, ProductStatus } from '@/types/product';

interface ProductTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onStatusChange: (product: Product) => void;
  onDelete: (productId: string) => void;
  isLoading?: boolean;
}

const statusColors: Record<ProductStatus, string> = {
  active: 'bg-green-100 text-green-800 border-green-200',
  inactive: 'bg-gray-100 text-gray-800 border-gray-200',
  'out-of-stock': 'bg-red-100 text-red-800 border-red-200',
};

// Mock dependencies
jest.mock('@/lib/store/api/productsApi');
jest.mock('@/features/dashboard/products/product-table.skeleton', () => () => (
  <div data-testid="product-table-skeleton">Loading...</div>
));
jest.mock('@/features/ui', () => ({
  Badge: ({ children, className }: any) => (
    <span data-testid="badge" className={className}>
      {children}
    </span>
  ),
  ReusableTable: ({
    data,
    columns,
    isLoading,
    skeletonComponent: Skeleton,
    onEdit,
    onStatusChange,
    onDelete,
    statusColors,
  }: any) =>
    isLoading ? (
      <Skeleton />
    ) : (
      <div data-testid="reusable-table">
        <table>
          <thead>
            <tr>
              {columns.map((col: any) => (
                <th key={col.id || col.accessorKey}>{col.header}</th>
              ))}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item: any, index: number) => (
              <tr key={item.id}>
                {columns.map((col: any) => (
                  <td key={col.id || col.accessorKey}>
                    {col.cell({ row: { index, original: item } })}
                  </td>
                ))}
                <td>
                  <button
                    data-testid={`edit-${item.id}`}
                    onClick={() => onEdit(item)}
                  >
                    Edit
                  </button>
                  <button
                    data-testid={`status-${item.id}`}
                    onClick={() => onStatusChange(item)}
                  >
                    Status
                  </button>
                  <button
                    data-testid={`delete-${item.id}`}
                    onClick={() => onDelete(item.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div data-testid="status-colors">{JSON.stringify(statusColors)}</div>
      </div>
    ),
}));
jest.mock('date-fns', () => ({
  format: jest.fn((date: Date) => 'Oct 23, 2025'),
}));

// Mock useDeleteProductMutation
const mockDeleteProduct = jest.fn();
jest.mock('@/lib/store/api/productsApi', () => ({
  useDeleteProductMutation: () => [
    jest.fn().mockImplementation((id) => ({
      unwrap: mockDeleteProduct.mockResolvedValue({ id }),
    })),
    { isLoading: false },
  ],
}));

describe('ProductTable Component', () => {
  const mockProducts: Product[] = [
    {
      id: '1',
      name: 'Laptop',
      category: 'Electronics',
      price: 999.99,
      stock: 10,
      status: 'active',
      description: 'A powerful laptop',
      createdAt: '2025-10-23T09:00:00Z',
      updatedAt: '2025-10-23T09:00:00Z',
    },
    {
      id: '2',
      name: 'T-Shirt',
      category: 'Clothing',
      price: 20,
      stock: 5,
      status: 'out-of-stock',
      description: 'A comfy t-shirt',
      createdAt: '2025-10-23T09:00:00Z',
      updatedAt: '2025-10-23T09:00:00Z',
    },
  ];

  const defaultProps: ProductTableProps = {
    products: mockProducts,
    onEdit: jest.fn(),
    onStatusChange: jest.fn(),
    onDelete: jest.fn(),
    isLoading: false,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (format as jest.Mock).mockImplementation(() => 'Oct 23, 2025');
  });

  it('renders loading state with ProductTableSkeleton when isLoading is true', () => {
    render(<ProductTable {...defaultProps} isLoading={true} />);

    expect(screen.getByTestId('product-table-skeleton')).toBeInTheDocument();
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    expect(screen.queryByTestId('reusable-table')).not.toBeInTheDocument();
  });

  it('renders table with correct columns and data when isLoading is false', () => {
    render(<ProductTable {...defaultProps} />);

    const table = screen.getByTestId('reusable-table');
    expect(table).toBeInTheDocument();

    // Check headers
    expect(screen.getByRole('columnheader', { name: '#' })).toBeInTheDocument();
    expect(
      screen.getByRole('columnheader', { name: 'Name' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('columnheader', { name: 'Category' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('columnheader', { name: 'Price' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('columnheader', { name: 'Stock' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('columnheader', { name: 'Status' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('columnheader', { name: 'Created' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('columnheader', { name: 'Actions' })
    ).toBeInTheDocument();

    // Check data for first product (Laptop)
    const laptopRow = screen.getByText('Laptop').closest('tr')!;
    expect(within(laptopRow).getByText('1')).toBeInTheDocument();
    expect(within(laptopRow).getByText('Laptop')).toBeInTheDocument();
    expect(within(laptopRow).getByText('Electronics')).toBeInTheDocument();
    expect(within(laptopRow).getByText('$999.99')).toBeInTheDocument();
    expect(within(laptopRow).getByText('10 units')).toBeInTheDocument();
    expect(within(laptopRow).getByText('ACTIVE')).toBeInTheDocument();
    expect(within(laptopRow).getByText('Oct 23, 2025')).toBeInTheDocument();

    // Check data for second product (T-Shirt)
    const tshirtRow = screen.getByText('T-Shirt').closest('tr')!;
    expect(within(tshirtRow).getByText('2')).toBeInTheDocument();
    expect(within(tshirtRow).getByText('T-Shirt')).toBeInTheDocument();
    expect(within(tshirtRow).getByText('Clothing')).toBeInTheDocument();
    expect(within(tshirtRow).getByText('$20.00')).toBeInTheDocument();
    expect(within(tshirtRow).getByText('5 units')).toBeInTheDocument();
    expect(within(tshirtRow).getByText('OUT OF-STOCK')).toBeInTheDocument();
    expect(within(tshirtRow).getByText('Oct 23, 2025')).toBeInTheDocument();

    // Check status colors
    expect(screen.getByTestId('status-colors')).toHaveTextContent(
      JSON.stringify(statusColors)
    );
  });

  it('applies correct styling for stock and status', () => {
    render(<ProductTable {...defaultProps} />);

    // Stock < 10 should be red
    const stockLow = screen.getByText('5 units');
    expect(stockLow).toHaveClass('text-red-600');

    // Stock >= 10 should not be red
    const stockNormal = screen.getByText('10 units');
    expect(stockNormal).not.toHaveClass('text-red-600');

    // Status badge styling
    const activeBadge = screen.getAllByTestId('badge')[0];
    expect(activeBadge).toHaveClass(
      'bg-green-100 text-green-800 border-green-200'
    );
    expect(activeBadge).toHaveTextContent('ACTIVE');

    const outOfStockBadge = screen.getAllByTestId('badge')[1];
    expect(outOfStockBadge).toHaveClass(
      'bg-red-100 text-red-800 border-red-200'
    );
    expect(outOfStockBadge).toHaveTextContent('OUT OF-STOCK');
  });

  it('calls onEdit when edit button is clicked', async () => {
    render(<ProductTable {...defaultProps} />);

    const editButton = screen.getByTestId('edit-1');
    await userEvent.click(editButton);

    expect(defaultProps.onEdit).toHaveBeenCalledWith(mockProducts[0]);
    expect(defaultProps.onEdit).toHaveBeenCalledTimes(1);
  });

  it('calls onStatusChange when status button is clicked', async () => {
    render(<ProductTable {...defaultProps} />);

    const statusButton = screen.getByTestId('status-2');
    await userEvent.click(statusButton);

    expect(defaultProps.onStatusChange).toHaveBeenCalledWith(mockProducts[1]);
    expect(defaultProps.onStatusChange).toHaveBeenCalledTimes(1);
  });

  it('calls onDelete with useDeleteProductMutation when delete button is clicked', async () => {
    render(<ProductTable {...defaultProps} />);

    const deleteButton = screen.getByTestId('delete-1');
    await userEvent.click(deleteButton);

    expect(mockDeleteProduct).toHaveBeenCalled();
    expect(mockDeleteProduct).toHaveBeenCalledTimes(1);
  });

  it('handles 401 error from useDeleteProductMutation', async () => {
    mockDeleteProduct.mockRejectedValue({
      status: 401,
      data: { message: 'Unauthorized' },
    });

    render(<ProductTable {...defaultProps} />);

    const deleteButton = screen.getByTestId('delete-1');
    await userEvent.click(deleteButton);

    expect(mockDeleteProduct).toHaveBeenCalled();
    expect(mockDeleteProduct).toHaveBeenCalledTimes(1);
  });
});
