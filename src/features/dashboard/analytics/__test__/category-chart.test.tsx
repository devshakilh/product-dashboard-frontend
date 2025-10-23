/* eslint-disable @typescript-eslint/no-explicit-any */ /* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/display-name */
/* eslint-disable @typescript-eslint/no-unused-vars */

import CategoryChart from '@/features/dashboard/analytics/category-chart.component';
import { render, screen } from '@testing-library/react';

import { Product } from '@/types/product';

// Mock dependencies
jest.mock('@/features/ui', () => ({
  Card: ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className: string;
  }) => (
    <div data-testid="card" className={className}>
      {children}
    </div>
  ),
  CardHeader: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="card-header">{children}</div>
  ),
  CardTitle: ({ children }: { children: React.ReactNode }) => (
    <h3 data-testid="card-title">{children}</h3>
  ),
  CardDescription: ({ children }: { children: React.ReactNode }) => (
    <p data-testid="card-description">{children}</p>
  ),
  CardContent: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="card-content">{children}</div>
  ),
  CardFooter: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="card-footer">{children}</div>
  ),
  ChartContainer: ({
    children,
    config,
    className,
  }: {
    children: React.ReactNode;
    config: any;
    className: string;
  }) => (
    <div data-testid="chart-container" className={className}>
      {children}
    </div>
  ),
  ChartTooltip: ({ content }: { content: React.ReactNode }) => (
    <div data-testid="chart-tooltip">{content}</div>
  ),
  ChartTooltipContent: () => (
    <div data-testid="chart-tooltip-content">Tooltip</div>
  ),
}));

jest.mock('lucide-react', () => ({
  TrendingUp: jest.fn(() => (
    <span data-testid="trending-up-icon">TrendingUp Icon</span>
  )),
}));

jest.mock('recharts', () => ({
  PieChart: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="pie-chart">{children}</div>
  ),
  Pie: ({
    data,
    dataKey,
    nameKey,
    cx,
    cy,
    innerRadius,
    outerRadius,
    labelLine,
    label,
    children,
  }: any) => (
    <div
      data-testid="pie"
      data-datakey={dataKey}
      data-namekey={nameKey}
      data-cx={cx}
      data-cy={cy}
      data-inner-radius={innerRadius}
      data-outer-radius={outerRadius}
      data-label-line={labelLine}
    >
      {data.map((entry: any, index: number) => (
        <div key={`pie-entry-${index}`} data-testid={`pie-entry-${entry.name}`}>
          {entry.name}: {entry.value}
        </div>
      ))}
      {children}
      {label && <div data-testid="pie-label">Label Rendered</div>}
    </div>
  ),
  Cell: ({ fill }: { fill: string }) => (
    <div data-testid="cell" style={{ backgroundColor: fill }} />
  ),
}));

describe('CategoryChart Component', () => {
  const mockProducts: Product[] = [
    {
      id: '1',
      name: 'Smartphone',
      price: 100,
      stock: 5,
      status: 'active',
      category: 'Electronics',
      createdAt: '2023-01-01',
      updatedAt: '2023-01-02',
    },
    {
      id: '2',
      name: 'T-Shirt',
      price: 200,
      stock: 3,
      status: 'inactive',
      category: 'Clothing',
      createdAt: '2023-01-01',
      updatedAt: '2023-01-02',
    },
    {
      id: '3',
      name: 'Laptop',
      price: 50,
      stock: 15,
      status: 'active',
      category: 'Electronics',
      createdAt: '2023-01-01',
      updatedAt: '2023-01-02',
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders correctly with products', () => {
    render(<CategoryChart products={mockProducts} />);

    expect(screen.getByTestId('card')).toBeInTheDocument();
    expect(screen.getByTestId('card-header')).toBeInTheDocument();
    expect(screen.getByTestId('card-title')).toHaveTextContent(
      'Products by Category'
    );
    expect(screen.getByTestId('card-description')).toHaveTextContent(
      'Distribution of products across categories'
    );
    expect(screen.getByTestId('card-content')).toBeInTheDocument();
    expect(screen.getByTestId('card-footer')).toBeInTheDocument();

    expect(screen.getByTestId('chart-container')).toBeInTheDocument();
    expect(screen.getByTestId('chart-container')).toHaveClass(
      'mx-auto aspect-square max-h-[250px]'
    );
    expect(screen.getByTestId('pie-chart')).toBeInTheDocument();

    const pie = screen.getByTestId('pie');
    expect(pie).toHaveAttribute('data-datakey', 'value');
    expect(pie).toHaveAttribute('data-namekey', 'name');
    expect(pie).toHaveAttribute('data-cx', '50%');
    expect(pie).toHaveAttribute('data-cy', '50%');
    expect(pie).toHaveAttribute('data-inner-radius', '50');
    expect(pie).toHaveAttribute('data-outer-radius', '80');
    expect(pie).toHaveAttribute('data-label-line', 'false');

    expect(screen.getByTestId('pie-entry-Electronics')).toHaveTextContent(
      'Electronics: 2'
    );
    expect(screen.getByTestId('pie-entry-Clothing')).toHaveTextContent(
      'Clothing: 1'
    );
    expect(screen.getByTestId('pie-label')).toBeInTheDocument();

    const cells = screen.getAllByTestId('cell');
    expect(cells).toHaveLength(2);
    expect(cells[0]).toHaveStyle({ backgroundColor: '#3b82f6' });
    expect(cells[1]).toHaveStyle({ backgroundColor: '#10b981' });

    expect(screen.getByText('100%')).toBeInTheDocument();
    expect(screen.getByTestId('card-footer')).toHaveTextContent(
      'Showing total products: 3'
    );
    expect(screen.getByTestId('trending-up-icon')).toBeInTheDocument();
  });

  test('handles empty products array', () => {
    render(<CategoryChart products={[]} />);

    expect(screen.getByTestId('card')).toBeInTheDocument();
    expect(screen.getByTestId('card-title')).toHaveTextContent(
      'Products by Category'
    );
    expect(screen.getByTestId('card-description')).toHaveTextContent(
      'Distribution of products across categories'
    );

    expect(screen.getByTestId('pie-chart')).toBeInTheDocument();
    expect(screen.queryAllByTestId(/pie-entry-/)).toHaveLength(0);
    expect(screen.queryByTestId('pie-label')).not.toBeInTheDocument();

    expect(screen.getByText('100%')).toBeInTheDocument();
    expect(screen.getByTestId('card-footer')).toHaveTextContent(
      'Showing total products: 0'
    );
  });

  test('correctly calculates category data', () => {
    render(<CategoryChart products={mockProducts} />);

    expect(screen.getByTestId('pie-entry-Electronics')).toHaveTextContent(
      'Electronics: 2'
    );
    expect(screen.getByTestId('pie-entry-Clothing')).toHaveTextContent(
      'Clothing: 1'
    );
  });

  test('applies correct colors to cells', () => {
    const extendedProducts: Product[] = [
      ...mockProducts,
      {
        id: '4',
        name: 'Book',
        price: 150,
        stock: 10,
        status: 'active',
        category: 'Books',
        createdAt: '2023-01-01',
        updatedAt: '2023-01-02',
      },
      {
        id: '5',
        name: 'Toy',
        price: 80,
        stock: 7,
        status: 'inactive',
        category: 'Toys',
        createdAt: '2023-01-01',
        updatedAt: '2023-01-02',
      },
    ];
    render(<CategoryChart products={extendedProducts} />);

    const cells = screen.getAllByTestId('cell');
    expect(cells).toHaveLength(4);
    expect(cells[0]).toHaveStyle({ backgroundColor: '#3b82f6' });
    expect(cells[1]).toHaveStyle({ backgroundColor: '#10b981' });
    expect(cells[2]).toHaveStyle({ backgroundColor: '#f59e0b' });
    expect(cells[3]).toHaveStyle({ backgroundColor: '#ef4444' });
  });

  test('renders tooltip correctly', () => {
    render(<CategoryChart products={mockProducts} />);

    expect(screen.getByTestId('chart-tooltip')).toBeInTheDocument();
    expect(screen.getByTestId('chart-tooltip-content')).toBeInTheDocument();
  });
});
