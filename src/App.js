import React, { Component } from 'react';
import './App.css';

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

    board[blanks[this.getRandomInt(blanks.length)]] = 2

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

  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  resetBoard = () => {
    this.setState({board: blankBoard}, () => {
      this.insertNewNumber()
    })
  }

  arraysEqual(a, b) {
    if (a === b) return true

    for (let i = 0; i < a.length; ++i) {
      if (a[i] !== b[i]) return false
    }
    return true
  }

  moveLeft = (board) => {
    for(let i = 0; i < 16; i+= 4) {
      for(let j = i; j < i + 4; j++) {
        for(let k = j + 1; k < i + 4; k++) {
          if (board[j] === null && board[k] !== null) {
            board[j] = board[k]
            board[k] = null
            break
          }
        }
        for(let k = j + 1; k < i + 4; k++) {
          if (board[j] !== null) {
            if (board[k] === board[j]) {
              board[j] += board[k]
              board[k] = null
              break
            } else if (board[k] !== null) {
              break
            }
          }
        }
      }
    }
  }

  moveUp = (board) => {
    for(let i = 0; i < 4; i++) {
      for(let j = i; j < 16; j += 4) {
        for(let k = j + 4; k < 16; k += 4) {
          if (board[j] === null && board[k] !== null) {
            board[j] = board[k]
            board[k] = null
            break
          }
        }
        for(let k = j + 4; k < 16; k += 4) {
          if (board[j] !== null) {
            if (board[k] === board[j]) {
              board[j] += board[k]
              board[k] = null
              break
            } else if (board[k] !== null) {
              break
            }
          }
        }
      }
    }
  }

  moveDown = (board) => {
    for(let i = 12; i < 16; i++) {
      for(let j = i; j >= 0; j -= 4) {
        for(let k = j - 4; k >= 0; k -= 4) {
          if (board[j] === null && board[k] !== null) {
            board[j] = board[k]
            board[k] = null
            break
          }
        }
        for(let k = j - 4; k >= 0; k -= 4) {
          if (board[j] !== null) {
            if (board[k] === board[j]) {
              board[j] += board[k]
              board[k] = null
              break
            } else if (board[k] !== null) {
              break
            }
          }
        }
      }
    }
  }

  moveRight = (board) => {
    for(let i = 3; i < 16; i+= 4) {
      for(let j = i; j > i - 4; j--) {
        for(let k = j - 1; k > i - 4; k--) {
          if (board[j] === null && board[k] !== null) {
            board[j] = board[k]
            board[k] = null
            break
          }
        }
        for(let k = j - 1; k > i - 4; k--) {
          if (board[j] !== null) {
            if (board[k] === board[j]) {
              board[j] += board[k]
              board[k] = null
              break
            } else if (board[k] !== null) {
              break
            }
          }
        }
      }
    }
  }

  move = (direction) => {
    const board = this.state.board.slice()

    const moveMap = {
      left: this.moveLeft,
      right: this.moveRight,
      up: this.moveUp,
      down: this.moveDown
    }

    moveMap[direction](board)

    if (!this.arraysEqual(board, this.state.board)) {
      this.setState({board}, () => {
        this.insertNewNumber()
      })
    }
  }

  cellColor = (number) => {
    // return {
    //   "2": "#287a8a",
    //   "4": '#ACDDE7',
    //   "8": "#ADB9E3",
    //   "16": "#A379C9",
    //   "32": "#B744B8"
    // }[number]
  }

  render() {
    return (
      <div className="App">
        <button onClick={this.resetBoard}>Reset</button>
          <div class="container">
            <div class="row">
              <div class="cell" style={{ backgroundColor: this.cellColor(this.state.board[0]) }}>{this.state.board[0]}</div>
              <div class="cell" style={{ backgroundColor: this.cellColor(this.state.board[1]) }}>{this.state.board[1]}</div>
              <div class="cell" style={{ backgroundColor: this.cellColor(this.state.board[2]) }}>{this.state.board[2]}</div>
              <div class="cell" style={{ backgroundColor: this.cellColor(this.state.board[3]) }}>{this.state.board[3]}</div>
            </div>
            <div class="row">
              <div class="cell" style={{ backgroundColor: this.cellColor(this.state.board[4]) }}>{this.state.board[4]}</div>
              <div class="cell" style={{ backgroundColor: this.cellColor(this.state.board[5]) }}>{this.state.board[5]}</div>
              <div class="cell" style={{ backgroundColor: this.cellColor(this.state.board[6]) }}>{this.state.board[6]}</div>
              <div class="cell" style={{ backgroundColor: this.cellColor(this.state.board[7]) }}>{this.state.board[7]}</div>
            </div>
            <div class="row">
              <div class="cell" style={{ backgroundColor: this.cellColor(this.state.board[8]) }}>{this.state.board[8]}</div>
              <div class="cell" style={{ backgroundColor: this.cellColor(this.state.board[9]) }}>{this.state.board[9]}</div>
              <div class="cell" style={{ backgroundColor: this.cellColor(this.state.board[10]) }}>{this.state.board[10]}</div>
              <div class="cell" style={{ backgroundColor: this.cellColor(this.state.board[11]) }}>{this.state.board[11]}</div>
            </div>
            <div class="row">
              <div class="cell" style={{ backgroundColor: this.cellColor(this.state.board[12]) }}>{this.state.board[12]}</div>
              <div class="cell" style={{ backgroundColor: this.cellColor(this.state.board[13]) }}>{this.state.board[13]}</div>
              <div class="cell" style={{ backgroundColor: this.cellColor(this.state.board[14]) }}>{this.state.board[14]}</div>
              <div class="cell" style={{ backgroundColor: this.cellColor(this.state.board[15]) }}>{this.state.board[15]}</div>
            </div>
          </div>
        <button onClick={() => this.move('left')} >left</button>
        <button onClick={() => this.move('right')} >right</button>
        <button onClick={() => this.move('up')} >up</button>
        <button onClick={() => this.move('down')} >down</button>
      </div>
    );
  }
}

export default App;
