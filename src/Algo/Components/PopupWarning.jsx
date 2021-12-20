import React from "react";
import $ from "jquery";

import algo from "../AlgoVisualizer.module.css";

export default class Popup extends React.Component {
  render() {
    return (
      <div
        id={algo.popup}
        onClick={(event) => {
          if (event.target.id === `${algo.popup}`) {
            $(`#${algo.popup}`).fadeOut(150);
          }
        }}
      >
        <div id={algo.popup_text}>
          You have not selected an algorithm
          <span
            id={algo.close}
            onClick={() => {
              $(`#${algo.popup}`).fadeOut(150);
            }}
          >
            &times;
          </span>
        </div>
      </div>
    );
  }
}
