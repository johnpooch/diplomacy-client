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
  .container {
    margin-left: auto;
    margin-right: auto;
    padding-left: 15px;
    padding-right: 15px;
  }
  h3 {
    font-size: 1.75rem;
  }
  .search-row {
    text-align: center;
  }
  input#search {
    text-align: center;
    position: relative;
    min-width: 0;
    margin-bottom: 0;
    padding-bottom: 0.5rem;
    padding-top: 0.5rem;
    border-right: 0;
    display: inline;
    width: 20%;
    height: 2rem;
    background: #fafafa;
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  }
  .filter-open-control {
    display: inline-block;
    font-weight: 400;
    text-align: center;
    vertical-align: middle;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    border: 1px solid transparent;
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    line-height: 1.5;
    border-radius: 0.25rem;
    transition: color 0.15s;
  }

  .filter-open-control:focus {
    outline: none;
  }
  .filter-options-row {
    display: grid;
    grid-template-columns: 5fr 5fr 2fr;
    grid-column-gap: 1rem;
  }
  .game-filter-form {
    padding-bottom: 2rem;
  }
  .game-filter-form select {
    display: block;
    margin-top: 0.5rem;
    width: 100%;
    display: block;
    width: 100%;
    height: calc(1.5em + 0.75rem + 2px);
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  }
  .game-filter-form input {
    display: block;
    margin-top: 0.5rem;
    width: 100%;
    height: calc(1.5em + 0.75rem + 2px);
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  }
  .form-row {
    padding: 0rem 0rem 1rem;
  }
  .advanced-filter-options-row {
    display: grid;
    grid-template-columns: 3fr 3fr 3fr 3fr;
    grid-column-gap: 1rem;
  }
  .game-filter-form button.submit {
    color: #fff;
    background-color: #007bff;
    border-color: #007bff;
    display: inline-block;
    font-weight: 400;
    text-align: center;
    vertical-align: middle;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    border: 1px solid transparent;
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    line-height: 1.5;
    border-radius: 0.25rem;
    transition: color 0.15s;
  }
  .game-filter-form hr {
    margin-top: 1rem;
    margin-bottom: 1rem;
    border: 0;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
  }
  p {
    margin: 0;
  }

  a {
    color: ${colors.darkgray};

    &:hover {
      color: ${colors.base};
    }
  }
`;
