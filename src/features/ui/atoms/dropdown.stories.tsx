import type { Meta, StoryObj } from '@storybook/react';

import Dropdown from './dropdown.component';

// Meta Configuration
const meta: Meta<typeof Dropdown> = {
  title: 'UI/Dropdown',
  component: Dropdown,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Dropdown>;

// Default Story
export const Default: Story = {
  args: {
    options: [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
      { value: 'option3', label: 'Option 3' },
    ],
    placeholder: 'Select an option',
  },
};

// With Placeholder
export const WithPlaceholder: Story = {
  args: {
    options: [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
      { value: 'option3', label: 'Option 3' },
    ],
    placeholder: 'Choose an option...',
  },
};

// Disabled State
export const Disabled: Story = {
  args: {
    options: [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
      { value: 'option3', label: 'Option 3' },
    ],
    placeholder: 'Disabled dropdown',
    disabled: true,
  },
};

// Error State
export const ErrorState: Story = {
  args: {
    options: [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
      { value: 'option3', label: 'Option 3' },
    ],
    placeholder: 'Error dropdown',
    error: 'Please select a valid option.',
  },
};

// Validation States
export const SuccessValidation: Story = {
  args: {
    options: [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
      { value: 'option3', label: 'Option 3' },
    ],
    placeholder: 'Success validation',
    validationState: 'success',
    validationMessage: 'Valid selection!',
  },
};

export const ErrorValidation: Story = {
  args: {
    options: [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
      { value: 'option3', label: 'Option 3' },
    ],
    placeholder: 'Error validation',
    validationState: 'error',
    validationMessage: 'Invalid selection.',
  },
};

export const LoadingValidation: Story = {
  args: {
    options: [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
      { value: 'option3', label: 'Option 3' },
    ],
    placeholder: 'Loading validation',
    validationState: 'loading',
    validationMessage: 'Loading...',
  },
};

export const WarningValidation: Story = {
  args: {
    options: [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
      { value: 'option3', label: 'Option 3' },
    ],
    placeholder: 'Warning validation',
    validationState: 'warning',
    validationMessage: 'Please review your selection.',
  },
};

// All States Together
export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-semibold">Dropdown States</h2>
      <Dropdown
        options={[
          { value: 'option1', label: 'Option 1' },
          { value: 'option2', label: 'Option 2' },
          { value: 'option3', label: 'Option 3' },
        ]}
        placeholder="Default"
      />
      <Dropdown
        options={[
          { value: 'option1', label: 'Option 1' },
          { value: 'option2', label: 'Option 2' },
          { value: 'option3', label: 'Option 3' },
        ]}
        placeholder="Disabled"
        disabled
      />
      <Dropdown
        options={[
          { value: 'option1', label: 'Option 1' },
          { value: 'option2', label: 'Option 2' },
          { value: 'option3', label: 'Option 3' },
        ]}
        placeholder="Error"
        error="Please select a valid option."
      />
      <Dropdown
        options={[
          { value: 'option1', label: 'Option 1' },
          { value: 'option2', label: 'Option 2' },
          { value: 'option3', label: 'Option 3' },
        ]}
        placeholder="Success Validation"
        validationState="success"
        validationMessage="Valid selection!"
      />
      <Dropdown
        options={[
          { value: 'option1', label: 'Option 1' },
          { value: 'option2', label: 'Option 2' },
          { value: 'option3', label: 'Option 3' },
        ]}
        placeholder="Error Validation"
        validationState="error"
        validationMessage="Invalid selection."
      />
      <Dropdown
        options={[
          { value: 'option1', label: 'Option 1' },
          { value: 'option2', label: 'Option 2' },
          { value: 'option3', label: 'Option 3' },
        ]}
        placeholder="Loading Validation"
        validationState="loading"
        validationMessage="Loading..."
      />
      <Dropdown
        options={[
          { value: 'option1', label: 'Option 1' },
          { value: 'option2', label: 'Option 2' },
          { value: 'option3', label: 'Option 3' },
        ]}
        placeholder="Warning Validation"
        validationState="warning"
        validationMessage="Please review your selection."
      />
    </div>
  ),
};
