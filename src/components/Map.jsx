import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';

import ScrollableSVG from './ScrollableSVG';
import Territory from './Territory';
import mapData from '../map.json';
import * as Utils from '../utils';
import { colors, sizes } from '../variables';

export const MapStyle = css`
  position: absolute;
  width: 100vw;
  height: calc(100vh - ${sizes.navHeight} + ${sizes.p});
  background: ${colors.sea};
`;

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
        viewBoxWidth={mapData.viewBoxWidth}
        viewBoxHeight={mapData.viewBoxHeight}
        css={MapStyle}
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
