import React from "react";
import $ from "jquery";

export default class Popup extends React.Component {
  render() {
    return (
      <div id="popup">
        <div id="popup-text">
          You have not selected an algorithm
          <span
            id="close"
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