import React from "react";

import Toolbar from "./Toolbar";
import NavBar from "./NavBar";
import Alert from "./Alert";

import ds from "../DataStructures.module.css";
import $ from "jquery";

export default class DSVisualizer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      behavior: "list",
      functions: ["add", "remove"],
      structure: [],
    };

    this.add = this.add.bind(this);
    this.remove = this.remove.bind(this);
    this.enqueue = this.enqueue.bind(this);
    this.dequeue = this.dequeue.bind(this);
    this.push = this.push.bind(this);
    this.pop = this.pop.bind(this);
  }

  handleChange(key) {
    switch (key) {
      case "list":
        this.setState({ functions: ["add", "remove"] });
        break;
      case "set":
        this.setState({ functions: ["add", "remove"] });

        let struct = this.state.structure.slice();
        struct = [...new Set(struct)];
        this.setState({ structure: struct });
        break;
      case "queue":
        this.setState({ functions: ["enqueue", "dequeue"] });
        break;
      case "deque":
        this.setState({ functions: ["enqueueF", "dequeueF", "enqueueB", "dequeueB"] });
        break;
      case "stack":
        this.setState({ functions: ["push", "pop"] });
        break;
      default:
        break;
    }
    this.setState({ behavior: key });
  }

  // behavior functions

  add(index, value) {
    if (value === "") {
      $("#alert_text").text("Please select enter a value!");
      $(`.${ds.alertBG}`).fadeIn();
      return;
    }

    if (this.state.behavior === "set" && this.state.structure.includes(value)) {
      $("#alert_text").text("The value is already in the set!");
      $(`.${ds.alertBG}`).fadeIn();
      return;
    }

    let struct = this.state.structure.slice();
    if (index === "") {
      struct.push(value);
    } else if (parseInt(index) > struct.length) {
      return;
    } else {
      struct.splice(index, 0, value);
    }
    this.setState({ structure: struct });
  }

  remove(index) {
    let struct = this.state.structure.slice();

    if (struct.length === 0) {  
      $("#alert_text").text(`The ${this.state.behavior} is empty! There's nothing to remove!`);
      $(`.${ds.alertBG}`).fadeIn();
      return
    }

    if (index === "") {
      struct.pop();
    } else if (parseInt(index) >= struct.length) {
      return;
    } else {
      let half1 = struct.slice(0, index);
      let half2 = struct.slice(parseInt(index) + 1);
      struct = half1.concat(half2);
    }
    this.setState({ structure: struct });
  }

  enqueue(value) {
    let struct = this.state.structure.slice();
    if (value === "") {
      $("#alert_text").text("Please select enter a value!");
      $(`.${ds.alertBG}`).fadeIn();
      return;
    }
    struct.push(value);
    this.setState({ structure: struct });
  }

  dequeue() {
    let struct = this.state.structure.slice();
    if (struct.length === 0) {  
      $("#alert_text").text("Queue is empty! There's nothing to dequeue!");
      $(`.${ds.alertBG}`).fadeIn();
    }
    struct.shift();
    this.setState({ structure: struct });
  }

  push(value) {
    let struct = this.state.structure.slice();
    if (value === "") {
      $("#alert_text").text("Please select enter a value!");
      $(`.${ds.alertBG}`).fadeIn();
      return;
    }
    struct.push(value);
    this.setState({ structure: struct });
  }

  pop() {
    let struct = this.state.structure.slice();
    if (struct.length === 0) {  
      $("#alert_text").text("Stack is empty! There's nothing to pop!");
      $(`.${ds.alertBG}`).fadeIn();
    }
    struct.pop();
    this.setState({ structure: struct });
  }

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
        <Alert />

        <div style={{ marginLeft: "calc(32px - 1em)" }}>
          {this.state.structure.map((item, key) => {
            return (
              <div className={ds.item} key={key}>
                {item}
              </div>
            );
          })}
        </div>
          
      </div>
    );
  }
}
