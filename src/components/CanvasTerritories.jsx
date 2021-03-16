/** @jsx jsx */
import { connect } from 'react-redux';
import { jsx } from '@emotion/core';
import { Group } from 'react-konva';
import { useEffect, useState } from 'react';

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
            key={t.id}
            hoverId={hoverId}
            stripesImage={stripesImage}
            id={t.id}
            turnId={turn.id}
          />
        );
      })}
    </Group>
  );
};

export default connect(null, null)(Territories);
