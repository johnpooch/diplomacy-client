import React from 'react';
import {
  faCheck,
  faInfoCircle,
  faStar,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from '@emotion/styled';

import { SecondaryButton } from './Button';
import Flag from './Flag';

const StyledLi = styled.li`
  div {
    display: inline-block;
  }
`;

const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-bottom: 1rem;
`;

const StyledDiv = styled.div`
  display: block;
  margin-right: 0.5rem;
  p {
    display: inline-block;
  }
`;

const StyledDrawPanel = styled.div`
  background: white;
  padding: 0.5rem;
`;

const SupplyCenterCount = ({ count }) => {
  return (
    <div>
      <FontAwesomeIcon icon={faStar} />
      {count}
    </div>
  );
};

const SupplyCentersRequirement = ({ drawStrength, numSupplyCentersToWin }) => {
  return (
    <StyledDiv>
      <FontAwesomeIcon icon={faStar} />
      <p>
        {drawStrength}/{numSupplyCentersToWin}
      </p>
    </StyledDiv>
  );
};

const DrawResponse = (props) => {
  const { nation, response, proposedWinner } = props;

  const responseIconMap = {
    accepted: faCheck,
    rejected: faTimes,
  };
  const icon = responseIconMap[response];
  const { id, numSupplyCenters } = nation;

  return (
    <StyledLi key={id}>
      <Flag nation={nation} size="small" />
      {proposedWinner ? <SupplyCenterCount count={numSupplyCenters} /> : null}
      {icon ? <FontAwesomeIcon icon={icon} /> : null}
    </StyledLi>
  );
};

const UserResponseMessage = ({ response }) => {
  if (!response) return null;
  return (
    <p>
      You have <strong>{response}</strong> the draw proposal. The draw proposal
      will only be successful if all surviving nations accept.
    </p>
  );
};

const DrawProposedMessage = ({ date, user }) => {
  return (
    <div style={{ marginBottom: '1rem' }}>
      <strong>{user.username}</strong>
      <div style={{ display: 'inline-block', margin: '0rem .5rem' }}>
        <Flag nation={user.nation} size="small" />
      </div>
      <p style={{ display: 'inline-block', marginRight: '1rem' }}>
        has proposed a draw
      </p>
      <FontAwesomeIcon icon={faInfoCircle} />
      <p style={{ display: 'inline-block', marginRight: '1rem' }}>{date}</p>
    </div>
  );
};

const Draw = ({ data, draw }) => {
  const {
    participants,
    userNation,
    variant,
    setDrawResponse,
    cancelDrawResponse,
    drawResponseLoading,
  } = data;

  const { numSupplyCentersToWin } = variant;
  const {
    id,
    proposedBy,
    proposedByUser,
    nations,
    proposedAt,
    responses,
  } = draw;

  const onClickResponse = (e) => {
    const response = e.target.value;
    setDrawResponse(id, response);
  };

  const onClickCancel = (e) => {
    const response = e.target.value;
    cancelDrawResponse(id, response);
  };

  const user = {
    ...participants.find((u) => u.id === proposedByUser),
    nation: responses.find((r) => r.user === proposedByUser),
  };
  const dateString = new Date(proposedAt).toString();
  const proposedWinnerItems = [];
  const userResponse =
    responses.find((r) => r.nation === userNation.nation) || null;
  const proposedWinnerNations = responses.filter(
    (n) => nations.includes(n.id) || n.id === proposedBy
  );
  let drawStrength = 0;
  // TODO pretty sure could use reduce
  proposedWinnerNations.forEach((n) => {
    drawStrength += n.numSupplyCenters;
  });

  proposedWinnerNations.forEach((n) => {
    proposedWinnerItems.push(
      <DrawResponse
        key={n.id}
        nation={n}
        response={n.response ? n.response.response : null}
        proposedWinner
      />
    );
  });

  const otherNationItems = [];
  const otherNationNations = responses.filter(
    (n) => !nations.includes(n.id) && n.id !== proposedBy
  );
  otherNationNations.forEach((n) => {
    otherNationItems.push(
      <DrawResponse
        key={n.id}
        nation={n}
        response={n.response ? n.response.response : null}
      />
    );
  });

  return (
    <li key={id}>
      <div>
        <DrawProposedMessage user={user} date={dateString} />
        <StyledGrid>
          <div>
            <h5>Proposed winners:</h5>
            <ul>{proposedWinnerItems}</ul>
            <SupplyCentersRequirement
              drawStrength={drawStrength}
              numSupplyCentersToWin={numSupplyCentersToWin}
            />
          </div>
          <div>
            <h5>Other nations:</h5>
            <ul>{otherNationItems}</ul>
          </div>
        </StyledGrid>
      </div>
      {userResponse.response ? (
        <div>
          <UserResponseMessage response={userResponse.response.response} />
          <SecondaryButton
            type="button"
            value={userResponse.response.id}
            onClick={onClickCancel}
            disabled={drawResponseLoading}
          >
            Cancel
          </SecondaryButton>
        </div>
      ) : (
        <div>
          <SecondaryButton
            type="button"
            value="accepted"
            onClick={onClickResponse}
            disabled={drawResponseLoading}
          >
            Accept
          </SecondaryButton>
          <SecondaryButton
            type="button"
            value="rejected"
            onClick={onClickResponse}
            disabled={drawResponseLoading}
          >
            Decline
          </SecondaryButton>
        </div>
      )}
    </li>
  );
};

const Draws = (props) => {
  const { draws, ...drawProps } = props;

  const elements = [];
  draws.forEach((draw) => {
    elements.push(<Draw key={draw.id} draw={draw} data={drawProps} />);
  });
  return (
    <StyledDrawPanel>
      <h2>Draw Proposals ({draws.length})</h2>
      <ul>{elements}</ul>
    </StyledDrawPanel>
  );
};

export default Draws;
