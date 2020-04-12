import React from 'react';
import styled from '@emotion/styled';

export const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  width: 100vw;
  height: 100vh;
`;

class Loading extends React.Component {
  render() {
    return <StyledDiv>Loading...</StyledDiv>;
  }
}

export default Loading;
