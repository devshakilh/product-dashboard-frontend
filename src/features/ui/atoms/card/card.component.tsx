'use client';

import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const cardVariants = cva('rounded-lg bg-white', {
  variants: {
    variant: {
      default: 'p-8',
      compact: 'p-6',
      flat: 'p-4',
    },
    shadow: {
      none: '',
      sm: 'shadow-sm',
      md: 'shadow',
      lg: 'shadow-lg',
    },
  },
  defaultVariants: {
    variant: 'default',
    shadow: 'none',
  },
});

interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  children: React.ReactNode;
}

export default function Card({
  children,
  className,
  variant,
  shadow,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(cardVariants({ variant, shadow }), className)}
      {...props}
    >
      {children}
    </div>
  );
}
