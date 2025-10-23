/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/display-name */
/* eslint-disable @typescript-eslint/no-unused-vars */

import ProductModal from '@/features/dashboard/products/product-modal.component';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Product } from '@/types/product';

// Mock UI components
jest.mock('@/features/ui', () => ({
  Dialog: ({ open, onOpenChange, children }: any) => (
    <div data-testid="dialog" aria-hidden={!open}>
      {open ? children : null}
    </div>
  ),
  DialogContent: ({ children, className }: any) => (
    <div data-testid="dialog-content" className={className}>
      {children}
    </div>
  ),
  DialogHeader: ({ children }: any) => (
    <div data-testid="dialog-header">{children}</div>
  ),
  DialogTitle: ({ children }: any) => (
    <h2 data-testid="dialog-title">{children}</h2>
  ),
  DialogDescription: ({ children }: any) => (
    <p data-testid="dialog-description">{children}</p>
  ),
}));

// Mock AddEditProductForm
jest.mock('@/features/dashboard/products/add-edit-form.component', () => ({
  __esModule: true,
  default: ({ product, mode, onSuccess, onCancel }: any) => (
    <div data-testid="add-edit-product-form">
      <span>Mode: {mode}</span>
      <span>Product: {product?.name || 'None'}</span>
      <button data-testid="form-submit" onClick={onSuccess}>
        Submit
      </button>
      <button data-testid="form-cancel" onClick={onCancel}>
        Cancel
      </button>
    </div>
  ),
}));

describe('ProductModal Component', () => {
  const mockProduct: Product = {
    id: '1',
    name: 'Laptop',
    category: 'Electronics',
    price: 999,
    stock: 10,
    status: 'active',
    description: 'A powerful laptop',
    createdAt: '2025-10-23T09:00:00Z',
    updatedAt: '2025-10-23T09:00:00Z',
  };

  const defaultProps = {
    isOpen: false,
    onClose: jest.fn(),
    product: null,
    mode: 'create' as const,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('does not render dialog content when isOpen is false', () => {
    render(<ProductModal {...defaultProps} />);

    expect(screen.getByTestId('dialog')).toHaveAttribute('aria-hidden', 'true');
    expect(screen.queryByTestId('dialog-content')).not.toBeInTheDocument();
    expect(screen.queryByTestId('dialog-header')).not.toBeInTheDocument();
    expect(screen.queryByTestId('dialog-title')).not.toBeInTheDocument();
    expect(screen.queryByTestId('dialog-description')).not.toBeInTheDocument();
    expect(
      screen.queryByTestId('add-edit-product-form')
    ).not.toBeInTheDocument();
  });

  it('renders dialog with create mode title and description when isOpen is true', () => {
    render(<ProductModal {...defaultProps} isOpen={true} />);

    expect(screen.getByTestId('dialog')).toHaveAttribute(
      'aria-hidden',
      'false'
    );
    expect(screen.getByTestId('dialog-content')).toHaveClass(
      'sm:max-w-[550px]'
    );
    expect(screen.getByTestId('dialog-title')).toHaveTextContent(
      'Add New Product'
    );
    expect(screen.getByTestId('dialog-description')).toHaveTextContent(
      'Fill in the details to add a new product to your inventory.'
    );
    expect(screen.getByTestId('add-edit-product-form')).toBeInTheDocument();
    expect(screen.getByTestId('add-edit-product-form')).toHaveTextContent(
      'Mode: create'
    );
    expect(screen.getByTestId('add-edit-product-form')).toHaveTextContent(
      'Product: None'
    );
  });

  it('renders dialog with edit mode title and description when mode is edit', () => {
    render(
      <ProductModal
        {...defaultProps}
        isOpen={true}
        mode="edit"
        product={mockProduct}
      />
    );

    expect(screen.getByTestId('dialog-title')).toHaveTextContent(
      'Edit Product'
    );
    expect(screen.getByTestId('dialog-description')).toHaveTextContent(
      'Update the product information below.'
    );
    expect(screen.getByTestId('add-edit-product-form')).toHaveTextContent(
      'Mode: edit'
    );
    expect(screen.getByTestId('add-edit-product-form')).toHaveTextContent(
      'Product: Laptop'
    );
  });

  it('renders dialog with status mode title and description when mode is status', () => {
    render(
      <ProductModal
        {...defaultProps}
        isOpen={true}
        mode="status"
        product={mockProduct}
      />
    );

    expect(screen.getByTestId('dialog-title')).toHaveTextContent(
      'Change Product Status'
    );
    expect(screen.getByTestId('dialog-description')).toHaveTextContent(
      'Change the status of the product.'
    );
    expect(screen.getByTestId('add-edit-product-form')).toHaveTextContent(
      'Mode: status'
    );
    expect(screen.getByTestId('add-edit-product-form')).toHaveTextContent(
      'Product: Laptop'
    );
  });

  it('calls onClose when cancel button is clicked in AddEditProductForm', async () => {
    render(<ProductModal {...defaultProps} isOpen={true} />);

    const cancelButton = screen.getByTestId('form-cancel');
    await userEvent.click(cancelButton);

    expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when form submission succeeds in AddEditProductForm', async () => {
    render(<ProductModal {...defaultProps} isOpen={true} />);

    const submitButton = screen.getByTestId('form-submit');
    await userEvent.click(submitButton);

    expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
  });

  it('passes correct props to AddEditProductForm', () => {
    render(
      <ProductModal
        {...defaultProps}
        isOpen={true}
        mode="edit"
        product={mockProduct}
      />
    );

    const form = screen.getByTestId('add-edit-product-form');
    expect(form).toHaveTextContent('Mode: edit');
    expect(form).toHaveTextContent('Product: Laptop');
  });
});
