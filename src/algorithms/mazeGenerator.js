export const generateMaze = (grid, startNode, endNode, type) => {
  const newGrid = grid.map((row) =>
    row.map((node) => ({ ...node, isWall: false }))
  );

  if (type === "random") {
    return randomMaze(newGrid, startNode, endNode);
  } else if (type === "recursive") {
    return recursiveDivisionMaze(newGrid, startNode, endNode);
  }

  return newGrid;
};

const randomMaze = (grid, startNode, endNode) => {
  const newGrid = grid.slice();
  const wallProbability = 0.3;
  const maxAttempts = 100; // Maximum number of attempts to generate a valid maze

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    // Reset the grid
    for (let row = 0; row < newGrid.length; row++) {
      for (let col = 0; col < newGrid[0].length; col++) {
        if (
          !(row === startNode.row && col === startNode.col) &&
          !(row === endNode.row && col === endNode.col)
        ) {
          newGrid[row][col].isWall = Math.random() < wallProbability;
        }
      }
    }

    // Check if a valid path exists
    if (findPath(newGrid, startNode, endNode)) {
      return newGrid;
    }
  }

  // If no valid maze is generated after maxAttempts, return an empty maze
  console.warn(
    "Failed to generate a valid random maze. Returning an empty maze."
  );
  return grid.map((row) => row.map((node) => ({ ...node, isWall: false })));
};

const recursiveDivisionMaze = (grid, startNode, endNode) => {
  const newGrid = grid.slice();
  addOuterWalls(newGrid);

  recursiveDivide(
    newGrid,
    1,
    newGrid.length - 2,
    1,
    newGrid[0].length - 2,
    chooseOrientation(newGrid.length - 2, newGrid[0].length - 2),
    startNode,
    endNode
  );

  // Ensure a valid path exists
  const path = findPath(newGrid, startNode, endNode);
  if (!path) {
    return recursiveDivisionMaze(grid, startNode, endNode); // Regenerate if no valid path
  }

  return newGrid;
};

const recursiveDivide = (
  grid,
  startRow,
  endRow,
  startCol,
  endCol,
  orientation,
  startNode,
  endNode
) => {
  if (endRow - startRow < 2 || endCol - startCol < 2) {
    return;
  }

  let horizontalDividers = [];
  let verticalDividers = [];
  let dividersCount =
    orientation === "horizontal" ? endRow - startRow : endCol - startCol;
  let dividerPlacement;

  if (orientation === "horizontal") {
    // Generate horizontal dividers
    for (let i = 0; i < dividersCount; i++) {
      horizontalDividers.push(startRow + i);
    }
    dividerPlacement = getRandomElement(horizontalDividers);
    for (let col = startCol; col <= endCol; col++) {
      if (
        grid[dividerPlacement][col].isStart ||
        grid[dividerPlacement][col].isEnd ||
        col === startCol ||
        col === endCol
      ) {
        continue;
      }
      grid[dividerPlacement][col].isWall = true;
    }
    let passage =
      Math.floor(Math.random() * (endCol - startCol + 1)) + startCol;
    grid[dividerPlacement][passage].isWall = false;
  } else {
    // Generate vertical dividers
    for (let i = 0; i < dividersCount; i++) {
      verticalDividers.push(startCol + i);
    }
    dividerPlacement = getRandomElement(verticalDividers);
    for (let row = startRow; row <= endRow; row++) {
      if (
        grid[row][dividerPlacement].isStart ||
        grid[row][dividerPlacement].isEnd ||
        row === startRow ||
        row === endRow
      ) {
        continue;
      }
      grid[row][dividerPlacement].isWall = true;
    }
    let passage =
      Math.floor(Math.random() * (endRow - startRow + 1)) + startRow;
    grid[passage][dividerPlacement].isWall = false;
  }

  // Recursive calls
  if (orientation === "horizontal") {
    recursiveDivide(
      grid,
      startRow,
      dividerPlacement - 1,
      startCol,
      endCol,
      chooseOrientation(dividerPlacement - 1 - startRow, endCol - startCol),
      startNode,
      endNode
    );
    recursiveDivide(
      grid,
      dividerPlacement + 1,
      endRow,
      startCol,
      endCol,
      chooseOrientation(endRow - (dividerPlacement + 1), endCol - startCol),
      startNode,
      endNode
    );
  } else {
    recursiveDivide(
      grid,
      startRow,
      endRow,
      startCol,
      dividerPlacement - 1,
      chooseOrientation(endRow - startRow, dividerPlacement - 1 - startCol),
      startNode,
      endNode
    );
    recursiveDivide(
      grid,
      startRow,
      endRow,
      dividerPlacement + 1,
      endCol,
      chooseOrientation(endRow - startRow, endCol - (dividerPlacement + 1)),
      startNode,
      endNode
    );
  }
};

const chooseOrientation = (width, height) => {
  if (width < height) {
    return "horizontal";
  } else if (height < width) {
    return "vertical";
  } else {
    return Math.random() < 0.5 ? "horizontal" : "vertical";
  }
};

const getRandomElement = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

const addOuterWalls = (grid) => {
  for (let i = 0; i < grid.length; i++) {
    if (i === 0 || i === grid.length - 1) {
      for (let j = 0; j < grid[0].length; j++) {
        grid[i][j].isWall = true;
      }
    } else {
      grid[i][0].isWall = true;
      grid[i][grid[0].length - 1].isWall = true;
    }
  }
};

const findPath = (grid, start, end) => {
  const queue = [start];
  const visited = new Set();
  const directions = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];

  while (queue.length > 0) {
    const current = queue.shift();
    if (current.row === end.row && current.col === end.col) {
      return true;
    }

    for (let [dx, dy] of directions) {
      const newRow = current.row + dx;
      const newCol = current.col + dy;
      const key = `${newRow},${newCol}`;

      if (
        newRow >= 0 &&
        newRow < grid.length &&
        newCol >= 0 &&
        newCol < grid[0].length &&
        !grid[newRow][newCol].isWall &&
        !visited.has(key)
      ) {
        queue.push(grid[newRow][newCol]);
        visited.add(key);
      }
    }
  }

  return false;
};

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};
