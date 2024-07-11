// src/algorithms/mazeGenerator.js
export const recursiveDivisionMaze = (grid, startNode, endNode) => {
  const newGrid = grid.slice();
  divide(
    newGrid,
    0,
    newGrid.length - 1,
    0,
    newGrid[0].length - 1,
    startNode,
    endNode
  );
  return newGrid;
};

const divide = (grid, top, bottom, left, right, startNode, endNode) => {
  if (bottom - top < 2 || right - left < 2) return;

  const horizontal = bottom - top > right - left;
  if (horizontal) {
    const row = Math.floor(Math.random() * (bottom - top - 1)) + top + 1;
    for (let col = left; col <= right; col++) {
      if (!(grid[row][col] === startNode || grid[row][col] === endNode)) {
        grid[row][col].isWall = true;
      }
    }
    const gap = Math.floor(Math.random() * (right - left + 1)) + left;
    grid[row][gap].isWall = false;
    divide(grid, top, row - 1, left, right, startNode, endNode);
    divide(grid, row + 1, bottom, left, right, startNode, endNode);
  } else {
    const col = Math.floor(Math.random() * (right - left - 1)) + left + 1;
    for (let row = top; row <= bottom; row++) {
      if (!(grid[row][col] === startNode || grid[row][col] === endNode)) {
        grid[row][col].isWall = true;
      }
    }
    const gap = Math.floor(Math.random() * (bottom - top + 1)) + top;
    grid[gap][col].isWall = false;
    divide(grid, top, bottom, left, col - 1, startNode, endNode);
    divide(grid, top, bottom, col + 1, right, startNode, endNode);
  }
};
