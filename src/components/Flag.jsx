import React from 'react';
import styled from '@emotion/styled';

import { flagSizes } from '../variables';

const StyledDiv = styled.div`
  width: ${(props) => flagSizes[props.size]}px;
`;

const Flag = (props) => {
  const { nation, size } = props;
  const paths = nation.flag_as_data;
  const SVGPaths = [];
  paths.forEach((pathData) => {
    const { fill, path } = pathData;
    SVGPaths.push(<path key={`${path}_${fill}`} fill={fill} d={path} />);
  });
  return (
    <StyledDiv className="flag-div" size={size}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 252.39 168.26">
        <g>{SVGPaths}</g>
      </svg>
    </StyledDiv>
  );
};

export default Flag;
