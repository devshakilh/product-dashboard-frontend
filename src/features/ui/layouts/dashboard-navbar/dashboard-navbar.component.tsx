'use client';

import { Avatar } from '@/features/ui/atoms/avatar/avatar.component';
import { MessageCircle } from 'lucide-react';

import NotificationPopover from './notification-popover.component';

interface NavbarProps {
  title: string;
  date: string;
  user: {
    name: string;
    role: string;
    avatar: string;
  };
  notifications?: Array<{
    id: string;
    title: string;
    timeAgo: string;
    type:
      | 'completed'
      | 'created'
      | 'capacity'
      | 'attendance'
      | 'reminder'
      | 'updated';
    isRead: boolean;
  }>;
  isLoadingNotifications?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({
  title,
  date,
  user,
  notifications,
  isLoadingNotifications,
}) => {
  return (
    <nav className="flex items-center justify-between bg-white p-4 shadow-sm">
      <div>
        <h1 className="text-lg font-semibold">{title}</h1>
        <p className="text-xs text-gray-500">{date}</p>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Avatar src={user.avatar} alt={user.name} size="md" />
          <div className="hidden sm:block">
            <p className="text-sm font-medium">{user.name}</p>
            <p className="text-xs text-gray-500">{user.role}</p>
          </div>
        </div>
        <NotificationPopover
          notifications={notifications}
          isLoading={isLoadingNotifications}
        />
        <MessageCircle className="size-5 cursor-pointer text-gray-600" />
      </div>
    </nav>
  );
};

export default Navbar;
