const express = require("express");
const cors = require("cors");
const pathfinding = require("pathfinding");

const app = express();
const port = 3001; // Escolha a porta desejada

app.use(cors());
app.use(express.json());

let maze = null;

// Rota para configurar o labirinto
app.post("/setMaze", (req, res) => {
  maze = req.body.maze;
  res.json({ message: "Labirinto configurado com sucesso!" });
});

// Rota para encontrar o menor caminho usando o algoritmo de Dijkstra
app.post("/findPath", (req, res) => {
  if (!maze) {
    return res.status(400).json({ error: "Labirinto não configurado." });
  }

  const { start, end } = req.body;

  const grid = new pathfinding.Grid(maze);

  const finder = new pathfinding.AStarFinder({
    allowDiagonal: true,
  });

  const path = finder.findPath(start.x, start.y, end.x, end.y, grid);
  res.json({ path });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
