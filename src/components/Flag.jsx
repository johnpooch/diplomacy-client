import React from 'react';
import styled from '@emotion/styled';

const flagSizes = {
  small: 30,
};

const StyledDiv = styled.div`
  width: ${(props) => flagSizes[props.size]}px;
  svg {
    border-radius: 6px;
  }
`;

const Flag = (props) => {
  const { flagData, size } = props;
  const { paths, viewBox } = flagData;
  const SVGPaths = [];
  paths.forEach((pathData) => {
    const { fill, path } = pathData;
    SVGPaths.push(<path key={`${path}_${fill}`} fill={fill} d={path} />);
  });
  return (
    <StyledDiv className="flag-div" size={size}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox={viewBox}>
        <g>{SVGPaths}</g>
      </svg>
    </StyledDiv>
  );
};

export default Flag;
