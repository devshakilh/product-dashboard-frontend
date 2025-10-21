'use client';

import { Button, Card } from '@/features/ui/atoms';
import Input from '@/features/ui/atoms/input.component';
import { Filter, Search } from 'lucide-react';

import { cn } from '@/lib/utils';

/**
 * Defines the structure of a table column
 * @template T - The type of data being displayed in the table
 */
export interface Column<T> {
  /** Header text for the column */
  header: string;
  /** Key to access the data in each row */
  accessorKey: keyof T | string;
  /** Optional custom cell renderer */
  cell?: (item: T, index?: number) => React.ReactNode;
}

/**
 * Props for the Table component
 * @template T - The type of data being displayed in the table
 */
export interface TableProps<T> {
  /** Title of the table */
  title?: string;
  /** Class name for the table */
  className?: string;
  /** Class name for the table container */
  tableContainerClassName?: string;
  /** Class name for the table */
  tableClassName?: string;
  /** Array of data items to display in the table */
  data: T[];
  /** Column definitions for the table */
  columns: Column<T>[];
  /** Visual variant of the table */
  variant?: 'default' | 'compact';
  /** Whether to show pagination controls */
  showPagination?: boolean;
  /** Whether to show the number of items in the table */
  showItemsCount?: boolean;
  /** Current page number */
  currentPage?: number;
  /** Total number of items across all pages */
  totalItems?: number;
  /** Number of items to display per page */
  itemsPerPage?: number;
  /** Callback function when page is changed */
  onPageChange?: (page: number) => void;
  /** Loading state of the table */
  isLoading?: boolean;
  /** Custom component to show when there's no data */
  emptyState?: React.ReactNode;
  /** Whether to show serial numbers */
  showSerial?: boolean;
  /** Custom header text for serial number column */
  serialHeader?: string;
  /** Optional action button */
  actionButton?: React.ReactNode;
  /** Optional search placeholder */
  searchPlaceholder?: string;
  /** Search callback function */
  onSearch?: (value: string) => void;
  /** Filter callback function */
  onFilter?: () => void;
  /** Optional footer */
  footer?: React.ReactNode;
  /** Class name for the table row */
  rowClassName?: string;
  /** Callback function when a row is clicked */
  onRowClick?: (item: T) => void;
}

/**
 * A reusable table component with pagination and loading states
 * @template T - The type of data being displayed in the table
 */
export default function Table<T>({
  title,
  className,
  tableContainerClassName,
  tableClassName,
  data,
  columns,
  variant = 'default',
  showPagination = true,
  showItemsCount = true,
  currentPage = 1,
  totalItems = 0,
  itemsPerPage = 10,
  onPageChange,
  isLoading,
  emptyState,
  showSerial = false,
  serialHeader = '#',
  actionButton,
  searchPlaceholder = 'Search',
  onSearch,
  onFilter,
  footer,
  rowClassName,
  onRowClick,
}: TableProps<T>) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Generate page numbers array with ellipsis
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const showEllipsisStart = currentPage > 3;
    const showEllipsisEnd = currentPage < totalPages - 2;

    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (showEllipsisStart) {
      pages.push(1, '...');
    }

    for (
      let i = Math.max(1, currentPage - 1);
      i <= Math.min(totalPages, currentPage + 1);
      i++
    ) {
      pages.push(i);
    }

    if (showEllipsisEnd) {
      pages.push('...', totalPages);
    }

    return pages;
  };

  // Calculate starting index for serial numbers
  const getStartingIndex = () => {
    return showPagination ? (currentPage - 1) * itemsPerPage : 0;
  };

  if (!data.length) {
    return (
      <div className="flex h-64 items-center justify-center rounded-lg border bg-white">
        {emptyState || (
          <div className="text-sm text-gray-500">No data available</div>
        )}
      </div>
    );
  }

  return (
    <div className={cn(['space-y-4', className])}>
      {(!!onSearch || !!onFilter || !!actionButton) && (
        <Card className="flex flex-1 items-center gap-3" variant="flat">
          <div className="flex flex-1 items-center gap-3">
            {onSearch && (
              <div className="relative max-w-md flex-1">
                <Input
                  leftIcon={<Search className="size-4 text-gray-400" />}
                  type="text"
                  placeholder={searchPlaceholder}
                  onChange={(e) => onSearch(e.target.value)}
                />
              </div>
            )}

            {onFilter && (
              <Button
                variant="secondary"
                icon={<Filter className="size-4 text-gray-400" />}
                iconPosition="left"
                onClick={onFilter}
                className="text-sm font-semibold"
              >
                Filter
              </Button>
            )}
          </div>

          {actionButton && <div className="shrink-0">{actionButton}</div>}
        </Card>
      )}

      <Card variant={'default'} className={tableContainerClassName}>
        {title && (
          <h2 className="mb-4 text-sm font-semibold text-gray-900">{title}</h2>
        )}
        <div className="overflow-x-auto rounded-lg bg-white">
          <table
            className={cn(
              'min-w-full divide-y divide-gray-200',
              tableClassName
            )}
          >
            <thead className="bg-secondary-50">
              <tr>
                {showSerial && (
                  <th
                    className={cn(
                      'w-16 whitespace-nowrap px-6 py-4 text-left text-xs font-semibold tracking-wider text-gray-600',
                      variant === 'compact' && 'px-4 py-2'
                    )}
                  >
                    {serialHeader}
                  </th>
                )}
                {columns.map((column, index) => (
                  <th
                    key={index}
                    className={cn(
                      'whitespace-nowrap px-6 py-4 text-left text-xs font-semibold tracking-wider text-gray-600',
                      variant === 'compact' && 'px-4 py-2'
                    )}
                  >
                    {column.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white text-gray-600">
              {data.map((item, rowIndex) => (
                <tr
                  key={rowIndex}
                  className={cn(
                    'transition-colors hover:bg-gray-50',
                    rowClassName
                  )}
                  onClick={onRowClick ? () => onRowClick(item) : undefined}
                  style={{ cursor: onRowClick ? 'pointer' : 'default' }}
                >
                  {showSerial && (
                    <td
                      className={cn(
                        'whitespace-nowrap px-6 py-4 text-sm',
                        variant === 'compact' && 'px-4 py-2'
                      )}
                    >
                      {getStartingIndex() + rowIndex + 1}
                    </td>
                  )}
                  {columns.map((column, colIndex) => (
                    <td
                      key={colIndex}
                      className={cn(
                        !isLoading &&
                          data.length > 0 &&
                          'whitespace-nowrap px-6 py-4',
                        variant === 'compact' && 'px-4 py-2'
                      )}
                    >
                      {column.cell ? (
                        column.cell(item, rowIndex)
                      ) : (
                        <div className="text-sm">
                          {String(item[column.accessorKey as keyof T])}
                        </div>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {footer && <div className="mt-4">{footer}</div>}
      </Card>

      {/* Pagination - Only visible when not loading and has data */}
      {!isLoading && data.length > 0 && (
        <div className="flex items-center justify-between px-2">
          {showItemsCount && (
            <div className="text-sm text-gray-500">
              Showing{' '}
              <span className="font-medium text-gray-700">
                {Math.min(currentPage * itemsPerPage, totalItems)}
              </span>{' '}
              of <span className="font-medium text-gray-700">{totalItems}</span>{' '}
              results
            </div>
          )}
          {showPagination && totalPages > 1 && (
            <div className="flex items-center gap-1">
              <button
                onClick={() => onPageChange?.(currentPage - 1)}
                disabled={currentPage === 1}
                className="rounded-lg border border-gray-50 bg-white px-3 py-1 text-sm font-medium text-primary-500 hover:bg-gray-100 disabled:text-gray-500"
                aria-label="Previous page"
              >
                Previous
              </button>

              {getPageNumbers().map((pageNum, index) => (
                <button
                  key={index}
                  onClick={() =>
                    typeof pageNum === 'number'
                      ? onPageChange?.(pageNum)
                      : undefined
                  }
                  disabled={pageNum === '...'}
                  className={cn(
                    'min-w-8 rounded-lg px-3 py-1 text-sm font-medium',
                    pageNum === currentPage
                      ? 'bg-primary-500 text-white'
                      : 'border border-gray-50 bg-white text-gray-700 hover:bg-gray-100',
                    pageNum === '...' &&
                      'cursor-default bg-transparent hover:bg-transparent'
                  )}
                >
                  {pageNum}
                </button>
              ))}

              <button
                onClick={() => onPageChange?.(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="rounded-lg border border-gray-50 bg-white px-3 py-1 text-sm font-medium text-primary-500 hover:bg-gray-100 disabled:text-gray-500"
                aria-label="Next page"
              >
                Next
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
