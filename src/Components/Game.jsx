import React, { Component } from "react";
import Box from "./Box.jsx";

let selectedBoxes = [];
let count = 0;
let timer;
export default class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      game: {
        isStarted: false
      },
      boxes: [],
      level: 1
    };
  }

  createAllBoxes() {
    let boxes = [];

    for (let i = 0; i < 45; i++) {
      let box = {
        isPointed: false,
        isOpened: false,
        style: false
      };
      boxes.push(box);
    }
    return boxes;
  }

  determinePointedBoxes() {
    let level = this.state.level;

    for (let i = 0; i < level + 3; i++) {
      this.setState(prevState => {
        let randomNumber = Math.floor(Math.random() * 45);
        while (prevState.boxes[randomNumber].isPointed) {
          randomNumber = Math.floor(Math.random() * 45);
        }
        const boxes = prevState.boxes.map((box, j) => {
          if (randomNumber === j) {
            box.isPointed = true;
            box.style = true;
          }

          return box;
        });
        return { boxes };
      });
    }
  }

  startGame = () => {
    this.setState(prevState => ({
      game: {
        ...prevState.game,
        isStarted: true
      },
      boxes: this.createAllBoxes(),
      level: prevState.level + 1
    }));
    this.determinePointedBoxes();
    this.changeStyleOfDeterminedBox();
  };

  changeStyleOfDeterminedBox = () => {
    timer = setInterval(() => {
      ++count;
      if (count === 3) {
        this.removeStyleOfBox();
        clearInterval(timer);
      }
    }, 1000);
  };

  removeStyleOfBox = () => {
    this.setState(prevState => {
      let boxes = prevState.boxes.map(box => {
        if (box.style) {
          box.style = false;
        }
        return box;
      });
      return { boxes };
    });
  };

  clickBox = e => {
    let id = e.currentTarget.dataset.id;

    let isClicked = false;
    let level = this.state.level;

    if (this.state.boxes[id].isPointed) {
      selectedBoxes.forEach(item => {
        if (item === id) {
          isClicked = true;
          return;
        }
      });
      if (!isClicked) {
        selectedBoxes.push(id);
      }
      // level 2'den başlıyordu. O yüzden 1 azalttık.
      if (selectedBoxes.length === level + 3 - 1) {
        clearInterval(timer);
        count = 0;
        selectedBoxes = [];
        this.startGame();
        this.props.getLevel(this.state.level);
        return;
      }
    } else {
      clearInterval(timer);
      count = 0;
      selectedBoxes = [];
      this.gameOver();
      this.props.getLevel(1);
      return;
    }
  };

  gameOver() {
    this.setState(prevState => ({
      game: {
        isStarted: false
      },
      boxes: [],
      level: 1
    }));
  }
  render() {
    return (
      <div className="main-container">
        {!this.state.game.isStarted ? (
          <div className="start-button">
            <button className="btn btn-primary" onClick={this.startGame}>
              Start The Game
            </button>
          </div>
        ) : (
          <div className="game-container pt-1">
            {this.state.boxes.map((box, id) => {
              return (
                <div key={id} data-id={id} onClick={this.clickBox}>
                  <Box box={box} />
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }
}
