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
import { recursiveDivisionMaze } from "./algorithms/mazeGenerator";
import "./index.css";

const App = () => {
  const [grid, setGrid] = useState([]);
  const [mouseIsPressed, setMouseIsPressed] = useState(false);
  const [algorithm, setAlgorithm] = useState("dijkstra");
  const [speed, setSpeed] = useState(10);
  const [rows, setRows] = useState(20);
  const [cols, setCols] = useState(20);
  const [startNode, setStartNode] = useState({ row: 1, col: 1 });
  const [endNode, setEndNode] = useState({ row: 18, col: 18 });

  useEffect(() => {
    resetGrid();
  }, [rows, cols, startNode, endNode]);

  const createNode = (row, col) => {
    return {
      row,
      col,
      isStart: row === startNode.row && col === startNode.col,
      isEnd: row === endNode.row && col === endNode.col,
      distance: Infinity,
      isVisited: false,
      isWall: false,
      previousNode: null,
      g: Infinity,
      f: Infinity,
    };
  };

  const resetGrid = () => {
    const newGrid = [];
    for (let row = 0; row < rows; row++) {
      const currentRow = [];
      for (let col = 0; col < cols; col++) {
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
    let newGrid = grid.slice();
    if (type === "recursive") {
      newGrid = recursiveDivisionMaze(
        grid,
        grid[startNode.row][startNode.col],
        grid[endNode.row][endNode.col]
      );
    }
    setGrid(newGrid);
  };

  const handleSpeedChange = (speed) => {
    switch (speed) {
      case "fast":
        setSpeed(10);
        break;
      case "medium":
        setSpeed(50);
        break;
      case "slow":
        setSpeed(100);
        break;
      default:
        setSpeed(10);
    }
  };

  const handleResetGrid = () => {
    resetGrid();
  };

  const handleMouseDown = (row, col) => {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = {
      ...node,
      isWall: !node.isWall,
    };
    newGrid[row][col] = newNode;
    setGrid(newGrid);
    setMouseIsPressed(true);
  };

  const handleMouseEnter = (row, col) => {
    if (!mouseIsPressed) return;
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = {
      ...node,
      isWall: !node.isWall,
    };
    newGrid[row][col] = newNode;
    setGrid(newGrid);
  };

  const handleMouseUp = () => {
    setMouseIsPressed(false);
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
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-visited";
      }, speed * i);
    }
  };

  const animateShortestPath = (nodesInShortestPathOrder) => {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-shortest-path";
      }, 50 * i);
    }
  };

  const visualizeAlgorithm = () => {
    const start = grid[startNode.row][startNode.col];
    const end = grid[endNode.row][endNode.col];
    let visitedNodesInOrder;
    let nodesInShortestPathOrder;
    switch (algorithm) {
      case "dijkstra":
        visitedNodesInOrder = dijkstra(grid, start, end);
        nodesInShortestPathOrder = getNodesInShortestPathOrderDijkstra(end);
        break;
      case "bfs":
        visitedNodesInOrder = bfs(grid, start, end);
        nodesInShortestPathOrder = getNodesInShortestPathOrderBFS(end);
        break;
      case "dfs":
        visitedNodesInOrder = dfs(grid, start, end);
        nodesInShortestPathOrder = getNodesInShortestPathOrderDFS(end);
        break;
      case "astar":
        visitedNodesInOrder = astar(grid, start, end);
        nodesInShortestPathOrder = getNodesInShortestPathOrderAStar(end);
        break;
      default:
        return;
    }
    animateAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder);
  };

  return (
    <div className="App">
      <Navbar
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
        Visualize {algorithm.charAt(0).toUpperCase() + algorithm.slice(1)}
      </button>
    </div>
  );
};

export default App;
