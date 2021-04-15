import styled from 'styled-components';

export const Grid = styled.div`
  display: grid;
  grid-template-columns: ${(p) =>
    p.columns ? `repeat(${p.columns}, 1fr)` : 'auto'};
  grid-column-gap: ${(p) => (p.columnGap ? p.columnGap : p.theme.space[4])};
  grid-row-gap: ${(p) => (p.rowGap ? p.rowGap : p.theme.space[4])};

  label,
  input {
    margin-top: 0;
    margin-bottom: 0;
  }
`;

export const GridTemplate = styled(Grid)`
  grid-template-columns: ${(p) =>
    p.templateColumns ? p.templateColumns : 'auto'};
`;
