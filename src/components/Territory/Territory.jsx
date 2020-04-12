import React from 'react';
import PropTypes from 'prop-types';

import './Territory.scss';

import mapData from 'JSON/map.json';

import * as Utils from 'Utilities/utils';

class Territory extends React.Component {
  render() {
    const data = Utils.getObjectByKey(this.props.id, mapData.territories);
    if (!data) return;
    return (
      <g className="territory">
        <polygon
          key={this.props.id}
          points={data.polygon}
          data-name={this.props.name}
          data-type={this.props.type}
          data-controlled-by={this.props.controlled_by}
        />
      </g>
    );
  }
}

Territory.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  type: PropTypes.string,
  supply_center: PropTypes.bool,
  controlled_by: PropTypes.number,
};

export default Territory;

// import Piece from 'Components/Piece/Piece.jsx'
// import SupplyCenter from 'Components/SupplyCenter/SupplyCenter.jsx'

// _onMouseEnterTerritory (e) {
//   const id = this.getTerritoryFromEvent(e)
//   if (id !== false) {
//     this.props._onMouseEnterTerritory(id)
//   }
// }

// _onMouseLeaveTerritory (e) {
//   this.props._onMouseLeaveTerritory()
// }

// _onClickTerritory (e) {
//   const id = this.getTerritoryFromEvent(e)
//   if (id !== false) {
//     this.props._onClickTerritory(id)
//   }
// }

// getTerritoryFromEvent (e) {
//   if (!e) {
//     return false
//   }

//   const territory = e.target.closest('.territory')
//   if (!territory) {
//     return false
//   }

//   if ('id' in territory.dataset) {
//     const id = parseInt(territory.dataset.id)
//     return id
//   }

//   return false
// }

//   render () {
//     return (
//       <div
//         className={'territory'}
//         data-id={this.props.id}
//         data-name={this.props.name}
//         data-type={this.props.type}
//         data-coastal={this.props.coastal}
//         data-controlled-by={this.props.controlledBy}
//         data-selected={this.props.isSelected}
//         data-selected-neighbour={this.props.isSelectedNeighbour}
//         onMouseEnter={this._onMouseEnterTerritory.bind(this)}
//         onMouseLeave={this._onMouseLeaveTerritory.bind(this)}
//         onClick={this._onClickTerritory.bind(this)}
//       >
//         <span className="name">{this.props.name}</span>
//         {this.renderPiece()}
//         {this.renderSupplyCenter()}
//       </div>
//     )
//   }
