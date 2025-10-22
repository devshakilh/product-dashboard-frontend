'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/features/ui';
import { ChartConfig } from '@/features/ui/molecules/charts/chart.component';
import { TrendingUp } from 'lucide-react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Rectangle,
  XAxis,
  YAxis,
} from 'recharts';

import { Product } from '@/types/product';

interface StatusChartProps {
  products: Product[];
}

const chartConfig = {
  count: {
    label: 'Products',
  },
  active: {
    label: 'Active',
    color: '#10b981',
  },
  inactive: {
    label: 'Inactive',
    color: '#f59e0b',
  },
  outOfStock: {
    label: 'Out of Stock',
    color: '#ef4444',
  },
} satisfies ChartConfig;

export default function StatusChart({ products }: StatusChartProps) {
  const statusData = [
    {
      name: 'active',
      count: products.filter((p) => p.status === 'active').length,
      fill: chartConfig.active.color,
    },
    {
      name: 'inactive',
      count: products.filter((p) => p.status === 'inactive').length,
      fill: chartConfig.inactive.color,
    },
    {
      name: 'out-of-stock',
      count: products.filter((p) => p.status === 'out-of-stock').length,
      fill: chartConfig.outOfStock.color,
    },
  ];

  return (
    <Card className="transition-shadow hover:shadow-lg">
      <CardHeader>
        <CardTitle>Product Status Distribution</CardTitle>
        <CardDescription>Current product status overview</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={statusData}>
            <CartesianGrid vertical={false} stroke="#e5e7eb" />
            <XAxis
              dataKey="name"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) =>
                chartConfig[value as keyof typeof chartConfig]?.label || value
              }
            />
            <YAxis />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar
              dataKey="count"
              strokeWidth={2}
              radius={8}
              activeIndex={0}
              activeBar={({ ...props }) => (
                <Rectangle
                  {...props}
                  fillOpacity={0.8}
                  stroke={props.payload.fill}
                  strokeDasharray={4}
                  strokeDashoffset={4}
                />
              )}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Product status overview <TrendingUp className="size-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing distribution of product statuses
        </div>
      </CardFooter>
    </Card>
  );
}
