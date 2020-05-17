import React from 'react';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { lighten } from 'polished';

import { PageWrapper, IconButton } from '../styles';
import { colors, spacing, fontSizes } from '../variables';

const StyledWrapper = styled.div`
  background-color: ${(props) => lighten(0.45, colors[props.type])};
`;

const StyledDiv = styled(PageWrapper)`
  padding-top: 0;
  padding-bottom: 0;
  display: grid;
  grid-template-columns: 1fr auto;
  grid-column-gap: ${spacing[4]}px;
  align-items: center;
  width: 100%;
  color: ${(props) => colors[props.type]};
  font-size: ${fontSizes.sans[2]}px;

  p {
    padding: ${spacing[2]}px 0;
  }

  ${IconButton} {
    color: ${(props) => colors[props.type]};

    &:hover {
      color: white;
      background-color: ${(props) => colors[props.type]};
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
        <StyledWrapper type={type}>
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
