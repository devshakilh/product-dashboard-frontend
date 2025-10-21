'use client';

import { forwardRef, TextareaHTMLAttributes, useState } from 'react';
import { cva } from 'class-variance-authority';

import { cn } from '@/lib/utils';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  length?: number;
  label?: string;
  showCounter?: boolean;
}

const textAreaVariants = cva(
  'block w-full rounded-md border bg-neutral-50 p-3 transition-all duration-200 ease-in-out focus:outline-none',
  {
    variants: {
      state: {
        inactive: 'border-secondary-100 text-secondary-300',
        hover: 'border-secondary-200 text-secondary-300',
        focused: 'border-secondary-700 text-secondary-300',
        disabled:
          'cursor-not-allowed border-secondary-100 text-secondary-100 opacity-50',
        typed: 'border-secondary-700 text-secondary-900',
      },
    },
    defaultVariants: {
      state: 'inactive',
    },
  }
);

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      className,
      length,
      disabled,
      label,
      showCounter = true,
      onChange,
      ...props
    },
    ref
  ) => {
    const [charCount, setCharCount] = useState(0);
    const [isFocused, setIsFocused] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [hasTyped, setHasTyped] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (!length || e.target.value.length <= length) {
        setCharCount(e.target.value.length);
      }
      setHasTyped(e.target.value.length > 0);

      if (onChange) {
        onChange(e);
      }
    };

    return (
      <div className="relative flex w-full flex-col gap-1">
        {label && (
          <label className="mb-1 block text-sm font-medium text-gray-700">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          maxLength={length}
          disabled={disabled}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={cn(
            textAreaVariants({
              state: disabled
                ? 'disabled'
                : hasTyped || isFocused
                  ? 'typed'
                  : isHovered
                    ? 'hover'
                    : 'inactive',
            }),
            className
          )}
          {...props}
        />
        {showCounter && length !== undefined && (
          <span className="self-end text-xs text-secondary-300">
            {charCount}/{length}
          </span>
        )}
      </div>
    );
  }
);

TextArea.displayName = 'TextArea';

export default TextArea;
