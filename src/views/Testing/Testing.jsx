import React from 'react'

import './Testing.scss'

import ScrollableSVG from 'Components/ScrollableSVG/ScrollableSVG.jsx'

class Testing extends React.Component {
  render () {
    return (
      <ScrollableSVG
        className='test-svg'
        viewBoxWidth={500}
        viewBoxHeight={1000}
      >
        <rect width="500" height="1000" fill="white" />
        <circle cx="150" cy="220" r="200" fill="orange" />
        <circle cx="400" cy="350" r="150" fill="green" />
        <circle cx="50" cy="50" r="30" fill="red" />
        <circle cx="50" cy="509" r="30" fill="red" />
        <circle cx="559" cy="509" r="30" fill="red" />
        <circle cx="559" cy="50" r="30" fill="red" />
      </ScrollableSVG>
    )
  }
}

Testing.propTypes = {
}

export default Testing
