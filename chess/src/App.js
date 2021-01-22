import React from 'react';
import './App.css';
import HomePage from './components/homePage.js';
import Board from './components/board.js';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      difficulty: 1,
      showBoard: false,
      mode: "computer"
    };
  }

  showBoard = (mode) => this.setState({ showBoard: true, mode: mode })

  resetBoard = () => this.setState({ showBoard: false }, () => this.setState({ showBoard: true }))

  render() {
    return (
      <div className="center">
        <HomePage showBoard={this.showBoard} />
        <div className="board">
          <button className="rst-btn" onClick={this.resetBoard}>Reset Board</button>
          {this.state.showBoard && <Board mode={this.state.mode} difficulty={this.state.difficulty} />}
        </div>
      </div>
    );
  }
}
