'use client';

import { FC } from 'react';

import { cn } from '@/lib/utils';

interface LineChartSkeletonProps {
  className?: string;
}

const LineChartSkeleton: FC<LineChartSkeletonProps> = ({ className = '' }) => {
  return (
    <div className={cn('rounded-lg bg-white p-6', className)}>
      {/* Header with title */}
      <div className="mb-8 flex items-center justify-between">
        <div className="h-7 w-32 animate-pulse rounded bg-gray-200" />
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="size-8 animate-pulse rounded-full bg-gray-200" />
            <div className="h-5 w-28 animate-pulse rounded bg-gray-200" />
            <div className="size-8 animate-pulse rounded-full bg-gray-200" />
          </div>
        </div>
      </div>

      {/* Chart skeleton */}
      <div className="h-[150px] w-full">
        <div className="relative size-full">
          {/* Chart area */}
          <div className="absolute inset-x-0 bottom-6 top-5 animate-pulse rounded bg-gray-200" />

          {/* X-axis labels */}
          <div className="absolute inset-x-0 bottom-0 flex justify-between px-2">
            {Array.from({ length: 7 }).map((_, index) => (
              <div
                key={`x-${index}`}
                className="h-4 w-8 animate-pulse rounded bg-gray-200"
              />
            ))}
          </div>

          {/* Y-axis labels */}
          <div className="absolute bottom-6 left-0 top-5 flex flex-col justify-between py-2">
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={`y-${index}`}
                className="h-4 w-8 animate-pulse rounded bg-gray-200"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-4 flex flex-wrap items-center gap-6">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={`legend-${index}`} className="flex items-center gap-2">
            <div className="size-2 rounded-full bg-gray-300" />
            <div className="h-4 w-16 animate-pulse rounded bg-gray-200" />
            <div className="h-4 w-8 animate-pulse rounded bg-gray-200" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LineChartSkeleton;
