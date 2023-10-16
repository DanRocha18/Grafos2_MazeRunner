import React, { Component } from "react";
import "./App.css";
import Grafo from "./djkistra"; // Importe a classe Grafo (verifique o caminho correto)

class Maze extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playerX: 0,
      playerY: 0,
      shortestPath: [],
      rows: 10,
      columns: 10,
      maze: new Grafo(10, 10), // Usamos a classe Grafo aqui
    };

    document.addEventListener("keydown", this.handleKeyPress);
  }

  initializeMaze = () => {
    this.state.maze = new Grafo(10, 10);
    this.setState({ playerX: 0, playerY: 0, shortestPath: [] });
  };

  toggleNode = (x, y) => {
    this.state.maze.setObstacle(x, y);
    this.setState({ maze: this.state.maze });
};

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

  animateShortestPath = () => {
    const shortestPath = this.state.shortestPath;
    const delay = 300; // Ajuste o atraso de animação conforme necessário

    shortestPath.forEach((coord, index) => {
      setTimeout(() => {
        const [x, y] = coord;
        this.setState({
          maze: this.state.maze.map((row, i) =>
            row.map((cell, j) => (i === y && j === x ? "path" : cell))
          ),
        });
      }, index * delay);
    });
  };

  findShortestPathDijkstra = () => {
    console.log("Botão Encontrar Caminho Mínimo pressionado.");
    const { playerX, playerY } = this.state;
    console.log("Estado: ", this.state)
    const shortestPath = this.state.maze.findShortestPath(playerX, playerY, 4, 4);
    console.log("Menor caminho: ", shortestPath)

    // Animação do caminho mínimo
    this.setState({ shortestPath: [] }, () => {
      this.setState({ shortestPath });
      this.animateShortestPath();
    });
  };

  renderMazeWithShortestPath = () => {
    const rows = 10;
    const columns = 10;

    const maze = [];
    for (let i = 0; i < rows; i++) {
      const row = [];
      for (let j = 0; j < columns; j++) {
        const isPath = this.state.shortestPath.some((coord) => coord[0] === j && coord[1] === i);
        const isShortestPath = isPath && isPath.length > 0;

        const cellClasses = `cell${i === 0 && j === 0 ? " start" : ""}${
          i === rows - 1 && j === columns - 1 ? " end" : ""
        }${i === this.state.playerY && j === this.state.playerX ? " player" : ""}${
          isShortestPath ? " shortest-path" : ""
        }`;
        row.push(
          <div
            key={`cell-${i}-${j}`}
            className={cellClasses}
            onClick={() => this.toggleNode(j, i)}
          ></div>
        );
      }
      maze.push(<div key={`row-${i}`} className="row">{row}</div>);
    }

    return <div className="maze">{maze}</div>;
  };

  render() {
    return (
      <div>
        <button onClick={this.initializeMaze}>Reiniciar Labirinto</button>
        <button onClick={this.findShortestPathDijkstra}>Encontrar Caminho Mínimo</button>
        {this.renderMazeWithShortestPath()}
      </div>
    );
  }
}

export default Maze;