import React from 'react';
import styled from 'styled-components';

export const PageWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  max-width: ${(p) => p.theme.sizes.pageMaxWidth};
  padding: ${(p) => `${p.theme.space[6]} ${p.theme.space[3]}`};
  text-align: center;
  width: 100%;
`;

export const PageTitle = styled.h1`
  color: ${(p) => p.theme.colors.text};
  font-size: ${(p) => p.theme.fontSizes[4]};
  margin-bottom: ${(p) => p.theme.space[4]};
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
