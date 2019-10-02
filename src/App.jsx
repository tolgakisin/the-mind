import React, { Component } from "react";
import "./App.css";
import Game from "./Components/Game.jsx";
import Header from "./Components/Header.jsx";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      level: 1,
      maxLevel: 1
    };
  }

  getLevel = level => {
    this.setState({ level });
    if (level > this.state.maxLevel) {
      this.setState({ maxLevel: level });
    }
  };

  render() {
    return (
      <div>
        <Header level={this.state.level} maxLevel={this.state.maxLevel} />

        <Game level={this.state.level} getLevel={this.getLevel} />
      </div>
    );
  }
}
