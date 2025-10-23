/* eslint-disable @typescript-eslint/no-explicit-any */ /* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/display-name */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { useRouter } from 'next/navigation';
import AddEditProductForm from '@/features/dashboard/products/add-edit-form.component';
import { zodResolver } from '@hookform/resolvers/zod';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Product } from '@/types/product';
import {
  useCreateProductMutation,
  useUpdateProductMutation,
  useUpdateProductStatusMutation,
} from '@/lib/store/api/productsApi';

// Mock dependencies
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));
jest.mock('sonner', () => ({
  toast: {
    promise: jest.fn(),
    error: jest.fn(),
  },
}));
jest.mock('@hookform/resolvers/zod', () => ({
  zodResolver: jest.fn(),
}));
jest.mock('react-hook-form', () => ({
  useForm: jest.fn(),
}));
jest.mock('@/lib/store/api/productsApi', () => ({
  useCreateProductMutation: jest.fn(),
  useUpdateProductMutation: jest.fn(),
  useUpdateProductStatusMutation: jest.fn(),
}));
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}));
jest.mock('lucide-react', () => ({
  AlertCircle: () => <svg data-testid="alert-circle" />,
}));
jest.mock('@/features/ui', () => ({
  Button: ({ children, ...props }: any) => (
    <button {...props}>{children}</button>
  ),
  BaseForm: ({
    form,
    onSubmit,
    fields,
    submitButtonText,
    isLoading,
    extraContent,
  }: any) => (
    <form
      onSubmit={(e) => {
        e.preventDefault();

        const values = form.getValues();
        onSubmit(values);
      }}
    >
      {fields.map((field: any) => (
        <div key={field.name}>
          <label htmlFor={field.name}>{field.label}</label>
          {field.type === 'select' ? (
            <select
              id={field.name}
              {...form.register(field.name)}
              data-testid={`select-${field.name}`}
            >
              {field.options.map((option: any) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          ) : (
            <input
              id={field.name}
              type={field.type}
              {...form.register(field.name)}
              placeholder={field.placeholder}
              data-testid={`input-${field.name}`}
            />
          )}
          {form.formState.errors[field.name] && (
            <span data-testid={`error-${field.name}`}>
              {form.formState.errors[field.name].message}
            </span>
          )}
        </div>
      ))}
      <button type="submit" disabled={isLoading} data-testid="submit-button">
        {submitButtonText}
      </button>
      {extraContent}
    </form>
  ),
}));

describe('AddEditProductForm Component', () => {
  const mockProduct: Product = {
    id: '1',
    name: 'Laptop',
    category: 'Electronics',
    price: 999.99,
    stock: 10,
    status: 'active',
    description: 'A powerful laptop',
    createdAt: '2025-10-23T09:00:00Z',
    updatedAt: '2025-10-23T09:00:00Z',
  };

  const mockOnSuccess = jest.fn();
  const mockOnCancel = jest.fn();
  const mockPush = jest.fn();
  const mockCreateProduct = jest.fn();
  const mockUpdateProduct = jest.fn();
  const mockUpdateStatus = jest.fn();

  let mockFormValues: any = {};

  const mockFormMethods = {
    handleSubmit: jest.fn((cb) => (e?: any) => {
      e?.preventDefault?.();
      return cb(mockFormValues);
    }),
    formState: { errors: {}, isSubmitting: false },
    register: jest.fn().mockImplementation((name) => ({
      name,
      onChange: (e: any) => {
        mockFormValues[name] = e.target.value;
      },
      onBlur: jest.fn(),
      ref: jest.fn(),
    })),
    setValue: jest.fn((name, value) => {
      mockFormValues[name] = value;
    }),
    reset: jest.fn(),
    getValues: jest.fn(() => mockFormValues),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockFormValues = {};

    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    (useCreateProductMutation as jest.Mock).mockReturnValue([
      mockCreateProduct.mockImplementation(() => ({
        unwrap: jest.fn().mockResolvedValue({}),
      })),
      { isLoading: false },
    ]);
    (useUpdateProductMutation as jest.Mock).mockReturnValue([
      mockUpdateProduct.mockImplementation(() => ({
        unwrap: jest.fn().mockResolvedValue({}),
      })),
      { isLoading: false },
    ]);
    (useUpdateProductStatusMutation as jest.Mock).mockReturnValue([
      mockUpdateStatus.mockImplementation(() => ({
        unwrap: jest.fn().mockResolvedValue({}),
      })),
      { isLoading: false },
    ]);
    (useForm as jest.Mock).mockReturnValue(mockFormMethods);
    (zodResolver as jest.Mock).mockReturnValue(jest.fn());
    (toast.promise as jest.Mock).mockImplementation(
      (promise, { loading, success, error }) =>
        promise.then(success).catch(error)
    );
  });

  const defaultProps = {
    product: null,
    mode: 'create' as 'create' | 'edit' | 'status',
    onSuccess: mockOnSuccess,
    onCancel: mockOnCancel,
  };

  it('renders create form with all fields when mode is create', () => {
    render(<AddEditProductForm {...defaultProps} mode="create" />);

    expect(screen.getByLabelText('Product Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Category')).toBeInTheDocument();
    expect(screen.getByLabelText('Price ($)')).toBeInTheDocument();
    expect(screen.getByLabelText('Stock')).toBeInTheDocument();
    expect(screen.getByLabelText('Description (Optional)')).toBeInTheDocument();
    expect(screen.getByLabelText('Status')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Create Product' })
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
  });

  it('renders edit form with pre-filled fields when mode is edit', () => {
    render(
      <AddEditProductForm {...defaultProps} mode="edit" product={mockProduct} />
    );

    expect(mockFormMethods.setValue).toHaveBeenCalledWith(
      'name',
      mockProduct.name
    );
    expect(mockFormMethods.setValue).toHaveBeenCalledWith(
      'category',
      mockProduct.category
    );
    expect(mockFormMethods.setValue).toHaveBeenCalledWith(
      'price',
      mockProduct.price
    );
    expect(mockFormMethods.setValue).toHaveBeenCalledWith(
      'stock',
      mockProduct.stock
    );
    expect(mockFormMethods.setValue).toHaveBeenCalledWith(
      'status',
      mockProduct.status
    );
    expect(mockFormMethods.setValue).toHaveBeenCalledWith(
      'description',
      mockProduct.description
    );
    expect(screen.getByLabelText('Product Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Category')).toBeInTheDocument();
    expect(screen.getByLabelText('Price ($)')).toBeInTheDocument();
    expect(screen.getByLabelText('Stock')).toBeInTheDocument();
    expect(screen.getByLabelText('Description (Optional)')).toBeInTheDocument();
    expect(screen.getByLabelText('Status')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Save Changes' })
    ).toBeInTheDocument();
  });

  it('renders status form with only status field when mode is status', () => {
    render(
      <AddEditProductForm
        {...defaultProps}
        mode="status"
        product={mockProduct}
      />
    );

    expect(screen.queryByLabelText('Product Name')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Category')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Price ($)')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Stock')).not.toBeInTheDocument();
    expect(
      screen.queryByLabelText('Description (Optional)')
    ).not.toBeInTheDocument();
    expect(screen.getByLabelText('Status')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Save Changes' })
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
  });

  it('submits create form and calls createProduct mutation', async () => {
    render(<AddEditProductForm {...defaultProps} mode="create" />);

    // Set form values
    mockFormValues = {
      name: 'Tablet',
      category: 'Electronics',
      price: 499.99,
      stock: 20,
      status: 'active',
      description: 'A new tablet',
    };

    await userEvent.click(screen.getByTestId('submit-button'));

    await waitFor(() => {
      expect(mockCreateProduct).toHaveBeenCalledWith({
        name: 'Tablet',
        category: 'Electronics',
        price: 499.99,
        stock: 20,
        status: 'active',
        description: 'A new tablet',
      });
      expect(toast.promise).toHaveBeenCalled();
      expect(mockOnSuccess).toHaveBeenCalled();
    });
  });

  it('submits edit form and calls updateProduct mutation', async () => {
    render(
      <AddEditProductForm {...defaultProps} mode="edit" product={mockProduct} />
    );

    // Set updated form values
    mockFormValues = {
      name: 'Updated Laptop',
      category: 'Electronics',
      price: 1099.99,
      stock: 15,
      status: 'active',
      description: 'An updated powerful laptop',
    };

    await userEvent.click(screen.getByTestId('submit-button'));

    await waitFor(() => {
      expect(mockUpdateProduct).toHaveBeenCalledWith({
        id: mockProduct.id,
        data: {
          name: 'Updated Laptop',
          category: 'Electronics',
          price: 1099.99,
          stock: 15,
          status: 'active',
          description: 'An updated powerful laptop',
        },
      });
      expect(toast.promise).toHaveBeenCalled();
      expect(mockOnSuccess).toHaveBeenCalled();
    });
  });

  it('submits status form and calls updateStatus mutation', async () => {
    render(
      <AddEditProductForm
        {...defaultProps}
        mode="status"
        product={mockProduct}
      />
    );

    mockFormValues = { status: 'inactive' };

    await userEvent.click(screen.getByTestId('submit-button'));

    await waitFor(() => {
      expect(mockUpdateStatus).toHaveBeenCalledWith({
        id: mockProduct.id,
        data: { status: 'inactive' },
      });
      expect(toast.promise).toHaveBeenCalled();
      expect(mockOnSuccess).toHaveBeenCalled();
    });
  });

  it('displays validation errors for invalid input', async () => {
    mockFormMethods.formState.errors = {
      name: { message: 'Name is required' },
      category: { message: 'Category is required' },
      price: { message: 'Price must be a valid number' },
      stock: { message: 'Stock must be a valid number' },
    };

    render(<AddEditProductForm {...defaultProps} mode="create" />);

    expect(screen.getByTestId('error-name')).toHaveTextContent(
      'Name is required'
    );
    expect(screen.getByTestId('error-category')).toHaveTextContent(
      'Category is required'
    );
    expect(screen.getByTestId('error-price')).toHaveTextContent(
      'Price must be a valid number'
    );
    expect(screen.getByTestId('error-stock')).toHaveTextContent(
      'Stock must be a valid number'
    );
  });

  it('handles 401 error and redirects to login', async () => {
    mockCreateProduct.mockImplementation(() => ({
      unwrap: jest
        .fn()
        .mockRejectedValue({ status: 401, data: { message: 'Unauthorized' } }),
    }));

    render(<AddEditProductForm {...defaultProps} mode="create" />);

    mockFormValues = {
      name: 'Tablet',
      category: 'Electronics',
      price: 499.99,
      stock: 20,
      status: 'active',
      description: 'A new tablet',
    };

    await userEvent.click(screen.getByTestId('submit-button'));

    await waitFor(() => {
      // Check that the error message appears in the DOM
      expect(screen.getByRole('alert')).toHaveTextContent(
        'Your session has expired. Please log in again.'
      );
      expect(mockPush).toHaveBeenCalledWith('/login?session=expired');
    });
  });

  it('handles generic API error and displays error message', async () => {
    mockCreateProduct.mockImplementation(() => ({
      unwrap: jest
        .fn()
        .mockRejectedValue({ status: 500, data: { message: 'Server error' } }),
    }));

    render(<AddEditProductForm {...defaultProps} mode="create" />);

    mockFormValues = {
      name: 'Tablet',
      category: 'Electronics',
      price: 499.99,
      stock: 20,
      status: 'active',
      description: 'A new tablet',
    };

    await userEvent.click(screen.getByTestId('submit-button'));

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent('Server error');
    });
  });

  it('calls onCancel when cancel button is clicked', async () => {
    render(<AddEditProductForm {...defaultProps} mode="create" />);

    await userEvent.click(screen.getByRole('button', { name: 'Cancel' }));

    expect(mockOnCancel).toHaveBeenCalled();
  });

  it('disables submit and cancel buttons when loading', async () => {
    (useCreateProductMutation as jest.Mock).mockReturnValue([
      mockCreateProduct,
      { isLoading: true },
    ]);

    render(<AddEditProductForm {...defaultProps} mode="create" />);

    expect(screen.getByTestId('submit-button')).toHaveTextContent('Saving...');
    expect(screen.getByTestId('submit-button')).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeDisabled();
  });
});
