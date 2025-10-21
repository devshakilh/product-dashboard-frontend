import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import ScheduleRowGroup, { ScheduleItem } from './schedule-row-group.component';
import ScheduleRow from './schedule-row.component';

// More stable Storybook configuration
const meta = {
  title: 'UI/ScheduleRow',
  component: ScheduleRow,

  tags: ['autodocs'],
  argTypes: {
    disabled: { control: 'boolean' },
    isStorybook: { control: 'boolean', defaultValue: true },
  },
} satisfies Meta<typeof ScheduleRow>;

export default meta;
type Story = StoryObj<typeof meta>;

// Mock data
const days = [
  { value: 'monday', label: 'Monday' },
  { value: 'tuesday', label: 'Tuesday' },
  { value: 'wednesday', label: 'Wednesday' },
  { value: 'thursday', label: 'Thursday' },
  { value: 'friday', label: 'Friday' },
];

const subjects = [
  { value: 'mathematics', label: 'Mathematics' },
  { value: 'science', label: 'Science' },
  { value: 'english', label: 'English' },
  { value: 'history', label: 'History' },
  { value: 'geography', label: 'Geography' },
  { value: 'physics', label: 'Physics' },
  { value: 'chemistry', label: 'Chemistry' },
  { value: 'biology', label: 'Biology' },
];

// Individual stories
export const Default: Story = {
  args: {
    id: '1',
    day: 'monday',
    subject: 'mathematics',
    teacher: 'john@example.com',
    startTime: null,
    endTime: null,
    days: days,
    subjects: subjects,
    onChangeDay: () => {},
    onChangeSubject: () => {},
    onChangeTeacher: () => {},
    onChangeStartTime: () => {},
    onChangeEndTime: () => {},
    isStorybook: true,
  },
};

export const WithError: Story = {
  args: {
    id: '1',
    day: '',
    subject: '',
    teacher: '',
    startTime: null,
    endTime: null,
    days: days,
    subjects: subjects,
    onChangeDay: () => {},
    onChangeSubject: () => {},
    onChangeTeacher: () => {},
    onChangeStartTime: () => {},
    onChangeEndTime: () => {},
    error: {
      day: 'Please select a day',
      subject: 'Please select a subject',
      teacher: 'Teacher is required',
      startTime: 'Start time is required',
      endTime: 'End time is required',
    },
    isStorybook: true,
  },
};

export const Disabled: Story = {
  args: {
    id: '1',
    day: 'monday',
    subject: 'mathematics',
    teacher: 'john@example.com',
    startTime: null,
    endTime: null,
    days: days,
    subjects: subjects,
    onChangeDay: () => {},
    onChangeSubject: () => {},
    onChangeTeacher: () => {},
    onChangeStartTime: () => {},
    onChangeEndTime: () => {},
    disabled: true,
    isStorybook: true,
  },
};

// For the Group story, we need to use a different approach
const GroupStory = () => {
  const [schedules, setSchedules] = useState<ScheduleItem[]>([
    {
      id: '1',
      day: 'monday',
      subject: 'mathematics',
      teacher: 'john@example.com',
      startTime: new Date(new Date().setHours(9, 0, 0)),
      endTime: new Date(new Date().setHours(10, 0, 0)),
    },
  ]);

  const handleAdd = () => {
    const newSchedule: ScheduleItem = {
      id: Date.now().toString(),
      day: '',
      subject: '',
      teacher: '',
      startTime: null,
      endTime: null,
    };
    setSchedules([...schedules, newSchedule]);
  };

  const handleRemove = (id: string) => {
    setSchedules(schedules.filter((schedule) => schedule.id !== id));
  };

  const handleChangeDay = (id: string, value: string) => {
    setSchedules(
      schedules.map((schedule) =>
        schedule.id === id ? { ...schedule, day: value } : schedule
      )
    );
  };

  const handleChangeSubject = (id: string, value: string) => {
    setSchedules(
      schedules.map((schedule) =>
        schedule.id === id ? { ...schedule, subject: value } : schedule
      )
    );
  };

  const handleChangeTeacher = (id: string, value: string) => {
    setSchedules(
      schedules.map((schedule) =>
        schedule.id === id ? { ...schedule, teacher: value } : schedule
      )
    );
  };

  const handleChangeStartTime = (id: string, value: Date | null) => {
    setSchedules(
      schedules.map((schedule) =>
        schedule.id === id ? { ...schedule, startTime: value } : schedule
      )
    );
  };

  const handleChangeEndTime = (id: string, value: Date | null) => {
    setSchedules(
      schedules.map((schedule) =>
        schedule.id === id ? { ...schedule, endTime: value } : schedule
      )
    );
  };

  return (
    <div className="w-[1000px]">
      <h2 className="mb-6 text-xl font-semibold">Class Schedule</h2>
      <ScheduleRowGroup
        schedules={schedules}
        days={days}
        subjects={subjects}
        onAdd={handleAdd}
        onRemove={handleRemove}
        onChangeDay={handleChangeDay}
        onChangeSubject={handleChangeSubject}
        onChangeTeacher={handleChangeTeacher}
        onChangeStartTime={handleChangeStartTime}
        onChangeEndTime={handleChangeEndTime}
        addButtonLabel="Add New Schedule"
        isStorybook={true}
      />
    </div>
  );
};

// Define the Group story separately
export const Group = {
  render: () => <GroupStory />,
  parameters: {
    // These parameters help Storybook understand this is a different component
    docs: {
      description: {
        story: 'Group of schedule rows with add/remove functionality',
      },
    },
  },
};
