'use client';

import { FC } from 'react';

import { cn } from '@/lib/utils';

export interface ChartDataPoint {
  value: number;
  label: string;
}

export interface StatChartProps {
  data: ChartDataPoint[];
  height?: number;
  isPositiveGrowth?: boolean;
  className?: string;
}

const StatChart: FC<StatChartProps> = ({
  data,
  height = 60,
  isPositiveGrowth = true,
  className = '',
}) => {
  // Find the maximum value to normalize heights
  const maxValue = Math.max(...data.map((item) => item.value));

  return (
    <div
      className={cn('h- flex', height, 'items-end gap-2', className)}
      style={{ height: `${height}px` }}
    >
      {data.map((item, index) => {
        const isLastBar = index === data.length - 1;
        const normalizedHeight = (item.value / maxValue) * 100;

        return (
          <div key={item.label} className="relative flex flex-1 justify-center">
            {/* Background bar */}
            <div
              className={`w-full rounded-full ${
                isLastBar ? 'bg-primary-500' : 'bg-primary-100'
              }`}
              style={{
                height: `${normalizedHeight}%`,
                backgroundColor: isLastBar
                  ? isPositiveGrowth
                    ? '#3B82F6'
                    : '#EF4444'
                  : '#EBF5FF',
              }}
            />

            {/* Indicator dot for the last bar */}
            {isLastBar && (
              <div
                className={`absolute -top-2 size-3 rounded-full ${
                  isPositiveGrowth ? 'bg-green-400' : 'bg-red-400'
                }`}
                style={{
                  left: '50%',
                  transform: 'translateX(-50%)',
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default StatChart;
