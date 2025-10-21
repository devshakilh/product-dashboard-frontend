/* eslint-disable @typescript-eslint/no-explicit-any */

import type { Meta, StoryObj } from '@storybook/react';

import Table from './table.component';

const meta: Meta<typeof Table> = {
  title: 'UI/Table',
  component: Table,
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof Table>;

const mockData = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    status: 'active',
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    status: 'inactive',
  },
];

const columns = [
  {
    header: 'Name',
    accessorKey: 'name',
  },
  {
    header: 'Email',
    accessorKey: 'email',
  },
  {
    header: 'Status',
    accessorKey: 'status',
    cell: (item: any) => (
      <span
        className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
          item.status === 'active'
            ? 'bg-green-100 text-green-800'
            : 'bg-red-100 text-red-800'
        }`}
      >
        {item.status}
      </span>
    ),
  },
];

export const Default: Story = {
  args: {
    data: mockData,
    columns,
  },
};

export const WithPagination: Story = {
  args: {
    data: mockData,
    columns,
    showPagination: true,
    currentPage: 1,
    totalItems: 20,
    itemsPerPage: 10,
  },
};
