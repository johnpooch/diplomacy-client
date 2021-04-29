import { darken } from 'polished';
import React, { useRef } from 'react';
import { Path, Star, Group, Text } from 'react-konva';
import { connect } from 'react-redux';
import { useTheme } from 'styled-components';

import viewBox from '../data/standard/viewBox.json';
import { makeSelectTerritoryStateByMapDataId } from '../store/selectors';

const FILL_PATTERN_SCALE = 0.15;
const FILL_PATTERN_OPACITY = 0.15;
const STROKE_WIDTH = 2;
const SUPPLY_CENTER_SIZE = 3;
const SELECTED_DASH = [5, 2, 0.1];
const TEXT_OFFSET = { x: 185, y: 160 };

const SupplyCenter = ({ x, y }) => {
  const theme = useTheme();
  return (
    <Star
      x={x - viewBox.territoriesX}
      y={y - viewBox.territoriesY}
      numPoints={5}
      innerRadius={SUPPLY_CENTER_SIZE * 0.6}
      outerRadius={SUPPLY_CENTER_SIZE}
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
  isSelected,
  stripesImage,
}) => {
  const {
    abbreviation,
    controlledBy,
    path,
    playable,
    type,
    id,
    supplyCenter,
    supplyCenterX: scx,
    supplyCenterY: scy,
    textX,
    textY,
  } = territory;

  const theme = useTheme();
  const territoryRef = useRef(null);

  const getFill = () => {
    if (controlledBy in theme.colors.nations)
      return theme.colors.nations[controlledBy];
    return type === 'sea' ? theme.colors.map.sea : theme.colors.map.land;
  };

  const getStroke = () =>
    (isHovering && playable) || isSelected
      ? theme.colors.muted
      : darken(0.2, getFill());

  const dash = isSelected ? SELECTED_DASH : null;

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
        strokeWidth={STROKE_WIDTH}
        territory={territory}
        dash={dash}
      />
      {playable ? null : (
        <Path
          data={path}
          fillPatternImage={stripesImage}
          fillPatternRotation={45}
          fillPatternScale={{ x: FILL_PATTERN_SCALE, y: FILL_PATTERN_SCALE }}
          listening={false}
          opacity={FILL_PATTERN_OPACITY}
        />
      )}
      <Text
        x={textX + TEXT_OFFSET.x}
        y={textY + TEXT_OFFSET.y}
        fill={theme.colors.map.text}
        fontStyle="bold"
        fontVariant="small-caps"
        text={abbreviation}
        listening={false}
      />
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
