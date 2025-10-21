import type { Meta, StoryObj } from '@storybook/react';

import TextArea from './text-area.component';

const meta = {
  title: 'UI/TextArea',
  component: TextArea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof TextArea>;

export default meta;
type Story = StoryObj<typeof TextArea>;

export const Default: Story = {
  args: {
    placeholder: 'Enter text',
    length: 100,
  },
};

export const Disabled: Story = {
  args: {
    placeholder: 'Disabled textarea',
    length: 100,
    disabled: true,
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-row gap-4">
      <TextArea placeholder="Enter text" length={100} />
      <TextArea placeholder="Disabled textarea" length={100} disabled />
    </div>
  ),
};
