import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faTimes } from '@fortawesome/free-solid-svg-icons';

function getJSName(name) {
  const nameMappings = {
    num_players: 'numPlayers',
  };
  if (name in nameMappings) {
    return nameMappings[name];
  }
  return name;
}

function getOptions(choices) {
  return choices.map((c) => {
    return (
      <option key={c[0]} value={c[0]}>
        {c[1]}
      </option>
    );
  });
}

class FilterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      search: '',
      variant: '',
      status: '',
      numPlayers: '',
      nationChoiceMode: '',
      orderDeadline: '',
      retreatDeadline: '',
      buildDeadline: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.expand = this.expand.bind(this);
    this.close = this.close.bind(this);
  }

  expand() {
    console.log('HERE');
    this.setState({
      open: true,
    });
  }

  close() {
    this.setState({
      open: false,
    });
  }

  handleChange(event) {
    const name = getJSName(event.target.name);
    this.setState({
      [name]: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { search, variant, status } = this.state;
    console.log(`
      Search: ${search}
      Variant: ${variant}
      Status: ${status}
    `);
    console.log(this);

    event.preventDefault();
  }

  render() {
    const { choices } = this.props;
    const {
      deadlines,
      game_statuses: gameStatuses,
      nation_choice_modes: nationChoiceModes,
      variants,
    } = choices;
    const {
      open,
      search,
      variant,
      status,
      numPlayers,
      nationChoiceMode,
      orderDeadline,
      retreatDeadline,
      buildDeadline,
    } = this.state;
    const variantOptions = getOptions(variants);
    const statusOptions = getOptions(gameStatuses);
    const nationChoiceModeOptions = getOptions(nationChoiceModes);
    const frequencyOptions = getOptions(deadlines);
    if (open) {
      return (
        <div>
          <form className="game-filter-form" onSubmit={this.handleSubmit}>
            <div className="form-row search-row">
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
                <button
                  className="filter-open-control"
                  type="button"
                  onClick={this.close}
                >
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </label>
            </div>

            <div className="form-row filter-options-row">
              <label htmlFor="variant">
                Variant
                <select
                  id="variant"
                  name="variant"
                  value={variant}
                  onChange={this.handleChange}
                  placeholder="Choose..."
                >
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
                  placeholder="Choose..."
                >
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

            <hr />
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
                  <option value="">Select...</option>
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
                  <option value="">Select...</option>
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
                  <option value="">Select...</option>
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
                  <option value="">Select...</option>
                  {frequencyOptions}
                </select>
              </label>
            </div>

            <hr />
          </form>
        </div>
      );
    }
    return (
      <div>
        <form className="game-filter-form" onSubmit={this.handleSubmit}>
          <div className="form-row search-row">
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
              <button
                className="filter-open-control"
                type="button"
                onClick={this.expand}
              >
                <FontAwesomeIcon icon={faChevronDown} />
              </button>
            </label>
          </div>
        </form>
      </div>
    );
  }
}

export default FilterForm;
