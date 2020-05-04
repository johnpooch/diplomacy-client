import React from 'react';
import styled from '@emotion/styled';

import { PageWrapper } from '../styles';
import { colorMap, spacing, fontSizes } from '../variables';

const StyledDiv = styled.div`
  display: flex;
  width: 100%;
  height: max-content;
  padding: ${spacing[3]}px;
  color: ${(props) => colorMap[props.type].text};
  background: ${(props) => colorMap[props.type].background};
  font-size: ${fontSizes.sans[2]}px;

  &:not(:last-child) {
    margin-bottom: ${spacing[4]}px;
  }
  .close {
    color: black;
    font-weight: bolder;
    cursor: pointer;
    border: solid 1px black;
    margin-right: 10px;
    border-radius: 4px;
  }
`;

class FlashMessage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
    };
    this.close = this.close.bind(this);
  }

  close() {
    this.setState({ open: false });
  }

  render() {
    const { text, type } = this.props;
    const { open } = this.state;
    if (text && open) {
      return (
        <PageWrapper>
          <StyledDiv type={type}>
            <button type="button" className="close" onClick={this.close}>
              x
            </button>
            <p>{text}</p>
          </StyledDiv>
        </PageWrapper>
      );
    }
    return null;
  }
}

export default FlashMessage;
