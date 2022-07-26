import React from "react";
import $ from "jquery";

import ds from "../DataStructures.module.css";

export default class Alert extends React.Component {
  componentDidMount() {
    window.onclick = (e) => {
      if (e.target.id === `alert`) {
        $(`#alert`).fadeOut();
      }
    };
  }

  render() {
    return (
      <div className={ds.alertBG} id="alert">
        <div className={ds.alert}>
          <div id="alert_text" />
          <span
            className={ds.close}
            onClick={() => {
              $(`#alert`).fadeOut();
            }}
          >
            &times;
          </span>
        </div>
      </div>
    );
  }
}
