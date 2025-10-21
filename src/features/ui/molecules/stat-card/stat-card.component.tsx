'use client';

import { ReactNode, type FC } from 'react';
import { Card } from '@/features/ui/atoms';

import { StatChart } from '../stat-chart';

export interface StatItemProps {
  count: number | string;
  label: string;
  className?: string;
}

export interface ChartDataPoint {
  value: number;
  label: string;
}

export interface StatCardProps {
  /** Title of the stat card */
  title: string;
  /** Main value to display */
  value: string | number;
  /** Icon to display next to the title */
  icon: ReactNode;
  /** Optional growth indicator (with + or - prefix) */
  growth?: string;
  /** Optional growth period text (e.g., "Than last Year") */
  growthPeriod?: string;
  /** Optional breakdown items to show at bottom */
  items?: Array<StatItemProps>;
  /** Optional chart data */
  chartData?: ChartDataPoint[];
  /** Whether the growth is positive (affects chart colors) */
  isPositiveGrowth?: boolean;
  /** Optional CSS class names */
  className?: string;
  /** Optional testId for testing */
  testId?: string;
}

const StatCard: FC<StatCardProps> = ({
  title,
  value,
  icon,
  growth,
  growthPeriod = 'Than last Year',
  items,
  chartData,
  isPositiveGrowth = true,
  className = '',
  testId = 'stat-card',
}) => {
  const hasBottomContent = growth || (chartData && chartData.length > 0);

  return (
    <Card
      className={`flex flex-col justify-between p-6 ${className}`}
      data-testid={testId}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-full bg-primary-50 text-primary-500">
            {icon}
          </div>
          <div>
            <p className="text-sm text-gray-500">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
          </div>
        </div>
      </div>

      {hasBottomContent && (
        <div className="mt-8 flex items-end justify-between">
          {growth && (
            <div className="flex flex-col">
              <span
                className={`text-sm font-semibold ${
                  isPositiveGrowth ? 'text-green-500' : 'text-red-500'
                }`}
                data-testid={`${testId}-growth`}
              >
                {growth}
              </span>
              <span className="text-xs text-gray-500">{growthPeriod}</span>
            </div>
          )}

          {chartData && chartData.length > 0 && (
            <StatChart
              data={chartData}
              isPositiveGrowth={isPositiveGrowth}
              data-testid={`${testId}-chart`}
            />
          )}
        </div>
      )}

      {items && items.length > 0 && (
        <div className="mt-6 flex justify-between">
          {items.map((item, index) => (
            <div
              key={index}
              className={`flex flex-col ${item.className || ''}`}
              data-testid={`${testId}-item-${index}`}
            >
              <span className="font-bold text-gray-900">{item.count}</span>
              <span className="text-xs text-gray-500">{item.label}</span>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};

export default StatCard;
