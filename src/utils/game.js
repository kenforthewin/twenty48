export const arraysEqual = (a, b) => {
  if (a === b) return true

  for (let i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false
  }
  return true
}

const blankmoveBoard = [
  0,0,0,0,
  0,0,0,0,
  0,0,0,0,
  0,0,0,0
]

const getBlankmoveBoard = () => blankmoveBoard.slice()

export function* moveLeft(board) {
  let moveBoard = getBlankmoveBoard()
  
  for(let i = 0; i < 16; i+= 4) {
    for(let j = i; j < i + 4; j++) {
      for(let k = j + 1; k < i + 4; k++) {
        if (board[j] === null && board[k] !== null) {
          board[j] = board[k]
          board[k] = null
          moveBoard[k] = Math.abs(j - k)
          break
        }
      }
    }
  }
  
  yield { moveBoard: moveBoard.slice(), board: board.slice() }

  moveBoard = getBlankmoveBoard()

  for(let i = 0; i < 16; i+= 4) {
    for(let j = i; j < i + 4; j++) {
      for(let k = j + 1; k < i + 4; k++) {
        if (board[j] !== null) {
          if (board[k] === board[j]) {
            board[j] += board[k]
            moveBoard[k] = Math.abs(j - k)
            board[k] = null
            break
          } else if (board[k] !== null) {
            break
          }
        }
      }
    }
  }

  yield { moveBoard: moveBoard.slice(), board: board.slice() }
}

export const moveUp = (board) => {
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

export const moveDown = (board) => {
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

export const moveRight = (board) => {
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

export const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
}
