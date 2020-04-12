import React from 'react';
import PropTypes from 'prop-types';

import './Map.scss';
import ScrollableSVG from 'Components/ScrollableSVG/ScrollableSVG.jsx';
import Territory from 'Components/Territory/Territory.jsx';
import mapData from 'JSON/map.json';
import * as Utils from 'Utilities/utils';

class Map extends React.Component {
  getCurrentTurn() {
    const { turns } = this.props.game;

    for (let i = 0; i < turns.length; i++) {
      if (turns[i].current_turn === true) {
        return turns[i];
      }
    }

    return undefined;
  }

  renderTerritories() {
    const turn = this.getCurrentTurn();
    if (!turn) return;

    const states = turn.territory_states;
    const { variant } = this.props.game;

    const territories = [];
    variant.territories.forEach((territory) => {
      const { id } = territory;
      const state = Utils.getObjectByKey(id, states, 'territory');
      const controller = state ? state.controlled_by : undefined;

      territories.push(
        <Territory
          key={id}
          id={id}
          name={territory.name}
          type={territory.type}
          supply_center={territory.supply_center}
          controlled_by={controller}
        />
      );
    });
    return territories;
  }

  render() {
    return (
      <ScrollableSVG
        className="map"
        viewBoxWidth={mapData.viewBoxWidth}
        viewBoxHeight={mapData.viewBoxHeight}
      >
        {this.renderTerritories()}
      </ScrollableSVG>
    );
  }
}

Map.propTypes = {
  game: PropTypes.object,
};

export default Map;