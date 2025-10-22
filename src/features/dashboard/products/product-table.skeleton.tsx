'use client';

import {
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/features/ui';

export default function ProductTableSkeleton() {
  // Simulate 5 rows for skeleton loading
  const skeletonRows = Array.from({ length: 5 });

  return (
    <div className="space-y-4">
      {/* Skeleton for search input */}
      <div className="flex items-center space-x-2">
        <div className="relative max-w-sm flex-1">
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
      </div>

      {/* Skeleton for table */}
      <div className="overflow-hidden rounded-lg border bg-white shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              {[
                'Name',
                'Category',
                'Price',
                'Stock',
                'Status',
                'Created',
                'Actions',
              ].map((header) => (
                <TableHead key={header}>
                  <Skeleton className="h-6 w-24 rounded-md" />
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {skeletonRows.map((_, index) => (
              <TableRow key={index} className="hover:bg-gray-50">
                <TableCell>
                  <Skeleton className="h-6 w-32 rounded-md" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-6 w-24 rounded-md" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-6 w-20 rounded-md" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-6 w-16 rounded-md" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-6 w-28 rounded-md" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-6 w-24 rounded-md" />
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Skeleton className="size-8 rounded-full" />
                    <Skeleton className="size-8 rounded-full" />
                    <Skeleton className="size-8 rounded-full" />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Skeleton for pagination */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-700">
          <Skeleton className="h-6 w-40 rounded-md" />
        </div>
        <div className="flex items-center space-x-2">
          <Skeleton className="h-8 w-20 rounded-md" />
          <Skeleton className="h-8 w-20 rounded-md" />
        </div>
      </div>
    </div>
  );
}
