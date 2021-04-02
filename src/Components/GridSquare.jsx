import React from "react";
import right_arrow from "../Images/arrow_right.jpg";
import circle from "../Images/circle.png";

export default class Square extends React.Component {
  render() {
    const {
      x,
      y,
      className,
      id,
      handleClick,
      isStart,
      isEnd,
      drag,
      drop,
      weight,
    } = this.props;

    if (isStart) {
      return (
        <div className={className} id={id}>
          <img
            src={right_arrow}
            draggable={false}
            onDragStart={(event) => {
              drag(event);
            }}
            id="start"
            alt="start"
            title="Start"
          />
        </div>
      );
    } else if (isEnd) {
      return (
        <div className={className} id={id}>
          <img
            src={circle}
            draggable={false}
            onDragStart={(event) => {
              drag(event);
            }}
            id="end"
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
            drop(event);
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
