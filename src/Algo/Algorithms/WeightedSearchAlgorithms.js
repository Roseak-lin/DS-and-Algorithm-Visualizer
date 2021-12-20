const ROWS = 25;
const COLS = 72;

var visited;
var previousNode;

export function dijkstra(grid, startX, startY, endX, endY) {

    // THIS SHIT IS PLAIN WRONG | NEED FIX //
    
    // reset visited grid and previousNode grid
    resetVisited();
    resetPreviousNode();
    let q = [], path = [];
    q.push([startX, startY, null, null, 0]);
    while (!!q.length) {
        let node = q.shift();
        if (visited[node[1]][[node[0]]]) {
            continue;
        }

        visited[node[1]][node[0]] = true;
        // pushing second and third element to allow backtracking to highlight the shortest path
        path.push([node[0], node[1], node[2], node[3]]);

        if (node[2] != null && previousNode[node[1]][node[0]] === null) {
            previousNode[node[1]][node[0]] = [node[2], node[3]];
        }

        if (node[0] === endX && node[1] === endY) {
            return path;
        }

        if (node[0] + 1 < COLS) {
            q.push([node[0] + 1, node[1], node[0], node[1]]);
        }

        if (node[0] - 1 >= 0) {
            q.push([node[0] - 1, node[1], node[0], node[1]]);
        }

        if (node[1] + 1 < ROWS) {
            q.push([node[0], node[1] + 1, node[0], node[1]]);
        }

        if (node[1] - 1 >= 0) {
            q.push([node[0], node[1] - 1, node[0], node[1]]);
        }

        // sort queue to get the next neighbor with the least weight
        q.sort((a, b) => {
            return grid[a[1]][a[0]].weight - grid[b[1]][b[0]].weight;
        });
    }
    return path;
}

export function astar (grid, startX, startY, endX, endY) {
    resetPreviousNode();
    resetVisited();
    let q = [], path = [];
    q.push([startX, startY, null, null, 0]);

    while (!!q.length) {
        let node = q.shift();
        if (visited[node[1]][node[0]]) {
            continue;
        }

        visited[node[1]][node[0]] = true;
        path.push([node[0], node[1], node[2], node[3]]);
        if (node[2] != null && previousNode[node[1]][node[0]] === null) {
            previousNode[node[1]][node[0]] = [node[2], node[3]];
        }
        
        if (node[0] === endX && node[1] === endY) {
            return path;
        }


        if (node[0] + 1 < COLS) {
            q.push([node[0] + 1, node[1], node[0], node[1], node[4] + grid[node[1]][node[0]].weight]);
        }

        if (node[0] - 1 >= 0) {
            q.push([node[0] - 1, node[1], node[0], node[1], node[4] + grid[node[1]][node[0]].weight]);
        }

        if (node[1] + 1 < ROWS) {
            q.push([node[0], node[1] + 1, node[0], node[1], node[4] + grid[node[1]][node[0]].weight]);
        }

        if (node[1] - 1 >= 0) {
            q.push([node[0], node[1] - 1, node[0], node[1], node[4] + grid[node[1]][node[0]].weight]);
        }

        // sort by path weight and manhatten distance
        q.sort((a, b) => {
            return (a[4] + (Math.abs(a[1] - endY) + Math.abs(a[0] - endX))) - (b[4] + (Math.abs(b[1] - endY) + Math.abs(b[0] - endX)));
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