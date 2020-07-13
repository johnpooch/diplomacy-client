import React from 'react';
import styled from '@emotion/styled';

const StyledDiv = styled.div`
  width: 30px;
  svg {
    border-radius: 6px;
  }
`;

const Flag = (props) => {
  const { flagData } = props;
  const { paths, viewBox } = flagData;
  const SVGPaths = [];
  paths.forEach((pathData) => {
    const { fill, path } = pathData;
    SVGPaths.push(<path key="" fill={fill} d={path} />);
  });
  return (
    <StyledDiv className="flag-div">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox={viewBox}>
        <g>{SVGPaths}</g>
      </svg>
    </StyledDiv>
  );
};

export default Flag;
