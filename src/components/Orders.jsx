import React from 'react'
import PropTypes from 'prop-types'

import './Orders.scss'

const utils = require('../utils/utils.js')

class Orders extends React.Component {
  buildOrders () {
    // Make sure the current player matches the player controlling this territory
    const player = this.props.player
    const selectTarget = this.props.selectTarget
    const territory = utils.getObjectByKey(selectTarget, this.props.data.territories)
    const controlledBy = territory.controlled_by
    if (player !== controlledBy) {
      return false
    }

    // If there's no piece in this territory then there are no valid moves
    const piece = utils.getObjectByKey(selectTarget, this.props.data.pieces, 'territory')
    if (!piece) {
      return false
    }

    // Every piece can choose these basic orders
    const orders = [
      'Move',
      'Support',
      'Hold'
    ]

    // Fleets can also choose to convoy other pieces
    if (piece.type === 'fleet') {
      orders.push('Convoy')
    }

    return orders
  }

  render () {
    const elements = []
    const orders = this.buildOrders()

    if (!orders) {
      return null
    }

    for (let index = 0; index < orders.length; index++) {
      const key = 'order_' + index
      const value = orders[index]
      elements.push(
        <li key={key}>
          <span className="button">{value}</span>
        </li>
      )
    }

    return (
      <div className="orders">
        <ul>{elements}</ul>
      </div>
    )
  }
}

Orders.propTypes = {
  player: PropTypes.number,
  selectTarget: PropTypes.number,
  data: PropTypes.object
}

export default Orders
