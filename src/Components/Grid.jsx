import React from "react";
import Square from "./GridSquare";
import { bfs } from "../Algorithms/SearchAlgorithms";

var startNodeX = 5;
var startNodeY = 7;
var endNodeX = 60;
var endNodeY = 7;

export default class Grid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: [],
    };
    this.animateBFS = this.animateBFS.bind(this);
  }

  componentDidMount() {
    const grid = [];
    for (let i = 0; i < 15; i++) {
      grid.push([]);
      for (let j = 0; j < 72; j++) {
        let isStart = i === startNodeY && j === startNodeX,
          isEnd = i === endNodeY && j === endNodeX,
          className;
        if (i === startNodeY && j === startNodeX) {
          isStart = true;
          className = "grid-square start";
        } else if (i === endNodeY && j === endNodeX) {
          isEnd = true;
          className = "grid-square end";
        } else {
          className = "grid-square unselected";
        }
        grid[i].push({
          isStart: isStart,
          isEnd: isEnd,
          y: i,
          x: j,
          id: i + "-" + j,
          isWall: false,
          onClick: (j, i) => this.onClick(j, i),
          className: className,
        });
      }
    }
    this.setState({ grid: grid });
  }

  onClick(x, y) {
    if (
      (x === startNodeX && y === startNodeY) ||
      (x === endNodeX && y === endNodeY)
    ) {
      return;
    }
    let newGrid = this.state.grid.slice();
    const node = newGrid[y][x];
    const newSquare = {
      ...node,
      isWall: !node.isWall,
      className: node.isWall
        ? "grid-square unselected"
        : "grid-square selected",
    };
    newGrid[y][x] = newSquare;
    this.setState({ grid: newGrid });
  }

  animateBFS() {
    const path = bfs(
      this.state.grid,
      startNodeX,
      startNodeY,
      endNodeX,
      endNodeY
    );
    for (let i = 1; i < path.length - 1; i++) {
      setTimeout(() => {
        // visited[i][0] = x coorinate, visited[i][1] = y coordiante
        const id = path[i][1] + "-" + path[i][0];
        document.getElementById(id).className = "grid-square visited";
      }, 5 * i);
    }
  }

  render() {
    const { grid } = this.state;
    return (
      <div className="grid" align="center">
        {grid.map((row, key) => {
          return (
            <div className="grid-row" key={key}>
              {row.map((node, key) => {
                return <Square {...node} key={key} />;
              })}
            </div>
          );
        })}
        <button onClick={this.animateBFS}>BFS</button>
      </div>
    );
  }
}
