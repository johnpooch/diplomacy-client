import React from 'react';
import styled from '@emotion/styled';

import { colors, fontSizes, spacing } from '../variables';

export const StyledH1 = styled.h1`
  margin: 0 auto ${spacing[4]}px;
  font-size: ${fontSizes.sans.xlarge}px;
  color: ${colors.base};
`;

const Heading = (props) => {
  const { text } = props;
  return <StyledH1>{text}</StyledH1>;
};

export default Heading;
