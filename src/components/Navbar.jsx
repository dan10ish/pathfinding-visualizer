import React from "react";
import { Github, User } from "lucide-react";

const Navbar = ({
  algorithm,
  mazeType,
  onAlgorithmChange,
  onMazeTypeChange,
  onSpeedChange,
  onResetGrid,
  onVisualize,
  isGeneratingMaze,
}) => {
  return (
    <div className="navbar">
      <div className="title-section">
        <h1>Pathfinding Visualizer</h1>
        <div className="nav-links">
          <a 
            href="https://danish.bio" 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="Visit Danish's website"
          >
            <User size={20} />
          </a>
          <a 
            href="https://github.com/dan10ish/pathfinding-visualizer" 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="View source code on GitHub"
          >
            <Github size={20} />
          </a>
        </div>
      </div>
      <div className="nav-dropdown">
        <label htmlFor="algorithm-select" className="selectName">Algorithm :</label>
        <select
          id="algorithm-select"
          className="dropdown"
          value={algorithm}
          onChange={(e) => onAlgorithmChange(e.target.value)}
        >
          <option value="dijkstra">Dijkstra</option>
          <option value="bfs">BFS</option>
          <option value="dfs">DFS</option>
          <option value="astar">A*</option>
        </select>
        <label htmlFor="maze-select" className="selectName">Maze Type :</label>
        <select
          id="maze-select"
          className="dropdown"
          value={mazeType}
          onChange={(e) => onMazeTypeChange(e.target.value)}
        >
          <option value="none">None</option>
          <option value="random">Random Maze</option>
          <option value="recursive">Recursive Maze</option>
        </select>
        <label htmlFor="speed-select" className="selectName">Speed :</label>
        <select
          id="speed-select"
          className="dropdown"
          onChange={(e) => onSpeedChange(e.target.value)}
        >
          <option value="fast">Fast</option>
          <option value="medium">Medium</option>
          <option value="slow">Slow</option>
        </select>
      </div>
      <div className="button-group">
        <button 
          className="visualizeButton" 
          onClick={onVisualize}
          disabled={isGeneratingMaze}
        >
          Visualize {algorithm.toUpperCase()}
        </button>
        <button className="resetButton" onClick={onResetGrid}>
          Reset Grid
        </button>
      </div>
    </div>
  );
};

export default Navbar;
