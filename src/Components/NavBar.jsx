import React from "react";

import Nav from "react-bootstrap/Nav";

export default class NavigationBar extends React.Component {
  render() {
    let { onSelect, onClick } = this.props;
    return (
      <Nav
        className="nav"
        style={{ width: 100 + "%" }}
        fill="true"
        variant="pills"
        onSelect={(eventKey) => {
          onSelect(eventKey);
        }}
      >
        <Nav.Item>
          <Nav.Link eventKey="bfs">BFS</Nav.Link>
        </Nav.Item>
        <button id="visualize-btn" onClick={onClick}>
          Visualize!
        </button>
        <Nav.Item>
          <Nav.Link eventKey="dfs">DFS</Nav.Link>
        </Nav.Item>
      </Nav>
    );
  }
}
