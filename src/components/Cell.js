import React, { Component } from 'react';
import posed from 'react-pose';

const Box = posed.div({
  "x-1": {x: -75, transition: { duration: 100 } },
  "x-2": {x: -150, transition: { duration: 100 } },
  "x-3": {x: -225, transition: { duration: 100 } },
  "x+1": {x: 75, transition: { duration: 100 } },
  "x+2": {x: 150, transition: { duration: 100 } },
  "x+3": {x: 225, transition: { duration: 100 } },
  "y-1": {y: -75, transition: { duration: 100 } },
  "y-2": {y: -150, transition: { duration: 100 } },
  "y-3": {y: -225, transition: { duration: 100 } },
  "y+1": {y: 75, transition: { duration: 100 } },
  "y+2": {y: 150, transition: { duration: 100 } },
  "y+3": {y: 225, transition: { duration: 100 } },
  "default": { x: 0, y: 0, transition: { duration: 0 } }
})

class Cell extends Component {

  style = () => {
    const { value } = this.props
    const backgroundColor = {
      "2": "#c6adca",
      "4": '#C0CAAD',
      "8": "#9DA9A0",
      "16": "#B26E63",
      "32": "#ffcfdf",
      "64": "#c49ac4",
      "128": "#e0f9b5",
      "256": "#397367",
      // "512":
    }[value] || '#eef0f2'
    const opacity = value ? '1' : '0'

    return {
      backgroundColor,
      opacity
    }
  }

  pose = () => {
    const { move, direction } = this.props
    if (move === 0) return 'default'
    const xOrY = ['left', 'right'].includes(direction) ? 'x' : 'y'
    const plusOrMinus = ['left', 'up'].includes(direction) ? '-' : '+'
    const pose = xOrY + plusOrMinus + move
    return pose
  }

  render() {
    const { value } = this.props

    return (
      <Box className="cell" style={this.style()} pose={this.pose()}>{value}</Box>
    )
  }
}

export default Cell
