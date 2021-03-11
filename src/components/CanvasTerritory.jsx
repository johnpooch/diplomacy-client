import React, { useRef } from 'react';
import { connect } from 'react-redux';
import { darken } from 'polished';
import { Path, Star, Group } from 'react-konva';

import { variables } from '../variables';
import { makeSelectTerritoryById } from '../store/selectors';
import viewBox from '../data/standard/viewBox.json';

const FILLPATTERNSCALE = 0.15;
const FILLPATTERNOPACITY = 0.1;
const STROKEWIDTH = 2;
const SUPPLYCENTERSIZE = 3;

const SupplyCenter = ({ x, y }) => {
  return (
    <Star
      x={x - viewBox.territoriesX}
      y={y - viewBox.territoriesY}
      numPoints={5}
      innerRadius={SUPPLYCENTERSIZE * 0.6}
      outerRadius={SUPPLYCENTERSIZE}
      fill={variables.colors.base}
      listening={false}
      stroke={variables.colors.base}
      strokeWidth={4}
    />
  );
};

const Territory = ({ territory, isHovering, isOrderable, stripesImage }) => {
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

  const territoryRef = useRef(null);

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
  const selectTerritoryById = makeSelectTerritoryById();
  const mapStateToProps = (state, { id, turnId }) => {
    return {
      territory: selectTerritoryById(state, id, turnId),
    };
  };
  return mapStateToProps;
};

export default connect(makeMapStateToProps, null)(Territory);
