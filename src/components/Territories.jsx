import React from 'react';

import Territory from './Territory';

const Territories = (props) => {
  const { getCallbacks, order, hovering, panning, territories } = props;
  const elements = [];
  territories.forEach((territory) => {
    const { id, territory_map_data_id } = territory;
    const callbacks = getCallbacks(id);
    elements.push(
      <Territory
        callbacks={callbacks}
        key={territory_map_data_id}
        // If hovering is null do not highlight non-playable
        // territories
        hovering={hovering === id && id}
        order={order}
        panning={panning}
        territory={territory}
      />
    );
  });
  return <g transform="translate(-195, -170)">{elements}</g>;
};

export default Territories;
