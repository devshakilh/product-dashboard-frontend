'use client';

import * as React from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';
import {
  AlertTriangle,
  Check,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Loader,
  XCircle,
} from 'lucide-react';

import { cn } from '@/lib/utils';

// Validation Icons
const validationIcons = {
  success: <CheckCircle className="size-4 text-success-500" />,
  error: <XCircle className="size-4 text-error-500" />,
  loading: <Loader className="size-4 animate-spin text-secondary-300" />,
  warning: <AlertTriangle className="size-4 text-warning-500" />,
};

interface SelectProps {
  options: { value: string; label: string }[];
  placeholder?: string | React.ReactNode;
  className?: string;
  error?: string;
  validationState?: 'success' | 'error' | 'loading' | 'warning';
  validationMessage?: string;
  disabled?: boolean;
  label?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  defaultValue?: string;
}

const Select = React.forwardRef<HTMLButtonElement, SelectProps>(
  (
    {
      options,
      placeholder,
      className,
      error,
      validationState,
      validationMessage,
      disabled,
      label,
      value,
      onValueChange,
      defaultValue,
      ...props
    },
    ref
  ) => {
    // Skip normalization and processing - use value directly if it exactly matches an option
    const directMatch = React.useMemo(() => {
      if (!value) return undefined;

      // Check if value directly matches any option value
      return options.find((opt) => opt.value === value);
    }, [value, options]);

    // We'll use the direct value if it exists, no normalization needed
    const effectiveValue = directMatch ? value : undefined;

    return (
      <div className="flex flex-col gap-1">
        {label && (
          <label className="mb-1 block text-sm font-medium text-gray-700">
            {label}
          </label>
        )}
        <div className="relative">
          <SelectPrimitive.Root
            {...props}
            value={effectiveValue}
            onValueChange={onValueChange}
            defaultValue={defaultValue}
          >
            <SelectPrimitive.Trigger
              ref={ref}
              className={cn(
                'flex h-10 w-full items-center justify-between rounded-lg border border-secondary-100 bg-white px-3 py-2 text-sm',
                'focus:outline-none',
                'disabled:cursor-not-allowed disabled:opacity-50',
                'focus-visible:outline-none',
                error && 'border-error-500 focus:ring-error-500',
                className
              )}
              disabled={disabled || validationState === 'loading'}
            >
              <SelectPrimitive.Value placeholder={placeholder} />
              <SelectPrimitive.Icon>
                <ChevronDown className="ml-2 size-4" />
              </SelectPrimitive.Icon>
            </SelectPrimitive.Trigger>

            <SelectPrimitive.Portal>
              <SelectPrimitive.Content
                className={cn(
                  'relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-white shadow-md',
                  'animate-in fade-in-0 zoom-in-95'
                )}
                position="popper"
                sideOffset={5}
              >
                <SelectPrimitive.ScrollUpButton className="flex h-6 items-center justify-center">
                  <ChevronUp className="size-4" />
                </SelectPrimitive.ScrollUpButton>

                <SelectPrimitive.Viewport className="p-1">
                  {options.map((option) => (
                    <SelectPrimitive.Item
                      key={option.value}
                      value={option.value}
                      className={cn(
                        'relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none',
                        'hover:bg-primary-500 hover:text-white focus:bg-primary-500 focus:text-white',
                        'data-[disabled]:pointer-events-none data-[disabled]:opacity-50'
                      )}
                    >
                      <span className="absolute left-2 flex size-3.5 items-center justify-center">
                        <SelectPrimitive.ItemIndicator>
                          <Check className="size-4" />
                        </SelectPrimitive.ItemIndicator>
                      </span>
                      <SelectPrimitive.ItemText>
                        {option.label}
                      </SelectPrimitive.ItemText>
                    </SelectPrimitive.Item>
                  ))}
                </SelectPrimitive.Viewport>

                <SelectPrimitive.ScrollDownButton className="flex h-6 items-center justify-center">
                  <ChevronDown className="size-4" />
                </SelectPrimitive.ScrollDownButton>
              </SelectPrimitive.Content>
            </SelectPrimitive.Portal>
          </SelectPrimitive.Root>

          {validationState && validationMessage && (
            <div className="mt-1 flex items-center gap-1 text-xs text-secondary-300">
              {validationIcons[validationState]} {validationMessage}
            </div>
          )}
          {error && <p className="mt-1 text-xs text-error-500">{error}</p>}
        </div>
      </div>
    );
  }
);

Select.displayName = 'Select';

export default Select;
