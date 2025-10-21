import React from 'react';
import Image from 'next/image';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const avatarVariants = cva(
  'relative inline-flex items-center justify-center overflow-hidden rounded-full bg-gray-100',
  {
    variants: {
      size: {
        xs: 'size-6 text-sm',
        sm: 'text-md size-8',
        md: 'size-10 text-lg',
        lg: 'size-12 text-xl',
        xl: 'size-16 text-2xl',
        '2xl': 'size-24',
      },
      variant: {
        initial: 'bg-primary-500 font-medium text-white',
        image: '',
        stacked: 'border-2 border-white',
      },
    },
    defaultVariants: {
      size: 'md',
      variant: 'image',
    },
  }
);

export interface AvatarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof avatarVariants> {
  /** The source URL of the avatar image */
  src?: string;
  /** Alternative text for the avatar image */
  alt?: string;
  /** Initials to display when no image is provided */
  initials?: string;
}

/**
 * Avatar component for displaying user profile images or initials
 *
 * @component
 * @example
 * // Avatar with image
 * <Avatar src="/path/to/image.jpg" alt="User Name" size="md" />
 *
 * @example
 * // Avatar with initials
 * <Avatar initials="JD" variant="initial" size="lg" />
 *
 * @example
 * // Stacked avatar in a group
 * <AvatarGroup>
 *   <Avatar src="/user1.jpg" alt="User 1" />
 *   <Avatar src="/user2.jpg" alt="User 2" />
 * </AvatarGroup>
 */
export function Avatar({
  className,
  size,
  variant,
  src,
  alt,
  initials,
  ...props
}: AvatarProps) {
  return (
    <div
      className={cn(avatarVariants({ size, variant }), className)}
      {...props}
    >
      {src ? (
        <Image src={src} alt={alt || ''} fill className="object-cover" />
      ) : (
        <span className="text-center">
          {initials?.substring(0, 1) === '+'
            ? initials
            : initials?.substring(0, 1).toUpperCase()}
        </span>
      )}
    </div>
  );
}

/**
 * Props for the AvatarGroup component
 */
interface AvatarGroupProps {
  /** Avatar components to be rendered in the group */
  children: React.ReactNode;
  /** Maximum number of avatars to display before showing a count */
  max?: number;
  /** Size variant for all avatars in the group */
  size?: AvatarProps['size'];
}

/**
 * AvatarGroup component for displaying multiple avatars in a stack
 *
 * @component
 * @example
 * <AvatarGroup max={3} size="md">
 *   <Avatar src="/user1.jpg" alt="User 1" />
 *   <Avatar src="/user2.jpg" alt="User 2" />
 *   <Avatar src="/user3.jpg" alt="User 3" />
 *   <Avatar src="/user4.jpg" alt="User 4" /> // This will be shown as +1
 * </AvatarGroup>
 */
export function AvatarGroup({
  children,
  max = 5,
  size = 'md',
}: AvatarGroupProps) {
  const items = React.Children.toArray(children);
  const excess = items.length - max;

  return (
    <div className="flex -space-x-2">
      {items.slice(0, max).map((child, index) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<AvatarProps>, {
            key: index,
            variant: 'stacked',
            size,
          });
        }
        return null;
      })}
      {excess > 0 && (
        <Avatar
          variant="initial"
          size={size}
          initials={`+${excess}`}
          className="!bg-gray-100 !text-gray-600"
        />
      )}
    </div>
  );
}
