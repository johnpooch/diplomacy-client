import React from 'react';
import styled from '@emotion/styled';
import { variables } from '../variables';

const StyledPane = styled.div`
  background: white;
  display: flow-root;
  flex-grow: 1;
  font-size: ${variables.fontSizes.sans[2]}px;
  padding: 0 ${variables.spacing[2]}px;
  overflow-y: auto;

  section {
    margin: ${variables.spacing[3]}px 0;

    > * {
      margin: ${variables.spacing[3]}px 0;
    }
  }

  section + section {
    border-top: ${variables.sizes.border}px solid ${variables.colors.base};
  }

  li {
    margin: ${variables.spacing[1]}px 0;
  }

  button {
    display: block;
    width: 100%;
  }

  .heading {
    display: flex;
    grid-gap: ${variables.spacing[3]}px;
    justify-content: space-between;

    .text {
      text-transform: uppercase;
      font-weight: bold;
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
