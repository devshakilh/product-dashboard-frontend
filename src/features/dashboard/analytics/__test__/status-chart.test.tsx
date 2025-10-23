/* eslint-disable @typescript-eslint/no-explicit-any */ /* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/display-name */
/* eslint-disable @typescript-eslint/no-unused-vars */

import StatusChart from '@/features/dashboard/analytics/status-chart.component';
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

jest.mock('recharts', () => {
  const Rectangle = ({
    fillOpacity,
    stroke,
    strokeDasharray,
    strokeDashoffset,
  }: any) => (
    <div
      data-testid="rectangle"
      data-fill-opacity={fillOpacity}
      data-stroke={stroke}
      data-strokedasharray={strokeDasharray}
      data-strokedashoffset={strokeDashoffset}
    />
  );

  return {
    BarChart: ({
      children,
      data,
    }: {
      children: React.ReactNode;
      data: any[];
    }) => (
      <div data-testid="bar-chart">
        {data.map((entry: any, index: number) => (
          <div
            key={`bar-entry-${index}`}
            data-testid={`bar-entry-${entry.name}`}
          >
            {entry.name}: {entry.count}
          </div>
        ))}
        {children}
      </div>
    ),
    Bar: ({
      dataKey,
      strokeWidth,
      radius,
      activeIndex,
      activeBar,
      children,
    }: any) => {
      // Call activeBar if it's a function to render the Rectangle
      const activeBarElement =
        activeBar && typeof activeBar === 'function'
          ? activeBar({
              payload: { fill: '#10b981' },
              fillOpacity: 0.8,
              stroke: '#10b981',
              strokeDasharray: 4,
              strokeDashoffset: 4,
            })
          : null;

      return (
        <div
          data-testid="bar"
          data-datakey={dataKey}
          data-stroke-width={strokeWidth}
          data-radius={radius}
          data-active-index={activeIndex}
        >
          {children}
          {activeBarElement}
          {activeBar && typeof activeBar !== 'function' && (
            <div data-testid="active-bar">Active Bar</div>
          )}
        </div>
      );
    },
    CartesianGrid: ({
      vertical,
      stroke,
    }: {
      vertical: boolean;
      stroke: string;
    }) => (
      <div
        data-testid="cartesian-grid"
        data-vertical={vertical}
        data-stroke={stroke}
      />
    ),
    XAxis: ({
      dataKey,
      tickLine,
      tickMargin,
      axisLine,
      tickFormatter,
    }: any) => (
      <div
        data-testid="x-axis"
        data-datakey={dataKey}
        data-tickline={tickLine}
        data-tickmargin={tickMargin}
        data-axisline={axisLine}
      >
        XAxis: {tickFormatter ? 'Formatted' : 'Not Formatted'}
      </div>
    ),
    YAxis: () => <div data-testid="y-axis">YAxis</div>,
    Rectangle,
  };
});

describe('StatusChart Component', () => {
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
      stock: 0,
      status: 'out-of-stock',
      category: 'Electronics',
      createdAt: '2023-01-01',
      updatedAt: '2023-01-02',
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders correctly with products', () => {
    render(<StatusChart products={mockProducts} />);

    // Check Card structure
    expect(screen.getByTestId('card')).toBeInTheDocument();
    expect(screen.getByTestId('card')).toHaveClass(
      'transition-shadow hover:shadow-lg'
    );
    expect(screen.getByTestId('card-header')).toBeInTheDocument();
    expect(screen.getByTestId('card-title')).toHaveTextContent(
      'Product Status Distribution'
    );
    expect(screen.getByTestId('card-description')).toHaveTextContent(
      'Current product status overview'
    );
    expect(screen.getByTestId('card-content')).toBeInTheDocument();
    expect(screen.getByTestId('card-footer')).toBeInTheDocument();

    expect(screen.getByTestId('chart-container')).toBeInTheDocument();
    expect(screen.getByTestId('bar-chart')).toBeInTheDocument();

    // Check status data
    expect(screen.getByTestId('bar-entry-active')).toHaveTextContent(
      'active: 1'
    );
    expect(screen.getByTestId('bar-entry-inactive')).toHaveTextContent(
      'inactive: 1'
    );
    expect(screen.getByTestId('bar-entry-out-of-stock')).toHaveTextContent(
      'out-of-stock: 1'
    );

    // Check Bar component
    const bar = screen.getByTestId('bar');
    expect(bar).toHaveAttribute('data-datakey', 'count');
    expect(bar).toHaveAttribute('data-stroke-width', '2');
    expect(bar).toHaveAttribute('data-radius', '8');
    expect(bar).toHaveAttribute('data-active-index', '0');

    // Check CartesianGrid
    const grid = screen.getByTestId('cartesian-grid');
    expect(grid).toHaveAttribute('data-vertical', 'false');
    expect(grid).toHaveAttribute('data-stroke', '#e5e7eb');

    const xAxis = screen.getByTestId('x-axis');
    expect(xAxis).toHaveAttribute('data-datakey', 'name');
    expect(xAxis).toHaveAttribute('data-tickline', 'false');
    expect(xAxis).toHaveAttribute('data-tickmargin', '10');
    expect(xAxis).toHaveAttribute('data-axisline', 'false');
    expect(xAxis).toHaveTextContent('XAxis: Formatted');

    expect(screen.getByTestId('y-axis')).toBeInTheDocument();

    // Check Rectangle (activeBar)
    const rectangle = screen.getByTestId('rectangle');
    expect(rectangle).toHaveAttribute('data-fill-opacity', '0.8');
    expect(rectangle).toHaveAttribute('data-strokedasharray', '4');
    expect(rectangle).toHaveAttribute('data-strokedashoffset', '4');

    // Check Tooltip
    expect(screen.getByTestId('chart-tooltip')).toBeInTheDocument();
    expect(screen.getByTestId('chart-tooltip-content')).toBeInTheDocument();

    expect(screen.getByTestId('card-footer')).toHaveTextContent(
      'Product status overview'
    );
    expect(screen.getByTestId('card-footer')).toHaveTextContent(
      'Showing distribution of product statuses'
    );
    expect(screen.getByTestId('trending-up-icon')).toBeInTheDocument();
  });

  test('handles empty products array', () => {
    render(<StatusChart products={[]} />);

    // Check Card structure
    expect(screen.getByTestId('card')).toBeInTheDocument();
    expect(screen.getByTestId('card-title')).toHaveTextContent(
      'Product Status Distribution'
    );
    expect(screen.getByTestId('card-description')).toHaveTextContent(
      'Current product status overview'
    );

    // Check BarChart with no data
    expect(screen.getByTestId('bar-chart')).toBeInTheDocument();
    expect(screen.getByTestId('bar-entry-active')).toHaveTextContent(
      'active: 0'
    );
    expect(screen.getByTestId('bar-entry-inactive')).toHaveTextContent(
      'inactive: 0'
    );
    expect(screen.getByTestId('bar-entry-out-of-stock')).toHaveTextContent(
      'out-of-stock: 0'
    );

    expect(screen.getByTestId('card-footer')).toHaveTextContent(
      'Showing distribution of product statuses'
    );
  });

  test('correctly calculates status data', () => {
    render(<StatusChart products={mockProducts} />);

    expect(screen.getByTestId('bar-entry-active')).toHaveTextContent(
      'active: 1'
    );
    expect(screen.getByTestId('bar-entry-inactive')).toHaveTextContent(
      'inactive: 1'
    );
    expect(screen.getByTestId('bar-entry-out-of-stock')).toHaveTextContent(
      'out-of-stock: 1'
    );
  });

  test('applies correct colors to bars', () => {
    render(<StatusChart products={mockProducts} />);

    const rectangle = screen.getByTestId('rectangle');
    expect(rectangle).toHaveAttribute('data-stroke', '#10b981');
  });

  test('renders tooltip correctly', () => {
    render(<StatusChart products={mockProducts} />);

    expect(screen.getByTestId('chart-tooltip')).toBeInTheDocument();
    expect(screen.getByTestId('chart-tooltip-content')).toBeInTheDocument();
  });
});
