import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Grid from "./components/Grid";
import {
  dijkstra,
  getNodesInShortestPathOrderDijkstra,
} from "./algorithms/dijkstra";
import { bfs, getNodesInShortestPathOrderBFS } from "./algorithms/bfs";
import { dfs, getNodesInShortestPathOrderDFS } from "./algorithms/dfs";
import { astar, getNodesInShortestPathOrderAStar } from "./algorithms/astar";
import { generateMaze } from "./algorithms/mazeGenerator";
import "./index.css";

const ROWS = 20;
const COLS = 20;
const START_NODE_ROW = 1;
const START_NODE_COL = 1;
const END_NODE_ROW = 18;
const END_NODE_COL = 18;

const App = () => {
  const [grid, setGrid] = useState([]);
  const [mouseIsPressed, setMouseIsPressed] = useState(false);
  const [algorithm, setAlgorithm] = useState("dijkstra");
  const [speed, setSpeed] = useState(5);
  const [mazeType, setMazeType] = useState("none");

  useEffect(() => {
    resetGrid();
  }, []);

  const createNode = (row, col) => {
    return {
      row,
      col,
      isStart: row === START_NODE_ROW && col === START_NODE_COL,
      isEnd: row === END_NODE_ROW && col === END_NODE_COL,
      distance: Infinity,
      isVisited: false,
      isWall: false,
      previousNode: null,
    };
  };

  const resetGrid = () => {
    const newGrid = [];
    for (let row = 0; row < ROWS; row++) {
      const currentRow = [];
      for (let col = 0; col < COLS; col++) {
        currentRow.push(createNode(row, col));
      }
      newGrid.push(currentRow);
    }
    setGrid(newGrid);
  };

  const handleAlgorithmChange = (algo) => {
    setAlgorithm(algo);
  };

  const handleMazeTypeChange = (type) => {
    setMazeType(type);
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const endNode = grid[END_NODE_ROW][END_NODE_COL];
    const newGrid = generateMaze(grid, startNode, endNode, type);
    setGrid(newGrid);
  };

  const handleSpeedChange = (speed) => {
    switch (speed) {
      case "fast":
        setSpeed(5);
        break;
      case "medium":
        setSpeed(20);
        break;
      case "slow":
        setSpeed(40);
        break;
      default:
        setSpeed(5);
    }
  };

  const handleResetGrid = () => {
    resetGrid();
    clearVisualization();
    setMazeType("none");
  };

  const clearVisualization = () => {
    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLS; col++) {
        const node = document.getElementById(`node-${row}-${col}`);
        if (node) {
          if (row === START_NODE_ROW && col === START_NODE_COL) {
            node.className = "node node-start";
          } else if (row === END_NODE_ROW && col === END_NODE_COL) {
            node.className = "node node-end";
          } else {
            node.className = "node";
          }
        }
      }
    }
  };

  const handleMouseDown = (row, col) => {
    const newGrid = getNewGridWithWallToggled(grid, row, col);
    setGrid(newGrid);
    setMouseIsPressed(true);
  };

  const handleMouseEnter = (row, col) => {
    if (!mouseIsPressed) return;
    const newGrid = getNewGridWithWallToggled(grid, row, col);
    setGrid(newGrid);
  };

  const handleMouseUp = () => {
    setMouseIsPressed(false);
  };

  const getNewGridWithWallToggled = (grid, row, col) => {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    if (!node.isStart && !node.isEnd) {
      const newNode = {
        ...node,
        isWall: !node.isWall,
      };
      newGrid[row][col] = newNode;
    }
    return newGrid;
  };

  const visualizeAlgorithm = () => {
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const endNode = grid[END_NODE_ROW][END_NODE_COL];
    let visitedNodesInOrder;
    let nodesInShortestPathOrder;
    switch (algorithm) {
      case "dijkstra":
        visitedNodesInOrder = dijkstra(grid, startNode, endNode);
        nodesInShortestPathOrder = getNodesInShortestPathOrderDijkstra(endNode);
        break;
      case "bfs":
        visitedNodesInOrder = bfs(grid, startNode, endNode);
        nodesInShortestPathOrder = getNodesInShortestPathOrderBFS(endNode);
        break;
      case "dfs":
        visitedNodesInOrder = dfs(grid, startNode, endNode);
        nodesInShortestPathOrder = getNodesInShortestPathOrderDFS(endNode);
        break;
      case "astar":
        visitedNodesInOrder = astar(grid, startNode, endNode);
        nodesInShortestPathOrder = getNodesInShortestPathOrderAStar(endNode);
        break;
      default:
        return;
    }
    animateAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder);
  };

  const animateAlgorithm = (visitedNodesInOrder, nodesInShortestPathOrder) => {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          animateShortestPath(nodesInShortestPathOrder);
        }, speed * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        if (!node.isStart && !node.isEnd) {
          document.getElementById(`node-${node.row}-${node.col}`).className =
            "node node-visited";
        }
      }, speed * i);
    }
  };

  const animateShortestPath = (nodesInShortestPathOrder) => {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        if (!node.isStart && !node.isEnd) {
          document.getElementById(`node-${node.row}-${node.col}`).className =
            "node node-shortest-path";
        }
      }, 20 * i);
    }
  };

  return (
    <div className="App">
      <Navbar
        algorithm={algorithm}
        mazeType={mazeType}
        onAlgorithmChange={handleAlgorithmChange}
        onMazeTypeChange={handleMazeTypeChange}
        onSpeedChange={handleSpeedChange}
        onResetGrid={handleResetGrid}
      />
      <Grid
        grid={grid}
        onMouseDown={handleMouseDown}
        onMouseEnter={handleMouseEnter}
        onMouseUp={handleMouseUp}
      />
      <button onClick={() => visualizeAlgorithm()}>
        Visualize {algorithm.toUpperCase()}
      </button>
    </div>
  );
};

export default App;
