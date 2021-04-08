import {
  faChevronDown,
  faChevronUp,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import styled from 'styled-components';

import Select from './Select';
import ComponentError from './ComponentError';
import { Button, SecondaryButton } from './Button';
import Form, { LabelText } from './Form';
import { Grid } from '../layout';
import { gameActions } from '../store/games';
import { choiceActions } from '../store/choices';

const StyledGamesFilters = styled.div`
  border-bottom: ${(p) => p.theme.borders[0]};
  margin-bottom: ${(p) => p.theme.space[5]};
  padding-bottom: ${(p) => p.theme.space[5]};
  width: 100%;
`;

const StyledToggleButton = styled(SecondaryButton)`
  display: flex;
  gap: ${(p) => p.theme.space[2]};
`;

const StyledSearchButton = styled(Button)`
  margin-top: auto;
`;

const GamesFilters = ({ choices, listGames, getChoices }) => {
  useEffect(() => (choices ? null : getChoices()));

  const { register, handleSubmit } = useForm();
  const [open, setOpen] = useState(false);

  const onSubmit = (data) => {
    listGames(data);
  };

  const { error } = choices;

  const filters = error ? (
    <ComponentError error={error} />
  ) : (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Grid
        columns={4}
        css={`
          margin-top: ${(p) => p.theme.space[4]};
        `}
      >
        <label
          htmlFor="search"
          css={`
            grid-column: span 2;
          `}
        >
          <LabelText>Search</LabelText>
          <input
            id="search"
            name="search"
            type="search"
            placeholder="Search by game name"
            ref={register}
          />
        </label>
        <label htmlFor="numPlayers">
          <LabelText>Players</LabelText>
          <input
            id="numPlayers"
            name="numPlayers"
            type="number"
            ref={register}
            min={1}
            max={7}
          />
        </label>
        <Select
          name="variant"
          label="Variant"
          options={choices.variants}
          ref={register}
        />
        <Select
          name="status"
          label="Status"
          options={choices.gameStatuses}
          ref={register}
        />
        <Select
          name="nationChoiceMode"
          label="Nation choice mode"
          options={choices.nationChoiceModes}
          ref={register}
        />
        <Select
          name="orderDeadline"
          label="Order deadline"
          options={choices.deadlines}
          ref={register}
        />
        <Select
          name="retreatDeadline"
          label="Retreat deadline"
          options={choices.deadlines}
          ref={register}
        />
        <Select
          name="buildDeadline"
          label="Build deadline"
          options={choices.deadlines}
          ref={register}
        />
        <StyledSearchButton type="submit">Search</StyledSearchButton>
      </Grid>
    </Form>
  );

  return (
    <StyledGamesFilters>
      <StyledToggleButton type="button" onClick={() => setOpen(!open)}>
        <FontAwesomeIcon icon={faSearch} />
        <FontAwesomeIcon icon={open ? faChevronUp : faChevronDown} />
      </StyledToggleButton>
      {open ? filters : null}
    </StyledGamesFilters>
  );
};

const mapStateToProps = (state) => {
  const { choices } = state;
  return { choices };
};

const mapDispatchToProps = (dispatch) => {
  const getChoices = () => dispatch(choiceActions.getGameFilterChoices({}));
  const listGames = (token, queryParams) =>
    dispatch(gameActions.listGames({ token, queryParams }));
  return { getChoices, listGames };
};

export default connect(mapStateToProps, mapDispatchToProps)(GamesFilters);
