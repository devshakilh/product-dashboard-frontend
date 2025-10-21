import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import Select from './select.component';

const meta: Meta<typeof Select> = {
  title: 'UI/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Select>;

const defaultOptions = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
];

export const Default: Story = {
  args: {
    options: defaultOptions,
    placeholder: 'Select an option',
  },
};

export const WithPlaceholder: Story = {
  args: {
    options: defaultOptions,
    placeholder: 'Choose an option...',
  },
};

export const Disabled: Story = {
  args: {
    options: defaultOptions,
    placeholder: 'Disabled select',
    disabled: true,
  },
};

export const ErrorState: Story = {
  args: {
    options: defaultOptions,
    placeholder: 'Error select',
    error: 'Please select a valid option.',
  },
};

export const SuccessValidation: Story = {
  args: {
    options: defaultOptions,
    placeholder: 'Success validation',
    validationState: 'success',
    validationMessage: 'Valid selection!',
  },
};

export const ErrorValidation: Story = {
  args: {
    options: defaultOptions,
    placeholder: 'Error validation',
    validationState: 'error',
    validationMessage: 'Invalid selection.',
  },
};

export const LoadingValidation: Story = {
  args: {
    options: defaultOptions,
    placeholder: 'Loading validation',
    validationState: 'loading',
    validationMessage: 'Loading...',
  },
};

export const WarningValidation: Story = {
  args: {
    options: defaultOptions,
    placeholder: 'Warning validation',
    validationState: 'warning',
    validationMessage: 'Please review your selection.',
  },
};

export const WithLabel: Story = {
  args: {
    options: defaultOptions,
    placeholder: 'Select an option',
    label: 'Select Label',
  },
};

export const WithDefaultValue: Story = {
  args: {
    options: defaultOptions,
    placeholder: 'Select an option',
    defaultValue: 'option2',
  },
};

export const Controlled: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [value, setValue] = useState('option1');
    return (
      <div className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold">Controlled Select</h2>
        <div className="flex items-center gap-4">
          <Select
            options={defaultOptions}
            value={value}
            onValueChange={setValue}
            placeholder="Select an option"
          />
          <div>
            Selected value: <strong>{value}</strong>
          </div>
        </div>
        <div className="flex gap-2">
          {defaultOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setValue(option.value)}
              className={`rounded-md px-3 py-1 ${value === option.value ? 'bg-primary-500 text-white' : 'bg-gray-200'}`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    );
  },
};

export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-semibold">Select States</h2>
      <Select options={defaultOptions} placeholder="Default" />
      <Select
        options={defaultOptions}
        placeholder="With Label"
        label="Select Label"
      />
      <Select options={defaultOptions} placeholder="Disabled" disabled />
      <Select
        options={defaultOptions}
        placeholder="Error"
        error="Please select a valid option."
      />
      <Select
        options={defaultOptions}
        placeholder="Success Validation"
        validationState="success"
        validationMessage="Valid selection!"
      />
      <Select
        options={defaultOptions}
        placeholder="Error Validation"
        validationState="error"
        validationMessage="Invalid selection."
      />
      <Select
        options={defaultOptions}
        placeholder="Loading Validation"
        validationState="loading"
        validationMessage="Loading..."
      />
      <Select
        options={defaultOptions}
        placeholder="Warning Validation"
        validationState="warning"
        validationMessage="Please review your selection."
      />
      <Select
        options={defaultOptions}
        placeholder="With Default Value"
        defaultValue="option2"
      />
    </div>
  ),
};
