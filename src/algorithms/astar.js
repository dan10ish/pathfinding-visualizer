// src/algorithms/astar.js
export function astar(grid, startNode, endNode) {
  const openSet = [startNode];
  const visitedNodesInOrder = [];
  startNode.g = 0;
  startNode.f = heuristic(startNode, endNode);

  while (openSet.length) {
    sortNodesByF(openSet);
    const currentNode = openSet.shift();
    if (currentNode.isWall) continue;
    if (currentNode === endNode) return visitedNodesInOrder;
    visitedNodesInOrder.push(currentNode);
    currentNode.isVisited = true;

    const neighbors = getUnvisitedNeighbors(currentNode, grid);
    for (const neighbor of neighbors) {
      const tentativeG = currentNode.g + 1;
      if (tentativeG < neighbor.g) {
        neighbor.previousNode = currentNode;
        neighbor.g = tentativeG;
        neighbor.f = neighbor.g + heuristic(neighbor, endNode);
        if (!openSet.includes(neighbor)) {
          openSet.push(neighbor);
        }
      }
    }
  }
}

function heuristic(node, endNode) {
  const dx = Math.abs(node.col - endNode.col);
  const dy = Math.abs(node.row - endNode.row);
  return dx + dy;
}

function sortNodesByF(openSet) {
  openSet.sort((nodeA, nodeB) => nodeA.f - nodeB.f);
}

function getUnvisitedNeighbors(node, grid) {
  const neighbors = [];
  const { col, row } = node;
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  return neighbors.filter((neighbor) => !neighbor.isVisited);
}

export function getNodesInShortestPathOrderAStar(finishNode) {
  const nodesInShortestPathOrder = [];
  let currentNode = finishNode;
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
}
