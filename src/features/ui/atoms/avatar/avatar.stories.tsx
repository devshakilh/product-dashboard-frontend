import type { Meta, StoryObj } from '@storybook/react';

import { Avatar, AvatarGroup } from './avatar.component';

const meta = {
  title: 'UI/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof Avatar>;

const SAMPLE_IMAGE = 'https://api.dicebear.com/7.x/avataaars/svg?seed=nah';
const SAMPLE_IMAGE_2 = 'https://api.dicebear.com/7.x/avataaars/svg?seed=doe';
const SAMPLE_IMAGE_3 = 'https://api.dicebear.com/7.x/avataaars/svg?seed=jhon';
const SAMPLE_IMAGE_4 = 'https://api.dicebear.com/7.x/avataaars/svg?seed=pizza';

export const Initial: Story = {
  args: {
    variant: 'initial',
    initials: 'A',
    size: 'md',
  },
};

export const WithImage: Story = {
  args: {
    src: SAMPLE_IMAGE,
    alt: 'John Doe',
    size: 'md',
  },
};

// Show all sizes
export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar size="xs" src={SAMPLE_IMAGE} alt="Extra Small" />
      <Avatar size="sm" src={SAMPLE_IMAGE} alt="Small" />
      <Avatar size="md" src={SAMPLE_IMAGE} alt="Medium" />
      <Avatar size="lg" src={SAMPLE_IMAGE} alt="Large" />
      <Avatar size="xl" src={SAMPLE_IMAGE} alt="Extra Large" />
      <Avatar size="2xl" src={SAMPLE_IMAGE} alt="2X Large" />
    </div>
  ),
};

// Show all initial sizes
export const InitialSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar size="xs" variant="initial" initials="A" />
      <Avatar size="sm" variant="initial" initials="A" />
      <Avatar size="md" variant="initial" initials="A" />
      <Avatar size="lg" variant="initial" initials="A" />
      <Avatar size="xl" variant="initial" initials="A" />
      <Avatar size="2xl" variant="initial" initials="A" />
    </div>
  ),
};

// Avatar Group
export const Group: Story = {
  render: () => (
    <AvatarGroup>
      <Avatar src={SAMPLE_IMAGE} alt="User 1" />
      <Avatar src={SAMPLE_IMAGE_2} alt="User 2" />
      <Avatar src={SAMPLE_IMAGE_3} alt="User 3" />
      <Avatar src={SAMPLE_IMAGE_4} alt="User 4" />
      <Avatar src={SAMPLE_IMAGE} alt="User 5" />
      <Avatar src={SAMPLE_IMAGE_2} alt="User 6" />
    </AvatarGroup>
  ),
};

// Avatar Group with different sizes
export const GroupSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <AvatarGroup size="sm">
        <Avatar src={SAMPLE_IMAGE} alt="User 1" />
        <Avatar src={SAMPLE_IMAGE_2} alt="User 2" />
        <Avatar src={SAMPLE_IMAGE_3} alt="User 3" />
      </AvatarGroup>
      <AvatarGroup size="md">
        <Avatar src={SAMPLE_IMAGE} alt="User 1" />
        <Avatar src={SAMPLE_IMAGE_2} alt="User 2" />
        <Avatar src={SAMPLE_IMAGE_3} alt="User 3" />
      </AvatarGroup>
      <AvatarGroup size="lg">
        <Avatar src={SAMPLE_IMAGE} alt="User 1" />
        <Avatar src={SAMPLE_IMAGE_2} alt="User 2" />
        <Avatar src={SAMPLE_IMAGE_3} alt="User 3" />
      </AvatarGroup>
    </div>
  ),
};
