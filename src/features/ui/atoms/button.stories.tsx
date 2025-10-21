import type { Meta, StoryObj } from '@storybook/react';
import { ArrowRightIcon, PlusIcon } from 'lucide-react';

import Button from './button.component';

const meta = {
  title: 'UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    children: 'Button Label',
    variant: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Button Label',
    variant: 'secondary',
  },
};

export const PrimarySmall: Story = {
  args: {
    children: 'Button Label',
    variant: 'primary',
    size: 'sm',
  },
};

export const SecondarySmall: Story = {
  args: {
    children: 'Button Label',
    variant: 'secondary',
    size: 'sm',
  },
};

export const PrimaryWithLeftIcon: Story = {
  args: {
    children: 'Button Label',
    icon: <PlusIcon className="size-4" />,
    iconPosition: 'left',
  },
};

export const SecondaryWithLeftIcon: Story = {
  args: {
    children: 'Button Label',
    variant: 'secondary',
    icon: <PlusIcon className="size-4" />,
    iconPosition: 'left',
  },
};

export const PrimarySmallWithLeftIcon: Story = {
  args: {
    children: 'Button Label',
    size: 'sm',
    icon: <PlusIcon className="size-4" />,
    iconPosition: 'left',
  },
};

export const SecondarySmallWithLeftIcon: Story = {
  args: {
    children: 'Button Label',
    variant: 'secondary',
    size: 'sm',
    icon: <PlusIcon className="size-4" />,
    iconPosition: 'left',
  },
};

export const PrimaryWithRightIcon: Story = {
  args: {
    children: 'Button Label',
    icon: <ArrowRightIcon className="size-4" />,
    iconPosition: 'right',
  },
};

export const SecondaryWithRightIcon: Story = {
  args: {
    children: 'Button Label',
    variant: 'secondary',
    icon: <ArrowRightIcon className="size-4" />,
    iconPosition: 'right',
  },
};

export const PrimarySmallWithRightIcon: Story = {
  args: {
    children: 'Button Label',
    size: 'sm',
    icon: <ArrowRightIcon className="size-4" />,
    iconPosition: 'right',
  },
};

export const SecondarySmallWithRightIcon: Story = {
  args: {
    children: 'Button Label',
    variant: 'secondary',
    size: 'sm',
    icon: <ArrowRightIcon className="size-4" />,
    iconPosition: 'right',
  },
};

export const IconOnlyPrimary: Story = {
  args: {
    icon: <PlusIcon className="size-4" />,
    'aria-label': 'Add item',
  },
};

export const IconOnlySecondary: Story = {
  args: {
    icon: <PlusIcon className="size-4" />,
    variant: 'secondary',
    'aria-label': 'Add item',
  },
};

// Show all variants in a grid
export const AllVariants: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-4">
        <Button>Primary Default</Button>
        <Button size="sm">Primary Small</Button>
        <Button icon={<PlusIcon className="size-4" />} iconPosition="left">
          Primary with Icon
        </Button>
        <Button
          size="sm"
          icon={<PlusIcon className="size-4" />}
          iconPosition="left"
        >
          Primary Small with Icon
        </Button>
        <Button
          icon={<ArrowRightIcon className="size-4" />}
          iconPosition="right"
        >
          Primary with Icon
        </Button>
        <Button
          size="sm"
          icon={<ArrowRightIcon className="size-4" />}
          iconPosition="right"
        >
          Primary Small with Icon
        </Button>
        <Button icon={<PlusIcon className="size-4" />} />
      </div>
      <div className="space-y-4">
        <Button variant="secondary">Secondary Default</Button>
        <Button variant="secondary" size="sm">
          Secondary Small
        </Button>
        <Button
          variant="secondary"
          icon={<PlusIcon className="size-4" />}
          iconPosition="left"
        >
          Secondary with Icon
        </Button>
        <Button
          variant="secondary"
          size="sm"
          icon={<PlusIcon className="size-4" />}
          iconPosition="left"
        >
          Secondary Small with Icon
        </Button>
        <Button
          variant="secondary"
          icon={<ArrowRightIcon className="size-4" />}
          iconPosition="right"
        >
          Secondary with Icon
        </Button>
        <Button
          variant="secondary"
          size="sm"
          icon={<ArrowRightIcon className="size-4" />}
          iconPosition="right"
        >
          Secondary Small with Icon
        </Button>
        <Button variant="secondary" icon={<PlusIcon className="size-4" />} />
      </div>
    </div>
  ),
};
