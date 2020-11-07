/* eslint camelcase: [2, { "allow": ["controlled_by", "territory_map_data_id"] }] */

import React, { useEffect, useState } from 'react';
import { Path, Group } from 'react-konva';
import { darken } from 'polished';

import stripes from '../img/stripes.svg';
import { variables } from '../variables';

const FILLPATTERNSCALE = 0.15;
const FILLPATTERNOPACITY = 0.1;
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
          fillPatternScale={{ x: FILLPATTERNSCALE, y: FILLPATTERNSCALE }}
          listening={false}
          opacity={FILLPATTERNOPACITY}
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
