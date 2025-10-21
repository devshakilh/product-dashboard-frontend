import RadioButton from '@/features/ui/atoms/radio-button.component';
import type { Meta, StoryObj } from '@storybook/react';

// Meta Configuration
const meta: Meta<typeof RadioButton> = {
  title: 'UI/RadioButton',
  component: RadioButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof RadioButton>;

// RadioButton Stories
export const Default: Story = {
  args: {},
};

export const Focused: Story = {
  args: {
    autoFocus: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const Error: Story = {
  args: {
    error: true,
  },
};

export const Checked: Story = {
  args: {
    checked: true,
  },
};

export const CheckedDisabled: Story = {
  args: {
    checked: true,
    disabled: true,
  },
};

// All Components Together
export const AllComponents: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-semibold">Radio Button States</h2>
      <div className="flex flex-wrap gap-4">
        <RadioButton name="radio" value="default" />
        <RadioButton name="radio" value="focused" autoFocus />
        <RadioButton name="radio" value="disabled" disabled />
        <RadioButton name="radio" value="error" error />
        <RadioButton name="radio" value="checked" checked />
        <RadioButton name="radio" value="checked-disabled" checked disabled />
      </div>
    </div>
  ),
};
