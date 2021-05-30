import React from "react";
import $ from "jquery";

import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import gear from "../Images/gear.png";

import algo from "../AlgoVisualizer.module.css";

export default class NavigationBar extends React.Component {
  componentDidMount() {
    document
      .querySelector(".nav-link")
      .addEventListener("hover", () => console.log("h"));
  }

  render() {
    const {
      changeAlgorithm,
      changeGrid,
      onClick,
      generateNewGrid,
      clearWeightsAndWalls,
    } = this.props;

    return (
      <Nav
        justify
        id="nav"
        fill="true"
        variant="pills"
        onSelect={(eventKey) => {
          changeAlgorithm(eventKey);
        }}
      >
        <Nav.Item>
          <Nav.Link className={algo.nav_title}>Algorithm Visualizer</Nav.Link>
        </Nav.Item>

        <NavDropdown title="Unweighted algorithms">
          <NavDropdown.Item
            eventKey="BFS"
            onClick={() => {
              changeGrid("unweighted");
            }}
          >
            Breadth First Search
          </NavDropdown.Item>
          <NavDropdown.Item
            eventKey="DFS"
            onClick={() => {
              changeGrid("unweighted");
            }}
          >
            Depth First Search
          </NavDropdown.Item>
        </NavDropdown>

        <button className={algo.navbar_btn} onClick={onClick}>
          Visualize
          {this.props.algorithm == null ? "" : " " + this.props.algorithm}!
        </button>

        <NavDropdown title="Weighted algorithms">
          <NavDropdown.Item
            eventKey="Dijkstra's"
            onClick={() => {
              changeGrid("weighted");
            }}
          >
            Dijkstra's
          </NavDropdown.Item>
          <NavDropdown.Item
            eventKey="A*"
            onClick={() => {
              changeGrid("weighted");
            }}
          >
            A*
          </NavDropdown.Item>
        </NavDropdown>

        <Nav.Item
          onClick={() => {
            generateNewGrid();
          }}
        >
          <Nav.Link>Generate random grid</Nav.Link>
        </Nav.Item>

        <Nav.Item
          onClick={() => {
            clearWeightsAndWalls();
          }}
        >
          <Nav.Link>Clear walls/weights</Nav.Link>
        </Nav.Item>

        <Nav.Item>
          {/* Blank space to seperate settings from algorithms */}
        </Nav.Item>

        <button
          id={algo.settings_btn}
          onClick={() => {
            $(`#${algo.settings_bg}`).fadeIn(150);
          }}
        >
          <img src={gear} alt="settings" id={algo.gear} />
        </button>
      </Nav>
    );
  }
}
