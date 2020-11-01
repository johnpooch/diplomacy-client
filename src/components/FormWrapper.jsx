import React from 'react';
import styled from '@emotion/styled';

import { variables } from '../variables';

const StyledFormWrapper = styled.div`
  background: ${variables.colors.white};
  box-shadow: rgba(0, 0, 0, 0.15) 0px 1px 3px 1px;
  font-size: ${variables.fontSizes.sans[1]}px;
  max-width: 100%;
  min-width: 300px;
  padding: 0 ${variables.spacing[3]}px;
`;

const FormWrapper = (props) => {
  const { children } = props;
  return <StyledFormWrapper>{children}</StyledFormWrapper>;
};

export default FormWrapper;
