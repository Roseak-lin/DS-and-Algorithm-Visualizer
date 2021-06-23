import React from "react";
import $ from "jquery";

import ds from "../DataStructures.module.css";

export default class Alert extends React.Component {
  componentDidMount() {
    window.onclick = (e) => {
      if (e.target.className === `${ds.alertBG}`) {
        $(`.${ds.alertBG}`).fadeOut();
      }
    };
  }

  render() {
    return (
      <div className={ds.alertBG}>
        <div className={ds.alert}>
          <div id="alert_text" />
          <span
            className={ds.close}
            onClick={() => {
              $(`.${ds.alertBG}`).fadeOut();
            }}
          >
            &times;
          </span>
        </div>
      </div>
    );
  }
}
