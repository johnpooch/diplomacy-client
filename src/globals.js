import { css } from '@emotion/core';
import styled from '@emotion/styled';

import { colors, fontFamilies, spacing } from './variables';

export default css`
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: ${fontFamilies.sans};
    color: ${colors.base};
  }

  ul,
  ol {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  img {
    display: block;
    max-width: 100%;
  }
`;

export const PageWrapper = styled.div`
  padding: ${spacing[4]}px;
`;
