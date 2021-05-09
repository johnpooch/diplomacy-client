import styled from 'styled-components';

export default styled.input`
  background-color: ${(p) => p.theme.colors.background};
  border: none;
  border-radius: ${(p) => p.theme.radii[1]};
  color: ${(p) => p.theme.colors.text.light};
  padding: ${(p) => p.theme.space[3]};

  &:focus-visible {
    background-color: ${(p) => p.theme.colors.white};
    border: ${(p) => p.theme.borderWidths[1]} solid
      ${(p) => p.theme.colors.primary.main};
    box-sizing: border-box;
    box-shadow: 0px 0px 0px 2px ${(p) => p.theme.colors.primary.lighter};
    color: ${(p) => p.theme.colors.text.main};
    outline: none;
  }
  &:not(:placeholder-shown) {
    background-color: ${(p) => p.theme.colors.white};
    border: ${(p) => p.theme.borderWidths[0]} solid
      ${(p) => p.theme.colors.border};
  }
`;
