import { useTheme } from '@material-ui/core';
import React from 'react';

import { UserCircleComponentProps } from './UserCircle.types';

const sizes = {
  sm: 24,
  md: 40,
};

const UserCircle: React.FC<UserCircleComponentProps> = ({
  isCurrentUser,
  size = 'md',
  username,
}) => {
  const theme = useTheme();
  const fill = isCurrentUser
    ? theme.palette.secondary.light
    : theme.palette.primary.light;

  const _size = sizes[size];
  const firstChar = username[0].toUpperCase();
  return (
    <svg width={_size} height={_size}>
      <circle cx={_size / 2} cy={_size / 2} r={_size / 2} fill={fill} />
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        fill={theme.palette.text.primary}
        dy=".3em"
      >
        {firstChar}
      </text>
    </svg>
  );
};

export default UserCircle;
