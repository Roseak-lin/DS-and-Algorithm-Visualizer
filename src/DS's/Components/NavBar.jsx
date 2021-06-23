import React from "react";
import Nav from "react-bootstrap/Nav";
import { QuestionCircle } from "react-bootstrap-icons";

export default class NavBar extends React.Component {
  render() {
    return (
      <Nav
        id="nav"
        justify
        variant="pills"
        defaultActiveKey="list"
        onSelect={(key) => {
          this.props.onchange(key);
        }}
      >
        <Nav.Item className="nav_title">
          <Nav.Link>
            Data Structure Visualizer
          </Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link eventKey="list">
            Dynamic Array (List)
            <QuestionCircle />
          </Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link eventKey="set">
            Set
            <QuestionCircle />
          </Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link eventKey="queue">
            Queue
            <QuestionCircle />
          </Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link eventKey="deque">
            Deque
            <QuestionCircle />
            <p>lol</p>
          </Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link eventKey="stack">
            Stack
            <QuestionCircle />
          </Nav.Link>
        </Nav.Item>
      </Nav>
    );
  }
}
