import React from 'react';
import styled from '@emotion/styled';

import PageTitle from './PageTitle';
import { colors, spacing, sizes } from '../variables';

const PageBackground = styled.main`
  background: ${colors.gray};
`;

const PageWrapper = styled.div`
  align-items: ${(props) => (props.centered ? 'center' : 'initial')};
  display: flex;
  flex-direction: column;
  justify-content: ${(props) => (props.centered ? 'center' : 'initial')};
  margin: 0 auto;
  max-width: ${sizes.innerWidth}px;
  min-height: 100vh;
  padding: ${spacing[6]}px ${spacing[3]}px;
  width: 100%;
  text-align: ${(props) => (props.centered ? 'center' : 'initial')};
`;

const Page = (props) => {
  const { centered, children, title } = props;
  return (
    <PageBackground>
      <PageWrapper centered={centered}>
        {title ? <PageTitle title={title} /> : null}
        {children}
      </PageWrapper>
    </PageBackground>
  );
};

export default Page;
