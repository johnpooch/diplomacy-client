import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled, { useTheme } from 'styled-components';

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

const SupplyCenterCount = ({ count }) => {
  const theme = useTheme();
  return (
    <div>
      <FontAwesomeIcon icon={theme.icons.supplyCenter} />
      {count}
    </div>
  );
};

const SupplyCentersRequirement = ({ drawStrength, numSupplyCentersToWin }) => {
  const theme = useTheme();
  return (
    <StyledDiv>
      <FontAwesomeIcon icon={theme.icons.supplyCenter} />
      <p>
        {drawStrength}/{numSupplyCentersToWin}
      </p>
    </StyledDiv>
  );
};

const DrawResponse = (props) => {
  const { nation, response, proposedWinner } = props;
  const theme = useTheme();

  const responseIconMap = {
    accepted: theme.icons.accept,
    rejected: theme.icons.cancel,
  };
  const icon = responseIconMap[response];
  const { id, numSupplyCenters } = nation;

  return (
    <StyledLi key={id}>
      <Flag nation={nation} size={0} />
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

const DrawProposedMessage = ({ user }) => {
  return (
    <div>
      <strong>{user.username}</strong>
      <div>
        <Flag nation={user.nation} size={0} />
      </div>
      <p>has proposed a draw</p>
    </div>
  );
};

const Draw = ({
  draw,
  participants,
  userNation,
  variant,
  setDrawResponse,
  cancelDrawResponse,
  drawResponseLoading,
}) => {
  const { numSupplyCentersToWin } = variant;
  const { id, proposedBy, proposedByUser, nations, responses } = draw;

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
    <div key={id}>
      <div>
        <DrawProposedMessage user={user} />
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
        <div className="actions">
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
            Reject
          </SecondaryButton>
        </div>
      )}
    </div>
  );
};

const StyledDrawsPane = styled.div`
  .text {
    display: block;
    margin: ${(p) => p.theme.space[3]} 0;
  }

  .actions {
    display: grid;
    grid-gap: ${(p) => p.theme.space[2]};
    grid-template-columns: repeat(2, 1fr);
    margin: ${(p) => p.theme.space[3]} 0;
  }
`;

const DrawsPane = ({
  cancelDrawResponse,
  drawResponseLoading,
  draws,
  participants,
  setDrawResponse,
  userNation,
  variant,
}) => {
  const elements = [];
  draws.forEach((draw) =>
    elements.push(
      <div key={draw.id}>
        <Draw
          key={draw.id}
          draw={draw}
          participants={participants}
          userNation={userNation}
          variant={variant}
          setDrawResponse={setDrawResponse}
          cancelDrawResponse={cancelDrawResponse}
          drawResponseLoading={drawResponseLoading}
        />
      </div>
    )
  );
  return (
    <div>
      <p className="heading">
        <span className="text">Draw proposals</span>
        <span className="count">0 / {draws.length}</span>
      </p>
      <StyledDrawsPane>{elements}</StyledDrawsPane>
    </div>
  );
};

export default DrawsPane;
