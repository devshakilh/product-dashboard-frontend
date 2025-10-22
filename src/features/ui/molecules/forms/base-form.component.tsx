'use client';

import { ReactNode, useState } from 'react';
import {
  Button,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Form as ShadcnForm,
} from '@/features/ui';
import { AnimatePresence, motion } from 'framer-motion';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { Path, UseFormReturn } from 'react-hook-form';

// Define field configuration type
interface FormFieldConfig<T> {
  name: Path<T>;
  label: string;
  type: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'select';
  placeholder?: string;
  disabled?: boolean;
  options?: { value: string; label: string }[];
}

// Props for the reusable Form component
interface FormProps<T extends Record<string, unknown>> {
  form: UseFormReturn<T>;
  onSubmit: (data: T) => Promise<void>;
  fields: FormFieldConfig<T>[];
  submitButtonText: string;
  isLoading?: boolean;
  extraContent?: ReactNode;
}

export function BaseForm<T extends Record<string, unknown>>({
  form,
  onSubmit,
  fields,
  submitButtonText,
  isLoading = false,
  extraContent,
}: FormProps<T>) {
  const [showPassword, setShowPassword] = useState<Record<string, boolean>>({});

  // Toggle password visibility for a specific field
  const togglePasswordVisibility = (fieldName: string) => {
    setShowPassword((prev: Record<string, boolean>) => ({
      ...prev,
      [fieldName]: !prev[fieldName],
    }));
  };

  return (
    <ShadcnForm {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        {fields.map((field) => (
          <FormField
            key={field.name}
            control={form.control}
            name={field.name}
            render={({ field: formField }) => (
              <FormItem>
                <FormLabel>{field.label}</FormLabel>
                <FormControl>
                  <div className="relative">
                    {field.type === 'select' ? (
                      <Select
                        value={formField.value as string}
                        onValueChange={formField.onChange}
                        disabled={isLoading || field.disabled}
                      >
                        <SelectTrigger
                          className={`h-10 ${
                            form.formState.errors[field.name]
                              ? 'border-red-500 focus-visible:ring-red-500'
                              : 'border-gray-200 focus-visible:ring-blue-500'
                          } transition-all duration-200`}
                        >
                          <SelectValue placeholder={field.placeholder} />
                        </SelectTrigger>
                        <SelectContent>
                          {field.options?.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      <motion.div
                        whileFocus={{ scale: 1.01 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Input
                          type={
                            field.type === 'password' &&
                            showPassword[field.name]
                              ? 'text'
                              : field.type
                          }
                          placeholder={field.placeholder}
                          className={`h-10 ${
                            form.formState.errors[field.name]
                              ? 'border-red-500 focus-visible:ring-red-500'
                              : 'border-gray-200 focus-visible:ring-blue-500'
                          } transition-all duration-200`}
                          disabled={isLoading || field.disabled}
                          {...formField}
                          value={formField.value as string | number | undefined}
                        />
                      </motion.div>
                    )}
                    {field.type === 'password' && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-1 top-1/2 size-8 -translate-y-1/2 text-gray-400 hover:text-gray-400"
                        onClick={() => togglePasswordVisibility(field.name)}
                        disabled={isLoading || field.disabled}
                      >
                        {showPassword[field.name] ? (
                          <EyeOff className="size-4" />
                        ) : (
                          <Eye className="size-4" />
                        )}
                      </Button>
                    )}
                  </div>
                </FormControl>
                <AnimatePresence>
                  {form.formState.errors[field.name] && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                    >
                      <FormMessage />
                    </motion.div>
                  )}
                </AnimatePresence>
              </FormItem>
            )}
          />
        ))}

        <motion.div>
          <Button
            type="submit"
            className="h-10 w-full bg-[#0D92F4] text-white hover:bg-[#238cd8]"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center">
                <Loader2 className="mr-2 size-4 animate-spin" />
                {submitButtonText}...
              </span>
            ) : (
              submitButtonText
            )}
          </Button>
        </motion.div>

        {extraContent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.3 }}
            className="rounded-md bg-gray-50 p-3 text-center text-sm text-gray-600"
          >
            {extraContent}
          </motion.div>
        )}
      </form>
    </ShadcnForm>
  );
}
