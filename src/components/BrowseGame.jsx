import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';

import { colors, spacing } from '../variables';

const StyledListItem = styled.li`
  &:not(:last-child) {
    margin-bottom: ${spacing[5]}px;
  }

  a {
    text-decoration: none;
    color: ${colors.base};

    &:hover .name {
      text-decoration: underline;
    }
  }

  header {
    margin-bottom: ${spacing[2]}px;
  }

  p {
    margin: 0;

    &:not(:last-child) {
      margin-bottom: ${spacing[2]}px;
    }
  }

  .name {
    font-weight: 600;
  }

  .id {
    margin-left: ${spacing[1]}px;

    &:before {
      content: '#';
    }
  }

  .label {
    font-style: italic;

    &:after {
      content: ': ';
    }
  }
`;
function getDateDisplayFormat() {
  return {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  };
}

class BrowseGame extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { createdAt, createdBy, variant, id, name } = this.props;
    const date = new Date(createdAt);
    const dateString = date.toLocaleDateString('en-GB', getDateDisplayFormat());

    return (
      <StyledListItem key={id}>
        <Link to={`/game/${id}`}>
          <header>
            <span className="name">{name}</span>
            <span className="id">{id}</span>
          </header>
          <main>
            <p className="created-at">
              <span className="label">Created</span>
              <time className="value" dateTime={createdAt}>
                {dateString}
              </time>
            </p>
            <p className="created-by">
              <span className="label">Created by</span>
              <span className="value">{createdBy}</span>
            </p>
            <p className="variant">
              <span className="label">Variant</span>
              <span className="value">{variant.name}</span>
            </p>
          </main>
        </Link>
      </StyledListItem>
    );
  }
}

export default connect(null, null)(BrowseGame);
