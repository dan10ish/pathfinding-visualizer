// src/pages/HomePage.js
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Grid from "../components/Grid";
import {
  dijkstra,
  getNodesInShortestPathOrderDijkstra,
} from "../algorithms/dijkstra";
import { bfs, getNodesInShortestPathOrderBFS } from "../algorithms/bfs";
import { dfs, getNodesInShortestPathOrderDFS } from "../algorithms/dfs";
import { astar, getNodesInShortestPathOrderAStar } from "../algorithms/astar";
import { recursiveDivisionMaze } from "../algorithms/mazeGenerator";

const HomePage = () => {
  const [grid, setGrid] = useState(createInitialGrid());
  const [mouseIsPressed, setMouseIsPressed] = useState(false);
  const [algorithm, setAlgorithm] = useState("dijkstra");

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

  const visualizeAlgorithm = () => {
    const startNode = grid[10][5];
    const endNode = grid[10][45];
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
        break;
    }
    animateAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder);
  };

  const animateAlgorithm = (visitedNodesInOrder, nodesInShortestPathOrder) => {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        const element = document.getElementById(`node-${node.row}-${node.col}`);
        if (element) {
          element.className = "node node-visited";
        } else {
          console.error(`Element not found for node-${node.row}-${node.col}`);
        }
      }, 10 * i);
    }
  };

  const animateShortestPath = (nodesInShortestPathOrder) => {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        const element = document.getElementById(`node-${node.row}-${node.col}`);
        if (element) {
          element.className = "node node-shortest-path";
        } else {
          console.error(`Element not found for node-${node.row}-${node.col}`);
        }
      }, 50 * i);
    }
  };

  const generateMaze = () => {
    const newGrid = recursiveDivisionMaze(grid);
    setGrid(newGrid);
  };

  return (
    <>
      <Navbar
        onAlgorithmChange={setAlgorithm}
        onMazeTypeChange={(mazeType) => generateMaze()}
        onSpeedChange={(speed) => console.log(speed)}
      />
      <button onClick={visualizeAlgorithm}>
        Visualize {algorithm.toUpperCase()}
      </button>
      <Grid
        grid={grid}
        onMouseDown={handleMouseDown}
        onMouseEnter={handleMouseEnter}
        onMouseUp={handleMouseUp}
        mouseIsPressed={mouseIsPressed}
      />
    </>
  );
};

const createInitialGrid = () => {
  const grid = [];
  for (let row = 0; row < 20; row++) {
    const currentRow = [];
    for (let col = 0; col < 50; col++) {
      currentRow.push(createNode(row, col));
    }
    grid.push(currentRow);
  }
  console.log("Initial Grid:", grid);
  return grid;
};

const createNode = (row, col) => {
  return {
    row,
    col,
    isStart: row === 10 && col === 5,
    isEnd: row === 10 && col === 45,
    isWall: false,
    distance: Infinity,
    isVisited: false,
    previousNode: null,
    f: Infinity,
    g: Infinity,
  };
};

const getNewGridWithWallToggled = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWall: !node.isWall,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};

export default HomePage;
