/* eslint camelcase: [2, { "allow": ["num_players", "nation_choice_mode", "order_deadline", "retreat_deadline", "build_deadline", "game_statuses"] }] */
import React from 'react';
import styled from '@emotion/styled';

import {
  GenericForm,
  FormLabelText,
  TertiaryButton,
  Grid,
  GridTemplate,
} from '../styles';
import { getOptions } from '../utils';
import { colors, sizes, spacing } from '../variables';

const StyledButton = styled(TertiaryButton)`
  margin-bottom: ${spacing[3]}px;
`;

const StyledForm = styled(GenericForm)`
  margin-bottom: ${spacing[6]}px;
  border-bottom: ${sizes.border}px solid ${colors.darkgray};
  padding: ${spacing[4]}px;
  background: ${colors.gray};
`;

const StyledDiv = styled.div`
  margin-top: ${spacing[4]}px;
`;

class FilterForm extends React.Component {
  constructor(props) {
    super(props);

    const filters = {
      search: '',
      variant: '',
      status: '',
      num_players: '',
      nation_choice_mode: '',
      order_deadline: '',
      retreat_deadline: '',
      build_deadline: '',
    };

    this.state = {
      advancedOpen: false,
      filters,
    };

    this.emptyOptionString = '-------';

    this.changeFilter = this.changeFilter.bind(this);
    this.clickAdvancedToggleButton = this.clickAdvancedToggleButton.bind(this);
  }

  changeFilter(event) {
    const { name, value } = event.target;
    const { filters } = this.state;
    filters[name] = value;
    this.setState({ filters });
    this.filter();
  }

  filter() {
    const { callback } = this.props;
    const { filters } = this.state;
    callback(filters);
  }

  clickAdvancedToggleButton() {
    const { advancedOpen } = this.state;
    this.setState({
      advancedOpen: !advancedOpen,
    });
  }

  renderEmptyOption() {
    return <option value="">{this.emptyOptionString}</option>;
  }

  renderSelectFilter(val, id, label, options) {
    return (
      <label htmlFor={id}>
        <FormLabelText>{label}</FormLabelText>
        <select id={id} name={id} value={val} onChange={this.changeFilter}>
          {this.renderEmptyOption()}
          {options}
        </select>
      </label>
    );
  }

  renderSearchFilter() {
    const { filters } = this.state;
    const { search } = filters;
    return (
      <label htmlFor="search">
        <FormLabelText>Search</FormLabelText>
        <input
          id="search"
          className="search"
          name="search"
          type="search"
          value={search}
          onChange={this.changeFilter}
          placeholder="Enter search here"
        />
      </label>
    );
  }

  renderVariantFilter() {
    const { filters } = this.state;
    const { variant } = filters;
    const { choices } = this.props;
    const { variants } = choices;
    const options = getOptions(variants);
    return this.renderSelectFilter(variant, 'variant', 'Variant', options);
  }

  renderStatusFilter() {
    const { filters } = this.state;
    const { status } = filters;
    const { choices } = this.props;
    const { game_statuses } = choices;
    const options = getOptions(game_statuses);
    return this.renderSelectFilter(status, 'status', 'Status', options);
  }

  renderNumPlayersFilter() {
    const { filters } = this.state;
    const { num_players } = filters;
    return (
      <label htmlFor="num_players">
        <FormLabelText>Players</FormLabelText>
        <input
          id="num_players"
          name="num_players"
          type="number"
          value={num_players}
          onChange={this.changeFilter}
          min={1}
          max={7}
        />
      </label>
    );
  }

  renderFilterFields() {
    return (
      <GridTemplate templateColumns="3fr 1fr 2fr 2fr">
        {this.renderSearchFilter()}
        {this.renderNumPlayersFilter()}
        {this.renderVariantFilter()}
        {this.renderStatusFilter()}
      </GridTemplate>
    );
  }

  renderNationChoiceModeFilter() {
    const { filters } = this.state;
    const { nation_choice_mode } = filters;
    const { choices } = this.props;
    const { nation_choice_modes } = choices;
    const options = getOptions(nation_choice_modes);
    return this.renderSelectFilter(
      nation_choice_mode,
      'nation_choice_mode',
      'Nation choice mode',
      options
    );
  }

  renderDeadlineFilter(val, id, label) {
    const { choices } = this.props;
    const { deadlines } = choices;
    const options = getOptions(deadlines);
    return this.renderSelectFilter(val, id, label, options);
  }

  renderAdvancedFilterFields() {
    const { advancedOpen } = this.state;
    if (!advancedOpen) return null;

    const { order_deadline, retreat_deadline, build_deadline } = this.state;

    return (
      <StyledDiv>
        <Grid columns={4}>
          {this.renderNationChoiceModeFilter()}
          {this.renderDeadlineFilter(
            order_deadline,
            'order_deadline',
            'Order deadline'
          )}
          {this.renderDeadlineFilter(
            retreat_deadline,
            'retreat_deadline',
            'Retreat deadline'
          )}
          {this.renderDeadlineFilter(
            build_deadline,
            'build_deadline',
            'Build deadline'
          )}
        </Grid>
      </StyledDiv>
    );
  }

  renderAdvancedToggleButton() {
    const { advancedOpen } = this.state;
    const text = `${advancedOpen ? '− Hide' : '+ Show'} advanced filters`;
    return (
      <StyledButton type="button" onClick={this.clickAdvancedToggleButton}>
        {text}
      </StyledButton>
    );
  }

  render() {
    return (
      <div>
        {this.renderAdvancedToggleButton()}
        <StyledForm
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          {this.renderFilterFields()}
          {this.renderAdvancedFilterFields()}
        </StyledForm>
      </div>
    );
  }
}

export default FilterForm;
