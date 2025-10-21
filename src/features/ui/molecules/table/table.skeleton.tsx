'use client';

import { Skeleton } from '@/features/ui';
import { Card } from '@/features/ui/atoms';

import { Column } from './table.component';

interface TableSkeletonProps {
  hasHeader?: boolean;
  hasPagination?: boolean;
  isPageLoading?: boolean;
  numberOfRows?: number;
  showSerial?: boolean;
  serialHeader?: string;
  columns: Column<unknown>[];
}

export default function TableSkeleton({
  hasHeader = false,
  hasPagination = false,
  isPageLoading = false,
  numberOfRows = 10,
  showSerial = false,
  serialHeader = '#',
  columns,
}: TableSkeletonProps) {
  return (
    <div className="p-2">
      {hasHeader && !isPageLoading && (
        <Card className="mb-4 flex justify-between overflow-hidden p-4">
          <div className="flex items-center gap-4">
            <Skeleton className="h-8 w-80" />
            <Skeleton className="h-8 w-24" />
          </div>
          <Skeleton className="h-8 w-32" />
        </Card>
      )}

      <Card className="mb-4 flex flex-col gap-4 overflow-hidden">
        <div className="overflow-hidden rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-secondary-50">
              <tr>
                {showSerial && (
                  <th className="w-16 px-6 py-4 text-left text-xs font-semibold tracking-wider text-gray-600">
                    {serialHeader}
                  </th>
                )}
                {columns.map((column, index) => (
                  <th
                    key={index}
                    className="px-6 py-4 text-left text-xs font-semibold tracking-wider text-gray-600"
                  >
                    {column.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white text-gray-600">
              {Array.from({ length: numberOfRows }).map((_, index) => (
                <tr key={index}>
                  {Array.from({ length: columns.length }).map((_, colIndex) => (
                    <td key={colIndex} className="whitespace-nowrap px-6 py-4">
                      <Skeleton className="h-4 w-full" />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      {hasPagination && (
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-64" />
          <div className="flex items-center gap-2">
            <Skeleton className="size-8" />
            <Skeleton className="size-8" />
            <Skeleton className="size-8" />
          </div>
        </div>
      )}
    </div>
  );
}
