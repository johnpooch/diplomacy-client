import React from 'react';
import { connect } from 'react-redux';
import styled from '@emotion/styled';

import { sizes } from '../variables';

const flagSizes = {
  small: 30,
};

const StyledDiv = styled.div`
  width: ${(props) => flagSizes[props.size]}px;
  svg {
    border-radius: ${sizes.borderRadius[0]}px;
  }
`;

const Flag = (props) => {
  const { flags, nationId, size } = props;
  const { paths, viewBox } = flags[nationId];
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

const mapStateToProps = (state) => {
  return {
    flags: state.flags,
  };
};

export default connect(mapStateToProps, null)(Flag);
