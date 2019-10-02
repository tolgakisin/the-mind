import React, { Component } from "react";
import Background from "../images/sprite-flags.png";

export default class Box extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.createBoxStyle = this.createBoxStyle.bind(this);
  }

  generateRandomNumber() {
    return Math.floor(Math.random() * 15);
  }

  createBoxStyle() {
    let randomX = this.generateRandomNumber();
    let randomY = this.generateRandomNumber();
    let style = {
      backgroundImage: "url(" + Background + ")",
      backgroundPosition: -64 * randomX + "px " + -64 * randomY + "px"
    };
    return style;
  }

  render() {
    let boxStyle = {};
    if (this.props.box.style) {
      boxStyle = this.createBoxStyle();
    } else {
      boxStyle = {};
    }
    return (
      <div>
        {this.props.box.isPointed ? (
          <div className="box" style={boxStyle}></div>
        ) : (
          <div className="box"></div>
        )}
      </div>
    );
  }
}
