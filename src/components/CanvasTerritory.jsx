import React, { useRef } from 'react';
import { connect } from 'react-redux';
import { darken } from 'polished';
import { Path, Star, Group } from 'react-konva';

import { makeSelectTerritoryStateByMapDataId } from '../store/selectors';
import viewBox from '../data/standard/viewBox.json';

const FILLPATTERNSCALE = 0.15;
const FILLPATTERNOPACITY = 0.1;
const STROKEWIDTH = 2;
const SUPPLYCENTERSIZE = 3;

const SupplyCenter = ({ x, y, theme }) => {
  return (
    <Star
      x={x - viewBox.territoriesX}
      y={y - viewBox.territoriesY}
      numPoints={5}
      innerRadius={SUPPLYCENTERSIZE * 0.6}
      outerRadius={SUPPLYCENTERSIZE}
      listening={false}
      fill={theme.colors.text}
      stroke={theme.colors.text}
      strokeWidth={4}
    />
  );
};

const Territory = ({
  territory,
  isHovering,
  isOrderable,
  stripesImage,
  theme,
}) => {
  const {
    controlledBy,
    path,
    playable,
    type,
    id,
    supplyCenter,
    supplyCenterX: scx,
    supplyCenterY: scy,
  } = territory;
  const { colors } = theme;

  const territoryRef = useRef(null);

  const getFill = () => {
    if (controlledBy in colors.nations) return colors.nations[controlledBy];
    return type === 'sea' ? colors.map.sea : colors.map.land;
  };

  const getStroke = () => (isHovering ? colors.muted : darken(0.2, getFill()));

  return (
    <Group>
      <Path
        data={path}
        fill={getFill()}
        ref={territoryRef}
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
      {supplyCenter ? <SupplyCenter x={scx} y={scy} /> : null}
    </Group>
  );
};

const makeMapStateToProps = () => {
  const selectTerritoryStateById = makeSelectTerritoryStateByMapDataId();
  const mapStateToProps = (state, { hoverId, id, turnId }) => {
    const territory = selectTerritoryStateById(state, id, turnId);
    const isHovering = Boolean(hoverId !== null && territory.id === hoverId);
    return { territory, isHovering };
  };
  return mapStateToProps;
};

export default connect(makeMapStateToProps, null)(Territory);
