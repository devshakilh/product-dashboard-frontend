// /* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable react/display-name */

// import PriceChart from '@/features/dashboard/analytics/price-chart.component';
// import { render, screen } from '@testing-library/react';

// import { Product } from '@/types/product';

// // Mock dependencies
// jest.mock('@/features/ui', () => ({
//   Card: ({
//     children,
//     className,
//   }: {
//     children: React.ReactNode;
//     className: string;
//   }) => (
//     <div data-testid="card" className={className}>
//       {children}
//     </div>
//   ),
//   CardHeader: ({ children }: { children: React.ReactNode }) => (
//     <div data-testid="card-header">{children}</div>
//   ),
//   CardTitle: ({ children }: { children: React.ReactNode }) => (
//     <h3 data-testid="card-title">{children}</h3>
//   ),
//   CardDescription: ({ children }: { children: React.ReactNode }) => (
//     <p data-testid="card-description">{children}</p>
//   ),
//   CardContent: ({ children }: { children: React.ReactNode }) => (
//     <div data-testid="card-content">{children}</div>
//   ),
//   CardFooter: ({ children }: { children: React.ReactNode }) => (
//     <div data-testid="card-footer">{children}</div>
//   ),
//   ChartContainer: ({
//     children,
//     config,
//     className,
//   }: {
//     children: React.ReactNode;
//     config: any;
//     className: string;
//   }) => (
//     <div data-testid="chart-container" className={className}>
//       {children}
//     </div>
//   ),
//   ChartTooltip: ({ content }: { content: React.ReactNode }) => (
//     <div data-testid="chart-tooltip">{content}</div>
//   ),
//   ChartTooltipContent: ({ indicator }: { indicator: string }) => (
//     <div data-testid="chart-tooltip-content" data-indicator={indicator}>
//       Tooltip
//     </div>
//   ),
// }));

// jest.mock('lucide-react', () => ({
//   TrendingUp: jest.fn(() => (
//     <span data-testid="trending-up-icon">TrendingUp Icon</span>
//   )),
// }));

// jest.mock('recharts', () => ({
//   AreaChart: ({
//     children,
//     data,
//     margin,
//   }: {
//     children: React.ReactNode;
//     data: any[];
//     margin: any;
//   }) => (
//     <div data-testid="area-chart" data-margin={JSON.stringify(margin)}>
//       {data.map((entry: any, index: number) => (
//         <div
//           key={`area-entry-${index}`}
//           data-testid={`area-entry-${entry.name}`}
//         >
//           {entry.name}: {entry.price} ({entry.date})
//         </div>
//       ))}
//       {children}
//     </div>
//   ),
//   Area: ({ dataKey, type, fill, fillOpacity, stroke, strokeWidth }: any) => (
//     <div
//       data-testid="area"
//       data-datakey={dataKey}
//       data-type={type}
//       data-fill={fill}
//       data-fill-opacity={fillOpacity}
//       data-stroke={stroke}
//       data-stroke-width={strokeWidth}
//     />
//   ),
//   CartesianGrid: ({
//     vertical,
//     stroke,
//   }: {
//     vertical: boolean;
//     stroke: string;
//   }) => (
//     <div
//       data-testid="cartesian-grid"
//       data-vertical={vertical}
//       data-stroke={stroke}
//     />
//   ),
//   XAxis: ({ dataKey, tickLine, axisLine, tickMargin, tickFormatter }: any) => (
//     <div
//       data-testid="x-axis"
//       data-datakey={dataKey}
//       data-tickline={tickLine}
//       data-axisline={axisLine}
//       data-tickmargin={tickMargin}
//     >
//       XAxis: {tickFormatter ? 'Formatted' : 'Not Formatted'}
//     </div>
//   ),
//   YAxis: () => <div data-testid="y-axis">YAxis</div>,
// }));

// jest.mock('date-fns', () => ({
//   format: jest.fn((date: Date, formatStr: string) => {
//     const monthNames = [
//       'Jan',
//       'Feb',
//       'Mar',
//       'Apr',
//       'May',
//       'Jun',
//       'Jul',
//       'Aug',
//       'Sep',
//       'Oct',
//       'Nov',
//       'Dec',
//     ];
//     const d = new Date(date);
//     if (formatStr === 'MMM dd') {
//       return `${monthNames[d.getMonth()]} ${d.getDate().toString().padStart(2, '0')}`;
//     }
//     return '';
//   }),
// }));

// describe('PriceChart Component', () => {
//   const mockProducts: Product[] = [
//     {
//       id: '1',
//       name: 'Smartphone',
//       price: 100,
//       stock: 5,
//       status: 'active',
//       category: 'Electronics',
//       createdAt: '2023-01-01',
//       updatedAt: '2023-01-02',
//     },
//     {
//       id: '2',
//       name: 'T-Shirt with Long Name Here',
//       price: 200,
//       stock: 3,
//       status: 'inactive',
//       category: 'Clothing',
//       createdAt: '2023-01-02',
//       updatedAt: '2023-01-03',
//     },
//     {
//       id: '3',
//       name: 'Laptop',
//       price: 50,
//       stock: 0,
//       status: 'out-of-stock',
//       category: 'Electronics',
//       createdAt: '2023-01-03',
//       updatedAt: '2023-01-04',
//     },
//   ];

//   beforeEach(() => {
//     jest.clearAllMocks();
//   });

//   test('renders correctly with products', () => {
//     render(<PriceChart products={mockProducts} />);

//     expect(screen.getByTestId('card')).toBeInTheDocument();
//     expect(screen.getByTestId('card')).toHaveClass(
//       'transition-shadow hover:shadow-lg'
//     );
//     expect(screen.getByTestId('card-header')).toBeInTheDocument();
//     expect(screen.getByTestId('card-title')).toHaveTextContent(
//       'Recent Product Prices'
//     );
//     expect(screen.getByTestId('card-description')).toHaveTextContent(
//       'Price trends for the last 10 products'
//     );
//     expect(screen.getByTestId('card-content')).toBeInTheDocument();
//     expect(screen.getByTestId('card-footer')).toBeInTheDocument();

//     // Check ChartContainer and AreaChart
//     expect(screen.getByTestId('chart-container')).toBeInTheDocument();
//     expect(screen.getByTestId('area-chart')).toBeInTheDocument();
//     expect(screen.getByTestId('area-chart')).toHaveAttribute(
//       'data-margin',
//       JSON.stringify({ left: 12, right: 12 })
//     );

//     // Check price data - Fixed: Changed "Lon..." to "Long..."
//     expect(screen.getByTestId('area-entry-Smartphone')).toHaveTextContent(
//       'Smartphone: 100 (Jan 01)'
//     );
//     expect(
//       screen.getByTestId('area-entry-T-Shirt with Long...')
//     ).toHaveTextContent('T-Shirt with Long...: 200 (Jan 02)');
//     expect(screen.getByTestId('area-entry-Laptop')).toHaveTextContent(
//       'Laptop: 50 (Jan 03)'
//     );

//     // Check Area component
//     const area = screen.getByTestId('area');
//     expect(area).toHaveAttribute('data-datakey', 'price');
//     expect(area).toHaveAttribute('data-type', 'natural');
//     expect(area).toHaveAttribute('data-fill', '#10b981');
//     expect(area).toHaveAttribute('data-fill-opacity', '0.4');
//     expect(area).toHaveAttribute('data-stroke', '#10b981');
//     expect(area).toHaveAttribute('data-stroke-width', '2');

//     // Check CartesianGrid
//     const grid = screen.getByTestId('cartesian-grid');
//     expect(grid).toHaveAttribute('data-vertical', 'false');
//     expect(grid).toHaveAttribute('data-stroke', '#e5e7eb');

//     const xAxis = screen.getByTestId('x-axis');
//     expect(xAxis).toHaveAttribute('data-datakey', 'date');
//     expect(xAxis).toHaveAttribute('data-tickline', 'false');
//     expect(xAxis).toHaveAttribute('data-axisline', 'false');
//     expect(xAxis).toHaveAttribute('data-tickmargin', '8');
//     expect(xAxis).toHaveTextContent('XAxis: Formatted');

//     expect(screen.getByTestId('y-axis')).toBeInTheDocument();

//     // Check Tooltip
//     expect(screen.getByTestId('chart-tooltip')).toBeInTheDocument();
//     expect(screen.getByTestId('chart-tooltip-content')).toHaveAttribute(
//       'data-indicator',
//       'line'
//     );

//     expect(screen.getByTestId('card-footer')).toHaveTextContent(
//       'Price trends for recent products'
//     );
//     expect(screen.getByTestId('card-footer')).toHaveTextContent(
//       'Showing prices for the last 10 products added'
//     );
//     expect(screen.getByTestId('trending-up-icon')).toBeInTheDocument();
//   });

//   test('handles empty products array', () => {
//     render(<PriceChart products={[]} />);

//     // Check Card structure
//     expect(screen.getByTestId('card')).toBeInTheDocument();
//     expect(screen.getByTestId('card-title')).toHaveTextContent(
//       'Recent Product Prices'
//     );
//     expect(screen.getByTestId('card-description')).toHaveTextContent(
//       'Price trends for the last 10 products'
//     );

//     // Check AreaChart with no data
//     expect(screen.getByTestId('area-chart')).toBeInTheDocument();
//     expect(screen.queryAllByTestId(/area-entry-/)).toHaveLength(0);

//     expect(screen.getByTestId('card-footer')).toHaveTextContent(
//       'Showing prices for the last 10 products added'
//     );
//   });

//   test('correctly processes price data with sorting and name truncation', () => {
//     render(<PriceChart products={mockProducts} />);

//     const entries = screen.getAllByTestId(/area-entry-/);
//     expect(entries[0]).toHaveTextContent('Smartphone: 100 (Jan 01)');
//     expect(entries[1]).toHaveTextContent('T-Shirt with Long...: 200 (Jan 02)');
//     expect(entries[2]).toHaveTextContent('Laptop: 50 (Jan 03)');
//   });

//   test('limits data to last 10 products', () => {
//     const manyProducts: Product[] = Array.from({ length: 12 }, (_, i) => ({
//       id: `${i + 1}`,
//       name: `Product ${i + 1}`,
//       price: 100 + i * 10,
//       stock: 5,
//       status: 'active',
//       category: 'Test',
//       createdAt: `2023-01-${(i + 1).toString().padStart(2, '0')}`,
//       updatedAt: `2023-01-${(i + 1).toString().padStart(2, '0')}`,
//     }));

//     render(<PriceChart products={manyProducts} />);

//     const entries = screen.getAllByTestId(/area-entry-/);
//     expect(entries).toHaveLength(10);
//     // Check the last 10 products (sorted by createdAt)
//     for (let i = 0; i < 10; i++) {
//       const index = i + 2;
//       const day = (index + 1).toString().padStart(2, '0');
//       expect(entries[i]).toHaveTextContent(
//         `Product ${index + 1}: ${100 + index * 10} (Jan ${day})`
//       );
//     }
//   });

//   test('renders tooltip with line indicator', () => {
//     render(<PriceChart products={mockProducts} />);

//     expect(screen.getByTestId('chart-tooltip')).toBeInTheDocument();
//     expect(screen.getByTestId('chart-tooltip-content')).toHaveAttribute(
//       'data-indicator',
//       'line'
//     );
//   });
// });
