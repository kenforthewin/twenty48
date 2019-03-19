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
  // null, null, null, null,
  // 16, 8, 4, 2,
  // 4096, 2048, 1024, 512,
  // 256, 128, 64, 32
  null, null, null, null,
  null, null, null, null,
  null, null, null, null,
  2, 2, 2, 2
]

const blankMoveBoard = [
  0,0,0,0,
  0,0,0,0,
  0,0,0,0,
  0,0,0,0
]

class App extends Component {
  state = {
    board: blankBoard,
    moveBoard: blankMoveBoard,
    moving: false,
    done: true
  }

  insertNewNumber = (state = this.state) => {
    const blanks = []
    state.board.forEach((value, index) => {
      if (value === null) {
        blanks.push(index)
      }
    })

    const board = state.board.slice()

    board[blanks[getRandomInt(blanks.length)]] = 2

    this.setState({board, moving: false})
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
    this.setState({board: blankBoard, moving: true}, () => {
      this.insertNewNumber()
    })
  }

  move = (direction) => {
    if (this.state.moving) return

    const board = this.state.board.slice()

    const moveMap = {
      left: moveLeft,
      right: moveRight,
      up: moveUp,
      down: moveDown
    }

    const moveObj = moveMap[direction](board.slice())

    if (arraysEqual(moveObj.board, board)) return

    this.setState({moveBoard: moveObj.moveBoard, direction, moving: true, done: false}, () => {
      setTimeout(() => {
        this.setState({board: moveObj.board, moveBoard: blankMoveBoard, done: true}, () => {
          this.insertNewNumber()
        })
      }, 300)
    })
  }

  render() {
    return (
      <div className="App">
        <button onClick={this.resetBoard}>Reset</button>
          <div class="container">
            <div class="row">
              <Cell value={this.state.board[0]} move={this.state.moveBoard[0]} direction={this.state.direction}/>
              <Cell value={this.state.board[1]} move={this.state.moveBoard[1]}  direction={this.state.direction}/>
              <Cell value={this.state.board[2]} move={this.state.moveBoard[2]}  direction={this.state.direction}/>
              <Cell value={this.state.board[3]} move={this.state.moveBoard[3]}  direction={this.state.direction}/>
            </div>
            <div class="row">
              <Cell value={this.state.board[4]} move={this.state.moveBoard[4]}  direction={this.state.direction}/>
              <Cell value={this.state.board[5]} move={this.state.moveBoard[5]}  direction={this.state.direction}/>
              <Cell value={this.state.board[6]} move={this.state.moveBoard[6]}  direction={this.state.direction}/>
              <Cell value={this.state.board[7]} move={this.state.moveBoard[7]}  direction={this.state.direction}/>
            </div>
            <div class="row">
              <Cell value={this.state.board[8]} move={this.state.moveBoard[8]}  direction={this.state.direction}/>
              <Cell value={this.state.board[9]} move={this.state.moveBoard[9]}  direction={this.state.direction}/>
              <Cell value={this.state.board[10]} move={this.state.moveBoard[10]}  direction={this.state.direction}/>
              <Cell value={this.state.board[11]} move={this.state.moveBoard[11]}  direction={this.state.direction}/>
            </div>
            <div class="row">
              <Cell value={this.state.board[12]} move={this.state.moveBoard[12]} direction={this.state.direction}/>
              <Cell value={this.state.board[13]} move={this.state.moveBoard[13]} direction={this.state.direction}/>
              <Cell value={this.state.board[14]} move={this.state.moveBoard[14]} direction={this.state.direction}/>
              <Cell value={this.state.board[15]} move={this.state.moveBoard[15]} direction={this.state.direction}/>
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
