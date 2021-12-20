import React from "react";

import Toolbar from "./Toolbar";
import NavBar from "./NavBar";
import Alert from "./Alert";

import ds from "../DataStructures.module.css";

import $ from "jquery";
import anime from "animejs";

export default class DSVisualizer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      behavior: "list",
      functions: ["add", "remove"],
      structure: [1, 2, 3],
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
        this.setState({
          functions: ["enqueueF", "dequeueF", "enqueueB", "dequeueB"],
        });
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
      this.addAnim(struct.length - 1, value);
    } else if (parseInt(index) > struct.length) {
      $("#alert_text").text(`Cannot add at index ${index}`);
      $(`.${ds.alertBG}`).fadeIn();
      return;
    } else {
      this.addAnim(index, value);
      return;
    }
  }

  remove(index) {
    let struct = this.state.structure.slice();
    if (struct.length === 0) {
      $("#alert_text").text(
        `The ${this.state.behavior} is empty! There's nothing to remove!`
      );
      $(`.${ds.alertBG}`).fadeIn();
      return;
    } else if (struct.length <= index) {
      $("#alert_text").text(`No element exists at index ${index}!`);
      $(`.${ds.alertBG}`).fadeIn();
      return;
    }

    if (index === "") {
      this.remAnim(struct.length - 1);
    } else if (parseInt(index) >= struct.length) {
      return;
    } else {
      this.remAnim(index);
    }
  }

  enqueue(value) {
    if (value === "") {
      $("#alert_text").text("Please select enter a value!");
      $(`.${ds.alertBG}`).fadeIn();
      return;
    }
    this.addAnim(Math.min(this.state.structure.length - 1, 0), value);
  }

  dequeue() {
    let struct = this.state.structure.slice();
    if (struct.length === 0) {
      $("#alert_text").text("Queue is empty! There's nothing to dequeue!");
      $(`.${ds.alertBG}`).fadeIn();
    }
    this.remAnim(struct.length - 1);
  }

  push(value) {
    if (value === "") {
      $("#alert_text").text("Please select enter a value!");
      $(`.${ds.alertBG}`).fadeIn();
      return;
    }
    this.addAnim(this.state.structure.length - 1, value);
  }

  pop() {
    let struct = this.state.structure.slice();
    if (struct.length === 0) {
      $("#alert_text").text("Stack is empty! There's nothing to pop!");
      $(`.${ds.alertBG}`).fadeIn();
    }
    this.remAnim(struct.length - 1);
  }

  // animation functions

  addAnim(index, value) {
    let struct = this.state.structure;
    if (index === struct.length - 1) {
      struct.push(value);
      this.setState({ structure: struct }, () => {
        $(`#item_${index + 1}`)
          .css("display", "none")
          .fadeIn(150);
      });
    } else {
      struct.splice(index, 0, value);
      let comps = [];
      for (let i = parseInt(index); i < struct.length; i++) {
        comps.push(`#item_${i}`);
      }

      anime({
        targets: comps,
        translateX: "5em",
        duration: 300,
        complete: () => {
          this.setState({ structure: struct }, () => {
            anime({ targets: comps, translateX: 0, duration: 0 });
          });
        },
      });
    }
  }

  remAnim(index) {
    let struct = this.state.structure;
    if (index === struct.length - 1) {
      $(`#item_${index}`).fadeOut(150, () => {
        struct.pop();
        this.setState({ structure: struct });
      });
    } else {
      let half1 = struct.slice(0, index);
      let half2 = struct.slice(parseInt(index) + 1);
      struct = half1.concat(half2);

      let comps = [];
      for (let i = parseInt(index) + 1; i <= struct.length; i++) {
        comps.push(`#item_${i}`);
      }

      var timeline = anime.timeline({ autoplay: "false" });

      timeline.add({ targets: comps, translateX: "-5em", duration: 350 }).add({
        targets: comps,
        translateX: 0,
        duration: 0,
        complete: () => {
          this.setState({ structure: struct });
        },
      });

      $(`#item_${index}`).fadeOut(150, () => {
        timeline.play();
      });
    }
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

        <div style={{ marginLeft: "1.5em" }}>
          {this.state.structure.map((item, key) => {
            if (key === 0 || key === this.state.structure.length - 1) {
              return (
                <div className={ds.item} id={`item_${key}`} key={key}>
                  <div>{item}</div>
                  <div style={{ fontSize: "0.7em" }}>
                    {key === 0 ? "Head" : "Tail"}
                  </div>
                </div>
              );
            } else {
              return (
                <div className={ds.item} id={`item_${key}`} key={key}>
                  {item}
                </div>
              );
            }
          })}
        </div>
      </div>
    );
  }
}