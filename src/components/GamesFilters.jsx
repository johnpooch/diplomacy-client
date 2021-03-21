import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  faChevronDown,
  faChevronUp,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

import Select from './Select';
import useForm from '../hooks/useForm';
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

  const [values, handleChange] = useForm({
    search: '',
    variant: '',
    status: '',
    numPlayers: '',
    nationChoiceMode: '',
    orderDeadline: '',
    retreatDeadline: '',
    buildDeadline: '',
  });
  const [open, setOpen] = useState(false);

  const filter = (e) => {
    e.preventDefault();
    listGames(values);
  };

  const { error } = choices;

  const filters = error ? (
    <ComponentError error={error} />
  ) : (
    <Form onSubmit={filter}>
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
            value={values.search}
            onChange={handleChange}
            placeholder="Search by game name"
          />
        </label>
        <label htmlFor="numPlayers">
          <LabelText>Players</LabelText>
          <input
            id="numPlayers"
            name="numPlayers"
            type="number"
            value={values.numPlayers}
            onChange={handleChange}
            min={1}
            max={7}
          />
        </label>
        <Select
          name="variant"
          label="Variant"
          value={values.variant}
          onChange={handleChange}
          options={choices.variants}
        />
        <Select
          name="status"
          label="Status"
          value={values.status}
          onChange={handleChange}
          options={choices.gameStatuses}
        />
        <Select
          name="nationChoiceMode"
          label="Nation choice mode"
          value={values.nationChoiceMode}
          onChange={handleChange}
          options={choices.nationChoiceModes}
        />
        <Select
          name="orderDeadline"
          label="Order deadline"
          value={values.orderDeadline}
          onChange={handleChange}
          options={choices.deadlines}
        />
        <Select
          name="retreatDeadline"
          label="Retreat deadline"
          value={values.retreatDeadline}
          onChange={handleChange}
          options={choices.deadlines}
        />
        <Select
          name="buildDeadline"
          label="Build deadline"
          value={values.buildDeadline}
          onChange={handleChange}
          options={choices.deadlines}
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
