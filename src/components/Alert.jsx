import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

import { colors } from '../variables';

export const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  width: 100vw;
  height: 100vh;
  color: ${(props) => (props.type === 'error' ? colors.red : null)};
`;

class Alert extends React.Component {
  render() {
    return <StyledDiv>{this.props.text}</StyledDiv>;
  }
}

Alert.propTypes = {
  text: PropTypes.string,
  type: PropTypes.string,
};

export default Alert;
