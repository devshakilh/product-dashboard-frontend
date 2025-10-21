import { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Plus, X } from 'lucide-react';

import DynamicInputGroup from './dynamic-input-group.component';

const meta: Meta<typeof DynamicInputGroup> = {
  title: 'UI/DynamicInputGroup',
  component: DynamicInputGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'compact', 'bordered'],
      description: 'The visual style variant of the input group',
    },
    showLabels: {
      control: 'boolean',
      description: 'Whether to show field labels above inputs',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables all inputs and buttons in the group',
    },
    error: {
      control: 'text',
      description: 'Error message to display below the input group',
    },
    hideAddButton: {
      control: 'boolean',
      description: 'Hides the add new row button',
    },
    hideRemoveButton: {
      control: 'boolean',
      description: 'Hides the remove row buttons',
    },
    addButtonLabel: {
      control: 'text',
      description: 'Custom label for the add button',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes to apply to the container',
    },
  },
};

export default meta;

type Story = StoryObj<typeof DynamicInputGroup>;

interface Field {
  name: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
}

interface DynamicInputGroupProps {
  variant?: 'default' | 'compact' | 'bordered';
  showLabels?: boolean;
  disabled?: boolean;
  error?: string;
  hideAddButton?: boolean;
  hideRemoveButton?: boolean;
  addButtonLabel?: string;
  addButtonIcon?: React.ReactNode;
  removeButtonIcon?: React.ReactNode;
  className?: string;
  fields: Field[];
}

const DynamicInputGroupTemplate = (args: DynamicInputGroupProps) => {
  const [rows, setRows] = useState([
    {
      id: '1',
      fields: {
        field1: 'Initial Value',
        field2: '2024',
      },
    },
  ]);

  const handleAdd = () => {
    const newRow = {
      id: Date.now().toString(),
      fields: {
        field1: '',
        field2: '',
      },
    };
    setRows([...rows, newRow]);
  };

  const handleRemove = (id: string) => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleChange = (id: string, field: string, value: string) => {
    setRows(
      rows.map((row) =>
        row.id === id
          ? { ...row, fields: { ...row.fields, [field]: value } }
          : row
      )
    );
  };

  return (
    <DynamicInputGroup
      {...args}
      rows={rows}
      onAdd={handleAdd}
      onRemove={handleRemove}
      onChange={handleChange}
    />
  );
};

export const Default: Story = {
  render: (args) => (
    <DynamicInputGroupTemplate
      {...args}
      fields={[
        {
          name: 'field1',
          label: 'Field 1',
          placeholder: 'Enter value',
        },
        {
          name: 'field2',
          label: 'Field 2',
          placeholder: 'Enter value',
        },
      ]}
    />
  ),
};

export const Compact: Story = {
  render: (args) => (
    <DynamicInputGroupTemplate
      {...args}
      variant="compact"
      fields={[
        {
          name: 'field1',
          placeholder: 'First field',
        },
        {
          name: 'field2',
          placeholder: 'Second field',
        },
      ]}
      showLabels={false}
    />
  ),
};

export const Bordered: Story = {
  render: (args) => (
    <DynamicInputGroupTemplate
      {...args}
      variant="bordered"
      fields={[
        {
          name: 'field1',
          label: 'Field 1',
          placeholder: 'Enter value',
          required: true,
        },
        {
          name: 'field2',
          label: 'Field 2',
          placeholder: 'Enter value',
        },
      ]}
    />
  ),
};

export const CustomButtons: Story = {
  render: (args) => (
    <DynamicInputGroupTemplate
      {...args}
      fields={[
        {
          name: 'field1',
          label: 'Field 1',
          placeholder: 'Enter value',
        },
        {
          name: 'field2',
          label: 'Field 2',
          placeholder: 'Enter value',
        },
      ]}
      addButtonLabel="Add Row"
      addButtonIcon={<Plus className="mr-2 size-4" />}
      removeButtonIcon={<X className="size-4" />}
    />
  ),
};

export const WithError: Story = {
  render: (args) => (
    <DynamicInputGroupTemplate
      {...args}
      fields={[
        {
          name: 'field1',
          label: 'Field 1',
          placeholder: 'Enter value',
        },
        {
          name: 'field2',
          label: 'Field 2',
          placeholder: 'Enter value',
        },
      ]}
      error="Please fill in all required fields"
    />
  ),
};

export const Disabled: Story = {
  render: (args) => (
    <DynamicInputGroupTemplate
      {...args}
      fields={[
        {
          name: 'field1',
          label: 'Field 1',
          placeholder: 'Enter value',
        },
        {
          name: 'field2',
          label: 'Field 2',
          placeholder: 'Enter value',
        },
      ]}
      disabled
    />
  ),
};
