import React from 'react';

import { getOptions } from '../utils';

function getJSName(name) {
  const nameMappings = {
    num_players: 'numPlayers',
    order_deadline: 'orderDeadline',
    retreat_deadline: 'retreatDeadline',
    build_deadline: 'retreatDeadline',
    nation_choice_mode: 'nationChoiceMode',
  };
  if (name in nameMappings) {
    return nameMappings[name];
  }
  return name;
}

class GamesFilters extends React.Component {
  static handleSubmit(event) {
    event.preventDefault();
    return false;
  }

  constructor(props) {
    super(props);
    this.state = {
      advancedOpen: false,
      search: '',
      variant: '',
      status: '',
      numPlayers: '',
      nationChoiceMode: '',
      orderDeadline: '',
      retreatDeadline: '',
      buildDeadline: '',
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
    const name = getJSName(event.target.name);
    const { value } = event.target;
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
      numPlayers,
      nationChoiceMode,
      orderDeadline,
      retreatDeadline,
      buildDeadline,
    } = this.state;
    callback({
      search,
      variant,
      status,
      num_players: numPlayers,
      nation_choice_mode: nationChoiceMode,
      order_deadline: orderDeadline,
      retreat_deadline: retreatDeadline,
      build_deadline: buildDeadline,
    });
  }

  renderEmptyOption() {
    return <option value="">{this.emptyOptionString}</option>;
  }

  renderSearchField() {
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

  renderVariantField() {
    const { variant } = this.state;
    const { choices } = this.props;
    const { variants } = choices;
    const variantOptions = getOptions(variants);
    return (
      <label htmlFor="variant">
        Variant
        <select
          id="variant"
          name="variant"
          value={variant}
          onChange={this.change.bind(this)}
        >
          {this.renderEmptyOption()}
          {variantOptions}
        </select>
      </label>
    );
  }

  renderStatusField() {
    const { status } = this.state;
    const { choices } = this.props;
    const { game_statuses: gameStatuses } = choices;
    const statusOptions = getOptions(gameStatuses);
    return (
      <label htmlFor="status">
        Status
        <select
          id="status"
          name="status"
          value={status}
          onChange={this.change.bind(this)}
        >
          {this.renderEmptyOption()}
          {statusOptions}
        </select>
      </label>
    );
  }

  renderNumPlayersField() {
    const { numPlayers } = this.state;
    return (
      <label htmlFor="num_players">
        Num players
        <input
          id="num_players"
          name="num_players"
          type="number"
          value={numPlayers}
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
        {this.renderSearchField()}
        {this.renderVariantField()}
        {this.renderStatusField()}
        {this.renderNumPlayersField()}
      </div>
    );
  }

  renderNationChoiceModeField() {
    const { choices } = this.props;
    const { nationChoiceMode } = this.state;
    const { nation_choice_modes: nationChoiceModes } = choices;
    const nationChoiceModeOptions = getOptions(nationChoiceModes);
    return (
      <label htmlFor="nation_choice_mode">
        Nation Choice Mode
        <select
          id="nation_choice_mode"
          name="nation_choice_mode"
          value={nationChoiceMode}
          onChange={this.change.bind(this)}
        >
          {this.renderEmptyOption()}
          {nationChoiceModeOptions}
        </select>
      </label>
    );
  }

  renderDeadlineField(val, id, label) {
    const { choices } = this.props;
    const { deadlines } = choices;
    const frequencyOptions = getOptions(deadlines);
    return (
      <label htmlFor={id}>
        {label}
        <select id={id} name={id} value={val} onChange={this.change.bind(this)}>
          {frequencyOptions}
        </select>
      </label>
    );
  }

  renderAdvancedFilterFields() {
    const { advancedOpen } = this.state;
    if (!advancedOpen) return null;

    const { orderDeadline, retreatDeadline, buildDeadline } = this.state;
    return (
      <div>
        {this.renderNationChoiceModeField()}
        {this.renderDeadlineField(
          orderDeadline,
          'order_deadline',
          'Order Deadline'
        )}
        {this.renderDeadlineField(
          retreatDeadline,
          'retreat_deadline',
          'Retreat Deadline'
        )}
        {this.renderDeadlineField(
          buildDeadline,
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
      <form onSubmit={this.handleSubmit}>
        {this.renderFilterFields()}
        {this.renderAdvancedToggleButton()}
        {this.renderAdvancedFilterFields()}
      </form>
    );
  }
}

export default GamesFilters;
