import React from 'react';

import { getOptions } from '../utils';
import ExpandFormButton from './ExpandFormButton';

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

class FilterForm extends React.Component {
  static handleSubmit(event) {
    event.preventDefault();
    return false;
  }

  constructor(props) {
    super(props);
    this.state = {
      open: false,
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
    this.handleChange = this.handleChange.bind(this);
    this.toggle = this.toggle.bind(this);
    this.toggleAdvanced = this.toggleAdvanced.bind(this);

    this.emptyOptionString = '-------';
    this.emptyOption = <option value="">{this.emptyOptionString}</option>;
  }

  toggle() {
    const { open } = this.state;
    this.setState({
      open: !open,
    });
    if (open) {
      this.setState({
        advancedOpen: false,
      });
    }
  }

  toggleAdvanced() {
    const { advancedOpen } = this.state;
    this.setState({
      advancedOpen: !advancedOpen,
    });
  }

  handleChange(event) {
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

  renderSearchField() {
    const { open, search } = this.state;
    return (
      <div key="search" className="form-row search-row">
        <label htmlFor="search">
          <input
            id="search"
            className="search"
            name="search"
            type="search"
            value={search}
            onChange={this.handleChange}
            placeholder="Search"
          />
          <ExpandFormButton open={open} toggle={this.toggle} />
        </label>
      </div>
    );
  }

  renderFilterFields() {
    const { choices } = this.props;
    const { game_statuses: gameStatuses, variants } = choices;
    const { variant, status, numPlayers } = this.state;
    const variantOptions = getOptions(variants);
    const statusOptions = getOptions(gameStatuses);
    return (
      <div key="filters" className="form-row filter-options-row">
        <label htmlFor="variant">
          Variant
          <select
            id="variant"
            name="variant"
            value={variant}
            onChange={this.handleChange}
            placeholder="Choose..."
          >
            {this.emptyOption}
            {variantOptions}
          </select>
        </label>

        <label htmlFor="status">
          Status
          <select
            id="status"
            name="status"
            value={status}
            onChange={this.handleChange}
          >
            {this.emptyOption}
            {statusOptions}
          </select>
        </label>

        <label htmlFor="num_players">
          Num players
          <input
            id="num_players"
            name="num_players"
            type="number"
            value={numPlayers}
            onChange={this.handleChange}
            min={1}
            max={7}
          />
        </label>
      </div>
    );
  }

  renderAdvancedFilterFields() {
    const { choices } = this.props;
    const { deadlines, nation_choice_modes: nationChoiceModes } = choices;
    const {
      nationChoiceMode,
      orderDeadline,
      retreatDeadline,
      buildDeadline,
    } = this.state;
    const frequencyOptions = getOptions(deadlines);
    const nationChoiceModeOptions = getOptions(nationChoiceModes);
    return (
      <div key="advanced-filters">
        <h4>Advanced filters</h4>
        <div className="advanced-filter-options-row">
          <label htmlFor="nation_choice_mode">
            Nation Choice Mode
            <select
              id="nation_choice_mode"
              name="nation_choice_mode"
              value={nationChoiceMode}
              onChange={this.handleChange}
            >
              {this.emptyOption}
              {nationChoiceModeOptions}
            </select>
          </label>
          <label htmlFor="order_deadline">
            Order Deadline
            <select
              id="order_deadline"
              name="order_deadline"
              value={orderDeadline}
              onChange={this.handleChange}
            >
              {this.emptyOption}
              {frequencyOptions}
            </select>
          </label>
          <label htmlFor="retreat_deadline">
            Retreat Deadline
            <select
              id="retreat_deadline"
              name="retreat_deadline"
              value={retreatDeadline}
              onChange={this.handleChange}
            >
              {frequencyOptions}
            </select>
          </label>
          <label htmlFor="build_deadline">
            Build Deadline
            <select
              id="build_deadline"
              name="build_deadline"
              value={buildDeadline}
              onChange={this.handleChange}
            >
              {frequencyOptions}
            </select>
          </label>
        </div>
        <hr />
      </div>
    );
  }

  renderAdvancedButton() {
    return (
      <div key="advanced-button">
        <button type="button" onClick={this.toggleAdvanced}>
          Advanced filtering options
        </button>
        <hr />
      </div>
    );
  }

  render() {
    const { open, advancedOpen } = this.state;
    const formContents = [this.renderSearchField()];
    if (open) {
      formContents.push(this.renderFilterFields());
      if (advancedOpen) {
        formContents.push(this.renderAdvancedFilterFields());
      } else {
        formContents.push(this.renderAdvancedButton());
      }
    }

    return (
      <div>
        <form className="game-filter-form" onSubmit={this.handleSubmit}>
          {formContents}
        </form>
      </div>
    );
  }
}

export default FilterForm;
