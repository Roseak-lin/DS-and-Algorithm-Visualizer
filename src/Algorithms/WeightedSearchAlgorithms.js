var visited;
var previousNode;

export function dijkstra(grid, startX, startY, endX, endY) {
    // reset visited grid and previousNode grid
    initializeVisited(grid);
    resetPreviousNode(grid);
    let q = [], path = [];
    q.push([startX, startY, null]);
    while (!!q.length) {
        let currentNode = q.shift();
        if (currentNode[0] < 0 || currentNode[1] < 0 || currentNode[0] >= 72 || currentNode[1] >= 25 || visited[currentNode[1]][[currentNode[0]]]) {
            continue;
        }

        visited[currentNode[1]][currentNode[0]] = true;
        path.push([currentNode[0], currentNode[1], currentNode[2], currentNode[3]]);

        if (currentNode[2] != null && previousNode[currentNode[1]][currentNode[0]] === null) {
            previousNode[currentNode[1]][currentNode[0]] = [currentNode[2], currentNode[3]];
        }

        if (currentNode[0] === endX && currentNode[1] === endY) {
            return path;
        }

        // pushing second and third element to allow backtracking to highlight the shortest path
        if (currentNode[0] + 1 <= 71) {
            q.push([currentNode[0] + 1, currentNode[1], currentNode[0], currentNode[1]]);
        }

        if (currentNode[0] - 1 >= 0) {
            q.push([currentNode[0] - 1, currentNode[1], currentNode[0], currentNode[1]]);
        }

        if (currentNode[1] + 1 <= 24) {
            q.push([currentNode[0], currentNode[1] + 1, currentNode[0], currentNode[1]]);
        }

        if (currentNode[1] - 1 >= 0) {
            q.push([currentNode[0], currentNode[1] - 1, currentNode[0], currentNode[1]]);
        }

        // sort queue to get the next neighbor with the least weight
        q = sortQueue(q, grid);
    }
    return path;
}

// function that will return the shortest path
export function weightedShortestPath(startX, startY, path) {
    let currX = path[path.length - 1][2], currY = path[path.length - 1][3];
    let shortestPath = [];

    while (currX !== startX || currY !== startY) {
        shortestPath.push([currX, currY]);
        if (previousNode[currY][currX] === null) {
            break;
        }

        let currNode = [currX, currY];
        currX = previousNode[currNode[1]][currNode[0]][0];
        currY = previousNode[currNode[1]][currNode[0]][1];

    }
    return shortestPath;
}

// sorting the queue such that it behaves like a priority queue
function sortQueue(arr, grid) {
    arr.sort((a, b) => {
        return grid[a[1]][a[0]].weight - grid[b[1]][b[0]].weight;
    });
    return arr;
}

// method that re initializes the visited 
function initializeVisited(grid) {
    visited = [];
    for (let i = 0; i < grid.length; i++) {
        visited.push([]);
        for (let j = 0; j < grid[i].length; j++) {
            visited[i].push(false);
        }
    }
}

// function to reset grid that helps with finding the shortest path
function resetPreviousNode(grid) {
    previousNode = [];
    for (let i = 0; i < grid.length; i++) {
        previousNode.push([]);
        for (let j = 0; j < grid[i].length; j++) {
            previousNode[i].push(null);
        }
    }
}