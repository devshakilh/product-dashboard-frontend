'use client';

import { FC } from 'react';
import { Plus, Trash2 } from 'lucide-react';

import { cn } from '@/lib/utils';

import Button from '../button.component';
import ScheduleRow from './schedule-row.component';

export interface ScheduleItem {
  id: string;
  day: string;
  subject: string;
  teacher: string; // This will store the teacher ID or email as selected from Autocomplete
  startTime: Date | null;
  endTime: Date | null;
}

interface ScheduleRowGroupProps {
  schedules: ScheduleItem[];
  days: { value: string; label: string }[];
  subjects: { value: string; label: string }[];
  onAdd: () => void;
  onRemove: (id: string) => void;
  onChangeDay: (id: string, value: string) => void;
  onChangeSubject: (id: string, value: string) => void;
  onChangeTeacher: (id: string, value: string) => void;
  onChangeStartTime: (id: string, value: Date | null) => void;
  onChangeEndTime: (id: string, value: Date | null) => void;
  className?: string;
  disabled?: boolean;
  errors?: Record<string, Record<string, string>>;
  addButtonLabel?: string;
  isStorybook?: boolean;
}

const ScheduleRowGroup: FC<ScheduleRowGroupProps> = ({
  schedules,
  days,
  subjects,
  onAdd,
  onRemove,
  onChangeDay,
  onChangeSubject,
  onChangeTeacher,
  onChangeStartTime,
  onChangeEndTime,
  className,
  disabled = false,
  errors = {},
  addButtonLabel = 'Add New Schedule',
  isStorybook = false,
}) => {
  return (
    <div className={cn('flex flex-col gap-6', className)}>
      {schedules.map((schedule) => (
        <div key={schedule.id} className="relative flex w-full items-start">
          <div className="grow">
            <ScheduleRow
              id={schedule.id}
              day={schedule.day}
              subject={schedule.subject}
              teacher={schedule.teacher}
              startTime={schedule.startTime}
              endTime={schedule.endTime}
              days={days}
              subjects={subjects}
              onChangeDay={onChangeDay}
              onChangeSubject={onChangeSubject}
              onChangeTeacher={onChangeTeacher}
              onChangeStartTime={onChangeStartTime}
              onChangeEndTime={onChangeEndTime}
              disabled={disabled}
              error={errors[schedule.id]}
              isStorybook={isStorybook}
            />
          </div>

          {schedules.length > 1 && (
            <Button
              variant="secondary"
              className="ml-3 mt-7 shrink-0 bg-error-50 !p-2 text-error-500 hover:border-none hover:bg-error-200 hover:text-error-600"
              onClick={() => onRemove(schedule.id)}
              disabled={disabled}
            >
              <Trash2 className="size-4" />
            </Button>
          )}
        </div>
      ))}

      <div className="mt-4 flex justify-end">
        <Button variant="primary" onClick={onAdd} disabled={disabled}>
          <Plus className="mr-2 size-4" /> {addButtonLabel}
        </Button>
      </div>
    </div>
  );
};

export default ScheduleRowGroup;
