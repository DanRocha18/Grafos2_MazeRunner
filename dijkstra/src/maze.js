import React, { Component } from "react";
import "./App.css";

class Maze extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playerX: 0,
      playerY: 0,
      shortestPath: [],
      maze: [], // Representação do labirinto no cliente
    };

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

  // Função para configurar o labirinto no servidor
  setMazeOnServer = () => {
    fetch("http://localhost:3001/setMaze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ maze: this.state.maze }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.message);
      })
      .catch((error) => console.error("Erro ao configurar o labirinto:", error));
  };

  // Função para encontrar o caminho mínimo no labirinto
  findShortestPath = () => {
    const { playerX, playerY } = this.state;
    fetch("http://localhost:3001/findPath", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ start: { x: playerX, y: playerY }, end: { x: 4, y: 4 } }),
    })
      .then((response) => response.json())
      .then((data) => {
        const path = data.path;
        this.setState({ shortestPath: path });
      })
      .catch((error) => console.error("Erro ao encontrar o caminho mínimo:", error));
  };

  // Função para renderizar o labirinto com o caminho mínimo
  renderMazeWithShortestPath = () => {
    const rows = 10;
    const columns = 10;

    const maze = [];
    for (let i = 0; i < rows; i++) {
      const row = [];
      for (let j = 0; j < columns; j++) {
        const isPath = this.state.shortestPath.some((coord) => coord[0] === j && coord[1] === i);
        const cellClasses = `cell${i === 0 && j === 0 ? " start" : ""}${
          i === rows - 1 && j === columns - 1 ? " end" : ""
        }${i === this.state.playerY && j === this.state.playerX ? " player" : ""}${isPath ? " path" : ""}`;
        row.push(<div key={`cell-${i}-${j}`} className={cellClasses}></div>);
      }
      maze.push(<div key={`row-${i}`} className="row">{row}</div>);
    }

    return <div className="maze">{maze}</div>;
  };

  render() {
    return (
      <div>
        <button onClick={this.setMazeOnServer}>Configurar Labirinto no Servidor</button>
        <button onClick={this.findShortestPath}>Encontrar Caminho Mínimo</button>
        {this.renderMazeWithShortestPath()}
      </div>
    );
  }
}

export default Maze;
