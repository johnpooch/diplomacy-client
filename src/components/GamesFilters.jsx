/* eslint camelcase: [2, { "allow": ["num_players", "nation_choice_mode", "order_deadline", "retreat_deadline", "build_deadline", "game_statuses"] }] */
import React from 'react';

import { getOptions } from '../utils';

class GamesFilters extends React.Component {
  constructor(props) {
    super(props);

    // const filters = {
    //   search: '',
    //   variant: '',
    //   status: '',
    //   num_players: '',
    //   nation_choice_mode: '',
    //   order_deadline: '',
    //   retreat_deadline: '',
    //   build_deadline: '',
    // };

    this.state = {
      advancedOpen: false,
      search: '',
      variant: '',
      status: '',
      num_players: '',
      nation_choice_mode: '',
      order_deadline: '',
      retreat_deadline: '',
      build_deadline: '',
      // filters,
    };

    this.emptyOptionString = '-------';
  }

  toggleAdvancedFilters() {
    const { advancedOpen } = this.state;
    this.setState({
      advancedOpen: !advancedOpen,
    });
  }

  change(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value }, () => {
      this.filter();
    });
  }

  filter() {
    const { callback } = this.props;
    // there must be a nicer way to do this
    const {
      search,
      variant,
      status,
      num_players,
      nation_choice_mode,
      order_deadline,
      retreat_deadline,
      build_deadline,
    } = this.state;
    callback({
      search,
      variant,
      status,
      num_players,
      nation_choice_mode,
      order_deadline,
      retreat_deadline,
      build_deadline,
    });
  }

  renderEmptyOption() {
    return <option value="">{this.emptyOptionString}</option>;
  }

  renderSelectFilter(val, id, label, options) {
    return (
      <label htmlFor={id}>
        {label}
        <select id={id} name={id} value={val} onChange={this.change.bind(this)}>
          {this.renderEmptyOption()}
          {options}
        </select>
      </label>
    );
  }

  renderSearchFilter() {
    const { search } = this.state;
    return (
      <label htmlFor="search">
        <input
          id="search"
          className="search"
          name="search"
          type="search"
          value={search}
          onChange={this.change.bind(this)}
          placeholder="Search"
        />
      </label>
    );
  }

  renderVariantFilter() {
    const { variant } = this.state;
    const { choices } = this.props;
    const { variants } = choices;
    const options = getOptions(variants);
    return this.renderSelectFilter(variant, 'variant', 'Variant', options);
  }

  renderStatusFilter() {
    const { status } = this.state;
    const { choices } = this.props;
    const { game_statuses } = choices;
    const options = getOptions(game_statuses);
    return this.renderSelectFilter(status, 'status', 'Variant', options);
  }

  renderNumPlayersFilter() {
    const { num_players } = this.state;
    return (
      <label htmlFor="num_players">
        Number of players
        <input
          id="num_players"
          name="num_players"
          type="number"
          value={num_players}
          onChange={this.change.bind(this)}
          min={1}
          max={7}
        />
      </label>
    );
  }

  renderFilterFields() {
    return (
      <div>
        {this.renderSearchFilter()}
        {this.renderVariantFilter()}
        {this.renderStatusFilter()}
        {this.renderNumPlayersFilter()}
      </div>
    );
  }

  renderNationChoiceModeFilter() {
    const { choices } = this.props;
    const { nation_choice_mode } = this.state;
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
      <div>
        {this.renderNationChoiceModeFilter()}
        {this.renderDeadlineFilter(
          order_deadline,
          'order_deadline',
          'Order Deadline'
        )}
        {this.renderDeadlineFilter(
          retreat_deadline,
          'retreat_deadline',
          'Retreat Deadline'
        )}
        {this.renderDeadlineFilter(
          build_deadline,
          'build_deadline',
          'Build Deadline'
        )}
      </div>
    );
  }

  renderAdvancedToggleButton() {
    const { advancedOpen } = this.state;
    const text = `${advancedOpen ? 'Hide' : 'Show'} advanced filters`;
    return (
      <button type="button" onClick={this.toggleAdvancedFilters.bind(this)}>
        {text}
      </button>
    );
  }

  render() {
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        {this.renderFilterFields()}
        {this.renderAdvancedToggleButton()}
        {this.renderAdvancedFilterFields()}
      </form>
    );
  }
}

export default GamesFilters;
