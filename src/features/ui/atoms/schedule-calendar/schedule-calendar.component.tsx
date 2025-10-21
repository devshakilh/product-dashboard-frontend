'use client';

import React, { ReactNode, useEffect, useState } from 'react';
import Button from '@/features/ui/atoms/button.component';
import { addDays, format, subDays } from 'date-fns';
import { ChevronLeft, ChevronRight, Clock } from 'lucide-react';

// Types for the schedule calendar
export interface ScheduleItem {
  id: string;
  columnId: string;
  timeStart: string;
  timeEnd: string;
  content: ReactNode;
  color: string;
  meta?: unknown;
  tags?: string[];
}

export interface ColumnHeader {
  id: string;
  title: ReactNode;
  subtitle?: ReactNode;
  meta?: unknown;
}

export interface ScheduleCalendarProps {
  items: ScheduleItem[];
  columnHeaders: ColumnHeader[];
  initialDate?: Date;
  initialView?: 'daily' | 'weekly';
  currentTimeHour?: number;
  currentTimeMinute?: number;
  onViewChange?: (view: 'daily' | 'weekly') => void;
  onDateChange?: (date: Date) => void;
  title?: string;
  customItemRenderer?: (item: ScheduleItem, isPast: boolean) => ReactNode;
  showTimeIndicator?: boolean;
  timeSlotHeight?: number;
  onEventClick?: (item: ScheduleItem) => void;
}

export const ScheduleCalendar = ({
  items,
  columnHeaders,
  initialDate = new Date(),
  initialView = 'daily',
  currentTimeHour,
  currentTimeMinute,
  onViewChange,
  onDateChange,
  // title = 'Schedule Calendar',
  customItemRenderer,
  showTimeIndicator = true,
  timeSlotHeight = 130,
  onEventClick,
}: ScheduleCalendarProps) => {
  // States
  const [currentDate, setCurrentDate] = useState(initialDate);
  const [currentView, setCurrentView] = useState<'daily' | 'weekly'>(
    initialView
  );
  const [hourToUse, setHourToUse] = useState<number>(
    currentTimeHour !== undefined ? currentTimeHour : new Date().getHours()
  );
  const [minuteToUse, setMinuteToUse] = useState<number>(
    currentTimeMinute !== undefined
      ? currentTimeMinute
      : new Date().getMinutes()
  );
  // const router = useRouter();

  // Update current time every minute if not manually set
  useEffect(() => {
    if (currentTimeHour !== undefined) {
      setHourToUse(currentTimeHour);
    }
    if (currentTimeMinute !== undefined) {
      setMinuteToUse(currentTimeMinute);
    }
  }, [currentTimeHour, currentTimeMinute]);

  useEffect(() => {
    if (currentTimeHour === undefined && currentTimeMinute === undefined) {
      const updateCurrentTime = () => {
        const now = new Date();
        setHourToUse(now.getHours());
        setMinuteToUse(now.getMinutes());
      };

      // Initial update
      updateCurrentTime();

      // Set interval to update every minute
      const intervalId = setInterval(updateCurrentTime, 60000);

      // Clean up interval on component unmount
      return () => clearInterval(intervalId);
    }
  }, [currentTimeHour, currentTimeMinute]);

  // Calculate time indicator position based on current time
  const calculateTimePosition = () => {
    // Calculate position based on 24-hour clock
    const position = hourToUse + minuteToUse / 60;
    // Multiply by height of each time slot
    return `${position * timeSlotHeight}px`;
  };

  const timeIndicatorPosition = calculateTimePosition();

  // Format the displayed date
  const formattedDate = format(currentDate, 'MMM d, yyyy');

  // Check if current date is today
  const isToday = () => {
    const today = new Date();
    return (
      today.getDate() === currentDate.getDate() &&
      today.getMonth() === currentDate.getMonth() &&
      today.getFullYear() === currentDate.getFullYear()
    );
  };

  // Today button functionality
  const goToToday = () => {
    const newDate = new Date();
    setCurrentDate(newDate);
    // Maintain the current view type (daily or weekly)
    onDateChange?.(newDate);
  };

  // Get the formatted date and check if it's today
  const isTodayDate = isToday();

  // Previous button functionality - respects current view mode
  const goToPrevious = () => {
    let newDate: Date;
    if (currentView === 'daily') {
      // Move back one day
      newDate = subDays(currentDate, 1);
    } else {
      // Move back one week
      newDate = subDays(currentDate, 7);
    }
    setCurrentDate(newDate);
    onDateChange?.(newDate);
  };

  // Next button functionality - respects current view mode
  const goToNext = () => {
    let newDate: Date;
    if (currentView === 'daily') {
      // Move forward one day
      newDate = addDays(currentDate, 1);
    } else {
      // Move forward one week
      newDate = addDays(currentDate, 7);
    }
    setCurrentDate(newDate);
    onDateChange?.(newDate);
  };

  // View mode toggle
  const changeView = (view: 'daily' | 'weekly') => {
    setCurrentView(view);
    onViewChange?.(view);
  };

  // Generate time slots
  const timeSlots = [
    '00',
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19',
    '20',
    '21',
    '22',
    '23',
  ];

  // Helper function to calculate position from time
  const calculateEventPosition = (timeString: string) => {
    const [hours, minutes] = timeString.split(':').map(Number);
    return hours * timeSlotHeight + (minutes / 60) * timeSlotHeight;
  };

  // Helper function to calculate height from duration
  const calculateEventHeight = (startTime: string, endTime: string) => {
    const [startHours, startMinutes] = startTime.split(':').map(Number);

    // Handle cases like "01:45" where hour is in 12-hour format
    const [rawEndHours, endMinutes] = endTime.split(':').map(Number);
    // Adjust hours if needed
    const endHours = rawEndHours < startHours ? rawEndHours + 12 : rawEndHours;

    const startTotalMinutes = startHours * 60 + startMinutes;
    const endTotalMinutes = endHours * 60 + endMinutes;
    const durationMinutes = endTotalMinutes - startTotalMinutes;

    // For consistency, cap the max height for events longer than 45 minutes
    // Most events are 45 minutes, so use that as a baseline
    const standardDuration = 45; // minutes
    const calculatedHeight =
      (Math.min(durationMinutes, standardDuration) / 60) *
      timeSlotHeight *
      0.85;

    // Ensure minimum height
    return Math.max(calculatedHeight, 75);
  };

  // Helper function to check if an event is in the past (before current time)
  const isEventInPast = (timeEnd: string) => {
    // Get current date and time
    const now = new Date();
    const currentDay = currentDate.getDate();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    // Extract hours and minutes from the timeEnd
    const [endHours, endMinutes] = timeEnd.split(':').map(Number);

    // Create a date object for the event's end time on the current calendar day
    const eventEndDate = new Date(
      currentYear,
      currentMonth,
      currentDay,
      endHours,
      endMinutes
    );

    // Compare - only consider past if it's before now
    return eventEndDate < now;
  };

  // Helper function to create a lighter version of a color for backgrounds
  const createBackgroundColor = (hexColor: string): string => {
    return `${hexColor}33`; // 33 is hex for 20% opacity
  };

  // Default item renderer if customItemRenderer isn't provided
  const defaultItemRenderer = (item: ScheduleItem, isPast: boolean) => {
    // Create background color with 20% opacity
    const bgColor = createBackgroundColor(item.color);

    return (
      <div
        key={`item-${item.id}`}
        className={`absolute inset-x-1 overflow-visible rounded-3xl border-2 p-3 text-slate-700 shadow-sm ${isPast ? 'grayscale' : ''} cursor-pointer transition-shadow hover:shadow-md`}
        style={{
          top: `${calculateEventPosition(item.timeStart)}px`,
          height: `${calculateEventHeight(item.timeStart, item.timeEnd)}px`,
          borderColor: isPast ? '#aaa' : item.color,
          backgroundColor: isPast ? 'rgba(230, 230, 230, 0.1)' : bgColor,
          minHeight: '80px',
          zIndex: 10,
        }}
        onClick={() => onEventClick && onEventClick(item)}
      >
        {item.content}
        {isPast && (
          <div
            key={`overlay-${item.id}`}
            className="absolute inset-0 z-10 rounded-3xl bg-white/10"
          ></div>
        )}
      </div>
    );
  };

  return (
    <div>
      {/* <div className="flex items-center">
        <button onClick={handleBack} className="flex items-center">
          <ChevronLeft className="size-4 text-secondary-800" />
          <span className="ml-1 font-semibold text-secondary-800">{title}</span>
        </button>
      </div> */}

      <div className="flex items-center justify-between rounded-t-xl bg-white px-6 pb-8 pt-4">
        {/* Left - Today button */}
        <Button
          variant={isTodayDate ? 'primary' : 'secondary'}
          onClick={goToToday}
        >
          Today
        </Button>

        {/* Middle - Date navigation */}
        <div className="flex items-center">
          <button
            onClick={goToPrevious}
            className="flex size-8 items-center justify-center rounded-full border text-gray-500 hover:bg-gray-100"
          >
            <ChevronLeft className="size-5" />
          </button>
          <span className="mx-4 text-sm font-medium text-gray-700">
            {formattedDate}
          </span>
          <button
            onClick={goToNext}
            className="flex size-8 items-center justify-center rounded-full border text-gray-500 hover:bg-gray-100"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>

        {/* Right - View toggle */}
        <div className="flex gap-2 overflow-hidden">
          <Button
            onClick={() => changeView('daily')}
            variant={currentView === 'daily' ? 'primary' : 'secondary'}
          >
            Daily
          </Button>
          <Button
            onClick={() => changeView('weekly')}
            variant={currentView === 'weekly' ? 'primary' : 'secondary'}
          >
            Weekly
          </Button>
        </div>
      </div>

      <div className="overflow-auto">
        <div className="grid w-full grid-cols-[60px_1fr] border-t border-gray-200 bg-white">
          {/* Time column */}
          <div className="h-fit border-r border-gray-200">
            <div className="sticky top-0 z-20 flex h-14 items-center justify-center border-b border-gray-200 bg-white">
              <Clock className="size-4 text-secondary-500" />
            </div>
            {timeSlots.map((time) => (
              <div
                key={`time-${time}`}
                className="flex items-center justify-center border-b border-gray-100 text-xs text-gray-500"
                style={{ height: `${timeSlotHeight}px` }}
              >
                {time}
              </div>
            ))}
          </div>

          <div>
            {/* Column headers - made sticky */}
            {columnHeaders.length > 0 &&
              columnHeaders[0].title !== '' &&
              currentView !== 'daily' && (
                <div
                  className="sticky top-0 z-20 grid border-b border-gray-200 bg-white"
                  style={{
                    gridTemplateColumns: `repeat(${columnHeaders.length}, 1fr)`,
                    height: '56px',
                  }}
                >
                  {columnHeaders.map((header) => (
                    <div
                      key={`header-${header.id}`}
                      className="flex flex-col items-center justify-center border-r border-gray-200 p-2 text-center last:border-r-0"
                    >
                      <div className="text-sm font-medium">{header.title}</div>
                      {header.subtitle && (
                        <div className="text-xs text-gray-500">
                          {header.subtitle}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

            {/* Time slots with events */}
            <div className="relative">
              {/* Current time indicator - shows actual current time */}
              {showTimeIndicator && timeIndicatorPosition && (
                <div
                  className="pointer-events-none absolute inset-x-0 z-30"
                  style={{ top: timeIndicatorPosition }}
                >
                  <div className="relative mx-1">
                    <hr className="absolute inset-x-0 top-1/2 m-0 h-[5px] -translate-y-1/2 border-0 bg-primary-500 shadow-sm" />
                    <div className="absolute -left-1 top-1/2 size-[22px] -translate-y-1/2 rounded-full bg-primary-500 shadow-md"></div>
                    <div className="absolute -right-1 top-1/2 size-[22px] -translate-y-1/2 rounded-full bg-primary-500 shadow-md"></div>
                  </div>
                </div>
              )}

              {/* Time grid background */}
              <div className="absolute inset-0">
                {timeSlots.map((time, index) => (
                  <div
                    key={`timeslot-bg-${time}`}
                    className="relative border-b border-gray-100"
                    style={{
                      top: `${index * timeSlotHeight}px`,
                      height: `${timeSlotHeight}px`,
                    }}
                  ></div>
                ))}
              </div>

              {/* Column grid */}
              <div
                className="grid h-full"
                style={{
                  gridTemplateColumns: `repeat(${columnHeaders.length}, 1fr)`,
                }}
              >
                {columnHeaders.map((column) => (
                  <div
                    key={`column-${column.id}`}
                    className="relative border-r border-gray-100 last:border-r-0"
                    style={{
                      height: `${24 * timeSlotHeight}px`,
                      // Add padding-top when in daily view to compensate for missing header
                      paddingTop: currentView === 'daily' ? '0px' : '',
                    }}
                  >
                    {/* Items for this column */}
                    {items
                      .filter((item) => item.columnId === column.id)
                      .map((item) => {
                        const isPastEvent = isEventInPast(item.timeEnd);

                        return (
                          <React.Fragment key={`item-${item.id}`}>
                            {customItemRenderer
                              ? customItemRenderer(item, isPastEvent)
                              : defaultItemRenderer(item, isPastEvent)}
                          </React.Fragment>
                        );
                      })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
