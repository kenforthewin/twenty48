import React, { Component } from 'react';
import Cell from './components/Cell'
import {
  moveLeft,
  moveRight,
  moveUp,
  moveDown,
  arraysEqual,
  getRandomInt } from './utils/game'
import './App.css'

const blankBoard = [
  null, null, null, null,
  null, null, null, null,
  null, null, null, null,
  null, null, null, null
]

class App extends Component {
  state = {
    board: blankBoard
  }

  insertNewNumber = () => {
    const blanks = []
    this.state.board.forEach((value, index) => {
      if (value === null) {
        blanks.push(index)
      }
    })

    const board = this.state.board.slice()

    board[blanks[getRandomInt(blanks.length)]] = 2

    this.setState({board})
  }

  componentDidMount() {
    this.insertNewNumber()

    document.onkeydown = (evt) => {
      evt = evt || window.event;

      if (evt.keyCode === 37) this.move('left')
      if (evt.keyCode === 38) this.move('up')
      if (evt.keyCode === 39) this.move('right')
      if (evt.keyCode === 40) this.move('down')
    }
  }

  resetBoard = () => {
    this.setState({board: blankBoard}, () => {
      this.insertNewNumber()
    })
  }

  move = (direction) => {
    const board = this.state.board.slice()

    const moveMap = {
      left: moveLeft,
      right: moveRight,
      up: moveUp,
      down: moveDown
    }

    moveMap[direction](board)

    if (!arraysEqual(board, this.state.board)) {
      this.setState({board}, () => {
        this.insertNewNumber()
      })
    }
  }

  render() {
    return (
      <div className="App">
        <button onClick={this.resetBoard}>Reset</button>
          <div class="container">
            <div class="row">
              <Cell value={this.state.board[0]} />
              <Cell value={this.state.board[1]} />
              <Cell value={this.state.board[2]} />
              <Cell value={this.state.board[3]} />
            </div>
            <div class="row">
              <Cell value={this.state.board[4]} />
              <Cell value={this.state.board[5]} />
              <Cell value={this.state.board[6]} />
              <Cell value={this.state.board[7]} />
            </div>
            <div class="row">
              <Cell value={this.state.board[8]} />
              <Cell value={this.state.board[9]} />
              <Cell value={this.state.board[10]} />
              <Cell value={this.state.board[11]} />
            </div>
            <div class="row">
              <Cell value={this.state.board[12]} />
              <Cell value={this.state.board[13]} />
              <Cell value={this.state.board[14]} />
              <Cell value={this.state.board[15]} />
            </div>
          </div>
        <button onClick={() => this.move('left')} >left</button>
        <button onClick={() => this.move('right')} >right</button>
        <button onClick={() => this.move('up')} >up</button>
        <button onClick={() => this.move('down')} >down</button>
      </div>
    )
  }
}

export default App
