import React from 'react';

import { useTheme } from '../MaterialUI';
import Tooltip from '../Tooltip/Tooltip';

import { UserSpaceComponentProps } from './UserSpace.types';

const STROKE_WIDTH = 2;
const STROKE_DASHARRAY = 4;

const sizes = {
  sm: 24,
  md: 40,
};

const UserCircle: React.FC<UserSpaceComponentProps> = ({ size = 'md' }) => {
  const theme = useTheme();
  const stroke = theme.palette.primary.light;
  const _size = sizes[size];
  return (
    <Tooltip title="Space available">
      <svg width={_size} height={_size}>
        <circle
          cx={_size / 2}
          cy={_size / 2}
          r={_size / 2 - STROKE_WIDTH}
          stroke={stroke}
          fill="transparent"
          strokeWidth={STROKE_WIDTH}
          strokeDasharray={STROKE_DASHARRAY}
        />
      </svg>
    </Tooltip>
  );
};

export default UserCircle;
