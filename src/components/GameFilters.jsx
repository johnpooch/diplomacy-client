/* eslint camelcase: [2, { "allow": ["num_players", "nation_choice_mode", "order_deadline", "retreat_deadline", "build_deadline", "game_statuses"] }] */
import React from 'react';
import { connect } from 'react-redux';
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
import { getOptions } from '../utils';
import { colors, sizes, spacing } from '../variables';
import { getVariants } from '../store/selectors';

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

class GameFilters extends React.Component {
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
      open: false,
      advancedOpen: false,
      filters,
    };

    this.emptyOptionString = '-------';

    this.filter = this.filter.bind(this);
    this.changeFilter = this.changeFilter.bind(this);
    this.toggleOpen = this.toggleOpen.bind(this);
    this.clickAdvancedToggleButton = this.clickAdvancedToggleButton.bind(this);
  }

  changeFilter(event) {
    const { name, value } = event.target;
    const { filters } = this.state;
    filters[name] = value;
    this.setState({ filters });
  }

  filter(e) {
    e.preventDefault();
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
          name="search"
          type="search"
          value={search}
          onChange={this.changeFilter}
          placeholder="Search by game name"
        />
      </label>
    );
  }

  renderVariantFilter() {
    const { filters } = this.state;
    const { variant } = filters;
    const { variants } = this.props;
    const variantChoices = variants.map((v) => [v.id, v.name]);
    const options = getOptions(variantChoices);
    return this.renderSelectFilter(variant, 'variant', 'Variant', options);
  }

  renderStatusFilter() {
    const { filters } = this.state;
    const { status } = filters;
    const { choices } = this.props;
    const { gameStatuses } = choices;
    const options = getOptions(gameStatuses);
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
    const { nationChoiceModes } = choices;
    const options = getOptions(nationChoiceModes);
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

  renderCloseButton() {
    return (
      <StyledClose>
        <button type="button" onClick={this.toggleOpen}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </StyledClose>
    );
  }

  toggleOpen() {
    const { open } = this.state;
    this.setState({
      open: !open,
    });
  }

  render() {
    const { choices } = this.props;
    const { open } = this.state;
    if (!choices) return null;
    if (!open) {
      return (
        <StyledClosedSearch type="button" onClick={this.toggleOpen}>
          <FontAwesomeIcon icon={faSearch} />
          <FontAwesomeIcon icon={faChevronDown} />
        </StyledClosedSearch>
      );
    }
    return (
      <div>
        <StyledForm onSubmit={this.filter}>
          {this.renderCloseButton()}
          {this.renderFilterFields()}
          {this.renderAdvancedFilterFields()}
          <div>{this.renderAdvancedToggleButton()}</div>
          <div>
            <Button type="submit">Submit</Button>
          </div>
        </StyledForm>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    choices: state.choices,
    variants: getVariants(state),
  };
};

export default connect(mapStateToProps, null)(GameFilters);
