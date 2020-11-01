import styled from '@emotion/styled';

import { sizes, spacing } from './variables';

// Layout

export const PageWrapper = styled.div`
  padding: ${spacing[6]}px;
  max-width: ${sizes.maxWidth}px;
  margin: 0 auto;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: ${(props) =>
    props.columns ? `repeat(${props.columns}, 1fr)` : 'auto'};
  grid-column-gap: ${(props) =>
    props.columnGap ? props.columnGap : `${spacing[4]}px`};
  grid-row-gap: ${(props) => (props.rowGap ? props.rowGap : `${spacing[4]}px`)};

  label,
  input {
    margin-top: 0;
    margin-bottom: 0;
  }
`;

export const GridTemplate = styled(Grid)`
  grid-template-columns: ${(props) =>
    props.templateColumns ? props.templateColumns : 'auto'};
`;
