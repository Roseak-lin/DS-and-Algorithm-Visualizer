import React from "react";
import $ from "jquery";

import ds from "../DataStructures.module.css";

export default class Toolbar extends React.Component {
  componentDidMount() {
    // make list functions visible
    $("#add, #text_add, #remove, #text_rem").css("display", "block");

    $("button").each((index, element) => {
      element.addEventListener("click", () => {
        $(`#${element.id}`).animate({left: '200px'});
        setTimeout(() => {
          $(`#${element.id}`).animate({left: '0px'});
        }, 300);
      });
    });
  }

  componentDidUpdate() {
    $("div > input, button").each((index, element) => {
      $(element).css("display", "none");
    });

    this.props.functions.forEach((element) => {
      $(`#${element}`).css("display", "block");
      if (element === "add") {
        $("#text_add").css("display", "block");
      } else if (element === "remove") {
        $("#text_rem").css("display", "block");
      }
    });
  }

  render() {
    return (
      <div id={ds.toolbar}>
        <input
          type="text"
          placeholder="Index"
          maxLength="3"
          id="text_add"
        ></input>
        <button id="add">Add at index</button>

        <input
          type="text"
          placeholder="Index"
          maxLength="3"
          id="text_rem"
        ></input>
        <button id="remove">Remove at index</button>

        <button id="enqueue">Enqueue</button>
        <button id="dequeue">Dequeue</button>

        <button id="push">Push</button>
        <button id="pop">Pop</button>
      </div>
    );
  }
}
