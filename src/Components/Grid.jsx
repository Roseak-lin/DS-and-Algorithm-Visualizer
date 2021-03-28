import React from "react";
import Square from "./GridSquare";
import Popup from "./PopupWarning";
import NavigationBar from "./NavBar"

import { bfs, dfs } from "../Algorithms/SearchAlgorithms";

var startNodeX = 5;
var startNodeY = 12;
var endNodeX = 66;
var endNodeY = 12;

export default class Grid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: [],
      algorithm: null,
    };

    this.visualizeAlgorithm = this.visualizeAlgorithm.bind(this);
  }

  componentDidMount() {
    // initialize grid
    const grid = [];
    for (let i = 0; i < 25; i++) {
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
          className: className,
        });
      }
    }
    this.setState({ grid: grid });
  }

  handleClick(x, y) {
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

  // algorithm animations //////////////////////////////////////////////

  animateBFS(grid) {
    document.getElementsByClassName("grid")[0].style.pointerEvents = "none";
    const path = bfs(grid, startNodeX, startNodeY, endNodeX, endNodeY);

    for (let i = 1; i < path.length; i++) {
      if (path[i][1] === endNodeY && path[i][0] === endNodeX) {
        break;
      }
      setTimeout(() => {
        // visited[i][0] = x coorinate, visited[i][1] = y coordiante
        const id = path[i][1] + "-" + path[i][0];
        document.getElementById(id).className = "grid-square visited";
      }, 6 * i);
    }
    setTimeout(() => {
      document.getElementsByClassName("grid")[0].style.pointerEvents = "auto";
    }, path.length * 7);
  }

  animateDFS(grid) {
    document.getElementsByClassName("grid")[0].style.pointerEvents = "none";
    const path = dfs(grid, startNodeX, startNodeY, endNodeX, endNodeY);

    for (let i = 1; i < path.length; i++) {
      if (path[i][1] === endNodeY && path[i][0] === endNodeX) {
        break;
      }
      setTimeout(() => {
        // visited[i][0] = x coorinate, visited[i][1] = y coordiante
        const id = path[i][1] + "-" + path[i][0];
        document.getElementById(id).className = "grid-square visited";
      }, 6 * i);
    }
    setTimeout(() => {
      document.getElementsByClassName("grid")[0].style.pointerEvents = "auto";
    }, path.length * 6);
  }

  // visualize button function /////////////////////////////////////////////////
  visualizeAlgorithm() {
    resetGrid();
    const { algorithm, grid } = this.state;
    if (algorithm === null) {
      document.getElementById("popup").style.display = "block";
    } else if (algorithm === "bfs") {
      this.animateBFS(grid);
    } else {
      this.animateDFS(grid);
    }
  }

  // changes the algorithm when a tab is clicked on navbar
  changeAlgorithm(key) {
    this.setState({algorithm: key});
  }

  // Render ///////////////////////////////////////////////////
  render() {
    const { grid } = this.state;
    return (
      <div className="grid" align="center">
        <Popup />
        <NavigationBar
          onSelect={(key) => this.changeAlgorithm(key)}
          onClick={this.visualizeAlgorithm}
        />
        
        {grid.map((row, key) => {
          return (
            <div className="grid-row" key={key}>
              {row.map((node, key) => {
                return (
                  <Square
                    {...node}
                    handleClick={(j, i) => this.handleClick(j, i)}
                    drag={drag()}
                    drop={drop(node.id)}
                    key={key}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    );
  }
}

// JavaScript functions

const resetGrid = () => {
  for (let i = 0; i < 25; i++) {
    for (let j = 0; j < 72; j++) {
      // set visited nodes to blank nodes
      let node = document.getElementById(i + "-" + j);
      if (node.classList.contains("visited")) {
        node.className = "grid-square unselected";
      }
    }
  }
};

// drag and drop functions
const drag = () => (e) => {
  e.dataTransfer.setData("data", e.target.id);
};

const drop = (id) => (e) => {
  e.preventDefault();
  var data = e.dataTransfer.getData("data");
  let stringId = String(id);
  e.target.appendChild(document.getElementById(data));
  let y = parseInt(stringId.substring(0, stringId.indexOf("-"))),
    x = parseInt(
      stringId.substring(stringId.indexOf("-") + 1, stringId.length)
    );

  if (data === "start") {
    startNodeX = x;
    startNodeY = y;
  } else {
    endNodeX = x;
    endNodeY = y;
  }
};
