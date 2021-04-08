import React from 'react';
import styled, { useTheme } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Section from './Section';

const StyledStatus = styled.div`
  display: grid;
  grid-gap: ${(p) => p.theme.space[1]};
  grid-template-columns: 20px auto;
  align-items: center;
`;

const StatusSection = ({ userNation }) => {
  const { numSupplyCenters } = userNation;
  const theme = useTheme();

  const Status = ({ count, label, type }) => {
    return (
      <StyledStatus>
        <FontAwesomeIcon className="icon" icon={theme.icons[type]} />{' '}
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
