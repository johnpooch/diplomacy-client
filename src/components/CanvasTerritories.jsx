import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Group } from 'react-konva';

import Territory from './CanvasTerritory';
import territoryData from '../data/standard/territories.json';
import stripes from '../img/stripes.svg';

const Territories = ({ hoverId, turn }) => {
  const [stripesImage, setStripesImage] = useState(null);

  useEffect(() => {
    const image = new window.Image();
    image.onload = () => setStripesImage(image);
    image.src = stripes;
  }, []);

  return (
    <Group>
      {territoryData.map((t) => {
        return (
          <Territory
            key={t.territoryMapDataId}
            hoverId={hoverId}
            stripesImage={stripesImage}
            id={t.territoryMapDataId}
            turnId={turn.id}
          />
        );
      })}
    </Group>
  );
};

export default connect(null, null)(Territories);
