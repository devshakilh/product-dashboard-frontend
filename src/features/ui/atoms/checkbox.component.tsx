'use client';

import { forwardRef, InputHTMLAttributes } from 'react';

import { cn } from '@/lib/utils';

// Checkbox Component
interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string | boolean;
  label?: string | React.ReactNode;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ error = false, disabled, label, ...props }, ref) => {
    return (
      <div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            ref={ref}
            disabled={disabled}
            className={cn(
              'h-5 w-5 cursor-pointer appearance-none rounded border transition-all checked:appearance-auto',
              'bg-secondary-50 hover:border-primary-500 focus:bg-primary-50 focus:ring-2 focus:ring-primary-500',
              error && 'border-error-500 focus:ring-red-500',
              disabled && 'cursor-not-allowed bg-primary-50 opacity-50'
            )}
            {...props}
          />
          {label && <label htmlFor={props.id}>{label}</label>}
        </div>
        {error && typeof error === 'string' && (
          <p className="text-error-500">{error}</p>
        )}
      </div>
    );
  }
);
Checkbox.displayName = 'Checkbox';

export { Checkbox };
