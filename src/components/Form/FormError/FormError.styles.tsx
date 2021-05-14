/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';

export const StyledFieldError = styled.div`
  color: ${(p) => p.theme.colors.status.error.main};
  font-size: ${(p) => p.theme.fontSizes[1]};
`;
