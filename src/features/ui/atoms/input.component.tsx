'use client';

import { forwardRef, InputHTMLAttributes, useState } from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import {
  AlertTriangle,
  CheckCircle,
  Loader,
  Loader2,
  XCircle,
} from 'lucide-react';

import { cn } from '@/lib/utils';

const inputVariants = cva(
  'block w-full rounded-lg border bg-white transition-all duration-200 ease-in-out focus:border-secondary-700 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      state: {
        inactive: 'border-secondary-100 text-gray-900',
        hover: 'border-secondary-200 text-gray-900',
        focused: 'border-secondary-700 text-gray-900',
        disabled: 'border-secondary-100 text-secondary-100',
      },
      variant: {
        default: 'px-3 py-2',
        leftIcon: 'py-2 pl-10 pr-3',
        rightIcon: 'py-2 pl-3 pr-10',
        bothIcons: 'px-10 py-2',
      },
      validation: {
        true: 'border-secondary-300',
      },
    },
    defaultVariants: {
      state: 'inactive',
      variant: 'default',
    },
  }
);

interface InputProps
  extends InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  validationState?: 'success' | 'error' | 'loading' | 'warning';
  validationMessage?: string;
  error?: string;
  loading?: boolean;
  label?: string;
}

const validationIcons = {
  success: <CheckCircle className="size-3 text-success-500" />,
  error: <XCircle className="size-3 text-error-500" />,
  loading: <Loader className="size-3 animate-spin text-secondary-300" />,
  warning: <AlertTriangle className="size-3 text-warning-500" />,
};

/**
 * A flexible input component supporting various states and validation options.
 *
 * This component includes options for icons (left, right, or both), and validation messages with corresponding icons for success, error, loading, or warning.
 *
 * @component
 * @example
 * // Default input
 * <Input placeholder="Enter text" />
 *
 * // Input with left icon
 * <Input leftIcon={<SearchIcon />} placeholder="Search" />
 *
 * // Input with validation
 * <Input validationState="success" validationMessage="Valid input!" />
 *
 * @param {Object} props - Component props
 * @param {string} [props.state='inactive'] - The current state of the input (inactive, hover, focused, disabled)
 * @param {string} [props.variant='default'] - Input variant (default, leftIcon, rightIcon, bothIcons)
 * @param {ReactNode} [props.leftIcon] - Icon to be displayed on the left side of the input
 * @param {ReactNode} [props.rightIcon] - Icon to be displayed on the right side of the input
 * @param {string} [props.validationState] - The validation state of the input (success, error, loading, warning)
 * @param {string} [props.validationMessage] - Message to display alongside the validation icon
 * @param {string} [props.className] - Custom class names for the input field
 * @param {boolean} [props.disabled] - Disables the input when true
 * @param {string} [props.error] - Error message to display alongside the input
 * @param {boolean} [props.loading] - Indicates if the input is in a loading state
 */

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      state,
      variant,
      leftIcon,
      rightIcon,
      validationState,
      validationMessage,
      error,
      loading,
      label,
      ...props
    },
    ref
  ) => {
    const [hovered, setHovered] = useState(false);
    const [hasText, setHasText] = useState(false);

    const handleMouseEnter = () => setHovered(true);
    const handleMouseLeave = () => setHovered(false);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setHasText(e.target.value.trim().length > 0);
    };

    return (
      <div className="flex flex-col gap-1">
        {label && (
          <label className="mb-1 block text-sm font-medium text-gray-700">
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute inset-y-0 left-3 flex items-center">
              {leftIcon}
            </div>
          )}
          <input
            className={cn(
              inputVariants({
                state: hovered ? 'hover' : state,
                variant,
                validation: validationState ? true : undefined,
                className,
              }),
              hasText ? 'text-secondary-900' : '',
              error &&
                'border-error-500 focus:border-error-500 focus:ring-error-500'
            )}
            ref={ref}
            style={leftIcon ? { textIndent: '1.5rem' } : undefined}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onChange={handleChange}
            placeholder="Enter text"
            {...props}
            disabled={loading || props.disabled}
          />
          {rightIcon && (
            <div className="absolute inset-y-0 right-3 flex items-center">
              {loading ? (
                <Loader2 className="size-4 animate-spin text-gray-400" />
              ) : (
                rightIcon
              )}
            </div>
          )}
        </div>
        {validationState && validationMessage && (
          <div className="flex items-center gap-1 text-xs text-secondary-300">
            {validationIcons[validationState]} {validationMessage}
          </div>
        )}
        {error && <p className="mt-1 text-xs text-error-500">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
