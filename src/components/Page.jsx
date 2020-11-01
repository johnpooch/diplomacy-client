import React from 'react';
import styled from '@emotion/styled';

import PageTitle from './PageTitle';
import { spacing, sizes } from '../variables';

const PageWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  max-width: ${sizes.innerWidth}px;
  padding: ${spacing[6]}px ${spacing[3]}px;
  text-align: center;
  width: 100%;
`;

const Page = (props) => {
  const { children, title } = props;
  return (
    <PageWrapper>
      {title ? <PageTitle title={title} /> : null}
      {children}
    </PageWrapper>
  );
};

export default Page;
