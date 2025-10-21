import type { Meta, StoryObj } from '@storybook/react';

import Skeleton from './skeleton.component';

const meta = {
  title: 'UI/Skeleton',
  component: Skeleton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    loading: true,
  },
};

export const Variants: Story = {
  render: () => (
    <div className="space-y-4">
      <Skeleton variant="default" className="h-4" />
      <Skeleton variant="avatar" className="size-12" />
      <Skeleton variant="button" />
      <Skeleton variant="card" />
      <Skeleton variant="table" />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4">
      <Skeleton size="sm" />
      <Skeleton size="md" />
      <Skeleton size="lg" />
      <Skeleton size="xl" />
      <Skeleton size="default" />
    </div>
  ),
};

export const LoadingState: Story = {
  render: () => (
    <div className="space-y-4">
      <Skeleton loading={true} />
      <Skeleton loading={false}>
        <div>Content loaded!</div>
      </Skeleton>
    </div>
  ),
};

export const CustomStyling: Story = {
  render: () => (
    <div className="space-y-4">
      p
      <Skeleton className="h-4 bg-primary-200" />
      <Skeleton className="h-8 rounded-full bg-secondary-200" />
      <Skeleton className="h-16 rounded-xl bg-gray-300" />
    </div>
  ),
};
