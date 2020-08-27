var express = require('express');
var router = express.Router();
const Board = require('../utils/defaultBoard')
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const processAction = require('../utils/processAction')
router.post('/action', function (req, res, next) {
  const { id, action } = req.body
  let file = JSON.parse(fs.readFileSync(`./game-boards/${id}.json`))
  const { board, score, startTime } = file
  const { actions, newScore } = processAction.processAction(board, action.position, score)
  actions.forEach(act => board[act.position].state = act.state)

  let endTime, timeUsed = null
  if (processAction.isGameOver(board)) {
    endTime = new Date().getTime()
    timeUsed = processAction.msToTime(endTime - startTime)
  }
  const result = new Board(id, board, null, newScore, startTime, endTime, timeUsed)
  fs.writeFileSync(`./game-boards/${id}.json`, JSON.stringify(result))
  console.log(result);
  res.json({
    id: result.name,
    actions,
    score: result.score,
    startTime: result.startTime,
    endTime: result.endTime,
    timeUsed: result.timeUsed
  })
})
router.post('/start', function (req, res, next) {
  const { mode } = req.body
  const uuid = uuidv4()
  let initBoard = new Board(uuid, null, mode, 0, new Date().getTime(), null, null)
  fs.writeFile(`./game-boards/${uuid}.json`,
    JSON.stringify(initBoard),
    function (err) {
      res.json({
        id: uuid,
        mode,
        board: initBoard.board,
        startTime: initBoard.startTime
      })
    });

});
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
