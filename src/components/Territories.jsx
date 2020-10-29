import React from 'react';

import Territory from './Territory';

const Territories = (props) => {
  const {
    getCallbacks,
    getTerritoryOrderState,
    hovering,
    panning,
    territories,
  } = props;
  const elements = [];
  territories.forEach((territory) => {
    const { id, mapDataId } = territory;
    const callbacks = getCallbacks(id);
    const territoryOrderState = getTerritoryOrderState(id);
    elements.push(
      <Territory
        callbacks={callbacks}
        key={mapDataId}
        // If hovering is null do not highlight non-playable
        // territories
        hovering={hovering === id && id}
        panning={panning}
        territory={territory}
        territoryOrderState={territoryOrderState}
      />
    );
  });
  return <g transform="translate(-195, -170)">{elements}</g>;
};

export default Territories;
