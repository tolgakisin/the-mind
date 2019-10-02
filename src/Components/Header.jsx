import React, { Component } from "react";

export default class Header extends Component {
  render() {
    return (
      <header>
        <div>
          Level : {this.props.level} ---- Max Level : {this.props.maxLevel}
        </div>
      </header>
    );
  }
}
