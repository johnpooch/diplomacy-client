import React from 'react';
import styled from '@emotion/styled';

import Loading from './Loading';
import Heading from './Heading';
import { PageWrapper } from '../styles';
import { colors } from '../variables';

const StyledMain = styled.main`
  background: ${colors.offwhite};
  min-height: 100vh;
`;

const Page = (props) => {
  const { children, headingText, isLoaded } = props;

  const renderPageWrapper = () => {
    if (!isLoaded) {
      return <PageWrapper><Loading /></PageWrapper>;
    }
    return (
      <PageWrapper>
        {headingText ? <Heading text={headingText} /> : null}
        {children}
      </PageWrapper>
    );
  };

  return <StyledMain>{renderPageWrapper()}</StyledMain>;
};

export default Page;
