import React from "react";
import $ from "jquery";

import Table from "react-bootstrap/Table";

var active = 1;

export default class Settings extends React.Component {
  changeSpeed(speed, button) {
    document
      .getElementsByClassName("speed-btn")
      [button].classList.replace("inactive", "active");
    document
      .getElementsByClassName("speed-btn")
      [active].classList.replace("active", "inactive");

    this.props.changeSpeed(speed);
    console.log(speed + " " + button);

    // swap the active button
    let temp = active;
    active = button;
    button = temp;
  }

  render() {
    return (
      <div id="settings-bg">
        <div id="settings">
          <span
            id="settings-close"
            onClick={() => {
              $("#settings-bg").fadeOut(150);
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
                    className="speed-btn inactive"
                    onClick={() => this.changeSpeed("slow", 0)}
                  >
                    Slow
                  </button>
                </td>
                <td>
                  <button
                    className="speed-btn active"
                    onClick={() => this.changeSpeed("med", 1)}
                  >
                    Medium
                  </button>
                </td>
                <td>
                  <button
                    className="speed-btn inactive"
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
