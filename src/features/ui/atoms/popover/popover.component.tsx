'use client';

import { ReactNode, useEffect, useRef, useState } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const popoverVariants = cva(
  'absolute z-50 rounded-lg bg-white shadow-lg transition-opacity duration-200',
  {
    variants: {
      position: {
        top: 'mb-2 -translate-x-1/2 -translate-y-full',
        'top-start': 'left-0 mb-2 -translate-y-full',
        'top-end': 'right-0 mb-2 -translate-y-full',
        bottom: '-translate-x-1/2 translate-y-2',
        'bottom-start': 'left-0 translate-y-2',
        'bottom-end': 'right-0 translate-y-2',
        left: 'mr-2 -translate-x-full -translate-y-1/2',
        'left-start': 'top-0 mr-2 -translate-x-full',
        'left-end': 'bottom-0 mr-2 -translate-x-full',
        right: '-translate-y-1/2 translate-x-2',
        'right-start': 'top-0 translate-x-2',
        'right-end': 'bottom-0 translate-x-2',
      },
      size: {
        sm: 'w-48',
        md: 'w-64',
        lg: 'w-80',
      },
      variant: {
        plain: '',
        caret:
          'before:absolute before:size-2 before:rotate-45 before:bg-white before:content-[""]',
      },
    },
    compoundVariants: [
      {
        position: 'bottom',
        variant: 'caret',
        className:
          'before:-top-1 before:left-1/2 before:-translate-x-1/2 before:shadow-[-2px_-2px_2px_rgba(0,0,0,0.03)]',
      },
      {
        position: 'bottom-start',
        variant: 'caret',
        className:
          'before:-top-1 before:left-4 before:shadow-[-2px_-2px_2px_rgba(0,0,0,0.03)]',
      },
      {
        position: 'bottom-end',
        variant: 'caret',
        className:
          'before:-top-1 before:right-4 before:shadow-[-2px_-2px_2px_rgba(0,0,0,0.03)]',
      },
      {
        position: 'top',
        variant: 'caret',
        className:
          'before:-bottom-1 before:left-1/2 before:-translate-x-1/2 before:shadow-[2px_2px_2px_rgba(0,0,0,0.03)]',
      },
      {
        position: 'top-start',
        variant: 'caret',
        className:
          'before:-bottom-1 before:left-4 before:shadow-[2px_2px_2px_rgba(0,0,0,0.03)]',
      },
      {
        position: 'top-end',
        variant: 'caret',
        className:
          'before:-bottom-1 before:right-4 before:shadow-[2px_2px_2px_rgba(0,0,0,0.03)]',
      },
      {
        position: 'left',
        variant: 'caret',
        className:
          'before:-right-1 before:top-1/2 before:-translate-y-1/2 before:shadow-[2px_-2px_2px_rgba(0,0,0,0.03)]',
      },
      {
        position: 'left-start',
        variant: 'caret',
        className:
          'before:-right-1 before:top-4 before:shadow-[2px_-2px_2px_rgba(0,0,0,0.03)]',
      },
      {
        position: 'left-end',
        variant: 'caret',
        className:
          'before:-right-1 before:bottom-4 before:shadow-[2px_-2px_2px_rgba(0,0,0,0.03)]',
      },
      {
        position: 'right',
        variant: 'caret',
        className:
          'before:-left-1 before:top-1/2 before:-translate-y-1/2 before:shadow-[-2px_2px_2px_rgba(0,0,0,0.03)]',
      },
      {
        position: 'right-start',
        variant: 'caret',
        className:
          'before:-left-1 before:top-4 before:shadow-[-2px_2px_2px_rgba(0,0,0,0.03)]',
      },
      {
        position: 'right-end',
        variant: 'caret',
        className:
          'before:-left-1 before:bottom-4 before:shadow-[-2px_2px_2px_rgba(0,0,0,0.03)]',
      },
    ],
    defaultVariants: {
      position: 'bottom',
      size: 'md',
      variant: 'plain',
    },
  }
);

interface PopoverProps extends VariantProps<typeof popoverVariants> {
  trigger: ReactNode;
  children: ReactNode;
  isOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
  className?: string;
}

export default function Popover({
  trigger,
  children,
  position,
  size,
  variant,
  isOpen: controlledIsOpen,
  onOpenChange,
  className,
}: PopoverProps) {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  const open = controlledIsOpen ?? isOpen;
  const setOpen = onOpenChange ?? setIsOpen;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        !popoverRef.current?.contains(event.target as Node) &&
        !triggerRef.current?.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [setOpen]);

  return (
    <div className="relative inline-block">
      <div ref={triggerRef} onClick={() => setOpen(!open)}>
        {trigger}
      </div>
      {open && (
        <div
          ref={popoverRef}
          className={cn(
            popoverVariants({ position, size, variant }),
            className
          )}
        >
          {children}
        </div>
      )}
    </div>
  );
}
