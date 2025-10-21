'use client';

import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const skeletonVariants = cva(
  'animate-pulse rounded-md bg-gray-200 dark:bg-gray-300',
  {
    variants: {
      variant: {
        default: 'h-4',
        avatar: 'rounded-full',
        button: 'h-9 rounded-lg',
        card: 'h-48 rounded-xl',
        table: 'h-12',
      },
      size: {
        default: 'w-full',
        sm: 'w-16',
        md: 'w-32',
        lg: 'w-64',
        xl: 'w-80',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

interface SkeletonProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof skeletonVariants> {
  loading?: boolean;
}

export default function Skeleton({
  className,
  variant,
  size,
  loading = true,
  ...props
}: SkeletonProps) {
  if (!loading) return null;

  return (
    <div
      className={cn(skeletonVariants({ variant, size }), className)}
      {...props}
    />
  );
}
