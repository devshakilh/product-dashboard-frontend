/* eslint-disable */
/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable react/display-name */
const React = require('react');

// Mock for container components that take children
const createContainerMock = (name) => {
  return ({ children }) =>
    React.createElement(
      'div',
      { 'data-testid': `${name.toLowerCase()}` },
      children
    );
};

// Mock for simple components without children
const createSimpleMock = (name) => {
  return () =>
    React.createElement('div', { 'data-testid': `${name.toLowerCase()}` });
};

// Mock for components that need special handling
const Bar = ({ dataKey }) =>
  React.createElement('div', { 'data-testid': `bar-${dataKey}` });

// Export all mocked components
module.exports = {
  ResponsiveContainer: createContainerMock('responsive-container'),
  PieChart: createContainerMock('pie-chart'),
  Pie: createContainerMock('pie'),
  Cell: createSimpleMock('pie-cell'),
  Tooltip: createSimpleMock('tooltip'),
  BarChart: createContainerMock('bar-chart'),
  CartesianGrid: createSimpleMock('cartesian-grid'),
  XAxis: createSimpleMock('x-axis'),
  YAxis: createSimpleMock('y-axis'),
  Bar,
  // Add any other recharts components as needed
};
