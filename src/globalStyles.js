import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    margin: 0;
    font-family: ${(p) => p.theme.fonts.sans};
    color: ${(p) => p.theme.colors.text};
    background: ${(p) => p.theme.colors.background};
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
    color: ${(p) => p.theme.colors.accent};
    cursor: pointer;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  .overlay {
    bottom: 0;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
  }
`;
