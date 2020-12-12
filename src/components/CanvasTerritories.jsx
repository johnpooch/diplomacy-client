/** @jsx jsx */
import { darken } from 'polished';
import { jsx } from '@emotion/core';
import { Path, Group } from 'react-konva';
import { useEffect, useState } from 'react';

import stripes from '../img/stripes.svg';
import { variables } from '../variables';

const FILLPATTERNSCALE = 0.15;
const FILLPATTERNOPACITY = 0.1;
const STROKEWIDTH = 2;

const Territory = ({ territory, isHovering, isOrderable, stripesImage }) => {
  const { controlledBy, path, playable, type, id } = territory;

  const getFill = () => {
    if (controlledBy in variables.colors.nations)
      return variables.colors.nations[controlledBy];
    return type === 'sea' ? variables.colors.sea : variables.colors.land;
  };

  const getStroke = () =>
    isHovering ? variables.colors.white : darken(0.2, getFill());

  return (
    <Group>
      <Path
        data={path}
        fill={getFill()}
        hitStrokeWidth={0}
        id={id}
        isOrderable={isOrderable}
        shadowForStrokeEnabled={false}
        stroke={getStroke()}
        strokeWidth={STROKEWIDTH}
        territory={territory}
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

const Territories = ({ territories, hoverId, userNation, gameInterface }) => {
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
            key={territory.territoryMapDataId}
            territory={territory}
            isHovering={hoverId !== null && territory.id === hoverId}
            stripesImage={stripesImage}
          />
        );
      })}
    </Group>
  );
};

export default Territories;
