import React from 'react';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import { PageWrapper } from '../styles';
import { colorMap, spacing, fontSizes } from '../variables';

const StyledDiv = styled.div`
  width: 100%;
  height: max-content;
  color: ${(props) => colorMap[props.type].text};
  background: ${(props) => colorMap[props.type].background};
  font-size: ${fontSizes.sans[2]}px;

  &:not(:last-child) {
    margin-bottom: ${spacing[4]}px;
  }
  .close {
    padding: 1px 5px;
    color: ${(props) => colorMap[props.type].text};
    cursor: pointer;
    border: none;
    float: right;
    margin: 0.5rem;
    background: inherit;
  }
  .close:hover {
    color: white;
    background: ${(props) => colorMap[props.type].text};
    border-radius: 100%;
  }
  p {
    padding: 1rem;
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
              <FontAwesomeIcon icon={faTimes} />
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
