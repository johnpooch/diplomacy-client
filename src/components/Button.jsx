import styled from '@emotion/styled';

import { colors, sizes, spacing, fontSizes } from '../variables';

const Button = styled.button`
  cursor: pointer;
  color: ${colors.base};
  background-color: ${colors.gray};
  border: none;
  outline: 0;
  margin: 0;
  padding: ${spacing[1]}px ${spacing[2]}px;
  font-size: ${fontSizes.sans[1]}px;
  text-decoration: none;
  border-radius: ${sizes.borderRadius[0]}px;

  &.active {
    background-color: ${colors.yellow};
  }

  &:hover {
    background-color: white;
  }
`;
export default Button;
