'use client';

import { FC } from 'react';

import { cn } from '@/lib/utils';

interface PieChartSkeletonProps {
  className?: string;
}

const PieChartSkeleton: FC<PieChartSkeletonProps> = ({ className = '' }) => {
  return (
    <div className={cn('rounded-lg bg-white p-6', className)}>
      {/* Header with title */}
      <div className="mb-8 flex items-center justify-between">
        <div className="h-7 w-40 animate-pulse rounded bg-gray-200" />
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="size-8 animate-pulse rounded-full bg-gray-200" />
            <div className="h-5 w-28 animate-pulse rounded bg-gray-200" />
            <div className="size-8 animate-pulse rounded-full bg-gray-200" />
          </div>
        </div>
      </div>

      {/* Chart and legend container */}
      <div className="flex items-center justify-between">
        {/* Pie chart skeleton */}
        <div className="h-[300px] w-full">
          <div className="relative size-full">
            <div className="absolute left-1/2 top-1/2 size-[240px] -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full bg-gray-200" />
            <div className="absolute left-1/2 top-1/2 size-[160px] -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full bg-white" />
          </div>
        </div>

        {/* Legend skeleton */}
        <div className="flex flex-col gap-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="size-3 animate-pulse rounded-full bg-gray-200" />
                <div className="h-5 w-24 animate-pulse rounded bg-gray-200" />
              </div>
              <div className="h-5 w-8 animate-pulse rounded bg-gray-200" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PieChartSkeleton;
