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

const GameSummary = (props) => {
  const { createdAt, id, name, status, userNationState } = props;
  const date = new Date(createdAt);
  const dateString = date.toLocaleDateString('en-GB', dateDisplayFormat);

  const renderPlayingAs = (nationState) => {
    if (!nationState) return null;
    const { nation } = nationState;
    const { name: nationName } = nation;
    return (
      <p className="playing-as">
        <span className="label">Playing as</span>
        <span className="value">{nationName}</span>
      </p>
    );
  };

  return (
    <StyledListItem key={id}>
      <Link to={`/game/${id}`}>
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
            {renderPlayingAs(userNationState)}
          </section>
        </article>
      </Link>
    </StyledListItem>
  );
};

export default connect(null, null)(GameSummary);
