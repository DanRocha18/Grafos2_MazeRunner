import React, { Component } from "react";
import "./App.css";
import Grafo from "./djkistra"; // Certifique-se de que o caminho correto esteja importado

class Maze extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playerX: 0,
      playerY: 0,
      shortestPath: [],
      startNodeX: 0,
      startNodeY: 0,
      endNodeX: 9, // Última coluna
      endNodeY: 9, // Última linha
      rows: 10,
      columns: 10,
      maze: new Grafo(10, 10), // Usamos a classe Grafo aqui
      showMessage: false,
    };

    document.addEventListener("keydown", this.handleKeyPress);

    this.addRandomObstacles();
  }

  addRandomObstacles = () => {
    const { rows, columns, maze } = this.state;
    const numObstacles = 10; // Defina o número de obstáculos desejado

    maze.resetMaze();

    for (let i = 0; i < numObstacles; i++) {
      let randomX, randomY;
      
      do {
        randomX = Math.floor(Math.random() * columns);
        randomY = Math.floor(Math.random() * rows);
      } while ((randomX === 0 && randomY === 0) || (randomX === 9 && randomY === 9));
  
      maze.setObstacle(randomX, randomY);
    }
  };

  initializeMaze = () => {
    this.setState({ playerX: 0, playerY: 0, shortestPath: [] }, () => {
      this.addRandomObstacles(); // Embaralhe os obstáculos novamente
      this.setState({startNodeX : 0 , startNodeY: 0});
    });
  };

  setStartNode = (x, y) => {
    if (this.state.maze.maze[y][x] === 1) {
      // Se o nó clicado for um obstáculo, mostre a mensagem
      this.setState({ showMessage: true });
    } else {
      // Caso contrário, esconda a mensagem
      this.setState({ showMessage: false });
    }

    this.setState({ startNodeX: x, startNodeY: y }, () => {
      this.findShortestPathDijkstra(); // Chama o cálculo do menor caminho quando o nó de partida é definido
    });
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

  findShortestPathDijkstra = () => {
    console.log("Encontrar Caminho Mínimo acionado.");
    const { startNodeX, startNodeY } = this.state;
    const shortestPath = this.state.maze.findShortestPath(
      startNodeX,
      startNodeY,
      this.state.endNodeX,
      this.state.endNodeY
    );
    console.log("Menor caminho: ", shortestPath);

    // Animação do caminho mínimo
    this.setState({ shortestPath });
  };

  renderMazeWithShortestPath = () => {
    const rows = 10;
    const columns = 10;

    const maze = this.state.maze.maze; // Obtenha a matriz de obstáculos do estado

    const mazeElements = [];
    for (let i = 0; i < rows; i++) {
      const rowElements = [];
      for (let j = 0; j < columns; j++) {
        const isStartNode = j === this.state.startNodeX && i === this.state.startNodeY;
        const isObstacle = maze[i][j] === 1; // Verifica se é um obstáculo

        // Adicione a classe 'shortest-path' para o menor caminho
        const isShortestPath = this.state.shortestPath.some(
          (coord) => coord[0] === j && coord[1] === i
        );

        const cellClasses = `cell${isStartNode ? " start-node" : ""}${
          i === 0 && j === 0 ? " start" : ""
        }${i === rows - 1 && j === columns - 1 ? " end" : ""}${
          i === this.state.playerY && j === this.state.playerX ? " player" : ""
        }${isObstacle ? " obstacle-cell" : ""}${isShortestPath ? " shortest-path" : ""}`;

        rowElements.push(
          <div
            key={`cell-${i}-${j}`}
            className={cellClasses}
            onClick={() => this.setStartNode(j, i)}
          >
            {isStartNode && <div className="start-node-marker">S</div>}
          </div>
        );
      }
      mazeElements.push(
        <div key={`row-${i}`} className="row">{rowElements}</div>
      );
    }

    return <div className="maze">{mazeElements}</div>;
  };

  render() {
    return (
      <div className="maze-container">
        <button className="restart-buttom" onClick={this.initializeMaze}>
          Reiniciar Labirinto
        </button>
        {this.renderMazeWithShortestPath()}
        <div className="message-container">
          {this.state.showMessage && (
            <div className="message">O Verdugo te encontrou, SAIA IMEDIATAMENTE!</div>
          )}
        </div>
      </div>
    );
  }
}

export default Maze;
