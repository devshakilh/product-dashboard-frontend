'use client';

import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-lg transition-all duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary:
          'bg-primary-500 text-white hover:shadow-md active:bg-primary-600 active:shadow-none',
        secondary:
          'border border-gray-200 bg-white text-gray-700 hover:border-primary-500 hover:text-primary-500 active:border-transparent active:bg-primary-50',
        'icon-primary':
          'size-10 bg-primary-500 text-white hover:shadow-md active:bg-primary-600 active:shadow-none',
        'icon-secondary':
          'size-10 border border-gray-200 bg-white text-gray-700 hover:border-primary-500 hover:text-primary-500 active:border-transparent active:bg-primary-50',
      },
      size: {
        default: 'h-10 px-4 py-2 text-sm',
        sm: 'h-8 px-3 py-1.5 text-xs',
      },
      iconPosition: {
        none: '',
        left: 'flex-row gap-2',
        right: 'flex-row-reverse gap-2',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
      iconPosition: 'none',
    },
  }
);

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /**
   * Optional icon element to be rendered inside the button
   * @example icon={<PlusIcon className="size-4" />}
   */
  icon?: React.ReactNode;
  /**
   * Loading state of the button
   */
  loading?: boolean;
}

/**
 * Primary UI component for user interaction
 *
 * @component
 * @example
 * // Primary button
 * <Button>Click me</Button>
 *
 * // Secondary button
 * <Button variant="secondary">Click me</Button>
 *
 * // Small button with left icon
 * <Button size="sm" icon={<PlusIcon />} iconPosition="left">
 *   Add item
 * </Button>
 *
 * // Icon only button
 * <Button icon={<PlusIcon />} aria-label="Add item" />
 *
 * @param {Object} props - Component props
 * @param {ReactNode} props.children - Button content
 * @param {'primary' | 'secondary'} [props.variant='primary'] - Button variant
 * @param {'default' | 'sm'} [props.size='default'] - Button size
 * @param {ReactNode} [props.icon] - Optional icon element
 * @param {'none' | 'left' | 'right'} [props.iconPosition='none'] - Icon position
 * @param {string} [props.className] - Additional CSS classes
 * @param {boolean} [props.disabled] - Disabled state
 */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      iconPosition,
      icon,
      children,
      loading,
      disabled,
      ...props
    },
    ref
  ) => {
    // If there's only an icon, use the icon variants
    const isIconOnly = icon && !children;
    const finalVariant = isIconOnly
      ? (`icon-${variant === 'secondary' ? 'secondary' : 'primary'}` as const)
      : variant;

    return (
      <button
        className={cn(
          buttonVariants({
            variant: finalVariant,
            size: isIconOnly ? undefined : size,
            iconPosition: isIconOnly ? 'none' : iconPosition,
            className,
          })
        )}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            {children && <span>{children}</span>}
          </>
        ) : (
          <>
            {icon}
            {children}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
