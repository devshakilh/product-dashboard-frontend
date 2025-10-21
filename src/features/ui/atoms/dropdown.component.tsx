'use client';

import { useEffect, useRef, useState } from 'react';
import Input from '@/features/ui/atoms/input.component';
import {
  AlertTriangle,
  CheckCircle,
  ChevronDown,
  Loader,
  Search,
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

// Dropdown
interface DropdownProps {
  options: { value: string; label: string }[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
  error?: string;
  validationState?: 'success' | 'error' | 'loading' | 'warning';
  validationMessage?: string;
  disabled?: boolean;
  label?: string;
}

const Dropdown = ({
  options,
  value,
  onChange,
  placeholder,
  className,
  error,
  validationState,
  validationMessage,
  disabled,
  label,
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOption, setSelectedOption] = useState<string | undefined>(
    value
  );
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSearchTerm('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  // Update selectedOption when value prop changes
  useEffect(() => {
    setSelectedOption(value);
  }, [value]);

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOptionSelect = (optionValue: string) => {
    setSelectedOption(optionValue);
    onChange?.(optionValue);
    setIsOpen(false);
    setSearchTerm('');
  };

  const selectedLabel = options.find(
    (option) => option.value === selectedOption
  )?.label;

  return (
    <div className="relative w-full" ref={dropdownRef}>
      {label && (
        <label className="mb-1 block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      <div className="relative">
        {/* Custom dropdown trigger */}
        <div
          className={cn(
            'flex cursor-pointer items-center justify-between rounded-lg border border-secondary-100 bg-white px-3 py-2 text-gray-500 transition-all duration-200 ease-in-out focus:border-secondary-700 focus:outline-none',
            className,
            error && 'border-error-500',
            disabled && 'cursor-not-allowed opacity-50'
          )}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          tabIndex={disabled ? -1 : 0}
          role="combobox"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-controls="dropdown-options"
        >
          <span className={selectedLabel ? 'text-gray-900' : 'text-gray-400'}>
            {selectedLabel || placeholder || 'Select an option'}
          </span>
          <ChevronDown
            size={18}
            className={cn(
              'text-secondary-400 transition-transform',
              isOpen && 'rotate-180'
            )}
          />
        </div>

        {/* Dropdown menu */}
        {isOpen && (
          <div className="absolute z-10 mt-1 w-full rounded-lg border border-secondary-100 bg-white shadow-lg">
            {/* Search input */}

            {/* use input component */}
            <Input
              ref={searchInputRef}
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              leftIcon={<Search className="size-4 text-secondary-400" />}
              onClick={(e) => e.stopPropagation()}
              className="border-gray-200 text-sm outline-none"
            />

            {/* Options list */}
            <ul
              className="max-h-60 overflow-auto py-1"
              role="listbox"
              id="dropdown-options"
              aria-activedescendant={
                selectedOption ? `option-${selectedOption}` : undefined
              }
            >
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option) => (
                  <li
                    key={option.value}
                    id={`option-${option.value}`}
                    role="option"
                    aria-selected={selectedOption === option.value}
                    onClick={() => handleOptionSelect(option.value)}
                    className={cn(
                      'cursor-pointer px-3 py-2 hover:bg-secondary-50',
                      selectedOption === option.value &&
                        'bg-primary-50 text-primary-600'
                    )}
                  >
                    {option.label}
                  </li>
                ))
              ) : (
                <li className="px-3 py-2 text-center text-gray-500">
                  No options found
                </li>
              )}
            </ul>
          </div>
        )}
      </div>

      {/* Hidden native select for form submission */}
      <select
        value={selectedOption}
        onChange={(e) => handleOptionSelect(e.target.value)}
        className="hidden"
        disabled={disabled}
        aria-hidden="true"
      >
        <option value="" disabled>
          {placeholder || 'Select an option'}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {validationState && validationMessage && (
        <div className="mt-1 flex items-center gap-1 text-xs text-secondary-300">
          {validationIcons[validationState]} {validationMessage}
        </div>
      )}
      {error && <p className="mt-1 text-xs text-error-500">{error}</p>}
    </div>
  );
};

export default Dropdown;
