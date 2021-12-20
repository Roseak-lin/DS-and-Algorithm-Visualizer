import React from "react";
import $ from "jquery";
import Square from "./GridSquare";
import NavigationBar from "./NavBar";

import {
  bfs,
  dfs,
  unweightedShortestPath,
} from "../Algorithms/UnweightedSearchAlgorithms";
import {
  dijkstra,
  astar,
  weightedShortestPath,
} from "../Algorithms/WeightedSearchAlgorithms";
import Settings from "./Settings";

import algo from "../AlgoVisualizer.module.css";

const GRID_ROWS = 25;
const GRID_COLS = 72;

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
  }

  componentDidMount() {
    // initialize grids
    let uGrid = [],
      wGrid = [];
    for (let i = 0; i < GRID_ROWS; i++) {
      uGrid.push([]);
      wGrid.push([]);
      for (let j = 0; j < GRID_COLS; j++) {
        uGrid[i].push({
          id: i + "-" + j,
          isWall: false,
          isStart: i === weightedStartNodeY && j === weightedStartNodeX,
          isEnd: i === weightedEndNodeY && j === weightedEndNodeX,
          className:
            i === weightedStartNodeY && j === weightedStartNodeX
              ? `${algo.grid_square} ${algo.start}`
              : i === weightedEndNodeY && j === weightedEndNodeX
              ? `${algo.grid_square} ${algo.end}`
              : `${algo.grid_square} ${algo.unselected}`,
          weight: 0,
        });
        wGrid[i].push({
          id: i + "-" + j,
          isWall: false,
          isStart: i === weightedStartNodeY && j === weightedStartNodeX,
          isEnd: i === weightedEndNodeY && j === weightedEndNodeX,
          className:
            i === weightedStartNodeY && j === weightedStartNodeX
              ? `${algo.grid_square} ${algo.start}`
              : i === weightedEndNodeY && j === weightedEndNodeX
              ? `${algo.grid_square} ${algo.end}`
              : `${algo.grid_square} ${algo.unselected}`,
          weight: 0,
        });
      }
    }

    this.setState({ unweightedGrid: uGrid });
    this.setState({ weightedGrid: wGrid });

    // set main grid to unweighted grid
    this.setState({ mainGrid: uGrid });
  }

  handleClick(x, y) {
    if ($("#" + y + "-" + x).has("img").length === 1) {
      return;
    }

    let newGrid = this.state.mainGrid.slice();

    if (this.state.currGrid === "unweighted") {
      newGrid[y][x] = {
        ...newGrid[y][x],
        isWall: !newGrid[y][x].isWall,
        className: newGrid[y][x].isWall
          ? `${algo.grid_square} ${algo.unselected}`
          : `${algo.grid_square} ${algo.selected}`,
      };
    } else {
      newGrid[y][x] = {
        ...newGrid[y][x],
        weight: newGrid[y][x].weight + 1 === 5 ? 0 : newGrid[y][x].weight + 1,
      };
    }
    this.setState({ mainGrid: newGrid });
  }

  ///////////////////////////// algorithm animations /////////////////////////////

  /********************* Unweighted algorithms *********************/
  animateBFS(grid) {
    $(`.${algo.algo_app}`).css("pointer-events", "none");
    const path = bfs(
      grid,
      unweightedStartNodeX,
      unweightedStartNodeY,
      unweightedEndNodeX,
      unweightedEndNodeY
    );
    let speed = this.state.speed;
    let stateGrid = this.state.mainGrid;

    for (let i = 1; i < path.length - 1; i++) {
      setTimeout(() => {
        let id = path[i][1] + "-" + path[i][0];
        $("#" + id).addClass(`${algo.visited}`);
        stateGrid[path[i][1]][
          path[i][0]
        ].className = `${algo.grid_square} ${algo.visited}`;
      }, speed * i);
    }

    setTimeout(() => {
      $(`.${algo.algo_app}`).css("pointer-events", "auto");
      this.drawUnweightedShortestPath(
        unweightedStartNodeX,
        unweightedStartNodeY,
        unweightedEndNodeX,
        unweightedEndNodeY,
        speed,
        path
      );
      this.setState({ mainGrid: stateGrid });
    }, path.length * speed);
  }

  animateDFS(grid) {
    $(`.${algo.algo_app}`).css("pointer-events", "none");
    const path = dfs(
      grid,
      unweightedStartNodeX,
      unweightedStartNodeY,
      unweightedEndNodeX,
      unweightedEndNodeY
    );
    let speed = this.state.speed;
    let stateGrid = this.state.mainGrid;

    for (let i = 1; i < path.length - 1; i++) {
      setTimeout(() => {
        let id = path[i][1] + "-" + path[i][0];
        $("#" + id).addClass(`${algo.visited}`);
        stateGrid[path[i][1]][
          path[i][0]
        ].className = `${algo.grid_square} ${algo.visited}`;
      }, speed * i);
    }
    setTimeout(() => {
      $(`.${algo.algo_app}`).css("pointer-events", "auto");
      this.drawUnweightedShortestPath(
        unweightedStartNodeX,
        unweightedStartNodeY,
        unweightedEndNodeX,
        unweightedEndNodeY,
        speed,
        path
      );
      this.setState({ mainGrid: stateGrid });
    }, path.length * speed);
  }

  /********************* Weighted algorithms *********************/

  animateDijkstra(grid) {
    $(`.${algo.algo_app}`).css("pointer-events", "none");
    const path = dijkstra(
      grid,
      weightedStartNodeX,
      weightedStartNodeY,
      weightedEndNodeX,
      weightedEndNodeY
    );
    let speed = this.state.speed;
    let stateGrid = this.state.mainGrid;

    for (let i = 1; i < path.length - 1; i++) {
      setTimeout(() => {
        let id = path[i][1] + "-" + path[i][0];
        $("#" + id).addClass(`${algo.visited}`);
        stateGrid[path[i][1]][
          path[i][0]
        ].className = `${algo.grid_square} ${algo.visited}`;
      }, speed * i);
    }

    setTimeout(() => {
      $(`.${algo.algo_app}`).css("pointer-events", "auto");
      this.drawWeightedShortestPath(
        weightedEndNodeX,
        weightedEndNodeY,
        speed,
        path
      );
      this.setState({ mainGrid: stateGrid });
    }, path.length * speed);
  }

  animateAstar(grid) {
    $(`.${algo.algo_app}`).css("pointer-events", "none");
    const path = astar(
      grid,
      weightedStartNodeX,
      weightedStartNodeY,
      weightedEndNodeX,
      weightedEndNodeY
    );

    let speed = this.state.speed;
    let stateGrid = this.state.mainGrid;

    for (let i = 1; i < path.length - 1; i++) {
      setTimeout(() => {
        let id = path[i][1] + "-" + path[i][0];
        $("#" + id).addClass(`${algo.visited}`);
        stateGrid[path[i][1]][
          path[i][0]
        ].className = `${algo.grid_square} ${algo.visited}`;
      }, speed * i);
    }

    setTimeout(() => {
      $(`${algo.grid}`).css("pointer-events", "auto");
      this.drawWeightedShortestPath(
        weightedEndNodeX,
        weightedEndNodeY,
        speed,
        path
      );
      this.setState({ mainGrid: stateGrid });
    }, speed * path.length);
  }

  /////////////////// draw paths //////////////////////////

  drawUnweightedShortestPath(
    unweightedStartNodeX,
    unweightedStartNodeY,
    unweightedEndNodeX,
    unweightedEndNodeY,
    speed,
    path
  ) {
    let grid = this.state.mainGrid;
    const shortestPath = unweightedShortestPath(
      unweightedStartNodeX,
      unweightedStartNodeY,
      unweightedEndNodeX,
      unweightedEndNodeY,
      path
    );
    for (let i = 1; i < shortestPath.length; i++) {
      setTimeout(() => {
        let id = shortestPath[i][1] + "-" + shortestPath[i][0];
        $("#" + id).attr("class", `${algo.grid_square} ${algo.shortestpath}`);
        grid[shortestPath[i][1]][
          shortestPath[i][0]
        ].className = `${algo.grid_square} ${algo.shortestpath}`;
      }, speed * i * 2);
    }

    setTimeout(() => {
      $(`.${algo.algo_app}`).css("pointer-events", "auto");
      this.setState({ mainGrid: grid });
    }, speed * shortestPath.length * 2);
  }

  drawWeightedShortestPath(
    weightedStartNodeX,
    weightedStartNodeY,
    speed,
    path
  ) {
    let grid = this.state.mainGrid;
    const shortestPath = weightedShortestPath(
      weightedStartNodeX,
      weightedStartNodeY,
      path
    );
    for (let i = 0; i < shortestPath.length - 1; i++) {
      setTimeout(() => {
        let id = shortestPath[i][1] + "-" + shortestPath[i][0];
        $("#" + id).attr("class", `${algo.grid_square} ${algo.shortestpath}`);
        grid[shortestPath[i][1]][
          shortestPath[i][0]
        ].className = `${algo.grid_square} ${algo.shortestpath}`;
      }, speed * i * 2);
    }

    setTimeout(() => {
      $(`.${algo.algo_app}`).css("pointer-events", "auto");
      this.setState({ mainGrid: grid });
    }, shortestPath.length * speed * 2);
  }

  /////////////////// visualize button function //////////////////////////
  visualizeAlgorithm() {
    this.resetGrid();
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
        $(`#${algo.popup}`).fadeIn(150);
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
      this.setState({ speed: 15 });
    }
  }

  changeGrid(type) {
    this.resetGrid();
    if (type === "weighted" && this.state.currGrid === "unweighted") {
      this.setState({
        currGrid: "weighted",
        unweightedGrid: this.state.mainGrid,
        mainGrid: this.state.weightedGrid,
      });
    } else if (type === "unweighted" && this.state.currGrid === "weighted") {
      this.setState({
        currGrid: "unweighted",
        weightedGrid: this.state.mainGrid,
        mainGrid: this.state.unweightedGrid,
      });
    }
  }

  generateRandomGrid() {
    let grid = this.state.mainGrid.slice();
    if (this.state.currGrid === "unweighted") {
      for (let i = 0; i < GRID_ROWS; i++) {
        for (let j = 0; j < GRID_COLS; j++) {
          if (
            (i === unweightedStartNodeY && j === unweightedStartNodeX) ||
            (i === unweightedEndNodeY && j === unweightedEndNodeX)
          ) {
            continue;
          }
          grid[i][j].isWall = Math.random() * 5 > 4;
          grid[i][j].className = grid[i][j].isWall
            ? `${algo.grid_square} ${algo.selected}`
            : `${algo.grid_square} ${algo.unselected}`;
        }
      }
      this.setState({ mainGrid: grid });
    } else {
      for (let i = 0; i < GRID_ROWS; i++) {
        for (let j = 0; j < GRID_COLS; j++) {
          if (
            (i === weightedStartNodeY && j === weightedStartNodeX) ||
            (i === weightedEndNodeY && j === weightedEndNodeX)
          ) {
            grid[i][j].weight = 0;
            continue;
          }
          grid[i][j].weight = Math.trunc(Math.random() * 5);
        }
      }
      this.setState({ mainGrid: grid });
    }
  }

  clearWeightsAndWalls() {
    let grid = [];
    if (this.state.currGrid === "unweighted") {
      for (let i = 0; i < GRID_ROWS; i++) {
        grid.push([]);
        for (let j = 0; j < GRID_COLS; j++) {
          grid[i].push({
            id: i + "-" + j,
            isStart: i === unweightedStartNodeY && j === unweightedStartNodeX,
            isEnd: i === unweightedEndNodeY && j === unweightedEndNodeX,
            className:
              i === unweightedStartNodeY && j === unweightedStartNodeX
                ? `${algo.grid_square} ${algo.start}`
                : i === unweightedEndNodeY && j === unweightedEndNodeX
                ? `${algo.grid_square} ${algo.end}`
                : `${algo.grid_square} ${algo.unselected}`,
            weight: 0,
          });
        }
      }
    } else {
      for (let i = 0; i < GRID_ROWS; i++) {
        grid.push([]);
        for (let j = 0; j < GRID_COLS; j++) {
          grid[i].push({
            id: i + "-" + j,
            isStart: i === weightedStartNodeY && j === weightedStartNodeX,
            isEnd: i === weightedEndNodeY && j === weightedEndNodeX,
            className:
              i === weightedStartNodeY && j === weightedStartNodeX
                ? `${algo.grid_square} ${algo.start}`
                : i === weightedEndNodeY && j === weightedEndNodeX
                ? `${algo.grid_square} ${algo.end}`
                : `${algo.grid_square} ${algo.unselected}`,
            weight: 0,
          });
        }
      }
    }
    this.setState({ mainGrid: grid });
  }

  dragAndDropUpdate(id, e) {
    let newGrid = this.state.mainGrid.slice();
    let data = JSON.parse(e.dataTransfer.getData("data"));

    // sX = startX, sY = startY
    // eX = endX, eY = endY

    let sY = data[1].substring(0, data[1].indexOf("-"));
    let sX = data[1].substring(data[1].indexOf("-") + 1, data[1].length);
    let eY = id.substring(0, id.indexOf("-"));
    let eX = id.substring(id.indexOf("-") + 1, id.length);

    if (data[0] === `${algo.start}`) {
      newGrid[sY][sX].isStart = false;
      newGrid[eY][eX].isStart = true;

      newGrid[sY][sX].className = `${algo.grid_square} ${algo.unselected}`;
      newGrid[eY][eX].className = `${algo.grid_square} ${algo.start}`;
    } else {
      newGrid[sY][sX].isEnd = false;
      newGrid[eY][eX].isEnd = true;

      newGrid[sY][sX].className = `${algo.grid_square} ${algo.unselected}`;
      newGrid[eY][eX].className = `${algo.grid_square} ${algo.end}`;
    }

    if (newGrid[eY][eX].isWall) {
      newGrid[eY][eX].isWall = false;
    }

    if (this.state.currGrid === "weighted") {
      newGrid[eY][eX].weight = 0;
    }

    this.setState({ mainGrid: newGrid });
  }

  resetGrid() {
    // set visited nodes to blank nodes but not blocked off nodes
    let grid = this.state.mainGrid;
    for (let i = 0; i < GRID_ROWS; i++) {
      for (let j = 0; j < GRID_COLS; j++) {
        // set visited nodes to blank nodes
        let nodeClass = String(grid[i][j].className);
        if (
          nodeClass.includes("visited") ||
          nodeClass.includes("shortestpath")
        ) {
          grid[i][j].className = `${algo.grid_square} ${algo.unselected}`;
        }
      }
    }
    this.setState({ mainGrid: grid });
  }

  /////////////////// Render ///////////////////
  render() {
    const { mainGrid } = this.state;
    return (
      <div className={`${algo.algo_app}`} align="center">
        <Settings changeSpeed={(speed) => this.changeSpeed(speed)} />
        <NavigationBar
          onClick={() => this.visualizeAlgorithm()}
          changeAlgorithm={(key) => this.changeAlgorithm(key)}
          changeGrid={(type) => this.changeGrid(type)}
          algorithm={this.state.algorithm}
          generateNewGrid={() => this.generateRandomGrid()}
          clearWeightsAndWalls={() => this.clearWeightsAndWalls()}
        />
        <div id={`${algo.grid}`}>
          {mainGrid.map((row, key) => {
            return (
              <div className={`${algo.grid_row}`} key={key}>
                {row.map((node, key) => {
                  return (
                    <Square
                      {...node}
                      handleClick={(j, i) => this.handleClick(j, i)}
                      drag={drag()}
                      drop={drop(node.id, this.state.currGrid)}
                      key={key}
                      dragAndDropUpdate={(e, id) =>
                        this.dragAndDropUpdate(e, id)
                      }
                    />
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

// JavaScript functions

// drag and drop functions
const drag = () => (e) => {
  let data = [e.target.id, e.target.parentNode.id];
  e.dataTransfer.setData("data", JSON.stringify(data));
};

const drop = (id, grid) => (e) => {
  e.preventDefault();
  let data = JSON.parse(e.dataTransfer.getData("data"));

  // stringEndId represents the node where data is being dropped

  let stringEndId = String(id);
  let y = parseInt(stringEndId.substring(0, stringEndId.indexOf("-")));
  let x = parseInt(
    stringEndId.substring(stringEndId.indexOf("-") + 1, stringEndId.length)
  );
  e.target.appendChild(document.getElementById(data[0]));

  if (grid === "unweighted") {
    if (data[0] === `${algo.start}`) {
      unweightedStartNodeX = x;
      unweightedStartNodeY = y;
    } else {
      unweightedEndNodeX = x;
      unweightedEndNodeY = y;
    }
  } else {
    if (data[0] === `${algo.start}`) {
      weightedStartNodeX = x;
      weightedStartNodeY = y;
    } else {
      weightedEndNodeX = x;
      weightedEndNodeY = y;
    }
  }
};
