'use client';

import { useState } from 'react';
import { Button } from '@/features/ui/atoms';
import Popover from '@/features/ui/atoms/popover/popover.component';
import {
  Bell,
  Calendar,
  ChartBar,
  Check,
  ChevronRight,
  Plus,
  Trophy,
} from 'lucide-react';

interface Notification {
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
}

// Function to get the appropriate icon based on notification type
const getNotificationIcon = (type: Notification['type']) => {
  const iconClass = 'size-4 text-white';

  switch (type) {
    case 'completed':
      return <Check className={iconClass} />;
    case 'created':
      return <Plus className={iconClass} />;
    case 'capacity':
      return <ChartBar className={iconClass} />;
    case 'attendance':
      return <Trophy className={iconClass} />;
    case 'reminder':
      return <Calendar className={iconClass} />;
    default:
      return <Bell className={iconClass} />;
  }
};

// Function to get the appropriate background color based on notification type
const getNotificationBgColor = (type: Notification['type']) => {
  switch (type) {
    case 'completed':
    case 'updated':
    case 'attendance':
      return 'bg-green-400';
    case 'created':
      return 'bg-blue-400';
    case 'capacity':
    case 'reminder':
      return 'bg-amber-400';
    default:
      return 'bg-gray-400';
  }
};

interface NotificationPopoverProps {
  notifications?: Notification[];
  isLoading?: boolean;
}

// Fake data for development
const FAKE_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    title: 'Winter Tech Camp 2025 registration Closed',
    timeAgo: '1h ago',
    type: 'completed',
    isRead: false,
  },
  {
    id: '2',
    title: 'Winter Tech Camp 2025 registration Closed',
    timeAgo: '1h ago',
    type: 'completed',
    isRead: false,
  },
  {
    id: '3',
    title: 'New Parent-Teacher Conference-Jan, 2025 Created',
    timeAgo: '1d ago',
    type: 'created',
    isRead: false,
  },
  {
    id: '4',
    title: 'New Parent-Teacher Conference-Jan, 2025 Created',
    timeAgo: '1d ago',
    type: 'created',
    isRead: false,
  },
  {
    id: '5',
    title: 'Registration for Music Fest 2025 reached 80% capacity',
    timeAgo: '1d ago',
    type: 'capacity',
    isRead: true,
  },
  {
    id: '6',
    title: 'Registration for Music Fest 2025 reached 80% capacity',
    timeAgo: '1d ago',
    type: 'capacity',
    isRead: true,
  },
  {
    id: '7',
    title: 'Highest-attended event: Math Workshop (95%)',
    timeAgo: '1w ago',
    type: 'attendance',
    isRead: true,
  },
  {
    id: '8',
    title: 'Highest-attended event: Math Workshop (95%)',
    timeAgo: '1w ago',
    type: 'attendance',
    isRead: true,
  },
  {
    id: '9',
    title: 'Reminder sent for Upcoming Sports Day event',
    timeAgo: '1w ago',
    type: 'reminder',
    isRead: true,
  },
  {
    id: '10',
    title: 'Reminder sent for Upcoming Sports Day event',
    timeAgo: '1w ago',
    type: 'reminder',
    isRead: true,
  },
];

export default function NotificationPopover({
  notifications = FAKE_NOTIFICATIONS,
  isLoading = false,
}: NotificationPopoverProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const displayedNotifications = showAll
    ? notifications
    : notifications.slice(0, 5);

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex h-32 items-center justify-center">
          <p className="text-sm text-gray-500">Loading notifications...</p>
        </div>
      );
    }

    if (!notifications.length) {
      return (
        <div className="flex h-32 flex-col items-center justify-center gap-2">
          <p className="text-sm text-gray-500">No notifications yet</p>
        </div>
      );
    }

    return (
      <div className="flex flex-col">
        <div className={`overflow-y-auto ${showAll ? 'max-h-[480px]' : ''}`}>
          {displayedNotifications.map((notification) => (
            <div
              key={notification.id}
              className="flex items-start justify-between gap-3 px-4 py-3 transition-colors hover:bg-gray-50/50"
              data-testid={`notification-${notification.id}`}
            >
              <div className="flex items-start gap-3">
                <div className="relative">
                  <div
                    className={`flex size-8 shrink-0 items-center justify-center rounded-full ${getNotificationBgColor(
                      notification.type
                    )}`}
                  >
                    {getNotificationIcon(notification.type)}
                  </div>
                </div>

                <div className="min-w-0 flex-1">
                  <p
                    className={`line-clamp-2 text-sm ${
                      notification.isRead
                        ? 'text-secondary-500'
                        : 'text-gray-700'
                    }`}
                  >
                    {notification.title}
                  </p>
                </div>
              </div>

              <span className="shrink-0 pt-1 text-xs text-gray-500">
                {notification.timeAgo}
              </span>
            </div>
          ))}
        </div>

        {notifications.length > 5 && (
          <div className="sticky bottom-0 flex justify-end rounded-b-2xl border-t border-gray-100 bg-white p-2">
            <Button
              variant="secondary"
              className="border-none px-4 text-primary-500 hover:bg-transparent"
              icon={<ChevronRight className="size-4" />}
              iconPosition="right"
              onClick={() => setShowAll(!showAll)}
              data-testid="view-more-button"
            >
              {showAll ? 'View Less' : 'View More'}
            </Button>
          </div>
        )}
      </div>
    );
  };

  return (
    <Popover
      trigger={
        <div className="relative">
          <Bell
            className="size-5 cursor-pointer text-gray-600"
            data-testid="notification-bell-icon"
          />
          {notifications.some((n) => !n.isRead) && (
            <span className="absolute -right-1 -top-1 size-2 rounded-full bg-red-500" />
          )}
        </div>
      }
      isOpen={isOpen}
      onOpenChange={setIsOpen}
      position="bottom-end"
      size="lg"
      className="w-[350px] overflow-hidden rounded-2xl bg-white p-0 shadow-lg"
      data-testid="notification-popover"
    >
      <div className="flex flex-col">
        <div className="border-b border-gray-100 px-4 py-3">
          <h3 className="text-lg font-medium leading-none">Notifications</h3>
        </div>
        {renderContent()}
      </div>
    </Popover>
  );
}
