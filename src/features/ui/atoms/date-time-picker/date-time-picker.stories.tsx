import type { Meta, StoryObj } from '@storybook/react';

import DateTimePicker from './date-time-picker.component';

const meta = {
  title: 'UI/DateTimePicker',
  component: DateTimePicker,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['date', 'datetime', 'year', 'time'],
    },
    validationState: {
      control: 'select',
      options: ['success', 'error', 'warning', 'loading', undefined],
    },
  },
} satisfies Meta<typeof DateTimePicker>;

export default meta;
type Story = StoryObj<typeof DateTimePicker>;

export const Default: Story = {
  args: {
    placeholder: 'mm/dd/yyyy',
  },
};

export const DateTime: Story = {
  args: {
    variant: 'datetime',
    placeholder: 'mm/dd/yyyy HH:mm',
  },
};

export const Year: Story = {
  args: {
    variant: 'year',
    placeholder: 'yyyy/mm',
  },
};

export const Time: Story = {
  args: {
    variant: 'time',
    placeholder: 'HH:mm',
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Select Date',
    placeholder: 'mm/dd/yyyy',
  },
};

export const Disabled: Story = {
  args: {
    placeholder: 'mm/dd/yyyy',
    disabled: true,
  },
};

export const Success: Story = {
  args: {
    placeholder: 'mm/dd/yyyy',
    validationState: 'success',
    validationMessage: 'Date is valid',
  },
};

export const Error: Story = {
  args: {
    placeholder: 'mm/dd/yyyy',
    validationState: 'error',
    validationMessage: 'Invalid date',
  },
};

export const Loading: Story = {
  args: {
    placeholder: 'mm/dd/yyyy',
    validationState: 'loading',
    validationMessage: 'Checking date...',
  },
};

export const Warning: Story = {
  args: {
    placeholder: 'mm/dd/yyyy',
    validationState: 'warning',
    validationMessage: 'Date is in the past',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <DateTimePicker placeholder="mm/dd/yyyy" />
      <DateTimePicker variant="datetime" placeholder="mm/dd/yyyy HH:mm" />
      <DateTimePicker variant="year" placeholder="yyyy/mm" />
      <DateTimePicker variant="time" placeholder="HH:mm" />
      <DateTimePicker disabled placeholder="mm/dd/yyyy" />
      <DateTimePicker
        validationState="success"
        validationMessage="Date is valid"
        placeholder="mm/dd/yyyy"
      />
      <DateTimePicker
        validationState="error"
        validationMessage="Invalid date"
        placeholder="mm/dd/yyyy"
      />
      <DateTimePicker
        validationState="loading"
        validationMessage="Checking date..."
        placeholder="mm/dd/yyyy"
      />
      <DateTimePicker
        validationState="warning"
        validationMessage="Date is in the past"
        placeholder="mm/dd/yyyy"
      />
    </div>
  ),
};

export const TimePickerExample: Story = {
  args: {
    variant: 'time',
    placeholder: 'Select time',
    label: 'Time Input',
  },
};

export const TimePickerWithValidation: Story = {
  args: {
    variant: 'time',
    placeholder: 'Select time',
    label: 'Time Input',
    validationState: 'success',
    validationMessage: 'Valid time selected',
  },
};
