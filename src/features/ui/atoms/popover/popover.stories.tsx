import { Button } from '@/features/ui/atoms';
import type { Meta, StoryObj } from '@storybook/react';
import { MoreVertical, Settings } from 'lucide-react';

import Popover from './popover.component';

const meta = {
  title: 'UI/Popover',
  component: Popover,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Plain: Story = {
  args: {
    trigger: (
      <Button variant="secondary" icon={<Settings className="size-4" />}>
        Settings
      </Button>
    ),
    children: (
      <div className="p-4">
        <h3 className="mb-2 font-medium">Settings</h3>
        <p className="text-sm text-gray-500">Configure your preferences</p>
      </div>
    ),
    position: 'bottom',
    size: 'md',
    variant: 'plain',
  },
};

export const WithCaret: Story = {
  args: {
    trigger: (
      <Button variant="secondary" icon={<Settings className="size-4" />}>
        Settings
      </Button>
    ),
    children: (
      <div className="p-4">
        <h3 className="mb-2 font-medium">Settings</h3>
        <p className="text-sm text-gray-500">Configure your preferences</p>
      </div>
    ),
    position: 'bottom',
    size: 'md',
    variant: 'caret',
  },
};

export const MenuExample: Story = {
  args: {
    trigger: (
      <button className="rounded-full p-2 hover:bg-gray-100">
        <MoreVertical className="size-4" />
      </button>
    ),
    children: (
      <div className="flex flex-col gap-1 p-1">
        <Button variant="primary" size="sm" className="w-full justify-start">
          Edit
        </Button>
        <Button variant="secondary" size="sm" className="w-full justify-start">
          Delete
        </Button>
      </div>
    ),
    position: 'bottom-end',
    size: 'sm',
    variant: 'caret',
  },
};

export const Positions: Story = {
  args: {
    trigger: <button>Trigger</button>,
    children: <div>Content</div>,
  },
  render: () => (
    <div className="grid size-[600px] grid-cols-3 place-items-center gap-4">
      {(
        [
          'top-start',
          'top',
          'top-end',
          'left-start',
          'center',
          'right-start',
          'left-end',
          'bottom',
          'right-end',
          'bottom-start',
          'bottom',
          'bottom-end',
        ] as const
      ).map((position) =>
        position === 'center' ? (
          <div key="center" className="text-sm text-gray-500">
            Click to toggle
          </div>
        ) : (
          <Popover
            key={position}
            trigger={
              <Button variant="secondary" size="sm">
                {position}
              </Button>
            }
            position={position}
            variant="caret"
          >
            <div className="p-4">
              <p className="text-sm">Popover on {position}</p>
            </div>
          </Popover>
        )
      )}
    </div>
  ),
};

export const Sizes: Story = {
  args: {
    trigger: <button>Trigger</button>,
    children: <div>Content</div>,
  },
  render: () => (
    <div className="flex gap-4">
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <Popover
          key={size}
          trigger={
            <Button variant="secondary" size="sm">
              {size}
            </Button>
          }
          size={size}
          variant="caret"
        >
          <div className="p-4">
            <p className="text-sm">{size.toUpperCase()} Size Popover</p>
          </div>
        </Popover>
      ))}
    </div>
  ),
};
