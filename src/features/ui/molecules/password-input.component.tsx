import { InputHTMLAttributes, useState } from 'react';
import Image from 'next/image';
import { Input } from '@/features/ui/atoms';
import { PiEye, PiEyeSlash } from 'react-icons/pi';

import { cn } from '@/lib/utils';

interface PasswordInputProps extends InputHTMLAttributes<HTMLInputElement> {
  validationState?: 'success' | 'error' | 'loading' | 'warning';
  validationMessage?: string;
  error?: string;
  loading?: boolean;
  label?: string;
}

export default function PasswordInput({
  className,
  ...props
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <Input
        type={showPassword ? 'text' : 'password'}
        leftIcon={
          <Image src="/icons/lock.svg" alt="email" width={18} height={15} />
        }
        className={cn('pr-8 sm:h-[3.25rem]', className)}
        {...props}
      />
      <button
        type="button"
        className="absolute right-3 top-[56%] text-[#A1A5B0]"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? <PiEyeSlash size={19} /> : <PiEye size={19} />}
      </button>
    </div>
  );
}
