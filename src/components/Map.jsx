import React from 'react';
import styled from '@emotion/styled';

import ScrollableSVG from './ScrollableSVG';
import Territory from './Territory';
import mapData from '../map.json';
import * as Utils from '../utils';
import { colors, sizes } from '../variables';

export const StyledDiv = styled.div`
  position: absolute;
  width: 100vw;
  height: calc(100vh - ${sizes.navHeight}px);
  background: ${colors.sea};

  svg {
    width: 100%;
    height: 100%;
  }
`;

class Map extends React.Component {
  getCurrentTurn() {
    const { game } = this.props;
    const { turns } = game;

    for (let i = 0; i < turns.length; i += 1) {
      if (turns[i].current_turn === true) {
        return turns[i];
      }
    }

    return undefined;
  }

  renderTerritories() {
    const turn = this.getCurrentTurn();
    if (!turn) return null;

    const states = turn.territory_states;
    const { game } = this.props;
    const { variant } = game;

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
          supplyCenter={territory.supply_center}
          controlledBy={controller}
        />
      );
    });

    return territories;
  }

  render() {
    return (
      <StyledDiv>
        <ScrollableSVG
          viewBoxWidth={mapData.viewBoxWidth}
          viewBoxHeight={mapData.viewBoxHeight}
        >
          {this.renderTerritories()}
        </ScrollableSVG>
      </StyledDiv>
    );
  }
}

export default Map;
