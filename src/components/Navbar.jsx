import React from "react";

const Navbar = ({ onAlgorithmChange, onMazeTypeChange, onSpeedChange }) => {
  return (
    <div className="navbar">
      <h1>Pathfinding Visualizer</h1>
      <div className="nav-dropdown">
        <select
          className="dropdown"
          onChange={(e) => onAlgorithmChange(e.target.value)}
        >
          <option value="dijkstra">Dijkstra</option>
          <option value="bfs">BFS</option>
          <option value="dfs">DFS</option>
          <option value="astar">A*</option>
        </select>
        <select
          className="dropdown"
          onChange={(e) => onMazeTypeChange(e.target.value)}
        >
          <option value="random">Random Maze</option>
          <option value="recursive">Recursive</option>
        </select>
        <select
          className="dropdown"
          onChange={(e) => onSpeedChange(e.target.value)}
        >
          <option value="fast">Fast</option>
          <option value="medium">Medium</option>
          <option value="slow">Slow</option>
        </select>
      </div>
    </div>
  );
};

export default Navbar;
