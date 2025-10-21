import type { Meta, StoryObj } from '@storybook/react';
import { ChevronRight, ListFilter, Search, User } from 'lucide-react';

import Input from './input.component';

const meta = {
  title: 'UI/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: 'Enter text',
  },
};

export const LeftIcon: Story = {
  args: {
    placeholder: 'Search',
    leftIcon: <Search className="size-4 text-secondary-300" />,
  },
};

export const RightIcon: Story = {
  args: {
    placeholder: 'Enter text',
    rightIcon: <ListFilter className="size-4 text-secondary-300" />,
  },
};

export const BothIcons: Story = {
  args: {
    placeholder: 'Enter text',
    leftIcon: <User className="size-4 text-secondary-300" />,
    rightIcon: <ChevronRight className="size-4 text-secondary-300" />,
  },
};

export const Disabled: Story = {
  args: {
    placeholder: 'Disabled input',
    disabled: true,
  },
};

export const Success: Story = {
  args: {
    placeholder: 'Validated input',
    validationState: 'success',
    validationMessage: 'Successful',
  },
};

export const Error: Story = {
  args: {
    placeholder: 'Validated input',
    validationState: 'error',
    validationMessage: 'Error',
  },
};

export const Loading: Story = {
  args: {
    placeholder: 'Validated input',
    validationState: 'loading',
    validationMessage: 'Loading',
  },
};

export const Warning: Story = {
  args: {
    placeholder: 'Validated input',
    validationState: 'warning',
    validationMessage: 'Warning',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Input placeholder="Enter text" />
      <Input
        placeholder="Search"
        leftIcon={<Search className="size-4 text-secondary-300" />}
      />
      <Input
        placeholder="Enter text"
        rightIcon={<ListFilter className="size-4 text-secondary-300" />}
      />
      <Input
        placeholder="Enter text"
        leftIcon={<User className="size-4 text-secondary-300" />}
        rightIcon={<ChevronRight className="size-4 text-secondary-300" />}
      />
      <Input placeholder="Disabled input" disabled />
      <Input
        placeholder="Validated input"
        validationState="success"
        validationMessage="Successful"
      />
      <Input
        placeholder="Validated input"
        validationState="error"
        validationMessage="Error"
      />
      <Input
        placeholder="Validated input"
        validationState="loading"
        validationMessage="Loading"
      />
      <Input
        placeholder="Validated input"
        validationState="warning"
        validationMessage="Warning"
      />
    </div>
  ),
};
