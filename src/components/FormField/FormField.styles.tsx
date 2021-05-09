/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';

export const StyledFormField = styled.label`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 12px 0;

  > *:not(:last-child) {
    margin-bottom: 12px;
  }

  span {
    font-size: ${(p) => p.theme.fontSizes[1]};
  }
`;
