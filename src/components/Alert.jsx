import React from 'react';
import styled from '@emotion/styled';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { darken, lighten } from 'polished';

import { PageWrapper, BaseButton } from '../styles';
import { colors, sizes, spacing, fontSizes } from '../variables';
import alertActions from '../store/actions/alerts';

const StyledListItem = styled.li`
  background: ${(props) => lighten(0.4, colors[props.category])};
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
`;

const StyledCloseButton = styled(BaseButton)`
  color: ${(props) => colors[props.category]};
  min-width: ${sizes.input}px;
  height: ${sizes.input}px;

  &:hover {
    color: ${(props) => darken(0.2, colors[props.category])};
  }
`;

const Alert = (props) => {
  const { text, category, id, onClick } = props;
  if (!text) return null;
  return (
    <StyledListItem category={category}>
      <StyledDiv category={category}>
        <p>{text}</p>
        <StyledCloseButton
          type="button"
          onClick={() => {
            onClick(id);
          }}
          category={category}
        >
          <FontAwesomeIcon icon={faTimes} />
        </StyledCloseButton>
      </StyledDiv>
    </StyledListItem>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    onClick: (id) => dispatch(alertActions.clear(id)),
  };
};

export default connect(null, mapDispatchToProps)(Alert);
