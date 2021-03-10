import React, { useState } from 'react';
import {
  faChevronDown,
  faChevronUp,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

import Select from './Select';
import useForm from '../hooks/useForm';
import { Button, SecondaryButton } from './Button';
import Form, { FormLabel } from './Form';
import { GridTemplate } from '../layout';

const StyledGamesFilters = styled.div`
  border-bottom: ${(p) => p.theme.borders[0]};
  margin-bottom: ${(p) => p.theme.space[5]};
  padding-bottom: ${(p) => p.theme.space[5]};
  width: 100%;
`;

const GamesFilters = ({ callback, choices }) => {
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
    callback(values);
  };

  if (!choices) return null;

  const toggleButton = (
    <SecondaryButton
      type="button"
      onClick={() => setOpen(!open)}
      css={`
        display: block;
      `}
    >
      <FontAwesomeIcon
        icon={faSearch}
        css={`
          margin-right: ${(p) => p.theme.spaces[1]};
        `}
      />

      <FontAwesomeIcon icon={open ? faChevronUp : faChevronDown} />
    </SecondaryButton>
  );

  const filters = (
    <Form onSubmit={filter}>
      <GridTemplate
        templateColumns="2fr 1fr 1fr 1fr"
        css={`
          margin-top: ${(p) => p.theme.spaces[4]};
        `}
      >
        <label htmlFor="search">
          <FormLabel>Search</FormLabel>
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
          <FormLabel>Players</FormLabel>
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
        <Button type="submit">Search</Button>
      </GridTemplate>
    </Form>
  );

  return (
    <StyledGamesFilters>
      {toggleButton}
      {open ? filters : null}
    </StyledGamesFilters>
  );
};

export default GamesFilters;
