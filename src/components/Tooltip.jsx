import React from 'react';
import styled from '@emotion/styled';

import * as Utils from '../utils';
import { sizes } from '../variables';

const StyledDiv = styled.div`
  position: fixed;
  padding: ${sizes.padding}px;
  bottom: 0;
  left: 0;
  pointer-events: none;
  text-transform: capitalize;

  ul {
    padding: 0;
    margin: 0;
  }

  li {
    display: flex;
    &:not(:last-child) {
      margin-bottom: ${sizes.padding}px;
    }
  }

  .key {
    font-weight: bold;
    margin-right: ${sizes.padding / 2}px;
  }
`;

class Tooltip extends React.Component {
  buildTooltip() {
    const { hoverTarget, data } = this.props;

    const tooltip = {};

    const territory = Utils.getObjectByKey(hoverTarget, data.territories);
    if (territory) {
      tooltip.name = territory.name;
      tooltip.coastal = territory.coastal ? 'true' : 'false';
      tooltip.type = territory.type;
    }

    const controlledBy = Utils.getObjectByKey(
      territory.controlled_by,
      data.nations
    );
    if (controlledBy) {
      tooltip.nation = controlledBy.name;
    }

    const piece = Utils.getObjectByKey(hoverTarget, data.pieces, 'territory');
    if (piece) {
      tooltip.piece = piece.type;
    }

    return tooltip;
  }

  render() {
    const elements = [];
    const tooltip = this.buildTooltip();

    Object.keys(tooltip).forEach((key) => {
      const value = tooltip[key];
      elements.push(
        <li key={key}>
          <span className="key">{key}</span>
          <span className="value">{value}</span>
        </li>
      );
    });

    return (
      <StyledDiv>
        <ul>{elements}</ul>
      </StyledDiv>
    );
  }
}

export default Tooltip;
