import React from "react";

import Toolbar from "./Toolbar";
import NavBar from "./NavBar";

import ds from "../DataStructures.module.css";

export default class DSVisualizer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      behavior: "list",
      functions: ["add", "remove"],
      structure: [],
    };
  }

  handleChange(key) {
    switch (key) {
      case "set":
        this.setState({functions: ["add", "remove"]})
        break;
      case "queue":
        this.setState({functions: ["enqueue", "dequeue"]})
        break;
      case "deque":
        this.setState({functions: ["enqueue", "dequeue"]})
        break;
      case "stack":
        this.setState({functions: ["push", "pop"]})
        break;
      default:
        break;
    }
    this.setState({ behavior: key });
  }

  // behavior functions

  add(index) {}

  remove() {}

  enqueue() {}

  dequeue() {}

  push() {}

  pop() {}

  render() {
    return (
      <div className={ds.DSVisualizer}>
        <NavBar onchange={(key) => this.handleChange(key)} />
        <Toolbar
          functions={this.state.functions}
          btns={this.state.functions}
          add={this.add}
          remove={this.remove}
          enqueue={this.enqueue}
          dequeue={this.dequeue}
          push={this.push}
          pop={this.pop}
        />
      </div>
    );
  }
}
