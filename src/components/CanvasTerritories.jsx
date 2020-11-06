/* eslint camelcase: [2, { "allow": ["controlled_by", "territory_map_data_id"] }] */
import React from 'react';
import { Path, Group } from 'react-konva';
import { darken, lighten } from 'polished';

import { variables } from '../variables';

const Territory = ({ territory }) => {
  const { controlled_by, name, path, playable, type } = territory;

  const getFill = () => {
    if (type === 'sea') return variables.colors.sea;
    if (playable === false) return lighten(0.1, variables.colors.base);
    if (controlled_by in variables.colors.nations)
      return variables.colors.nations[controlled_by];
    return variables.colors.land;
  };

  const getStroke = () => {
    return darken(0.2, getFill());
  };

  return (
    <Path
      name={name}
      data={path}
      fill={getFill()}
      stroke={getStroke()}
      strokeWidth={2}
      hitStrokeWidth={0}
      shadowForStrokeEnabled={false}
    />
  );
};

const Territories = ({ territories }) => {
  const elements = territories.map((territory) => {
    return (
      <Territory key={territory.territory_map_data_id} territory={territory} />
    );
  });
  return <Group>{elements}</Group>;
};

export default Territories;
