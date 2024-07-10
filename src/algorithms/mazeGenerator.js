// src/algorithms/mazeGenerator.js
export const recursiveDivisionMaze = (grid) => {
  const newGrid = grid.slice();
  divide(newGrid, 0, newGrid.length - 1, 0, newGrid[0].length - 1);
  return newGrid;
};

const divide = (grid, top, bottom, left, right) => {
  if (bottom - top < 2 || right - left < 2) return;

  const horizontal = bottom - top > right - left;
  if (horizontal) {
    const row = Math.floor(Math.random() * (bottom - top - 1)) + top + 1;
    for (let col = left; col <= right; col++) {
      grid[row][col].isWall = true;
    }
    const gap = Math.floor(Math.random() * (right - left + 1)) + left;
    grid[row][gap].isWall = false;
    divide(grid, top, row - 1, left, right);
    divide(grid, row + 1, bottom, left, right);
  } else {
    const col = Math.floor(Math.random() * (right - left - 1)) + left + 1;
    for (let row = top; row <= bottom; row++) {
      grid[row][col].isWall = true;
    }
    const gap = Math.floor(Math.random() * (bottom - top + 1)) + top;
    grid[gap][col].isWall = false;
    divide(grid, top, bottom, left, col - 1);
    divide(grid, top, bottom, col + 1, right);
  }
};
