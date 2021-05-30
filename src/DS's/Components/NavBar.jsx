import React from "react";
import Nav from "react-bootstrap/Nav";

export default class NavBar extends React.Component {

  render() {
    return (
      <Nav id="nav" justify variant="pills" defaultActiveKey="list" onSelect={(key) => {
        this.props.onchange(key)
      }}>
        <Nav.Item className="nav_title">
          <Nav.Link>Data Structure Visualizer</Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link eventKey="list">Dynamic Array (List)</Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link eventKey="set">Set</Nav.Link>
        </Nav.Item>
        
        <Nav.Item>
          <Nav.Link eventKey="queue">Queue</Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link eventKey="deque">Deque</Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link eventKey="stack">Stack</Nav.Link>
        </Nav.Item>
      </Nav>
    );
  }
}