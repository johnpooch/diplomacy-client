import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import styled from '@emotion/styled';

import { PageWrapper } from '../styles';
import { colorMap, sizes, spacing, fontSizes } from '../variables';

const StyledDiv = styled.div`
  display: flex;
  width: 100%;
  height: max-content;
  padding: ${spacing[3]}px;
  color: ${(props) => colorMap[props.type].text};
  background: ${(props) => colorMap[props.type].background};
  font-size: ${fontSizes.sans[2]}px;

  &:not(:last-child) {
    margin-bottom: ${spacing[4]}px;
  }
`;

const FlashMessage = (props) => {
  const { text, type } = props;
  if (!text) {
    return null;
  }

  return (
    <PageWrapper>
      <StyledDiv type={type}>{text}</StyledDiv>
    </PageWrapper>
  );
};

export default FlashMessage;
