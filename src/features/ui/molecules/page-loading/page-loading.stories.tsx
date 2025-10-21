import type { Meta, StoryObj } from '@storybook/react';

import PageLoading from './page-loading.component';

const meta = {
  title: 'UI/Molecules/PageLoading',
  component: PageLoading,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div className="h-screen w-full">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof PageLoading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithoutBackdrop: Story = {
  decorators: [
    (Story) => (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="relative flex flex-col items-center gap-2">
          <Story />
        </div>
      </div>
    ),
  ],
};
