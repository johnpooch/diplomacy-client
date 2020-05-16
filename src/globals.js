import { css } from '@emotion/core';

import { colors, fontFamilies } from './variables';

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

  p {
    margin: 0;
  }

  a {
    color: ${colors.darkgray};
    cursor: pointer;

    &:hover {
      color: ${colors.base};
    }
  }
`;
