import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';

import { dateDisplayFormat } from '../utils';
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

class BrowseGame extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { createdAt, id, name, status } = this.props;
    const date = new Date(createdAt);
    const dateString = date.toLocaleDateString('en-GB', dateDisplayFormat);

    let link = `/game/${id}`;
    if (status === 'pending') {
      link = `/join-game/${id}`;
    }

    return (
      <StyledListItem key={id}>
        <Link to={link}>
          <article>
            <header>
              <span className="name">{name}</span>
              <span className="id">{id}</span>
            </header>
            <section>
              <p className="created-at">
                <span className="label">Created</span>
                <time className="value" dateTime={createdAt}>
                  {dateString}
                </time>
              </p>
            </section>
          </article>
        </Link>
      </StyledListItem>
    );
  }
}

export default connect(null, null)(BrowseGame);
