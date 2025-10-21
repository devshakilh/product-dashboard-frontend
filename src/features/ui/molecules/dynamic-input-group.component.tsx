'use client';

import { FC } from 'react';
import { Button, Input } from '@/features/ui';
import { Plus, Trash2 } from 'lucide-react';

import { cn } from '@/lib/utils';

export interface InputRow {
  id: string;
  fields: Record<string, string>;
}

interface InputField {
  name: string;
  label?: string;
  placeholder?: string;
  type?: 'text' | 'number' | 'email' | 'tel';
  required?: boolean;
}

interface DynamicInputGroupProps {
  rows: InputRow[];
  fields: InputField[];
  onAdd: () => void;
  onRemove: (id: string) => void;
  onChange?: (id: string, field: string, value: string) => void;
  className?: string;
  variant?: 'default' | 'compact' | 'bordered';
  addButtonLabel?: string;
  addButtonIcon?: React.ReactNode;
  removeButtonIcon?: React.ReactNode;
  showLabels?: boolean;
  disabled?: boolean;
  error?: string;
  hideAddButton?: boolean;
  hideRemoveButton?: boolean;
}

const DynamicInputGroup: FC<DynamicInputGroupProps> = ({
  rows,
  fields,
  onAdd,
  onRemove,
  onChange,
  className,
  variant = 'default',
  addButtonLabel = 'Add New',
  addButtonIcon = <Plus className="mr-2 size-4" />,
  removeButtonIcon = <Trash2 className="size-4" />,
  showLabels = true,
  disabled = false,
  error,
  hideAddButton = false,
  hideRemoveButton = false,
}) => {
  const variantStyles = {
    default: 'space-y-4',
    compact: 'space-y-2',
    bordered: 'space-y-4 divide-y divide-secondary-100',
  };

  const rowStyles = {
    default: 'flex items-start gap-4',
    compact: 'flex items-center gap-2',
    bordered: 'flex items-start gap-4 pt-4 first:pt-0',
  };

  return (
    <div className={cn('w-full', className)}>
      <div className={variantStyles[variant]}>
        {rows.map((row) => (
          <div key={row.id} className={rowStyles[variant]}>
            {fields.map((field) => (
              <div key={field.name} className="flex-1">
                {showLabels && field.label && (
                  <label className="mb-1.5 block text-sm text-gray-700">
                    {field.label}
                    {field.required && (
                      <span className="ml-1 text-error-500">*</span>
                    )}
                  </label>
                )}
                <Input
                  type={field.type || 'text'}
                  value={row.fields[field.name]}
                  placeholder={field.placeholder}
                  onChange={(e) =>
                    onChange?.(row.id, field.name, e.target.value)
                  }
                  disabled={disabled}
                  required={field.required}
                />
              </div>
            ))}
            {!hideRemoveButton && rows.length > 1 && (
              <Button
                variant="secondary"
                className={cn(
                  'bg-error-50 !p-2 text-error-500 hover:border-none hover:bg-error-200 hover:text-error-600',
                  showLabels ? 'mt-7' : 'mt-0'
                )}
                onClick={() => onRemove(row.id)}
                disabled={disabled}
              >
                {removeButtonIcon}
              </Button>
            )}
          </div>
        ))}
      </div>

      {error && <p className="mt-2 text-sm text-error-500">{error}</p>}

      {!hideAddButton && (
        <div className="mt-8 flex justify-end">
          <Button variant="primary" onClick={onAdd} disabled={disabled}>
            {addButtonIcon} {addButtonLabel}
          </Button>
        </div>
      )}
    </div>
  );
};

export default DynamicInputGroup;
