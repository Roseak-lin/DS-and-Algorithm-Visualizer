var visited;
var previousNode;

// Breadth first search
export function bfs(grid, startX, startY, endX, endY) {
    resetPreviousNode(grid);
    resetVisited(grid);
    let path = [];
    let queue = [];
    queue.push([startX, startY]);
    while (!!queue.length) {
        let currentNode = queue.shift();
        if (currentNode[0] < 0 || currentNode[1] < 0 || currentNode[0] >= 72 || currentNode[1] >= 25 || visited[currentNode[1]][currentNode[0]] === true) {
            continue;
        }

        previousNode[currentNode[1]][currentNode[0]] = [currentNode[2], currentNode[3]];
        visited[currentNode[1]][currentNode[0]] = true;
        path.push([currentNode[0], currentNode[1]]);

        // return the path if the end node was found
        if (currentNode[0] === endX && currentNode[1] === endY) {
            return path;
        }

        queue.push([currentNode[0] + 1, currentNode[1], currentNode[0], currentNode[1]]);
        queue.push([currentNode[0] - 1, currentNode[1], currentNode[0], currentNode[1]]);
        queue.push([currentNode[0], currentNode[1] + 1, currentNode[0], currentNode[1]]);
        queue.push([currentNode[0], currentNode[1] - 1, currentNode[0], currentNode[1]]);
    }

    // returns the path if the end node was unreachable
    return path;
}

// Depth first search
export function dfs(grid, startX, startY, endX, endY) {
    resetPreviousNode(grid);
    resetVisited(grid);
    let path = [];
    let stack = [];
    stack.push([startX, startY]);
    while (!!stack.length) {
        let currentNode = stack.pop();
        if (currentNode[0] < 0 || currentNode[1] < 0 || currentNode[0] >= 72 || currentNode[1] >= 25 || visited[currentNode[1]][currentNode[0]]) {
            continue;
        }
        
        previousNode[currentNode[1]][currentNode[0]] = [currentNode[2], currentNode[3]];
        visited[currentNode[1]][currentNode[0]] = true;
        path.push([currentNode[0], currentNode[1]]);
        
        if (currentNode[0] === endX && currentNode[1] === endY) {
            return path;
        }

        stack.push([currentNode[0] - 1, currentNode[1], currentNode[0], currentNode[1]]);
        stack.push([currentNode[0] + 1, currentNode[1], currentNode[0], currentNode[1]]);
        stack.push([currentNode[0], currentNode[1] - 1, currentNode[0], currentNode[1]]);
        stack.push([currentNode[0], currentNode[1] + 1, currentNode[0], currentNode[1]]);
    }

    // returns the path if the end node was unreachable
    return path;
}

// returns the path the algorithm took to reach the end node
export function unweightedShortestPath(startX, startY, endX, endY, path) {
    // do not do anything if the end node was not found in the search
    if (!visited[endY][endX]) {
        return;
    }
    let currX = path[path.length - 1][0], currY = path[path.length - 1][1];
    let shortestPath = [];
    while (currX !== startX || currY !== startY) {
        shortestPath.push([currX, currY]);

        let temp = [currX, currY];
        currX = previousNode[temp[1]][temp[0]][0];
        currY = previousNode[temp[1]][temp[0]][1];
    }

    return shortestPath;
}

function resetVisited(grid) {
    // function to allow algorithms to have a visited array
    visited = [];
    for (let i = 0; i < 25; i++) {
        visited.push([]);
        for (let j = 0; j < 72; j++) {
            if (grid[i][j].isWall) {
                visited[i].push(true);
            } else {
                visited[i].push(false);
            }
        }
    }
}

function resetPreviousNode(grid) {
    previousNode = [];
    for (let i = 0; i < grid.length; i++) {
        previousNode.push([]);
        for (let j = 0; j < grid[i].length; j++) {
            previousNode[i].push(null);
        }
    }
}