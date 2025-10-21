import Toggle from '@/features/ui/atoms/toggle.component';
import type { Meta, StoryObj } from '@storybook/react';

// Meta Configuration
const meta: Meta<typeof Toggle> = {
  title: 'UI/Toggle',
  component: Toggle,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Toggle>;

// Toggle Stories
export const ToggleDefault: Story = {
  args: {},
};

export const ToggleFocused: Story = {
  args: {
    autoFocus: true,
  },
};

export const ToggleDisabled: Story = {
  args: {
    disabled: true,
  },
};

export const ToggleError: Story = {
  args: {
    error: true,
  },
};

export const ToggleChecked: Story = {
  args: {
    checked: true,
  },
};

export const ToggleCheckedDisabled: Story = {
  args: {
    checked: true,
    disabled: true,
  },
};
// All Components Together
export const AllComponents: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <h2 className="mt-6 text-lg font-semibold">Toggle</h2>
      <div className="flex flex-wrap gap-4">
        <Toggle />
        <Toggle autoFocus />
        <Toggle disabled />
        <Toggle error />
        <Toggle checked />
        <Toggle checked disabled />
      </div>
    </div>
  ),
};
