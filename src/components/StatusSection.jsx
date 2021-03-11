import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import React from 'react';
import styled from '@emotion/styled';

import Section from './Section';
import { variables } from '../variables';

const StatusSection = ({ userNation }) => {
  const { numSupplyCenters } = userNation;

  const StyledStatus = styled.div`
    display: grid;
    grid-gap: ${variables.spacing[1]}px;
    grid-template-columns: 20px auto;
    align-items: center;
  `;

  const Status = ({ count, label, type }) => {
    return (
      <StyledStatus>
        <FontAwesomeIcon className="icon" icon={variables.icons[type]} />{' '}
        <span className="text">
          <span className="count">{count}</span>{' '}
          <span className="label">{label}</span>
        </span>
      </StyledStatus>
    );
  };

  return (
    <Section className="status" label="Status">
      <ul>
        <li>
          <Status
            count={numSupplyCenters}
            type="supplyCenter"
            label="supply centers controlled"
          />
        </li>
      </ul>
    </Section>
  );
};
export default StatusSection;
