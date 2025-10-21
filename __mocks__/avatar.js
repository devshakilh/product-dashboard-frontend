/* eslint-disable */
/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/display-name */
const React = require('react');

// Mock for the Avatar component
const Avatar = ({ src, alt, className, ...props }) => {
  return React.createElement(
    'div',
    {
      'data-testid': 'avatar-mock',
      className,
      ...props,
    },
    React.createElement('span', null, alt || 'Avatar')
  );
};

// Mock for the AvatarGroup component if needed
const AvatarGroup = ({ children, max = 5 }) => {
  return React.createElement(
    'div',
    { 'data-testid': 'avatar-group-mock' },
    children
  );
};

module.exports = {
  Avatar,
  AvatarGroup,
};
