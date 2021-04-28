import React, { useEffect, useState } from 'react';
import { Group } from 'react-konva';
import { connect } from 'react-redux';

import territoryData from '../data/standard/territories.json';
import stripes from '../img/stripes.svg';

import Territory from './CanvasTerritory';

const Territories = ({ hoverId, order, turn }) => {
  const [stripesImage, setStripesImage] = useState(null);

  useEffect(() => {
    const image = new window.Image();
    image.onload = () => setStripesImage(image);
    image.src = stripes;
  }, []);

  const selectedTerritories = [order.aux, order.source, order.target];

  return (
    <Group>
      {territoryData.map((t) => {
        const isSelected = selectedTerritories.includes(t.id);
        return (
          <Territory
            key={t.id}
            hoverId={hoverId}
            stripesImage={stripesImage}
            id={t.id}
            isSelected={isSelected}
            turnId={turn.id}
          />
        );
      })}
    </Group>
  );
};

export default connect(null, null)(Territories);
