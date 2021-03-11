/** @jsx jsx */
import { connect } from 'react-redux';
import { jsx } from '@emotion/core';
import { Group } from 'react-konva';
import { useEffect, useState } from 'react';

import Territory from './CanvasTerritory';
import stripes from '../img/stripes.svg';

const Territories = ({ territories, hoverId, turnId }) => {
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
            isHovering={hoverId !== null && territory.id === hoverId}
            stripesImage={stripesImage}
            id={territory.territoryMapDataId}
            turnId={turnId}
          />
        );
      })}
    </Group>
  );
};

export default connect(null, null)(Territories);
