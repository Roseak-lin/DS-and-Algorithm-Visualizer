import React from "react";
import $ from "jquery";
import Square from "./GridSquare";
import NavigationBar from "./NavBar";

import { bfs, dfs } from "../Algorithms/UnweightedSearchAlgorithms";
import { dijkstra, astar } from "../Algorithms/WeightedSearchAlgorithms";
import {
  drawUnweightedShortestPath,
  drawWeightedShortestPath,
} from "../Grid-Functions/PathDrawing";
import Settings from "./Settings";

const gridRows = 25;
const gridCols = 72;

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
      speed: 20,
    };

    this.visualizeAlgorithm = this.visualizeAlgorithm.bind(this);
  }

  componentDidMount() {
    // initialize grid
    let grid = [];
    for (let i = 0; i < gridRows; i++) {
      grid.push([]);
      for (let j = 0; j < gridCols; j++) {
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
    for (let i = 0; i < gridRows; i++) {
      grid.push([]);
      for (let j = 0; j < gridCols; j++) {
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
          weight: 0,
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
        weight: node.weight + 1 === 5 ? 0 : node.weight + 1,
      };
      newGrid[y][x] = newSquare;
    }
    this.setState({ mainGrid: newGrid });
  }

  ///////////////////////////// algorithm animations //////////////////////////////////////////////

  /********************* Unweighted algorithms *********************/
  animateBFS(grid) {
    $(".grid").css("pointer-events", "none");
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
        $("#" + id).addClass("visited");
      }, speed * i);
    }
    setTimeout(() => {
      $(".grid").css("pointer-events", "auto");
      drawUnweightedShortestPath(
        unweightedStartNodeX,
        unweightedStartNodeY,
        unweightedEndNodeX,
        unweightedEndNodeY,
        speed,
        path
      );
    }, path.length * speed);
  }

  animateDFS(grid) {
    $(".grid").css("pointer-events", "none");
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
        $("#" + id).addClass("visited");
      }, speed * i);
    }
    setTimeout(() => {
      $(".grid").css("pointer-events", "auto");
      drawUnweightedShortestPath(
        unweightedStartNodeX,
        unweightedStartNodeY,
        unweightedEndNodeX,
        unweightedEndNodeY,
        speed,
        path
      );
    }, path.length * speed);
  }

  /********************* Weighted algorithms *********************/
  animateDijkstra(grid) {
    $(".grid").css("pointer-events", "none");
    const path = dijkstra(
      grid,
      weightedStartNodeX,
      weightedStartNodeY,
      weightedEndNodeX,
      weightedEndNodeY
    );
    let speed = this.state.speed;

    for (let i = 1; i < path.length - 1; i++) {
      setTimeout(() => {
        // visited[i][0] = x coorinate, visited[i][1] = y coordiante
        let id = path[i][1] + "-" + path[i][0];
        $("#" + id).addClass("visited");
      }, speed * i);
    }

    setTimeout(() => {
      $(".grid").css("pointer-events", "auto");
      drawWeightedShortestPath(weightedEndNodeX, weightedEndNodeY, speed, path);
    }, path.length * speed);
  }

  animateAstar(grid) {
    $(".grid").css("pointer-events", "none");
    const path = astar(
      grid,
      weightedStartNodeX,
      weightedStartNodeY,
      weightedEndNodeX,
      weightedEndNodeY
    );

    let speed = this.state.speed;

    for (let i = 1; i < path.length - 1; i++) {
      setTimeout(() => {
        let id = path[i][1] + "-" + path[i][0];
        $("#" + id).addClass("visited");
      }, speed * i);
    }

    setTimeout(() => {
      $(".grid").css("pointer-events", "auto");
      drawWeightedShortestPath(weightedEndNodeX, weightedEndNodeY, speed, path);
    }, speed * path.length);
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
      case "A*":
        this.animateAstar(mainGrid);
        break;
      default:
        $("#popup").fadeIn(150);
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
      document
        .getElementById(unweightedStartNodeY + "-" + unweightedStartNodeX)
        .classList.replace("start", "unselected");
      document
        .getElementById(unweightedEndNodeY + "-" + unweightedEndNodeX)
        .classList.replace("end", "unselected");

      $("#" + weightedStartNodeY + "-" + weightedStartNodeX).append($("#start"));
      $("#" + weightedEndNodeY + "-" + weightedEndNodeX).append($("#end"));

      this.setState({
        unweightedGrid: this.state.mainGrid,
        mainGrid: this.state.weightedGrid,
        currGrid: "weighted",
      });
    } else if (type === "unweighted" && this.state.currGrid === "weighted") {
      document
        .getElementById(weightedStartNodeY + "-" + weightedStartNodeX)
        .classList.replace("start", "unselected");
      document
        .getElementById(weightedEndNodeY + "-" + weightedEndNodeX)
        .classList.replace("end", "unselected");

      $("#" + unweightedStartNodeY + "-" + unweightedStartNodeX).append(
        $("#start")
      );
      $("#" + unweightedEndNodeY + "-" + unweightedEndNodeX).append(
        $("#end")
      );

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
      for (let i = 0; i < gridRows; i++) {
        for (let j = 0; j < gridCols; j++) {
          if (
            (i === unweightedStartNodeY && j === unweightedStartNodeX) ||
            (i === unweightedEndNodeY && j === unweightedEndNodeX)
          ) {
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
      for (let i = 0; i < gridRows; i++) {
        for (let j = 0; j < gridCols; j++) {
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

  clearWeightsAndWalls() {
    let grid = [];
    if (this.state.currGrid === "unweighted") {
      for (let i = 0; i < gridRows; i++) {
        grid.push([]);
        for (let j = 0; j < gridCols; j++) {
          let isStart =
              i === unweightedStartNodeY && j === unweightedStartNodeX,
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
            weight: 0,
            className: className,
          });
        }
      }
    } else {
      for (let i = 0; i < gridRows; i++) {
        grid.push([]);
        for (let j = 0; j < gridCols; j++) {
          let isStart =
              i === unweightedStartNodeY && j === unweightedStartNodeX,
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
    }
    this.setState({ mainGrid: grid });
  }

  /////////////////// Render //////////////////////////
  render() {
    const { mainGrid } = this.state;
    return (
      <div className="grid" align="center">
        <Settings changeSpeed={(speed) => this.changeSpeed(speed)} />
        <NavigationBar
          onClick={() => this.visualizeAlgorithm()}
          changeAlgorithm={(key) => this.changeAlgorithm(key)}
          changeGrid={(type) => this.changeGrid(type)}
          algorithm={this.state.algorithm}
          generateNewGrid={() => this.generateRandomGrid()}
          clearWeightsAndWalls={() => this.clearWeightsAndWalls()}
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
  for (let i = 0; i < gridRows; i++) {
    for (let j = 0; j < gridCols; j++) {
      // set visited nodes to blank nodes
      let node = document.getElementById(i + "-" + j);
      if (
        node.classList.contains("visited") ||
        node.classList.contains("shortestpath")
      ) {
        node.className = "grid-square unselected";
      }
    }
  }
};

// drag and drop functions
const drag = (id) => (e) => {
  let data = [e.target.id, id];
  e.dataTransfer.setData("data", JSON.stringify(data));
};

const drop = (id, grid) => (e) => {
  e.preventDefault();
  let data = JSON.parse(e.dataTransfer.getData("data"));

  // stringStartId represents the id of the node that the item was initially dragged from 
  // stringEndId represents the node where data is being dropped

  let stringStartId = String(data[1]),
    stringEndId = String(id);
  e.target.appendChild(document.getElementById(data[0]));
  let y = parseInt(stringEndId.substring(0, stringEndId.indexOf("-"))),
    x = parseInt(
      stringEndId.substring(stringEndId.indexOf("-") + 1, stringEndId.length)
    );

  if (grid === "unweighted") {
    if (data[0] === "start") {
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
    if (data[0] === "start") {
      weightedStartNodeX = x;
      weightedStartNodeY = y;
      document.getElementById(stringEndId).className = "grid-square start";
      console.log(unweightedStartNodeX + " " + unweightedStartNodeY)
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
