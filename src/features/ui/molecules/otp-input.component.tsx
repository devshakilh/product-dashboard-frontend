'use client';

import { KeyboardEvent, useEffect, useRef } from 'react';

interface OtpInputProps {
  length?: number;
  value: string[];
  onChange: (value: string[]) => void;
  disabled?: boolean;
  inputClassName?: string;
  containerClassName?: string;
}

export default function OtpInput({
  length = 6,
  value,
  onChange,
  disabled = false,
  inputClassName = '',
  containerClassName = '',
}: OtpInputProps) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    // Focus first input on mount if not disabled
    if (!disabled && inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, [disabled]);

  const handleChange = (index: number, digit: string) => {
    // Only allow numbers
    if (!/^[0-9]*$/.test(digit)) return;

    const newValue = [...value];
    newValue[index] = digit;
    onChange(newValue);

    // Auto focus next input
    if (digit && index < length - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    // Handle backspace
    if (e.key === 'Backspace') {
      if (!value[index] && index > 0 && inputRefs.current[index - 1]) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text');

    // Filter only numbers from pasted content
    const pastedNumbers = pastedData.replace(/[^0-9]/g, '').slice(0, length);

    if (pastedNumbers) {
      const newValue = Array(length).fill('');
      pastedNumbers.split('').forEach((char, index) => {
        if (index < length) newValue[index] = char;
      });

      onChange(newValue);

      // Focus the next empty input or the last input
      const lastIndex = Math.min(pastedNumbers.length, length - 1);
      if (inputRefs.current[lastIndex]) {
        inputRefs.current[lastIndex].focus();
      }
    }
  };

  return (
    <div className={`flex gap-4 ${containerClassName}`}>
      {Array.from({ length }).map((_, index) => (
        <div key={index} className="w-12">
          <input
            ref={(el) => {
              if (el) {
                inputRefs.current[index] = el;
              }
            }}
            type="text"
            maxLength={1}
            value={value[index] || ''}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            disabled={disabled}
            className={`h-12 w-full rounded-lg border border-gray-300 text-center text-lg font-medium focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 ${
              disabled ? 'cursor-not-allowed bg-gray-100' : ''
            } ${inputClassName}`}
          />
        </div>
      ))}
    </div>
  );
}
