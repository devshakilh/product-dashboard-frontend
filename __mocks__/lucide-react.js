/* eslint-disable */
/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable react/display-name */
const React = require('react');

// Create a generic mock for all Lucide icons
const createIconMock = (name) => {
  return () =>
    React.createElement(
      'div',
      { 'data-testid': `${name.toLowerCase()}-icon` },
      `${name} Icon`
    );
};

// Common icons used in the application
const icons = [
  'Plus',
  'UserCog',
  'DollarSign',
  'ChartColumnBig',
  'Building2',
  'FlaskConical',
  'Bus',
  'BriefcaseMedical',
  'BookOpen',
  'Globe',
  'Save',
  'PencilIcon',
  'MapPin',
  'MapPinned',
  'Mail',
  'User',
  'Flag',
  'ListChecks',
  'Image',
  'Pencil',
  'ChevronRight',
  'Users',
  'ChartSpline',
  'FilePenLine',
  'GraduationCap',
  'Calendar',
  'BarChart2',
  'File',
  'ChevronLeft',
  'Eye',
  'Edit3',
  'EllipsisVertical',
  'Info',
  'Search',
  'Filter',
  'ArrowLeft',
];

// Create mock exports for each icon
const mockExports = icons.reduce((acc, iconName) => {
  acc[iconName] = createIconMock(iconName);
  return acc;
}, {});

module.exports = mockExports;
