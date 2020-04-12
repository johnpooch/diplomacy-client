import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

import { sizes } from '../../variables';

export const StyledDiv = styled.div`
  margin-left: ${sizes.p}px;
  padding: ${sizes.p}px;
  border: 1px solid currentColor;
  transition: all 0.1s linear;

  span {
    text-transform: uppercase;
  }
`;

class Piece extends React.Component {
  render() {
    return (
      <StyledDiv data-type={this.props.type}>
        <span>{this.props.type}</span>
      </StyledDiv>
    );
  }
}

Piece.propTypes = {
  type: PropTypes.string,
};

export default Piece;
