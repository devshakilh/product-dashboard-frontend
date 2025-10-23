/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/display-name */

import ProductList from '@/features/dashboard/products/product-list.component';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Product } from '@/types/product';
import { useFirestoreRealtime } from '@/lib/hooks/useFirestoreRealtime';

// Mock dependencies
jest.mock('@/lib/hooks/useFirestoreRealtime');
jest.mock('@/features/ui', () => ({
  Button: ({ children, onClick, className }: any) => (
    <button onClick={onClick} className={className}>
      {children}
    </button>
  ),
}));
jest.mock('@/features/dashboard/products/product-table.skeleton', () => () => (
  <div data-testid="product-table-skeleton">Loading...</div>
));
jest.mock('@/features/dashboard/products/products-tables.component', () => ({
  __esModule: true,
  default: ({ products, onEdit, onStatusChange }: any) => (
    <div data-testid="product-table">
      {products.map((product: Product) => (
        <div key={product.id}>
          <span>{product.name}</span>
          <span>{product.category}</span>
          <button
            data-testid={`edit-${product.id}`}
            onClick={() => onEdit(product)}
          >
            Edit
          </button>
          <button
            data-testid={`status-${product.id}`}
            onClick={() => onStatusChange(product)}
          >
            Change Status
          </button>
        </div>
      ))}
    </div>
  ),
}));
jest.mock('@/features/dashboard/products/product-modal.component', () => ({
  __esModule: true,
  default: ({ isOpen, onClose, product, mode }: any) => (
    <div data-testid="product-modal">
      {isOpen ? (
        <>
          <span>Modal Open: {mode}</span>
          <span>Product: {product?.name || 'None'}</span>
          <span>Category: {product?.category || 'None'}</span>
          <button data-testid="close-modal" onClick={onClose}>
            Close
          </button>
        </>
      ) : (
        'Modal Closed'
      )}
    </div>
  ),
}));
jest.mock('lucide-react', () => ({
  Plus: () => <span data-testid="plus-icon">Plus</span>,
}));

// Mock useFirestoreRealtime
const mockUseFirestoreRealtime = useFirestoreRealtime as jest.Mock;

describe('ProductList Component', () => {
  const mockProducts: Product[] = [
    {
      id: '1',
      name: 'Laptop',
      category: 'Electronics',
      price: 999,
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
      stock: 50,
      status: 'active',
      description: 'A comfy t-shirt',
      createdAt: '2025-10-23T09:00:00Z',
      updatedAt: '2025-10-23T09:00:00Z',
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state with ProductTableSkeleton when loading is true', () => {
    mockUseFirestoreRealtime.mockReturnValue({
      products: [],
      loading: true,
    });

    render(<ProductList />);

    expect(screen.getByTestId('product-table-skeleton')).toBeInTheDocument();
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    expect(screen.queryByTestId('product-table')).not.toBeInTheDocument();
    expect(screen.queryByTestId('product-modal')).not.toBeInTheDocument();
  });

  it('renders product table and add button when loading is false', () => {
    mockUseFirestoreRealtime.mockReturnValue({
      products: mockProducts,
      loading: false,
    });

    render(<ProductList />);

    // Check title and description
    expect(screen.getByText('Products')).toBeInTheDocument();
    expect(
      screen.getByText('Manage your product inventory in real-time')
    ).toBeInTheDocument();

    // Check Add Product button
    const addButton = screen.getByRole('button', { name: /Add Product/i });
    expect(addButton).toBeInTheDocument();
    expect(screen.getByTestId('plus-icon')).toBeInTheDocument();

    // Check ProductTable
    expect(screen.getByTestId('product-table')).toBeInTheDocument();
    expect(screen.getByText('Laptop')).toBeInTheDocument();
    expect(screen.getByText('Electronics')).toBeInTheDocument();
    expect(screen.getByText('T-Shirt')).toBeInTheDocument();
    expect(screen.getByText('Clothing')).toBeInTheDocument();
    expect(screen.getByTestId('edit-1')).toBeInTheDocument();
    expect(screen.getByTestId('status-2')).toBeInTheDocument();

    // Check ProductModal is closed
    expect(screen.getByTestId('product-modal')).toHaveTextContent(
      'Modal Closed'
    );
  });

  it('opens modal in create mode when Add Product button is clicked', async () => {
    mockUseFirestoreRealtime.mockReturnValue({
      products: mockProducts,
      loading: false,
    });

    render(<ProductList />);

    const addButton = screen.getByRole('button', { name: /Add Product/i });
    await userEvent.click(addButton);

    const modal = screen.getByTestId('product-modal');
    expect(modal).toHaveTextContent('Modal Open: create');
    expect(modal).toHaveTextContent('Product: None');
    expect(modal).toHaveTextContent('Category: None');
    expect(screen.getByTestId('close-modal')).toBeInTheDocument();
  });

  it('opens modal in edit mode when edit button is clicked', async () => {
    mockUseFirestoreRealtime.mockReturnValue({
      products: mockProducts,
      loading: false,
    });

    render(<ProductList />);

    const editButton = screen.getByTestId('edit-1');
    await userEvent.click(editButton);

    const modal = screen.getByTestId('product-modal');
    expect(modal).toHaveTextContent('Modal Open: edit');
    expect(modal).toHaveTextContent('Product: Laptop');
    expect(modal).toHaveTextContent('Category: Electronics');
    expect(screen.getByTestId('close-modal')).toBeInTheDocument();
  });

  it('opens modal in status mode when status change button is clicked', async () => {
    mockUseFirestoreRealtime.mockReturnValue({
      products: mockProducts,
      loading: false,
    });

    render(<ProductList />);

    const statusButton = screen.getByTestId('status-2');
    await userEvent.click(statusButton);

    const modal = screen.getByTestId('product-modal');
    expect(modal).toHaveTextContent('Modal Open: status');
    expect(modal).toHaveTextContent('Product: T-Shirt');
    expect(modal).toHaveTextContent('Category: Clothing');
    expect(screen.getByTestId('close-modal')).toBeInTheDocument();
  });

  it('closes modal and resets selected product when close is triggered', async () => {
    mockUseFirestoreRealtime.mockReturnValue({
      products: mockProducts,
      loading: false,
    });

    render(<ProductList />);

    // Open modal in edit mode
    const editButton = screen.getByTestId('edit-1');
    await userEvent.click(editButton);
    expect(screen.getByTestId('product-modal')).toHaveTextContent(
      'Modal Open: edit'
    );
    expect(screen.getByTestId('product-modal')).toHaveTextContent(
      'Product: Laptop'
    );

    // Close modal
    const closeButton = screen.getByTestId('close-modal');
    await userEvent.click(closeButton);

    expect(screen.getByTestId('product-modal')).toHaveTextContent(
      'Modal Closed'
    );
  });
});
