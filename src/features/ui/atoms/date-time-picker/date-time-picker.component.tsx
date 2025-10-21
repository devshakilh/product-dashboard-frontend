'use client';

import { forwardRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { cva, type VariantProps } from 'class-variance-authority';
import type { Locale } from 'date-fns';
import { de } from 'date-fns/locale/de';
import { enUS } from 'date-fns/locale/en-US';
import { es } from 'date-fns/locale/es';
import { fr } from 'date-fns/locale/fr';
import {
  AlertTriangle,
  CheckCircle,
  Clock,
  Loader2,
  XCircle,
} from 'lucide-react';
import ReactDatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

import { cn } from '@/lib/utils';

import Schedule from '../../../../../public/icons/schedule.svg';

import './date-time-picker.styles.css';

const createCustomLocale = (baseLocale: Locale, shortMonths: string[]) => ({
  ...baseLocale,
  localize: {
    ...baseLocale.localize,
    month: (n: number) => shortMonths[n],
  },
});

const customLocales = {
  en: createCustomLocale(enUS, [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]),
  es: createCustomLocale(es, [
    'Ene',
    'Feb',
    'Mar',
    'Abr',
    'May',
    'Jun',
    'Jul',
    'Ago',
    'Sep',
    'Oct',
    'Nov',
    'Dic',
  ]),
  fr: createCustomLocale(fr, [
    'Jan',
    'Fév',
    'Mar',
    'Avr',
    'Mai',
    'Juin',
    'Juil',
    'Aoû',
    'Sep',
    'Oct',
    'Nov',
    'Déc',
  ]),
  de: createCustomLocale(de, [
    'Jan',
    'Feb',
    'Mär',
    'Apr',
    'Mai',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Okt',
    'Nov',
    'Dez',
  ]),
};

const dateTimePickerVariants = cva(
  [
    'block w-full rounded-lg border bg-white transition-all duration-200 ease-in-out',
    'focus:border-secondary-700 focus:outline-none',
    'disabled:cursor-not-allowed disabled:opacity-50',
    '[&::-webkit-calendar-picker-indicator]:hidden', // Hide native calendar icon
    '[&::-webkit-inner-spin-button]:hidden',
    '[&::-webkit-clear-button]:hidden',
  ].join(' '),
  {
    variants: {
      state: {
        inactive: 'border-secondary-100 text-gray-900',
        hover: 'border-secondary-200 text-gray-900',
        focused: 'border-secondary-700 text-gray-900',
        disabled: 'border-secondary-100 text-secondary-100',
      },
      variant: {
        date: 'py-2 pl-3 pr-10',
        datetime: 'py-2 pl-3 pr-10',
        year: 'py-2 pl-3 pr-10',
        time: 'py-2 pl-3 pr-10',
      },
      validation: {
        success: 'border-success-500',
        error: 'border-error-500',
        warning: 'border-warning-500',
        loading: 'border-secondary-300',
      },
    },
    defaultVariants: {
      state: 'inactive',
      variant: 'date',
    },
  }
);

const validationIcons = {
  success: <CheckCircle className="size-3 text-success-500" />,
  error: <XCircle className="size-3 text-error-500" />,
  loading: <Loader2 className="size-3 animate-spin text-secondary-300" />,
  warning: <AlertTriangle className="size-3 text-warning-500" />,
};

interface DateTimePickerProps
  extends VariantProps<typeof dateTimePickerVariants> {
  variant?: 'date' | 'datetime' | 'year' | 'time';
  validationState?: 'success' | 'error' | 'loading' | 'warning';
  validationMessage?: string;
  error?: string;
  label?: string;
  placeholder?: string;
  selected?: Date | null;
  onChange?: (date: Date | null) => void;
  className?: string;
  disabled?: boolean;
  locale?: 'en' | 'es' | 'fr' | 'de';
}

const DateTimePicker = forwardRef<HTMLDivElement, DateTimePickerProps>(
  ({ onChange, selected, locale = 'en', error, ...props }, ref) => {
    const [hovered, setHovered] = useState(false);
    const [focused, setFocused] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | null>(
      selected || null
    );
    const [showYearPicker, setShowYearPicker] = useState(false);

    // Sync internal state with selected prop
    useEffect(() => {
      if (selected !== undefined) {
        setSelectedDate(selected);
      }
    }, [selected]);

    const handleMouseEnter = () => setHovered(true);
    const handleMouseLeave = () => setHovered(false);
    const handleFocus = () => setFocused(true);
    const handleBlur = () => setFocused(false);

    const handleDateChange = (date: Date | null) => {
      setSelectedDate(date);
      onChange?.(date);
    };

    const getDatePickerConfig = () => {
      switch (props.variant) {
        case 'datetime':
          return {
            showTimeSelect: !showYearPicker,
            dateFormat: 'MM/dd/yyyy h:mm aa',
            timeFormat: 'h:mm aa',
            timeIntervals: 15,
            timeCaption: '',
            timeInputLabel: 'Time:',
            showTimeInput: !showYearPicker,
          };
        case 'year':
          return {
            showMonthYearPicker: true,
            dateFormat: 'MM/yyyy',
            showFullMonthYearPicker: true,
            showMonthDropdown: false,
            showYearDropdown: false,
            showTimeSelect: false,
            showTimeInput: false,
          };
        case 'time':
          return {
            showTimeSelect: true,
            showTimeSelectOnly: true,
            timeFormat: 'h:mm aa',
            dateFormat: 'h:mm aa',
            timeIntervals: 15,
            timeCaption: '',
            timeInputLabel: 'Time:',
            showTimeInput: true,
          };
        default:
          return {
            dateFormat: 'MM/dd/yyyy',
          };
      }
    };

    const CustomInput = forwardRef<
      HTMLInputElement,
      React.HTMLProps<HTMLInputElement>
    >(({ value, onClick, onChange: inputOnChange }, inputRef) => (
      <div className="relative">
        <input
          ref={inputRef}
          placeholder={props.placeholder}
          value={value}
          onChange={inputOnChange}
          onClick={onClick}
          onFocus={() => {
            handleFocus();
            onClick?.(
              new MouseEvent(
                'click'
              ) as unknown as React.MouseEvent<HTMLInputElement>
            );
          }}
          className={cn(
            dateTimePickerVariants({
              state: props.disabled
                ? 'disabled'
                : focused
                  ? 'focused'
                  : hovered
                    ? 'hover'
                    : 'inactive',
              variant: props.variant,
              validation: props.validationState,
            }),
            props.className
          )}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onBlur={handleBlur}
          disabled={props.disabled || props.validationState === 'loading'}
        />
        <div
          className="absolute inset-y-0 right-3 flex cursor-pointer items-center text-secondary-300"
          onClick={onClick}
        >
          {props.variant === 'time' ? (
            <Clock className="size-5" />
          ) : (
            <Image
              src={Schedule}
              alt="calendar"
              width={20}
              height={20}
              className="pointer-events-none size-5 select-none"
              priority
            />
          )}
        </div>
      </div>
    ));

    CustomInput.displayName = 'CustomInput';

    useEffect(() => {
      const monthElement = document.querySelector(
        '.react-datepicker__current-month'
      );
      const headerElement = document.querySelector('.react-datepicker__header');

      if (monthElement && props.variant !== 'year') {
        monthElement.addEventListener('click', () => setShowYearPicker(true));
      }

      if (headerElement && showYearPicker && props.variant !== 'year') {
        const existingBackButton = document.querySelector(
          '.datepicker-back-button'
        );
        if (!existingBackButton) {
          const backButton = document.createElement('button');
          backButton.className = 'datepicker-back-button';
          backButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg> Back`;
          backButton.addEventListener('click', () => setShowYearPicker(false));
          headerElement.insertBefore(backButton, headerElement.firstChild);
        }
      }

      if (headerElement && props.variant === 'year') {
        const existingBackButton = document.querySelector(
          '.datepicker-back-button'
        );
        if (!existingBackButton) {
          const backButton = document.createElement('button');
          backButton.className = 'datepicker-back-button';
          backButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg> Back`;
          backButton.addEventListener('click', () => {
            // Handle any year variant specific back button logic here if needed
          });
          headerElement.insertBefore(backButton, headerElement.firstChild);
        }
      }

      return () => {
        if (monthElement && props.variant !== 'year') {
          monthElement.removeEventListener('click', () =>
            setShowYearPicker(true)
          );
        }
        if (props.variant !== 'year') {
          const backButton = document.querySelector('.datepicker-back-button');
          if (backButton) {
            backButton.remove();
          }
        }
      };
    });

    return (
      <div className="flex w-full flex-col gap-1" ref={ref}>
        {props.label && (
          <label className="mb-1 block text-sm font-medium text-gray-700">
            {props.label}
          </label>
        )}
        <ReactDatePicker
          selected={selectedDate}
          customInput={<CustomInput />}
          onChange={handleDateChange}
          {...getDatePickerConfig()}
          showMonthYearPicker={props.variant === 'year' || showYearPicker}
          onMonthChange={() => {
            if (props.variant !== 'year') {
              setShowYearPicker(false);
            }
          }}
          shouldCloseOnSelect={true}
          strictParsing={true}
          disabledKeyboardNavigation
          locale={customLocales[locale]}
        />
        {props.validationState && props.validationMessage && (
          <div className="flex items-center gap-1 text-xs text-secondary-300">
            {validationIcons[props.validationState]} {props.validationMessage}
          </div>
        )}
        {error && <p className="mt-1 text-xs text-error-500">{error}</p>}
      </div>
    );
  }
);

DateTimePicker.displayName = 'DateTimePicker';

export default DateTimePicker;
