
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import useDimensions from 'react-use-dimensions'

const ScrollableSVG = (props) => {
  const [ref, { width, height }] = useDimensions()
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [origin, setOrigin] = useState({ x: 0, y: 0 })
  const [panning, setPanning] = useState(false)

  return (
    <svg
      ref={ref}
      className={props.className}
      viewBox={getViewBox(props, pos)}
      onMouseDown={(e) => { mouseDown(e, width, height, props, pos, setOrigin, setPanning) }}
      onMouseMove={(e) => { mouseMove(e, width, height, props, panning, origin, setPos) }}
      onMouseUp={(e) => { mouseUp(e, setPanning) }}
    >
      {props.children}
      <text x="100" y="100" fontSize="30" textAnchor="left" fill="white">width: {width}</text>
      <text x="100" y="150" fontSize="30" textAnchor="left" fill="white">height: {height}</text>
    </svg>
  )
}

const getViewBox = (props, pos) => {
  return `${-pos.x} ${-pos.y} ${props.viewBoxWidth} ${props.viewBoxHeight}`
}

const scale = (n, width, height, props) => {
  if (width / height > props.viewBoxWidth / props.viewBoxHeight) {
    // scale using height
    return n / height * props.viewBoxHeight
  } else {
    // scale using width
    return n / width * props.viewBoxWidth
  }
}

const mouseDown = (e, width, height, props, pos, setOrigin, setPanning) => {
  setOrigin({
    x: scale(e.clientX, width, height, props) - pos.x,
    y: scale(e.clientY, width, height, props) - pos.y
  })
  setPanning(true)
}

const mouseMove = (e, width, height, props, panning, origin, setPos) => {
  if (panning) {
    setPos({
      x: scale(e.clientX, width, height, props) - origin.x,
      y: scale(e.clientY, width, height, props) - origin.y
    })
  }
}

const mouseUp = (e, setPanning) => {
  setPanning(false)
}

ScrollableSVG.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  className: PropTypes.string,
  viewBoxWidth: PropTypes.number,
  viewBoxHeight: PropTypes.number
}

export default ScrollableSVG
