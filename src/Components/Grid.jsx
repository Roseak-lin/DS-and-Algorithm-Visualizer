import React from "react";
import Square from "./GridSquare";
import NavigationBar from "./NavBar";

import { bfs, dfs, unweightedShortestPath } from "../Algorithms/UnweightedSearchAlgorithms";
import {
  dijkstra,
  weightedShortestPath,
} from "../Algorithms/WeightedSearchAlgorithms";
import Settings from "./Settings";

var unweightedStartNodeX = 5;
var unweightedStartNodeY = 12;
var unweightedEndNodeX = 66;
var unweightedEndNodeY = 12;

var weightedStartNodeX = 5;
var weightedStartNodeY = 12;
var weightedEndNodeX = 66;
var weightedEndNodeY = 12;

export default class Grid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mainGrid: [],
      unweightedGrid: [],
      weightedGrid: [],
      currGrid: "unweighted",
      algorithm: null,
      speed: 10,
    };

    this.visualizeAlgorithm = this.visualizeAlgorithm.bind(this);
  }

  componentDidMount() {
    // initialize grid
    let grid = [];
    for (let i = 0; i < 25; i++) {
      grid.push([]);
      for (let j = 0; j < 72; j++) {
        let isStart = i === unweightedStartNodeY && j === unweightedStartNodeX,
          isEnd = i === unweightedEndNodeY && j === unweightedEndNodeX,
          className;
        if (i === unweightedStartNodeY && j === unweightedStartNodeX) {
          isStart = true;
          className = "grid-square start";
        } else if (i === unweightedEndNodeY && j === unweightedEndNodeX) {
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
          weight: null,
          className: className,
        });
      }
    }
    this.setState({ unweightedGrid: grid });
    // set main grid to unweighted grid
    this.setState({ mainGrid: grid });

    // initialize weighted grid
    grid = [];
    for (let i = 0; i < 25; i++) {
      grid.push([]);
      for (let j = 0; j < 72; j++) {
        let isStart = i === weightedStartNodeY && j === weightedStartNodeX,
          isEnd = i === weightedEndNodeY && j === weightedEndNodeX,
          className;
        if (i === weightedStartNodeY && j === weightedStartNodeX) {
          isStart = true;
          className = "grid-square start";
        } else if (i === weightedEndNodeY && j === weightedEndNodeX) {
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
          className: className,
          weight: 0 /*Math.trunc(Math.random() * 5)*/,
        });
      }
    }
    this.setState({ weightedGrid: grid });
  }

  handleClick(x, y) {
    if (
      (x === unweightedStartNodeX && y === unweightedStartNodeY) ||
      (x === unweightedEndNodeX && y === unweightedEndNodeY)
    ) {
      return;
    }
    let newGrid = this.state.mainGrid.slice();
    let node = newGrid[y][x];

    if (this.state.currGrid === "unweighted") {
      const newSquare = {
        ...node,
        isWall: !node.isWall,
        className: node.isWall
          ? "grid-square unselected"
          : "grid-square selected",
      };
      newGrid[y][x] = newSquare;
    } else {
      const newSquare = {
        ...node,
        weight: node.weight + 1,
      };
      newGrid[y][x] = newSquare;
    }
    this.setState({ mainGrid: newGrid });
  }

  ///////////////////////////// algorithm animations //////////////////////////////////////////////

  /********************* Unweighted algorithms *********************/
  animateBFS(grid) {
    document.getElementsByClassName("grid")[0].style.pointerEvents = "none";
    const path = bfs(
      grid,
      unweightedStartNodeX,
      unweightedStartNodeY,
      unweightedEndNodeX,
      unweightedEndNodeY
    );
    let speed = this.state.speed;

    for (let i = 1; i < path.length - 1; i++) {
      setTimeout(() => {
        // visited[i][0] = x coorinate, visited[i][1] = y coordiante
        let id = path[i][1] + "-" + path[i][0];
        document.getElementById(id).className = "grid-square visited";
      }, speed * i);
    }
    setTimeout(() => {
      document.getElementsByClassName("grid")[0].style.pointerEvents = "auto";
      this.drawUnweightedShortestPath(path);
    }, path.length * speed);
  }

  animateDFS(grid) {
    document.getElementsByClassName("grid")[0].style.pointerEvents = "none";
    const path = dfs(
      grid,
      unweightedStartNodeX,
      unweightedStartNodeY,
      unweightedEndNodeX,
      unweightedEndNodeY
    );
    let speed = this.state.speed;

    for (let i = 1; i < path.length - 1; i++) {
      setTimeout(() => {
        // visited[i][0] = x coorinate, visited[i][1] = y coordiante
        let id = path[i][1] + "-" + path[i][0];
        document.getElementById(id).className = "grid-square visited";
      }, speed * i);
    }
    setTimeout(() => {
      document.getElementsByClassName("grid")[0].style.pointerEvents = "auto";
      this.drawUnweightedShortestPath(path)
    }, path.length * speed);
  }

  drawUnweightedShortestPath(path) {
    document.getElementsByClassName("grid")[0].style.pointerEvents = "none";
    const shortestPath = unweightedShortestPath(
      unweightedStartNodeX,
      unweightedStartNodeY,
      unweightedEndNodeX,
      unweightedEndNodeY,
      path
    );

    let speed = this.state.speed;

    for (let i = 0; i < shortestPath.length; i++) {
      setTimeout(() => {
        let id = shortestPath[i][1] + "-" + shortestPath[i][0];
        document.getElementById(id).className = "grid-square shortestpath"
      }, speed * i * 2);
    }

    setTimeout(() => {
      document.getElementsByClassName("grid")[0].style.pointerEvents = "auto";
    }, speed * shortestPath.length * 2);
  }

  /********************* Weighted algorithms *********************/
  animateDijkstra(grid) {
    document.getElementsByClassName("grid")[0].style.pointerEvents = "none";
    const path = dijkstra(
      grid,
      weightedStartNodeX,
      weightedStartNodeY,
      weightedEndNodeX,
      weightedEndNodeY
    );
    const speed = this.state.speed;

    for (let i = 1; i < path.length - 1; i++) {
      setTimeout(() => {
        // visited[i][0] = x coorinate, visited[i][1] = y coordiante
        let id = path[i][1] + "-" + path[i][0];
        document.getElementById(id).className = "grid-square visited";
      }, speed * i);
    }

    setTimeout(() => {
      document.getElementsByClassName("grid")[0].style.pointerEvents = "auto";
      this.drawWeightedShortestPath(path);
    }, path.length * speed);
  }

  drawWeightedShortestPath(path) {
    document.getElementsByClassName("grid")[0].style.pointerEvents = "none";
    let speed = this.state.speed;
    const shortestPath = weightedShortestPath(
      weightedStartNodeX,
      weightedStartNodeY,
      path
    );
    for (let i = 0; i < shortestPath.length; i++) {
      setTimeout(() => {
        let id = shortestPath[i][1] + "-" + shortestPath[i][0];
        document.getElementById(id).className = "grid-square shortestpath";
      }, speed * i * 2);
    }

    setTimeout(() => {
      document.getElementsByClassName("grid")[0].style.pointerEvents = "auto";
    }, shortestPath.length * speed * 2);
  }

  /////////////////// visualize button function //////////////////////////
  visualizeAlgorithm() {
    resetGrid();
    const { algorithm, mainGrid } = this.state;
    switch (algorithm) {
      case "BFS":
        this.animateBFS(mainGrid);
        break;
      case "DFS":
        this.animateDFS(mainGrid);
        break;
      case "Dijkstra's":
        this.animateDijkstra(mainGrid);
        break;
      default:
        document.getElementById("popup").style.display = "block";
        break;
    }
  }

  changeAlgorithm(key) {
    this.setState({ algorithm: key });
  }

  changeSpeed(speed) {
    if (speed === "slow") {
      this.setState({ speed: 30 });
    } else if (speed === "med") {
      this.setState({ speed: 20 });
    } else {
      this.setState({ speed: 10 });
    }
  }

  changeGrid(type) {
    resetGrid();
    if (type === "weighted" && this.state.currGrid === "unweighted") {
      this.setState({
        unweightedGrid: this.state.mainGrid,
        mainGrid: this.state.weightedGrid,
        currGrid: "weighted",
      });
    } else if (type === "unweighted" && this.state.currGrid === "weighted") {
      this.setState({
        weightedGrid: this.state.mainGrid,
        mainGrid: this.state.unweightedGrid,
        currGrid: "unweighted",
      });
    }
  }

  generateRandomGrid() {
    let grid = this.state.mainGrid.slice();
    if (this.state.currGrid === "unweighted") {
      for (let i = 0; i < 25; i++) {
        for (let j = 0; j < 72; j++) {
          if ((i === unweightedStartNodeY && j === unweightedStartNodeX) || (i === unweightedEndNodeY && j === unweightedEndNodeX)) {
            continue;
          }
          grid[i][j].isWall = Math.random() * 5 > 4;
          grid[i][j].className = grid[i][j].isWall
            ? "grid-square selected"
            : "grid-square unselected";
        }
      }
      if (this.state.currGrid === "unweighted") {
        this.setState({ mainGrid: grid });
      } else {
        this.setState({ unweightedGrid: grid });
      }
    } else {
      for (let i = 0; i < 25; i++) {
        for (let j = 0; j < 72; j++) {
          if (i === weightedEndNodeY && j === weightedEndNodeX) {
            grid[i][j].weight = 0;
            continue;
          }
          grid[i][j].weight = Math.trunc(Math.random() * 5);
        }
      }
      if (this.state.currGrid === "weighted") {
        this.setState({ mainGrid: grid });
      } else {
        this.setState({ weightedGrid: grid });
      }
    }
  }
  // Render ///////////////////////////////////////////////////
  render() {
    const { mainGrid } = this.state;
    return (
      <div className="grid" align="center">
        <Settings changeSpeed={(speed) => this.changeSpeed(speed)} />
        <NavigationBar
          onClick={this.visualizeAlgorithm}
          changeAlgorithm={(key) => this.changeAlgorithm(key)}
          changeGrid={(type) => this.changeGrid(type)}
          algorithm={this.state.algorithm}
          resetGrid={() => this.generateRandomGrid()}
        />
        {mainGrid.map((row, key) => {
          return (
            <div className="grid-row" key={key}>
              {row.map((node, key) => {
                return (
                  <Square
                    {...node}
                    handleClick={(j, i) => this.handleClick(j, i)}
                    drag={drag(node.id)}
                    drop={drop(node.id, this.state.currGrid)}
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
      if (node.classList.contains("visited") || node.classList.contains("shortestpath")) {
        node.className = "grid-square unselected";
      }
    }
  }
};

// drag and drop functions

/////////////////////////// currently incative //////////////////////////////
const drag = (id) => (e) => {
  let data = [e.target.id, id];
  e.dataTransfer.setData("data", JSON.stringify(data));
};

const drop = (id, grid) => (e) => {
  e.preventDefault();
  var data = JSON.parse(e.dataTransfer.getData("data"));
  let stringStartId = String(data[1]),
    stringEndId = String(id);
  e.target.appendChild(document.getElementById(data[0]));
  let y = parseInt(stringEndId.substring(0, stringEndId.indexOf("-"))),
    x = parseInt(
      stringEndId.substring(stringEndId.indexOf("-") + 1, stringEndId.length)
    );

  if (grid === "unweighted") {
    if (data === "start") {
      unweightedStartNodeX = x;
      unweightedStartNodeY = y;
      document.getElementById(stringEndId).className = "grid-square start";
    } else {
      unweightedEndNodeX = x;
      unweightedEndNodeY = y;
      document.getElementById(stringEndId).className = "grid-square end";
    }
    document
      .getElementById(stringStartId)
      .classList.replace("end", "unselected");
  } else {
    if (data === "start") {
      weightedStartNodeX = x;
      weightedStartNodeY = y;
      document.getElementById(stringEndId).className = "grid-square start";
    } else {
      weightedEndNodeX = x;
      weightedEndNodeY = y;
      document.getElementById(stringEndId).className = "grid-square end";
    }
    document
      .getElementById(stringStartId)
      .classList.replace("end", "unselected");
  }
};
