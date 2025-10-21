'use client';

import { forwardRef, InputHTMLAttributes } from 'react';

import { cn } from '@/lib/utils';

// RadioButton Component
interface RadioButtonProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}
const RadioButton = forwardRef<HTMLInputElement, RadioButtonProps>(
  ({ error = false, disabled, ...props }, ref) => {
    return (
      <label className="relative inline-flex cursor-pointer items-center">
        {/* Hidden Input */}
        <input
          type="radio"
          ref={ref}
          disabled={disabled}
          className={cn(
            'peer sr-only', // Hide the actual input but keep it accessible
            error && 'focus:ring-red-500',
            disabled && 'cursor-not-allowed'
          )}
          {...props}
        />
        {/* Outer Circle */}
        <div
          className={cn(
            'h-5 w-5 rounded-full border-2 transition-all duration-300',
            'border-secondary-300 peer-checked:border-primary-500 peer-focus:border-primary-500',
            error && 'border-error-500 peer-focus:border-red-500',
            disabled && 'border-secondary-100 opacity-50'
          )}
        ></div>
        {/* Inner Dot */}
        <div
          className={cn(
            'absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-transparent transition-all duration-300',
            'peer-checked:bg-primary-500', // Primary background when checked
            error && 'peer-checked:bg-red-500', // Error state
            disabled && 'bg-secondary-100 opacity-50', // Disabled state
            disabled && props.checked && 'bg-secondary-400 opacity-70' // Checked & Disabled state
          )}
        ></div>
      </label>
    );
  }
);

RadioButton.displayName = 'RadioButton';

export default RadioButton;
