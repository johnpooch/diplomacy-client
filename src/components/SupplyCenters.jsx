import React from 'react';
import { Star, Group } from 'react-konva';

const SUPPLYCENTERSIZE = 3;

const SupplyCenter = ({ x, y, theme }) => {
  return (
    <Star
      x={x}
      y={y}
      numPoints={5}
      innerRadius={SUPPLYCENTERSIZE * 0.6}
      outerRadius={SUPPLYCENTERSIZE}
      fill={theme.colors.text}
      stroke={theme.colors.text}
      strokeWidth={4}
    />
  );
};

const SupplyCenters = ({ territories }) => {
  return (
    <Group>
      {territories
        .filter((territory) => territory.supplyCenter)
        .map((territory) => {
          const { supplyCenterX, supplyCenterY } = territory;
          return (
            <SupplyCenter
              key={territory.id}
              x={supplyCenterX}
              y={supplyCenterY}
            />
          );
        })}
    </Group>
  );
};

export default SupplyCenters;
