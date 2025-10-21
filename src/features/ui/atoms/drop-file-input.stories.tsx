import type { Meta, StoryObj } from '@storybook/react';

import DropFileInput from './drop-file-input.component';

const meta = {
  title: 'UI/DropFileInput',
  component: DropFileInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DropFileInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    accept: 'image',
    maxFileSize: 25,
  },
};

export const ImageOnly: Story = {
  args: {
    accept: 'image',
    maxFileSize: 10,
  },
};

export const VideoOnly: Story = {
  args: {
    accept: 'video',
    maxFileSize: 50,
  },
};

export const BothTypes: Story = {
  args: {
    accept: 'both',
    maxFileSize: 25,
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
  },
};

export const Medium: Story = {
  args: {
    size: 'md',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
  },
};

export const WithError: Story = {
  args: {
    error: 'File upload failed. Please try again.',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-semibold">File Types</h3>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <h4 className="mb-2 text-sm font-medium">Image Only</h4>
          <DropFileInput accept="image" maxFileSize={10} />
        </div>
        <div>
          <h4 className="mb-2 text-sm font-medium">Video Only</h4>
          <DropFileInput accept="video" maxFileSize={50} />
        </div>
        <div>
          <h4 className="mb-2 text-sm font-medium">Both Types</h4>
          <DropFileInput accept="both" maxFileSize={25} />
        </div>
      </div>

      <h3 className="mt-4 text-lg font-semibold">Sizes</h3>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <h4 className="mb-2 text-sm font-medium">Small</h4>
          <DropFileInput size="sm" />
        </div>
        <div>
          <h4 className="mb-2 text-sm font-medium">Medium</h4>
          <DropFileInput size="md" />
        </div>
        <div>
          <h4 className="mb-2 text-sm font-medium">Large</h4>
          <DropFileInput size="lg" />
        </div>
      </div>

      <h3 className="mt-4 text-lg font-semibold">States</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h4 className="mb-2 text-sm font-medium">With Error</h4>
          <DropFileInput error="File upload failed. Please try again." />
        </div>
        <div>
          <h4 className="mb-2 text-sm font-medium">Disabled</h4>
          <DropFileInput disabled />
        </div>
      </div>
    </div>
  ),
};
