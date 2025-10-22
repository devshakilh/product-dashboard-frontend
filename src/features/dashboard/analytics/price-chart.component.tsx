// 'use client';

// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
//   ChartContainer,
//   ChartTooltip,
//   ChartTooltipContent,
// } from '@/features/ui';
// import { ChartConfig } from '@/features/ui/molecules/charts/chart.component';
// import { format } from 'date-fns';
// import { TrendingUp } from 'lucide-react';
// import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';

// import { Product } from '@/types/product';

// interface PriceChartProps {
//   products: Product[];
// }

// const chartConfig = {
//   price: {
//     label: 'Price',
//     color: '#10b981', // Emerald green
//   },
// } satisfies ChartConfig;

// export default function PriceChart({ products }: PriceChartProps) {
//   const priceData = products
//     .sort(
//       (a, b) =>
//         new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
//     )
//     .map((product) => ({
//       name:
//         product.name.length > 15
//           ? product.name.substring(0, 15) + '...'
//           : product.name,
//       price: product.price,
//       date: format(new Date(product.createdAt), 'MMM dd'),
//     }))
//     .slice(-10); // Last 10 products

//   return (
//     <Card className="transition-shadow hover:shadow-lg">
//       <CardHeader>
//         <CardTitle>Recent Product Prices</CardTitle>
//         <CardDescription>Price trends for the last 10 products</CardDescription>
//       </CardHeader>
//       <CardContent>
//         <ChartContainer config={chartConfig}>
//           <AreaChart
//             accessibilityLayer
//             data={priceData}
//             margin={{
//               left: 12,
//               right: 12,
//             }}
//           >
//             <CartesianGrid vertical={false} stroke="#e5e7eb" />
//             <XAxis
//               dataKey="date"
//               tickLine={false}
//               axisLine={false}
//               tickMargin={8}
//               tickFormatter={(value) => value}
//             />
//             <YAxis />
//             <ChartTooltip
//               cursor={false}
//               content={<ChartTooltipContent indicator="line" />}
//             />
//             <Area
//               dataKey="price"
//               type="natural"
//               fill={chartConfig.price.color}
//               fillOpacity={0.4}
//               stroke={chartConfig.price.color}
//               strokeWidth={2}
//             />
//           </AreaChart>
//         </ChartContainer>
//       </CardContent>
//       <CardFooter className="flex-col items-start gap-2 text-sm">
//         <div className="flex gap-2 font-medium leading-none">
//           Price trends for recent products <TrendingUp className="h-4 w-4" />
//         </div>
//         <div className="leading-none text-muted-foreground">
//           Showing prices for the last 10 products added
//         </div>
//       </CardFooter>
//     </Card>
//   );
// }
