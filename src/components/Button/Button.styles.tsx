import styled from 'styled-components';

export default styled.button<{ primary: boolean }>`
  align-items: center;
  background-color: ${(p) =>
    p.primary ? p.theme.colors.primary.main : p.theme.colors.white};
  border: none;
  color: ${(p) =>
    p.primary ? p.theme.colors.white : p.theme.colors.primary.main};
  column-gap: ${(p) => p.theme.space[0]};
  cursor: pointer;
  display: flex;
  font-size: ${(p) => p.theme.fontSizes[1]};
  font-weight: ${(p) => p.theme.fontWeights.bold};
  justify-content: space-between;
  padding: ${(p) => p.theme.space[1]};
  text-decoration: none;
  text-transform: uppercase;

  svg {
    stroke: ${(p) => p.theme.colors.white};
  }

  &:hover:enabled {
    background-color: ${(p) => p.theme.colors.primary.lighter};
    color: ${(p) => p.theme.colors.primary.main};
  }

  &[disabled] {
    cursor: initial;
    background-color: ${(p) => p.theme.colors.background};
    color: ${(p) => p.theme.colors.text.light};
  }
`;
