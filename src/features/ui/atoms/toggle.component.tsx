'use client';

import { forwardRef, InputHTMLAttributes } from 'react';

import { cn } from '@/lib/utils'; // Toggle Component

interface ToggleProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

const Toggle = forwardRef<HTMLInputElement, ToggleProps>(
  ({ error = false, disabled, ...props }, ref) => {
    return (
      <label
        className={cn(
          'relative inline-flex cursor-pointer items-center',
          disabled && 'cursor-not-allowed opacity-50'
        )}
      >
        <input
          type="checkbox"
          ref={ref}
          disabled={disabled}
          className={cn(
            'peer sr-only',
            error && 'focus:ring-red-500',
            disabled && 'cursor-not-allowed'
          )}
          {...props}
        />
        <div
          className={cn(
            'h-6 w-11 rounded-full bg-secondary-200 transition-all duration-300 peer-checked:bg-primary-500',
            'peer-focus:ring-2 peer-focus:ring-primary-500',
            error && 'peer-focus:ring-red-500',
            disabled && 'bg-secondary-100'
          )}
        ></div>
        <span
          className={cn(
            'absolute left-1 top-1 h-4 w-4 rounded-full bg-white shadow transition-all duration-300 peer-checked:left-6',
            disabled && 'bg-secondary-50'
          )}
        ></span>
      </label>
    );
  }
);
Toggle.displayName = 'Toggle';
export default Toggle;
