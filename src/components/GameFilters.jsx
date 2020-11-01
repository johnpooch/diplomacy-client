/** @jsx jsx */
/* eslint camelcase: [2, { "allow": ["num_players", "nation_choice_mode", "order_deadline", "retreat_deadline", "build_deadline", "game_statuses"] }] */
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
import { Form, FormLabel } from './Form';
import { GridTemplate } from '../styles';
import { variables } from '../variables';

const StyledWrapper = styled.div`
  margin-bottom: ${variables.spacing[5]}px;
  padding-bottom: ${variables.spacing[5]}px;
  border-bottom: ${variables.sizes.border}px solid ${variables.colors.darkgray};
`;

const GameFilters = ({ callback, choices }) => {
  const [values, handleChange] = useForm({
    search: '',
    variant: '',
    status: '',
    num_players: '',
    nation_choice_mode: '',
    order_deadline: '',
    retreat_deadline: '',
    build_deadline: '',
  });
  const [open, setOpen] = useState(false);

  const filter = (e) => {
    e.preventDefault();
    callback(values);
  };

  if (!choices) return null;

  const toggleButton = (
    <SecondaryButton type="button" onClick={() => setOpen(!open)}>
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
        <label htmlFor="num_players">
          <FormLabel>Players</FormLabel>
          <input
            id="num_players"
            name="num_players"
            type="number"
            value={values.num_players}
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
          options={choices.game_statuses}
        />
        <Select
          name="nation_choice_mode"
          label="Nation choice mode"
          value={values.nation_choice_mode}
          onChange={handleChange}
          options={choices.nation_choice_modes}
        />
        <Select
          name="order_deadline"
          label="Order deadline"
          value={values.order_deadline}
          onChange={handleChange}
          options={choices.deadlines}
        />
        <Select
          name="retreat_deadline"
          label="Retreat deadline"
          value={values.retreat_deadline}
          onChange={handleChange}
          options={choices.deadlines}
        />
        <Select
          name="build_deadline"
          label="Build deadline"
          value={values.build_deadline}
          onChange={handleChange}
          options={choices.deadlines}
        />
      </GridTemplate>
      <Button type="submit" css={{ marginTop: `${variables.spacing[4]}px` }}>
        Search
      </Button>
    </Form>
  );

  return (
    <StyledWrapper>
      {toggleButton}
      {open ? filters : null}
    </StyledWrapper>
  );
};

export default GameFilters;
