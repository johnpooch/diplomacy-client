/* eslint camelcase: [2, { "allow": ["controlled_by", "territory_map_data_id"] }] */
import React from 'react';
import { Path, Group } from 'react-konva';
import { darken, lighten } from 'polished';

import { variables } from '../variables';

const STROKEWIDTH = 2;

const Territory = ({ territory, isHovering }) => {
  const { controlled_by, name, path, playable, type, id } = territory;

  const getFill = () => {
    if (controlled_by in variables.colors.nations)
      return variables.colors.nations[controlled_by];

    if (playable === true) {
      return type === 'sea' ? variables.colors.sea : variables.colors.land;
    }

    return type === 'sea'
      ? darken(0.2, variables.colors.sea)
      : lighten(0.1, variables.colors.base);
  };

  const getStroke = () => {
    if (isHovering) return variables.colors.white;
    return darken(0.2, getFill());
  };

  return (
    <Path
      id={id}
      name={name}
      data={path}
      fill={getFill()}
      stroke={getStroke()}
      strokeWidth={STROKEWIDTH}
      hitStrokeWidth={0}
      shadowForStrokeEnabled={false}
    />
  );
};

const Territories = ({ territories, hoverTarget }) => {
  return (
    <Group>
      {territories.map((territory) => {
        return (
          <Territory
            key={territory.territory_map_data_id}
            territory={territory}
            isHovering={hoverTarget !== null && territory.id === hoverTarget}
          />
        );
      })}
    </Group>
  );
};

export default Territories;
