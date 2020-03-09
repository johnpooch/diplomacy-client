
import React from 'react'
import PropTypes from 'prop-types'
import windowSize from 'react-window-size'

class ScrollableSVG extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      dragging: false,
      viewBox: {
        x: 0,
        y: 0
      },
      origin: {
        x: 0,
        y: 0
      }
    }
  }

  getViewBox () {
    const viewBox = this.state.viewBox
    return `${-viewBox.x} ${-viewBox.y} ${this.props.viewBoxWidth} ${this.props.viewBoxHeight}`
  }

  windowToViewBoxX (x) {
    return x / this.props.windowWidth * this.props.viewBoxWidth
  }

  windowToViewBoxY (y) {
    return y / this.props.windowHeight * this.props.viewBoxHeight
  }

  viewBoxToWindowX (x) {
    return (x * this.props.windowWidth) / this.props.viewBoxWidth
  }

  viewBoxToWindowY (y) {
    return (y * this.props.windowHeight) / this.props.viewBoxHeight
  }

  clampX (x) {
    // return x
    // const windowX = this.viewBoxToWindowX(x)
    // console.log(this.windowToViewBoxX(this.props.windowWidth))
    const min = 0
    const max = this.windowToViewBoxX(this.props.windowWidth) - this.props.viewBoxWidth
    return Math.min(Math.max(x, min), max)
  }

  clampY (y) {
    return y
    const min = 0
    const max = 0
    return Math.min(Math.max(y, min), max)
  }

  render () {
    return (
      <svg
        className="game-map"
        viewBox={this.getViewBox()}
        xmlns="http://www.w3.org/2000/svg"
        // preserveAspectRatio="xMidYMid slice"
        onMouseDown={e => {
          this.setState({
            dragging: true,
            origin: {
              x: this.windowToViewBoxX(e.clientX) - this.state.viewBox.x,
              y: this.windowToViewBoxY(e.clientY) - this.state.viewBox.y
            }
          })
        }}
        onMouseMove={e => {
          if (this.state.dragging) {
            // console.log(this.clampX(this.windowToViewBoxX(e.clientX) - this.state.origin.x))
            this.setState({
              viewBox: {
                x: this.clampX(this.windowToViewBoxX(e.clientX) - this.state.origin.x),
                y: this.clampY(this.windowToViewBoxY(e.clientY) - this.state.origin.y)
              }
            })
          }
        }}
        onMouseUp={() => {
          this.setState({ dragging: false })
        }}
        onWheel={() => {

        }}
      >
        {/* <g
          transform={`translate(${this.state.viewBox.x}, ${this.state.viewBox.y})`}
        > */}
        {this.props.children}
        {/* </g> */}
      </svg>
    )
  }
}

ScrollableSVG.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  viewBoxWidth: PropTypes.number,
  viewBoxHeight: PropTypes.number,
  windowWidth: PropTypes.number,
  windowHeight: PropTypes.number
}

export default windowSize(ScrollableSVG)
