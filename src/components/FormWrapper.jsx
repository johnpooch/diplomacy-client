import styled from '@emotion/styled';
import React from 'react';
import { connect } from 'react-redux';

import { variables } from '../variables';

const Base = styled.div`
  font-size: ${variables.fontSizes.sans[1]}px;
  padding: ${variables.spacing[4]}px;
`;

const Default = styled(Base)`
  background: ${variables.colors.white};
  border-radius: ${variables.sizes.borderRadius[2]}px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 1px 3px 1px;
  width: 350px;
`;

const ExtraSmall = styled(Base)`
  width: 100%;
`;

const FormWrapper = ({ browser, children }) => {
  const StyledFormWrapper = browser.lessThan.small ? ExtraSmall : Default;
  return <StyledFormWrapper>{children}</StyledFormWrapper>;
};

const mapStateToProps = (state) => {
  return { browser: state.browser };
};

export default connect(mapStateToProps, null)(FormWrapper);
