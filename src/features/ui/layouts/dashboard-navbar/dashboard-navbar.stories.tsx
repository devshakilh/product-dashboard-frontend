import type { Meta, StoryObj } from '@storybook/react';

import Navbar from './dashboard-navbar.component';

const meta = {
  title: 'Components/Navbar',
  component: Navbar,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Navbar>;

export default meta;
type Story = StoryObj<typeof Navbar>;

export const Default: Story = {
  args: {
    title: 'Dashboard',
    date: 'Thursday, January 23, 2025',
    user: {
      name: 'Emily Brooks',
      role: 'School Admin',
      avatar: 'public/Avatar Image.png',
    },
  },
};

export const ClassTeacherView: Story = {
  args: {
    title: 'Dashboard',
    date: 'Thursday, January 23, 2025',
    user: {
      name: 'Mrs. Smith',
      role: 'Class Teacher',
      avatar: 'public/Avatar Image.png',
    },
  },
};

export const ParentView: Story = {
  args: {
    title: 'Dashboard',
    date: 'Thursday, January 23, 2025',
    user: {
      name: 'Matthew Cooper',
      role: 'Parent',
      avatar: 'public/Avatar Image.png',
    },
  },
};
