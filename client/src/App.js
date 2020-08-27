import React, { Component } from 'react';
import './App.css';
import Board from './Board';
import Timer from './TImer';
const url = 'http://localhost:4000'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      score: 0,
      id: localStorage.getItem('userId'),
      board: [],
      loading: false,
      startTime: null,
      timeUsed: null,
    }
  }

  handleClick = (mode) => {
    fetch(url + '/start', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mode })
    }).then(response => response.json())
      .then(data => {
        this.setState({
          board: data.board,
          id: data.id,
          startTime: data.startTime
        })
        localStorage.setItem('userId', data.id)
      });
  }

  handleCardClick = (index) => {
    const tempBoard = this.state.board
    tempBoard[index].state = true;
    this.setState({
      board: tempBoard,
      loading: true
    })
    fetch(url + '/action', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: this.state.id,
        action: { position: index }
      })
    }).then(response => response.json())
      .then(data => {
        const newState = this.state
        for (const action of data.actions) {
          newState.board[action.position].state = action.state
        }
        if (data.actions.length > 1 && data.actions[0].state === false) {
          setTimeout(() => {
            this.setState({
              board: newState.board,
              loading: false,
              score: data.score
            })
          }, 3000);
        } else {
          this.setState({
            board: newState.board,
            loading: false,
            score: data.score,
            timeUsed: data.timeUsed
          })
        }
      })
  }
  render() {
    return (
      <div className="App">
        {this.state.board.length > 0
          ? <div className="playGround">
            <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', margin: '50px' }}>
              <Timer
                startTime={this.state.startTime}
                timeUsed={this.state.timeUsed}
              />
              <div className="score">Error Score: {this.state.score}</div>
            </div>
            <Board
              cardClick={this.handleCardClick}
              board={this.state.board}
              disabled={this.state.loading}
            />
          </div>
          : <div className="pickMode">
            <h1 className="title">Memory Game</h1>
            <h2 className="subTitle">Please Select game difficulty:</h2>
            <div className="btns">
              <button className="btn" onClick={() => this.handleClick('easy')}>Easy</button>
              <button className="btn" onClick={() => this.handleClick('medium')}>Medium</button>
              <button className="btn" onClick={() => this.handleClick('hard')}>hard</button>
            </div>
          </div>}

      </div>
    );
  }
}

export default App;
