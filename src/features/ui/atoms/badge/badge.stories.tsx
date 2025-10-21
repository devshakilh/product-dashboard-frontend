import type { Meta, StoryObj } from '@storybook/react';

import { Badge } from './badge';

const meta: Meta<typeof Badge> = {
  title: 'UI/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Active: Story = {
  args: {
    variant: 'active',
    children: 'Active',
  },
};

export const Pending: Story = {
  args: {
    variant: 'pending',
    children: 'Pending',
  },
};

export const Blocked: Story = {
  args: {
    variant: 'blocked',
    children: 'Blocked',
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    children: 'Small',
  },
};

export const Medium: Story = {
  args: {
    size: 'md',
    children: 'Medium',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    children: 'Large',
  },
};

// Show all variants in a grid
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <Badge variant="active">Active</Badge>
        <Badge variant="pending">Pending</Badge>
        <Badge variant="blocked">Blocked</Badge>
      </div>
      <div className="flex gap-2">
        <Badge size="sm">Small</Badge>
        <Badge size="md">Medium</Badge>
        <Badge size="lg">Large</Badge>
      </div>
    </div>
  ),
};
