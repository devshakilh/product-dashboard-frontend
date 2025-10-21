'use client';

import { FC, useEffect, useState } from 'react';
import { useGetAllTeachers } from '@/features/dashboard/teachers/hooks/useGetAllTeachers';

import Autocomplete from '../autocomplete.component';
import DateTimePicker from '../date-time-picker/date-time-picker.component';
import Select from '../select.component';

// Mock data for Storybook
const MOCK_TEACHERS = [
  { id: '1', firstName: 'John', lastName: 'Smith', email: 'john@example.com' },
  {
    id: '2',
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah@example.com',
  },
  {
    id: '3',
    firstName: 'Michael',
    lastName: 'Williams',
    email: 'michael@example.com',
  },
  {
    id: '4',
    firstName: 'Emily',
    lastName: 'Brown',
    email: 'emily@example.com',
  },
  {
    id: '5',
    firstName: 'David',
    lastName: 'Jones',
    email: 'david@example.com',
  },
];

export interface ScheduleRowProps {
  id: string;
  day: string;
  subject: string;
  teacher: string;
  startTime: Date | null;
  endTime: Date | null;
  days: { value: string; label: string }[];
  subjects: { value: string; label: string }[];
  onChangeDay: (id: string, value: string) => void;
  onChangeSubject: (id: string, value: string) => void;
  onChangeTeacher: (id: string, value: string) => void;
  onChangeStartTime: (id: string, value: Date | null) => void;
  onChangeEndTime: (id: string, value: Date | null) => void;
  disabled?: boolean;
  error?: Record<string, string>;
  // For testing/storybook
  isStorybook?: boolean;
}

const ScheduleRow: FC<ScheduleRowProps> = ({
  id,
  day,
  subject,
  teacher,
  startTime,
  endTime,
  days,
  subjects,
  onChangeDay,
  onChangeSubject,
  onChangeTeacher,
  onChangeStartTime,
  onChangeEndTime,
  disabled = false,
  error = {},
  isStorybook = false, // Flag for Storybook environment
}) => {
  const [teacherSearch, setTeacherSearch] = useState('');
  const [filteredTeachers, setFilteredTeachers] = useState(MOCK_TEACHERS);
  const [isSearchLoading, setIsSearchLoading] = useState(false);

  // Always call the hook to prevent the React Hooks rule violation
  const apiResult = useGetAllTeachers(1, 10, teacherSearch);

  // Use apiResult only if not in Storybook mode
  const apiTeachers = !isStorybook ? apiResult.teachers : [];
  const apiIsLoading = !isStorybook ? apiResult.isLoading : false;

  // For Storybook, simulate API loading and filtering
  useEffect(() => {
    if (isStorybook) {
      setIsSearchLoading(true);
      const timer = setTimeout(() => {
        if (teacherSearch) {
          const filtered = MOCK_TEACHERS.filter(
            (teacher) =>
              teacher.firstName
                .toLowerCase()
                .includes(teacherSearch.toLowerCase()) ||
              teacher.lastName
                .toLowerCase()
                .includes(teacherSearch.toLowerCase())
          );
          setFilteredTeachers(filtered);
        } else {
          setFilteredTeachers(MOCK_TEACHERS);
        }
        setIsSearchLoading(false);
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [teacherSearch, isStorybook]);

  // Use either real data from API or mock data for Storybook
  const teachers = isStorybook ? filteredTeachers : apiTeachers;
  const isLoadingTeachers = isStorybook ? isSearchLoading : apiIsLoading;

  // Map teachers to options format for Autocomplete
  const teacherOptions = teachers.map((teacher) => ({
    value: teacher.id, // Use email or id as value
    label: `${teacher.firstName} ${teacher.lastName}`, // Full name as label
  }));

  return (
    <div className="grid w-full grid-cols-12 items-start gap-4">
      {/* Day Select */}
      <div className="col-span-2">
        <Select
          label="Day"
          options={days}
          value={day}
          onValueChange={(value) => onChangeDay(id, value)}
          placeholder="Select day"
          disabled={disabled}
          error={error.day}
        />
      </div>

      {/* Subject Select */}
      <div className="col-span-3">
        <Select
          label="Subject"
          options={subjects}
          value={subject}
          onValueChange={(value) => onChangeSubject(id, value)}
          placeholder="Select subject"
          disabled={disabled}
          error={error.subject}
        />
      </div>

      {/* Teacher Input - now using Autocomplete */}
      <div className="col-span-3">
        <Autocomplete
          label="Teacher"
          placeholder="Search teacher"
          options={teacherOptions}
          value={teacher}
          onChange={(value) => onChangeTeacher(id, value)}
          onSearch={setTeacherSearch}
          isLoading={isLoadingTeachers}
          disabled={disabled}
          error={error.teacher}
          noOptionsMessage="No teachers found"
        />
      </div>

      {/* Time Pickers */}
      <div className="col-span-4 -mt-1 flex items-center gap-2">
        <div className="flex-1">
          <DateTimePicker
            label="From"
            variant="time"
            selected={startTime}
            onChange={(date) => onChangeStartTime(id, date)}
            placeholder="Start time"
            disabled={disabled}
            error={error.startTime}
          />
        </div>
        <div className="mt-6">to</div>
        <div className="flex-1">
          <DateTimePicker
            label="To"
            variant="time"
            selected={endTime}
            onChange={(date) => onChangeEndTime(id, date)}
            placeholder="End time"
            disabled={disabled}
            error={error.endTime}
          />
        </div>
      </div>
    </div>
  );
};

export default ScheduleRow;
