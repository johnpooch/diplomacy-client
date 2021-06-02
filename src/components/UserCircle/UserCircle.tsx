import React from 'react';

import { makeStyles, useTheme } from '../MaterialUI';

import { UserCircleComponentProps } from './UserCircle.types';

const sizes = {
  sm: 24,
  md: 40,
};

const useStyle = makeStyles((theme) => {
  return {
    text: {
      fontFamily: theme.typography.fontFamily,
      fontWeight: 'bold',
    },
  };
});

const UserCircle: React.FC<UserCircleComponentProps> = ({
  isCurrentUser,
  size = 'md',
  username,
}) => {
  const theme = useTheme();
  const fill = isCurrentUser
    ? theme.palette.secondary.light
    : theme.palette.primary.light;
  const textColor = theme.palette.getContrastText(fill);
  const classes = useStyle();

  const _size = sizes[size];
  const firstChar = username[0].toUpperCase();
  return (
    <svg width={_size} height={_size}>
      <circle cx={_size / 2} cy={_size / 2} r={_size / 2} fill={fill} />
      <text
        className={classes.text}
        x="50%"
        y="50%"
        textAnchor="middle"
        fill={textColor}
        color={textColor}
        dy=".3em"
      >
        {firstChar}
      </text>
    </svg>
  );
};

export default UserCircle;
