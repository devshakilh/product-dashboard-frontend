'use client';

import { forwardRef, useEffect, useState } from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import {
  AlertTriangle,
  CheckCircle,
  ChevronDown,
  Loader,
  XCircle,
} from 'lucide-react';
import * as RPNInput from 'react-phone-number-input';
import { Value } from 'react-phone-number-input';
import flags from 'react-phone-number-input/flags';

import 'react-phone-number-input/style.css';

import { cn } from '@/lib/utils';

const phoneInputVariants = cva(
  'block w-full rounded-lg border bg-white transition-all duration-200 ease-in-out focus:border-secondary-700 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      state: {
        inactive: 'border-secondary-100 text-gray-900',
        hover: 'border-secondary-200 text-gray-900',
        focused: 'border-secondary-700 text-gray-900',
        disabled: 'border-secondary-100 text-secondary-100',
      },
      validation: {
        true: 'border-secondary-300',
      },
    },
    defaultVariants: {
      state: 'inactive',
    },
  }
);

interface PhoneNumberInputProps
  extends VariantProps<typeof phoneInputVariants>,
    Omit<React.ComponentProps<'div'>, 'onChange'> {
  value: string;
  onChange: (value: Value) => void;
  placeholder?: string;
  disabled?: boolean;
  validationState?: 'success' | 'error' | 'loading' | 'warning';
  validationMessage?: string;
  error?: string;
  loading?: boolean;
  label?: string;
  containerClassName?: string;
}

const validationIcons = {
  success: <CheckCircle className="size-3 text-success-500" />,
  error: <XCircle className="size-3 text-error-500" />,
  loading: <Loader className="size-3 animate-spin text-secondary-300" />,
  warning: <AlertTriangle className="size-3 text-warning-500" />,
};

// Flag component using the flags library
const FlagComponent = ({ country, countryName }: RPNInput.FlagProps) => {
  const Flag = flags[country];
  return (
    <span className="flex h-4 w-6 overflow-hidden rounded-sm">
      {Flag && <Flag title={countryName} />}
    </span>
  );
};

// Custom input component that uses our styling
const InputComponent = forwardRef<
  HTMLInputElement,
  React.ComponentProps<'input'> & { className?: string }
>(({ className, ...props }, ref) => (
  <input
    {...props}
    ref={ref}
    className={cn(
      'flex-1 border-none bg-transparent py-2 pl-2 focus:outline-none',
      className
    )}
  />
));
InputComponent.displayName = 'InputComponent';

// Add this interface definition
interface CountrySelectComponentProps {
  value: string;
  onChange: (value: string) => void;
  options: Array<{
    value: string;
    label: string;
  }>;
  disabled?: boolean;
  phoneValue?: string;
  onPhoneValueChange?: (value: Value) => void;
}

const PhoneNumberInput = forwardRef<HTMLInputElement, PhoneNumberInputProps>(
  (
    {
      value,
      onChange,
      placeholder = 'Enter phone number',
      disabled,
      validationState,
      validationMessage,
      error,
      loading,
      label,
      className,
      containerClassName,
      state = 'inactive',
      ...props
    },
    /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
    ref
  ) => {
    const [hovered, setHovered] = useState(false);
    const [focused, setFocused] = useState(false);
    // Generate a unique ID for this instance
    const dropdownId = useState(
      `country-dropdown-${Math.random().toString(36).substring(2, 11)}`
    )[0];

    const handleMouseEnter = () => setHovered(true);
    const handleMouseLeave = () => setHovered(false);
    const handleFocus = () => setFocused(true);
    const handleBlur = () => setFocused(false);

    // Override the default country select component to directly handle country selection
    const CustomCountrySelectComponent = (
      props: CountrySelectComponentProps
    ) => {
      const [showDropdown, setShowDropdown] = useState(false);

      // Handle clicking outside to close dropdown
      useEffect(() => {
        if (!showDropdown) return;

        const handleClickOutside = (e: MouseEvent) => {
          const dropdown = document.getElementById(dropdownId);
          const target = e.target as Node;

          // Check if the click is outside the dropdown
          if (dropdown && !dropdown.contains(target)) {
            // Also check if the click is not on the trigger button
            const button = dropdown.previousElementSibling;
            if (button && !button.contains(target)) {
              setShowDropdown(false);
            }
          }
        };

        // Use capture phase to ensure we get the event before other handlers
        document.addEventListener('mousedown', handleClickOutside, true);
        return () =>
          document.removeEventListener('mousedown', handleClickOutside, true);
      }, [showDropdown]);

      const handleCountryChange = (countryCode: string) => {
        // First call the original onChange to update the country
        props.onChange(countryCode);

        // Then update the phone number value with the country code
        const callingCode = RPNInput.getCountryCallingCode(
          countryCode as RPNInput.Country
        );
        onChange(`+${callingCode}` as Value);

        // Close the dropdown
        setShowDropdown(false);
      };

      return (
        <div className="relative">
          {/* Trigger button */}
          <button
            type="button"
            disabled={props.disabled}
            className={cn(
              'ml-2 flex items-center gap-1 rounded-md bg-gray-50 p-1',
              props.disabled
                ? 'cursor-not-allowed opacity-50'
                : 'cursor-pointer'
            )}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setShowDropdown((prev) => !prev);
            }}
          >
            {props.value && (
              <FlagComponent
                country={props.value as RPNInput.Country}
                countryName={
                  props.options.find((opt) => opt.value === props.value)
                    ?.label || ''
                }
              />
            )}
            <span className="text-gray-700">
              {props.value
                ? `+${RPNInput.getCountryCallingCode(props.value as RPNInput.Country)}`
                : '+1'}
            </span>
            <ChevronDown className="size-4 text-gray-400" />
          </button>

          {/* Direct dropdown without using Popover */}
          {showDropdown && (
            <div
              id={dropdownId}
              className="absolute left-0 top-full z-[9999] mt-1 w-56 rounded-md border border-gray-200 bg-white shadow-lg"
              onClick={(e) => e.stopPropagation()}
              style={{ maxHeight: '300px', overflowY: 'auto', zIndex: 9999 }}
            >
              <div className="sticky top-0 bg-white p-2">
                <input
                  type="text"
                  placeholder="Search countries..."
                  className="w-full rounded-md border border-gray-200 px-2 py-1 text-sm focus:border-secondary-700 focus:outline-none"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onKeyDown={(e) => e.stopPropagation()}
                />
              </div>
              <div className="p-1">
                {props.options.map(({ value: optionValue, label }) =>
                  optionValue ? (
                    <div
                      key={optionValue}
                      className="flex cursor-pointer items-center gap-2 rounded px-2 py-1.5 hover:bg-gray-100"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleCountryChange(optionValue);
                      }}
                    >
                      <FlagComponent
                        country={optionValue as RPNInput.Country}
                        countryName={label}
                      />
                      <span className="text-sm text-gray-700">{label}</span>
                      <span className="ml-auto text-xs text-gray-500">
                        +
                        {RPNInput.getCountryCallingCode(
                          optionValue as RPNInput.Country
                        )}
                      </span>
                    </div>
                  ) : null
                )}
              </div>
            </div>
          )}
        </div>
      );
    };

    return (
      <div className={cn('flex flex-col gap-1', containerClassName)}>
        {label && (
          <label className="mb-1 block text-sm font-medium text-gray-700">
            {label}
          </label>
        )}
        <div
          className="relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div
            className={cn(
              phoneInputVariants({
                state: focused
                  ? 'focused'
                  : hovered
                    ? 'hover'
                    : disabled
                      ? 'disabled'
                      : state,
                validation: validationState ? true : undefined,
              }),
              'flex',
              error && 'border-error-500 focus:border-error-500',
              className
            )}
          >
            <RPNInput.default
              value={value as Value}
              onChange={onChange}
              placeholder={placeholder}
              disabled={disabled || loading}
              international
              countryCallingCodeEditable={false}
              flagComponent={FlagComponent}
              countrySelectComponent={CustomCountrySelectComponent}
              inputComponent={InputComponent}
              className="w-full"
              onFocus={handleFocus}
              onBlur={handleBlur}
              smartCaret={false}
              {...props}
            />
          </div>
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

PhoneNumberInput.displayName = 'PhoneNumberInput';

export default PhoneNumberInput;
