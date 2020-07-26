import React from 'react';
import styled from '@emotion/styled';

import Header from './Header';
import Heading from './Heading';
import Loading from './Loading';
import { PageWrapper } from '../styles';
import { colors } from '../variables';

const StyledMain = styled.main`
  background: ${colors.offwhite};
`;

const Page = (props) => {
  const { children, headingText, isLoaded } = props;

  const renderPageWrapper = () => {
    if (!isLoaded) return <Loading />;
    return (
      <PageWrapper>
        {headingText ? <Heading text={headingText} /> : null}
        {children}
      </PageWrapper>
    );
  };

  return (
    <StyledMain>
      <Header />
      {renderPageWrapper()}
    </StyledMain>
  );
};

export default Page;
