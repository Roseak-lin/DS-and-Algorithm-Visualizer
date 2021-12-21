const ROWS = 25;
const COLS = 72;

var visited;
var previousNode;

export function dijkstra(grid, startX, startY, endX, endY) {
    // reset visited grid and previousNode grid
    resetVisited();
    resetPreviousNode();
    let q = [], path = [];
    q.push([startX, startY, null, null, 0]);
    while (!!q.length) {
        let node = q.shift();
        let x = node[0], y = node[1], prevX = node[2], prevY = node[3], weight = node[4];
        if (visited[y][x]) {
            continue;
        }

        visited[y][x] = true;
        // pushing second and third element to allow backtracking to highlight the shortest path
        path.push([x, y, prevX, prevY]);

        if (prevX !== null && previousNode[y][x] === null) {
            previousNode[y][x] = [prevX, prevY];
        }

        if (x === endX && y === endY) {
            return path;
        }

        if (x + 1 < COLS) {
            q.push([x + 1, y, x, y, weight + grid[y][x + 1].weight]);
        }

        if (x - 1 >= 0) {
            q.push([x - 1, y, x, y, weight + grid[y][x - 1].weight]);
        }

        if (y + 1 < ROWS) {
            q.push([x, y + 1, x, y, weight + grid[y + 1][x].weight]);
        }

        if (y - 1 >= 0) {
            q.push([x, y - 1, x, y, weight + grid[y - 1][x].weight]);
        }

        // sort queue to get the next neighbor with the least weight
        q.sort((a, b) => {
            return a[4] - b[4];
        });
    }
}

export function astar(grid, startX, startY, endX, endY) {
    resetPreviousNode();
    resetVisited();
    let q = [], path = [];
    q.push([startX, startY, null, null, 0]);

    while (!!q.length) {
        let node = q.shift();
        let x = node[0], y = node[1], prevX = node[2], prevY = node[3], weight = node[4];
        if (visited[y][x]) {
            continue;
        }

        visited[y][x] = true;
        path.push([x, y, prevX, prevY]);

        if (x === endX && y === endY) {
            return path;
        }
        if (prevX !== null && previousNode[y][x] === null) {
            previousNode[y][x] = [prevX, prevY];
        }

        if (x + 1 < COLS) {
            q.push([x + 1, y, x, y, weight + grid[y][x].weight]);
        }

        if (x - 1 >= 0) {
            q.push([x - 1, y, x, y, weight + grid[y][x].weight]);
        }

        if (y + 1 < ROWS) {
            q.push([x, y + 1, x, y, weight + grid[y][x].weight]);
        }

        if (y - 1 >= 0) {
            q.push([x, y - 1, x, y, weight + grid[y][x].weight]);
        }

        // sort by path weight and euclidian distance
        q.sort((a, b) => {
            return (a[4] + Math.sqrt(Math.abs(a[1] - endY) + Math.abs(a[0] - endX))) - (b[4] + Math.sqrt(Math.abs(b[1] - endY) + Math.abs(b[0] - endX)));
        });
    }
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

// method that re-initializes the visited 
function resetVisited() {
    visited = [];
    for (let i = 0; i < ROWS; i++) {
        visited.push([]);
        for (let j = 0; j < COLS; j++) {
            visited[i].push(false);
        }
    }
}

// function to reset grid that helps with finding the shortest path
function resetPreviousNode() {
    previousNode = [];
    for (let i = 0; i < ROWS; i++) {
        previousNode.push([]);
        for (let j = 0; j < COLS; j++) {
            previousNode[i].push(null);
        }
    }
}