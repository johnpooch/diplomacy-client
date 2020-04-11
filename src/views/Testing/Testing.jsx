import React from 'react'

import './Testing.scss'

import ScrollableSVG from 'Components/ScrollableSVG/ScrollableSVG.jsx'

class Testing extends React.Component {
  render () {
    return (
      <ScrollableSVG
        className='test-svg'
        viewBoxWidth={500}
        viewBoxHeight={500}
      >
        <rect width="500" height="500" fill="white" />
        <circle cx="250" cy="250" r="25" fill="green" />
      </ScrollableSVG>
    )
  }
}

Testing.propTypes = {
}

export default Testing
