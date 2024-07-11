import React from "react";
import Node from "./Node";
import "../index.css";

const Grid = ({ grid, onMouseDown, onMouseEnter, onMouseUp }) => {
  return (
    <div className="grid">
      {grid.map((row, rowIdx) => (
        <div key={rowIdx} className="grid-row">
          {row.map((node, nodeIdx) => (
            <Node
              key={nodeIdx}
              node={node}
              onMouseDown={onMouseDown}
              onMouseEnter={onMouseEnter}
              onMouseUp={onMouseUp}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Grid;
