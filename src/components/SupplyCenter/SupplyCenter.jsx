import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'

import { sizes } from '../../variables'

export const StyledDiv = styled.div`
  margin-left: ${sizes.p}px;
  padding: ${sizes.p}px;
  border: 1px solid currentColor;
  transition: all .1s linear;
  border-radius: ${sizes.p}px;

  span {
    text-transform: uppercase;
  }
`

class SupplyCenter extends React.Component {
  render () {
    const type = this.props.coastal ? 'FA' : 'A'
    return (
      <StyledDiv>
        <span>{type}</span>
      </StyledDiv>
    )
  }
}

SupplyCenter.propTypes = {
  coastal: PropTypes.bool
}

export default SupplyCenter
