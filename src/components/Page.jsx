import React from 'react';
import styled from '@emotion/styled';

import { variables } from '../variables';

export const PageWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  max-width: ${variables.sizes.innerWidth}px;
  padding: ${variables.spacing[6]}px ${variables.spacing[3]}px;
  text-align: center;
  width: 100%;
`;

export const PageTitle = styled.h1`
  color: ${variables.colors.base};
  font-size: ${variables.fontSizes.sans[4]}px;
  margin-bottom: ${variables.spacing[4]}px;
`;

const Page = (props) => {
  const { children, title } = props;
  return (
    <PageWrapper>
      {title ? <PageTitle>{title}</PageTitle> : null}
      {children}
    </PageWrapper>
  );
};

export default Page;
