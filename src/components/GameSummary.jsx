import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';

import { dateDisplayFormat } from '../utils';
import { colors, spacing } from '../variables';

const StyledListItem = styled.li`
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
    &:not(:last-of-type) {
      margin-bottom: ${spacing[1]}px;
    }
  }

  .name {
    font-weight: 600;
  }

  .label {
    font-style: italic;

    &:after {
      content: ': ';
    }
  }

  .value {
    text-transform: capitalize;
  }
`;

class GameSummary extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { createdAt, id, name, status } = this.props;
    const date = new Date(createdAt);
    const dateString = date.toLocaleDateString('en-GB', dateDisplayFormat);

    const link = `/game/${id}`;

    return (
      <StyledListItem key={id}>
        <Link to={link}>
          <article>
            <header>
              <span className="name">{name}</span>
            </header>
            <section>
              <p className="created-at">
                <span className="label">Created</span>
                <time className="value" dateTime={createdAt}>
                  {dateString}
                </time>
              </p>
              <p className="status">
                <span className="label">Status</span>
                <span className="value">{status}</span>
              </p>
            </section>
          </article>
        </Link>
      </StyledListItem>
    );
  }
}

export default connect(null, null)(GameSummary);
