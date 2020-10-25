/* eslint camelcase: [2, { "allow": ["num_players", "nation_choice_mode", "order_deadline", "retreat_deadline", "build_deadline", "game_statuses"] }] */
import React, { useState } from 'react';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronDown,
  faSearch,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';

import {
  GenericForm,
  FormLabelText,
  Button,
  TertiaryButton,
  Grid,
  GridTemplate,
} from '../styles';
import { colors, sizes, spacing } from '../variables';
import useForm from '../hooks/useForm';
import Select from './Select';

const StyledButton = styled(TertiaryButton)`
  margin: ${spacing[2]}px 0px;
`;

const StyledForm = styled(GenericForm)`
  margin-bottom: ${spacing[6]}px;
  border-bottom: ${sizes.border}px solid ${colors.border};
  padding: ${spacing[4]}px;
  background: ${colors.white};
`;

const StyledDiv = styled.div`
  margin-top: ${spacing[4]}px;
`;

const StyledClosedSearch = styled.button`
  cursor: pointer;
  background: ${colors.white};
  border: ${sizes.border / 2}px solid ${colors.border};
  padding: 0.5rem 1rem;
  margin-bottom: 1rem;
  svg {
    &:not(:last-of-type) {
      margin-right: ${spacing[1]}px;
    }
  }
`;

const StyledClose = styled.div`
  text-align: right;
  padding-bottom: ${spacing[2]}px;
  button {
    cursor: pointer;
    background: ${colors.white};
    border: none;
  }
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
  const [advancedOpen, setAdvancedOpen] = useState(false);

  const advancedOpenText = `${
    advancedOpen ? '− Hide' : '+ Show'
  } advanced filters`;

  const filter = (e) => {
    e.preventDefault();
    callback(values);
  };

  if (!choices) return null;
  if (!open) {
    return (
      <StyledClosedSearch type="button" onClick={() => setOpen(!open)}>
        <FontAwesomeIcon icon={faSearch} />
        <FontAwesomeIcon icon={faChevronDown} />
      </StyledClosedSearch>
    );
  }

  const advancedOptions = (
    <StyledDiv>
      <Grid columns={4}>
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
      </Grid>
    </StyledDiv>
  );

  return (
    <div>
      <StyledForm onSubmit={filter}>
        <StyledClose>
          <button type="button" onClick={() => setOpen(!open)}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </StyledClose>
        <GridTemplate templateColumns="3fr 1fr 2fr 2fr">
          <label htmlFor="search">
            <FormLabelText>Search</FormLabelText>
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
            <FormLabelText>Players</FormLabelText>
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
        </GridTemplate>
        {advancedOpen ? advancedOptions : null}
        <div>
          <StyledButton
            type="button"
            onClick={() => {
              setAdvancedOpen(!advancedOpen);
            }}
          >
            {advancedOpenText}
          </StyledButton>
        </div>

        <div>
          <Button type="submit">Search</Button>
        </div>
      </StyledForm>
    </div>
  );
};

export default GameFilters;
