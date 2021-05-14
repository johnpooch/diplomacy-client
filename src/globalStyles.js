import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    margin: 0;
    color: ${(p) => p.theme.palette.text.primary};
    background: ${(p) => p.theme.palette.background.default};
    line-height: 1;
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
    color: ${(p) => p.theme.palette.primary.main};
    cursor: pointer;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  .small {
    font-size: 14px;
  }

  .overlay {
    bottom: 0;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
  }

  .field-error,
  .non-field-errors {
    text-align: left;
    color: ${(p) => p.theme.palette.error.main};
  }
`;
