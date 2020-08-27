
class Action {
  constructor(position, state) {
    this.position = position
    this.state = state
  }
}

function processAction(board, index, score) {
  const current = board[index]
  const unPaired = board.find(card => card.state === true && !!board.find(c => c.name === card.name && c.state === false))
  if (!!unPaired) {
    const unPairedIndex = board.findIndex(card => card.name === unPaired.name)
    if (unPaired.name === current.name) {
      return {
        actions: [new Action(index, true), new Action(unPairedIndex, true)],
        newScore: score
      }
    }
    if (unPaired.name !== current.name) {
      score += 1
      return {
        actions: [new Action(index, false), new Action(unPairedIndex, false)],
        newScore: score
      }
    }
  }

  return {
    actions: [new Action(index, true)],
    newScore: score
  }
}

function isGameOver(board) {
  return !board.some(card => card.state === false)
}

function msToTime(s) {
  s = Math.floor(s / 1000);
  var secs = s % 60;
  s = (s - secs) / 60;
  var mins = s % 60;
  var hrs = (s - mins) / 60;

  return hrs + ':' + mins + ':' + secs;
}

module.exports = {
  processAction,
  isGameOver,
  msToTime
}