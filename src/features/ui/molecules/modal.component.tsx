import { ReactNode } from 'react';
import { X } from 'lucide-react';

import { cn } from '@/lib/utils';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  hideCloseButton?: boolean;
  children: ReactNode;
  className?: string;
}

export default function Modal({
  isOpen,
  onClose,
  title,
  hideCloseButton = false,
  children,
  className,
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />
      <div
        className={cn(
          'relative z-50 my-6 max-h-[calc(100vh-48px)] w-full max-w-2xl overflow-y-auto rounded-lg bg-white p-6 shadow-lg',
          className
        )}
      >
        <div className="mb-4 flex items-center justify-between">
          {title && (
            <h2 className="text-xl font-semibold text-gray-500">{title}</h2>
          )}
          {!hideCloseButton && (
            <button
              onClick={onClose}
              className="rounded-full border border-gray-400 p-1 hover:bg-gray-100"
            >
              <X className="size-3 text-gray-400" />
            </button>
          )}
        </div>
        {children}
      </div>
    </div>
  );
}
