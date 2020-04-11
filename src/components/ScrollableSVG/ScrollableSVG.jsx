import React, { useState } from 'react'
import PropTypes from 'prop-types'
import useDimensions from 'react-use-dimensions'

const ScrollableSVG = (props) => {
  // This is a functional component rather than a class component, so that we
  // can use hooks to get the width and height of the SVG.

  const [ref, { width, height }] = useDimensions()
  const [viewBox, setViewBox] = useState({
    x: 0,
    y: 0,
    w: props.viewBoxWidth,
    h: props.viewBoxHeight
  })
  const [origin, setOrigin] = useState({ x: 0, y: 0 })
  const [panning, setPanning] = useState(false)

  const zoomPower = 0.1

  return (
    <svg
      ref={ref}
      className={props.className}
      viewBox={getViewBox(viewBox)}
      onMouseDown={(e) => { mouseDown(e, width, height, props, viewBox, setOrigin, setPanning) }}
      onMouseMove={(e) => { mouseMove(e, width, height, props, panning, origin, viewBox, setViewBox) }}
      onMouseUp={(e) => { mouseUp(e, setPanning) }}
      onWheel={(e) => { wheel(e, zoomPower, width, height, viewBox, setViewBox) }}
    >
      {props.children}
    </svg>
  )
}

const getViewBox = (viewBox) => {
  return `${-viewBox.x} ${-viewBox.y} ${viewBox.w} ${viewBox.h}`
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

const getZoom = (props, viewBox) => {
  return viewBox.h / props.viewBoxHeight
}

const scaleZoom = (n, width, height, props, viewBox) => {
  const zoom = getZoom(props, viewBox)
  return scale(n, width, height, props) * zoom
}

const mouseDown = (e, width, height, props, viewBox, setOrigin, setPanning) => {
  setOrigin({
    x: scaleZoom(e.clientX, width, height, props, viewBox) - viewBox.x,
    y: scaleZoom(e.clientY, width, height, props, viewBox) - viewBox.y
  })
  setPanning(true)
}

const mouseMove = (e, width, height, props, panning, origin, viewBox, setViewBox) => {
  if (panning) {
    setViewBox({
      x: scaleZoom(e.clientX, width, height, props, viewBox) - origin.x,
      y: scaleZoom(e.clientY, width, height, props, viewBox) - origin.y,
      w: viewBox.w,
      h: viewBox.h
    })
  }
}

const mouseUp = (e, setPanning) => {
  setPanning(false)
}

const wheel = (e, zoomPower, width, height, viewBox, setViewBox) => {
  const dw = viewBox.w * Math.sign(e.deltaY) * zoomPower
  const dh = viewBox.h * Math.sign(e.deltaY) * zoomPower
  const dx = dw * e.clientX / width
  const dy = dh * e.clientY / height
  setViewBox({
    x: viewBox.x + dx,
    y: viewBox.y + dy,
    w: viewBox.w + dw,
    h: viewBox.h + dh
  })
}

// const resetZoom = (props, setViewBox) => {
//   setViewBox({
//     x: 0,
//     y: 0,
//     w: props.viewBoxWidth,
//     h: props.viewBoxHeight
//   })
// }

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
