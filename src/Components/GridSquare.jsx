import React from "react";
import right_arrow from "../Images/arrow_right.jpg";
import circle from "../Images/circle.png";

export default class Square extends React.Component {
  render() {
    let {
      x,
      y,
      className,
      id,
      handleClick,
      drag,
      drop,
      weight,
      dragAndDropUpdate,
    } = this.props;

    if (x === 5 && y === 12) {
      return (
        <div
          className={className}
          onClick={() => handleClick(x, y)}
          id={id}
          onDrop={(event) => {
            drop(event);
            dragAndDropUpdate(event, id);
          }}
          onDragOver={(event) => event.preventDefault()}
          weight={weight}
        >
          <img
            src={right_arrow}
            draggable={true}
            onDragStart={(event) => {
              drag(event);
            }}
            id="start"
            alt="start"
            title="Start"
          />
        </div>
      );
    } else if (x === 66 && y === 12) {
      return (
        <div
          className={className}
          onClick={() => handleClick(x, y)}
          id={id}
          onDrop={(event) => {
            drop(event);
            dragAndDropUpdate(event, id);
          }}
          onDragOver={(event) => event.preventDefault()}
          weight={weight}
        >
          <img
            src={circle}
            draggable={true}
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
            dragAndDropUpdate(event, id);
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
