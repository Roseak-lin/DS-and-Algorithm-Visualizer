import React from "react";

import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import gear from "../Images/gear.png";

export default class NavigationBar extends React.Component {
  render() {
    const { changeAlgorithm, changeGrid, onClick, resetGrid } = this.props;
    return (
      <Nav
        justify
        id="nav"
        style={{ width: 100 + "%" }}
        fill="true"
        variant="pills"
        onSelect={(eventKey) => {
          changeAlgorithm(eventKey);
        }}
      >
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

        <button id="navbar-btn" onClick={onClick}>
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

        <button id="navbar-btn" onClick={resetGrid}>
          Generate random grid
        </button>

        <Nav.Item>
          {/* Blank space to seperate settings from algorithms */}
        </Nav.Item>

        <button id="settings-btn" onClick={displaySettings}>
          <img src={gear} alt="settings" id="gear" />
        </button>
      </Nav>
    );
  }
}

const displaySettings = () => {
  document.getElementById("settings-bg").style.display = "block";
};
