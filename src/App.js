import React, { Component } from "react";
import "./App.css";
import SoundOne from "./assets/SoundOne.wav";

class App extends Component {
  state = {
    player1: 0,
    player2: 0,
    current1: 0,
    current2: 0,
    p1wins: 0,
    p2wins: 0,
    totalGames: 0,
  };

  onRollClick = () => {
    const randomDice = Math.floor(Math.random() * 6 + 1);

    document.getElementById("dice").src = `./DiceImages/dice-${randomDice}.png`;

    this.setState({
      player1: this.state.player1 + randomDice,
    });
    if (randomDice === 1) {
      let audio = new Audio(SoundOne);
      audio.play();
      document.getElementById("roll-dice1").disabled = true;
      const btn = document.getElementById("roll-dice2");
      btn.disabled = false;
      this.toggleAcctivePl2();
      this.toggleAcctive();
      this.setState({
        player1: 0,
      });
    }
  };

  onRollClick2 = () => {
    const randomDice = Math.floor(Math.random() * 6 + 1);

    document.getElementById("dice").src = `./DiceImages/dice-${randomDice}.png`;
    this.setState({
      player2: this.state.player2 + randomDice,
    });
    if (randomDice === 1) {
      let audio = new Audio(SoundOne);
      audio.play();
      document.getElementById("roll-dice2").disabled = true;
      const btn = document.getElementById("roll-dice1");
      btn.disabled = false;
      this.toggleAcctivePl2();
      this.toggleAcctive();
      this.setState({
        player2: 0,
      });
    }
  };

  onHoldClick = () => {
    this.setState(
      {
        player1: 0,
        current1: this.state.current1 + this.state.player1,
      },
      () => {
        if (this.state.current1 >= 30) {
          this.setState({
            p1wins: this.state.p1wins + 1,
          });

          this.handleNewGame();
        }
      }
    );
    document.getElementById("roll-dice2").disabled = false;
    document.getElementById("roll-dice1").disabled = true;
    this.toggleAcctivePl2();
    this.toggleAcctive();
  };

  onHoldClick2 = () => {
    this.setState(
      {
        player2: 0,
        current2: this.state.current2 + this.state.player2,
      },
      () => {
        if (this.state.current2 >= 30) {
          this.setState({
            p2wins: this.state.p2wins + 1,
          });

          this.handleNewGame();
        }
      }
    );
    document.getElementById("roll-dice2").disabled = true;
    document.getElementById("roll-dice1").disabled = false;
    this.toggleAcctivePl2();
    this.toggleAcctive();
  };

  handleNewGame = () => {
    this.setState({
      player1: 0,
      player2: 0,
      current1: 0,
      current2: 0,
      totalGames: this.state.totalGames + 1,
    });
  };
  toggleAcctive = () => {
    let changeClass = document.getElementById("name-0");
    changeClass.classList.toggle("active");
  };
  toggleAcctivePl2 = () => {
    let changeClass = document.getElementById("name-1");
    changeClass.classList.toggle("active");
  };

  render() {
    return (
      <div className="App">
        <div className="wrapper clearfix">
          <div className="player-0-panel active " id="name-0">
            <div className="player-name">Player 1</div>
            <div className="player-score" id="score-0">
              {this.state.player1}
            </div>
            <div className="player-current-box">
              <div className="player-current-label">Current</div>
              <div className="player-current-score" id="current-0">
                {this.state.current1}
              </div>
            </div>
          </div>

          <div className="player-1-panel " id="name-1">
            <div className="player-name">Player 2</div>
            <div className="player-score" id="score-1">
              {this.state.player2}
            </div>
            <div className="player-current-box">
              <div className="player-current-label">Current</div>
              <div className="player-current-score" id="current-1">
                {this.state.current2}
              </div>
            </div>
          </div>

          <button className="btn-new" onClick={this.handleNewGame}>
            New game
          </button>
          <img
            src="./DiceImages/dice-1.png"
            id="dice"
            alt="Dice"
            className="dice"
          ></img>
          <button
            className="btn-roll"
            id="roll-dice1"
            onClick={this.onRollClick}
          >
            Roll dice
          </button>
          <button
            className="btn-roll2"
            id="roll-dice2"
            onClick={this.onRollClick2}
          >
            Roll dice2
          </button>

          <button className="btn-hold" onClick={this.onHoldClick}>
            Hold
          </button>
          <button className="btn-hold2" onClick={this.onHoldClick2}>
            Hold
          </button>
          <table>
            <tr>
              <th>Player 1 wins</th>
              <th>Player 2 wins</th>
              <th>Totlal Games</th>
            </tr>
            <tr>
              <th>{this.state.p1wins}</th>
              <th>{this.state.p2wins}</th>
              <th>{this.state.totalGames}</th>
            </tr>
          </table>
        </div>
      </div>
    );
  }
}
export default App;
