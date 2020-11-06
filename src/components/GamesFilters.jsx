/** @jsx jsx */
import {
  faChevronDown,
  faChevronUp,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { jsx } from '@emotion/core';
import { useState } from 'react';
import styled from '@emotion/styled';

import Select from './Select';
import useForm from '../hooks/useForm';
import { Button, SecondaryButton } from './Button';
import Form, { FormLabel } from './Form';
import { GridTemplate } from '../layout';
import { variables } from '../variables';

const StyledGamesFilters = styled.div`
  border-bottom: ${variables.sizes.border}px solid ${variables.colors.darkgray};
  margin-bottom: ${variables.spacing[5]}px;
  padding-bottom: ${variables.spacing[5]}px;
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
      css={{ display: 'block' }}
    >
      <FontAwesomeIcon
        icon={faSearch}
        css={{ marginRight: `${variables.spacing[1]}px` }}
      />
      <FontAwesomeIcon icon={open ? faChevronUp : faChevronDown} />
    </SecondaryButton>
  );

  const filters = (
    <Form onSubmit={filter}>
      <GridTemplate
        templateColumns="2fr 1fr 1fr 1fr"
        css={{ marginTop: `${variables.spacing[4]}px` }}
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
