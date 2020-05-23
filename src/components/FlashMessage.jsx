import React from 'react';
import styled from '@emotion/styled';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { lighten } from 'polished';

import { PageWrapper, IconButton } from '../styles';
import { colors, sizes, spacing, fontSizes } from '../variables';
import alertActions from '../store/actions/alerts';

const StyledWrapper = styled.div`
  background-color: ${(props) => lighten(0.45, colors[props.category])};
  border-bottom: ${sizes.border}px solid
    ${(props) => lighten(0.2, colors[props.category])};
  position: relative;
  z-index: 1;
`;

const StyledDiv = styled(PageWrapper)`
  padding-top: 0;
  padding-bottom: 0;
  display: grid;
  grid-template-columns: 1fr auto;
  grid-column-gap: ${spacing[4]}px;
  align-items: center;
  width: 100%;
  color: ${(props) => colors[props.category]};
  font-size: ${fontSizes.sans[2]}px;

  p {
    padding: ${spacing[2]}px 0;
  }

  ${IconButton} {
    color: ${(props) => colors[props.category]};
    background-color: transparent;
    border-color: transparent;

    &:hover {
      color: white;
      background-color: ${(props) => colors[props.category]};
    }
  }
`;

const FlashMessage = (props) => {
  const { text, category, id, onClick } = props;
  if (!text) return null;
  return (
    <StyledWrapper category={category}>
      <StyledDiv category={category}>
        <p>{text}</p>
        <IconButton
          type="button"
          onClick={() => {
            onClick(id);
          }}
        >
          <FontAwesomeIcon icon={faTimes} />
        </IconButton>
      </StyledDiv>
    </StyledWrapper>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    onClick: (id) => dispatch(alertActions.clear(id)),
  };
};

export default connect(null, mapDispatchToProps)(FlashMessage);
