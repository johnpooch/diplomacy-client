import React from 'react';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import { PageWrapper, IconButton } from '../styles';
import { colorMap, spacing, fontSizes } from '../variables';

const StyledWrapper = styled(PageWrapper)`
  padding-top: 0;
  padding-bottom: 0;
`;

const StyledDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  width: 100%;
  color: ${(props) => colorMap[props.type].text};
  background-color: ${(props) => colorMap[props.type].background};
  font-size: ${fontSizes.sans[2]}px;

  p {
    padding: ${spacing[2]}px;
  }

  ${IconButton} {
    color: ${(props) => colorMap[props.type].text};

    &:hover {
      color: white;
      background-color: ${(props) => colorMap[props.type].text};
    }
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
        <StyledWrapper>
          <StyledDiv type={type}>
            <p>{text}</p>
            <IconButton type="button" className="close" onClick={this.close}>
              <FontAwesomeIcon icon={faTimes} />
            </IconButton>
          </StyledDiv>
        </StyledWrapper>
      );
    }
    return null;
  }
}

export default FlashMessage;
