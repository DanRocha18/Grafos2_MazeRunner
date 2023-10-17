class Grafo {
  constructor(rows, columns) {
    this.rows = rows;
    this.columns = columns;
    this.maze = [];

    for (let i = 0; i < rows; i++) {
      const row = [];
      for (let j = 0; j < columns; j++) {
        row.push(0); // Initially, all nodes are walkable
      }
      this.maze.push(row);
    }
  }

  generateEmptyMaze(rows, columns) {
    const maze = [];
    for (let i = 0; i < rows; i++) {
      maze.push(Array(columns).fill(0)); // Preenche a matriz com zeros
    }
    return maze;
  }

  resetMaze() {
    this.maze = this.generateEmptyMaze(this.rows, this.columns);
  }

  setObstacle(x, y) {
    if (x >= 0 && x < this.columns && y >= 0 && y < this.rows) {
      this.maze[y][x] = 1; // Set the node as an obstacle
    }
  }

  findShortestPath(startX, startY, endX, endY) {
    console.log("Ponto de partida x: ", startX);
    console.log("Ponto de partida y: ", startY);
    console.log("Ponto de chegada x: ", endX);
    console.log("Ponto de chegada y: ", endY);
    const visited = Array(this.rows)
      .fill(null)
      .map(() => Array(this.columns).fill(false));

    const distances = Array(this.rows)
      .fill(null)
      .map(() => Array(this.columns).fill(Infinity));

    const parents = Array(this.rows)
      .fill(null)
      .map(() => Array(this.columns).fill(null));

    distances[startY][startX] = 0;

    const findMinDistanceNode = () => {
      let minDistance = Infinity;
      let minNode = null;

      for (let y = 0; y < this.rows; y++) {
        for (let x = 0; x < this.columns; x++) {
          if (!visited[y][x] && distances[y][x] < minDistance) {
            minDistance = distances[y][x];
            minNode = { x, y };
          }
        }
      }

      return minNode;
    };

    const isValidNode = (x, y) => {
      return x >= 0 && x < this.columns && y >= 0 && y < this.rows;
    };

    while (true) {
      const currentNode = findMinDistanceNode();
      if (!currentNode) break;
      const { x, y } = currentNode;

      visited[y][x] = true;

      if (x === endX && y === endY) {
        const shortestPath = [];
        let node = { x: endX, y: endY };

        while (node) {
          shortestPath.push([node.x, node.y]);
          node = parents[node.y][node.x];
        }

        return shortestPath.reverse();
      }

      const neighbors = [
        { x: x - 1, y },
        { x: x + 1, y },
        { x, y: y - 1 },
        { x, y: y + 1 },
      ];

      for (const neighbor of neighbors) {
        const { x, y } = neighbor;

        if (isValidNode(x, y) && !visited[y][x] && this.maze[y][x] === 0) {
          const tentativeDistance = distances[currentNode.y][currentNode.x] + 1;
          if (tentativeDistance < distances[y][x]) {
            distances[y][x] = tentativeDistance;
            parents[y][x] = { x: currentNode.x, y: currentNode.y };
          }
        }
      }
    }

    // No path found
    return [];
  }
}

export default Grafo;