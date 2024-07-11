import React from "react";

const Navbar = ({
  onAlgorithmChange,
  onMazeTypeChange,
  onSpeedChange,
  onResetGrid,
}) => {
  return (
    <div className="navbar">
      <h1>Pathfinding Visualizer</h1>
      <div className="nav-dropdown">
        <div className="selectName">Algorithm :</div>
        <select
          className="dropdown"
          onChange={(e) => onAlgorithmChange(e.target.value)}
        >
          <option value="dijkstra">Dijkstra</option>
          <option value="bfs">BFS</option>
          <option value="dfs">DFS</option>
          <option value="astar">A*</option>
        </select>
        <div className="selectName">Maze Type :</div>
        <select
          className="dropdown"
          onChange={(e) => onMazeTypeChange(e.target.value)}
        >
          <option value="none">None</option>
          <option value="random">Random Maze</option>
          <option value="recursive">Recursive Maze</option>
        </select>
        <div className="selectName">Speed :</div>
        <select
          className="dropdown"
          onChange={(e) => onSpeedChange(e.target.value)}
        >
          <option value="fast">Fast</option>
          <option value="medium">Medium</option>
          <option value="slow">Slow</option>
        </select>
      </div>
      <button className="resetButton" onClick={onResetGrid}>
        Reset Grid
      </button>
    </div>
  );
};

export default Navbar;
