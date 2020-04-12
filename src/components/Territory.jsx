import React from 'react';
import styled from '@emotion/styled';

import * as Utils from '../utils';
import mapData from '../map.json';
import { colors } from '../variables';

export const StyledGroup = styled.g`
  polygon {
    stroke-width: 1px;
    stroke: white;
    fill: ${colors.land};

    &[data-type='sea'] {
      fill: ${colors.sea};

      &:hover {
        fill: darken(${colors.sea}, 10%);
      }
    }

    &[data-type='land'] {
      fill: ${colors.land};

      &:hover {
        fill: darken(${colors.land}, 10%);
      }
    }
  }
`;

const Territory = (props) => {
  const { id, name, type, controlledBy } = props;
  const data = Utils.getObjectByKey(id, mapData.territories);
  if (!data) return null;
  return (
    <StyledGroup>
      <polygon
        key={id}
        points={data.polygon}
        data-name={name}
        data-type={type}
        data-controlled-by={controlledBy}
      />
    </StyledGroup>
  );
};

export default Territory;
