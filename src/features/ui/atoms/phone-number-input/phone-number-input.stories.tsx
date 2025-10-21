import type { Meta, StoryObj } from '@storybook/react';

import PhoneNumberInput from './phone-number-input.component';

const meta = {
  title: 'UI/PhoneNumberInput',
  component: PhoneNumberInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof PhoneNumberInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: '',
    onChange: () => {},
    placeholder: 'Enter phone number',
  },
};

export const WithLabel: Story = {
  args: {
    ...Default.args,
    label: 'Phone Number',
  },
};

export const Success: Story = {
  args: {
    ...Default.args,
    label: 'Phone Number',
    validationState: 'success',
    validationMessage: 'Valid phone number',
    value: '447700900000',
  },
};

export const Error: Story = {
  args: {
    ...Default.args,
    label: 'Phone Number',
    error: 'Invalid phone number',
    value: '44',
  },
};

export const Warning: Story = {
  args: {
    ...Default.args,
    label: 'Phone Number',
    validationState: 'warning',
    validationMessage: 'This number may be invalid',
    value: '441234',
  },
};

export const Loading: Story = {
  args: {
    ...Default.args,
    label: 'Phone Number',
    validationState: 'loading',
    validationMessage: 'Validating phone number...',
    value: '447700900000',
  },
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    label: 'Phone Number',
    disabled: true,
    value: '447700900000',
  },
};

export const DifferentCountry: Story = {
  args: {
    ...Default.args,
    label: 'Phone Number',
    value: '12025550123',
  },
};

export const AllVariants: Story = {
  args: {
    value: '',
    onChange: () => {},
  },
  render: () => (
    <div className="flex w-[300px] flex-col space-y-4">
      <PhoneNumberInput
        value=""
        onChange={() => {}}
        placeholder="Enter phone number"
      />

      <PhoneNumberInput
        value=""
        onChange={() => {}}
        placeholder="Enter phone number"
        label="Phone Number"
      />

      <PhoneNumberInput
        value="447700900000"
        onChange={() => {}}
        placeholder="Enter phone number"
        label="Phone Number"
        validationState="success"
        validationMessage="Valid phone number"
      />

      <PhoneNumberInput
        value="44"
        onChange={() => {}}
        placeholder="Enter phone number"
        label="Phone Number"
        error="Invalid phone number"
      />

      <PhoneNumberInput
        value="447700900000"
        onChange={() => {}}
        placeholder="Enter phone number"
        label="Phone Number"
        disabled
      />

      <PhoneNumberInput
        value="12025550123"
        onChange={() => {}}
        placeholder="Enter phone number"
        label="Phone Number"
      />
    </div>
  ),
};
