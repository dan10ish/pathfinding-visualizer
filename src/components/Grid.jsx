// src/components/Grid.js
import React from "react";
import Node from "./Node";

const Grid = ({
  grid,
  onMouseDown,
  onMouseEnter,
  onMouseUp,
  mouseIsPressed,
}) => {
  return (
    <div className="grid">
      {grid.map((row, rowIdx) => {
        return (
          <div key={rowIdx}>
            {row.map((node, nodeIdx) => {
              const { row, col, isStart, isEnd, isWall } = node;
              return (
                <Node
                  key={nodeIdx}
                  col={col}
                  isStart={isStart}
                  isEnd={isEnd}
                  isWall={isWall}
                  mouseIsPressed={mouseIsPressed}
                  onMouseDown={(row, col) => onMouseDown(row, col)}
                  onMouseEnter={(row, col) => onMouseEnter(row, col)}
                  onMouseUp={onMouseUp}
                  row={row}
                ></Node>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Grid;
