import React from "react";
import $ from "jquery";

import Table from "react-bootstrap/Table";

import algo from "../AlgoVisualizer.module.css";

var active = 1;

export default class Settings extends React.Component {
  changeSpeed(speed, button) {
    if (button === active) {
      return;
    }
    document
      .getElementsByClassName(`${algo.settings_btn}`)
      [button].classList.replace(`${algo.inactive}`, `${algo.active}`);
    document
      .getElementsByClassName(`${algo.settings_btn}`)
      [active].classList.replace(`${algo.active}`, `${algo.inactive}`);

    this.props.changeSpeed(speed);

    // swap the active button
    active ^= button;
    button ^= active;
    active ^= button;

    console.log(active,  button);
  }

  render() {
    return (
      <div
        id={algo.settings_bg}
        onClick={(event) => {
          if (event.target.id === `${algo.settings_bg}`) {
            $(`#${algo.settings_bg}`).fadeOut(150);
          }
        }}
      >
        <div id={algo.settings}>
          <span
            id={algo.settings_close}
            onClick={() => {
              $(`#${algo.settings_bg}`).fadeOut(150);
            }}
          >
            &times;
          </span>
          <Table borderless responsive="lg">
            <tbody>
              <tr>
                <th>Speed</th>
                <td>
                  <button
                    className={`${algo.settings_btn} ${algo.inactive}`}
                    onClick={() => this.changeSpeed("slow", 0)}
                  >
                    Slow
                  </button>
                </td>
                <td>
                  <button
                    className={`${algo.settings_btn} ${algo.active}`}
                    onClick={() => this.changeSpeed("med", 1)}
                  >
                    Medium
                  </button>
                </td>
                <td>
                  <button
                    className={`${algo.settings_btn} ${algo.inactive}`}
                    onClick={() => this.changeSpeed("fast", 2)}
                  >
                    Fast
                  </button>
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}
