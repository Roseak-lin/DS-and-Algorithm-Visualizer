let visited;

export function bfs(grid, startX, startY, endX, endY) {
    initializeVisited(grid);
    let path = [];
    let queue = [];
    queue.push([startX, startY]);
    while (!!queue.length) {
        let currentNode = queue.shift();
        if (currentNode[0] < 0 || currentNode[1] < 0 || currentNode[0] >= 72 || currentNode[1] >= 25 || visited[currentNode[1]][currentNode[0]] === true) {
            continue;
        }
        visited[currentNode[1]][currentNode[0]] = true;
        path.push([currentNode[0], currentNode[1]]);
        if (currentNode[0] === endX && currentNode[1] === endY) {
            return path;
        }
        queue.push([currentNode[0] + 1, currentNode[1]]);
        queue.push([currentNode[0] - 1, currentNode[1]]);
        queue.push([currentNode[0], currentNode[1] + 1]);
        queue.push([currentNode[0], currentNode[1] - 1]);
    }

    // returns grid of visited nodes in order
    return path;
}

export function dfs(grid, startX, startY, endX, endY) {
    initializeVisited(grid);
    let path = [];
    let stack = [];
    stack.push([startX, startY]);
    while (!!stack.length) {
        let currentNode = stack.pop();
        if (currentNode[0] < 0 || currentNode[1] < 0 || currentNode[0] >= 72 || currentNode[1] >= 25 || visited[currentNode[1]][currentNode[0]] === true) {
            continue;
        }
        visited[currentNode[1]][currentNode[0]] = true;
        path.push([currentNode[0], currentNode[1]]);
        if (currentNode[0] === endX && currentNode[1] === endY) {
            return path;
        }
        stack.push([currentNode[0] + 1, currentNode[1]]);
        stack.push([currentNode[0] - 1, currentNode[1]]);
        stack.push([currentNode[0], currentNode[1] + 1]);
        stack.push([currentNode[0], currentNode[1] - 1]);
    }

    // returns grid of visited nodes in order
    return path;
}

function initializeVisited(grid) {
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