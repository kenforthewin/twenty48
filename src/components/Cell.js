import React, { Component } from 'react';

class Cell extends Component {

  style = () => {
    const { value } = this.props
    const backgroundColor = {
      "2": "#287a8a",
      "4": '#ACDDE7',
      "8": "#ADB9E3",
      "16": "#A379C9",
      "32": "#B744B8"
    }[value] || '#adb7c1'

    return {
      backgroundColor
    }
  }

  render() {
    const { value } = this.props

    return (
      <div className="cell" style={this.style()}>{value}</div>
    )
  }
}

export default Cell
