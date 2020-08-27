


class Card {
  constructor(name, state = false) {
    this.name = name
    this.state = state
  }
}
const defaultEasyBoard = Array(5).fill().map((_, i) => new Card(i))
  .concat(Array(5).fill().map((_, i) => new Card(i)))


const defaultMediumBoard = Array(10).fill().map((_, i) => new Card(i))
  .concat(Array(10).fill().map((_, i) => new Card(i)))

const defaultHardBoard = Array(25).fill().map((_, i) => new Card(i))
  .concat(Array(25).fill().map((_, i) => new Card(i)))


module.exports = class Board {
  constructor(name, board, mode, score = 0, startTime, endTime, timeUsed) {
    this.name = name
    this.board = !!board
      ? board
      : this.getDefaultBoard(mode).sort(() => Math.random() - 0.5)
    this.score = score
    this.startTime = startTime
    this.endTime = endTime
    this.timeUsed = timeUsed
  }
  getDefaultBoard(mode) {
    switch (mode) {
      case 'easy':
        return defaultEasyBoard
      case 'medium':
        return defaultMediumBoard
      case 'hard':
        return defaultHardBoard
    }
  }
}



