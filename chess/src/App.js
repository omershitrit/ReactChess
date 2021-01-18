import React from 'react';
import './App.css';
import WelcomePage from './components/welcomePage.js';
import Board from './components/board.js';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      diffifulty: 0
    };
  }

  render() {
    return (
      <div className="center">
        <Board />
      </div>
    );
  }
}
