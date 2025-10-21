import type { Meta, StoryObj } from '@storybook/react';

import { Checkbox } from './checkbox.component';

// Meta Configuration
const meta: Meta<typeof Checkbox> = {
  title: 'UI/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Checkbox>;

// Checkbox Stories
export const CheckboxDefault: Story = {
  args: {},
};

export const CheckboxFocused: Story = {
  args: {
    autoFocus: true,
  },
};

export const CheckboxDisabled: Story = {
  args: {
    disabled: true,
  },
};

export const CheckboxError: Story = {
  args: {
    error: true,
  },
};

export const CheckboxChecked: Story = {
  args: {
    checked: true,
  },
};

export const CheckboxCheckedDisabled: Story = {
  args: {
    checked: true,
    disabled: true,
  },
};

// All Components Together
export const AllComponents: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-semibold">Checkbox</h2>
      <div className="flex flex-wrap gap-4">
        <Checkbox />
        <Checkbox autoFocus />
        <Checkbox disabled />
        <Checkbox error />
        <Checkbox checked />
        <Checkbox checked disabled />
      </div>
    </div>
  ),
};
