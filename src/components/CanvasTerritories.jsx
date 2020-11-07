/* eslint camelcase: [2, { "allow": ["controlled_by", "territory_map_data_id"] }]
          react/jsx-props-no-spreading: ["error", {"custom": "ignore"}] */

import React, { useEffect, useState } from 'react';
import { Path, Group } from 'react-konva';
import { darken, lighten } from 'polished';

import stripes from '../img/stripes.svg';
// import { useReferredState } from '../utils';
import { variables } from '../variables';

const STROKEWIDTH = 2;

const Territory = ({ territory, isHovering, stripesImage }) => {
  const { controlled_by, name, path, playable, type, id } = territory;

  const getFill = () => {
    if (controlled_by in variables.colors.nations)
      return variables.colors.nations[controlled_by];

    return type === 'sea' ? variables.colors.sea : variables.colors.land;
  };

  const getStroke = () =>
    isHovering ? variables.colors.white : darken(0.2, getFill());

  return (
    <Group>
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
      {playable ? null : (
        <Path
          data={path}
          fillPatternImage={stripesImage}
          fillPatternRotation={45}
          fillPatternScale={{ x: 0.1, y: 0.1 }}
          listening={false}
          opacity={0.1}
        />
      )}
    </Group>
  );
};

const Territories = ({ territories, hoverTarget }) => {
  const [stripesImage, setStripesImage] = useState(null);

  useEffect(() => {
    const image = new window.Image();
    image.onload = () => setStripesImage(image);
    image.src = stripes;
  }, []);

  return (
    <Group>
      {territories.map((territory) => {
        return (
          <Territory
            key={territory.territory_map_data_id}
            territory={territory}
            isHovering={hoverTarget !== null && territory.id === hoverTarget}
            stripesImage={stripesImage}
          />
        );
      })}
    </Group>
  );
};

export default Territories;
