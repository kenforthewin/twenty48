import React, { Component } from 'react';
import Cell from './components/Cell'
import Hammer from 'hammerjs'
import { disableBodyScroll } from 'body-scroll-lock'
import store from 'store'

import {
  moveLeft,
  moveRight,
  moveUp,
  moveDown,
  arraysEqual,
  getRandomInt,
  getScore } from './utils/game'
import './App.css'

const blankBoard = [
  null, null, null, null,
  null, null, null, null,
  null, null, null, null,
  null, null, null, null
]

const blankMoveBoard = [
  0,0,0,0,
  0,0,0,0,
  0,0,0,0,
  0,0,0,0
]

class App extends Component {
  state = {
    board: store.get('board', blankBoard),
    moveBoard: blankMoveBoard,
    moving: false,
    topScore: store.get('topScore', 0)
  }

  insertNewNumber = (state = this.state) => {
    const blanks = []
    state.board.forEach((value, index) => {
      if (value === null) {
        blanks.push(index)
      }
    })

    const board = state.board.slice()

    board[blanks[getRandomInt(blanks.length)]] = 4

    this.setState({board, moving: false})
    store.set('board', board)

    const currentScore = getScore(board)
    if (currentScore > this.state.topScore) {
      this.setState({topScore: currentScore})
      store.set('topScore', currentScore)
    }
  }

  componentDidMount() {
    const body = document.querySelector('body')
    disableBodyScroll(body)

    document.onkeydown = (evt) => {
      evt = evt || window.event;

      if (evt.keyCode === 37) this.move('left')
      if (evt.keyCode === 38) this.move('up')
      if (evt.keyCode === 39) this.move('right')
      if (evt.keyCode === 40) this.move('down')
    }

    const hammerManager = new Hammer.Manager(body)
    const Swipe = new Hammer.Swipe()
    hammerManager.add(Swipe)
    hammerManager.on('swipe', (e) => {
      const direction = e.offsetDirection
      if (direction === Hammer.DIRECTION_LEFT) {
        this.move('left')
      } else if (direction === Hammer.DIRECTION_RIGHT) {
        this.move('right')
      } else if (direction === Hammer.DIRECTION_UP) {
        this.move('up')
      } else if (direction === Hammer.DIRECTION_DOWN) {
        this.move('down')
      }
    })

    if (this.state.board.every(v => v === null))
      this.insertNewNumber()
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

    this.setState({moveBoard: moveObj.moveBoard, direction, moving: true}, () => {
      setTimeout(() => {
        this.setState({board: moveObj.board, moveBoard: blankMoveBoard}, () => {
          this.insertNewNumber()
        })
      }, 100)
    })
  }

  render() {
    return (
      <div className="App">
        <button onClick={this.resetBoard}>Reset</button>
        <br />
        <p>Top: {this.state.topScore}</p> 
        <p>Score: {getScore(this.state.board)}</p>
        <br />
        <div class="centered">
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
        </div>
      </div>
    )
  }
}

export default App
