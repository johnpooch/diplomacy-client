import React from 'react';

import flags from '../../data/standard/flags/flags';
import Tooltip from '../Tooltip/Tooltip';

import { CircleFlagComponentProps } from './CircleFlag.types';

const sizes = {
  sm: 20,
  md: 40,
};

// TODO replace svgs with circle svgs
const CircleFlag: React.FC<CircleFlagComponentProps> = ({
  nation,
  showTooltip = true,
  size = 'md',
}) => {
  const _size = sizes[size];
  const Wrapper = showTooltip
    ? (props) => React.createElement(Tooltip, { title: nation.name, ...props })
    : React.Fragment;
  return (
    <Wrapper>
      <svg width={_size} height={_size}>
        <defs>
          <pattern
            id={`image-${nation.id}`}
            x="-25%"
            y="-25%"
            height="150%"
            width="150%"
            viewBox={`0 0 ${_size} ${_size}`}
          >
            <image width={_size} height={_size} xlinkHref={flags[nation.id]} />
          </pattern>
        </defs>

        <circle
          cx={_size / 2}
          cy={_size / 2}
          r={_size / 2}
          fill={`url(#image-${nation.id})`}
        />
      </svg>
    </Wrapper>
  );
};

export default CircleFlag;
