/* eslint-disable @typescript-eslint/no-unused-vars */

'use client';

import { ReactNode } from 'react';
import { Button } from '@/features/ui/atoms';
import { SaveIcon } from 'lucide-react';
import { FieldValues, UseFormReturn } from 'react-hook-form';

import { cn } from '@/lib/utils';

interface FormProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  title?: string | ReactNode;
  onSubmit: (data: T) => void;
  children: ReactNode;
  submitText?: string;
  cancelText?: string;
  onCancel?: () => void;
  isLoading?: boolean;
  className?: string;
  error?: string;
  showSubmitButton?: boolean;
}

export default function Form<T extends FieldValues>({
  form: formConfig,
  title,
  onSubmit,
  children,
  submitText = 'Save',
  cancelText = 'Cancel',
  onCancel,
  isLoading,
  className,
  error,
  showSubmitButton = true,
  ...props
}: FormProps<T>) {
  return (
    <form
      onSubmit={formConfig.handleSubmit(onSubmit)}
      className={cn('space-y-6', className)}
      noValidate
      {...props}
    >
      <div className="flex items-center justify-between">
        {title && <h4 className="text-lg font-medium">{title}</h4>}
        {showSubmitButton && (
          <div className="flex justify-end gap-2">
            <Button
              type="submit"
              disabled={isLoading}
              icon={<SaveIcon className="size-4" />}
              iconPosition="left"
            >
              {submitText}
            </Button>
            {onCancel && (
              <Button variant="secondary" onClick={onCancel} type="button">
                {cancelText}
              </Button>
            )}
          </div>
        )}
      </div>
      {error && (
        <div className="mb-4 rounded-lg bg-red-50 p-4 text-red-700">
          <p>Error: {error}</p>
        </div>
      )}
      {children}
    </form>
  );
}
