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

import { useDebounce } from '@/lib/hooks/use-debounce';
import { cn } from '@/lib/utils';

// Validation Icons
const validationIcons = {
  success: <CheckCircle className="size-4 text-success-500" />,
  error: <XCircle className="size-4 text-error-500" />,
  loading: <Loader className="size-4 animate-spin text-secondary-300" />,
  warning: <AlertTriangle className="size-4 text-warning-500" />,
};

interface AutocompleteOption {
  value: string;
  label: string;
}

interface AutocompleteProps {
  options?: AutocompleteOption[];
  value?: string;
  onChange?: (value: string) => void;
  onSearch?: (query: string) => void;
  placeholder?: string;
  className?: string;
  error?: string;
  validationState?: 'success' | 'error' | 'loading' | 'warning';
  validationMessage?: string;
  disabled?: boolean;
  label?: string;
  isLoading?: boolean;
  noOptionsMessage?: string;
}

const Autocomplete = ({
  options = [],
  value,
  onChange,
  onSearch,
  placeholder,
  className,
  error,
  validationState,
  validationMessage,
  disabled,
  label,
  isLoading,
  noOptionsMessage = 'No options found',
}: AutocompleteProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOption, setSelectedOption] = useState<string | undefined>(
    value
  );
  const [selectedLabel, setSelectedLabel] = useState<string | undefined>();
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const autocompleteRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Find the selected label when value changes
  useEffect(() => {
    if (value) {
      const option = options.find((opt) => opt.value === value);
      setSelectedLabel(option?.label);
      setSelectedOption(value);
    } else {
      setSelectedLabel(undefined);
      setSelectedOption(undefined);
    }
  }, [value, options]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        autocompleteRef.current &&
        !autocompleteRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Trigger search when debounced term changes
  useEffect(() => {
    if (onSearch && debouncedSearchTerm) {
      onSearch(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm, onSearch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    setIsOpen(true);

    // Clear selection if input is cleared
    if (!value) {
      setSelectedOption(undefined);
      setSelectedLabel(undefined);
      onChange?.('');
    }
  };

  const handleOptionSelect = (option: AutocompleteOption) => {
    setSelectedOption(option.value);
    setSelectedLabel(option.label);
    setSearchTerm('');
    onChange?.(option.value);
    setIsOpen(false);
  };

  const handleInputFocus = () => {
    setIsOpen(true);
    if (onSearch && searchTerm) {
      onSearch(searchTerm);
    }
  };

  return (
    <div className="relative w-full" ref={autocompleteRef}>
      {label && (
        <label className="mb-1 block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      <div className="relative">
        <div className="relative">
          <Input
            ref={inputRef}
            value={isOpen ? searchTerm : selectedLabel || ''}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            placeholder={placeholder}
            disabled={disabled}
            leftIcon={<Search className="size-4 text-secondary-400" />}
            rightIcon={
              isLoading ? (
                <Loader className="size-4 animate-spin text-secondary-400" />
              ) : (
                <ChevronDown
                  size={18}
                  className={cn(
                    'text-secondary-400 transition-transform',
                    isOpen && 'rotate-180'
                  )}
                  onClick={() => !disabled && setIsOpen(!isOpen)}
                />
              )
            }
            className={cn(className, error && 'border-error-500')}
            error={error}
          />
        </div>

        {isOpen && (
          <div className="absolute z-10 mt-1 w-full rounded-lg border border-secondary-100 bg-white shadow-lg">
            <ul
              className="max-h-60 overflow-auto py-1"
              role="listbox"
              id="autocomplete-options"
            >
              {isLoading ? (
                <li className="flex items-center justify-center px-3 py-4">
                  <Loader className="size-5 animate-spin text-primary-500" />
                  <span className="ml-2">Loading...</span>
                </li>
              ) : options.length > 0 ? (
                options.map((option) => (
                  <li
                    key={option.value}
                    role="option"
                    aria-selected={selectedOption === option.value}
                    onClick={() => handleOptionSelect(option)}
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
                  {noOptionsMessage}
                </li>
              )}
            </ul>
          </div>
        )}
      </div>

      {/* Hidden input for form submission */}
      <input
        type="hidden"
        value={selectedOption || ''}
        disabled={disabled}
        aria-hidden="true"
      />

      {validationState && validationMessage && (
        <div className="mt-1 flex items-center gap-1 text-xs text-secondary-300">
          {validationIcons[validationState]} {validationMessage}
        </div>
      )}
    </div>
  );
};

export default Autocomplete;
