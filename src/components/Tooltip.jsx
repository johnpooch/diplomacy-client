import React from 'react';
import styled from '@emotion/styled';

import mapData from '../map.json';
import * as Utils from '../utils';
import { colors, fontSizes, spacing } from '../variables';

const StyledDiv = styled.div`
  position: fixed;
  padding: ${spacing[1]}px;
  pointer-events: none;
  color: white;
  font-size: ${fontSizes.sans.small}px;
  background-color: ${colors.base};
  left: ${(props) => props.mousePos.x}px;
  top: ${(props) => props.mousePos.y}px;

  li {
    display: flex;
    &:not(:last-child) {
      margin-bottom: ${spacing[2]}px;
    }
  }

  .key {
    font-weight: bold;
    margin-right: ${spacing[1]}px;
  }
`;

const getTooltip = (data) => {
  const tooltip = [];
  const tooltipList = [];

  // Get name of territory
  tooltip.push({
    key: 'Name',
    value: data.name,
  });

  tooltip.forEach((item) => {
    tooltipList.push(
      <div key={item.key}>
        <span className="key">{item.key}</span>
        <span className="value">{item.value}</span>
      </div>
    );
  });

  return tooltipList;
  // return null;
};

const Tooltip = (props) => {
  const { territory, mousePos } = props;
  const data = Utils.getObjectByKey(territory, mapData.territories);
  console.log(mousePos);
  if (!data) return null;
  return <StyledDiv mousePos={mousePos}>{getTooltip(data, props)}</StyledDiv>;
};

export default Tooltip;

// class Tooltip extends React.Component {
//   buildTooltip() {
//     // const { hoverTarget, data } = this.props;

//     const tooltip = {};

//     // const territory = Utils.getObjectByKey(hoverTarget, data.territories);
//     // if (territory) {
//     //   tooltip.name = territory.name;
//     //   tooltip.coastal = territory.coastal ? 'true' : 'false';
//     //   tooltip.type = territory.type;
//     // }

//     // const controlledBy = Utils.getObjectByKey(
//     //   territory.controlled_by,
//     //   data.nations
//     // );
//     // if (controlledBy) {
//     //   tooltip.nation = controlledBy.name;
//     // }

//     // const piece = Utils.getObjectByKey(hoverTarget, data.pieces, 'territory');
//     // if (piece) {
//     //   tooltip.piece = piece.type;
//     // }

//     return tooltip;
//   }

//   renderTooltip() {
//     const tooltip = this.buildTooltip();
//     const tooltipList = [];
//     Object.keys(tooltip).forEach((key) => {
//       const value = tooltip[key];
//       tooltipList.push(
//         <li key={key}>
//           <span className="key">{key}</span>
//           <span className="value">{value}</span>
//         </li>
//       );
//     });
//   }

//   render() {
//     return (
//       <StyledDiv>
//         <ul>{this.renderTooltip()}</ul>
//       </StyledDiv>
//     );
//   }
// }

// export default Tooltip;
