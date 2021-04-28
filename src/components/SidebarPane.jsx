import React from 'react';
import styled from 'styled-components';

const StyledPane = styled.div`
  background: white;
  display: flow-root;
  flex-grow: 1;
  font-size: ${(p) => p.theme.fontSizes[2]};
  padding: 0 ${(p) => p.theme.space[2]};

  section {
    margin: ${(p) => p.theme.space[3]} 0;

    > * {
      margin: ${(p) => p.theme.space[3]} 0;
    }
  }

  section + section {
    border-top: ${(p) => p.theme.borders[0]};
  }

  li {
    margin: ${(p) => p.theme.space[1]} 0;
  }

  button {
    display: block;
    width: 100%;
  }

  .heading {
    display: flex;
    gap: ${(p) => p.theme.space[3]};
    justify-content: space-between;

    .text {
      text-transform: uppercase;
      font-weight: ${(p) => p.theme.fontWeights.display};
    }
  }

  .count {
    white-space: pre;
  }

  .icon {
    width: 100%;
  }
`;

const Pane = ({ children }) => {
  return <StyledPane>{children}</StyledPane>;
};

export const MessagesPane = () => {
  return <Pane />;
};

export const HistoryPane = () => {
  return <Pane />;
};

export default Pane;
