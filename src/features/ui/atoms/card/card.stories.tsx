import type { Meta, StoryObj } from '@storybook/react';

import Card from './card.component';

const meta = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'light-gray',
      values: [
        { name: 'light-gray', value: '#f9f9f9' },
        { name: 'dark-gray', value: '#f3f4f6' },
      ],
    },
  },
  decorators: [
    (Story) => (
      <div className="p-8" style={{ minWidth: '320px' }}>
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'compact', 'flat'],
    },
    shadow: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
    },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    children: (
      <div>
        <h3 className="text-lg font-semibold">Card Title</h3>
        <p className="mt-2 text-gray-600">
          This is a default card with standard padding and no shadow.
        </p>
      </div>
    ),
    variant: 'default',
    shadow: 'none',
  },
};

export const Compact: Story = {
  args: {
    children: (
      <div>
        <h3 className="text-lg font-semibold">Compact Card</h3>
        <p className="mt-2 text-gray-600">A card with reduced padding.</p>
      </div>
    ),
    variant: 'compact',
    shadow: 'none',
  },
};

export const WithShadow: Story = {
  args: {
    children: (
      <div>
        <h3 className="text-lg font-semibold">Card with Shadow</h3>
        <p className="mt-2 text-gray-600">
          This card demonstrates the shadow effect.
        </p>
      </div>
    ),
    variant: 'default',
    shadow: 'md',
  },
};

export const Flat: Story = {
  args: {
    children: (
      <div>
        <h3 className="text-lg font-semibold">Flat Card</h3>
        <p className="mt-2 text-gray-600">
          A card with minimal padding for dense content.
        </p>
      </div>
    ),
    variant: 'flat',
    shadow: 'none',
  },
};

export const CustomContent: Story = {
  args: {
    children: (
      <div className="flex items-center gap-4">
        <div className="size-12 rounded-full bg-blue-500" />
        <div>
          <h3 className="font-semibold">Custom Layout</h3>
          <p className="text-sm text-gray-600">
            Cards can contain any content layout
          </p>
        </div>
      </div>
    ),
    variant: 'compact',
    shadow: 'sm',
  },
};

export const Interactive: Story = {
  args: {
    children: (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Interactive Card</h3>
        <p className="text-gray-600">
          This card demonstrates interactive elements.
        </p>
        <button className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
          Click me
        </button>
      </div>
    ),
    variant: 'default',
    shadow: 'md',
    className: 'hover:shadow-lg transition-shadow duration-200',
  },
};
