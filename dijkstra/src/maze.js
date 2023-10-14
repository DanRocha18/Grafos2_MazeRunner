import React from "react";
import "./App.css";

class Maze extends React.Component {
    constructor(props) {
      super(props);
  
      this.state = {
        playerX: 0,
        playerY: 0,
      };
  
      // Adicionamos um event listener para capturar as teclas de seta.
      document.addEventListener("keydown", this.handleKeyPress);
    }
  
    handleKeyPress = (e) => {
      let { playerX, playerY } = this.state;
  
      switch (e.key) {
        case "ArrowUp":
          if (playerY > 0) {
            playerY -= 1;
          }
          break;
        case "ArrowDown":
          if (playerY < 9) {
            playerY += 1;
          }
          break;
        case "ArrowLeft":
          if (playerX > 0) {
            playerX -= 1;
          }
          break;
        case "ArrowRight":
          if (playerX < 9) {
            playerX += 1;
          }
          break;
        default:
          return;
      }
  
      this.setState({ playerX, playerY });
    };
  
    render() {
      const rows = 10;
      const columns = 10;
  
      const maze = [];
      for (let i = 0; i < rows; i++) {
        const row = [];
        for (let j = 0; j < columns; j++) {
          const cellClasses = `cell${i === 0 && j === 0 ? " start" : ""}${
            i === rows - 1 && j === columns - 1 ? " end" : ""
          }${i === this.state.playerY && j === this.state.playerX ? " player" : ""}`;
          row.push(<div key={`cell-${i}-${j}`} className={cellClasses}></div>);
        }
        maze.push(<div key={`row-${i}`} className="row">{row}</div>);
      }
  
      return <div className="maze">{maze}</div>;
    }
  }
  

export default Maze;