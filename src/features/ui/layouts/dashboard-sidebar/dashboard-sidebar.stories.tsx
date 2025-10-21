import type { Meta, StoryObj } from '@storybook/react';

import Sidebar from './dashboard-sidebar.component';

const meta = {
  title: 'Components/Sidebar',
  component: Sidebar,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'radio',
      options: ['default'],
    },
  },
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof Sidebar>;

export const FullAccess: Story = {
  args: {
    allowedModules: [
      'Dashboard',
      'Attendance',
      'Students',
      'Events',
      'School',
      'Payments',
      'Parents',
      'Booking',
      'Meals',
      'Service',
      'Settings',
      'Message',
      'Support',
      'Logout',
    ],
    variant: 'default',
  },
};

export const LimitedAccess: Story = {
  args: {
    allowedModules: [
      'Dashboard',
      'Attendance',
      'Students',
      'Events',
      'School',
      'Payments',
      'Booking',
      'Meals',
      'Settings',
      'Message',
      'Support',
      'Logout',
    ],
    variant: 'default',
  },
};
