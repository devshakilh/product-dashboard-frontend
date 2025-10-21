'use client';

import { ChangeEvent, DragEvent, FC, useRef, useState } from 'react';
import Image from 'next/image';
import { cva, type VariantProps } from 'class-variance-authority';
import { FileImage, FileVideo, Upload } from 'lucide-react';

import { cn } from '@/lib/utils';

import Button from './button.component';

const dropFileInputVariants = cva(
  'relative flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 transition-all duration-200',
  {
    variants: {
      state: {
        idle: 'border-secondary-200 bg-secondary-50',
        hover: 'border-primary-500 bg-primary-50',
        error: 'border-error-500 bg-error-50',
        disabled: 'border-secondary-100 bg-secondary-50 opacity-50',
      },
      size: {
        sm: 'h-32',
        md: 'h-48',
        lg: 'h-[200px]',
      },
    },
    defaultVariants: {
      state: 'idle',
      size: 'md',
    },
  }
);

export type AcceptedFileType = 'image' | 'video' | 'both';

interface DropFileInputProps
  extends VariantProps<typeof dropFileInputVariants> {
  accept?: AcceptedFileType;
  maxFileSize?: number; // in MB
  onFileSelect?: (file: File | null) => void;
  className?: string;
  disabled?: boolean;
  error?: string;
  existingImage?: string;
}

const acceptMap = {
  image: 'image/*',
  video: 'video/*',
  both: 'image/*,video/*',
};

const DropFileInput: FC<DropFileInputProps> = ({
  accept = 'image',
  maxFileSize = 25,
  onFileSelect,
  className,
  state,
  size,
  disabled,
  error,
  existingImage,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!disabled) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const validateFile = (file: File): boolean => {
    // Check file type
    if (accept === 'image' && !file.type.startsWith('image/')) {
      setFileError('Only image files are accepted');
      return false;
    }

    if (accept === 'video' && !file.type.startsWith('video/')) {
      setFileError('Only video files are accepted');
      return false;
    }

    if (
      accept === 'both' &&
      !file.type.startsWith('image/') &&
      !file.type.startsWith('video/')
    ) {
      setFileError('Only image or video files are accepted');
      return false;
    }

    // Check file size
    if (file.size > maxFileSize * 1024 * 1024) {
      setFileError(`File size must be less than ${maxFileSize}MB`);
      return false;
    }

    setFileError(null);
    return true;
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    if (disabled) return;

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (validateFile(file)) {
        setSelectedFile(file);
        onFileSelect?.(file);
      }
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;

    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (validateFile(file)) {
        setSelectedFile(file);
        onFileSelect?.(file);
      }
    }
  };

  const handleClick = (e?: React.MouseEvent) => {
    // Only prevent default if event is provided (button click)
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (!disabled && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedFile(null);
    onFileSelect?.(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const getFileIcon = () => {
    if (selectedFile) {
      if (selectedFile.type.startsWith('image/')) {
        return <FileImage className="mb-2 size-10 text-primary-500" />;
      } else if (selectedFile.type.startsWith('video/')) {
        return <FileVideo className="mb-2 size-10 text-primary-500" />;
      }
    }

    return <Upload className="mb-2 size-10 text-secondary-400" />;
  };

  const getAcceptedFileTypes = () => {
    switch (accept) {
      case 'image':
        return 'JPG, PNG, JPEG';
      case 'video':
        return 'MP4, MOV, AVI';
      case 'both':
        return 'JPG, PNG, JPEG, MP4, MOV, AVI';
    }
  };

  const currentState = disabled
    ? 'disabled'
    : error || fileError
      ? 'error'
      : isDragging
        ? 'hover'
        : state;

  // If there's an existing image and no new file selected, show the existing image
  if (existingImage && !selectedFile) {
    return (
      <div className="w-full">
        <div className="flex flex-col gap-4">
          <div className="relative h-[200px] w-full overflow-hidden rounded-lg">
            <Image
              src={existingImage}
              alt="Event banner"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="primary"
              size="sm"
              type="button"
              onClick={(e) => handleClick(e)}
            >
              Upload New
            </Button>
            <Button
              variant="secondary"
              size="sm"
              type="button"
              onClick={handleRemove}
            >
              Remove
            </Button>
          </div>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept={acceptMap[accept]}
            onChange={handleFileChange}
            disabled={disabled}
          />
        </div>
        {(error || fileError) && (
          <p className="mt-1 text-xs text-error-500">{error || fileError}</p>
        )}
      </div>
    );
  }

  return (
    <div className="w-full">
      <div
        className={cn(
          dropFileInputVariants({ state: currentState, size }),
          className,
          'cursor-pointer'
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => handleClick()}
      >
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept={acceptMap[accept]}
          onChange={handleFileChange}
          disabled={disabled}
        />

        {getFileIcon()}

        {selectedFile ? (
          <div className="text-center">
            <p className="mb-1 font-medium text-gray-700">
              {selectedFile.name}
            </p>
            <p className="text-sm text-gray-500">
              {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
            </p>
            <Button
              variant="secondary"
              size="sm"
              type="button"
              className="mt-2"
              onClick={handleRemove}
            >
              Remove
            </Button>
          </div>
        ) : (
          <div className="text-center">
            <p className="mb-1 font-medium text-gray-700">
              Drop file or <span className="text-primary-500">Browse</span>
            </p>
            <p className="text-sm text-gray-500">
              Format: {getAcceptedFileTypes()} & Max file size: {maxFileSize} MB
            </p>
          </div>
        )}
      </div>

      {(error || fileError) && (
        <p className="mt-1 text-xs text-error-500">{error || fileError}</p>
      )}
    </div>
  );
};

export default DropFileInput;
