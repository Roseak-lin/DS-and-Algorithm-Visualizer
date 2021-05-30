import React from "react";
import $ from "jquery";

import algo from "../AlgoVisualizer.module.css";

export default class Popup extends React.Component {
  render() {
    return (
      <div id={algo.popup}>
        <div id={algo.popup_text}>
          You have not selected an algorithm
          <span
            id={algo.close}
            onClick={() => {
              $("#popup").fadeOut(150);
            }}
          >
            &times;
          </span>
        </div>
      </div>
    );
  }
}