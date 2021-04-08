import { darken } from 'polished';
import React from 'react';
import { Circle, Group, Path } from 'react-konva';
import { connect } from 'react-redux';
import { useTheme } from 'styled-components';

import territoryData from '../data/standard/territories.json';
import { makeSelectPieceById } from '../store/selectors';
import { getTerritoryPieceCoords } from '../utils';

const CIRCLE_RADIUS = 15;
const ICON_SCALES = {
  army: 0.03,
  fleet: 0.04,
};
const CIRCLE_STROKE_WIDTH = 2;
const PATH_STROKE_WIDTH = 0.25;

const Piece = ({
  piece,
  territory,
  turnId,
  isHovering,
  isOrderable,
  isSelected,
}) => {
  const { mustRetreat, nation, turnCreated, type } = piece;

  // Don't show a piece if it was created this turn (build order shown instead)
  if (turnCreated === turnId) return null;

  const [x, y] = getTerritoryPieceCoords(territory, mustRetreat);
  const theme = useTheme();

  const iconWidth = theme.icons[type].icon[0] * ICON_SCALES[type];
  const iconHeight = theme.icons[type].icon[1] * ICON_SCALES[type];

  const circleFill =
    (isHovering || isSelected) && isOrderable
      ? theme.colors.neutral
      : theme.colors.text;

  const circleStroke =
    !(isHovering || isSelected) && isOrderable
      ? theme.colors.neutral
      : darken(0.2, theme.colors.nations[nation]);

  return (
    <Group mustRetreat={mustRetreat} listening={false} type={type}>
      <Circle
        fill={circleFill}
        radius={CIRCLE_RADIUS}
        stroke={circleStroke}
        strokeWidth={CIRCLE_STROKE_WIDTH}
        shadowForStrokeEnabled={false}
        x={x}
        y={y}
      />
      <Path
        data={theme.icons[type].icon[4]}
        fill={theme.colors.nations[nation]}
        scaleX={ICON_SCALES[type]}
        scaleY={ICON_SCALES[type]}
        stroke={circleFill}
        _stroke_Width={PATH_STROKE_WIDTH / ICON_SCALES[type]}
        shadowForStrokeEnabled={false}
        x={x - iconWidth / 2}
        y={y - iconHeight / 2}
      />
    </Group>
  );
};

const makeMapStateToProps = () => {
  const selectPieceById = makeSelectPieceById();
  return (state, { id, turnId }) => {
    const piece = selectPieceById(state, id, turnId);
    const territory = territoryData.find((td) => td.id === piece.territory);
    return {
      piece,
      territory,
      turnId,
    };
  };
};

export default connect(makeMapStateToProps, null)(Piece);
