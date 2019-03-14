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

  render() {
    return (
      <div className="App">
        <button onClick={this.resetBoard}>Reset</button>
        <table>
          <tbody>
            <tr>
              <td>{this.state.board[0]}</td>
              <td>{this.state.board[1]}</td>
              <td>{this.state.board[2]}</td>
              <td>{this.state.board[3]}</td>
            </tr>
            <tr>
              <td>{this.state.board[4]}</td>
              <td>{this.state.board[5]}</td>
              <td>{this.state.board[6]}</td>
              <td>{this.state.board[7]}</td>
            </tr>
            <tr>
              <td>{this.state.board[8]}</td>
              <td>{this.state.board[9]}</td>
              <td>{this.state.board[10]}</td>
              <td>{this.state.board[11]}</td>
            </tr>
            <tr>
              <td>{this.state.board[12]}</td>
              <td>{this.state.board[13]}</td>
              <td>{this.state.board[14]}</td>
              <td>{this.state.board[15]}</td>
            </tr>
          </tbody>
        </table>
        <button onClick={() => this.move('left')} >left</button>
        <button onClick={() => this.move('right')} >right</button>
        <button onClick={() => this.move('up')} >up</button>
        <button onClick={() => this.move('down')} >down</button>
      </div>
    );
  }
}

export default App;
