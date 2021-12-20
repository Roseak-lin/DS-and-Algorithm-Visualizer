import React from "react";
import $ from "jquery";

import ds from "../DataStructures.module.css";

export default class Toolbar extends React.Component {

  componentDidMount() {
    // make list functions visible
    $("#text_val, #add, #text_add, #remove, #text_rem").css("display", "block");
  }

  componentDidUpdate() {
    $(`#${ds.toolbar} > input, button`).each((index, element) => {
      if ($(element).attr("placeholder") !== "Value") {
        $(element).css("display", "none");
      }
    });

    this.props.functions.forEach((element) => {
      $(`#${element}`).css("display", "block");
      if (element === "add") {
        $("#text_add").css("display", "block");
        $("#text_val").css("display", "block");
      } else if (element === "remove") {
        $("#text_rem").css("display", "block");
        $("#text_val").css("display", "block");
      }
    });
  }

  render() {
    const { add, remove, enqueue, dequeue, push, pop } = this.props;

    return (
      <div id={ds.toolbar}>
        <input
          type="text"
          placeholder="Value"
          maxLength="3"
          id="text_val"
          style={{ marginRight: `1.5em` }}
        />

        <input type="text" placeholder="Index" maxLength="3" id="text_add" />
        <button
          id="add"
          onClick={() => add($("#text_add").val(), $("#text_val").val())}
        >
          Add at index
        </button>
        <input type="text" placeholder="Index" maxLength="3" id="text_rem" />
        <button
          id="remove"
          onClick={() => remove($("#text_rem").val())}
        >
          Remove at index
        </button>

        <button id="enqueue" onClick={() => enqueue($("#text_val").val())}>
          Enqueue
        </button>
        <button id="dequeue" onClick={() => dequeue()}>
          Dequeue
        </button>
        
        <button id="enqueueF" onClick={() => push($("#text_val").val())}>
          Enqueue front
        </button>
        <button id="dequeueF" onClick={() => remove(0)}>
          Dequeue front
        </button>
        <button id="enqueueB" onClick={() => enqueue($("#text_val").val())}>
          Enqueue back
        </button>
        <button id="dequeueB" onClick={() => pop()}>
          Dequeue back
        </button>

        <button id="push" onClick={() => push($("#text_val").val())}>
          Push
        </button>
        <button id="pop" onClick={() => pop()}>
          Pop
        </button>
      </div>
    );
  }
}
