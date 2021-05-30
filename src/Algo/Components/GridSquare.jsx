import React from "react";
import right_arrow from "../Images/arrow_right.jpg";
import circle from "../Images/circle.png";

import algo from "../AlgoVisualizer.module.css";

export default class Square extends React.Component {
  render() {
    const {
      x,
      y,
      id,
      handleClick,
      className,
      drag,
      drop,
      isStart,
      isEnd,
      weight,
      dragAndDropUpdate,
    } = this.props;

    if (isStart) {
      return (
        <div
          className={className}
          onClick={() => handleClick(x, y)}
          id={id}
          weight={weight}
        >
          <img
            src={right_arrow}
            draggable={true}
            onDragStart={(event) => {
              drag(event);
            }}
            id={algo.start}
            alt="start"
            title="Start"
          />
        </div>
      );
    } else if (isEnd) {
      return (
        <div
          className={className}
          onClick={() => handleClick(x, y)}
          id={id}
          weight={weight}
        >
          <img
            src={circle}
            draggable={true}
            onDragStart={(event) => {
              drag(event);
            }}
            id={algo.end}
            alt="end"
            title="End"
          />
        </div>
      );
    } else {
      return (
        <div
          className={className}
          onClick={() => handleClick(x, y)}
          id={id}
          onDrop={(event) => {
            let promise = new Promise(function (resolve) {
              dragAndDropUpdate(id, event);
              resolve(event);
            });

            promise.then(
              function (value) {
                drop(value);
              },
              function (error) {
                console.log(error);
              }
            );
          }}
          onDragOver={(event) => event.preventDefault()}
          weight={weight}
        >
          {weight === null || weight === 0 ? "" : weight}
        </div>
      );
    }
  }
}
