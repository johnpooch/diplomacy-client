import { css } from '@emotion/core';

import { variables } from './variables';

export default css`
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: ${variables.fontFamilies.sans};
    color: ${variables.colors.base};
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

  p,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  img {
    margin: 0;
  }

  a {
    color: ${variables.colors.darkgray};
    cursor: pointer;
    text-decoration: none;

    &:hover {
      color: ${variables.colors.base};
    }
  }
`;
