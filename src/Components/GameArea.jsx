import React, { Component } from "react";
import Game from "./Game.jsx";

export default class GameArea extends Component {
  render() {
    return (
      <div className="main-container">
        <Game />
      </div>
    );
  }
}
