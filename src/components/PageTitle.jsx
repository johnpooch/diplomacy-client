import React from 'react';
import styled from '@emotion/styled';

import { colors, fontSizes, spacing } from '../variables';

export const StyledH1 = styled.h1`
  color: ${colors.base};
  font-size: ${fontSizes.sans[4]}px;
  margin-bottom: ${spacing[4]}px;
`;

const PageTitle = (props) => {
  const { title } = props;
  return <StyledH1>{title}</StyledH1>;
};

export default PageTitle;
