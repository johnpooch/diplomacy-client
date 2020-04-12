import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

import * as Utils from 'Utilities/utils';
import { sizes } from '../../variables';

export const StyledDiv = styled.div`
  position: fixed;
  padding: ${sizes.p}px;
  bottom: 0;
  left: 0;
  background: rgba(255, 255, 255, 0.8);
  pointer-events: none;
  text-transform: capitalize;

  ul {
    padding: 0;
    margin: 0;
  }

  li {
    display: flex;
    &:not(:last-child) {
      margin-bottom: ${sizes.p}px;
    }
  }

  .key {
    font-weight: bold;
    margin-right: ${sizes.p / 2}px;
  }
`;

class Tooltip extends React.Component {
  buildTooltip() {
    const tooltip = {};

    const territory = Utils.getObjectByKey(
      this.props.hoverTarget,
      this.props.data.territories
    );
    if (territory) {
      tooltip.name = territory.name;
      tooltip.coastal = territory.coastal ? 'true' : 'false';
      tooltip.type = territory.type;
    }

    const controlledBy = Utils.getObjectByKey(
      territory.controlled_by,
      this.props.data.nations
    );
    if (controlledBy) {
      tooltip.nation = controlledBy.name;
    }

    const piece = Utils.getObjectByKey(
      this.props.hoverTarget,
      this.props.data.pieces,
      'territory'
    );
    if (piece) {
      tooltip.piece = piece.type;
    }

    return tooltip;
  }

  render() {
    const elements = [];
    const tooltip = this.buildTooltip();

    for (const key in tooltip) {
      const value = tooltip[key];

      elements.push(
        <li key={key}>
          <span className="key">{key}</span>
          <span className="value">{value}</span>
        </li>
      );
    }

    return (
      <StyledDiv>
        <ul>{elements}</ul>
      </StyledDiv>
    );
  }
}

Tooltip.propTypes = {
  hoverTarget: PropTypes.number,
  data: PropTypes.object,
};

export default Tooltip;
