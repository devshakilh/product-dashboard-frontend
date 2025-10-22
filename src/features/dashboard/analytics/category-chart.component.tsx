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
// import { TrendingUp } from 'lucide-react';
// import { Cell, Pie, PieChart } from 'recharts';

// import { Product } from '@/types/product';

// interface CategoryChartProps {
//   products: Product[];
// }

// const COLORS = [
//   '#3b82f6',
//   '#10b981',
//   '#f59e0b',
//   '#ef4444',
//   '#8b5cf6',
//   '#ec4899',
// ];

// const chartConfig = {
//   value: {
//     label: 'Products',
//   },
//   ...Object.fromEntries(
//     COLORS.map((color, index) => [
//       `category${index}`,
//       { label: `Category ${index + 1}`, color },
//     ])
//   ),
// } satisfies ChartConfig;

// export default function CategoryChart({ products }: CategoryChartProps) {
//   const categoryData = products.reduce(
//     (acc, product) => {
//       const existing = acc.find((item) => item.name === product.category);
//       if (existing) {
//         existing.value += 1;
//       } else {
//         acc.push({ name: product.category, value: 1 });
//       }
//       return acc;
//     },
//     [] as { name: string; value: number }[]
//   );

//   const totalProducts = categoryData.reduce((sum, item) => sum + item.value, 0);
//   const totalPercentage = 100;

//   return (
//     <Card className="flex flex-col rounded-lg border border-border p-12 shadow-sm transition-shadow duration-200 hover:shadow-md">
//       <CardHeader className="items-center pb-2">
//         <CardTitle className="text-lg font-semibold text-foreground">
//           Products by Category
//         </CardTitle>
//         <CardDescription className="text-sm text-muted-foreground">
//           Distribution of products across categories
//         </CardDescription>
//       </CardHeader>
//       <CardContent className="flex-1 pb-0">
//         <ChartContainer
//           config={chartConfig}
//           className="mx-auto aspect-square max-h-[250px]"
//         >
//           <PieChart>
//             <Pie
//               data={categoryData}
//               dataKey="value"
//               nameKey="name"
//               cx="50%"
//               cy="50%"
//               innerRadius={50}
//               outerRadius={80}
//               labelLine={false}
//               label={({ name, percent }) =>
//                 `${name}: ${(percent * 100).toFixed(0)}%`
//               }
//             >
//               {categoryData.map((entry, index) => (
//                 <Cell
//                   key={`cell-${index}`}
//                   fill={COLORS[index % COLORS.length]}
//                 />
//               ))}
//             </Pie>
//             <ChartTooltip
//               cursor={false}
//               content={<ChartTooltipContent hideLabel />}
//             />
//             <text
//               x="50%"
//               y="50%"
//               textAnchor="middle"
//               dominantBaseline="middle"
//               className="fill-foreground text-lg font-semibold"
//             >
//               {`${totalPercentage}%`}
//             </text>
//           </PieChart>
//         </ChartContainer>
//       </CardContent>
//       <CardFooter className="flex-col items-center gap-2 text-sm">
//         <div className="flex items-center gap-2 font-medium leading-none text-foreground">
//           Category distribution overview <TrendingUp className="h-4 w-4" />
//         </div>
//         <div className="leading-none text-muted-foreground">
//           Showing total products: {totalProducts}
//         </div>
//       </CardFooter>
//     </Card>
//   );
// }
