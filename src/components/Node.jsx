import React from "react";
import "../index.css";

const Node = ({ node, onMouseDown, onMouseEnter, onMouseUp }) => {
  const { row, col, isStart, isEnd, isWall } = node;
  const extraClassName = isStart
    ? "node-start"
    : isEnd
    ? "node-end"
    : isWall
    ? "node-wall"
    : "";

  return (
    <div
      id={`node-${row}-${col}`}
      className={`node ${extraClassName}`}
      onMouseDown={() => onMouseDown(row, col)}
      onMouseEnter={() => onMouseEnter(row, col)}
      onMouseUp={() => onMouseUp()}
    ></div>
  );
};

export default Node;
