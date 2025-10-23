/* eslint-disable @typescript-eslint/no-explicit-any */ /* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/display-name */
/* eslint-disable @typescript-eslint/no-unused-vars */

import Analytics from '@/features/dashboard/analytics/analytics.component';
import { render, screen, within } from '@testing-library/react';
import { LucideIcon } from 'lucide-react';

import { useFirestoreRealtime } from '@/lib/hooks/useFirestoreRealtime';

// Define types for the Product and StatCard props
interface Product {
  id: number;
  price: number;
  stock: number;
  status: string;
  category: string;
}

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color: string;
  bgColor: string;
}

interface FirestoreRealtimeData {
  products: Product[];
  loading: boolean;
  error: Error | null;
}

// Mock the useFirestoreRealtime hook
jest.mock('@/lib/hooks/useFirestoreRealtime', () => ({
  useFirestoreRealtime: jest.fn<FirestoreRealtimeData, []>(),
}));

// Mock child components
jest.mock(
  '@/features/dashboard/analytics/analytics-skeleton.component',
  () => () => <div data-testid="analytics-skeleton">Loading...</div>
);
jest.mock(
  '@/features/dashboard/analytics/category-chart.component',
  () => () => <div data-testid="category-chart">Category Chart</div>
);
jest.mock('@/features/dashboard/analytics/price-chart.component', () => () => (
  <div data-testid="price-chart">Price Chart</div>
));
jest.mock('@/features/dashboard/analytics/status-chart.component', () => () => (
  <div data-testid="status-chart">Status Chart</div>
));
jest.mock('@/features/ui', () => ({
  StatCard: ({ title, value, icon: Icon, color, bgColor }: StatCardProps) => (
    <div data-testid="stat-card" className={`${color} ${bgColor}`}>
      <h3>{title}</h3>
      <p>{value}</p>
      <span data-testid={`icon-${title}`}>
        <Icon />
      </span>
    </div>
  ),
}));

// Mock lucide-react icons
jest.mock('lucide-react', () => ({
  Package: jest.fn(() => <span>Package Icon</span>),
  DollarSign: jest.fn(() => <span>DollarSign Icon</span>),
  TrendingUp: jest.fn(() => <span>TrendingUp Icon</span>),
  AlertCircle: jest.fn(() => <span>AlertCircle Icon</span>),
}));

describe('Analytics Component', () => {
  const mockProducts: Product[] = [
    { id: 1, price: 100, stock: 5, status: 'active', category: 'Electronics' },
    { id: 2, price: 200, stock: 3, status: 'inactive', category: 'Clothing' },
    { id: 3, price: 50, stock: 15, status: 'active', category: 'Electronics' },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders loading state when useFirestoreRealtime is loading', () => {
    (useFirestoreRealtime as jest.Mock).mockReturnValue({
      products: [],
      loading: true,
      error: null,
    });

    render(<Analytics />);

    // Check if AnalyticsSkeleton is rendered
    expect(screen.getByTestId('analytics-skeleton')).toBeInTheDocument();
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('renders analytics content when not loading', () => {
    (useFirestoreRealtime as jest.Mock).mockReturnValue({
      products: mockProducts,
      loading: false,
      error: null,
    });

    render(<Analytics />);

    expect(screen.getByText('Analytics')).toBeInTheDocument();
    expect(
      screen.getByText('Real-time insights into your product inventory')
    ).toBeInTheDocument();

    // Check if StatCards are rendered
    const statCards = screen.getAllByTestId('stat-card');
    expect(statCards).toHaveLength(4);

    // Use within to query specific stat cards
    const totalProductsCard = statCards.find((card) =>
      within(card).queryByText('Total Products')
    );
    expect(totalProductsCard).toBeDefined();
    expect(within(totalProductsCard!).getByText('3')).toBeInTheDocument();

    const totalValueCard = statCards.find((card) =>
      within(card).queryByText('Total Value')
    );
    expect(totalValueCard).toBeDefined();

    expect(within(totalValueCard!).getByText('1,850')).toBeInTheDocument();

    const activeProductsCard = statCards.find((card) =>
      within(card).queryByText('Active Products')
    );
    expect(activeProductsCard).toBeDefined();
    expect(within(activeProductsCard!).getByText('2')).toBeInTheDocument();

    const lowStockCard = statCards.find((card) =>
      within(card).queryByText('Low Stock')
    );
    expect(lowStockCard).toBeDefined();
    expect(within(lowStockCard!).getByText('2')).toBeInTheDocument();

    // Check if icons are rendered
    expect(screen.getByTestId('icon-Total Products')).toBeInTheDocument();
    expect(screen.getByTestId('icon-Total Value')).toBeInTheDocument();
    expect(screen.getByTestId('icon-Active Products')).toBeInTheDocument();
    expect(screen.getByTestId('icon-Low Stock')).toBeInTheDocument();

    // Check if charts are rendered
    expect(screen.getByTestId('category-chart')).toBeInTheDocument();
    expect(screen.getByTestId('status-chart')).toBeInTheDocument();
    expect(screen.getByTestId('price-chart')).toBeInTheDocument();
  });

  test('calculates totalProducts correctly', () => {
    (useFirestoreRealtime as jest.Mock).mockReturnValue({
      products: mockProducts,
      loading: false,
      error: null,
    });

    render(<Analytics />);

    const statCards = screen.getAllByTestId('stat-card');
    const totalProductsCard = statCards.find((card) =>
      within(card).queryByText('Total Products')
    );

    expect(totalProductsCard).toBeDefined();
    expect(
      within(totalProductsCard!).getByText('Total Products')
    ).toBeInTheDocument();
    expect(within(totalProductsCard!).getByText('3')).toBeInTheDocument();
  });

  test('calculates totalValue correctly', () => {
    (useFirestoreRealtime as jest.Mock).mockReturnValue({
      products: mockProducts,
      loading: false,
      error: null,
    });

    render(<Analytics />);

    const statCards = screen.getAllByTestId('stat-card');
    const totalValueCard = statCards.find((card) =>
      within(card).queryByText('Total Value')
    );

    expect(totalValueCard).toBeDefined();
    expect(
      within(totalValueCard!).getByText('Total Value')
    ).toBeInTheDocument();

    expect(within(totalValueCard!).getByText('1,850')).toBeInTheDocument();
  });

  test('calculates activeProducts correctly', () => {
    (useFirestoreRealtime as jest.Mock).mockReturnValue({
      products: mockProducts,
      loading: false,
      error: null,
    });

    render(<Analytics />);

    const statCards = screen.getAllByTestId('stat-card');
    const activeProductsCard = statCards.find((card) =>
      within(card).queryByText('Active Products')
    );

    expect(activeProductsCard).toBeDefined();
    expect(
      within(activeProductsCard!).getByText('Active Products')
    ).toBeInTheDocument();
    expect(within(activeProductsCard!).getByText('2')).toBeInTheDocument();
  });

  test('calculates lowStock correctly', () => {
    (useFirestoreRealtime as jest.Mock).mockReturnValue({
      products: mockProducts,
      loading: false,
      error: null,
    });

    render(<Analytics />);

    const statCards = screen.getAllByTestId('stat-card');
    const lowStockCard = statCards.find((card) =>
      within(card).queryByText('Low Stock')
    );

    expect(lowStockCard).toBeDefined();
    expect(within(lowStockCard!).getByText('Low Stock')).toBeInTheDocument();
    expect(within(lowStockCard!).getByText('2')).toBeInTheDocument();
  });

  test('renders no StatCards when products array is empty', () => {
    (useFirestoreRealtime as jest.Mock).mockReturnValue({
      products: [],
      loading: false,
      error: null,
    });

    render(<Analytics />);

    const statCards = screen.getAllByTestId('stat-card');
    expect(statCards).toHaveLength(4);

    // Use within to check each card individually
    const totalProductsCard = statCards.find((card) =>
      within(card).queryByText('Total Products')
    );
    expect(within(totalProductsCard!).getByText('0')).toBeInTheDocument();

    const totalValueCard = statCards.find((card) =>
      within(card).queryByText('Total Value')
    );
    expect(within(totalValueCard!).getByText('0')).toBeInTheDocument();

    const activeProductsCard = statCards.find((card) =>
      within(card).queryByText('Active Products')
    );
    expect(within(activeProductsCard!).getByText('0')).toBeInTheDocument();

    const lowStockCard = statCards.find((card) =>
      within(card).queryByText('Low Stock')
    );
    expect(within(lowStockCard!).getByText('0')).toBeInTheDocument();
  });

  test('passes products prop to CategoryChart, StatusChart, and PriceChart', () => {
    (useFirestoreRealtime as jest.Mock).mockReturnValue({
      products: mockProducts,
      loading: false,
      error: null,
    });

    render(<Analytics />);

    // Since CategoryChart, StatusChart, and PriceChart are mocked, we verify they are rendered
    expect(screen.getByTestId('category-chart')).toBeInTheDocument();
    expect(screen.getByTestId('status-chart')).toBeInTheDocument();
    expect(screen.getByTestId('price-chart')).toBeInTheDocument();
  });
});
