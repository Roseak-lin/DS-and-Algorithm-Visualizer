import React from "react";

export default class Popup extends React.Component {

  onClick() {
    document.getElementById("popup").style.display = "none";
  }

  render() {
    return (
      <div id="popup">
        <div id="popup-text">
          You have not selected an algorithm <span id="close" onClick={this.onClick}>&times;</span>
        </div>
      </div>
    );
  }
}